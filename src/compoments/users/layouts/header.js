import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
class header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    onClickPage = () => {
        this.props.history.push(`/home`);
    }
    render() {
        return (
            <div className='h-1/6'>
                <div className='flex items-center justify-center p-[10px]'>
                    <img onClick={() => this.onClickPage()}
                        className='h-[130px] w-auto cursor-pointer hover:scale-105 duration-500 ease-in-out'
                        src='https://rebelsaintrecords.com/wp-content/themes/yootheme/cache/c3/1_5-removebg-preview-c32c9ec9.webp' />
                </div>
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(header));
