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
    }
  ],
  rows: [
    {
      key: '1',
      id: '1',
      product: 'Apple',
      price: 10,
      count: 100
    },
    {
      key: '2',
      product: 'Banana',
      price: 5
    }, {
      key: '3',
      product: 'Orange',
      price: 5
    }, {
      key: '4',
      product: 'Watermelon',
      price: 5
    }, {
      key: '5',
      product: 'Avocado',
      price: 5
    }, {
      key: '6',
      product: 'tomato',
      price: 5
    }
  ],
  width: 600
};

const freezedLeftHeaders: Header[] = [
  {
    key: 'freezedLeft',
    label: 'freezedLeft',
    freeze: true
  }
]

const freezedRightHeaders: Header[] = [
  {
    key: 'freezedRight',
    label: 'freezedRight',
    freeze: 'right'
  }
]

export const freezed: TableProps = {
  headers: [...freezedLeftHeaders, ...basic.headers, ...freezedRightHeaders],
  rows: basic.rows,
  width: 600,
  bordered: true,
};

const nestedHeaders = [
  {
    key: 'foo',
    label: 'foofoo foofoo foofoo foofoo foofoo foofoo foofoo foofoo foofoo ',
    children: [
      {
        key: 'foo_1',
        label: 'foo_1'
      },
      {
        key: 'foo_2',
        label: 'foo_2'
      }
    ]
  },
  {
    key: 'bar',
    label: 'bar',
    children: [
      {
        key: 'bar_1',
        label: 'bar_1'
      },
      {
        key: 'bar_2',
        label: 'bar_2',
        children: [
          {
            key: 'bar_3',
            label: 'bar_3'
          },
          {
            key: 'bar_4',
            label: 'bar_5',
          }
        ]
      }
    ],
  },
  {
    key: 'biz',
    label: 'biz',
    children: [
      {
        key: 'biz_1',
        label: 'biz_1'
      }
    ]
  }
]

const nestedRows = [
  ...basic.rows,
  {
    key: '7',
    foo_1: '12313 ad 112313 ad 112313 ad 112313 ad 1 12313 ad 1'
  }
];

export const nested: TableProps = {
  headers: [...basic.headers, ...nestedHeaders],
  rows: nestedRows,
  width: 600,
  bordered: true,
}