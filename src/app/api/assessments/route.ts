// app/api/assessments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req: NextRequest) {
  try {
    // Verify authentication
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, formData, scores, grade } = await req.json();

    const result = await pool.query(
      `INSERT INTO wellness_assessments (user_id, title, form_data, scores, grade)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, created_at`,
      [session.user.id, title, formData, scores, grade]
    );

    return NextResponse.json({
      success: true,
      assessment: result.rows[0],
    });
  } catch (error) {
    console.error("Save assessment error:", error);
    return NextResponse.json(
      { error: "Failed to save assessment" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await pool.query(
      `SELECT id, title, form_data, scores, grade, created_at, updated_at
       FROM wellness_assessments 
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [session.user.id]
    );

    return NextResponse.json({
      success: true,
      assessments: result.rows,
    });
  } catch (error) {
    console.error("Fetch assessments error:", error);
    return NextResponse.json(
      { error: "Failed to fetch assessments" },
      { status: 500 }
    );
  }
}
