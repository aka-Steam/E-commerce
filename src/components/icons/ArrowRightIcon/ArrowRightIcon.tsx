import * as React from 'react'
import Icon, { IconProps } from '../Icon';

const ArrowRightIcon: React.FC<IconProps> = (props) => {
    return <>
        <Icon viewBox={"0 0 31 31"} {...props}>
          <path
            d="M11.957 25.6126L20.0439 17.5258C20.9989 16.5708 20.9989 15.008 20.0439 14.0529L11.957 5.96613"
            stroke="currentColor"
            strokeWidth={props.strokeWidth ? props.strokeWidth : "1.5"}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Icon>
    </>
}

export default ArrowRightIcon;
