---
categories:
  - cloud
  - configuration & deployment
ddtype: crawler
dependencies: []
description: ビルドの完了数、平均ビルド時間などを視覚化
doc_link: 'https://docs.datadoghq.com/integrations/circleci/'
draft: false
git_integration_title: circleci
has_logo: true
integration_id: ''
integration_title: CircleCI
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: circleci
public_title: Datadog-CircleCI インテグレーション
short_description: ビルドの完了数、平均ビルド時間などを視覚化
version: '1.0'
---
## 概要

CircleCI に接続して、

- ビルドの完了数、平均ビルド時間など、CircleCI のキーメトリクスを視覚化できます。
- Datadog のタグシステムを使用してデータを分析できます (ジョブ名やリポジトリでビルドを細分するなど)。

## セットアップ

### インストール

CircleCI インテグレーションは、[インテグレーションタイル][1]からインストールできます。

### コンフィグレーション

1. CircleCI 設定で、Personal API Tokens に移動し、生成したキーをフォームに入力します。名前は CircleCI ラベルと同じである必要はありませんが、一意でなければなりません。
2. 「Organization/repo*name」、「Organization/repo*\*」、「Organization/\*」などの式を使用してリポジトリを絞り込みます。**フィルタリングは、追跡対象のプロジェクトに対して行われ、このリストは CircleCI 側でセットアップする必要があります。**
3. 適切なバージョン管理システムを指定し、適切な API キーを参照します。

API トークンは複数設定でき、トークン 1 個につき複数のプロジェクトを追跡できます。Datadog にリポジトリの情報を表示するには、ユーザーがそのリポジトリのコントリビューターとして設定されている必要があります。

## 収集データ

### メトリクス
{{< get-metrics-from-git "circleci" >}}


### イベント

CircleCI インテグレーションには、イベントは含まれません。

### サービスのチェック

CircleCI インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#integrations/circleci
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/circleci/circleci_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/