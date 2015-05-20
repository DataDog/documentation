---
last_modified: 2015/05/08
translation_status: complete
language: ja
title: Monitor機能の設定ガイド
kind: guide
listorder: 9
sidebar:
  nav:
    - header: Monitorkの設定ガイド
    - text: 用語集
      href: "#glossary"
    - text: Hosts-Monitor
      href: "#host"
    - text: Metrics-Monitor
      href: "#metric"
    - text: Integrations-Monitor
      href: "#integration"
    - text: Network-Monitor
      href: "#network"
    - text: Custom Checks-Monitor
      href: "#custom"
    - text: 通知について
      href: "#notification"
    - text: Monitorに関するFAQs
      href: "#faqs"
---

<!-- Monitoring all of your infrastructure in one place wouldn't be complete without
the ability to know when critical changes are occurring. Datadog gives you the
ability to create monitors that will actively check metrics, integration
availability, network endpoints and more. -->

インフラ全体を一箇所で監視しようとする場合、そのインフラが危機的な状況になっていることを検知する方法を確立するのは重要な作業です。
Datadogでは、能動的にメトリクス, インテグレーション, ネットワークの接続状態, その他を監視してくれるMonitor機能を設定することができます。


<!-- Once a monitor is created, you will be notified when the its conditions are met.
You can notify team members via email, 3rd party services (e.g. Pagerduty or
Hipchat) or other custom endpoints via webhooks. -->

一度Monitor機能を設定しておけば、条件が満たされた時に通知を受けることができます。
電子メールでチームメンバーに通知することもでき、サードパーティのサービス（例えばPagerdutyまたは
Hipchat）やwebhooksを使い、他のサービスと連携して通知を送信することもできます。


