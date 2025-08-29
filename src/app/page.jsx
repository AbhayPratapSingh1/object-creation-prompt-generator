import React from 'react'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='flex flex-col h-full flex-grow'>
      <div className="">
        <Link href={"/human"}>
          <div className="">go to Human desgin 1</div>
        </Link>
        <Link href={"/human-design-2"}>
          <div className="">go to Human design 2</div>
        </Link>
      </div>
      <div className="flex-grow"></div>
      <div className="font-extrabold text-yellow-600 text-3xl text-center">Under construction!</div>
      <div className="flex-grow"></div>
    </div>
  )
}
