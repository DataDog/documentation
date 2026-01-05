---
title: Nginx Compatibility Requirements
code_lang: nginx
type: multi-code-lang
code_lang_weight: 40
---

## Code Security capabilities support

The following code security capabilities are supported in the nginx integration, for the
specified tracer version:

| Code Security capability               | Minimum nginx module version |
|----------------------------------------|------------------------------
| Software Composition Analysis (SCA)    | not applicable               |
| Runtime Code Analysis (IAST)           | not applicable               |

Please review nginx version 1.2.0 [limitations][1].

## Nginx support

The nginx module policy is to support nginx versions up to one year past their
end-of-life. Only Linux and the arm64 and amd64 architectures are supported.

<div class="alert alert-info">If you would like to see support added for any of
the unsupported capabilities, let us know! Fill out <a
href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send
details</a>.</div>

[1]: /security/application_security/setup/nginx
