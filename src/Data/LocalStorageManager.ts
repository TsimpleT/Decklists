import { DECKLIST_TTS_EXPORT, PARSE_TTS_DECKLIST, RawDecklist } from "./Interfaces";

const NUM_DECKLISTS_KEY = "numDecklists";

export class LocalStorageManager {
    private static GET_DECK_KEY(n: number): string { return `deck${n}`; }
    public static GET_NEW_DECK_KEY(): string { return LocalStorageManager.GET_DECK_KEY(LocalStorageManager.GET_NUM_DECKLISTS()); }
    public static GET_NUM_DECKLISTS(): number {
        const couldBeNaN = parseInt(localStorage.getItem(NUM_DECKLISTS_KEY) ?? "0")
        return (Number.isNaN(couldBeNaN)) ? 0 : couldBeNaN;
    }

    public static ADD_DECKLIST(decklist: RawDecklist): number {
        const numDecklists = LocalStorageManager.GET_NUM_DECKLISTS();
        const key = LocalStorageManager.GET_DECK_KEY(numDecklists);
        localStorage.setItem(key, DECKLIST_TTS_EXPORT(decklist));
        localStorage.setItem(NUM_DECKLISTS_KEY, `${numDecklists+1}`);
        return numDecklists;
    }

    public static WRITE_DECKLIST(n: number, decklist: RawDecklist): void {
        const key = LocalStorageManager.GET_DECK_KEY(n);
        localStorage.setItem(key, DECKLIST_TTS_EXPORT(decklist));
    }

    public static DELETE_DECKLIST(n: number): void {
        const key = LocalStorageManager.GET_DECK_KEY(n);
        localStorage.removeItem(key);
    }

    public static GET_DECKLIST(n: number): RawDecklist|undefined {
        const val = localStorage.getItem(LocalStorageManager.GET_DECK_KEY(n));
        if(val === null) return undefined;
        return PARSE_TTS_DECKLIST(val);
    }

    public static GET_DECKLIST_DICT(): {[key: number]: RawDecklist} {
        let decklists: {[key: number]: RawDecklist} = {};
        const numDecklists = LocalStorageManager.GET_NUM_DECKLISTS();
        for(let i = 0; i < numDecklists; i++) {
            const decklist = LocalStorageManager.GET_DECKLIST(i);
            if(decklist === undefined) continue;
            decklists[i] = decklist;
        }
        return decklists;
    }
}
