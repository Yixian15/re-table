import React from 'react';

import BasicDemo from './Basic';
import Bordered from './Bordered';
import Freezed from './Freezed';

export default function () {
  return (
    <div>
      Basic
      <BasicDemo />

      Bordered
      <Bordered />

      Freezed
      <Freezed />
    </div>
  )
}