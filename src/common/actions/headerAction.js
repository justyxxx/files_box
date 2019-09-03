import * as headerConstants from '@common/constants/headerConstants'
export const setHeaderNavigation = (nav) => ({
    type: headerConstants.SET_HEADER_NAVIGATION,
    navigation: nav
})

export const actionChangeUserLocale = (locale) => ({
    type: headerConstants.CHANGE_LOCALE,
    locale: locale
})
