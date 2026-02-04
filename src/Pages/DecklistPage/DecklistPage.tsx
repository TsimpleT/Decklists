import React from 'react';

import { Decklist, DEV_STRING_PRE, LocalStorageManager } from '../../Data';
import { VDecklist } from '../../Views';

interface IProps {}

export class DecklistPage extends React.Component<IProps> {
    public override componentDidMount(): void {
        document.title = `${DEV_STRING_PRE}Decklist ${this.uuid}`;
    }
    
    private uuid: string;
    private decklist?: Decklist;

    public constructor(props: IProps) {
        super(props);
        let url: string = document.URL;
        if(url.length > 0 && url.charAt(url.length-1) !== "/") {
            url += "/";
        }
        this.uuid = decodeURI(url.slice(url.indexOf("me/")+3, url.length-1));
        this.decklist = LocalStorageManager.getInstance().getDecklist(this.uuid);
    }

    public render(): React.ReactNode {
        return ((!this.decklist) ? <div style={{marginLeft: "4px"}}>decklist not found</div> : 
            <VDecklist decklist={this.decklist} initialTitle={LocalStorageManager.getInstance().getDeckName(this.uuid)} subtitle={""}  />
        );
    }
}
