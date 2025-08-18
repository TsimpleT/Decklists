import React from 'react';
import copy from 'copy-to-clipboard';
import styles from './GenerateDecklistPage.module.css';

import { Decklist, DecklistCardAmount, DEV_STRING_PRE, GET_CARD, TYPE } from '../../Data';

export class GenerateDecklistPage extends React.Component {
    public override componentDidMount(): void {
        document.title = `${DEV_STRING_PRE}Generate Decklist JSON`;
    }
    
    private generateAndCopy: React.FormEventHandler<HTMLFormElement> = async (e: React.SyntheticEvent): Promise<void> => {
        e.preventDefault();
        const data = (e.currentTarget as any).elements;

        const rawCardList: string[] = `${data.decklist.value}`.split(" ");
        let cardDict: {[cardId: string]: number} = {};
        for(let cardId of rawCardList) {
            if(cardId in cardDict) {
                cardDict[cardId] += 1;
            } else {
                cardDict[cardId] = 1;
            }
        }

        let decklist: Decklist = {
            username: data.username.value, date: data.date.value,
            archetype: data.archetype.value, legend: rawCardList[0], chosenChampion: rawCardList[1],
            mainDeck: [], battlefields: [], runeDeck: [], sideboard: []
        };
        let mode: "MD" | "BF" | "RU" | "SB" = "MD";
        function getDecklistPortion(): DecklistCardAmount[] {
            return (mode === "MD") ? decklist.mainDeck : (mode === "BF") ? decklist.battlefields : (mode === "RU") ? decklist.runeDeck : decklist.sideboard;
        }
        
        let count = 0;
        for(let i = 1; i < rawCardList.length; i++) {
            count++;
            if(i === cardDict.length-1 || rawCardList[i] !== rawCardList[i+1]) {
                const cardType = GET_CARD(rawCardList[i]).type;
                if(cardType === TYPE.BATTLEFIELD) {
                    mode = "BF";
                } else if(cardType === TYPE.RUNE) {
                    mode = "RU";
                } else if(mode === "RU") { // cardType is already guaranteed not to be RUNE bc else
                    mode = "SB";
                }
                getDecklistPortion().push({id: rawCardList[i], count: count});
                count = 0;
            }
        }

        copy(JSON.stringify(decklist)+",");
        window.alert("Decklist copied. Please paste it in a document and submit it to tsimplet on discord.");
    }

    public render(): React.ReactNode {
        return (
            <form onSubmit={this.generateAndCopy}>
                <label>
                    Username
                    <br />
                    <input id="username" type="text" placeholder="Enter Username" required />
                    <br />
                </label>
                <label>
                    Date
                    <br />
                    <input id="date" type="text" placeholder="Enter Date (YYYY/MM/DD)" required />
                    <br />
                </label>
                <label>
                    Archetype
                    <br />
                    <input id="archetype" type="text" placeholder="Enter Archetype" required />
                    <br />
                </label>
                <label>
                    Decklist
                    <br />
                    <textarea id="decklist" placeholder="Enter Decklist (Piltover Archive: Copy TTS Code) (TTS-style card ids, all on one line, separated by spaces)" required style={{minWidth: "375px", minHeight: "200px"}} />
                    <br />
                </label>
                <button type="submit" className={`${styles.unstyleButton} ${styles.signInOutMarginTop}`}>
                    Generate and Copy
                </button>
            </form>
        );
    }
}
