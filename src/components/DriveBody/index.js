import React, {PureComponent} from 'react'
import {Route, withRouter} from 'react-router-dom'
import * as routesConstants from '@common/constants/routesConstants'
import DriveFilesContent from '@containers/DriveFilesContent'
import {Col, Grid, Row} from 'react-bootstrap'

class DriveBody extends PureComponent {
    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col md={12} xs={8}>
                        <Route path={routesConstants.FOLDERS + '/:id'} component={DriveFilesContent} />
                        <Route path={routesConstants.ROOT_FOLDER} component={DriveFilesContent} />
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default withRouter(DriveBody)
