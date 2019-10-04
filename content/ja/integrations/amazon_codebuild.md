---
aliases:
  - /ja/integrations/awscodebuild/
categories:
  - クラウド
  - aws
ddtype: クローラー
dependencies: []
description: 行われているデプロイを表示し、その所要時間を追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_codebuild/'
git_integration_title: amazon_codebuild
has_logo: true
integration_title: Amazon CodeBuild
is_public: true
kind: インテグレーション
manifest_version: 1
name: amazon_codebuild
public_title: Datadog-Amazon CodeBuild インテグレーション
short_description: 行われているデプロイを表示し、その所要時間を追跡
version: 1
---
## 概要

AWS CodeBuild は、ソースコードのコンパイル、テストの実行、デプロイ可能なソフトウェアパッケージの生成を行うビルドサービスです。

Datadog AWS CodeBuild インテグレーションをインストールすると、以下のことができます。

* プロジェクトごとにビルドを追跡できます。
* ビルドに関するメトリクスを収集できます。
* 他の Datadog メトリクスとビルドを関連付けることができます。

## セットアップ
### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`CloudBuild` をオンにします。

2. [Datadog - AWS Codebuild インテグレーション][3]をインストールします。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_codebuild" >}}


### イベント
AWS CodeBuild インテグレーションには、イベントは含まれません。

### サービスのチェック
AWS CodeBuild インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-codebuild
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_codebuild/amazon_codebuild_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/


{{< get-dependencies >}}