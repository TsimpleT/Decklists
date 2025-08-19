import React from 'react';
import styles from './VDecklistTable.module.css';

import { ALL_CCATEGORIES, CARD_STATS, CC_CARD_STATS, CCATEGORY, Decklist, DL_CC_CARD_STATS, GET_ARCHETYPE_DECKLISTS, GET_CARD, GET_CCATEGORY } from '../../Data';

import { VDecklistCard } from '../VDecklistCard';

interface IProps {
    archetype: string;
    // username?: string;
    // link?: string;
}

export function GET_COLOR_STYLE(cc: CCATEGORY, count: number, sideCount: number): string {
    return ((cc === CCATEGORY.BATTLEFIELD && count === 1) || cc === CCATEGORY.RUNE || cc === CCATEGORY.LEGEND) ? ""
        : (count === 3) ? styles.gold : (count === 2) ? styles.silver : (count === 1) ? styles.bronze : (count === 0 && sideCount === 0) ? styles.blank : "";
}

const colors: [number, number, number][] = [  [0,0,0], [180,95,6], [100,100,100], [187,154,66] ];
const maxStyleStr: string = `rgb(${colors[colors.length-1][0]},${colors[colors.length-1][1]},${colors[colors.length-1][2]})`;
function getColorScale(cc: CCATEGORY, n: number): React.CSSProperties {
    if(cc === CCATEGORY.RUNE) { return { backgroundColor: "#000" }; }
    if(cc === CCATEGORY.LEGEND) { return { backgroundColor: (n === 0) ? "#000" : maxStyleStr }; }
    if(n < 0 || n > 1) { throw Error(`getColorScale n=${n} not in [0,1]`); }
    if(n === 1) { return { backgroundColor: maxStyleStr }; }
    const nSections = colors.length-1;
    
    let lowColor = colors[0], highColor = colors[colors.length-1];
    for(let i = 0; i < colors.length-1; i++) {
        if(nSections*n < i+1) {
            lowColor = colors[i];
            highColor = colors[i+1];
            break;
        }
    }
    const adjN = nSections*n - Math.floor(nSections*n);
    const r = lowColor[0] + adjN*(highColor[0]-lowColor[0]), g = lowColor[1] + adjN*(highColor[1]-lowColor[1]), b = lowColor[2] + adjN*(highColor[2]-lowColor[2]);
    return { backgroundColor: `rgb(${r},${g},${b})` };
}

export class VDecklistTable extends React.Component<IProps> {
    private decklists: Decklist[];
    private cardIds: string[];
    private cardAmounts: {[cardId: string]: number[]};
    private sideboardAmounts: {[cardId: string]: number[]};
    private cardStats: {[cardId: string]: CARD_STATS};
    private ccategoryStats: {[ccategory: string]: CC_CARD_STATS};
    private decklistCCategoryStats: {[ccategory: string]: DL_CC_CARD_STATS}[];

    constructor(props: IProps) {
        super(props);
        this.decklists = GET_ARCHETYPE_DECKLISTS(props.archetype);
        this.cardIds = [];
        this.cardAmounts = {};
        this.sideboardAmounts = {};
        this.cardStats = {};
        this.ccategoryStats = {};
        this.decklistCCategoryStats = [];

        this.recordCardAmounts();
        this.recordStats();
        this.sortCardIds();
    }

    private recordCardAmounts(): void {
        for(let decklistNum = 0; decklistNum < this.decklists.length; decklistNum++) {
            const decklist = this.decklists[decklistNum];
            for(let listing of decklist.mainDeck.concat(decklist.battlefields).concat(decklist.runeDeck).concat({id: decklist.legend, count: 1})) {
                const cardId = listing.id.substring(0,7);
                if(!this.cardIds.includes(cardId)) {
                    this.cardIds.push(cardId);
                    this.cardAmounts[cardId] = [];
                    for(let i = 0; i < decklistNum; i++) {
                        this.cardAmounts[cardId].push(0);
                    }
                    this.sideboardAmounts[cardId] = [];
                    for(let i = 0; i < decklistNum; i++) {
                        this.sideboardAmounts[cardId].push(0);
                    }
                }
                this.cardAmounts[cardId].push(listing.count);
            }
            for(let listing of decklist.sideboard) {
                const cardId = listing.id.substring(0, 7);
                if(!this.cardIds.includes(cardId)) {
                    this.cardIds.push(cardId);
                    this.cardAmounts[cardId] = [];
                    for(let i = 0; i < decklistNum; i++) {
                        this.cardAmounts[cardId].push(0);
                    }
                    this.sideboardAmounts[cardId] = [];
                    for(let i = 0; i < decklistNum; i++) {
                        this.sideboardAmounts[cardId].push(0);
                    }
                }
                this.sideboardAmounts[cardId].push(listing.count);
            }
            for(let cardId in this.cardAmounts) {
                if(this.cardAmounts[cardId].length <= decklistNum) {
                    this.cardAmounts[cardId].push(0);
                }
                if(this.sideboardAmounts[cardId].length <= decklistNum) {
                    this.sideboardAmounts[cardId].push(0);
                }
            }
        }
    }

