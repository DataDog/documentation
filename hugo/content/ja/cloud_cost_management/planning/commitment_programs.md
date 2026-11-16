---
description: クラウド割引プログラムのパフォーマンスとステータスを管理する方法を学びます。
further_reading:
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management について
title: コミットメントプログラム
---
<div class="alert alert-info">CCM Commitment Programs は、AWS の EC2、RDS、ElastiCache、および Azure の仮想マシンに対するリザーブドインスタンスと Savings Plans をサポートしています。</div>

## 概要 {#overview}

クラウドプロバイダーは、次のようなコミットメントベースの割引プログラムを提供しています。 {{< tooltip text="Reserved Instance (RI)" tooltip="1 年または 3 年の期間、特定のインスタンス構成の使用をコミットすることで得られる請求割引です。" >}} と {{< tooltip text="Savings Plans" tooltip="期間中に一定の使用量 ($/時間で測定) をコミットすることと引き換えに、低価格を提供する柔軟なクラウド割引プログラムです。" >}}、予測可能な使用量に対する節約を支援します。Datadog の Commitment Programs 機能は、クラウド環境全体でこれらの割引を監視し、最適化し、その価値を最大化するのに役立ちます。

Commitment Programs を使用すると、次のことができます。
- 未使用または使用率の低いコミットメントを追跡し、対処する
- 高額な支出を対象とする {{< tooltip text="on-demand" tooltip="コミットメントや割引プログラムなしで、標準料金で請求されるクラウドリソースです。" >}} 追加のコミットメントによる支出
- 有効期限を監視し、期限内の更新を計画する

## はじめに {#getting-started}

Commitment Programs を使用して、クラウドのコミットメントを把握し、最適化します。

