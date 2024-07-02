---
title: Change Alert Monitor
disable_toc: false
aliases:
- monitors/guide/change-alert
further_reading:
- link: "/monitors/types/metric/?tab=change#choose-the-detection-method"
  tag: Documentation
  text: Choose the detection method of Metric Monitors
- link: /monitors/configuration/
  tag: Documentation
  text: Learn how to configure monitors
---

## 概要

メトリクスモニターは、最も一般的に使用されるタイプのモニターの 1 つです。このガイドでは、変化アラート検出方法の動作と追加オプションについて説明します。変化アラートモニターの動作と変化アラート評価のトラブルシューティング方法について説明します。

## 変化アラートモニターとは？
以下は、変化検出方式のモニターがどのように機能するかの内訳です。
1. モニターは現在時刻のデータポイントのクエリを取ります。
1. N 分前、N 時間前、N 日前のデータポイントのクエリを取ります。
1. そして、(1) と (2) の値の差のクエリを取ります。
1. 集計は、単一の値を返す (3) のクエリに対して適用されます。
1. **Set alert conditions** で定義されたしきい値は、(4) で返された単一の値と比較されます。

## モニターの作成

To create a [Change Alert monitor][9] in Datadog, use the main navigation: *Monitors --> New Monitor --> Change*.

## 評価条件

ここでは、変化アラートモニターで構成する必要があるさまざまなオプションを示します。

{{< img src="/monitors/monitor_types/change-alert/configure_define_the_metrics.png" alt="Configuration options for change alert detection method" style="width:100%;" >}}

The example shows the following alert condition:
The **average** of the **change** over **1 hour** compared to **5 minutes**
| Options selected | Description                                                                                     | Options |
| ---------------  | ------------------------------------------------------------------------------------------------| ----------- |
| average          | The aggregation that is used on the query.                                                      | `Average`, `Maximum`, `Minimum`, `Sum` |
| change           | Choose between the absolute or percentage change of the value.                                  | `change` or `% change`|
| 1 hour           | The evaluation window. For more information, see the [Monitor Configuration][1] documentation.  | This can be N minutes, hours, days, weeks, or at most one month. |
| 5 minutes        | The timeframe that you wish to shift the query by.                                              | This can be N minutes, hours, days, weeks, or at most one month ago.|

### 変化と変化率

変化アラート検出の構成には、**Change** と **% Change** の 2 つのオプションがあります。

これは、次の表の数式セクションで表されるモニターの評価方法を決定します。

| オプション   | 説明                                                        | 計算式              |
| -------  | ------------------------------------------------------------------ | -------------------- |
| 変更   | 値の絶対変化量です。                                  | `a - b`              |
| % Change | 前回値と比較した値の変化率。 | `((a - b) / b) * 100`|

どちらの場合も、`Change` と `% Change` は正でも負でもかまいません。

## 通知

For instructions on the **Configure notifications and automations** section, see the [Notifications][7] and [Monitor configuration][8] pages.

## 変化アラート評価のトラブルシューティング

変化アラートの評価結果を確認するには、メトリクスクエリをノートブックで再構築します。
この変化アラートモニターを以下の設定で実行します。

{{< img src="monitors/monitor_types/change-alert/example_monitor_config.png" alt="The create monitor page with a change alert selected, evaluating the percent change of the average of the metric system.load.1 over the last 5 minutes compared to the last 30 minutes" style="width:100%;" >}}

モニタークエリ:
```pct_change(avg(last_5m),last_30m):<METRIC> > -50```

これは、以下の条件のクエリの内訳です。
1. **avg** の集計。
2. **% change** を使用する。
3. 評価ウィンドウは **5 minutes**。
4. タイムシフトは **30 minutes** つまり 1800 秒。
5. しきい値は **> -50**。

### クエリの再構築

1. [ノートブック][2]と[タイムシフト関数][3]を使って、特定の評価でモニターが使用したデータを再構築します。
    - 現在時刻のデータポイントのクエリ (これは通常のクエリ<QUERY>)。
    - N 分前のデータポイントのクエリ (これは通常のクエリ + timeshift(-1800))。
    - タイムシフト関数は、データを後ろにシフトするため、**負の**期間を使用します。これらのクエリと、表の変化率式を組み合わせてください。
    - **注**: この例ではメトリクスが 1 つしかないため、1 つのクエリ (a) を使用し、数式 `((a - timeshift(a, -1800)) / timeshift(a, -1800)) * 100` を追加することも可能です。
    {{< img src="monitors/monitor_types/change-alert/notebook_query_reconstruct_timeshift.png" alt="The edit screen of a cell in a notebook, titled Reconstruct Change Alert query, configured as a timeseries using the average of the metric system.load.1, from everywhere, with the formula ((a - timeshift(a, -1800)) / timeshift(a, -1800)) * 100 being applied" style="width:100%;" >}}
2. モニターの履歴グラフとノートブックのグラフを比較してください。値は同等ですか？
3. 集計を適用します。
    - ノートブックのグラフを変化アラートのモニター評価と比較するには、時間枠を変化アラートと一致させます。
    - 例えば、1:30 に過去 5 分間のモニター評価値を確認したい場合、ノートブックの範囲を 1:25 - 1:30 にします。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/configuration/#evaluation-window
[2]: /monitors/manage/status/#investigate-a-monitor-in-a-notebook
[3]: /dashboards/functions/timeshift/
[7]: /monitors/notify/
[8]: /monitors/configuration/?tab=thresholdalert#configure-notifications-and-automations
[9]: https://app.datadoghq.com/monitors/create/metric/change
