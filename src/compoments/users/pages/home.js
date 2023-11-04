import React from 'react';
import { withRouter } from 'react-router-dom';
class home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        return (
            <div>Home</div>
        )
    }
}

export default withRouter(home);