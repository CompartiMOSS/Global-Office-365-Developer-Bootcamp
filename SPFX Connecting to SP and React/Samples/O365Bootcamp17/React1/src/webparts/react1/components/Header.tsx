import * as React from 'react';
import styles from './React1.module.scss';
import { IReact1Props } from './IReact1Props';
import { escape } from '@microsoft/sp-lodash-subset';
import Selector from './Selector';
import LoadButton from './LoadButton';
import { eQueryType } from '../../../services/eQueryType';

export default class Header extends React.Component<{defaultSelected: eQueryType, onChange:any}, { value:string, type:eQueryType }> {
    constructor(props) {
        super(props);
        
        this.state = {value:"", type: this.props.defaultSelected };

        this.handleQueryTypeChange = this.handleQueryTypeChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleQueryTypeChange(event:string) {
        this.setState({type: eQueryType[event]});
    }

    handleClick(event) {
        this.props.onChange(this.state.type);
    }

    public render(): React.ReactElement<IReact1Props> {
    return (
        <div className={ styles.container }>
            <div className={ styles.row }>
                <div className={ styles.column }>
                    <Selector defaultSelected={this.state.type} onChange={this.handleQueryTypeChange} />
                </div>
                <div className={ styles.column }>
                    <LoadButton onClick={this.handleClick} />
                </div>
            </div>
        </div>
    );
  }
}