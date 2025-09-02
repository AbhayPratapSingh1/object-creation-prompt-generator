import React from 'react'
import ObjectsMapping from './components/objectsMapping'
import db_connection from '@/server/mongoDbConnect'

async function fetchObjectData() {
  try {
    const data = await db_connection.collection("objects").find({}, { projection: { object_name: 1 } }).toArray()    
    return data
  }
  catch (e) {
    throw new Error("Unable to fetch data right now!")
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  let data = await fetchObjectData()
  console.log("\n\n\ndata",data)
  return (
    <div className='flex flex-col h-full flex-grow p-2'>
      <ObjectsMapping data={data} />
    </div>
  )
}
