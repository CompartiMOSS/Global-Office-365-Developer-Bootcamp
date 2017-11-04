import { IElementos, IElemento } from './IElementos';

export interface IServiceClient {
     get(context:any,listName:string): Promise<IElemento[]>;
}