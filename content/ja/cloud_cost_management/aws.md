---
further_reading:
- link: /cloud_cost_management/
  tag: ドキュメント
  text: クラウドコストマネジメント
- link: /cloud_cost_management/azure
  tag: ドキュメント
  text: Azure の請求に関する洞察を得る
- link: /cloud_cost_management/google_cloud
  tag: ドキュメント
  text: Google Cloud の請求に関する洞察を得る
kind: ドキュメント
title: AWS
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">クラウドコストマネジメントはこのサイトではサポートされていません。</div>
{{< /site-region >}}

## 概要

Datadog で Cloud Cost Management をセットアップするには、以下が必要です。
1. 請求にアクセスできる AWS アカウントを持っていること
2. Datadog に AWS インテグレーションがインストールされていること
3. 以下の手順に従って、Cost and Usage レポートを作成すること

## 送信 - Agent チェック

### 前提条件: Cost and Usage Report を作成する

AWS の **Legacy Pages** セクションで Cost and Usage レポートを作成します。現時点では、Cost and Usage レポートのデータエクスポートの作成はサポートされていません。

以下のコンテンツオプションを選択します。

* **Include resource IDs** (リソース ID を含む)
* **Split cost allocation data** (ECS Cost Allocation を有効にします。また、コストエクスプローラーの環境設定で [AWS Split Cost Allocation][10] にオプトインする必要があります)。
* **"Refresh automatically"**

以下の Delivery オプションを選択します。

* 時間粒度: **Hourly**
* レポートのバージョン管理: **Create new report version** (新しいレポートのバージョンを作成する)
* 圧縮タイプ: **GZIP** または **Parquet**
* フォーマット: `text/csv` または `Parquet`

### AWS インテグレーションの構成

[Setup & Configuration][7] に移動し、プルダウンメニューからコストをプルする AWS アカウントを選択します。

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

**注**: Datadog は AWS によって生成された CUR のみをサポートしています。AWS によって生成されたファイルを変更したり移動したり、サードパーティによって生成されたファイルへのアクセスを提供しようとしないでください。

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

すぐに使えるコストタイプを使用して、取り込んだデータを視覚化します。コストタイプの主な違いは、割引率、節約プラン、予約に関するレポート方法です。

### オンデマンド
**オンデマンド**コストとは、AWS が公表している一般的なオンデマンド料金での利用コストです。これは、すべての節約プラン、予約、割引、税金、手数料を除きます。

ほとんどの場合、オンデマンドコストは実際のコストを見積もるための信頼できる情報源ではありません。

### 減価償却コストと非混合コスト
**減価償却**コストメトリクスは、割引期間を通じてコミットメントの節約を分配します。これは「発生主義」とも呼ばれます。予約及び節約プランは、毎月のコミットメントから引き落とされ、使用時に対象の使用量に直接適用されます。使用されなかった残りは料金として記載されます。

対照的に、**非混合**コストメトリクスは、費用が発生したその日のすべての料金を表示します。これは「原価主義」とも呼ばれます。予約および節約プランの料金は、それらが課金された日に表示され、対象となる使用量に直接適用されるわけではありません。月の請求データが確定すると、非混合メトリクスは AWS の請求書と正確に一致します。

### 正味コスト
**正味**コストは、使用量に直接非公開割引を適用します。特定のリソースの使用コストは、すべての節約を実現した後の実効コストを表します。

対照的に、他のメトリクスでは、非公開割引は、リソース属性タグのない独立した負の値の行項目として表示されます。これらのメトリクスは、割引を使用量に直接帰属させるのではなく、総コストから割引を差し引きます。

**正味減価償却**コストは、コスト割り当てのための最も正確な表現を提供し、すべての節約は使用量に直接適用されます。お客様の AWS アカウントに非公開交渉によるエンタープライズ割引がある場合、正味コストメトリクスが利用可能です。アカウントに正味メトリクスがない場合は、代わりに**減価償却**コストを使用してください。

### コンテナ割り当て
**コンテナ割り当て**メトリクスには、AWS メトリクスと同じコストがすべて含まれていますが、コンテナワークロードのための追加の内訳と洞察も含まれています。詳細は[コンテナコスト割り当て][11]を参照してください。

### 例
次のシナリオは、異なるコストタイプがどのように振る舞うかを示しています。以下を想定してみます。
- EC2 インスタンスが 1 時間実行され、計算時間あたりのコストは 3 ドル。
- このインスタンスタイプを計算時間あたり 2 ドルで提供する節約プラン。
- 他の割引に加え、交渉による 10% の EDP 割引。

インスタンスコスト、節約プランの時間単位のコミットメント、および割引が各コストタイプでどのように表示されるかを示します。

