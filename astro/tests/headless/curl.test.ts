import { describe, it, expect } from 'vitest';
import { generateCurl } from '../../src/data/api/curl';

describe('generateCurl', () => {
  it('generates a simple GET request', () => {
    const result = generateCurl({
      method: 'GET',
      path: '/api/v1/dashboard',
    });

    expect(result).toContain('curl -X GET');
    expect(result).toContain('https://api.datadoghq.com/api/v1/dashboard');
    expect(result).toContain('DD-API-KEY');
    expect(result).toContain('DD-APPLICATION-KEY');
    expect(result).toContain('-H "Accept: application/json"');
  });

  it('generates a POST request with body', () => {
    const body = JSON.stringify({ title: 'My Dashboard' }, null, 2);
    const result = generateCurl({
      method: 'POST',
      path: '/api/v1/dashboard',
      requestBodyJson: body,
    });

    expect(result).toContain('curl -X POST');
    expect(result).toContain('-H "Content-Type: application/json"');
    expect(result).toContain('-d @- << EOF');
    expect(result).toContain('"title": "My Dashboard"');
    expect(result).toContain('EOF');
  });

  it('interpolates path parameters with example values', () => {
    const result = generateCurl({
      method: 'GET',
      path: '/api/v1/dashboard/{dashboard_id}',
      pathParams: [{ name: 'dashboard_id', example: 'abc-123' }],
    });

    expect(result).toContain('/api/v1/dashboard/abc-123');
    expect(result).not.toContain('{dashboard_id}');
  });

  it('uses uppercase placeholder when no example is provided', () => {
    const result = generateCurl({
      method: 'GET',
      path: '/api/v1/dashboard/{dashboard_id}',
      pathParams: [{ name: 'dashboard_id' }],
    });

    expect(result).toContain('${DASHBOARD_ID}');
  });

  it('includes query parameters with example values', () => {
    const result = generateCurl({
      method: 'GET',
      path: '/api/v1/dashboard',
      queryParams: [
        { name: 'filter', example: 'active', required: false },
        { name: 'page', example: '0', required: false },
      ],
    });

    expect(result).toContain('?filter=active&page=0');
  });

  it('only includes required query params without examples', () => {
    const result = generateCurl({
      method: 'GET',
      path: '/api/v1/dashboard',
      queryParams: [
        { name: 'required_param', required: true },
        { name: 'optional_param', required: false },
      ],
    });

    expect(result).toContain('required_param=');
    expect(result).not.toContain('optional_param');
  });

  it('uses custom site domain', () => {
    const result = generateCurl({
      method: 'GET',
      path: '/api/v1/dashboard',
      site: 'datadoghq.eu',
    });

    expect(result).toContain('https://api.datadoghq.eu/api/v1/dashboard');
    expect(result).toContain('DD_SITE="datadoghq.eu"');
  });

  it('respects security requirements for auth headers', () => {
    const result = generateCurl({
      method: 'GET',
      path: '/api/v1/dashboard',
      security: [{ apiKeyAuth: [] }],
    });

    expect(result).toContain('DD-API-KEY');
    expect(result).not.toContain('DD-APPLICATION-KEY');
  });
});
