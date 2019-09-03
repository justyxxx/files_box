import {applyMiddleware, createStore} from 'redux'
import reducer from '@common/reducers'
import createSagaMiddleware from 'redux-saga'
import {composeWithDevTools} from 'redux-devtools-extension'
import saga from '@common/sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(saga)

export default store
