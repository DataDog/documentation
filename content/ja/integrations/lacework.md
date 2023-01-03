---
app_id: lacework
app_uuid: e23af0ca-003e-4b3d-b6c5-24894b710750
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: lacework.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Lacework
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 不明
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- セキュリティ
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/lacework/README.md
display_on_public_website: true
draft: false
git_integration_title: lacework
integration_id: lacework
integration_title: Lacework
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: lacework
oauth: {}
public_title: Lacework
short_description: Lacework は、すべてのクラウド環境に対応するセキュリティプラットフォームです
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Security
  - Category::Log Collection
  configuration: README.md#Setup
  description: Lacework は、すべてのクラウド環境に対応するセキュリティプラットフォームです
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Lacework
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

Lacework インテグレーションはメトリクスを収集しません。

### サービスのチェック

Lacework インテグレーションには、サービスのチェック機能は含まれません。

### ログの収集

Lacework インテグレーションは、ログを送信するように構成できます。

### イベント

Lacework インテグレーションは、イベントを送信するように構成できます。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://www.lacework.com/datadog/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.datadoghq.com/ja/help/