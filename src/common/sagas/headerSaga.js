import {call, put} from 'redux-saga/effects'
import {apiGetNavigation} from '@common/api/headerApi'
import {setHeaderNavigation} from '@common/actions/headerAction'

function* setNavigation() {
    try {
        const navigation = yield call(apiGetNavigation)
        yield put(setHeaderNavigation(navigation.data))
    } catch (e) {
        console.log(e)
    }
}
export function* headerWatcher() {
    yield call(setNavigation)
}
