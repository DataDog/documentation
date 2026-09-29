---
aliases:
- /ja/security/application_security/threats/setup/compatibility/gcp-service-extensions
code_lang: gcp-service-extensions
code_lang_weight: 40
title: App and API Protection GCP Service Extensions 互換性要件
type: multi-code-lang
---
次のテーブルは、指定された Datadog Service Extensions コールアウトイメージバージョンに応じた、GCP Service Extensions 向けの App and API Protection 機能の一覧です。

| App and API Protection 機能        | 最小 App and API Protection Service Extensions コールアウトイメージバージョン  |
|------------------------------------------|--------------------------------------------------------------------------|
| Threat Detection                         | 1.71.0                                                                   |
| Threat Protection                        | 1.71.0                                                                   |
| ブロックされたリクエストへの対応をカスタマイズする   | 1.71.0                                                                   |
| API セキュリティ                             | v2.2.2                                                                   |
| App and API Protection Standalone        | v2.2.2                                                                   |
| ユーザーアクティビティイベント自動追跡   | サポート対象外                                                            |

App and API Protection GCP Service Extensions 統合の[制限事項][1]を参照してください。

### ボディ処理サポート {#body-processing-support}

Datadog Service Extensions コールアウトは、以下のペイロードタイプのリクエストボディおよびレスポンスボディの処理をサポートしています。

| ペイロードタイプ | 最小 App and API Protection Service Extensions コールアウトイメージバージョン  |
|--------------|--------------------------------------------------------------------------|
| JSON         | v2.2.2                                                                   |

## App and API Protection GCP Service Extensions サポート {#app-and-api-protection-gcp-service-extensions-support}

<div class="alert alert-info">App and API Protection GCP Service Extensions はプレビュー版です。</div>

<div class="alert alert-info">サポート対象外の機能についてサポートの追加をご希望の場合は、
お知らせください。<a
href="https://forms.gle/gHrxGQMEnAobukfn7">個のショートフォームに入力して、詳細を送信してください
</a>.</div>

[1]: /ja/security/application_security/setup/gcp/service-extensions