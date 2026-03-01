import { NextResponse } from "next/server";
import { connectDB } from "@backend/mongodb";
import Trip from "@backend/models/trip.model";

export async function POST(req: Request) {
    try {
        const { userId, userName, userAvatar, userEmail } = await req.json();
        if (!userId) return NextResponse.json({ error: "No userId provided" }, { status: 400 });

        await connectDB();

        // 1. Goa March 2026
        const goaExists = await Trip.findOne({ title: "Goa March 2026", ownerId: userId });
        if (!goaExists) {
            await Trip.create({
                title: "Goa March 2026",
                destination: "Goa, India",
                startDate: new Date("2026-03-10"),
                endDate: new Date("2026-03-14"),
                coverImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2000&auto=format&fit=crop",
                ownerId: userId,
                inviteCode: "GOA2026",
                isDemo: true,
                members: [
                    { userId, name: userName, avatar: userAvatar, email: userEmail, role: "owner" },
                    { userId: "demo_rahul", name: "Rahul Sharma", avatar: "https://i.pravatar.cc/150?u=rahul", email: "rahul@example.com", role: "editor" },
                    { userId: "demo_sneha", name: "Sneha Kapur", avatar: "https://i.pravatar.cc/150?u=sneha", email: "sneha@example.com", role: "viewer" },
                ],
                days: [
                    {
                        label: "Day 1 — Mar 10",
                        date: new Date("2026-03-10"),
                        activities: [
                            { title: "Baga Beach Arrival", time: "10:00 AM", location: "Calangute", category: "Leisure", cost: 0, notes: "Check-in at the resort first." },
                            { title: "Lunch at Curlies", time: "1:30 PM", location: "Anjuna", category: "Food", cost: 1200, notes: "Best shack in Anjuna." },
                            { title: "Fort Aguada Sunset", time: "5:30 PM", location: "Candolim", category: "Sightseeing", cost: 0, notes: "Carry water." },
                            { title: "Dinner at Thalassa", time: "8:30 PM", location: "Siolim", category: "Food", cost: 4500, notes: "Table booked for 9PM." }
                        ]
                    },
                    {
                        label: "Day 2 — Mar 11",
                        date: new Date("2026-03-11"),
                        activities: [
                            { title: "Scuba Diving", time: "08:30 AM", location: "Grand Island", category: "Adventure", cost: 3500, notes: "Don't eat heavy breakfast." },
                            { title: "Island Tour", time: "1:00 PM", location: "Bat Island", category: "Sightseeing", cost: 500 },
                            { title: "Old Goa Church Visit", time: "4:00 PM", location: "Velha Goa", category: "Sightseeing", cost: 0, notes: "Respectful attire required." },
                            { title: "Panjim Casino Night", time: "9:00 PM", location: "Panjim Mandovi River", category: "Nightlife", cost: 5000, notes: "Carry ID cards." }
                        ]
                    },
                    {
                        label: "Day 3 — Mar 12",
                        date: new Date("2026-03-12"),
                        activities: [
                            { title: "Dudhsagar Falls", time: "08:00 AM", location: "Mollem", category: "Sightseeing", cost: 2500 },
                            { title: "Spice Plantation Lunch", time: "2:00 PM", location: "Ponda", category: "Food", cost: 800 },
                            { title: "Beach Volleyball", time: "5:00 PM", location: "Majorda", category: "Leisure", cost: 0 }
                        ]
                    }
                ],
                expenses: [
                    { name: "Resort Advance", amount: 15000, category: "Stay", paidBy: userId, paidByName: userName, date: new Date() },
                    { name: "Scuba Gear", amount: 7000, category: "Adventure", paidBy: "demo_rahul", paidByName: "Rahul Sharma", date: new Date() },
                    { name: "Dinner Bill", amount: 4500, category: "Food", paidBy: userId, paidByName: userName, date: new Date() }
                ],
                checklist: [
                    { text: "Swimwear", done: true },
                    { text: "Sunscreen", done: true },
                    { text: "Powerbank", done: false },
                    { text: "Camera", done: false },
                    { text: "Sunglasses", done: true }
                ]
            });
        }

        // 2. Manali Adventure
        const manaliExists = await Trip.findOne({ title: "Manali Adventure", ownerId: userId });
        if (!manaliExists) {
            await Trip.create({
                title: "Manali Adventure",
                destination: "Manali, Himachal Pradesh",
                startDate: new Date("2026-05-15"),
                endDate: new Date("2026-05-20"),
                coverImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2000&auto=format&fit=crop",
                ownerId: userId,
                inviteCode: "MANALI26",
                isDemo: true,
                members: [
                    { userId, name: userName, avatar: userAvatar, email: userEmail, role: "owner" },
                    { userId: "demo_vikram", name: "Vikram Singh", avatar: "https://i.pravatar.cc/150?u=vikram", email: "vikram@example.com", role: "editor" },
                    { userId: "demo_ananya", name: "Ananya Mehra", avatar: "https://i.pravatar.cc/150?u=ananya", email: "ananya@example.com", role: "editor" },
                ],
                days: [
                    {
                        label: "Day 1 — Arrival",
                        date: new Date("2026-05-15"),
                        activities: [
                            { title: "Check-in at Cottage", time: "2:00 PM", location: "Nasogi", category: "Stay", cost: 0 },
                            { title: "Mall Road Stroll", time: "4:00 PM", location: "Manali Center", category: "Shopping", cost: 0 },
                            { title: "Hadimba Temple", time: "6:00 PM", location: "Dhungri", category: "Sightseeing", cost: 0 },
                            { title: "Dinner at Johnson Lodge", time: "8:30 PM", location: "Manali", category: "Food", cost: 2500 }
                        ]
                    },
                    {
                        label: "Day 2 — Solang Valley",
                        date: new Date("2026-05-16"),
                        activities: [
                            { title: "Paragliding", time: "10:00 AM", location: "Solang", category: "Adventure", cost: 3200 },
                            { title: "Ziplining", time: "1:00 PM", location: "Solang", category: "Adventure", cost: 800 },
                            { title: "Anjani Mahadev Trek", time: "3:00 PM", location: "Solang", category: "Sightseeing", cost: 0 },
                            { title: "Cafe Hopping in Old Manali", time: "7:00 PM", location: "Old Manali", category: "Food", cost: 2000 }
                        ]
                    },
                    {
                        label: "Day 3 — Rohtang Pass",
                        date: new Date("2026-05-17"),
                        activities: [
                            { title: "Morning Drive to Rohtang", time: "06:00 AM", location: "Rohtang", category: "Transport", cost: 4000 },
                            { title: "Snow Activities", time: "10:00 AM", location: "Rohtang Pass", category: "Adventure", cost: 1500 },
                            { title: "River Rafting", time: "4:00 PM", location: "Beas River", category: "Adventure", cost: 1200 }
                        ]
                    }
                ],
                expenses: [
                    { name: "Cottage Booking", amount: 12000, category: "Stay", paidBy: userId, paidByName: userName, date: new Date() },
                    { name: "Cab to Rohtang", amount: 4000, category: "Transport", paidBy: "demo_vikram", paidByName: "Vikram Singh", date: new Date() }
                ],
                checklist: [
                    { text: "Thermal wear", done: true },
                    { text: "Boots", done: true },
                    { text: "Gloves", done: false },
                    { text: "Raincoat", done: false }
                ]
            });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
