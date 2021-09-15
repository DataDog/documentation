import { getQueryParameterByName, updateQueryParameter, deleteQueryParameter } from '../helpers/browser';

describe(`URL helpers work as expected`, () => {
  it(`Correctly gets query parameter by name`, () => {
    const parameterName = 'foo';
    const testUrl = 'datadoghq.com/?q=test&foo=bar';
    const result = getQueryParameterByName(parameterName, testUrl);

    expect(result).toEqual('bar');
  })

  it (`Updates the URL query parameter as expected`, () => {
    window.history.pushState(null, '', 'datadoghq.com/integrations/?q=foo/#test');

    const parameterName = 'q';
    const newParameterValue = 'bar';

    updateQueryParameter(parameterName, newParameterValue);

    expect(window.location.href).toContain('?q=bar#test');
  })

  it (`Deletes query parameter as expected`, () => {
    window.history.pushState(null, '', 'datadoghq.com/integrations/?foo=bar/#test');

    const parameterName = 'foo';

    deleteQueryParameter(parameterName);

    expect(window.location.href).not.toContain('foo=bar');
    expect(window.location.href).toContain('#test');
  })
})