    private recordStats(): void {
        for(let cc of ALL_CCATEGORIES) {
            this.ccategoryStats[cc] = { avg: 0, sbAvg: 0, min: -1, max: -1, sbMin: -1, sbMax: -1 };
        }
        for(let cardId of this.cardIds) {
            const maindeckAmts = this.cardAmounts[cardId];
            this.cardStats[cardId] = {
                mdApp: maindeckAmts.filter((n) => n > 0).length / maindeckAmts.length,
                avg: maindeckAmts.reduce((a,b)=>a+b)/maindeckAmts.length,
                min: Math.min(...maindeckAmts),
                max: Math.max(...maindeckAmts),
                sbAvg: this.sideboardAmounts[cardId].reduce((a, b) => a + b) / this.sideboardAmounts[cardId].length
            }
            const cc = GET_CCATEGORY(cardId);
            this.ccategoryStats[cc].avg += this.cardStats[cardId].avg;
            this.ccategoryStats[cc].sbAvg += this.cardStats[cardId].sbAvg;
        }

        for(let decklistNum = 0; decklistNum < this.decklists.length; decklistNum++) {
            const decklist = this.decklists[decklistNum];
            this.decklistCCategoryStats.push({});
            for(let cc of ALL_CCATEGORIES) {
                this.decklistCCategoryStats[decklistNum][cc] = { total: 0, sbTotal: 0 };
            }
            for(let cardAmount of decklist.mainDeck.concat(decklist.battlefields).concat(decklist.runeDeck).concat({id: decklist.legend, count: 1})) {
                this.decklistCCategoryStats[decklistNum][GET_CCATEGORY(cardAmount.id)].total += cardAmount.count;
            }
            for(let cardAmount of decklist.sideboard) {
                this.decklistCCategoryStats[decklistNum][GET_CCATEGORY(cardAmount.id)].sbTotal += cardAmount.count;
            }
        }
        
        for(let cc of ALL_CCATEGORIES) {
            const statsArr: DL_CC_CARD_STATS[] = this.decklistCCategoryStats.map((ccDict) => ccDict[cc]);
            this.ccategoryStats[cc].min = Math.min(...statsArr.map((stats) => stats.total));
            this.ccategoryStats[cc].max = Math.max(...statsArr.map((stats) => stats.total));
            this.ccategoryStats[cc].sbMin = Math.min(...statsArr.map((stats) => stats.sbTotal));
            this.ccategoryStats[cc].sbMax = Math.max(...statsArr.map((stats) => stats.sbTotal));
        }
    }

    private sortCardIds(): void {
        this.cardIds.sort((aId, bId) => {
            const a = GET_CARD(aId), b = GET_CARD(bId);
            const aStats = this.cardStats[aId], bStats = this.cardStats[bId];
            if(aStats.mdApp !== bStats.mdApp) {
                return bStats.mdApp - aStats.mdApp;
            }
            if(aStats.avg !== bStats.avg) {
                return bStats.avg - aStats.avg;
            }
            if(aStats.sbAvg !== bStats.sbAvg) {
                return bStats.sbAvg - aStats.sbAvg;
            }
            return a.id.localeCompare(b.id);
        });
    }

