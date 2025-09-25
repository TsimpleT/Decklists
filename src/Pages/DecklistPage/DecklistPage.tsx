import React from 'react';

import { Archetype, ARCHETYPE_FROM_STRING, Decklist, DEV_STRING_PRE, GET_EXPERT_DECKLIST } from '../../Data';
import { VDecklist } from '../../Views';

interface IProps {}

export class DecklistPage extends React.Component<IProps> {
    public override componentDidMount(): void {
        document.title = `${DEV_STRING_PRE}Decklist ${this.username} ${this.archetype}`;
    }
    
    private archetype: Archetype;
    private username: string;
    private decklist?: Decklist;

    public constructor(props: IProps) {
        super(props);
        let url: string = document.URL;
        if(url.length > 0 && url.charAt(url.length-1) !== "/") {
            url += "/";
        }
        const urlData = decodeURI(url.slice(url.indexOf("decklist/")+9, url.length-1)).split("/");
        this.archetype = ARCHETYPE_FROM_STRING(urlData[0]);
        this.username = urlData[1];
        this.decklist = GET_EXPERT_DECKLIST(this.archetype, this.username);
    }

    public render(): React.ReactNode {
        return ((!this.decklist) ? <div style={{marginLeft: "4px"}}>decklist not found</div> : 
            <VDecklist decklist={this.decklist} title={this.archetype} subtitle={`by ${this.username}`}  />
        );
    }
}
