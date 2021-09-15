---
title: Upgrade the Browser SDK to V3
kind: guide
further_reading:
- link: '/real_user_monitoring/explorer'
  tag: 'Documentation'
  text: 'Visualize your RUM data in the Explorer'
- link: "https://www.datadoghq.com/blog/session-replay-datadog/"
  tag: "Blog"
  text: "Use Datadog Session Replay to view real-time user journeys"
---

## Overview

Browser SDK v3 introduces [Session Replay][1]. With this major version update, several breaking changes were made to RUM and logs Browser SDKs.

## Changes
### RUM errors

The RUM Browser SDK no longer issues [RUM errors][2] for failed XHR and Fetch calls. These failed network requests are still collected as [RUM resources][3], which contain the status code attribute.


To continue seeing the failed network requests as RUM errors, Datadog recommends intercepting the resource with the [beforeSend API][4], checking the `status_code` property, and manually sending an error with the [addError API][5].

```javascript
beforeSend: (event) => {
    if (event.type === 'resource' && event.resource.status_code >= 500) {
        datadogRum.addError(`${event.resource.method} ${event.resource.url} ${event.resource.status_code}`); // "GET https://www.example.com/ 504"
    }
}
```

### RUM error source attribute

The RUM Browser SDK no longer lets you specify the source of an error collected with the [addError API][5]. All errors collected with this API have their source attribute set to `custom`. The [addError API][5] accepts a context object as its second parameter, which should be used to pass extra context about the error.

## Removals
### RUM API

| Old API       | New API   |
| ------------- | --------- |
| addUserAction | addAction |

### Initialization options

| Old options        | New options |
| ------------------ | ----------- |
| publicApiKey       | clientToken |
| datacenter         | site        |
| resourceSampleRate | NONE        |

### TypeScript types

| Old types                    | New types                    |
| ---------------------------- | ---------------------------- |
| RumUserConfiguration         | RumInitConfiguration         |
| RumRecorderUserConfiguration | RumRecorderInitConfiguration |
| LogsUserConfiguration        | LogsInitConfiguration        |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/guide/session-replay-getting-started/
[2]: /real_user_monitoring/browser/collecting_browser_errors/
[3]: /real_user_monitoring/browser/monitoring_resource_performance/
[4]: /real_user_monitoring/browser/modifying_data_and_context/?tab=npm#enrich-and-control-rum-data
[5]: /real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
