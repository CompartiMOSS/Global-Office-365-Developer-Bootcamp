import { IElemento } from './IElementos';
import {
    SPHttpClient,
    SPHttpClientResponse   
  } from '@microsoft/sp-http';
import {
    Environment,
    EnvironmentType
    } from '@microsoft/sp-core-library';

export default class SPClient  {

    public static get(context:any,listName:string): Promise<IElemento[]> {
        if (Environment.type === EnvironmentType.Local) {
            // Mock en modo Depuración local
            return new Promise<IElemento[]>((resolve) => {
                resolve(
                    [
                        { Title: 'Elemento 1', Id: '1' },
                        { Title: 'Elemento 2', Id: '2' }
                    ]);
            });
        }

        return context.spHttpClient.get(context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('${listName}')/items?$select=Title,Id`, 
                                        SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          return response.json().then((responseJSON: any) => {  
             return responseJSON.value;
            });  
        });
    
    }
}