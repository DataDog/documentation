---
app_id: forcepoint-secure-web-gateway
app_uuid: 183f1ae8-8bc0-4135-8b17-e6ff2b449f9c
assets:
  dashboards:
    Forcepoint Secure Web Gateway - Overview: assets/dashboards/forcepoint_secure_web_gateway_overview.json
    Forcepoint Secure Web Gateway - Web DLP Logs: assets/dashboards/forcepoint_secure_web_gateway_web_dlp_logs.json
    Forcepoint Secure Web Gateway - Web Logs: assets/dashboards/forcepoint_secure_web_gateway_web_logs.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 36227438
    source_type_name: Forcepoint Secure Web Gateway
  logs:
    source: forcepoint-secure-web-gateway
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
- https://github.com/DataDog/integrations-core/blob/master/forcepoint_secure_web_gateway/README.md
display_on_public_website: true
draft: false
git_integration_title: forcepoint_secure_web_gateway
integration_id: forcepoint-secure-web-gateway
integration_title: Forcepoint Secure Web Gateway
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: forcepoint_secure_web_gateway
public_title: Forcepoint Secure Web Gateway
short_description: Forcepoint Secure Web Gateway のログを分析して状況を把握できます
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Forcepoint Secure Web Gateway のログを分析して状況を把握できます
  media:
  - caption: Forcepoint Secure Web Gateway - Overview
    image_url: images/forcepoint_secure_web_gateway_overview.png
    media_type: image
  - caption: Forcepoint Secure Web Gateway - Web DLP Logs
    image_url: images/forcepoint_secure_web_gateway_web_dlp_logs.png
    media_type: image
  - caption: Forcepoint Secure Web Gateway - Web Logs
    image_url: images/forcepoint_secure_web_gateway_web_logs.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Forcepoint Secure Web Gateway
---

<!-- SOURCED FROM https://github.com/DataDog/integrations-core -->
## 概要

[Forcepoint Secure Web Gateway][1] は、クラウド上またはエンドポイントで Web セキュリティ ポリシーを適用し、分散型の制御によって、従業員がどこにいても安全かつ高速に Web へアクセスできるようにします。さらに、高度なデータ漏えい防止 (DLP) 機能により、機密情報が Web サイトに漏えいするのを防ぎます。



このインテグレーションは次のログを取り込みます:

- **Web Logs**: ユーザーの一般的な Web トラフィックから生成されるログ。
- **Web DLP Logs**: データ漏えい防止 (DLP) ポリシーのアクションによって生成されるログ。


Forcepoint Secure Web Gateway インテグレーションはこれらのログを収集して Datadog に転送し、スムーズな分析を実現します。Datadog の組み込みログ パイプラインがログをパースして情報を付加するため、高度な検索や詳細なインサイトが得られます。事前設定済みのすぐに使えるダッシュボードにより、Web アクティビティを可視化できます。さらに、監視とセキュリティを強化するための Cloud SIEM 検知ルールもすぐに利用できます。


## セットアップ

### Forcepoint Secure Web Gateway 用の OAuth トークンを生成する
1. Forcepoint ONE Security Service Edge Platform にログインします。
2. **SETTINGS > API Interface > OAuth** に移動します。
3. **REST API OAuth Configuration** ページが開きます。このページでは、API 権限を複数のレベルで追加・設定できます。
4. 新しい設定を追加するには、緑色のプラス アイコンをクリックします。
5. **Edit Application** ダイアログで、次の項目を入力します:

    a. **Name**: 新しいアプリケーション設定の名前を入力します。

    b. **Permissions**: **Access your Forcepoint logs (logs api)** を選択します。

    c. **Permitted User Groups**: 必要な設定を選択します。既定は **All** です。

    d. **OK** をクリックして変更を保存します。アプリケーションが一覧に追加されますが、ステータスはまだ **Pending** のままです。
6. **Application** 列でアプリケーション名を選択して、**Edit Application** ダイアログを開きます。

    a. **Token Authorization URL** をクリックして現在の権限を認可し、アクセス トークンを取得します。

    b. **Requested Access** ページで、アプリケーション権限の設定に対して **Approve** を選択します。

    c. 許可した各ユーザーに Token Authorization URL を共有し、アクセスを承認してもらいます。
7. 承認されると、ユーザーごとに固有のアクセス トークンが付与されます。このアクセス トークンはユーザー自身で保管してください。Datadog とのインテグレーションを設定するには、このトークンが必要です。トークンは無期限で有効で、認可のための各リクエストに必ず含める必要があります。
8. アクセスが承認されると、アプリケーションのステータスは **Authorized** に変わります。


詳しくは Forcepoint のドキュメント「[OAuth トークンの設定][2]」を参照してください。

### Forcepoint Secure Web Gateway Edge を Datadog に接続する

1. Access Token を追加します。
   | パラメータ          | 説明                                                                           |
   | ------------------- | ------------------------------------------------------------------------------------- |
   | Access Token       | 上記で生成したアクセス トークン                      |

2. 設定を保存するには Save ボタンをクリックします。

## 収集されるデータ

### ログ

Forcepoint Secure Web Gateway インテグレーションは Web Logs と Web DLP Logs を収集し、Datadog に転送します。

### メトリクス

Forcepoint Secure Web Gateway インテグレーションにメトリクスは含まれません。

### イベント

Forcepoint Secure Web Gateway インテグレーションにイベントは含まれません。

## サポート

さらなるサポートが必要な場合は、[Datadog サポート][2] までお問い合わせください。

[2]:https://help.forcepoint.com/fpone/sse_admin/prod/oxy_ex-1/deployment_guide/guid-18f77855-8dc9-436a-9fba-179f06a81066.html
[1]: https://www.forcepoint.com/product/secure-web-gateway-swg
[2]: https://docs.datadoghq.com/ja/help/