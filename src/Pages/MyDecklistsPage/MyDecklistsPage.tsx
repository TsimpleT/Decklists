import React from 'react';
import copy from 'copy-to-clipboard';
import styles from './MyDecklistsPage.module.css';

import { DEV_STRING_PRE, MOCK_DECKLIST_FROM_RAW, RawDecklist, LocalStorageManager as LSM, PARSE_TTS_DECKLIST } from '../../Data';
import { VDecklist } from '../../Views';

interface IState {
    decklists: {[key: number]: RawDecklist};
    showEditOptions: {[key: number]: boolean};
}

export class MyDecklistsPage extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = { decklists: LSM.GET_DECKLIST_DICT(), showEditOptions: {} };
    }

    public override componentDidMount(): void {
        document.title = `${DEV_STRING_PRE}My Decklists`;
        // this.setState({decklist: undefined});
    }

    public add: React.MouseEventHandler<HTMLDivElement> = async (): Promise<void> => {
        const text = await navigator.clipboard.readText();
        const decklist = PARSE_TTS_DECKLIST(text);
        if(decklist.legend === "") { window.alert("no legend found"); return; }
        if(decklist.chosenChampion === "") { window.alert("no chosen champion found"); return; }
        if(decklist.mainDeck.reduce((sum, current) => sum + current.count, 0) !== 40) {
            window.alert(`${decklist.mainDeck.reduce((sum, current) => sum + current.count, 0)} cards in main deck (need 40)`);
            return;
        }
        if(decklist.battlefields.reduce((sum, current) => sum + current.count, 0) !== 3) {
            window.alert(`${decklist.battlefields.reduce((sum, current) => sum + current.count, 0)} battlefields (need 3)`);
            return;
        }
        if(decklist.runeDeck.reduce((sum, current) => sum + current.count, 0) !== 12) {
            window.alert(`${decklist.runeDeck.reduce((sum, current) => sum + current.count, 0)} cards in rune deck (need 12)`);
            return;
        }
        const key = LSM.ADD_DECKLIST(decklist);
        const decklists = {...this.state.decklists};
        decklists[key] = decklist;
        this.setState({ decklists: decklists });
    }

    public devCopy: React.MouseEventHandler<HTMLDivElement> = async (): Promise<void> => {
        const text = await navigator.clipboard.readText();
        const decklist = PARSE_TTS_DECKLIST(text);
        if(decklist.legend === "") { window.alert("no legend found"); return; }
        if(decklist.chosenChampion === "") { window.alert("no chosen champion found"); return; }
        if(decklist.mainDeck.reduce((sum, current) => sum + current.count, 0) !== 40) {
            window.alert(`${decklist.mainDeck.reduce((sum, current) => sum + current.count, 0)} cards in main deck (need 40)`);
            return;
        }
        if(decklist.battlefields.reduce((sum, current) => sum + current.count, 0) !== 3) {
            window.alert(`${decklist.battlefields.reduce((sum, current) => sum + current.count, 0)} battlefields (need 3)`);
            return;
        }
        if(decklist.runeDeck.reduce((sum, current) => sum + current.count, 0) !== 12) {
            window.alert(`${decklist.runeDeck.reduce((sum, current) => sum + current.count, 0)} cards in rune deck (need 12)`);
            return;
        }
        copy(JSON.stringify(decklist)+",");
        window.alert("Decklist copied.");
    }

    public replace = async (n: number): Promise<void> => {
        const text = await navigator.clipboard.readText();
        const decklist = PARSE_TTS_DECKLIST(text);
        if(decklist.legend === "") { window.alert("no legend found"); return; }
        if(decklist.chosenChampion === "") { window.alert("no chosen champion found"); return; }
        if(decklist.mainDeck.reduce((sum, current) => sum + current.count, 0) !== 40) {
            window.alert(`${decklist.mainDeck.reduce((sum, current) => sum + current.count, 0)} cards in main deck (need 40)`);
            return;
        }
        if(decklist.battlefields.reduce((sum, current) => sum + current.count, 0) !== 3) {
            window.alert(`${decklist.battlefields.reduce((sum, current) => sum + current.count, 0)} battlefields (need 3)`);
            return;
        }
        if(decklist.runeDeck.reduce((sum, current) => sum + current.count, 0) !== 12) {
            window.alert(`${decklist.runeDeck.reduce((sum, current) => sum + current.count, 0)} cards in rune deck (need 12)`);
            return;
        }
        LSM.WRITE_DECKLIST(n, decklist);
        const decklists = {...this.state.decklists};
        decklists[n] = decklist;
        this.setState({ decklists: decklists });
    }

    public delete = (n: number): void => {
        LSM.DELETE_DECKLIST(n);
        const decklists = {...this.state.decklists};
        delete decklists[n];
        this.setState({ decklists: decklists });
    }

    public toggleEdit = (n: number): void => {
        const showEditOptions = {...this.state.showEditOptions};
        showEditOptions[n] = !showEditOptions[n];
        this.setState({ showEditOptions: showEditOptions });
    }

    public render(): React.ReactNode {
        return (<>
            <div className={styles.menu}>
                <div className={styles.title}>My Decklists</div>
                <div className={`${styles.restyleButton} ${styles.darkButton}`} onClick={this.add}>Add New Deck From Clipboard</div>
                <div className={`${styles.restyleButton} ${styles.darkButton}`} onClick={this.devCopy}>[DEV] Preprocess Deck</div>
            </div>
            <div className={styles.decklistsContainer}>
                {Object.entries(this.state.decklists).map(([keyStr, decklist]) => {
                    const key = parseInt(keyStr);
                    return (
                        <div key={key}>
                            <div className={styles.editMenu}>
                                <div className={`${styles.restyleButton} ${styles.darkButton}`} onClick={() => this.toggleEdit(key)}>
                                    {(this.state.showEditOptions[key]) ? "X" : "Edit"}
                                </div>
                                {(this.state.showEditOptions[key]) && (<>
                                    <div className={`${styles.restyleButton} ${styles.darkButton}`} onClick={() => this.replace(key)}>Update From Clipboard</div>
                                    <div className={`${styles.restyleButton} ${styles.darkButton}`} onClick={() => this.delete(key)}>Delete</div>
                                </>)}
                            </div>
                            <VDecklist decklist={MOCK_DECKLIST_FROM_RAW(decklist)} title={""} subtitle={""} />
                        </div>
                    );
                })}
            </div>
        </>);
    }
}
