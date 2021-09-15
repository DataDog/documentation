---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - 監視
creates_events: false
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/botprise/README.md'
display_name: botprise
draft: false
git_integration_title: botprise
guid: bbc51521-f87c-44c1-ba57-9c4e5dc23214
integration_id: botprise
integration_title: Botprise
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: botprise.
metric_to_check: ''
name: botprise
public_title: Datadog-Botprise インテグレーション
short_description: 生成されたイベントを監視する Botprise インテグレーション
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Botprise の Datadog インテグレーションを使用すると、Webhook を使用して生成された [Botprise][1] イベントを Datadog に送信できます。これにより、アプリケーションの監視および Botprise が正常に機能していることを確認できます。

![image-datadog-botprise-events][2]

## セットアップ

Botprise-Datadog インテグレーションを使用するには、Botprise ユーザーである必要があります。Botprise の詳細については、[https://www.botprise.com/][10] にアクセスしてください。

### インストール


### コンフィギュレーション
1. ラボデバイスに Datadog Agent をインストールします。
2. インストールが完了すると、デバイスから Datadog へのデータ送信が開始します。データは、[Datadog ホストリスト][3]で確認できます。
3. Datadog で、各ホスト用のモニターを作成します。モニターの規則に基づき、Datadog でアラートが作成されます。
4. 各モニターの[メトリクス][4]および対応する閾値を構成します。
5. 受信する各アラートに対し [ServiceNow][5] チケットを作成するようモニターのコンフィギュレーションを調整します。
6. Datadog Rest API を呼び出すための [API キーとアプリケーションキー][6]を生成します。


## 収集データ

### メトリクス

Botprise インテグレーションは、メトリクスを提供しません。

### サービスのチェック

Botprise インテグレーションには、サービスのチェック機能は含まれません。

### イベント

すべてのイベントが Datadog のイベントストリームに送信されます。

### コンフィギュレーション
Datadog API を使用するには、[API キーとアプリケーションキー][6]を入力する必要があります。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

[1]: https://www.botprise.com/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/botprise/images/datadog-botprise-events.png
[3]: https://app.datadoghq.com/infrastructure/map
[4]: https://docs.datadoghq.com/ja/metrics/
[5]: https://developer.servicenow.com/dev.do#!/home
[6]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[7]: https://docs.datadoghq.com/ja/help/