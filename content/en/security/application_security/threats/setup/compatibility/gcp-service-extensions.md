---
title: AAP GCP Service Extensions Compatibility Requirements
code_lang: gcp-service-extensions
type: multi-code-lang
code_lang_weight: 40
---

The following table lists the support for application security capabilities in the AAP GCP Service Extensions according to the specified version:

| Application Security capability        | Minimum AAP Service Extensions image version  |
|----------------------------------------|----------------------------------------------|
| Threat Detection                       | 1.71.0                                       |
| Threat Protection                      | 1.71.0                                       |
| Customize response to blocked requests | 1.71.0                                       |
| Software Composition Analysis (SCA)    | not applicable                               |
| Code Security                          | not applicable                               |
| Automatic user activity event tracking | not supported                                |
| API Security                           | not supported                                |

Please review AAP GCP Service Extensions integration version 1.71.0 [limitations][1].

## AAP GCP Service Extensions support

AAP GCP Service Extensions is in Preview.

<div class="alert alert-info">If you would like to see support added for any of
the unsupported capabilities, let us know! Fill out <a
href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send
details</a>.</div>

[1]: /security/application_security/threats/setup/threat_detection/gcp-service-extensions
