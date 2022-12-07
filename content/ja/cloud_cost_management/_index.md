---
aliases:
- /ja/infrastructure/cloud_cost_management
further_reading:
- link: https://docs.datadoghq.com/infrastructure/cloud_cost_management/
  tag: GitHub
  text: Datadog Cloud Cost Management でクラウドコストの可視化とコントロールを実現する
kind: documentation
title: クラウド コスト マネジメント
---
## 概要

クラウドコストマネジメントは、エンジニアリングチームとファイナンスチームに、インフラストラクチャーの変更がコストにどのような影響を与えるかを示すインサイトを提供します。これにより、傾向を把握し、組織全体に費用を配分し、非効率性を特定することができます。
Datadog は、クラウドのコストデータをインジェストし、クエリ可能なメトリクスに変換します。コストが上昇した場合、その変化と使用状況の指標を関連付け、根本原因を特定することができます。

クラウドコストマネジメントを利用するには、Cost and Usage Report (CUR) にアクセスできる AWS アカウントを持ち、Datadog に AWS インテグレーションがインストールされている必要があります。

## セットアップ

Datadog で Cloud Cost Management をセットアップするには、Cost and Usage レポートを生成する必要があります。

### 前提条件: Cost and Usage Report を作成する

AWS の [Cost and Usage Report の作成][1]の説明に従い、Datadog Cloud Cost Management で使用するために以下のコンテンツオプションを選択します。

* **Include resource IDs** (リソース ID を含む)
* **"Automatically refresh your Cost & Usage Report when charges are detected for previous months with closed bills." (請求が締め切られた前月の料金が検出されると、コストと使用量レポートが自動的に更新されます。) のチェックボックスをオンにします。**

以下の Delivery オプションを選択します。

* 時間粒度: **Hourly**
* レポートのバージョン管理: **Create new report version** (新しいレポートのバージョンを作成する)
* 圧縮タイプ: **GZIP**
* フォーマット: `text/csv`

### AWS インテグレーションの構成

ドロップダウンメニューから AWS 管理アカウントを選択し、Datadog がこのアカウントに関連するタグを表示できるようにします。同じような名前の管理アカウントが複数ある場合、選択したアカウントに関連するタグを表示し、必要な特定のアカウントを選択したことを確認します。

**注**: Datadog では、関連する**メンバーアカウント**のコストを視覚化するために、[AWS **管理アカウント**][2]からコストと使用量のレポートを送信することを推奨しています。AWS **メンバーアカウント**からコストと使用量レポートを送信する場合、**管理アカウント**の[設定][3]で次のオプションが選択されていることを確認してください。

* **リンクされたアカウントへのアクセス**
* **リンクされたアカウントの払い戻しおよびクレジット**
* **リンクされたアカウントの割引**

これにより、AWS Cost Explorer に対して定期的にコスト計算を行うことができ、完全なコスト精度を確保することができます。

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

Datadog は取り込まれたコストデータにすぐに使えるタグを追加し、コストをさらに分解して割り当てることができるようにします。これらのタグは、[Cost and Usage Report (CUR)][6] に由来しています。

また、データのフィルタリングやグループ化には、以下のすぐに使えるタグが利用できます。

| タグ                          | 説明       |
| ---------------------------- | ----------------- |
| `aws_product`                | 課金対象となる AWS サービス。|
| `aws_product_family`         | 課金対象となる AWS サービスのカテゴリー (例: Compute、Storage など)。|
| `aws_management_account_name`| 項目に関連付けられた AWS 管理アカウント名。|
| `aws_management_account_id`  | 項目に関連付けられた AWS 管理アカウント ID。|
| `aws_member_account_name`    | 項目に関連付けられた AWS メンバーアカウント名。|
| `aws_member_account_id`      | 項目に関連付けられた AWS メンバーアカウント ID。|
| `aws_cost_type`              | この項目で対象となる料金の種類 (例: 使用料、消費税など)。|
| `aws_pricing_term`           | 予約、スポット、オンデマンドのいずれの利用形態か。|
| `aws_reservation_arn`        | 項目が恩恵を受けたリザーブドインスタンスの ARN。|
| `aws_savings_plan_arn`       | 項目が恩恵を受けたセービングプランの ARN。|
| `aws_usage_type`             | 項目の使用量 (例: BoxUsage:i3.8xlarge)。|
| `aws_operation`              | 項目に関連する演算子 (例: RunInstances)。|
| `aws_region`                 | 項目に関連するリージョン。|
| `aws_availability_zone`      | 項目に関連するアベイラビリティゾーン。|
| `aws_resource_id`            | 項目に関連するリソース ID。|
| `aws_instance_type`          | 項目に関連するインスタンスタイプ。|
| `aws_instance_family`        | 項目に関連するインスタンスファミリー (例: Storage optimized)。|
| `is_aws_ec2_compute`         | 使用が EC2 コンピュートに関するものかどうか。|
| `is_aws_ec2_compute_on_demand`| 使用がオンデマンドであるかどうか。|
| `is_aws_ec2_compute_reservation`| 使用がリザーブドインスタンスと関連しているかどうか。|
| `is_aws_ec2_capacity_reservation`| 使用が容量予約と関連しているかどうか。|
| `is_aws_ec2_spot_instance`   | 使用がスポットインスタンスと関連しているかどうか。|
| `is_aws_ec2_savings_plan`    | 使用がセービングプランと関連しているかどうか。|

## ダッシュボードに表示されるクラウドコスト

インフラストラクチャーの支出を、関連する使用量メトリクスと一緒に可視化することで、潜在的な非効率性と節約の機会を発見することができます。Datadog ダッシュボードのウィジェットにクラウドコストを追加するには、*Cloud Cost* データソースを選択します。

{{< img src="cloud_cost/cloud_cost_data_source.png" alt="ダッシュボードウィジェット作成時にデータソースとして利用できるクラウドコスト"  >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/cur/latest/userguide/cur-create.html
[2]: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html
[3]: https://us-east-1.console.aws.amazon.com/cost-management/home?region=us-east-1#/settings
[4]: https://docs.aws.amazon.com/cur/latest/userguide/view-cur.html
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[6]: https://docs.aws.amazon.com/cur/latest/userguide/data-dictionary.html