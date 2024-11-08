import * as React from 'react';
import cn from 'classnames';
import s from './Icon.module.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
    color?: 'primary' | 'secondary' | 'accent';
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({ 
    color,
    width = 24,
    height = 24,
    className,
    children,
    ...rest
  }) => {
    return (
        <svg
            width={width}
            height={height}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(s['icon'], color && s[`icon_color-${color}`], className)}
            {...rest}
        >
            {children}
        </svg>
    );
}

export default Icon;