|コストタイプ |API |節約プラン |割引 | 説明 |
|:---------|-|-|-|:------------------------------------------------|
|オンデマンド |$3.00|||これは一般オンデマンド料金です。|
|非混合 |$3.00|$2.00|-$0.20|節約プランの定期費用と EDP 割引は、特定のリソースに関連付けられたものではなく、別の行項目です。(**注:** $3 のリソースコストは `SavingsPlanNegation` で相殺されます。) |
|正味非混合||$1.80||節約プランの定期費用は、割引が適用された行項目として表示されます。特定のリソースに関連したコストではありません。|
|減価償却 |$2.00||-$0.20|節約プラン割引は、リソースコストに直接適用されます。EDP 割引は別の行項目です。 |
|正味減価償却 |$1.80|||節約プランと EDP 割引は、リソースコストに直接適用されます。 |
|正味減価償却 - 共有リソースの割り当て |$1.80|||正味減価償却と同じコストですが、このコストは Kubernetes ディメンションとポッドタグによってさらに細分化できます。 |

### コストメトリクスのまとめ

一般的に
- `aws.cost.net.amortized.shared.resources.allocated` は、特定のワークロードやチームに対する最も完全なコスト割り当てを提供します。
- コンテナコスト割り当てがない場合は、`aws.cost.net.amortized` を使用してください。
- 正味減価償却コストがない場合は、`aws.cost.amortized.shared.resources.allocated` または `aws.cost.amortized` を使用してください。

| エラー予算アラート               | 説明           |
| -------------------- | --------------------- |
| `aws.cost.net.amortized.shared.resources.allocated` | すべての AWS の正味減価償却コストと、コンテナワークロードのための追加の内訳と洞察。[コンテナコスト割り当て][11]が必要です。|
| `aws.cost.net.amortized` | コンテナコストの内訳を含まない正味減価償却コスト。 |
| `aws.cost.net.unblended` | コンテナコストの内訳を含まない、正味非混合コスト。AWS の請求書と一致し、使用量コスト内で特別な割引が事前に計算されます。 |
| `aws.cost.amortized.shared.resources.allocated` | すべての AWS の減価償却コストと、コンテナワークロードのための追加の内訳と洞察。[コンテナコスト割り当て][11]が必要です。|
| `aws.cost.amortized` | コンテナコストの内訳を含まない減価償却コスト。 |
| `aws.cost.unblended` | コンテナコストの内訳を含まない、非混合コスト。AWS の請求書と一致します。 |
| `aws.cost.ondemand`  | コストは AWS が提供するリストレートに基づいており、すべての節約プラン、予約、割引、税金、手数料は含まれていません。 |

## タグエンリッチメント

以下に詳細を示すとおり、Datadog は、多くのソースを使用して取り込んだコストデータにタグを追加します。

- Cost and Usage Report 列
- AWS リソースタグ
- AWS アカウントタグ
- AWS インテグレーションタグ
- すぐに使えるタグ
- コンテナワークロードタグ
- タグパイプライン

### Cost and Usage Report 列

AWS の [Cost and Usage Report (CUR)][6] のすべての文字列値の列が、コストメトリクスのタグとして追加されます。

Datadog は一貫性を確保するために、アンダースコアと小文字を使用してタグキーを正規化します。例えば、CUR 列 `lineItem/ResourceId` はタグキー `line_item/resource_id` にマッピングされます。タグの値は一般的に変更されず、大文字と小文字の区別とほとんどの特殊文字が維持されます。

**例:**

|CUR 列|CUR 値|クラウドコストタグ|
|---|---|---|
|lineItem/ResourceId|i-12345678a9b12cd3e|line_item/resource_id:i-12345678a9b12cd3e|
|product/region|us-east-1|product/region:us-east-1|
|product/usagetype|DataTransfer-Regional-Bytes|product/usagetype:DataTransfer-Regional-Bytes|

### AWS リソースタグ

[AWS リソースタグ][12]は、EC2 インスタンスや S3 バケットなど、特定のリソースを表示する際に AWS コンソールに表示されるユーザー定義のタグです。

Datadog AWS インテグレーションを有効にすると、Datadog は自動的にほとんどの AWS リソースのリソースタグを収集します。これらのタグは、指定されたリソースの CUR で見つかったすべてのコストに適用されます。リソースタグは定期的に取得され、作成または変更された日からコストデータに適用されます。タグが変更されても、過去のタグ値は上書きされません。

AWS インテグレーションが有効になっていない場合、AWS 請求の[コスト割り当てタグ][13]をアクティブにすることで、リソースタグのリッチ化を有効にすることができます。これにより、AWS CUR の列として含めるリソースタグキーのサブセットを選択することができます。Datadog は、CUR を処理する際に、これらの列を自動的にタグとして含めます。

