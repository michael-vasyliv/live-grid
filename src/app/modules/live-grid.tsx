import React, {
    memo,
    useCallback,
    useEffect,
    useMemo,
    useState
} from 'react';
import { SquareRow } from '../components/square-row';

/** this method does just simple copy, it does not copy methods, if you have any links you will get an error */
function simpleCopy<I>(items: I): I {
    return JSON.parse(JSON.stringify(items));
}

function getRandomCells(items: number[][]): number[][] {
    const copy = simpleCopy(items);

    return copy.map((rowItems) => rowItems.map(() => Math.round(Math.random())));
}

function getNextCells(items: number[][]): number[][] {
    const copy = simpleCopy(items);

    copy.forEach((rowItems, rowIndex) => {
        rowItems.forEach((item, cellIndex) => {
            /**
             * 010
             * 0x0
             * 010
             */
            const top = copy[rowIndex - 1]?.[cellIndex] ?? 0;
            const bottom = copy[rowIndex + 1]?.[cellIndex] ?? 0;

            /**
             * 000
             * 1x1
             * 000
             */
            const left = copy[rowIndex][cellIndex - 1] ?? 0;
            const right = copy[rowIndex][cellIndex + 1] ?? 0;

            /**
             * 101
             * 0x0
             * 000
             */
            const topLeft = copy[rowIndex - 1]?.[cellIndex - 1] ?? 0;
            const topRight = copy[rowIndex - 1]?.[cellIndex + 1] ?? 0;

            /**
             * 000
             * 0x0
             * 101
             */
            const bottomLeft = copy[rowIndex + 1]?.[cellIndex - 1] ?? 0;
            const bottomRight = copy[rowIndex + 1]?.[cellIndex + 1] ?? 0;

            const total = top + bottom
                + left + right
                + topLeft + topRight
                + bottomLeft + bottomRight;

            if (item === 1) {
                /** Any live cell with fewer than two live neighbours dies (underpopulation) */
                /** Any live cell with more than three live neighbours dies (overcrowding). */
                if (total < 2 || total > 3) {
                    copy[rowIndex][cellIndex] = 0;
                    /** Any live cell with two or three live neighbours lives on to the next generation. */
                } else if (total === 2 || total === 3) {
                    copy[rowIndex][cellIndex] = 1;
                }
            } else if (item === 0) {
                /** Any dead cell with exactly three live neighbours becomes a live cell (reproduction). */
                if (total === 3) {
                    copy[rowIndex][cellIndex] = 1;
                }
            }
        });
    });

    return copy;
}

type Props = {
    size?: number;
};

export const LiveGrid = memo<Props>(({ size = 5 }) => {
    const [items, setItems] = useState<number[][]>([]);

    const defaultItems = useMemo(() => Array
        .from({ length: size })
        .map(() => Array.from<number>({ length: size }).fill(0)), [size]);

    const generateCells = useCallback(() => {
        const randomItems = getRandomCells(defaultItems);
        const nextItems = getNextCells(randomItems);

        setItems(nextItems);
    }, [defaultItems]);

    useEffect(() => {
        generateCells();
    }, [generateCells]);

    useEffect(() => {
        const timerId = setInterval(() => {
            const nextItems = getNextCells(items);

            setItems(nextItems);
        }, 400);

        return () => clearInterval(timerId);
    }, [items]);

    return (
        <>
            <button type="button" onClick={generateCells}>Refresh</button>
            {items.map((rowItems, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <SquareRow key={index} items={rowItems} />
            ))}
        </>
    );
});
