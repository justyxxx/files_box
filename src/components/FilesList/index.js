import React, {PureComponent} from 'react'
import withStyles from 'react-jss'
import {Glyphicon, OverlayTrigger, Tooltip} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'

class FilesList extends PureComponent {
    handleFileClick = () => {
        const {id, onFileClick} = this.props
        onFileClick(id)
    }

    render() {
        const {classes, title, id} = this.props
        return (
            <div
                className={classes.files}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
                onClick={this.handleFileClick}
            >
                <div className={classes.filesContent} onClick={this.handleFolderClick}>
                    <Glyphicon className={classes.filesIcon} glyph="file" />
                    <OverlayTrigger placement="top" overlay={<Tooltip id={`file_title_overlay${id}`}>{title}</Tooltip>}>
                        <p>{title}</p>
                    </OverlayTrigger>
                </div>
            </div>
        )
    }
}

const styles = (theme) => ({
    files: {
        ...theme['flexStart'],
        flexWrap: 'wrap',
        cursor: 'pointer',
        color: theme.colors.secondary.main,
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
    filesIcon: {
        width: '100%',
        fontSize: 100,
        marginBottom: 10,
        marginTop: 10
    },
    filesContent: {
        width: '100%',
        '& p': {
            width: '100%',
            whiteSpace: 'nowrap',
            padding: '0 20px',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        }
    },
    filesAcions: {
        width: '100%',
        textAlign: 'left',
        transition: ['all', '0.3s', 'ease-in-out'],
        background: theme.colors.primary.main,
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

export default withRouter(withStyles(styles)(FilesList))
