import test from 'ava';
import * as sinon from 'sinon';
import minitter from './../src/index';

interface IEventTypes {
    inc: number;
    dec: number;
    once: number;
}

const emitter = minitter<IEventTypes>();
const spy = sinon.spy();

test.beforeEach(spy.reset);

test('on - add listenr', t => {
    emitter.on('inc', spy);
    t.is(emitter.listenerCount('inc'), 1);
});

test('on - not added when listener aleady included', t => {
    emitter.on('inc', spy);
    t.is(emitter.listenerCount('inc'), 1);
});

test('once - add listenr', t => {
    emitter.once('once', spy);
    t.is(emitter.listenerCount('once'), 1);
});

test('once - remove listener after event emitted', t => {
    emitter.emit('once', 1);
    t.true(spy.calledWith(1));
    t.is(emitter.listenerCount('once'), 0);
});

test('emit - emit listener function', t => {
    emitter.emit('inc', 1);
    t.true(spy.calledWith(1));
});

test('emit - not throw exception even if listener is not registered', t => {
    t.notThrows(() => emitter.emit('dec', 1));
});

test('off - remove event listener', t => {
    emitter.off('inc', spy);
    t.is(emitter.listenerCount('inc'), 0);
});
