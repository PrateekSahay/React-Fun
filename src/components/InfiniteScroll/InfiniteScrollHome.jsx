// import InfiniteScroll from "./InfiniteScroll";
// import react, { useCallback, useEffect, useRef, useState } from "react";
// import axios from "axios";

// const InfiniteScrollHome = () => {
//   const [query, setQuery] = useState("");
//   const [scrollData, setScrollData] = useState([]);
//   const pageNumber = useRef(1);
//   const limit = 20;

// //   useEffect(() => {
// //     (async () => {
// //       const result = await fetch(
// //         `https://catfact.ninja/facts?page=${pageNumber.current}&limit=${limit}`
// //       );
// //       const data = await result.json();
// //       console.log("data", data);
// //       setScrollData((prev) => [...prev, data]);
// //     })();
// //   }, [query, pageNumber]);

// useEffect(() => {
//     fetchData();
// }, [query, pageNumber]);

// const fetchData = async() => {
//     const result = await fetch(
//         `https://openlibrary.org/search.json?q=${query}&page=${pageNumber.current}`,
//         {
//             method: 'get',            
//         }
//       );
//       const data = await result.json();
//       console.log("data", data);
// }

//   const handleChange = useCallback(
//     (e) => {
//       setQuery(e.target.value);
//     },
//     [query]
//   );

//   console.log("query", query);
//   console.log("scrollData", scrollData);

//   // const renderData = () => {
//   //   return (
//   //     <div className="renderContainer">
//   //       scrollData.map((x) => {
//   //         return (
//   //           <div>abc</div>
//   //         );
//   //       })
//   //     </div>
//   //   );
//   // }

//   // api call to fetch data

//   return (
//     <div className="App">
//       <input type="text" onChange={handleChange} />
//       <InfiniteScroll query={query} />
//     </div>
//   );
// }

// export default InfiniteScrollHome;