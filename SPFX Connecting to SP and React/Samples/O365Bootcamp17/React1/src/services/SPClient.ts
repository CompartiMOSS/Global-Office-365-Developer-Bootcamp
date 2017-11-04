import { IElementos, IElemento } from './IElementos';
import { IServiceClient } from './IServiceClient';
import {
    SPHttpClient,
    SPHttpClientResponse   
  } from '@microsoft/sp-http';

export default class SPClient implements IServiceClient  {

    public get(context:any,listName:string): Promise<IElemento[]> {
        return context.spHttpClient.get(context.pageContext.web.absoluteUrl + `_api/web/lists/getbytitle('${listName}')/items$select=Title,Id`, 
                                        SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          return response.json();
        });
    
    }
}