---
aliases:
- /ja/integrations/awsbilling/
- /ja/cloud_cost_management/aws/
further_reading:
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management
- link: /cloud_cost_management/azure
  tag: ドキュメント
  text: Azure の請求に関する情報を得る
- link: /cloud_cost_management/google_cloud
  tag: ドキュメント
  text: Google Cloud の請求に関する情報を得る
- link: /cloud_cost_management/oracle
  tag: ドキュメント
  text: Oracle の請求に関する情報を得る
title: AWS
---
## 概要 {#overview}

Datadog で Cloud Cost Management をセットアップするには以下が必要です。
1. 請求アクセス権がある AWS アカウント
2. Datadog にインストールされた AWS インテグレーション
3. コストと使用状況レポート (以下の手順に従って作成)

## セットアップ {#setup}

[API][21]、[Terraform][22]、または以下の手順に従って Datadog で直接セットアップできます。

### AWS インテグレーションを構成する {#configure-the-aws-integration}

[Setup & Configuration][7] に移動し、AWS アカウントを追加して AWS インテグレーションを構成する手順に従います。

**注**: Datadog では、関連する**メンバーアカウント**のコストを視覚化するために、[AWS **管理アカウント**][2]からコストと使用量のレポートを構成することを推奨しています。

AWS **メンバーアカウント**からコストと使用量レポートを送信する場合、**管理アカウント**の[設定][3]で次のオプションが選択されていることを確認してください。
- {{< ui >}}Linked Account Access{{< /ui >}}
- {{< ui >}}Linked Account Refunds and Credits{{< /ui >}}
- {{< ui >}}Linked Account Discounts{{< /ui >}}

これらの設定により、AWS Cost Explorer に対して定期的にコスト計算を行うことができ、完全なコスト精度を確保することができます。

{{< tabs >}}

{{% tab "CloudFormation" %}}

{{< img src="cloud_cost/setup/aws_cloudformation_setup.png" alt="CloudFormation モードの Cloud Cost Management セットアップフォーム" style="width:100%" >}}

### 作成するリソースを選択する {#select-the-resources-to-create}

CloudFormation スタックは、既存の AWS リソースに応じて 3 つの方法で構成できます。

* **新しいセットアップ**: {{< ui >}}Create Cost and Usage Report{{< /ui >}} を選択して、レポートとその S3 バケットの両方を作成する
* **既存のバケット**: {{< ui >}}Create Cost and Usage Report{{< /ui >}} を選択して {{< ui >}}Create S3 Bucket{{< /ui >}} の選択を解除し、既存の S3 バケットを使用する
* **既存のレポート**: {{< ui >}}Create Cost and Usage Report{{< /ui >}} の選択を解除して、既存のコストと使用状況レポートをインポートする

### コストと使用状況レポートの設定を構成する {#configure-the-cost-and-usage-report-settings}

コストと使用状況レポートのために以下の詳細を入力します。

* {{< ui >}}Bucket Name{{< /ui >}}: レポートファイルが保存されている S3 バケット名。
* {{< ui >}}Bucket Region{{< /ui >}}: S3 バケットを含むリージョンの AWS [リージョンコード][100]。例: `us-east-1`。
* {{< ui >}}Export Path Prefix{{< /ui >}}: レポートファイルが保存されている S3 パスプレフィックス。
  * **注:** 次のプレフィックス形式はサポート対象外: 空白、`/` で始まるもの (`/` や `/cost` など)、または `/` で終わるもの (`cost/` など)。中間に `/` を含むプレフィックスはサポートされています (`cost/hourly` など)。
* {{< ui >}}Export Name{{< /ui >}}: コストと使用状況レポートの名前。

**注**:
- これらの値は、既存のコストと使用状況レポートを特定したり、新しく作成されるリソースの設定を定義したりします。
- 完全なコストと使用状況レポートが生成された後、すべての利用可能なデータが Datadog 組織に反映されるまでには、48 時間から 72 時間かかる場合があります。72 時間が経過してもデータがまだ反映されていない場合は、[Datadog サポート][101]にお問い合わせください。

[100]: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html
[101]: /ja/help/

