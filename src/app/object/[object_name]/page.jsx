"use server"


import { headers } from 'next/headers'
import React from 'react'
import ClientPage from './clientPage'


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
        throw new Error("Unable to fetch data right now!")
        return []
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
