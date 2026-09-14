---
title: Envoy Gateway Compatibility Requirements
code_lang: envoy-gateway
type: multi-code-lang
code_lang_weight: 40
---

The following table lists App and API Protection capabilities for the Envoy Gateway integration according to the specified Datadog External Processor image version:

| App and API Protection capability              | Minimum Datadog External Processor image version  |
|------------------------------------------------|---------------------------------------------------|
| Threat Detection                               | v2.4.0                                            |
| Threat Protection                              | v2.4.0                                            |
| Customize response to blocked requests         | v2.4.0                                            |
| Non blocking asynchronous mode (observability) | not supported                                     |
| API Security                                   | v2.4.0                                            |
| App and API Protection Standalone              | v2.4.0                                            |
| Automatic user activity event tracking         | not supported                                     |

### Body processing support

The Datadog External Processor service supports the processing of request and response bodies for the following payload types:

| Payload type | Minimum Datadog External Processor image version  |
|--------------|---------------------------------------------------|
| JSON         | v2.4.0                                            |

## Envoy Gateway version support

### Supported Envoy Gateway versions

Envoy Gateway relies on Envoy Proxy and the Gateway API, and runs within a Kubernetes cluster. Datadog supports only non‑EOL Envoy Gateway versions; see the official [Envoy Gateway Compatibility Matrix][1] for the current list of supported versions and upstream dependencies (Envoy Proxy, Gateway API, Kubernetes).


### Envoy version support

The Datadog Envoy integration for App and API Protection relies on features that might not be present in every Envoy version. The following table shows which Envoy versions support each feature.

| Feature | Minimum Envoy version |
|---------|-----------------------|
| External Processing Filter | v1.27.0 |
| Observability mode | v1.30.0 |

## Datadog Envoy Gateway integration support

<div class="alert alert-info">The Datadog Envoy Gateway integration for App and API Protection is in Preview.</div>

Only the Linux version and both the amd64 and arm64 architectures are supported.

<div class="alert alert-info">If you would like to see support added for any of
the unsupported capabilities, let us know! Fill out <a
href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send
details</a>.</div>

[1]: https://gateway.envoyproxy.io/news/releases/matrix/
