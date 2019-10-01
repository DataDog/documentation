---
categories:
  - クラウド
  - aws
ddtype: クローラー
dependencies: []
description: Amazon Glue のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_glue/'
git_integration_title: amazon_glue
has_logo: true
integration_title: Amazon Glue
is_public: true
kind: インテグレーション
manifest_version: 1
name: amazon_glue
public_title: Datadog-Amazon Glue インテグレーション
short_description: Amazon Glue のキーメトリクスを追跡
version: 1
---
## 概要
Amazon Glue は、シンプルかつコスト効率よくデータを分類、クリーニング、補完したり、さまざまなデータストア間のデータ移動を高い信頼性で行うことができるフルマネージド型 ETL (抽出、変換、ロード) サービスです。

このインテグレーションを有効にすると、Datadog にすべての Glue メトリクスを表示できます。

## セットアップ
### インストール
[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集
1. [AWS インテグレーションタイル][2]のメトリクス収集で、`Glue` をオンにします。

2. [Datadog - Amazon Glue インテグレーション][3]をインストールします。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_glue" >}}


### イベント
Amazon Glue インテグレーションには、イベントは含まれません。

### サービスのチェック
Amazon Glue インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-glue
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_glue/amazon_glue_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/


{{< get-dependencies >}}