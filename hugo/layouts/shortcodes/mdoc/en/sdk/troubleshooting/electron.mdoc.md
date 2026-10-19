<!--
This partial contains troubleshooting content for the Electron SDK.
It can be included in the Electron SDK troubleshooting page or in the unified client_sdks view.
-->

## Overview

If you experience unexpected behavior with the Datadog Electron SDK, use this guide to resolve issues. If you continue to have trouble, contact [Datadog Support][1] for further assistance.

## Runtime issues

### Browser windows opened before `init` use default settings

If you call `init` after some windows are already open, for example behind a user-consent gate, those windows use the default settings, such as the `mask` privacy level, until you reload them. The SDK applies `allowedRendererHosts` to renderer events only after `init` runs.

To fix this, wait for `init` to complete before you create any browser window, as described in [Initialize the SDK in the main process][2]. If a window must open earlier, reload it after `init` completes.

### Renderer events are missing

The main process only accepts events from renderers whose host is listed in `allowedRendererHosts`. Renderers whose host is not listed do not report through the main process. Their Browser SDK runs on its own, so their events are not part of the application's sessions.

To fix this, add the host of your renderer pages to `allowedRendererHosts`. For custom protocols, use the hostname component of the URL. For example, use `myapp` for `app://myapp/index.html`. See [Allowed renderer hosts][3] for the supported patterns.

Also verify that the [Browser SDK is set up][4] in the pages loaded by the renderer.

### A custom duration vital never stops

The SDK records a duration vital only when `startDurationVital` and `stopDurationVital` run in the same process. A vital started in the main process cannot be stopped in a renderer process, and the reverse.

To fix this, start and stop the vital in the same process. In renderer processes, use the equivalent `@datadog/browser-rum` APIs directly. See [Custom duration vitals][5].

### Some events are not dropped by `beforeSendRum`

Only returning `false` from `beforeSendRum` discards an event, and view events and crash events cannot be discarded. Any other return value keeps the event.

To fix this, return `false` for events that can be dropped, and modify the editable fields of the other events instead. See [Modify or drop RUM events][6].

[1]: /help
[2]: /real_user_monitoring/application_monitoring/electron/setup/#initialize-the-sdk-in-the-main-process
[3]: /real_user_monitoring/application_monitoring/electron/advanced_configuration/#allowed-renderer-hosts
[4]: /real_user_monitoring/application_monitoring/browser/setup/
[5]: /real_user_monitoring/application_monitoring/electron/advanced_configuration/#custom-duration-vitals
[6]: /real_user_monitoring/application_monitoring/electron/advanced_configuration/#modify-or-drop-rum-events
