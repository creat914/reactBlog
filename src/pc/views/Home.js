import React,{useState} from 'react'

const Home = ()=>{
    const [a,setA] = useState(0)
    return (
        <div>
            <button onClick={()=>setA(5)}>这是花絮123{a}</button>
        </div>
    )
}
export default Home
