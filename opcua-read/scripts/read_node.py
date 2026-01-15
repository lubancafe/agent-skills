#!/usr/bin/env python3
"""
Simple helper script for formatted OPC UA node output.

Usage:
  python read_node.py <nodeId> <value> <dataType> [unit]

Example:
  python read_node.py "ns=2;i=101" "87.3" "Double" "°C"

Output:
  87.3°C
"""

import sys
import json

def format_value(value, data_type, unit=""):
    """Format a value based on its data type."""
    try:
        if data_type in ["Double", "Float"]:
            # Format floating point with appropriate precision
            num = float(value)
            if unit in ["°C", "°F", "K", "bar", "psi", "Pa"]:
                # Temperature and pressure: 1 decimal
                formatted = f"{num:.1f}"
            elif unit in ["L/min", "m³/h", "gpm"]:
                # Flow rates: 1 decimal
                formatted = f"{num:.1f}"
            elif unit in ["%"]:
                # Percentages: whole number
                formatted = f"{int(num)}"
            else:
                # Default: 2 decimals
                formatted = f"{num:.2f}"
        elif data_type in ["Int32", "Int16", "UInt32", "UInt16"]:
            # Integer values
            formatted = str(int(float(value)))
        elif data_type == "Boolean":
            # Boolean values
            bool_val = str(value).lower() in ["true", "1", "yes"]
            formatted = "True" if bool_val else "False"
        elif data_type == "String":
            # String values
            formatted = str(value)
        else:
            # Unknown type: return as-is
            formatted = str(value)

        # Add unit if provided
        if unit:
            return f"{formatted}{unit}"
        else:
            return formatted

    except Exception as e:
        # If formatting fails, return original value
        return str(value)

def main():
    if len(sys.argv) < 4:
        print(json.dumps({
            "error": "Usage: read_node.py <nodeId> <value> <dataType> [unit]"
        }))
        sys.exit(1)

    node_id = sys.argv[1]
    value = sys.argv[2]
    data_type = sys.argv[3]
    unit = sys.argv[4] if len(sys.argv) > 4 else ""

    # Format the value
    formatted_value = format_value(value, data_type, unit)

    # Output as JSON for easy parsing
    result = {
        "nodeId": node_id,
        "value": value,
        "dataType": data_type,
        "formatted": formatted_value
    }

    print(json.dumps(result))

if __name__ == "__main__":
    main()
