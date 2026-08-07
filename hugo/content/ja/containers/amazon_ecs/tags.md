---
aliases:
- /ja/agent/amazon_ecs/tags
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
title: Amazon ECS タグ抽出
---

## 概要

Datadog Agent は、タグを作成し、ラベルまたは環境変数に基づいてコンテナが発行するすべてのメトリクス、トレース、ログに割り当てることができます。

## すぐに使えるタグ

Agent は、タスク全体またはタスク内の個々のコンテナから送信されるすべてのデータを自動的に検出してタグを付与できます。自動的に付与されるタグの一覧は、Agent の [カーディナリティ構成][1] に依存します。

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

コンテナ化された環境のベストプラクティスとして、Datadog はタグを付与する際に統合サービスタグ付けを使用することを推奨しています。統合サービスタグ付けでは、`env`、`service`、`version` の 3 つの標準タグを用いて Datadog のテレメトリを連携させます。統合サービスタグ付けの設定方法は、[Amazon ECS における統合サービスタグ付けのドキュメント][2]を参照してください。

## リソースタグ収集

統合サービスタグ付けを有効にしていない場合は、次の手順を実行して ECS リソースタグを収集します。

1. [Amazon ECS コンテナインスタンス][3]が IAM ロールに関連付けられていることを確認してください。これは、ECS クラスター作成ウィザードで新しいクラスターを作成するときや、オートスケーリンググループで使用するランチコンフィギュレーションで設定できます。
2. [Amazon ECS コンテナインスタンス][3]で使用される IAM ロールを更新し、`ecs:ListTagsForResource` の権限を付与してください。
3. [datadog-agent-ecs.json][4] ファイル (オリジナルの Amazon Linux AMI を使用している場合は [datadog-agent-ecs1.json][5]) を更新し、以下の環境変数を追加することでリソースタグの収集を有効化してください。

    {{< code-block lang="json" >}}
    {
      "name": "DD_ECS_COLLECT_RESOURCE_TAGS_EC2",
      "value": "true"
    }
    {{< /code-block >}}

### 注

- 必ず IAM ロールが Datadog Agent コンテナのタスクロールではなく、[Amazon ECS コンテナインスタンス][3]に関連付けられていることを確認してください。
- ECS リソースタグは EC2 インスタンスからは収集できますが、AWS Fargate からは収集できません。
- この機能には、Datadog Agent v6.17+ または v7.17+ が必要です。
- Agent は、`tasks`、`services`、`container instances` ECS リソースからの ECS タグ収集をサポートします。
- If AWS tags are not appearing in Datadog, ensure that the tags are applied both to the instance and the corresponding AWS cloud resource. 

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environment-variables
[2]: /ja/getting_started/tagging/unified_service_tagging/?tab=ecs#containerized-environment
[3]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_instances.html
[4]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[5]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json