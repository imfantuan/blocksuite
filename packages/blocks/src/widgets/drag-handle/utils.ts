import type { BaseSelection } from '@blocksuite/block-std';
import type { BlockElement } from '@blocksuite/lit';
import type { BaseBlockModel } from '@blocksuite/store';
import type { CSSResultGroup } from 'lit';

import { DEFAULT_DRAG_HANDLE_CONTAINER_HEIGHT } from './config.js';

const heightMap: { [key: string]: number } = {
  text: 23,
  h1: 40,
  h2: 36,
  h3: 32,
  h4: 32,
  h5: 28,
  h6: 26,
  quote: 46,
  list: 26,
  database: 40,
};

export const getDragHandleContainerHeight = (model: BaseBlockModel) => {
  const flavour = model.flavour;
  const index = flavour.indexOf(':');
  let key = flavour.slice(index + 1);
  if (key === 'paragraph' && model.type) {
    key = model.type;
  }

  const height = heightMap[key] ?? DEFAULT_DRAG_HANDLE_CONTAINER_HEIGHT;

  return height;
};

// To check if the block is a child block of the selected blocks
export const containChildBlock = (
  selections: BaseSelection[],
  childPath: string[]
) => {
  return selections.some(selection => {
    const { path } = selection;
    if (path.length > childPath.length) {
      return false;
    }
    return path.join('|') === childPath.slice(0, -1).join('|');
  });
};

export const containBlock = (selections: BaseSelection[], blockId: string) => {
  return selections.some(selection => selection.blockId === blockId);
};

// TODO: this is a hack, need to find a better way
export const insideDatabaseTable = (element: Element) => {
  return !!element.closest('.affine-database-block-table');
};

export const captureEventTarget = (target: EventTarget | null) => {
  const isElementOrNode = target instanceof Element || target instanceof Node;
  return isElementOrNode
    ? target instanceof Element
      ? target
      : target.parentElement
    : null;
};

export const getNoteId = (blockElement: BlockElement) => {
  let element = blockElement;
  while (element && element.flavour !== 'affine:note') {
    element = element.parentBlockElement;
  }

  return element.model.id;
};

export function renderStyles(styles: CSSResultGroup, container: HTMLElement) {
  if (Array.isArray(styles)) {
    styles.forEach(s => {
      renderStyles(s, container);
    });
    return;
  }
  const styleEle = document.createElement('style');
  if (styles instanceof CSSStyleSheet) {
    const cssText = Array.from(styles.cssRules)
      .map(rule => rule.cssText)
      .join('\n');
    styleEle.textContent = cssText;
    return;
  }
  styleEle.textContent = styles.cssText;
  container.appendChild(styleEle);
}
