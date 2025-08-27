"use client"
import React, { useState } from 'react'



export default function Page() {
    let level = 0;
    return (
        <div>
            {Object.keys(object) && Object.keys(object).length > 0 && Object.keys(object).map((each, index) => {
                const [open, setOpen] = useState(false)
                return (
                    <div key={index} className="">
                        <pre> {" ".repeat(level)} {"=>"} <input type='checkbox' value={open} onChange={() => setOpen(!open)} /> {each}</pre>
                        {
                            open &&
                            (Array.isArray(object[each]) ? <SingleEntity array={object[each]} level={level} /> : object instanceof Object && <DigDown level={level} object={object[each]} />)
                        }
                    </div>
                )
            })}
        </div>
    )
}

const SingleEntity = ({ array, level }) => {
    level += 2;
    return (
        <div className="">
            {array && array.length > 0 && array.map((each, index) => {
                return (
                    <div key={index} className="flex">
                        <pre>{"\t".repeat(level)} <input type='checkbox' /> {each}</pre>
                    </div>

                )
            })}
        </div>
    )
}

const DigDown = ({ level, object }) => {
    level += 2
    if (level > 2){
        console.log("first",object)
    }
    return (
        <div className="">
            {Object.keys(object) && Object.keys(object).length > 0 && Object.keys(object).map((each, index) => {
                const [open, setOpen] = useState(false)
                return (
                    <div key={index} className="">
                        <pre>{"\t".repeat(level)} {Array.isArray(object) ? "" : "=>"} <input type='checkbox' value={open} onChange={() => setOpen(!open)} /> {each}</pre>

                        {open &&
                            (Array.isArray(object[each]) ? <SingleEntity array={object[each]} level={level} /> : object[each] instanceof Object && <DigDown level={level} object={object[each]} />)
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
