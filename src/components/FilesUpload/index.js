import React, {PureComponent} from 'react'
import withStyles from 'react-jss'
import {ProgressBar} from 'react-bootstrap'
import {getLocale} from '@common/utils/localizations'

class FilesUpload extends PureComponent {
    render() {
        const {classes, loadedFiles, filesCount, showProgress, success, locale} = this.props
        return (
            <div className={classes.progressWrapper}>
                <div className={classes.progress}>
                    <ProgressBar
                        label={getLocale(locale, 'locale.progress.upload', loadedFiles, filesCount)}
                        srOnly
                        active={showProgress && !success}
                        now={(loadedFiles / filesCount) * 100}
                        className={classes.progressBar}
                    />
                    {success === false ? <p>Error occurred then uploading files. Please, try again</p> : null}
                </div>
            </div>
        )
    }
}

const styles = (theme) => ({
    progressWrapper: {
        width: '100%',
        maxWidth: 300,
        boxSizing: 'border-box',
        position: 'fixed',
        bottom: 50,
        padding: 20,
        right: 50,
        borderRadius: 10,
        background: theme.colors.grey[1]
    },
    progressBar: {
        position: 'relative',
        margin: 0,
        '& span': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            color: theme.colors.primary.dark,
            clip: 'auto',
            fontWeight: 'bold'
        }
    },
    closeButton: {
        width: '100%',
        textAlign: 'right',
        '& span': {
            padding: 5,
            boxSizing: 'border-box'
        }
    }
})
export default withStyles(styles)(FilesUpload)
