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
                {ALL_CARD_IDS.map((id, i) => {
                    const diff = (i === 0 || ALL_CARD_IDS[i].substring(0,3) !== ALL_CARD_IDS[i-1].substring(0,3)) ? 1 : parseInt(ALL_CARD_IDS[i].substring(4))-parseInt(ALL_CARD_IDS[i-1].substring(4));
                    return (<>
                        {(diff !== 1) && <div>{`${diff-1} missing card(s)`}</div>}
                        <VDecklistCard cardId={id} options={{type: "all-cards"}} key={id} />
                    </>);
                })}
            </div>
        );
    }
}
