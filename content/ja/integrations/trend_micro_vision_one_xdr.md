---
app_id: trend-micro-vision-one-xdr
app_uuid: 5efb1591-f9ef-45a3-8b8e-9f716df68f16
assets:
  dashboards:
    Trend Micro Vision One XDR - Observed Attack Techniques: assets/dashboards/trend_micro_vision_one_xdr_observed_attack_techniques.json
    Trend Micro Vision One XDR - Workbench Alerts: assets/dashboards/trend_micro_vision_one_xdr_workbench_alerts.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 22902543
    source_type_name: Trend Micro Vision One XDR
  logs:
    source: trend-micro-vision-one-xdr
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
- https://github.com/DataDog/integrations-core/blob/master/trend_micro_vision_one_xdr/README.md
display_on_public_website: true
draft: false
git_integration_title: trend_micro_vision_one_xdr
integration_id: trend-micro-vision-one-xdr
integration_title: Trend Micro Vision One XDR
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: trend_micro_vision_one_xdr
public_title: Trend Micro Vision One XDR
short_description: Trend Micro Vision One XDR のログからインサイトを得る
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Trend Micro Vision One XDR のログからインサイトを得る
  media:
  - caption: Trend Micro Vision One XDR - Workbench Alerts
    image_url: images/trend_micro_vision_one_xdr_workbench_alerts.png
    media_type: image
  - caption: Trend Micro Vision One XDR - Observed Attack Techniques
    image_url: images/trend_micro_vision_one_xdr_oat.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Trend Micro Vision One XDR
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 概要

[Trend Micro Vision One XDR][1] は、メール、エンドポイント、サーバー、クラウド ワークロード、ネットワークといった複数のセキュリティ レイヤーにわたるデータを収集し、自動的に相関付けます。これにより、脅威の検出が高速化され、セキュリティ分析の向上によって調査とレスポンスの時間が短縮されます。

このインテグレーションは次のログを取り込みます。

- **Workbench Alerts**: このエンドポイントには、検出モデルによってトリガーされた単独のアラートのすべての情報が含まれます。
- **Observed Attack Techniques**: このエンドポイントには、データ ソースである Detections、Endpoint Activity、Cloud Activity、Email Activity、Mobile Activity、Network Activity、Container Activity、Identity Activity から観測された攻撃テクニックに関する情報が含まれます。

このインテグレーションは、上記のソースからログを収集し、Datadog に送信して Log Explorer と Cloud SIEM 製品で分析します
* [Log Explorer][2]
* [Cloud SIEM][3]

## セットアップ

### Trend Micro Vision One XDR で API 資格情報を生成する

1. Trend Vision One コンソールで、左側のサイドバー メニューから **Administration > API Keys** に移動します。
2. 新しい認証トークンを生成します。**Add API key** をクリックします。新しい API キーの設定を次のように指定します:
    - **Name**: API キーを識別しやすい意味のある名前
    - **Role**: キーに割り当てるユーザー ロール。ドロップダウンから **SIEM** を選択します。
    - **Expiration time**: API キーの有効期限
    - **Status**: API キーが有効かどうか
    - **Details**: API キーに関する追加情報
3. **Add** をクリックします。
4. Trend Micro Vision One XDR コンソールの Host Region を特定するには、[こちら][4] を参照してください。

### Trend Micro Vision One XDR アカウントを Datadog に接続する

1. Host Region と API Key を追加します。
    | パラメーター  | 説明                                             |
    | ----------- | ------------------------------------------------------- |
    | Host Region | Trend Micro Vision One XDR コンソールのリージョン。 |
    | API Key | Trend Micro Vision One XDR コンソールの API Key。 |

2. Save ボタンをクリックして設定を保存します。

## 収集データ

### ログ
Trend Micro Vision One XDR インテグレーションは、Workbench Alerts および Observed Attack Techniques のログを収集して Datadog に転送します。

### メトリクス

Trend Micro Vision One XDR にはメトリクスは含まれません。

### サービスチェック

Trend Micro Vision One XDR にはサービス チェックは含まれません。

### イベント

Trend Micro Vision One XDR にはイベントは含まれません。

## サポート

詳細なサポートが必要な場合は、[Datadog サポート][5] にお問い合わせください。

[1]: https://www.trendmicro.com/en_in/business/products/detection-response/xdr.html
[2]: https://docs.datadoghq.com/ja/logs/explorer/
[3]: https://www.datadoghq.com/product/cloud-siem/
[4]: https://success.trendmicro.com/en-US/solution/ka-0015959
[5]: https://docs.datadoghq.com/ja/help/