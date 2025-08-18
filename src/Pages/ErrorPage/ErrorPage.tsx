import React from 'react';
import styles from "./ErrorPage.module.css";

import { DEV_STRING_PRE } from '../../Data';

export class ErrorPage extends React.Component {
    public override componentDidMount(): void {
        console.log(`ErrorPage MOUNT`);
        document.title = `${DEV_STRING_PRE}404`;
    }

    public render(): React.ReactNode {
        return (
            <div className={styles.container}>
                <span>Error 404: this page does not exist</span>
            </div>
        );
    }
}
