---
title: Enable Dynamic Instrumentation for Node.js
aliases:
    - /tracing/dynamic_instrumentation/enabling/nodejs/
private: false
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 30
further_reading:
    - link: 'agent'
      tag: 'Documentation'
      text: 'Getting Started with Datadog Agent'
---

<div class="alert alert-info">
    <p><strong>Dynamic Instrumentation for Node.js is in limited preview</strong></p>
    <p>It is not available to all customers. To join the waiting list, <a href="https://forms.gle/TODO" target="_blank">fill out this form</a>.</p>
    <p>Certain limitations apply to the limited preview. See <a href="#limitations">Limitations</a> for more information.</p>
</div>

<div class="alert alert-warning">
    <p><strong>Dynamic Instrumentation for Node.js is in limited preview</strong></p>
    <p>It is not available to all customers. To join the waiting list, <a href="https://forms.gle/TODO" target="_blank">fill out this form</a>.</p>
    <p>Certain limitations apply to the limited preview. See <a href="#limitations">Limitations</a> for more information.</p>
</div>

{{< beta-callout url="https://forms.gle/TODO" >}}
    <p><strong>Dynamic Instrumentation for Node.js is in limited preview</strong></p>
    <p>It is not available to all customers. Request access to join the waiting list.</p>
    <p>Certain limitations apply to the limited preview. See <a href="#limitations">Limitations</a> for more information.</p>
{{< /beta-callout >}}

{{< beta-callout-private url="https://forms.gle/TODO" >}}
    <p><strong>Dynamic Instrumentation for Node.js is in limited preview</strong></p>
    <p>It is not available to all customers. Request access to join the waiting list.</p>
    <p>Certain limitations apply to the limited preview. See <a href="#limitations">Limitations</a> for more information.</p>
{{< /beta-callout-private >}}

{{< callout url="https://forms.gle/TODO">}}
    <p><strong>Dynamic Instrumentation for Node.js is in limited preview.</strong></p>
    <p>It is not available to all customers. Request access to join the waiting list.</p>
    <p>Certain limitations apply to the preview. See <a href="#limitations">Limitations</a> for more information.</p>
{{< /callout >}}

Dynamic Instrumentation is a feature of supporting Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, ensure your Agent and tracing library are on the required version. Then, go directly to enabling Dynamic Instrumentation in step 4.

## Installation

1. Install or upgrade your Agent to version [7.45.0][7] or higher.
2. If you don't already have APM enabled, in your Agent configuration, set the `DD_APM_ENABLED` environment variable to `true` and listening to the port `8126/TCP`.
3. Install or upgrade the Node.js tracing library to version 5.32.0 or higher, by following the [relevant instructions][2].
4. Run your service with Dynamic Instrumentation enabled by setting the `DD_DYNAMIC_INSTRUMENTATION_ENABLED` environment variable to `true`. Specify `DD_SERVICE`, `DD_ENV`, and `DD_VERSION` Unified Service Tags so you can filter and group your instrumentations and target active clients across these dimensions.
5. After starting your service with Dynamic Instrumentation enabled, you can start using Dynamic Instrumentation on the [APM > Dynamic Instrumentation page][3].

## Configuration

Configure Dynamic Instrumentation using the following environment variables:

| Environment variable                             | Type          | Description                                                                                                               |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `DD_DYNAMIC_INSTRUMENTATION_ENABLED`             | Boolean       | Set to `true` to enable Dynamic Instrumentation.                                                                          |
| `DD_SERVICE`                                     | String        | The [service][4] name, for example, `web-backend`.                                                                        |
| `DD_ENV`                                         | String        | The [environment][4] name, for example, `production`.                                                                     |
| `DD_VERSION`                                     | String        | The [version][4] of your service.                                                                                         |
| `DD_TAGS`                                        | String        | Tags to apply to produced data. Must be a list of `<key>:<value>` separated by commas such as: `layer:api,team:intake`.   |

## What to do next

See [Dynamic Instrumentation][5] for information about adding instrumentations and browsing and indexing the data.

## Limitations

Dynamic Instrumentation for Node.js is currently in limited preview, which means it is not available to all customers. To join the waiting list, [fill out this form][6].

The following limitations apply to the limited preview:

### Supported features

- [Dynamic Logs][8] attached to a specific file/line
- Capturing of variables for Dynamic Logs
- [PII redaction][9] based on variable/property names
- [Source code integration][10]

### Unsupported features

- Dynamic Metrics, Spans, and Span Tags
- Dynamic Logs attached to a function/method
- Custom template for Dynamic Logs
- Dynamic Log conditions
- Source maps (e.g. if using TypeScript, the Dynamic Log needs to be configured against the transpiled JavaScript file)
- PII redaction based on specific classes or types

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
[2]: /tracing/trace_collection/dd_libraries/nodejs/
[3]: https://app.datadoghq.com/dynamic-instrumentation
[4]: /getting_started/tagging/unified_service_tagging
[5]: /dynamic_instrumentation/
[6]: https://forms.gle/TODO
[7]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[8]: /dynamic_instrumentation/#creating-log-probes
[9]: /dynamic_instrumentation/sensitive-data-scrubbing/#custom-identifier-redaction
[10]: /integrations/guide/source-code-integration/?tab=nodejs#embed-git-information-in-your-build-artifacts
