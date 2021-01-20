---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - cloud
creates_events: false
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/convox/README.md'
display_name: Convox
draft: false
git_integration_title: convox
guid: e8b1f8a7-8859-4c85-81bd-044400854e59
integration_id: convox
integration_title: Convox
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.1
name: convox
public_title: Datadog-Convox インテグレーション
short_description: Convox は、プライバシーの完全保護を保全なしで実現できるよう設計されたオープンソースの PaaS です。
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Convox からリアルタイムにメトリクスを取得して、コンテナのパフォーマンスを視覚化します。

![スナップショット][1]

## セットアップ

[Convox のセットアップに関するドキュメントページ][2]を参照してください。

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