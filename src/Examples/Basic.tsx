import React from 'react';

import Table from '@src/Table';

import { basic } from './data';

export default function () {
  return (
    <div>
      <Table {...basic} />
    </div>
  )
}