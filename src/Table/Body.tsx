import React from 'react';

import { Header, Row } from './types';
import { TableProps } from './index';

interface BodyProps extends TableProps {

}

function Body(props: BodyProps) {
  const { headers, rows } = props;

  return (
    <div>
      <table>
        <tbody>
          {
            rows.map((row) => {
              return (
                <tr key={row.key}>
                  {
                    headers.map((header) => {
                      const value = row[header.dataIndex || header.key];

                      return (
                        <td key={header.key}>
                          {
                            value
                          }
                        </td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Body;