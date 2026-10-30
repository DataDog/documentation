<!--
This partial contains advanced configuration instructions for the Electron SDK.
-->

If you haven't set up the Electron SDK yet, follow the [Electron setup instructions][ac-intro-1].

[ac-intro-1]: /real_user_monitoring/application_monitoring/electron/setup

## Initialization parameters

Pass these parameters to `init` in the main process.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `clientToken` | `string` | Yes | | Datadog client token. |
| `applicationId` | `string` | Yes | | RUM application ID. |
| `site` | `string` | Yes | | Datadog site, for example `datadoghq.com`, `datadoghq.eu`, `us3.datadoghq.com`, `us5.datadoghq.com`, `ap1.datadoghq.com`, `ap2.datadoghq.com`, `ddog-gov.com`, or `us2.ddog-gov.com`. |
| `service` | `string` | Yes | | Service name. |
| `allowedRendererHosts` | `string[]` | Yes | | Hostnames of the renderers allowed to report through the main process. See [Allowed renderer hosts][ac-init-1]. |
| `env` | `string` | No | | Application environment. |
| `version` | `string` | No | | Application version. |
| `sessionSampleRate` | `number` | No | `100` | Percentage of sessions to collect, from `0` to `100`. `0` collects no sessions, and `100` collects all sessions. |
| `trackingConsent` | `'granted' \| 'pending' \| 'not-granted'` | No | `'granted'` | Initial tracking consent of the end user. See [Tracking consent][ac-init-2]. |
| `logsSampleRate` | `number` | No | `100` | Percentage of renderer logs to forward, from `0` to `100`, sampled independently for each log. See [Electron log collection][ac-init-3]. |
| `traceSampleRate` | `number` | No | `100` | Percentage of main process traces to keep when no `traceSamplingRules` rule matches, from `0` to `100`. |
| `traceSamplingRules` | `TraceSamplingRule[]` | No | `[]` | Ordered sampling rules for main process traces. See [Trace sampling rules][ac-init-4]. |
| `sessionReplaySampleRate` | `number` | No | `0` | Percentage of sampled sessions that record Session Replay, from `0` to `100`. `0` disables Session Replay. See [Session Replay][ac-init-5]. |
| `profilingSampleRate` | `number` | No | `0` | Percentage of sampled sessions that are profiled, from `0` to `100`. `0` disables renderer profiling. See [Profiling][ac-init-6]. |
| `defaultPrivacyLevel` | `'mask' \| 'allow' \| 'mask-user-input'` | No | `'mask'` | Default privacy level for Session Replay in renderers. See [Session Replay privacy options][ac-init-7]. |
| `batchSize` | `'SMALL' \| 'MEDIUM' \| 'LARGE'` | No | `'MEDIUM'` | Size threshold that closes a batch file early: `SMALL` is 16 KiB, `MEDIUM` is 512 KiB, and `LARGE` is 4 MiB. |
| `uploadFrequency` | `'RARE' \| 'NORMAL' \| 'FREQUENT'` | No | `'NORMAL'` | How often the SDK uploads pending batches, and the window over which events accumulate: `RARE` is 30 seconds, `NORMAL` is 10 seconds, and `FREQUENT` is 5 seconds. |
| `beforeSendRum` | `RumBeforeSend` | No | | Modify or drop RUM events before they are sent. See [Modify or drop RUM events][ac-init-8]. |

{% alert level="info" %}
`sessionReplaySampleRate` and `profilingSampleRate` apply to sampled sessions only. With `sessionSampleRate: 0`, no session records Session Replay or is profiled.
{% /alert %}

[ac-init-1]: /real_user_monitoring/application_monitoring/electron/advanced_configuration/#allowed-renderer-hosts
[ac-init-2]: /real_user_monitoring/application_monitoring/electron/advanced_configuration/#tracking-consent
[ac-init-3]: /logs/log_collection/electron/
[ac-init-4]: /real_user_monitoring/application_monitoring/electron/advanced_configuration/#trace-sampling-rules
[ac-init-5]: /session_replay/setup_and_configuration/?platform=electron
[ac-init-6]: /real_user_monitoring/correlate_with_other_telemetry/profiling/?platform=electron
[ac-init-7]: /session_replay/privacy_options/?platform=electron
[ac-init-8]: /real_user_monitoring/application_monitoring/electron/advanced_configuration/#modify-or-drop-rum-events

## Allowed renderer hosts

`allowedRendererHosts` lists the renderers that can report through the main process. A renderer that is not allowed runs the Browser SDK on its own, and its events do not go through the main process.

| Value | Allows |
|-------|--------|
| `['example.com']` | Renderers on `example.com` and any subdomain. |
| `['*.example.com']` | Only subdomains of `example.com`. |
| `['myapp']` | Renderers that use a custom protocol with the hostname `myapp`, for example `app://myapp/index.html`. |
| `['file://']` | All `file://` renderers. Path-level filtering is not possible for `file://`. |
| `['*']` | All renderers, including `file://`. |
| `[]` | No renderer. |

For a custom protocol such as `app://`, use the hostname, which is the part between `://` and the first `/`.

{% alert level="warning" %}
Use `['*']` for development only. In production, list the specific hostnames your application loads.
{% /alert %}

## Trace sampling rules

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

## Modify or drop RUM events

Use `beforeSendRum` to modify or drop RUM events from the main process and from renderers before the SDK sends them to Datadog. The callback receives the event and an object with the `source` of the event, either `'main'` or `'renderer'`.

