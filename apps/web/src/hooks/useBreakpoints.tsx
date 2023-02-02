import { useEffect, useState } from 'react';

import throttle from 'lodash/throttle';

const getDeviceConfig = (width: number) => {
  if (width < 320) {
    return 'xs';
  }
  if (width >= 320 && width < 720) {
    return 'sm';
  }
  if (width >= 720 && width < 1024) {
    return 'md';
  }
  return 'lg';
};

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg';

// TODO: desired API: useBreakpoint() => 'xs' | 'sm' | 'md' | 'lg' + smUp, mdUp, lgUp
const useBreakpoint = () => {
  const [brkPnt, setBrkPnt] = useState<Breakpoint | undefined>(() =>
    getDeviceConfig(window.innerWidth)
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const calcInnerWidth = throttle(() => {
      setBrkPnt(getDeviceConfig(window.innerWidth));
    }, 200);
    window.addEventListener('resize', calcInnerWidth);

    // eslint-disable-next-line consistent-return
    return () => window.removeEventListener('resize', calcInnerWidth);
  }, []);

  return brkPnt;
};

export default useBreakpoint;
