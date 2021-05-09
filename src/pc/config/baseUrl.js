export const fileAside = (fileName)=>{
    return (process.env.NODE_ENV !== 'development' ? 'http://127.0.0.1:8089' : 'http://127.0.0.1:8089') + fileName
}

export const baseUrl = process.env.NODE_ENV !== 'development' ? 'http://127.0.0.1:8089' : ''


