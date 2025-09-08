import sys
import csv
import json

DEFAULT_DATE = "250907"

def process_str(s):
    return f'"{s}"'

def process_multi_line_str(s):
    return '"' + s.replace("\n","\\n") + '"'

def process_array(array_str):
    s = ','.join((f'"{s}"' for s in array_str.split(", ")))
    return "[]" if len(array_str) == 0 else f"[{s}]"

def process_object(obj_str):
    s = ','.join(f'"{k}":"{v}"' for k,v in json.loads(obj_str).items())
    return f"{{{s}}}"

csv_handler = [
    ("id", process_str),
    ("baseId", process_str),
    ("ttsId", process_str),
]

def main():
    file_date = input(f'Enter file date (default "{DEFAULT_DATE}"): ')
    if not file_date: file_date = DEFAULT_DATE
    lastId = ""
    with open(f"id_mappings_{file_date}.csv", 'r') as rf_raw:
        for row in reversed(rf_raw.readlines()):
            if row[3] == "-":
                lastId = row[:row.index(",")]
                break
    with open(f"id_mappings_{file_date}.csv", 'r') as rf_raw:
        # ID,Base ID,TTS ID
        next(rf_raw)
        rf = csv.reader(rf_raw)
        with open(f"IdMappings{file_date}.json", "w") as wf:
            wf.write(f'{{\n\t"lastUpdated": "{file_date}",\n\t"mappings": {{\n')
            for row in rf:
                i = 1
                wf.write(f'\t\t"{row[0]}": {{')
                for key,handler in csv_handler[1:]:
                    if row[i]:
                        if i > 1: wf.write(", ")
                        wf.write(f'"{key}":{handler(row[i])}')
                    i += 1
                wf.write("}\n" if row[0] == lastId else "},\n")
            wf.write('\t}\n}\n')
    return 0

if __name__ == "__main__":
    output = main()
    if output == 0:
        print("IdMappings.json written successfully")
    sys.exit(output)
