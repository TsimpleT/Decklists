import { ALL_CARD_IDS, SET_LIST } from './CardData';

test('ALL_CARD_IDS in order', () => {
    const setNumMap: {[key: string]: number} = {};
    for(let i = 0; i < SET_LIST.length; i++) {
        setNumMap[SET_LIST[i]] = i;
    }
    expect(ALL_CARD_IDS).toEqual([...ALL_CARD_IDS].sort((a, b) => {
        const aSetNum = setNumMap[a.substring(0,3)], bSetNum = setNumMap[b.substring(0,3)];
        return (aSetNum === bSetNum) ? a.localeCompare(b) : aSetNum-bSetNum;
    }));
});
