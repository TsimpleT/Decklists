import sys
import csv
import json

from script_helpers import *

csv_handler = [
    ("baseId", process_str),
    ("name", process_str),
    ("superType", process_str),
    ("type", process_str),
    ("domains", process_array),
    ("rarity", process_str),
    ("energy", process_num),
    ("power", process_num),
    ("might", process_num),
    ("rulesText", process_multi_line_str),
    ("effectText", process_multi_line_str),
    ("championTag", process_str),
    ("otherTags", process_array),
    ("flavorText", process_multi_line_str),
    ("hasErrata", process_boolean),
]

def main():
    set_id = input(f'Enter set ID (default "{DEFAULT_SET_ID}"): ')
    if not set_id: set_id = DEFAULT_SET_ID
    file_date = input(f'Enter file date (default "{DEFAULT_DATE}"): ')
    if not file_date: file_date = DEFAULT_DATE
    last_id = ""
    with open(f"base_card_list_{set_id}_{file_date}.csv", 'r') as rf_raw:
        for row in reversed(rf_raw.readlines()):
            if row[3] == "-":
                last_id = row[:row.index(",")]
                break
    with open(f"base_card_list_{set_id}_{file_date}.csv", 'r') as rf_raw:
        next(rf_raw)
        rf = csv.reader(rf_raw)
        with open(f"BaseCardList{set_id.upper()}{file_date}.json", "w") as wf:
            wf.write(f'{{\n\t"lastUpdated": "{file_date}",\n\t"cards": {{\n')
            for row in rf:
                i = 0
                wf.write(f'\t\t"{row[0]}": {{')
                for key,handler in csv_handler:
                    if row[i] or handler == process_array:
                        if i > 0: wf.write(", ")
                        wf.write(f'"{key}":{handler(row[i])}')
                    i += 1
                wf.write("}\n" if row[0] == last_id else "},\n")
            wf.write('\t}\n}\n')
    print(f"BaseCardList{set_id.upper()}{file_date}.json written successfully")
    return 0

if __name__ == "__main__":
    sys.exit(main())
