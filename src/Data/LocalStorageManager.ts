import { Archetype } from "./Archetype";
import { Decklist } from "./Decklist";

// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API

function IS_DECK_KEY(key: string): boolean { return key.startsWith("deck"); }
export function DECK_KEY_TO_UUID(key: string): string { return key.substring(4); }
export function GET_DECK_KEY(uuid: string): string { return `deck${uuid}`; }

export class LocalStorageManager {
    private decklistDict: {[id: string]: Decklist};
    private decklistIds: string[];
    private archetypeDecklistIds: {[archetype in Archetype]?: string[]};

    constructor() {
        this.decklistDict = {};
        this.decklistIds = [];
        this.archetypeDecklistIds = {};

        for(let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if(key === null) continue;
            if(IS_DECK_KEY(key)) {
                const val = localStorage.getItem(key);
                if(val === null) continue;
                const decklist = Decklist.fromTTSText(val, "You");
                this.writeDecklistHere(key, decklist);
            }
        }
    }

    public getAllDecklists(): Decklist[] {
        return this.decklistIds.map((id) => this.decklistDict[id]);
    }

    public getAllDecklistIds(): string[] {
        return [...this.decklistIds];
    }

    public getArchetypeDecklistIds(archetype: Archetype): string[] {
        return [...this.archetypeDecklistIds[archetype] ?? []];
    }

    public getDecklist(key: string): Decklist|undefined {
        return (key in this.decklistDict) ? this.decklistDict[key] : undefined;
    }

    public size(): number {
        return this.decklistIds.length;
    }

    public addDecklist(decklist: Decklist): string {
        let key;
        do { key = GET_DECK_KEY(crypto.randomUUID()); }
        while(this.decklistIds.includes(key));
        this.writeDecklistToStorage(key, decklist);
        this.writeDecklistHere(key, decklist);
        return key;
    }

    public updateDecklist(key: string, decklist: Decklist): void {
        this.writeDecklistToStorage(key, decklist);
        this.writeDecklistHere(key, decklist);
    }

    public deleteDecklist(key: string): void {
        const archetype: Archetype|undefined = this.decklistDict[key].archetype;
        localStorage.removeItem(key);
        delete this.decklistDict[key];
        const decklistIdsIndex = this.decklistIds.indexOf(key);
        if(decklistIdsIndex > -1) {
            this.decklistIds.splice(decklistIdsIndex, 1);
        }
        if(archetype !== undefined) {
            const archetypeDecklistIdsIndex = this.archetypeDecklistIds[archetype]?.indexOf(key) ?? -1;
            if(archetypeDecklistIdsIndex > -1) {
                this.archetypeDecklistIds[archetype]?.splice(archetypeDecklistIdsIndex, 1);
            }
        }
    }

    private writeDecklistToStorage(key: string, decklist: Decklist) {
        localStorage.setItem(key, decklist.exportToTTS());
    }

    private writeDecklistHere(key: string, decklist: Decklist) {
        const oldArchetype: Archetype|undefined = (key in this.decklistDict) ? this.decklistDict[key].archetype : undefined;

        this.decklistDict[key] = decklist;
        if(!this.decklistIds.includes(key)) {
            this.decklistIds.push(key);
        }

        if(oldArchetype !== undefined) {
            const archetypeDecklistIdsIndex = this.archetypeDecklistIds[oldArchetype]?.indexOf(key) ?? -1;
            if(archetypeDecklistIdsIndex > -1) {
                this.archetypeDecklistIds[oldArchetype]?.splice(archetypeDecklistIdsIndex, 1);
            }
        }

        let thisArchetypeDecklists = this.archetypeDecklistIds[decklist.archetype];
        if(thisArchetypeDecklists === undefined) {
            let newArr: string[] = [];
            this.archetypeDecklistIds[decklist.archetype] = newArr;
            thisArchetypeDecklists = newArr;
        }
        thisArchetypeDecklists.push(key);
    }

    private static _instance?: LocalStorageManager;
    public static getInstance(): LocalStorageManager {
        return (LocalStorageManager._instance) ? LocalStorageManager._instance : new LocalStorageManager();
    }
}
