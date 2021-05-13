import {loginOut} from '@pc/apis/blogApis';
import { RESET } from '@pc/sotre/index'
import {message} from 'antd';
export const menuOption = {
    'loginout':(dispath)=>{
         loginOut().then(res=>{
             message.success('退出成功');
             dispath({
                 type:RESET
             })
             window.router.replace('/')
         })
    },
    'goHome':()=>{
        window.router.replace('/')
    },
    'write':()=>{
        window.router.push('/Eidtor')
    },
    'drfat':(type)=>{
        window.router.push('/Draft/'+type)
    },
    'Profile':(id)=>{
        window.router.push(`/Profile/${id}`)
    }

}