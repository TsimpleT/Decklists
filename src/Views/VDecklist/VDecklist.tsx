import React from 'react';
import copy from 'copy-to-clipboard';
import styles from './VDecklist.module.css';

import { CardType, Decklist, GET_CCATEGORY, ImageUtil } from '../../Data';
import { VDecklistCard } from '../VDecklistCard';
import { GET_COLOR_STYLE } from '../VDecklistTable';

interface IProps {
    decklist: Decklist;
    title: string;
    subtitle: string;
}

interface IState {
    showExportOptions: boolean;
}

export class VDecklist extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { showExportOptions: false };
    }

    private copyToText: React.MouseEventHandler<HTMLDivElement> = (_) => {
        copy(this.props.decklist.exportToText());
        window.alert("Decklist copied to clipboard as text format.");
        this.setState({showExportOptions: false});
    }

    private copyToTCGA: React.MouseEventHandler<HTMLDivElement> = (_) => {
        copy(this.props.decklist.exportToTCGA());
        window.alert("Decklist copied to clipboard to be used in TCGArena.");
        this.setState({showExportOptions: false});
    }

    private copyToTTS: React.MouseEventHandler<HTMLDivElement> = (_) => {
        copy(this.props.decklist.exportToTTS());
        window.alert("Decklist copied to clipboard to be used in TTS.");
        this.setState({showExportOptions: false});
    }

    public render(): React.ReactNode {
        const dl = this.props.decklist;
        return (
            <div className={styles.container}>
                <div className={styles.title}>
                    <span>{this.props.title}</span>
                    {(this.props.decklist.link) && <span className={styles.deckLinkSpan}>
                        (<a href={this.props.decklist.link} target="_blank" rel="noreferrer">Link</a>)
                    </span>}
                </div>
                <div className={styles.subtitle}>
                    {(this.props.subtitle) && <span style={{marginRight: "8px"}}>{this.props.subtitle}</span>}
                </div>
                <div className={styles.decklistDetailsContainer}>
                    <div className={styles.cardTypeContainer}>
                        {(["Unit", "Spell", "Gear"] as CardType[]).map((cardType) => {
                            const md = dl.numOfCardType(cardType), sb = dl.numOfCardTypeSideboard(cardType);
                            return (
                                <div className={styles.cardTypeInnerContainer}>
                                    <img src={ImageUtil.getImage(cardType)} height={20} title={cardType} alt={cardType} className={styles.cardType} />
                                    <div className={styles.cardTypeCount}>{md}</div>
                                    {(sb > 0) &&
                                        <div className={styles.sideboard} title='sideboard'>{`+${sb}`}</div>
                                    }
                                </div>
                            );
                        })}
                    </div>
                    <div onClick={()=>{this.setState({showExportOptions: !this.state.showExportOptions})}} className={styles.exportButton} title={"Export"}>
                        <img className={styles.icon} src={ImageUtil.getImage("Export")} height={12} alt={"Export"} />
                    </div>
                    {(this.state.showExportOptions) && (
                        <div className={styles.exportContainer}>
                            <div style={{fontWeight: "600"}}>Export To</div>
                            <div className={styles.exportOptionContainer}>
                                <div className={styles.exportOptionButton} onClick={this.copyToText}>Text</div>
                                <div className={styles.exportOptionButton} onClick={this.copyToTCGA}>TCGA</div>
                                <div className={styles.exportOptionButton} onClick={this.copyToTTS}>TTS</div>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.decklistContainer}>
                    {[[{id: dl.legend, count: 1}], [{id: dl.chosenChampion, count: (dl.mainDeck.length > 0) ? dl.mainDeck[0].count : -1}], dl.mainDeck, dl.battlefields, dl.runeDeck, dl.sideboard].map((arr, i) => (
                        <div className={styles.section} key={i}>
                            {(arr.filter((listing) => (i !== 2 || listing.id !== dl.chosenChampion)).map((listing, j) => 
                                <div className={styles.row} key={j}>
                                    <span className={`${styles.count} ${GET_COLOR_STYLE(GET_CCATEGORY(listing.id), listing.count, 0)}`}>{listing.count}x</span>
                                    <VDecklistCard id={listing.id} options={{type: "showType"}} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
