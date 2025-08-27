import React from 'react'
import Link from 'next/link'

export default function Page() {
  return (
    <div>
      <div className="">hello</div>
      <Link href={"/human"}>
      <div className="">go to home</div>
      </Link>
    </div>
  )
}