```typescript
await init({
  // ...
  beforeSendRum: (event, { source }) => {
    if (event.type === 'error') {
      event.error.message = event.error.message.replace(/token=[^&\s]+/g, 'token=[REDACTED]');
      event.error.stack = event.error.stack?.replace(/token=[^&\s]+/g, 'token=[REDACTED]');
    }
    if (source === 'main' && event.context?.internal === true) {
      return false;
    }
    return true;
  },
});
```

Return `false` to drop an event. Any other return value keeps the event. View, execution context, and native crash events cannot be dropped.

You can modify the following fields:

- All events: `context`, `service`, `version`, and `execution_context.name`
- Renderer events: `view.name`, `view.url`, and `view.referrer`
- Renderer view events: `view.performance.lcp.resource_url`
- Errors: `error.message`, `error.stack`, `error.handling_stack`, `error.resource.url`, `error.fingerprint`, and `_dd.debug_ids`
- Resources: `resource.url`, GraphQL variables, request and response headers, and WebSocket close reasons and protocols
- Actions: `action.target.name`
- Long tasks: script source URLs, invokers, and `_dd.debug_ids`

All other fields, such as identifiers, session, and application, stay unchanged.

When you write the `beforeSendRum` callback, consider the following:

- The callback is synchronous. Keep it fast.
- Editable string fields must remain strings. To clear a field, set it to an empty string. Deleting a field or setting it to `null` or `undefined` is ignored.
- If the callback throws an error, the SDK logs the error and sends the event unchanged.
- The SDK does not detect personally identifiable information (PII) automatically.

Events from renderers go through the `beforeSend` callback of the [Browser SDK][ac-events-1] first, and then through `beforeSendRum` after the main process adds its context. Dropping a renderer event in `beforeSendRum` prevents its upload, but does not undo what the Browser SDK already counted or the activity the Electron SDK already recorded in the session.

[ac-events-1]: /real_user_monitoring/application_monitoring/browser/advanced_configuration/#modify-the-content-of-a-rum-event

## Global context

Attach custom attributes from the main process to all subsequent RUM events, including events from renderers.

```typescript
import {
  setGlobalContext,
  setGlobalContextProperty,
  removeGlobalContextProperty,
  clearGlobalContext,
  getGlobalContext,
} from '@datadog/electron-sdk';

setGlobalContext({ team: 'checkout', build: '1.2.3' });

// Update one attribute and leave the others untouched
setGlobalContextProperty('feature_flag', 'new-cart');
removeGlobalContextProperty('feature_flag');

// Read a copy of the current context
const context = getGlobalContext();

clearGlobalContext();
```

The SDK sends the attributes in the `context` field of each event. `setGlobalContext` replaces the whole context. To change a single attribute, use `setGlobalContextProperty`.

Renderers keep their own global context, set with `datadogRum.setGlobalContext` in the Browser SDK. The SDK merges both contexts on renderer events, and the renderer value wins on a key conflict.

## User and account information

Attach user and account identity to all subsequent RUM events and traces. The SDK propagates the identity to renderer events automatically.

```typescript
import {
  setUserInfo,
  clearUserInfo,
  addUserExtraInfo,
  setAccountInfo,
  clearAccountInfo,
  addAccountExtraInfo,
} from '@datadog/electron-sdk';

// On login
setUserInfo({ id: 'user-123', name: 'Alice', email: 'alice@example.com' });
setAccountInfo({ id: 'account-456', name: 'Acme Corp' });

// Add custom attributes
addUserExtraInfo({ plan: 'premium', role: 'admin' });
addAccountExtraInfo({ tier: 'enterprise', region: 'us' });

// Remove a custom attribute
addUserExtraInfo({ role: null });

// On logout
clearUserInfo();
clearAccountInfo();
```

- `setUserInfo` and `setAccountInfo` require an `id`. The SDK ignores `setUserInfo` calls without one and logs a warning.
- `addUserExtraInfo` merges attributes into the user `extraInfo`, and works even before `setUserInfo` is called. It ignores the standard fields `id`, `name`, and `email`.
- `addAccountExtraInfo` requires a prior `setAccountInfo` call. It ignores the standard fields `id` and `name`.
- Set an attribute to `null` to remove it.
- `getUserInfo` and `getAccountInfo` return a copy of the current value, or `undefined` if none is set.

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
- Call `setTrackingConsent` after `init` resolves. An earlier call can be ignored.
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

## Custom duration vitals

Record a duration you already know, or measure one between a start call and a stop call.

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

## Operation monitoring

Track the steps of critical user-facing workflows, such as login, checkout, or file upload, from start to success or failure. Datadog correlates the steps by `name` and optional `operationKey`, and shows them as one operation in RUM.

```typescript
import { startOperation, succeedOperation, failOperation } from '@datadog/electron-sdk';

startOperation('checkout');
try {
  await runCheckout();
  succeedOperation('checkout');
} catch (error) {
  failOperation('checkout', 'error');
}

// Parallel operations that share a name, distinguished by operationKey
startOperation('upload', { operationKey: 'profile_pic' });
startOperation('upload', { operationKey: 'cover_photo' });
succeedOperation('upload', { operationKey: 'profile_pic' });
failOperation('upload', 'abandoned', { operationKey: 'cover_photo' });
```

- `name` is required and can contain only letters, digits, `_`, `.`, `@`, `$`, and `-`.
- Pair every `startOperation` call with exactly one `succeedOperation` or `failOperation` call, using the same `name` and `operationKey`.
- `failOperation` takes a failure reason: `error`, `abandoned`, or `other`.
- All three functions accept the options `operationKey`, `context`, and `description`.
- In a renderer, use `@datadog/browser-rum` with the Browser SDK [operation monitoring][ac-operations-1] flag enabled in its `init` call. The signatures are the same, so you can start an operation in one process and complete it in the other.

[ac-operations-1]: /real_user_monitoring/operations_monitoring/
