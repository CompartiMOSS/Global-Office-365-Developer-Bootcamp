import { IElementos, IElemento } from './IElementos';
import { IServiceClient } from './IServiceClient';
import pnp from "sp-pnp-js";

export default class PnPClient implements IServiceClient  {


    public get(context:any,listName:string): Promise<IElemento[]> {
        pnp.setup({
            spfxContext: context
          });

        return pnp.sp.web.lists.getByTitle(listName).items.select("Title", "Id").top(100).orderBy("Modified", true).get()
        .then((items: IElemento[]) => {
            return new Promise<IElemento[]>((resolve) => {
                resolve(items);
            });
        });
    
    }
}