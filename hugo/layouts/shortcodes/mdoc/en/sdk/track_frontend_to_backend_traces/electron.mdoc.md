## Main process traces

The Electron SDK uses and configures `dd-trace-js`, so tracing requires no additional setup. The SDK generates traces for the following main process activity:

- Network requests
- Command execution

Requests that the main process makes carry trace headers when tracking consent is `'granted'` or `'pending'`. They carry none when consent is refused. See [Manage Data Collection][1].

### Trace sampling rate

Set `traceSampleRate` in the main process `init` call to the percentage of main process traces to keep when no `traceSamplingRules` rule matches, from `0` to `100`. The default is `100`.

### Trace sampling rules

Use `traceSamplingRules` to control which main process traces the SDK keeps. The SDK evaluates the rules in order when a root trace starts. The first matching rule sets the percentage of traces to keep, and traces that match no rule use `traceSampleRate`.

| Field | Required | Description |
|-------|----------|-------------|
| `sampleRate` | Yes | Percentage of matching traces to keep, from `0` to `100`. |
| `name` | No | Matches the root span operation name, such as `http.request`. |
| `resource` | No | Matches the root span resource, such as the HTTP method `GET`. |
| `tags` | No | Matches root span tags by name and value. Every configured tag must match. |

Patterns are case-insensitive globs. Child spans inherit the decision of their root span.

```typescript
await init({
  // ...
  traceSamplingRules: [{ tags: { 'http.url': '*/health' }, sampleRate: 0 }],
});
```

## Renderer process traces

To connect requests made by renderer processes to backend traces, configure `allowedTracingUrls` in the Browser SDK. See [Track Frontend-to-Backend Traces for the Browser SDK][2].

[1]: /real_user_monitoring/setup/enable_rum/manage_data_collection/?platform=electron#tracking-consent
[2]: /real_user_monitoring/enrich_rum_data/track_frontend_to_backend_traces/?platform=browser
