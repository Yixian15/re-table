import React, {useRef} from 'react';
import classnames from 'classnames';
import _ from 'lodash';

import { Header, Row, ScrollDistance } from './types';
import { TableProps } from './index';

import styles from './Body.less';
interface BodyProps extends TableProps {
  onScroll(distance: ScrollDistance): void;
}

interface BodyRowProps extends TableProps {
  row: Row;
}

function BodyRow(props: BodyRowProps) {
  const { row, headers } = props;

  return (
    <tr key={row.key} className={styles.bodyRow}>
      {
        headers.map((header) => {
          const value = row[header.dataIndex || header.key];

          const cellStyle = {
            minWidth: header.width
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

function Body(props: BodyProps) {
  const { headers, rows, width, bordered, onScroll } = props;

  const containerRef = useRef(null);
  const bodyRef = useRef(null);

  function _onScroll() {
    const scrollLeft = _.get(bodyRef, 'current.scrollLeft', 0);
    const scrollTop =  _.get(bodyRef, 'current.scrollTop', 0);
    
    onScroll({
      left: scrollLeft,
      top: scrollTop
    });
  }

  const bodyStyles = {
    width,
  };

  return (
    <div className={classnames(styles.body, { [styles.bordered]: bordered })} ref={containerRef}>
      <div className={classnames(styles.body)} style={bodyStyles} onScroll={_onScroll} ref={bodyRef}>
        <table>
          <tbody>
            {
              rows.map((row) => <BodyRow key={row.key} {...props} row={row} />)
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Body;