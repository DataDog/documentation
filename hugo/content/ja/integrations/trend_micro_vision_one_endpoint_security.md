---
app_id: trend-micro-vision-one-endpoint-security
app_uuid: 107091d5-4e2d-4592-b197-af848e5abf67
assets:
  dashboards:
    Trend Micro Vision One Endpoint Security - Data Loss Prevention: assets/dashboards/trend_micro_vision_one_endpoint_security_data_loss_prevention.json
    Trend Micro Vision One Endpoint Security - Network Events: assets/dashboards/trend_micro_vision_one_endpoint_security_network_events.json
    Trend Micro Vision One Endpoint Security - Overview: assets/dashboards/trend_micro_vision_one_endpoint_security_overview.json
    Trend Micro Vision One Endpoint Security - System Events: assets/dashboards/trend_micro_vision_one_endpoint_security_system_events.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 22213943
    source_type_name: Trend Micro Vision One Endpoint Security
  logs:
    source: trend-micro-vision-one-endpoint-security
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
- https://github.com/DataDog/integrations-core/blob/master/trend_micro_vision_one_endpoint_security/README.md
display_on_public_website: true
draft: false
git_integration_title: trend_micro_vision_one_endpoint_security
integration_id: trend-micro-vision-one-endpoint-security
integration_title: Trend Micro Vision One Endpoint Security
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: trend_micro_vision_one_endpoint_security
public_title: Trend Micro Vision One Endpoint Security
short_description: Trend Micro Vision One Endpoint Security のログからインサイトを得る
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Trend Micro Vision One Endpoint Security のログからインサイトを得る
  media:
  - caption: Trend Micro Vision One Endpoint Security - Overview
    image_url: images/trend_micro_vision_one_endpoint_security_overview.png
    media_type: image
  - caption: Trend Micro Vision One Endpoint Security - System Events
    image_url: images/trend_micro_vision_one_endpoint_security_system_events.png
    media_type: image
  - caption: Trend Micro Vision One Endpoint Security - Network Events
    image_url: images/trend_micro_vision_one_endpoint_security_network_events.png
    media_type: image
  - caption: Trend Micro Vision One Endpoint Security - Data Loss Prevention
    image_url: images/trend_micro_vision_one_endpoint_security_data_loss_prevention.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Trend Micro Vision One Endpoint Security
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 概要

[Trend Micro Vision One Endpoint Security][1] は、エンドポイント、サーバ、クラウド ワークロード向けに設計されたクラウド ベースのソリューションです。

このインテグレーションは、次のログを取り込みます:

- アプリケーション コントロール: アプリケーション コントロールのログは、違反した Security Agent ポリシーや条件など、ネットワーク上のアプリケーション コントロール違反に関する情報を提供します。
- アタック ディスカバリ: アタック ディスカバリのログは、Attack Discovery によって検出された脅威に関する情報を提供します。
- ビヘイビア モニタリング: ビヘイビア モニタリングのログは、ネットワーク上の Behavior Monitoring イベントに関する情報を提供します。
- C&C コールバック: C&C コールバックのログは、ネットワーク上で検出された C&C コールバック イベントに関する情報を提供します。
- コンテンツ違反: コンテンツ違反のログは、コンテンツ違反があるメール メッセージに関する情報 (違反を検出した管理対象製品、送信者と受信者、コンテンツ違反ポリシー名、検出された違反の総数など) を提供します。
- データ ロス プリベンション: データ ロス プリベンションのログは、Data Loss Prevention によって検出されたインシデントに関する情報を提供します。
- デバイス コントロール: デバイス アクセス コントロール イベントに関する情報を提供します。
- 侵入防御: 既知およびゼロデイ攻撃に対するタイムリーな防御、Web アプリケーション脆弱性への対策、ネットワークにアクセスする悪意のあるソフトウェアの特定に役立つ情報を提供します。
- ネットワーク コンテンツ インスペクション: ネットワーク上のコンテンツ違反に関する情報を提供します。
- プレディクティブ マシン ラーニング: プレディクティブ マシン ラーニングによって検出された高度な未知の脅威に関する情報を提供します。
- スパイウェア/グレーウェア: スパイウェア/グレーウェアのログは、ネットワーク上で検出されたスパイウェア/グレーウェアに関する情報 (検出した管理対象製品、スパイウェア/グレーウェア名、感染したエンドポイント名など) を提供します。
- 不審ファイル情報: ネットワーク上で検出された不審ファイルに関する情報を提供します。
- Virtual Analyzer 検出: Virtual Analyzer によって検出された高度な未知の脅威に関する情報を提供します。
- ウイルス/マルウェア: ウイルス/マルウェアのログは、ネットワーク上で検出されたウイルス/マルウェアに関する情報 (検出した管理対象製品、ウイルス/マルウェア名、感染したエンドポイントなど) を提供します。
- Web 違反: Web 違反のログは、ネットワーク上の Web 違反に関する情報を提供します。

