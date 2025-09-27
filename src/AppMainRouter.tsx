import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { DEV_STRING_PRE } from './Data';
import { AppNav } from './AppNav';
import { AllArchetypesPage, CardListPage, DecklistTablePage, ErrorPage, PlayerResultsPage, TournamentResultsPage, TournamentDecklistPage, MyDecklistsPage, DecklistPage } from './Pages';

export class AppMainRouter extends React.Component {
    public override componentDidMount(): void {
        document.title = `${DEV_STRING_PRE}Decklist Comparisons`;
    }
    
    public render(): React.ReactNode {
        return (
            <BrowserRouter>
                <AppNav />
                <Routes>
                    <Route path="/decklists/" element={ <span style={{color: "var(--text-default)", marginLeft: "8px"}}> home page; click something above </span> } />
                    <Route path="/decklists/riftbound" element={ <span style={{color: "var(--text-default)", marginLeft: "8px"}}> home page; click something above </span>} />
                    <Route path="/decklists/riftbound/me" element={<MyDecklistsPage />} />
                    <Route path="/decklists/riftbound/me/:deckid" element={<DecklistPage />} />
                    <Route path="/decklists/riftbound/all-archetypes" element={<AllArchetypesPage />} />
                    <Route path="/decklists/riftbound/archetype/:archetype" element={<DecklistTablePage />} />
                    <Route path="/decklists/riftbound/player-results" element={<PlayerResultsPage />} />
                    <Route path="/decklists/riftbound/all-cards" element={<CardListPage />} />
                    <Route path="/decklists/riftbound/tournament-results" element={<TournamentResultsPage />} />
                    <Route path="/decklists/riftbound/tournament/:tourneyName/decklist/:username" element={<TournamentDecklistPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        );
    }
}
