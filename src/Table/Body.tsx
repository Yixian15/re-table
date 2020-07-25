import React, { useRef, useState, useEffect } from 'react';
import classnames from 'classnames';
import _ from 'lodash';

import { Header, Row, ScrollDistance } from './types';
import { TableProps } from './index';
import { isFreezedLeftHeader, isFreezedRightHeader, getHeaderWidth, getLeaves } from './utils';

import styles from './Body.less';
interface BodyProps extends TableProps {
  onScroll(distance: ScrollDistance): void;
  scrollable?: boolean;
  isAtLeftBorder?: boolean;
  isAtRightBorder?: boolean;
}

interface BodyRowProps extends TableProps {
  row: Row;
}

function BodyRow(props: BodyRowProps) {
  const { row, headers } = props;

  const leaves = getLeaves(headers);

  return (
    <tr key={row.key} className={styles.bodyRow}>
      {
        leaves.map((header) => {
          const value = row[header.dataIndex || header.key];

          const cellStyle = {
            minWidth: getHeaderWidth(header)
          };

          return (
            <td key={header.key} style={cellStyle} className={styles.bodyCellContainer}>
              {
                value
              }
            </td>
          )
        })
      }
    </tr>
  )
}

// May vary in different browsers
function getScrollBarHeight() {
  return 10;
}

function Body(props: BodyProps) {
  const { headers, rows, width, bordered, onScroll, scrollable } = props;

  const containerRef = useRef(null);
  const bodyRef = useRef(null);
  const bodyContentRef = useRef<HTMLDivElement>(null);

  function _onScroll() {
    const scrollLeft = _.get(bodyRef, 'current.scrollLeft', 0);
    const scrollTop = _.get(bodyRef, 'current.scrollTop', 0);

    onScroll({
      left: scrollLeft,
      top: scrollTop
    });
  }

  const bodyStyles = {
    width,
    overflow: scrollable ? 'scroll' : 'hidden'
  };

  const [bodyHeight, setBodyHeight] = useState(0);

  useEffect(() => {
    const bodyContent = bodyContentRef?.current;
    if (bodyContent) {
      const bodyContentRect = bodyContent?.getBoundingClientRect();
      setBodyHeight(bodyContentRect.height);
    }
  }, []);

  return (
    <div ref={containerRef} >
      <div style={bodyStyles} onScroll={_onScroll} ref={bodyRef}>
        <div ref={bodyContentRef}>
          <table className={styles.body}>
            <tbody>
              {
                rows.map((row) => <BodyRow key={row.key} {...props} row={row} />)
              }
            </tbody>
          </table>
        </div>

        {/* place scrollbar outside of body, otherwise it would be coverd by freeezed columns */}
        {
          scrollable && <div style={{ height: getScrollBarHeight() }} />
        }

        {/* side borders of body height, scroll bar height excluded */}
        {
          bordered && (
            <div>
              <div className={styles.bodyBorderLeft} style={{ height: bodyHeight }} />
              <div className={styles.bodyBorderRight} style={{ height: bodyHeight }} />
            </div>
          )
        }

      </div>
    </div>
  )
}

function ComposedBody(props: BodyProps) {
  const { headers, bordered, width = 0, isAtLeftBorder, isAtRightBorder, } = props;

  const freezedLeftHeaders = headers.filter(isFreezedLeftHeader);
  // column width + container border width
  const freezedLeftWidth = freezedLeftHeaders.reduce((total, header) => total + getHeaderWidth(header,), 0);

  const freezedRightHeaders = headers.filter(isFreezedRightHeader)
  const freezedRightWidth = freezedRightHeaders.reduce((total, header) => getHeaderWidth(header,) + total, 0);
  const nonFreezedRightHeadersWidth = headers.filter((header) => !isFreezedRightHeader(header)).reduce((total, header) => getHeaderWidth(header,) + total, 0);

  const containerStyle = {
    width
  }

  return (
    <div className={styles.container} style={containerStyle} >
      <div className={classnames({ [styles.bordered]: bordered })} >
        <Body {...props} scrollable />

        {
          freezedLeftHeaders.length > 0 && !isAtLeftBorder && (
            <div className={styles.freezedLeft} >
              <Body {...props} width={freezedLeftWidth} />
            </div>
          )
        }

        {
          freezedLeftHeaders.length > 0 && !isAtRightBorder && (
            <div className={styles.freezedRight} >
              <Body {...props} width={freezedRightWidth} scrollDistance={{ left: -nonFreezedRightHeadersWidth }} />
            </div>
          )
        }
      </div>
    </div >
  )
}

export default ComposedBody;