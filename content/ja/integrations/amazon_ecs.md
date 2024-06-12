---
aliases:
- /ja/integrations/ecs/
categories:
- cloud
- containers
- aws
- log collection
dependencies: []
description: コンテナ ステータスのモニタリングやリソース使用状況のトラッキングなど。
doc_link: https://docs.datadoghq.com/integrations/amazon_ecs/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/amazon-ecs-metrics
  tag: ブログ
  text: キー ECS メトリクスの監視
- link: https://docs.datadoghq.com/integrations/ecs_fargate
  tag: Documentation
  text: ECS Fargate インテグレーション
git_integration_title: amazon_ecs
has_logo: true
integration_id: ''
integration_title: Amazon ECS on EC2
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_ecs
public_title: Datadog-Amazon ECS on EC2 インテグレーション
short_description: コンテナ ステータスのモニタリングやリソース使用状況のトラッキングなど。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
<div class="alert alert-warning">
コンテナ化された Datadog Agent を ECS クラスターにデプロイする方法については、<a href="https://docs.datadoghq.com/agent/amazon_ecs/"><b>Amazon ECS Agent ドキュメント</b></a>を参照してください。
</div>

## 概要

Amazon ECS on EC2 は、EC2 インスタンスで実行される Docker コンテナ用の拡張性とパフォーマンスに優れたコンテナ管理サービスです。

Amazon ECS Datadog インテグレーションを利用し、CloudWatch から ECS メトリクスを自動的に収集します。ECS API に ECS イベント、タグ、およびコンテナインスタンス、タスク、サービスのステータスを照会することで、これらのメトリクスを拡張します。

## 計画と使用

### インフラストラクチャーリスト

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. AWS インテグレーションの [ロールの委任設定][1] に関する手順に従います。
2. Amazon ECS メトリクスを収集するため、[Datadog IAM ポリシー][2]で次のアクセス許可が設定されていることを確認します。ECS ポリシーの詳細については、AWS ドキュメントの [Amazon Elastic Container Service のアクション、リソース、条件キー][3]を参照してください。

| AWS アクセス許可                   | 説明                                                   |
| -------------------------------- | ------------------------------------------------------------- |
| `ecs:ListClusters`               | 既存のクラスターのリストを返します。                          |
| `ecs:ListContainerInstances`     | 指定されたクラスター内のコンテナインスタンスのリストを返します。 |
| `ecs:ListServices`               | 指定したクラスターで実行されているサービスを一覧表示します。   |
| `ecs:DescribeContainerInstances` | Amazon ECS コンテナインスタンスについて説明します。                     |

3. [AWS インテグレーションページ][4]で、`Metric Collection` タブの下にある `ECS` が有効になっていることを確認します。

    {{< img src="integrations/amazon_ecs/aws_tile.png" alt="Amazon ECS コンフィギュレーション" >}}

メトリクスの収集が有効な場合、ECS メトリクスの詳細を提供する[既定のダッシュボード][5]をこのインテグレーションで利用できます。詳細は、[Datadog で ECS をモニタリング][6]をご覧ください。

## Datadog Operator

### データセキュリティ
{{< get-metrics-from-git "amazon_ecs" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

**注**: [AWS インテグレーションページ][4]の `Metric Collection` タブで `Collect custom metrics` を有効にすることで、プレフィックスに `ecs.containerinsights.*` を持つメトリクスを収集することができます。

### ヘルプ

ノイズを減らすため、Amazon ECS インテグレーションは `drain`、`error`、`fail`、`insufficient memory`、`pending`、`reboot`、`terminate` の単語を含むイベントのみを収集するように自動的に設定されます。以下にイベントの例を示します。

{{< img src="integrations/amazon_ecs/aws_ecs_events.png" alt="Amazon ECS イベント" >}}

包含リストを削除し、Datadog Amazon ECS インテグレーションからすべてのイベントを取得できるようにするには、[Datadog のサポートチーム][8]までお問い合わせください。

### ヘルプ
{{< get-service-checks-from-git "amazon_ecs" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。



[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=automaticcloudformation#setup
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#datadog-aws-iam-policy
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_amazonelasticcontainerservice.html
[4]: https://app.datadoghq.com/integrations/amazon-web-services
[5]: https://app.datadoghq.com/screen/integration/82/aws-ecs
[6]: https://www.datadoghq.com/blog/monitoring-ecs-with-datadog/#get-comprehensive-visibility-with-datadog-dashboards
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ecs/amazon_ecs_metadata.csv
[8]: https://docs.datadoghq.com/ja/help/
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ecs/service_checks.json