import React from 'react';

interface Props {
    step: number;
    total: number;
    offset: number;
    passive: boolean;
    onClickLeft: () => void;
    onClickRight: () => void;
    className?: string;
}

function Pagination({ step, total, offset, passive, onClickLeft, onClickRight, className = '' }: Props) {

    const start = total ? offset + 1 : offset;
    const end = offset + step > total ? total : offset + step;

    return (
        <div className={`flex items-center pr-4 gap-4 text-sm ${className}`}>
            <p className='text-[8px] md:text-[11px] text-secondary whitespace-nowrap'>{`${start.toLocaleString()}-${end.toLocaleString()} | ${total.toLocaleString()}`}</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill='currentColor'
                className={`h-7 w-7 ${(offset === 0 || passive) ? 'pointer-events-none text-secondary' : 'text-primary cursor-pointer'}`}
                onClick={onClickLeft}>
                <path d="M11.3 12l3.5-3.5c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0l-4.2 4.2c-.4.4-.4 1 0 1.4l4.2 4.2c.2.2.4.3.7.3.3 0 .5-.1.7-.3.4-.4.4-1 0-1.4L11.3 12z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill='currentColor'
                className={`h-7 w-7 ${(end === total || passive) ? 'pointer-events-none text-secondary' : 'text-primary cursor-pointer'}`}
                onClick={onClickRight}>
                <path d="M9.9 17.2c-.6 0-1-.4-1-1 0-.3.1-.5.3-.7l3.5-3.5-3.5-3.5c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4l-4.2 4.2c-.2.2-.5.3-.7.3z" />
            </svg>
        </div>
    )
}

export default Pagination;
