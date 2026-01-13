# Unit Tests for xlsx Skill Scripts

This directory contains comprehensive unit tests for the xlsx skill Python scripts.

## Test Structure

```
tests/
├── __init__.py                    # Package marker
├── pytest.ini                     # Pytest configuration
├── run_tests.bat                  # Windows test runner
├── run_tests.sh                   # Linux/Mac test runner
├── README.md                      # This file
├── sample_data.csv                # Test fixture data
├── test_analyze_csv.py            # Tests for analyze_csv.py
├── test_create_bar_chart.py       # Tests for create_bar_chart.py
└── test_create_pivot_chart.py     # Tests for create_pivot_chart.py
```

## Prerequisites

Install pytest and required dependencies:

```bash
# Using conda (recommended)
conda activate xlsx-skill
conda install pytest -y

# Or using pip
pip install pytest
```

## Running Tests

### Run all tests

**Windows:**
```cmd
cd D:\ops-data\skills\xlsx\tests
run_tests.bat
```

**Linux/Mac:**
```bash
cd /d/ops-data/skills/xlsx/tests
chmod +x run_tests.sh
./run_tests.sh
```

**Direct pytest:**
```bash
cd D:\ops-data\skills\xlsx\tests
pytest
```

### Run specific test file

```bash
# Test analyze_csv.py only
pytest test_analyze_csv.py

# Test create_bar_chart.py only
pytest test_create_bar_chart.py

# Test create_pivot_chart.py only
pytest test_create_pivot_chart.py
```

### Run specific test

```bash
# Run a specific test method
pytest test_analyze_csv.py::TestAnalyzeCsv::test_analyze_csv_creates_file

# Run all tests in a class
pytest test_create_bar_chart.py::TestCreateBarChart
```

### Verbose output

```bash
pytest -v          # Verbose test names
pytest -vv         # Very verbose with full diffs
pytest -s          # Show print statements
```

## Test Coverage

### test_analyze_csv.py (9 tests)
- ✓ File creation
- ✓ Sheet structure (Data + Summary sheets)
- ✓ Data preservation (all rows and columns)
- ✓ Header formatting (bold, white text, blue background)
- ✓ Summary statistics presence
- ✓ Return value structure
- ✓ Error handling (missing files)
- ✓ Excel file validity

### test_create_bar_chart.py (12 tests)
- ✓ File creation
- ✓ Sheet structure (Data + Chart sheets)
- ✓ Chart object existence and type
- ✓ Count aggregation by x_column
- ✓ Sum aggregation with y_column
- ✓ Chart title presence
- ✓ Return value structure
- ✓ Error handling (invalid columns, missing files)
- ✓ Data preservation
- ✓ Data aggregation correctness
- ✓ Multiple y_column scenarios

### test_create_pivot_chart.py (14 tests)
- ✓ File creation
- ✓ Sheet structure (Data + Pivot sheets)
- ✓ Chart object existence and type
- ✓ Count aggregation function
- ✓ Sum aggregation function
- ✓ Mean aggregation function
- ✓ Unique aggregation function
- ✓ Return value structure
- ✓ Error handling (invalid aggregation, columns, files)
- ✓ Data preservation
- ✓ Pivot data aggregation
- ✓ Chart title correctness

### test_visual_chart_integration.py (5 tests)
- ✓ End-to-end bar chart creation with visual verification
- ✓ End-to-end pivot chart creation with revenue validation
- ✓ Multiple chart type generation (3 different charts)
- ✓ Chart formatting and positioning verification
- ✓ Data and chart alignment validation

**Total: 39 unit tests**

## Test Data

The [sample_data.csv](sample_data.csv) file contains:
- 10 rows of test data
- 4 columns: country, org_name, products, revenue
- Multiple countries: USA (4), Canada (2), UK (2), Germany (1), France (1)

## Expected Test Results

When all tests pass, you should see:

```
================================ test session starts =================================
collected 35 items

test_analyze_csv.py::TestAnalyzeCsv::test_analyze_csv_creates_file PASSED      [  2%]
test_analyze_csv.py::TestAnalyzeCsv::test_analyze_csv_has_correct_sheets PASSED[  5%]
...
test_create_pivot_chart.py::TestCreatePivotChart::test_chart_title_includes_aggregation PASSED [100%]

================================ 35 passed in 2.34s ==================================
```

## Troubleshooting

### Import errors

If you get `ModuleNotFoundError`:
```bash
# Ensure you're in the tests directory
cd D:\ops-data\skills\xlsx\tests

# Or set PYTHONPATH
set PYTHONPATH=D:\ops-data\skills\xlsx
pytest
```

### Missing dependencies

```bash
pip install pandas openpyxl matplotlib pytest
```

### Permission errors on Linux/Mac

```bash
chmod +x run_tests.sh
```

## CI/CD Integration

To integrate with CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Run xlsx skill tests
  run: |
    cd D:/ops-data/skills/xlsx/tests
    pytest --junitxml=test-results.xml
```

## Adding New Tests

When adding new scripts or features:

1. Create test file: `test_<script_name>.py`
2. Follow the existing test structure with a test class
3. Use pytest fixtures for sample data and temp paths
4. Test both success and error cases
5. Verify output file structure and content
6. Check return value format
