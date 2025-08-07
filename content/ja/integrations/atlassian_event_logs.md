---
app_id: atlassian-event-logs
app_uuid: b2294505-ae3d-44d3-bbf2-174032e95be3
assets:
  dashboards:
    atlassian-event-logs: assets/dashboards/atlassian_organization_audit_logs.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 19256538
    source_type_name: Atlassian イベントログ
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- log collection
- security
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: atlassian_event_logs
integration_id: atlassian-event-logs
integration_title: Atlassian 組織監査ログ
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: atlassian_event_logs
public_title: Atlassian 組織監査ログ
short_description: 組織の Atlassian Guard サブスクリプションで管理者アクティビティを監視します
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Logs
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: 組織の Atlassian Guard サブスクリプションで管理者アクティビティを監視します
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Atlassian 組織監査ログ
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Atlassian [組織監査ログ][1]は、組織のグループ構成や製品アクセスに対して行われた管理者による変更を追跡します。このインテグレーションにより、Jira や Confluence 以外も含めた Atlassian 製品全体の管理者イベントを可視化できます。これらの管理アクションに加えて、より詳細な製品別のユーザーイベントを取得するために、**Jira & Confluence 監査レコード**のインテグレーションをインストールすることを推奨します。

このインテグレーションは、標準のログパイプラインを使用して [Cloud SIEM][2] の検出ルールを設定する際にも利用できます。

さらに、次の操作が行えます。
- Atlassian 製品のデータ保持期間を制御する。
- カスタムウィジェットやカスタムダッシュボードを構築する。
- 特定のアクションをトリガーする検出ルールを設定する。
- 他のサービスのデータと照合して、Atlassian 製品のイベントを相互参照する。

ログは Atlassian の[監査ログ API][1] を利用して収集され、以下の情報を記録します。

- **グループ管理**: グループの作成、削除、名称変更、ユーザーリストの変更。
- **グループアクセス設定**: グループの製品アクセスまたは管理アクセスの変更。アクセスロールの付与や取り消しが含まれます。
- **製品アクセス設定**: 招待設定の変更や、製品またはサイトのアクセス権を持つユーザーの管理。サードパーティアカウント招待の有効化・無効化や、API トークンの作成・取り消しなどが含まれます。

これらのログの詳細なプロパティについては、Atlassian の[監査ログを使用した組織アクティビティの追跡][3]を参照してください。組織が [Atlassian Guard Premium Tier][4] を利用している場合、ユーザーが作成したコンテンツや分類に関する追加の監査ログイベントが生成されることがあります。

`source:atlassian-event-logs` を検索すると、Datadog の[ログ管理製品][5]で Atlassian 組織監査ログを参照できます。


## セットアップ

1. Atlassian 組織監査ログのタイルから **Configure** タブを開き、**Add New** ボタンをクリックします。
2. Atlassian 組織監査ログのタイルに表示される手順に従い、**Atlassian Organization ID** と **API Bearer Token** を使用して認証します。

### 検証

Datadog の Log Explorer で `source:atlassian-event-logs` をクエリとして使用して検索します。インテグレーションが正しくインストールおよび認証されていれば、ログが間もなく反映されます。

## 収集データ

### メトリクス

Atlassian 組織監査ログにはメトリクスは含まれません。

### サービスチェック

Atlassian 組織監査ログにはサービスチェックは含まれません。

### イベント

Atlassian 組織監査ログにはイベントは含まれません。

### ログ

Atlassian 組織監査ログは監査ログを収集します。

## トラブルシューティング
#### レートリミット制限
管理アクティビティの多い組織では、API レートリミットに達する場合があります。現在の制限については、Atlassian の[監査ログ レートリミット][6]のドキュメントを参照してください。ログ取り込みの頻度が最大閾値に近い場合、それが原因でログが欠落している可能性があります。


ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。


[1]: https://developer.atlassian.com/cloud/admin/organization/rest/api-group-events/#api-v1-orgs-orgid-events-get
[2]: https://www.datadoghq.com/product/cloud-siem/
[3]: https://support.atlassian.com/organization-administration/docs/track-organization-activities-from-the-audit-log/
[4]: https://support.atlassian.com/organization-administration/docs/track-organization-activities-from-the-audit-log/#:~:text=Atlassian%20Guard%20Standard-,Atlassian%20Guard%20Premium,-Cloud%20Enterprise
[5]: https://docs.datadoghq.com/ja/logs/
[6]: https://developer.atlassian.com/cloud/admin/organization/rest/intro/#rate%20limits
[7]: https://docs.datadoghq.com/ja/help/