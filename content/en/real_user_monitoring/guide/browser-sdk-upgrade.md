---
title: Upgrade the Browser SDK
kind: guide
further_reading:
- link: '/real_user_monitoring/explorer'
  tag: 'Documentation'
  text: 'Visualize your RUM data in the Explorer'
- link: "https://www.datadoghq.com/blog/session-replay-datadog/"
  tag: "Blog"
  text: "Use Datadog Session Replay to view real-time user journeys"
---

This guide list all the migration steps between the different major versions of the Browser SDK.

## From v3 to v4

Several breaking changes were made to RUM and logs Browser SDK with the v4 version.

## Changes

### Intake URLs

We changed URLs of where the Browser SDK data is sent. Please make sure that your [Content Security Policy is up to date][6].

### Minimal Typescript version support

The Browser SDK is now incompatible with TypeScript below v3.8.2. If you are using TypeScript, please make sure that the version you are using is greater or equal to v3.8.2.

### Tags syntax

version, env and service initialization parameters are sent as tags to Datadog. The Browser SDK is now slightly sanitizes them (to ensure that they don't unexpectedly generate multiple tags) and prints a warning if those values don't meet the tag requirements syntax.

### Stricter initialization parameters typings

TypeScript types representing initialization parameters are now stricter and may reject previously accepted unsupported parameters. If you get typechecking issues, please make sure you are only providing supported initialization parameters.

### Privacy options precedence

When multiple privacy options are specified on the same element, we now apply the most restrictive one to avoid unexpectedly leaking privacy (ex: if both `dd-privacy-allow` and `dd-privacy-hidden` classes are specified on the same element, we now consider it hidden instead of allow).

### Action names computation

When computing automatic actions target name on elements without `data-dd-action-name` attribute, we are using the "inner text" of this element. If it contains some elements that specify `data-dd-action-name`, their text is now removed inside the ancestor inner text.
This might slightly change automatic action names shown in the Datadog App.

## Removals

### XHR `_datadog_xhr` field

The Browser SDK previously used a `_datadog_xhr` property on `XMLHttpRequest` objects representing its internal state. This property has been removed without replacement as it wasn't intended to be used externally.

### `proxyHost` initialization parameter

The `proxyHost` initialization parameter have been removed. Make sure to use the simpler `proxyUrl` initialization parameter instead.

### Privacy options support

`input-ignored` and `input-masked` are no longer valid privacy options and should be replaced with the `mask-user-input` privacy option. Specifically, you should replace:

* `dd-privacy-input-ignored` and `dd-privacy-input-masked` class names with `dd-privacy-mask-user-input`
* `dd-privacy="input-masked"` and `dd-privacy="input-ignored"` attribute values with `dd-privacy="mask-user-input"`

## From v2 to v3

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

[1]: /real_user_monitoring/session_replay
[2]: /real_user_monitoring/browser/collecting_browser_errors/
[3]: /real_user_monitoring/browser/monitoring_resource_performance/
[4]: /real_user_monitoring/browser/modifying_data_and_context/?tab=npm#enrich-and-control-rum-data
[5]: /real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
[6]: /real_user_monitoring/faq/content_security_policy
