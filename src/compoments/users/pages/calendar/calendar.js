import React from 'react';
import { withRouter } from 'react-router-dom';
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { Badge, Calendar, ConfigProvider } from 'antd';
import { ScrollTop } from 'primereact/scrolltop';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { values } from 'lodash';

class calendar extends React.Component {
    constructor(props) {
        super(props);
        this.heightMenu = React.createRef();
        this.heightMain = React.createRef();
        this.state = {
            max_hight_schedule: 0,
            dataSchedules: [
                {
                    id: '1',
                    user: { id: '1', fullname: 'Jacky lee' },
                    time_locaiton: { id: '1', show_date: '2023-11-08' }
                },
                {
                    id: '2',
                    user: { id: '1', fullname: 'Jacky lee' },
                    time_locaiton: { id: '2', show_date: '2023-11-10' }
                },
                {
                    id: '3',
                    user: { id: '1', fullname: 'Ame lee' },
                    time_locaiton: { id: '2', show_date: '2023-11-08' }
                },
            ],
            dataFilter: {
                user_id: '',
                show_date: '',
                type_date: '',
            }
        }

    }
    async componentDidMount() {
        const heightMenu = this.heightMenu.current.getBoundingClientRect().height;
        const heightMain = this.heightMain.current.getBoundingClientRect().height;
        this.setState({ max_hight_schedule: heightMain - heightMenu })
    }

    calender_render = (current, info) => {
        if (info.type === 'date') return this.dateCellRender(current);
        if (info.type === 'month') return this.monthCellRender(current);
        return info.originNode;
    }
    dateCellRender = (value) => {
        const listData = this.get_date_data(value);
        return (
            <div className="space-y-[5px]">
                {listData && listData.map((item, index) => (
                    <li className='truncate' key={item.id}>
                        <Tag className="bg-green-500" severity="success" value={item.fullname}></Tag>
                    </li>
                ))}
            </div>
        );
    };
    monthCellRender = (value) => {
        const listData = this.get_month_data(value);
        return (
            <div className="space-y-[5px]">
                {listData && listData.map((item, index) => (
                    <li className='truncate' key={item.id}>
                        <Tag className="mr-2" severity="success" value={item.fullname}></Tag>
                    </li>
                ))}
            </div>
        );
    };
    get_date_data = (value) => {
        let listData = [];
        let dataSchedules = this.state.dataSchedules;
        for (const i of dataSchedules) {
            let day = (new Date(i.time_locaiton.show_date)).getDate();
            let month = (new Date(i.time_locaiton.show_date)).getMonth();
            let year = (new Date(i.time_locaiton.show_date)).getFullYear();
            if (day == value.date() && month == value.month() && year == value.year()) {
                listData.push(i.user);
            }
        }
        return listData;
    };
    get_month_data = (value) => {
        let listData = [];
        let dataSchedules = this.state.dataSchedules;
        for (const i of dataSchedules) {
            let month = (new Date(i.time_locaiton.show_date)).getMonth();
            let year = (new Date(i.time_locaiton.show_date)).getFullYear();
            if (month == value.month() && year == value.year()) {
                listData.push(i.user);
            }
        }
        return listData;
    };
    onSelectSchedule = (value) => {
        console.log(value);
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
                            <div className=' rounded-[5px] p-[10px] '>
                                <ConfigProvider
                                    theme={{
                                        token: {
                                        },
                                    }}
                                >
                                    <Calendar onSelect={(value) => this.onSelectSchedule(value)}
                                        cellRender={(current, info) => this.calender_render(current, info)}
                                        className='p-[10px] sm:w-[500px]' />
                                </ConfigProvider>
                            </div>
                            <ScrollTop target="parent" threshold={100} className="custom-scrolltop" icon="pi pi-arrow-up" />
                        </ScrollPanel>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(calendar);