import React, {Component} from 'react';
import Header from "@pc/components/Header";
const simpleHoc = (WrappedComponent, local) => {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                hideenTop: false
            }
            this.EventScollFunc = this.onScollFunc().bind(this)
        }

        //监听滚动
        onScollFunc() {
            let defaultScrollTop = 0;
            return () => {
                let currenScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                // 证明是向下
                if (currenScrollTop - defaultScrollTop > 100) {
                    defaultScrollTop = currenScrollTop;
                    this.setState({
                        hideenTop: true
                    },()=>{
                        console.log(this.state.hideenTop)
                    })
                } else if (defaultScrollTop - currenScrollTop > 100) {
                    this.setState({
                        hideenTop: false
                    })
                    defaultScrollTop = currenScrollTop;
                }
            }
        }
        componentDidMount() {
            window.addEventListener('scroll', this.EventScollFunc);
        }
        componentWillUnmount() {
            window.removeEventListener("scroll", this.EventScollFunc);
        }

        render() {
            return (
                <div className='view-container'>
                    <Header local={local} hideenTop={this.state.hideenTop}/>
                    <WrappedComponent {...this.props}/>
                </div>
            )
        }
    }
}
export default simpleHoc;
