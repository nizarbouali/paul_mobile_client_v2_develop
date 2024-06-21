// saga
import { put, takeLatest, } from 'redux-saga/effects';
import { actions } from './reducer';

export function* incrementSaga() {
    try {
        yield put(actions.decrement())
    } catch (error) { }
}

export default function* saga() {
    yield takeLatest(actions.increment, incrementSaga);
}