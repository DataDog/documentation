---
title: Nginx Compatibility Requirements
kind: documentation
code_lang: nginx
type: multi-code-lang
code_lang_weight: 40
---

## Application Security capabilities support

The following application security capabilities are supported in the nginx integration, for the
specified tracer version:

| Application Security capability        | Minimum nginx module version |
|----------------------------------------|------------------------------|
| Threat Detection                       | 1.2.0                        |
| Threat Protection                      | 1.2.0                        |
| Customize response to blocked requests | 1.2.0                        |
| Software Composition Analysis (SCA)    | not applicable               |
| Code Security (beta)                   | not applicable               |
| Automatic user activity event tracking | not supported                |
| API Security                           | not supported                |

Please review nginx version 1.2.0 [limitations][1].

## Nginx support

The nginx module policy is to support nginx versions up to one year past their
end-of-life. Only Linux and the arm64 and amd64 architectures are supported.

<div class="alert alert-info">If you would like to see support added for any of
the unsupported capabilities, let us know! Fill out <a
href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send
details</a>.</div>

[1]: /security/application_security/enabling/tracing_libraries/threat_detection/nginx/#limitations
