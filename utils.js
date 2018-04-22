const fs = require('fs');

function generateImportClass(targetFolder, callback){
    var importList = "";
    var jsonList = "";
    fs.readdirSync(targetFolder).forEach((file) => {
        if(file !== "reducer.js") {
            var fileName = file.replace(".js", "");
            importList += "import " + fileName + " from './" + fileName + "'" + "\n";
            jsonList += fileName + ": " + fileName + ".reduce," + "\n"
        }
    });

    callback(importList, jsonList)
}

function replaceData(filters, data) {
    filters.map(filter => data = data.replace(filter.regex, filter.value))
    
    return data;
}

function writeFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if(err) {
            throw err
        }
    });
}

module.exports = {
    generateTemplate : (
        template, 
        path, 
        fileName, 
        filters, 
        type,
        callback
    ) => {
        fs.readFile(template, (err, data) => {
            if(err) {
                throw err
            }
            
            if(data) {
                var newData = data.toString();
                if(type === "MAIN_REDUCER"){
                        path += "reducer/";
                        generateImportClass(path, (importList, jsonList) => {
                            filters.map(filter => {
                                if(filter.type == "Import") {
                                    newData = newData.replace(filter.regex, importList);
                                }

                                if(filter.type == "json") {
                                    newData = newData.replace(filter.regex, jsonList)
                                }
                            })
                        })
                } else {
                    switch(type) {
                        case "ACTION":
                            path += "action/";
                            break;
                        case "REDUCER":
                            path += "reducer/";
                            break;
                        case "STORE":
                            path += "store/"
                            break;
                    }
                    if(typeof filters !== "undefined") {
                        newData = replaceData(filters, newData);
                    }
                }
                writeFile(path+fileName, newData);
                callback();
            }
        });
    },
    generateFolder : (rootPath) => {
        fs.mkdirSync(rootPath+ "reducer");
        fs.mkdirSync(rootPath+ "action");
        fs.mkdirSync(rootPath+ "store");
    }
}