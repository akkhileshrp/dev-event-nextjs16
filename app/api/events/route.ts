import Event from "@/database/event.model";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();

    let event;
    try {
      event = Object.fromEntries(formData.entries());
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid JSON data format" },
        { status: 400 }
      );
    }

    const file = formData.get("image") as File;

    if (!file)
      NextResponse.json({ message: "Image file is required" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadedResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "events" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    event.image = (uploadedResult as { secure_url: string }).secure_url;

    const createdEvent = await Event.create(event);
    return NextResponse.json(
      { message: "Event created successfully", event: createdEvent },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Event Creation failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "Events fetched successfully", events },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Event request failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
