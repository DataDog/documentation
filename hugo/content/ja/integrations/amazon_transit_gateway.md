---
categories:
- AWS
- クラウド
- ネットワーク
custom_kind: インテグレーション
dependencies: []
description: AWS Transit Gateway のキーメトリクスを追跡します。
doc_link: https://docs.datadoghq.com/integrations/amazon_transit_gateway/
draft: false
further_reading:
- link: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink-using-aws-transit-gateway/
  tag: アーキテクチャセンター
  text: AWS Transit Gateway を使用して AWS PrivateLink 経由で Datadog に接続する
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

## セットアップ

### インストール

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスとリソースの収集

1. [AWS インテグレーションページ][2]で、`Metric Collection` タブの下にある `TransitGateway` が有効になっていることを確認します。
2.  AWS Transit Gateway のリソースを収集するために、次のアクセス許可を [Datadog IAM ポリシー][3]に追加します。

  | AWS アクセス許可                                | 説明                                                                                          |
  | --------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
  | `ec2:DescribeTransitGateways`                 | 1 つ以上のトランジットゲートウェイを説明する許可を付与します。                                           |
  | `ec2:DescribeTransitGatewayVPCAttachments`    | トランジットゲートウェイの 1 つ以上の VPC アタッチメントを記述する権限を付与します。                      |
  | `ec2:DescribeTransitGatewayRouteTables`       | トランジットゲートウェイの 1 つ以上のルートテーブルを記述する権限を付与します。                              |
  | `ec2:GetTransitGatewayPrefixListReferences`   | トランジットゲートウェイのルートテーブルのプレフィックスリストリファレンスに関する情報を取得する権限を付与します。 |
  | `ec2:SearchTransitGatewayRoutes`              | トランジットゲートウェイのルートテーブルでルートを検索する権限を付与します。                             |

3. [Datadog - AWS Transit Gateway インテグレーション][4]をインストールします。


### ログ収集

#### Transit Gateway フローログ記録の有効化

Transit Gateway のフローログは、S3 バケットまたは CloudWatch のロググループに送信することができます。

1. AWS コンソールで、監視したい Transit Gateway に移動します。
2. **Flow logs** タブに移動します。
3. **Create flow log** をクリックします。
4. ログを送信する S3 バケットまたは CloudWatch のロググループを選択します。

**注**: S3 バケット名に `transit-gateway` という文字列を含めると、ログの自動パースが可能になります。

#### ログを Datadog に送信する方法

1. AWS アカウントで [Datadog Forwarder Lambda 関数][5] をまだセットアップしていない場合は、セットアップします。
2. AWS アカウントで Datadog Forwarder Lambda 関数に移動します。Function Overview セクションで、**Add Trigger** をクリックします。
3. Trigger Configuration で **S3** または **CloudWatch Logs** トリガーを選択します。
4. Transit Gateway のログが含まれる S3 バケットまたは CloudWatch のロググループを選択します。
5. S3 の場合、イベントタイプは `All object create events` のままにしておきます。
6. **Add** をクリックすると、Lambda にトリガーが追加されます。

数分後、Transit Gateway のフローログが[ログエクスプローラー][6]に表示されます。

AWS Services のログを収集する方法については、[Datadog Lambda 関数で AWS Services のログを送信する][7]を参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_transit_gateway" >}}


### イベント

AWS Transit Gateway インテグレーションには、イベントは含まれません。

### サービスチェック

AWS Transit Gateway インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://app.datadoghq.com/integrations/amazon-transit-gateway
[5]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/ja/logs/explorer/
[7]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_transit_gateway/amazon_transit_gateway_metadata.csv
[9]: https://docs.datadoghq.com/ja/help/
