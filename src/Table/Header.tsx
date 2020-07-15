import React from 'react';
import classnames from 'classnames';

import { TableProps } from './index';
import { Header, ScrollDistance } from './types';

import styles from './Header.less';
interface HeaderProps extends TableProps {
  scrollDistance?: ScrollDistance;
}

interface HeaderCellProps extends TableProps {
  header: Header;
}

function HeaderCell(props: HeaderCellProps) {
  const { header } = props;

  const headerStyle = {
    minWidth: header.width
  };

  return (
    <th key={header.key} style={headerStyle} className={styles.headerCellContainer}>
      {header.label}
    </th>
  )
}

function Header(props: HeaderProps) {
  const { headers, bordered, width, scrollDistance } = props;

  const containerStyle = {
    width,
  };

  const tableStyle = {
    marginLeft: -(scrollDistance?.left || 0)
  }

  return (
    <div className={classnames({ [styles.bordered]: bordered })}>
      <div className={classnames(styles.header)} style={containerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              {
                headers.map((header) => {
                  return <HeaderCell key={header.key} {...props} header={header} />
                })
              }
            </tr>
          </thead>
        </table>
      </div>
    </div>
  )
}

export default Header;