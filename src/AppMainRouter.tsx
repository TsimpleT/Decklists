import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { ALL_ARCHETYPES, GET_ARCHETYPE_DECKLISTS } from './Data';

import { AppNav } from './AppNav';
import { CardListPage, DecklistTablePage, ErrorPage, GenerateDecklistPage, TournamentResultsPage } from './Pages';

export class AppMainRouter extends React.Component {
    public render(): React.ReactNode {
        return (
            <BrowserRouter>
                <AppNav />
                <Routes>
                    <Route path="" element={ <Link to={`/Riftbound/`} style={{color: "var(--text-default)", marginLeft: "8px"}}></Link>} />
                    <Route path="/Riftbound" element={ <span style={{color: "var(--text-default)", marginLeft: "8px"}}> click something above </span>} />
                    <Route path="/Riftbound/TournamentResults" element={<TournamentResultsPage />} />
                    <Route path="/Riftbound/AllArchetypes" element={
                        <div style={{marginLeft: "4px"}}>
                            {ALL_ARCHETYPES.map((archetype) => 
                                <div onClick={() => {this.setState({archetype: archetype})}} key={archetype}>
                                    <Link to={`/Riftbound/Archetype/${archetype}`} style={{color: "var(--text-default)"}}>
                                        {`${archetype}: ${GET_ARCHETYPE_DECKLISTS(archetype).length} decklist${GET_ARCHETYPE_DECKLISTS(archetype).length === 1 ? "" : "s"}`}
                                    </Link>
                                </div>
                            )}
                        </div>
                    }/>
                    <Route path="/Riftbound/Archetype/:archetype?" element={<DecklistTablePage />} />
                    {(process.env.NODE_ENV === "development") && <Route path="/Riftbound/GenerateDecklist" element={<GenerateDecklistPage />} />}
                    <Route path="/Riftbound/AllCards" element={<CardListPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        );
    }
}
