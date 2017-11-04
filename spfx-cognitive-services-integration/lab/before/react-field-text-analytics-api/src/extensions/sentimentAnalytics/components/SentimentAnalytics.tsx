import { Log, Guid } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import { IHttpClientOptions, HttpClientResponse, HttpClient, SPHttpClientResponse, SPHttpClient } from '@microsoft/sp-http';
import * as React from 'react';

import styles from './SentimentAnalytics.module.scss';

import SentimentIcon from './SentimentIcon';

export interface ISentimentAnalyticsProps {
  text: string;
  httpClient: HttpClient;
  spHttpClient: SPHttpClient;
  absoluteUrl: string;
}

export interface ISentimentAnalyticsState {
  score: number;
}

const LOG_SOURCE: string = 'SentimentAnalytics';

export default class SentimentAnalytics extends React.Component<ISentimentAnalyticsProps, ISentimentAnalyticsState> {

  private cognitiveServicesKey: string = "";
  
  //TODO: Desde el portal de Azure, obtén la URL para invocar la Text API
  private cognitiveServicesTextUrl: string = '';

  constructor(props: ISentimentAnalyticsProps, state: ISentimentAnalyticsState) {
    super(props, state);

    //TODO: establece el state del componente para que el score inicial sea 0

  }

  @override
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: SentimentAnalytics mounted');
    const documentId = Guid.newGuid().toString();

    this._getSentiment(this.props.text, 'en', documentId)
      .then(score => {
        this.setState({ score: score });
      })
      .catch(error => {
        console.log(error);
      });
  }

  @override
  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: SentimentAnalytics unmounted');
  }

  @override
  public render(): React.ReactElement<{}> {
    return (
      <div className={styles.cell}>
        {/* TODO: Usa el componente SentimentIcon, pasandole el score del state */}
        
      </div>  
    );
  }

  private async _getSentiment(text: string, language: string, id: string): Promise<number> {

    if (this.cognitiveServicesKey === '') {
      //TODO: usando async/await, haz una llamada a la API de SharePoint para sacar la Tenant Property TextAPIKey
      //      para ello, tendrás que componer una URL usando la props 'absoluteUrl' + endpoint, y el spHttpClient para la llamada a la API
      //      el endpoint para sacar la Key es: /_api/web/GetStorageEntity('TextAPIKey')
      //      el método Get necesita como segundo argumento un objeto ISPHttpClientConfigurations. La propiedad estática SPHttpClient.configurations.v1 te lo dará
            
      //TODO: obtiene el json de 'SPHttpClientResponse'
      
      this.cognitiveServicesKey = responseJson.Value;

      const httpOptions: IHttpClientOptions = this._prepareHttpOptionsForVisionApi(text, language, id);

      //TODO: de nuevo con async/await y usando el httpClient de las props del component, haz un POST al Endpoint de la Text API (tienes una propiedad privada de la clase con ese valor)
      //      para el post, necesitarás un segundo argumento del tipo IHttpClientConfigurations: HttpClient.configurations.v1, 
      //      y como tercer argumento, el objeto httpOptions de la linea anterior
      const cognitiveResponse: HttpClientResponse = await this.props.httpClient.post(this.cognitiveServicesTextUrl, HttpClient.configurations.v1, httpOptions);
      
      //TODO: obtiene el json de 'HttpClientResponse'
  
      // Del json obtenido en la linea anterior, la propiedad documents[0].score contine la puntuación de 'sentiment' que buscamos
      const score = cognitiveResponseJSON.documents[0].score;
          
      return score;
    }    

    return 0;
  }

  private _prepareHttpOptionsForVisionApi(text: string, language: string, id: string): IHttpClientOptions {

    //TODO: siguiendo el ejemplo de aquí: https://westus.dev.cognitive.microsoft.com/docs/services/TextAnalytics.V2.0/operations/56f30ceeeda5650db055a3c9
    //      crea un objeto documents con language, id, text
    const body: string = JSON.stringify({
      "documents": [
        {
        }
      ]
    });

    const httpOptions: IHttpClientOptions = {          
      body: body,
      headers: this._prepareHeadersForTextApi()
    }; 

    return httpOptions;
  }

  private _prepareHeadersForTextApi(): Headers {
    const requestHeaders: Headers = new Headers();
    requestHeaders.append('Content-type', 'application/json');
    requestHeaders.append('Cache-Control', 'no-cache');
    
    //TODO: añade otro Header 'Ocp-Apim-Subscription-Key' y asígnale el valor de la TextAPI Key, que ya almacenaste en una variable privada
    

    return requestHeaders;
  }  
}