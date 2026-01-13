#!/bin/bash
# Unit test runner for xlsx skill Python scripts
# Usage: ./run_tests.sh [test_file]

echo "========================================"
echo "Running xlsx skill unit tests"
echo "========================================"
echo

# Check if pytest is installed
if ! python -c "import pytest" 2>/dev/null; then
    echo "ERROR: pytest is not installed"
    echo "Please install it with: pip install pytest"
    exit 1
fi

# Run tests
if [ -z "$1" ]; then
    echo "Running all tests..."
    pytest
else
    echo "Running tests from $1..."
    pytest "$1"
fi

echo
echo "========================================"
echo "Test run complete"
echo "========================================"
