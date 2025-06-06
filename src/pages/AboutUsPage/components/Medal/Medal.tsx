import * as s from './Medal.module.scss';

const Medal = () => (
  <div className={s.medal}>
    <svg
      className={s.medal__icon}
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_502_630)">
        <path d="M42 0H0V42H42V0Z" fill="none" />
        <path
          d="M32.9035 20.601L31.9655 24.101H13.6535L8.66949 5.50549H12.2955L16.338 20.601H32.9035Z"
          fill="#AD7E5C"
        />
        <path d="M31.402 26.201L30.464 29.701H9.60749L8.66949 26.201H31.402Z" fill="#518581" />
        <path d="M29.9005 31.801L28.9625 35.301H14.5915L13.6535 31.801H29.9005Z" fill="#A6D8D1" />
      </g>
      <defs>
        <clipPath id="clip0_502_630">
          <rect width="42" height="42" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </div>
);

export default Medal;
