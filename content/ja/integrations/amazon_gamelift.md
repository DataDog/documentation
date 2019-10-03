---
categories:
  - クラウド
  - aws
ddtype: クローラー
dependencies: []
description: Amazon Gamelift のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_gamelift/'
git_integration_title: amazon_gamelift
has_logo: true
integration_title: Amazon Gamelift
is_public: true
kind: インテグレーション
manifest_version: 1
name: amazon_gamelift
public_title: Datadog-Amazon Gamelift インテグレーション
short_description: Amazon Gamelift のキーメトリクスを追跡
version: 1
---
## 概要
Amazon GameLift は、セッションベースのマルチプレーヤーゲームサーバーをクラウドでデプロイ、運用、およびスケーリングするためのフルマネージド型サービスです。

このインテグレーションを有効にすると、Datadog にすべての Gamelift メトリクスを表示できます。

## セットアップ
### インストール
[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集
1. [AWS インテグレーションタイル][2]のメトリクス収集で、`Gamelift` をオンにします。

2. [Datadog - Amazon Gamelift インテグレーション][3]をインストールします。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_gamelift" >}}


### イベント
Amazon Gamelift インテグレーションには、イベントは含まれません。

### サービスのチェック
Amazon Gamelift インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-gamelift
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_gamelift/amazon_gamelift_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/


{{< get-dependencies >}}