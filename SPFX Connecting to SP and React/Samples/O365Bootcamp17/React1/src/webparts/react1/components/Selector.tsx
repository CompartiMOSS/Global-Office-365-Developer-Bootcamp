import * as React from 'react';
import styles from './React1.module.scss';
import { IReact1Props } from './IReact1Props';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Selector extends React.Component <{defaultSelected:any, onChange:any}, { value:string}> {

  constructor(props) {
    super(props);

    this.state = {value: this.props.defaultSelected };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.onChange(event.target.value);
  }

  public render(): React.ReactElement<IReact1Props> {
    return (
        <div>
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="SPHttpClient">SPHttpClient</option>
              <option value="CSOM">CSOM</option>
              <option value="PnP">PnP</option>
            </select>
        </div>
    );
  }
}
