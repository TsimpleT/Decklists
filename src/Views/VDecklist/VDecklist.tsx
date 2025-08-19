import React from 'react';
import copy from 'copy-to-clipboard';
import styles from './VDecklist.module.css';

import { Decklist, DECKLIST_TTS_EXPORT, GET_CCATEGORY } from '../../Data';

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
        copy(DECKLIST_TTS_EXPORT(this.props.decklist));
        window.alert("Decklist copied to clipboard to be used for TTS.");
    }

    public render(): React.ReactNode {
        const dl = this.props.decklist;
        return (
            <div className={styles.container}>
                <div className={styles.title}>
                    {this.props.title}
                    {(this.props.hideExport !== true) && <div onClick={this.copyToTTS} className={`${styles.restyleButton}`}>TTS</div>}
                </div>
                <div className={styles.subtitle}>{this.props.subtitle}</div>
                <div className={styles.decklistContainer}>
                    {[{id: dl.legend, count: 1}].concat(dl.mainDeck).concat(dl.battlefields).concat(dl.runeDeck).concat(dl.sideboard).map((listing, i) => (
                        <div className={styles.row}>
                            <span className={`${styles.count} ${GET_COLOR_STYLE(GET_CCATEGORY(listing.id), listing.count, 0)}`}>{listing.count}x</span>
                            <VDecklistCard cardId={listing.id} key={i} options={{type: "all-cards"}} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
