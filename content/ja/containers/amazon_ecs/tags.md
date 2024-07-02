---
title: Amazon ECS タグ抽出
aliases:
  - /agent/amazon_ecs/tags
further_reading:
- link: /getting_started/tagging/
  tag: ドキュメント
  text: タグの概要
- link: /getting_started/tagging/using_tags/
  tag: ドキュメント
  text: Datadog でタグを使用する
- link: /agent/guide/autodiscovery-management/
  tag: ドキュメント
  text: データ収集をコンテナのサブセットのみに制限
---

## 概要

Datadog Agent は、タグを作成し、ラベルまたは環境変数に基づいてコンテナが発行するすべてのメトリクス、トレース、ログに割り当てることができます。

## すぐに使えるタグ

The Agent can autodiscover and attach tags to all data emitted by the entire task or an individual container within this task. The list of tags attached automatically depends on the agent [cardinality configuration][1].

<div style="overflow-x: auto;">

  | タグ                           | カーディナリティ  | ソース               |
  |-------------------------------|--------------|----------------------|
  | `container_name`              | 高         | Docker               |
  | `container_id`                | 高         | Docker               |
  | `docker_image`                | 低          | Docker               |
  | `image_name`                  | 低          | Docker               |
  | `short_image`                 | 低          | Docker               |
  | `image_tag`                   | 低          | Docker               |
  | `ecs_cluster_name`            | 低          | ECS API              |
  | `ecs_container_name`          | 低          | ECS API              |
  | `task_arn`                    | Orchestrator | ECS API              |
  | `task_family`                 | 低          | ECS API              |
  | `task_name`                   | 低          | ECS API              |
  | `task_version`                | 低          | ECS API              |

</div>

## 統合サービスタグ付け

As a best practice in containerized environments, Datadog recommends using unified service tagging when assigning tags. Unified service tagging ties Datadog telemetry together through the use of three standard tags: `env`, `service`, and `version`. To learn how to configure your environment with unified tagging, see the [Amazon ECS unified service tagging documentation][2].

## リソースタグ収集

統合サービスタグ付けを有効にしていない場合は、次の手順を実行して ECS リソースタグを収集します。

1. Verify your [Amazon ECS container instances][3] are associated with an IAM role. This can be done when creating a new cluster with the ECS cluster creation wizard or in the launch configuration used by an autoscaling group.
2. Update the IAM role used by your [Amazon ECS container instances][3] with: `ecs:ListTagsForResource`.
3. Update your [datadog-agent-ecs.json][4] file ([datadog-agent-ecs1.json][5] if you are using an original Amazon Linux AMI) to enable resource tag collection by adding the following environment variable:

    {{< code-block lang="json" >}}
    {
      "name": "DD_ECS_COLLECT_RESOURCE_TAGS_EC2",
      "value": "true"
    }
    {{< /code-block >}}

### 注

- Ensure the IAM role is associated with your [Amazon ECS container instances][3] and not the task role of the Datadog agent container.
- ECS リソースタグは EC2 インスタンスからは収集できますが、AWS Fargate からは収集できません。
- この機能には、Datadog Agent v6.17+ または v7.17+ が必要です。
- Agent は、`tasks`、`services`、`container instances` ECS リソースからの ECS タグ収集をサポートします。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environment-variables
[2]: /getting_started/tagging/unified_service_tagging/?tab=ecs#containerized-environment
[3]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_instances.html
[4]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[5]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json
