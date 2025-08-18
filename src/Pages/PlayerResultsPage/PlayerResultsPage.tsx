import React from 'react';
import styles from './PlayerResultsPage.module.css';

import { DEV_STRING_PRE } from '../../Data';
import { ALL_PLAYERS, GET_PLAYER_RESULTS } from '../../Data/PlayerResults';

export class PlayerResultsPage extends React.Component {
    public override componentDidMount(): void {
        document.title = `${DEV_STRING_PRE}Player Results`;
    }
    
    public render(): React.ReactNode {
        return (
            <div className={styles.container}>
                {ALL_PLAYERS.map((username) => 
                    <div className={styles.tournamentContainer}>
                        <div className={styles.tournamentHeader}>{username}</div>
                        <div>
                            {GET_PLAYER_RESULTS(username).map((playerPlacing) => 
                                <div>{`[${playerPlacing.placing}] ${playerPlacing.tournament} (${playerPlacing.date})`}</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
