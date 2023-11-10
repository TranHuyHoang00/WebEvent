import React from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Avatar } from 'antd';
import { AiFillEye, AiFillEyeInvisible, } from "react-icons/ai";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import { set_local_account } from '../../../../auths/local_storage';
class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data_users: [
                { id: 1, fullname: 'Star Gazer', username: 'StarGazer', avatar: '1.jpg', role: { id: '3', name: 'artist' } },
                { id: 2, fullname: 'Luna Dreamer', username: 'LunaDreamer', avatar: '2.jpg', role: { id: '3', name: 'artist' } },
                { id: 3, fullname: 'Mountain Hiker', username: 'MountainHiker', avatar: '3.jpg', role: { id: '3', name: 'artist' } },
                { id: 4, fullname: 'Manager', username: 'OceanSoul', avatar: '4.jpg', role: { id: '2', name: 'manager' }, },
                { id: 5, fullname: 'Manager', username: 'SkyWatcher', avatar: '5.jpg', role: { id: '2', name: 'manager' }, },
            ],
            data_artists: [],
            data_manages: [],
            data_user: {},
            modal_login: false,
            show_password: false,
            username: '',
            password: '',
        }
    }
    async componentDidMount() {
        this.filter_users(this.state.data_users);
    }
    filter_users = (data) => {
        const data_artists = data.filter(item => item.role.id == 3);
        const data_manages = data.filter(item => item.role.id == 2);
        this.setState({ data_manages: data_manages, data_artists: data_artists });
    }
    onClickOpenModal = (item) => {
        this.setState({ modal_login: true, data_user: item, username: item.username })
    }
    onClickCloseModal = () => {
        this.setState({ modal_login: false })
    }
    onClickShowPassword = () => {
        this.setState({ show_password: !this.state.show_password })
    }
    handleOnChangePassWord = (event) => {
        this.setState({ password: (event.target.value).replace(/\s/g, '') })
    }
    isCheckEmpty = (value) => {
        return value.trim().length
    }
    Validation = (password) => {
        if (this.isCheckEmpty(password) == 0) {
            return { mess: "Password cannot be blank", code: 1 };
        }
        return { code: 0 };
    }
    handleLogin = () => {
        let result = this.Validation(this.state.password);
        if (result.code == 0) {
            set_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_USER,
                {
                    access: '', refresh: '', user: { id: 1, fullname: 'Star Gazer', username: 'StarGazer', avatar: '1.jpg', role: { id: '2', name: 'manager' }, created_at: '2023-11-08', updated_at: '2023-11-09' },
                });
            this.props.handleLogin_Index();
            this.props.history.push('/home');
        } else {
            toast.error(result.mess);
        }
    }
    onClickPage = () => {
        this.props.history.push('/home');
    }
    render() {
        const responsive = {
            test1: { breakpoint: { max: 3000, min: 300 }, items: 2, slidesToSlide: 2 }
        };
        const responsive1 = {
            test1: { breakpoint: { max: 3000, min: 300 }, items: 1, slidesToSlide: 1 }
        };
        let data_artists = this.state.data_artists;
        let data_manages = this.state.data_manages;
        let data_user = this.state.data_user;
        return (
            <>
                <div className='h-screen w-screen flex flex-col bg-black font-serif text-white'>
                    <header className='flex items-center justify-center p-[5px]'>
                        <img onClick={() => this.onClickPage()}
                            className='h-[100px] w-auto cursor-pointer hover:scale-105 duration-500 ease-in-out'
                            src='https://rebelsaintrecords.com/wp-content/themes/yootheme/cache/c3/1_5-removebg-preview-c32c9ec9.webp' />
                    </header>
                    <div className='flex-grow flex items-center justify-center text-white'>
                        <div className='space-y-[20px]'>
                            <div className='bg-[#d40404] text-[12px] sm:text-[16px] px-[5px] sm:px-[20px] py-[5px]
                            hover:scale-105 duration-500 ease-in-out'>
                                <label>WELCOME TO THE HOUSE OF REBELLIOUS DREAMERS</label>
                            </div>
                            <div className=' text-center hover:scale-105 duration-500 ease-in-out'>
                                <label className='text-yellow-400 text-[18px] font-[600] 
                                '>WHO ARE YOU ?</label>
                            </div>
                            <div className='flex items-center justify-center italic'>
                                <div className='w-[300px] '>
                                    <Carousel arrows={false} renderButtonGroupOutside responsive={responsive}>
                                        {data_artists && data_artists.map((item, index) => {
                                            return (
                                                <div key={item.id} onClick={() => this.onClickOpenModal(item)}
                                                    className='text-center space-y-[10px] p-[5px] cursor-pointer 
                                            hover:scale-105 duration-300 ease-in-out hover:text-yellow-500'>
                                                    <Avatar className='border-[2px] border-white ' size={130} src={require(`../../../../assets/images/${item.avatar}`).default} />
                                                    <div className='truncate'><label>{item.fullname}</label></div>
                                                </div>
                                            );
                                        })}
                                    </Carousel>
                                </div>
                            </div>
                            <div className='flex items-center justify-center italic'>
                                <div className='w-[300px] '>
                                    <Carousel responsive={responsive1} swipeable={true} draggable={true}
                                        showDots={false} arrows={false}
                                        infinite={true} partialVisible={false} dotListClass="custom-dot-list-style">
                                        {data_manages && data_manages.map((item, index) => {
                                            return (
                                                <div key={item.id} onClick={() => this.onClickOpenModal(item)}
                                                    className='text-center space-y-[10px] p-[5px] cursor-pointer 
                                            hover:scale-105 duration-300 ease-in-out hover:text-yellow-500'>
                                                    <Avatar className='border-[2px] border-white ' size={130} src={require(`../../../../assets/images/${item.avatar}`).default} />
                                                    <div className='truncate'><label>{item.fullname}</label></div>
                                                </div>
                                            );
                                        })}
                                    </Carousel>
                                </div>
                            </div>
                        </div>

                    </div>

                    <footer className='flex items-center justify-center'>
                        <div className='p-[5px] text-[14px] text-center'>
                            <h2 onClick={() => this.onClickPage()}
                                className="cursor-pointer  hover:scale-105 duration-300 ease-in-out">
                                www.rebelsaintrecords.com
                            </h2>
                        </div>
                    </footer>
                </div>
                <AnimatePresence>
                    {this.state.modal_login == true &&
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="bg-slate-900/20 p-[20px] fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer font-serif">
                            <motion.div initial={{ scale: 0, rotate: "12.5deg" }} animate={{ scale: 1, rotate: "0deg" }} exit={{ scale: 0, rotate: "0deg" }}
                                className=" bg-gradient-to-r from-slate-900 to-slate-950 text-white p-[20px] rounded-lg w-full max-w-sm shadow-xl cursor-default relative overflow-hidden">
                                <div className="relative z-10">
                                    <div className='space-y-[20px]'>
                                        <div className='space-y-[15px] p-[5px]'>
                                            <div className='flex items-center justify-center'>
                                                <div className=" p-[16px] rounded-full font-[400]  text-[16px]
                    group relative text-white transition-colors duration-[400ms] italic ">
                                                    <div className='text-center space-y-[5px] hover:scale-105 duration-500 ease-in-out'>
                                                        <Avatar src={require(`../../../../assets/images/${data_user && data_user.avatar}`).default} size={130}
                                                            className='border-[2px] border-white ' />
                                                        <div><span className='text-yellow-400 text-[20px]'>{data_user && data_user.fullname}</span></div>
                                                    </div>
                                                    <span className="absolute left-0 top-0 h-[2px] w-0 bg-[#4acec7fa] transition-all duration-150 group-hover:w-full " />
                                                    <span className="absolute right-0 top-0 h-0 w-[2px] bg-[#4acec7fa] transition-all delay-100 duration-150 group-hover:h-full" />
                                                    <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-[#4acec7fa] transition-all delay-200 duration-150 group-hover:w-full" />
                                                    <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-[#4acec7fa] transition-all delay-300 duration-150 group-hover:h-full" />
                                                </div>
                                            </div>
                                            <div className=" px-[16px] py-[10px] font-[400]  text-[16px]
                    group relative text-white transition-colors italic text-center  hover:scale-105 duration-500 ease-in-out">
                                                <span>ENTER YOUR IDENTITY CODE</span>
                                                <span className="absolute left-0 top-0 h-[2px] w-0 bg-[#4acec7fa] transition-all duration-150 group-hover:w-full" />
                                                <span className="absolute right-0 top-0 h-0 w-[2px] bg-[#4acec7fa] transition-all delay-100 duration-150 group-hover:h-full" />
                                                <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-[#4acec7fa] transition-all delay-200 duration-150 group-hover:w-full" />
                                                <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-[#4acec7fa] transition-all delay-300 duration-150 group-hover:h-full" />
                                            </div>
                                            <div className='text-yellow-400 text-[18px]'>
                                                <div className='relative hover:scale-105 duration-500 ease-in-out '>
                                                    <input onChange={(event) => this.handleOnChangePassWord(event)}
                                                        type={this.state.show_password == false ? "password" : "text"} className="border-b-[2px] p-[5px] w-full
                        bg-transparent  text-center focus:border-b-[2px] focus:ring-0 focus:outline-none focus:border-[#4acec7fa] hover:border-[#4acec7fa]" />
                                                    {this.state.show_password == false ?
                                                        <span onClick={() => this.onClickShowPassword()}
                                                            className='absolute right-0 top-[10px] text-white cursor-pointer'><AiFillEye /></span>
                                                        :
                                                        <span onClick={() => this.onClickShowPassword()}
                                                            className='absolute right-0 top-[10px] text-white cursor-pointer'><AiFillEyeInvisible /></span>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-center'>
                                            <button onClick={() => this.handleLogin()}
                                                class="relative inline-flex items-center justify-start px-[30px] py-[10px] overflow-hidden font-medium transition-all 
                        bg-white rounded hover:bg-white hover:scale-105  group ">
                                                <span class="w-48 h-48 rounded rotate-[-40deg] bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] 
                            absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                                                <span class="relative w-full text-left text-black font-[600] font-serif transition-colors duration-300 ease-in-out group-hover:text-white">LOGIN</span>
                                            </button>
                                        </div>
                                        <div onClick={() => this.onClickCloseModal()}
                                            className="px-5 py-2.5 relative rounded-[10px] group overflow-hidden  bg-white text-black 
                            hover:scale-105 transition-all duration-500 ease-out cursor-pointer">
                                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-500 -translate-x-full
                                bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:translate-x-0 ease"></span>
                                            <div className="relative text-center group-hover:text-white font-[600]">
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

export default withRouter(login);