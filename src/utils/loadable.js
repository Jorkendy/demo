import React, { lazy, Suspense } from 'react'

import Spinner from 'components/Spinner'

const loadable = importFunc => {
  const LazyComponent = lazy(importFunc)

  return props => (
    <Suspense fallback={<Spinner />}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

export default loadable
