import { expect } from 'chai'
import JPromise from '../src/index'

describe("your own promise library unit tests", () => {
    let data = 1;
    const p = new JPromise((resolve) => {
        resolve(5);
    });
    it('has then method', () => {
        expect(typeof p.then === 'function').to.equal(true);
    });
    it('excute a then function ', () => {
        p.then((val) => data = val);
        expect(data).to.equal(5);
    });
})