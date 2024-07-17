---
categories:
- AWS
- クラウド
- ネットワーク
custom_kind: integration
dependencies: []
description: AWS Transit Gateway のキーメトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/amazon_transit_gateway/
draft: false
git_integration_title: amazon_transit_gateway
has_logo: true
integration_id: ''
integration_title: AWS Transit Gateway
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_transit_gateway
public_title: Datadog-AWS Transit Gateway インテグレーション
short_description: AWS Transit Gateway のキーメトリクスを追跡します。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

AWS Transit Gateway を使用して、仮想プライベートクラウド (VPC) とオンプレミスネットワークを相互接続します。

このインテグレーションを有効にすると、Datadog にすべての Transit Gateway メトリクスを表示できます。

## Setup

### Installation

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### Metric & Resource collection

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `TransitGateway` が有効になっていることを確認します。
2. Add the following permissions to your [Datadog IAM policy][3] to collect AWS Transit Gateway resources.

  | AWS Permission                                | Description                                                                                          |
  | --------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
  | `ec2:DescribeTransitGateways`                 | Grants permission to describe one or more transit gateways                                           |
  | `ec2:DescribeTransitGatewayVPCAttachments`    | Grants permission to describe one or more VPC attachments on a transit gateway.                      |
  | `ec2:DescribeTransitGatewayRouteTables`       | Grants permission to describe one or more transit gateway route tables.                              |
  | `ec2:GetTransitGatewayPrefixListReferences`   | Grants permission to get information about prefix list references for a transit gateway route table. |
  | `ec2:SearchTransitGatewayRoutes`              | Grants permission to search for routes in a transit gateway route table.                             |

3. Install the [Datadog - AWS Transit Gateway integration][4].


### 収集データ

#### Transit Gateway フローログ記録の有効化

Transit Gateway のフローログは、S3 バケットまたは CloudWatch のロググループに送信することができます。

1. AWS コンソールで、監視したい Transit Gateway に移動します。
2. **Flow logs** タブに移動します。
3. **Create flow log** をクリックします。
4. ログを送信する S3 バケットまたは CloudWatch のロググループを選択します。

**注**: S3 バケット名に `transit-gateway` という文字列を含めると、ログの自動パースが可能になります。

#### ログを Datadog に送信する方法

1. If you haven't already, set up the [Datadog Forwarder Lambda function][5] in your AWS account.
2. AWS アカウントで Datadog Forwarder Lambda 関数に移動します。Function Overview セクションで、**Add Trigger** をクリックします。
3. Trigger Configuration で **S3** または **CloudWatch Logs** トリガーを選択します。
4. Transit Gateway のログが含まれる S3 バケットまたは CloudWatch のロググループを選択します。
5. S3 の場合、イベントタイプは `All object create events` のままにしておきます。
6. **Add** をクリックすると、Lambda にトリガーが追加されます。

After a few minutes, Transit Gateway flow logs appear in your [Log Explorer][6].

For more information on collecting AWS Services logs, see [Send AWS Services Logs with the Datadog Lambda Function][7].

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_transit_gateway" >}}


### Events

AWS Transit Gateway インテグレーションには、イベントは含まれません。

### Service Checks

AWS Transit Gateway インテグレーションには、サービスのチェック機能は含まれません。

## Troubleshooting

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://app.datadoghq.com/integrations/amazon-transit-gateway
[5]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/ja/logs/explorer/
[7]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_transit_gateway/amazon_transit_gateway_metadata.csv
[9]: https://docs.datadoghq.com/ja/help/