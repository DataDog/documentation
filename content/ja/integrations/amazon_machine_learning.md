---
aliases:
  - /ja/integrations/awsml/
categories:
  - cloud
  - aws
  - log collection
ddtype: クローラー
dependencies: []
description: AWS Machine Learning の予測カウントおよび失敗数を追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_machine_learning/'
git_integration_title: amazon_machine_learning
has_logo: true
integration_title: Amazon Machine Learning
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_machine_learning
public_title: Datadog-Amazon Machine Learning インテグレーション
short_description: AWS Machine Learning の予測カウントおよび失敗数を追跡
version: '1.0'
---
## 概要

Amazon Machine Learning は、あらゆるスキルレベルの開発者が機械学習テクノロジーを簡単に利用できるサービスです。

このインテグレーションを有効にすると、Datadog にすべての Machine Learning メトリクスを表示できます。

## セットアップ
### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### コンフィグレーション

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`MachineLearning` をオンにします。

2. [Datadog - AWS Machine Learning インテグレーション][3]をインストールします。


## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_machine_learning" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント
AWS Machine Learning インテグレーションには、イベントは含まれません。

### サービスのチェック
AWS Machine Learning インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_machine_learning
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_machine_learning/amazon_machine_learning_metadata.csv
[5]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}