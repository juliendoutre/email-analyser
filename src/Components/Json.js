import React from 'react';
import { Segment, Button, Icon } from 'semantic-ui-react';
import { saveAsJson } from './files';


export default (props) => {
    let contents = JSON.stringify(props.results, null, 2);
    return <Segment basic>
        <Button icon labelPosition='right' onClick={saveAsJson(contents, 'email-analyzer-metadata-headers.json')}>Download JSON<Icon name='download' /></Button>
        <pre style={{ overflowX: 'auto' }}>
            {contents}
        </pre>
    </Segment>;
};
