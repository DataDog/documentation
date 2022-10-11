---
kind: documentation
title: クラウド コスト マネジメント
---

<div class="alert alert-warning">クラウドコストマネジメントは、現時点では非公開ベータ版であり、AWS のみ対応しています。アクセスリクエストは<a href="https://www.datadoghq.com/cloud-cost-management-beta/">こちらのフォーム</a>からお願いします。</div>

## 概要

クラウドコストマネジメントは、エンジニアリングチームとファイナンスチームに、インフラストラクチャーの変更がコストにどのような影響を与えるかを示すインサイトを提供します。これにより、傾向を把握し、組織全体に費用を配分し、非効率性を特定することができます。
Datadog は、クラウドのコストデータをインジェストし、クエリ可能なメトリクスに変換します。コストが上昇した場合、その変化と使用状況の指標を関連付け、根本原因を特定することができます。

クラウドコストマネジメントを利用するには、Cost and Usage Report (CUR) にアクセスできる AWS アカウントを持ち、Datadog に AWS インテグレーションがインストールされている必要があります。

## セットアップ

Datadog で Cloud Cost Management をセットアップするには、Cost and Usage レポートを生成する必要があります。

### 前提条件: Cost and Usage Report を作成する

AWS の [Cost and Usage Report の作成][1]の説明に従い、Datadog Cloud Cost Management で使用するために以下のコンテンツオプションを選択します。

* **Include resource IDs** (リソース ID を含む)
* **Automatically refresh your Cost & Usage Report** (コストと使用量レポートを自動更新)

以下の Delivery オプションを選択します。

* 時間粒度: **Hourly**
* レポートのバージョン管理: **Create new report version** (新しいレポートのバージョンを作成する)
* 圧縮タイプ: **GZIP**
* フォーマット: `text/csv`

### AWS インテグレーションの構成

ドロップダウンメニューから AWS 管理アカウントを選択し、Datadog がこのアカウントに関連するタグを表示できるようにします。同じような名前の管理アカウントが複数ある場合、選択したアカウントに関連するタグを表示し、必要な特定のアカウントを選択したことを確認します。

**注**: Datadog では、関連する**メンバーアカウント**のコストを視覚化するために、[AWS **管理アカウント**][2]からコストと使用量のレポートを送信することを推奨しています。AWS **メンバーアカウント**からコストと使用量レポートを送信する場合、Datadog がメンバーアカウントを完全に視覚化できるように、**管理アカウント**の[設定][3]で次のオプションが選択されていることを確認してください。

* **リンクされたアカウントへのアクセス**
* **リンクされたアカウントの払い戻しおよびクレジット**
* **リンクされたアカウントの割引**

### Cost and Usage Report を探す

セットアップの前提条件のセクションで作成したレポートから移動してしまった場合は、AWS のドキュメントに従って [Cost and Usage Report の詳細][4]を見つけて表示します。

Datadog が Cost and Usage Report を検索できるようにするには、対応する詳細情報をフィールドに入力します。

* **Region**: バケットがあるリージョンです。例: `us-east-1`
* **Bucket Name**: CUR の保存先となる s3 バケット名です。
* **Report Path Prefix**: フォルダ名です。AWS の詳細ページから **Report path prefix** を表示する場合、パスの最初のセクションになります。例えば、**Report path prefix** が `cur-report-dir/cost-report` と表示されている場合、`cur-report-dir` と入力することになります。
* **Report Name**: 前提条件のセクションでレポートを生成したときに入力した名前です。AWS の詳細ページから **Report path prefix** を表示する場合、パスの後半部分となります。例えば、**Report path prefix** が `cur-report-dir/cost-report` と表示されている場合、`cost-report` と入力することになります。

### Cost and Usage Report へのアクセス構成

以下の JSON を使用して[ポリシーを作成][5]することで、Datadog が CUR とそれが格納されている s3 バケットにアクセスする権限を持つように AWS を構成します。

{{< code-block lang="yaml" collapsible="true" >}}
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "DDCloudCostReadBucket",
          "Effect": "Allow",
          "Action": [
              "s3:ListBucket"
          ],
          "Resource": "arn:aws:s3:::BUCKETNAME"
      },
      {
          "Sid": "DDCloudCostGetBill",
          "Effect": "Allow",
          "Action": [
              "s3:GetObject"
          ],
          "Resource": "arn:aws:s3:::BUCKETNAME/REPORT_PREFIX/REPORT_NAME/*"
      },
      {
          "Sid": "DDCloudCostCheckAccuracy",
          "Effect": "Allow",
          "Action": [
              "ce:Get*"
          ],
          "Resource": "*"
      },
      {
          "Sid": "DDCloudCostListCURs",
          "Action": [
              "cur:DescribeReportDefinitions"
          ],
          "Effect": "Allow",
          "Resource": "*"
      },
      {
          "Sid": "DDCloudCostListOrganizations",
          "Action": [
              "organizations:Describe*",
              "organizations:List*"
          ],
          "Effect": "Allow",
          "Resource": "*"
      }
  ]
}
{{< /code-block >}}

**ヒント:** このポリシーのために作成した名前は、次のステップのためにメモしておいてください。

### Datadog のインテグレーションロールにポリシーをアタッチする

Datadog のインテグレーションロールに新しい S3 ポリシーをアタッチします。

1. AWS IAM コンソールで **Roles** に移動します。
2. Datadog インテグレーションで使用されるロールを見つけます。デフォルトでは、 **DatadogIntegrationRole** という名前になっていますが、組織で名前を変更した場合は、名前が異なる場合があります。ロール名をクリックすると、ロールのサマリーページが表示されます。
3. **Attach policies** をクリックします。
4. 上記で作成した S3 バケットポリシーの名称を入力します。
5. **Attach policy** をクリックします。

**注:** Datadog でデータが安定するまでに、セットアップ後最大 48～72 時間かかることがあります。
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

追加されたタグは、システムが Datadog に提供する観測可能データ、[AWS リソースタグ][6]で構成されたリソースからのデータ、[Cost and Usage Report (CUR)][7] とコストデータの関連付けを行うものです。

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
[2]: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html
[3]: https://us-east-1.console.aws.amazon.com/cost-management/home?region=us-east-1#/settings
[4]: https://docs.aws.amazon.com/cur/latest/userguide/view-cur.html
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[6]: https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html
[7]: https://docs.aws.amazon.com/cur/latest/userguide/data-dictionary.html