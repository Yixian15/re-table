import React from 'react';

import * as data from './data';
import Table from '@src/Table';

export default function () {
  return (
    <div>
      <Table {...data.basic} bordered />
    </div>
  )
}