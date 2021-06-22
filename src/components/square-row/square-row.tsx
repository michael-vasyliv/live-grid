import React, { memo } from 'react';
import { SquareCell } from '../square-cell';
import './square-row.scss';

type Props = {
    items: number[];
};

export const SquareRow = memo<Props>(({ items }) => (
    <div className="square-row">
        {items.map((x, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <SquareCell key={index} binary={x} />
        ))}
    </div>
));
