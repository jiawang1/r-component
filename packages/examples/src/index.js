import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import BlurbExample from './cases/blurb/BlurbExample';

const root = document.createElement('div');
root.className = 'app-root';
root.id = 'app-root';
document.body.appendChild(root);

render(<BlurbExample />, root);

if (module.hot) {
  module.hot.accept('./containers/Routes', () => {
    /*
       * must load the entry module here, otherwise hot replaod can
       * not work
       * */
    const RootContainer = require('./containers/Routes').default;
    render(
      <AppContainer>
        <RootContainer />
      </AppContainer>,
      root
    );
  });
}
