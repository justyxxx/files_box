import React from 'react'
import {render} from 'react-dom'
import App from '@containers/App'
import {theme} from '@styleguide/theme'
import {ThemeProvider} from 'react-jss'
import store from '@common/store'
import Provider from 'react-redux/es/components/Provider'

render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
)
