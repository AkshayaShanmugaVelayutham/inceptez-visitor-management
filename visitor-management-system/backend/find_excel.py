"""
FIND AND OPEN EXCEL FILE - Works with WPS Office
Also updates Excel with latest database data!
"""
import os
from pathlib import Path
import sys

print("="*70)
print("🔍 FINDING AND UPDATING EXCEL FILE...")
print("="*70)

# First, trigger rebuild to ensure latest data
print("\n🔄 Updating Excel with latest database data...")
print("   (This ensures all visitors are in the Excel file)\n")

# Import and run the rebuild function
try:
    # Add current directory to path
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    
    # Import Flask app
    from app import app, rebuild_excel, EXCEL_FILE
    
    # Use app context to access database
    with app.app_context():
        rebuild_excel()
    
    # Now find and open the file
    print("\n📂 Excel file location:")
    print(f"   {EXCEL_FILE}")
    
    if os.path.exists(EXCEL_FILE):
        size = os.path.getsize(EXCEL_FILE)
        print(f"   ✅ File exists! ({size} bytes)")
        print(f"\n🚀 Opening Excel file in WPS Office/Excel...")
        
        try:
            os.startfile(EXCEL_FILE)
            print(f"   ✅ File opened successfully!")
        except Exception as e:
            print(f"   ⚠️ Auto-open failed: {e}")
            print(f"\n   📝 Manually open this file:")
            print(f"      {EXCEL_FILE}")
    else:
        print(f"   ❌ File not found!")
        print(f"\n   💡 Make sure you've added at least one visitor first.")
    
except Exception as e:
    print(f"\n❌ Error: {e}")
    print(f"\n💡 Make sure:")
    print(f"   1. You're in the backend folder")
    print(f"   2. Backend dependencies are installed (pip install -r requirements.txt)")
    import traceback
    traceback.print_exc()

print("\n" + "="*70)
input("\nPress Enter to close...")

