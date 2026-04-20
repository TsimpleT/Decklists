import sys
import json

from script_helpers import *

LEGEND = "LEGEND"
BATTLEFIELD = "BATTLEFIELD"
RUNE = "RUNES"
SIDE = "OTHER/SIDEBOARD"
EARLY = "TURN 1 PLAYS"
EARLY2ND = "TURN 1 PLAYS GOING 2ND"
INTERACTION = "SMALL REMOVAL/INTERACTION"
CORE = "CORE/VALUE"
BIG_INTERACTION = "BIG REMOVAL/INTERACTION"
LATE = "LATEGAME/CLOSERS"

def get_category(data):
    if "type" not in data:
        return "SIDE"
    if data["type"] == "Legend":
        return LEGEND
    elif data["type"] == "Battlefield":
        return BATTLEFIELD
    elif data["type"] == "Rune":
        return RUNE
    elif "rulesText" in data and ("Reaction" in data["rulesText"] or "Action" in data["rulesText"] or "Quick-Draw" in data["rulesText"] or "Hidden" in data["rulesText"]):
        if "energy" in data and data["energy"] <= 3:
            return INTERACTION
        return BIG_INTERACTION
    elif data["type"] == "Unit" or data["type"] == "Gear":
        if "energy" in data and data["energy"] <= 2 and "power" in data and data["power"] == 0:
            return EARLY
        elif "energy" in data and data["energy"] == 3 and "power" in data and data["power"] == 0:
            return EARLY2ND
        elif "energy" in data and data["energy"] >= 7:
            return LATE
    return CORE

def main():
    set_id = input(f'Enter set ID (default "{DEFAULT_SET_ID}"): ')
    if not set_id: set_id = DEFAULT_SET_ID
    file_date = input(f'Enter file date (default "{DEFAULT_DATE}"): ')
    if not file_date: file_date = DEFAULT_DATE
    card_data = None
    try:
        with open(f"BaseCardList{set_id.upper()}{file_date}.json", 'r') as f:
            card_data = json.load(f)
    except FileNotFoundError:
        print(f"Error: File 'BaseCardList{set_id.upper()}{file_date}.json' not found.")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"Error: Failed to decode JSON: {e}")
        sys.exit(1)

    with open(f"CardCategories{set_id.upper()}{file_date}.json", "w") as wf:
        wf.write(f'{{\n\t"lastUpdated": "{file_date}",\n\t"cardCategories": {{\n')
        i = 0
        n = len(card_data["cards"])
        for card_id in card_data["cards"]:
            wf.write(f'\t\t"{card_id}": "{get_category(card_data["cards"][card_id])}"')
            wf.write("\n" if i+1 == n else ",\n")
            i+=1
        wf.write('\t}\n}\n')
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
