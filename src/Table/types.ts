import { CSSProperties } from "react";

interface MoreProperties {
  [key: string]: any;
}

export interface Header extends MoreProperties {
  key: string;
  label: string;
  dataIndex?: string; // will be replaced with key if it's ommited
  freeze?: true | 'left' | 'right';
  width?: number; // need to know width in number in order to calculate freezed width
  children?: Header[];
}

export interface Row extends MoreProperties {
  key: string;
}

export interface TableProps extends MoreProperties {
  headers: Header[];
  rows: Row[];
  bordered?: boolean;
  width?: number;
  height?: CSSProperties['height'];
}

export type ScrollDistance = {
  left?: number;
  top?: number;
};