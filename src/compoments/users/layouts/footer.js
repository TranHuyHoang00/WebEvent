import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import styles from "./styles/styles.module.css";
class footer extends Component {
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
            <div className='flex items-center justify-center'>
                <div className='p-[10px] text-[16px] font-thin'>
                    <h2 onClick={() => this.onClickPage()}
                        className="cursor-pointer text-white hover:text-[#4acec7fa] hover:scale-105 duration-300 ease-in-out">
                        www.rebelsaintrecords.com
                    </h2>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(footer));
