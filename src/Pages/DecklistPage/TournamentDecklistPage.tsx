import React from 'react';

import { Decklist, DEV_STRING_PRE, GET_TOURNAMENT_DECKLIST, GET_PLACING, GET_TOURNAMENT_NAME } from '../../Data';
import { VDecklist } from '../../Views';

interface IProps {}

export class TournamentDecklistPage extends React.Component<IProps> {
    public override componentDidMount(): void {
        document.title = `${DEV_STRING_PRE}Decklist ${this.username} ${this.tournId}`;
    }
    
    private tournId: string;
    private username: string;
    private decklist?: Decklist;
    private placing?: string;

    public constructor(props: IProps) {
        super(props);
        let url: string = document.URL;
        if(url.length > 0 && url.charAt(url.length-1) !== "/") {
            url += "/";
        }
        this.tournId = url.slice(url.indexOf("tournament/")+11, url.indexOf("/decklist/"));
        this.username = decodeURI(url.slice(url.indexOf("decklist/")+9, url.length-1));
        this.decklist = GET_TOURNAMENT_DECKLIST(this.tournId, this.username);
        this.placing = GET_PLACING(this.tournId, this.username);
    }

    public render(): React.ReactNode {
        return ((!this.decklist || !this.placing) ? <div style={{marginLeft: "4px"}}>decklist not found</div> :
            <VDecklist decklist={this.decklist} title={`${GET_TOURNAMENT_NAME(this.tournId)} ${this.decklist.date}: ${this.placing}`} subtitle={`by ${this.username}`}  />
        );
    }
}
