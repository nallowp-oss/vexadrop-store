import os
import re

def sync_calendar():
    local_file = r"C:\Users\strut\OneDrive\Desktop\VexaDrop\VexaDrop_Global\VexaDrop_Schedule.ics"
    
    if not os.path.exists(local_file):
        print(f"Error: {local_file} not found.")
        return

    print(f"Reading {local_file}...")
    with open(local_file, 'r') as f:
        content = f.read()

    # Optimization: Only look for STATUS:Pending (Phase 1 logic)
    # However, in Dev Mode, we have STATUS:On_Hold.
    # We will search for events and their status.
    events = re.findall(r"Event \d+: (.*?) \| (.*?) \| TASK:(.*?); STATUS:(.*?)\n", content)
    
    print("\n--- VexaDrop Sync Manifest ---")
    for name, date, task, status in events:
        if status == "Pending":
            print(f"[SYNC] PENDING TASK: {name} | {date} | {task}")
        elif status == "On_Hold":
            print(f"[SKIP] ON_HOLD: {name} | {date}")
        else:
            print(f"[ARCHIVE] {status}: {name}")
    
    print("\n[NOTE] Google Calendar API Integration is in DRAFT. Manual import required for URL: https://calendar.google.com/calendar/ical/vexadrop.ops%40gmail.com/private-86378d0e6b751e798b033a78d508c870/basic.ics")

if __name__ == "__main__":
    sync_calendar()