すぐに使えるダッシュボードを使用して、システム イベント、ネットワーク イベント、データ ロス プリベンション イベント、セキュリティの検知と観測、コンプライアンス監視に関する詳細なインサイトを得られます。

## セット アップ

### Trend Micro Vision One Endpoint Security で API 資格情報を生成

1. Trend Micro Vision One コンソールにログインします。
2. **Endpoint Security** (Sidebar) > **Standard Endpoint Protection** > **Administration** > **Settings** > **Automation API Access Settings** に移動します。
3. **Add** をクリックします。<br> Application Access Settings セクションが表示され、次の情報が表示されます:
   1. **API URL**: Trend Micro Vision One Endpoint Security コンソールの API ホスト。
   2. **Application ID**: Trend Micro Vision One Endpoint Security コンソールのアプリケーション ID。
   3. **API key**: Trend Micro Vision One Endpoint Security コンソールの API キー。
4. **Enable application integration using Apex Central Automation APIs** チェック ボックスをオンにします。
5. 次の設定を構成します。
   1. **Application name**: アプリケーションを容易に識別できる名前を指定します。
   2. **Communication time-out**: アプリケーションがリクエストを生成してから Apex Central に到達するまでの時間として 120 seconds を選択します。
6. **Save** をクリックします。

### Trend Micro Vision One コンソールの Time Zone を取得

1. Trend Micro Vision One コンソールにログインします。
2. **Administration** (Sidebar) > **Console Settings** > **Time Zone** に移動します。
3. **Current console time** の **Timezone** を確認します。

### Trend Micro Vision One Endpoint Security アカウントを Datadog に接続

1. API ホスト、アプリケーション ID、API キーを追加し、ドロップ ダウンから Time Zone を選択します。
   | パラメータ | 説明 |
   | -------------- | ----------------------------------------------------------------------- |
   | API Host | Trend Micro Vision One Endpoint Security コンソールの API ホスト。 |
   | Application ID | Trend Micro Vision One Endpoint Security コンソールのアプリケーション ID。 |
   | API Key | Trend Micro Vision One Endpoint Security コンソールの API キー。 |
   | Time Zone | Trend Micro Vision One コンソールの Time Zone。 |

2. **Save** ボタンをクリックして設定を保存します。

## 収集データ

### ログ

Trend Micro Vision One Endpoint Security インテグレーションは、システム イベント、ネットワーク イベント、データ ロス プリベンション イベントを含むセキュリティ イベントを収集し、Datadog に転送します。

### メトリクス

Trend Micro Vision One Endpoint Security インテグレーションにはメトリクスは含まれません。

### イベント

Trend Micro Vision One Endpoint Security インテグレーションにはイベントは含まれません。

## サポート

追加のサポートが必要な場合は [Datadog サポート][2] までお問い合わせください。

[1]: https://www.trendmicro.com/en_in/business/products/endpoint-security.html
[2]: https://docs.datadoghq.com/ja/help/