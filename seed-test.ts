import { connectDB } from "./backend/mongodb.ts";
import Trip from "./backend/models/trip.model.ts";
import mongoose from "mongoose";

async function test() {
    process.env.MONGODB_URI = "mongodb+srv://pranavgawaii:SbhGzR17U15F9D6T@cluster0.n1q1c.mongodb.net/travio?retryWrites=true&w=majority&appName=Cluster0";
    await connectDB();
    
    // Find demo user trips
    const ownerId = "user_2something"; // we don't know the exact ID, but we can query by inviteCode
    const trips = await Trip.find({
        isDemo: true
    }).lean();
    
    console.log("Demo trips found:", trips.length);
    if(trips.length > 0) console.log("First trip title:", trips[0].title);
    process.exit(0);
}
test();
