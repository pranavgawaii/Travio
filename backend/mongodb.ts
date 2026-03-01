import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in your .env.local file");
}

// Use a cached connection to avoid re-connecting on every hot-reload in dev
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    // eslint-disable-next-line no-var
    var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };
global.mongoose = cached;

export async function connectDB(): Promise<typeof mongoose> {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        console.log("🛠️  Connecting to MongoDB...");
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
            serverSelectionTimeoutMS: 3000,
            connectTimeoutMS: 5000,
            socketTimeoutMS: 30000,
            maxPoolSize: 10,
        }).then((m) => {
            console.log("✅ MongoDB Connected Successfully");
            return m;
        }).catch((err) => {
            console.error("❌ MongoDB Connection Error:", err.message);
            // Reset cache on failure so next call retries
            cached.promise = null;
            cached.conn = null;
            throw err;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (err) {
        cached.promise = null;
        throw err;
    }

    return cached.conn;
}
