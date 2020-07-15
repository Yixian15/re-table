import React, { useState } from 'react';

import HeaderComponent from './Header';
import Body from './Body';

import styles from './index.less';

import { Header, Row, TableProps, ScrollDistance } from './types';
import { DEFAULT_COLUMN_WIDTH } from './constants';

function processHeader(header: Header): Header {
  return {
    ...header,
    width: header.width || DEFAULT_COLUMN_WIDTH
  }
}

function Table(props: TableProps) {
  const { headers, rows } = props;
  const processedHeaders = headers.map(processHeader);

  const processedProps = {
    ...props,
    headers: processedHeaders
  };

  const [scrollDistance, setScrollDistance] = useState<ScrollDistance>();

  const onScroll = (distance: ScrollDistance) => {
    setScrollDistance(distance);
  };

  return (
    <div className={styles.reTable}>
      <HeaderComponent {...processedProps} scrollDistance={scrollDistance}/>
      <Body {...processedProps} onScroll={onScroll} />
    </div>
  );
}

export { Header, Row, TableProps };
export default Table;