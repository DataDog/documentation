---
app_id: confluent-cloud-audit-logs
app_uuid: c74afba8-201e-4ea4-9cd1-5607fb908949
assets:
  dashboards:
    Confluent-Cloud-Audit-Logs-Overview: assets/dashboards/confluent-cloud-audit-logs-overview-dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: true
    source_type_id: 21251477
    source_type_name: Confluent Cloud Audit Logs
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- security
- log collection
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: confluent_cloud_audit_logs
integration_id: confluent-cloud-audit-logs
integration_title: Confluent Cloud Audit Logs
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: confluent_cloud_audit_logs
public_title: Confluent Cloud Audit Logs
short_description: Confluent Cloud リソースの監査ログを収集します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Security
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: Confluent Cloud リソースの監査ログを収集します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Confluent Cloud Audit Logs
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要
このインテグレーションにより、[Confluent Cloud Audit Logs][1] を収集して Confluent アカウント内のアクティビティを把握できます。

これにより、次のことが可能になります。

- Confluent Cloud リソースへのアクセスを追跡し、誰が行ったかを属性付けする
- 異常または不審なアクティビティを特定する
- セキュリティ リスクを能動的に監視し、解決する

Datadog Confluent Cloud Audit Logs インテグレーションは、Confluent Cloud の監査ログ トピックからイベントを収集し、ログとして Datadog に取り込みます。すべての監査ログ イベント タイプを確認するには、[Confluent Cloud 監査可能イベント メソッド スキーマ][2] を参照してください。

`source:confluent-cloud-audit-logs` で検索すると、Datadog の [Logs Management プロダクト][3] で Confluent Cloud Audit Logsを表示できます。

## セットアップ

### インストール

[Confluent の監査ログ設定手順][4] を参照してください。このドキュメントには Java のコード スニペットが含まれていますが、タイルの設定に必要な値をコピーするだけでかまいません。

1. Confluent CLI を使用して、監査ログ クラスター用の API キーと API シークレットのペアを生成します。監査ログを取り込むには [OrganizationAdmin][5] 権限が必要です。
2. `bootstrap.servers` 文字列をコピーします。
3. [インテグレーション タイル][6] に API キー、API トークン、および `bootstrap.servers` 文字列を入力します。
4. 「Save」をクリックします。

Confluent Cloud Audit Logsは 5 分以内に自動で取り込みが開始されるはずです。


## 収集データ

### メトリクス

Confluent Cloud Audit Logs にはメトリクスは含まれていません。

### サービス チェック

Confluent Cloud Audit Logs にはサービス チェックは含まれていません。

### ログ

Confluent Cloud Audit Logs は Confluent Cloud の [confluent-audit-log-events][2] トピックからデータを収集します。

## トラブルシューティング

お困りの場合は [Datadog サポート][7] までお問い合わせください。

[1]: https://docs.confluent.io/cloud/current/monitoring/audit-logging/cloud-audit-log-concepts.html
[2]: https://docs.confluent.io/cloud/current/monitoring/audit-logging/event-methods/index.html
[3]: https://docs.datadoghq.com/ja/logs/
[4]: https://docs.confluent.io/cloud/current/monitoring/audit-logging/configure.html#consume-with-java
[5]: https://docs.confluent.io/cloud/current/security/access-control/rbac/predefined-rbac-roles.html#organizationadmin-role
[6]: https://app.datadoghq.com/integrations/cloudflare
[7]: https://docs.datadoghq.com/ja/help/