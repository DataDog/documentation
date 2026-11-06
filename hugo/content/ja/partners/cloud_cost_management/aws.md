---
cascade:
  algolia:
    subcategory: Cloud Cost Management
    tags:
    - cloud cost
    - cloud integrations
    - cloud cost management
    - cloud cost aws
further_reading:
- link: /cloud_cost_management/aws/
  tag: ドキュメント
  text: AWS 向け Cloud Cost Management
- link: /monitors/types/cloud_cost/
  tag: ドキュメント
  text: Cloud Cost モニターを作成する
- link: /cloud_cost_management/tags/
  tag: ドキュメント
  text: Cloud Cost Management におけるタグについて
- link: https://www.datadoghq.com/blog/control-your-cloud-spend-with-datadog-cloud-cost-management/
  tag: ブログ
  text: Datadog Cloud Cost Management でクラウドコストの可視化とコントロールを実現する
- link: https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/
  tag: ブログ
  text: サービスに関連するクラウドや SaaS のコストを迅速かつ包括的に分析する
- link: https://www.datadoghq.com/blog/cloud-costs-study-learnings/
  tag: ブログ
  text: Cloud Cost の調査から得られた主な知見
title: MSP パートナー向け AWS Cloud Cost
---
## 概要{#overview}

このガイドでは、AWS マネージドサービスプロバイダー (MSP) が AWS Billing Conductor を構成し、プロフォーマのコストと使用状況レポート (CUR) を生成する方法を説明します。これにより、MSP の管理アカウントを公開することなく、顧客のメンバーアカウントを Datadog CCM に接続できます。

このページのステップは、**あなた (MSP パートナー)** が構成する項目と、**顧客** が自身のメンバーアカウントで構成する項目に分かれています。

一般的な (MSP 以外の) CCM 構成手順については、[Datadog CCM AWS セットアップガイド][1]を参照してください。

## AWS Billing Conductor について {#about-aws-billing-conductor}
[AWS Billing Conductor][2] は、AWS Marketplace Channel Partners およびチャージバック要件を持つ組織向けのカスタム請求サービスです。
Billing Conductor は、お客様がコストのセカンドプロフォーマバージョンを作成してお客様やアカウント所有者と共有できるようにします。
請求レート、クレジットおよび手数料、オーバーヘッドコストは、任意でカスタマイズできます。CUR に含めるアカウントを選択することもできます。

<div class="alert alert-warning">
- プロフォーマの Cost and Usage Report には割引や税金が含まれていないため、Datadog のコストを AWS Cost Explorer と比較するのが難しくなります。<br>
- 請求グループにアカウントを追加すると、Reservations や Savings Plans の共有方法が変更され、アカウントレベルでのコスト差が生じる可能性があります。<br>
- Datadog Cloud Cost Management は、AWS の請求書に代わるものではなく、コストの傾向、異常検知、最適化のインサイト、および FinOps ワークフローに最適です。
</div>

AWS Billing Conductor CUR を作成するには、[AWS Cost and Usage Report ユーザーガイド][3]に従います。CUR が [Datadog の要件][4]を満たしていることを確認してください。 

## 前提条件{#prerequisites}

開始する前に、以下を確認してください。

**MSP アクセス** 
Billing Conductor を構成するための **管理アカウント** へのアクセス権 ({{< ui >}}Pricing Rules{{< /ui >}}、{{< ui >}}Pricing Plans{{< /ui >}}、{{< ui >}}Billing Groups{{< /ui >}})。

**顧客の権限** 
顧客は以下の権限を持っている必要があります。
- CloudFormation スタックのデプロイ  
- コストと使用状況レポート (CUR) の作成と管理  
- CUR を含む S3 バケットへの Datadog アクセス権の付与  

**Datadog インテグレーション** 
Datadog で **メンバーアカウント** の AWS インテグレーションをインストールする必要があります。 
詳細については、[AWS インテグレーションのセットアップ][5]を参照してください。

## AWS Billing Conductor の構成 {#configure-aws-billing-conductor}

これらの手順は、**MSP の管理アカウントで完了する必要があります**。

### ステップ 1 - 料金ルールの作成 {#step-1-create-a-pricing-rule}

Billing Conductor は、{{< ui >}}Discount{{< /ui >}}または {{< ui >}}Markup{{< /ui >}} を使用して **AWS パブリックオンデマンド料金** を調整することにより、プロフォーマコストを計算します。

以下のオプションから明示的に選択する必要があります。
- {{< ui >}}Discount{{< /ui >}}: パブリックオンデマンド料金にパーセンテージの割引を適用します  
- {{< ui >}}Markup{{< /ui >}}: パブリックオンデマンド料金にパーセンテージの上乗せを適用します  

<div class="alert alert-info">
0% を入力すると ({{< ui >}}Discount{{< /ui >}} または {{< ui >}}Markup{{< /ui >}} のいずれであっても)、パブリックオンデマンド料金になります。許容範囲は 0～100% です。
</div>

例:

| タイプ | 計算 |
|------|-------------|
| {{< ui >}}Discount{{< /ui >}} (20%) | パブリックオンデマンド × 0.8 |
| {{< ui >}}Markup{{< /ui >}} (30%) | パブリックオンデマンド × 1.3 |

### ステップ 2 - 料金プランの作成 {#step-2-create-a-pricing-plan}

料金プランを作成し、前のステップで作成した料金ルールを関連付けます。 
料金プランに含められるグローバルな Discount または Markup ルールは、**1 つだけ** です。

### ステップ 3 - 請求グループの作成 {#step-3-create-a-billing-group}

