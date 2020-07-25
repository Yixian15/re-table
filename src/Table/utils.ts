import { DEFAULT_COLUMN_WIDTH } from './constants';
import { Header } from './types';

function isLeaf(header: Header) {
  return !header.children || !header.children.length;
}

export function getLeaves(headers: Header[]) {
  const leaves: Header[] = [];
  const queue: Header[] = headers.map((header) => ({ ...header }));
  while (queue.length > 0) {
    const current: Header = queue.shift() as Header;
    if (!current.children || (current.children.length === 0)) {
      leaves.push(current);
    } else {
      queue.splice(0, 0, ...current.children);
    }
  }

  return leaves;
}

export function getHeaderWidth(header: Header,) {
  if (isLeaf(header)) {
    return (header.width || DEFAULT_COLUMN_WIDTH);
  } else {
    const leaves: Header[] = getLeaves([header]);
    const columnWidthSum = leaves.reduce((total, header) => (header.width || DEFAULT_COLUMN_WIDTH) + total, 0);

    return columnWidthSum;
  }
}

export function isFreezedLeftHeader(header: Header) {
  return header.freeze === true || header.freeze === 'left';
}

export function isFreezedRightHeader(header: Header) {
  return header.freeze === 'right';
}