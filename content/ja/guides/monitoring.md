---
last_modified: 2016/08/17
translation_status: complete
language: ja
title: Monitor(監視)機能の設定ガイド
kind: guide
listorder: 13
list2guide: true
sidebar:
  nav:
    - header: Monitorの設定ガイド
    - text: 用語集
      href: "#glossary"
    - text: 新しいMonitorの作成
      href: "#create"
    - text: 　監視する対象の設定
      href: "#metric"
    - text: 　アラート条件の設定
      href: "#metric-conditions"
    - text: 　通知の設定
      href: "#notifications"
    - text: ダウンタイムを設定する
      href: "#downtime"
    - text: 　ダウンタイムの管理
      href: "#downtime-manage"
    - text: 　ダウンタイムのスケジュール
      href: "#downtime-schedule"
    - text: Monitorに関するFAQs
      href: "#faqs"
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

Monitor(監視)機能のより詳しいレファレンスは、[Monitoringレファレンス](/ja/monitoring) ページを参照して下さい。

インフラ全体を一箇所で監視しようとする場合、そのインフラが危機的な状況になっていることを検知する方法を確立するのは重要な作業です。
Datadogでは、能動的にメトリクス, インテグレーション, ネットワークの接続状態, その他を監視してくれるMonitor機能を設定することができます。

一度Monitor機能を設定しておけば、条件が満たされた時に通知を受けることができます。
電子メールでチームメンバーに通知することもでき、サードパーティのサービス（例えばPagerdutyまたは
Hipchat）やwebhooksを使い、他のサービスと連携して通知を送信することもできます。

