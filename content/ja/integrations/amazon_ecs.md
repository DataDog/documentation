---
aliases:
  - /ja/integrations/ecs/
categories:
  - cloud
  - containers
  - aws
  - log collection
ddtype: crawler
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
integration_id: amazon-ecs
integration_title: Amazon ECS on EC2
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_ecs
public_title: Datadog-Amazon ECS on EC2 インテグレーション
short_description: コンテナ ステータスのモニタリングやリソース使用状況のトラッキングなど。
version: '1.0'
---
<div class="alert alert-warning">
コンテナ化された Datadog Agent を ECS クラスターにデプロイする方法については、専用の <a href="https://docs.datadoghq.com/agent/amazon_ecs/"><b>Amazon ECS Agent ドキュメント</b></a>を参照してください。
</div>

## 概要

Amazon ECS on EC2 は、EC2 インスタンスで実行される Docker コンテナ用の拡張性とパフォーマンスに優れたコンテナ管理サービスです。

Amazon ECS Datadog インテグレーションを利用し、CloudWatch から ECS メトリクスを自動的に収集します。ECS API に ECS イベント、タグ、およびコンテナインスタンス、タスク、サービスのステータスを照会することで、これらのメトリクスを拡張します。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. AWS インテグレーションの [ロールの委任設定][1] に関する手順に従います。
2. [AWS タイル][2]で、IAM ロール名を入力し、**Limit metric collection**の下にある **ECS** ボックスにチェックマークを付けます。

    {{< img src="integrations/amazon_ecs/aws_tile.png" alt="AWS ECS コンフィギュレーション" >}}

メトリクスの収集が有効な場合、ECS メトリクスの詳細を提供する[ダッシュボード][3]をこのインテグレーションで利用できます。[ダッシュボード][4]の詳細をご覧ください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_ecs" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

**注**: `ecs.containerinsights.*` をプレフィックスに持つメトリクスは、[AWS CloudWatch エージェント][2]に基づいています。

### イベント

ノイズを減らすため、Amazon ECS インテグレーションは次の単語を含むイベントのみを収集するように自動的に設定されます。`drain`、`error`、`fail`、`insufficient memory`、`pending`、`reboot`、`terminate`。以下にイベントの例を示します。

{{< img src="integrations/amazon_ecs/aws_ecs_events.png" alt="AWS ECS イベント" >}}

ホワイトリストを削除し、Datadog Amazon ECS インテグレーションからすべてのイベントを取得できるようにするには、[Datadog のサポートチーム][6]までお問い合わせください。

### サービスのチェック
{{< get-service-checks-from-git "amazon_ecs" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=automaticcloudformation#setup
[2]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[3]: https://app.datadoghq.com/screen/integration/82/aws-ecs
[4]: https://www.datadoghq.com/blog/monitoring-ecs-with-datadog/#get-comprehensive-visibility-with-datadog-dashboards
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ecs/amazon_ecs_metadata.csv
[6]: https://docs.datadoghq.com/ja/help/
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ecs/service_checks.json