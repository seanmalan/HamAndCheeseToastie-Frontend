import React, {Component} from 'react';

class NotAuthorised extends Component {
    render() {
        return (
            <div>
                <h1>Not Authorised</h1>
                <p>You are not authorised to view this page.</p>
            </div>
        );
    }
}

export default NotAuthorised;