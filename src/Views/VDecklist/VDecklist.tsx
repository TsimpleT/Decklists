import React from 'react';
import styles from './VDecklist.module.css';

import { DecklistCardAmount } from '../../Data';

import { VDecklistCard } from '../VDecklistCard';

interface IProps {
    deckName: string;
    username?: string;
    link?: string;
    decklist: DecklistCardAmount[];
}

export class VDecklist extends React.Component<IProps> {
    public render(): React.ReactNode {
        return (
            <div className={styles.container}>
                <div>
                    {this.props.deckName}
                </div>
                <div className={styles.decklistContainer}>
                    {this.props.decklist.map(
                        (listing, i) => <VDecklistCard id={listing.id} key={i} />
                    )}
                </div>
            </div>
        );
    }
}
