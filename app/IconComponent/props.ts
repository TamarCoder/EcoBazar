import {IconName} from "./Icon.enum";


export interface IconProps{
    name: IconName;
    isActive?: boolean;
    toggleable?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    alt:string;
    width?:number;
    height?:number;
    className?: string;
}