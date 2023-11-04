import React from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Avatar } from 'antd';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowPass: false,
        }
    }
    async componentDidMount() {
    }
    onClickShowPassword = () => {
        this.setState({ isShowPass: !this.state.isShowPass })
    }
    render() {
        return (
            <div className='h-4/6 flex items-center justify-center'>
                <div className='space-y-[15px] p-[5px]'>
                    <div className='flex items-center justify-center'>
                        <div className=" p-[16px] rounded-full font-[400] font-serif text-[16px]
                    group relative text-white transition-colors duration-[400ms] italic ">
                            <div className='text-center space-y-[10px]'>
                                <Avatar src={require(`../../../assets/images/1.png`).default} size={130}
                                    className='border-[2px] border-white' />
                                <div><span className='text-yellow-300'>JACKIE NJINE</span></div>
                            </div>
                            <span className="absolute left-0 top-0 h-[2px] w-0 bg-[#4acec7fa] transition-all duration-150 group-hover:w-full " />
                            <span className="absolute right-0 top-0 h-0 w-[2px] bg-[#4acec7fa] transition-all delay-100 duration-150 group-hover:h-full" />
                            <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-[#4acec7fa] transition-all delay-200 duration-150 group-hover:w-full" />
                            <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-[#4acec7fa] transition-all delay-300 duration-150 group-hover:h-full" />
                        </div>
                    </div>
                    <div className=" px-[16px] py-[10px] font-[400] font-serif text-[18px]
                    group relative text-white transition-colors duration-[400ms] italic ">
                        <span>ENTER YOUR IDENTITY CODE</span>
                        <span className="absolute left-0 top-0 h-[2px] w-0 bg-[#4acec7fa] transition-all duration-150 group-hover:w-full" />
                        <span className="absolute right-0 top-0 h-0 w-[2px] bg-[#4acec7fa] transition-all delay-100 duration-150 group-hover:h-full" />
                        <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-[#4acec7fa] transition-all delay-200 duration-150 group-hover:w-full" />
                        <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-[#4acec7fa] transition-all delay-300 duration-150 group-hover:h-full" />
                    </div>
                    <div className='text-yellow-400 text-[18px]'>
                        <div className='relative hover:scale-105 duration-500 ease-in-out '>
                            <input type={this.state.isShowPass == false ? "password" : "text"} className="border-b-[2px] p-[5px] w-full
                        bg-transparent  text-center focus:border-b-[2px] focus:ring-0 focus:outline-none focus:border-[#4acec7fa]
                        hover:border-[#4acec7fa]" />
                            {this.state.isShowPass == false ?
                                <span onClick={() => this.onClickShowPassword()}
                                    className='absolute right-0 top-[10px] text-white cursor-pointer'><AiFillEye /></span>
                                :
                                <span onClick={() => this.onClickShowPassword()}
                                    className='absolute right-0 top-[10px] text-white cursor-pointer'><AiFillEyeInvisible /></span>
                            }

                        </div>

                    </div>
                    <div className='flex items-center justify-center'>
                        <button class="relative inline-flex items-center justify-start px-[30px] py-[10px] overflow-hidden font-medium transition-all 
                        bg-white rounded hover:bg-white hover:scale-105  group ">
                            <span class="w-48 h-48 rounded rotate-[-40deg] bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] 
                            absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                            <span class="relative w-full text-left text-black font-[600] font-serif transition-colors duration-300 ease-in-out group-hover:text-white">LOGIN</span>
                        </button>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(login);