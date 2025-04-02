
const JWT_SECRET="I love mumma";
export const auth=()=>{
const token=req.header.token;
const decodedData=jwt.verify(token,JWT_SECRET);
if (decodedData) {
    req.userId=decodedData.userId;
next();
}
else{
    res.status(400).json({msg:'Authentication failure'});
}
}