---
categories:
  - クラウド
  - データストア
  - aws
  - ログの収集
ddtype: クローラー
dependencies: []
description: AWS DocumentDB のメトリクスとログを監視
doc_link: 'https://docs.datadoghq.com/integrations/amazon_documentdb/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/monitor-documentdb-with-datadog/'
    tag: ブログ
    text: Amazon DocumentDB のメトリクスとログを Datadog で収集
git_integration_title: amazon_documentdb
has_logo: true
integration_title: Amazon DocumentDB
is_public: true
kind: インテグレーション
manifest_version: 1
name: amazon_documentdb
public_title: Datadog-Amazon DocumentDB インテグレーション
short_description: AWS DocumentDB のメトリクスとログを監視
version: 1
---
## 概要

Amazon DocumentDB は、MongoDB のワークロードをサポートする、高速で、スケーラブル、高可用性、フルマネージド型のドキュメントデータベースサービスです。

## セットアップ
### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`DocumentDB` をオンにします。

2. [Datadog - AWS DocumentDB インテグレーション][3]をインストールします。

### ログの収集

1. [Datadog ログコレクション AWS Lambda 関数][4]をまだセットアップしていない場合は、セットアップします。
2. Lambda 関数がインストールされたら、AWS コンソールから手動で DocumentDB ログを含む Cloudwatch ロググループにトリガーを追加します。
メイン AWS ドキュメントの[手動でトリガーをセットアップする][5]を参照してください。

完了したら、[Datadog Log セクション][6]に移動し、ログを確認します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_documentdb" >}}


AWS から取得される各メトリクスには、dbinstanceidentifier、dbclusteridentifier など、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント
AWS DocumentDB インテグレーションには、イベントは含まれません。

### サービスのチェック
AWS DocumentDB インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_documentdb
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#create-a-new-lambda-function
[5]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#manually-setup-triggers
[6]: https://app.datadoghq.com/logs
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_documentdb/amazon_documentdb_metadata.csv
[8]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}