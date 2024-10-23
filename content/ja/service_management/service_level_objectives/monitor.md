---
aliases:
- /ja/monitors/service_level_objectives/monitor/
description: モニターを使用してサービスレベル目標 (SLO) を定義する
further_reading:
- link: /monitors/
  tag: Documentation
  text: モニターの詳細
- link: https://www.datadoghq.com/blog/define-and-manage-slos/#monitor-based-slo
  tag: ブログ
  text: Datadog で SLO を管理するためのベストプラクティス
title: モニターベース SLO
---

## 概要
To build an SLO from new or existing Datadog monitors, create a monitor-based SLO. Using a monitor-based SLO, you can calculate the Service Level Indicator (SLI) by dividing the amount of time your system exhibits good behavior by the total time.

<div class="alert alert-info">Time Slice SLOs are another way to create SLOs with a time-based SLI calculation. With Time Slice SLOs, you can create an uptime SLO without going through a monitor, so you don’t have to create and maintain both a monitor and an SLO.</div>

{{< img src="service_management/service_level_objectives/monitor_slo_side_panel.png" alt="monitor-based SLO example" >}}

## 前提条件

モニターベースの SLO を作成するには、既存の Datadog モニターが必要です。新しいモニターをセットアップするには、[モニター作成ページ][1]にアクセスします。

Datadog のモニターベースの SLO は、以下のモニタータイプをサポートしています。
- メトリクスモニターの種類 (メトリクス、インテグレーション、APM メトリクス、異常検知、予測値、外れ値)
- Synthetic
- サービスチェック (オープンベータ)

## セットアップ

On the [SLO status page][2], click **+ New SLO**. Then, select **By Monitor Uptime**.

### クエリの定義


検索ボックスで、モニターの名前を入力し始めます。一致するモニターのリストが表示されます。モニター名をクリックすると、そのモニターがソースリストに追加されます。

**注**:

- If you're using a single multi alert monitor in an SLO, you can optionally select "Calculate on selected groups" and pick up to 20 groups. 
- If you're adding multiple monitors to your SLO, group selection is not supported. You can add up to 20 monitors.

### SLO ターゲットの設定

**目標**パーセンテージ、*タイムウィンドウ**、オプションで**警告**レベルを選択します。

The target percentage specifies the portion of time the underlying monitor(s) of the SLO should not be in the ALERT state. The time window specifies the rolling period the SLO runs its calculation.

SLI の値に応じて、Datadog UI は SLO のステータスを異なる色で表示します。
- SLI が目標値を超えている間は、UI に SLO のステータスが緑色で表示されます。
- SLI が目標値を下回ると、UI に SLO のステータスが赤色で表示されます。
- 警告レベルを含め、SLI が警告を下回り、目標レベルを上回った場合、UI に SLO のステータスが黄色で表示されます。

選択したタイムウィンドウによって、モニターベースの SLO に利用できる精度が変わります。
- 7 日および 30 日のタイムウィンドウは、小数点以下 2 桁まで表示可能です。
- 90 日のタイムウィンドウは、小数点以下 3 桁まで表示可能です。

SLO の詳細 UI では、7 日および 30 日のタイムウィンドウで構成された SLO については小数点以下 2 桁、90 日のタイムウィンドウで構成された SLO については小数点以下 3 桁が Datadog に表示されます。

次の例は、Datadog が SLO 計算の小数点以下の桁数を制限して表示する理由を示しています。7 日または 30 日のタイムウィンドウで 99.999% の目標を設定すると、それぞれ 6 秒または 26 秒のエラーバジェットが発生します。モニターは 1 分ごとに評価するため、モニターベースの SLO の粒度も 1 分となります。したがって、1 つのアラートで、前の例の 6 秒または 26 秒のエラーバジェットが完全に消費され、過剰に使用されることになります。実際には、チームはこのような小さなエラーバジェットを満足させることはできません。

1 分間に 1 回のモニター評価よりも細かい粒度が必要な場合は、代わりに[メトリクスベースの SLO][3] を使用することを検討してください。

### 名前とタグを追加する

Choose a name and extended description for your SLO. Select any tags you would like to associate with your SLO. Select **Create** or **Create & Set Alert** to save your new SLO.

## ステータス計算

{{< img src="service_management/service_level_objectives/monitor_slo_overall_status.png" alt="Monitor-based SLO with groups" >}}

Datadog calculates the overall SLO status as the uptime percentage across all monitors or monitor groups, unless specific groups have been selected:
- If specific groups have been selected (up to 20), the SLO status is calculated with only those groups. The UI displays all selected groups. 
- If no specific groups are selected, the SLO status is calculated across *all* groups. The UI displays all underlying groups of the SLO. 

**注**: グループがあるモニターベースの SLO では、最大 5,000 グループを含む SLO に対してすべてのグループを表示できます。5,000 を超えるグループを含む SLO の場合、SLO はすべてのグループに基づいて計算されますが、UI にはグループは表示されません。

