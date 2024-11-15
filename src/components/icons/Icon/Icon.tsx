import * as React from 'react';

export type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
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
            className={className}
            {...rest}
        >
            {children}
        </svg>
    );
}

export default Icon;
