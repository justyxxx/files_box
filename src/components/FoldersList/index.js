import React, {PureComponent} from 'react'
import withStyles from 'react-jss'
import {Button, Collapse, FormGroup, Glyphicon, OverlayTrigger, Tooltip} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import * as routesConstants from '@common/constants/routesConstants'
import {getLocale} from '@common/utils/localizations'

class FoldersList extends PureComponent {
    handleFolderClick = () => {
        const {id, history} = this.props
        history.push(routesConstants.FOLDERS + '/' + id)
    }

    handleDeleteFolder = () => {
        const {id, onDelete} = this.props
        onDelete(id)
    }

    render() {
        const {classes, title, locale, def, id} = this.props
        return (
            <div className={classes.folder} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                <div className={classes.folderContent} onClick={this.handleFolderClick}>
                    <Glyphicon className={classes.foldersIcon} glyph="folder-close" />
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id={`folder_title_overlay${id}`}>{title}</Tooltip>}
                    >
                        <p>{title}</p>
                    </OverlayTrigger>
                </div>
                <Collapse in={!def}>
                    <div className={classes.folderActions}>
                        <FormGroup className={classes.formControl}>
                            <Button onClick={this.handleDeleteFolder} bsStyle="danger">
                                {getLocale(locale, 'locale.actions.delete')}
                            </Button>
                        </FormGroup>
                    </div>
                </Collapse>
            </div>
        )
    }
}

const styles = (theme) => ({
    folder: {
        ...theme['flexStart'],
        flexWrap: 'wrap',
        cursor: 'pointer',
        color: theme.colors.primary.main,
        minWidth: 200,
        maxWidth: 200,
        '& p': {
            width: '100%'
        },
        textAlign: 'center',
        '&:hover': {
            background: theme.colors.grey[2]
        },
        transition: ['all', '0.3s', 'ease-in-out'],
        marginRight: 20,
        borderRadius: 10,
        overflow: 'hidden'
    },
    foldersIcon: {
        width: '100%',
        fontSize: 100,
        marginBottom: 10,
        marginTop: 10
    },
    folderContent: {
        width: '100%',
        '& p': {
            width: '100%',
            whiteSpace: 'nowrap',
            padding: '0 20px',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        }
    },
    folderActions: {
        width: '100%',
        textAlign: 'left',
        transition: ['all', '0.3s', 'ease-in-out'],
        background: theme.colors.secondary.main,
        '& button': {
            margin: 10
        }
    },
    formControl: {
        margin: 0
    },
    formCheckBox: {
        margin: 0
    }
})

export default withRouter(withStyles(styles)(FoldersList))
