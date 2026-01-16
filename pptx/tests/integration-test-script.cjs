// Integration test script
const pptxgen = require('pptxgenjs');
const path = require('path');

// Use SKILL_DIR environment variable (automatically set by skills connector)
const html2pptx = require(path.join(process.env.SKILL_DIR || __dirname, 'scripts', 'html2pptx'));

async function main() {
  try {
    console.log('Working directory:', process.cwd());
    console.log('SKILL_DIR:', process.env.SKILL_DIR);

    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.title = 'Integration Test Presentation';

    // Convert each HTML file to a slide (files are in the working directory)
    await html2pptx(path.join(process.cwd(), 'slide1.html'), pptx);
    await html2pptx(path.join(process.cwd(), 'slide2.html'), pptx);

    await pptx.writeFile({ fileName: path.join(process.cwd(), 'integration-test.pptx') });
    console.log('✓ Presentation created: integration-test.pptx');
    process.exit(0);

  } catch (error) {
    console.error(`✗ Error: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
