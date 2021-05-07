import React, {
    useState,
    useCallback,
    useEffect,
    useContext
} from 'react';
import {CounterContext, RESET, SET_TOKEN, SET_USERINFO} from '@pc/sotre/index'
import { post } from '@pc/utils/apiConfig'
import Header from "@pc/components/Header";
import { loginContext } from '@pc/sotre/loginContext'
const simpleHoc = (WrappedComponent, local) => (props) => {
    const { dispatch } = useContext(CounterContext);
    const [hideenTop, setHideenTop] = useState(false)
    const ScollFunc = useCallback(() => {
        let defaultScrollTop = 0;
        return () => {
            let currenScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            // 证明是向下
            if (currenScrollTop - defaultScrollTop > 100) {
                defaultScrollTop = currenScrollTop;
                setHideenTop(true)
            } else if (defaultScrollTop - currenScrollTop > 100) {
                setHideenTop(false)
                defaultScrollTop = currenScrollTop;
            }
        }
    }, [])
    // 登录操作
    const login = useCallback(({username,password})=>{
        return new Promise((resovle,reject)=>{
            post('/login',{
                username,
                password
            }).then(res=>{
                dispatch({ type:SET_TOKEN, token:res.token })
                dispatch({type:SET_USERINFO,userInfo:res.userInfo})
                resovle('ok')
            })          
        }).catch(e=>{
            dispatch({
                type:RESET
            })
        })
    },[])
    useEffect(() => {
        const EventScollFunc = ScollFunc()
        window.addEventListener('scroll', EventScollFunc);
        return () => {
            window.removeEventListener("scroll", EventScollFunc);
        }
    }, [])
    return (
          <loginContext.Provider value={{login}}>
            <div className='view-container'>
                 <Header local={local} hideenTop={hideenTop}/>
                 <WrappedComponent {...props}/>
             </div>
          </loginContext.Provider>
    )
}
// return class extends Component {
//     constructor() {
//         super();
//         this.state = {
//             hideenTop: false
//         }
//         this.EventScollFunc = this.onScollFunc().bind(this)
//     }
//     login(){
//         // const { reduxState, dispatch } = 
//         setTimeout(()=>{
//              console.log(this.dispatch)
//         },1500)
//     }
//     //监听滚动
//     onScollFunc() {
//         let defaultScrollTop = 0;
//         return () => {
//             let currenScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//             // 证明是向下
//             if (currenScrollTop - defaultScrollTop > 100) {
//                 defaultScrollTop = currenScrollTop;
//                 this.setState({
//                     hideenTop: true
//                 },()=>{
//                     console.log(this.state.hideenTop)
//                 })
//             } else if (defaultScrollTop - currenScrollTop > 100) {
//                 this.setState({
//                     hideenTop: false
//                 })
//                 defaultScrollTop = currenScrollTop;
//             }
//         }
//     }
//     componentDidMount() {
//         window.addEventListener('scroll', this.EventScollFunc);
//     }
//     componentWillUnmount() {
//         window.removeEventListener("scroll", this.EventScollFunc);
//     }
//     render() {
//         return (
//             <div className='view-container'>
//                 <Header local={local} hideenTop={this.state.hideenTop}/>
//                 <WrappedComponent {...this.props} login={this.login}/>
//             </div>
//         )
//     }
// }

export default simpleHoc;