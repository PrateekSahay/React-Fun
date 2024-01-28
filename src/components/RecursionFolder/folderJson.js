const jsonTree = {
    name: "root",
    isFolder: true,
    children: [
        {
            name: "src",
            isFolder: true,
            children: [
                {
                    name: "components",
                    isFolder: true,
                    children: [
                        {
                            name: "ImageSlider",
                            isFolder: true,
                            children: [
                                {
                                    name: "index.js",
                                    isFolder: false,
                                    children: [
                        
                                    ]
                                }
                            ]
                        },
                        {
                            name: "index1.js",
                            isFolder: false,
                            children: [
                
                            ]
                        }
        
                    ]
                },
                {
                    name: "index3.js",
                    isFolder: false,
                    children: [
        
                    ]
                }
            ]
        },
        {
            name: "package.json",
            isFolder: false,
            children: [

            ]
        }
    ]
}

export default jsonTree;