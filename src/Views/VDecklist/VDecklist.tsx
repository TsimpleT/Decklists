import React from 'react';
import copy from 'copy-to-clipboard';
import styles from './VDecklist.module.css';

import { Decklist, GET_CCATEGORY, IS_CARD, ImageUtil } from '../../Data';
import { VDecklistCard } from '../VDecklistCard';
import { GET_COLOR_STYLE } from '../VDecklistTable';

interface IProps {
    decklist: Decklist;
    title: string;
    subtitle: string;
    hideExport?: boolean;
}

export class VDecklist extends React.Component<IProps> {
    private copyToTTS: React.MouseEventHandler<HTMLDivElement> = (_) => {
        copy(this.props.decklist.exportToTTS());
        window.alert("Decklist copied to clipboard to be used in TTS.");
    }

    private copyToTCGArena: React.MouseEventHandler<HTMLDivElement> = (_) => {
        copy(this.props.decklist.exportToTCGA());
        window.alert("Decklist copied to clipboard to be used in TCGArena.");
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
                    {(this.props.hideExport !== true) && <div onClick={this.copyToTTS} className={`${styles.restyleButton} ${styles.emptyButton}`} title={"Export to TTS"}>
                        <img className={styles.icon} src={ImageUtil.getImage("Export")} height={14} alt={"Export"} />
                        <span style={{marginLeft: "4px"}}>TTS</span>
                    </div>}
                    {(this.props.hideExport !== true) && <div onClick={this.copyToTCGArena} className={`${styles.restyleButton} ${styles.emptyButton}`} title={"Export to TCGArena"}>
                        <img className={styles.icon} src={ImageUtil.getImage("Export")} height={14} alt={"Export"} />
                        <span style={{marginLeft: "4px"}}>TCGArena</span>
                    </div>}
                </div>
                <div className={styles.decklistContainer}>
                    {(IS_CARD(dl.legend) ? [{id: dl.legend, count: 1}] : []).concat(dl.mainDeck).concat(dl.battlefields).concat(dl.runeDeck).concat(dl.sideboard).map((listing, i) => (
                        <div className={styles.row} key={i}>
                            <span className={`${styles.count} ${GET_COLOR_STYLE(GET_CCATEGORY(listing.id), listing.count, 0)}`}>{listing.count}x</span>
                            <VDecklistCard id={listing.id} key={i} options={{type: "showType"}} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
