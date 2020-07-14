import React from 'react';

import { TableProps } from './index';
import { Header } from './types';

interface HeaderProps extends TableProps {

}

function Header(props: HeaderProps) {
  const { headers } = props;
  return (
    <div>
      <table>
        <thead>
          <tr>
            {
              headers.map((header) => {
                return (
                  <th key={header.key}>
                    {header.label}
                  </th>
                )
              })
            }
          </tr>
        </thead>
      </table>
    </div>
  )
}

export default Header;