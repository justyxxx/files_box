import * as headerConstants from '@common/constants/headerConstants'
const initialState = {
    navigation: [],
    locale: 'ru'
}

export default function headerReducer(state = initialState, action = {}) {
    switch (action.type) {
        case headerConstants.SET_HEADER_NAVIGATION:
            return {
                ...state,
                navigation: action.navigation
            }
        case headerConstants.CHANGE_LOCALE:
            return {
                ...state,
                locale: action.locale
            }

        default:
            return state
    }
}
