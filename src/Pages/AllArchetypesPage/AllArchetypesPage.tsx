import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AllArchetypesPage.module.css';

import { ALL_ARCHETYPES, DEV_STRING_PRE, GET_ARCHETYPE_DECKLISTS, ARCHETYPE_TO_LEGEND_ID } from '../../Data';
import { LegendImage } from '../../Views';

export class AllArchetypesPage extends React.Component {
    public override componentDidMount(): void {
        document.title = `${DEV_STRING_PRE}All Archetypes`;
    }
    
    public render(): React.ReactNode {
        return (
            <div className={styles.container}>
                {ALL_ARCHETYPES.map((archetype) => {
                    const id = ARCHETYPE_TO_LEGEND_ID(archetype);
                    const numLists = GET_ARCHETYPE_DECKLISTS(archetype).length;
                    const title = `${archetype}: ${numLists} Decklists (${id})`;
                    return (
                        <div className={styles.linkContainer} key={archetype}>
                            <Link to={`/decklists/riftbound/archetype/${archetype.replaceAll(" ", "-").toLowerCase()}`} style={{color: "var(--text-default)"}}>
                                <LegendImage printId={id} imgTitle={title} size={80} subscript={`${numLists}`} subscriptFontSize={20} />
                            </Link>
                        </div>
                    );
                })}
            </div>
        );
    }
}
