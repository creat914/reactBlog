import axios from 'axios'

const api = axios.create({
    baseURL:"",
    timeout:10000
})


api.interceptors.request.use(config=>{
   const token =  localStorage.blog_token;
   if(token){
       config.headers.authorization = token;
   }
   return config;
},error=>{
   return Promise.reject(error)
})

api.interceptors.response.use(response=>{
       if(response.config.responseType == 'blob'){
           if(response.status == 200){
                return response
           }
       }else{
           let { data } = response;
           if(data.code == 200) {
               return data.data
           }else if(data.code == 400){
               return Promise.reject(data.msg)
           }else if(data.code == 401){
               localStorage.removeItem('blog_token');
               
           }

       }
})