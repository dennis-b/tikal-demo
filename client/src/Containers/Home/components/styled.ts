import styled from 'styled-components';
import { Map } from "google-maps-react";

export const StMap = styled(Map)`
  &&{
    //height: calc(100% - 2rem) !important; 
    //position: relative;
    width: 100%
  }
`;

export const StHeader = styled.div`
  height: 2rem; 
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(122,163,165,0.5);
  top: 0;
  z-index: 100;
`;
