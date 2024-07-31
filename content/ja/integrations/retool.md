---
app_id: retool
app_uuid: 13239057-ebc6-4cb6-a789-35f064bbcd0f
assets:
  dashboards:
    'Retool + Datadog: ElasticSearch Action Console': assets/dashboards/retool_retool_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: retool
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10176
    source_type_name: Retool
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Retool
  sales_email: support@retool.com
  support_email: support@retool.com
categories:
- developer tools
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/retool/README.md
display_on_public_website: true
draft: false
git_integration_title: retool
integration_id: retool
integration_title: Retool
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: retool
public_title: Retool
short_description: Retool は内部ツールを素早く構築する方法です
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Developer Tools
  configuration: README.md#Setup
  description: Retool は内部ツールを素早く構築する方法です
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Retool
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要
モニタリングと分析は、ミッションクリティカルなインサイトを提供しますが、開発者はインサイトに基づくアクションを実行するために、個別でサイロ化された、多くの場合カスタムツール間を行き来しなければならず、結果、インサイトに対し非効率的または非効果的な対応をすることになります。

Retool により開発者は Datadog ダッシュボードに直接埋め込むカスタムアプリを作成できるため、ユーザーは Datadog から直接アクションを起こしたりワークフローを自動化したりできます。

![Screenshot1][1]

### データセキュリティ
Elasticsearch Management 用の Datadog の埋め込み Retool アプリは、主要な Elasticsearch メトリクスとログに対する既存の可視性と、Datadog ダッシュボードから直接クラスターやアカウントなどを管理する力を組み合わせたものです。

### ライブラリ
Retool は Elasticsearch Management 用の埋め込みアプリを作成しました。Elasticsearch のメトリクス、トレース、ログは、すでに Datadog で監視できます。埋め込みアプリで、開発者は Datadog ダッシュボードから直接 Datadog の豊富なインサイトにアクションを起こすことができます。そのアクションには以下のものが含まれます。

- シャードとレプリカで新しいインデックスを追加
- シャードの再配置とインデックスの除外でノードを管理
- 新しいスナップショットの作成とインデックスの復元

## 計画と使用
Retool インテグレーションにはすぐに使えるダッシュボードが付いてくるため、iframe から Retool にサインアップまたはログインできます。

接続文字列を使い ElasticSearch クラスターに接続するよう促されます。このアプリは自動的にインスタンスに追加されます。次に、ナビゲーションバーのリソースをクリックし、新しく Datadog リソースを作成します（API キーとアプリケーションキーを追加）。最後に、クエリエディターのリソース選択ドロップダウンから選択して、Datadog リソースを 2 つの Datadog クエリに接続します。

Datadog に戻るとダッシュボードでアプリが稼働しているのがわかります。アプリは随時編集でき、DevOps ワークフローに合わせてカスタマイズできます。

## リアルユーザーモニタリング

### データセキュリティ
現時点では、Retool インテグレーションにはメトリクスは含まれません。

### ヘルプ
現時点では、Retool インテグレーションにはイベントは含まれません。

### ヘルプ
現時点では、Retool にはサービスのチェック機能は含まれません。

## ヘルプ
ご不明な点は、[Datadog のサポートチーム][2]までお問い合わせください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/retool/images/1.png
[2]: https://docs.datadoghq.com/ja/help/