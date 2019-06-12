import Reemitter from "../src";

describe('Reemitter', () => {
  it('should call registered events', () => {
    const reemitter = new Reemitter<{foo: {bar: number}}>();
    const fooListener = jest.fn();
    const secondListener = jest.fn();

    reemitter.on('foo', fooListener);
    reemitter.on('foo', secondListener);
    reemitter.emit('foo', {bar: 1});

    expect(fooListener).toBeCalledTimes(1);
    expect(fooListener).toBeCalledWith({bar: 1});

    expect(secondListener).toBeCalledTimes(1);
    expect(secondListener).toBeCalledWith({bar: 1});
  });

  it('should not call unregistered events', () => {
    const reemitter = new Reemitter<{foo: {bar: number}, hector: number}>();
    const fooListener = jest.fn();

    reemitter.on('foo', fooListener);
    reemitter.emit('hector', 1);

    expect(fooListener).not.toHaveBeenCalled();
  });

  it('should call listener once when registered multiple times', () => {
    const reemitter = new Reemitter<{foo: {bar: number}}>();
    const fooListener = jest.fn();

    reemitter.on('foo', fooListener);
    reemitter.on('foo', fooListener);
    reemitter.on('foo', fooListener);
    reemitter.emit('foo', {bar: 1});

    expect(fooListener).toBeCalledTimes(1);
  });

  it('should allow to unsubscribe from listeners', () => {
    const reemitter = new Reemitter<{foo: {bar: number}}>();
    const fooListener = jest.fn();

    reemitter.on('foo', fooListener);
    reemitter.off('foo', fooListener);
    reemitter.emit('foo', {bar: 1});

    expect(fooListener).not.toHaveBeenCalled()
  })
});
