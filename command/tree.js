let fs = require("fs");
let path = require("path");
const internal = require("stream");
function treefn(srcPath) {
    // for cwd only
    //     if (srcPath == undefined) {
    //         srcPath = process.cwd();
    //         // console.log("tree command executed with path" , srcPath);
    //     }
    //     let content = fs.readdirSync(srcPath);
    //     // console.log(content);
    //     // └──
    //     // ├──
    //     let parentFolderName = path.basename(srcPath);
    //     let completePath = "└──" + parentFolderName;
    //     for(let i = 0; i < content.length; i++){
    //         completePath = completePath + "\n\t" +"├──" + content[i];
    //     }
    //     console.log(completePath);

    // for cwd and subfolders 
    if (srcPath == undefined) {
        srcPath = process.cwd();
        treeHeper(srcPath,"");
    } else {
        let doesExist = fs.existsSync(srcPath)
        if (doesExist) {
            treeHeper(srcPath,"");
        }
    }


}

function treeHeper(srcPath, indent) {
    let isFile = fs.lstatSync(srcPath).isFile();
    if (isFile) {
        let fileName = path.basename(srcPath);
        console.log(indent + "├──" + fileName);
    }else{
        let dirName = path.basename(srcPath);
        console.log(indent + "└──" + dirName);
        let childrens = fs.readdirSync(srcPath);
        for(let i = 0; i < childrens.length; i++){
            let childPath = path.join(srcPath,childrens[i]);
            treeHeper(childPath,indent + "\t");
        }
    }
}


module.exports = {
    treefxn: treefn
};