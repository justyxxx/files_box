import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'

const Words = ({type, classes, children}) => {
    switch (type) {
        case 'h1':
            return <h1 className={classNames(classes.h1, classes.resetMargins)}>{children}</h1>
        case 'h2':
            return <h2 className={classNames(classes.h2, classes.resetMargins)}>{children}</h2>
        case 'h3':
            return <h3 className={classNames(classes.h3, classes.resetMargins)}>{children}</h3>
        case 'h4':
            return <h4 className={classNames(classes.h4, classes.resetMargins)}>{children}</h4>
        case 'h5':
            return <h5 className={classNames(classes.h5, classes.resetMargins)}>{children}</h5>
        case 'h6':
            return <h6 className={classNames(classes.h6, classes.resetMargins)}>{children}</h6>
        case 'paragraph':
            return <p className={classNames(classes.p, classes.resetMargins)}>{children}</p>
        default:
            return <p className={classNames(classes.p, classes.resetMargins)}>{children}</p>
    }
}

const styles = (theme) => ({
    resetMargins: {
        margin: 0,
        padding: 0
    },
    h1: {
        fontSize: theme.fontSize.h1,
        marginBottom: 30
    },
    h2: {
        fontSize: theme.fontSize.h2,
        marginBottom: 30
    },
    h3: {
        fontSize: theme.fontSize.h3,
        marginBottom: 20
    },
    h4: {
        fontSize: theme.fontSize.h4,
        marginBottom: 20
    },
    h5: {
        fontSize: theme.fontSize.h5,
        marginBottom: 20
    },
    h6: {
        fontSize: theme.fontSize.h6,
        marginBottom: 20
    },
    p: {
        fontSize: theme.fontSize.paragraph,
        marginBottom: 20
    }
})

Words.propTypes = {
    type: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'paragraph'])
}

export default withStyles(styles)(Words)
