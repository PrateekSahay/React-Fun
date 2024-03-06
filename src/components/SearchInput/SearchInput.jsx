// import { useEffect, useState } from "react";
// import "../styles.css";

// const SearchInput = ({ value, onChange, placeholer, optionList, styles }) => {
//   const [search, setSearch] = useState(value);
//   const [list, setOptionList] = useState(optionList);
//   const [showList, setShowList] = useState(false);

//   const handleChange = (event) => {
//     setSearch(event.target.value);
//     updateListData();
//     setShowList(true);
//   };

//   const updateListData = () => {
//     const newOptionList = list.filter((item) =>
//       item.toLowerCase().includes(search.toLowerCase())
//     );
//     setOptionList(newOptionList);
//   };

//   const onBlur = () => {
//     setShowList(false);
//   };

//   const onListItemClick = (e) => {
//     console.log();
//     onChange && onChange(e.target.value);
//   };

//   useEffect(() => {
//     updateListData();
//   }, [value]);

//   return (
//     <div className="container">
//       <input
//         placeholder={placeholer || "Search..."}
//         type="text"
//         value={search}
//         onChange={handleChange}
//         onBlur={onBlur}
//       />
//       {showList && (
//         <ul className="list">
//           {list?.map((item) => (
//             <li onClick={onListItemClick} key={item.id}>
//               {item}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SearchInput;

// passive vs active elements in html
// controlled vs uncontrolled component in react
// 