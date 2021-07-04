const fs = require('fs');

const writeDataToFile = (filename, content) => {
    fs.writeFile(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            
            req.on('data', (userInfo) => {
                body += userInfo.toString()
            })
            
            req.on('end', () => {
                resolve(body)
            })
            
        } catch(error) {
            reject(error);
        }
    })
}

module.exports = {
    writeDataToFile, 
    getPostData
}