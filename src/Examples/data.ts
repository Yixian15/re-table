import { Header, Row, TableProps } from '@Table/types';

export const basic: TableProps = {
  headers: [
    {
      key: 'product',
      label: 'product'
    },
    {
      key: 'price',
      label: 'price'
    }
  ],
  rows: [
    {
      key: '1',
      product: 'Apple',
      price: 10
    },
    {
      key: '2',
      product: 'Banana',
      price: 5
    }
  ]
};