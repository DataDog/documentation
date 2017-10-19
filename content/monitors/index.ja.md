---
last_modified: 2017/08/24
translation_status: complete
language: ja
title: Monitor(監視)機能の設定ガイド
kind: documentation
aliases:
  - /ja/guides/monitoring
  - /ja/guides/alerting
  - /ja/guides/monitors
---

<!--
Monitoring in Datadog refers to the ability to notify your team when conditions are met. If you are just starting with monitors in Datadog, please refer to our [Guide to Monitors](/monitors) for an introduction.
-->

このMonitoringレファレンスでは、条件が満たされた時にチームが通知を受けるための設定について解説します。DatadogのMonitor(監視)機能を使い始めたばかりの場合、まずは入門編の[Monitor(監視)機能の設定ガイド](/ja/monitors) ページを参照して下さい。

<!--
Here is a quick overview of the different terms used in this guide.

- **Status**: Each check run submits a status of OK, WARNING or CRITICAL.
- **Check**: Emits one or more statuses.
- **Monitor**: Sends notifications based on a sequence of check statuses, metric
  threshold or other alerting conditions.
- **Monitor type**: [host](#host)-, [metric](#metric)-, [integration](#integration)-, [process](#process)-, [network](#network)-, [event](#event)-based, and [custom](#custom). See side navigation to drill into a specific type.
- **Tags**: Configurable labels that can be applied to each metric and host. See the [Tagging](/ja/agent/tagging) page for more details.
-->

## 用語集

以下は、このドキュメントで使用している用語の簡単な概要になります。

- **Status**: 各Agent Checkは、ホスト上で定期的に実行されOK, WARNING, CRITICALのステータスをDatadogに送信します。
- **Check**: Agent Checkのことで、複数のステータスを送信します。
- **Monitor**: Agent Checkのステータスやメトリクスの閾値の確認手順、その他のアラート条件を元に通知を送信します。
- **Monitorタイプ**: [ホスト](#ホストを対象にしたmonitor)-, [メトリクス](#メトリクスを対象にしたmonitor)-, [インテグレーション](#インテグレーションを対象にしたmonitor)-, [プロセス](#プロセスを対象にしたmonitor)-, [ネットワーク](#ネットワークを対象にしたmonitor)-, [イベント](#イベントを対象にしたmonitor)-, [カスタムチェック](#カスタムチェックを対象にしたmonitor), APM-, [コンポジット](#コンポジット-複合-monitor)-, があります。特定のMonitorタイプの詳細に関しては、サイドバーからそれぞれのタイプの項目を確認してください。
- **タグ**: 各メトリクスやホストに対して付けることができるラベルです。タグの詳細に関しては、[Tagging](/agent/tagging) ページを参照して下さい。

<!-- ## Creating a Monitor

Navigate to the [Create Monitors](https://app.datadoghq.com/monitors#/create)
page by highlighting the "Monitors" tab in the main menu and selecting the
"Create Monitors" sub-tab (depending on your chosen theme, the main menu may be at the top or on the left).  You will be presented with a list of monitor types
on the left. This document will walk through the configuration of each type.
-->

## 新しいMonitorの作成

<!--
Navigate to the [Create Monitors](https://app.datadoghq.com/monitors#/create)
page by hovering over **Monitors** in the main menu and clicking **New Monitor** in the sub-menu (depending on your chosen theme and screen resolution, the main menu may be at the top or on the left). You will be presented with a list of monitor types
on the left. This page shows how to setup a metric Monitor, but see the [Monitoring Reference](/monitoring) to learn more about other Monitor types.
 -->

[Create Monitors](https://app.datadoghq.com/monitors#/create)のページへ移動するには、メインメニューの **Monitors** にマウスオーバーし現れるサブメニューの **New Monitor** を選択します(テーマの選択次第により、メインメニューは画面の左側あるいは上部に配置されています)。ページが表示されると各Monitorタイプが左側に一覧で表示されます。このガイドでは、メトリクスを対象にしたMonitorタイプについての設定方法を説明していきます。より詳しい各Monitorタイプの設定方法については、[Monitoringレファレンス](/ja/monitors)ページを参照して下さい。

{{< img src="monitors/index/nav.png" >}}

<!--
### Choose what to monitor
-->
### 監視対象の設定

<!--
1. Choose the detection method

    A **Threshold Alert** compares the value in the selected
    timeframe against a given threshold. There are additional options available
    in the alerting conditions section. This is the standard alert case
    where you know what sort values are unexpected.

    A **Change Alert** compares the absolute or percentage change in
    value between now and some time ago against a given threshold.
    The compared data points will not be single points but are computed using
    the parameters in the *alert conditions* section.

    This type of alert is useful to track sudden spikes or drops as well as slow
    changes in a metric when you might not have an exact "unexpected" threshold.
    *Note:* the calculated value is not the absolute value - meaning it will be
    negative for a downward change.

    **Anomaly Detection** is an algorithmic feature that allows you to identify
    when a metric is behaving differently than it has in the past, taking into
    account trends, seasonal day-of-week and time-of-day patterns. It is well-
    suited for metrics with strong trends and recurring patterns that are hard
    or impossible to monitor with threshold-based alerting.

    **Outlier Detection** is an algorithmic feature that allows you to detect
    when some members of a group are behaving strangely compared to the others.
    For example, you could detect that one web server in a pool is processing an
    unusual number of requests, and hence should be a target for replacement. Or,
    you could get an early warning that significantly more 500s are happening in
    one AWS Availability Zone (AZ) than the others, which might indicate an issue
    arising in that AZ.
-->

1. アラートの検知手法の設定

    {{< img src="monitors/index/alert_type.png" alt="alert type" >}}

    **threshold alert**は、時間枠内のメトリクス値と指定した閾値を比較する、最も一般的なアラート検知の方法です。更に、アラート条件セクションには、追加で設定可能なオプションもあります。このアラートタイプは正常な範囲か値が事前に分かっている場合に使用します。

    **change alert**は、直近のデータポイントの値に対するいくらか前の時間の値との変化量または変化率について、指定した閾値と比較します。
    比較しているデータポイントの値は単一点の値ではなく、*Set alert conditions* のセクションで指定されたパラメータで計算されたものになります。

    このアラートタイプは、メトリクスのゆっくりとした変化はもちろん、急速なスパイクやドロップを追跡するのに有効であり、そのメトリクスの正常な範囲や値が事前に分かっていない場合に特に有効です。
    *注:* このアラートの為の計算値は絶対値ではありません。従って下に向かう変化は、マイナス値になります。

    **Anomaly Detection** は、アルゴリズムベースの異常検出機能です。過去の挙動、つまり1日のうちの特定の時間帯、あるいは1週間のうちの特定の1日の変動パターンを考慮した際に、普段とは異なる挙動がみられた際に検出することができます。これは、閾値ベースのアラートモニタリングで監視することが困難であったり不可能な、強い傾向のある繰り返しパターンを持ったメトリクスに適しています。

    **Outlier Detection** はアルゴリズムベースの異常検出機能であり、グループ内の特定の個体に他とは異なる挙動がみられた際に外れ値データ(Outlier)として検出することができます。例えば、Webサーバー群の特定の1サーバーが異常なリクエスト数を処理しているような場合に検出し、これをリプレースすべきか判断することができます。あるいは、特定のAWSアベイラビリティゾーン(AZ)において、他のAZより多めの500(5XX)エラーを生じていることを早めに検出することで、そのAZに迫りつつある問題を察知することができるかもしれません。

<!--
2. Select the metric and scope you want to monitor.

    You can create a monitor on any metrics that you are currently sending to
    Datadog. The standard [scoping rules](/graphing/#scope) apply here.
-->

2. メトリクスとその対象範囲(スコープ)の設定
  {{< img src="monitors/index/metric_scope.png" alt="metric scope" >}}

    Datadogに送信している全てのメトリクスをもとにMonitor設定を作成することができます。
    この項目では、グラフ表示に使っている標準的な対象範囲(スコープ)の指定の規則が適用されます。
    この規則の詳細に関しては、グラフ表示入門のページの[対象範囲の指定(scope)](/ja/graphing/miscellaneous/graphingjson)を参照してください。

<!--
3. Select the alert grouping.

    A **simple alert** aggregates over all reporting sources. You will get one
    alert when the aggregated value meets the conditions set below. This works
    best to monitor a metric from a single host, like `avg` of
    `system.cpu.iowait` over `host:bits`, or for an aggregate metric across many
    hosts like `sum` of `nginx.bytes.net` over `region:us-east`.

    A **multi alert** applies the alert to each source, according to your group
    parameters. E.g. to alert on disk space you might group by host and device,
    creating the query:

        avg:system.disk.in_use{*} by {host,device}

    This will trigger a separate alert for each device on each host that is
    running out of space.
-->

3. アラートのグループ化についての設定
    {{< img src="monitors/index/alert_grouping.png" alt="alert grouping" >}}

    **Simple Alert**は、全てのレポートソースをまとめて監視します。"Set alert conditions"のセクションで設定した条件に合致した場合、アラートを1回送信します。この設定は、単一ホストから送信されてくるメトリクスを監視するようなケースに最適です。例えば、"`avg` of `system.cpu.iowait` over `host:bits`"のような設定をしてる場合です。更に、"`sum` of `nginx.bytes.net` over `region:us-east`"のように複数のホストの値を集計して単一メトリクスとして監視したい場合にも有効です。

    **Multi Alert**では、パラメータとして指定したグループについて、複数のレポートソースからのアラートを通知することができます。例えば、ディスク容量に関するアラートを通知する場合、ホストとデバイスについてグループを指定すると良いでしょう。JSONでクエリを定義する場合は以下:

        avg:system.disk.in_use{*} by {host,device}

    このように設定することにより、各ホストの各デバイス毎にディスクスペースが無くなった際のアラートを通知することができるようになります。

<!--
### Define the conditions
4. Select the alert conditions

    - The **threshold** options vary slightly depending on what alert type you
      have chosen. For either case, you input a threshold and comparison type
      based on your metric. As you change your threshold, you will see the graph
      update with a marker showing the cutoff point.


      Note that you can use formatted values in this input based on the
      metric itself. For example, if you are monitoring `system.disk.used`, you
      can give a threshold of `20GB`.

      For a **threshold alert** you will be able to chose a *time aggregation*
      of the data. The alerting engine will generate a single series and perform
      selected aggregation.

      Let's look at the details of each option:

        - *on average*: The series will be averaged to produce a single
          value that will be checked against the threshold.

        - *at least once*: If any single value in the generated series crosses
          the threshold then an alert will be triggered.

        - *at all times*: If every point in the generated series is outside the
          threshold then an alert will be triggered.

        - *in total*: If the summation of every point in the series is outside
          the threshold then an alert will be triggered.

        Note the *on average* and *at all times* aggregations *require* a full
          window of data in the final series. This does *not* mean that each series
          must be full but that there shouldn't be a gap of more than 1 minute
          across all aggregated series. In other words, we recommend using *at least
          once* or *in total* for metrics with > 1 minute interval.

          - When you select the **change alert** option, you will have additional
          parameters you can adjust.
            - *change* is an absolute change of the value whereas *% change* is the
              percentage change of your value compared to its previous value (so if
              it was a value of 2 and now 4, the *% change* will be 100%).
            - You can compare the change of the value during a given timeframe by
              selecting the period you want to compare against. This can range from 5
              minutes to up to 2 days.
            - Like the **threshold alert**, you will need to select the
              *time aggregation* and a *time window* on which the change will be
              calculated.
-->
### 監視条件の設定
4. アラート検知条件の設定

    - アラートタイプによって、選択できる**threshold**オプションは若干異なります。どちらのタイプでも、閾値と比較タイプを設定します。閾値を変更する毎に、グラフ上のカットオフポイントを示すマーカーの位置が更新されて表示されます。

      {{< img src="monitors/index/metric_threshold.png" alt="metric threshold" >}}

      メトリクスの閾値を設定する際、その値に単位をつけて入力することができます。例えば、`system.disk.used`を監視する場合、`20GB`を閾値として設定することができます。

      **threshold alert** の場合、*集計期間内に含まれるデータの集計方法* を決めるオプションを選択することができます。アラートエンジンは、別の時系列データを生成し選択された集計を実行します。

      それぞれのオプションの詳細は以下のようになります:

        - *on average*(平均値で比較): 時系列データは、平均値を算出され単一の値となります。その平均値が閾値と比較されます。

        - *at least once*(少なくとも1回): 生成された時系列データ内のどれかの値が閾値を超えている場合、アラートが発報されます。

        - *at all times*(常時): 生成された時系列データの全てのポイントが閾値を超えている場合に、アラートが発報されます。

        - *in total*(合計値)： 時系列データの全てのポイントの合計が閾値を超えている場合に、アラートが発報されます。

      注意: *on average* と *at all times* の集計は、最終的に受信したデータが揃っていることを *必要条件* としています。このことは、全ての時系列データが完全に揃っていることを要求しているわけではなく、集計に使うデータのギャップが１分以上空いていないことを要求しています。言い換えれば、1分以上間隔の空くメトリクスに関しては、*at least once* または *in total* を使用することをお勧めします。

    - **change alert** オプションを選択している場合は、追加で設定可能な項目があります。
      - *change* は値そのものの変化量を意味し、*% change* はその値の過去の値との変化量を意味します (つまり過去の値が2で現在が4の場合、*% change* は100%になります)。
      - 比較する値の変化は、設定された時間枠の範囲内で指定します。時間枠は5分から24時間の間で指定が可能です (最短で5分前の値と、最大で24時間前の値との比較)。
      - **threshold alert** とほぼ同じように、*集計期間* と *集計期間内に含まれるデータの集計方法* を設定します。

    - Anomaly Detection のより詳しい設定方法は、[Anomaly Detection](/ja/monitors/monitor_types/anomaly) ガイドを参照して下さい。

    - Outlier Detection のより詳しい設定方法は、[Outlier Detection](/ja/monitors/monitor_types/outlier) ガイドを参照して下さい。

<!--
5. You can optionally **notify on no data** after a configurable timeframe. At
   the minimum, your chosen timeframe must be greater than 2x the alerting
   window. For example, if you are alerting over the last 5 minutes then you
   would need to wait at least 10 minutes before notifying on missing data.

6. You can opt to **automatically resolve the monitor from a triggered
   state**. In general you'll want to leave this option off as you only want
   an alert to be resolved when it's fixed.

   This most common use-case for this option is when you have very sparse
   counters, e.g. for errors. When errors stop occuring the metric will stop
   reporting. This means the monitor will not resolve because there are not
   anymore values to trigger a resolution.
-->
5. 必要に応じて、一定時間以上データが届かない場合 **notify on no data** (no dataを検知する)オプションを設定することができます。このオプションを設定する時間枠は、先の条件設定で設定した時間枠の2倍以上の時間枠である必要があります。例えば、過去5分のメトリクスを基にアラートを設定しているなら、データが届いていないことを通知する前に、少なくとも10分間以上の時間を設定する必要があります。

6. **automatically resolve the monitor from a triggered
   state** (アラートが発報している状態を自動的に解除する)オプションを選択することができます。問題が解決したときのみアラートが解除されるのが望ましいため、一般的にこのオプションはOFFにしておくことをお勧めします。

   このオプションの最も一般的なユースケースは、非常に時間の離れたエラーのカウンターです。エラーが発生しなくなると、Datadogへのメトリクスのレポーティングも止まります。一度発報状態になったアラートを解除するためのデータが届いていないので、そのアラートを解除するために、自動での解除が必要になります。

<!--
## Export your monitor

You can export the configuration JSON for a monitor right from the create screen.
If you manage and deploy monitors programmatically, it's easier to define the monitor in the UI and export the JSON right away:

-->
## 監視設定をエクスポートする

設定画面の右手 **Export Monitor** をクリックすることで、Monitor 設定のJSONをエクスポートすることができます。
Monitor 設定をプログラマティックに管理しデプロイする場合は、まずDatadogのUIで雛形となるMonitorを設定してJSONでエクスポートして利用するのが簡単です:

{{< img src="monitors/index/export_monitor_json.jpg" alt="export monitor" >}}