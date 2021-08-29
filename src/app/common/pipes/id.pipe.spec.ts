import { IDPipe } from './id.pipe';

describe('IDPipe', () => {
  it('create an instance', () => {
    const pipe = new IDPipe();
    expect(pipe).toBeTruthy();
  });
});
