---
aliases:
- /ja/security/application_security/threats/setup/compatibility/nginx
code_lang: nginx
code_lang_weight: 40
title: Nginx Compatibility Requirements
type: multi-code-lang
---

## App and API Protection 機能サポート

指定した tracer バージョンの NGINX インテグレーションでは、次の App and API Protection 機能を利用できます:

| App and API Protection 機能        | Minimum nginx module version |
|----------------------------------------|------------------------------|
| Threat Detection                       | 1.2.0                        |
| Threat Protection                      | 1.3.0                        |
| ブロックされたリクエストへの対応をカスタマイズする | 1.3.0                        |
| ユーザーアクティビティイベントの自動追跡 | 非対応                |
| API セキュリティ                           | 非対応                |

nginx バージョン 1.3.0 の [制限事項][1]をご確認ください。

## Nginx support

The nginx module policy is to support nginx versions up to one year past their
end-of-life. Only Linux and the arm64 and amd64 architectures are supported.

<div class="alert alert-info">If you would like to see support added for any of
the unsupported capabilities, let us know! Fill out <a
href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send
details</a>.</div>

[1]: /ja/security/application_security/setup/nginx/