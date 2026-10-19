<!--
This partial contains advanced configuration instructions for the Electron SDK.
-->

If you haven't set up the Electron SDK yet, follow the [Electron setup instructions][1].

## Initialization parameters

Pass these parameters to `init` in the main process.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `clientToken` | `string` | Yes | | Datadog client token. |
| `applicationId` | `string` | Yes | | RUM application ID. |
| `site` | `string` | Yes | | Datadog site, for example `datadoghq.com`, `datadoghq.eu`, `us3.datadoghq.com`, `us5.datadoghq.com`, `ap1.datadoghq.com`, or `ap2.datadoghq.com`. |
| `service` | `string` | Yes | | Service name. |
| `allowedRendererHosts` | `string[]` | Yes | | Hostnames of the renderers allowed to report through the main process. See [Allowed renderer hosts](#allowed-renderer-hosts). |
| `env` | `string` | No | | Application environment. |
| `version` | `string` | No | | Application version. |
| `sessionSampleRate` | `number` | No | `100` | Percentage of sessions to collect, from `0` to `100`. `0` collects no sessions, and `100` collects all sessions. |
| `logsSampleRate` | `number` | No | `100` | Percentage of renderer logs to forward, from `0` to `100`, sampled independently for each log. |
| `traceSampleRate` | `number` | No | `100` | Percentage of main process traces to keep when no `traceSamplingRules` rule matches, from `0` to `100`. |
| `traceSamplingRules` | `TraceSamplingRule[]` | No | `[]` | Ordered sampling rules for main process traces. See [Trace sampling rules](#trace-sampling-rules). |
| `sessionReplaySampleRate` | `number` | No | `0` | Percentage of sampled sessions that record Session Replay, from `0` to `100`. `0` disables Session Replay. |
| `profilingSampleRate` | `number` | No | `0` | Percentage of sampled sessions that are profiled, from `0` to `100`. `0` disables renderer profiling. |
| `defaultPrivacyLevel` | `'mask' \| 'allow' \| 'mask-user-input'` | No | `'mask'` | Default privacy level for Session Replay in renderers. |
| `batchSize` | `'SMALL' \| 'MEDIUM' \| 'LARGE'` | No | `'MEDIUM'` | Size threshold that closes a batch file early: `SMALL` is 16 KiB, `MEDIUM` is 512 KiB, and `LARGE` is 4 MiB. |
| `uploadFrequency` | `'RARE' \| 'NORMAL' \| 'FREQUENT'` | No | `'NORMAL'` | How often the SDK uploads pending batches, and the window over which events accumulate: `RARE` is 30 seconds, `NORMAL` is 10 seconds, and `FREQUENT` is 5 seconds. |
| `beforeSendRum` | `RumBeforeSend` | No | | Modify or drop RUM events before they are sent. See [Modify or drop RUM events](#modify-or-drop-rum-events). |

{% alert level="info" %}
`sessionReplaySampleRate` and `profilingSampleRate` apply to sampled sessions only. With `sessionSampleRate: 0`, no session records Session Replay or is profiled.
{% /alert %}

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
| `name` | No | Matches the root span operation name. |
| `resource` | No | Matches the root span resource, such as `GET /health` for a network request. |
| `tags` | No | Matches root span tags by name and value. Every configured tag must match. |

<!-- TODO(resync): confirm name/resource examples at v1.0.0 -->

Patterns are case-insensitive globs. Child spans inherit the decision of their root span.

```typescript
await init({
  // ...
  traceSamplingRules: [{ tags: { 'http.url': '*/health' }, sampleRate: 0 }],
});
```

## Modify or drop RUM events

Use `beforeSendRum` to modify or drop RUM events from the main process and from renderers before the SDK sends them to Datadog. The callback receives the event and an object with the `source` of the event, either `main` or a renderer.

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

Return `false` to drop an event. Any other return value keeps the event. View events and crash events cannot be dropped.

You can modify the following fields:

- All events: `context`, `service`, `version`, and `execution_context.name`
- Renderer events: `view.name`, `view.url`, and `view.referrer`
- Renderer view events: `view.performance.lcp.resource_url`
- Errors: `error.message`, `error.stack`, `error.handling_stack`, `error.resource.url`, `error.fingerprint`, and `_dd.debug_ids`
- Resources: `resource.url`, GraphQL variables, request and response headers, and WebSocket close reasons and protocols
- Actions: `action.target.name`
- Long tasks: script source URLs, invokers, and `_dd.debug_ids`

All other fields, such as identifiers, session, and application, stay unchanged.

- The callback is synchronous. Keep it fast.
- Editable string fields must remain strings. To clear a field, set it to an empty string. Deleting a field or setting it to `null` or `undefined` is ignored.
- If the callback throws an error, the SDK logs the error and sends the event unchanged.
- The SDK does not detect personally identifiable information (PII) automatically.

Events from renderers go through the `beforeSend` callback of the [Browser SDK][2] first, and then through `beforeSendRum` after the main process adds its context. Dropping a renderer event in `beforeSendRum` prevents its upload, but does not undo what the Browser SDK already counted or the activity the Electron SDK already recorded in the session.

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

<!-- TODO(resync): confirm the Operation monitoring signatures at v1.0.0 -->

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
- In a renderer, use `@datadog/browser-rum` with the Browser SDK [operation monitoring][3] flag enabled in its `init` call. The signatures are the same, so you can start an operation in one process and complete it in the other.

[1]: /real_user_monitoring/application_monitoring/electron/setup
[2]: /real_user_monitoring/application_monitoring/browser/advanced_configuration/#modify-the-content-of-a-rum-event
[3]: /real_user_monitoring/operations_monitoring/
