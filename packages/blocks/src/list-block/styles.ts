import { css } from 'lit';

const listPrefix = css`
  .affine-list-block__prefix {
    display: flex;
    align-items: center;
    color: var(--affine-blue-700);
    font-size: var(--affine-font-sm);
    user-select: none;
    position: relative;
  }

  .affine-list-block__numbered {
    min-width: 22px;
    height: 24px;
    margin-left: 2px;
  }

  .affine-list-block__todo-prefix {
    cursor: pointer;
    width: 24px;
    height: 24px;
    transform: translate(1px);
  }

  .affine-list-block__todo-prefix > svg {
    width: 15px;
    height: 15px;
  }

  .affine-list-block__check-animation {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    transform: translateX(-1.5px);
    animation: sparking 0.6s ease forwards;
  }

  @keyframes sparking {
    0% {
      width: 14px;
      height: 14px;
      left: 0px;
    }
    40% {
      width: 20px;
      height: 20px;
      left: 0px;
      box-shadow: 0 -18px 0 -8px #1e96eb, 16px -8px 0 -8px #1e96eb,
        16px 8px 0 -8px #1e96eb, 0 18px 0 -8px #1e96eb, -16px 8px 0 -8px #1e96eb,
        -16px -8px 0 -8px #1e96eb;
    }

    100% {
      width: 20px;
      height: 20px;
      left: 0px;
      box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent,
        32px 16px 0 -10px transparent, 0 36px 0 -10px transparent,
        -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
    }
  }
`;

const toggleStyles = css`
  .toggle-icon {
    display: flex;
    position: absolute;
    left: 0;
    transform: translateX(-100%);
    border-radius: 4px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
  .toggle-icon:hover {
    background: var(--affine-hover-color);
  }
  .affine-list-block-container:hover .toggle-icon {
    opacity: 1;
  }
  .toggle-icon__collapsed {
    opacity: 1;
  }
`;

export const styles = css`
  .affine-list-block-container {
    box-sizing: border-box;
    border-radius: 4px;
    padding: 4px 0;
  }
  .affine-list-block-container--first {
    margin-top: 14px;
  }
  .affine-list-block-container .affine-list-block-container {
    margin-top: 0;
  }
  .affine-list-rich-text-wrapper {
    display: flex;
    align-items: center;
    position: relative;
  }
  .affine-list-rich-text-wrapper rich-text {
    flex: 1;
  }

  ${listPrefix}
  ${toggleStyles}
`;
