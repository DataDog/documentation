---
title: Downtimes
kind: documentation
autotocdepth: 2
hideguides: true
customnav: monitornav
---

<!--
## Scheduling Downtime


You may occasionally need to shut systems down or take them offline to perform maintenance or upgrades. Scheduling downtime allows you to do this without triggering monitors.
-->
## ダウンタイムをスケジュールする


メンテナンスやアップグレードなどによる計画停止のため、システムを停止したりオフラインにする必要が生じることもあるでしょう。ダウンタイムをスケジュールことで、設定済みのMonitorがアラートをトリガすることを防ぐことができます。

<!--
### Manage Downtime


Navigate to the [Manage Downtime](https://app.datadog.com/monitors#/downtime) page by highlighting the "Monitors" tab in the main menu and selecting the "Manage Downtime" link. You may also navigate to the "Manage Downtime" page from other Monitor related pages by clicking the link at the top of the page.



The Manage Downtime page will display a list of active and scheduled downtimes. Select a downtime to view more details about the host and monitors affected.

-->
### ダウンタイムの管理


[Manage Downtime](https://app.datadog.com/monitors#/downtime) のページへ移動するには、メインメニューの **Monitors** にマウスオーバーし現れるサブメニューの **Manage Downtime** を選択します。 他のMonitor設定ページの上部にある **Manage Downtime** リンクを選択し移動することも可能です。

{{< img src="monitors/downtimes/downtime-nav.png" alt="downtime-nav" >}}

Manage Downtime のページでは、アクティブなものとスケジュールされたもの、両方のダウンタイムのリストが表示されます。各ダウンタイムを選択することで、対象となるホストとMonitor設定の詳細を確認することができます。

{{< img src="monitors/downtimes/downtime-manage.png" alt="downtime-manage" >}}

<!--
### Schedule Downtime


To schedule downtime, click the "Schedule Downtime" button in the upper right.

1. Choose what to silence.

   

   You can select a specific monitor to silence, or leave this field empty to silence all monitors. You can also select a scope to constrain your downtime to a specific host, device or arbitrary tag.  Please refer to the [scope section]() of the Graphing Primer using JSON for further information about scope.

   If you choose to silence all monitors constrained by a scope, clicking the "Preview affected monitors" will show which monitors are currently affected. Any monitors within your scope that are created or edited after the downtime is schedule will also be silenced.

   Note that if a multi alert is included, it will only be silenced for systems covered by the scope. For example, if a downtime scope is set for `host:X` and a multi alert is triggered on both `host:X` and `host:Y`, Datadog will generate a monitor notification for `host:Y`, but not `host:X`.

2. Set a schedule.



   You can set a start date and time or leave the field empty to immediately start the downtime. You may also set a repeating schedule to accomimodate regularly scheduled downtimes.

3. Add an optional message to notify your team

  

   Enter a message to notify your team about this downtime. The message field allows standard [markdown formatting](http://daringfireball.net/projects/markdown/syntax) as well as Datadog's @-notification syntax. The "Notify your team" field allows you to specify team members or send the message to a service [integration](https://app.datadoghq.com/account/settings#integrations).
-->
### ダウンタイムのスケジュール設定


ダウンタイムをスケジュールするには、画面上部右側の"Schedule Downtime"を選択します。

1. 停止するMonitorを選択する

   {{< img src="monitors/downtimes/downtime-silence.png" alt="downtime-silence" >}}

   停止したい特定のMonitorを指定するか、ここでは特定のMonitorは指定せずすべてのMonitorを停止の対象とします。続いて、ダウンタイムの対象を限定するために、特定のホスト、デバイス、あるいは任意のタグによって範囲(スコープ)の設定をします。範囲(スコープ)の設定については、グラフ表示入門のページのJSONの使用方法、[対象範囲の指定(scope)](/ja/graphing/miscellaneous/graphingjson/)も併せて参照してください。

   すべてのMonitorを停止の対象としたうえで範囲(スコープ)の設定によって対象を限定するような場合には、"Preview affected monitors" (対象となるMonitorをプレビューする)をクリックすることで、現在対象となっているMonitorのリストが表示されます。作成時に停止の対象としたMonitorの範囲(スコープ)は、ダウンタイムのスケジュール設定後でも修正することができます。

   指定するMonitorにMulti Alartを含むような場合は、範囲(スコープ)の設定によって限定した対象のみが停止されることに注意して下さい。例えばダウンタイムの範囲(スコープ)が`host:X`にセットされていて、あるMulti Alartは`host:X`と`host:Y`両方についてアラートを発報する場合, Datadogは引き続き`host:Y`についての通知は行います。

2. スケジュールをセットする

   {{< img src="monitors/downtimes/downtime-schedule.png" alt="downtime-schedule" >}}

   ダウンタイムをスケジュールする日時をここで設定します。あるいは、空欄のままにしてダウンタイムを即刻開始することもできます。また、定期的な計画停止のために繰り返しのスケジュールを設定することも可能です。

3. チームに通知するためのメッセージ本文を追加で設定する

   {{< img src="monitors/downtimes/downtime-notify.png" alt="downtime-notify" >}}

   ダウンタイム設定についてチームに通知するメッセージを入力します。このフィールドには、Datadogの@-notification構文の他に標準的な[markdownフォーマット](http://daringfireball.net/projects/markdown/syntax)でも記述することができます。"Notify your team"フィールドでは、メッセージを送りたいチームメンバー個人あるいは特定のサービス [integtration](https://app.datadoghq.com/account/settings#integrations) (インストール済みのインテグレーション)を選択することができます。