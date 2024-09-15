// pages/api/emails.ts
import { connectToDb } from "@/app/utils/config/mongodb";
import { Email } from "@/app/utils/models/Email";
import { NextRequest, NextResponse } from "next/server";

// POST method for adding emails to the database

export async function POST(req: NextRequest) {
  await connectToDb();

  try {
    // Parse JSON body from the request
    const { email } = await req.json();

    // Validate that the email field is provided
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Optional: Check if the email already exists to prevent duplicates
    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      return NextResponse.json({
        message: "Email saved successfully",
        status: 200,
        success: true,
      });
    }

    // Save the new email to the database
    const newEmail = new Email({ email });
    await newEmail.save();

    return NextResponse.json({
      message: "Email saved successfully",
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

// GET method for retrieving emails from the database
export async function GET() {
  await connectToDb();

  try {
    // Retrieve all emails from the database
    const emails = await Email.find({});

    // Return the emails as a response
    return NextResponse.json({
      message: "email fetched successfully",
      status: 200,
      success: true,
      data: emails,
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