{{% /tab %}}

{{% tab "Terraform" %}}

{{< img src="cloud_cost/setup/aws_terraform_setup.png" alt="コストと使用状況レポートの設定 (バケット名、リージョン、エクスポートの詳細を含む) を構成するために展開されたステップ 1 が表示されている、Terraform オプションが選択された CCM 設定ページ" style="width:100%" >}}

### 作成するリソースを選択する {#select-the-resources-to-create-1}

Terraform の構成は、既存の AWS リソースに応じて 3 つのステップをサポートしています。

* **新しいセットアップ**: {{< ui >}}Create Cost and Usage Report{{< /ui >}} を選択して、レポートとその S3 バケットの両方を作成する
* **既存のバケット**: {{< ui >}}Create Cost and Usage Report{{< /ui >}} を選択して {{< ui >}}Create S3 Bucket{{< /ui >}} の選択を解除し、既存の S3 バケットを使用する
* **既存のバケットとレポート**: {{< ui >}}Create Cost and Usage Report{{< /ui >}} と {{< ui >}}Create S3 Bucket{{< /ui >}} の選択を解除して、既存のレポートと S3 バケットを使用する

**注**: 既存のバケットを使用する場合は、AWS がそのバケットに CUR を書き込む権限を持っていることを確認してください。そうでない場合は、バケットのポリシーを更新する必要があるかもしれません。

### コストと使用状況レポートの設定を構成する {#configure-the-cost-and-usage-report-settings-1}

コストと使用状況レポートのために以下の詳細を入力します。

* {{< ui >}}Bucket Name{{< /ui >}}: レポートファイルが保存されている S3 バケット名。
* {{< ui >}}Bucket Region{{< /ui >}}: S3 バケットを含むリージョンの AWS [リージョンコード][100]。例: `us-east-1`。
* {{< ui >}}Export Path Prefix{{< /ui >}}: レポートファイルが保存されている S3 パスプレフィックス。
  * **注:** 次のプレフィックス形式はサポート対象外: 空白、`/` で始まるもの (`/` や `/cost` など)、または `/` で終わるもの (`cost/` など)。中間に `/` を含むプレフィックスはサポートされています (`cost/hourly` など)。
* {{< ui >}}Export Name{{< /ui >}}: コストと使用状況レポートの名前。

**注**:
- これらの値は、既存のコストと使用状況レポートを特定したり、新しく作成されるリソースの設定を定義したりします。
- 完全なコストと使用状況レポートが生成された後、すべての利用可能なデータが Datadog 組織に反映されるまでには、48 時間から 72 時間かかる場合があります。72 時間が経過してもデータがまだ反映されていない場合は、[Datadog サポート][101]にお問い合わせください。

[100]: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html
[101]: /ja/help/

### 生成された Terraform HCL をコピーし、変更を適用する {#copy-generated-terraform-hcl-and-apply-changes}

CCM Terraform セットアップ UI で、{{< ui >}}Apply Terraform Configuration{{< /ui >}} ステップの指示に従ってください。CCM に戻ってアカウント作成を確認する前に、`terraform plan` または `terraform apply` を実行中に表示される問題を解決します。

{{% /tab %}}

{{% tab "手動" %}}

{{< img src="cloud_cost/setup/aws_manual_setup.png" alt="手動モードの Cloud Cost Management セットアップフォーム" style="width:100%" >}}

### 前提条件: Cost and Usage Report を作成する{#prerequisite-generate-a-cost-and-usage-report}

{{< ui >}}Data Exports{{< /ui >}} セクションの AWS で[レガシーコストと使用状況レポートを作成][201]します。

エクスポートタイプ {{< ui >}}Legacy CUR export{{< /ui >}} を選択します。

以下のコンテンツオプションを選択します。

