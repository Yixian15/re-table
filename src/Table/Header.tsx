import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';

import { TableProps } from './index';
import { Header, ScrollDistance } from './types';
import { getHeaderWidth, isFreezedRightHeader, isFreezedLeftHeader } from './utils';

import styles from './Header.less';
import { createNoSubstitutionTemplateLiteral } from 'typescript';
import Bordered from '@src/Examples/Bordered';

interface HeaderProps extends TableProps {
  scrollDistance?: ScrollDistance;
  isAtLeftBorder?: boolean;
  isAtRightBorder?: boolean;
}

interface HeaderCellProps extends TableProps {
  header: Header;
}

function HeaderCell(props: HeaderCellProps) {
  const { header, bordered } = props;
  const children = header.children || [];
  const subTableWidth = children.reduce((total, child) => total + getHeaderWidth(child), 0); // nested header

  const headerStyle = {
    width: Math.max(getHeaderWidth(header), subTableWidth)
  };

  return (
    <th key={header.key} className={styles.headerCellContainer}>
      <div style={headerStyle}>
        {header.label}

        {
          children.length > 0 && (
            <div className={styles.subTableDivider}>
              <table>
                <thead>
                  <tr>


                    {
                      children.map((child) => {
                        return (
                          <HeaderCell key={child.key} {...props} header={child} />
                        )
                      })
                    }

                  </tr>
                </thead>
              </table>

            </div>
          )
        }
      </div>

      {
        bordered && <div className={styles.border} />
      }
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
  )
}


function ComposedHeader(props: HeaderProps) {
  const { headers, width, bordered, isAtLeftBorder, isAtRightBorder } = props;

  const freezedLeftHeaders = headers.filter(isFreezedLeftHeader);
  // column width + container border width
  const freezedLeftWidth = freezedLeftHeaders.reduce((total, header) => (header.width || 0) + total, 0);

  const freezedRightHeaders = headers.filter(isFreezedRightHeader);
  const freezedRightWidth = freezedRightHeaders.reduce((total, header) => (header.width || 0) + total, 0);
  const nonFreezedRightHeadersWidth = headers.filter((header) => !isFreezedRightHeader(header)).reduce((total, header) => getHeaderWidth(header) + total, 0);

  const containerStyle = {
    width
  };

  const freezedRightStyle = {
  }

  const [headerHeight, setHeaderHeight] = useState(0);
  const headerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headerContainer = headerContainerRef?.current;
    if (headerContainer) {
      const headerContainerRect = headerContainer?.getBoundingClientRect();
      setHeaderHeight(headerContainerRect.height);
    }

  }, [])

  // Header cell height would be mis-aligned if only freezed headers are rendered.
  // All headers need to be rendered, then hide the invisible columns.
  return (
    <div className={classnames(styles.container, { [styles.bordered]: bordered })} style={containerStyle} ref={headerContainerRef}>
      <Header {...props} />
      {
        freezedLeftHeaders.length > 0 && !isAtLeftBorder && (
          <div className={styles.freezedLeft}>
            <Header {...props} width={freezedLeftWidth} scrollDistance={{}} />
          </div>
        )
      }

      {
        freezedRightHeaders.length > 0 && !isAtRightBorder && (
          <div className={styles.freezedRight} style={freezedRightStyle}>
            <Header {...props} width={freezedRightWidth} scrollDistance={{ left: nonFreezedRightHeadersWidth }} />
          </div>
        )
      }

      {
        bordered && (
          <div>
            <div className={styles.headerBorderLeft} style={{ height: headerHeight }} />
            <div className={styles.headerBorderRight} style={{ height: headerHeight }} />
          </div>
        )
      }

    </div>
  )
}

export default ComposedHeader;