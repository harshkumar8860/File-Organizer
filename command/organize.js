let fs = require("fs");
let path = require("path");
let types = {
    media: ["mp3", "mp4", "mkv",'jpg','jpeg','png'],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', ' xz'],
    document: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', 'deb']
}
function organizefn(srcPath) {
    if (srcPath == undefined) {
        srcPath = process.cwd();
        // console.log("organize command exucuted with path", srcPath);
    }
    // 1 create organized_files -> directory
    let organizedFilesPath = path.join(srcPath, "organized_files");
    if (fs.existsSync(organizedFilesPath) == false) {
        fs.mkdirSync(organizedFilesPath);
    }
    // 2 scan whole srcPath
    let alltheFiles = fs.readdirSync(srcPath);
    // console.log(alltheFiles);
    // 3 extension check -> classify
    for (let i = 0; i < alltheFiles.length; i++) {
        let fullOriginalPath = path.join(srcPath, alltheFiles[i]);
        if (fs.lstatSync(fullOriginalPath).isFile() == true) {
            let folderName = checkextnTellFolder(alltheFiles[i]);
            // console.log(alltheFiles[i] , "will go to", folderName);
            copyFileTOdest(folderName, fullOriginalPath, srcPath);
        }

    }
    // 4 copy to that folder to which it belongs
    //folder 
    // file copy
    //other
    //file copy

}

function copyFileTOdest(folderName, fullOriginalPath, srcPath) {
    let destFolderPath = path.join(srcPath, "organized_files", folderName);
    if (fs.existsSync(destFolderPath) == false) {
        fs.mkdirSync(destFolderPath);
    }
    let originalFileName = path.basename(fullOriginalPath);
    let destFilePath = path.join(destFolderPath, originalFileName );
    fs.copyFileSync(fullOriginalPath,destFilePath);
    console.log(originalFileName, "copied to", folderName);
    // fs.unlinkSync(fullOriginalPath); // to cut the files

}

function checkextnTellFolder(fileName) {
    let extName = path.extname(fileName);
    extName = extName.slice(1);
    for (key in types) {
        for (let i = 0; i < types[key].length; i++) {
            if (types[key][i] == extName) {
                return key;
            }
        }
    }
    return "others";
}

module.exports = {
    organizefxn: organizefn
};                                                                                                                   