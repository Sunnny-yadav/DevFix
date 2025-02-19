export const ErrorHandeller = (err,_,res,next)=>{
    const status = err.status || 400
    const message = err.message || "Backend Error"
    
    return res.status(400).json({
        status,message
    })

}