import React from 'react';
import { withRouter } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
class test extends React.Component {
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
            desktop0: { breakpoint: { max: 3000, min: 1280 }, items: 2, slidesToSlide: 2 },
            desktop1: { breakpoint: { max: 1280, min: 1024 }, items: 2, slidesToSlide: 2 },
            tablet: { breakpoint: { max: 1024, min: 640 }, items: 2, slidesToSlide: 2 },
            mobile: { breakpoint: { max: 640, min: 300 }, items: 2, slidesToSlide: 2 }
        };
        return (
            <Carousel responsive={responsive}>
                <div>Item 1</div>
                <div>Item 2</div>
                <div>Item 3</div>
                <div>Item 4</div>
            </Carousel>
        )
    }
}

export default withRouter(test);