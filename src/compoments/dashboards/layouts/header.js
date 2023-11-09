import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { Chip } from 'primereact/chip';
import x from '../../../assets/images/1.png'
class header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    onClickPage = () => {
    }
    render() {
        return (
            <div className=' bg-slate-800 p-[10px]'>
                <div className='flex items-center justify-center '>
                    <div>
                        {/* <Chip label="JACKIE NJINE" image={require(`../../../assets/images/1.png`).default} className="" /> */}
                    </div>
                    <div>

                    </div>
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
