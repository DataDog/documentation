---
title: App and API Protection GCP Service Extensions Compatibility Requirements
code_lang: gcp-service-extensions
type: multi-code-lang
code_lang_weight: 40
aliases:
  - /security/application_security/threats/setup/compatibility/gcp-service-extensions
---

The following table lists App and API Protection capabilities for GCP Service Extensions according to the specified Datadog Service Extensions callout image version:

| App and API Protection capability        | Minimum App and API Protection Service Extensions callout image version  |
|------------------------------------------|--------------------------------------------------------------------------|
| Threat Detection                         | 1.71.0                                                                   |
| Threat Protection                        | 1.71.0                                                                   |
| Customize response to blocked requests   | 1.71.0                                                                   |
| API Security                             | v2.2.2                                                                   |
| App and API Protection Standalone        | v2.2.2                                                                   |
| Automatic user activity event tracking   | not supported                                                            |

Please refer to the [limitations][1] of the App and API Protection GCP Service Extensions integration.

### Body processing support

The Datadog Service Extensions callout supports the processing of request and response bodies for the following payload types:

| Payload type | Minimum App and API Protection Service Extensions callout image version  |
|--------------|--------------------------------------------------------------------------|
| JSON         | v2.2.2                                                                   |

## App and API Protection GCP Service Extensions support

<div class="alert alert-info">App and API Protection GCP Service Extensions is in Preview.</div>

<div class="alert alert-info">If you would like to see support added for any of
the unsupported capabilities, let us know! Fill out <a
href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send
details</a>.</div>

[1]: /security/application_security/setup/gcp/service-extensions