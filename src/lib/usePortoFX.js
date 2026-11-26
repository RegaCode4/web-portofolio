import { useCallback, useRef } from 'react';
import portoFX, { showPortoToast, fireButtonFX, Spring } from './portoFX';

export function useSquash({ low = 0.84, wide = 0.48, k = 540, d = 15 } = {}) {
  const unbindRef = useRef(null);
  return useCallback(
    (node) => {
      if (unbindRef.current) {
        unbindRef.current();
        unbindRef.current = null;
      }
      if (node) {
        unbindRef.current = portoFX.bindSquash(node, { low, wide, k, d });
      }
    },
    [low, wide, k, d]
  );
}

export { portoFX, showPortoToast, fireButtonFX, Spring };
export default portoFX;
