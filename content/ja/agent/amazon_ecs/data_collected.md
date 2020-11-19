---
title: Amazon ECS データ収集
kind: ドキュメント
further_reading:
  - link: /agent/amazon_ecs/logs/
    tag: Documentation
    text: アプリケーションログの収集
  - link: /agent/amazon_ecs/apm/
    tag: Documentation
    text: アプリケーショントレースの収集
  - link: '/agent/amazon_ecs/data_collected/#metrics'
    tag: Documentation
    text: ECS リソースの収集
---
## 収集データ

### メトリクス

EC2 の Amazon ECS は、EC2 インスタンス上で動作する Docker コンテナ向けのコンテナ管理サービスです。Docker コンテナでのデプロイ時に Agent により収集されたメトリクスは Docker インテグレーションにより収集されたメトリクスと同じです。すべてのメトリクスのリストは、[Docker のインテグレーションメトリクス][1]を参照してください。

**注**: Docker メトリクスは以下のタグに基づいてタグ付けされます: `container_name`, `task_arn`, `task_family`, `task_name`, `task_version`。追加のコンフィギュレーションは不要です。

### イベント

ノイズを減らすため、Amazon ECS インテグレーションは次の単語を含むイベントのみを収集するように自動的に設定されます。`drain`、`error`、`fail`、`insufficient memory`、`pending`、`reboot`、`terminate`。以下にイベントの例を示します。

{{< img src="integrations/amazon_ecs/aws_ecs_events.png" alt="AWS ECS イベント" >}}

このリストを削除し、Datadog Amazon ECS インテグレーションからすべてのイベントを取得できるようにするには、[Datadog のサポートチーム][2]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/agent/docker/data_collected/#metrics
[2]: https://docs.datadoghq.com/ja/help/