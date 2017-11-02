---
title: 通知先の設定
kind: documentation
autotocdepth: 2
customnav: monitornav
---

<!--
## Monitor Notifications


Notifications are a key component of any monitor. You want to make sure the
right people get notified so the problem can be resolved as soon as possible.
-->

## 通知先の設定

通知は、監視において非常に重要な要素です。可能な限り素早く障害を解決するためには、適切な人材が通知を受けるように設定する必要があります。

{{< img src="monitors/notifications/notification.png" alt="notification" responsive="true">}}


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



    Here is an example of how you can set it up in the editor:

    


    The corresponding trigger event notification will look like this:

    


    and the recovery notification:

    


    The conditional variables available are `is_alert`, `is_alert_recovery`,
    `is_warning`, `is_warning_recovery`, `is_recovery`, and `is_no_data`.
    These can also be seen in the "Use message template variables" help box in
    Step 3 of the monitor editor.

2. **Tag variables for multi alerts**: When your monitor is a multi alert, instead
    of having a generic message (and finding the triggering tag scope in the alert
    query definition), a variable can be used in the message for explicitly
    identifying the triggering scope.

    Here is an example of how you can use template variables for a multi alert:

   


    and the corresponding event notification:

   

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


-->

1. **通知タイプの違いに基づいた条件変数**: Monitorによって検知されたイベント(triggered, warn, recovered, no dataなど)によって異なった通知本文を表示することができます。これらの条件変数では、次のような基本的なif-else構文を使っています:

    {{< img src="monitors/notifications/conditionalvars.png" alt="conditional vars" responsive="true">}}

    次が、通知本文の記述の例です:

    {{< img src="monitors/notifications/templateconditionaleditor.png" alt="template conditional editor" responsive="true">}}


    実際に送信されたアラート通知文は、次のようになります:

    {{< img src="monitors/notifications/templateconditionaltrigger.png" alt="template conditional trigger" responsive="true">}}


    リカバーした際の通知文は、次のようになります:

    {{< img src="monitors/notifications/templateconditionalrecover.png" alt="template conditional recover" responsive="true">}}


    使用可能な条件変数は `is_alert`, `is_alert_recovery`,
    `is_warning`, `is_warning_recovery`, `is_recovery`, そして `is_no_data` です。
    これら条件変数の解説は、第3ステップ"Say what's happening"の"Use message template variables"をクリックすることで見ることができます。

2. **Multi Alertのためのタグ変数**: 設定しているMonitorが`Multi Alert`の場合(タグによってグループが指定されている場合)は、通知のタイトルや本文にタグ変数を適用し、アラート発報の範囲(スコープ)を明示することができます。

    次が、`Multi Alert`でtemplate variables(タグ変数)を使った例です:

    {{< img src="monitors/notifications/templatevareditor.png" alt="template var editor" responsive="true" >}}


    実際に送信されたアラート通知文は、次のようになります:

    {{< img src="monitors/notifications/templatevar.png" alt="template var" responsive="true">}}


    利用可能なタグ変数は、第1ステップで選択したタググループに依存します。利用可能なタグ変数のオプションは自動的に選別され、第3ステップの"Use message template variables"ヘルプボックスの内に表示されます。またこれらのタグ変数は、Monitorのタイトル（名前）で使用することもできます。

    一方で、アラートを通知する範囲(スコープ)を指定しているタグには自動的にタイトルに挿入されるものがあります。このため、範囲指定のために多くのタグを使用している場合にはアラートのタイトルが不必要に長くなる可能性があります。もしタグ変数をアラート本文に使用しているのであれば、スペースを節約するために**Include triggering tags in notification title** のチェックを外すことも有効です。この設定によってアラートのタイトルは以下のようになります。

    {{< img src="monitors/notifications/templatevar_short.png" alt="template var short" responsive="true">}}

    テンプレート変数はデフォルトでエスケープされます。もし使用したい変数がJSONやコードを含んでおり、それらをエスケープさせたくない場合は、2重カッコのかわりに3重カッコを使用して下さい。(例 `{{{event.text}}}`)

3. **アラート発報の範囲(スコープ)の違いに基づいた条件変数**: Monitorによってアラート発報されたグループによって異なった通知本文を表示することができます。

    `{{is_match}}` 条件句では、アラート発報の範囲情報と文字列の一致を調べます。例えば、`role:db`タグを持つホストについてdbチームに通知したいこともあれば、`role:app`タグを持つホストについてappチームに通知したいこともあるでしょう。

    条件句の中では現在の設定で利用可能なすべてのタグ変数を使うことができます。文字列がタグ変数の中で確認されると一致したとみなされます。

    この条件変数の構文は以下のようになります:

       {{#is_match "タグ変数" "文字列"}}
       ここに、一致した場合に表示する本文を記述します。
       {{/is_match}}

   次が、アラート発報の範囲情報に基づいて異なる本文を表示する例です:

   {{< img src="monitors/notifications/scope_match_editor.png" alt="scope match editor" responsive="true">}}

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

**注)** 一部のMonitor　(アラート)では、監視している対象に基づいて追加でテンプレート変数を提供しています。 例えば、ホストMonitor　は `host.availability-zone`と` host.cloud_provider`の変数を提供しています。 メッセージ欄の設定を進めている際に、利用可能なテンプレート変数のリストを見るには、欄の右上の"Use message template variables” リンクをクリックするか、メッセージ欄に"{{"を入力し、補完候補リストを表示してください。
