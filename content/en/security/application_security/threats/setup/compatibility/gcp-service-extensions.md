---
title: ASM GCP Service Extensions Compatibility Requirements
code_lang: gcp-service-extensions
type: multi-code-lang
code_lang_weight: 40
---

## Application Security capabilities support

The following application security capabilities are supported in the ASM GCP Service Extensions, for the specified version:

| Application Security capability        | Minimum ASM Service Extensions image version  |
|----------------------------------------|----------------------------------------------|
| Threat Detection                       | 1.71.0                                       |
| Threat Protection                      | 1.71.0                                       |
| Customize response to blocked requests | 1.71.0                                       |
| Software Composition Analysis (SCA)    | not applicable                               |
| Code Security                          | not applicable                               |
| Automatic user activity event tracking | not supported                                |
| API Security                           | not supported                                |

Please review ASM GCP Service Extensions integration version 1.71.0 [limitations][1].

## ASM GCP Service Extensions support

The usage of ASM GCP Service Extensions is in Preview.

<div class="alert alert-info">If you would like to see support added for any of
the unsupported capabilities, let us know! Fill out <a
href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send
details</a>.</div>

[1]: /security/application_security/threats/setup/threat_detection/gcp-service-extensions
