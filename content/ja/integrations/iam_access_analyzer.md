---
app_id: iam-access-analyzer
app_uuid: 13a88901-3d20-43b3-9a3c-3b20b2adf1cc
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: iam_access_analyzer.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10081
    source_type_name: AWS IAM Access Analyzer
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- セキュリティ
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/iam_access_analyzer/README.md
display_on_public_website: true
draft: false
git_integration_title: iam_access_analyzer
integration_id: iam-access-analyzer
integration_title: AWS IAM Access Analyzer
integration_version: ''
is_public: true
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
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: AWS IAM Access Analyzer は、一般にアクセス可能なリソースを特定します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AWS IAM Access Analyzer
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Use AWS Identity and Access Management (IAM) Access Analyzer across your Amazon account to continuously analyze IAM permissions granted with any of your account policies. Datadog integrates with Amazon IAM Access Analyzer using a Lambda function that ships its findings as logs to Datadog.

## セットアップ

### ログ収集

1. [Datadog Forwarder][1] Lambda 関数をまだセットアップしていない場合は、セットアップします。

2. Create a new rule with type `Rule with an event pattern` in AWS EventBridge.

3. For the event source configuration, select `Other`. For `Creation method`, select `Custom pattern (JSON editor)`. For `Event pattern`, copy and paste the following JSON:

    ```json
    {
        "source": ["aws.access-analyzer"]
    }
    ```

4. Select `AWS service` to use as the target type. Select `Lambda function` as the target and select the Datadog Forwarder Lambda or enter the ARN.

5. 規則を保存します。

6. AWS Access Analyzer が実行されて結果が出ると、`source:access-analyzer` でタグ付けされた Datadog Lambda Forwarder によってイベントが拾われます。ログを確認するには、[ログエクスプローラー][2]をご覧ください。

## 収集データ

### メトリクス

このインテグレーションには、メトリクスは含まれません。

### サービスチェック

このインテグレーションには、サービスのチェック機能は含まれません。

### Logs

This integration can be configured to send logs.

### イベント

このインテグレーションには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: /ja/logs/guide/forwarder/
[2]: https://app.datadoghq.com/logs?query=source%3Aaccess-analyzer
[3]: https://docs.datadoghq.com/ja/help
