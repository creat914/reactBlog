export const fileAside = (fileName)=>{
    return (process.env.NODE_ENV !== 'development' ? 'http://192.168.31.181:8089' : 'http://192.168.31.181:8089') + fileName
}

export const baseUrl = process.env.NODE_ENV !== 'development' ? 'http://192.168.31.181:8089' : ''


