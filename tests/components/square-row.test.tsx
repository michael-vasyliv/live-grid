import { SquareCell } from '@components/square-cell';
import { SquareRow } from '@components/square-row';
import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

describe('SquareRow', () => {
    let component: ShallowWrapper;

    beforeEach(() => {
        component = shallow(
            <SquareRow items={[]} />
        );
    });

    it('has class square-row', () => {
        expect(component.hasClass('square-row')).toEqual(true);
    });

    describe('with data', () => {
        const items = [1, 0, 1, 1, 0];

        beforeEach(() => {
            component.setProps({ items });
        });

        it('has 5 SquareCell', () => {
            expect(component.find(SquareCell).length).toEqual(5);
        });

        it('has right props for SquareCell', () => {
            expect(component.find(SquareCell).map((x) => x.prop('binary'))).toEqual(items);
        });
    });
});
