import React from 'react';
import { GridNode } from './GridNode';
import './Grid.css';

interface Props {
    numberOfRows: number;
    numberOfElements: number;
};

export const Grid: React.FC<Props> = ({numberOfRows, numberOfElements}) => {

    let constructRow: (numberOfElements: number) => JSX.Element[] = (numberOfElements) => {
        let row: JSX.Element[] = [];
        for (let i: number = 0; i < numberOfElements; i++) {
            row.push(<GridNode numberOfElementsPerRow={numberOfElements}/>);
        }
        return row;
    }

    let constructGrid: (numberOfRows: number, numberOfElements: number) => JSX.Element[] = (numberOfRows, numberOfElements) => {
        let grid = [];
        for (let i: number = 0; i < numberOfRows; i++) {
            grid.push(<div className='row'>{constructRow(numberOfElements)}</div>);
        }
        return grid;
    } 

    return (
        <div className='grid'>
            {constructGrid(numberOfRows, numberOfElements)}
        </div>
    );
}