import React from 'react';
import './Loader.css'

export type LoaderProps = {
    /** Размер */
    size?: 's' | 'm' | 'l';
    /** Дополнительный класс */
    className?: string;
    /** Цвет лоадера */
    color?: string;
};

const Loader: React.FC<LoaderProps> = ({size, className, color, ...rest}) => {
    return (
        <div className={"loaderContainer " + (size || '') + " " + (className || '')} >
            <div className="loader" style={{ borderRightColor: color, borderLeftColor: color, borderTopColor: color,   }} {...rest}></div>
        </div>)
}; 

export default Loader;
