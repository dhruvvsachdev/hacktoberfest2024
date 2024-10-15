#!/usr/bin/env node
let inputArr= process.argv.slice(2); 
let fs= require("fs");
let path= require("path");
let command= inputArr[0];
let types= {
    media: ["mp4","mkv"],
    archives: ["zip","7z","rar","tar","gz","ar","iso","xz"],
    documents: ["docx","doc","pdf","xlsx","xls","odt","ods","odp","odg","odf","txt","ps","tex"],
    app: ["exe","dmg","pkg","deb"],
    java: ["java"],
    class: ["class"],
    html: ["html"],
    photos: ["jpg","jpeg","png"],
    text: ["txt"]
}
switch(command){
    case "organise":
        organise(inputArr[1]);
        break;
    case "help":
        help();
        break;
    default:
        console.log("please input right command"); 
}



function organise(dirPath){
    let destpath;
       //1, input --> directory
    if (dirPath== undefined){
        dirPath= process.cwd();
        
    }
    
         let exists= fs.existsSync(dirPath);
         if (exists){
                 //2. Create --> Organised_files -> directory
                  destpath=path.join(dirPath,"organised_file");
                 if(!fs.existsSync(destpath)){
                 fs.mkdirSync(destpath);
                 }

         }
         else{
            console.log("Kindly enter valid path");
            return;
         }
    
    organiser(dirPath,destpath);
}
function help(){
    console.log(`List of All commands:
                      project organise "directoryPath" or project organise 
                      project help`);
    
}
function organiser(src,dest){
       //3. Check file extensions of all files in input directory
     let children=fs.readdirSync(src); 
     for (let i=0; i<children.length;i++){
             let childaddress= path.join(src,children[i]);
             let isFile= fs.lstatSync(childaddress).isFile();
             if (isFile){
                let category= categoryy(children[i]);
                sendfiles(childaddress,category,dest);
                    //4. Copy/cut files to that organised directory

             }
             

     }

}
function categoryy(name){
    let ext= path.extname(name);
                 ext=ext.slice(1);
                 for (let type in types){
                    let Array= types[type];
                    for (let i=0; i<Array.length;i++){
                        if (ext==Array[i]){
                            return type;
                        }
                    }
                 }
                 return "others";
}
function sendfiles(src,category,dest){
    let categorypath= path.join(dest,category);
    if (!fs.existsSync(categorypath)){
       fs.mkdirSync(categorypath);
    }
    let filename= path.basename(src);
    let destpath= path.join(categorypath,filename);
    fs.copyFileSync(src,destpath);
    fs.unlinkSync(src);
}
