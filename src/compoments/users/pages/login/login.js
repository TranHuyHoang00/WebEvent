import React from 'react';
import { withRouter } from 'react-router-dom';
import { Avatar } from 'antd';
import { AiFillEye, AiFillEyeInvisible, AiOutlineDoubleLeft, AiOutlineDoubleRight, } from "react-icons/ai";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowPass: false,
            data_artist: [{ id: 1, fullname: 'Jackie Nijne', username: 'jackie', avatar: '1.png' },
            { id: 2, fullname: 'PinkBunny', username: 'bunny', avatar: '2.png' }],
            data_manage: [{ id: 3, fullname: 'Manager', username: 'manager', avatar: '2.png' }],
        }
    }
    async componentDidMount() {
    }
    onClickShowPassword = () => {
        this.setState({ isShowPass: !this.state.isShowPass })
    }
    render() {
        const responsive = {
            test1: { breakpoint: { max: 3000, min: 300 }, items: 2, slidesToSlide: 2 }
        };
        const responsive1 = {
            test1: { breakpoint: { max: 3000, min: 300 }, items: 1, slidesToSlide: 1 }
        };
        let data_artist = this.state.data_artist;
        let data_manage = this.state.data_manage;
        return (
            <div className='h-screen w-screen flex flex-col bg-black font-serif text-white'>
                <header className='flex items-center justify-center p-[5px]'>
                    <img
                        className='h-[100px] w-auto cursor-pointer hover:scale-105 duration-500 ease-in-out'
                        src='https://rebelsaintrecords.com/wp-content/themes/yootheme/cache/c3/1_5-removebg-preview-c32c9ec9.webp' />
                </header>
                <div className='flex-grow flex items-center justify-center text-white'>
                    <div className='space-y-[20px]'>
                        <div className='bg-[#d40404] text-[12px] sm:text-[18px] px-[5px] sm:px-[20px] py-[5px]'>
                            <label>WELCOME TO THE HOUSE OF REBELLIOUS DREAMERS</label>
                        </div>
                        <div className=' text-center'>
                            <label className='text-yellow-400 text-[20px] font-[600]'>WHO ARE YOU ?</label>
                        </div>
                        <div className='flex items-center justify-center'>
                            <div className='w-[300px] '>
                                <Carousel responsive={responsive} swipeable={true} draggable={true} showDots={true}
                                    infinite={true} partialVisible={false} dotListClass="custom-dot-list-style">
                                    {data_artist && data_artist.map((item, index) => {
                                        return (
                                            <div key={item.id} className='text-center space-y-[10px] p-[5px]'>
                                                <Avatar size={120} src={require(`../../../../assets/images/${item.avatar}`).default} />
                                                <div className='truncate'><label>{item.fullname}</label></div>
                                            </div>
                                        );
                                    })}
                                </Carousel>
                            </div>
                        </div>
                        <div className='flex items-center justify-center'>
                            <div className='w-[300px] '>
                                <Carousel responsive={responsive1} swipeable={true} draggable={true} showDots={true}
                                    infinite={true} partialVisible={false} dotListClass="custom-dot-list-style">
                                    {data_manage && data_manage.map((item, index) => {
                                        return (
                                            <div key={item.id} className='text-center space-y-[10px] p-[5px]'>
                                                <Avatar size={120} src={require(`../../../../assets/images/${item.avatar}`).default} />
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
                        <h2
                            className="cursor-pointer  hover:scale-105 duration-300 ease-in-out">
                            www.rebelsaintrecords.com
                        </h2>
                    </div>
                </footer>
            </div>
        )
    }
}

export default withRouter(login);