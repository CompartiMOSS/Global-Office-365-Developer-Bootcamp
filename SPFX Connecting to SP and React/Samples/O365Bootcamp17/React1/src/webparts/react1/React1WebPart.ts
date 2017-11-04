import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'React1WebPartStrings';
import React1 from './components/React1';
import React1Composed from './components/React1Composed';
import { IReact1Props } from './components/IReact1Props';

export interface IReact1WebPartProps {
  title:string;
  description: string;
  listName:string;
}

export default class React1WebPart extends BaseClientSideWebPart<IReact1WebPartProps> {

  public render(): void {
    // Ejemplo de Componene estático
    /*const element: React.ReactElement<IReact1Props > = React.createElement(
      React1,
      { 
        title: this.properties.title,
        description: this.properties.description,
        listName : this.properties.listName
      } 
    );*/

    // Ejemplo de componente compuesto
    const element: React.ReactElement<IReact1Props > = React.createElement(
      React1Composed,
      {
        title: this.properties.title,
        description: this.properties.description,
        listName : this.properties.listName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title',  {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
