---
title: Envoy Compatibility Requirements
code_lang: envoy
type: multi-code-lang
code_lang_weight: 40
aliases:
  - /security/application_security/threats/setup/compatibility/envoy
---

The following table lists App and API Protection capabilities for the Envoy integration according to the specified Datadog External Processor image version:

| App and API Protection capability              | Minimum Datadog External Processor image version  |
|------------------------------------------------|---------------------------------------------------|
| Threat Detection                               | v1.71.0                                           |
| Threat Protection                              | v1.71.0                                           |
| Customize response to blocked requests         | v1.71.0                                           |
| Non blocking asynchronous mode (observability) | v2.1.0                                            |
| API Security                                   | v2.2.2                                            |
| App and API Protection Standalone              | v2.2.2                                            |
| Automatic user activity event tracking         | not supported                                     |

### Body processing support

The Datadog External Processor service supports the processing of request and response bodies for the following payload types:

| Payload type | Minimum Datadog External Processor image version  |
|--------------|---------------------------------------------------|
| JSON         | v2.2.2                                            |

## Envoy version support

The Datadog Envoy integration for App and API Protection relies on features that might not be present in every Envoy version. The following table shows which Envoy versions support each feature.

| Feature | Minimum Envoy version |
|---------|-----------------------|
| External Processing Filter | v1.27.0 |
| Observability mode | v1.30.0 |

## Datadog Envoy integration support

<div class="alert alert-info">The Datadog Envoy integration for App and API Protection is in Preview.</div>

Only the Linux version and both the arm64 and arm64 architectures are supported.

<div class="alert alert-info">If you would like to see support added for any of
the unsupported capabilities, let us know! Fill out <a
href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send
details</a>.</div>
