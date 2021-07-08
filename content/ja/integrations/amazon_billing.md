---
aliases:
  - /ja/integrations/awsbilling/
  - /ja/integrations/faq/using-datadog-s-aws-billing-integration-to-monitor-your-cloudwatch-usage/
categories:
  - cloud
  - Cost Management
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: AWS アカウントの支払実績と支払予測を監視
doc_link: 'https://docs.datadoghq.com/integrations/amazon_billing/'
draft: false
git_integration_title: amazon_billing
has_logo: true
integration_id: amazon-billing
integration_title: AWS Billing
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_billing
public_title: Datadog-AWS Billing インテグレーション
short_description: AWS アカウントの支払実績と支払予測を監視
version: '1.0'
---
## 概要

AWS Billing を使用すると、CloudWatch の使用量を含む AWS インフラストラクチャーの予測課金額やコストを追跡できます。

このインテグレーションを有効にすると、請求メトリクスを Datadog に表示できます。

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションタイル][2]のメトリクス収集で、`Billing` をオンにします。
2. AWS Billing のメトリクスを収集するには、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。AWS Budgets ポリシーの詳細については、[AWS Web サイトのガイド][4]を参照してください。

    | AWS アクセス許可       | 説明                      |
    | -------------------- | -------------------------------- |
    | `budgets:ViewBudget` | AWS の予算メトリクスの表示に使用されます。|

3. [AWS コンソール][5]内で請求メトリクスを有効にします。
4. [Datadog - AWS Billing インテグレーション][6]をインストールします。
5. [AWS 予算を作成][7]して、[メトリクス](#metrics)の受信を開始します。

**注**: AWS の予算メトリクスは、AWS マスターアカウントからのみ収集できます。

### ログの収集

#### ログの有効化

S3 バケットまたは CloudWatch のいずれかにログを送信するよう AWS Billing を構成します。

**注**: S3 バケットにログを送る場合は、_Target prefix_ が `amazon_billing` に設定されているかを確認してください。

#### ログを Datadog に送信する方法

1. [Datadog ログ コレクション AWS Lambda 関数][8]をまだ実行していない場合は、セットアップします。
2. lambda 関数がインストールされたら、AWS コンソールで、AWS Billing ログを含む S3 バケットまたは CloudWatch のロググループに手動でトリガーを追加します。

    - [S3 バケットに手動トリガーを追加][9]
    - [CloudWatch ロググループに手動トリガーを追加][10]

## CloudWatch 使用状況の監視

AWS アクセス許可を設定して `budgets:ViewBudget` アクセス許可を追加すると、このインテグレーションを使用して CloudWatch の請求情報を監視できます。

AWS の請求メトリクスは、約 4 時間ごとに取得できます。Datadog がこのメトリクスを収集するまで 4 時間かかる場合があります。

メトリクスが利用可能になったら、`aws.billing.estimated_charges` と `aws.billing.forecasted_charges` を調べます。これらのメトリクスを使用して、コンテキストを `service:amazoncloudwatch` まで絞り込むことで、CloudWatch の使用状況を追跡できます。また、`max:account_id` を使用して、支払額を AWS アカウントごとに分けることができます。

メトリクス `aws.billing.estimated_charges` は、当月のその時点までの CloudWatch 請求額と AWS が見なす額を示します。この値は、毎月初に 0 にリセットされます。メトリクス `aws.billing.forecasted_charges` は、当月の使用状況に基づいて CloudWatch が推定する月末時点の請求額を示します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_billing" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティ グループなど、AWS コンソールに表示されるのと同じタグが割り当てられます。

### イベント

AWS Billing インテグレーションには、イベントは含まれません。

### サービスのチェック

AWS Billing インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

### AWS Billing インテグレーションからメトリクスが報告されない

インテグレーションのトラブルシューティングに使用できるチェックリストを以下に示します。

1. IAM ポリシーに `budgets:ViewBudget` が含まれているか。
2. 支払者アカウントで請求メトリクスが有効になっているか。

**注**: AWS の請求メトリクスは、Datadog によって 4 時間ないしは 8 時間ごとに収集されます。

### メトリクスがない

`aws.billing.actual_spend`、`aws.billing.forecasted_spend`、または `aws.billing.budget_limit` がない場合は、[AWS 予算を作成][7]すると、Datadog でメトリクスの受信が開始されます。

**注**: AWS の請求メトリクスは、Datadog によって 4 時間ないしは 8 時間ごとに収集されます。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_budgets.html
[5]: http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics
[6]: https://app.datadoghq.com/account/settings#integrations/amazon_billing
[7]: https://console.aws.amazon.com/billing/home?#/createbudget
[8]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[9]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[10]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[11]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_billing/amazon_billing_metadata.csv