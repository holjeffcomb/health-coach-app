import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { Pool } from "pg";
import { Resend } from "resend";
import { generateAssessmentPDF } from "@/app/utils/pdfGenerator";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify authentication
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json(
        { error: "Email address is required" },
        { status: 400 }
      );
    }

    // Fetch the assessment
    const result = await pool.query(
      `SELECT id, title, form_data, scores, grade, created_at, updated_at
       FROM wellness_assessments 
       WHERE id = $1 AND user_id = $2`,
      [params.id, session.user.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Assessment not found" },
        { status: 404 }
      );
    }

    const assessment = result.rows[0];

    // Generate PDF
    const pdfBuffer = await generateAssessmentPDF(assessment);

    // Format date for email
    const assessmentDate = new Date(assessment.created_at).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    // Calculate total score if not present
    const totalScore = (assessment.scores as any).total || 
      Object.values(assessment.scores).reduce((a: number, b: number) => a + b, 0);

    // Send email
    const emailResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Health Coach <onboarding@resend.dev>",
      to: email,
      subject: `Your Health & Longevity Assessment - ${assessment.title}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              border-radius: 8px;
              text-align: center;
              margin-bottom: 30px;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
            }
            .content {
              background: #f9fafb;
              padding: 30px;
              border-radius: 8px;
              margin-bottom: 20px;
            }
            .grade-box {
              text-align: center;
              padding: 20px;
              background: white;
              border-radius: 8px;
              margin: 20px 0;
            }
            .grade {
              font-size: 48px;
              font-weight: bold;
              color: #1e40af;
              margin: 10px 0;
            }
            .footer {
              text-align: center;
              color: #6b7280;
              font-size: 12px;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background: #3b82f6;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Your Health & Longevity Assessment</h1>
          </div>
          
          <div class="content">
            <p>Hello,</p>
            
            <p>Thank you for completing your health assessment. We're pleased to share your results with you.</p>
            
            <div class="grade-box">
              <div style="font-size: 14px; color: #6b7280; margin-bottom: 10px;">Overall Grade</div>
              <div class="grade">${assessment.grade.grade}</div>
              <div style="font-size: 18px; color: #1f2937; margin-top: 10px;">${assessment.grade.meaning}</div>
              <div style="font-size: 16px; color: #6b7280; margin-top: 10px;">
                Total Score: ${totalScore.toFixed(1)}/100
              </div>
            </div>
            
            <p><strong>Assessment Details:</strong></p>
            <ul>
              <li><strong>Title:</strong> ${assessment.title}</li>
              <li><strong>Date:</strong> ${assessmentDate}</li>
            </ul>
            
            <p>Your detailed assessment results are attached as a PDF document. This includes:</p>
            <ul>
              <li>Complete score breakdown across all categories</li>
              <li>Detailed health markers and metrics</li>
              <li>Assessment date and summary</li>
            </ul>
            
            <p>Please review your results and consult with healthcare professionals as needed. This assessment is for informational purposes only and should not replace professional medical advice.</p>
            
            <p>If you have any questions about your results, please don't hesitate to reach out.</p>
            
            <p>Best regards,<br>Health Coach Team</p>
          </div>
          
          <div class="footer">
            <p>This email was sent from your Health Coach account.</p>
            <p>Generated on ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: `health-assessment-${assessment.title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}-${assessment.id}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (emailResult.error) {
      console.error("Email sending error:", emailResult.error);
      return NextResponse.json(
        { error: "Failed to send email", details: emailResult.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email assessment error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to send email";
    return NextResponse.json(
      {
        error: errorMessage,
        success: false,
      },
      { status: 500 }
    );
  }
}

