import { RootlyApi } from './api';

describe('RootlyApi apiToken', () => {
  const originalFetch = global.fetch;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => ({ data: { id: 'svc-1' } }),
    });
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  const authHeaderOfCall = (index: number) =>
    (fetchMock.mock.calls[index][1].headers as Record<string, string>)
      .Authorization;

  const createApi = (apiToken: ConstructorParameters<typeof RootlyApi>[0]['apiToken']) =>
    new RootlyApi({
      apiProxyUrl: Promise.resolve('http://backstage.local/api/proxy'),
      apiProxyPath: '/rootly/api',
      apiToken,
    });

  it('accepts a promise and sends its token as a bearer header', async () => {
    const api = createApi(Promise.resolve({ token: 'static-token' }));

    await api.getService('svc-1');

    expect(fetchMock).toHaveBeenCalledWith(
      'http://backstage.local/api/proxy/rootly/api/v1/services/svc-1',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer static-token',
          'Content-Type': 'application/vnd.api+json',
        }),
      }),
    );
  });

  it('accepts a function and calls it on every request', async () => {
    const tokens = ['first-token', 'second-token'];
    const apiToken = jest.fn(async () => ({ token: tokens.shift() }));
    const api = createApi(apiToken);

    await api.getService('svc-1');
    await api.getService('svc-1');

    expect(apiToken).toHaveBeenCalledTimes(2);
    expect(authHeaderOfCall(0)).toBe('Bearer first-token');
    expect(authHeaderOfCall(1)).toBe('Bearer second-token');
  });

  it('does not call the token function until a request is made', () => {
    const apiToken = jest.fn(async () => ({ token: 'lazy-token' }));
    createApi(apiToken);

    expect(apiToken).not.toHaveBeenCalled();
  });

  it('omits the Authorization header when the function returns no token', async () => {
    const api = createApi(async () => ({}));

    await api.getService('svc-1');

    expect(fetchMock.mock.calls[0][1].headers).not.toHaveProperty(
      'Authorization',
    );
  });

  it('propagates errors thrown by the token function', async () => {
    const api = createApi(async () => {
      throw new Error('token unavailable');
    });

    await expect(api.getService('svc-1')).rejects.toThrow('token unavailable');
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('RootlyApi lookups', () => {
  const originalFetch = global.fetch;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => ({ data: [], meta: { total_count: 0, total_pages: 0 } }),
    });
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  const api = () =>
    new RootlyApi({
      apiProxyUrl: Promise.resolve('http://backstage.local/api/proxy'),
      apiProxyPath: '/rootly/api',
      apiToken: Promise.resolve({ token: 't' }),
    });

  const requestedUrl = () => fetchMock.mock.calls[0][0] as string;

  it('lists severities with search and pagination', async () => {
    await api().getSeverities({
      page: { size: 50 },
      filter: { search: 'sev' },
    });

    expect(requestedUrl()).toBe(
      'http://backstage.local/api/proxy/rootly/api/v1/severities?page[size]=50&filter[search]=sev',
    );
  });

  it('lists environments with search and pagination', async () => {
    await api().getEnvironments({
      page: { size: 50 },
      filter: { search: 'prod' },
    });

    expect(requestedUrl()).toBe(
      'http://backstage.local/api/proxy/rootly/api/v1/environments?page[size]=50&filter[search]=prod',
    );
  });

  it('forwards the sort parameter for incidents', async () => {
    await api().getIncidents({ page: { number: 2 }, sort: '-started_at' });

    expect(requestedUrl()).toBe(
      'http://backstage.local/api/proxy/rootly/api/v1/incidents?page[number]=2&sort=-started_at',
    );
  });
});