* エクスポートタイプ: {{< ui >}}Legacy CUR export{{< /ui >}}
* {{< ui >}}Include resource IDs{{< /ui >}}
* {{< ui >}}Split cost allocation data{{< /ui >}} (ECS Cost Allocation を有効にします。Cost Explorer 設定で、[AWS Split コスト割り当て][210]へのオプトインも行う必要があります。
* {{< ui >}}Refresh automatically{{< /ui >}}

以下の配信オプションを選択します。

* 時間粒度: {{< ui >}}Hourly{{< /ui >}}
* レポートのバージョン管理: {{< ui >}}Create new report version{{< /ui >}}
* 圧縮タイプ: {{< ui >}}GZIP{{< /ui >}} または {{< ui >}}Parquet{{< /ui >}}

### コストと使用状況レポートを探す {#locate-the-cost-and-usage-report}

セットアップの前提条件のセクションで作成したレポートから移動してしまった場合は、AWS のドキュメントに従って[データエクスポートを表示][204]します。作成したレガシー CUR エクスポートを選択し、次に {{< ui >}}Edit{{< /ui >}} を選択してエクスポートの詳細を表示します。

Datadog が Cost and Usage Report を検索できるようにするには、対応する詳細情報をフィールドに入力します。

* {{< ui >}}Bucket Name{{< /ui >}}: これはデータエクスポートストレージ設定セクションの S3 バケットの名前です。
* {{< ui >}}Bucket Region{{< /ui >}}: これはバケットがあるリージョンです。例: `us-east-1`。
* {{< ui >}}Export Path Prefix{{< /ui >}}: これはデータエクスポートストレージ設定セクションの S3 パスプレフィックスです。
  * **注:** 次のプレフィックス形式はサポート対象外: 空白、`/` で始まるもの (`/` や `/cost` など)、または `/` で終わるもの (`cost/` など)。中間に `/` を含むプレフィックスはサポートされています (`cost/hourly` など)。
* {{< ui >}}Export Name{{< /ui >}}: これはエクスポート名セクションのエクスポート名です。

**注**: Datadog は、AWS によって生成されたレガシーコストと使用状況レポート (CUR) のみをサポートしています。AWS によって生成されたファイルを変更または移動したり、サードパーティによって生成されたファイルへのアクセスを提供しようとしたりしないでください。

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">AWS コストと使用状況レポートエンドポイントは、上記のフィールドを S3 バケット内の CUR エクスポートと照合するために使用されます。このエンドポイントは FIPS 検証されていません。</div>
{{< /site-region >}}

### コストと使用状況レポートへのアクセスを構成する {#configure-access-to-the-cost-and-usage-report}

AWS で[ポリシーを作成][205]して、Datadog が CUR とそれが格納されている S3 バケットにアクセスできる権限を持つようにします。以下の JSON を使用します。

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

**注:** このポリシーのために作成した名前は、次のステップのためにメモしておいてください。

### Datadog のインテグレーションロールにポリシーをアタッチする{#attach-the-policy-to-the-datadog-integration-role}

Datadog のインテグレーションロールに新しい S3 ポリシーをアタッチします。

1. AWS IAM コンソールで {{< ui >}}Roles{{< /ui >}} に移動します。
2. Datadog インテグレーションで使用されているロールを特定します。デフォルトでは **DatadogIntegrationRole** という名前ですが、組織で名称が変更されている場合は異なる可能性があります。ロール名をクリックして、ロールのサマリーページを開きます。
3. {{< ui >}}Attach policies{{< /ui >}} をクリックします。
4. 上記で作成した S3 バケットポリシーの名称を入力します。
5. {{< ui >}}Attach policy{{< /ui >}} をクリックします。

**注**: 完全なコストと使用状況レポートが生成された後、すべての利用可能なデータが Datadog 組織に反映されるまでには、48 時間から 72 時間かかる場合があります。72時間が経過してもデータがまだ反映されていない場合は、[Datadog サポート][18]にお問い合わせください。

[201]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-create-legacy.html
[204]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-view.html
[205]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[210]: https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html

{{% /tab %}}

{{< /tabs >}}

### アカウントフィルタリング {#account-filtering}

アカウントフィルタリングを使用して、Cloud Cost Management に取り込む AWS メンバーアカウントを管理します。アカウントフィルタリングをしても、Datadog の追加コストは発生しません。

アカウントフィルタリングを使用するには、AWS 管理アカウントが必要です。アカウントが Cloud Cost Management に設定された後、アカウントフィルターを構成できます。

**注:** アカウントフィルターはタグ検索には対応していません。

#### 既存のアカウントのアカウントフィルターを構成する {#configure-account-filters-for-an-existing-account}

[**Cloud Cost** > **設定**、**アカウント**][17]の順に移動し、フィルタリングしたい管理アカウントの {{< ui >}}Manage Account{{< /ui >}} をクリックします。

{{< img src="cloud_cost/account_filtering/manage_account.png" alt="アカウントカードの管理アカウントボタン" style="width:100%;" >}}

{{< ui >}}Billing dataset{{< /ui >}} をクリックして、アカウントフィルタリング UI にアクセスします。

{{< img src="cloud_cost/account_filtering/account_filtering.png" alt="AWS メンバーアカウントをフィルタリングするためのアカウントフィルタリング UI" style="width:100%;" >}}

### 履歴データの取得 {#getting-historical-data}

S3 で利用可能な履歴データがすでにあるコストと使用状況レポートを構成する場合、Datadog は最大 15 か月分の履歴コストデータを自動的に取り込みます。

新しく構成したレポートに履歴データがない場合は、AWS からのバックフィルをリクエストできます。

AWS の履歴コストデータのバックフィルをリクエストするには

1. [AWS サポートケースを開き][20]、コストデータのバックフィルをリクエストします。
2. リクエストには**レポート名**と**希望する請求期間**を含めてください。
3. AWS がバックフィルリクエストを処理するまで待ちます。

AWS によってデータがバックフィルされると、Datadog は 24 時間以内にデータを自動的に取り込みます。

AWS は、AWS アカウント以前のコストデータや以前の AWS Organizations 構造を反映したコストデータをバックフィルすることはできません。

詳細については、[AWS コストと使用状況レポートのトラブルシューティングガイド][20]を参照してください。

## コストタイプ {#cost-types}

すぐに使えるコストタイプを使用して、取り込んだデータを可視化します。コストタイプの主な違いは、割引率、節約プラン、予約に関するレポート方法です。

### オンデマンド {#on-demand}
**オンデマンド**コストは、AWS が公開したパブリックオンデマンド料金の使用コストを表します。これには、すべての節約プラン、予約、割引、税金、手数料は含まれません。

**注**: ほとんどの場合、オンデマンドコストは実際のコストを見積もるための信頼できる情報源ではありません。

### 減価償却コストと非混合コスト{#amortized-and-unblended-costs}
**減価償却**コストメトリクスは、割引期間を通じてコミットメントの節約を分配します。これは_発生主義_とも呼ばれます。予約および節約プランは、毎月のコミットメントから引き落とされ、使用時に対象の使用量に直接適用されます。使用されなかった残りは料金として記載されます。

対照的に、**非混合**コストメトリクスは、費用が発生したその日のすべての料金を表示します。これは_原価主義_とも呼ばれます。予約および節約プランの料金は、それらが課金された日に表示され、対象となる使用量に直接適用されるわけではありません。月の請求データが確定すると、非混合メトリクスは AWS の請求書と正確に一致します。

### 正味コスト {#net-costs}
**正味**コストは、使用量に直接非公開割引を適用します。特定のリソースの使用コストは、すべての節約を実現した後の実効コストを表します。

対照的に、他のメトリクスでは、非公開割引は、リソース属性タグのない独立した負の値の行項目として表示されます。これらのメトリクスは、割引を使用量に直接帰属させるのではなく、総コストから割引を差し引きます。

**正味減価償却**コストは、コスト割り当てのための最も正確な表現を提供し、すべての節約は使用量に直接適用されます。AWS アカウントに非公開交渉によるエンタープライズ割引がある場合、正味コストメトリクスが利用可能です。アカウントに企業割引がない場合、**正味減価償却**コストと**減価償却**コストは同等です。

### コンテナ割り当て{#container-allocation}
**コンテナ割り当て**メトリクスには、AWS メトリクスと同じコストがすべて含まれていますが、コンテナワークロードのための追加の内訳とインサイトも含まれています。詳細は[コンテナコスト割り当て][11]を参照してください。

### 例 {#example}
次のシナリオは、異なるコストタイプがどのように振る舞うかを示しています。以下を想定してみます。
- EC2 インスタンスが 1 時間実行され、計算時間あたりのコストは 3 ドル。
- このインスタンスタイプを計算時間あたり 2 ドルで提供する節約プラン。
- 他の割引に加え、交渉による 10% の EDP 割引。

インスタンスコスト、節約プランの時間単位のコミットメント、および割引が各コストタイプでどのように表示されるかを示します。

|コストタイプ |使用 |節約プラン |割引 | 説明 |
|:---------|-|-|-|:------------------------------------------------|
|オンデマンド |$3.00|||これは一般オンデマンド料金です。|
|非混合 |$3.00|$2.00|-$0.20|節約プランの定期費用と EDP 割引は、特定のリソースに関連付けられたものではなく、別の行項目です。(**注:** $3 のリソースコストは `SavingsPlanNegation` で相殺されます。)|
|正味非混合||$1.80||節約プランの定期費用は、割引が適用された行項目として表示されます。特定のリソースに関連したコストではありません。|
|減価償却|$2.00||-$0.20|節約プラン割引は、リソースコストに直接適用されます。EDP 割引は別の行項目です。|
|正味減価償却 |$1.80||| 節約プランと EDP 割引は、リソースコストに直接適用されます。|
|正味減価償却 - 共有リソースの割り当て |$1.80|||正味減価償却と同じコストですが、このコストは Kubernetes ディメンションとポッドタグによってさらに細分化できます。|

### コストメトリクスのまとめ {#cost-metrics-summary}

一般的に
- `aws.cost.net.amortized.shared.resources.allocated` は、特定のワークロードやチームに対する最も完全なコスト割り当てを提供します。
- コンテナコスト割り当てがない場合は、`aws.cost.net.amortized` を使用してください。
- 正味減価償却コストがない場合は、`aws.cost.amortized.shared.resources.allocated` または `aws.cost.amortized` を使用します。

| メトリクス               | 説明           |
| -------------------- | --------------------- |
| `aws.cost.net.amortized.shared.resources.allocated` | AWS の正味減価償却コストすべてと、コンテナワークロードのための追加の内訳とインサイト。[コンテナコスト割り当て][11]が必要です。|
| `aws.cost.net.amortized` | コンテナコストの内訳を含まない正味減価償却コスト。|
| `aws.cost.net.unblended` | コンテナコストの内訳を含まない正味非混合コスト。AWS の請求書と一致し、使用量コスト内で特別な割引が事前に計算されます。|
| `aws.cost.amortized.shared.resources.allocated` | AWS の減価償却コストすべてと、コンテナワークロードのための追加の内訳とインサイト。[コンテナコスト割り当て][11]が必要です。|
| `aws.cost.amortized` | コンテナコストの内訳を含まない減価償却コスト。|
| `aws.cost.unblended` | コンテナコストの内訳を含まない非混合コスト。AWS の請求書と一致します。|
| `aws.cost.ondemand`  | コストは AWS が提供するリストレートに基づいており、すべての節約プラン、予約、割引、税金、手数料は含まれていません。|

## Datadog がタグで AWS コストデータを強化する方法 {#how-datadog-enriches-your-aws-cost-data-with-tags}

Datadog は、複数のソースからのタグで AWS コストデータを自動的に強化します。コストデータにタグがどのように適用されるかの包括的な概要については、[タグ][19]を参照してください。

以下のタグソースを AWS で利用できます。

- コストと使用状況レポート列
- AWS リソースタグ
- AWS アカウントタグ
- AWS インテグレーションタグ
- すぐに使えるタグ
- コンテナワークロードタグ
- タグパイプライン

### コストと使用状況レポート列 {#cost-and-usage-report-columns}

AWS の[コストと使用状況レポート (CUR)][6] のすべての文字列値の列がコストメトリクスのタグとして追加されます。

Datadog は一貫性を確保するために、アンダースコアと小文字を使用してタグキーを正規化します。例えば、CUR 列 `lineItem/ResourceId` はタグキー `line_item/resource_id` にマッピングされます。タグの値は一般的に変更されず、大文字と小文字の区別とほとんどの特殊文字が維持されます。

**例:**

|CUR 列|CUR 値|Cloud Cost タグ|
|---|---|---|
|lineItem/ResourceId|i-12345678a9b12cd3e|line_item/resource_id:i-12345678a9b12cd3e|
|product/region|us-east-1|product/region:us-east-1|
|product/usagetype|DataTransfer-Regional-Bytes|product/usagetype:DataTransfer-Regional-Bytes|

### AWS リソースタグ {#aws-resource-tags}

[AWS リソースタグ][12]は、EC2 インスタンスや S3 バケットなど、特定のリソースを表示する際に AWS コンソールに表示されるユーザー定義のタグです。

Datadog AWS インテグレーションを有効にすると、Datadog は自動的にほとんどの AWS リソースのリソースタグを収集します。これらのタグは、指定されたリソースの CUR で見つかったすべてのコストに適用されます。リソースタグは定期的に取得され、作成または変更された日からコストデータに適用されます。タグが変更されても、過去のタグ値は上書きされません。

AWS インテグレーションが有効になっていない場合、AWS 請求の[コスト割り当てタグ][13]をアクティブにすることで、リソースタグのリッチ化を有効にすることができます。これにより、AWS CUR の列として含めるリソースタグキーのサブセットを選択することができます。Datadog は、CUR を処理する際に、これらの列を自動的にタグとして含めます。

### AWS の組織とアカウントタグ {#aws-organization-and-account-tags}
AWS 組織は、組織単位とアカウントに関する[ユーザー定義タグ][14]をサポートしています。Datadog は自動的にこれらのタグを取得し、コストデータに適用します。アカウントタグは、そのアカウントに関連するすべての使用量に適用されます。組織タグは、一致する支払者アカウントのすべての請求データに適用されます。

_組織アカウントの Datadog AWS インテグレーションが必要です。_

### AWS インテグレーションタグ {#aws-integration-tags}

AWS インテグレーションタグは、Datadog インテグレーションページの AWS Integration タイルで設定されるタグです。これらは、関連する AWS アカウントの CUR で見つかったすべてのコストに適用されます。

### すぐに使えるタグ {#out-of-the-box-tags}
Datadog は、取り込んだコストデータにすぐに使えるタグを追加し、コストの細分化と割り当てを支援します。これらのタグは、[コストと使用状況レポート (CUR)][6] から導き出され、コストデータの発見と理解を容易にします。

データのフィルタリングやグループ化には、以下のすぐに使えるタグが利用できます。

| タグ                          | 説明       |
| ---------------------------- | ----------------- |
| `aws_product`                | 課金対象となる AWS サービス。|
| `aws_product_family`         | 課金対象となる AWS サービスのカテゴリ (例: Compute、Storage など)。|
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
| `aws_region`                 | 項目に関連するリージョン (例: us-east-1)。|
| `aws_availability_zone`      | 項目に関連する Availability Zone。|
| `aws_resource_id`            | 項目に関連するリソース ID。|
| `aws_instance_type`          | 項目のインスタンスタイプ。|
| `aws_instance_family`        | 項目に関連するインスタンスファミリー (例: Storage optimized)。|
| `aws_datatransfer_type`      | 項目に関連するデータ転送の種類 (例: クロスゾーンまたはクロスリージョン)。|
| `aws_datatransfer_direction` | 項目に関連するデータ転送の方向 (例: 入力または出力)。|
| `is_aws_ec2_compute`         | 使用が EC2 コンピュートに関するものかどうか。|
| `is_aws_ec2_compute_on_demand`| 使用がオンデマンドであるかどうか。|
| `is_aws_ec2_compute_reservation`| 使用がリザーブドインスタンスと関連しているかどうか。|
| `is_aws_ec2_capacity_reservation`| 使用が容量予約と関連しているかどうか。|
| `is_aws_ec2_spot_instance`   | 使用がスポットインスタンスと関連しているかどうか。|
| `is_aws_ec2_savings_plan`    | 使用がセービングプランと関連しているかどうか。|
| `aws_bill_entity` | アカウントが登録されている AWS の販売者。トランザクションは AWS マーケットプレイスでの購入 (`AWS Marketplace`) または他の AWS サービスの購入 (`AWS`) のいずれかです。|
| `aws_bill_type` | このレポートがカバーする請求書の種類 (`Purchase` など)。|
| `aws_cost_type` | 項目をカバーする料金の種類 (`SavingsPlanCoveredUsage` など)。|
| `aws_discount_lease_term` | リザーブドインスタンスが予約されている期間。|
| `aws_discount_purchase_option` | 予約の支払いを選択する方法 (`All Upfront` など)。|
| `aws_ec2_compute_product_family` | EC2 コンピュートの項目に対する使用の種類 (`BoxUsage` または `SpotUsage` など)。|
| `aws_pricing_usage_unit` | AWS が使用コストを計算するために使用した料金単位 (`Hours` など)。|
| `aws_reservation_modification_status` | RI リースが変更されたか変更されていないかを示します (`Manual` など)。|
| `bill/billing_entity` | アカウントが登録されている AWS の販売者。トランザクションは AWS マーケットプレイスでの購入 (`AWS Marketplace`) または他の AWS サービスの購入 (`AWS`) のいずれかです。|
| `bill/bill_type` | このレポートがカバーする請求書の種類 (`Purchase` など)。|
| `bill/invoicing_entity` | 請求書を発行する AWS エンティティ。|
| `bill/payer_account_id` | 支払いアカウントのアカウント ID。AWS 組織内の組織の場合、これは管理アカウントのアカウント ID です。|
| `is_aws_ec2_compute_savings_plan` | `true` は、セービングプランで支払われる EC2 コンピュートの使用状況を表す行項目に適用されます。|
| `line_item/currency_code` | この行項目が表示される通貨 (デフォルトは `USD`)。|
| `line_item/legal_entity` | AWS サービスのプロバイダー。|
| `line_item/line_item_type` | 行項目でカバーされる料金の種類 (例: `Credit`)。|
| `line_item/operation` | 行項目でカバーされる特定の AWS オペレーション (例: `RunInstances`)。|
| `line_item/product_code` | 測定された製品のコード (例: Amazon Elastic Cloud Compute の `Amazon EC2` など)。|
| `line_item/resource_id` | 行項目に関連付けられた個別のリソース ID (オプション)。|
| `line_item/tax_type` | AWS が行項目に適用した税の種類。|
| `line_item/usage_account_id` | 行項目を使用したアカウントの ID。|
| `line_item/usage_type` | 行項目の使用量の詳細 (例: `USW2-BoxUsage:m2.2xlarge`)。|
| `pricing/lease_contract_length` | RI が予約されている期間。|
| `pricing/purchase_option` | 行項目の支払いを選択する方法 (例: `All Upfront`)。|
| `pricing/term` | AWS の使用状況が `Reserved` または `On-Demand` かどうか。|
| `pricing/unit` | AWS が使用コストを計算するために使用した料金単位 (`Hours` など)。|
| `reservation/availability_zone` | 行項目に関連するリソースの Availability Zone (例: `us-east-1`)。|
| `reservation/modification_status` | RI リースが変更されたか、変更されていないかを示します (例: `Manual` など)。|
| `reservation/reservation_arn` | 行項目が恩恵を受けた RI の ARN。|
| `reservation/subscription_id` | 行項目を関連するオファーにマッピングするユニーク ID。|
| `savings_plan/instance_type_family` | 指定された使用に関連するインスタンスファミリー (例: `m4`)。|
| `savings_plan/offering_type` | 購入した節約プランの種類 (例: `ComputeSavingsPlans`)。|
| `savings_plan/payment_option` | 節約プランに利用可能な支払いオプション (例: `All Upfront`)。|
| `savings_plan/purchase_term` | 節約プランの期間または条件を説明します (例: `1yr`)。|
| `savings_plan/region` | AWS サービスをホストする AWS リージョン (例: `US East (N. Virginia)`)。|
| `savings_plan/savings_plan_arn` | ユニークな節約プラン識別子。|

#### コストと監視可能性の相関 {#cost-and-observability-correlation}

監視可能性データの文脈でコストを確認することは、インフラストラクチャーの変更がコストにどのように影響するかを理解し、コストが変動する理由を特定し、コストとパフォーマンスの両方のインフラストラクチャーを最適化するために重要です。Datadog は、監視可能性とコストメトリクスの相関を簡素化するため、主要な AWS 製品のコストデータにおけるリソース識別タグを更新します。

例えば、各 RDS データベースのコストと使用状況を表示するには、`aws.cost.amortized`、`aws.rds.cpuutilization`、および `aws.rds.freeable_memory` (または他の RDS メトリック) を使ってテーブルを作成し、`dbinstanceidentifier` でグループ化できます。Lambda の使用状況とコストを並べて表示するには、`aws.lambda.concurrent_executions` および `aws.cost.amortized` を `functionname` でグループ化してグラフ化できます。

以下のすぐに使えるタグが利用可能です。

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
| elb (その他のすべてのコスト) | `loadbalancername` |

### コンテナオーケストレーター {#container-orchestrators}

コンテナのコスト割り当てでは、コストが発生するワークロードのタグが追加されます。例えば、Kubernetes のポッドやノード、ECS のタスクやコンテナのタグなどです。

_[コンテナのコスト割り当て][11]が必要で、`shared.resources.allocated` メトリクスにのみ適用されます。_

### タグパイプライン {#tag-pipelines}

最後に、[タグパイプライン][15]のすべてのルールセットが適用され、インフラストラクチャーのタグ付けが不可能な場合に、完全なコスト割り当てが提供されます。タグパイプラインは最終的なエンリッチメントレイヤーであり、コストデータに新しいタグを追加します。

## 請求コンダクター {#billing-conductor}
[AWS 請求コンダクター][16]は、AWS Marketplace Channel Partners およびチャージバック要件を持つ組織向けのカスタム請求サービスです。
Billing Conductor は、お客様がコストのセカンドプロフォーマバージョンを作成してお客様やアカウント所有者と共有できるようにします。
請求レート、クレジットおよび手数料、オーバーヘッドコストは、任意でカスタマイズできます。CUR に含めるアカウントを選択することもできます。

**重要な制限**:
- プロフォーマのコストと使用状況レポートには割引や税金が含まれていないため、Datadog のコストを AWS Cost Explorer と比較するのが難しくなります。
- 請求グループにアカウントを追加すると、予約および節約プランが AWS アカウント間でどのように共有されるかに影響します。

AWS Billing Conductor CUR を作成するには、[AWS コストと使用状況レポートユーザーガイド][8]に従います。CUR が [Datadog の要件][9]を満たしていることを確認してください。
Billing Conductor CUR が作成された後、上記の Cloud Cost Management の指示に従って Datadog に設定してください。

## 参考資料 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-create-legacy.html
[2]: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html
[3]: https://us-east-1.console.aws.amazon.com/cost-management/home?region=us-east-1#/settings
[4]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-view.html
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[6]: https://docs.aws.amazon.com/cur/latest/userguide/data-dictionary.html
[7]: https://app.datadoghq.com/cost/setup
[8]: https://docs.aws.amazon.com/cur/latest/userguide/cur-data-view.html
[9]: /ja/cloud_cost_management/setup/aws/#prerequisite-generate-a-cost-and-usage-report
[10]: https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html
[11]: /ja/cloud_cost_management/container_cost_allocation/#applying-tags
[12]: https://docs.aws.amazon.com/tag-editor/latest/userguide/tagging.html
[13]: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/activating-tags.html
[14]: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_tagging.html
[15]: /ja/cloud_cost_management/allocation/tag_pipelines
[16]: https://docs.aws.amazon.com/billingconductor/latest/userguide/what-is-billingconductor.html
[17]: https://app.datadoghq.com/cost/settings/accounts
[18]: /ja/help/
[19]: /ja/cloud_cost_management/tags
[20]: https://docs.aws.amazon.com/cur/latest/userguide/troubleshooting.html#backfill-data
[21]: /ja/api/latest/cloud-cost-management/#create-cloud-cost-management-aws-cur-config
[22]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/aws_cur_config