import React from 'react';
import { withRouter } from 'react-router-dom';
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { Avatar, Image } from 'antd';
import { ScrollTop } from 'primereact/scrolltop';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Button } from 'primereact/button';
import './style/style.css';

class schedule extends React.Component {
    constructor(props) {
        super(props);
        this.heightMenu = React.createRef();
        this.heightMain = React.createRef();
        this.state = {
            max_hight_schedule: 0,
            dataSchedules: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        }

    }
    async componentDidMount() {
        const heightMenu = this.heightMenu.current.getBoundingClientRect().height;
        const heightMain = this.heightMain.current.getBoundingClientRect().height;
        this.setState({ max_hight_schedule: heightMain - heightMenu })
    }
    onClickDetail = (id) => {
        this.props.history.push('/home/schedule/1')
    }
    onCLickBack = () => {
        this.props.history.push('/home/calendar')
    }
    render() {
        let max_hight_schedule = this.state.max_hight_schedule;
        let dataSchedules = this.state.dataSchedules;
        return (
            <div className='bg-black flex-grow flex items-center justify-center font-serif'>
                <div ref={this.heightMain} className='flex flex-col h-full'>
                    <div ref={this.heightMenu} className="px-[10px] py-[10px]">
                        <Button onClick={() => this.onCLickBack()}
                            className=" p-[5px] space-x-[10px]">
                            <span>Back</span>
                            <AiOutlineDoubleLeft />
                        </Button>
                    </div>
                    <div className="flex-grow text-white ">
                        <ScrollPanel style={{ width: '100%', height: `${max_hight_schedule}px` }} className="custombar1">
                            <div className=' p-[10px] space-y-[10px] '>
                                {dataSchedules && dataSchedules.map((item, index) => {
                                    return (
                                        <div onClick={() => this.onClickDetail()}
                                            className="px-[20px] py-[10px] relative cursor-pointer overflow-hidden transition-all 
                                    bg-white rounded-[10px] hover:bg-white hover:scale-105 group ">
                                            <span className="w-full h-48 rounded rotate-[-40deg] bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] 
                                        absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-5 group-hover:mb-32 group-hover:translate-x-0"></span>
                                            <div className="relative w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                                                <div className='space-x-[20px] flex items-center justify-between '>
                                                    <div className='flex items-center justify-center'>
                                                        <Avatar size={60} src={require(`../../../../assets/images/1.png`).default} />
                                                    </div>
                                                    <div className='text-center '>
                                                        <div className='text-[16px] sm:text-[18px]'>
                                                            <div>Schedule Info <span>0{index + 1}</span></div>
                                                        </div>
                                                        <div className='text-[14px] sm:text-[16px] font-[600] '>
                                                            <div>HENIKEN </div>
                                                        </div>
                                                    </div>
                                                    <div className='font-[600]'>
                                                        <div className='border px-[5px] rounded-[5px] shadow-sm'>22:10</div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <ScrollTop target="parent" threshold={100} className="custom-scrolltop" icon="pi pi-arrow-up" />
                        </ScrollPanel>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(schedule);