---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - セキュリティ
  - ログの収集
creates_events: false
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/lacework/README.md'
display_name: Lacework
draft: false
git_integration_title: lacework
guid: 545f8c45-038b-41e5-ae13-8550c0ee563f
integration_id: lacework
integration_title: Lacework
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: lacework.
metric_to_check: ''
name: lacework
public_title: Datadog-Lacework インテグレーション
short_description: Lacework は、すべてのクラウド環境に対応するセキュリティプラットフォームです
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Datadog-Lacework インテグレーションを使用して、Lacework のログとイベントを Datadog に転送します。

## セットアップ

すべての構成は、Lacework ダッシュボードで行われます。[Lacework のドキュメント][1]で設定方法の詳細を確認してください。Datadog は、Lacework のログを検出すると、適切なログ処理パイプラインを自動的に有効にします。

### インストール

1. Lacework で、_Settings_ に移動し、_Integrations_ を選択します。
2. _Outgoing_ セクション（左パネル）で、Datadog を選択します。
3. 次の詳細を入力します。

   - **Name**: インテグレーションの名前を入力します。例: `Datadog-Lacework`
   - **Datadog Type**: Datadog に送信されるログのタイプを選択します。

    | Datadog Type     | 説明                                                |
    | ---------------- | ---------------------------------------------------------- |
    | `Logs Details`   | Lacework の詳細ログを Datadog ログプラットフォームに送信します。 |
    | `Logs Summary`   | Lacework のサマリーを Datadog ログプラットフォームに送信します。     |
    | `Events Summary` | Lacework のサマリーを Datadog Events プラットフォームに送信します。   |

   - **Datadog Site**:
     - Datadog US リージョンを使用する場合は、`com` を選択します。
     - Datadog EU リージョンを使用する場合は、`eu` を選択します。
   - **API KEY**: [Datadog API キー][2]を入力します。
   - **Alert Security Level**: 転送されたログの最小ログ重大度レベルを選択します

## 収集データ

### メトリクス

この Lacework インテグレーションはメトリクスを収集しません

### サービスのチェック

この Lacework インテグレーションには、サービスのチェック機能は含まれません。

### ログ

Lacework は、ログを送信するように構成できます。

### イベント

Lacework は、イベントを送信するように構成できます。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://www.lacework.com/datadog/
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://docs.datadoghq.com/ja/help/