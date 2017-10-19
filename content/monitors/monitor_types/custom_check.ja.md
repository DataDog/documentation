---
title: カスタムチェックを対象にしたMonitor
kind: documentation
autotocdepth: 3
hideguides: true
customnav: monitortypenav
description: "Monitor status of arbitrary custom checks"
---

<!--
### Custom Monitors

Custom monitors encompass any service checks that are not reported by one of the
out-of-the-box integrations included with the Agent.

Refer to the [Guide to Agent Checks]for detailed
information on writing your own checks that send metrics, events,
or service checks.
-->

{{< img src="monitors/monitor_types/custom_check/custom_monitor.png" >}}

カスタムチェックを対象にしたMonitorでは、独自に作成したAgent Checkによって収集しているサービスチェックのステータスを監視します。

メトリクスやイベント、あるいはサービスチェックを送信する独自のCheckの作成方法については、[「Agent Checkの書き方」](/ja/agent/agent_checks/)を参照してください。


<!--
1. Select your **custom check**.

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

4. **通知のオプション**を設定します。通知先の設定に関しては、このガイドの[”通知先の設定”](#通知先の設定)の項目を参照してください。