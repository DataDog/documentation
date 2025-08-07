---
app_id: convox
categories:
- cloud
- configuration & deployment
- containers
custom_kind: integration
description: Convox is an open-source PaaS designed for total privacy and zero upkeep.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-aws-ecs-convox-integration/
  tag: blog
  text: Monitor your AWS ECS platform with Convox and Datadog
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Convox
---
## 概要

Convox からリアルタイムにメトリクスを取得して、コンテナのパフォーマンスを視覚化します。

![Convox integration dashboard widget](https://raw.githubusercontent.com/DataDog/integrations-extras/master/convox/images/snapshot.png)

## セットアップ

See the [Convox documentation](https://docs.convox.com/integrations/monitoring/datadog) to set up the Datadog integration.

### Datadog Agent のデプロイ

Datadog Agent は、`docker-compose.yml` マニフェストを使用することで、Convox アプリとしてデプロイすることができます。Rack の `InstanceCount` パラメーターと一致する `count` を使用します。

```shell
# リポジトリを確認
$ git clone https://github.com/convox-examples/datadog.git
$ cd dd-agent

# Agent アプリとシークレットをデプロイ
$ convox apps create
$ convox env set DD_API_KEY=<your api key>
$ convox deploy
$ convox scale agent --count=3 --cpu=10 --memory=128
```

`convox deploy` を実行して、Datadog Agent を ECS にデプロイします。

### オートスケーリング

Rack でオートスケーリングが有効になっている場合は、Rack のインスタンス数に合わせて Datadog Agent の数を動的にスケーリングする必要があります。

For more information, see the [Listening for ECS CloudWatch Events](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_cwet.html) tutorial.

## 収集データ

### メトリクス

Convox インテグレーションには、メトリクスは含まれません。

### イベント

Convox インテグレーションには、イベントは含まれません。

### サービス チェック

Convox インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

環境変数を `convox.yml` ファイルで構成する場合、`environment` パラメーターは `services` パラメーターと同じレベルで定義する必要があります。

![The Environment and Services parameters defined on the same level](https://raw.githubusercontent.com/DataDog/integrations-extras/master/convox/images/setting_environment_variables.png)

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。

## その他の参考資料

役立つドキュメント、リンク、記事:

- [Monitor your Amazon ECS platform with Convox and Datadog](https://www.datadoghq.com/blog/monitor-aws-ecs-convox-integration/)