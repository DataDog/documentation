---
aliases:
  - /ja/integrations/ecs/
categories:
  - cloud
  - containers
  - aws
  - log collection
ddtype: check
dependencies: []
description: コンテナ ステータスのモニタリングやリソース使用状況のトラッキングなど。
doc_link: 'https://docs.datadoghq.com/integrations/amazon_ecs/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/amazon-ecs-metrics'
    tag: ブログ
    text: キー ECS メトリクスの監視
  - link: 'https://docs.datadoghq.com/integrations/ecs_fargate'
    tag: Documentation
    text: ECS Fargate インテグレーション
git_integration_title: amazon_ecs
has_logo: true
integration_title: Amazon ECS on EC2
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_ecs
public_title: Datadog-Amazon ECS on EC2 インテグレーション
short_description: コンテナ ステータスのモニタリングやリソース使用状況のトラッキングなど。
version: '1.0'
---
## 概要

Amazon ECS on EC2 は、EC2 インスタンスで実行される Docker コンテナ用の拡張性とパフォーマンスに優れたコンテナ管理サービスです。

## セットアップ

ECS クラスターの各 EC2 インスタンス上で Agent をコンテナとして実行するには、**[専用の Amazon ECS ドキュメントを参照][1]**してください。

## その他の参考資料

Amazon ECS サービスを統合する方法 (または統合すべき理由) に関する詳細は、Datadog の[ブログ記事][2]をご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/agent/amazon_ecs/
[2]: https://www.datadoghq.com/blog/monitoring-ecs-with-datadog/