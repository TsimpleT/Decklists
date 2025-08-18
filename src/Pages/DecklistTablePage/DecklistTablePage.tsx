import React from 'react';

import { DEV_STRING_PRE, GET_CASED_ARCHETYPE } from '../../Data';

import { VDecklistTable } from '../../Views';

interface IProps {}

export class DecklistTablePage extends React.Component<IProps> {
    public override componentDidMount(): void {
        document.title = `${DEV_STRING_PRE}${GET_CASED_ARCHETYPE(this.archetype)} Decklists`;
    }
    
    private archetype: string;

    public constructor(props: IProps) {
        super(props);
        let url: string = document.URL;
        if(url.length > 0 && url.charAt(url.length-1) !== "/") {
            url += "/";
        }
        this.archetype = url.slice(url.indexOf("archetype/")+10, url.length-1).replaceAll("-", " ").toLowerCase();
    }

    public render(): React.ReactNode {
        return (<>
            <VDecklistTable archetype={this.archetype} />
        </>);
    }
}
