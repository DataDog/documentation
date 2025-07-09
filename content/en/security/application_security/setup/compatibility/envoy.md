---
title: Envoy Compatibility Requirements
code_lang: envoy
type: multi-code-lang
code_lang_weight: 40
aliases:
  - /security/application_security/threats/setup/compatibility/envoy
---

The following table lists the support for App and API Protection capabilities in the Envoy integration according to the specified tracer version:

| App and API Protection capability        | Minimum Envoy image version  |
|----------------------------------------|------------------------------|
| Threat Detection                       | 1.71.0                       |
| Threat Protection                      | 1.71.0                       |
| Customize response to blocked requests | 1.71.0                       |
| Automatic user activity event tracking | not supported                |
| API Security                           | not supported                |

Please review Envoy integration version 1.71.0 [limitations][1].

## Envoy support

Envoy integration is in Preview.

Only the Linux version and both the arm64 and arm64 architectures are supported.

<div class="alert alert-info">If you would like to see support added for any of
the unsupported capabilities, let us know! Fill out <a
href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send
details</a>.</div>

[1]: /security/application_security/setup/envoy
