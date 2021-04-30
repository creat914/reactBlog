import React, { Component  } from 'react';
import Header from "@pc/components/Header";
const simpleHoc = (WrappedComponent,local) => {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                viewContainer: null
            }
        }
        componentDidMount(){
            this.setState({
                viewContainer: document.querySelector('.view-container')
            },()=>{
                console.log(this.state.viewContainer)
            })
              console.log('组件挂着')
        }
        render() {
            return (
                <div className='view-container'>
                    {this.state.viewContainer?<Header local={local} viewContainer={this.state.viewContainer}/>:null}
                    <WrappedComponent {...this.props}/>
                </div>
            )
        }
    }
}
export default simpleHoc;
