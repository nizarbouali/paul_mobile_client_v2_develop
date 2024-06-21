
import { createSelector } from 'reselect';
import { RootState } from '../types/RootState';


export const makeSelectors: <T>(
  key: keyof RootState,
  initialState: T,
) => Record<keyof T, ReturnType<typeof createSelector>> = <T>(
  key: keyof RootState,
  initialState: T,
) => {
    const selectDomain = (state: RootState) => state[key] || initialState;

    const selectors: Record<
      keyof T,
      ReturnType<typeof createSelector>
    > = Object.keys(initialState || {}).reduce((acc: any, k: string) => {
      // @ts-expect-error
      acc[k] = createSelector([selectDomain], (substate) => substate[k]);
      return acc;
    }, {});

    return selectors;
  };
