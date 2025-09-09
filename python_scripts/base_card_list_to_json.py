import sys
import csv
import json

DEFAULT_DATE = "250908"

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
    ("baseId", process_str),
    ("name", process_str),
    ("preType", process_str),
    ("type", process_str),
    ("domains", process_array),
    ("rarity", process_str),
    ("energy", process_str),
    ("power", process_str),
    ("might", process_str),
    ("rulesText", process_multi_line_str),
    ("championTag", process_str),
    ("otherTags", process_array),
    ("other", process_object),
]

def main():
    file_date = input(f'Enter file date (default "{DEFAULT_DATE}"): ')
    if not file_date: file_date = DEFAULT_DATE
    lastId = ""
    with open(f"base_card_list_{file_date}.csv", 'r') as rf_raw:
        for row in reversed(rf_raw.readlines()):
            if row[3] == "-":
                lastId = row[:row.index(",")]
                break
    with open(f"base_card_list_{file_date}.csv", 'r') as rf_raw:
        next(rf_raw)
        rf = csv.reader(rf_raw)
        with open(f"BaseCardList{file_date}.json", "w") as wf:
            wf.write(f'{{\n\t"lastUpdated": "{file_date}",\n\t"cards": {{\n')
            for row in rf:
                i = 0
                wf.write(f'\t\t"{row[0]}": {{')
                for key,handler in csv_handler:
                    if row[i] or handler == process_array:
                        if i > 0: wf.write(", ")
                        wf.write(f'"{key}":{handler(row[i])}')
                    i += 1
                wf.write("}\n" if row[0] == lastId else "},\n")
            wf.write('\t}\n}\n')
    print(f"BaseCardList{file_date}.json written successfully")
    return 0

if __name__ == "__main__":
    sys.exit(main())
