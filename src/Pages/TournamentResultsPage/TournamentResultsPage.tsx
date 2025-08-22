import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TournamentResultsPage.module.css';

import { DEV_STRING_PRE, TOURNAMENT_DECKLISTS, GET_TOURNAMENT_ID, ARCHETYPE_TO_LEGEND_ID } from '../../Data';
import { LegendImage } from '../../Views';

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
                                    {placing.decklists.map((decklist) => {
                                        const content = (
                                            <span className={styles.linkContainer}>
                                                <div className={styles.resultContainer}>{placing.placing}</div>
                                                <LegendImage printId={(decklist.archetype) ? ARCHETYPE_TO_LEGEND_ID( decklist.archetype) : ""} size={28} />
                                                <div className={styles.rowText}>{decklist.username}</div>
                                            </span>
                                        );
                                        return ((decklist.mainDeck.length > 0)
                                            ? 
                                                <Link to={`/decklists/riftbound/tournament/${GET_TOURNAMENT_ID(tournament.abbrName, tournament.date)}/decklist/${decklist.username}`} style={{color: "var(--text-default)"}}>{content}</Link>
                                            : content
                                        );
                                    }
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
