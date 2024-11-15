import * as React from 'react'
import Icon, { IconProps } from '../Icon';

const ArrowLeftIcon: React.FC<IconProps> = (props) => {
    return <>
        <Icon viewBox={"0 0 31 31"} {...props}>
        <path
            d="M19.043 25.6126L10.9561 17.5258C10.0011 16.5708 10.0011 15.008 10.9561 14.0529L19.043 5.96613"
            stroke="currentColor"
            strokeWidth={props.strokeWidth ? props.strokeWidth : "1.5"}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Icon>
    </>
}

export default ArrowLeftIcon;
