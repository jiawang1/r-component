import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckBox from './CheckBox';

storiesOf('CheckBox', module)
  .add('show checkbox', () => {
    const onChange = () => {};

    return (
      <div>
        <CheckBox onChange={onChange} />
      </div>
    );
  })
  .add('disabled checkbox', () => {
    const onChange = () => {};

    return (
      <div>
        <CheckBox onChange={onChange} disabled value />
      </div>
    );
  });
