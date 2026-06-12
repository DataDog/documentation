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
custom_kind: インテグレーション
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

Amazon アカウント全体で AWS Identity and Access Management (IAM) Access Analyzer を使用して、アカウント内のいずれかのポリシーによって付与された IAM アクセス許可を継続的に分析します。Datadog は、検出結果をログとして Datadog に送信する Lambda 関数を使用して、Amazon IAM Access Analyzer と統合します。

## セットアップ

### ログ収集

1. [Datadog Forwarder][1] Lambda 関数をまだセットアップしていない場合は、セットアップします。

2. Amazon EventBridge で、タイプ `Rule with an event pattern` を指定して新しいルールを作成します。

3. イベント ソースの設定では、`Other` を選択します。`Creation method` では、`Custom pattern (JSON editor)` を選択します。`Event pattern` には、次の JSON をコピーして貼り付けます:

    ```json
    {
        "source": ["aws.access-analyzer"]
    }
    ```

4. ターゲット タイプとして `AWS service` を選択します。ターゲットとして `Lambda function` を選択し、Datadog Forwarder Lambda を選択するか、ARN を入力します。

5. 規則を保存します。

6. AWS Access Analyzer が実行されて結果が出ると、`source:access-analyzer` でタグ付けされた Datadog Lambda Forwarder によってイベントが拾われます。ログを確認するには、[ログエクスプローラー][2]をご覧ください。

## 収集データ

### メトリクス

このインテグレーションには、メトリクスは含まれません。

### サービスチェック

このインテグレーションには、サービスのチェック機能は含まれません。

### Logs

このインテグレーションは、ログを送信するように構成できます。

### イベント

このインテグレーションには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[2]: https://app.datadoghq.com/logs?query=source%3Aaccess-analyzer
[3]: https://docs.datadoghq.com/ja/help