import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    AiOutlineDoubleLeft, AiOutlineFieldTime, AiOutlineEnvironment, AiTwotoneEdit, AiOutlineGithub,
    AiTwotoneSkin, AiFillContacts, AiOutlineCaretRight, AiOutlineDoubleRight,
} from "react-icons/ai";
import './style/style.css';
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { Image, Carousel, Avatar } from 'antd';

class schedule_detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            dataSchedule: {},
            time_locaiton: {
                id: '1', make_up_time: '12:20', leave_time: '15:30', show_time: '13:00', show_date: '23/12/2023',
                show_location: '112 Nam Cao, Tp. Thu Duc, HCM', agency_name: 'Tran Huy Hoang', contact: '0886849390'
            },
            makeup_hair: {
                id: '1', make_up: 'Vu Trung An', make_hair: 'Vu Duc Hai',
                img: [
                    { id: '1', value: '1.jpg' },
                    { id: '2', value: '2.jpg' }
                ]
            },
            stylist: {
                id: '1', name: 'local',
                img: [
                    { id: '1', value: '3.jpg' },
                    { id: '2', value: '4.jpg' }
                ]
            },
            charge_of: {
                id: '1', name: 'Do Thanh Lap',
            },
            user: {
                id: 1, fullname: 'Star Gazer', username: 'StarGazer', avatar: '1.jpg', role: { id: '3', name: 'artist' }
            },
            modal_time_locaiton: false,
            modal_makeup_hair: false,
            modal_makeup_stylist: false,
            modal_charge_of: false,
        }

    }
    async componentDidMount() {
    }
    onCLickBack = () => {
        window.history.back();
    }
    onClickModal = (name, value) => {
        if (name == 'time_locaiton') { this.setState({ modal_time_locaiton: value }) }
        if (name == 'makeup_hair') { this.setState({ modal_makeup_hair: value }) }
        if (name == 'stylist') { this.setState({ modal_makeup_stylist: value }) }
        if (name == 'charge_of') { this.setState({ modal_charge_of: value }) }
    }
    render() {
        let time_locaiton = this.state.time_locaiton;
        let makeup_hair = this.state.makeup_hair;
        let stylist = this.state.stylist;
        let charge_of = this.state.charge_of;
        let user = this.state.user;
        return (
            <>
                <div className='bg-black flex-grow flex items-center justify-center font-serif'>
                    <div className='flex flex-col h-full space-y-[10px] px-[10px]'>
                        <div className='pt-[10px]'>
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
                        <div className=" flex-grow text-white ">
                            <div className='border p-[10px] rounded-[10px] shadow-md'>
                                <div className='flex items-center justify-center rounded-[10px] bg-transparent text-white 
                                px-[10px] py-[5px] border space-x-[10px]'>
                                    <div className='text-center hover:scale-105 duration-500 ease-in-out'>
                                        <label className='text-[18px]'>SCHEDULE INFO</label><br />
                                        <label className='text-[16px] text-gray-400'>HENIKEN</label>
                                    </div>
                                    <div className=" p-[10px] text-yellow-400 text-[18px] italic text-center space-y-[5px] hover:scale-105 duration-500 ease-in-out">
                                        {user && user.avatar &&
                                            <Avatar src={require(`../../../../assets/images/${user.avatar}`).default} size={100}
                                                className='border-[2px] border-white ' />
                                        }
                                        <div><span className=''>{user && user.fullname}</span></div>
                                    </div>
                                </div>
                                <div className='p-[10px] space-y-[10px]'>
                                    <div onClick={() => this.onClickModal('time_locaiton', true)}
                                        className="px-5 py-2.5 relative rounded-[10px] group overflow-hidden  bg-white text-black 
                            hover:scale-105 transition-all duration-500 ease-out cursor-pointer">
                                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-500 -translate-x-full
                                bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:translate-x-0 ease"></span>
                                        <div className="relative group-hover:text-white">
                                            <div className='flex items-center justify-center space-x-[10px]'>
                                                <AiOutlineFieldTime />
                                                <div>TIME - LOCATION</div>
                                                <AiOutlineEnvironment />
                                            </div>

                                        </div>
                                    </div>
                                    <div onClick={() => this.onClickModal('makeup_hair', true)}
                                        className="px-5 py-2.5 relative rounded-[10px] group overflow-hidden  bg-white text-black 
                            hover:scale-105 transition-all duration-500 ease-out cursor-pointer">
                                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-500 -translate-x-full
                                bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:translate-x-0 ease"></span>
                                        <div className="relative group-hover:text-white">
                                            <div className='flex items-center justify-center space-x-[10px]'>
                                                <AiTwotoneEdit />
                                                <div>MAKE UP - HAIR</div>
                                                <AiOutlineGithub />
                                            </div>

                                        </div>
                                    </div>
                                    <div onClick={() => this.onClickModal('stylist', true)}
                                        className="px-5 py-2.5 relative rounded-[10px] group overflow-hidden  bg-white text-black 
                            hover:scale-105 transition-all duration-500 ease-out cursor-pointer">
                                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-500 -translate-x-full
                                bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:translate-x-0 ease"></span>
                                        <div className="relative group-hover:text-white">
                                            <div className='flex items-center justify-center space-x-[10px]'>
                                                <AiTwotoneSkin />
                                                <div>STYLIST</div>
                                            </div>

                                        </div>
                                    </div>
                                    <div onClick={() => this.onClickModal('charge_of', true)}
                                        className="px-5 py-2.5 relative rounded-[10px] group overflow-hidden  bg-white text-black 
                            hover:scale-105 transition-all duration-500 ease-out cursor-pointer">
                                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-500 -translate-x-full
                                bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:translate-x-0 ease"></span>
                                        <div className="relative group-hover:text-white">
                                            <div className='flex items-center justify-center space-x-[10px]'>
                                                <AiFillContacts />
                                                <div>PERSON IN CHARGE</div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AnimatePresence>
                    {this.state.modal_time_locaiton == true &&
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="bg-slate-900/20 p-[20px] fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer font-serif">
                            <motion.div initial={{ scale: 0, rotate: "12.5deg" }} animate={{ scale: 1, rotate: "0deg" }} exit={{ scale: 0, rotate: "0deg" }}
                                className=" bg-gradient-to-r from-slate-900 to-slate-950 text-white p-6 rounded-lg w-full max-w-md shadow-xl cursor-default relative overflow-hidden">
                                <FiAlertCircle className="text-white/10 rotate-12  absolute z-0 -top-24 -left-24" />
                                <div className="relative z-10">
                                    <div className='space-y-[20px]'>
                                        <div className='flex items-center justify-center space-x-[10px] bg-white rounded-[10px] text-black p-[10px]'>
                                            <AiOutlineFieldTime />
                                            <div>TIME - LOCATION</div>
                                            <AiOutlineEnvironment />
                                        </div>
                                        <div className='text-[18px] space-y-[10px]'>
                                            <div className=''>
                                                <div className='flex items-center space-x-[5px]'>
                                                    <AiOutlineCaretRight />
                                                    <label>Show date :</label>
                                                </div>
                                                <div className='text-center border-b '>
                                                    <label>{time_locaiton && time_locaiton.show_date}</label>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div className='flex items-center space-x-[5px]'>
                                                    <AiOutlineCaretRight />
                                                    <label>Show time :</label>
                                                </div>
                                                <div className='text-center border-b '>
                                                    <label>{time_locaiton && time_locaiton.show_time}</label>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div className='flex items-center space-x-[5px]'>
                                                    <AiOutlineCaretRight />
                                                    <label>Leave time :</label>
                                                </div>
                                                <div className='text-center border-b '>
                                                    <label>{time_locaiton && time_locaiton.leave_time}</label>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div className='flex items-center space-x-[5px]'>
                                                    <AiOutlineCaretRight />
                                                    <label>Make up time :</label>
                                                </div>
                                                <div className='text-center border-b '>
                                                    <label>{time_locaiton && time_locaiton.make_up_time}</label>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div className='flex items-center space-x-[5px]'>
                                                    <AiOutlineCaretRight />
                                                    <label>Show location :</label>
                                                </div>
                                                <div className='text-center border-b '>
                                                    <label>{time_locaiton && time_locaiton.show_location}</label>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div className='flex items-center space-x-[5px]'>
                                                    <AiOutlineCaretRight />
                                                    <label>Agency's contact :</label>
                                                </div>
                                                <div className='text-center border-b '>
                                                    <label>{time_locaiton && time_locaiton.agency_name} - {time_locaiton && time_locaiton.contact}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div onClick={() => this.onClickModal('time_locaiton', false)}
                                            className="px-5 py-2.5 relative rounded-[10px] group overflow-hidden  bg-white text-black 
                            hover:scale-105 transition-all duration-500 ease-out cursor-pointer">
                                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-500 -translate-x-full
                                bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:translate-x-0 ease"></span>
                                            <div className="relative text-center group-hover:text-white">
                                                BACK
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {this.state.modal_makeup_hair == true &&
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="bg-slate-900/20 p-[20px] fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer font-serif">
                            <motion.div initial={{ scale: 0, rotate: "12.5deg" }} animate={{ scale: 1, rotate: "0deg" }} exit={{ scale: 0, rotate: "0deg" }}
                                className=" bg-gradient-to-r from-slate-900 to-slate-950 text-white p-6 rounded-lg w-full max-w-md shadow-xl cursor-default relative overflow-hidden">
                                <FiAlertCircle className="text-white/10 rotate-12  absolute z-0 -top-24 -left-24" />
                                <div className="relative z-10">
                                    <div className='space-y-[20px]'>
                                        <div className='flex items-center justify-center space-x-[10px] bg-white rounded-[10px] text-black p-[10px]'>
                                            <AiTwotoneEdit />
                                            <div>MAKE UP - HAIR</div>
                                            <AiOutlineGithub />
                                        </div>
                                        <div className='text-[18px] space-y-[10px]'>
                                            <div className=''>
                                                <div className='flex items-center space-x-[5px]'>
                                                    <AiOutlineCaretRight />
                                                    <label>Make up by :</label>
                                                </div>
                                                <div className='text-center border-b '>
                                                    <label>{makeup_hair && makeup_hair.make_up}</label>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div className='flex items-center space-x-[5px]'>
                                                    <AiOutlineCaretRight />
                                                    <label>Make hair by :</label>
                                                </div>
                                                <div className='text-center border-b '>
                                                    <label>{makeup_hair && makeup_hair.make_hair}</label>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div className='flex items-center space-x-[5px]'>
                                                    <AiOutlineCaretRight />
                                                    <label>Look :</label>
                                                </div>
                                                <div className='flex items-center justify-center space-x-[10px] text-[22px]'>
                                                    <button ><AiOutlineDoubleLeft /></button>
                                                    <div className='h-[200px] w-[200px]'>
                                                        <Carousel autoplay arrows>
                                                            {makeup_hair && makeup_hair.img && makeup_hair.img.map((item, index) => {
                                                                return (
                                                                    <>
                                                                        <div key={item.id} className='flex items-center justify-center'>
                                                                            <Image className='object-cover' width={200} height={200} src={require(`../../../../assets/images/${item.value}`).default} />
                                                                        </div>
                                                                    </>
                                                                )
                                                            })}
                                                        </Carousel>
                                                    </div>
                                                    <button ><AiOutlineDoubleRight /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div onClick={() => this.onClickModal('makeup_hair', false)}
                                            className="px-5 py-2.5 relative rounded-[10px] group overflow-hidden  bg-white text-black 
                            hover:scale-105 transition-all duration-500 ease-out cursor-pointer">
                                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-500 -translate-x-full
                                bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:translate-x-0 ease"></span>
                                            <div className="relative text-center group-hover:text-white">
                                                BACK
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {this.state.modal_makeup_stylist == true &&
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="bg-slate-900/20 p-[20px] fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer font-serif">
                            <motion.div initial={{ scale: 0, rotate: "12.5deg" }} animate={{ scale: 1, rotate: "0deg" }} exit={{ scale: 0, rotate: "0deg" }}
                                className=" bg-gradient-to-r from-slate-900 to-slate-950 text-white p-6 rounded-lg w-full max-w-md shadow-xl cursor-default relative overflow-hidden">
                                <FiAlertCircle className="text-white/10 rotate-12  absolute z-0 -top-24 -left-24" />
                                <div className="relative z-10">
                                    <div className='space-y-[20px]'>
                                        <div className='flex items-center justify-center space-x-[10px] bg-white rounded-[10px] text-black p-[10px]'>
                                            <AiTwotoneSkin />
                                            <div>STYLIST</div>
                                        </div>
                                        <div className='text-[18px] space-y-[20px]'>
                                            <div className=''>
                                                <div className='flex items-center space-x-[5px]'>
                                                    <AiOutlineCaretRight />
                                                    <label>Stylist :</label>
                                                </div>
                                                <div className='text-center border-b '>
                                                    <label>{stylist && stylist.name}</label>
                                                </div>
                                            </div>
                                            <div className='space-y-[5px]'>
                                                <div className='flex items-center space-x-[5px]'>
                                                    <AiOutlineCaretRight />
                                                    <label>Outfit :</label>
                                                </div>
                                                <div className='flex items-center justify-center space-x-[10px] text-[22px]'>
                                                    <button ><AiOutlineDoubleLeft /></button>
                                                    <div className='h-[200px] w-[200px]'>
                                                        <Carousel autoplay arrows>
                                                            {stylist && stylist.img && stylist.img.map((item, index) => {
                                                                return (
                                                                    <>
                                                                        <div key={item.id} className='flex items-center justify-center '>
                                                                            <Image className='object-cover' width={200} height={200} src={require(`../../../../assets/images/${item.value}`).default} />
                                                                        </div>
                                                                    </>
                                                                )
                                                            })}
                                                        </Carousel>
                                                    </div>
                                                    <button ><AiOutlineDoubleRight /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div onClick={() => this.onClickModal('stylist', false)}
                                            className="px-5 py-2.5 relative rounded-[10px] group overflow-hidden  bg-white text-black 
                            hover:scale-105 transition-all duration-500 ease-out cursor-pointer">
                                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-500 -translate-x-full
                                bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:translate-x-0 ease"></span>
                                            <div className="relative text-center group-hover:text-white">
                                                BACK
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {this.state.modal_charge_of == true &&
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="bg-slate-900/20 p-[20px] fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer font-serif">
                            <motion.div initial={{ scale: 0, rotate: "12.5deg" }} animate={{ scale: 1, rotate: "0deg" }} exit={{ scale: 0, rotate: "0deg" }}
                                className=" bg-gradient-to-r from-slate-900 to-slate-950 text-white p-6 rounded-lg w-full max-w-md shadow-xl cursor-default relative overflow-hidden">
                                <FiAlertCircle className="text-white/10 rotate-12  absolute z-0 -top-24 -left-24" />
                                <div className="relative z-10">
                                    <div className='space-y-[20px]'>
                                        <div className='flex items-center justify-center space-x-[10px] bg-white rounded-[10px] text-black p-[10px]'>
                                            <AiTwotoneSkin />
                                            <div>PERSON IN CHARGE</div>
                                        </div>
                                        <div className='text-[18px] space-y-[10px]'>
                                            <div className=''>
                                                <div className='flex items-center space-x-[5px]'>
                                                    <AiOutlineCaretRight />
                                                    <label>Name :</label>
                                                </div>
                                                <div className='text-center border-b '>
                                                    <label>{charge_of && charge_of.name}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div onClick={() => this.onClickModal('charge_of', false)}
                                            className="px-5 py-2.5 relative rounded-[10px] group overflow-hidden  bg-white text-black 
                            hover:scale-105 transition-all duration-500 ease-out cursor-pointer">
                                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-500 -translate-x-full
                                bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:translate-x-0 ease"></span>
                                            <div className="relative text-center group-hover:text-white">
                                                BACK
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    }
                </AnimatePresence>
            </>
        )
    }
}

export default withRouter(schedule_detail);