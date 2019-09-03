import {all, select, take} from 'redux-saga/es/effects'
import {headerWatcher} from '@common/sagas/headerSaga'
import {filesWatcher} from '@common/sagas/filesSaga'
function* watchAndLog() {
    if (process.env.NODE_ENV !== 'production') {
        while (true) {
            const action = yield take('*')
            const state = yield select()

            console.log('action', action)
            console.log('state after ', state)
        }
    }
}

export default function* rootSaga() {
    yield all([watchAndLog(), headerWatcher(), filesWatcher()])
}
