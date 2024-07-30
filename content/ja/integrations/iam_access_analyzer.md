---
app_id: iam-access-analyzer
app_uuid: 13a88901-3d20-43b3-9a3c-3b20b2adf1cc
assets:
  integration:
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: iam_access_analyzer.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: AWS IAM Access Analyzer
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- security
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/iam_access_analyzer/README.md
display_on_public_website: true
draft: false
git_integration_title: iam_access_analyzer
integration_id: iam-access-analyzer
integration_title: AWS IAM Access Analyzer
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: iam_access_analyzer
public_title: AWS IAM Access Analyzer
short_description: AWS IAM Access Analyzer は、一般にアクセス可能なリソースを特定します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: AWS IAM Access Analyzer は、一般にアクセス可能なリソースを特定します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AWS IAM Access Analyzer
---



## 概要

Amazon アカウント全体で AWS Identity and Access Management (IAM) Access Analyzer 使用し、アカウントポリシーで付与された IAM アクセス許可を継続的に分析します。Datadog はログを Datadogに送信する Lambda 関数を使い、Amazon IAM Access Analyzer と統合します。

## セットアップ

### ログの収集

1. [Datadog Forwarder][1] Lambda 関数をまだセットアップしていない場合は、セットアップします。

2. AWS EventBridge で新しい規則を作成します。

3. 以下を使用し、カスタムイベントパターンを定義します。

    ```json
    {
        "source": ["aws.access-analyzer"]
    }
    ```

4. イベントバスを選択し、Datadog Lambda 関数をターゲットとして定義します。

5. 規則を保存します。

6. [ログエクスプローラー][2]を参照して、ログを確認します。

## 収集データ

### メトリクス

このインテグレーションはメトリクスを収集しません

### サービスのチェック

このインテグレーションには、サービスのチェック機能は含まれません。

### ログ管理

このインテグレーションは、ログを送信するように構成できます。

### イベント

このインテグレーションは、イベントを送信しません

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: /ja/logs/guide/forwarder/
[2]: https://app.datadoghq.com/logs
[3]: https://docs.datadoghq.com/ja/help