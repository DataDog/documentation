---
categories:
  - ネットワーク
  - ログの収集
  - security
ddtype: crawler
dependencies: []
description: Meraki インテグレーションで、ネットワークイベントログを収集できます。
doc_link: 'https://docs.datadoghq.com/integrations/meraki/'
draft: false
git_integration_title: meraki
has_logo: true
integration_id: ''
integration_title: Meraki
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: meraki
public_title: Datadog-Meraki インテグレーション
short_description: Meraki イベントログを収集。
version: '1.0'
---
## 概要

Meraki と接続して Meraki ネットワークイベントログを Datadog のログ管理システムに統合します。

## セットアップ

### インストール

1. Meraki インテグレーションタイルを開きます。
2. Meraki アカウントの名前を選択します。
3. Meraki API キーを追加します。Meraki API キーの生成方法については、[Meraki ドキュメント][1]の手順を参照してください。

### ログの収集

ネットワークイベントログのコレクションを構成するには、Meraki の API キーが必要です。

#### Meraki API キーを生成する

1. Meraki のダッシュボードを開きます。
2. Organization > Settings > Dashboard API access で API アクセスを有効化します。
3. Meraki ダッシュボードの My Profile ページを開いてキーを生成します。

詳細については、[Meraki のドキュメント][2]を参照してください。

## 収集データ

### メトリクス

Meraki デバイスからメトリクスを収集できるよう、[Meraki プロファイル][4]で [SNMP インテグレーション][3]を構成します。

### イベント

Meraki インテグレーションには、イベントは含まれません。

### サービスのチェック

Meraki インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://documentation.meraki.com/zGeneral_Administration/Other_Topics/The_Cisco_Meraki_Dashboard_API
[2]: https://documentation.meraki.com/General_Administration/Other_Topics/Cisco_Meraki_Dashboard_API#Enable_API_access
[3]: https://docs.datadoghq.com/ja/integrations/snmp/
[4]: https://docs.datadoghq.com/ja/integrations/snmp/#cisco-meraki-profile
[5]: https://docs.datadoghq.com/ja/help/