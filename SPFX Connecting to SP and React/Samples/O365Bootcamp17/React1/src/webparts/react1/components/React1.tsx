import * as React from 'react';
import styles from './React1.module.scss';
import { IReact1Props } from './IReact1Props';
import { escape } from '@microsoft/sp-lodash-subset';

export default class React1 extends React.Component<IReact1Props, {}> {
  public render(): React.ReactElement<IReact1Props> {
    return (
        <div className={ styles.react1 }>
          <div className={ styles.container }>
            <div className={ styles.row }>
              <div className={ styles.column }>
                <span className={ styles.title }>Ejemplo React1</span>
                <div className={ styles.container }>
                  <div className={ styles.row }>
                    <div className={ styles.column }>
                      <input type="radio" name="sampleType" value="SPHttpClient" /> SPHttpClient
                      <input type="radio" name="sampleType" value="CSOM" /> CSOM
                      <input type="radio" name="sampleType" value="External" /> External
                    </div>
                    <div className={ styles.column }>
                      <input type="submit" value="Cargar" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={ styles.row }>
              <ul>
                  <li>
                    título
                  </li>
                  <li>
                    título
                  </li><div className={ styles.row }>
              <ul>
                  <li>
                    título
                  </li>
                  <li>
                    título
                  </li>
              </ul>
            </div>
          </div>
        </div>
    );
  }
}
