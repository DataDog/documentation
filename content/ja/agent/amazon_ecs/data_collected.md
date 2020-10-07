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
  - link: /agent/amazon_ecs/metrics/
    tag: Documentation
    text: ECS リソースの収集
---
## 収集データ

### メトリクス

EC2 インスタンスで Amazon ECS を使用するときに Agent によって収集されるメトリクス:

{{< get-metrics-from-git "amazon_ecs" >}}

AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

**注**: `ecs.containerinsights.*` をプレフィックスに持つメトリクスは、[AWS CloudWatch エージェント][1]に基づいています。

### イベント

ノイズを減らすため、Amazon ECS インテグレーションは次の単語を含むイベントのみを収集するように自動的に設定されます。`drain`、`error`、`fail`、`insufficient memory`、`pending`、`reboot`、`terminate`。以下にイベントの例を示します。

{{< img src="integrations/amazon_ecs/aws_ecs_events.png" alt="AWS ECS イベント" >}}

ホワイトリストを削除し、Datadog Amazon ECS インテグレーションからすべてのイベントを取得できるようにするには、[Datadog のサポートチーム][2]までお問い合わせください。

### サービスチェック

- **aws.ecs.agent_connected**: Agent が接続できない場合は `CRITICAL`、それ以外の場合は `OK` を返します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/deploy-container-insights-ECS-instancelevel.html
[2]: https://docs.datadoghq.com/ja/help/