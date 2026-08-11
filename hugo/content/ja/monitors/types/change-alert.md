---
aliases:
- /ja/monitors/guide/change-alert
disable_toc: false
further_reading:
- link: /monitors/types/metric/?tab=change#choose-the-detection-method
  tag: ドキュメント
  text: メトリクスモニターの検出方法を選択
- link: /monitors/configuration/
  tag: ドキュメント
  text: モニターの構成方法について
title: 変更アラートモニター
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

Datadog で [変更アラートモニター][9]を作成するには、メインナビゲーションで *Monitors → New Monitor → Change* を選択します。

## 評価条件

ここでは、変化アラートモニターで構成する必要があるさまざまなオプションを示します。

{{< img src="/monitors/monitor_types/change-alert/configure_define_the_metrics.png" alt="変更アラート検出方法の設定オプション" style="width:100%;" >}}

この例では、次のアラート条件が設定されています。 
**1 時間** における **change** の **平均** を **5 分** 前と比較する

| 選択したオプション | 説明 | オプション |
| --------------- | --------------------------------------------------------------------------- | ----------------------------- |
| average | クエリに適用される集約方法。 | `Average`, `Maximum`, `Minimum`, `Sum` |
| change | 値の絶対変化量かパーセント変化量かを選択。 | `change` または `% change` |
| 1 hour | 評価ウィンドウ。詳細は[モニター設定][1]ドキュメントを参照。 | N 分、時間、日、週、最大 1 か月まで設定可能 |
| 5 minutes | クエリをどれだけシフトさせるかの時間範囲。 | N 分、時間、日、週、最大 1 か月前まで指定可能 |

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

{{< img src="monitors/monitor_types/change-alert/example_monitor_config.png" alt="変更アラートを選択し、メトリクス system.load.1 の平均値について、直近 5 分間と過去 30 分間を比較してパーセント変化を評価しているモニター作成ページ" style="width:100%;" >}}

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
    {{< img src="monitors/monitor_types/change-alert/notebook_query_reconstruct_timeshift.png" alt="ノートブックのセル編集画面。タイトルは「Reconstruct Change Alert query」。あらゆるホストから取得したメトリクス system.load.1 の平均を時系列で表示し、式 ((a - timeshift(a, -1800)) / timeshift(a, -1800)) * 100 を適用している" style="width:100%;" >}}
2. モニターの履歴グラフとノートブックのグラフを比較してください。値は同等ですか？
3. 集計を適用します。
    - ノートブックのグラフを変化アラートのモニター評価と比較するには、時間枠を変化アラートと一致させます。
    - 例えば、1:30 に過去 5 分間のモニター評価値を確認したい場合、ノートブックの範囲を 1:25 - 1:30 にします。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/configuration/#evaluation-window
[2]: /ja/monitors/status/#investigate-a-monitor-in-a-notebook
[3]: /ja/dashboards/functions/timeshift/
[7]: /ja/monitors/notify/
[8]: /ja/monitors/configuration/?tab=thresholdalert#configure-notifications-and-automations
[9]: https://app.datadoghq.com/monitors/create/metric/change