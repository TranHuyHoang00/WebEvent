import React from 'react';
import { withRouter } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
class home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilms: [1, 2, 3, 4, 5]
        }
    }
    async componentDidMount() {
    }
    render() {
        let dataFilms = this.state.dataFilms;
        const responsive = {
            desktop0: { breakpoint: { max: 3000, min: 1280 }, items: 4, },
            desktop1: { breakpoint: { max: 1280, min: 1024 }, items: 3, },
            tablet: { breakpoint: { max: 1024, min: 640 }, items: 2, },
            mobile: { breakpoint: { max: 640, min: 300 }, items: 2, }
        };
        return (
            <div className='h-4/6 text-white flex items-center justify-center'>
                {/* <div className='w-[300px]'>
                    <Carousel responsive={responsive}>
                        <div className='h-[50px] w-[50px] bg-red-300'>Item 1</div>
                        <div className='h-[50px] w-[50px] bg-red-300'>Item 2</div>
                        <div className='h-[50px] w-[50px] bg-red-300'>Item 3</div>
                        <div className='h-[50px] w-[50px] bg-red-300'>Item 4</div>
                    </Carousel>
                </div> */}
            </div>
        )
    }
}

export default withRouter(home);