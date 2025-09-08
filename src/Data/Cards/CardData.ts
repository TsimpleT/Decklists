import CardList from "./CardList.json";
import CardCategories from "./CardCategories.json";
import IdMappings from "./IdMappings.json";
import { CardDTO } from "../Interfaces";
import { CCATEGORY, TYPE } from '../Enums';

let cardData: {[cardId: string]: CardDTO} = CardList.cards as any;
let cardCategories: {[cardId: string]: CCATEGORY} = CardCategories.cardCategories as any;
let idMappings: {[id: string]: {baseId:string, ttsId:string}} = IdMappings.mappings as any;
let ttsIdMappings: {[ttsId: string]: {baseId:string, id:string}} = {};
for(let id in idMappings) {
    const mapping = idMappings[id];
    ttsIdMappings[mapping.ttsId] = {baseId: mapping.baseId, id};
    cardData[id] = cardData[mapping.baseId];
}

var sortableArray = Object.entries(cardData);
var sortedArray = sortableArray.sort(([a,], [b,]) => a.localeCompare(b));
cardData = Object.fromEntries(sortedArray);

let setSet: Set<string> = new Set();
for(let card in cardData) {
    setSet.add(card.substring(0,3));
}

export const SET_LIST = Array.from(setSet.values());

export function GET_CARD(id: string): CardDTO {
    if(!(id in cardData)) {
        console.warn(`Card "${id}" not found in cardData.`);
        cardData[id] = { baseId: id, name: id, type: TYPE.LEGEND, domains: [], rarity: "Common", rulesText: "", otherTags: [] };
    }
    return cardData[id];
}

export const ALL_CARD_IDS: string[] = Object.keys(cardData);

export function GET_CCATEGORY(potentiallyFullID: string): CCATEGORY {
    return (potentiallyFullID.substring(0,7) in cardCategories) ? cardCategories[potentiallyFullID.substring(0,7)] : CCATEGORY.LEGEND;
}

export function TO_BASE_ID(id: string): string {
    if(!(id in idMappings)) {
        console.warn(`Card "${id}" not found in idMappings.`);
        idMappings[id] = {baseId: id, ttsId: id};
    }
    return idMappings[id].baseId;
}

export function TTS_ID_TO_ID(ttsId: string): string {
    if(ttsId.endsWith("-1")) {
        return ttsId.substring(0,7);
    }
    if(!(ttsId in ttsIdMappings)) {
        console.warn(`Card "${ttsId}" not found in ttsIdMappings.`);
        ttsIdMappings[ttsId] = {baseId: ttsId.substring(0,7), id: ttsId.substring(0,7)};
    }
    return ttsIdMappings[ttsId].id;
}

export function GET_CARD_ART(printId: string): string {
    return `https://static.dotgg.gg/riftbound/cards/${printId.replaceAll("*","s")}.webp`;
}
