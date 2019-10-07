---
categories:
  - クラウド
  - aws
ddtype: クローラー
dependencies: []
description: Amazon Neptune のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_neptune/'
git_integration_title: amazon_neptune
has_logo: true
integration_title: Amazon Neptune
is_public: true
kind: インテグレーション
manifest_version: 1
name: amazon_neptune
public_title: Datadog-Amazon Neptune インテグレーション
short_description: Amazon Neptune のキーメトリクスを追跡
version: 1
---
## 概要
Amazon Neptune は、高速かつ信頼性の高いフルマネージド型グラフデータベースサービスです。高度に接続されたデータセットと連携するアプリケーションを簡単に構築および実行できます。

このインテグレーションを有効にすると、Datadog にすべての Neptune メトリクスを表示できます。

## セットアップ
### インストール
[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集
1. [AWS インテグレーションタイル][2]のメトリクス収集で、`Neptune` をオンにします。

2. [Datadog - Amazon Neptune インテグレーション][3]をインストールします。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_neptune" >}}


### イベント
Amazon Neptune インテグレーションには、イベントは含まれません。

### サービスのチェック
Amazon Neptune インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-neptune
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_neptune/amazon_neptune_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/


{{< get-dependencies >}}