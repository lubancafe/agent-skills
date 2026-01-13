@echo off
REM Unit test runner for xlsx skill Python scripts
REM Usage: run_tests.bat [test_file]

echo ========================================
echo Running xlsx skill unit tests
echo ========================================
echo.

REM Check if pytest is installed
python -c "import pytest" 2>NUL
if errorlevel 1 (
    echo ERROR: pytest is not installed
    echo Please install it with: pip install pytest
    exit /b 1
)

REM Run tests
if "%1"=="" (
    echo Running all tests...
    pytest
) else (
    echo Running tests from %1...
    pytest %1
)

echo.
echo ========================================
echo Test run complete
echo ========================================
