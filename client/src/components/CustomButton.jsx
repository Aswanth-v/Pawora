import React from "react";

const CustomButton =({title,containerStyle,iconRight,type,onclick})=>{
    return(
        <button
        onclick={onclick}
        type={type||"button"}
        className={`inline-flex items-center text-base ${containerStyle}`}
        >
            {title}
            {iconRight && <div className="ml-2">{iconRight}</div>}
        </button>
    )
}

export default CustomButton;