import React from 'react';

import HeaderComponent from './Header';
import Body from './Body';

import { Header, Row, TableProps } from './types';

function Table(props: TableProps) {
  const { headers, rows } = props;

  return (
    <div>
      <HeaderComponent {...props} />
      <Body {...props} />
    </div>
  );
}

export { Header, Row, TableProps };
export default Table;