---
description: クラウドコストの変更、しきい値、予測、異常 (リアルタイムの AI コスト増加を含む) を監視します。
further_reading:
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci
  tag: ブログ
  text: Datadog Cloud Cost Management を使用して、OCI コストを管理および最適化します。
- link: https://docs.datadoghq.com/cloud_cost_management/?tab=aws#overview
  tag: ドキュメント
  text: Cloud Cost Management
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の設定
- link: /monitors/downtimes/
  tag: ドキュメント
  text: モニターをミュートするダウンタイムのスケジュール
- link: /monitors/status/
  tag: ドキュメント
  text: モニターステータスの参照
- link: https://www.datadoghq.com/blog/ccm-cost-monitors/
  tag: ブログ
  text: Datadog Cloud Cost Management のコストモニターでコスト超過に迅速に対応
- link: https://www.datadoghq.com/blog/google-cloud-cost-management/
  tag: ブログ
  text: Datadog でエンジニアが Google Cloud のコストを管理するための権限を与える
title: Cloud Cost Monitor
---
## 概要 {#overview}

Cloud Cost Monitors を使用すると、コストの変更を事前に特定し、予算を超過する見込みがあるかどうかを把握できるため、原因を調査できます。

-   すべてのコストモニターを即座に表示し、チーム、サービス、タグ、プロバイダー、またはアラートステータスでフィルタリングまたは検索します。
-   設定されているコストモニターの数、アラートが発生しているコストモニター、および追跡されているクラウド支出の領域の概要を確認します。
-   テンプレートを使用して新しいコストモニターを作成し、注意が必要なコストモニターに対してアクションを実行します。

Cloud Cost Monitors を構成するには、[Cloud Cost Management][1] をセットアップしておく必要があります。

アラートの対象とするコストデータに一致するセットアップを選択します。

