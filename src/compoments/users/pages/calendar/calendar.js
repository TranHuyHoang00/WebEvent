import React from 'react';
import { withRouter } from 'react-router-dom';
import { Calendar, ConfigProvider, Select } from 'antd';
import { ScrollTop } from 'primereact/scrolltop';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Tag } from 'primereact/tag';
import { get_local_account } from '../../../../auths/local_storage';
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
                    time_locaiton: { id: '1', show_date: '2023-11-10' }
                },
                {
                    id: '2',
                    user: { id: '1', fullname: 'Jacky lee' },
                    time_locaiton: { id: '2', show_date: '2023-11-10' }
                },
                {
                    id: '3',
                    user: { id: '1', fullname: 'Ame lee' },
                    time_locaiton: { id: '2', show_date: '2023-11-20' }
                },
                {
                    id: '4',
                    user: { id: '1', fullname: 'Ame lee' },
                    time_locaiton: { id: '2', show_date: '2023-11-20' }
                },
                {
                    id: '5',
                    user: { id: '1', fullname: 'Ame lee' },
                    time_locaiton: { id: '2', show_date: '2023-11-05' }
                },
                {
                    id: '6',
                    user: { id: '1', fullname: 'Ame lee' },
                    time_locaiton: { id: '2', show_date: '2023-10-05' }
                },
            ],
            dataFilter: {
                user_id: '',
                show_date: '',
                type_date: '',
            },
            user_role: '',
            data_user: [
                {
                    value: 0,
                    label: 'All artists',
                },
                {
                    value: 1,
                    label: 'Jackie Nijne',
                },
                {
                    value: 2,
                    label: 'PinkBunny',
                },
            ]
        }

    }
    async componentDidMount() {
        const heightMenu = this.heightMenu.current.getBoundingClientRect().height;
        const heightMain = this.heightMain.current.getBoundingClientRect().height;
        let data_user = get_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_USER);
        if (data_user && data_user.data && data_user.data.user) {
            this.setState({ user_role: data_user.data.user.role.id })
        }
        this.setState({ max_hight_schedule: heightMain - heightMenu });
    }
    calender_render = (current, info) => {
        if (info.type === 'date') return this.dateCellRender(current);
        if (info.type === 'month') return this.monthCellRender(current);
        return info.originNode;
    }
    format_date = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
    format_month = (dateToCompare) => {
        return dateToCompare.getFullYear() * 12 + dateToCompare.getMonth();
    }
    dateCellRender = (value) => {
        const listData = this.get_date_data(value);
        let DateNow = new Date();
        return (
            <div className="space-y-[5px]">
                {listData && listData.map((item, index) => (
                    <li className='truncate text-white' key={item.id}>
                        {

                            (this.format_date(new Date(item.time_locaiton.show_date))) > this.format_date(DateNow) ?
                                (
                                    <Tag className="bg-yellow-500" severity="success" value={item.user.fullname}></Tag>
                                ) :
                                (this.format_date(new Date(item.time_locaiton.show_date))) < this.format_date(DateNow) ?
                                    (
                                        <Tag className="bg-red-500" severity="danger" value={item.user.fullname}></Tag>
                                    ) :
                                    (
                                        <Tag className="bg-green-500" severity="success" value={item.user.fullname}></Tag>
                                    )
                        }

                    </li>
                ))}
            </div>
        );
    };
    monthCellRender = (value) => {
        const listData = this.get_month_data(value);
        let DateNow = new Date();
        return (
            <div className="space-y-[5px]">
                {listData && listData.map((item, index) => (
                    <li className='truncate text-white' key={item.id}>
                        {
                            (this.format_month(new Date(item.time_locaiton.show_date))) > this.format_month(DateNow) ?
                                (
                                    <Tag className="bg-yellow-500" severity="success" value={item.user.fullname}></Tag>
                                ) :
                                (this.format_month(new Date(item.time_locaiton.show_date))) < this.format_month(DateNow) ?
                                    (
                                        <Tag className="bg-red-500" severity="danger" value={item.user.fullname}></Tag>
                                    ) :
                                    (
                                        <Tag className="bg-green-500" severity="success" value={item.user.fullname}></Tag>
                                    )
                        }
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
                listData.push(i);
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
                listData.push(i);
            }
        }
        return listData;
    };
    onSelectSchedule = (date) => {
        let date_format = date?.format('YYYY-MM-DD');
        this.props.history.push(`/home/schedule/${date_format}`);
    }
    render() {
        let max_hight_schedule = this.state.max_hight_schedule;
        let user_role = this.state.user_role;
        return (
            <div className='bg-black flex-grow flex items-center justify-center font-serif'>
                <div ref={this.heightMain} className='flex flex-col h-full'>
                    <div ref={this.heightMenu} className="px-[15px] py-[10px] ">
                        {user_role == 2 &&
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorBgContainer: '#F0FFFF',
                                    },
                                }}
                            >
                                <Select defaultValue="All artists"
                                    style={{ width: 120 }} placement='bottomRight'
                                    options={this.state.data_user}
                                />
                            </ConfigProvider>
                        }
                    </div>
                    <div className="flex-grow text-white ">
                        <ScrollPanel style={{ width: '100%', height: `${max_hight_schedule}px` }} className="p-[5px]">
                            <div className=' rounded-[5px] p-[10px] '>
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            padding: 40,
                                            marginXS: 12,
                                            borderRadiusLG: 20,
                                            //colorBgContainer: 'rgba(255, 99, 71, 0.8)',
                                            // colorText: 'rgb(255, 0, 0)'
                                        },
                                    }}>
                                    <Calendar onSelect={(date, info) => this.onSelectSchedule(date)}
                                        cellRender={(current, info) => this.calender_render(current, info)}
                                        className='p-[10px] md:w-[700px]' />
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