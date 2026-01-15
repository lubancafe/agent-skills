/**
 * Unit test for html2pptx.js
 *
 * NOTE: The edge-skills-slides.html file contains multiple slides in one HTML document,
 * but html2pptx expects a single slide per HTML file (with body dimensions matching the slide).
 *
 * This test creates a simple test HTML to validate html2pptx functionality.
 */

const pptxgen = require('pptxgenjs');
const html2pptx = require('../scripts/html2pptx.js');
const path = require('path');
const fs = require('fs');

// Create a test HTML file that matches the expected format
function createTestHtml() {
  const testHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Test Slide</title>
  <style>
    /* Body dimensions must match presentation layout: 10" × 5.625" for 16:9 */
    body {
      width: 960px;  /* 10 inches × 96 DPI */
      height: 540px; /* 5.625 inches × 96 DPI */
      margin: 0;
      padding: 48px 36px;
      box-sizing: border-box;
      background: #1C2833;
      font-family: Arial, sans-serif;
    }
    h1 {
      color: #F4F6F6;
      font-size: 48pt;
      margin: 0 0 24px 0;
    }
    p {
      color: #F4F6F6;
      font-size: 20pt;
      margin: 0;
    }
  </style>
</head>
<body>
  <h1>HTML to PPTX Test</h1>
  <p>This is a test slide created by html2pptx.js</p>
  <p style="margin-top: 12px;">If you can see this in PowerPoint, the conversion works!</p>
</body>
</html>`;

  const testHtmlPath = path.join(__dirname, 'test-slide.html');
  fs.writeFileSync(testHtmlPath, testHtml, 'utf8');
  return testHtmlPath;
}

async function testHtml2Pptx() {
  console.log('Starting HTML to PPTX conversion test...\n');

  const testHtmlFile = createTestHtml();
  const outputFile = path.join(__dirname, '../../../test-html2pptx-output.pptx');

  console.log(`Input HTML: ${testHtmlFile}`);
  console.log(`Output PPTX: ${outputFile}\n`);

  try {
    // Create presentation
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';

    console.log('Converting HTML to slide...');

    // Convert HTML to slide
    const { slide, placeholders } = await html2pptx(testHtmlFile, pptx);

    console.log(`✓ Conversion successful!`);
    console.log(`  - Slide created`);
    console.log(`  - ${placeholders.length} placeholder(s) found`);
    if (placeholders.length > 0) {
      console.log(`  - Placeholders:`, placeholders);
    }

    // Write PPTX file
    console.log(`\nWriting PPTX file...`);
    await pptx.writeFile({ fileName: outputFile });

    console.log(`✓ PPTX file created: ${outputFile}`);
    console.log('\nTest completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   - Open the PPTX file in PowerPoint to verify the output');
    console.log('   - The edge-skills-slides.html needs to be split into individual HTML files');
    console.log('     (one per slide) to be converted with html2pptx');

  } catch (error) {
    console.error('✗ Test failed:');
    console.error(error.message);
    process.exit(1);
  }
}

testHtml2Pptx();
