import Reemitter from "../src";

describe('Reemitter', () => {
  it('Should call registered events', () => {
    const reemitter = new Reemitter<{foo: {bar: number}}>();
    const fooListener = jest.fn();
    const secondListener = jest.fn();

    reemitter.on('foo', fooListener);
    reemitter.on('foo', secondListener);
    reemitter.on('foo', secondListener);
    reemitter.emit('foo', {bar: 1});

    expect(fooListener).toBeCalledTimes(1);
    expect(fooListener).toBeCalledWith({bar: 1});

    expect(secondListener).toBeCalledTimes(2);
    expect(secondListener).toBeCalledWith({bar: 1});
  });
});