通知を送信したMonitorはイベントストリームに表示され、そのアプリケーションやインフラの問題解決に向けたコラボレーションができるようになります。Datadogの[Triggered Monitors](https://app.datadoghq.com/monitors/triggered)のページには、通知済み状態のMonitorの項目がリスト表示されます。[Manage Monitors](https://app.datadoghq.com/monitors)のページには全てのMonitorが表示され、それらを管理することができるように成っています。

## 用語集
{: #glossary}

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
- **Monitorタイプ**: host-, metric-, integration-, process-, network-, event-based, customがあります。 特定のMonitorタイプの詳細に関しては、[Monitoring Reference](/monitoring) ページを参照して下さい。
- **タグ**: 各メトリクスやホストに対して付けることができるラベルです。タグの詳細に関しては、[Tagging](/guides/tagging) ページを参照して下さい。

<!--
## Creating a Monitor
{: #create}
-->

## 新しいMonitorの作成
{: #create}

<!--
Navigate to the [Create Monitors](https://app.datadoghq.com/monitors#/create)
page by highlighting the "Monitors" tab in the main menu and selecting the
"New Monitor" sub-tab (depending on your chosen theme, the main menu may be at the top or on the left).  You will be presented with a list of monitor types
on the left. This guide will walk through the configuration of the Metric type. To learn more about setting up the other types of monitors, go to the [Monitoring Reference](/monitoring) page.
 -->

[Create Monitors](https://app.datadoghq.com/monitors#/create)のページへ移動するには、メインメニューの`Monitors`タブからドロップダウンメニューの`New Monitor`を選択します(テーマの選択次第により、メインメニューは画面の左側あるいは上部に配置されています)。ページが表示されると各Monitorタイプが左側に一覧で表示されます。このガイドでは、メトリクスを対象にしたMonitorタイプについての設定方法を説明していきます。より詳しい各Monitorタイプの設定方法については、[Monitoring Reference](/monitoring)ページを参照して下さい。

<!-- [New Monitor](https://app.datadoghq.com/monitors/create)のページへ移動するには、トップメニューの`Monitors`タブからドロップダウンメニューの`New Monitor`を選択します。ページが表示されると各Monitorタイプが左側に一覧で表示されます。このガイドでは、これらのMonitorタイプの設定方法を解説していきます。 -->

![nav](/static/images/monitor/nav.png)

<!-- ## Metric Monitors {#metric} -->

  **監視する対象の設定**
  {: #metric}

<!--
1. Select the metric and scope you want to monitor.
 -->

1.  メトリクスとそのメトリクスを監視する範囲(スコープ)を設定します。

    ![metric scope](/static/images/monitor/metric_scope.png)

    <!--
    You can create a monitor on any metrics that you are currently sending to
    Datadog. The standard scoping rules apply here. Please refer to the
    [scope section](/graphing/#scope) of the graphing primer for
    further information.
    -->

    Datadogに送信している全てのメトリクスをもとにMonitor設定を作成することができます。
    この項目では、グラフ表示に使っている標準的な対象範囲(スコープ)の指定の規則が適用されます。
    この規則の詳細に関しては、グラフ表示入門のページの[対象範囲の指定(scope)](/ja/graphing/#scope)を参照してください。

    <!--
    2. Select the alert grouping.
     -->

2.  アラートグループを選択します。
    ![alert grouping](/static/images/monitor/alert_grouping.png)

    <!--
    A **simple alert** aggregates over all reporting sources. You will get one
    alert when the aggregated value meets the conditions set below. This works
    best to monitor a metric from a single host, like `avg` of
    `system.cpu.iowait` over `host:bits`, or for an aggregate metric across many
    hosts like `sum` of `nginx.bytes.net` over `region:us-east`.
    -->

    **Simple Alert**は、全てのレポートソースをまとめて監視します。"Set alert conditions"のセクションで設定した条件に合致した場合、アラートを1回送信します。この設定は、単一ホストから送信されてくるメトリクスを監視するようなケースに最適です。例えば、"`avg` of `system.cpu.iowait` over `host:bits`"のような設定をしてる場合です。更に、"`sum` of `nginx.bytes.net` over `region:us-east`"のように複数のホストの値を集計して単一メトリクスとして監視したい場合にも有効です。

    <!--
    A **multi alert** applies the alert to each source, according to your group
    parameters. E.g. to alert on disk space you might group by host and device,
    creating the query:
    avg:system.disk.in_use*} by host,device}
    This will trigger a separate alert for each device on each host that is
    running out of space.
    -->

    **Multi Alert**では、パラメータとして指定したグループについて、複数のレポートソースからのアラートを通知することができます。例えば、ディスク容量に関するアラートを通知する場合、ホストとデバイスについてグループを指定すると良いでしょう。JSONでクエリを定義する場合は以下です。

            avg:system.disk.in_use{*} by {host,device}

    このように設定することにより、各ホストの各デバイス毎にディスクスペースが無くなった際のアラートを通知することができるようになります。

    <!--
    3. Select the alert type.
     -->

3.  アラートのタイプを選択します。

    ![alert type](/static/images/monitor/alert_type.png)

    <!--
    A **threshold alert** will compare the value in the selected
    timeframe against a given threshold. There are additional options available
    in the alerting conditions section. This is the standard alert case where
    you know what sort values are unexpected.
     -->
    <!--
    A **change alert** will compare the change or % change of a value between
    now and some time ago against a given threshold.
    The compared data points will not be single points but are computed using
    the parameters in the *alert conditions* section.
    -->
    <!--
    This type of alert is useful to track fast spikes or drops as well as slow
    changes in a metric when you might not have an exact "unexpected" threshold.
    *Note:* the calculated value is not the absolute value - meaning it will be
    negative for a downward change.
    -->

    **threshold alert**は、時間枠内のメトリクス値と指定した閾値を比較します。更に、アラート条件セクションには、追加で設定可能なオプションもあります。このアラートタイプは一般的なアラートであり、正常な範囲か値が事前に分かっている場合に使用します。


    **change alert**は、最近のデータポイントの値に対する数分前の値の変化量または変化率と指定した閾値を比較します。
    比較しているデータポイントの値は単一点の値ではなく、"Set alert conditions"のセクションで指定されたパラメータで計算されたものになります。


    このアラートタイプは、メトリクスのゆっくりとした変化はもちろん、急速なスパイクやドロップを追跡するのに有効であり、そのメトリクスの正常な範囲や値が事前に分かっていない場合に特に有効です。
    注: このアラートの為の計算値は絶対値ではありません。従って下に向かう変化は、マイナス値になります。

    <!--
    4. Select the alert conditions
    ###Define the conditions
    4. Select the alert conditions
    -->
    <!-- The **threshold** options vary slightly depending on what alert type you have chosen. For either case, you input a threshold and comparison type based on your metric. As you change your threshold, you will see the graph update with a marker showing the cutoff point.-->
    <!--
    Note that you can use formatted values in this input based on the
    metric itself. For example, if you are monitoring `system.disk.used`, you
    can give a threshold of `20GB`.
    -->
    <!--
    For a **threshold alert** you will be able to chose a *time aggregation*
    of the data. The alerting engine will generate a single series and perform
    selected aggregation.
     -->
    <!--
    *on average*: The series will be averaged to produce a single
     value that will be checked against the threshold.

    *at least once*: If any single value in the generated series crosses
     the threshold then an alert will be triggered.

    *at all times*: If every point in the generated series is outside the
     threshold then an alert will be triggered.

    *in total*: If the summation of every point in the series is outside
     the threshold then an alert will be triggered.
     -->

    **アラート条件の設定**

4.  {:#metric-conditions}アラート条件の設定をします。

    アラートタイプによって、選択できる**threshold**オプションは若干異なります。どちらのタイプでも、閾値と比較タイプを設定します。閾値を変更する毎に、グラフ上のカットオフポイントを示すマーカーの位置が更新されて表示されます。

    ![metric threshold](/static/images/monitor/metric_threshold.png)

    メトリクスの閾値を設定する際、その値に単位をつけて入力することができます。例えば、`system.disk.used`を監視する場合、`20GB`を閾値として設定することができます。


    **threshold alert** の場合、*集計期間内に含まれるデータの集計方法* を決めるオプションを選択することができます。アラートエンジンは、別の時系列データを生成し選択された集計を実行します。

    <!-- Let's look at the details of each option: -->

    それぞれのオプションの詳細は以下のようになります:


    - *on average*(平均): 時系列データには、平均化の処理を行い単一の値を導きだします。その後、閾値と比較してチェックします。
    - *at least once*(最低1回): 生成された時系列データ内のどれかの値が閾値を超えている場合、アラートが発報されます。
    - *at all times*(常時): 生成された時系列データの全てのポイントが閾値を超えている場合に、アラートが発報されます。
    - *in total*(合計)： 時系列データの全てのポイントの合計が閾値を超えている場合に、アラートが発報されます。

      <!--
      Note the *on average* and *at all times* aggregations *require* a full
      window of data in the final series. This does *not* mean that each series
      must be full but that there shouldn't be a gap of more than 1 minute
      across all aggregated series. In other words, we recommend using *at least
      once* or *in total* for metrics with > 1 minute interval.
       -->

    - 注意: *on average*と*at all times*の集計は、最終的に受信したデータが揃っていることを*必要条件*としています。このことは、全ての時系列データが完全に揃っていることを要求しているわけではなく、集計に使うデータのギャップが１分以上空いていないことを要求しています。言い換えれば、1分以上間隔の空くメトリクスに関しては、*at least once*または*in total*を使用することをお勧めします。

    <!--
    - When you select the **change alert** option, you will have additional
    parameters you can adjust.
      - *change* is an absolute change of the value whereas *% change* is the
        percentage change of your value compared to its previous value (so if
        it was a value of 2 and now 4, the *% change* will be 100%).
      - You can compare the change of the value during a given timeframe by
        selecting the period you want to compare against. This can range from 5
        minutes to up to 2 days.　！これ、2dayじゃなくて24hでは？？
      - Like the **threshold alert**, you will need to select the
        *time aggregation* and a *time window* on which the change will be
        calculated.
        -->

      **change alert**オプションを選択している場合は、追加で設定可能な項目があります。

      - *change* は値そのものの変化量を意味し、*% change* はその値の過去の値との変化量を意味します (つまり過去の値が2で現在が4の場合、*% change* は100%になります)。
      - 比較する値の変化は、設定された時間枠の範囲内で指定します。時間枠は5分から24時間の間で指定が可能です (最短で5分前の値と、最大で24時間前の値との比較)。
      - **threshold alert** とほぼ同じように、*集計期間* と*集計期間内に含まれるデータの集計方法* を設定します。

      <!--
      5. You can optionally **notify on no data** after a configurable timeframe. At
         the minimum, your chosen timeframe must be greater than 2x the alerting
         window. For example, if you are alerting over the last 5 minutes then you
         would need to wait at least 10 minutes before notifying on missing data.
      -->
    <!--
    6. You can opt to **automatically resolve the monitor from a triggered
       state**. In general you'll want to leave this option off as you only want
       an alert to be resolved when it's fixed.
    -->

5.  必要に応じて、一定時間以上データが届かない場合**notify on no data**(オプション)を設定することができます。このオプションを設定する時間枠は、先の条件設定で設定した時間枠の2倍以上の時間枠である必要があります。例えば、過去5分のメトリクスを基にアラートを設定しているなら、データが届いていないことを通知する前に、少なくとも10分間以上の時間を設定する必要があります。


6.  **automatically resolve the monitor from a triggered
   state**(アラートが発報している状態を自動的に解除する)オプションを選択することができます。問題が解決したときのみアラートが解除されるのが望ましいため、一般的にこのオプションはOFFにしておくことをお勧めします。

   <!--
   This most common use-case for this option is when you have very sparse
   counters, e.g. for errors. When errors stop occuring the metric will stop
   reporting. This means the monitor will not resolve because there are not
   anymore values to trigger a resolution.
    -->

   このオプションの最も一般的なユースケースは、非常に時間の離れたエラーのカウンターです。エラーが発生しなくなると、Datadogへのメトリクスのレポーティングも止まります。一度発報状態になったアラートを解除するためのデータが届いていないので、そのアラートを解除するために、自動での解除が必要になります。

<!-- ## Monitor Notifications {#notification} -->

### 通知の設定
{: #notifications}

![notification](/static/images/monitor/notification.png)

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

<!--
***Note:*** *To avoid notification storms we now group notifications with the same monitor ID and alert type in 20 second buckets. The first two notifications in the group within a 20 second bucket will be sent as normal. All other notifications within that 20 seconds will be sent as a single message listing all of them after the first two.*
-->

***注釈:*** 通知の嵐を避けるために、20秒の間に発生した同一 monitor ID/アラートタイプをまとめる新たなグループ通知が実装されました。このグループ通知では、20秒のグループのうち最初の2つの通知は通常通り送信され、その他のすべての通知は最初の2つの通知の後に1つのメッセージとしてまとめて送信されます。(この機能は標準の通知方法として実装されておりますので、特に設定は不要です)

<!-- ## Scheduling Downtime -->

## ダウンタイムを設定する
{: #downtime}

<!--
You may occasionally need to shut systems down or take them offline to perform maintenance or upgrades. Scheduling downtime allows you to do this without triggering monitors.
-->
■◎ここから◎■

### ダウンタイムの管理
{: #downtime-manage}

<!--
Navigate to the [Manage Downtime](https://app.datadog.com/monitors#/downtime) page by highlighting the "Monitors" tab in the main menu and selecting the "Manage Downtime" link. You may also navigate to the "Manage Downtime" page from other Monitor related pages by clicking the link at the top of the page.
-->

[Manage Downtime](https://app.datadog.com/monitors#/downtime) のページへ移動するには、メインメニューの"Monitors"タブからドロップダウンメニューの"Manage Downtime" を選択します。 他のMonitor設定ページの上部にある"Manage Downtime" リンクを選択することで移動することも可能です。

![downtime-nav](/static/images/monitor/downtime-nav.png)

<!--
The Manage Downtime page will display a list of active and scheduled downtimes. Select a downtime to view more details about the host and monitors affected.
-->

"Manage Downtime"ページでは、アクティブなものとスケジュールされたもの、両方のダウンタイムのリストが表示されます。各ダウンタイムを選択することで、対象となるホストとMonitor設定の詳細を確認することができます。

![downtime-manage](/static/images/monitor/downtime-manage.png)

### ダウンタイムのスケジュール
{: #downtime-schedule}

<!--
To schedule downtime, click the "Schedule Downtime" button in the upper right.

1. Choose what to silence.

   ![downtime-silence](/static/images/monitor/downtime-silence.png)

   You can select a specific monitor to silence, or leave this field empty to silence all monitors. You can also select a scope to constrain your downtime to a specific host, device or arbitrary tag.  Please refer to the [scope section](/graphingjson/#scope) of the Graphing Primer using JSON for further information about scope.

   If you choose to silence all monitors constrained by a scope, clicking the "Preview affected monitors" will show which monitors are currently affected. Any monitors within your scope that are created or edited after the downtime is schedule will also be silenced.

   Note that if a multi alert is included, it will only be silenced for systems covered by the scope. For example, if a downtime scope is set for `host:X` and a multi alert is triggered on both `host:X` and `host:Y`, Datadog will generate a monitor notification for `host:Y`, but not `host:X`.
-->

ダウンタイムをスケジュールするには、画面上部右側の"Schedule Downtime"を選択します。

1. 停止するMonitorを選択

   ![downtime-silence](/static/images/monitor/downtime-silence.png)

   停止したい特定のMonitorを指定するか、ここでは特定のMonitorは指定せずすべてのMonitorを停止の対象とします。続いて、ダウンタイムの対象を限定するために、特定のホスト、デバイス、あるいは任意のタグによって範囲(スコープ)の設定をします。範囲(スコープ)の設定については、グラフ表示入門のページのJSONの使用方法、[対象範囲の指定(scope)](/ja/graphing/#scope)も併せて参照してください。

   すべてのMonitorを停止の対象としたうえで範囲(スコープ)の設定によって対象を限定するような場合には、"Preview affected monitors" (対象となるMonitorをプレビューする)をクリックすることで、現在対象となっているMonitorのリストが表示されます。作成時に停止の対象としたMonitorの範囲(スコープ)は、ダウンタイムのスケジュール設定後でも修正することができます。

   指定するMonitorにMulti Alartを含むような場合は、範囲(スコープ)の設定によって限定した対象のみが停止されることに注意して下さい。例えばダウンタイムの範囲(スコープ)が`host:X`にセットされていて、あるMulti Alartは`host:X`と`host:Y`両方についてアラートを発報する場合, Datadogは引き続き`host:Y`についての通知は行います。

<!--
2. Set a schedule.

   ![downtime-schedule](/static/images/monitor/downtime-schedule.png)

   You can set a start date and time or leave the field empty to immediately start the downtime. You may also set a repeating schedule to accomimodate regularly scheduled downtimes.

3. Add an optional message to notify your team

   ![downtime-notify](/static/images/monitor/downtime-notify.png)

   Enter a message to notify your team about this downtime. The message field allows standard [markdown formatting](http://daringfireball.net/projects/markdown/syntax) as well as Datadog's @-notification syntax. The "Notify your team" field allows you to specify team members or send the message to a service [integtration](https://app.datadoghq.com/account/settings#integrations).
-->

2. スケジュールを設定

   ![downtime-schedule](/static/images/monitor/downtime-schedule.png)

   ダウンタイムをスケジュールする日時をここで設定します。あるいは、空欄のままにしてダウンタイムを即刻開始することもできます。また、定期的な計画停止のために繰り返しのスケジュールを設定することも可能です。

3. チームに通知するためのメッセージ本文を追加で設定

   ![downtime-notify](/static/images/monitor/downtime-notify.png)

   ダウンタイム設定についてチームに通知するメッセージを入力します。このフィールドには、Datadogの@-notification構文の他に標準的な[markdownフォーマット](http://daringfireball.net/projects/markdown/syntax)でも記述することができます。"Notify your team"フィールドでは、メッセージを送りたいチームメンバー個人あるいは特定のサービス(インストール済みのインテグレーション)を選択することができます。 [integtration](https://app.datadoghq.com/account/settings#integrations).

<!-- ## Monitor FAQs {#faqs} -->

## Monitorに関するFAQs
{: #faqs}

<!--
- *Can I manage my monitors programatically?*

  Yes. Refer to the [Datadog API docs](http://docs.datadoghq.com/api/#alerts)
  for detailed information on managing monitors through the API using the
  available libraries or cURL.
 -->

- *Monitorは、プログラム的に管理することはできますか？*

  **はい**。各プログラミング言語毎ライブラリやcURLを使ってMonitorを制御する方法に関しては、[Datadog APIドキュメント](http://docs.datadoghq.com/api/#alerts)を参照してください。

<!--
- *Can you alert on a function?*

  Yes, selecting the 'Source' tab of a monitor editor (Step 1) will allow you to
  alert on custom queries and functions, similar to the JSON editor for graphs.
   -->

- *ファンクションを基にアラートを発報することはできますか？*

  **はい**。 Monitor設定の第一ステップで'Source'タブを選択し、グラフを設定する際のJSONエディタと同じように編集することにより、カスタムクエリやファンクションのアラートを設定すことができます。

<!--
  - *Can I manually resolve a monitor?*

    Yes, you can manually resolve monitors but it only makes sense in a couple cases:

      - If the monitor is in a "no data" state then resolving it will hide it from the
        triggered monitors page.
      - If the monitor is in the triggered state but has stopped reporting data then
        resolving it will hide it from the triggered monitors page.

    Otherwise the monitor will pick up the current state on the next evaluation. In other
    words, if the value is still above/below the configured threshold then the monitor may
    re-trigger upon the next evaluation (in about 60 seconds).
-->

- *手動で monitorを解除することはできますか？*

  **はい**。手動で monitorを解除することは可能です(トリガされたmonitorのStatusをResolveとセットすること)。ただし、この操作は以下のケースでのみ有効だと考えられます：

  - monitor が"no data"の状態であり、このmonitor を解除することで triggered monitors ページから排除したいケース
  - monitor がトリガされた状態だがデータの送信は停止しており、このmonitor を解除することで triggered monitors ページから排除したいケース

  そうでなければ、monitor はすぐに次の値の評価に移ります。つまり、評価している値が指定している閾値を超えているままなのであれば、Resolveとセットされた場合でもそのmonitor は次の値の評価の際(およそ60秒後)に再びトリガされることになります。

<!--
- *Can you alert on an event?*

  Not currently, but we're developing this feature. As an
  alternative you can set up an @ notification in the body of the event which
  would deliver the event via email whenever it occurred. -->

<!--
- *イベントを基にアラートを発報することはできますか？*

  現状では、**イベントを基にアラートを発報することはできません**。この機能は開発中です。
  この状況に対応するためのワークアラウンドとして、@-notification構文をイベントの本文に記述しておくことができます。この方法により、イベントが発生した際にメッセージをemailで送信することがきます。
  -->
