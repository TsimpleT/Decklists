import { Archetype, PREDICT_ARCHETYPE } from "./Archetype";
import { GET_CARD, IS_CARD, TO_BASE_ID, TO_TTS_ID, TTS_ID_TO_ID } from "./Cards";

export interface DecklistCardAmount { id: string; count: number; }

export interface IDecklist {
    date?: string;
    username?: string;
    archetype?: Archetype;
    legend: string;
    chosenChampion: string;
    mainDeck: DecklistCardAmount[];
    battlefields: DecklistCardAmount[];
    runeDeck: DecklistCardAmount[];
    sideboard: DecklistCardAmount[];
    link?: string;
}

interface IDecklistContainsOptions {
    exactCount?: number;
    minCount?: number;
    maxCount?: number;
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

    private static unknownPlayerCount = 0;

    public constructor(idl: IDecklist, tournamentName: string = "", tournId: string = "", placing: string = "") {
        [this.date, this.username, this.legend, this.chosenChampion, this.mainDeck, this.battlefields, this.runeDeck, this.sideboard, this.link, this.tournamentName, this.tournId, this.placing] = [idl.date??"", (idl.username === "" || idl.username === undefined) ? `*Unknown${Decklist.unknownPlayerCount++}*` : idl.username, idl.legend, idl.chosenChampion, idl.mainDeck, idl.battlefields, idl.runeDeck, idl.sideboard, idl.link??"", tournamentName, tournId, placing];
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

    // in order: 1x legend, 40x main deck, 3x battlefield, 12x rune, 8x sideboard (or 0x)
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

        let decklistPortion = decklist.mainDeck;
        let count = 0;
        for(let i = 1; i < cardIdList.length; i++) { // first card is legend
            count++;
            if(i === cardIdList.length-1 || cardIdList[i] !== cardIdList[i+1]) {
                if(!IS_CARD(cardIdList[i])) {
                    count = 0;
                    continue;
                }
                const cardType = GET_CARD(cardIdList[i]).type;
                if(cardType === "Battlefield") {
                    decklistPortion = decklist.battlefields;
                } else if(cardType === "Rune") {
                    decklistPortion = decklist.runeDeck;
                } else if(decklistPortion === decklist.runeDeck) { // cardType is already guaranteed not to be RUNE bc else
                    decklistPortion = decklist.sideboard;
                }
                decklistPortion.push({id: cardIdList[i], count: count});
                count = 0;
            }
        }

        return new Decklist(decklist);
    }
}
