import { Header, Row, TableProps } from '@Table/types';

export const basic: TableProps = {
  headers: [
    {
      key: 'id',
      label: 'id'
    },
    {
      key: 'product',
      label: 'product'
    },
    {
      key: 'price',
      label: 'price'
    },
    {
      key: 'count',
      label: 'count'
    },
    {
      key: 'foo',
      label: 'foo'
    },
    {
      key: 'bar',
      label: 'bar'
    }
  ],
  rows: [
    {
      key: '1',
      id: '1',
      product: 'Apple',
      price: 10,
      count: 100,
      foo: 'adad',
      bar: 'zxzx'
    },
    {
      key: '2',
      product: 'Banana',
      price: 5
    },{
      key: '3',
      product: 'Orange',
      price: 5
    },{
      key: '4',
      product: 'Watermelon',
      price: 5
    },{
      key: '5',
      product: 'Avocado',
      price: 5
    },{
      key: '6',
      product: 'tomato',
      price: 5
    }
  ],
  width: 600
};