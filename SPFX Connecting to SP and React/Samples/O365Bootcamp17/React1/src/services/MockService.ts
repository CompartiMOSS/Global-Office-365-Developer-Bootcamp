import { IElementos, IElemento } from './IElementos';
import { IServiceClient } from './IServiceClient';

export default class MockService implements IServiceClient  {

    private static _items: IElemento[] = [{ Title: 'Mock List', Id: '1' },
                                        { Title: 'Mock List 2', Id: '2' },
                                        { Title: 'Mock List 3', Id: '3' }];

    public get(context:any,listName:string): Promise<IElemento[]> {
    return new Promise<IElemento[]>((resolve) => {
            resolve(MockService._items);
        });
    }
}