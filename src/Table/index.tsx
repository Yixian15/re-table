import React, { useState, useRef, useEffect } from 'react';

import HeaderComponent from './Header';
import Body from './Body';

import styles from './index.less';

import { Header, Row, TableProps, ScrollDistance } from './types';
import { DEFAULT_COLUMN_WIDTH } from './constants';
import { isFreezedRightHeader, isFreezedLeftHeader, getHeaderWidth } from './utils';

function processHeader(header: Header): Header {
  return {
    ...header,
    width: header.width || DEFAULT_COLUMN_WIDTH
  }
}

function Table(props: TableProps) {
  const { headers, rows, width } = props;
  const processedHeaders = headers.map(processHeader);

  const processedProps = {
    ...props,
    headers: processedHeaders
  };

  const [scrollDistance, setScrollDistance] = useState<ScrollDistance>();
  const [isAtLeftBorder, setIsAtLeftBorder] = useState(true);
  const [isAtRightBorder, setIsAtRightBorder] = useState(false);
  const [detectedWidth, setDetectedWidth] = useState(width)

  const widthDetectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const widthDetector = widthDetectorRef.current;
    if (widthDetector) {
      const rect = widthDetector.getBoundingClientRect();
      setDetectedWidth(rect.width);
    }
  }, []);

  const onScroll = (distance: ScrollDistance) => {
    setScrollDistance(distance);

    const headerSumWidth = headers.reduce((total, header) => total + getHeaderWidth(header), 0);

    setIsAtLeftBorder(distance.left === 0)
    setIsAtRightBorder((distance.left || 0) + (width || 0) === headerSumWidth)
  };

  return (
    <div className={styles.reTable}>
      <div ref={widthDetectorRef} style={{ width: width || '100%' }} />
      <HeaderComponent {...processedProps} scrollDistance={scrollDistance} isAtLeftBorder={isAtLeftBorder} isAtRightBorder={isAtRightBorder} />
      <Body {...processedProps} onScroll={onScroll} isAtLeftBorder={isAtLeftBorder} isAtRightBorder={isAtRightBorder} />
    </div>
  );
}

export { Header, Row, TableProps };
export default Table;