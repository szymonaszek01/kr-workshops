import { DefaultValuePipe } from './default-value.pipe';

describe('DefaultValuePipe', () => {
  it('create an instance', () => {
    // when
    const pipe = new DefaultValuePipe();

    // then
    expect(pipe).toBeTruthy();
  });

  it('should transform empty value to \'-\'', () => {
    // given
    const value = null;

    // when
    const pipe = new DefaultValuePipe();
    const result = pipe.transform(value, '-');

    // then
    expect(result).toEqual('-');
  });
});
