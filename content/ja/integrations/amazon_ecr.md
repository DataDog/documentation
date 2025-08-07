---
app_id: amazon_ecr
categories:
- クラウド
- aws
custom_kind: integration
description: Amazon ECR のキーメトリクスを追跡
title: Amazon ECR
---
## 概要

Amazon Elastic Container Registry (Amazon ECR) は、開発者が Docker コンテナイメージを簡単に保存、管理、デプロイできるようにするフルマネージドの Docker コンテナレジストリです。

このインテグレーションを有効にすると、Datadog ですべての ECR メトリクスが表示されます。

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration](https://docs.datadoghq.com/integrations/amazon_web_services/) first.

### メトリクスの収集

1. In the [AWS integration tile](https://app.datadoghq.com/integrations/amazon-web-services), ensure that `ECR` is checked
   確認します。
1. Install the [Datadog - ECR integration](https://app.datadoghq.com/integrations/amazon-ecr).

## 収集データ

### メトリクス

| | |
| --- | --- |
| **aws.ecr.repository_pull_count** <br>(count) | The total number of pulls for the images in the repository.|

### イベント

ECR インテグレーションには、イベントは含まれません。

### サービス チェック

ECR インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。