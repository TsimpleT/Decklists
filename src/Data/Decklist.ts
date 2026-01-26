import { Archetype, PREDICT_ARCHETYPE } from "./Archetype";
import { CardDTO, GET_CARD, IS_CARD, TO_BASE_ID, TO_TTS_ID, TTS_ID_TO_ID } from "./Cards";

export interface DecklistCardAmount { id: string; count: number; }

export interface IDecklist {
    date?: string;
    username?: string;
    archetype?: Archetype;
    legend?: string;
    chosenChampion?: string;
    mainDeck?: DecklistCardAmount[];
    battlefields?: DecklistCardAmount[];
    runeDeck?: DecklistCardAmount[];
    sideboard?: DecklistCardAmount[];
    link?: string;
}

interface IDecklistContainsOptions {
    exactCount?: number;
    minCount?: number;
    maxCount?: number;
    includeSideboard?: boolean;
}

interface IDecklistNumTypeOptions {
    includeSideboard?: boolean;
}

export class Decklist {
    readonly date: string;
    readonly username: string;
    readonly archetype: Archetype;
    readonly legend: string;
    readonly chosenChampion: string;
    readonly mainDeck: DecklistCardAmount[];
    readonly battlefields: DecklistCardAmount[];
    readonly runeDeck: DecklistCardAmount[];
    readonly sideboard: DecklistCardAmount[];
    readonly link: string;
    readonly tournamentName: string;
    readonly tournId: string;
    readonly placing: string;

    private static unknownPlayerCount = 1;

    public constructor(idl: IDecklist, tournamentName: string = "", tournId: string = "", placing: string = "") {
        this.date = idl.date??"";
        this.username = (idl.username) ? idl.username : `*Unknown${Decklist.unknownPlayerCount++}*`;
        this.legend = idl.legend ?? "";
        this.chosenChampion = idl.chosenChampion ?? "";
        this.mainDeck = idl.mainDeck ?? [];
        this.battlefields = idl.battlefields ?? [];
        this.runeDeck = idl.runeDeck ?? [];
        this.sideboard = idl.sideboard ?? [];
        this.link = idl.link ?? "";
        this.tournamentName = tournamentName;
        this.tournId = tournId;
        this.placing = placing;
        this.archetype = (idl.archetype !== undefined && idl.archetype !== "Unknown") ? idl.archetype : PREDICT_ARCHETYPE(this);
    }

    // exclude sideboard by default
    public contains(baseId: string, options?: IDecklistContainsOptions): boolean {
        for(let listing of this.combinedDCAs(options?.includeSideboard ?? false)) {
            if(TO_BASE_ID(listing.id) === baseId) {
                return (options?.exactCount === undefined || listing.count === options.exactCount)
                    && (options?.minCount === undefined || listing.count >= options.minCount)
                    && (options?.maxCount === undefined || listing.count <= options.maxCount);
            }
        }
        return false;
    }

    public numMatchingQuery(query: (card: CardDTO) => boolean, options?: IDecklistNumTypeOptions): number {
        let n = 0;
        for(let listing of this.combinedDCAs(options?.includeSideboard ?? false)) {
            if(query(GET_CARD(listing.id))) {
                n += listing.count;
            }
        }
        return n;
    }

    private combinedDCAs(includeSideboard: boolean = true): DecklistCardAmount[] {
        return [{id: this.legend, count: 1}].concat(this.mainDeck).concat(this.battlefields).concat(this.runeDeck).concat((includeSideboard) ? this.sideboard : []);
    }

    public exportToTTS(): string {
        return this.combinedDCAs().map((cardAmount: DecklistCardAmount) => {
            let arr = [];
            for(let i = 0; i < cardAmount.count; i++) {
                arr.push(TO_TTS_ID(cardAmount.id));
            }
            return arr.join(" ");
        }).join(" ");
    }

    public exportToTCGA(): string {
        const parseDCAForTCGA = (dca: DecklistCardAmount) => `${dca.count} ${GET_CARD(dca.id).name}`;
        return [[{id: this.legend, count: 1}], this.mainDeck, this.battlefields, this.runeDeck]
            .map((dcaArr: DecklistCardAmount[]) => dcaArr.map(parseDCAForTCGA).join("\n")).join("\n\n") +
            ((this.sideboard.length === 0) ? "" :
                "\n\nSideboard:\n" + this.sideboard.map(parseDCAForTCGA).join("\n")
            );
    }

    // in order: 1x legend, 40x main deck, 3x battlefield, 12x rune, 8x sideboard (or 0x); 1st card in main deck is chosen champion
    // but this handles any number (besides 1x legend)
    public static fromTTSText(text: string, username?: string): Decklist {
        const cardIdList: string[] = text.split(" ").map(ttsId => TTS_ID_TO_ID(ttsId));

        let decklist: IDecklist = {
            legend: (cardIdList.length > 0) ? cardIdList[0] : "",
            chosenChampion: (cardIdList.length > 1) ? cardIdList[1] : "",
            mainDeck: [], battlefields: [], runeDeck: [], sideboard: []
        };
        if(username) {
            decklist.username = username;
        }

        let mainDeckDone = false;
        for(let startI = 1; startI < cardIdList.length; startI++) { // skip first card legend; already handled
            if(!IS_CARD(cardIdList[startI])) { continue; }
            let count = 1;
            while(startI+count < cardIdList.length && cardIdList[startI+count] === cardIdList[startI]) {
                count++;
            }
            const dca: DecklistCardAmount = {id: cardIdList[startI], count: count};
            const cardType = GET_CARD(cardIdList[startI]).type;
            if(!mainDeckDone && (cardType === "Battlefield" || cardType === "Rune")) {
                mainDeckDone = true;
            }
            if(cardType === "Battlefield") {
                decklist.battlefields?.push(dca);
            } else if(cardType === "Rune") {
                decklist.runeDeck?.push(dca);
            } else {
                (mainDeckDone ? decklist.sideboard : decklist.mainDeck)?.push(dca);
            }
            startI += count-1;
        }

        return new Decklist(decklist);
    }

    public toInterface(forceUsername: boolean = false): IDecklist {
        let obj: IDecklist = {};
        if(this.date) { obj.date = this.date; }
        if(forceUsername || (this.username && !this.username.startsWith("*Unknown"))) { obj.username = this.username; }
        if(this.archetype) { obj.archetype = this.archetype; }
        if(this.legend) { obj.legend = this.legend; }
        if(this.chosenChampion) { obj.chosenChampion = this.chosenChampion; }
        if(this.mainDeck) { obj.mainDeck = this.mainDeck; }
        if(this.battlefields) { obj.battlefields = this.battlefields; }
        if(this.runeDeck) { obj.runeDeck = this.runeDeck; }
        if(this.sideboard) { obj.sideboard = this.sideboard; }
        if(this.link) { obj.link = this.link; } 

        return obj;
    }
}
