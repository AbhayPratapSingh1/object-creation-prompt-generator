"use server"

import React from 'react'
import ObjectsMapping from './components/objectsMapping'
import { headers } from 'next/headers'

async function fetchObjectData() {
  try {

    const host = (await headers()).get("host")
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https"
    const base_url = `${protocol}://${host}`
    let data = await fetch(`${base_url}/api/fetch-objects`)

    data = await data.json()
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
