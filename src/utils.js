/*
* fn [function] 需要防抖的函数
* delay [number] 毫秒，防抖期限值
*/
export function debounce(fn, delay) {
    let timer = null //借助闭包
    return function () {
        timer && clearTimeout(timer) //进入该分支语句，说明当前正在一个计时过程中，并且又触发了相同事件。所以要取消当前的计时，重新开始计时
        timer = setTimeout(()=>{
            fn.apply(this,...arguments)
        }, delay) // 进入该分支说明当前并没有在计时，那么就开始一个计时
    }
}
// 节流
export function throttle(fn,delay){
    let valid = true
    return () =>{
        if(!valid){
            //休息时间 暂不接客
            return false
        }
        // 工作时间，执行函数并且在间隔期内把状态位设为无效
        valid = false
        setTimeout(() => {
            fn.apply(this,...arguments)
            valid = true;
        }, delay)
    }
}

