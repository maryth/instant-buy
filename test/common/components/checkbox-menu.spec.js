import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import test from 'ava';

import App from '../../../src/pages/search/page';
import CheckBoxMenu from '../../../src/pages/search/CheckBoxMenu';
import Checkbox from 'material-ui/lib/checkbox';

function setup() {
    const props = {
        items: [{ name: "cat1", count: 23, isRefined: false},
            { name: "cat2", count: 0, isRefined: true}],
        title: "category",
        onChecked: sinon.spy()
    };

    const wrapper = shallow(React.createElement(CheckBoxMenu, props));


    return {
        wrapper,
        props
    };
}

test('Checkbox menu component', t => {
    const {wrapper, props} = setup();

    const checkBoxes = wrapper.find(Checkbox);

    expect(checkBoxes.length).is.equal(2);

    expect(checkBoxes.nodes[0].props.label).to.equal("cat1");
    expect(checkBoxes.nodes[0].props.checked).to.be.false;

    expect(checkBoxes.nodes[1].props.label).to.equal("cat2");
    expect(checkBoxes.nodes[1].props.checked).to.be.true;

    expect(wrapper.find('.title').node.props.children).to.equal('category');
});