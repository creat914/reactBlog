import React, { Component  } from 'react';
import Header from "@pc/components/Header";
const simpleHoc = (WrappedComponent,local) => {
    return class extends Component {
        render() {
            return (
                <div className='root-wrap'>
                    <Header local={local}/>
                    <WrappedComponent {...this.props}/>
                </div>
            )
        }
    }
}
export default simpleHoc;
