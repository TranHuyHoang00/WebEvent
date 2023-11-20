import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { get_local_account } from '../../../../auths/local_storage';
import { Image, Input } from 'antd';
import { AiOutlineCaretRight, AiFillEye, AiFillEyeInvisible, } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_user: {},
            data_edit: {
                id: '',
                avatar: '',
            },
            image_show: false,
            modal_password: false,
            show_password: false,
        }
    }
    async componentDidMount() {
        let data_user = get_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_USER);
        if (data_user) {
            this.setState({ data_user: data_user.data.user })
        }
    }
    handleImageChange = (image) => {
        const file = image.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    image_show: true,
                    data_edit: {
                        ...this.state.data_edit,
                        avatar: reader.result
                    }
                })
            };
            reader.readAsDataURL(file);
        }
    }
    onClickModal = () => {
        this.setState({ modal_password: !this.state.modal_password })
    }
    onClickShowPassword = () => {
        this.setState({ show_password: !this.state.show_password })
    }
    handleEdit = () => {

    }
    render() {
        let data_user = this.state.data_user;
        let image_show = this.state.image_show;
        return (
            <>
                <div className='bg-black flex-grow flex items-center justify-center font-serif'>
                    <div className='border px-[20px] py-[10px] rounded-[10px] text-white '>
                        <div className=" p-[10px] text-yellow-400 text-[18px] italic text-center  ">
                            {image_show == false && data_user && data_user.avatar &&
                                <Image width={140} height={140} src={require(`../../../../assets/images/${data_user.avatar}`).default}
                                    className='border-[2px] border-white object-cover rounded-full' />
                            }
                            {image_show == true &&
                                <Image width={140} height={140} src={this.state.data_edit.avatar}
                                    className='border-[2px] border-white object-cover rounded-full' />
                            }
                            <div className='space-y-[10px]  '>
                                <input id="load_file" type="file" accept="image/*" hidden
                                    onChange={(image) => this.handleImageChange(image)}
                                />
                                <div className='space-x-[5px]'>
                                    <label for="load_file"
                                        className='text-white border rounded-[5px] px-[10px] py-[3px] cursor-pointer text-[14px]
                                    hover:border-[#4acec7fa] hover:scale-105 transition-all duration-500 ease-out'>
                                        Change
                                    </label>
                                    {image_show == true &&
                                        <label onClick={() => { this.setState({ image_show: false }) }}
                                            className='text-white border rounded-[5px] px-[10px] py-[3px] cursor-pointer text-[14px]
                                        hover:border-[#4acec7fa] hover:scale-105 transition-all duration-500 ease-out'>
                                            Return
                                        </label>
                                    }
                                </div>
                                <input value={data_user.fullname}
                                    className="border-b-[2px] p-[5px] w-full bg-transparent text-center focus:border-b-[2px] 
                        focus:ring-0 focus:outline-none focus:border-[#4acec7fa] hover:border-[#4acec7fa] transition-all duration-500 ease-out" />
                            </div>
                        </div>
                        <div className='space-y-[10px] text-[16px]'>
                            <div className='flex items-center space-x-[10px]'>
                                <AiOutlineCaretRight />
                                <label>User name :</label>
                                <label className='italic text-yellow-400'> {data_user && data_user.username}</label>
                            </div>
                            <div className='flex items-center space-x-[10px]'>
                                <AiOutlineCaretRight />
                                <label>Position :</label>
                                <label className='italic text-yellow-400'> {data_user && data_user.role && data_user.role.name}</label>
                            </div>
                            <div className='flex items-center space-x-[10px]'>
                                <AiOutlineCaretRight />
                                <label>Created at :</label>
                                <label className='italic text-yellow-400'> {data_user && data_user.created_at}</label>
                            </div>
                            <div className='flex items-center space-x-[10px]'>
                                <AiOutlineCaretRight />
                                <label>Updated at :</label>
                                <label className='italic text-yellow-400'> {data_user && data_user.updated_at}</label>
                            </div>
                            <div onClick={() => this.handleEdit()}
                                className="w-full px-[10px] py-[5px] relative rounded-[10px] group overflow-hidden bg-gray-900 text-white 
                            hover:scale-105 transition-all duration-500 ease-out cursor-pointer border-white border-[1px]">
                                <span className="absolute inset-0 flex items-center justify-center text-white duration-500 -translate-x-full
                                bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:translate-x-0 ease"></span>
                                <div className="relative group-hover:text-white">
                                    <div className='flex items-center justify-center space-x-[10px]'>
                                        <div >SAVE</div>
                                    </div>
                                </div>
                            </div>
                            <div onClick={() => this.onClickModal()}
                                className="w-full px-[10px] py-[5px] relative rounded-[10px] group overflow-hidden bg-gray-900 text-white 
                            hover:scale-105 transition-all duration-500 ease-out cursor-pointer border-white border-[1px]">
                                <span className="absolute inset-0 flex items-center justify-center text-white duration-500 -translate-x-full
                                bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:translate-x-0 ease"></span>
                                <div className="relative group-hover:text-white">
                                    <div className='flex items-center justify-center space-x-[10px]'>
                                        <div >CHANGE PASSWORD</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                <AnimatePresence>
                    {this.state.modal_password == true &&
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="bg-slate-900/20 p-[20px] fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer font-serif">
                            <motion.div initial={{ scale: 0, rotate: "12.5deg" }} animate={{ scale: 1, rotate: "0deg" }} exit={{ scale: 0, rotate: "0deg" }}
                                className=" bg-gradient-to-r from-slate-900 to-slate-950 text-white p-6 rounded-lg w-full max-w-md shadow-xl cursor-default relative overflow-hidden">
                                <div className="relative z-10">
                                    <div className='space-y-[20px]'>
                                        <div className='flex items-center justify-center space-x-[10px] bg-white rounded-[10px] text-black p-[10px]'>
                                            <div>CHANGE PASSWORD</div>
                                        </div>
                                        <div className='text-[18px] space-y-[20px]'>
                                            <div className='space-y-[10px]'>
                                                <div className='flex items-center space-x-[5px]'>
                                                    <AiOutlineCaretRight />
                                                    <label>Password old :</label>
                                                </div>
                                                <div className='text-yellow-400 text-[18px]'>
                                                    <div className='relative hover:scale-105 duration-500 ease-in-out '>
                                                        <input
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
                                            <div className='space-y-[10px]'>
                                                <div className='flex items-center space-x-[5px]'>
                                                    <AiOutlineCaretRight />
                                                    <label>Password new :</label>
                                                </div>
                                                <div className='text-yellow-400 text-[18px]'>
                                                    <div className='relative hover:scale-105 duration-500 ease-in-out '>
                                                        <input
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
                                        </div>
                                        <div onClick={() => this.onClickModal()}
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
        );
    }

}
export default withRouter(profile);
