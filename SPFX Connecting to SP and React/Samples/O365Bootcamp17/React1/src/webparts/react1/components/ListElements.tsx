import * as React from 'react';
import styles from './React1.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { IElementos,IElemento } from '../../../services/IElementos';



export default class ListElementos extends React.Component<IElementos> {
    
    constructor (props) {
        super(props);
    } 
   

    public render(): React.ReactElement<IElementos> {
        if(this.props.Elementos == null)
            return null;

        return (
            <div className={ styles.row }>
                <ul>
                    {this.props.Elementos.map( (e) =>
                        <li> {e.Title} </li>
                    )}
                </ul>
            </div>
        );
    }
}
