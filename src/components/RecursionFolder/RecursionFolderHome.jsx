import RecursionFolder from "./RecursionFolder";
import jsonTree from "./folderJson";


const RecursionFolderHome = () => {
    return (
        <>
            <h1>Folder Structure</h1>
            <RecursionFolder data={jsonTree} />
        </>
    );
}

export default RecursionFolderHome;