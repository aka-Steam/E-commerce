import * as React from 'react'

export type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
    color?: 'primary' | 'secondary' | 'accent';
};


    const colorMap  = {
        "primary": "#000000",
        "secondary": "#AFADB5",
        "accent": "#518581",
    }

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({ color , width = 24, height = 24, className, children, ...rest }: IconProps) => {
    const fillColor = color ? colorMap[color] : 'currentColor';

    // Проверяем наличие атрибута fill или stroke в дочернем элементе
    const childWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            const hasFill = !!child.props.fill;
            const hasStroke = !!child.props.stroke;

    
            return React.cloneElement(child as React.ReactElement, {
                fill: hasFill ? fillColor : undefined,
                stroke: hasStroke ? fillColor : undefined,
            });
        }
        return child;
    });

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...rest}
        >
            {childWithProps}
        </svg>
    );
}

export default Icon;
