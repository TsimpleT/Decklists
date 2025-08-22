import React from 'react';
import styles from './LegendImage.module.css';

import { GET_CARD } from '../../Data';

interface IProps { id: string; size: number; imgTitle?: string; subscript?: string; subscriptFontSize?: number; }

export class LegendImage extends React.Component<IProps> {
    public render(): React.ReactNode {
        const card = GET_CARD(this.props.id);
        return (
            <div className={styles.imageContainer} style={{width: this.props.size, height: this.props.size}}>
                {(this.props.id.length > 0)
                    ? <img src={card.art.thumbnailURL} className={styles[`position-${card.id}`]} title={this.props.imgTitle} alt={this.props.imgTitle} />
                    : <div className={styles.unknown}>?</div>
                }
                <span className={styles.subscript} style={(this.props.subscriptFontSize) ? {fontSize: `${this.props.subscriptFontSize}px`} : {}}>{this.props.subscript}</span>
            </div>
        );
    }
}
