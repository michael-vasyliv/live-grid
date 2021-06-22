import React, { memo } from 'react';
import './square-cell.scss';

type Props = {
    binary: number;
};

export const SquareCell = memo<Props>(({ binary }) => (
    <div className={`square-cell${binary === 1 ? ' enabled' : ''}`} />
));
