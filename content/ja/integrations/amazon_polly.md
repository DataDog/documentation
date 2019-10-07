---
aliases:
  - /ja/integrations/awspolly/
categories:
  - cloud
  - aws
  - log collection
ddtype: クローラー
dependencies: []
description: AWS Polly のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_polly/'
git_integration_title: amazon_polly
has_logo: true
integration_title: Amazon Polly
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_polly
public_title: Datadog-Amazon Polly インテグレーション
short_description: AWS Polly のキーメトリクスを追跡
version: '1.0'
---
## 概要

Amazon Polly は、文章をリアルな音声に変換するサービスです。

このインテグレーションを有効にすると、Datadog にすべての Polly メトリクスを表示できます。

## セットアップ
### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### コンフィグレーション

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`Polly` をオンにします。

2. [Datadog - AWS Polly インテグレーション][3]をインストールします。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_polly" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント
AWS Polly インテグレーションには、イベントは含まれません。

### サービスのチェック
AWS Polly インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_polly
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_polly/amazon_polly_metadata.csv
[5]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}