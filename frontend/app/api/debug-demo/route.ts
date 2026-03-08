import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@backend/mongodb";
import Trip from "@backend/models/trip.model";

export async function GET() {
    const debug: Record<string, any> = {};

    try {
        const { userId } = await auth();
        debug.userId = userId ?? "null — not authenticated";

        if (!userId) {
            return NextResponse.json({ error: "Not logged in", debug });
        }

        debug.dbConnect = "attempting...";
        await connectDB();
        debug.dbConnect = "OK";

        const user = await currentUser();
        debug.clerkEmail = user?.primaryEmailAddress?.emailAddress ?? "null";
        debug.isDemoUser = debug.clerkEmail.toLowerCase() === "demo@travio.com";

        // Count all trips for this user
        const allTrips = await Trip.find({
            $or: [{ ownerId: userId }, { "members.userId": userId }],
        }).lean();
        debug.tripCount = allTrips.length;
        debug.tripTitles = allTrips.map((t: any) => `${t.title} (isDemo: ${t.isDemo}, ownerId: ${t.ownerId})`);

        // Count trips with GOA2026 / MANALI26 inviteCodes (any ownerId)
        const demoCodes = await Trip.find({ inviteCode: { $in: ["GOA2026", "MANALI26"] } }).lean();
        debug.demoCodeDocs = demoCodes.map((t: any) => `title: ${t.title}, ownerId: ${t.ownerId}, isDemo: ${t.isDemo}`);

        if (debug.isDemoUser) {
            // Try delete
            const deleteResult = await Trip.deleteMany({ inviteCode: { $in: ["GOA2026", "MANALI26"] } });
            debug.deleteResult = deleteResult;

            // Try insert
            try {
                const result = await Trip.insertMany([
                    {
                        title: "Goa March 2026",
                        destination: "Goa, India",
                        startDate: new Date("2026-03-10"),
                        endDate: new Date("2026-03-14"),
                        coverImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2000&auto=format&fit=crop",
                        ownerId: userId,
                        inviteCode: "GOA2026",
                        isDemo: true,
                        members: [{ userId, name: "Demo User", avatar: user?.imageUrl ?? "", email: debug.clerkEmail, role: "owner" }],
                        days: [],
                        expenses: [],
                        checklist: [],
                        files: [],
                    },
                ]);
                debug.insertResult = `inserted ${result.length} doc(s)`;
            } catch (insertErr: any) {
                debug.insertError = insertErr?.message ?? String(insertErr);
            }

            const recheck = await Trip.find({ $or: [{ ownerId: userId }, { "members.userId": userId }] }).lean();
            debug.tripCountAfter = recheck.length;
        }

    } catch (err: any) {
        debug.fatalError = err?.message ?? String(err);
    }

    return NextResponse.json(debug, { status: 200 });
}
