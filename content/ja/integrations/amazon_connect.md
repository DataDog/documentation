---
categories:
  - クラウド
  - aws
ddtype: クローラー
dependencies: []
description: Amazon Connect のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_connect/'
git_integration_title: amazon_connect
has_logo: true
integration_title: Amazon Connect
is_public: true
kind: インテグレーション
manifest_version: 1
name: amazon_connect
public_title: Datadog-Amazon Connect インテグレーション
short_description: Amazon Connect のキーメトリクスを追跡
version: 1
---
## 概要
Amazon Connect は、セルフサービスの構成を提供し、動的でパーソナルかつ自然な顧客エンゲージメントを可能にします。

このインテグレーションを有効にすると、Datadog にすべての Connect メトリクスを表示できます。

## セットアップ
### インストール
[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集
1. [AWS インテグレーションタイル][2]のメトリクス収集で、`Connect` をオンにします。

2. [Datadog - Amazon Connect インテグレーション][3]をインストールします。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_connect" >}}


### イベント
Amazon Connect インテグレーションには、イベントは含まれません。

### サービスのチェック
Amazon Connect インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-connect
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_connect/amazon_connect_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/


{{< get-dependencies >}}