    public render(): React.ReactNode {
        return (
            <div className={styles.container}>
                <table>
                    <thead>
                        <tr className={styles.labelHeaderRow}>
                            <th className={styles.cardColumnHeader}>Card</th>
                            <th title={"Main Deck % Appearance"}>MD%</th>
                            <th>Avg</th>
                            <th>Range</th>
                            {this.decklists.map((decklist, deckIdx) => {
                                let md = 0, sb = 0;
                                for(let cardId of this.cardIds) {
                                    md += this.cardAmounts[cardId][deckIdx];
                                    sb += this.sideboardAmounts[cardId][deckIdx];
                                }
                                let info: string[] = [];
                                if(decklist.date) info.push(decklist.date);
                                if(decklist.username) info.push(decklist.username);
                                return (
                                    <th className={styles.cell} key={deckIdx} title={info.join(" ")}>
                                        <span className={styles.mainDeck}>{md}</span>
                                        {(sb > 0) &&
                                            <span className={styles.sideboard}>{sb}</span>
                                        }
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {([...ALL_CCATEGORIES]/*.sort((a, b) => this.ccategoryStats[b].avg - this.ccategoryStats[a].avg)*/.map((cc) => (<>
                            <tr>
                                <th colSpan={2} className={styles.sectionHeader}>{cc}</th>
                                <th className={styles.sectionHeaderCell}>
                                    <span className={styles.mainDeck}>
                                        { this.ccategoryStats[cc].avg.toFixed(2) }
                                    </span>
                                    {(this.ccategoryStats[cc].sbAvg > 0) &&
                                        <span className={styles.sideboard} title={"sideboard"}>{ this.ccategoryStats[cc].sbAvg.toFixed(2) }</span>
                                    }
                                </th>
                                <th className={styles.sectionHeaderCell}>
                                    <span className={styles.mainDeck}>
                                        { (this.ccategoryStats[cc].min === this.ccategoryStats[cc].max) ? this.ccategoryStats[cc].min : `${this.ccategoryStats[cc].min}-${this.ccategoryStats[cc].max}` }
                                    </span>
                                    {(this.ccategoryStats[cc].sbMin + this.ccategoryStats[cc].sbMax > 0) &&
                                        <span className={styles.sideboard} title={"sideboard"}>
                                            { (this.ccategoryStats[cc].sbMin === this.ccategoryStats[cc].sbMax) ? this.ccategoryStats[cc].sbMin : `${this.ccategoryStats[cc].sbMin}-${this.ccategoryStats[cc].sbMax}` }
                                        </span>
                                    }
                                </th>
                                {this.decklists.map((_, deckIdx) => 
                                    <th className={styles.sectionHeaderCell}>
                                        <span className={styles.mainDeck}>
                                            { this.decklistCCategoryStats[deckIdx][cc].total }
                                        </span>
                                        {(this.decklistCCategoryStats[deckIdx][cc].sbTotal > 0) &&
                                            <span className={styles.sideboard} title={"sideboard"}>{ this.decklistCCategoryStats[deckIdx][cc].sbTotal }</span>
                                        }
                                    </th>
                                )}
                            </tr>
                            {this.cardIds.filter((cardId) => GET_CCATEGORY(cardId) === cc).map((cardId, cardIdx) => {
                                const stats = this.cardStats[cardId];
                                return (
                                    <tr key={cardIdx}>
                                        <VDecklistCard cardId={cardId} options={{type: "table"}}/>
                                        <td className={styles.statsCell} style={getColorScale(cc, stats.mdApp)}>
                                            <span className={styles.mainDeck}>
                                                { stats.mdApp.toLocaleString(undefined,{style:'percent'}) }
                                            </span>
                                        </td>
                                        <td className={styles.statsCell} style={getColorScale(cc, stats.avg / ((cc === CCATEGORY.BATTLEFIELD) ? 1 : 3))}>
                                            <span className={styles.mainDeck}>
                                                { stats.avg.toFixed(2) }
                                            </span>
                                            {(stats.sbAvg > 0) &&
                                                <span className={styles.sideboard} title={"sideboard"}>{ stats.sbAvg.toFixed(2) }</span>
                                            }
                                        </td>
                                        <td className={styles.statsCell} style={{ backgroundColor: "#000" }}>
                                            <span className={styles.mainDeck}>
                                                { (stats.min === stats.max) ? stats.min : `${stats.min}-${stats.max}` }
                                            </span>
                                        </td>
                                        {this.cardAmounts[cardId].map((count, deckIdx) => (
                                            <td className={`${styles.cell} ${GET_COLOR_STYLE(cc, count, this.sideboardAmounts[cardId][deckIdx])}`} key={deckIdx}>
                                                <span className={styles.mainDeck}>{count}</span>
                                                {(this.sideboardAmounts[cardId][deckIdx] > 0) &&
                                                    <span className={styles.sideboard} title={"sideboard"}>
                                                        {this.sideboardAmounts[cardId][deckIdx]}
                                                    </span>
                                                }
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </>)))}
                    </tbody>
                </table>
            </div>
        );
    }
}
