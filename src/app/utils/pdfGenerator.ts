import puppeteer from "puppeteer";
import { Assessment } from "../types/wellness";

export async function generateAssessmentPDF(assessment: Assessment): Promise<Buffer> {
  const html = generateHTML(assessment);
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        right: "15mm",
        bottom: "20mm",
        left: "15mm",
      },
    });
    
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}

function generateHTML(assessment: Assessment): string {
  const { form_data, scores, grade, title, created_at } = assessment;
  const date = new Date(created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  // Calculate total score if not present
  const scoresRecord = scores as Record<string, number>;
  const totalScore = scoresRecord.total || 
    Object.values(scoresRecord).reduce((a: number, b: number) => a + b, 0);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      color: #1f2937;
      line-height: 1.6;
      background: #f8fafc;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 40px;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 30px;
      border-bottom: 3px solid #3b82f6;
    }
    .header h1 {
      font-size: 32px;
      color: #1e40af;
      margin-bottom: 10px;
    }
    .header .subtitle {
      color: #6b7280;
      font-size: 16px;
    }
    .grade-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      border-radius: 12px;
      text-align: center;
      margin-bottom: 40px;
    }
    .grade-section .grade {
      font-size: 72px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .grade-section .meaning {
      font-size: 24px;
      margin-bottom: 10px;
      opacity: 0.95;
    }
    .grade-section .total-score {
      font-size: 18px;
      opacity: 0.9;
    }
    .scores-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 40px;
    }
    .score-card {
      background: #f9fafb;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #3b82f6;
    }
    .score-card h3 {
      font-size: 14px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
    }
    .score-value {
      font-size: 32px;
      font-weight: bold;
      color: #1e40af;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 20px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e5e7eb;
    }
    .details-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
    .detail-item {
      padding: 12px;
      background: #f9fafb;
      border-radius: 6px;
    }
    .detail-label {
      font-size: 12px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .detail-value {
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
      text-align: center;
      color: #6b7280;
      font-size: 12px;
    }
    @media print {
      body {
        background: white;
      }
      .container {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Health & Longevity Assessment</h1>
      <div class="subtitle">${title}</div>
      <div class="subtitle" style="margin-top: 5px;">${date}</div>
    </div>

    <div class="grade-section">
      <div class="grade">${grade.grade}</div>
      <div class="meaning">${grade.meaning}</div>
      <div class="total-score">Total Score: ${totalScore.toFixed(1)}/100</div>
    </div>

    <div class="section">
      <h2 class="section-title">Score Breakdown</h2>
      <div class="scores-grid">
        ${Object.entries(scores)
          .map(
            ([key, value]) => `
          <div class="score-card">
            <h3>${key.replace(/([A-Z])/g, " $1").replace(/^\w/, (c) => c.toUpperCase())}</h3>
            <div class="score-value">${typeof value === "number" ? value.toFixed(1) : value}/100</div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Assessment Details</h2>
      <div class="details-grid">
        ${form_data.age ? `<div class="detail-item"><div class="detail-label">Age</div><div class="detail-value">${form_data.age}</div></div>` : ""}
        ${form_data.sex ? `<div class="detail-item"><div class="detail-label">Sex</div><div class="detail-value">${form_data.sex}</div></div>` : ""}
        ${form_data.waistHeightRatio ? `<div class="detail-item"><div class="detail-label">Waist/Height Ratio</div><div class="detail-value">${form_data.waistHeightRatio}</div></div>` : ""}
        ${form_data.bodyFat ? `<div class="detail-item"><div class="detail-label">Body Fat</div><div class="detail-value">${form_data.bodyFat}%</div></div>` : ""}
        ${form_data.vo2Max ? `<div class="detail-item"><div class="detail-label">VO2 Max</div><div class="detail-value">${form_data.vo2Max} ml/kg/min</div></div>` : ""}
        ${form_data.gripStrength ? `<div class="detail-item"><div class="detail-label">Grip Strength</div><div class="detail-value">${form_data.gripStrength} kg</div></div>` : ""}
        ${form_data.smm ? `<div class="detail-item"><div class="detail-label">Skeletal Muscle Mass</div><div class="detail-value">${form_data.smm} kg</div></div>` : ""}
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Health Markers</h2>
      <div class="details-grid">
        ${form_data.systolic && form_data.diastolic ? `<div class="detail-item"><div class="detail-label">Blood Pressure</div><div class="detail-value">${form_data.systolic}/${form_data.diastolic} mmHg</div></div>` : ""}
        ${form_data.a1c ? `<div class="detail-item"><div class="detail-label">HbA1c</div><div class="detail-value">${form_data.a1c}%</div></div>` : ""}
        ${form_data.totalCholesterol ? `<div class="detail-item"><div class="detail-label">Total Cholesterol</div><div class="detail-value">${form_data.totalCholesterol} mg/dL</div></div>` : ""}
        ${form_data.ldl ? `<div class="detail-item"><div class="detail-label">LDL</div><div class="detail-value">${form_data.ldl} mg/dL</div></div>` : ""}
        ${form_data.hdl ? `<div class="detail-item"><div class="detail-label">HDL</div><div class="detail-value">${form_data.hdl} mg/dL</div></div>` : ""}
        ${form_data.triglycerides ? `<div class="detail-item"><div class="detail-label">Triglycerides</div><div class="detail-value">${form_data.triglycerides} mg/dL</div></div>` : ""}
        ${form_data.apoB ? `<div class="detail-item"><div class="detail-label">ApoB</div><div class="detail-value">${form_data.apoB} mg/dL</div></div>` : ""}
        ${form_data.lpa ? `<div class="detail-item"><div class="detail-label">Lp(a)</div><div class="detail-value">${form_data.lpa} nmol/L</div></div>` : ""}
      </div>
    </div>

    <div class="footer">
      <p>This assessment is for informational purposes only and should not replace professional medical advice.</p>
      <p style="margin-top: 10px;">Generated on ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
    </div>
  </div>
</body>
</html>
  `;
}

