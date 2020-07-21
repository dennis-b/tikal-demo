import styled from 'styled-components';

export const Root: any = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: ${({ align }: any) => align || 'initial'};
  justify-content:  ${({ justify }: any) => justify || 'initial'};
  background-color: rgba(122,163,165,0.5)
`;
