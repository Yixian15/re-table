import React from 'react';

import BasicDemo from './Basic';
import Bordered from './Bordered';
import Freezed from './Freezed';
import Nested from './Nested';

export default function () {
  return (
    <div>
      Basic
      <BasicDemo />

      Bordered
      <Bordered />

      Freezed
      <Freezed />

      Nested Headers
      <Nested />
    </div>
  )
}