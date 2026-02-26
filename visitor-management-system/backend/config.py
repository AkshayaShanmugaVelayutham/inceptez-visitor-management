# ========================================
# 📁 EXCEL FILE CONFIGURATION
# ========================================

import os
from pathlib import Path

# ========================================
# SAVE TO BACKEND FOLDER (EASY TO FIND!)
# ========================================

# This saves Excel in the SAME folder as the backend code
# You can always find it in: visitor-management-system/backend/
EXCEL_FILE_PATH = 'Inceptez_Visitors_Log.xlsx'

# ========================================
# WANT DESKTOP? UNCOMMENT THESE LINES:
# ========================================

# desktop = os.path.join(Path.home(), 'Desktop')
# EXCEL_FILE_PATH = os.path.join(desktop, 'Inceptez_Visitors_Log.xlsx')

# ========================================
# WANT D DRIVE? UNCOMMENT THIS:
# ========================================

# EXCEL_FILE_PATH = r'D:\Inceptez\Visitors_Log.xlsx'
# os.makedirs(r'D:\Inceptez', exist_ok=True)

# ========================================

# Get absolute path
EXCEL_FILE_PATH = os.path.abspath(EXCEL_FILE_PATH)

print(f"\n{'='*70}")
print(f"📊 EXCEL FILE WILL BE SAVED TO:")
print(f"   {EXCEL_FILE_PATH}")
print(f"")
print(f"💡 This is in the BACKEND folder - easy to find!")
print(f"   Just look in: visitor-management-system/backend/")
print(f"{'='*70}\n")



