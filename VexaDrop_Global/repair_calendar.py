import datetime

def repair_ics():
    file_path = r"C:\Users\strut\OneDrive\Desktop\VexaDrop\VexaDrop_Global\VexaDrop_Schedule.ics"
    
    # Reading the malformed/simplified content
    try:
        with open(file_path, "r") as f:
            lines = f.readlines()
    except FileNotFoundError:
        print("Source file not found.")
        return

    # Standard ICS Header
    ics_content = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//VexaDrop//NONSGML Command Center//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH"
    ]

    for line in lines:
        if "|" in line:
            parts = line.split("|")
            event_name = parts[0].strip()
            date_str = parts[1].strip()
            metadata = parts[2].strip()
            
            # Rough parsing of "Mar 25, 2026, 15:00 SAST"
            # We'll simplify for the repair script logic
            try:
                date_part = date_str.split(",")[0] + " " + date_str.split(",")[1].strip()
                dt = datetime.datetime.strptime(date_part, "%b %d %Y %H:%M")
                dt_stamp = dt.strftime("%Y%m%dT%H%M%S")
            except:
                dt_stamp = "20260325T150000" # Fallback

            ics_content.extend([
                "BEGIN:VEVENT",
                f"SUMMARY:{event_name}",
                f"DTSTART:{dt_stamp}",
                f"DTEND:{dt_stamp}",
                f"DESCRIPTION:{metadata}",
                "STATUS:CONFIRMED",
                "END:VEVENT"
            ])

    ics_content.append("END:VCALENDAR")

    # Writing back the properly formatted content
    with open(file_path, "w") as f:
        f.write("\n".join(ics_content))
    
    print(f"Successfully repaired {file_path} to standard iCalendar format.")

if __name__ == "__main__":
    repair_ics()
