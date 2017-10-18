---
title: ネットワークを対象にしたMonitor
kind: documentation
autotocdepth: 3
hideguides: true
customnav: monitortypenav
description: "Check the status of TCP/HTTP endpoints"
---

<!--
### Network Monitors


{{< img src="guides/monitor/network_monitor.png" >}}

Network monitors cover the TCP and HTTP checks available in the Agent. Read
the [guide to network checks](/integrations/tcp_check) for details on Agent
configuration.
-->

{{< img src="monitors/monitor_types/network/network_monitor.png" >}}

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

4. **通知のオプション**を設定します。通知先の設定に関しては、このドキュメントの[”通知先の設定”](#通知先の設定)の項目を参照してください。

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

4. **通知のオプション**を設定します。通知先の設定に関しては、このドキュメントの[”通知先の設定”](#通知先の設定)の項目を参照してください。
