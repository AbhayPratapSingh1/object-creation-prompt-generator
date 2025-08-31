import db_connection from "@/server/mongoDbConnect";

export async function GET(Request, {params}) {
    let {object_name} = await params
    let rex = `^${object_name}$`
    try {
        let data = await db_connection.collection("objects").find({ object_name:{$regex : rex, $options:"i" } }).toArray()
        if (data && data.length>0){
            data = data[0]
        }
        else{
            data = []
        }
        return Response.json({status:true, data:data})
    }
    catch(e){
        return Response.json({status:false,error:"Internal Server Error"},{status:500})
    }
}
