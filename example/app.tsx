import * as React from 'react';
import {Component} from 'react';
import {GHCorner} from 'react-gh-corner';
import {AppWrapper} from './styled';
import Reemitter from '../src';

export interface AppState {
  
}

interface FooPayload {
  foo: string[];
}

interface BarPayload {
  bar: boolean;
}

type UploadEventPayloadMap = {
  'foo': FooPayload;
  'bar': BarPayload;
};

const reemitter = new Reemitter<UploadEventPayloadMap>();

reemitter.on('foo', (payload) => {
  console.log(payload.foo)
})

reemitter.on('bar', (payload) => {
  console.log(payload.bar)
})

class MyApp extends Reemitter<UploadEventPayloadMap> {

}

const repoUrl = 'https://github.com/zzarcon/';
const app = new MyApp();

app.emit('bar', {bar: true})

export default class App extends Component <{}, AppState> {
  state: AppState = {
    
  }

  render() {
    return (
      <AppWrapper>
        <GHCorner openInNewTab href={repoUrl} />
        Example!
      </AppWrapper>
    )
  }
}