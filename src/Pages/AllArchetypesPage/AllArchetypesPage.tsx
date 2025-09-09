import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AllArchetypesPage.module.css';

import { DEV_STRING_PRE, GET_ARCHETYPE_DECKLISTS, ARCHETYPE_TO_LEGEND_BASE_ID, ARCHETYPE_TIERS, ImageUtil, ARCHETYPE_TIER_NAMES, GET_CARD } from '../../Data';
import { LegendImage } from '../../Views';

export class AllArchetypesPage extends React.Component {
    public override componentDidMount(): void {
        document.title = `${DEV_STRING_PRE}All Archetypes`;
    }
    
    public render(): React.ReactNode {
        const maxTierSize = Math.max(...ARCHETYPE_TIERS.map((tier) => tier.length));
        return (
            <table className={styles.tableContainer}>
                <thead><tr>{ARCHETYPE_TIERS.map((tier, i) => (tier.length === 0) ? <></> :
                    <th className={styles.tierHeader} key={i}>{ARCHETYPE_TIER_NAMES[i]}</th>
                )}</tr></thead>
                <tbody><tr>{ARCHETYPE_TIERS.filter((tier) => tier.length > 0).map((tier, i) => (tier.length === 0) ? <></> :
                    <td key={i}> <div className={styles.tierCol}>
                        {tier.map((archetype, archetypeIdx) => {
                            const baseId = ARCHETYPE_TO_LEGEND_BASE_ID(archetype);
                            const numLists = GET_ARCHETYPE_DECKLISTS(archetype).length;
                            const title = `${archetype}: ${numLists} Decklists`;
                            const colors = GET_CARD(baseId).domains;
                            return (
                                <Link to={`/decklists/riftbound/archetype/${archetype.replaceAll(" ", "-").toLowerCase()}`} style={{color: "var(--text-default)"}} key={archetypeIdx}>
                                    <div className={styles.linkRow} style={(archetypeIdx+1 === maxTierSize) ? {border: "none"} : {}}>
                                        <LegendImage id={baseId} imgTitle={title} size={50} extraStyles={{border: "none", borderRadius: "0"}} />
                                        <div className={styles.colorsContainer}>
                                            <div className={styles.colorDiv} style={{backgroundColor: `var(--bg-${colors[0].toLowerCase()})`}}>
                                                <img src={ImageUtil.getImage(`${colors[0]}BW`)} height={16} title={colors[0]} alt={colors[0]} />
                                            </div>
                                            <div className={styles.colorDiv} style={{backgroundColor: `var(--bg-${colors[1].toLowerCase()})`, marginTop: "2px"}}>
                                                <img src={ImageUtil.getImage(`${colors[1]}BW`)} height={16} title={colors[1]} alt={colors[1]} />
                                            </div>
                                        </div>
                                        <div className={styles.labelContainer}>
                                            <div className={styles.archetypeText}>{archetype}</div>
                                            <div className={styles.archetypeSubtitle}>{`${numLists} Decklist${(numLists !== 1) ? "s" : ""}`}</div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div> </td>
                )}</tr></tbody>
            </table>
        );
    }
}
