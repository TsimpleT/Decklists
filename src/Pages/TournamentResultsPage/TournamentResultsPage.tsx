import React from 'react';
import styles from './TournamentResultsPage.module.css';

import { DEV_STRING_PRE, TOURNAMENT_DECKLISTS } from '../../Data';

export class TournamentResultsPage extends React.Component {
    public override componentDidMount(): void {
        document.title = `${DEV_STRING_PRE}Tournament Results`;
    }
    
    public render(): React.ReactNode {
        return (
            <div className={styles.container}>
                {TOURNAMENT_DECKLISTS.map((tournament) => 
                    <div className={styles.tournamentContainer}>
                        <div className={styles.tournamentHeader}>{`${tournament.tournamentName} ${tournament.date}`}</div>
                        <div>
                            {tournament.placings.map((placing) => 
                                <div>
                                    {placing.decklists.map((decklist) => 
                                        <div>
                                            <div>{`[${placing.placing}] ${decklist.username} (${decklist.archetype})`}</div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
