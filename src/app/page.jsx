"use server"

import React from 'react'
import ObjectsMapping from './components/objectsMapping'
import { headers } from 'next/headers'
import db_connection from '@/server/mongoDbConnect'

async function fetchObjectData() {
  try {


    const data = await db_connection.collection("objects").find({}, { projection: { object_name: 1 } }).toArray()
    
    return data
  }
  catch (e) {
    throw new Error("Unable to fetch data right now!")
    return []
  }
}



export default async function Page() {
  let data = await fetchObjectData()

  return (
    <div className='flex flex-col h-full flex-grow p-2'>
      <ObjectsMapping data={data.data} />
    </div>
  )
}
