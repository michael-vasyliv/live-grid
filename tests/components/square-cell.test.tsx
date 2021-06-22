import { SquareCell } from '@components/square-cell';
import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

describe('SquareCell', () => {
    let component: ShallowWrapper;

    beforeEach(() => {
        component = shallow(
            <SquareCell binary={0} />
        );
    });

    it('renders div', () => {
        expect(component.find('div').length).toEqual(1);
    });
    it('has class square-cell', () => {
        expect(component.hasClass('square-cell')).toEqual(true);
    });
    it('has no class enabled', () => {
        expect(component.hasClass('enabled')).toEqual(false);
    });
    it('has class enabled', () => {
        component.setProps({ binary: 1 });
        expect(component.hasClass('enabled')).toEqual(true);
    });
});
