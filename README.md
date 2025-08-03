# RIT Chennai CGPA Calculator

A web-based tool to automatically calculate CGPA from Rajalakshmi Institute of Technology Chennai mark sheet PDFs.

## Features

- **PDF Upload**: Upload your official RIT Chennai mark sheet PDF
- **Automatic Extraction**: Automatically extracts subject codes and grades from the PDF
- **CGPA Calculation**: Calculates CGPA using the standard 10-point grading system
- **Detailed Breakdown**: View subject-wise breakdown with credits and grade points
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Comprehensive error handling and user feedback

## How to Use

1. **Upload PDF**: Click "Choose File" and select your RIT Chennai mark sheet PDF
2. **Calculate**: Click "Calculate CGPA" to process the document
3. **View Results**: See your calculated CGPA and detailed subject breakdown

## Grading System

This tool uses the standard 10-point grading system:

| Grade | Points | Description |
|-------|--------|-------------|
| O     | 10     | Outstanding |
| A+    | 9      | Excellent   |
| A     | 8      | Very Good   |
| B+    | 7      | Good        |
| B     | 6      | Above Average |
| C     | 5      | Average     |
| D     | 4      | Below Average |
| E     | 3      | Poor        |
| F     | 0      | Fail        |

## Credit System

The tool includes a comprehensive credit mapping for RIT Chennai subjects:

- **Theory Subjects**: Usually 3-4 credits
- **Lab Subjects**: Usually 1 credit
- **Mathematics**: 4 credits
- **Project Work**: 6-10 credits

## Technical Details

- Built with vanilla JavaScript and HTML5
- Uses PDF.js for PDF text extraction
- No server required - runs entirely in the browser
- Responsive CSS design with modern UI

## Browser Compatibility

- Chrome/Chromium (Recommended)
- Firefox
- Safari
- Edge

## File Structure

```
cgpafrompdf/
├── index.html          # Main application file
├── pdf.mjs            # PDF.js library
├── pdf.worker.mjs     # PDF.js web worker
├── script.js.backup   # Backup of old script
└── README.md          # This file
```

## Development

To run locally:

1. Clone the repository
2. Start a local web server (e.g., `python3 -m http.server 8000`)
3. Open `http://localhost:8000` in your browser

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Notes

- Ensure your PDF is readable and not password protected
- The tool works best with official RIT Chennai mark sheets
- For manual verification, check the subject-wise breakdown
- Contact your academic office for any discrepancies

## License

This project is open source and available under the MIT License.

## Disclaimer

This tool is for educational purposes. Always verify your CGPA with official academic records.