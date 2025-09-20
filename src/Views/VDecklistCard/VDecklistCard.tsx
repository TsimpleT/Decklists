import React from 'react';
import styles from './VDecklistCard.module.css';
import posStyles from './ImagePositioning.module.css';

import { GET_CARD, CardDTO, ImageUtil, DOMAIN, TYPE, GET_CARD_ART } from '../../Data';

type PropsOptions = {type: "table"|"showType"};

interface IProps { id: string; options: PropsOptions; fixHover?: boolean }
interface IState { hover: boolean; }

export class VDecklistCard extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { hover: false };
    }

    private onMouseEnter = (): void => {
        this.setState({ hover: true });
    }

    private onMouseLeave = (): void => {
        this.setState({ hover: false });
    }

    public render(): React.ReactNode {
        const card: CardDTO = GET_CARD(this.props.id);
        let powerIcons = [];
        let containerStyle: React.CSSProperties = {};
        let fadeLStyle: React.CSSProperties = {};
        let fadeRStyle: React.CSSProperties = {};
        for(let i = 0; i < ((card.power === undefined) ? 0 : card.power); i++) {
            powerIcons.push(
                <img src={ImageUtil.getImage((card.domains.length === 1) ? card.domains[0] : "RainbowRune")}
                    height={12} title={card.domains.join(",")} alt={card.domains.join(",")} key={i} />
            );
        }
        if(card.domains.length === 0) {
            containerStyle.background = "#6C6C6C";
            fadeLStyle.background = "linear-gradient(to left, transparent, #6C6C6C)";
            fadeRStyle.background = "linear-gradient(to right, transparent, #6C6C6C)";
        } else if(card.domains.length === 1) {
            containerStyle.backgroundColor = `var(--bg-${card.domains[0].toLowerCase()})`;
            fadeLStyle.background = `linear-gradient(to left, transparent, var(--bg-${card.domains[0].toLowerCase()})`;
            fadeRStyle.background = `linear-gradient(to right, transparent, var(--bg-${card.domains[0].toLowerCase()})`;
        } else if(card.domains.length === 2) {
            containerStyle.background = `linear-gradient(90deg, var(--bg-${card.domains[0].toLowerCase()}) 27%, var(--bg-${card.domains[1].toLowerCase()}) 45%, var(--bg-${card.domains[1].toLowerCase()}) 90%, var(--bg-${card.domains[0].toLowerCase()}) 99%`;
            fadeLStyle.background = `linear-gradient(to left, transparent, var(--bg-${card.domains[1].toLowerCase()})`;
            fadeRStyle.background = `linear-gradient(to right, transparent, var(--bg-${card.domains[1].toLowerCase()})`;
        }
        
        const content: React.ReactNode = (
            <div className={styles.wrapperForImg} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} title={`${card.name} (${this.props.id})`} >
                <div className={styles.container} style={containerStyle}>
                    <span className={(card.domains.length > 0 && card.domains[0] === DOMAIN.ORDER) ? styles.leftContainerOrder : styles.leftContainer}>
                        <span className={styles.cardName}>{card.name}</span>
                    </span>
                    <div className={styles.rightContainer}>
                        {(card.energy || card.power) &&
                            <span className={styles.cost} style={(this.props.options.type !== "table") ? {marginRight: "2px"} : {}}>
                                <span className={styles.energyCost}>
                                    {card.energy}
                                </span>
                                {(powerIcons.length > 0) && powerIcons}
                            </span>
                        }
                        {(this.props.options.type !== "table" || card.type === TYPE.LEGEND || card.type === TYPE.RUNE || card.type === TYPE.BATTLEFIELD) &&
                            <img src={ImageUtil.getImage(card.type)} height={20} title={card.type} alt={card.type}
                                className={`${styles.cardType} ${(card.domains.length > 0 && card.domains[0] === DOMAIN.ORDER) ? styles.invert : ""}`} />
                        }
                    </div>
                </div>
                <div className={styles.cardImageFullContainer}>
                    <div className={`${styles.cardImageSmallContainer} ${posStyles[`${this.props.id.replaceAll("*","")}-div`]}`}>
                        <img src={GET_CARD_ART(this.props.id)} alt={`${card.name} (${this.props.id})`}
                            className={`${(card.type === TYPE.BATTLEFIELD) ? styles.cardSmallImageBF : styles.cardSmallImage} ${posStyles[this.props.id.replaceAll("*","")]}`}/>
                        <div className={styles.leftImageFade} style={fadeLStyle}/>
                        <div className={styles.rightImageFade} style={fadeRStyle} />
                    </div>
                </div>
                {(this.state.hover) &&
                    <img src={GET_CARD_ART(this.props.id)} className={(card.type === TYPE.BATTLEFIELD) ? styles.cardHoverImageRotated : styles.cardHoverImage}
                        alt={`${card.name} (${this.props.id})`} style={(this.props.fixHover) ? {right: "-301px"} : {}} />
                }
            </div>
        );

        return (this.props.options.type === "table") ? <td>{content}</td> : <>{content}</>;
    }
}
