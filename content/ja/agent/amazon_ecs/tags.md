---
title: Amazon ECS タグ抽出
kind: ドキュメント
further_reading:
  - link: /getting_started/tagging/
    tag: Documentation
    text: タグの概要
  - link: /getting_started/tagging/using_tags/
    tag: Documentation
    text: Datadog でタグを使用する
  - link: /agent/guide/autodiscovery-management/
    tag: Documentation
    text: データ収集をコンテナのサブセットのみに制限
---
## 概要

Datadog Agent は、タグを作成し、ラベルまたは環境変数に基づいてコンテナが発行するすべてのメトリクス、トレース、ログに割り当てることができます。

## 統合サービスタグ付け

Datadog では、コンテナ化環境のベストプラクティスとして、タグを付ける際に統合サービスタグ付けを使用することをおすすめしています。統合サービスタグ付けは、`env`、`service`、`version` の 3 つの標準タグを使用して Datadog テレメトリーと結合します。ご使用環境で統合タグ付けを構成する方法に関する詳細は、[Amazon ECS 統合サービスタグ付けドキュメント][1]をご参照ください。

## リソースタグ収集

統合サービスタグ付けを有効にしていない場合は、次の手順を実行して ECS リソースタグを収集します。

1. [Amazon ECS コンテナインスタンス][2]が IAM ロールに関連付けられていることを確認します。これは、ECS クラスター作成ウィザードを使用して新しいクラスターを作成するとき、または自動スケーリンググループが使用する起動構成で行うことができます。
2. `ecs:ListTagsForResource` で [Amazon ECS コンテナインスタンス][2]で使用される IAM ロールを更新します。
3. [datadog-agent-ecs.json][3] ファイル (オリジナルの Amazon Linux AMI を使用している場合は [datadog-agent-ecs1.json][4]) を更新して、次の環境変数を追加してリソースタグの収集を有効にします。

    {{< code-block lang="json" >}}
    {
      "name": "DD_ECS_COLLECT_RESOURCE_TAGS_EC2",
      "value": "true"
    }
    {{< /code-block >}}

### 注

- IAM ロールが、Datadog Agent コンテナのタスクロールではなく、[Amazon ECS コンテナインスタンス][2]に関連付けされていることを確認します。
- ECS リソースタグは EC2 インスタンスからは収集できますが、AWS Fargate からは収集できません。
- この機能には、Datadog Agent v6.17+ または v7.17+ が必要です。
- Agent は、`tasks`、`services`、`container instances` ECS リソースからの ECS タグ収集をサポートします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging/?tab=ecs#containerized-environment
[2]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_instances.html
[3]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[4]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json