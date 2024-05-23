import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
class modal_footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        return (
            <>
                <Button onClick={() => this.props.open_modal(this.props.type, false)}
                    className='bg-[#e94138] text-white'>
                    Cancel
                </Button>
                <Button disabled={this.props.is_loading} onClick={() => this.props.handle_funtion()}
                    className='bg-[#0e97ff] text-white'>
                    OK
                </Button>
            </>
        );
    }

}
export default withRouter(modal_footer);