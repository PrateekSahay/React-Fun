import React, { useEffect } from 'react'

const HelpAPI = () => {

    useEffect(() => {

    //     fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   .then(response => response.json())
    //   .then(json => console.log(json))
        const func = async() => {
            const resp = await fetch('https://jsonplaceholder.typicode.com/todos/1');
            const data = await resp.json();
            console.log("+++ data", data);
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
            const resp = await fetch('https://dummyjson.com/posts/add', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: 'I am in love with someone.',
                    userId: 1,                    
                })                
            });
            const data = await resp.json();
            console.log("+++ data", data);
        }
        func();
    }, [])


  return (
    <div>Help</div>
  )
}

export default HelpAPI