function getData() {
    return new Promise((resolve, reject) => {
        request(your_url, (error, res, movieData) => {
            if(error) {
                reject(error);
            } else {
                resolve(movieData);
            }
        })
    })
}

//使用getData
getData().then(data => console.log(data))
.catch(error => console.log(error));

