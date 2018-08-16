import React from 'react';
import { storiesOf } from '@storybook/react';
import { Table } from './index';

storiesOf('Table', module).add('show table', () => {
  const columns = [
    {
      title: 'id',
      width: 130
    },
    {
      title: 'name',
      width: 230
    },
    {
      title: 'grade',
      width: 230
    },
    {
      title: 'action',
      width: 230
    },
    {
      title: 'product ID',
      width: 230
    },
    {
      title: 'product name',
      width: 230
    },
    {
      title: 'quantity',
      width: 230
    }
  ];
  const data = [
    {
      id: 1,
      name: 'test1',
      grade: 'g1',
      action: 'click test width click test width click test width click test width',
      productID: 1,
      productName: 'p1',
      quantity: 10
    },
    {
      id: 2,
      name: 'test2',
      grade: 'g2',
      action: 'click',
      productID: 2,
      productName: 'p2',
      quantity: 20
    },
    {
      id: 3,
      name: 'test3',
      grade: 'g3',
      action: 'click',
      productID: 3,
      productName: 'p3',
      quantity: 30
    },
    {
      id: 4,
      name: 'test4',
      grade: 'g4',
      action: 'click',
      productID: 4,
      productName: 'p4',
      quantity: 40
    }
  ];
  return <Table columns={columns} data={data} selection />;
});
