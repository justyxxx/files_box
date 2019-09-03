import {combineReducers} from 'redux'
import headerReducer from '@common/reducers/headerReducer'
import filesReducer from '@common/reducers/filesReducer'
const reducer = combineReducers({
    header: headerReducer,
    files: filesReducer
})

export default reducer
