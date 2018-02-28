function promiseUntilSuccess(array: any[], promiseCall: any): Promise<any>{
    var i = 0;
    var out = [];
    return new Promise((resolve, reject) => {
        promiseCall(array[i])
            .then((result) => {
                out.push(result);
                resolve(out);
            })
            .catch((error) => {
                out.push(error)
                if (array.length > 1){
                    var newset = array.splice(1)
                    return promiseUntilSuccess(newset, promiseCall)
                        .then((nestedOut) => {
                            nestedOut.forEach((result) => out.push(out))
                            resolve(out);
                        })
                        .catch((nestedOut) => {
                            nestedOut.forEach((result) => out.push(out));
                            reject(out);
                        })
                } else {
                    reject(out);
                }
            })
    })
}