---
last_modified: 2017/08/24
translation_status: complete
language: ja
title: Monitoring レファレンス
kind: documentation
listorder: 5
---
<!--
Monitoring in Datadog refers to the ability to notify your team when conditions are met. If you are just starting with monitors in Datadog, please refer to our [Guide to Monitors](/guides/monitors) for an introduction.
-->

このMonitoringレファレンスでは、条件が満たされた時にチームが通知を受けるための設定について解説します。DatadogのMonitor(監視)機能を使い始めたばかりの場合、まずは入門編の[Monitor(監視)機能の設定ガイド](/ja/guides/monitors) ページを参照して下さい。

<!--
Here is a quick overview of the different terms used in this guide.

- **Status**: Each check run submits a status of OK, WARNING or CRITICAL.
- **Check**: Emits one or more statuses.
- **Monitor**: Sends notifications based on a sequence of check statuses, metric
  threshold or other alerting conditions.
- **Monitor type**: [host](#host)-, [metric](#metric)-, [integration](#integration)-, [process](#process)-, [network](#network)-, [event](#event)-based, and [custom](#custom). See side navigation to drill into a specific type.
- **Tags**: Configurable labels that can be applied to each metric and host. See the [Tagging](/guides/tagging) page for more details.
-->

## 用語集

以下は、このドキュメントで使用している用語の簡単な概要になります。

- **Status**: 各Agent Checkは、ホスト上で定期的に実行されOK, WARNING, CRITICALのステータスをDatadogに送信します。
- **Check**: Agent Checkのことで、複数のステータスを送信します。
- **Monitor**: Agent Checkのステータスやメトリクスの閾値の確認手順、その他のアラート条件を元に通知を送信します。
- **Monitorタイプ**: [ホスト](#ホストを対象にしたmonitor)-, [メトリクス](#メトリクスを対象にしたmonitor)-, [インテグレーション](#インテグレーションを対象にしたmonitor)-, [プロセス](#プロセスを対象にしたmonitor)-, [ネットワーク](#ネットワークを対象にしたmonitor)-, [イベント](#イベントを対象にしたmonitor)-, [カスタムチェック](#カスタムチェックを対象にしたmonitor), APM-, [コンポジット](#コンポジット-複合-monitor)-, があります。特定のMonitorタイプの詳細に関しては、サイドバーからそれぞれのタイプの項目を確認してください。
- **タグ**: 各メトリクスやホストに対して付けることができるラベルです。タグの詳細に関しては、[Tagging](/guides/tagging) ページを参照して下さい。

<!-- ## Creating a Monitor

Navigate to the [Create Monitors](https://app.datadoghq.com/monitors#/create)
page by highlighting the "Monitors" tab in the main menu and selecting the
"Create Monitors" sub-tab (depending on your chosen theme, the main menu may be at the top or on the left).  You will be presented with a list of monitor types
on the left. This document will walk through the configuration of each type.
-->

## 新しい Monitor の作成

[Create Monitors](https://app.datadoghq.com/monitors#/create)のページへ移動するには、メインメニューの`Monitors`タブからドロップダウンメニューの`New Monitor`を選択します(テーマの選択次第により、メインメニューは画面の左側あるいは上部に配置されています)。ページが表示されると各Monitorタイプが左側に一覧で表示されます。このドキュメントでは、これらの各Monitorタイプの設定方法について解説していきます。

<!-- ### Host Monitors

*Requires Datadog Agent version >= 5.0.0.*

{{< img src="guides/monitor/host_monitor.png" >}}

Every Datadog Agent collection reports a heartbeat called `datadog.agent.up`
with a status `UP`. You can monitor this heartbeat across one or more hosts.
-->

### ホストを対象にしたMonitor

*Datadog Agent バージョン 5.0.0 以上が必要です。*

{{< img src="guides/monitor/host_monitor.png" >}}

Datadog Agentが起動していると`datadog.agent.up`と呼ばれるハートビート信号を
`UP`というステータスで定期的に送信します。
このハートビート信号の状態をMonitor対象に追加することで、Datadog Agentやホストの死活状態が把握できます。

<!--
1. Select your **host by name or tag(s)**. Providing a tag will monitor every
   host that has that tag or tag combination.

2. Select the **no-data timeframe**. If the heartbeat stops reporting for more
   than the number of minutes you have selected, then you will get notified.

3. Configure your **notification options** Refer to the
   [Notifications](#notifications) section of this guide for a detailed
   walkthrough of the common notification options.
-->

1. **ホスト名かタグ**の単一指定か組み合わせを設定します。タグを選択した場合は、そのタグ(タグの組み合わせ)が付与されているホストが監視対象になります。

2. `Check Alert`または`Cluster Alert`を選択します。その後、**no-data timeframe**の項目で、分単位で時間を設定します。ここで設定した時間を超えてハートビート信号が受信できなかった場合に、通知が送信されます。

3. 通知先の設定をします。通知先の設定に関しては、このドキュメントの["通知先の設定"](#通知先の設定)の項目を参照してください。

<!--
### Metric Monitors

1. Choose the detection method
    {{< img src="guides/monitor/alert_type.png" alt="alert type" >}}

    A **threshold alert** compares the value in the selected
    timeframe against a given threshold. There are additional options available
    in the alerting conditions section. This is the standard alert case
    where you know what sort values are unexpected.

    A **change alert** compares the absolute or percentage change in
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

2. Select the metric and scope you want to monitor.
  {{< img src="guides/monitor/metric_scope.png" alt="metric scope" >}}

    You can create a monitor on any metrics that you are currently sending to
    Datadog. The standard [scoping rules](/graphing/#scope) apply here.

3. Select the alert grouping.
    {{< img src="guides/monitor/alert_grouping.png" alt="alert grouping" >}}

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

4.  Select the alert conditions

    - The **threshold** options vary slightly depending on what alert type you
      have chosen. For either case, you input a threshold and comparison type
      based on your metric. As you change your threshold, you will see the graph
      update with a marker showing the cutoff point.

      {{< img src="guides/monitor/metric_threshold.png" alt="metric threshold" >}}

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

    - For details on how to configure Anomaly Detection, see the [Anomaly Detection Guide](/guides/anomalies)

    - For details on how to configure Outlier Detection, see the [Outlier Detection Guide](/guides/outliers)

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

7. Configure your **notification options** Refer to the
   [Notifications](#notifications) section of this guide for a detailed
   walkthrough of the common notification options.
-->

### メトリクスを対象にしたMonitor

1. アラートのタイプを選択します。

    {{< img src="guides/monitor/alert_type.png" alt="alert type" >}}

    **threshold alert**は、時間枠内のメトリクス値と指定した閾値を比較する、最も一般的なアラート検知の方法です。更に、アラート条件セクションには、追加で設定可能なオプションもあります。このアラートタイプは正常な範囲か値が事前に分かっている場合に使用します。

    **change alert**は、直近のデータポイントの値に対するいくらか前の時間の値との変化量または変化率について、指定した閾値と比較します。
    比較しているデータポイントの値は単一点の値ではなく、*Set alert conditions* のセクションで指定されたパラメータで計算されたものになります。

    このアラートタイプは、メトリクスのゆっくりとした変化はもちろん、急速なスパイクやドロップを追跡するのに有効であり、そのメトリクスの正常な範囲や値が事前に分かっていない場合に特に有効です。
    *注:* このアラートの為の計算値は絶対値ではありません。従って下に向かう変化は、マイナス値になります。

    **Anomaly Detection** は、アルゴリズムベースの異常検出機能です。過去の挙動、つまり1日のうちの特定の時間帯、あるいは1週間のうちの特定の1日の変動パターンを考慮した際に、普段とは異なる挙動がみられた際に検出することができます。これは、閾値ベースのアラートモニタリングで監視することが困難であったり不可能な、強い傾向のある繰り返しパターンを持ったメトリクスに適しています。

    **Outlier Detection** はアルゴリズムベースの異常検出機能であり、グループ内の特定の個体に他とは異なる挙動がみられた際に外れ値データ(Outlier)として検出することができます。例えば、Webサーバー群の特定の1サーバーが異常なリクエスト数を処理しているような場合に検出し、これをリプレースすべきか判断することができます。あるいは、特定のAWSアベイラビリティゾーン(AZ)において、他のAZより多めの500(5XX)エラーを生じていることを早めに検出することで、そのAZに迫りつつある問題を察知することができるかもしれません。

2. メトリクスとそのメトリクスを監視する範囲(スコープ)を設定します。

    {{< img src="guides/monitor/metric_scope.png" alt="metric scope" >}}

    Datadogに送信している全てのメトリクスをもとにMonitor設定を作成することができます。
    この項目では、グラフ表示に使っている標準的な対象範囲(スコープ)の指定の規則が適用されます。
    この規則の詳細に関しては、グラフ表示入門のページの[対象範囲の指定(scope)](/ja/graphingjson/#対象範囲の指定-scope-スコープ)を参照してください。

3. アラートグループを選択します。

    {{< img src="guides/monitor/alert_grouping.png" alt="alert grouping" >}}

    **Simple Alert**は、全てのレポートソースをまとめて監視します。"Set alert conditions"のセクションで設定した条件に合致した場合、アラートを1回送信します。この設定は、単一ホストから送信されてくるメトリクスを監視するようなケースに最適です。例えば、"`avg` of `system.cpu.iowait` over `host:bits`"のような設定をしてる場合です。更に、"`sum` of `nginx.bytes.net` over `region:us-east`"のように複数のホストの値を集計して単一メトリクスとして監視したい場合にも有効です。

    **Multi Alert**では、パラメータとして指定したグループについて、複数のレポートソースからのアラートを通知することができます。例えば、ディスク容量に関するアラートを通知する場合、ホストとデバイスについてグループを指定すると良いでしょう。JSONでクエリを定義する場合は以下です。

        avg:system.disk.in_use{*} by {host,device}

    このように設定することにより、各ホストの各デバイス毎にディスクスペースが無くなった際のアラートを通知することができるようになります。

4. アラート条件を設定します。

    - アラートタイプによって、選択できる**threshold**オプションは若干異なります。どちらのタイプでも、閾値と比較タイプを設定します。閾値を変更する毎に、グラフ上のカットオフポイントを示すマーカーの位置が更新されて表示されます。

    {{< img src="guides/monitor/metric_threshold.png" alt="metric threshold" >}}

    メトリクスの閾値を設定する際、その値に単位をつけて入力することができます。例えば、`system.disk.used`を監視する場合、`20GB`を閾値として設定することができます。

    **threshold alert** の場合、*集計期間内に含まれるデータの集計方法* を決めるオプションを選択することができます。アラートエンジンは、別の時系列データを生成し選択された集計を実行します。

    それぞれのオプションの詳細は以下のようになります:

      - *on average*(平均値で比較): 時系列データは、平均値を算出され単一の値となります。その平均値が閾値と比較されます。

      - *at least once*(少なくとも1回): 生成された時系列データ内のどれかの値が閾値を超えている場合、アラートが発報されます。

      - *at all times*(常時): 生成された時系列データの全てのポイントが閾値を超えている場合に、アラートが発報されます。

      - *in total*(合計値)： 時系列データの全てのポイントの合計が閾値を超えている場合に、アラートが発報されます。

    注意: *on average*と*at all times*の集計は、最終的に受信したデータが揃っていることを*必要条件*としています。このことは、全ての時系列データが完全に揃っていることを要求しているわけではなく、集計に使うデータのギャップが１分以上空いていないことを要求しています。言い換えれば、1分以上間隔の空くメトリクスに関しては、*at least once*または*in total*を使用することをお勧めします。

    - **change alert**オプションを選択している場合は、追加で設定可能な項目があります。
      - *change* は値そのものの変化量を意味し、*% change* はその値の過去の値との変化量を意味します (つまり過去の値が2で現在が4の場合、*% change* は100%になります)。
      - 比較する値の変化は、設定された時間枠の範囲内で指定します。時間枠は5分から24時間の間で指定が可能です (最短で5分前の値と、最大で24時間前の値との比較)。
      - **threshold alert** とほぼ同じように、*集計期間* と*集計期間内に含まれるデータの集計方法* を設定します。

    - Anomaly Detection のより詳しい設定方法は、[Anomaly Detection](/ja/guides/anomalies) ガイドを参照して下さい。

    - Outlier Detection のより詳しい設定方法は、[Outlier Detection](/ja/guides/outliers) ガイドを参照して下さい。

5. 必要に応じて、一定時間以上データが届かない場合**notify on no data**(オプション)を設定することができます。このオプションを設定する時間枠は、先の条件設定で設定した時間枠の2倍以上の時間枠である必要があります。例えば、過去5分のメトリクスを基にアラートを設定しているなら、データが届いていないことを通知する前に、少なくとも10分間以上の時間を設定する必要があります。

6. **automatically resolve the monitor from a triggered state**(アラートが発報している状態を自動的に解除する)オプションを選択することができます。問題が解決したときのみアラートが解除されるのが望ましいため、一般的にこのオプションはOFFにしておくことをお勧めします。

    このオプションの最も一般的なユースケースは、非常に時間の離れたエラーのカウンターです。エラーが発生しなくなると、Datadogへのメトリクスのレポーティングも止まります。一度発報状態になったアラートを解除するためのデータが届いていないので、そのアラートを解除するために、自動での解除が必要になります。

7. 通知先の設定をします。通知先の設定に関しては、このドキュメントの["通知先の設定"](#通知先の設定)の項目を参照してください。

<!--
### Integration Monitors

{{< img src="guides/monitor/es_status.png" >}}

On the integration tab you will see a list of your installed integrations. Upon
selection, you can choose to monitor either a "Status" or a "Metric".

- Choosing **Integration Status** will present you with one or more service
  checks for each integration. Please refer to the
  [custom monitors](#check-alerting) section for details on the
  available options.

- Choosing **Integration Metric** will provide a familiar interface used for a
  interface used for a Metric Monitor. You will be able to choose from any of
  the metrics provided by this integration. Please refer to the
  [alert conditions](#metric-conditions) section for details on the available
  options.
-->
### インテグレーションを対象にしたMonitor

{{< img src="guides/monitor/es_status.png" >}}

インテグレーションタブをクリックすると、既にインストールされているインテグレーションのタイルがタブの下に表示されます。そのタイルを選択すると`Status`または`Metric`というMonitorの設定を選択できるようになります。

- **Integration Status** を選択すると、そのインテグレーション用のサービスチェックを１つ以上提示します。設定で利用可能なオプションの詳細については、[カスタムチェックを対象にしたMonitor](#カスタムチェックを対象にしたmonitor)のセクションを参照してください。

- **Integration Metric**を選択すると、メトリクスを対象にしたMonitorと同等の設定インターフェイスが表示されます。この設定画面の`Select a metrics`の項目では、インテグレーションが収集している全てのメトリクスから選択することができます。項目②の"Set alert conditions"のオプションに関しては、先の"メトリクスを対象にしたMonitor"のセクションの "アラート条件の設定" を参照してください。

<!--
### Process Monitors

{{< img src="guides/monitor/process_monitor.png" >}}

A process monitor will watch the status produced by the `process.up` service
check reported by the check in the Agent. At the Agent level you can configure
thresholds based on the number of matching processes.

Read more about configuration on the [Process Check](/integrations/process/)
page.

For each process, a single service check status will be produced. Through this
creation interface, you can choose which of those checks to monitor and at what
point they should notify.
-->
### プロセスを対象にしたMonitor

{{< img src="guides/monitor/process_monitor.png" >}}

プロセスを対象にしたMonitorは、Datadog Agentのサービスチェックによってレポートされる`process.up`の状態を監視しています。

設定の詳細については、[Process チェック](/ja/integrations/process/)のページをお読みください。

各プロセスに対しサービスチェックのステータスが生成されます。プロセスを対象にしたMonitorの作成画面を介して、どのサービスチェックのステータスを監視し、どのような状態になったときに通知するか設定することができます。

<!--
1. Pick the **process** to monitor. You will see the names configured in any
   Agent with an active process check.

2. Pick the **monitor scope**. You will only see hosts or tags that
   are reporting a status for the selected process.

3. Select **alerting options**. Please refer to the
   [custom monitors](#check-alerting) section for details on the available options.

4. Configure your **notification options** Refer to the
   [Notifications](#notifications) section of this guide for a detailed
   walkthrough of the common notification options.
-->

1. 監視したい**プロセス**を選択します。Datadog Agentの設定ファイルで有効にしているプロセスチェックの名前が表示されます。

2. **モニタするスコープ**を選択します。先に選択したプロセスのステータス情報に基づいてホスト名とタグが表示されます。

3. **アラートのオプション**を指定します。利用可能なオプションの詳細については、[カスタムチェックを対象にしたMonitor](#カスタムチェックを対象にしたmonitor)の同セクションを参照してください。

4. **通知のオプション**を設定します。通知先の設定に関しては、このドキュメントの["通知先の設定"](#通知先の設定)の項目を参照してください。

<!--
### Network Monitors

{{< img src="guides/monitor/network_monitor.png" >}}

Network monitors cover the TCP and HTTP checks available in the Agent. Read
the [guide to network checks](/integrations/tcp_check) for details on Agent
configuration.
-->
### ネットワークを対象にしたMonitor

{{< img src="guides/monitor/network_monitor.png" >}}

ネットワークを対象にしたMonitorは、Datadog Agentで提供しているTCPおよびHTTPのチェックの情報を監視します。Datadog Agentでネットワークチェックを有効にする方法は、[guide to network checks](/ja/integrations/tcp_check) を参照してください。

<!--
**Network Status**

1. Choose a **network check**. You will be able to choose from all HTTP and TCP
   checks being submitted by your Agents.

2. Pick **monitor scope**. You will only see hosts or tags reporting
   the check you have chosen.

3. Select **alerting options**. Please refer to the
   [custom monitors](#check-alerting) section for details on the available
   options.

4. Configure your **notification options** Refer to the
   [Notifications](#notifications) section of this guide for a detailed
   walkthrough of the common notification options.
-->

**ネットワークステータス**

1. **ネットワークチェック**を指定します。Datadog Agentによりレポーティングされた全てのHTTPとTCPチェックから選択することができます。

2. **モニタするスコープ**を選択します。先に選択したネットワークチェックのステータス情報に基づいてホスト名とタグが表示されます。

3. **アラートのオプション**を指定します。利用可能なオプションの詳細については、[カスタムチェックを対象にしたMonitor](#カスタムチェックを対象にしたmonitor)の同セクションを参照してください。

4. **通知のオプション**を設定します。通知先の設定に関しては、このドキュメントの["通知先の設定"](#通知先の設定)の項目を参照してください。

<!--
**Network Metric**

1. Choose a **network metric**. You will be able to choose either the TCP or
   HTTP response time metric.

2. Pick **monitor scope**. You will only see hosts or tags reporting
   the metric you have chosen.

3. Select **alerting options**. Please refer to the
   [alert-conditions](#metric-conditions) section for details on the available
   options.

4. Configure your **notification options** Refer to the
   [Notifications](#notifications) section of this guide for a detailed
   walkthrough of the common notification options.
-->

**ネットワークメトリクス**

1. **ネットワークメトリクス**を指定します。Datadog Agentによりレポーティングされた全てのHTTPとTCPの応答時間メトリクスから選択することができます。

2. **モニタするスコープ**を選択します。先に選択したネットワークメトリクスのステータス情報に基づいてホスト名とタグが表示されます。

3. **アラートのオプション**を指定します。利用可能なオプションの詳細については、[カスタムチェックを対象にしたMonitor](#カスタムチェックを対象にしたmonitor)の同セクションを参照してください。

4. **通知のオプション**を設定します。通知先の設定に関しては、このドキュメントの["通知先の設定"](#通知先の設定)の項目を参照してください。

<!--
### Event Monitors

Event monitors allows you to alert when an event matching your query occurs.

{{< img src="guides/monitor/event_monitor.png" >}}

1. Select the query and parameters (status, priority, sources and tags) you want
    to monitor.

2. Select the alert gouping

3. Select the **alerting conditions**. The **threshold value** and **timeframe**
    options allows you to set the number of occurence of an event required during
    a timeframe before triggering the monitor.

4. Configure your **notifcation options**. Refer to the [Notifications](#notifications)
    section of this guide for informations.
-->
### イベントを対象にしたMonitor

イベントを対象にしたMonitorでは、指定した条件に合致する場合にアラートで通知することができます。

{{< img src="guides/monitor/event_monitor.png" >}}

1. 監視する文字列とパラメータ(ステータス, 優先度, ソース, タグ)を設定します。

2. アラートグループを選択します。

3. **アラート条件** を設定します。**閾値** と**時間枠**の設定によって、アラートが発報されるために必要な時間枠あたりのイベント発生回数を指定することができます。

5. 4. **通知のオプション**を設定します。通知先の設定に関しては、このドキュメントの["通知先の設定"](#通知先の設定)の項目を参照してください。

<!--
### Custom Monitors

{{< img src="guides/monitor/custom_monitor.png" >}}

Custom monitors encompass any service checks that are not reported by one of the
out-of-the-box integrations included with the Agent.

Refer to the [Guide to Agent Checks](/guides/agent_checks/) for detailed
information on writing your own checks that send metrics, events,
or service checks.
-->
### カスタムチェックを対象にしたMonitor

{{< img src="guides/monitor/custom_monitor.png" >}}

カスタムチェックを対象にしたMonitorでは、独自に作成したAgent Checkによって収集しているサービスチェックのステータスを監視します。

メトリクスやイベント、あるいはサービスチェックを送信する独自のCheckの作成方法については、[「Agent Checkの書き方」](/ja/guides/agent_checks/)を参照してください。

<!--
1. Select your **custom Agent check**.

2. Select **host or tags** that you would like to monitor. The check will run
   for every unique set of tags from all monitored hosts. For example, the
   `Nginx` service check reports one status per `{host,port}`. So if you have
   multiple servers running on a single host, then each one will alert separately
   in the case of failure.

3.  Select your **alert options**.

   While each check run will send a status of either CRITICAL, WARNING or OK,
   you can choose at what consecutive conditions to cause a state change and a
   notification. For example, you might want to know immediately when your check
   fails and only have it recover if it stays that way. In this case you might
   choose to notify on 1 critical status, 1 warning status and 4 OK statuses.

   You can optionally **notify on no data** after a configurable timeframe. You
   must choose at least 2 minutes for your timeframe.

4. Configure your **notification options**. Refer to the
   [Notifications](#notifications) section of this guide for a detailed
   walkthrough of the common notification options.
-->

1. **カスタムチェック**を選択します。

2. 監視したい**ホスト名やタグ（複数可）**を選択します。
   アラートが通知されるの為の確認は、監視対象として指定されたホストから送られてくるタグやタグの組み合わせに対して実行されます。例えば、Nginxのサービスチェックが、`{host,port}`毎にステータスを報告しているとします。そしてもしも、単一ホスト上で複数のサーバが稼働している状態であれば、それぞれのサーバの障害は個別に通知されることになります。

3.  **アラートのオプション** を選択します。

   各サービスチェックが実行されると、CRITICAL、WARNING、OKの何れかのステータスを送信します。`Trigger the alert after selected consecutive failures:`の項目でステータス変更とアラートを通知するための連続発生回数を指定します。例えば、カスタムMonitorのチェックが失敗した場合には直ちに知りたいが、OK状態が続くまではリカバー状態にはなってほしくないとします。このようなケースではオプションを、1回のCritical、1回のWarning、4回のOKと設定します。

   必要に応じて、一定時間以上データが届かない場合のnotify on no data(オプション)を設定することができます。このオプションを設定する時間枠は、先の条件設定で設定した時間枠の2倍以上の時間枠である必要があります。

4. **通知のオプション**を設定します。通知先の設定に関しては、このガイドの["通知先の設定"](#通知先の設定)の項目を参照してください。

<!--
No Article at this time.
-->
### コンポジット-複合-Monitor

コンポジットMonitorを使用すると、多数の個々のMonitorを1つの複合条件Monitorとしてまとめることができ、より具体的なアラート条件を定義することができます。

設定の詳細については、[Composite Monitor](/ja/guides/composite_monitors/) ガイドのページをお読みください。

コンポジットMonitorは、複合したトリガ条件が真となる値を個々のMonitorのステータスが同時に持つ場合にトリガされます。

<!--
## Monitor Notifications

Notifications are a key component of any monitor. You want to make sure the
right people get notified so the problem can be resolved as soon as possible.

{{< img src="guides/monitor/notification.png" >}}
-->

## 通知先の設定

通知は、監視において非常に重要な要素です。可能な限り素早く障害を解決するためには、適切な人材が通知を受けるように設定する必要があります。

{{< img src="guides/monitor/notification.png" >}}

<!--
1. Give your monitor a **title**. It is often useful to use a succinct
   explanation of the monitor so a notified team member can quickly understand
   what is going on.

2. Enter a **message** for the monitor. This field allows standard
   [markdown formatting](http://daringfireball.net/projects/markdown/syntax)
   as well as Datadog's @-notification syntax. Note: you can notify any
   non-Datadog users via email by simply adding `@their-email` to the
   message.

   A common use-case for the monitor message is to include a step-by-step way
   to resolve the problem. For example if you are monitoring a database then you
   might want to include steps for failing over to a standby node. All in all,
   you should attempt to give as much context to the monitor as possible.

4. Optionally enable **monitor renotification**. This option is useful to remind
   your team that a problem is not solved until the monitor is marked as
   resolved. If enabled, you can configure an escalation message to be sent
   anytime the monitor renotifies. The original message will be included as
   well.
-->

1. Monitorの通知に**タイトル**を付けましょう。多くの場合、簡潔な説明を使用することが重要です。なぜならばチームメンバーが、何が起こっているかを直ぐに理解することができるからです。

2. Monitorの通知本文を入力します。このフィールドには、Datadogの@-notification構文の他に標準的な[markdownフォーマット](http://daringfireball.net/projects/markdown/syntax)でも記述することができます。加えて、単に`@their-email`としてメールアドレスを記述することにより、Datadogに登録していないメンバーにもメールによって通知を送信することができます(例えばuser@example.comなら@user@example.comと記述)。

   Monitorの通知本文の一般的なユースケースは、障害を解決するための詳細な手順を記述することです。例えばデータベースを監視している場合には、セカンダリーとしてスタンバイしているノードのフェールオーバーの手順を記しておくと良いでしょう。全てのケースにおいて、メッセージ本文には可能な限り多くの情報を記すように心がけましょう。

3. 必要に応じて**Monitor renotification**を有効にしてください。このオプションは、発報しているMonitorに解決の旨のチェックマークがつけられまで、チームメンバーに注意喚起を促し続けるためには良い手段です。このオプションを有効にすると、Monitorが再通知する際、オリジナルのメッセージに加えて送信するエスカレーションメッセージを設定することができます。

***注釈:*** 通知の嵐を避けるために、20秒の間に発生した同一 monitor ID/アラートタイプをまとめる新たなグループ通知が実装されました。このグループ通知では、20秒のグループのうち最初の2つの通知は通常通り送信され、その他のすべての通知は最初の2つの通知の後に1つのメッセージとしてまとめて送信されます。(この機能は標準の通知方法として実装されておりますので、特に設定は不要です)

<!-- ### Message template variables

Message template variables can be used to customize your monitor notifications.
This feature is supported in all monitor types. There are two primary use cases
for template variables: 1) displaying a different message depending on the
notification type (e.g. triggered, recovered, no data) and 2) incorporating the
triggering scope into the message of multi alerts.
-->

### 通知内で使うことのできるテンプレート変数

Monitorの通知の内容を状況に応じて書き換えるためにテンプレート変数(template variables)を使うことができます。この機能は全てのMonitorタイプで使うことができます。
テンプレート変数(template variables)には、主に2つのユースケースが考えられます。

1. 通知の種類に応じて異なるメッセージを表示したい場合(e.g. triggered, recovered, no data)
2. `Multi Alert`で、通知本文にアラート発報の範囲(スコープ)の情報を組み込みたい場合

それぞれの主要ユースケースについて解説します。

<!--
1. **Conditional variables for different notification types**: You can have a
    monitor event display a different message depending on whether the event is a
    trigger, warning, recovery, or no data notification. These variables use simple if-else
    logic with the following syntax:

    {{< img src="guides/monitor/conditionalvars.png" >}}

    Here is an example of how you can set it up in the editor:

    {{< img src="guides/monitor/templateconditionaleditor.png" >}}

    The corresponding trigger event notification will look like this:

    {{< img src="guides/monitor/templateconditionaltrigger.png" >}}

    and the recovery notification:

    {{< img src="guides/monitor/templateconditionalrecover.png" >}}

    The conditional variables available are `is_alert`, `is_alert_recovery`,
    `is_warning`, `is_warning_recovery`, `is_recovery`, and `is_no_data`.
    These can also be seen in the "Use message template variables" help box in
    Step 3 of the monitor editor.

2. **Tag variables for multi alerts**: When your monitor is a multi alert, instead
    of having a generic message (and finding the triggering tag scope in the alert
    query definition), a variable can be used in the message for explicitly
    identifying the triggering scope.

    Here is an example of how you can use template variables for a multi alert:

    {{< img src="guides/monitor/templatevareditor.png" >}}

    and the corresponding event notification:

    {{< img src="guides/monitor/templatevar.png" >}}

    The tag template variables available depend on the tag group selected in Step 1
    of the monitor editor. The possible options will automatically populate at the
    bottom of the "Use message template variables" help box in Step 3 of the editor.
    These variables can also be used in the monitor titles (names), but note that
    the variables are only populated in the text of Datadog child events (not the
    parent, which displays an aggregation summary).

    Some tags identifying your triggering scope will automatically be inserted into
    the title of your multi alert. If your scope is defined by a lot of tags, your
    alert title may end up being undesirably long. If you've used template tag variables
    to include this information in the body of your alert, you can uncheck
    **Include triggering tags in notification title** to save some space. This will make
    your notification title look like this:

    {{< img src="guides/monitor/templatevar_short.png" >}}

    Note that template variable content is escaped by default. If your variable
    contains JSON or code that you would NOT like to be escaped, then use triple braces
    instead of double braces (e.g. `{{{event.text}}}`).

    3. **Conditional variables for different triggering scopes**: You can have a
   monitor event display a different message depending on the group that's
   causing a notification.

   The `{{is_match}}` conditional lets you match the triggering context to some
   string. For example, you might want to notify your db team if a triggering
   host has `role:db` but notify your app team if the host has `role:app`.

   You can use any of the available tag variables in your condition. A match
   will be made if the comparison string is anywhere in the resolved variable.

   The variable uses the following format:

       {{#is_match "tag_variable" "comparison_string"}}
       This will show if comparison_string is in tag_variable.
       {{/is_match}}

   Here is an example of how you can give a different message depending on the
   triggering context:

   {{< img src="guides/monitor/scope_match_editor.png" >}}
-->

1. **通知タイプの違いに基づいた条件変数**: Monitorによって検知されたイベント(triggered, warn, recovered, no dataなど)によって異なった通知本文を表示することができます。これらの条件変数では、次のような基本的なif-else構文を使っています:

    {{< img src="guides/monitor/conditionalvars.png" >}}

    次が、通知本文の記述の例です:

    {{< img src="guides/monitor/templateconditionaleditor.png" >}}

    実際に送信されたアラート通知文は、次のようになります:

    {{< img src="guides/monitor/templateconditionaltrigger.png" >}}

    リカバーした際の通知文は、次のようになります:

    {{< img src="guides/monitor/templateconditionalrecover.png" >}}

    使用可能な条件変数は `is_alert`, `is_alert_recovery`,
    `is_warning`, `is_warning_recovery`, `is_recovery`, そして `is_no_data` です。
    これら条件変数の解説は、第3ステップ"Say what's happening"の"Use message template variables"をクリックすることで見ることができます。

2. **Multi Alertのためのタグ変数**: 設定しているMonitorが`Multi Alert`の場合(タグによってグループが指定されている場合)は、通知のタイトルや本文にタグ変数を適用し、アラート発報の範囲(スコープ)を明示することができます。

    次が、`Multi Alert`でtemplate variables(タグ変数)を使った例です:

    {{< img src="guides/monitor/templatevareditor.png" >}}

    実際に送信されたアラート通知文は、次のようになります:

    {{< img src="guides/monitor/templatevar.png" >}}

    利用可能なタグ変数は、第1ステップで選択したタググループに依存します。利用可能なタグ変数のオプションは自動的に選別され、第3ステップの"Use message template variables"ヘルプボックスの内に表示されます。またこれらのタグ変数は、Monitorのタイトル（名前）で使用することもできます。

    一方で、アラートを通知する範囲(スコープ)を指定しているタグには自動的にタイトルに挿入されるものがあります。このため、範囲指定のために多くのタグを使用している場合にはアラートのタイトルが不必要に長くなる可能性があります。もしタグ変数をアラート本文に使用しているのであれば、スペースを節約するために**Include triggering tags in notification title** のチェックを外すことも有効です。この設定によってアラートのタイトルは以下のようになります。

    {{< img src="guides/monitor/templatevar_short.png" >}}

    テンプレート変数はデフォルトでエスケープされます。もし使用したい変数がJSONやコードを含んでおり、それらをエスケープさせたくない場合は、2重カッコのかわりに3重カッコを使用して下さい。(例 `{{{event.text}}}`)

3. **アラート発報の範囲(スコープ)の違いに基づいた条件変数**: Monitorによってアラート発報されたグループによって異なった通知本文を表示することができます。

    `{{is_match}}` 条件句では、アラート発報の範囲情報と文字列の一致を調べます。例えば、`role:db`タグを持つホストについてdbチームに通知したいこともあれば、`role:app`タグを持つホストについてappチームに通知したいこともあるでしょう。

    条件句の中では現在の設定で利用可能なすべてのタグ変数を使うことができます。文字列がタグ変数の中で確認されると一致したとみなされます。

    この条件変数の構文は以下のようになります:

       {{#is_match "タグ変数" "文字列"}}
       ここに、一致した場合に表示する本文を記述します。
       {{/is_match}}

   次が、アラート発報の範囲情報に基づいて異なる本文を表示する例です:

   {{< img src="guides/monitor/scope_match_editor.png" >}}

<!--
#### Variable availability

We provide a number of different types of monitors and not all variables are available for each type of monitor. Integration monitor variables are largely dependent on the specific integration and monitor configuration.
-->
#### 通知本文で利用可能なテンプレート変数

Datadgogでは、さまざまなタイプのMonitor (アラート)を提供していますが、各Monitor ごとにメッセージ欄で使えるテンプレート変数が異なります。 インテグレーションMonitor に関連したテンプレート変数は、特定のインテグレーションやそのMonitorの設定内容に大きく依存します。

|                       | [host](#ホストを対象にしたmonitor)     | [metric](#メトリクスを対象にしたmonitor)             | [integration](#インテグレーションを対象にしたmonitor)           | [process](#プロセスを対象にしたmonitor)               | [network](#ネットワークを対象にしたmonitor)                                   | [custom check](#カスタムチェックを対象にしたmonitor)   | [event](#イベントを対象にしたmonitor)   |
| :---------------------|:------------------|:------------------------------|:--------------------------------------|:----------------------------------|:------------------------------------------------------|:--------------------------|:------------------|
| **Conditionals**      |
| `is_alert`            | Y                 | Y                             | Y                                     | Y                                 | Y                                                     | Y                         | Y                 |
| `is_alert_recovery`   |                   | Y                             | Y                                     | Y                                 | Y                                                     | Y                         |                   |
| `is_warning`          |                   | Y                             | Y                                     | Y                                 | Y                                                     | Y                         |                   |
| `is_warning_recovery` |                   | Y                             | Y                                     | Y                                 | Y                                                     | Y                         |                   |
| `is_recovery`         | Y                 | Y                             | Y                                     | Y                                 | Y                                                     | Y                         | Y                 |
| `is_no_data`          | Y                 | Y                             | Y                                     | Y                                 | Y                                                     | Y                         | Y                 |
| `is_match`            | Y                 | Y                             | Y                                     | Y                                 | Y                                                     | Y                         | Y                 |
| **Variables**         |
| `{{value}}`           |                   | Y                             | Y                                     |                                   |                                                       |                           |                   |
| `{{threshold}}`       | Y (cluster)       | Y                             | Y                                     | Y                                 | Y                                                     | Y                         | Y                 |
| `{{warn_threshold}}`  | Y (cluster)       | Y                             | Y                                     | Y                                 | Y                                                     | Y                         |                   |
| `{{ok_threshold}}`    |                   |                               | Y                                     | Y                                 | Y                                                     | Y                         |                   |
| `{{comparator}}`      | Y                 | Y                             | Y                                     | Y                                 | Y                                                     | Y                         | Y                 |
| Additional variables  | Contextual        |                               | Contextual<br/>`{{check_message}}`    | Contextual<br/>`{{process.name}}` | Contextual<br/>`{{url.name}}`<br/>`{{instance.name}}` | `{{check_message}}`       |                   |

<style>
  .tpl-var-table tr td {
    text-align: center;
    border: 1px #9d6ebf solid;
    padding: 5px;
  }
  .tpl-var-table tr td:first-child {
    text-align: right;
  }
</style>

**注)** 一部のMonitor　(アラート)では、監視している対象に基づいて追加でテンプレート変数を提供しています。 例えば、ホストMonitor　は `host.availability-zone`と` host.cloud_provider`の変数を提供しています。 メッセージ欄の設定を進めている際に、利用可能なテンプレート変数のリストを見るには、欄の右上の"Use message template variables" リンクをクリックするか、メッセージ欄に"{{"を入力し、補完候補リストを表示してください。

<!-- ## Monitor FAQs

- *Can I manage my monitors programatically?*

  Yes. Refer to the [Datadog API docs](http://docs.datadoghq.com/api/#alerts)
  for detailed information on managing monitors through the API using the
  available libraries or cURL.

- *Can you alert on a function?*

  Yes, selecting the 'Source' tab of a monitor editor (Step 1) will allow you to
  alert on custom queries and functions, similar to the JSON editor for graphs.
-->

## Monitor に関する FAQs

- *Monitorは、プログラム的に管理することはできますか？*

  **はい**。各プログラミング言語毎ライブラリやcURLを使ってMonitorを制御する方法に関しては、[Datadog APIドキュメント](http://docs.datadoghq.com/api/#alerts)を参照してください。

- *ファンクションを基にアラートを発報することはできますか？*

  **はい**。 Monitor設定の第一ステップで'Source'タブを選択し、グラフを設定する際のJSONエディタと同じように編集することにより、カスタムクエリやファンクションのアラートを設定すことができます。
