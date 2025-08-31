import db_connection from "@/server/mongoDbConnect";

export async function GET() {
    try {
        const data = await db_connection.collection("objects").find({},{ projection : {object_name:1}}).toArray()
        return Response.json({status:true, data:data})
    }
    catch(e){
        return Response.json({status:false,error:"Internal Server Error"},{status:500})
    }
}
