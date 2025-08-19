import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AllArchetypesPage.module.css';

import { ALL_ARCHETYPES, DEV_STRING_PRE, GET_ARCHETYPE_DECKLISTS } from '../../Data';

export class AllArchetypesPage extends React.Component {
    public override componentDidMount(): void {
        document.title = `${DEV_STRING_PRE}All Archetypes`;
    }
    
    public render(): React.ReactNode {
        return (
            <div className={styles.container}>
                {ALL_ARCHETYPES.map((archetype) => 
                    <div key={archetype}>
                        <Link to={`/decklists/riftbound/archetype/${archetype.replaceAll(" ", "-").toLowerCase()}`} style={{color: "var(--text-default)"}}>
                            {`${archetype}: ${GET_ARCHETYPE_DECKLISTS(archetype).length} decklist${GET_ARCHETYPE_DECKLISTS(archetype).length === 1 ? "" : "s"}`}
                        </Link>
                    </div>
                )}
            </div>
        );
    }
}
