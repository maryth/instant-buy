import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import test from 'ava';

import Item from '../../../src/pages/search/Item';

function setup(p) {
    const props = p;

    const wrapper = shallow(React.createElement(Item, props));

    return {
        wrapper,
        props
    };
}

test('Item with free shipping component', t => {
    const {wrapper, props} = setup({
        item: {
            name: 'item1',
            description: 'description1',
            image: 'image-url',
            price: 99,
            free_shipping: true
        }
    });

    const img = wrapper.find('.img');
    expect(img.node.props.src).to.equal('image-url');

    const item = wrapper.find('.item').node.props.children;

    expect(item[0].props.children).to.equal('item1');
    expect(item[2].props.children).to.equal('description1');

    expect(item[1].props.children[0].props.children).to.contains(99);
    expect(item[1].props.children[0].props.children).to.contains(' $ ');
    expect(item[1].props.children[1].props.children).to.equal('free shipping');

});

test('Item without free shipping component', t => {
    const {wrapper, props} = setup({
        item: {
            name: 'item1',
            description: 'description1',
            image: 'image-url',
            price: 99,
            free_shipping: false
        }
    });

    const item = wrapper.find('.item').node.props.children;
    expect(item[1].props.children[1]).to.not.exist;

});