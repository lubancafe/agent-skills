# xlsx Skill Setup

## Prerequisites

This skill requires Python 3.8+ with pandas, openpyxl, and matplotlib in an isolated environment.

## Installation

### Option 1: Conda Environment (Recommended)

```bash
# Create conda environment
conda create -n xlsx-skill python=3.11 -y

# Activate environment
conda activate xlsx-skill

# Install packages
conda install pandas openpyxl matplotlib -y
```

### Option 2: Python Virtual Environment

```bash
# Create virtual environment
python -m venv D:\ops-data\skills\xlsx\.venv

# Activate (Windows)
D:\ops-data\skills\xlsx\.venv\Scripts\activate

# Activate (Linux/macOS)
source D:\ops-data\skills\xlsx\.venv/bin/activate

# Install packages
pip install -r requirements.txt
```

### LibreOffice (for recalc.py only)

- **Windows**: Download from https://www.libreoffice.org/download/
- **Linux**: `sudo apt install libreoffice`
- **macOS**: `brew install --cask libreoffice`

## Configuration for ops-edge-app

The ops-edge-app SkillsConnector needs to know which Python interpreter to use.

### If using conda:
```json
{
  "skillsPath": "D:\\ops-data\\skills",
  "pythonPath": "C:\\Users\\<USER>\\anaconda3\\envs\\xlsx-skill\\python.exe"
}
```

### If using venv:
```json
{
  "skillsPath": "D:\\ops-data\\skills",
  "pythonPath": "D:\\ops-data\\skills\\xlsx\\.venv\\Scripts\\python.exe"
}
```

## Verification

After installation, test the scripts:

```bash
# Activate environment first!
conda activate xlsx-skill  # or activate .venv

# Test analyze_csv
python analyze_csv.py test.csv output.xlsx

# Test bar chart
python create_bar_chart.py test.csv chart.xlsx country

# Test pivot chart
python create_pivot_chart.py test.csv pivot.xlsx country org_name count
```

## Security

**Environment Isolation**:
- ✅ Dedicated conda/venv environment
- ✅ No system-wide package modifications
- ✅ Scripts only accept file paths (no code execution)
- ✅ No network access required
- ✅ Read/write limited to provided paths

**Best Practice**: Use conda environment for better isolation and reproducibility.

## Troubleshooting

### "python: command not found"

**Solution**: Activate the environment first
```bash
conda activate xlsx-skill
```

### ModuleNotFoundError

**Solution**: Verify packages in environment
```bash
conda list  # or pip list
```

### Permission denied

**Solution**: Ensure Python has write access to output directory
```bash
chmod +w D:\ops-data  # Linux/macOS
```
