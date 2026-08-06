---
app_id: sophos-central-cloud
app_uuid: 7293cd88-ceda-4094-94cd-09851f203f0e
assets:
  dashboards:
    Sophos Central Cloud - Alerts: assets/dashboards/sophos_central_cloud_alerts.json
    Sophos Central Cloud - Events: assets/dashboards/sophos_central_cloud_events.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 18598661
    source_type_name: Sophos Central Cloud
  logs:
    source: sophos-central-cloud
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
- https://github.com/DataDog/integrations-core/blob/master/sophos_central_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: sophos_central_cloud
integration_id: sophos-central-cloud
integration_title: Sophos Central Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: sophos_central_cloud
public_title: Sophos Central Cloud
short_description: Sophos Central Cloud のアラート ログとイベント ログから洞察を得られます。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Sophos Central Cloud のアラート ログとイベント ログから洞察を得られます。
  media:
  - caption: Sophos Central Cloud - アラート
    image_url: images/sophos_central_cloud_alerts.png
    media_type: image
  - caption: Sophos Central Cloud - イベント
    image_url: images/sophos_central_cloud_events.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Sophos Central Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

[Sophos Central][1] は、脅威から組織を監視・保護するための統合型、クラウド ベースの管理プラットフォームです。あらゆる規模の企業で、Sophos 製品スイートを単一の管理ソリューションへ集約する目的で利用されています。

このインテグレーションは、次のログを取り込みます:

- アラート: Sophos Central Cloud がセキュリティ イベントや潜在的な脅威に応答して生成する通知または警告を表します。あらかじめ定義されたセキュリティ ポリシーや検知ルール、Sophos Central Cloud によって識別された異常なアクティビティに基づいてトリガーされます。
- イベント: Sophos Central Cloud によって検出・記録される特定の事象を表します。マルウェア 検知、不正アクセス 試行、システムの脆弱性、その他のセキュリティ関連アクティビティなどが含まれます。

Sophos Central Cloud インテグレーションは、上記のログをシームレスに収集し、Datadog に取り込みます。組み込みのログ パイプラインを活用してログをパースおよびエンリッチし、容易に検索・分析できるようにします。さらに、アラートとイベントについては組み込み ダッシュボードで可視化できます。加えて、**get_endpoint_details** フラグにより、アラート ログおよびイベント ログに対応するエンドポイントの詳細情報が付加されます。

## セットアップ

### Sophos Central Cloud で API 資格情報を生成する

1. [**Sophos Central アカウント**][2] にログインします。
2. Sophos Central Admin で、**My Products** > **General Settings** > **API Credentials Management** に移動します。
3. **Add Credential** をクリックします。
4. 資格情報名を入力し、適切なロールを選択し、必要に応じて説明を追加して、**Add** ボタンをクリックします。クライアント ID を含む API 資格情報のサマリー ページが表示されます。
5. **Show Client Secret** をクリックして **Client Secret** を表示します。

### Sophos Central Cloud アカウントを Datadog に接続する

1. Sophos Central Cloud の資格情報を追加します。

    | パラメータ | 説明 |
    | ------------------------------- | -------------------------------------------------------------------------- |
    | Client ID | Sophos Central Cloud の Client ID です。 |
    | Client Secret | Sophos Central Cloud の Client Secret です。 |
    | Get Endpoint Details | Sophos Central Cloud のアラート ログおよびイベント ログのエンドポイントの詳細を収集するには、既定値の "true" のままにします。収集しない場合は "false" に設定します。 |

2. **Save** ボタンをクリックして設定を保存します。

## 収集データ

### ログ

このインテグレーションは、Sophos Central Cloud のアラート ログおよびイベント ログを収集し、Datadog に転送します。

### メトリクス

Sophos Central Cloud インテグレーションにメトリクスは含まれません。

### イベント

Sophos Central Cloud インテグレーションにイベントは含まれません。

## サポート

お困りの場合は [Datadog サポート][3] までお問い合わせください。

[1]: https://www.sophos.com/en-us/products/sophos-central
[2]: https://cloud.sophos.com/manage/login
[3]: https://docs.datadoghq.com/ja/help/