import { connectToDb } from "@/app/utils/config/mongodb";
import { Item } from "@/app/utils/models/Item";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectToDb();

  try {
    // Parse JSON body from the request
    const { title, link, imageUrl } = await req.json();

    // Validate that the email field is provided
    if (!title || !link || !imageUrl) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Save the new email to the database
    const newItem = new Item({ title, link, imageUrl });
    await newItem.save();

    return NextResponse.json({
      message: "Item saved successfully",
      status: 200,
      success: true,
    });
  } catch (error) {
    // Check if error is an instance of Error, otherwise handle it safely
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
