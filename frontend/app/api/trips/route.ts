import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@backend/mongodb";
import Trip from "@backend/models/trip.model";

// ─── GET /api/trips ──────────────────────────────────────────────────────────
// Returns all trips where the current user is owner or member
export async function GET() {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();

    const trips = await Trip.find({
        $or: [
            { ownerId: userId },
            { "members.userId": userId },
        ],
    })
        .sort({ startDate: -1 })
        .lean();

    return NextResponse.json(trips);
}

// ─── POST /api/trips ─────────────────────────────────────────────────────────
// Creates a new trip; the creator becomes the owner
export async function POST(request: Request) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await currentUser();
    const { title, destination, startDate, endDate, coverImage } = await request.json();

    if (!title || !startDate || !endDate) {
        return NextResponse.json({ error: "title, startDate, and endDate are required" }, { status: 400 });
    }

    const emailStr = user?.primaryEmailAddress?.emailAddress ?? "";
    const fallbackName = emailStr ? emailStr.split('@')[0] : "You";

    await connectDB();

    const trip = await Trip.create({
        title,
        destination: destination ?? "",
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        coverImage: coverImage ?? "",
        ownerId: userId,
        members: [
            {
                userId,
                name: user?.fullName ?? user?.firstName ?? fallbackName,
                email: user?.primaryEmailAddress?.emailAddress ?? "",
                avatar: user?.imageUrl ?? "",
                role: "owner",
            },
        ] as any[],
        // Bootstrap days between startDate & endDate
        days: (() => {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const days = [];
            const oneDay = 86_400_000;
            for (let d = new Date(start), i = 1; d <= end; d = new Date(d.getTime() + oneDay), i++) {
                days.push({
                    label: `Day ${i} — ${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
                    date: new Date(d),
                    activities: [],
                });
            }
            return days as any[];
        })(),
    });

    return NextResponse.json(trip, { status: 201 });
}