-   [変更、しきい値、予測、予算、および確定したコスト異常に対するモニターを作成](#create-a-monitor)します。これらのモニターは、確定した請求データ、30 分間の評価頻度、および 48 時間の評価遅延ウィンドウを使用します。これは、請求データが使用後 48 時間まで利用できない可能性があるためです。たとえば、1 月 15 日に評価される 7 日間のルックバックでは、1 月 6 日から 1 月 13 日までのコストデータを調査します。
-   [リアルタイム AI 異常モニターを作成](#create-a-real-time-ai-anomaly-monitor)して、[Agent Observability][102] からの推定 AI コストが予期せず増加した際に 15 分以内にアラートを送信します。

## モニターを作成する {#create-a-monitor}

この手順は、確定した請求データを使用する Cloud Cost Monitors (変更、しきい値、予測、予算、および確定した異常モニター) を対象としています。推定 AI コストに対して 15 分以内にアラートを送信するには、[リアルタイム AI 異常モニターを作成](#create-a-real-time-ai-anomaly-monitor)を参照してください。

Datadog で Cloud Cost Monitor を作成するには、[{{< ui >}}Cloud Cost > Analyze > Cost Monitors{{< /ui >}}][4] に移動して {{< ui >}}\+ New Cost Monitor{{< /ui >}} をクリックします。

または、[{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Cloud Cost{{< /ui >}}][3]、メインナビゲーション、[Cloud Cost Explorer][5]、あるいは [Terraform][2] から設定することもできます。

{{< img src="/monitors/monitor_types/cloud_cost/cost-monitors-create-new.png" alt="[Cost Monitor] ページの [Create Monitor] ボタン" style="width:100%;" >}}

### コストモニターのタイプを選択する{#select-a-cost-monitor-type}

以下のモニタータイプから選択できます。

| モニタータイプ | コストメトリクスベース | 目的                                                                                                                                                                                                                                                   | 例                                                                                            |
| ------------ | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 変更      | はい               | 日次、週次、または月次のコストの変化を検出します。                                                                                                                                                                                                           | 今日のコストと前週のコストの差が 5% を超えた場合にアラートを送信します。                    |
| 異常    | はい               | 通常とは異なる、または予期しないコストパターンを特定します。<br> <br> 確定済みのモニターでは、不完全な日を除外し、少なくとも 1 か月分のクラウドコストデータが必要です。これは、アルゴリズムのトレーニングに履歴データが必要なためです。[リアルタイム AI 異常モニター](#create-a-real-time-ai-anomaly-monitor)は、推定 AI コストに対して 15 分以内にアラートを送信します。| 過去 30 日間のうち 3 日間で、履歴データと比較して大幅なコスト異常が見られた場合、または AI コストが予期せず増加した場合に 15 分以内にアラートを送信します。|
| しきい値    | はい               | コストが設定値を超えた場合にアラートを送信します。                                                                                                                                                                                                                     | 今日の総コストが 10,000 USD を超えた場合にアラートを設定します。                                                |
| 予測     | はい               | 予測コストがしきい値を超えた場合にアラートを送信します。                                                                                                                                                                                                           | 今月の予測コストが 500 USD を超えると予測される場合に、毎日アラートを送信します。                     |
| 予算       | いいえ                | 実績コストまたは[予測][8]コストが[予算][7]を超えた場合にアラートを送信します。                                                                                                                                                                                        | 今月の予測コストが、割り当てられた 10,000 USD の予算の 90% を超えると予測される場合にアラートを送信します。     |

### 追跡するコストを指定する {#specify-which-cost-to-track}

{{< tabs >}}
{{% tab "コストメトリクスベース" %}}

Datadog に報告されるあらゆるコストタイプまたはメトリクスをモニターに使用できます。カスタムメトリクスや監視可能性メトリクスをコストメトリクスと併用して、ユニットエコノミクスを監視できます。

| ステップ                     | 必須 | デフォルト           | 例                 |
| ------------------------ | -------- | ----------------- | ----------------------- |
| コストメトリクスを選択   | はい      | すべてのプロバイダー     | `azure.cost.actual`     |
| 定義 `filter by`   | いいえ       | なし           | `aws_product:s3`        |
| グループ化                 | いいえ       | なし           | `aws_availability_zone` |
| 監視可能性メトリクスを追加 | いいえ       | `system.cpu.user` | `aws.s3.all_requests`   |

エディターを使用して、コストタイプまたはエクスポートを定義します。

{{< img src="monitors/monitor_types/cloud_cost/cost-monitors-specify-cost.png" alt="追跡するコストを指定するための Cloud Cost and Metrics データソースオプション" style="width:100%;" >}}

{{% /tab %}}
{{% tab "予算ベース" %}}

ドロップダウンから監視する既存の予算を選択します。

{{< img src="monitors/monitor_types/cloud_cost/budget-monitor-select-budget.png" alt="コストを追跡する予算を指定するためのドロップダウン" style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

詳細については、[Cloud Cost Management のドキュメント][1]を参照してください。

### アラート条件を設定する {#set-alert-conditions}

{{< tabs >}}
{{% tab "変更" %}}

{{< ui >}}Cost Changes{{< /ui >}} モニタータイプを使用している場合、コストが定義されたしきい値を `increases` または `decreases` したときにアラートを送信できます。しきい値は、{{< ui >}}Percentage Change{{< /ui >}} に設定するか、{{< ui >}}Dollar Amount{{< /ui >}} に設定できます。

{{< ui >}}Percentage Change{{< /ui >}} を使用している場合、一定の金額しきい値を下回る変更を除外できます。たとえば、500 USD を超える変更について、コストが 5% を超えて変化した場合に、コストモニターがアラートを送信します。

{{% /tab %}}

{{% tab "異常値" %}}

これらの条件は、{{< ui >}}Alert on{{< /ui >}} が {{< ui >}}finalized{{< /ui >}} の場合に適用されます。推定 AI コストに対して 15 分以内にアラートを送信するには、[リアルタイム AI 異常モニターを作成](#create-a-real-time-ai-anomaly-monitor)を参照してください。

{{< ui >}}Cost Anomalies{{< /ui >}} モニタータイプの場合、監視されたコストが履歴データと比較して、しきい値を `above`、`below`、または `above or below` した場合にアラートを送信できます。

`agile` [異常検知アルゴリズム][101]は、2 つの境界と月次の季節性を使用します。

[101]: /ja/dashboards/functions/algorithms/

{{% /tab %}}

{{% tab "しきい値" %}}

{{< ui >}}Cost Threshold{{< /ui >}} モニタータイプを使用している場合、クラウドコストがしきい値を `above`、`below`、`above or equal`、または `below or equal to` した場合にアラートを送信できます。

{{% /tab %}}
{{% tab "予測値" %}}

{{< ui >}}Cost Forecast{{< /ui >}} モニタータイプを使用している場合、クラウドコストがしきい値を `above`、`below`、`above or equal`、`below or equal to`、`equal to`、または `not equal to` した場合にアラートを送信できます。

{{% /tab %}}

{{% tab "予算" %}}
{{< ui >}}Budget{{< /ui >}} モニタータイプを使用している場合、実績または予測のクラウドコストが、前のステップで選択した予算の割合を超えた場合にアラートを送信できます。

| ステップ             | 目的                                                                           | 値                            |
| ---------------- | --------------------------------------------------------------------------------- | --------------------------------- |
| 評価基準 | モニターが実績支出と予測支出のどちらを予算と比較するか。| `actual`, `forecasted`            |
| 粒度      | コストを評価する詳細レベル。                                  | `overall` (合計コスト)、`per_row` |
| しきい値        | アラートをトリガーするために設定する予算の割合。                      | 0～100 の数値 (%)      |
| 期間        | しきい値を超えたかどうかを評価するための評価期間。                    | `all_months`、`current_month`     |

{{< ui >}}is forecasted to reach{{< /ui >}} を選択すると、モニターは予算カードや予算ステータスページと同じ[予測モデル][8]を使用します。

[8]: /ja/cloud_cost_management/planning/forecasting/
{{% /tab %}}
{{< /tabs >}}

<br>

### 通知と自動化の構成 {#configure-notifications-and-automations}

{{< ui >}}Configure notifications and automations{{< /ui >}}セクションの詳しい説明については、[通知][6]ページを参照してください。

### 権限と監査通知の定義{#define-permissions-and-audit-notifications}

モニターの**表示**または**編集**を許可するチーム、ロール、ユーザー、またはサービスアカウントを選択します。デフォルトでは、組織の全メンバーがアクセスできます。

{{< ui >}}Audit Notifications{{< /ui >}} を有効にして、モニターが変更されるたびにモニター作成者と受信者に通知することもできます。

## リアルタイム AI 異常モニターを作成する {#create-a-real-time-ai-anomaly-monitor}

リアルタイム AI 異常モニターは、AI コストの予期しない増加を検出し、15 分以内にアラートを送信します。これらは、確定したクラウド請求データではなく、[Agent Observability][102] からの推定コストを使用します。Datadog は、推定コストの直近 4 時間の評価期間から異常を特定します。

### 前提条件{#prerequisites}

- [Agent Observability][102] が LLM コストデータを送信しています。推定コストは、トークン数とプロバイダーの料金体系から計算されます。[Agent Observability のコスト][103]を参照してください。
- [`ml_obs.span.llm.total.cost`][104] メトリクスが報告されました。{{< ui >}}real time{{< /ui >}} オプションは、このメトリクスが報告された後に表示されます。
- 少なくとも 3 日分のコストデータが利用可能です。検出品質のため、Datadog では 21 日間を推奨しています。

### モニターを構成する {#configure-the-monitor}

1. [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Analyze{{< /ui >}} > {{< ui >}}Cost Monitors{{< /ui >}}][4] に移動し、{{< ui >}}\+ New Cost Monitor{{< /ui >}}をクリックします。
2. {{< ui >}}Anomalies{{< /ui >}} を選択します。
3. {{< ui >}}Alert on{{< /ui >}} を {{< ui >}}real time{{< /ui >}} に、コストタイプを {{< ui >}}AI cost{{< /ui >}} に設定します。このモニターは、過去 15 分以内に検出された異常についてアラートを送信します。
4. オプションで、{{< ui >}}Filter cost to{{< /ui >}} を使用してコストのスコープを絞り込み、{{< ui >}}Detect anomalies on{{< /ui >}} を使用して最大 2 つのタグでグループ化します。`ml_app` および `model_provider` は、{{< ui >}}Preferred Tags{{< /ui >}} の下に一覧表示されます。
5. 今後 24 時間の推定合計コストのしきい値を設定します。組織の通貨で 500 以上を入力してください。Datadog が異常を検出し、推定合計コストがこのしきい値を超えると、モニターがアラートを送信します。
6. [通知の構成][6]。

代わりに確定したクラウド請求データを監視するには、{{< ui >}}Alert on{{< /ui >}} を {{< ui >}}finalized{{< /ui >}} に設定し、[モニターを作成](#create-a-monitor)に従ってください。確定済み異常モニターは、アジャイル異常アルゴリズムを使用し、不完全な日を除外し、少なくとも 1 か月分のクラウドコスト履歴を必要とします。

## その他の実行可能なアクション {#other-actions-you-can-take}

{{< img src="/monitors/monitor_types/cloud_cost/cost-monitors-other-actions.png" alt="アクションメニューには、Cloud Cost Explorer でモニターを表示するオプションのほか、モニターを編集、複製、削除するオプションがあります。" style="width:100%;" >}}

-   {{< ui >}}View in Monitors{{< /ui >}}をクリックすると、モニターのアラート履歴を確認したり、視覚化を調整したり、アラートのトリガー頻度を確認したりできます。
-   {{< ui >}}View in Explorer{{< /ui >}}詳細な分析を行うために、Cloud Cost Explorer でモニターを開きます。
-   {{< ui >}}Edit{{< /ui >}}モニターの設定や構成を更新するためのモニター。
-   {{< ui >}}Clone{{< /ui >}}{{< ui >}}Actions{{< /ui >}} > {{< ui >}}Clone{{< /ui >}} を選択して、既存のモニターのコピーを作成するためのモニター。
-   {{< ui >}}Delete{{< /ui >}}不要になったモニターを完全に削除するためのモニター。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/cloud_cost_management/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/monitor
[3]: https://app.datadoghq.com/monitors/create/cost
[4]: https://app.datadoghq.com/cost/analyze/monitors
[5]: https://app.datadoghq.com/cost/explorer
[6]: /ja/monitors/notify/
[7]: /ja/cloud_cost_management/planning/budgets/
[8]: /ja/cloud_cost_management/planning/forecasting/
[102]: /ja/llm_observability/
[103]: /ja/llm_observability/investigate/cost/
[104]: /ja/llm_observability/investigate/metrics/