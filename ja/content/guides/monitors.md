---
last_modified: 2017/08/24
translation_status: completed
language: ja
title: Monitor(監視)機能の設定ガイド
kind: guide
listorder: 9
aliases:
  - /ja/guides/monitoring
  - /ja/guides/alerting
---

<!--
***For more detail about monitors, review the [Monitoring Reference](/monitoring) page.***

Monitoring all of your infrastructure in one place wouldn't be complete without
the ability to know when critical changes are occurring. Datadog gives you the
ability to create monitors that will actively check metrics, integration
availability, network endpoints, and more.

Once a monitor is created, you will be notified when its conditions are met.
You can notify team members via email, 3rd party services (e.g. Pagerduty or
Hipchat) or other custom endpoints via webhooks.

Triggered monitors will appear in the event stream, allowing collaboration
around active issues in your applications or infrastructure. Datadog provides a
high-level view of open issues on the
[Triggered Monitors](https://app.datadoghq.com/monitors/triggered)
page as well as general monitor management on the
[Manage Monitors](https://app.datadoghq.com/monitors) page.
 -->

***Monitor(監視)機能のより詳しいレファレンスは、[Monitoringレファレンス](/ja/monitoring) ページを参照して下さい。***

インフラ全体を一箇所で監視しようとする場合、そのインフラが危機的な状況になっていることを検知する方法を確立するのは重要な作業です。
Datadogでは、能動的にメトリクス, インテグレーション, ネットワークの接続状態, その他を監視してくれるMonitor機能を設定することができます。

一度Monitor機能を設定しておけば、条件が満たされた時に通知を受けることができます。
電子メールでチームメンバーに通知することもでき、サードパーティのサービス（例えばPagerdutyまたは
Hipchat）やwebhooksを使い、他のサービスと連携して通知を送信することもできます。

通知を送信したMonitorはイベントストリームに表示され、そのアプリケーションやインフラの問題解決に向けたコラボレーションができるようになります。Datadogの[Triggered Monitors](https://app.datadoghq.com/monitors/triggered)のページには、通知済み状態のMonitorの項目がリスト表示されます。[Manage Monitors](https://app.datadoghq.com/monitors)のページには全てのMonitorが表示され、それらを管理することができるようになっています。

## 用語集

<!--
Here is a quick overview of the different terms used in this guide.

- **Status**: Each check run submits a status of OK, WARNING or CRITICAL.
- **Check**: Emits one or more statuses.
- **Monitor**: Sends notifications based on a sequence of check statuses, metric
  threshold or other alerting conditions.
- **Monitor type**: host-, metric-, integration-, process-, network-, event-based, and custom. See side navigation to drill into a specific type.
- **Tags**: Configurable labels that can be applied to each metric and host. See the [Tagging](/guides/tagging) page for more details.
   -->

以下は、このガイドで使用している用語の簡単な概要になります。

- **Status**: 各Agent Checkは、ホスト上で定期的に実行されOK, WARNING, CRITICALのステータスをDatadogに送信します。
- **Check**: Agent Checkのことで、複数のステータスを送信します。
- **Monitor**: Agent Checkのステータスやメトリクスの閾値の確認手順、その他のアラート条件を元に通知を送信します。
- **Monitorタイプ**: host-, metric-, integration-, process-, network-, event-based, custom, APM-, composite- があります。 特定のMonitorタイプの詳細に関しては、[Monitoringレファレンス](/ja/monitoring) ページを参照して下さい。
- **タグ**: 各メトリクスやホストに対して付けることができるラベルです。タグの詳細に関しては、[Tagging](/ja/guides/tagging) ページを参照して下さい。

<!--
## Creating a Monitor
-->

## 新しいMonitorの作成

<!--
Navigate to the [Create Monitors](https://app.datadoghq.com/monitors#/create)
page by hovering over **Monitors** in the main menu and clicking **New Monitor** in the sub-menu (depending on your chosen theme and screen resolution, the main menu may be at the top or on the left). You will be presented with a list of monitor types
on the left. This page shows how to setup a metric Monitor, but see the [Monitoring Reference](/monitoring) to learn more about other Monitor types.
 -->

[Create Monitors](https://app.datadoghq.com/monitors#/create)のページへ移動するには、メインメニューの **Monitors** にマウスオーバーし現れるサブメニューの **New Monitor** を選択します(テーマの選択次第により、メインメニューは画面の左側あるいは上部に配置されています)。ページが表示されると各Monitorタイプが左側に一覧で表示されます。このガイドでは、メトリクスを対象にしたMonitorタイプについての設定方法を説明していきます。より詳しい各Monitorタイプの設定方法については、[Monitoringレファレンス](/ja/monitoring)ページを参照して下さい。

{{< img src="guides/monitor/nav.png" >}}

<!--
### Choose what to monitor
-->
### 監視対象の設定

<!--
1. Choose the detection method
    {{< img src="guides/monitor/alert_type.png" alt="alert type" >}}

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

    {{< img src="guides/monitor/alert_type.png" alt="alert type" >}}

    **threshold alert**は、時間枠内のメトリクス値と指定した閾値を比較する、最も一般的なアラート検知の方法です。更に、アラート条件セクションには、追加で設定可能なオプションもあります。このアラートタイプは正常な範囲か値が事前に分かっている場合に使用します。

    **change alert**は、直近のデータポイントの値に対するいくらか前の時間の値との変化量または変化率について、指定した閾値と比較します。
    比較しているデータポイントの値は単一点の値ではなく、*Set alert conditions* のセクションで指定されたパラメータで計算されたものになります。

    このアラートタイプは、メトリクスのゆっくりとした変化はもちろん、急速なスパイクやドロップを追跡するのに有効であり、そのメトリクスの正常な範囲や値が事前に分かっていない場合に特に有効です。
    *注:* このアラートの為の計算値は絶対値ではありません。従って下に向かう変化は、マイナス値になります。

    **Anomaly Detection** は、アルゴリズムベースの異常検出機能です。過去の挙動、つまり1日のうちの特定の時間帯、あるいは1週間のうちの特定の1日の変動パターンを考慮した際に、普段とは異なる挙動がみられた際に検出することができます。これは、閾値ベースのアラートモニタリングで監視することが困難であったり不可能な、強い傾向のある繰り返しパターンを持ったメトリクスに適しています。

    **Outlier Detection** はアルゴリズムベースの異常検出機能であり、グループ内の特定の個体に他とは異なる挙動がみられた際に外れ値データ(Outlier)として検出することができます。例えば、Webサーバー群の特定の1サーバーが異常なリクエスト数を処理しているような場合に検出し、これをリプレースすべきか判断することができます。あるいは、特定のAWSアベイラビリティゾーン(AZ)において、他のAZより多めの500(5XX)エラーを生じていることを早めに検出することで、そのAZに迫りつつある問題を察知することができるかもしれません。

<!--
2. Select the metric and scope you want to monitor.
  {{< img src="guides/monitor/metric_scope.png" alt="metric scope" >}}

    You can create a monitor on any metrics that you are currently sending to
    Datadog. The standard [scoping rules](/graphing/#scope) apply here.
-->

2. メトリクスとその対象範囲(スコープ)の設定
  {{< img src="guides/monitor/metric_scope.png" alt="metric scope" >}}

    Datadogに送信している全てのメトリクスをもとにMonitor設定を作成することができます。
    この項目では、グラフ表示に使っている標準的な対象範囲(スコープ)の指定の規則が適用されます。
    この規則の詳細に関しては、グラフ表示入門のページの[対象範囲の指定(scope)](/ja/graphingjson/#対象範囲の指定-scope-スコープ)を参照してください。

<!--
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
-->

3. アラートのグループ化についての設定
    {{< img src="guides/monitor/alert_grouping.png" alt="alert grouping" >}}

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
-->
### 監視条件の設定
4. アラート検知条件の設定

    - アラートタイプによって、選択できる**threshold**オプションは若干異なります。どちらのタイプでも、閾値と比較タイプを設定します。閾値を変更する毎に、グラフ上のカットオフポイントを示すマーカーの位置が更新されて表示されます。

      {{< img src="guides/monitor/metric_threshold.png" alt="metric threshold" >}}

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

    - Anomaly Detection のより詳しい設定方法は、[Anomaly Detection](/ja/guides/anomalies) ガイドを参照して下さい。

    - Outlier Detection のより詳しい設定方法は、[Outlier Detection](/ja/guides/outliers) ガイドを参照して下さい。

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
### Setup Notifications

{{< img src="guides/monitor/notification.png" alt="notification" >}}

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

### 通知先の設定

{{< img src="guides/monitor/notification.png" alt="notification" >}}

1. Monitorの通知に**タイトル**　を付けましょう。多くの場合、簡潔な説明を使用することが重要です。なぜならばチームメンバーが、何が起こっているかを直ぐに理解することができるからです。

2. Monitorの**通知本文** を入力します。このフィールドには、Datadogの@-notification構文の他に標準的な[markdownフォーマット](http://daringfireball.net/projects/markdown/syntax)でも記述することができます。加えて、単に`@their-email`としてメールアドレスを記述することにより、Datadogに登録していないメンバーにもメールによって通知を送信することができます(例えばuser@example.comなら@user@example.comと記述)。

   Monitorの通知本文の一般的なユースケースは、障害を解決するための詳細な手順を記述することです。例えばデータベースを監視している場合には、セカンダリーとしてスタンバイしているノードのフェールオーバーの手順を記しておくと良いでしょう。全てのケースにおいて、メッセージ本文には可能な限り多くの情報を記すように心がけましょう。

4. 必要に応じて**Monitor renotification** を有効にしてください。このオプションは、発報しているMonitorに解決の旨のチェックマークがつけられまで、チームメンバーに注意喚起を促し続けるためには良い手段です。このオプションを有効にすると、Monitorが再通知する際、オリジナルのメッセージに加えて送信するエスカレーションメッセージを設定することができます。

<!--
***Note:*** *To avoid notification storms we now group notifications with the same monitor ID and alert type in 20 second buckets. The first two notifications in the group within a 20 second bucket will be sent as normal. All other notifications within that 20 seconds will be sent as a single message listing all of them after the first two.*
-->

***注釈:*** 通知の嵐を避けるために、20秒の間に発生した同一 monitor ID/アラートタイプをまとめる新たなグループ通知が実装されました。このグループ通知では、20秒のグループのうち最初の2つの通知は通常通り送信され、その他のすべての通知は最初の2つの通知の後に1つのメッセージとしてまとめて送信されます。(この機能は標準の通知方法として実装されておりますので、特に設定は不要です)

<!--
## Export your monitor

You can export the configuration JSON for a monitor right from the create screen.
If you manage and deploy monitors programmatically, it's easier to define the monitor in the UI and export the JSON right away:

{{< img src="guides/monitor/export_monitor_json.jpg" alt="export monitor" >}}
-->
## 監視設定をエクスポートする

設定画面の右手 **Export Monitor** をクリックすることで、Monitor 設定のJSONをエクスポートすることができます。
Monitor 設定をプログラマティックに管理しデプロイする場合は、まずDatadogのUIで雛形となるMonitorを設定してJSONでエクスポートして利用するのが簡単です:

{{< img src="guides/monitor/export_monitor_json.jpg" alt="export monitor" >}}

<!--
## Scheduling Downtime

You may occasionally need to shut systems down or take them offline to perform maintenance or upgrades. Scheduling downtime allows you to do this without triggering monitors.
-->
## ダウンタイムをスケジュールする

メンテナンスやアップグレードなどによる計画停止のため、システムを停止したりオフラインにする必要が生じることもあるでしょう。ダウンタイムをスケジュールことで、設定済みのMonitorがアラートをトリガすることを防ぐことができます。

<!--
### Manage Downtime

Navigate to the [Manage Downtime](https://app.datadog.com/monitors#/downtime) page by highlighting the "Monitors" tab in the main menu and selecting the "Manage Downtime" link. You may also navigate to the "Manage Downtime" page from other Monitor related pages by clicking the link at the top of the page.

{{< img src="guides/monitor/downtime-nav.png" alt="downtime-nav" >}}

The Manage Downtime page will display a list of active and scheduled downtimes. Select a downtime to view more details about the host and monitors affected.

{{< img src="guides/monitor/downtime-manage.png" alt="downtime-manage" >}}
-->
### ダウンタイムの管理

[Manage Downtime](https://app.datadog.com/monitors#/downtime) のページへ移動するには、メインメニューの **Monitors** にマウスオーバーし現れるサブメニューの **Manage Downtime** を選択します。 他のMonitor設定ページの上部にある **Manage Downtime** リンクを選択し移動することも可能です。

{{< img src="guides/monitor/downtime-nav.png" alt="downtime-nav" >}}

Manage Downtime のページでは、アクティブなものとスケジュールされたもの、両方のダウンタイムのリストが表示されます。各ダウンタイムを選択することで、対象となるホストとMonitor設定の詳細を確認することができます。

{{< img src="guides/monitor/downtime-manage.png" alt="downtime-manage" >}}

<!--
### Schedule Downtime

To schedule downtime, click the "Schedule Downtime" button in the upper right.

1. Choose what to silence.

   {{< img src="guides/monitor/downtime-silence.png" alt="downtime-silence" >}}

   You can select a specific monitor to silence, or leave this field empty to silence all monitors. You can also select a scope to constrain your downtime to a specific host, device or arbitrary tag.  Please refer to the [scope section](/graphingjson/#scope) of the Graphing Primer using JSON for further information about scope.

   If you choose to silence all monitors constrained by a scope, clicking the "Preview affected monitors" will show which monitors are currently affected. Any monitors within your scope that are created or edited after the downtime is schedule will also be silenced.

   Note that if a multi alert is included, it will only be silenced for systems covered by the scope. For example, if a downtime scope is set for `host:X` and a multi alert is triggered on both `host:X` and `host:Y`, Datadog will generate a monitor notification for `host:Y`, but not `host:X`.

2. Set a schedule.

   {{< img src="guides/monitor/downtime-schedule.png" alt="downtime-schedule" >}}

   You can set a start date and time or leave the field empty to immediately start the downtime. You may also set a repeating schedule to accomimodate regularly scheduled downtimes.

3. Add an optional message to notify your team

   {{< img src="guides/monitor/downtime-notify.png" alt="downtime-notify" >}}

   Enter a message to notify your team about this downtime. The message field allows standard [markdown formatting](http://daringfireball.net/projects/markdown/syntax) as well as Datadog's @-notification syntax. The "Notify your team" field allows you to specify team members or send the message to a service [integration](https://app.datadoghq.com/account/settings#integrations).
-->
### ダウンタイムのスケジュール設定

ダウンタイムをスケジュールするには、画面上部右側の"Schedule Downtime"を選択します。

1. 停止するMonitorを選択する

   {{< img src="guides/monitor/downtime-silence.png" alt="downtime-silence" >}}

   停止したい特定のMonitorを指定するか、ここでは特定のMonitorは指定せずすべてのMonitorを停止の対象とします。続いて、ダウンタイムの対象を限定するために、特定のホスト、デバイス、あるいは任意のタグによって範囲(スコープ)の設定をします。範囲(スコープ)の設定については、グラフ表示入門のページのJSONの使用方法、[対象範囲の指定(scope)](/ja/graphingjson/#対象範囲の指定-scope-スコープ)も併せて参照してください。

   すべてのMonitorを停止の対象としたうえで範囲(スコープ)の設定によって対象を限定するような場合には、"Preview affected monitors" (対象となるMonitorをプレビューする)をクリックすることで、現在対象となっているMonitorのリストが表示されます。作成時に停止の対象としたMonitorの範囲(スコープ)は、ダウンタイムのスケジュール設定後でも修正することができます。

   指定するMonitorにMulti Alartを含むような場合は、範囲(スコープ)の設定によって限定した対象のみが停止されることに注意して下さい。例えばダウンタイムの範囲(スコープ)が`host:X`にセットされていて、あるMulti Alartは`host:X`と`host:Y`両方についてアラートを発報する場合, Datadogは引き続き`host:Y`についての通知は行います。

2. スケジュールをセットする

   {{< img src="guides/monitor/downtime-schedule.png" alt="downtime-schedule" >}}

   ダウンタイムをスケジュールする日時をここで設定します。あるいは、空欄のままにしてダウンタイムを即刻開始することもできます。また、定期的な計画停止のために繰り返しのスケジュールを設定することも可能です。

3. チームに通知するためのメッセージ本文を追加で設定する

   {{< img src="guides/monitor/downtime-notify.png" alt="downtime-notify" >}}

   ダウンタイム設定についてチームに通知するメッセージを入力します。このフィールドには、Datadogの@-notification構文の他に標準的な[markdownフォーマット](http://daringfireball.net/projects/markdown/syntax)でも記述することができます。"Notify your team"フィールドでは、メッセージを送りたいチームメンバー個人あるいは特定のサービス [integtration](https://app.datadoghq.com/account/settings#integrations) (インストール済みのインテグレーション)を選択することができます。

<!--
## Managing Monitors

The [Manage Monitors](https://app.datadoghq.com/monitors/manage) page lets you run an advanced search of all monitors so you can delete, mute, resolve, or edit service tags for selected monitors in bulk. You can also clone or fully edit any individual monitor in the search results.
-->
## 設定済みのMonitorの管理

[Manage Monitors](https://app.datadoghq.com/monitors/manage) ページではすべての設定済みのMonitorを詳細検索することで、Monitorの削除やミュート、解決済みのマーク、あるいはサービスタグの編集などを、一括で実行することができます。検索した個々のMonitorは、クローンしたり、編集することも可能です。

<!--
### Find the Monitors

Advanced search lets you query monitors by any combination of monitor attributes:

* `title` and `message` - text search
* `status` - Alert, Warn, No Data, Ok
* `scope` - e.g. *, role:master-db
* `type` - metric, integration, apm, etc
* `muted`
* `creator`
* `id`
* `service` - tags
* `team` - tags
* `env` - tags
* `notification` - the monitor's notification target, e.g. you@example.com, slack-ops-oncall
* `metric` - the metric _or_ service check monitored, e.g. system.cpu.user, http.can_connect

To run a search, construct your query using the checkboxes on the left and/or the search bar along the top. When you check the boxes, the search bar updates with the equivalent query. Likewise, when you modify the search bar query (or write one from scratch), the checkboxes update to reflect the change. In any case, query results update in real-time as you edit the query; there's no 'Search' button to click.
-->
### Monitorを検索する

Monitorの詳細検索では、あらゆるMonitorの属性を組み合わせてクエリすることができます:

* `title` と `message` - Monitorのタイトルと通知本文の検索、テキスト検索で使用
* `status` - Alert, Warn, No Data, Ok, Muted
* `type` - metric, integration, apm, など
* `creator` - Monitorの作成者
* `service` - サービスタグ
* `scope` - 例えば、 *、あるいは role:master-db
* `id` - Monitor ID
* `team` - タグ
* `env` - タグ
* `metric` - メトリクス _または_ サービスチェック、例えば、 system.cpu.user, http.can_connect
* `notification` - Monitorで設定した通知先のターゲット、例えば、you@example.com, slack-ops-oncall

Monitorの検索を実行するには、画面左側のチェックボックスおよび/あるいは画面上部の検索バーを使用してクエリを指定します。チェックボックスを使用すると、検索バーにも同等のクエリが表示されます。同じように、検索バーのクエリを変更したり一から指定したりすると、チェックボックスの内容も変更が反映されます。いずれの場合でも、クエリの結果はリアルタイムで更新されるので、クリックするための検索ボタンはありません。

<!--
#### Check the boxes

When you don't need to search monitor titles and bodies for specific text, your search is a quick click or two away. Check as many boxes as you need to find your desired monitors, keeping the following in mind:

* Checking attributes from different fields will AND the values, e.g. `status:Alert type:Metric` (the lack of an operator between the two search terms implies AND)
* Checking attributes within the same field will often OR the values, e.g. `status:(Alert OR Warn)`, but there are some exceptions. For example, checking multiple scopes or service tags ANDs them.
* Some fields do not allow you to select multiple values, e.g. when you tick a metric or service check, the other metrics/checks disappear from the list until you untick your selection.
* The Triggered checkbox under the Status field means `status:(Alert OR Warn OR "No Data")`, not `status:Triggered`. Triggered is not a valid monitor status.
* The Muted checkbox appears under the Status field, but Muted is actually its own field; checking it adds `muted:true` to your query, not `status:muted`.
* The Metric/Check field is always called `metric` in the query, e.g. selecting the check `http.can_connect` adds `metric:http.can_connect` to your query.

For fields that have an arbitrary (i.e. large) number of values across all monitors-Service tag, Scope, Metric/Check, Notification-use the field-specific search bars to find the value you're looking for.

When you need to run a more complex search than the checkboxes allow, use the search bar to edit your query or write a new one.
-->
#### Monitorをチェックボックスから検索する

Monitorのタイトルや通知本文を使って検索する必要がないのであれば、Monitorの検索はわずか1-2回程度のクリックをするだけです。 以下の要点を考慮したうえで、検索に必要なだけチェックボックスを選択して下さい:

* 異なるフィールドの属性をチェックした場合は、それらはAND条件として処理されます、例えば、`status:Alert type:Metric` (2つの検索条件の間に演算子は記載されていませんが、これはAND条件を意味します)
* 同じフィールド内で属性をチェックした場合は、それらはOR条件として処理されます、例えば、`status:(Alert OR Warn)`、しかし、これにはいくつか例外もあります。例えば`scope`や`service`タグを複数選択した場合はAND条件で処理されます。
* いくつかのフィールドでは複数の値を選択することが許可されていません、例えば、メトリクス/サービスチェックについて選択した場合は、他のメトリクス/サービスチェックは選択中のチェックを外さない限りリストには現れません。
* Statusフィールド直下のTriggeredチェックボックスは `status:(Alert OR Warn OR "No Data")` を意味し、 `status:Triggered` を意味するわけではありません。これは、Triggered がMonitorステータスの有効な値ではないためです。
* Statusフィールドには Mutedチェックボックスがありますが、Mutedは実際は独立したフィールドを持つものです。これをチェックすると、検索クエリとしては`muted:true` が加えられます。`status:muted` ではありません。
* Metric/Checkのフィールドは検索クエリとしては常に`metric` と記述されます。例えば、`http.can_connect` チェックを追加すると、`metric:http.can_connect` が検索クエリに記述されます。

いずれのフィールド(Service tag, Scope, Metric/Check, Notification)においても、すべてのMonitorを通して膨大な数の値がある場合はフィールドごとに配置されている検索バーで使用したい値を検索します。

チェックボックスでできることよりも複雑な検索の実行が必要な場合は、画面上部の検索バーにてクエリを指定して下さい。

<!--
#### Write a query

The most common reason to write a query is to search for specific text across all monitor titles and message bodies. A simple search of `postgresql` will return all monitors with `postgresql` anywhere in the title or message body. To search on title or message body, but not both, qualify the search term with the field name, e.g. `title:postgresql`.

Otherwise, you can use boolean operators (AND, OR, and NOT) and parentheses to write complex queries using any monitor fields. The search syntax is very similar to that of [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#query-string-syntax), so it's easiest to describe how it is *not* like Elasticsearch syntax:

* Regular expressions are not supported
* Single-character wildcard (`?`) is not supported, but the general wildcard (`*`) is
* Proximity searches are not supported, but the [fuzzy](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#_fuzziness) operator is
* Ranges are not supported
* Boosting is not supported

Finally, The following characters are reserved: `-`, `(`, `)`, `"`, `~`, `*`, `:`, `.`, and whitespace. To search monitor fields that include any of them, wrap the field string in quotes: `status:Alert AND "chef-client"` is a valid query string; `status:Alert AND chef-client` is not.

There are a few caveats regarding quoted fields:

* You may use `.` with or without surrounding quotes, as it commonly appears in some fields: `metric:system.cpu.idle` is valid.
* You may NOT use wildcard search inside quoted strings: `"chef-client*"`, while valid syntactically, won't return a monitor titled `"chef-client failing"` because the `*` is treated literally.
-->
#### Monitorの検索クエリを利用する

検索バーで個別にクエリを記述する最も一般的な理由は、すべてのMonitorのタイトルと通知本文に対して特定のテキストを検索したい場合です。シンプルに `postgresql` と単語で検索した場合は、タイトルか通知本文のいずれかに `postgresql` を含むすべてのMonitorが返されます。タイトルか通知本文について検索したいが両方ではない場合、いずれかのフィールドを指定して `title:postgresql` というように検索ができます。

あるいは、Boolean演算子 (AND, OR, そして NOT) とカッコを使用して、Monitorのあらゆるフィールドに対する複雑なクエリを記述します。検索クエリの構文は [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#query-string-syntax) のそれと非常によく似ています。このため、Elasticserchの構文がどんなもの *ではない* のかを説明するのが最も簡単でしょう:

* 正規表現はサポートされていません。
* 1字のワイルドカード (`?`) はサポートされていませんが、一般的なワイルドカードである (`*`) はサポートされています。
* 近接検索はサポートされていませんが、 [fuzzy](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#_fuzziness) 演算子についてはサポートされています。
* Ranges はサポートされていません。
* Boosting はサポートされていません。

最後に、下記の文字: `-`, `(`, `)`, `"`, `~`, `*`, `:`, `.`, そして空白は予約されています。これらの文字を含むMonitorフィールドを検索するには、フィールドの文字列を引用符で囲います。`status:Alert AND "chef-client"` は有効なクエリ文字列ですが、`status:Alert AND chef-client` は有効ではありません。

フィールドの文字列を囲う際にいくつかの注意点があります:

* ドット `.` は既に有効な `metric:system.cpu.idle` などのフィールドで一般的に使用されているので、引用符で囲っても囲わなくても構いません。
* 引用符で囲われたクエリ文字列中にワイルドカードを使用することはできません: `"chef-client*"` は有効な構文ではあるものの、`*` が文字通りに扱われるため、`"chef-client failing"` のようなタイトルのMonitorを返すことはありません。

<!--
### Manage chosen Monitors

When you have found the monitors you were looking for, select one or more that you wish you update using the checkboxes next to each result. You can select all results by ticking the topmost checkbox next to the STATUS column heading. Modify the monitors in bulk using the buttons at the top right of the search results: Mute, Resolve, Delete, and Edit Service Tags.

{{< img src="guides/monitor/manage-monitors-mute.png" alt="manage-monitors-mute" >}}

To edit an individual monitor, hover over it and use the buttons to the far right in its row: Edit, Clone, Mute, Delete. To see more detail on a monitor, click its Name to visit its status page.

{{< img src="guides/monitor/manage-monitors-hover-clone.png" alt="manage-monitors-hover-clone" >}}
-->
### 選択したMonitorを設定変更する

探していたMonitorが得られたあとは、検索結果の各Monitor横にあるチェックボックスを使用して編集したいMonitorを1つ以上選択します。STATUS列 見出しの横にある一番上のチェックボックスを選択すると、すべての検索結果を選択できます。検索結果の右上にあるボタン（Mute, Resolve, Delete そして Edit Tags）を使用して、一括してMonitorを変更します。

{{< img src="guides/monitor/manage-monitors-mute.png" alt="manage-monitors-mute" >}}

個々のMonitorを編集するには、編集したいMonitorにマウスオーバーし、その行の右端にあるボタン (Edit, Clone, Mute, Delete)　を使用します。Monitorの詳細を表示するには、そのタイトルをクリックしてステータスページにアクセスします。

{{< img src="guides/monitor/manage-monitors-hover-clone.png" alt="manage-monitors-hover-clone" >}}

<!--
## Manage Triggered Monitors with group-level granularity

You can mute or resolve triggered monitors in bulk using the [Triggered Monitors page](https://app.datadoghq.com/monitors/triggered). It's similar to the [Manage Monitors page](#managing-monitors)-you can find monitors by their attributes using the same easy tickboxes or query syntax-but there are a few differences. Aside from only showing monitors with a triggered status (Alert, Warn, or No Data), the main difference is that the Triggered Monitors page shows a row for _each group_ (i.e. each reporting source) of each monitor.

Say you have a monitor called "high latency" that is grouped by host. If there are 20 hosts reporting and 14 have a triggered status, the Triggered Monitor page will show 14 rows if you search for the monitor by title in the query search bar (e.g. `high latency` or `title:
"high latency"`). This lets you easily mute or resolve a monitor for some reporting sources, but not all (though of course you can mute or resolve all, too).

In writing your search queries, you can use all the same fields available on the Manage Monitors page, even though most of them aren't controllable via tickboxes on the Triggered Monitors page. A few notes on field differences on the Triggered Monitors page:

* It uses the `group_status` field instead of `status`.
* It adds the `triggered` field, which lets you filter monitors by how long they've been triggered.
* It also adds the `group` field, which helps you narrow down search results for monitors grouped by more than one thing. Say you have a monitor grouped by `host` and `env`. You search for this monitor by title and get four rows, where the groups are `host:web01,env:dev`, `host:web02,env:dev`, `host:web01,env:prod`, and `host:web02,env:prod`. Use the `group` field to only show, for example, prod hosts (`group:"env:prod"`) or web02 hosts (`group:"host:web02"`).
-->
## トリガされたMonitorをグループ単位で操作する

トリガされたMonitorを一括でミュートや解決済みとマークするには [Triggered Monitors ページ](https://app.datadoghq.com/monitors/triggered)を使用します。これは[Manage Monitors ページ](#managing-monitors)とよく似ているので、同じようにMonitorの属性のチェックボックスをやクエリ構文を使用して簡単にMonitorを探すことができますが、いくつか違いがあります。Monitorをトリガの状態(Alert, Warn, または No Data)と表示するだけでなく、Triggered Monitorsページには各Monitorの _各グループ_ （各アラート元）の行が表示されるというのが大きな違いです。

例えば、サーバーホストによってグループ化された "high latency" というMonitorがあるとします。ホストが20台あり、14台がトリガ状態の場合、検索バーでMonitorのタイトルで検索した場合、Triggered Monitorページには14行が表示されます（例、`high latency` または `title:"high latency"`）。これにより、一部のアラート元でMonitorを簡単にミュートまたは解決済みとマークすることができます（もちろん、すべてをミュートまたは解決することもできます）

検索クエリを記述する場合、Manage Monitors ページで使用可能なすべてのフィールドを使用できますが、そのほとんどはトリガされたモニタページのチェックボックスで制御できません。 Triggered Monitorsページのフィールドとの違いに関するいくつかの注意があります：

* `status` フィールドの代わりに `group_status` が使用されます。
* `triggered` フィールドが追加されています。これにより、トリガされてからの時間によってMonitorをフィルタすることができます。
* また、 `group` フィールドも追加されています。これは、複数のグループにまたがったMonitorの検索結果を絞り込むのに役立ちます。例えば、Monitorが `host` と `env` でグループ化されており、このMonitorをタイトルで検索して4行の結果を得ました。グループが  `host:web01,env:dev`, `host:web02,env:dev`, `host:web01,env:prod`, そして `host:web02,env:prod`となっています。`group` フィールドを使用することで、env:prod のホスト (`group:"env:prod"`) または web02 のホスト  (`group:"host:web02"`) だけを表示できます。

<!--
## FAQs

*Can I manage my monitors programmatically?*

Yes. Refer to the [Datadog API docs](http://docs.datadoghq.com/api/#alerts)
for detailed information on managing monitors through the API using the
available libraries or cURL.

*Can I alert on a function?*

Yes, selecting the 'Source' tab of a monitor editor (Step 1) will allow you to
alert on custom queries and functions, similar to the JSON editor for graphs.

*Can I manually resolve a monitor?*

Yes, you can manually resolve monitors but it only makes sense in a couple cases:

- If the monitor is in a "no data" state then resolving it will hide it from the
triggered monitors page.
- If the monitor is in the triggered state but has stopped reporting data then
resolving it will hide it from the triggered monitors page.

Otherwise the monitor will pick up the current state on the next evaluation. In other
words, if the value is still above/below the configured threshold then the monitor may
re-trigger upon the next evaluation (in about 60 seconds).
-->
## Monitorに関するFAQs

*Monitorは、プログラム的に管理することはできますか？*

**はい**。各プログラミング言語毎ライブラリやcURLを使ってMonitorを制御する方法に関しては、[Datadog APIドキュメント](http://docs.datadoghq.com/api/#alerts)を参照してください。

*ファンクションを基にアラートを発報することはできますか？*

**はい**。 Monitor設定の第一ステップで'Source'タブを選択し、グラフを設定する際のJSONエディタと同じように編集することにより、カスタムクエリやファンクションのアラートを設定すことができます。

*手動で monitorを解除することはできますか？*

**はい**。手動で monitorを解除することは可能です(トリガされたmonitorのStatusをResolveとセットすること)。ただし、この操作は以下のケースでのみ有効だと考えられます：

- monitor が"no data"の状態であり、このmonitor を解除することで triggered monitors ページから排除したいケース
- monitor がトリガされた状態だがデータの送信は停止しており、このmonitor を解除することで triggered monitors ページから排除したいケース

そうでなければ、monitor はすぐに次の値の評価に移ります。つまり、評価している値が指定している閾値を超えているままなのであれば、Resolveとセットされた場合でもそのmonitor は次の値の評価の際(およそ60秒後)に再びトリガされることになります。
