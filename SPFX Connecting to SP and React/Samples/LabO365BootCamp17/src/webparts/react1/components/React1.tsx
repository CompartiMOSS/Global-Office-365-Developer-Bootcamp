import * as React from 'react';
import styles from './React1.module.scss';
import { IReact1Props } from './IReact1Props';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  IButtonProps,
  PrimaryButton
} from 'office-ui-fabric-react/lib/Button';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { IElemento } from './IElementos'
import SPClient from './SPClient'

export default class React1 extends React.Component<IReact1Props, {items:IElemento[]}> {
  constructor (props) {
    super(props);
    
    
    this.state = { 
        items:  [{ Title: 'Mock List', Id: '1' },
        { Title: 'Mock List 2', Id: '2' },
        { Title: 'Mock List 3', Id: '3' }]
    };

    this.handleClick = this.handleClick.bind(this);
  } 


  private _columns: IColumn[] = [
    {
      key: 'column1',
      name: 'Id',
      fieldName: 'Id',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      ariaLabel: 'Operations for name'
    },
    {
      key: 'column2',
      name: 'Título',
      fieldName: 'Title',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      ariaLabel: 'Operations for value'
    },
  ];


  handleClick(event) {
    SPClient.get(this.context, this.props.listname).then((res)=>{
      this.setState({items:res});
    });
  } 

  public render(): React.ReactElement<IReact1Props> {
    return (
      <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12">
            <PrimaryButton
                  data-automation-id='cargar'
                  target='_blank'
                  title='Cargar'
                  style={ { color: '#ffffff' } }
                  onClick={this.handleClick}
                >
                  Cargar
                </PrimaryButton>
            </div>
          </div>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12">
            <MarqueeSelection selection={null}>
                <DetailsList
                  items={ this.state.items }
                  columns={ this._columns }
                  setKey='set'
                  layoutMode={ DetailsListLayoutMode.justified }
                  selectionPreservedOnEmptyClick={ true }
                  ariaLabelForSelectionColumn='Toggle selection'
                  ariaLabelForSelectAllCheckbox='Toggle selection for all items'
                />
              </MarqueeSelection>
            </div>
          </div>
      </div>
    );
  }
}
