import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

/**
 * GET handler for fetching a single event by slug
 * @param request - The incoming request object
 * @param params - Object containing route parameters including slug
 * @returns NextResponse with event data or error message
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse> {
  try {
    // Validate slug parameter
    const { slug } = await params;
    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing event slug" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    const sanitizedSlug = slug.trim().toLowerCase();

    // Query event by slug (case-insensitive)
    const event = await Event.findOne({
      slug: sanitizedSlug,
    }).lean();

    // Handle event not found
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Return event data
    return NextResponse.json(
      { message: "Event fetched successfully", event },
      { status: 200 }
    );
  } catch (error) {
    // Log error for monitoring (consider using proper logging service in production)
    console.error("Error fetching event:", error);

    // Return generic error to client
    return NextResponse.json(
      { error: "Failed to fetch event details" },
      { status: 500 }
    );
  }
}
