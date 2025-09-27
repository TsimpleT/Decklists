import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AllArchetypesPage.module.css';

import { DEV_STRING_PRE, GET_ARCHETYPE_DECKLISTS, ARCHETYPE_TO_LEGEND_BASE_ID, ARCHETYPE_TIERS, ImageUtil, ARCHETYPE_TIER_NAMES, GET_CARD, MAX_ARCHETYPE_TIER_SIZE } from '../../Data';
import { LegendImage } from '../../Views';

const BOTTOM_ARCHETYPE_STYLE = {borderBottom: "none", borderRadius: "0 0 8px 8px"};

export class AllArchetypesPage extends React.Component {
    public override componentDidMount(): void {
        document.title = `${DEV_STRING_PRE}All Archetypes`;
    }
    
    public render(): React.ReactNode {
        return (
            <div className={styles.container}>
                {ARCHETYPE_TIERS.map((tier, tierIdx) =>
                    <div className={styles.columnContainer} key={tierIdx}>
                        <div className={styles.tierHeader}>{ARCHETYPE_TIER_NAMES[tierIdx]}</div>
                        {(tier.length === 0) &&
                            <div className={styles.archetypeContainer} style={{paddingLeft: "15px"}}>
                                <span>Nothing in This Tier Right Now</span>
                            </div>
                        }
                        {tier.map((archetype, archetypeIdx) => {
                            const baseId = ARCHETYPE_TO_LEGEND_BASE_ID(archetype);
                            const numLists = GET_ARCHETYPE_DECKLISTS(archetype).length;
                            const subtitle = `${numLists} Tourney Decklist${(numLists !== 1) ? "s" : ""}`
                            const title = `${archetype}: ${subtitle}`;
                            const colors = GET_CARD(baseId).domains;
                            return (
                                <Link to={`/decklists/riftbound/archetype/${archetype.replaceAll(" ", "-")}`} style={{all: "unset"}} key={archetypeIdx}>
                                    <div className={styles.archetypeContainer} style={(archetypeIdx === MAX_ARCHETYPE_TIER_SIZE-1) ? BOTTOM_ARCHETYPE_STYLE : {}}>
                                        <LegendImage id={baseId} imgTitle={title} size={48} extraStyles={{border: "none"}} />
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
                                            <div className={styles.archetypeSubtitle}>{subtitle}</div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}

                    </div>
                )}
            </div>
        );
    }
}
