import * as React from 'react';
import styles from './React1.module.scss';
import { IReact1Props } from './IReact1Props';
import { escape } from '@microsoft/sp-lodash-subset';

export default class LoadButton extends React.Component< {onClick:any}> {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onClick(e.target.value);
  }
  
  public render(): React.ReactElement<IReact1Props> {
    return (
         <input type="button" value="Cargar" onClick={this.handleChange} />
    );
  }
}
