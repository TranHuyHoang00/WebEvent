import React from 'react';
import { withRouter } from 'react-router-dom';
import { AiOutlineDoubleLeft, AiTwotoneCalendar } from "react-icons/ai";
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
            date_param: '',
            dataSchedules: [
                {
                    id: 1,
                    user: { id: 1, fullname: 'Star Gazer', avatar: '1.jpg', },
                    time_locaiton: { id: 1, show_time: '12:22' },
                    brand: { id: 1, name: 'TIGER' },
                },
                {
                    id: 2,
                    user: { id: 1, fullname: 'Luna Dreamer', avatar: '2.jpg', },
                    time_locaiton: { id: 1, show_time: '12:40' },
                    brand: { id: 1, name: '333' },
                },
                {
                    id: 3,
                    user: { id: 1, fullname: 'Mountain Hiker', avatar: '3.jpg', },
                    time_locaiton: { id: 1, show_time: '12:50' },
                    brand: { id: 1, name: 'SAIGONXANH' },
                },
                {
                    id: 4,
                    user: { id: 1, fullname: 'Star Gazer', avatar: '4.jpg', },
                    time_locaiton: { id: 1, show_time: '13:00' },
                    brand: { id: 1, name: 'HENIKEN' },
                },
                {
                    id: 5,
                    user: { id: 1, fullname: 'Star Gazer', avatar: '5.jpg', },
                    time_locaiton: { id: 1, show_time: '13:40' },
                    brand: { id: 1, name: 'HENIKEN' },
                },
            ],
        }

    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params) {
            let date_param = this.props.match.params.date;
            this.setState({ date_param: date_param })
        }
        const heightMenu = this.heightMenu.current.getBoundingClientRect().height;
        const heightMain = this.heightMain.current.getBoundingClientRect().height;
        this.setState({ max_hight_schedule: heightMain - heightMenu })
    }
    onClickDetail = (id) => {
        this.props.history.push(`/home/schedule/detail/${id}`)
    }
    onCLickBack = () => {
        window.history.back();
    }
    render() {
        let max_hight_schedule = this.state.max_hight_schedule;
        let dataSchedules = this.state.dataSchedules;
        return (
            <div className='bg-black flex-grow flex items-center justify-center font-serif'>
                <div ref={this.heightMain} className='flex flex-col h-full'>
                    <div ref={this.heightMenu} className="px-[10px] py-[5px]">
                        <div className='flex items-center justify-between'>
                            <div className='pt-[5px]'>
                                <div onClick={() => this.onCLickBack()}
                                    className="w-[100px] px-[10px] py-[5px] relative rounded-[10px] group overflow-hidden bg-gray-900 text-white 
                            hover:scale-105 transition-all duration-500 ease-out cursor-pointer border-white border-[1px]">
                                    <span className="absolute inset-0 flex items-center justify-center text-white duration-500 -translate-x-full
                                bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:translate-x-0 ease"></span>
                                    <div className="relative group-hover:text-white">
                                        <div className='flex items-center justify-center space-x-[10px]'>
                                            <AiOutlineDoubleLeft />
                                            <div >BACK</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='text-white text-[20px] font-[500] flex items-center justify-center space-x-[5px]
                            border-b hover:text-yellow-400 transition-all duration-500 ease-out '>
                                <AiTwotoneCalendar />
                                <label>{this.state.date_param}</label>
                            </div>
                        </div>
                    </div>
                    <div className="flex-grow text-white ">
                        <ScrollPanel style={{ width: '100%', height: `${max_hight_schedule}px` }} className="p-[5px]">
                            <div className=' p-[10px] space-y-[10px] '>
                                {dataSchedules && dataSchedules.map((item, index) => {
                                    return (
                                        <div onClick={() => this.onClickDetail(item.id)}
                                            className="px-[20px] py-[10px] relative cursor-pointer overflow-hidden transition-all 
                                    bg-white rounded-[10px] hover:bg-white hover:scale-105 group ">
                                            <span className="w-full h-48 rounded rotate-[-40deg] bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] 
                                        absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-5 group-hover:mb-32 group-hover:translate-x-0"></span>
                                            <div className="relative w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                                                <div className='space-x-[20px] flex items-center justify-between '>
                                                    <div className='flex items-center justify-center'>
                                                        <Avatar size={60} src={require(`../../../../assets/images/${item.user && item.user.avatar}`).default} />
                                                    </div>
                                                    <div className='text-center '>
                                                        <div className='text-[16px] sm:text-[18px]'>
                                                            <div>Schedule Info <span>0{index + 1}</span></div>
                                                        </div>
                                                        <div className='text-[14px] sm:text-[16px] font-[600] '>
                                                            <div>{item.brand && item.brand.name}</div>
                                                        </div>
                                                    </div>
                                                    <div className='font-[600]'>
                                                        <div className='border px-[5px] rounded-[5px] shadow-sm'>{item.time_locaiton && item.time_locaiton.show_time}</div>
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