### AWS の組織とアカウントタグ
AWS 組織は、組織単位とアカウントに関する[ユーザー定義タグ][14]をサポートしています。Datadog は自動的にこれらのタグを取得し、コストデータに適用します。アカウントタグは、そのアカウントに関連するすべての使用量に適用されます。組織タグは、一致する支払者アカウントのすべての請求データに適用されます。

_組織アカウントの Datadog AWS インテグレーションが必要です。_

### AWS インテグレーションタグ

AWS インテグレーションタグは、Datadog インテグレーションページの AWS Integration タイルで設定されるタグです。これらは、関連する AWS アカウントの CUR で見つかったすべてのコストに適用されます。

### すぐに使えるタグ
Datadog は、取り込んだコストデータにすぐに使えるタグを追加し、コストの細分化と割り当てを支援します。これらのタグは、[Cost and Usage Report (CUR)][6] から導き出され、コストデータの発見と理解を容易にします。

データのフィルタリングやグループ化には、以下のすぐに使えるタグが利用できます。

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

#### コストと観測可能性の相関

観測可能性データのコンテキストでコストを表示することは、インフラストラクチャーの変更がコストに与える影響を理解し、コストが変化する理由を特定し、コストとパフォーマンスの両方のためにインフラストラクチャーを最適化するために重要です。Datadog は、観測可能性とコストメトリクスの相関を簡素化するために、AWS のトップ製品のコストデータ上のリソースを識別するタグを更新します。

例えば、各 RDS データベースのコストと利用率を表示するには、`aws.cost.amortized`、`aws.rds.cpuutilization`、`aws.rds.freeable_memory` (またはその他の RDS メトリクス) でテーブルを作成し、`dbinstanceidentifier` でグループ化します。また、Lambda の使用量とコストを並べて見るには、`aws.lambda.concurrent_executions` と `aws.cost.amortized` を `functionname` でグループ化してグラフ化します。

以下のすぐに使えるタグが用意されています。
| AWS 製品                  | タグ       |
| ---------------------------- | ----------------- |
| ec2                | `instance_id`|
| s3         | `bucketname`|
| rds         | `dbinstanceidentifier`|
| lambda         | `functionname`|
| dynamodb         | `tablename`|
| elasticache      | `cacheclusterid`|
| cloudfront (ディストリビューション)  | `distributionid`|
| cloudfront (関数)  | `functionname`|
| ec2 natgateway | `natgatewayid`|
| redshift         | `clusteridentifier`|
| kinesis         | `streamname`|
| queue         | `queuename`|
| sns         | `topicname`|
| elb (アプリケーション、ゲートウェイ、ネットワーク) | `loadbalancer`|
| elb (その他すべてのコスト) | `loadbalancername` |

### コンテナオーケストレーター

コンテナのコスト割り当てでは、コストが発生するワークロードのタグが追加されます。例えば、Kubernetes のポッドやノード、ECS のタスクやコンテナのタグなどです。

_[コンテナコストの割り当て][11]が必要で、`shared.resources.allocated` メトリクスにのみ適用されます。_

### タグパイプライン

最後に、[タグパイプライン][15]のすべてのルールセットが適用され、インフラストラクチャーのタグ付けが不可能な場合に、完全なコスト割り当てが提供されます。

## Billing conductor
Billing conductor は、請求レートのカスタマイズ、クレジットや手数料の分配、諸経費の分担など、お客様のご判断で請求書を簡素化することができます。また、CUR に含めるアカウントを選択することもできます。

Billing conductor CUR を作成するには、[AWS Cost and Usage Reports ユーザーガイド][8]に従ってください。CUR が [Datadog の要件][9]を満たしていることを確認します。
Billing conductor CUR を作成したら、上記のクラウドコストマネジメントの説明に従って、Datadog で設定します。

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/cur/latest/userguide/cur-create.html
[2]: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html
[3]: https://us-east-1.console.aws.amazon.com/cost-management/home?region=us-east-1#/settings
[4]: https://docs.aws.amazon.com/cur/latest/userguide/view-cur.html
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[6]: https://docs.aws.amazon.com/cur/latest/userguide/data-dictionary.html
[7]: https://app.datadoghq.com/cost/setup
[8]: https://docs.aws.amazon.com/cur/latest/userguide/cur-data-view.html
[9]: https://docs.datadoghq.com/ja/cloud_cost_management/?tab=aws#prerequisite-generate-a-cost-and-usage-report
[10]: https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html
[11]: https://docs.datadoghq.com/ja/cloud_cost_management/container_cost_allocation/#tags
[12]: https://docs.aws.amazon.com/tag-editor/latest/userguide/tagging.html
[13]: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/activating-tags.html
[14]: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_tagging.html
[15]: https://docs.datadoghq.com/ja/cloud_cost_management/tag_pipelines