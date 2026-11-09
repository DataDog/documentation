---
description: Datadog のコスト、使用量の傾向、および月末の予測コストを、日次内訳、製品レベルの詳細、組織間フィルタリングとともに 1 つのページに表示します。
further_reading:
- link: account_management/plan_and_usage/cost_details/
  tag: ドキュメント
  text: コスト詳細
- link: account_management/plan_and_usage/usage_details/
  tag: ドキュメント
  text: 使用量の詳細
- link: account_management/billing/usage_attribution/
  tag: ドキュメント
  text: 使用属性
- link: cloud_cost_management/datadog_costs/
  tag: ドキュメント
  text: Datadog のコスト
- link: account_management/plan_and_usage/bill_overview/partner_purchased_cost_visibility/
  tag: ドキュメント
  text: パートナー経由で購入する顧客向けのコストの視覚化
title: 請求の概要
---
Datadog のコスト、使用量の傾向、および月末の予測コストを、日次内訳、製品レベルの詳細、組織間フィルタリングとともに 1 つのページに表示します。

[**請求の概要**ページ][1] では、管理者が Datadog のコストと使用状況を 1 つのビューで確認できます。2026 年 3 月から開始される段階的なロールアウト中に自動的に有効になります。

## グローバルフィルター {#global-filters}

以下のフィルターが {{< ui >}}Bill Overview{{< /ui >}} ページに適用されます。

- {{< ui >}}Product Category{{< /ui >}}: インフラストラクチャー、APM、ログ、セキュリティ、AI/ML などのより広範な製品ファミリーで、すべてのビューをフィルタリングします。
- {{< ui >}}Billing Dimension{{< /ui >}}: 特定の請求または計測ディメンション (例: Infra Hosts、Indexed Logs、Synthetic Browser Tests など) でフィルタリングします。
- {{< ui >}}Sub-Org{{< /ui >}}: 特定の子組織でフィルタリングします。
- {{< ui >}}Group by Sub-Org{{< /ui >}}: トグルを切り替えて、コストをサブ組織ごとにグループ化します。
- {{< ui >}}Time range{{< /ui >}}: 請求期間を選択します。戻る矢印と進む矢印を使用して、月単位で移動します。

## コストサマリー {#cost-summary}

ページ上部には、コストサマリーが表示されます。

- {{< ui >}}Estimated cost to date{{< /ui >}}: 現在の請求期間の経過日数に対する合計推定コスト
- {{< ui >}}Projected total{{< /ui >}}: 現在の使用パターンが月末まで続いた場合の推定合計コスト (前月比のパーセンテージの変化を含む)

## 日次コスト内訳 {#daily-cost-breakdown}

コストサマリーの下にある {{< ui >}}Daily Cost Breakdown{{< /ui >}} 積み上げ棒グラフには、選択した期間の各日について請求ディメンション別に内訳されたコストが表示されます。グラフの各色は、異なる請求ディメンションを表しています。展開アイコンをクリックすると、グラフを全画面表示で確認できます。

{{< img src="account_management/plan_and_usage/bill-overview-main-light.png" alt="コストサマリーヘッダー、日次コスト内訳の積み上げ棒グラフ、およびトレンドタブが表示されている請求概要ページ" >}}

## トレンドタブ {#trends-tab}

{{< ui >}}Trends{{< /ui >}} タブには、4 つの並べ替えオプションに基づいて調査すべき製品が表示されます。

- {{< ui >}}Highest % Cost Change{{< /ui >}}
- {{< ui >}}Highest Cost Change ($){{< /ui >}}
- {{< ui >}}Highest Total Cost{{< /ui >}}
- {{< ui >}}Highest % Usage Change{{< /ui >}}

並べ替えオプションを選択して、表示されるカードを更新します。各製品カードには以下が表示されます。

- 期間の {{< ui >}}Total Cost{{< /ui >}}
- {{< ui >}}Projected EOM{{< /ui >}} コスト
- パーセンテージバッジとして表示される {{< ui >}}Month-over-month change{{< /ui >}}
- 前月と当月にわたる {{< ui >}}Daily Cost{{< /ui >}} 棒グラフ
- 合計消費ユニット数として自然単位で表示される {{< ui >}}Usage{{< /ui >}}。例: スキャンされたデータの PB (ペタバイト)、Custom Metrics。合計コストおよび使用量関連のカードにのみ表示される

