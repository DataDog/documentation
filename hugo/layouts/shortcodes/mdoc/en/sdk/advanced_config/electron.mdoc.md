<!--
This partial contains advanced configuration instructions for the Electron SDK.
-->

If you haven't set up the Electron SDK yet, follow the [Electron setup instructions][ac-intro-1].

[ac-intro-1]: /real_user_monitoring/setup/install/?platform=electron

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

[ac-init-1]: #allowed-renderer-hosts
[ac-init-2]: /real_user_monitoring/setup/enable_rum/manage_data_collection/?platform=electron#tracking-consent
[ac-init-3]: /logs/log_collection/electron/
[ac-init-4]: /real_user_monitoring/enrich_rum_data/track_frontend_to_backend_traces/?platform=electron#trace-sampling-rules
[ac-init-5]: /session_replay/setup_and_configuration/?platform=electron
[ac-init-6]: /real_user_monitoring/enrich_rum_data/collect_frontend_profiles/?platform=electron
[ac-init-7]: /session_replay/privacy_options/?platform=electron
[ac-init-8]: /real_user_monitoring/enrich_rum_data/modify_or_drop_rum_events/?platform=electron

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

## Track operations

To track the steps of critical user-facing workflows, such as login or checkout, from the main process, use `startOperation`, `succeedOperation`, and `failOperation`. See [Track Critical Operations][ac-ops-1].

## Enrich RUM data

To add custom context, user information, and more to your RUM events, see [Enrich RUM Data][ac-ops-2].

[ac-ops-1]: /real_user_monitoring/track_critical_operations/
[ac-ops-2]: /real_user_monitoring/enrich_rum_data/
