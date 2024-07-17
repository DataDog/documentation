---
title: Bits メニューの使用
---

## Overview

Cloudcraft の Bits メニューを使用すると、Cloudcraft 内の任意のリソースから Datadog の最も関連性の高いビューにシームレスに移動できます。この機能により、調査している特定のリソースに関連する情報に素早くアクセスできます。Datadog のログ、APM トレース、その他のデータに、Cloudcraft の図からワンクリックでアクセスできます。

<div class="alert alert-info">この機能にアクセスするには、Datadog アカウントを使用して Cloudcraft にログインします。他の方法でログインしている場合は、<a href="https://app.cloudcraft.co/app/support">サポートチームにお問い合わせください</a>。</div>

## Bits メニュー

まず、図内の[サポートされているコンポーネント](#supported-components)をクリックします。コンポーネントを選択すると、画面右側に Bits メニューが表示されます。

{{< img src="cloudcraft/getting-started/using-bits-menu/bits-menu.png" alt="赤い矢印で Bits メニューをハイライトした Cloudcraft のインターフェイスを示すスクリーンショット。" responsive="true" style="width:100%;">}}

Bits メニューをクリックすると、選択したコンポーネントで使用可能なオプションが表示されます。

{{< img src="cloudcraft/getting-started/using-bits-menu/bits-menu-clicked.png" alt="Bits メニューをクリックした Cloudcraft のスクリーンショットで、ホストダッシュボード、データベースモニタリング、クエリメトリクス、MySQL ダッシュボードなどのいくつかのオプションが表示されています。" responsive="true" style="width:100%;">}}

いずれかのオプションをクリックすると、Datadog で関連するビューが開きます。

## サポートされるコンポーネント

Bits メニューは、以下の Cloudcraft コンポーネントで利用できます。

**AWS:**

- Cloudfront
- DocumentDB
- DynamoDB
- EBS
- EC2
- EKS クラスター
- ELB/ALB
- Elasticache
- Lambda
- NAT ゲートウェイ
- OpenSearch
- RDS
- Redshift
- S3
- SNS トピック
- SQS
- VPC エンドポイント

**Azure:**

- AKS クラスター
- MySQL 用データベース
- PostgreSQL 用データベース
- 関数アプリ
- マネージドディスク
- SQL データベース
- 仮想マシン
- Web アプリ

追加コンポーネントのサポートは近日開始予定です。

**注**: コンポーネントのテレメトリーを Datadog で表示するには、そのコンポーネントに Datadog Agent やその他のインテグレーションがインストールされ、構成されている必要があります。