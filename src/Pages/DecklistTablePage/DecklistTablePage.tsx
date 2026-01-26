import React from 'react';

import { Archetype, ARCHETYPE_FROM_STRING, DEV_STRING_PRE, Meta, META_FROM_STRING } from '../../Data';
import { VDecklistTable } from '../../Views';

interface IProps {}

export class DecklistTablePage extends React.Component<IProps> {
    public override componentDidMount(): void {
        document.title = `${DEV_STRING_PRE}${this.archetype} Decklists`;
    }
    
    private archetype: Archetype;
    private meta: Meta;

    public constructor(props: IProps) {
        super(props);
        let url: string = document.URL;
        if(url.length > 0 && url.charAt(url.length-1) !== "/") {
            url += "/";
        }
        const toParse = url.slice(url.indexOf("archetype/")+10, url.length-1).replaceAll("-", " ");
        this.archetype = ARCHETYPE_FROM_STRING(toParse.slice(0, toParse.indexOf("/")));
        this.meta = META_FROM_STRING(toParse.slice(toParse.indexOf("/")+1, toParse.length));
    }

    public render(): React.ReactNode {
        return (<>
            <VDecklistTable archetype={this.archetype} meta={this.meta} />
        </>);
    }
}
