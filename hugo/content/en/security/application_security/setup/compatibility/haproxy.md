---
title: HAProxy Compatibility Requirements
code_lang: haproxy
type: multi-code-lang
code_lang_weight: 40
---

{{< site-region region="gov" >}}
<div class="alert alert-info">
{{< prodname >}}App and API Protection{{< /prodname >}} is in Preview on Datadog Government site US1-FED.
</div>
{{< /site-region >}}

The following table lists {{< prodname >}}App and API Protection{{< /prodname >}} capabilities for the HAProxy integration according to the specified Datadog HAProxy SPOA image version:

| App and API Protection capability              | Minimum Datadog HAProxy SPOA image version |
|------------------------------------------------|--------------------------------------------|
| Threat Detection                               | v2.4.0                                     |
| Threat Protection                              | v2.4.0                                     |
| Customize response to blocked requests         | v2.4.0                                     |
| Non blocking asynchronous mode (observability) | not supported                              |
| API Security                                   | v2.4.0                                     |
| App and API Protection Standalone              | v2.4.0                                     |
| Automatic user activity event tracking         | not supported                              |

### Body processing support

The Datadog HAProxy SPOA supports the processing of request and response bodies for the following payload types:

| Payload type | Minimum Datadog HAProxy SPOA image version |
|--------------|--------------------------------------------|
| JSON         | v2.4.0                                     |

## HAProxy version support

The Datadog HAProxy integration for {{< prodname >}}App and API Protection{{< /prodname >}} relies on features that might not be present in every HAProxy version. The following table shows which HAProxy versions support each feature.

| Feature | Minimum HAProxy version |
|---------|-----------------------|
| SPOE | v2.4.0 |

## Datadog HAProxy integration support

All currently supported (non-EOL) HAProxy versions are compatible and supported with the Datadog App and API Protection integration.

<div class="alert alert-info">The Datadog HAProxy integration for {{< prodname >}}App and API Protection{{< /prodname >}} is in Preview.</div>

Please refer to the [limitations][1] of the Datadog App and API Protection HAProxy integration.

[1]: /security/application_security/setup/haproxy


