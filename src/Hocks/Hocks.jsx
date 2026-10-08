import React, { useCallback, useEffect, useRef, useState } from 'react'
const Hocks = () => {
    // useState()
    const [data,setData] = useState({
        name:"",
        age:null
    })
    const [n,setN]= useState(0);
    function handelForm(e){
        e.preventDefault();
        if(data.name != "" && data.age != null && Number(data.age)) alert(`name :${data.name} \n age :${data.age} `);
        
    }
    function handelData(e){
        const name = e.target.name ;
        const value = e.target.value;
        setData({...data,[name]:value})
    }


    function elements(){
        return [
            <h1>hello 1</h1>,
            <h1>hello 2</h1>,
            <h1>hello 3</h1>,
            <h1>hello 4</h1>
        ]
    }


    // component life sycle
    // mount -> update -> unmout
    // useEffect


    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            document.body.style.background="pink";
        })
        return ()=>{
            window.addEventListener("scroll",()=>{
            document.body.style.background="";
        })
        }
    },[n])

    // useRef

    const input = useRef(null);
    console.log(input.current)


    // useCallback() :

    const Decrement = useCallback(()=>{setN(n-1)},[n])

    

  return (
    <div>
        {/* useState */}
        <form onSubmit={handelForm}>
            <input type="text" name='name' placeholder='name' onChange={handelData} ref={input} />
            <input type="number" name="age" placeholder='age' onChange={handelData} />
            <button>submit</button>
        </form>
        <div className="data">
            name : {data.name} <br />
            age : {data.age} <br />
            type : {data.age < 18 ? "child" : data.age <= 30 ? "father" : "grandFather"}
        </div>

        <h1>{["mohamed","amine","elhadani","mmmm9awad"].slice(0,2).map(n =>(
            <>   
              <br />
             <span>{n}</span>
            </>

        ))}</h1>

        <h1>{[0,5,"sir","wellcom",1,2,3,4].reduce((a,b) => a+b,5)}</h1>
        <div className="counter">
            {n} <br />
            <button onClick={()=>setN(prev => prev +1)}>+</button>
            <button onClick={Decrement}>-</button>
        </div>

    </div>
  )
}

export default Hocks