import React from 'react';
import styles from './PlayerResultsPage.module.css';

import { DEV_STRING_PRE, GET_DECKLIST, GET_TOURNAMENT_ABBR, GET_TOURNAMENT_ID } from '../../Data';
import { ALL_PLAYERS, GET_PLAYER_RESULTS } from '../../Data/PlayerResults';
import { Link } from 'react-router-dom';

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
                            {GET_PLAYER_RESULTS(username).map((placing) => {
                                const tournId = GET_TOURNAMENT_ID(GET_TOURNAMENT_ABBR(placing.tournament), placing.date);
                                const decklist = GET_DECKLIST(tournId, username);
                                return (
                                    <div className={styles.row}>
                                        <span>{`[${placing.placing}] ${placing.date} ${placing.tournament}`}</span>
                                        {(decklist !== undefined && decklist.legend) &&
                                            <span>
                                                {" ("}
                                                <Link to={`/decklists/riftbound/tournament/${tournId}/decklist/${decklist.username}`}
                                                    style={{color: "var(--text-default)"}}>
                                                        {decklist.archetype}
                                                </Link>
                                                {")"}
                                            </span>
                                        }
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
