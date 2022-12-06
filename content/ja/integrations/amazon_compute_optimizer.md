---
aliases:
- /ja/integrations/aws-compute-optimizer
- /ja/integrations/aco
categories:
- クラウド
- AWS
dependencies: []
description: ユーザーのワークロードを適正化するためのリソース構成に関する推奨を提供します。
doc_link: https://docs.datadoghq.com/integrations/amazon_compute_optimizer/
draft: false
git_integration_title: amazon_compute_optimizer
has_logo: true
integration_id: amazon-compute-optimizer
integration_title: AWS Compute Optimizer
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_compute_optimizer
public_title: Datadog-AWS Compute Optimizer
short_description: ユーザーのワークロードを適正化するためのリソース構成に関する推奨を提供します。
version: '1.0'
---

## 概要

AWS Compute Optimizer は、ユーザーのワークロードを適正化するためのリソース構成に関する推奨を提供する Web サービスです。

このインテグレーションにより、Datadog Agent からのメモリ使用率データを使用して、AWS Compute Optimizer でより良い EC2 インスタンスタイプの推奨を得ることができるようになります。Compute Optimizer の詳細については、AWS ドキュメントの [What is AWS Compute Optimizer?][1] を参照してください。

## セットアップ

### APM に Datadog Agent を構成する

#### AWS
1. AWS Compute Optimizer のコンソールで、**Accounts** ページに移動し、外部メトリクス取り込みのアカウントレベルのプリファレンスを `Datadog` に設定してください。
2. 推奨を強化したい各 AWS アカウントについて、ステップ 1 を繰り返します。

#### Datadog
3. まだの場合は、希望する AWS アカウントごとに[まず Amazon Web Services インテグレーション][2]を設定します。
4. Compute Optimizer からの改善された推奨に含めるために、EC2 インスタンスに [Datadog Agent][3] をインストールします。
5. [Datadog - AWS Compute Optimizer インテグレーション][4]をインストールします。

すべてのステップが完了した後、AWS Compute Optimizer の推奨が Datadog からのメモリ使用率データを使用するために、**最大 30 時間**かかる場合があります。

#### 検証
EC2 インスタンスのリファレンステーブルで、Datadog が `External metrics source` として参照されていることを確認します。

{{< img src="integrations/amazon_compute_optimizer/compute_optimizer.png" alt="Compute Optimizer の推奨の AWS ダッシュボードには、3 つのインスタンスが表示され、各インスタンスの外部メトリクスソース列の下に Datadog のリンクがあります" popup="true">}}

## オートディスカバリーの動作

[Datadog の AWS インテグレーション][2]と [Datadog Agent][3] の両方で監視されているすべての EC2 インスタンスについて、Datadog は Agent から AWS Compute Optimizer にメモリ使用率データを送信し、コスト削減につながる可能性のあるインスタンスの推奨を向上させています。

**注:** Datadog のメモリ使用率メトリクスは、AWS アカウントではなく、AWS Compute Optimizer サービスと直接インテグレーションされています。Datadog は AWS アカウントと直接対話しないので、このインテグレーションに追加の IAM 権限は必要ありません。


## 収集データ

### メトリクス

Amazon Compute Optimizer インテグレーションには、メトリクスは含まれません。

### イベント

Amazon Compute Optimizer インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon Compute Optimizer インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[3]: https://docs.datadoghq.com/ja/agent/
[4]: https://app.datadoghq.com/integrations/amazon-compute-optimizer/
[5]: https://docs.datadoghq.com/ja/help/