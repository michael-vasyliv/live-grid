import { LiveGrid } from '@modules/live-grid';
import { render, screen } from '@testing-library/react';
import React from 'react';

jest.spyOn(global, 'setInterval').mockImplementation(() => undefined as any);

describe('LiveGrid', () => {
    jest.useFakeTimers();

    const randomSpy = jest.spyOn(Math, 'random');

    it('has 5 SquareRow', () => {
        randomSpy
            .mockReturnValue(0);

        render(<LiveGrid />);

        expect(screen.getAllByRole('row').length).toEqual(5);
    });

    it('cells has right data', () => {
        // [1, 1, 0, 0, 0],
        // [1, 1, 0, 0, 0],
        // [0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0]
        randomSpy
            .mockReturnValueOnce(1)
            .mockReturnValueOnce(1)
            .mockReturnValueOnce(0)
            .mockReturnValueOnce(0)
            .mockReturnValueOnce(0)

            .mockReturnValueOnce(1)
            .mockReturnValueOnce(1)
            .mockReturnValue(0);

        render(<LiveGrid />);
        const cells = screen.getAllByRole('cell').map((x) => (x.classList.contains('enabled') ? 1 : 0));
        expect(cells).toEqual([
            1, 1, 0, 0, 0,
            1, 1, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ]);
    });

    it('check getNextCells', () => {
        // [1, 0, 0, 0, 0],
        // [1, 1, 0, 0, 0],
        // [0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0]
        randomSpy
            .mockReturnValueOnce(1)
            .mockReturnValueOnce(0)
            .mockReturnValueOnce(0)
            .mockReturnValueOnce(0)
            .mockReturnValueOnce(0)

            .mockReturnValueOnce(1)
            .mockReturnValueOnce(1)
            .mockReturnValue(0);

        render(<LiveGrid />);
        const cells = screen.getAllByRole('cell').map((x) => (x.classList.contains('enabled') ? 1 : 0));
        expect(cells).toEqual([
            1, 1, 0, 0, 0,
            1, 1, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ]);
    });

    it('check getNextCells', () => {
        // [1, 1, 0, 0, 0],
        // [1, 1, 0, 0, 0],
        // [1, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0]
        randomSpy
            .mockReturnValueOnce(1)
            .mockReturnValueOnce(0)
            .mockReturnValueOnce(0)
            .mockReturnValueOnce(0)
            .mockReturnValueOnce(0)

            .mockReturnValueOnce(1)
            .mockReturnValueOnce(1)
            .mockReturnValueOnce(0)
            .mockReturnValueOnce(0)
            .mockReturnValueOnce(0)

            .mockReturnValueOnce(1)
            .mockReturnValue(0);

        render(<LiveGrid />);
        const cells = screen.getAllByRole('cell').map((x) => (x.classList.contains('enabled') ? 1 : 0));
        expect(cells).toEqual([
            1, 1, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ]);
    });
});