モニターベースの SLO は、`WARN` 状態を `OK` として扱います。SLO の定義には、良い動作と悪い動作の二元的な区別が必要です。SLO の計算では、`WARN` は悪い動作を示すほど深刻ではないため、`WARN` を良い動作として扱います。

3 つのモニターを含むモニターベースの SLO の次の例を考えます。1 台のマルチアラートモニターに基づくモニターベースの SLO の計算も同様です。

| モニター            | t1 | t2 | t3    | t4 | t5    | t6 | t7 | t8 | t9    | t10 | ステータス |
|--------------------|----|----|-------|----|-------|----|----|----|-------|-----|--------|
| モニター 1          | OK | OK | OK    | OK | アラート | OK | OK | OK | OK    | OK  | 90%    |
| モニター 2          | OK | OK | OK    | OK | OK    | OK | OK | OK | アラート | OK  | 90%    |
| モニター 3          | OK | OK | アラート | OK | アラート | OK | OK | OK | OK    | OK  | 80%    |
| **全体的なステータス** | OK | OK | アラート | OK | アラート | OK | OK | OK | アラート | OK  | 70%    |

この例では、全体のステータスが個々のステータスの平均値よりも低くなっています。

### Synthetic テストの例外
場合によっては、1 つのグループ化された Synthetic テストで構成されるモニターベースの SLO のステータス計算に例外があります。Synthetic テストには、テストが ALERT 状態に入るときの動作を変更し、その結果、全体的なアップタイムに影響を与えるオプションの特別なアラート条件があります。

- グループが指定された分数の間失敗するまで待ちます (デフォルト: 0)
- 指定された数のグループが失敗するまで待ちます (デフォルト: 1)
- ロケーションのテストが失敗と見なされる前に、指定された回数再試行します (デフォルト: 0)

これらの条件のいずれかをデフォルト以外に変更した場合、1 つの Synthetic テストを使用するモニターベースの SLO の全体的なステータスは、Synthetic テストの個々のグループの集計ステータスよりも優れているように見える可能性があります。

Synthetic テストのアラート条件の詳細については、[Synthetic モニタリング][4]を参照してください。

### 手動および自動モニターアップデートの影響

モニターが手動で解決された場合、または **_After x hours automatically resolve this monitor from a triggered state_** (x 時間後、このモニターをトリガー状態から自動的に解決する) 設定の結果として、SLO 計算が変更されることはありません。これらがワークフローにとって重要なツールである場合、モニターのクローンを作成し、自動解決設定と`@-notification` 設定を削除し、SLO にクローンを使用することを検討してください。

Datadog では、SLO の下地として `Alert Recovery Threshold` と `Warning Recovery Threshold` を持つモニターを使用しないことを推奨しています。これらの設定は、SLI の良い動作と悪い動作をきれいに区別することを難しくします。

モニターをミュートしても、SLO の計算には影響しません。

SLO の計算から期間を除外するには、[SLO ステータス修正][5]機能を使用します。

### データがない
メトリクスモニターまたはサービスチェックを作成する際に、データが欠落している場合にアラートを送信するかどうかを選択します。この構成は、モニターベースの SLO 計算が欠落データをどのように解釈するかに影響します。欠落データを無視するように構成されたモニターの場合、欠落データのある時間帯は、SLO によって OK (アップタイム) として扱われます。欠落データにアラートを出すように構成されたモニターの場合、欠落データのある時間帯は、SLO によってアラート (ダウンタイム) として扱われます。

Synthetic テストを一時停止すると、SLO はデータが欠落している期間を計算から除外します。UI では、これらの期間は SLO ステータスバーで薄いグレーで表示されます。


## 基底のモニターと SLO 履歴

メトリクスモニタータイプに基づく SLO には、SLO Replay という機能があり、基礎となるモニターのメトリクスとクエリ構成から取り出した履歴データで SLO ステータスを埋め戻します。新しいメトリクスモニターを作成し、その新しいモニターに SLO を設定する場合、SLO のステータスを表示するために 7 日、30 日、または 90 日間待つ必要はありません。その代わり、SLO Replay は新しい SLO を作成したときにトリガーされ、モニターの基礎となるメトリクスとクエリの履歴を調べて、ステータスを記入します。

SLO Replay は、基礎となるメトリクスモニターのクエリを変更して、新しいモニター構成に基づいてステータスを修正した場合にもトリガーされます。SLO Replay が SLO のステータス履歴を再計算する結果、モニターの更新後、モニターのステータス履歴と SLO のステータス履歴が一致しない場合があります。

**注:** Synthetic テストまたはサービスチェックに基づく SLO は、SLO Replay をサポートしません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create
[2]: https://app.datadoghq.com/slo
[3]: /ja/service_management/service_level_objectives/metric/
[4]: /ja/synthetics/api_tests/?tab=httptest#alert-conditions
[5]: /ja/service_management/service_level_objectives/#slo-status-corrections