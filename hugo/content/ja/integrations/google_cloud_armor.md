---
app_id: google-cloud-armor
app_uuid: a48ba755-80f5-4d7d-bcde-2239af983021
assets:
  dashboards:
    google-cloud-armor: assets/dashboards/google_cloud_armor_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - gcp.networksecurity.https.request_count
      metadata_path: metadata.csv
      prefix: gcp.networksecurity.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10410
    source_type_name: Google Cloud Armor
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- Google Cloud
- network
- security
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_cloud_armor
integration_id: google-cloud-armor
integration_title: Google Cloud Armor
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_armor
public_title: Google Cloud Armor
short_description: Datadog で Google Cloud Armor のメトリクス、イベント、ログを確認する
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Google Cloud
  - Category::Network
  - Category::Security
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Submitted Data Type::Events
  - Offering::Integration
  configuration: README.md#Setup
  description: Datadog で Google Cloud Armor のメトリクス、イベント、ログを確認する
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/network-attacks-google-cloud-armor/
  support: README.md#Support
  title: Google Cloud Armor
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

[Google Cloud Armor][1] は、分散型サービス拒否 (DDoS) 攻撃や、クロス サイト スクリプティング (XSS) や SQL インジェクション (SQLi) のようなアプリケーション攻撃を含む、複数の脅威から Google Cloud デプロイメントを保護するのに役立ちます。

Armor の Managed Protection は、インターネットからの分散型 DDoS 攻撃やその他の脅威から Web アプリケーションやサービスを保護するためのマネージドなアプリケーション保護サービスです。Managed Protection にはロード バランサー向けの常時オンの保護機能が含まれ、WAF ルールへのアクセスを提供します。

Google Cloud Armor は Security Command Center と自動的に統合され、Security Command Center のダッシュボードに Allowed Traffic Spike と Increasing Deny Ratio の 2 つのファインディングをエクスポートします。

Google Cloud の Security Command Center インテグレーションと併せてこのインテグレーションを有効化すると、Datadog で Google Cloud 環境に対する DDoS 脅威を可視化できます。このインテグレーションにより、Datadog は Google Cloud のネットワーク セキュリティ構成からの重要なセキュリティ イベントと、Google Cloud Armor のメトリクスを収集します。

このインテグレーションは、監査ログからリクエスト ログまで、クラウド リソースの変更に関するユーザー アクティビティや、セキュリティ ポリシーで評価された各リクエストへの可視性を提供します。


## セットアップ

### インストール

1. 開始する前に、Google Cloud Armor のイベントを収集するプロジェクトで、次の API が有効になっていることを確認してください:
* [Cloud Resource Manager API][2]
* [Google Cloud Billing API][3]
* [Google Cloud Monitoring API][4]
* [Google Cloud Security Command Center API][5]

2. Google Cloud Armor のイベントは Google Security Command Center にファインディングとして連携されるため、Google Cloud コンソールの Security Command Center で Google Cloud Armor が有効になっていることを確認してください。詳細は [Security Command Center の構成][6] を参照してください。

3. 次に、[メインの Google Cloud Platform インテグレーション][7] でセキュリティ ファインディングの収集を有効にします。

### 構成

Google Cloud Armor のメトリクスを収集するには、メインの Google Cloud インテグレーションを構成します。

Google Cloud Armor のイベントを収集するには、サービス アカウントに Security Center Findings Viewer ロールを追加する必要があります。
Google Cloud Security Command Center インテグレーションをインストールし、メインの Google Cloud インテグレーションでセキュリティ ファインディングの収集を有効にしてください。

Google Cloud 環境から Datadog へのログ フォワーディングを設定するには、[ログ 収集][8] セクションを参照してください。

監査ログは、標準のログ フォワーディングで転送できます。これらの監査ログは、Google Cloud のリソース タイプ `gce_backend_service` および `network_security_policy` を使用します。監査ログのみを含めるには、ログ シンクの作成時に `protoPayload.@type="type.googleapis.com/google.cloud.audit.AuditLog"` などのフィルターを使用します。

リクエスト ログは、標準のログ フォワーディングで転送できます。これらのログは Google Cloud Load Balancing のログに自動的に収集されます。セキュリティ ポリシーで拒否されたリクエストを表示するには、ログ シンクの作成時に `jsonPayload.enforcedSecurityPolicy.outcome="DENY"` などのフィルターを使用します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "google_cloud_armor" >}}


### サービス チェック

Google Cloud Armor インテグレーションにはサービス チェックは含まれていません。

### イベント

Google Cloud Armor インテグレーションにはイベントは含まれていません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## 参考資料

その他の有用なドキュメント、リンク、記事:

- [Google Cloud Armor と Datadog でネットワーク攻撃を監視する][11]

[1]: https://app.datadoghq.com/integrations/google-cloud-armor
[2]: https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com
[3]: https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com
[4]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[5]: https://console.cloud.google.com/apis/library/securitycenter.googleapis.com
[6]: https://console.cloud.google.com/security/command-center/overview
[7]: https://app.datadoghq.com/integrations/google-cloud-platform
[8]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#log-collection
[9]: https://github.com/DataDog/integrations-internal-core/blob/main/google_cloud_armor/metadata.csv
[10]: https://docs.datadoghq.com/ja/help/
[11]: https://www.datadoghq.com/blog/network-attacks-google-cloud-armor/