請求グループを作成し、**顧客のメンバーアカウントを 1 つ**、**プライマリ** アカウントとして割り当てます。
請求グループに 1 つ以上のメンバーアカウントを追加できますが、Datadog が取り込むプロフォーマ CUR を生成するのはプライマリメンバーアカウントのみです。

### ステップ 4 - 顧客側の要件の確認 {#step-4-confirm-customer-side-requirements}

顧客がメンバーアカウントを独立して管理している場合は、以下の作業が必要であることを理解しているか確認してください。
- CloudFormation テンプレートのデプロイ
- 自身のアカウントでの CUR の作成
- Datadog への CUR バケットアクセス権の付与

## Datadog Cloud Cost Management の構成 {#configure-datadog-cloud-cost-management}

これらのステップは、顧客が自身の **メンバーアカウント** で実行する必要があります。

### ステップ 1 - Datadog CCM CloudFormation テンプレートのダウンロード {#step-1-download-the-datadog-ccm-cloudformation-template}

プロフォーマ CUR は `SPLIT_COST_ALLOCATION_DATA` オプションをサポートしていません。
この制限のため、顧客はデプロイ前にテンプレートを変更する必要があります。
1. [Datadog CCM CloudFormation テンプレート][6]をダウンロードします。
2. テンプレートから `SPLIT_COST_ALLOCATION_DATA` フィールドを削除します。
3. 変更したテンプレートを保存し、次のステップで使用します。


### ステップ 2 - AWS での CloudFormation スタックのデプロイ {#step-2-deploy-the-cloudformation-stack-in-aws}

1. 上記のテンプレートを使用して、顧客のメンバーアカウントにスタックをデプロイします。
2. スタックをデプロイするには、AWS ドキュメント [CloudFormation からのスタックの作成][7]に従ってください。スタックを作成する際、{{< ui >}}With new resources (standard){{< /ui >}} を選択します。

### ステップ 3 - AWS におけるコストと使用状況レポートの構成 {#step-3-configure-the-cost-and-usage-report-settings-in-aws}

デプロイ中に以下の情報を入力します。
- {{< ui >}}Bucket Name{{< /ui >}}: CUR ファイルが保存されている S3 バケット  
- {{< ui >}}Bucket Region{{< /ui >}}: そのバケットの AWS リージョン (例: `us-east-1`)  
- {{< ui >}}Export Path Prefix{{< /ui >}}: CUR ファイルの S3 パスプレフィックス  
- {{< ui >}}Export Name{{< /ui >}}: コストと使用状況レポートの名前  

これらの値は、AWS が CUR を書き込む場所と、Datadog がそれを読み取る場所を定義します。

### ステップ 4 - メンバーアカウントの CUR パラメーターの Datadog への入力 {#step-4-enter-the-member-accounts-cur-parameters-in-datadog}

1. CloudFormation スタックをデプロイした後、{{< ui >}}Datadog{{< /ui >}} → {{< ui >}}Cloud Cost{{< /ui >}} → {{< ui >}}Settings{{< /ui >}} → [{{< ui >}}Accounts{{< /ui >}}][8] に移動します。


   {{< img src="partners/cloud_cost/select_aws_account_ccm.png" alt="CCM 用の AWS アカウントの選択" style="width:100%;" >}}

2. メンバーアカウントを選択し、**ステップ 3** の正確な値を使用して以下のフィールドに入力します。
   - {{< ui >}}Bucket Name{{< /ui >}} 
   - {{< ui >}}Bucket Region{{< /ui >}}
   - {{< ui >}}Export Path Prefix{{< /ui >}}
   - {{< ui >}}Export Name{{< /ui >}}

3. {{< ui >}}Create CloudFormation stack step{{< /ui >}} はスキップします (スタックは **ステップ 3** ですでにデプロイされています)。


4. {{< ui >}}Activate now{{< /ui >}} をクリックして、メンバーアカウントの CCM を有効にします。


{{< img src="partners/cloud_cost/configure_aws_ccm.png" alt="AWS Cloud Cost Management の構成" style="width:100%;" >}}

構成が完了すると、以下のようにアカウントステータスが更新されます。

{{< img src="partners/cloud_cost/complete_aws_ccm.png" alt="AWS Cloud Cost Management の構成完了" style="width:100%;" >}}

## 検証 {#validation}

有効化後、コストデータが Datadog に取り込まれていることを確認してください。
1. Datadog の [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Cost Explorer{{< /ui >}}][9] に移動します。
2. プロバイダーとして {{< ui >}}AWS{{< /ui >}} を選択し、{{< ui >}}Product{{< /ui >}}、{{< ui >}}Member Accoun Id{{< /ui >}}、またはその他のディメンションなどのフィルターを使用してデータをグループ化し、検証します。
3. 予期した期間のコストデータが表示されることを確認します。


**注:** 
Cost and Usage Report (CUR) が生成されてから Datadog にデータが表示されるまで、**48～72 時間**かかる場合があります。 
CUR は **時間単位の粒度** を使用するため、AWS CUR の配信タイミングと Datadog の処理がリアルタイムで完全に一致しない場合があります。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/cloud_cost_management/setup/aws/
[2]: https://docs.aws.amazon.com/billingconductor/latest/userguide/what-is-billingconductor.html
[3]: https://docs.aws.amazon.com/cur/latest/userguide/cur-data-view.html
[4]: /ja/cloud_cost_management/setup/aws/?tab=manual#prerequisite-generate-a-cost-and-usage-report
[5]: /ja/getting_started/integrations/aws/#setup
[6]: https://datadog-cloudformation-template.s3.amazonaws.com/aws_cloud_cost/v0.0.5/main.yaml
[7]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-console-create-stack.html
[8]: https://app.datadoghq.com/cost/setup
[9]: https://app.datadoghq.com/cost/explorer