1. Cloud Cost Management で、[**Cloud Cost > Planning > Commitment Programs**][1] に移動します。
2. プロダクトセレクターを使用してコミットメントタイプを選択し、期間セレクターを使用してレポート期間を設定します。
3. KPI、コミットメントコスト、および更新の推奨事項に関するインサイトを得ます。
   - [コミットメントの概要](#commitments-overview)セクションで KPI を確認します。
   - [On-demand hot-spots](#on-demand-hot-spots) セクションでオンデマンド支出の領域を分析し、カバレッジを改善する方法を把握します。
   - [コミットメントインベントリ](#commitments-inventory)テーブルで、タイプ別にアクティブなコミットメントを確認します。
   - [最も使用されていない節約プラン](#least-used-savings-plans)の中で、最も無駄を生み出している節約プランを特定します。
4. これらのインサイトに基づいて行動します。
   - コミットメントをより有効に活用し、追加のオンデマンド料金を回避するために、ワークロードを調整します。
   - 使用状況データに基づいて、コミットメントを購入または変更して更新します。
   - コミットメントの有効期限が切れる前に、更新または終了を計画します。
   - Datadog の推奨事項を活用して支出を最適化し、さらなる節約と無駄の削減を実現します。

## コミットメントの概要 {#commitments-overview}

クラウドプロバイダーおよびサービスに関する以下の主要業績評価指標 (KPI) を確認します。

{{< img src="cloud_cost/planning/commitments-inventory.png" alt="主要な節約メトリクスと、コミットメントコストと同等のオンデマンドコストを時系列で比較した棒グラフを表示するコミットメントの概要ダッシュボード。" style="width:100%;" >}}

- {{< ui >}}Effective Savings Rate (ESR){{< /ui >}}: オンデマンド料金と比較した割引プログラムによるコスト削減率。利用済みおよび使用率の低いコミットメントの両方を考慮します。
  - _例: RI で 62% の割引が適用される場合でも、ESR が45%しかない場合、未使用のコミットメントによって実際の節約額が減少します。_
- {{< ui >}}Realized Savings{{< /ui >}}: コミットメントプログラムを利用することで、オンデマンド料金と比較して節約できた合計金額。
  - _例: 先月クラウドサービスに 10,000 USD を費やしましたが、オンデマンド料金では 14,000 USD かかっていたため、実際の節約額は 4,000 USD です。_

## オンデマンドのホットスポット {#on-demand-hot-spots}

オンデマンドのホットスポットは、オンデマンドコストが高い領域を示します。これは、追加のコミットメントを購入する機会を示している可能性があります。

{{< img src="cloud_cost/planning/commitments-on-demand-2.png" alt="AWS RDS のオンデマンドホットスポットテーブル。リージョン、インスタンスファミリー、DB エンジン、カバレッジ率、オンデマンドコストが表示されます。" style="width:100%;" >}}

{{< ui >}}Cost{{< /ui >}}タブと{{< ui >}}Hours{{< /ui >}}タブを使用して、オンデマンド支出 (ドル) と使用量 (時間) を切り替えます。利用可能なフィルターを使用して結果を絞り込みます。フィルターは選択した製品によって異なります。

テーブルの列は選択した製品のフィルターに対応しており、オンデマンド使用量を特徴付けるディメンション (リージョン、インスタンスファミリー、データベースエンジンなど) と、{{< ui >}}Coverage{{< /ui >}}(コミットメントでカバーされている使用量の割合)、{{< ui >}}On-Demand Cost{{< /ui >}}(最も支出の多いホットスポットを最初に表示するために降順でソート) が表示されます。

## コミットメントインベントリ{#commitments-inventory}

コミットメントインベントリは、選択した期間中に有効なコミットメントをコミットメントタイプ別に整理して、詳細を表示します。これには、間もなく期限が切れるコミットメント (30 日以内) や、表示時点ですでに期限が切れているコミットメントが含まれます。

{{< img src="cloud_cost/planning/commitments-inventory-1.png" alt="使用率チャートと EC2 節約プランコミットメントのテーブルが表示されている [Savings Plans] タブを示すコミットメントインベントリセクション。" style="width:100%;" >}}

{{< ui >}}Savings Plans{{< /ui >}}タブと{{< ui >}}Reserved Instances{{< /ui >}}タブを使用して、コミットメントタイプを切り替えます。各タブには以下が表示されます。

- {{< ui >}}Utilization{{< /ui >}}: 選択した期間中に使用されているコミットメントタイプの割合。
- {{< ui >}}Unused spend{{< /ui >}}: 未使用のコミットメントに対する総支出。
- {{< ui >}}Daily chart{{< /ui >}}: 時間の経過に伴う使用率とともに、使用済みおよび未使用のコミットメント支出を追跡します。

{{< ui >}}Only show Expiring{{< /ui >}}チェックボックスを使用して、終了日が近づいているコミットメントにテーブルを絞り込みます。

テーブルには、有効なコミットメントが一覧表示されます。列は製品やコミットメントタイプによって異なりますが、一般的な列には以下が含まれます。

| 列 | 説明 |
|---|---|
| Savings Plan ARN、Reservation ARN、またはコミットメント ID | コミットメントの一意の識別子 (Azure の場合はコミットメント ID)。|
| 特典名 | Azure の節約プランまたは予約特典の名前。|
| 支払いモデル | 支払いオプション (例: 前払いなし、一部前払い、全額前払い)。|
| 期間 | コミットメントの期間 (例: 1 年、3 年)。|
| タイプ | コミットメントタイプ (例: `ComputeSavingsPlans`)。|
| コミット済み支出/時間 | プランに基づいてコミットされた 1 時間あたりの支出。|
| 終了日 | コミットメントの有効期限が切れる日付。|
| 使用率 | 選択した期間中に使用されたコミットメントの割合。|

{{< ui >}}Columns{{< /ui >}}ボタンを使用して、追加の列を表示または非表示にします。

## 最も使用されていない節約プラン {#least-used-savings-plans}

最も使用されていない節約プランは、どの節約プランが最も無駄を生んでいるかを特定するのに役立ちます。このセクションを使用して、無駄が発生するタイミングを把握し、利用率を向上させるための対策を講じます。

{{< img src="cloud_cost/planning/commitment-programs-least-used-savings-plans-1.png" alt="最も使用されていない節約プランセクションには、曜日別の未使用の節約プラン支出の 1 日あたりの平均額を示す棒グラフ、無駄の合計額、使用率、ARN を示した無駄の多い節約プランのテーブル、および曜日別の 1 時間ごとの未使用コミットメント支出率のヒートマップが表示されます。" style="width:100%;" >}}

{{< ui >}}Daily average unused Savings Plans{{< /ui >}}: 曜日ごとの未使用の節約プラン支出の 1 日あたりの平均額を示す棒グラフ。これを使用して、ワークロードが低下する可能性のある週末に無駄が増えるといったパターンを確認します。

{{< ui >}}Savings Plans with most waste{{< /ui >}}: 使用率の低い節約プランを、無駄の合計額の順に並べたテーブル。列には以下が含まれます。

- {{< ui >}}Waste{{< /ui >}}: 選択した期間中の未使用コミットメント支出の合計金額。
- {{< ui >}}Utilization{{< /ui >}}: 節約プランの使用率。パーセンテージとプログレスバーで表示されます。
- {{< ui >}}Savings Plan ARN{{< /ui >}}: 節約プランの一意の識別子。

{{< ui >}}Hourly unused committed spend percentage{{< /ui >}}: 時間 (UTC) および曜日別に、未使用となったコミットメント支出の割合を示すヒートマップ。セルが暗いほど未使用率が高いことを示し、コミットメントが継続的に十分活用されていない特定の時間帯を特定できます。

## Savings Plan シミュレーション {#savings-plan-simulation}

<div class="alert alert-info">Savings Plan シミュレーションはプレビュー版です。AWS Savings Plans をサポートしており、<a href="https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html#management-account">AWS 管理アカウント</a>レベルで実行されます。</div>

Savings Plan シミュレーションを使用すると、新しい Savings Plan を購入する前に、請求額への影響を見積もることができます。Cost Explorer のエクスポートとスプレッドシートを組み合わせる代わりに、過去の使用量に基づいてコミットメントをモデル化できます。結果には、予測されるカバレッジ、使用率、および節約額が表示されます。

このシミュレーションは過去のデータに基づくものです。選択した期間のオンデマンド使用量を、Savings Plan が有効だった場合の料金で再計算します。結果には、将来の使用量の予測ではなく、_コストと節約額がどうなっていたか_が示されます。

{{< img src="cloud_cost/planning/commitment-simulation.png" alt="入力パラメーター、「Estimated Impact」の概要 (メトリクスの比較テーブルを含む)、および「Simulated Cost」の時系列チャートを表示する Savings Plan シミュレーション。" style="width:100%;" >}}

### シミュレーションを実行する{#run-a-simulation}

1. **Cloud Cost > Planning > Commitment Programs** の [**Simulator**][2] タブに移動します。
2. Savings Plan のタイプを選択し、コミットメントの設定 (オーナーアカウント、期間、支払いモデル) を行います。
3. 追加の時間あたりのコミットメントを入力し、シミュレーション対象とする使用期間 (過去最大 3 か月) を選択します。期間はデフォルトで過去 30 日間に設定されています。
4. {{< ui >}}Estimated Impact{{< /ui >}} および {{< ui >}}Estimated Service Breakdown{{< /ui >}} セクションで予測結果を確認します。

[AWS Cost Optimization Hub][3] に組織向けの Savings Plan の推奨事項がある場合、吹き出しに表示されます。吹き出しには、推奨される時間あたりのコミットメント、期間、支払いオプションが表示されます。クリックすると、それらの設定がシミュレーションに適用されます。Cost Optimization Hub は、Compute Savings Plans に対してのみこれらの推奨事項を生成します。

これらの推奨事項を受け取るには、AWS 統合 IAM ロールに `cost-optimization-hub:GetRecommendation` および `cost-optimization-hub:ListRecommendations` の権限が含まれていることを確認します。セットアップ手順については、[AWS Cost Optimization Hub の推奨事項に対する権限][4]を参照します。

### 結果を解釈する{#interpret-the-results}

すべての出力は選択した期間中の使用量に基づく見積もりであり、実際の節約額は将来の使用量によって異なります。Savings Plans は [Consolidated Billing Family][5] 全体で共有されるため、コミットメントは複数のアカウントの使用量に適用される可能性があります。Datadog にその期間のコストデータがない場合、シミュレーターは結果を不完全としてフラグ付けします。

結果は次の 2 つのセクションに表示されます。

- {{< ui >}}Estimated Impact{{< /ui >}}: シミュレーションしたコミットメントの前後で主要なメトリクスを比較し、選択した期間の {{< ui >}}Simulated Cost{{< /ui >}} チャートとともに表示します。
- {{< ui >}}Estimated Service Breakdown{{< /ui >}}: AWS サービス別に推定コストとカバレッジの内訳を表示します。

## 使用例 {#example-use-cases}

### 活用されていないコミットメントを特定する {#identify-underutilized-commitments}

**シナリオ**: カバレッジは高いものの、実効節約率 (ESR) が予想よりも低くなっています。

**コミットメントプログラムの使用方法**: 
1. {{< ui >}}Commitments Overview{{< /ui >}} に移動して、使用率 KPI を確認します。
2. {{< ui >}}Commitments inventory{{< /ui >}} で、使用率の昇順に並べ替えて、最も使用されていないコミットメントを特定します。節約プランについては、[最も使用されていない節約プラン](#least-used-savings-plans) セクションの {{< ui >}}Savings Plans with most waste{{< /ui >}} テーブルも確認します。
3. これらのコミットメントをより効果的に使用できるようにワークロードを再割り当てするか、クラウドプロバイダーが許可している場合は、未使用のコミットメントの変更または売却を検討します。

### 期限切れになるコミットメントを計画する {#plan-for-expiring-commitments}

**シナリオ**: いくつかのリザーブドインスタンスの有効期限が間もなく切れるため、予期しないオンデマンド料金の発生を回避したいと考えています。

**コミットメントプログラムの使用方法**:
1. {{< ui >}}Commitments Explorer{{< /ui >}} で、コミットメントの一覧と有効期限を確認します。
2. フィルターを使用して、期限が近いコミットメントに絞り込みます。
3. カバレッジを維持し、節約額を最大化するために、更新や代替を事前に計画します。

### 高額なオンデマンド支出を対象にする {#target-high-on-demand-spend}

**シナリオ**: クラウドコストを見ると、特定のサービスまたはリージョンでオンデマンド使用量が継続的に高くなっています。

**コミットメントプログラムの使用方法**:
1. {{< ui >}}On-demand hot-spots{{< /ui >}} を使用して、どのサービス、リージョン、またはアカウントでオンデマンドコストが大きく、安定して発生しているかを特定します。
2. 使用パターンを分析し、それらが予測可能であることを確認します。
3. 新しいコミットメントを購入して一貫した使用量をカバーし、コストを削減します。

### ワークロードを移行して未使用の節約プランをカバーし、無駄を削減します {#reduce-waste-by-shifting-workloads-to-cover-unused-savings-plans}

**シナリオ**: 節約プランの利用率が低く、オンデマンドコストが高い状態が並行して発生しています。

**コミットメントプログラムの使用方法**:
1. {{< ui >}}Least used savings plans{{< /ui >}}セクションを使用して、利用率が低い繰り返しのパターン (例: 特定の曜日や時間帯にキャパシティが一貫して未使用になっている) を特定します。
2. 未使用の節約プランの適用範囲を活用するために、利用率が低い期間にスケジュール可能なオンデマンドワークロードを特定します。
3. それらのワークロードを移行または再スケジュールして、オンデマンド支出を削減し、節約プランの利用率を向上させます。

## 参考資料 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/plan/commitment-programs
[2]: https://app.datadoghq.com/cost/plan/commitment-programs/simulator
[3]: https://docs.aws.amazon.com/cost-management/latest/userguide/cost-optimization-hub.html
[4]: /ja/cloud_cost_management/setup/aws/#permissions-for-aws-cost-optimization-hub-recommendations
[5]: https://docs.aws.amazon.com/savingsplans/latest/userguide/sp-applying.html