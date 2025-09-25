import React from 'react';

import { Archetype, ARCHETYPE_FROM_STRING, DEV_STRING_PRE } from '../../Data';
import { VDecklistTable } from '../../Views';

interface IProps {}

export class DecklistTablePage extends React.Component<IProps> {
    public override componentDidMount(): void {
        document.title = `${DEV_STRING_PRE}${this.archetype} Decklists`;
    }
    
    private archetype: Archetype;

    public constructor(props: IProps) {
        super(props);
        let url: string = document.URL;
        if(url.length > 0 && url.charAt(url.length-1) !== "/") {
            url += "/";
        }
        this.archetype = ARCHETYPE_FROM_STRING(url.slice(url.indexOf("archetype/")+10, url.length-1).replaceAll("-", " "));
    }

    public render(): React.ReactNode {
        return (<>
            <VDecklistTable archetype={this.archetype} />
        </>);
    }
}
