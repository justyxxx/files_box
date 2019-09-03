import {createSelector} from 'reselect'

export const selectorSelectNavigationItems = createSelector(
    R.path(['header', 'navigation']),
    (navigation) => navigation
)

export const selectorSelectUserLocale = createSelector(
    R.path(['header', 'locale']),
    (locale) => locale
)
