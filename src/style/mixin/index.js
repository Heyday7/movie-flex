import { css } from 'styled-components';

export const defaultBoxStyle = css`
  border: 1px solid var(--adaptiveGray300);
  border-radius: 6px;
  box-shadow: 0 2px 4px -4px var(--adaptiveGray900);
  padding: 24px;
  height: 100%; // grid 전체 차지하게
  max-height: 500px;
  overflow: auto;
`;

export const adaptiveBackground = css`
  background: var(--adaptiveGray50);
  color: var(--adaptiveGray900);
`;

export const primaryButtonStyle = css`
  background: var(--blue);
  color: var(--adaptiveGray50);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 10px;
`;

export const flexCentering = (direction) => `
  display: flex;
  flex-direction: ${direction};
  justify-content: center;
  align-items: center;
`;