カードの {{< ui >}}View Details{{< /ui >}} をクリックして、[製品詳細ページ][2] を開きます。

{{< img src="account_management/plan_and_usage/bill-overview-trends-light.png" alt="合計コストが高い順で並べ替えられた製品カードが表示されているトレンドタブ" >}}

## 製品リストタブ {#product-list-tab}

{{< ui >}}Product List{{< /ui >}} タブには、すべての請求ディメンションがコストと使用量を並べてテーブルで表示されます。

製品の行の任意の場所をクリックして、[製品詳細ページ][2] を開きます。行の末尾にカーソルを合わせると、その請求ディメンションのコストモニターをすばやく作成できます。

#### テーブル列 {#table-columns}

| 列 | 説明 |
|---|---|
| 請求ディメンション | 製品または請求ディメンションの名前 |
| コスト — 合計 | 期間中に請求された合計コスト |
| コスト — 予測EOM | 月末時点の予測合計コスト |
| コスト — 変化 | 前の期間と比較した金額およびパーセンテージの変化 |
| 使用量 — 合計 | 自然単位での合計使用量 |
| 使用量 — 変化 | 比較期間と比較した使用量の変化 |

テーブルの上のコントロールを使用して、{{< ui >}}Monthly{{< /ui >}} と {{< ui >}}Daily{{< /ui >}} の表示を切り替えます。{{< ui >}}Download as CSV{{< /ui >}} ボタンを使用して、テーブル全体を `.csv` ファイルとしてダウンロードします。テーブルはページ分割されており、デフォルトで 1 ページあたり 10 行表示されます。

{{< img src="account_management/plan_and_usage/bill-overview-product-list-light.png" alt="コスト列と使用量列を含む請求ディメンションテーブルが表示されている製品リストタブ" >}}

## 製品詳細ページ {#product-detail-page}

トレンドカードの {{< ui >}}View Details{{< /ui >}} をクリックするか、{{< ui >}}Product List{{< /ui >}} テーブルの任意の行をクリックして、単一の請求ディメンションの製品詳細ページを開きます。

{{< img src="account_management/plan_and_usage/bill-overview-detail-light-2.png" alt="請求対象ホストを CSV としてダウンロードするボタンを含む、コスト概要と使用量概要セクションが表示されている製品詳細ページ。" >}}

### コスト概要 {#cost-overview}

- {{< ui >}}Total Cost{{< /ui >}}: 選択期間中に請求された合計コスト
- {{< ui >}}Projected Cost Change{{< /ui >}}: 前の期間と比較した予測金額およびパーセンテージの変化
- {{< ui >}}Projected EOM{{< /ui >}}: 月末時点での推定合計コスト
- {{< ui >}}Daily Cost{{< /ui >}} 棒グラフ: 当月がハイライト表示された、前月と当月の日別コスト。いずれかのバーにカーソルを合わせると、その日のコストが表示されます。{{< ui >}}Show Usage Charges Only{{< /ui >}} を切り替えて、オンデマンド料金を分離します。
- {{< ui >}}Drilldown in Cloud Cost{{< /ui >}}: クリックすると、選択された請求ディメンションで事前フィルタリングされた Cloud Cost Management が開きます。

### 使用量概要 {#usage-overview}

- {{< ui >}}Total Usage{{< /ui >}}: 選択期間の合計消費ユニット数
- {{< ui >}}Usage Change{{< /ui >}}: 前の期間と比較した使用量の変化 (金額およびパーセンテージ)
- {{< ui >}}Usage breakdown by sub-dimension{{< /ui >}}: 各サブディメンションの個別の使用量の合計。たとえば、Sensitive Data Scanner は、スキャンされたイベント、スキャンされたログ、スキャンされた RUM セッション、スキャンされたスパンを個別にリストします。
- {{< ui >}}Usage Types{{< /ui >}}棒グラフ: サブディメンション別に積み上げられた日次使用量
- {{< ui >}}Allotment Usage{{< /ui >}}: 消費量と契約割り当て量を示すプログレスバー。使用量が割り当て量を超えると ">100%" と表示される
- {{< ui >}}Drilldown in Usage Attribution{{< /ui >}}: クリックすると、選択された請求ディメンションで事前フィルタリングされた {{< ui >}}Usage Attribution{{< /ui >}} が開きます。
- {{< ui >}}Download Billable Hosts as CSV{{< /ui >}}: Infra Hosts の場合、請求対象合計を構成する個々のホストを CSV としてダウンロードします。

