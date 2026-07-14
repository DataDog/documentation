---
code_lang: nginx
code_lang_weight: 40
title: Nginx Compatibility Requirements
type: multi-code-lang
---

## Code Security capabilities support

指定されたトレーサー バージョンでは、nginx インテグレーションでサポートされるコード セキュリティ機能は以下のとおりです:

| Code Security capability               | Minimum nginx module version |
|----------------------------------------|------------------------------
| ソフトウェア構成分析 (SCA)    | not applicable               |
| Runtime Code Analysis (IAST)           | not applicable               |

Please review nginx version 1.2.0 [limitations][1].

## Nginx support

The nginx module policy is to support nginx versions up to one year past their
end-of-life. Only Linux and the arm64 and amd64 architectures are supported.

<div class="alert alert-info">If you would like to see support added for any of
the unsupported capabilities, let us know! Fill out <a
href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send
details</a>.</div>

[1]: /ja/security/application_security/setup/nginx