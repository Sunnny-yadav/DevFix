export const AsyncHandeller = (requestHandeller) => {
    return (req, res, next)=>{
        Promise.resolve(requestHandeller(req, res, next)).catch((err)=>{
            console.log(err)
            return  next(err)
        })
    }
};

