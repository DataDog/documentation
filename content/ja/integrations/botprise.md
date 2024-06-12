---
app_id: botprise
app_uuid: 91806afb-9bd7-4ab2-91e4-7c7f2d05780f
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: botprise.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10113
    source_type_name: botprise
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Botprise
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- アラート設定
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/botprise/README.md
display_on_public_website: true
draft: false
git_integration_title: botprise
integration_id: botprise
integration_title: Botprise
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: botprise
public_title: Botprise
short_description: 生成されたイベントを監視する Botprise インテグレーション
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 生成されたイベントを監視する Botprise インテグレーション
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Botprise
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 概要

Botprise の Datadog インテグレーションを使用すると、Webhook を使用して生成された [Botprise][1] イベントを Datadog に送信できます。これにより、アプリケーションの監視および Botprise が正常に機能していることを確認できます。

![image-datadog-botprise-events][2]

## 計画と使用

Botprise-Datadog インテグレーションを使用するには、Botprise ユーザーである必要があります。Botprise の詳細については、[https://www.botprise.com/][1] をご覧ください。

### インフラストラクチャーリスト


### ブラウザトラブルシューティング
1. ラボデバイスに Datadog Agent をインストールします。
2. インストールが完了すると、デバイスから Datadog へのデータ送信が開始します。データは、[Datadog ホストリスト][3]で確認できます。
3. Datadog で、各ホスト用のモニターを作成します。モニターの規則に基づき、Datadog でアラートが作成されます。
4. 各モニターの[メトリクス][4]および対応する閾値を構成します。
5. 受信する各アラートに対し [ServiceNow][5] チケットを作成するようモニターのコンフィギュレーションを調整します。
6. Datadog Rest API を呼び出すための [API キーとアプリケーションキー][6]を生成します。


## リアルユーザーモニタリング

### データセキュリティ

Botprise インテグレーションは、メトリクスを提供しません。

### ヘルプ

Botprise インテグレーションには、サービスのチェック機能は含まれません。

### ヘルプ

すべてのイベントが Datadog のイベントストリームに送信されます。

### ブラウザトラブルシューティング
Datadog API を使用するには、[API キーとアプリケーションキー][6]を入力する必要があります。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

[1]: https://www.botprise.com/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/botprise/images/datadog-botprise-events.png
[3]: https://app.datadoghq.com/infrastructure/map
[4]: https://docs.datadoghq.com/ja/metrics/
[5]: https://developer.servicenow.com/dev.do#!/home
[6]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[7]: https://docs.datadoghq.com/ja/help/