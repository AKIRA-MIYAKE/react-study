import chai from 'chai';

import greeting from '../../src/common/greeting';

var expect = chai.expect;


describe('greeting', () => {

  it('greetingは関数である', () => {
    expect(greeting).to.be.a('function');
  });

  it('引数を渡さない場合は Hello, Anonymous!! と返す', () => {
    expect(greeting()).to.be.equal('Hello, Anonymous!!');
  });

  it('引数に名前を渡すと Hello, ${name}!! と返す', () => {
    expect(greeting('John')).to.be.equal('Hello, John!!');
    expect(greeting('Jane')).to.be.equal('Hello, Jane!!');
  });

});
