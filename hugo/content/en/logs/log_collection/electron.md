---
title: Electron Log Collection
description: Collect logs from the renderer processes of your Electron applications.
further_reading:
- link: https://github.com/DataDog/electron-sdk
  tag: "Source Code"
  text: Source code for electron-sdk
- link: /real_user_monitoring/application_monitoring/electron/
  tag: Documentation
  text: Electron Monitoring
- link: logs/explorer
  tag: Documentation
  text: Learn how to explore your logs
site_support_id: electron_log_collection
---

## Overview

Send logs to Datadog from the renderer processes of your Electron applications. The renderers use the Browser Logs SDK, and the [Electron SDK][1] in the main process uploads their logs.

<div class="alert alert-info">Log collection is not yet available in the main process. It is available in renderer processes only.</div>

## Setup

1. Set up the Electron SDK in the main process by following the [Electron setup instructions][2]. Logs go through the main process only for renderers listed in [`allowedRendererHosts`][3].

2. Install `@datadog/browser-logs` in your renderer bundle:

{{< tabs >}}
{{% tab "npm" %}}

```shell
npm install @datadog/browser-logs
```

{{% /tab %}}
{{% tab "Yarn" %}}

```shell
yarn add @datadog/browser-logs
```

{{% /tab %}}
{{< /tabs >}}

3. Initialize the Browser Logs SDK in each renderer page that collects logs:

   ```typescript
   import { datadogLogs } from '@datadog/browser-logs';

   datadogLogs.init({
     clientToken: '<CLIENT_TOKEN>',
     site: '<DATADOG_SITE>',
     service: '<SERVICE_NAME>',
     forwardErrorsToLogs: true,
   });
   ```

   The Browser Logs SDK detects the Electron SDK and sends its logs to the main process, which uploads them.

4. Send logs with the Browser Logs SDK logger API. For loggers, levels, context, and other options, see [Browser Log Collection][4].

## Sampling

Set the sampling of renderer logs with `logsSampleRate` in the main process `init` call. It defaults to `100` and applies independently to each log:

```typescript
await init({
  // ...
  logsSampleRate: 25, // forwards 25% of renderer logs
});
```

`logsSampleRate` is separate from the RUM `sessionSampleRate`. For renderers that send logs through the main process, the Browser Logs SDK ignores its own `sessionSampleRate`. Only `logsSampleRate` in the main process `init` call applies.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/electron-sdk
[2]: /real_user_monitoring/application_monitoring/electron/setup/
[3]: /real_user_monitoring/application_monitoring/electron/advanced_configuration/#allowed-renderer-hosts
[4]: /logs/log_collection/javascript/
