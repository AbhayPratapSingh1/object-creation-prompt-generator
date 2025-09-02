import { headers } from 'next/headers'
import React from 'react'
import ClientPage from './clientPage'

export const revalidate = 0;
export const dynamic = "force-dynamic";

async function fetchObjectData(object_name) {
    try {
        const host = (await headers()).get("host")
        const protocol = process.env.NODE_ENV === "development" ? "http":"https"
        const base_url = `${protocol}://${host}`
        let data = await fetch(`${base_url}/api/fetch-single-object/${object_name}`)
        
        data = await data.json()
        return data
    }
    catch(e){
        console.log("first",e)
        throw new Error("Unable to fetch data right now!")
    }
}

export default async function Page({params}) {
    
    const { object_name } = await params
    const data = await fetchObjectData(object_name)
    return (
        <div>
            <ClientPage data={data.data || []}/>
        </div>
    )
}
