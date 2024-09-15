import { connectToDb } from "@/app/utils/config/mongodb";
import { Item } from "@/app/utils/models/Item";
import { NextRequest, NextResponse } from "next/server";

// POST: Create a new item
export async function POST(req: NextRequest) {
  await connectToDb();

  try {
    const { title, link, imageUrl } = await req.json();

    if (!title || !link || !imageUrl) {
      return NextResponse.json(
        { error: "Title, link, and imageUrl are required" },
        { status: 400 }
      );
    }

    const newItem = new Item({ title, link, imageUrl });
    await newItem.save();

    return NextResponse.json({
      message: "Item saved successfully",
      status: 200,
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

// GET: Retrieve all items or a single item by ID
export async function GET(req: NextRequest) {
  await connectToDb();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      // Fetch a single item by ID
      const item = await Item.findById(id);
      if (!item) {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
      }
      return NextResponse.json({ item });
    } else {
      // Fetch all items
      const items = await Item.find({});
      return NextResponse.json({
        message: "products fetched successfully",
        status: 200,
        success: true,
        data: items,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

// DELETE: Remove an item by ID
export async function DELETE(req: NextRequest) {
  await connectToDb();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID is required for deletion" },
        { status: 400 }
      );
    }

    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing item by ID
export async function PUT(req: NextRequest) {
  await connectToDb();

  try {
    const { title, link, imageUrl } = await req.json();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID is required for updating" },
        { status: 400 }
      );
    }

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { title, link, imageUrl },
      { new: true }
    );

    if (!updatedItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Item updated successfully",
      status: 200,
      success: true,
      data: updatedItem,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
