# PPTX Skill Installation Guide

This directory contains installation files for the PPTX skill dependencies.

## Prerequisites

- Node.js >= 18.0.0
- Python >= 3.8
- npm (comes with Node.js)
- pip (comes with Python)

## Installation Steps

### 1. Install Node.js Dependencies

The PPTX skill requires several npm packages for HTML to PowerPoint conversion.

#### Option A: Install globally (Recommended for command-line use)

```bash
cd D:\ops-data\skills\pptx\install
npm install -g pptxgenjs playwright sharp react-icons
npx playwright install chromium --with-deps
```

#### Option B: Install locally in this directory

```bash
cd D:\ops-data\skills\pptx\install
npm install
```

**Note:** If you have `react` and `react-dom` already installed in your main project (like `D:\genai\ops-edge-app`), the peerDependencies will be satisfied automatically.

### 2. Install Python Dependencies

The PPTX skill includes Python scripts for presentation manipulation.

```bash
pip install -r requirements.txt
```

Or install packages individually:

```bash
pip install python-pptx Pillow defusedxml lxml six markitdown[pptx]
```

### 3. Verify Installation

#### Verify Node.js packages:

```bash
node -e "console.log(require('pptxgenjs'))"
node -e "console.log(require('playwright'))"
node -e "console.log(require('sharp'))"
```

All commands should output module information without errors.

#### Verify Python packages:

```bash
python -c "import pptx; print(pptx.__version__)"
python -c "from PIL import Image; print(Image.__version__)"
python -c "import defusedxml; print('OK')"
```

### 4. Test the html2pptx.js Library

```bash
cd D:\ops-data\skills\pptx\scripts
node -e "const h2p = require('./html2pptx.js'); console.log('html2pptx loaded successfully');"
```

## Dependencies Overview

### Node.js Dependencies

| Package | Purpose |
|---------|---------|
| `pptxgenjs` | PowerPoint generation library |
| `playwright` | Headless browser for HTML rendering |
| `sharp` | Image processing and SVG rasterization |
| `react-icons` | Icon library for visual elements |
| `react` | Peer dependency for react-icons |
| `react-dom` | Peer dependency for react-icons |

### Python Dependencies

| Package | Purpose |
|---------|---------|
| `python-pptx` | Core PPTX manipulation |
| `Pillow` | Image processing for thumbnails |
| `defusedxml` | Secure XML parsing |
| `lxml` | OOXML validation |
| `six` | Python 2/3 compatibility |
| `markitdown[pptx]` | Markdown to PPTX conversion (optional) |

## Troubleshooting

### Error: "Cannot find module 'pptxgenjs'"

This means npm packages are not installed or not in the correct location.

**Solution:**
- If installed globally: Ensure your `NODE_PATH` environment variable includes the global node_modules directory
- If installed locally: Run scripts from the install directory or set `NODE_PATH=D:\ops-data\skills\pptx\install\node_modules`

### Error: "Executable doesn't exist at ..." (Playwright)

Playwright browsers are not installed.

**Solution:**
```bash
npx playwright install chromium --with-deps
```

### Error: "Script not found: pptx/html2pptx_from_markdown.py"

This error occurs when the React agent expects a Python wrapper script that doesn't exist. The PPTX skill uses a **JavaScript-based workflow**, not a Python script for HTML to PPTX conversion.

**Solution:**
Ensure you're using the `html2pptx.js` library correctly (see [../html2pptx.md](../html2pptx.md) for usage).

## Usage After Installation

Once installed, you can use the PPTX skill scripts:

### Create presentations from HTML:
```bash
node your-script.js  # Use html2pptx.js library
```

### Manipulate existing presentations:
```bash
python D:\ops-data\skills\pptx\scripts\inventory.py input.pptx output.json
python D:\ops-data\skills\pptx\scripts\replace.py input.pptx replacement.json output.pptx
python D:\ops-data\skills\pptx\scripts\thumbnail.py input.pptx
```

## Additional Resources

- [SKILL.md](../SKILL.md) - Complete PPTX skill documentation
- [html2pptx.md](../html2pptx.md) - HTML to PowerPoint conversion guide
- [ooxml.md](../ooxml.md) - OOXML editing guide
