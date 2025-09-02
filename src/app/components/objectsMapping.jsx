import Link from 'next/link'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

export default function ObjectsMapping({ data }) {

    return (
        <div className="">
            <div className="text-sm font-semibold text-gray-700">Generate Prompt For:</div>
            <div className="ml-2">
                { data && data && data.length > 0 && data.map((each, index) => {
                    return (
                        <Link key={index} href={`/object/${each.object_name}`}>
                            <div className="flex gap-2 items-center font-sm font-semibold">
                                <FaArrowRight className={`text-sm transition duration-300  aspect-square `} />
                                {each.object_name}
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
