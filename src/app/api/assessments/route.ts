// app/api/assessments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Pool } from "pg";

/** pg requires Node; avoid any Edge mis-detection. */
export const runtime = "nodejs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function getSessionFromRequest() {
  const headersList = await headers();
  return auth.api.getSession({
    headers: headersList,
    query: { disableCookieCache: true },
  });
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFromRequest();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, formData, scores, grade } = body;

    const result = await pool.query(
      `INSERT INTO wellness_assessments (user_id, title, form_data, scores, grade)
       VALUES ($1, $2, $3::jsonb, $4::jsonb, $5::jsonb)
       RETURNING id, created_at`,
      [
        session.user.id,
        title,
        JSON.stringify(formData ?? {}),
        JSON.stringify(scores ?? {}),
        JSON.stringify(grade ?? {}),
      ]
    );

    return NextResponse.json({
      success: true,
      assessment: result.rows[0],
    });
  } catch (error) {
    console.error("Save assessment error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to save assessment";
    return NextResponse.json(
      {
        error: errorMessage,
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getSessionFromRequest();

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
