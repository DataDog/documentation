---
assets:
  dashboards: {}
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - 監視
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/botprise/README.md'
display_name: botprise
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
short_description: Botprise と Datadog を統合して、生成されたイベントを監視
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Botprise の Datadog インテグレーションを使用すると、[Botprise][1] イベントを Datadog のイベントストリームに送信することができます。メールを使用して、Datadog イベントをシステムへ送信します。

## セットアップ


### インストール


### コンフィギュレーション
1. ラボデバイスに Datadog Agent をインストールします。
2. インストールが完了すると、デバイスから Datadog へのデータ送信が開始します。データは、[Datadog ホストリスト][2]で確認できます。
3. Datadog で、各ホスト用のモニターを作成します。モニターの規則に基づき、Datadog でアラートが作成されます。
4. 各モニターの[メトリクス][3]および対応する閾値を構成します。
5. 受信する各アラートに対し [ServiceNow][4] チケットを作成するようモニターのコンフィギュレーションを調整します。
6. Datadog Rest API を呼び出すための [API キーとアプリケーションキー][5]を生成します。


## 収集データ

### メトリクス

Botprise インテグレーションは、メトリクスを提供しません。

### サービスのチェック

Botprise インテグレーションには、サービスのチェック機能は含まれません。

### イベント

すべてのイベントが Datadog のイベントストリームに送信されます。

### コンフィギュレーション
Datadog API を使用するには、[API キーとアプリケーションキー][5]を入力する必要があります。

Datadog API キーを入力 []:xxxx9232ad913d1a864828a2df15xxxx
Datadog アプリケーションキーを入力 []:xxxxcb1798718f7a2da141071e7305599d60xxxx

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://www.botprise.com/
[2]: https://app.datadoghq.com/infrastructure/map
[3]: https://docs.datadoghq.com/ja/metrics/
[4]: https://dev83528.service-now.com/navpage.do
[5]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[6]: https://docs.datadoghq.com/ja/help/