---
app_id: circleci
app_uuid: 042c421c-c655-4034-9b2f-c2c09faf0800
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - circleci.finished_builds.count
      metadata_path: metadata.csv
      prefix: circleci
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 213
    source_type_name: CircleCI
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- モニター
- configuration & deployment
- automation
- developer tools
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: circleci
integration_id: circleci
integration_title: CircleCI
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: circleci
public_title: CircleCI
short_description: CircleCI's platform makes it easy to rapidly build and release
  quality software.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Configuration & Deployment
  - Category::Automation
  - Category::Developer Tools
  configuration: README.md#Setup
  description: CircleCI's platform makes it easy to rapidly build and release quality
    software.
  media:
  - caption: Synthetics
    image_url: images/circleci_synthetics.jpg
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/circleci-monitoring-datadog/
  support: README.md#Support
  title: CircleCI
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

CircleCI に接続して、

- ビルドの完了数、平均ビルド時間など、CircleCI のキーメトリクスを視覚化できます。
- Datadog のタグシステムを使用してデータを分析できます (ジョブ名やリポジトリでビルドを細分するなど)。
- Synthetics で Orb ワークフローのデータを表示する
- CircleCI のジョブログを収集し、Datadog に取り込む

## セットアップ

### インストール

CircleCI インテグレーションは、[インテグレーションタイル][1]からインストールできます。

### 構成

1. CircleCI 設定で、Personal API Tokens に移動し、生成したキーをフォームに入力します。名前は CircleCI ラベルと同じである必要はありませんが、一意でなければなりません。
2. 「Organization/repo*name」、「Organization/repo*\*」、「Organization/\*」などの式を使用してリポジトリを絞り込みます。**フィルタリングは、追跡対象のプロジェクトに対して行われ、このリストは CircleCI 側でセットアップする必要があります。**
3. 適切なバージョン管理システムを指定し、適切な API キーを参照します。
4. リポジトリでログ収集を有効にした場合、そのパイプラインが Datadog CI Visibility に送信されていることを確認する必要があります。
   [CircleCI ワークフローでトレーシングをセットアップする][2]の手順に従ってください。

API トークンは複数設定でき、トークン 1 個につき複数のプロジェクトを追跡できます。Datadog にリポジトリの情報を表示するには、ユーザーがそのリポジトリのコントリビューターとして設定されている必要があります。

## 収集データ

### メトリクス
{{< get-metrics-from-git "circleci" >}}


### イベント

CircleCI インテグレーションには、イベントは含まれません。

### サービスチェック

CircleCI インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## 参考資料

- [Datadog で CircleCI 環境を監視する][5]

[1]: https://app.datadoghq.com/integrations/circleci
[2]: https://docs.datadoghq.com/ja/continuous_integration/pipelines/circleci/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/circleci/circleci_metadata.csv
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://www.datadoghq.com/blog/circleci-monitoring-datadog/