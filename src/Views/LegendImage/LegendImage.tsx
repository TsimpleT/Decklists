import React from 'react';
import styles from './LegendImage.module.css';

import { GET_CARD, GET_CARD_ART } from '../../Data';

interface IProps { printId: string; size: number; imgTitle?: string; subscript?: string; subscriptFontSize?: number; }

export class LegendImage extends React.Component<IProps> {
    public render(): React.ReactNode {
        const card = GET_CARD(this.props.printId);
        return (
            <div className={styles.imageContainer} style={{width: this.props.size, height: this.props.size}}>
                {(this.props.printId.length > 0)
                    ? <img src={GET_CARD_ART(this.props.printId)} className={styles[`position-${card.id}`]} title={this.props.imgTitle} alt={this.props.imgTitle} />
                    : <div className={styles.unknown}>?</div>
                }
                <span className={styles.subscript} style={(this.props.subscriptFontSize) ? {fontSize: `${this.props.subscriptFontSize}px`} : {}}>{this.props.subscript}</span>
            </div>
        );
    }
}
