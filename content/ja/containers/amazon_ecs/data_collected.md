---
title: Amazon ECS Data Collection
aliases:
  - /agent/amazon_ecs/data_collected
further_reading:
- link: /agent/amazon_ecs/logs/
  tag: Documentation
  text: Collect your application logs
- link: /agent/amazon_ecs/apm/
  tag: Documentation
  text: Collect your application traces
- link: "/agent/amazon_ecs/data_collected/#metrics"
  tag: Documentation
  text: Collect ECS metrics
---

## データ収集

### メトリクス

Amazon ECS on EC2 は、EC2 インスタンス上で動作する Docker コンテナ向けのコンテナ管理サービスです。Agent for Amazon ECS によって収集されたメトリクス:

{{< get-metrics-from-git "amazon_ecs" >}}

Docker コンテナでのデプロイ時に Agent により収集されたメトリクスにも Docker インテグレーションにより収集されたものと同じメトリクスが含まれます。すべてのメトリクスのリストは、[Docker のインテグレーションメトリクス][1]を参照してください。

Metrics prefixed with `ecs.containerinsights.*` can be collected by enabling **collect custom metrics** under the Metric Collection tab of the AWS Integration.

**注**: Docker メトリクスは以下のタグに基づいてタグ付けされます: `container_name`, `task_arn`, `task_family`, `task_name`, `task_version`。追加のコンフィギュレーションは不要です。

### イベント

ノイズを減らすため、Amazon ECS インテグレーションは次の単語を含むイベントのみを収集するように自動的に設定されます。`drain`、`error`、`fail`、`insufficient memory`、`pending`、`reboot`、`terminate`。以下にイベントの例を示します。

{{< img src="integrations/amazon_ecs/aws_ecs_events.png" alt="Amazon ECS Events" >}}

このリストを削除し、Datadog Amazon ECS インテグレーションからすべてのイベントを取得できるようにするには、[Datadog のサポートチーム][2]までお問い合わせください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/agent/docker/data_collected/#metrics
[2]: https://docs.datadoghq.com/help/
