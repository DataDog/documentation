---
title: プロセスを対象にしたMonitor
kind: documentation
autotocdepth: 3
hideguides: true
customnav: monitortypenav
description: "Check if a process is running on a host"
---
<!--
### Process Monitors


A process monitor will watch the status produced by the `process.up` service
check reported by the check in the Agent. At the Agent level you can configure
thresholds based on the number of matching processes.

Read more about configuration on the [Process Check](/integrations/process/)
page.

For each process, a single service check status will be produced. Through this
creation interface, you can choose which of those checks to monitor and at what
point they should notify.
-->

{{< img src="monitors/monitor_types/process/process_monitor.png" >}}

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

4. **通知のオプション**を設定します。通知先の設定に関しては、このドキュメントの[”通知先の設定”](#通知先の設定)の項目を参照してください。