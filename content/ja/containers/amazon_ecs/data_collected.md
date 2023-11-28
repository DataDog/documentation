---
aliases:
- /ja/agent/amazon_ecs/data_collected
further_reading:
- link: /agent/amazon_ecs/logs/
  tag: Documentation
  text: アプリケーションログの収集
- link: /agent/amazon_ecs/apm/
  tag: Documentation
  text: アプリケーショントレースの収集
- link: /agent/amazon_ecs/data_collected/#metrics
  tag: Documentation
  text: ECS メトリクスの収集
kind: documentation
title: Amazon ECS データ収集
---

## 収集データ

### メトリクス

Amazon ECS on EC2 は、EC2 インスタンス上で動作する Docker コンテナ向けのコンテナ管理サービスです。Agent for Amazon ECS によって収集されたメトリクス:

{{< get-metrics-from-git "amazon_ecs" >}}

Docker コンテナでのデプロイ時に Agent により収集されたメトリクスにも Docker インテグレーションにより収集されたものと同じメトリクスが含まれます。すべてのメトリクスのリストは、[Docker のインテグレーションメトリクス][1]を参照してください。

AWS インテグレーションの  Metric Collection タブで **collect custom metrics** を有効にすることで、`ecs.containerinsights.*` というプレフィックスを持つメトリクスを収集することができます。

**注**: Docker メトリクスは以下のタグに基づいてタグ付けされます: `container_name`, `task_arn`, `task_family`, `task_name`, `task_version`。追加のコンフィギュレーションは不要です。

### イベント

ノイズを減らすため、Amazon ECS インテグレーションは `drain`、`error`、`fail`、`insufficient memory`、`pending`、`reboot`、`terminate` の単語を含むイベントのみを収集するように自動的に設定されます。以下にイベントの例を示します。

{{< img src="integrations/amazon_ecs/aws_ecs_events.png" alt="Amazon ECS イベント" >}}

このリストを削除し、Datadog Amazon ECS インテグレーションからすべてのイベントを取得できるようにするには、[Datadog のサポートチーム][2]までお問い合わせください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/agent/docker/data_collected/#metrics
[2]: https://docs.datadoghq.com/ja/help/