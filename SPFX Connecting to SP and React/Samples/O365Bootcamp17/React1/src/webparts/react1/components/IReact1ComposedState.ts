import { IElementos, IElemento } from '../../../services/IElementos';
import { eQueryType } from '../../../services/eQueryType';

export interface IReact1ComposedState {
  elementos: IElemento[],
  queryType: eQueryType
}