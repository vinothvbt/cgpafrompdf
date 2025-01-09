document.getElementById("calculateBtn").addEventListener("click", async () => {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please upload a PDF file.");
    return;
  }

  const grades = [];
  const subjectCodes = [];
  const pdfText = await extractTextFromPDF(file);

  // Clean non-ASCII characters and split text into lines
  const cleanedText = pdfText.replace(/[^\x00-\x7F]/g, ""); // Remove special characters
  const lines = cleanedText.split("\n");

  lines.forEach((line) => {
    // Adjust regex patterns to match your PDF format
    const gradeMatch = line.match(/Grade\s*:\s*([A-Z+]+)/); // Matches "Grade: A+" or similar
    const codeMatch = line.match(/Subject\s*Code\s*:\s*([A-Z0-9]+)/); // Matches "Subject Code: PH23221"

    if (gradeMatch && codeMatch) {
      grades.push(gradeMatch[1].trim());
      subjectCodes.push(codeMatch[1].trim());
    }
  });

  // Debugging: Log extracted data
  console.log("Extracted Grades:", grades);
  console.log("Extracted Subject Codes:", subjectCodes);

  // Define subject credits using subject codes
  const creditMap = {
    PH23221: 1,
    PH23211: 3,
    MA23211: 4,
    HS23211: 2,
    GE23221: 1,
    GE23213: 2,
    GE23211: 3,
    AD23221: 1,
    AD23211: 3,
  };

  // Map grades to grade points
  const gradePoints = grades.map(convertGradeToPoint);

  // Get the corresponding credit points for each subject
  const credits = subjectCodes.map((code) => creditMap[code] || 2); // Default credit = 2

  // Debugging: Log grade points and credits
  console.log("Grade Points:", gradePoints);
  console.log("Credits:", credits);

  // Check if valid data was extracted
  if (gradePoints.length === 0 || credits.length === 0) {
    alert("No valid data found. Please check the PDF format.");
    return;
  }

  // Calculate CGPA
  const cgpa = calculateWeightedCGPA(gradePoints, credits);

  // Debugging: Log intermediate CGPA calculation values
  console.log("CGPA:", cgpa);

  // Display the CGPA
  document.getElementById("result").innerText = `CGPA: ${cgpa.toFixed(2)}`;
});

async function extractTextFromPDF(file) {
  const fileReader = new FileReader();
  const pdfData = await new Promise((resolve) => {
    fileReader.onload = () => resolve(new Uint8Array(fileReader.result));
    fileReader.readAsArrayBuffer(file);
  });

  const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item) => item.str).join(" ");
  }
  return text;
}

function convertGradeToPoint(grade) {
  const gradeMap = {
    O: 10,
    "A+": 9,
    A: 8,
    "B+": 7,
    B: 6,
    C: 5,
    D: 4,
    E: 3,
    F: 0,
  };
  return gradeMap[grade.toUpperCase()] || 0;
}

function calculateWeightedCGPA(gradePoints, credits) {
  let totalPoints = 0;
  let totalCredits = 0;

  gradePoints.forEach((gp, index) => {
    totalPoints += gp * credits[index];
    totalCredits += credits[index];
  });

  console.log("Total Points:", totalPoints); // Debugging
  console.log("Total Credits:", totalCredits); // Debugging

  return totalCredits > 0 ? totalPoints / totalCredits : 0; // Avoid division by zero
}
