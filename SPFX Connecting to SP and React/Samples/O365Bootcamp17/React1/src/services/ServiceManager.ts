import { eQueryType } from './eQueryType';
import { IElementos, IElemento } from './IElementos';
import { IServiceClient } from './IServiceClient';
import {
    Environment,
    EnvironmentType
  } from '@microsoft/sp-core-library';
  import MockService from './MockService';
  import SPClient from './SPClient';
  import PnPClient from './PnPClient';


export default class ServiceManager {
    public static async GetElementos(context:any, listName:string, type:eQueryType) : Promise<IElemento[]>  {
        let serviceClient : IServiceClient;

        if (Environment.type === EnvironmentType.Local) {
            // Cliente Mock en modo Depuración local
            serviceClient = new MockService();
        }
        else
        {                
            if(type == eQueryType.SPHttpClient){
                // Cliente SPHttpClient
                serviceClient = new SPClient();

            }else if(type == eQueryType.PnP){
                // Cliente PnP Core
                serviceClient = new PnPClient();
            }
        }

        if(serviceClient != null)
            return serviceClient.get(context, listName);
        return null;
    }
}