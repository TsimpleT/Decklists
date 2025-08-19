import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TournamentResultsPage.module.css';

import { DEV_STRING_PRE, TOURNAMENT_DECKLISTS, TOURNAMENT_RESULT_TO_ID } from '../../Data';

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
                                <>
                                    {placing.decklists.map((decklist) => 
                                        <div className={styles.row}>
                                            <span>{`[${placing.placing}] ${decklist.username}`}</span>
                                            {(decklist.legend.length > 0) &&
                                                <span>
                                                    {" ("}
                                                    <Link to={`/decklists/riftbound/tournament/${TOURNAMENT_RESULT_TO_ID(tournament)}/decklist/${decklist.username}`}
                                                        style={{color: "var(--text-default)"}}>
                                                            {decklist.archetype}
                                                    </Link>
                                                    {")"}
                                                </span>
                                            }
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
