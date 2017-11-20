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
import { IReact1Props } from './components/IReact1Props';


export interface IReact1WebPartProps {
  description: string;
}

export default class React1WebPart extends BaseClientSideWebPart<IReact1WebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReact1Props > = React.createElement(
      React1,
      {
        description: this.properties.description,
        listname: "contactos",
        context: this.context
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
