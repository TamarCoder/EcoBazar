"use client"
import React, { useState } from "react";
import {IconProps} from "./props";


const Icon: React.FC<IconProps> = ({isActive = false, toggleable = false, onClick, alt, width = 24, height = 24, className = ''}) => {
    const [internalActive, setInternalActive] =  useState(isActive);

    const handleClick = (e: React.MouseEvent) => {
        if (toggleable) {
            setInternalActive(!internalActive);
        }

        if (onClick) {
            onClick(e);
        }
    };

    const activeState = toggleable ? internalActive : isActive;

    const baseClasses = "transition-all duration-200 ease-in-out";
    const interactiveClasses = (onClick || toggleable) ? "cursor-pointer hover:scale-110" : "";
    const activeClasses = activeState ? "text-blue-600 fill-blue-600" : "text-gray-600 hover:text-gray-800";

    const combinedClassName = `${baseClasses} ${interactiveClasses} ${activeClasses} ${className}`.trim();

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={combinedClassName}
            onClick={handleClick}
            role={onClick || toggleable ? "button" : "img"}
            aria-label={alt}
            tabIndex={onClick || toggleable ? 0 : -1}
            onKeyDown={(e) => {
                if ((onClick || toggleable) && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    handleClick(e as never);
                }
            }}
        >

        </svg>
    );
};

export default Icon;