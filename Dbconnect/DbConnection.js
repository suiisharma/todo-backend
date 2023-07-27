import mongoose from "mongoose";


const DbConnection=async()=>{
try {
     await mongoose.connect(process.env.Mongo_Uri,{"dbName":"Todo"});
     console.log(`Database connected at ${process.env.Mongo_Uri}`);
} catch (error) {
    console.log('Error while connecting to database : ',error.message);
}
}

export default DbConnection