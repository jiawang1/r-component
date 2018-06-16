import React from 'react';
import ReactDOM from 'react-dom';
import { BlurbProvider, Blurb } from 'ui-blurb';

const blurbs = [
  {
    id: 'blurb!93847',
    translation: 'hello2 Blurb'
  }
];

const makeQueryBlurb = aBlurb => ids =>
  new Promise(res => {
    setTimeout(() => {
      res(aBlurb.filter(blurb => ids.indexOf(blurb.id.slice(6)) >= 0));
    }, 500);
  });

const Demo = () => (
  <BlurbProvider queryBlurb={makeQueryBlurb(blurbs)}>
    <Blurb blurbID="93847" />
  </BlurbProvider>
);

const root = document.createElement('div');
root.className = 'app-root';
root.id = 'app-root';
document.body.appendChild(root);

ReactDOM.render(<Demo />, root);
