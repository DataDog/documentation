---
title: Cloud Cost Recommendations
private: true
description: Learn how to reduce the spending of your organization's cloud resources with Cost Recommendations.
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Learn about Cloud Cost Management
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Cost Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< callout url = "#" btn_hidden = "true" >}}
Cloud Cost Recommendations は AWS をサポートする公開ベータ版で、<a href="/cloud_cost_management/">Cloud Cost Management</a> を設定している場合に自動的に有効になります。
{{< /callout >}}

## 概要

[Cloud Cost Recommendations][1] は、クラウドリソースの使用を最適化することでクラウド支出を削減するための提案を提供します。

{{< img src="cloud_cost/recommendations/cost_recommendations.png" alt="Cloud Cost Recommendations ページで、毎月の潜在的な節約額、年間の潜在的な節約額、およびオープンケースの合計数を示す概要タブ" style="width:100%;" >}}

レコメンデーションは、請求データと可観測性データを組み合わせて、孤立した、レガシーの、または過剰にプロビジョニングされたクラウドリソースを特定します。

## セットアップ

レコメンデーションを受け取りたい各 AWS アカウントについて、

1. [Cloud Cost Management][2] を構成して、請求データを Datadog に送信します。
1. [AWS インテグレーションタイル][4]の **Resource Collection** タブで[リソースコレクション][3]を有効にします。
1. [Datadog Agent][5] をインストールします (過剰にプロビジョニングされたリソースのレコメンデーションに必要)。

## レコメンデーションタイプ

Datadog は、可観測性データと基盤となるクラウドプロバイダーの請求データを組み合わせて、一連のレコメンデーションを生成します。各レコメンデーションタイプの詳細なロジックは、レコメンデーション生成に使用された可観測性メトリクスやコストデータと共に、[**Recommendations** ページ][1]で確認できます。

{{< img src="cloud_cost/recommendations/overprovisioned_k8s_containers_sidepanel.png" alt="広告オークションサービスで過剰にプロビジョニングされている Kubernetes コンテナと、その使用状況を変更するための推奨される次のステップ、および調査メトリクスを表示するサイドパネル。" style="width:100%;" >}}

レコメンデーションは毎日実行され、お客様のアカウントで自動的に更新されます。新しいレコメンデーションがリリースされると、Datadog は自動的にアカウントに追加します。

### リソースレコメンデーションの終了

Datadog は、クラウド環境をスキャンして、削除可能な孤立したリソースを特定します。

未使用の EC2 インスタンス
: CPU 使用率が 5% 未満、メモリ使用率が 10% 未満の EC2 インスタンス。

未接続の EBS ボリューム
: EC2 インスタンスから切り離されたボリューム。

未使用の EBS ボリューム
: 稼働していない EC2 インスタンスに接続されたボリューム。

未使用の RDS インスタンス
: データベース接続が 0、レプリカラグが 0 の RDS インスタンス。

放棄された S3 マルチパートアップロード
: 不完全なマルチパートのアップロード ([Storage Lens メトリクス][6]が必要)。

未使用の Redshift クラスター
: データベース接続が 0 の Redshift クラスター。

未使用の Elasticache Redis クラスター
: キャッシュヒット数 0、レプリケーションバイト数 0 の Elasticache Redis クラスター。

未使用の MQ ブローカー
: 接続数が 0 の MQ ブローカー。

古い ECR イメージ
: ECR イメージのバイトが 180 日以上古い。

OpenSearch クラスター
: 接続数が 0 の OpenSearch クラスター。

未使用の Classic Elastic Load Balancer
: EC2 インスタンスに接続されていない、アクティブな接続のない Classic Elastic Load Balancer。

未使用のネットワーク Elastic ロードバランサー
: 処理バイト数が 0 のネットワークロードバランサー。

未使用のアプリケーションロードバランサー
: トラフィックが処理されていないアプリケーションロードバランサー。

未使用の NAT ゲートウェイ
: 送信されたバイトがない NAT ゲートウェイ。

アイドル状態の Elastic IP アドレス
: AWS のコストと使用レポートにおいて、アイドル状態の課金がある Elastic IP アドレス。

### リソース移行のレコメンデーション

Datadog は、レガシーなハードウェアで稼働しているリソースを表示します。コストを削減し、リソースのパフォーマンスを向上させるために、これらのリソースのアップグレードを検討することができます。

レガシー EC2 インスタンス
: 旧世代の、新しいインスタンスタイプにアップグレードできる EC2 インスタンス。

GP2 EBS ボリューム
: GP2 の、コスト削減とパフォーマンス向上のために GP3 にアップグレードできる EBS ボリューム。

I01 EBS ボリューム
: I01 の、コスト削減とパフォーマンス向上のために GP3 にアップグレードできる EBS ボリューム。

### リソースサイズ適正化のレコメンデーション

Datadog は、使用率が低い、または過剰にプロビジョニングされている個々のリソースを特定します。コスト削減とリソースのパフォーマンス向上のために、サイズと構成の調整を検討することができます。

EC2 インスタンスのダウンサイジング
: オートスケーリンググループに属さず、CPU とメモリの使用率が 50% 未満の EC2 インスタンス。


オーバープロビジョニングされた Kubernetes コンテナ
: CPU とメモリの使用率が 30% 未満のコンテナ。


オーバープロビジョニングされた EBS ボリュームのスループット
: スループット量が使用量を上回っている EBS ボリューム。


オーバープロビジョニングされた EBS ボリュームの IOPS
: IOPS の量が使用量を超えている EBS ボリューム。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/recommendations
[2]: /cloud_cost_management/aws/#setup
[3]: /integrations/amazon_web_services/#resource-collection
[4]: https://app.datadoghq.com/integrations/aws
[5]: /agent/
[6]: /integrations/amazon_s3_storage_lens/
