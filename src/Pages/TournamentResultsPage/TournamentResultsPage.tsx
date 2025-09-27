import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TournamentResultsPage.module.css';

import { DEV_STRING_PRE, TOURNAMENT_RESULTS, GET_TOURNAMENT_ID, ARCHETYPE_TO_LEGEND_BASE_ID } from '../../Data';
import { LegendImage } from '../../Views';

export class TournamentResultsPage extends React.Component {
    public override componentDidMount(): void {
        document.title = `${DEV_STRING_PRE}Tournament Results`;
    }
    
    public render(): React.ReactNode {
        return (
            <div className={styles.container}>
                {TOURNAMENT_RESULTS.map((tournament) => 
                    <div className={styles.tournamentContainer} key={`${tournament.tournamentName} ${tournament.date}`}>
                        <div className={styles.tournamentHeader}>
                            {`${tournament.tournamentName} ${tournament.date} (T${tournament.tier})`}
                            <span className={styles.deckLinkSpan}>
                                {(tournament.links.map((link, i) =>
                                    <a href={link} target="_blank" rel="noreferrer" key={i}>Link</a>
                                ))}
                            </span>
                        </div>
                        <div className={styles.resultsContainer}>
                            {tournament.results.map((placing, i) => 
                                <>
                                    {placing.decklists.map((decklist, j) => {
                                        const content = (
                                            <span className={styles.resultRow} key={`${i} ${j}`}>
                                                <div className={styles.placing}>{placing.placing}</div>
                                                <LegendImage id={ARCHETYPE_TO_LEGEND_BASE_ID(decklist.archetype)} size={28} extraStyles={{border: "none"}} />
                                                <span className={styles.rowText} title={decklist.username} style={(decklist.username[0] === "*") ? {fontStyle: "italic"} : {}}>
                                                    {decklist.username}
                                                </span>
                                            </span>
                                        );
                                        return ((decklist.mainDeck.length > 0)
                                            ? 
                                                <Link to={`/decklists/riftbound/tournament/${GET_TOURNAMENT_ID(tournament.abbrName, tournament.date)}/decklist/${decklist.username}`} style={{color: "var(--text-default)"}} key={`${i} ${j}`}>{content}</Link>
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
