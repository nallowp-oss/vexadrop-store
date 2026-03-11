import uuid
events = [
    ("Asset Reveal: Hoodie", "20260312T160000Z", "20260312T170000Z"),
    ("Backend Audit", "20260318T090000Z", "20260318T100000Z"),
    ("VexaDrop Global Launch", "20260325T130000Z", "20260325T140000Z")
]
ical_body = ""
for title, start, end in events:
    ical_body += f"BEGIN:VEVENT\r\nUID:{uuid.uuid4()}\r\nSUMMARY:{title}\r\nDTSTART:{start}\r\nDTEND:{end}\r\nSTATUS:CONFIRMED\r\nEND:VEVENT\r\n"
content = f"BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//VexaDrop//Ops//EN\r\n{ical_body}END:VCALENDAR"
with open(r"C:\Users\strut\OneDrive\Desktop\VexaDrop\VexaDrop_Global\VexaDrop_Schedule.ics", "w", newline='\r\n') as f:
    f.write(content)
