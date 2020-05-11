import React from 'react';
import './GridNode.css';

interface Props {
    numberOfElementsPerRow: number;
}

export const GridNode: React.FC<Props> = ({numberOfElementsPerRow}) => {
    return (
        <div className='grid-node' style={{flexBasis: `${100 / numberOfElementsPerRow}% - 2px`}} >
        </div>
    );
}