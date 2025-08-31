"use client"
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { FaArrowRight, FaRegCopy } from "react-icons/fa";

let datObj = {}
function genPrompt() {
    if (Object.keys(datObj).length === 0) {
        return "Create a random Character"
    }

    let ob = Object.keys(datObj)
    ob = ob.sort()

    let string = "Please create animated or real entity with following features :";

    for (const key in datObj) {
        string += ` ${datObj[key]} ${key};`;
    }

    string += " the character should have full body view with base rotated with some degree, so that side part of the character is also visible.";
    string = string.replace(/_/g, " ")

    return string
}
const themecolor = "#121a3d"
// const themecolor = "#ff5b00"

export default function ClientPage({data}) {
    const page_heading = `Customise Your ${data.object_name}`;
    let level = 0;
    const [finalPrompt, setFinalPrompt] = useState("")
    const textBoxRef = useRef(null)

    useEffect(() => {
        textBoxRef.current.style.height = "0px";
        textBoxRef.current.style.height = textBoxRef.current.scrollHeight + "px";
    }, [finalPrompt])

    let object = data.parameters
    async function handleCopyClick() {
        try {
            await navigator.clipboard.writeText(finalPrompt)
            alert("Prompt copied Succesfully!")
        }
        catch (e) {
            alert("Something went wrong!\n Please Inform the Developer!")
        }
    }
    return (
        <div className='max-w-[700px] mx-auto bg-white border rounded-b-xl border-gray-300 shadow-2xl z-10'>
            <div className="">
                <Image src={"/humanHero.webp"} height={400} width={800} alt='Hero' priority />
                <h1 className="my-2 text-left text-xl font-semibold  text-gray-900 px-2">{page_heading}</h1>
            </div>
            <DigDown level={level} object={object} base={""} />
            <div className="m-2">
                <div className="flex justify-center gap-4 my-2">
                    <button onClick={() => location.reload()} style={{ color: themecolor, borderColor: themecolor }} className='px-4 py-1.5 border-2 rounded-xl font-semibold '>Clear</button>
                    <button onClick={() => setFinalPrompt(genPrompt())} style={{ backgroundColor: themecolor }} className='px-4 py-1.5  rounded-xl  text-white'>Generate</button>
                </div>

                <div className="p-2 border border-gray-300 rounded-sm">
                    <div className="text-gray-600 text-sm font-semibold border-b border-gray-200 flex justify-left gap-2 items-center">
                        <div className="">Output Prompt</div>
                        <div className="">|</div>
                        <button onClick={() => handleCopyClick()} className="text-lg">
                            <FaRegCopy />
                        </button>
                    </div>
                    <textarea className='w-full outline-none p-2 pb-0' type="" value={finalPrompt.toString()} onChange={(e) => setFinalPrompt(e.target.value)} ref={textBoxRef} name="" id=""></textarea>
                </div>
            </div>
        </div>
    )
}

const SingleEntity = ({ array, level, base }) => {
    const [selected, setSelected] = useState(new Array(array.length).fill(false))
    useEffect(() => {
        if (base in datObj) {
            setSelected(() => array.map((each) => each == datObj[base]))
        }
    }, [])
    return (
        <div style={{ marginLeft: level * 10 }} className={`border-l py-0 mb-2 border-gray-400 p-4 `}>
            {array && array.length > 0 && array.map((each, index) => {
                useEffect(() => {
                    if (selected[index]) {
                        datObj[base] = each
                    }
                    else if (base in datObj) {
                        delete datObj[base]
                    }
                }, [selected[index]])

                return (
                    <div key={index} className="flex">
                        <button onClick={() => { setSelected((prev) => prev.map((each, ind) => ind === index && !each)) }}>
                            <pre><input checked={selected[index]} onChange={() => { }} type='checkbox' /> {each}</pre>
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

const DigDown = ({ level, object, base }) => {
    return (
        <div style={{ marginLeft: level * 10 }} className={` rounded-md py-0 ${level > 0 ? "border z-20 shadow-xl" : ""} mb-2 border-gray-300 p-4 `}>
            <div style={{ color: themecolor }} className="pt-2 text-sm font-semibold ">{base} features :</div>
            {Object.keys(object) && Object.keys(object).length > 0 && Object.keys(object).map((each, index) => {
                const [open, setOpen] = useState(false)
                function handleCloseDiv() {
                    setOpen(!open)
                }
                return (
                    <div key={index} className="">
                        <button className='flex items-center gap-1' onClick={() => handleCloseDiv()}>
                            {Array.isArray(object) ? "" : <FaArrowRight className={`text-sm transition duration-300  aspect-square ${open ? " rotate-90" : ""}`} />}{each}
                        </button>

                        {open &&
                            (Array.isArray(object[each]) ? <SingleEntity array={object[each]} level={level + 2} base={base + "_" + each} /> : object[each] instanceof Object && <DigDown level={level + 2} object={object[each]} base={base ? base + "_" + each : each} />)
                        }
                    </div>
                )
            })}
        </div>
    )
}


