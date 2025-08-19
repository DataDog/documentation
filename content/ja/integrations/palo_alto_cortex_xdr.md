---
app_id: palo-alto-cortex-xdr
app_uuid: 156afdc8-d8e9-4544-92fd-d8da87278671
assets:
  dashboards:
    Palo Alto Cortex XDR - Alerts: assets/dashboards/palo_alto_cortex_xdr_alerts.json
    Palo Alto Cortex XDR - Incidents: assets/dashboards/palo_alto_cortex_xdr_incidents.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 20766332
    source_type_name: Palo Alto Cortex XDR
  logs:
    source: palo-alto-cortex-xdr
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- security
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/palo_alto_cortex_xdr/README.md
display_on_public_website: true
draft: false
git_integration_title: palo_alto_cortex_xdr
integration_id: palo-alto-cortex-xdr
integration_title: Palo Alto Cortex XDR
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: palo_alto_cortex_xdr
public_title: Palo Alto Cortex XDR
short_description: Palo Alto Cortex XDR のログから洞察を得る
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Palo Alto Cortex XDR のログから洞察を得る
  media:
  - caption: Palo Alto Cortex XDR - インシデント
    image_url: images/palo_alto_cortex_xdr_incidents.png
    media_type: image
  - caption: Palo Alto Cortex XDR - アラート
    image_url: images/palo_alto_cortex_xdr_alerts.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Palo Alto Cortex XDR
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

[Palo Alto Cortex XDR][1] は、エンドポイント、ネットワーク、クラウド環境全体に高度な脅威保護を提供する包括的な検知・対応プラットフォームです。エンドポイント保護、ネットワーク セキュリティ、アナリティクスを統合し、リアルタイムの可視性と対応能力を提供して、高度なサイバー脅威に効果的に対処します。

このインテグレーションは、次のログを取り込みます:

- インシデント: 脅威イベントに関するアーティファクト、アセット、アラートの情報 (重大度、ステータス、対応ユーザーなど) を表します。
- アラート: アラートのリアルタイム分析 (重大度、頻度、発生源など) を表します。

Palo Alto Cortex XDR インテグレーションは、REST API を使用して Palo Alto Cortex XDR のログ データをシームレスに収集します。取り込み前にログを正規化および拡充し、データ形式を一貫させて、後続の処理や分析に役立つ情報量を高めます。インシデントとアラートに対する洞察は、すぐに使えるダッシュボードで提供されます。

## セットアップ

### Palo Alto Cortex XDR で API 資格情報を生成

1. **Palo Alto Cortex XDR** アカウントにログインします。
2. **Settings** > **Configurations** > **Integrations** > **API Keys** に移動します。
3. **New Key** をクリックします。
4. 希望するセキュリティ レベルに基づいて API キーの種類 (**Advanced** または **Standard**) を選択します。
5. API キー認証に有効期限を設定する場合は **Enable Expiration Date** を有効にし、**expiration date and time** を選択します。各 API キーの **Expiration Time** 設定は **Settings** > **Configurations** > **Integrations** > **API Keys** で確認できます。
6. 必要に応じて、この API キーの用途を説明するコメントを入力します。
7. 既存の **Roles** からこのキーのアクセス レベルを選択するか、**Custom** を選択して権限をきめ細かく設定します。
8. **Generate** をクリックして API キーを生成します。

### Palo Alto Cortex XDR の API キー ID を取得

1. API Keys テーブルで、ID フィールドを見つけます。
2. 対応する ID 番号を控えます。この値が **x-xdr-auth-id:{key_id}** トークンを表します。

### Palo Alto Cortex XDR の FQDN を取得

1. API キーを右クリックし、**View Examples** を選択します。
2. **CURL Example** の URL をコピーします。この例にあなた固有の **FQDN** が含まれています。

### Palo Alto Cortex XDR アカウントを Datadog に接続

1. Palo Alto Cortex XDR の認証情報を追加します。

    | パラメーター | 説明 |
    | -------------| ------------ |
    | API key | Palo Alto Cortex XDR の API キー。 |
    | API Key ID | Palo Alto Cortex XDR の認証 ID。 |
    | FQDN | Palo Alto Cortex XDR の FQDN。これは `baseUrl/public_api/v1/{name of api}/{name of call}/` の `baseUrl` 部分です。 |

2. 設定を保存するには **Save** ボタンをクリックします。

## 収集データ

### ログ

Palo Alto Cortex XDR インテグレーションは、Palo Alto Cortex XDR のインシデント ログとアラート ログを収集して Datadog に転送します。

### メトリクス

Palo Alto Cortex XDR インテグレーションには、メトリクスは含まれません。

### イベント

Palo Alto Cortex XDR インテグレーションには、イベントは含まれません。

## サポート

お困りですか? [Datadog サポート][2] にお問い合わせください。

[1]: https://docs-cortex.paloaltonetworks.com/p/XDR
[2]: https://docs.datadoghq.com/ja/help/