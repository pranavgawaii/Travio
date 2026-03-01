import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
        return NextResponse.json({ error: "Cloudinary not configured" }, { status: 500 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

        // Re-pack and send to Cloudinary unsigned upload endpoint
        const cloudinaryFormData = new FormData();
        cloudinaryFormData.append("file", file);
        cloudinaryFormData.append("upload_preset", uploadPreset);
        cloudinaryFormData.append("folder", `travio/${userId}`);

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
            { method: "POST", body: cloudinaryFormData }
        );

        if (!res.ok) {
            const err = await res.json();
            return NextResponse.json({ error: err.error?.message || "Upload failed" }, { status: 500 });
        }

        const data = await res.json();
        return NextResponse.json({
            url: data.secure_url,
            publicId: data.public_id,
            format: data.format,
            bytes: data.bytes,
            resourceType: data.resource_type,
            width: data.width,
            height: data.height,
            name: file.name,
        });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Upload failed" },
            { status: 500 }
        );
    }
}
