import React from 'react';
import { storiesOf } from '@storybook/react';
import { Table } from './index';

storiesOf('Table', module).add('show table', () => {
  const columns = [
    {
      title: 'id'
    },
    {
      title: 'name'
    },
    { title: 'grade' },
    { title: 'action' }
  ];
  const data = [
    { id: 1, name: 'test1', grade: 'g1', action: 'click' },
    { id: 2, name: 'test2', grade: 'g2', action: 'click' },
    { id: 3, name: 'test3', grade: 'g3', action: 'click' },
    { id: 4, name: 'test4', grade: 'g4', action: 'click' }
  ];
  return <Table columns={columns} data={data} selection />;
});
