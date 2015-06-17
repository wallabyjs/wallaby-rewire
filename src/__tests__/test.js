import React from 'react';
import A from '../a';

A.__Rewire__('B', React.createClass({
  render: function () {
    return <div></div>;
  }
}));

describe('1', function () {
  it('2', function () {

  });
});
