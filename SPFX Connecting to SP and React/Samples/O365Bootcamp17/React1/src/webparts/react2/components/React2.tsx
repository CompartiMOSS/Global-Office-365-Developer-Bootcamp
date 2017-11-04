import * as React from 'react';
import styles from './React2.module.scss';
import { IReact2Props } from './IReact2Props';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  IButtonProps,
  PrimaryButton
} from 'office-ui-fabric-react/lib/Button';
import {
  Label
} from 'office-ui-fabric-react/lib/Label';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';


export default class React2 extends React.Component<IReact2Props, {}> {
    private _items: any[] = [  ];
    
    private _columns: IColumn[] = [
      {
        key: 'column1',
        name: 'Id',
        fieldName: 'id',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
        ariaLabel: 'Operations for name'
      },
      {
        key: 'column2',
        name: 'Título',
        fieldName: 'title',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
        ariaLabel: 'Operations for value'
      },
    ];
  
    constructor() {
      super();
  
      // Populate with items for demos.
      if (this._items.length === 0) {
        for (let i = 0; i < 5; i++) {
          this._items.push({
            key: i,
            title: 'Item ' + i,
            id: i
          });
        }
      }
    }
  
  public render(): React.ReactElement<IReact2Props> {
    return (
      <div className="ms-Grid">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12">
              <Label>Ejemplo React2 con Office Fabric</Label>
                <div className="ms-Grid">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-u-sm6 ms-u-sm6" >
                      <ChoiceGroup
                        defaultSelectedKey='B'
                        options={ [
                          {
                            key: 'SPHttpClient',
                            text: 'SPHttpClient',
                            'data-automation-id': 'SPHttpClient'
                          } as IChoiceGroupOption,
                          {
                            key: 'CSOM',
                            text: 'CSOM',
                          },
                          {
                            key: 'External',
                            text: 'External',
                          }
                        ] }
                        
                        label='Tipo de cliente'
                        required={ true }
                      />

                    </div>
                    <div className="ms-Grid-col ms-u-sm6 ms-u-sm6">
                      <PrimaryButton
                        data-automation-id='cargar'
                        href='http://bing.com'
                        target='_blank'
                        title='Cargar'
                        style={ { color: '#ffffff' } }
                      >
                        cargar
                      </PrimaryButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-u-sm6 ms-u-sm6">
              <MarqueeSelection selection={null}>
                <DetailsList
                  items={ this._items }
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
