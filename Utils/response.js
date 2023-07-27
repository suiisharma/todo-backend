const Response=(res,statuscode,success,message)=>{
 return  res.status(statuscode).json({
    success,
    message
  })
}

export default Response