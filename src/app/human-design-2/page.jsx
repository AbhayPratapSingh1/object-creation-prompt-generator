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

    let string = "Please create a animated character with following features :";

    for (const key in datObj) {
        string += ` ${datObj[key]} ${key};`;
    }

    string += " the character should have full body view with base rotated with some degree, so that side part of the character is also visible.";
    string = string.replace(/_/g, " ")

    return string
}

export default function Page() {
    const page_heading = "Customise Your Character";
    let level = 0;
    const [finalPrompt, setFinalPrompt] = useState("")
    const textBoxRef = useRef(null)

    useEffect(() => {
        textBoxRef.current.style.height = "0px";
        textBoxRef.current.style.height = textBoxRef.current.scrollHeight + "px";
    }, [finalPrompt])

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
                    {/* <button onClick={() => {setFinalPrompt("") ; datObj={}}} className='px-4 py-1.5 border-2 border-blue-500 rounded-xl  text-blue-700'>Clear</button> */}
                    <button onClick={() => setFinalPrompt(genPrompt())} className='px-4 py-1.5  rounded-xl bg-blue-700 text-white'>Generate</button>
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
        <div style={{ marginLeft: level * 10 }} className={`border-l py-0 mb-2 border-gray-300 p-4  `}>
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



const object = {
    Hair: {
        Style: ["straight", "curly", "wavy", "coiled", "tied", "loose", "layered", "bangs"],
        Color: ["black", "brown", "blonde", "red", "gray", "dyed", "highlighted", "ombre"],
        Texture: ["silky", "coarse", "frizzy", "smooth", "thick", "thin"],
        Length: ["short", "medium", "long", "shoulder-length"]
    },
    Eyes: {
        Color: ["brown", "black", "hazel", "blue", "green", "gray", "amber"],
        Shape: ["almond", "round", "hooded", "monolid", "deep-set"],
        Size: ["small", "medium", "large", "wide-set", "close-set"],
        Expression: ["sharp", "soft", "kind", "stern", "curious", "dreamy"]
    },
    Nose: {
        Shape: ["straight", "hooked", "button", "aquiline", "flat", "wide", "narrow"],
        Size: ["small", "medium", "large", "prominent"],
        Bridge: ["high", "low", "wide", "narrow"]
    },
    Lips: {
        Shape: ["thin", "full", "bow-shaped", "wide"],
        Size: ["small", "medium", "large"],
        Color: ["natural pink", "pale", "dusky", "pigmented"],
        Fullness: ["plump", "thin", "uneven"]
    },
    FaceShape: ["oval", "round", "square", "heart-shaped", "diamond", "rectangular", "triangular"],

    Hands: {
        Size: ["small", "medium", "large"],
        Shape: ["slender", "broad", "bony", "delicate"],
        FingerLength: ["short", "long", "proportionate"]
    },
    Fingers: {
        Length: ["short", "long", "tapered"],
        Thickness: ["thin", "thick", "bony"],
        Nails: ["short", "long", "oval", "square", "polished", "natural"]
    },
    Torso: {
        MuscleTone: ["defined", "average", "soft"],
        Shape: ["broad", "narrow", "V-shaped", "rectangular"],
        Size: ["slim", "average", "bulky"]
    },
    Legs: {
        Length: ["long", "short", "proportionate"],
        MuscleTone: ["toned", "average", "soft"],
        Shape: ["straight", "curved", "lean"]
    },
    Age: ["child", "teenager", "young adult", "middle-aged", "elderly"],
    Gender: ["male", "female", "non-binary", "gender-fluid"],
    Skintone: ["fair", "light", "medium", "tan", "olive", "brown", "dark"],
    Height: ["short", "average", "tall"],
    BodyType: ["slender", "athletic", "muscular", "curvy", "stocky", "petite", "plus-size"],
    Dressing: {
        Style: ["casual", "formal", "traditional", "sporty", "trendy", "elegant"],
        ColorPalette: ["bright", "muted", "pastel", "monochrome"],
        Fabric: ["cotton", "silk", "denim", "leather", "linen"],
        Accessories: ["scarf", "belt", "tie", "jacket"]
    },
    Footwear: {
        Type: ["sneakers", "sandals", "boots", "heels", "flats", "loafers"],
        Style: ["formal", "casual", "sporty", "traditional"],
        Material: ["leather", "canvas", "synthetic", "rubber"],
        Color: ["neutral", "bright", "patterned"]
    },
    Accessories: {
        Type: ["jewelry", "glasses", "watch", "bag", "hat"],
        Style: ["minimal", "bold", "ethnic", "modern"],
        Color: ["metallic", "neutral", "colorful"],
        Significance: ["cultural", "religious", "personal"]
    },
    Expression: {
        Facial: ["happy", "sad", "angry", "thoughtful", "blank", "mischievous"],
        BodyLanguage: ["confident", "shy", "restless", "relaxed"]
    },
    Behaviour: {
        Mannerisms: ["calm", "fidgety", "graceful", "clumsy"],
        Posture: ["upright", "slouched", "relaxed", "stiff"],
        Attitude: ["polite", "arrogant", "cheerful", "reserved"]
    },
    Voice: {
        Tone: ["gentle", "harsh", "firm", "soothing"],
        Pitch: ["high", "low", "medium"],
        Volume: ["soft", "loud", "moderate"],
        Accent: ["regional", "foreign", "neutral"]
    },
    Smile: {
        Type: ["wide", "subtle", "crooked", "dimpled"],
        Warmth: ["genuine", "fake", "polite", "radiant"],
        Frequency: ["rare", "occasional", "frequent"]
    },
    Personality: {
        Traits: ["kind", "ambitious", "shy", "extroverted", "introverted", "witty", "empathetic"],
        Characteristics: ["disciplined", "spontaneous", "patient", "stubborn"],
        Quirks: ["unique habits", "speech patterns", "hobbies"]
    }
};
