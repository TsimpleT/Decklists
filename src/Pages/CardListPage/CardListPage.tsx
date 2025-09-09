import React from 'react';
import styles from './CardListPage.module.css';

import { ALL_CARD_IDS, DEV_STRING_PRE } from '../../Data';
import { VDecklistCard } from '../../Views';

export class CardListPage extends React.Component {
    public override componentDidMount(): void {
        document.title = `${DEV_STRING_PRE}All Cards`;
    }
    
    public render(): React.ReactNode {
        return (
            <div className={styles.container}>
                {ALL_CARD_IDS.map((id) => 
                    <VDecklistCard id={id} options={{type: "showType"}} key={id} />
                )}
            </div>
        );
    }
}
