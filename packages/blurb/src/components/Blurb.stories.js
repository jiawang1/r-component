import React from 'react';
import { storiesOf } from '@storybook/react';
import { BlurbProvider } from './BlurbProvider';
import Blurb from './Blurb';

/* eslint-disable react/no-multi-comp */

const mockAsync = data =>
  new Promise(res => {
    setTimeout(() => {
      res(data);
    }, 3000);
  });

storiesOf('Blurb', module)
  .add('async provider', () => {
    const blurbs = [
      {
        id: 'blurb!123456',
        translation:
          'this blurb with two param, one is ^test1^ another is ^test2^, no replacement for ^test3^'
      },
      {
        id: 'blurb!9876',
        translation: 'this is the pure text blurb'
      },
      {
        id: 'blurb!qaz',
        translation: 'click button switch to another blurb'
      },
      {
        id: 'blurb!1q2w',
        translation: 'switch text by props'
      },
      {
        id: 'blurb!3e4r',
        translation: 'SWITCH TEXT BY PROPS'
      }
    ];

    const queryBlurb = ids =>
      new Promise(res => {
        setTimeout(() => {
          res(blurbs.filter(blurb => ids.indexOf(blurb.id.slice(6)) >= 0));
        }, 0);
      });

    let count1 = 0;
    let count2 = 0;
    class TestContext extends React.Component {
      constructor() {
        super();
        this.state = {
          switch: false
        };
      }
      onClick() {
        this.setState({
          switch: !this.state.switch
        });
      }
      render() {
        // eslint-disable-next-line
        const { render } = this.props;
        return (
          <div>
            <p>{` root view render count : ${++count1}  `}</p>
            <div>
              <button
                onClick={() => {
                  this.onClick();
                }}
              >
                switch
              </button>

              <p>{`scope is rendered : ${++count2}`}</p>
              <div>{render ? <Blurb key="1" blurbID="1q2w" /> : <Blurb key="2" blurbID="3e4r" />}</div>
              {this.state.switch ? (
                <div>
                  <div>
                    <p>the first part:</p>
                    <Blurb blurbID="123456">
                      <span style={{ color: 'red' }} blurbkey="test1">
                        P1
                      </span>
                      <span style={{ color: 'blue' }} blurbkey="test2">
                        P2
                      </span>
                    </Blurb>
                  </div>
                  <div>
                    <p>the second part:</p>
                    <Blurb blurbID="9876" />
                  </div>
                </div>
              ) : (
                <div>
                  <p>the other part:</p>
                  <Blurb blurbID="qaz" />
                </div>
              )}
            </div>
          </div>
        );
      }
    }

    class Wrapper extends React.Component {
      constructor() {
        super();
        this.state = { r: false };
      }
      componentDidMount() {
        setTimeout(() => {
          this.setState({
            r: true
          });
        }, 3000);
      }
      render() {
        return (
          <div>
            <BlurbProvider queryBlurb={queryBlurb}>
              <TestContext render={this.state.r} />
            </BlurbProvider>
          </div>
        );
      }
    }
    return <Wrapper />;
  })
  .add('Blurb in Blurb', () => {
    const blurbs = [
      {
        id: 'blurb!10293',
        translation: `this blurb has two level nested blurbs as replacement: this (^test1^) is text, this is first level( ^test2^ ),
          this is another first level (^test3^)`
      },
      {
        id: 'blurb!9876',
        translation: 'Text from blurB'
      },
      {
        id: 'blurb!qaz',
        translation: 'Another blurb from second level (^bb^), two level nested'
      },
      {
        id: 'blurb!67890',
        translation: 'blurb in bulrb nested'
      }
    ];

    const __queryBlurb = ids => blurbs.filter(blurb => ids.some(id => id === blurb.id.slice(6)));
    const TestContext = () => (
      <BlurbProvider queryBlurb={ids => mockAsync(__queryBlurb(ids))}>
        <div>
          <Blurb blurbID="10293">
            <span style={{ color: 'red' }} blurbkey="test1">
              P1
            </span>
            <Blurb blurbID="9876" blurbkey="test2" />
            <Blurb blurbID="qaz" blurbkey="test3">
              <Blurb style={{ color: 'red' }} blurbID="67890" />
            </Blurb>
          </Blurb>
        </div>
        <div />
      </BlurbProvider>
    );
    return <TestContext />;
  })
  .add('Blurb with pure text param', () => {
    const blurbs = [
      {
        id: 'blurb!93847',
        translation: 'this blurb with one param, the param is  ^test^'
      }
    ];
    const TestContext = () => (
      <BlurbProvider queryBlurb={() => Promise.resolve(blurbs)}>
        <div>
          <Blurb blurbID="93847">p1</Blurb>
        </div>
        <div />
      </BlurbProvider>
    );
    return <TestContext />;
  })
  .add('Blurb with text component', () => {
    const blurbs = [
      {
        id: 'blurb!poiuy',
        translation: 'this blurb with two param, one is ^test1^ another is ^test2^, no further replacement'
      },
      {
        id: 'blurb!9876',
        translation: 'this is the pure text blurb'
      },
      {
        id: 'blurb!qaz',
        translation: 'verify && only XXXXX case'
      }
    ];

    const queryBlurb = ids => {
      console.log('query blurb is called');
      return new Promise(res => {
        setTimeout(() => {
          res(blurbs.filter(blurb => ids.indexOf(blurb.id.slice(6)) >= 0));
        }, 0);
      });
    };

    const TestContext = () => (
      <BlurbProvider queryBlurb={queryBlurb}>
        <div>
          <Blurb blurbID="poiuy">
            <span style={{ color: 'red' }} blurbkey="test1">
              P1
            </span>
            <span style={{ color: 'blue' }} blurbkey="test2">
              P2
            </span>
          </Blurb>
        </div>
        <div />
      </BlurbProvider>
    );
    return <TestContext />;
  })
  .add('nested component with Blurb', () => {
    const TestBlurb = () => (
      <div>
        <span>get blurb</span>
        <Blurb blurbID="zxc">
          <Blurb blurbID="mnb" />
        </Blurb>
      </div>
    );
    const blurbs = [
      {
        id: 'blurb!123456',
        translation: 'this is text for param one : ^test1^ and this param from param two:  ^test2^ test'
      },
      {
        id: 'blurb!9876',
        translation: 'Text also from outer blurB'
      },
      {
        id: 'blurb!qaz',
        translation: 'Another blurb && only XXXXX case'
      },
      {
        id: 'blurb!zxc',
        translation: 'Text from inner component, replacement is : ^cc^'
      },
      {
        id: 'blurb!mnb',
        translation: 'Text also from inner2 '
      }
    ];

    const queryBlurb = ids => {
      console.log('query blurb is called');
      return new Promise(res => {
        setTimeout(() => {
          res(blurbs.filter(blurb => ids.indexOf(blurb.id.slice(6)) >= 0));
        }, 0);
      });
    };
    const TestContext = () => (
      <BlurbProvider queryBlurb={queryBlurb}>
        <div>
          <Blurb blurbID="123456">
            <span style={{ color: 'red' }} blurbkey="test1">
              outter blurb
            </span>
            <Blurb blurbID="9876" blurbkey="test2" />
          </Blurb>
          <TestBlurb />
        </div>
        <div />
      </BlurbProvider>
    );
    return <TestContext />;
  })
  .add('replace placeholder', () => {
    const blurbs = [
      {
        id: 'blurb!12345',
        translation: 'this blurb with one param for placeholder, one is @test1@ '
      }
    ];
    const TestContext = () => (
      <BlurbProvider queryBlurb={() => Promise.resolve(blurbs)}>
        <div>
          <Blurb blurbID="12345" placeHolder="(?:\@([^@]+)\@)">
            <span style={{ color: 'red' }} blurbkey="test1">
              P1
            </span>
          </Blurb>
        </div>
        <div />
      </BlurbProvider>
    );
    return <TestContext />;
  })
  .add('support number', () => {
    const blurbs = [
      {
        id: 'blurb!1234568',
        translation: 'this blurb for support number test, your test number: ^test1^ '
      }
    ];
    const TestContext = () => (
      <BlurbProvider queryBlurb={() => Promise.resolve(blurbs)}>
        <div>support number</div>
        <div>
          <Blurb blurbID="1234568">{100}</Blurb>
        </div>
        <div />
      </BlurbProvider>
    );
    return <TestContext />;
  });
