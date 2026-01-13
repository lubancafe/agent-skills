# Quick Start: Unit Testing xlsx Scripts

## 1. Install Dependencies

```bash
# Activate your Python environment
conda activate xlsx-skill

# Install test dependencies
pip install -r ../requirements.txt
```

## 2. Run Tests

**Windows:**
```cmd
run_tests.bat
```

**Linux/Mac:**
```bash
./run_tests.sh
```

## 3. Expected Output

```
======================================== test session starts =========================================
collected 35 items

test_analyze_csv.py ........                                                                  [ 25%]
test_create_bar_chart.py ............                                                        [ 60%]
test_create_pivot_chart.py ..............                                                    [100%]

======================================== 35 passed in 2.34s ==========================================
```

## 4. Test Individual Scripts

```bash
# Test analyze_csv.py only
pytest test_analyze_csv.py -v

# Test create_bar_chart.py only
pytest test_create_bar_chart.py -v

# Test create_pivot_chart.py only
pytest test_create_pivot_chart.py -v
```

## 5. Common Issues

**Import errors:**
```bash
# Make sure you're in the tests directory
cd D:\ops-data\skills\xlsx\tests
```

**Missing pytest:**
```bash
pip install pytest
```

## 6. What Gets Tested

### analyze_csv.py
- Creates Excel file with Data + Summary sheets
- Preserves all CSV data
- Formats headers (bold, blue background, white text)
- Generates summary statistics
- Handles errors (missing files)

### create_bar_chart.py
- Creates Excel file with Data + Chart sheets
- Generates bar charts
- Supports count aggregation (default)
- Supports sum aggregation with y_column
- Validates data aggregation
- Handles errors (invalid columns, missing files)

### create_pivot_chart.py
- Creates Excel file with Data + Pivot sheets
- Generates pivot tables with charts
- Supports 4 aggregation functions: count, sum, mean, unique
- Validates pivot calculations
- Handles errors (invalid aggregations, missing files)

## 7. Next Steps

After unit tests pass, proceed to:
- Integration testing with ops-edge-app
- End-to-end testing with react edge agent
- Testing remote_use_skill action flow
