import * as React from 'react';
import styles from './React1.module.scss';
import { IReact1Props } from './IReact1Props';
import { IReact1ComposedState } from './IReact1ComposedState';
import { IElementos, IElemento } from '../../../services/IElementos';
import { eQueryType } from '../../../services/eQueryType';
import { escape } from '@microsoft/sp-lodash-subset';
import Header from './Header';
import ListElements from './ListElements';
import ServiceManager from '../../../services/ServiceManager';

export default class React1Composed extends React.Component<IReact1Props, IReact1ComposedState> {
    constructor (props) {
        super(props);

        this.state = { 
            elementos: null,
            queryType: eQueryType.SPHttpClient
        };

        this.handleChange = this.handleChange.bind(this);
    } 

    
    componentDidMount(){
      this.loadElementsFromService(this.state.queryType);
    }

    loadElementsFromService(queryType:eQueryType)
    {
      ServiceManager.GetElementos(this.context, this.props.listName, queryType).then((r) => {
        this.setState({elementos:r});
      });
    }

    handleChange(event) {
      this.setState({queryType: event});
      this.loadElementsFromService(event);
    }

  public render(): React.ReactElement<IReact1Props> {
    return (
        <div className={ styles.react1 }>
          <div className={ styles.container }>
            <div className={ styles.row }>
              <div className={ styles.column }>
                <span className={ styles.title }>{ this.props.title }</span>
                <Header defaultSelected={this.state.queryType} onChange={this.handleChange} />
              </div>
            </div>
            <div className={ styles.row }>
                <ListElements Elementos={ this.state.elementos } />
            </div>
          </div>
        </div>
    );
  }
}
