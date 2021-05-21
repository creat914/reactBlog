import React, {
    useState,
    useCallback,
    useEffect,
    useContext
} from 'react';
import { BackTop } from 'antd'
import { CounterContext, RESET, SET_TOKEN, SET_USERINFO } from '@pc/sotre/index'
import { loginFunc } from '@pc/apis/blogApis'
import Header from "@pc/components/Header";
import { loginContext } from '@pc/sotre/loginContext';
const simpleHoc = (WrappedComponent, local) => (props) => {
    const { dispatch } = useContext(CounterContext);
    const [hideenTop, setHideenTop] = useState(false)
    const [keyword, setKeyword] = useState('')
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
    const login = useCallback(async ({ username, password }) => {
        let res = await loginFunc({ username, password })
        if (res) {
            dispatch({ type: SET_TOKEN, token: res.token })
            dispatch({ type: SET_USERINFO, userInfo: res.userInfo })
        } else {
            dispatch({
                type: RESET
            })
        }
    }, [])
    const searchKeyWord = useCallback((keyword) => {
        // console.log('keyword', keyword)
        setKeyword(keyword)
    })
    useEffect(() => {
        const EventScollFunc = ScollFunc()
        window.addEventListener('scroll', EventScollFunc);
        return () => {
            window.removeEventListener("scroll", EventScollFunc);
        }
    }, [])
    return (
        <loginContext.Provider value={{ login ,keyword }}>
            <div className='view-container'>
                {/* hideenTop={hideenTop} */}
                <BackTop visibilityHeight={300} duration={100}/>
                <Header local={local} searchKeyWord={searchKeyWord} />
                <WrappedComponent {...props} />
            </div>
        </loginContext.Provider>
    )
}
export default simpleHoc;