import React from 'react';
import { BlurbProvider, Blurb } from 'blurb';

const blurbs = [
  {
    id: 'blurb!123',
    translation: 'this blurb with two param, one is ^test1^ , another is ^test2^.'
  },
  {
    id: 'blurb!456',
    translation: 'blurb as paramter1'
  },
  {
    id: 'blurb!789',
    translation: 'blurb as parameter2'
  },
  {
    id: 'blurb!qwe',
    translation: 'Blurb show after click button'
  },
  {
    id: 'blurb!rty',
    translation: 'SWITCH TEXT BY PROPS'
  }
];

const queryBlurb = ids =>
  new Promise(res => {
    setTimeout(() => {
      res(blurbs.filter(blurb => ids.includes(blurb.id.slice(6))));
    }, 0);
  });

export default class BlurbExample extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
  }
  onClick() {
    this.setState(pre => ({
      show: !pre.show
    }));
  }

  render() {
    return (
      <BlurbProvider queryBlurb={queryBlurb}>
        <button
          onClick={() => {
            this.onClick();
          }}
        >
          switch blurb
        </button>
        <div>
          {this.state.show ? (
            <Blurb blurbID="qwe" />
          ) : (
            <Blurb blurbID="123">
              <Blurb blurbID="456" blurbkey="test1" />
              <Blurb blurbID="789" blurbkey="test2" />
            </Blurb>
          )}
        </div>
      </BlurbProvider>
    );
  }
}
