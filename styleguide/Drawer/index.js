import React, {PureComponent} from 'react'
import withStyles from 'react-jss'
import PropTypes from 'prop-types'
import {Glyphicon} from 'react-bootstrap'
class Drawer extends PureComponent {
    render() {
        const {classes, children, position, backDropClose, onClose, width, open} = this.props
        return (
            <div className={classes.drawerWrapper} style={open ? {display: 'block'} : {}}>
                <div
                    className={classes.drawerBody}
                    style={position === 'left' ? {left: 0, width: width} : {right: 0, width: width}}
                >
                    <div className={classes.closeDrawer} onClick={onClose}>
                        <div className={classes.closeButton}>
                            <Glyphicon glyph="remove" />
                        </div>
                    </div>
                    {children}
                </div>
                <div className={classes.drawerBackDrop} {...(backDropClose ? {onClick: onClose} : {})} />
            </div>
        )
    }
}

const styles = (theme) => ({
    drawerWrapper: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'none'
    },
    drawerBackDrop: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 100,
        background: 'rgba(0,0,0,0.4)',
        transition: 'all 0.3s ease-in-out'
    },
    drawerBody: {
        height: '100%',
        background: '#fff',
        zIndex: 200,
        position: 'absolute'
    },
    closeDrawer: {
        width: '100%',
        padding: 10,
        display: 'flex',
        justifyContent: 'flex-end',
        background: theme.colors.grey[0],
        borderBottom: '1px solid #ddd'
    },
    closeButton: {
        padding: 10,
        width: 40,
        height: 40,
        textAlign: 'center',
        borderRadius: '50%',
        cursor: 'pointer',
        '&:hover': {
            background: theme.colors.grey[1]
        }
    }
})

Drawer.propTypes = {
    children: PropTypes.node,
    position: PropTypes.oneOf(['left', 'right']),
    width: PropTypes.number,
    backDropClose: PropTypes.bool,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired
}

Drawer.defaultProps = {
    children: <div>Drawer</div>,
    position: 'left',
    width: 300,
    backDropClose: true,
    onClose: () => {}
}

export default withStyles(styles)(Drawer)
