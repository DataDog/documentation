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

Follow this guide to migrate between major versions of the RUM and logs Browser SDK.

## From v3 to v4

Several breaking changes were made to RUM and logs Browser SDK with the v4 version.

### Changes

#### Intake URLs

The URLs for where the Browser SDK data is sent has changed. Ensure that your [Content Security Policy is up to date][1].

#### Minimal Typescript version support

Browser SDK v4 is not compatible with TypeScript earlier than v3.8.2. If you use TypeScript, ensure that the version is at least v3.8.2.

#### Tags syntax

The `version`, `env`, and `service` initialization parameters are sent as tags to Datadog. The Browser SDK slightly sanitizes them, to ensure that they don't generate multiple tags, and prints a warning if those values don't meet the tag requirements syntax.

#### Stricter initialization parameters typing

TypeScript types representing initialization parameters are stricter and may reject previously accepted unsupported parameters. If you get type-checking errors, ensure you are providing supported initialization parameters.

#### Privacy options precedence

When multiple privacy options are specified on the same element, Datadog applies the most restrictive option to avoid unexpectedly leaking sensitive data. For example, if both `dd-privacy-allow` and `dd-privacy-hidden` classes are specified on the same element, it is hidden instead of allowed.

#### Action names computation

When computing action names, the Browser SDK removes text of child elements with the `data-dd-action-name` attribute from inner text.

For example, for the following `container` element, where previously the computed action name would be `Container sensitive data`, in v4 the computed action name is `Container`:
```html
<div id="container">
  Container
  <div data-dd-action-name="sensitive">sensitive data</div>
</div>
```


### Removals

#### XHR `_datadog_xhr` field

The Browser SDK previously used a `_datadog_xhr` property on `XMLHttpRequest` objects representing its internal state. This property has been removed without replacement as it wasn't intended to be used externally.

#### `proxyHost` initialization parameter

The `proxyHost` initialization parameter has been removed. Use the `proxyUrl` initialization parameter instead.

#### Privacy options support

The privacy options `input-ignored` and `input-masked` are no longer valid. Instead, use the `mask-user-input` privacy option. Specifically, replace:

* `dd-privacy-input-ignored` and `dd-privacy-input-masked` class names with `dd-privacy-mask-user-input`
* `dd-privacy="input-masked"` and `dd-privacy="input-ignored"` attribute values with `dd-privacy="mask-user-input"`

## From v2 to v3

Browser SDK v3 introduces [Session Replay][2]. With this major version update, several breaking changes were made to RUM and logs Browser SDKs.

### Changes
#### RUM errors

The RUM Browser SDK no longer issues [RUM errors][3] for failed XHR and Fetch calls. These failed network requests are still collected as [RUM resources][4], which contain the status code attribute.


To continue seeing the failed network requests as RUM errors, Datadog recommends intercepting the resource with the [beforeSend API][5], checking the `status_code` property, and manually sending an error with the [addError API][6].

```javascript
beforeSend: (event) => {
    if (event.type === 'resource' && event.resource.status_code >= 500) {
        datadogRum.addError(`${event.resource.method} ${event.resource.url} ${event.resource.status_code}`); // "GET https://www.example.com/ 504"
    }
}
```

#### RUM error source attribute

The RUM Browser SDK no longer lets you specify the source of an error collected with the [addError API][6]. All errors collected with this API have their source attribute set to `custom`. The [addError API][6] accepts a context object as its second parameter, which should be used to pass extra context about the error.

### Removals
#### RUM API

| Old API       | New API   |
| ------------- | --------- |
| addUserAction | addAction |

#### Initialization options

| Old options        | New options |
| ------------------ | ----------- |
| publicApiKey       | clientToken |
| datacenter         | site        |
| resourceSampleRate | NONE        |

#### TypeScript types

| Old types                    | New types                    |
| ---------------------------- | ---------------------------- |
| RumUserConfiguration         | RumInitConfiguration         |
| RumRecorderUserConfiguration | RumRecorderInitConfiguration |
| LogsUserConfiguration        | LogsInitConfiguration        |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/faq/content_security_policy
[2]: /real_user_monitoring/session_replay
[3]: /real_user_monitoring/browser/collecting_browser_errors/
[4]: /real_user_monitoring/browser/monitoring_resource_performance/
[5]: /real_user_monitoring/browser/modifying_data_and_context/?tab=npm#enrich-and-control-rum-data
[6]: /real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
