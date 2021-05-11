import React, { useEffect } from 'react'
import { getDraftList } from '@pc/apis/blogApis'
const draft = () => {
    useEffect(() => {
        getDraftList().then(res=>{
            console.log(res)
        })
    }, [])


    return (
        <div>
            草稿也
        </div>
    )
}

export default draft