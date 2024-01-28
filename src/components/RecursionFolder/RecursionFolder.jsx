import { useRef, useState } from 'react';
import './style.css';

const RecursionFolder = ({data}) => {
    // console.log("+++ data", data.data.name);
    const [showChildren, setShowChildren] = useState(false);
    // const showChildren2 = useRef(false);

    const onChildClick  = () => {
        setShowChildren((prev) => !prev);
        // showChildren2.current = !showChildren2.current;
    }

    const renderData = () => {                

        if (!data.isFolder) {
            return <span>{data.name}</span>
        }
        else {
            return <div className="container">                
                    <span onClick={onChildClick}>{data.name}</span>
                    {showChildren && <div style={{paddingLeft: '20px', display: 'flex', flexDirection: 'column'}}>
                        {data.children.map((child) => {
                            // return <span onClick={() => onChildClick(child)} key={child.name}>{child.name}</span>
                            return <RecursionFolder data={child} />
                        })}
                    </div>}
            </div>
        }
    }
    return (
        <>
            {renderData()}
        </>
    );
}

export default RecursionFolder;