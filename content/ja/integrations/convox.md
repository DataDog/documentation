---
app_id: convox
app_uuid: 4476973b-6e79-4861-a321-7e24e581873b
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: convox.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Convox
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 不明
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/convox/README.md
display_on_public_website: true
draft: false
git_integration_title: convox
integration_id: convox
integration_title: Convox
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: convox
oauth: {}
public_title: Convox
short_description: Convox は、プライバシーの完全保護を保全なしで実現できるよう設計されたオープンソースの PaaS です。
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
  - Category::クラウド
  configuration: README.md#Setup
  description: Convox は、プライバシーの完全保護を保全なしで実現できるよう設計されたオープンソースの PaaS です。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Convox
---



## 概要

Convox からリアルタイムにメトリクスを取得して、コンテナのパフォーマンスを視覚化します。

![スナップショット][1]

## セットアップ

[Datadog の設定][2]は、Convox のドキュメントを参照してください。

### Datadog Agent のデプロイ

Datadog Agent は、とても簡単な `docker-compose.yml` マニフェストを使用して Convox アプリとしてデプロイできます。

```shell
# リポジトリを確認
$ git clone https://github.com/convox-examples/dd-agent.git
$ cd dd-agent

# Agent アプリとシークレットをデプロイ
$ convox apps create
$ convox env set API_KEY=<api キー>
$ convox deploy
$ convox scale agent --count=3 --cpu=10 --memory=128
```

Rack の `InstanceCount` パラメーターに一致する `count` を使用してください。

### オートスケーリング

Rack でオートスケーリングが有効になっている場合は、Rack のインスタンス数に合わせて Datadog Agent の数を動的にスケーリングする必要があります。

[ECS CloudWatch Event のリッスンのチュートリアル][3]を参照してください。

## 収集データ

### メトリクス

Convox チェックには、メトリクスは含まれません。

### イベント

Convox チェックには、イベントは含まれません。

### サービスのチェック

Convox チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/convox/images/snapshot.png
[2]: https://docs.convox.com/integrations/monitoring/datadog
[3]: http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_cwet.html
[4]: https://docs.datadoghq.com/ja/help/