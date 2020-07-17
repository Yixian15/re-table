import { DEFAULT_COLUMN_WIDTH } from './constants';
import { Header } from './types';

function isLeaf(header: Header) {
  return !header.children || !header.children.length;
}

export function getLeaves(headers: Header[]) {
  const leaves: Header[] = [];
  const queue: Header[] = headers;
  while (queue.length > 0) {
    const head: Header = queue.shift() as Header;
    if (!head.children || (head.children.length === 0)) {
      leaves.push(head);
    } else {
      head.children.forEach((child) => queue.push(child))
    }
  }

  return leaves;
}

export function getHeaderWidth(header: Header, borderd?: boolean) {
  if (isLeaf(header)) {
    return (header.width || DEFAULT_COLUMN_WIDTH) + (borderd ? 1 : 0);
  } else {
    const leaves: Header[] = getLeaves([header]);

    const columnWidthSum = leaves.reduce((total, header) => (header.width || DEFAULT_COLUMN_WIDTH) + total, 0);
    const borderWidthSum = borderd ? (header.children as Header[]).length - 1 : 0;

    return columnWidthSum + borderWidthSum;
  }
}

export function isFreezedLeftHeader(header: Header) {
  return header.freeze === true || header.freeze === 'left';
}

export function isFreezedRightHeader(header: Header) {
  return header.freeze === 'right';
}