import React from 'react'
import styled from '@emotion/styled'

import Spin from 'antd/lib/spin'

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;

  img {
    width: 30px;
  }
`

function Spinner() {
  return (
    <Wrapper>
      <Spin />
    </Wrapper>
  )
}

export default Spinner
