import React from 'react';

import { VDecklistTable } from '../../Views';

interface IProps {}

export class DecklistTablePage extends React.Component<IProps> {
    private archetype: string;

    public constructor(props: IProps) {
        super(props);
        let url: string = document.URL;
        if(url.length > 0 && url.charAt(url.length-1) !== "/") {
            url += "/";
        }
        this.archetype = url.slice(url.indexOf("Archetype/")+10, url.length-1).replaceAll("%20", " ");
    }

    public render(): React.ReactNode {
        return (<>
            <VDecklistTable archetype={this.archetype} />
        </>);
    }
}
