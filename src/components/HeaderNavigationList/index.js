import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom'
import classNames from 'classnames'
import withStyles from 'react-jss'
import {Glyphicon} from 'react-bootstrap'

class HeaderNavigationList extends PureComponent {
    render() {
        const {title, url, classes, icon} = this.props
        return (
            <Link to={url} className={classNames(classes.link, classes.activeLink)} href={url}>
                <Glyphicon glyph={icon} className={classes.navIcon} />
                {title}
            </Link>
        )
    }
}

const styles = (theme) => ({
    link: {
        textDecoration: 'none',
        marginRight: 10,
        padding: 10,
        transition: ['all', '0.3s', 'ease-in-out'],
        fontWeight: 'bold',
        borderRadius: 5,
        '&:hover': {
            background: theme.colors.secondary.main,
            textDecoration: 'none',
            color: theme.colors.white
        },
        '&:focus': {
            textDecoration: 'none',
            color: theme.colors.white
        }
    },
    activeLink: {
        background: theme.colors.secondary.main,
        color: theme.colors.white
    },
    navIcon: {
        marginRight: 10
    }
})

export default withStyles(styles)(HeaderNavigationList)
