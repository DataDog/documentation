Core Web Vitals and view loading times are collected in renderer processes by the Browser SDK. See [Track UI Latency for the Browser SDK][1].

## Custom duration vitals

In the main process, record a duration you already know, or measure one between a start call and a stop call.

```typescript
import { addDurationVital, startDurationVital, stopDurationVital } from '@datadog/electron-sdk';

addDurationVital('database.migration', {
  startTime: Date.now() - 1_500,
  duration: 1_500,
  context: { database: 'documents' },
});

startDurationVital('document.open', {
  vitalKey: 'document-42',
  context: { source: 'recent-files' },
});
await openDocument();
stopDurationVital('document.open', {
  vitalKey: 'document-42',
  context: { result: 'success' },
});
```

- Times are in milliseconds.
- Use `vitalKey` to measure overlapping durations that share a name. It identifies the measurement and is not included in the event.
- Starting a vital with the same `name` and `vitalKey` as a pending one replaces the pending measurement.
- The SDK merges the options of the start and stop calls, and stop values take precedence. Stopping an unknown vital has no effect.
- Start and stop a measurement in the same process. To measure durations in a renderer, use the equivalent `@datadog/browser-rum` APIs.

[1]: /real_user_monitoring/setup/enable_rum/track_ui_latency/?platform=browser
