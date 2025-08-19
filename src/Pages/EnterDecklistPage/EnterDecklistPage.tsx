import React from 'react';
import copy from 'copy-to-clipboard';
import styles from './EnterDecklistPage.module.css';

import { Decklist, DEV_STRING_PRE, IS_DEV, PARSE_DECKLIST } from '../../Data';
import { VDecklist } from '../../Views';

interface IState {
    decklist?: Decklist;
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

        let decklist: Decklist = PARSE_DECKLIST(`${data.decklist.value}`);
        decklist.username = data.username.value;
        decklist.date = data.date.value;
        decklist.archetype = data.archetype.value;

        copy(JSON.stringify(decklist)+",");
        window.alert("Decklist copied. Please paste it in a document and submit it to tsimplet on discord.");
    }

    private onTextChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        this.setState({decklist: (e.target.value === "") ? undefined : PARSE_DECKLIST(`${e.target.value}`)});
    }

    private showForm: React.MouseEventHandler<HTMLDivElement> = (_) => {
        this.setState({showForm: true});
    }

    private hideForm: React.MouseEventHandler<HTMLDivElement> = (_) => {
        this.setState({showForm: false});
    }

    public render(): React.ReactNode {
        const decklistSection = (this.state.decklist !== undefined) && <VDecklist decklist={this.state.decklist} title={""} />;
        return (!this.state.showForm) ? (
            <div className={styles.decklistOnlyContainer}>
                <div onClick={this.showForm} className={`${styles.restyleButton}`}>{(IS_DEV) ? "Show Form" : "Show Text Box"}</div>
                <br />
                {decklistSection}
            </div>
        ):(
            <form onSubmit={this.generateAndCopy} className={styles.container}>
                <div>
                    <label>
                        <div>
                            <span style={{marginRight: "4px"}}>Decklist</span>
                            {(!IS_DEV) && <div onClick={this.hideForm} className={`${styles.restyleButton}`}>Hide Text Box</div>}
                        </div>
                        <br />
                        <textarea id="decklist" placeholder="Enter Decklist (Piltover Archive: Copy TTS Code) (TTS-style card ids, all on one line, separated by spaces)" required style={{width: "375px", height: "200px"}} onChange={this.onTextChange}/>
                        <br />
                    </label>
                    {decklistSection}
                </div>
                <div>
                    {(IS_DEV) && <>
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
                        <div>
                            <button type="submit" className={`${styles.restyleButton}`}>
                                Generate and Copy
                            </button>
                            <br />
                            <div onClick={this.hideForm} className={`${styles.restyleButton}`}>Hide Form</div>
                        </div>
                    </>}
                 </div>
            </form>
        );
    }
}
