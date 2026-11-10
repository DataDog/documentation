Electron profiling collects code-level performance data from renderer pages with the [JS Self-Profiling API][1], and correlates it with your RUM data.

{% alert level="info" %}
Profiling is available only in renderer processes. It is not supported in the main process.
{% /alert %}

### Setup

#### Step 1 - Set up RUM

To start collecting data, set up [RUM for Electron][2], including the Browser SDK in your renderer processes.

#### Step 2 - Configure the profiling sampling rate

In the main process `init` call, set `profilingSampleRate`, which determines the percentage of sampled sessions that are profiled. It defaults to `0`, which disables profiling.

```typescript
await init({
  // ...
  profilingSampleRate: 100, // percentage of sampled sessions that are profiled
});
```

The main process decides which sessions are profiled. `profilingSampleRate` set in the renderer `datadogRum.init` call has no effect.

#### Step 3 - Serve renderer pages with the Document-Policy header

The JS Self-Profiling API is available only on pages served with the HTTP response header `Document-Policy: js-profiling`.

Pages loaded from `file://` are not served with this header by default, so profiling is not available for them.

1. Serve the renderer over a protocol where you control the response headers: a custom protocol registered with [`protocol.handle`][3], or a local HTTP server.
2. If you use a custom protocol, register it as privileged, with `standard` and `secure`, before the app is ready:

    ```typescript
    import { protocol } from 'electron';

    protocol.registerSchemesAsPrivileged([
      { scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true } },
    ]);
    ```

    If you skip this step, the JS Self-Profiling API stays unavailable even with the header, because Chromium does not treat the scheme as a secure context.

3. Add the `Document-Policy: js-profiling` response header to the responses that serve your renderer pages.

### Explore profiling

Renderer profiling data appears in the same places as browser profiling data. See [Explore profiling][4] for the Browser SDK.

[1]: https://developer.mozilla.org/en-US/docs/Web/API/JS_Self-Profiling_API
[2]: /real_user_monitoring/application_monitoring/electron/setup/
[3]: https://www.electronjs.org/docs/latest/api/protocol#protocolhandlescheme-handler
[4]: /real_user_monitoring/enrich_rum_data/collect_frontend_profiles/?platform=browser#explore-profiling
