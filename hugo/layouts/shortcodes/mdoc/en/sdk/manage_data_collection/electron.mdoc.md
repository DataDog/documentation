## Tracking consent

To help you comply with regulations such as GDPR and CCPA, the SDK collects and sends data according to the end user's tracking consent.

| Value | Behavior |
|-------|----------|
| `'granted'` (default) | The SDK collects and sends data. |
| `'pending'` | The SDK collects data and keeps it on disk. It sends the data if consent is granted, and deletes it if consent is refused. |
| `'not-granted'` | The SDK neither keeps nor sends new data. Data stored earlier with consent is still sent. |

Initialize the SDK with the consent known at startup, and update it with `setTrackingConsent` when the end user answers:

```typescript
import { init, setTrackingConsent } from '@datadog/electron-sdk';

await init({
  // ...
  trackingConsent: 'pending',
});

// After the end user answers the consent prompt:
setTrackingConsent(accepted ? 'granted' : 'not-granted');
```

- Refusing consent ends the session. The next `'pending'` or `'granted'` value starts a new session. Moving between `'pending'` and `'granted'` keeps the session.
- RUM events, logs, spans, profiles, and Session Replay recordings that start while consent is refused, or pending and then refused, are not sent, even if they are reported after consent is granted again.
- The SDK does not restore the consent at the next launch, so pass it at each launch. Data kept while consent is pending is deleted at the next launch if no decision was made.
- Call `setTrackingConsent` after `init` resolves. An earlier call might be ignored.
- An invalid `trackingConsent` value aborts `init`. An invalid value passed to `setTrackingConsent` is handled as `'not-granted'`.
- The SDK starts Electron's crash reporter, which writes native crash dumps locally regardless of consent. At the next launch, a crash is evaluated against the consent at the time it happened, then sent, kept, or dropped according to the consent of that launch. Its dump is deleted either way.
- Requests that the main process makes carry trace headers when consent is `'granted'` or `'pending'`, so their traces link to the data sent if consent is granted. They carry none when consent is refused.

### Renderer processes

Set the consent in the main process. It applies to the renderers allowed by `allowedRendererHosts`, which report through the main process. Other renderers run the Browser SDK on its own, with its own `trackingConsent` setting.

For renderers that report through the main process, the Browser SDK is not informed of the consent and keeps collecting. As a result:

- **Trace headers**: Requests that the Browser SDK traces (`allowedTracingUrls`) carry trace headers regardless of consent.
- **Open views when consent is granted after a refusal**: The view of an open page moves to the new session at its next update, and the new session appears in Datadog.
  - Unlike other data, the view is sent even if it started while consent was refused, or pending and then refused.
  - The view includes everything it measured since it started.
  - The previous session no longer lists the view.
  - In the new session, Session Replay plays back the page only from its next view.

## Data storage

The SDK stores events on disk before uploading them to Datadog. Events are preserved across application restarts, so data collected before an unexpected shutdown is sent on the next launch.

To tune how the SDK batches and uploads stored events, set `batchSize` and `uploadFrequency` in the main process `init` call. See [Initialization parameters][1].

[1]: /real_user_monitoring/setup/enable_rum/advanced_configuration/?platform=electron#initialization-parameters
