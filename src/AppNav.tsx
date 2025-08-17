import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./AppNav.module.css";

// enum Game { NONE, RIFTBOUND }
// interface IState { game: Game }

export class AppNav extends React.Component/*<{}, IState>*/ {
    // constructor(props: {}) {
    //     super(props);
    //     this.state = { game: Game.NONE };
    // }

    // public override componentDidMount(): void {
    //     console.log("mount");
    //     this.setState({game: document.URL.includes("Riftbound") ? Game.RIFTBOUND : Game.NONE });
    // }

    // public override componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
    //     console.log("update");
    //     this.setState({game: document.URL.includes("Riftbound") ? Game.RIFTBOUND : Game.NONE });
    // }

    public render(): React.ReactNode {
        return /*(this.state.game === Game.RIFTBOUND) ? */this.renderRiftbound()/* : <nav />*/;
    }

    public renderRiftbound(): React.ReactNode {
        return (<>
            <nav className={styles.container}>
                <Link to={"/Riftbound/TournamentResults"}>
                    Tournament Results
                </Link>
                <Link to={"/Riftbound/AllArchetypes"}>
                    All Archetypes
                </Link>
                {(process.env.NODE_ENV === "development") && 
                    <Link to={"/Riftbound/GenerateDecklist"}>
                        Generate Decklist
                    </Link>
                }
                <Link to={"/Riftbound/AllCards"}>
                    All Cards
                </Link>
            </nav>
            <div style={{marginBottom: "40px"}}/>
        </>);
    }
}
