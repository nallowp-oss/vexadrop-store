import sqlite3
import os

db_path = r'c:\Users\strut\OneDrive\Desktop\VexaDrop\vexa-core\store\vexadrop.db'

if os.path.exists(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    print(f"Checking database: {db_path}")
    
    # List tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    
    for table_name in [t[0] for t in tables]:
        print(f"\n--- Content of {table_name} ---")
        try:
            cursor.execute(f"SELECT * FROM {table_name} LIMIT 10")
            rows = cursor.fetchall()
            for row in rows:
                print(row)
        except Exception as e:
            print(f"Error reading {table_name}: {e}")
            
    conn.close()
else:
    print(f"Database not found at {db_path}")
