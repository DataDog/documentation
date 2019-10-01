---
aliases:
  - /ja/integrations/awsopsworks/
categories:
  - cloud
  - provisioning
  - aws
  - log collection
ddtype: クローラー
dependencies: []
description: AWS OpsWorks のリソース使用状況を追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_ops_works/'
git_integration_title: amazon_ops_works
has_logo: true
integration_title: Amazon OpsWorks
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_ops_works
public_title: Datadog-Amazon OpsWorks インテグレーション
short_description: AWS OpsWorks のリソース使用状況を追跡
version: '1.0'
---
## 概要

AWS OpsWorks は、あらゆる形式と規模のアプリケーションを簡単にデプロイして運用できるようにするアプリケーション管理サービスです。

このインテグレーションを有効にすると、Datadog にすべての OpsWorks メトリクスを表示できます。

## セットアップ
### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。
### コンフィグレーション

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`OpsWorks` をオンにします。

2. [Datadog - AWS OpsWork インテグレーション][3]をインストールします。


## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_ops_works" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント
AWS Ops Works インテグレーションには、イベントは含まれません。

### サービスのチェック
AWS Ops Works インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_ops_works
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ops_works/amazon_ops_works_metadata.csv
[5]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}