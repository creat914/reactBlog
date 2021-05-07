export const fileAside = (fileName)=>{
    return (process.env.NODE_ENV !== 'development' ? 'http://127.0.0.1:8088' : 'http://127.0.0.1:8088') + fileName
}