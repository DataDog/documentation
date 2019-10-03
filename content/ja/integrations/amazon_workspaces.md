---
aliases:
  - /ja/integrations/awsworkspaces/
categories:
  - cloud
  - aws
  - log collection
ddtype: クローラー
dependencies: []
description: 失敗した接続、セッションレイテンシー、正常でないワークスペースなどを追跡 more.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_workspaces/'
git_integration_title: amazon_workspaces
has_logo: true
integration_title: AWS Workspaces
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_workspaces
public_title: Datadog-AWS Workspaces インテグレーション
short_description: 失敗した接続、セッションレイテンシー、正常でないワークスペースなどを追跡 and more.
version: '1.0'
---
## 概要

Amazon WorkSpaces は、AWS クラウド上で実行されるフルマネージド型のセキュアなデスクトップコンピューティングサービスです。

このインテグレーションを有効にすると、Datadog にすべての Workspaces メトリクスを表示できます。

## セットアップ
### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。これ以外に必要なインストール手順はありません。

### コンフィグレーション

Amazon Web Services インテグレーションタイルのメトリクス収集で、Workspaces をオンにします。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_workspaces" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント
AWS WorkSpaces インテグレーションには、イベントは含まれません。

### サービスのチェック
AWS WorkSpaces インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_workspaces/amazon_workspaces_metadata.csv
[3]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}