<!-- Triggered monitors will appear in the event stream, allowing collaboration
around active issues in your applications or infrastructure. Datadog provides a
high-level view of open issues on the
[Triggered Monitors](https://app.datadoghq.com/monitors/triggered)
page as well as general monitor management on the
[Manage Monitors](https://app.datadoghq.com/monitors) page. -->

通知を送信したMonitorはイベントストリームに表示され、そのアプリケーションやインフラの問題解決に向けたコラボレーションができるようになります。Datadogの[Triggered Monitors](https://app.datadoghq.com/monitors/triggered)のページには、通知済み状態のMonitorの項目がリスト表示されます。[Manage Monitors](https://app.datadoghq.com/monitors)のページには全てのMonitorが表示され、それらを管理することができるように成っています。


## 用語集
{: #glossary}

<!-- Here is a quick overview of the different terms used in this guide.

- **Status**: Each check run submits a status of OK, WARNING or CRITICAL.
- **Check**: Emits one more more statuses.
- **Monitor**: Sends notifications based on a sequence of check statuses, metric
  threshold or other alerting conditions.
- **Monitor type**: host-, metric-, integration-, network-based and custom. See
  side navigation to drill into a specific type. -->

以下は、このガイドで使用している用語の簡単な概要になります。

- **Status**: 各Agent Checkは、ホスト上で定期的に実行されOK, WARNING, CRITICALのステータスをDatadogに送信します。
- **Check**: Agent Checkのことで、複数のステータスを送信します。
- **Monitor**: Agent Checkのステータスやメトリクスの閾値の確認手順、その他のアラート条件を元に通知を送信します。
- **Monitorタイプ**: host-, metric-, integration-, network-based, customがあります。 特定のMonitorタイプの詳細に関しては、サイドバーからそれぞれのタイプの項目を確認してください。


<!-- ## Creating a Monitor {#create} -->

## 新しいMonitorの作成 {#create}

<!-- Nagivate to the [Create Monitors](https://app.datadoghq.com/monitors/create)
page by highlighting the "Monitors" tab in the top menu and selecting the
"Create Monitors" sub-tab.  You will be presented with a list of monitor types
on the left. This guide will walk through the configuration of each type. -->

<!-- [New Monitor](https://app.datadoghq.com/monitors/create)のページへ移動するには、トップメニューの`Monitors`タブからドロップダウンメニューの`New Monitor`を選択します。ページが表示されると各Monitorタイプが左側に一覧で表示されます。このガイドでは、これらのMonitorタイプの設定方法を解説していきます。 -->

[Create Monitors](https://app.datadoghq.com/monitors/create)のページへ移動するには、トップメニューの`Monitors`タブからドロップダウンメニューの`Create Monitors`を選択します。ページが表示されると各Monitorタイプが左側に一覧で表示されます。このガイドでは、これらのMonitorタイプの設定方法を解説していきます。



![nav](/static/images/monitor/nav.png)

<!-- ## Host Monitors {#host} -->

## ホストを対象にしたMonitor {#host}

<!-- *Requires Datadog Agent version >= 5.0.0.* -->

*Datadog Agent バージョン 5.0.0 以上が必要です。*


![host monitor](/static/images/monitor/host_monitor.png)

<!-- Every Datadog Agent collection reports a heartbeat called `datadog.agent.up`
with a status `UP`. You can monitor this heartbeat across one or more hosts. -->

Datadog Agentが起動していると`datadog.agent.up`と呼ばれるハートビート信号を
`UP`というステータスで定期的に送信します。
このハートビート信号の状態をMonitor対象に追加することで、Datadog Agentやホストの死活状態が把握できます。

<!-- 1. Select your **host by name or tag(s)**. Providing a tag will monitor every host that has that tag or tag combination.

2. Select the **no-data timeframe**. If the heartbeat stops reporting for more than the number of minutes you have selected, then you will get notified.

3. Configure your **notification options** Refer to the [Notifications](#notifications) section of this guide for a detailed walkthrough of the common notification options. -->

1. 項目①では、**ホスト名かタグ**の単一指定か組み合わせ指定ができます。タグを選択した場合は、そのタグ(タグの組み合わせ)が付与されているホストが監視対象になります。

2. 項目②では、`Check Alert`か`Cluster Alert`を選択します。`Cluster Alert`の特有の設定に関しては、次を参照してください。その後、**Notify if data is missing for more than**の項目で、分単位で時間を設定します。ここで設定した時間を超えてハートビート信号が受信できなかった場合に、通知が送信されます。

3. 項目③④で、通知の設定をします。尚、通知の設定に関しては、このガイドの[”通知について”](#notifications)の項目を参照してください。


<!-- ## Metric Monitors {#metric} -->

## メトリクスを対象にしたMonitor {#metric}

<!-- 1. Select the metric and scope you want to monitor. -->

1. メトリクスとそのメトリクスを監視する範囲(スコープ)を設定します。
  ![metric scope](/static/images/monitor/metric_scope.png)

    <!-- You can create a monitor on any metrics that you are currently sending to
    Datadog. The standard scoping rules apply here. Please refer to the
    [scope section](/graphing/#scope) of the graphing primer for
    further information. -->

    Datadogに送信している全てのメトリクスを基にMonitor機能を作成することができます。
    この項目では、グラフ表示に使っている標準的な検索対象範囲(scope)の規則が適用されます。
    この規則の詳細に関しては、グラフ表示入門のページの[検索対象範囲(scope)](/ja/graphing/#scope)を参照してください。

    <!-- 2. Select the alert type. -->

2. アラートのタイプを選択します。
    ![alert type](/static/images/monitor/alert_type.png)

    <!-- A **threshold alert** will compare the value in the selected
    timeframe against a given threshold. There are additional options available
    in the alerting conditions section. This is the standard alert case where
    you know what sort values are unexpected. -->

    **threshold alert**は、時間枠内のメトリクス値と指定した閾値を比較します。更に、アラート条件セクションには、追加で設定可能なオプションもあります。このタイプは一般的なアラートのケースで、正常な範囲か値が事前に分かっている場合に使用します。


    <!-- A **change alert** will look at a recent data point and
    determine the change or % change between that value and a value some minutes
    ago. The compared data points are 1-minute averages and <em>not</em> a
    single point. -->

    **change alert**は、最近のデータポイントの値と数分前の値の変化量または変化率を設定値と比較します。
    比較しているデータポイントの値は、1分間平均値です。**単一点の値ではありません**ので注意してください。


    <!-- This sort of alert is useful to track fast spikes or drops in a metric
    when you might not have an exact "unexpected" threshold. Note: the
    calculated value is not the absolute value - meaning it will be negative for
    a downward change. -->

    この種アラートは、閾値を超えて発生するメトリクスのスパイクや急速なドロップを追跡するのに有効です。
    注: このアラートの為の計算値は絶対値ではありません。従って下に向かう変化は、マイナス値になります。


    <!-- 3. Select the alert grouping. -->

3. アラートグループを選択します。
    ![alert grouping](/static/images/monitor/alert_grouping.png)

    <!-- A **simple alert** aggregates over all reporting sources. You will get one
    alert when the aggregated value meets the conditions set below. This works
    best to monitor a metric from a single host, like `avg` of
    `system.cpu.iowait` over `host:bits`, or for an aggregate metric across many
    hosts like `sum` of `nginx.bytes.net` over `region:us-east`. -->

    **simple alert**は、全てのレポートソースをまとめて監視します。"Set alert conditions"のセクションで設定した条件に合致した場合、アラートを1回送信します。この設定は、単一ホストから送信されてくるメトリクスを監視するようなケースに最適です。例えば、"`avg` of `system.cpu.iowait` over `host:bits`"のような設定をしてる場合です。更に、"`sum` of `nginx.bytes.net` over `region:us-east`"のように複数のホストの値を集計して単一メトリクスとして監視したい場合にも有効です。


    <!-- A **multi alert** applies the alert to each source, according to your group parameters.  to alert on disk space you might group by host and device, creating the query: avg of system.disk.in_use over * by host,device.  This will trigger a separate alert for each device on each host that is running out of space.  Note: Anything reporting this metric that does not have the chosen groups will be ignored during alert evaluation. -->

    **multi alert**は、グループのパラメータに基づいて、アラートを通知します。ディスクスペースに関するアラートを通知する場合、ホスト上のデバイス単位でグループ化しておくと良いでしょう。例えば、"`avg` of `system.disk.in_use` over `*`"というメトリクスの場合、Multi Alertのグループを`host,device`と設定します。
    このように設定することにより、各ホストの各デバイス毎にディスクスペースが無くなった際のアラートを通知することができるようになります。注: この設定によりグループに属していないと判定されたメトリクスは、アラートの判定プロセス際に無視されます。


    <!-- 4. {:#metric-conditions} Select the alert conditions -->

4. {:#metric-conditions} アラート条件の設定します。

    <!-- - The **threshold** options vary slightly depending on what alert type you
      have chosen. For either case, you input a threshold and comparison type
      based on your metric. As you change your threshold, you will see the graph
      update with a marker showing the cutoff point. -->

      アラートタイプによって、選択できる**threshold**オプションは若干異なります。どちらのタイプでも、閾値と比較タイプを設定します。閾値を変更する毎に、グラフ上のカットオフポイントを示すマーカーの位置が更新されて表示されます。


      ![metric threshold](/static/images/monitor/metric_threshold.png)

      <!-- Note that you can use formatted values in this input based on the metric itself. For example, if you are monitoring `system.disk.used`, you can give a threshold of `20GB`. -->

      メトリクスの閾値を設定する際、その値に単位つけて入力することができます。例えば、`system.disk.used`を監視する場合、`20GB`を閾値として設定することができます。


      <!-- For a **threshold alert** you will be able to chose a *time aggregation* of the data. The alerting engine will generate a single series and perform selected aggregation. -->

      **閾値でアラート通知**する場合は、*時間内に含まれるデータの集計方法*の決めるオプションを選択することができます。アラートエンジンは、別の時系列データを生成し選択された集計を実行します。

      <!-- Let's look at the details of each option: -->

      それぞれのオプションの詳細は以下のようになります:

    <!-- - *on average*: The series will be averaged to produce a single
      value that will be checked against the threshold.
    - *at least once*: If any single value in the generated series crosses
      the threshold then an alert will be triggered.
    - *at all times*: If every point in the generated series is outside the
      threshold then an alert will be triggered.
    - *in total*: If the summation of every point in the series is outside
      the threshold then an alert will be triggered. -->

      - *on average*(平均): 時系列データには、平均化の処理を行い単一の値を導きだします。その後、閾値と比較してチェックします。
      - *at least once*(最低1回): 生成された時系列データ内のどれかの値が閾値を超えている場合、アラートが発報されます。
      - *at all times*(常時): 生成された時系列データの全てのポイントが閾値外である場合に、アラートが発報されます。
      - *in total*(合計)： 時系列データの全てのポイントの合計が閾値の外にある場合、アラートが発報されます。


      <!-- Note the *on average* and *at all times* aggregations *require* a full
      window of data in the final series. This does *not* mean that each series
      must be full but that there shouldn't be a gap of more than 1 minute
      across all aggregated series. In other words, we recommend using *at least
      once* or *in total* for metrics with > 1 minute interval. -->

      注意: *on average*と*at all times*の集計は、最終的に受信したデータが揃っていることを*必要条件*としています。このことは、全ての時系列データが完全に揃っていることを要求しているわけではなく、集計に使うデータのギャップが１分以上空いていないことを要求しています。言い換えれば、1分以上間隔の空くメトリクスに関しては、*at least once*または*in total*を使用することをお勧めします。


      <!-- 5. You can optionally **notify on no data** after a configurable timeframe. At
      the minimum, your chosen timeframe must be greater than 2x the alerting
      window. For example, if you are alerting over the last 5 minutes then you
      would need to wait at least 10 minutes before notifying on missing data. -->

5. 必要に応じて、一定時間以上データが届かない場合**notify on no data**(オプション)を設定することができます。このオプションを設定する時間枠は、先の条件設定で設定した時間枠の2倍以上の時間枠である必要があります。例えば、過去5分のメトリクスを基にアラートを設定しているなら、データが届いていないことを通知する前に、少なくとも10分間以上の時間を設定する必要があります。


    <!-- 6. You can opt to **automatically resolve the monitor from a triggered
   state**. In general you'll want to leave this option off as you only want
   an alert to be resolved when it's fixed. -->

6. **アラートが発報している状態を自動的に解除する**オプションを選択することができます。問題が解決したときのみアラートが解除されるのが望ましいため、一般的にこのオプションはOFFにしておくことをお勧めします。

   <!-- This most common use-case for this option is when you have very sparse
   counters, e.g. for errors. When errors stop occuring the metric will stop
   reporting. This means the monitor will not resolve because there are not
   anymore values to trigger a resolution. -->

   このオプションの最も一般的なユースケースは、非常に時間の離れたエラーのカウンターです。エラーが発生しなくなると、Datadogへのメトリクスのリポーティングも止まります。一度発報状態になったアラートを解除するためのデータが届いていないので、そのアラートを解除するために、自動での解除が必要になります。


   <!-- 7. Configure your **notification options** Refer to the
   [Notifications](#notifications) section of this guide for a detailed
   walkthrough of the common notification options. -->

7. 通知の設定をします。尚、通知の設定に関しては、このガイドの[”通知について”](#notifications)の項目を参照してください。


<!-- ## Integration Monitors {#integration} -->

## インテグレーションを対象にしたMonitor {#integration}

![es status](/static/images/monitor/es_status.png)

<!-- On the integration tab you will see a list of your installed integrations. Upon
selection, you can choose to monitor either a "Status" or a "Metric". -->

インテグレーションタブをクリックすると、既にインストールされているインテグレーションのタイルがタブの下に表示されます。そのタイルを選択すると`Status`と`Metric`というMonitorを選択できるようになります。

<!-- - Choosing **Integration Status** will present you with one or more service
  checks for each integration. Please refer to the
  [custom monitors](#check-alerting) section for details on the
  available options. -->

- **Monitor Status** を選択すると、そのインテグレーション用のサービスチェックを１つ以上提示します。設定で利用可能なオプションの詳細については、[カスタムモニタ](#check-alerting)のセクションを参照してください。

<!-- - Choosing **Integration Metric** will provide a familiar interface used for a
  interface used for a Metric Monitor. You will be able to choose from any of
  the metrics provided by this integration. Please refer to the
  [alert conditions](#metric-conditions) section for details on the available
  options. -->

- **Monitor Metric**を選択すると、メトリックMonitorと同等の設定インターフェイスが表示されます。この設定画面の`Select a metrics`の項目では、インテグレーションが収集している全てのメトリクスから選択することができます。項目②の"Set alert conditions"のオプションに関しては、先の"メトリクスを対象にしたMonitor"のセクションの[3.アラート条件の設定](#metric-conditions)を参照してください。


<!-- ## Process Monitors {#process} -->

## プロセスを対象にしたMonitor {#process}

![process monitor](/static/images/monitor/process_monitor.png)

<!-- A process monitor will watch the status produced by the `process.up` service
check reported by the check in the Agent. At the Agent level you can configure
thresholds based on the number of matching processes. -->

プロセスを対象にしたMonitorは、Datadog Agentのサービスチェックによってレポートされる`process.up`の状態を監視しています。

<!-- Read more about configuration on the [Process Check](/integrations/process/)
page. -->

設定の詳細については、[Process チェック](/ja/integrations/process/)のページをお読みください。

<!-- For each process, a single service check status will be produced. Through this
creation interface, you can choose which of those checks to monitor and at what
point they should notify. -->

各プロセスに対しサービスチェックのステータスが生成されます。プロセスMonitorの作成画面を介して、どのサービスチェックのステータスを監視し、どのような状態になったときに通知するか設定することができます。

<!-- 1. Pick the **process** to monitor. You will see the names configured in any
   Agent with an active process check.
2. Pick the **hosts by name or tag(s)**. You will only see hosts or tags that
  are reporting a status for the selected process.
3. Select **alerting options**. Please refer to the
 [custom monitors](#check-alerting) section for details on the available options.
4. Configure your **notification options** Refer to the
[Notifications](#notifications) section of this guide for a detailed
walkthrough of the common notification options. -->

1. 監視したい**process**を選択します。Datadog Agentの設定ファイルで有効にしているプロセスチェックの名前が表示されます。
2.  **ホスト名またはタグ（複数可）**を選択します。先に選択したプロセスのステータス情報に基づいてホスト名とタグが表示されます。
3. **アラートのオプション**を選択します。利用可能なオプションの詳細については、[custom monitors](#check-alerting)のセクションを参照してください。
4. **通知のオプション**を設定します。尚、通知の設定に関しては、このガイドの[”通知について”](#notifications)の項目を参照してください。


<!-- ## Network Monitors {#network} -->

## ネットワークを対象にしたMonitor {#network}

![network monitor](/static/images/monitor/network_monitor.png)

<!-- Network monitors cover the TCP and HTTP checks available in the Agent. Read
the [guide to network checks](/guides/network_checks) for details on Agent
configuration. -->

ネットワークMonitorは、Datadog Agentで提供しているTCPおよびHTTPのチェックの情報を監視します。Datadog Agentでネットワークチェックを有効にする方法は、[guide to network checks](/ja/guides/network_checks) を参照してください。


<!-- **Network Status** -->
**ネットワークステータス**

<!-- 1. Choose a **network check**. You will be able to choose from all HTTP and TCP
   checks being submitted by your Agents.
2. Pick **hosts by name or tag(s)**. You will only see hosts or tags reporting
   the check you have chosen.
3. Select **alerting options**. Please refer to the
   [custom monitors](#check-alerting) section for details on the available
   options.
4. Configure your **notification options** Refer to the
   [Notifications](#notifications) section of this guide for a detailed
   walkthrough of the common notification options. -->

1. **ネットワークチェック**を指定します。Datadog Agentによりリポーティングされた全てのHTTPとTCPチェックから選択することができます。
2. 名前またはタグ（複数可）でホストを指定します。先の**ネットワークチェック**で選択した内容に基づいてホスト名とタグが表示されます。
3. **アラートオプション**を指定します。利用可能なオプションの詳細については、[カスタムチェックを対象にしたMonitor](#check-alerting)の同セクションを参照してください。
4. **通知のオプション**を設定します。尚、通知の設定に関しては、このガイドの[”通知について”](#notifications)の項目を参照してください。


<!-- **Network Metric** -->
**ネットワークメトリクス**

<!-- 1. Choose a **network metric**. You will be able to choose either the TCP or
   HTTP response time metric.
2. Pick **hosts by name or tag(s)**. You will only see hosts or tags reporting
   the metric you have chosen.
3. Select **alerting options**. Please refer to the
   [alert-conditions](#metric-conditions) section for details on the available
   options.
4. Configure your **notification options** Refer to the
   [Notifications](#notifications) section of this guide for a detailed
   walkthrough of the common notification options. -->

 1. **ネットワークメトリクス**を指定します。Datadog Agentによりレポーティングされた全てのHTTPとTCPの応答時間メトリクスから選択することができます。
 2. 名前またはタグ（複数可）でホストを指定します。先の**ネットワークメトリクス**で選択した内容に基づいてホスト名とタグが表示されます。
 3. **アラートオプション**を指定します。利用可能なオプションの詳細については、[カスタムチェックを対象にしたMonitor](#check-alerting)の同セクションを参照してください。
 4. **通知のオプション**を設定します。尚、通知の設定に関しては、このガイドの[”通知について”](#notifications)の項目を参照してください。


<!-- ## Custom Monitors {#custom} -->

## カスタムチェックを対象にしたMonitor {#custom}

![custom monitor](/static/images/monitor/custom_monitor.png)

<!-- Custom monitors encompass any service checks that are not reported by one of the
out-of-the-box integrations included with the Agent. -->

カスタムMonitorは、独自に作成したAgent Checkによって収集しているサービスチェックのステータスの監視に使用します。

<!-- Refer to the [Guide to Agent Checks](/guides/agent_checks/) for detailed
information on writing your own checks that send metrics, events,
or service checks. -->

独自のAgent Checkを使ってメトリクス、イベント、サービスチェックを送信する方法については、[「Agent Checkの書き方」](/ja/guides/agent_checks/)を参照してください。


<!-- 1. Select your **service check**.

2. Select **host or tags** that you would like to monitor. The check will run
   for every unique set of tags from all monitored hosts. For example, the
   `Nginx` service check reports one status per `{host,port}`. So if you have
   multiple servers running on a single host, then each one will alert separately
   in the case of failure.

3. {: #check-alerting} Select your **alert options**.

   While each check run will send a status of either CRITICAL, WARNING or OK,
   you can choose at what consecutive conditions to cause a state change and a
   notification. For example, you might want to know immediately when your check
   fails and only have it recover if it stays that way. In this case you might
   choose to notify on 1 critical status, 1 warning status and 4 OK statuses.

   You can optionally **notify on no data** after a configurable timeframe. You
   must choose at least 2 minutes for your timeframe.

4. Configure your **notification options** Refer to the
   [Notifications](#notifications) section of this guide for a detailed
   walkthrough of the common notification options. -->

1. **サービスチェック**を選択します。

2. 監視したい**ホスト名やタグ（複数可）**を選択します。
   アラートの為の確認は、監視対象として指定されたホストから送られてくるタグやタグの組み合わせに対して実行されます。例えば、Nginxのサービスチェックが、`{host,port}`毎にステータスを報告しているとします。そしてもしも、単一ホスト上で複数のサーバが稼働している状態であれば、それぞれのサーバの障害は個別に通知されることになります。

3. {: #check-alerting} **アラートオプション** を選択します。

   各サービスチェックが実行されると、CRITICAL、WARNING、OKの何れかのステータスを送信します。`Trigger the alert after selected consecutive failures:`の項目でステータス変更とアラートを通知するための連続発生回数を指定します。例えば、カスタムMonitorのチェックが失敗した場合には直ちに知りたいが、OK状態が続くまではリカバー状態にはなってほしくないとします。このようなケースではオプションを、1回のCritical、1回のWarning、4回のOKと設定します。

   必要に応じて、一定時間以上データが届かない場合のnotify on no data(オプション)を設定することができます。このオプションを設定する時間枠は、先の条件設定で設定した時間枠の2倍以上の時間枠である必要があります。

4. **通知のオプション**を設定します。尚、通知の設定に関しては、このガイドの[”通知について”](#notifications)の項目を参照してください。


<!-- ## Monitor Notifications {#notification} -->

## 通知について {#notifications}

<!-- Notifications are a key component of any monitor. You want to make sure the
right people get notified so the problem can be resolved as soon as possible. -->

通知は、監視において非常に重要な要素です。可能な限り素早く障害を解決するためには、適切な人材が通知を受けるように設定する必要があります。


![notification](/static/images/monitor/notification.png)

<!-- 1. Give your monitor a **title**. It is often useful to use a succinct
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

3. Optionally enable **monitor renotification**. This option is useful to remind
   your team that a problem is not solved until the monitor is marked as
   resolved. If enabled, you can configure an escalation message to be sent
   anytime the monitor renotifies. The original message will be included as
   well. -->

1. Monitorの通知に**タイトル**を付けましょう。多くの場合、簡潔な説明を使用することが重要です。なぜならばチームメンバーが、何が起こっているかを直ぐに理解することができるからです。

2. Monitorの通知本文を入力します。このフィールドには、Datadogの@-notification構文の他に標準的な[markdownフォーマット](http://daringfireball.net/projects/markdown/syntax)も資料にすることができます。更に、`@their-email`構文を使うことにより、Datadogに登録していないメンバーにもメールによって通知を送信することができます。

   Monitorの通知本文の一般的なユースケースは、障害を解決するための詳細な手順を記述することです。例えばデータベースを監視している場合には、セカンダリーとしてスタンバイしているノードのフェールオーバーの手順を記しておくと良いでしょう。全てのケースにおいて、メッセージ本文には可能な限り多くの情報を記すように心がけましょう。

3. 必要に応じて**Monitor renotification**を有効にしてください。このオプションは、発報しているMonitorに解決の旨のチェックマークがつけられまで、チームメンバーに注意喚起を促し続けるためには良い手段です。このオプションを有効にすると、Monitorが再通知する際、オリジナルのメッセージに加えて送信するエスカレーションメッセージを設定することができます。


<!-- ### Message template variables -->

### 通知内で使うことのできるテンプレート変数

<!-- Message template variables can be used to customize your monitor notifications.
This feature is supported in all monitor types. There are two primary use cases
for template variables: 1) displaying a different message depending on the
notification type (e.g. triggered, recovered, no data) and 2) incorporating the
triggering scope into the message of multi alerts. -->

Monitorの通知の内容を状況に応じて書き換えるために変数(template variables)を使うことができます。この機能は全てのMonitorタイプで使うことができます。

変数(template variables)には、主に2つのユースケースが考えられます。

1. 通知の種類に応じて異なるメッセージを表示したい場合(e.g. triggered, recovered, no data)
2. `Multi Alert`で、通知本文に障害範囲の(グループ)情報を組み込みたい場合

それぞれの主要ユースケースについて解説します。

  <!-- 1. **Conditional variables for different notification types**: You can have a
   monitor event display a different message depending on whether the event is a
   trigger, recover, or no data notification. These variables use simple if-else
   logic with the following syntax: -->

1. **通知タイプの違いに基づいた条件変数**: Monitorによって検知されたイベント(e.g. triggered, recovered, no data)によって異なった通知本文を表示することができます。これらの条件変数では、次のような基本的なif-else構文を使っています:


   ![conditional variables](/static/images/monitor/conditionalvars.png)

   <!-- Here is an example of how you can set it up in the editor: -->
   次が、通知本文の記述の例です:

   ![conditional editor](/static/images/monitor/templateconditionaleditor.png)


   <!-- The corresponding trigger event notification will look like this: -->
   実際に送信されたアラート通知文は、次のようになります:

   ![conditional trigger](/static/images/monitor/templateconditionaltrigger.png)


   <!-- and the recovery notification: -->
   リカバーした際の通知文は、次のようになります:

   ![conditional recovery](/static/images/monitor/templateconditionalrecover.png)


   <!-- The conditional variables available are `is_alert`, `is_recovery`, and `is_no_data`.
   These can also be seen in the "Use message template variables" help box in
   Step 3 of the monitor editor.-->

   使用可能な条件変数は`is_alert`、` is_recovery`、`is_no_data`です。
   これら条件変数の解説は、第3ステップ"Say what's happening"の"Use message template variables"をクリックすることで見ることができます。


   <!-- 2. **Tag variables for multi alerts**: When your monitor is a multi alert, instead
   of having a generic message (and finding the triggering tag scope in the alert
   query definition), a variable can be used in the message for explicitly
   identifying the triggering scope. -->

2. **Multi Alertのタグ変数**: Monitorを設定する際に`Multi Alert`を利用した場合、通知本文に変数を適用し、明示的にアラートを通知している範囲を表示するようにします。

   <!-- Here is an example of how you can use template variables for a multi alert: -->
   次が、`Multi Alert`でtemplate variablesを使った例です:

   ![template var editor](/static/images/monitor/templatevareditor.png)


   <!-- and the corresponding event notification: -->
   実際に送信されたアラート通知文は、次のようになります:

   ![template var trigger](/static/images/monitor/templatevar.png)


   <!-- The tag template variables available depend on the tag group selected in Step 1
   of the monitor editor. The possible options will automatically populate at the
   bottom of the "Use message template variables" help box in Step 3 of the editor.
   These variables can also be used in the monitor titles (names), but note that
   the variables are only populated in the text of Datadog child events (not the
   parent, which displays an aggregation summary). -->

   利用可能なタグ変数は、第1ステップで選択したタググループに依存します。利用可能なタグ変数のオプションは自動的に選別され、第3ステップの"Use message template variables"ヘルプボックスの内に表示されます。またこれらのタグ変数は、Monitorのタイトル（名前）で使用することもできます。


<!-- ## Monitor FAQs {#faqs} -->

## Monitorに関するFAQs {#faqs}

<!-- - *Can I manage my monitors programatically?*

  Yes. Refer to the [Datadog API docs](http://docs.datadoghq.com/api/#alerts)
  for detailed information on managing monitors through the API using the
  available libraries or cURL. -->

- *Monitorは、プログラム的に管理することはできますか？*

  **はい**。各プログラミング言語毎ライブラリやURLを使ってMonitorをする方法に関しては、[Datadog APIドキュメント](http://docs.datadoghq.com/api/#alerts)を参照してください。


<!-- - *Can you alert on a function?*

  Yes, selecting the 'Source' tab of a monitor editor (Step 1) will allow you to
  alert on custom queries and functions, similar to the JSON editor for graphs. -->

- *ファンクションを基にアラートを発報することはできますか？*

  **はい**。Monitor設定の第一ステップで'Source'タブを選択し、グラフを設定する際のJSONエディタと同じように編集することにより、カスタムクエリやファンクションのアラートを設定すことができます。


<!-- - *Can you alert on an event?*

  Not currently, but we're developing this feature. As an
  alternative you can set up an @ notification in the body of the event which
  would deliver the event via email whenever it occurred. -->

- *イベントを基にアラートを発報することはできますか？*

  現状では、**イベントを基にアラートを発報することはできません**。この機能は開発中です。
  この状況に対応するためのワークアラウンドとして、@-notification構文をイベントの本文に記述しておくことができます。この方法により、イベントが発生した際にメッセージをemailで送信することがきます。
