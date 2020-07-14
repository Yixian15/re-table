export interface Header {
  key: string;
  label: string;
  dataIndex?: string; // will be replaced with key if it's ommited
}

export interface Row {
  key: string;
  [property: string]: any
}

export interface TableProps {
  headers: Header[];
  rows: Row[]
}