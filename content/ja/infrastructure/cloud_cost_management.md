---
title: クラウド コスト マネジメント
kind: documentation
---

<div class="alert alert-warning">クラウドコストマネジメントは、現時点では非公開ベータ版であり、AWS のみ対応しています。アクセスリクエストは<a href="https://www.datadoghq.com/cloud-cost-management-beta/">こちらのフォーム</a>からお願いします。</div>

## 概要

クラウドコストマネジメントは、エンジニアリングチームとファイナンスチームに、インフラストラクチャーの変更がコストにどのような影響を与えるかを示すインサイトを提供します。これにより、傾向を把握し、組織全体に費用を配分し、非効率性を特定することができます。
Datadog は、クラウドのコストデータをインジェストし、クエリ可能なメトリクスに変換します。コストが上昇した場合、その変化と使用状況の指標を関連付け、根本原因を特定することができます。

## セットアップ

クラウドコストマネジメントを利用するには、Cost Usage Report (CUR) にアクセスできる AWS アカウントを持ち、Datadog に AWS インテグレーションがインストールされている必要があります。

**注:** Datadog でデータが安定するまでに、セットアップ後最大 48～72 時間かかることがあります。

### CUR を生成する

AWS の[コストレポートと使用量レポートの作成][1]の説明に従って、以下の Content オプションを選択します。

* **Include resource IDs** (リソース ID を含む)
* **Automatically refresh your Cost & Usage report** (コストと使用量レポートを自動更新)

以下の Delivery オプションを選択します。

* 時間粒度: **Hourly**
* レポートのバージョン管理: **Create new report version** (新しいレポートのバージョンを作成する)
* 圧縮タイプ: **GZIP**
* フォーマット: `text/csv`

### CUR へのアクセスを構成する

以下の JSON を使用して[ポリシーを作成][2]することで、Datadog が CUR とそれが格納されている s3 バケットにアクセスする権限を持つように AWS を構成します。

{{< code-block lang="yaml" collapsible="true" >}}
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "DDCCMListBucket",
          "Effect": "Allow",
          "Action": [
              "s3:ListBucket"
          ],
          "Resource": "arn:aws:s3:::BUCKETNAME"
      },
      {
          "Sid": "DDCCMGetObject",
          "Effect": "Allow",
          "Action": [
              "s3:GetObject"
          ],
          "Resource": "arn:aws:s3:::BUCKETNAME/REPORT_PREFIX/REPORT_NAME/*"
      },
      {
          "Sid": "CostExplorerAccuracyCheck",
          "Effect": "Allow",
          "Action": [
              "ce:Get*"
          ],
          "Resource": "*"
      },
      {
          "Sid": "CURReportDefinition",
          "Action": [
            "cur:DescribeReportDefinitions"
          ],
          "Effect": "Allow",
          "Resource": "*"
        }
  ]
}
{{< /code-block >}}

**ヒント:** このポリシーのために作成した名前は、次のステップのために手元に置いてください。

### Datadog のインテグレーションロールにポリシーをアタッチする

Datadog のインテグレーションロールに新しい S3 ポリシーをアタッチします。

1. AWS IAM コンソールで **Roles** に移動します。
2. Datadog インテグレーションで使用されるロールを見つけます。デフォルトでは、 **DatadogIntegrationRole** という名前になっていますが、組織で名前を変更した場合は、名前が異なる場合があります。ロール名をクリックすると、ロールのサマリーページが表示されます。
3. **Attach policies** をクリックします。
4. 上記で作成した S3 バケットポリシーの名称を入力します。
5. **Attach policy** をクリックします。

## コストタイプ

インジェストしたデータは、以下のコストタイプで可視化することができます。

| コストタイプ            | 説明           |
| -------------------- | --------------------- |
| `aws.cost.amortized` | 適用される割引率に基づくコストと、割引期間中の使用量に応じたプリペイドの配分 (発生主義)。 |
| `aws.cost.unblended` | 使用時に請求される金額で表示されるコスト (現金主義)。|
| `aws.cost.blended`   | 組織のメンバーアカウントで、ある利用形態に対して支払われた平均的な料金に基づくコスト。|
| `aws.cost.ondemand`  | AWS から提供されるリストレートに基づくコスト。 |

## タグエンリッチメント

Datadog は、インジェストされたコストデータにタグを追加し、コストをさらに分解して理解できるようにします。

追加されたタグは、システムが Datadog に提供する観測可能データ、[AWS リソースタグ][3]で構成されたリソースからのデータ、[コストと使用量レポート (CUR)][4] とコストデータの関連付けを行うものです。

また、データのフィルタリングやグループ化には、以下のタグが利用できます。

| タグ                        | 説明       |
| -------------------------- | ----------------- |
| `cloud_product`            | 課金対象となるクラウドサービス。|
| `cloud_product_group`      | 課金対象となるクラウドサービスのカテゴリー (例: Compute、Storage など)|
| `cloud_usage_type`         | この項目の使用に関する詳細です。|
| `cloud_charge_type`        | この項目で対象となる料金の種類 (例: 使用料、消費税など)|
| `cloud_purchase_type`      | 予約、スポット、オンデマンドのいずれの利用形態か。|
| `cloud_account`            | この項目を使用したアカウントの ID。|
| `cloud_billing_account_id` | この使用料を支払っているアカウントの ID。|

## ダッシュボードに表示されるクラウドコスト

インフラストラクチャーの支出を、関連する使用量メトリクスと一緒に可視化することで、潜在的な非効率性と節約の機会を発見することができます。Datadog ダッシュボードのウィジェットにクラウドコストを追加するには、*Cloud Cost* データソースを選択します。

{{< img src="infrastructure/cloudcost/cloud_cost_data_source.png" alt="ダッシュボードウィジェット作成時にデータソースとして利用できるクラウドコスト"  >}}

[1]: https://docs.aws.amazon.com/cur/latest/userguide/cur-create.html
[2]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[3]: https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html
[4]: https://docs.aws.amazon.com/cur/latest/userguide/data-dictionary.html
