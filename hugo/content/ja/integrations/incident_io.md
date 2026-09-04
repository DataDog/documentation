---
app_id: incident-io
app_uuid: 95ee2e88-d2ee-45f8-a4d6-2cb9eced79ee
assets:
  dashboards:
    incident.io - Incidents Overview: assets/dashboards/incident-io_incidents_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 25431122
    source_type_name: incident.io
  logs:
    source: incident-io
  monitors:
    Critical public incident: assets/monitors/critical_public_incident.json
    High number of public incidents: assets/monitors/high_number_of_public_incidents.json
    Public incident reopened: assets/monitors/public_incident_reopened.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- logs-restriction-queries-update-a-restriction-query
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/incident_io/README.md
display_on_public_website: true
draft: false
git_integration_title: incident_io
integration_id: incident-io
integration_title: incident.io
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: incident_io
public_title: incident.io
short_description: incident.io からインシデント関連のアクティビティを把握できます。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Incidents
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: incident.io からインシデント関連のアクティビティを把握できます。
  media:
  - caption: incident.io - Incidents Overview 1
    image_url: images/incident-io_incidents_overview_1.png
    media_type: image
  - caption: incident.io - Incidents Overview 2
    image_url: images/incident-io_incidents_overview_2.png
    media_type: image
  - caption: incident.io - Incidents Overview 3
    image_url: images/incident-io_incidents_overview_3.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: incident.io
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

[incident.io][1] は、重要なインフラの停止からデータ侵害・セキュリティ インシデントまで、通常業務の流れを妨げる出来事に対して、宣言、共同作業、関係者への共有、振り返りを支援するサービスです。チームがインシデントや障害を効率よく管理できるよう、インシデントの報告、進捗の追跡、解決までのワークフローなどの機能を提供します。

incident.io アカウントを Datadog と連携すると、インシデント関連のアクティビティを把握できます。

## セットアップ

以下の手順に従って、Webhook を使って incident.io のインシデント イベント向けにこのインテグレーションを設定してください。

### 設定

#### Webhook 設定
Datadog エンドポイントを設定し、incident.io のインシデントに関するイベントをログとして Datadog に転送します。詳細は incident.io の [Webhook][2] ドキュメントをご確認ください。

1. 既存の API キーを選択するか、下のボタンのいずれかをクリックして新しい API キーを作成します: <!-- Datadog チームが追加する UI コンポーネント -->
2. 組織オーナーとして [incident.io アカウント][3] にログインします。
3. **Settings > Webhooks** に移動します。
4. **Add Endpoint** をクリックします。
5. 手順 1 で生成した Webhook URL を入力します。
6. **Subscribe to events** セクションで、Datadog に送信するインシデント イベントの種類を選択します。
7. **Create** をクリックします。

## 収集データ

### ログ
incident.io インテグレーションは次のログを取り込みます:
- 公開インシデントのイベント ログ
- 非公開インシデントのイベント ログ
- アクションとフォローアップのイベント ログ

### メトリクス

incident.io には、メトリクスは含まれません。

### サービスチェック

incident.io には、サービス チェックは含まれません。

### イベント

incident.io には、イベントは含まれません。

## サポート

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://incident.io/
[2]: https://api-docs.incident.io/tag/Webhooks/
[3]: https://app.incident.io/
[4]: https://docs.datadoghq.com/ja/help/