/**
 * Test: Agent-generated script workflow
 *
 * This demonstrates the recommended pattern for agents:
 * 1. Agent creates HTML with placeholder
 * 2. Agent generates this script
 * 3. Agent runs via run_script
 * 4. Agent checks exitCode
 */

const pptxgen = require('pptxgenjs');
const html2pptx = require('../scripts/html2pptx');
const path = require('path');
const fs = require('fs');

async function main() {
  try {
    // Step 1: Create HTML slide with placeholder (normally agent would write this to a file)
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
<style>
body {
  width: 720pt;
  height: 405pt;
  margin: 0;
  padding: 48pt;
  background: #1C2833;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
}
h1 {
  color: #F4F6F6;
  font-size: 36pt;
  margin: 0 0 16pt 0;
}
p {
  color: #F4F6F6;
  font-size: 18pt;
  margin: 0 0 24pt 0;
}
</style>
</head>
<body>
  <h1>Sales Performance Report</h1>
  <p>Q1-Q4 2024 Revenue Analysis</p>
  <!-- Placeholder for chart -->
  <div id="sales-chart" class="placeholder" style="width: 600pt; height: 240pt;"></div>
</body>
</html>`;

    const htmlPath = path.join(__dirname, 'test-slide-with-chart.html');
    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
    console.log(`Created HTML: ${htmlPath}`);

    // Step 2: Create presentation with chart
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.title = 'Sales Report';

    // Convert HTML to slide
    const { slide, placeholders } = await html2pptx(htmlPath, pptx);
    console.log(`✓ HTML converted successfully`);
    console.log(`  Found ${placeholders.length} placeholder(s):`, placeholders.map(p => p.id));

    // Add chart to placeholder
    const chartPlaceholder = placeholders.find(p => p.id === 'sales-chart');
    if (chartPlaceholder) {
      const chartData = [{
        name: 'Revenue',
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        values: [4500, 5500, 6200, 7100]
      }];

      slide.addChart(pptx.charts.BAR, chartData, {
        ...chartPlaceholder,
        barDir: 'col',
        showTitle: true,
        title: 'Quarterly Revenue ($000s)',
        showCatAxisTitle: true,
        catAxisTitle: 'Quarter',
        showValAxisTitle: true,
        valAxisTitle: 'Revenue',
        chartColors: ['4472C4'],
        showLegend: false,
        valAxisMinVal: 0,
        valAxisMaxVal: 8000
      });

      console.log('✓ Chart added to placeholder');
    } else {
      console.warn('⚠ No chart placeholder found');
    }

    // Save presentation
    const outputPath = path.join(__dirname, '../../../test-agent-workflow-output.pptx');
    await pptx.writeFile({ fileName: outputPath });

    console.log(`✓ Presentation created successfully: ${outputPath}`);
    console.log('\n📊 Summary:');
    console.log(`  - HTML slide with placeholder: ${htmlPath}`);
    console.log(`  - Output PPTX: ${outputPath}`);
    console.log(`  - Chart added to placeholder: ${!!chartPlaceholder}`);

    // Exit with success code
    process.exit(0);

  } catch (error) {
    // Report error and exit with failure code
    console.error(`✗ Error: ${error.message}`);
    process.exit(1);
  }
}

main();
