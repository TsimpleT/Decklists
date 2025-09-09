import React from 'react';
import copy from 'copy-to-clipboard';
import styles from './EnterDecklistPage.module.css';

import { ALL_ARCHETYPES, DEV_STRING_PRE, MOCK_DECKLIST_FROM_RAW, PARSE_TTS_DECKLIST, RawDecklist } from '../../Data';
import { VDecklist } from '../../Views';

interface IState {
    decklist?: RawDecklist;
    showForm: boolean;
}

export class EnterDecklistPage extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = { decklist: undefined, showForm: true };
    }

    public override componentDidMount(): void {
        document.title = `${DEV_STRING_PRE}Generate Decklist JSON`;
        this.setState({decklist: undefined});
    }
    
    private generateAndCopy: React.FormEventHandler<HTMLFormElement> = async (e: React.SyntheticEvent): Promise<void> => {
        e.preventDefault();
        const data = (e.currentTarget as any).elements;

        let decklist: RawDecklist = PARSE_TTS_DECKLIST(`${data.decklist.value}`);
        decklist.username = data.username.value;
        decklist.archetype = data.archetype.value;

        copy(JSON.stringify(decklist)+",");
        window.alert("Decklist copied. Please paste it in a document and submit it to tsimplet on discord.");
    }

    private onTextChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        this.setState({decklist: (e.target.value === "") ? undefined : PARSE_TTS_DECKLIST(`${e.target.value}`)});
    }

    private showForm: React.MouseEventHandler<HTMLDivElement> = (_) => {
        this.setState({showForm: true});
    }

    private hideForm: React.MouseEventHandler<HTMLDivElement> = (_) => {
        this.setState({showForm: false});
    }

    public render(): React.ReactNode {
        const decklistSection = (this.state.decklist !== undefined) && <VDecklist decklist={MOCK_DECKLIST_FROM_RAW(this.state.decklist)} title={""} subtitle={""} hideExport={true} />;
        return (!this.state.showForm) ? (
            <div className={styles.decklistOnlyContainer}>
                <div onClick={this.showForm} className={`${styles.restyleButton}`}>Show Form</div>
                <br />
                {decklistSection}
            </div>
        ):(
            <form onSubmit={this.generateAndCopy} className={styles.container}>
                <div>
                    <label>
                        <div className={styles.decklistHeader}>Decklist</div>
                        <textarea id="decklist" placeholder="Enter Decklist (Piltover Archive: Copy TTS Code) (TTS-style card ids, all on one line, separated by spaces)" required style={{width: "375px", height: "200px"}} onChange={this.onTextChange}/>
                        <br />
                    </label>
                    {decklistSection}
                </div>
                <div>
                    <label>
                        Username
                        <br />
                        <input id="username" type="text" placeholder="Enter Username" required />
                        <br />
                    </label>
                    <label>
                        Archetype
                        <br />
                        <select id="archetype">
                            {ALL_ARCHETYPES.map((archetype) =>
                                <option value={archetype} key={archetype}>{archetype}</option>
                            )}
                        </select>
                        {/* <input id="archetype" type="text" placeholder="Enter Archetype" required /> */}
                        <br />
                    </label>
                    <div>
                        <button type="submit" className={`${styles.restyleButton}`}>
                            Generate and Copy
                        </button>
                        <br />
                        <div onClick={this.hideForm} className={`${styles.restyleButton}`}>Hide Form</div>
                    </div>
                 </div>
            </form>
        );
    }
}
