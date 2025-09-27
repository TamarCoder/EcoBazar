"use client"
import React, { useState, useEffect } from "react";
import { IconProps } from "./props";
import { IconName } from "./Icon.enum";

const Icon: React.FC<IconProps> = ({
    name,
    isActive = false, 
    toggleable = false, 
    onClick, 
    alt, 
    width = 24, 
    height = 24, 
    className = ''
}) => {
    const [internalActive, setInternalActive] = useState(isActive);
    const [svgContent, setSvgContent] = useState<string>('');

    useEffect(() => {
        // SVG ფაილის ჩატვირთვა
        const loadSvg = async () => {
            try {
                const response = await fetch(`/icons/${name}.svg`);
                const svgText = await response.text();
                setSvgContent(svgText);
            } catch (error) {
                console.warn(`SVG icon "${name}" not found`, error);
            }
        };

        loadSvg();
    }, [name]);

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

    if (!svgContent) {
        return null; // ან loading spinner
    }

    return (
        <div
            className={combinedClassName}
            onClick={handleClick}
            role={onClick || toggleable ? "button" : "img"}
            aria-label={alt || name}
            tabIndex={onClick || toggleable ? 0 : -1}
            onKeyDown={(e) => {
                if ((onClick || toggleable) && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    handleClick(e as never);
                }
            }}
            style={{ width, height }}
            dangerouslySetInnerHTML={{ __html: svgContent }}
        />
    );
};

export default Icon;