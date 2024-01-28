import React, { useEffect } from 'react'
import axios from 'axios';

const HelpAPIAxios = () => {

    useEffect(() => {

    //     fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   .then(response => response.json())
    //   .then(json => console.log(json))
        const func = async() => {
            const resp = await axios.get('https://jsonplaceholder.typicode.com/todos/1');            
            console.log("+++ data", resp.data);
        }
        func();
    }, [])

    useEffect(() => {
//         fetch('https://dummyjson.com/posts/add', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     title: 'I am in love with someone.',
//     userId: 5,
//     /* other post data */
//   })
// })
// .then(res => res.json())
// .then(console.log);
        const func = async() => {
            const resp = await axios.post('https://dummyjson.com/posts/add', {
                title: 'I am in love with someone.',
                userId: 1,    
            }, {
                headers: {"Content-Type": 'application/json'}
            })
            // const resp = await fetch('https://dummyjson.com/posts/add', {
            //     method: 'POST', 
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         title: 'I am in love with someone.',
            //         userId: 1,                    
            //     })                
            // });
            // const data = await resp;
            console.log("+++ data post", resp.data);
        }
        func();
    }, [])


  return (
    <div>Help</div>
  )
}

export default HelpAPIAxios