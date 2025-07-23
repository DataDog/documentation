---
code_lang: nginx
code_lang_weight: 40
title: Nginx の互換性要件
type: multi-code-lang
---

## Application Security 機能サポート

指定されたトレーサーバージョンに対して、nginx インテグレーションでサポートされる Application Security 機能は以下のとおりです。

| Application Security 機能        | 最小 nginx モジュールバージョン |
|----------------------------------------|------------------------------|
| Threat Detection                       | 1.2.0                        |
| Threat Protection                      | 1.2.0                        |
| ブロックされたリクエストへの対応をカスタマイズする | 1.2.0                        |
| Software Composition Analysis (SCA)    | 該当なし               |
| コードセキュリティ                          | 該当なし               |
| ユーザーアクティビティイベントの自動追跡 | 非対応                |
| API セキュリティ                           | 非対応                |

nginx バージョン 1.2.0 の [制限事項][1]をご確認ください。

## Nginx のサポート 

nginx モジュールのポリシーは、終了 (EOL) から 1 年後までの nginx バージョンをサポート対象とすることです。サポート対象は Linux と arm64 および amd64 アーキテクチャのみです。

<div class="alert alert-info">サポートされていない機能のサポート追加をご希望の場合は、お知らせください！<a
href="https://forms.gle/gHrxGQMEnAobukfn7">この簡単なフォーム</a>にご記入ください。</div>

[1]: /ja/security/application_security/threats/setup/threat_detection/nginx