### 請求対象ホストを CSV としてダウンロードする {#download-billable-hosts-as-csv}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a>では、請求対象ホストの CSV ダウンロードはサポートされていません ({{< region-param key="dd_site_name" >}})。</div>
{{< /site-region >}}

特定の月の Infra Hosts 請求対象合計を構成する個々のホストの CSV をダウンロードします。これを使用して、[請求概要] ページに表示される合計との照合、カウントの大部分を占めるホストの特定、タグによるチームへの使用量の割り当て、または月ごとの比較による予期しない変更の発見を行うことができます。

リストをエクスポートするには、以下の手順を実行します。

1. サイドパネルで、右上の月セレクターを使用して月を選択します。エクスポートできるのは、完了した暦月のデータのみです。
2. {{< ui >}}Usage Overview{{< /ui >}} の下で、{{< ui >}}Download Billable Hosts as CSV{{< /ui >}} をクリックします。

CSV には、ホストごとに 1 行ずつ以下の列が含まれます。

| 列 | 説明 |
|---|---|
| `Org Name` | 組織名。|
| `Public ID` | 組織の公開識別子。|
| `Timestamp` | 99 パーセンタイルで請求される組織の場合、使用量が 99 パーセンタイルで測定された月内の時間。合計ベースで請求される組織の場合は、その月の初日となります。|
| `Resource Type` | リソースのタイプ (例: `agent`、`aws`、`vsphere`)。|
| `Resource Name` | ホスト名または識別子 (例: ホスト名またはインスタンス ID)。|
| `Usage Value` | 99 パーセンタイルで請求される組織の場合は、ホストあたり `1`。合計ベースで請求される組織の場合は、その月のホストのホスト時間となります (例: 30 日間フルで稼働したホストの場合は `720`)。|
| `Tags` | ホストの key-value タグの JSON オブジェクト。ホストにタグがない場合は空白 (`{}`) になります。|

すべての行の `Usage Value` の合計は、[請求の概要] ページに表示される Infra Hosts の合計と一致します。これは、99 パーセンタイルで請求される組織の場合はホスト数、合計ベースで請求される組織の場合はホスト時間となります。

## 以前のレイアウトに戻す {#revert-to-the-previous-layout}

組織が新しい {{< ui >}}Bill Overview{{< /ui >}} を利用しており、以前のレイアウトを希望する場合は、ページヘッダーの {{< ui >}}Disable Preview{{< /ui >}} をクリックしてください。この切り替えはすべての組織で利用可能であり、セッション中保持されます。

{{< img src="account_management/plan_and_usage/toggle-back-header.png" alt="プレビューを無効にするボタンが表示されている [請求の概要] ページのヘッダー" >}}

{{< ui >}}Bill Overview{{< /ui >}} に戻るには、ヘッダーの {{< ui >}}Enable Preview{{< /ui >}} をクリックしてください。

## 権限{#permissions}

[請求の概要] の各セクションにアクセスするには、以下の権限が必要です。

| セクション | 必要な権限 |
|---|---|
| 請求の概要 (コストデータ) | `BILLING_READ` |
| 使用量タブ | `USAGE_READ` |
| プランの詳細 | `BILLING_READ` |
| 請求履歴 | `BILLING_READ` |
| 使用属性 | `USAGE_READ` + Enterprise または Pro プラン |
| サブ組織のコスト傾向 | 親組織で `suborg_cost_trends` が有効になっている必要があります |

権限の管理に関する詳細については、[ロールベースの Access Control][3] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/billing/bill-overview
[2]: /ja/account_management/plan_and_usage/bill_overview/#product-detail-page
[3]: /ja/account_management/rbac/