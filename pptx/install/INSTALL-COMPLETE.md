# PPTX Skill Installation - Complete Guide

This document explains how to set up the PPTX skill to work properly with ops-edge-app.

## Summary of the Issue

The PPTX skill requires Node.js packages (pptxgenjs, playwright, sharp, react-icons) to convert HTML to PowerPoint presentations. When the React agent tried to use the skill, it failed with:

```
Error: Script not found: pptx/html2pptx_from_markdown.py
```

This revealed two issues:
1. The agent expected a Python wrapper script that didn't exist
2. Even after fixing that, Node.js couldn't find the required npm packages

## Root Cause

Node.js module resolution only searches:
- Local `node_modules` directories (current directory and parents)
- Paths in the `NODE_PATH` environment variable

Globally installed npm packages (`npm install -g`) are NOT automatically found by Node.js scripts.

## Complete Solution

### 1. Install Dependencies

#### Node.js packages (Already Completed):
```bash
cd D:\ops-data\skills\pptx\install
npm install
```

This installs packages locally in `D:\ops-data\skills\pptx\install\node_modules`.

#### Python packages:
```bash
pip install -r D:\ops-data\skills\pptx\install\requirements.txt
```

### 2. Set NODE_PATH Environment Variable (Already Completed)

You've already set this system-wide via Windows Environment Variables:

```
Variable: NODE_PATH
Value: C:\nvm4w\nodejs\node_modules
```

This makes globally installed npm packages available to all Node.js scripts.

### 3. Update ops-edge-app Skills Connector (Just Completed)

The `skills.ts` file has been updated to automatically add the skill's local `node_modules` to NODE_PATH when running Node.js scripts.

**Change made to** [skills.ts](D:\genai\ops-edge-app\src\connectors\skills.ts):

```typescript
// Set up environment variables for script execution
const env = { ...process.env };

// For Node.js scripts, add skill's local node_modules to NODE_PATH
if (scriptType === 'node') {
  const skillInstallModules = path.join(skillDir, 'install', 'node_modules');
  if (fs.existsSync(skillInstallModules)) {
    const existingNodePath = env.NODE_PATH || '';
    env.NODE_PATH = existingNodePath
      ? `${skillInstallModules}${path.delimiter}${existingNodePath}`
      : skillInstallModules;
    console.log(`[Skills:${this._id}] Added to NODE_PATH: ${skillInstallModules}`);
  }
}

const proc = spawn(command, commandArgs, {
  cwd,
  timeout: 60000,
  shell: false,
  env,  // <-- Now passes the updated environment
});
```

This means:
- When running a Node.js script from the PPTX skill
- ops-edge-app automatically adds `D:\ops-data\skills\pptx\install\node_modules` to NODE_PATH
- The script can now `require('pptxgenjs')`, `require('playwright')`, etc.

### 4. Rebuild ops-edge-app (Already Completed)

You've rebuilt ops-edge-app manually to include the updated skills.ts.

## How It Works Now

When the React agent calls `run_script` with a Node.js script:

```json
{
  "skill": "pptx",
  "script": "scripts/html2pptx.js",
  "args": ["input.html", "output.pptx"],
  "type": "node",
  "connectorId": "local-files"
}
```

ops-edge-app will:

1. Locate the script: `D:\ops-data\skills\pptx\scripts\html2pptx.js`
2. Set working directory to the connector's mount path (if connectorId provided)
3. **Automatically add** `D:\ops-data\skills\pptx\install\node_modules` to NODE_PATH
4. Run: `node scripts/html2pptx.js input.html output.pptx`
5. The script can now successfully `require('pptxgenjs')`, `require('playwright')`, etc.

## Verification

Test that the modules are accessible:

```bash
# From any directory - should work because of system NODE_PATH
node -e "console.log(require('pptxgenjs'))"

# From the skill install directory - should work from local node_modules
cd D:\ops-data\skills\pptx\install
node -e "console.log(require('pptxgenjs'))"
```

## Module Resolution Priority

With the complete setup, Node.js will search for modules in this order:

1. `./node_modules` (current working directory)
2. `../node_modules`, `../../node_modules`, etc. (parent directories)
3. `D:\ops-data\skills\pptx\install\node_modules` (added by ops-edge-app)
4. `C:\nvm4w\nodejs\node_modules` (global, from system NODE_PATH)

This ensures maximum compatibility!

## Benefits

✅ **No Python wrapper needed** - Direct Node.js script execution
✅ **Automatic dependency resolution** - ops-edge-app handles NODE_PATH
✅ **Works from any directory** - System NODE_PATH as fallback
✅ **Skill-specific packages** - Each skill can have its own dependencies
✅ **No global pollution** - Packages in skill's install folder don't affect other projects

## Troubleshooting

### "Cannot find module 'pptxgenjs'"

1. Check system NODE_PATH is set: `echo %NODE_PATH%` (CMD) or `$env:NODE_PATH` (PowerShell)
2. Verify local installation: `ls D:\ops-data\skills\pptx\install\node_modules`
3. Restart your terminal/IDE after setting environment variables
4. Rebuild ops-edge-app if you modified skills.ts

### Script still fails

1. Check ops-edge-app logs for NODE_PATH messages
2. Verify script type is set to "node" not "javascript"
3. Check that playwright browser is installed: `npx playwright install chromium`

## Next Steps

The PPTX skill is now ready to use! The React agent can:
- Load the skill with `load_skill`
- Run Node.js scripts with `run_script`
- Access reference files with `read_reference`

All npm dependencies will be automatically resolved by ops-edge-app.
