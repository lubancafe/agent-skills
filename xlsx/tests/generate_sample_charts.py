"""
Generate sample Excel charts for visual inspection

This script creates several Excel files with charts in the tests directory
for manual inspection and verification.
"""
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from create_bar_chart import create_bar_chart
from create_pivot_chart import create_pivot_chart

# Paths
script_dir = os.path.dirname(os.path.abspath(__file__))
sample_csv = os.path.join(script_dir, 'sample_data.csv')
output_dir = script_dir

print("Generating sample Excel charts...")
print(f"Input CSV: {sample_csv}")
print(f"Output directory: {output_dir}\n")

# 1. Bar chart - Count by country
print("1. Creating bar chart: country_counts_bar_chart.xlsx")
output1 = os.path.join(output_dir, 'country_counts_bar_chart.xlsx')
result1 = create_bar_chart(sample_csv, output1, 'country')
print(f"   [OK] Status: {result1['status']}")
print(f"   [OK] File: {output1}")
print(f"   [OK] Data points: {result1['data_points']}\n")

# 2. Pivot chart - Revenue sum by country
print("2. Creating pivot chart: revenue_by_country_pivot.xlsx")
output2 = os.path.join(output_dir, 'revenue_by_country_pivot.xlsx')
result2 = create_pivot_chart(sample_csv, output2, 'country', 'revenue', 'sum')
print(f"   [OK] Status: {result2['status']}")
print(f"   [OK] File: {output2}")
print(f"   [OK] Groups: {result2['groups']}\n")

# 3. Pivot chart - Average products by country
print("3. Creating pivot chart: avg_products_by_country.xlsx")
output3 = os.path.join(output_dir, 'avg_products_by_country.xlsx')
result3 = create_pivot_chart(sample_csv, output3, 'country', 'products', 'mean')
print(f"   [OK] Status: {result3['status']}")
print(f"   [OK] File: {output3}")
print(f"   [OK] Groups: {result3['groups']}\n")

# 4. Bar chart - Count by organization
print("4. Creating bar chart: org_counts_bar_chart.xlsx")
output4 = os.path.join(output_dir, 'org_counts_bar_chart.xlsx')
result4 = create_bar_chart(sample_csv, output4, 'org_name')
print(f"   [OK] Status: {result4['status']}")
print(f"   [OK] File: {output4}")
print(f"   [OK] Data points: {result4['data_points']}\n")

print("=" * 60)
print("All charts generated successfully!")
print("=" * 60)
print("\nGenerated files:")
print(f"  1. {output1}")
print(f"  2. {output2}")
print(f"  3. {output3}")
print(f"  4. {output4}")
print("\nYou can now open these files in Excel to view the charts.")
