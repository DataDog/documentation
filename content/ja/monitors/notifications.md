---
title: 通知
kind: documentation
description: モニター通知のセットアップ
aliases:
  - /ja/monitors/faq/how-do-i-add-custom-template-variables-to-my-monitor-message
  - /ja/monitors/faq/how-do-i-setup-conditional-contacts-and-messages-in-a-single-monitor
  - /ja/developers/faq/what-do-notifications-do-in-datadog
further_reading:
  - link: monitors/monitor_types
    tag: Documentation
    text: モニターの作成方法
  - link: monitors/manage_monitor
    tag: Documentation
    text: モニターの管理
  - link: monitors/downtimes
    tag: Documentation
    text: モニターをミュートするダウンタイムのスケジュール
  - link: monitors/monitor_status
    tag: Documentation
    text: モニターステータスの参照
---
## 概要

通知は[モニター][1]の重要な要素です。可能な限り迅速に問題を解決できるように、正しい相手に通知を行う必要があります。

{{< img src="monitors/notifications/notification.png" alt="通知"  >}}

1. モニターに**タイトル**を付けます。通常は、モニターの説明を簡潔に記入しておくと、
   通知を受けたチームメンバーが、何が起こっているかをすぐに理解できるので
   便利です。

2. モニターの**メッセージ**を入力します。このフィールドでは、標準の[マークダウン形式][2]のほか、インライン[変数](#variables)とタグ変数を使用できます。
  [条件付き変数](#conditional-variables)を使用して通知テキストを調整したり、[Datadog の **@ 通知**構文](#notification)を使用して複数の連絡先に送信することができます。
  よくあるモニターメッセージの用途は、問題を解決する手順の記載です。

3. <mrk mid="25" mtype="seg">オプションで**モニターの再通知**を有効にします。</mrk><mrk mid="26" mtype="seg">このオプションは、モニターが[解決済み][3]としてマークされるまで、問題が解決されていないことをチームに念押しするのに便利です。</mrk><mrk mid="27" mtype="seg">有効にした場合は、モニターが再通知したときに送信されるエスカレーションメッセージを構成できます。</mrk><mrk mid="28" mtype="seg">元のメッセージも含まれます。</mrk>

## 変数

モニター通知をカスタマイズするために次の変数を使用できます。

| 変数                      | 説明                                                                                    |
|-------------------------------|------------------------------------------------------------------------------------------------|
| `{{value}}`                   | メトリクスベースのクエリモニターのアラートに違反した値を表示します。                    |
| `{{threshold}}`               | モニターの **Set alert conditions** セクションで選択されているアラートしきい値を表示します。          |
| `{{warn_threshold}}`          | モニターの **Set alert conditions** セクションで選択されている警告しきい値を表示します (ある場合)。 |
| `{{ok_threshold}}`            | モニターをリカバリした値を表示します。                                                  |
| `{{comparator}}`              | モニターの **Set alert conditions** セクションで選択されている比較演算子を表示します。         |
| `{{last_triggered_at}}`       | モニターが最後にトリガーされたときの UTC 日付/時刻を表示します。                                     |
| `{{last_triggered_at_epoch}}` | モニターが最後にトリガーされた UTC 日付/時刻をエポックミリ秒形式で表示します。        |

**メモ**: しきい値を小数で入力する際、値が `<1` の場合は先頭に `0` を付けます。たとえば、`.5` ではなく `0.5` としてください。

### タグ変数

マルチアラートモニターでは、タグ変数を追加してアラートをトリガーしたタグスコープに固有の情報をアラートメッセージに入れることができます。タグ変数は、モニターのセクション 1 の trigger a separate alert for each フィールドで使用したタグによって異なります。

たとえば、各 **host** タグに基づいてトリガーする場合は、セクション 3 **Say what's happening** で、**host** に関連する `{{host.name}}` や `{{host.ip}}` などのいくつかのタグを使用できます。

<mrk mid="53" mtype="seg">カスタムタグも使用できます。</mrk><mrk mid="54" mtype="seg">`key:value` 構文に従ってカスタムタグが追加されると、これらのタグのキーによってデータがグループ化されます。</mrk><mrk mid="55" mtype="seg">これにより、各 **value** によるマルチアラート (個別のトリガー) が可能になります。</mrk><mrk mid="56" mtype="seg">さらに、モニターメッセージでタグの `.name` 変数を使用できます。</mrk>

注:

* テンプレート変数の内容は、デフォルトでエスケープされます。エスカレートしたくない JSON やコードが変数に含まれる場合は、中括弧を 2 つではなく 3 つ使用してください (例: `{{{event.text}}}`)。

* 状況に応じてモニターで使用できるすべてのテンプレート変数を参照するには、**Use message template variables** リンクをクリックするか、`{{` から始まるテンプレート変数名を入力して候補リストを表示してください。使用できる変数は、作業しているモニターのメトリクス、タグなどの機能の組み合わせによって異なります。

* タグテンプレート変数はモニタータイトル (名前) にも使用できますが、これらの変数は、(集計サマリーを表示する親ではなく) Datadog 子イベントのテキストでのみ値が挿入されます。

* トリガーしているスコープを識別するタグの一部は、マルチアラートのタイトルに自動的に挿入されます。

#### 例

以下では、複数の `creator:` 値 (`creator:wes_anderson`、`creator:saint_exupéry` など) でタグ付けされた複数のホストがあるとします。

ここで、`creator:` タグごとに個別のアラートをトリガーするマルチアラートモニターをセットアップし、それらのモニターメッセージに `{{creator.name}}` を含めました。このモニターがトリガーされると、アラート通知の受信者は、モニターが **wes_anderson**、**saint_exupéry** などのどの `creator:` 値によってトリガーされたのかを確認できます。

{{< img src="monitors/faq/multi_alert_templating_notification.png" alt="multi_alert_templating_notification"  style="width:80%;">}}

この例は、マルチアラートでテンプレート変数を使用した例です。

{{< img src="monitors/notifications/templatevareditor.png" alt="テンプレート変数エディター"  style="width:80%;">}}

これに対応するイベント通知は次のようになります。

{{< img src="monitors/notifications/templatevar.png" alt="テンプレート変数"  style="width:80%;">}}

#### ピリオドを含むタグキー

<mrk mid="71" mtype="seg">タググループのキーにピリオドが含まれる場合は、キー全体を角括弧で囲んでテンプレート変数を明示する必要があります。</mrk>
<mrk mid="72" mtype="seg">たとえば、`dot.key.test:five` でタグ付けされたメトリクスを送信し、`dot.ket.test` グループタグによってトリガーされるマルチアラートモニターをセットアップする場合、`dot.key.test.name` タグ変数を使用するには、次の構文を適用する必要があります。</mrk>

{{< img src="monitors/faq/template_with_dot.png" alt="template_with_dot"  style="width:80%;">}}

### テンプレート変数の算術

数値を返すテンプレート変数は、算術演算をサポートしています。テンプレート変数で算術を実行するには、次のような `eval` 構文を使用します。

`{{eval "<テンプレート変数名>+1-2*3/4"}}`

注: テンプレート変数の名前と算術式を引用符（`"`）で囲むことを忘れないでください。

たとえば、テンプレート変数 `{{last_triggered_at_epoch}}` から 15 分（15 * 60 * 1000 ミリ秒）を減算するには、次のように通知メッセージにインライン入力します。

`{{eval "last_triggered_at_epoch-15*60*1000"}}`

## 条件付き変数

<mrk mid="75" mtype="seg">条件付き変数を使用すると、モニターの状態やトリガーされた状況の詳細に基づいて、[異なる連絡先に異なるテキストを送信](#notification) できます。</mrk><mrk mid="76" mtype="seg">このような条件付き変数は、モニター定義のセクション 3 で設定される通知の件名または本文内で使用できます。</mrk>

<mrk mid="77" mtype="seg">条件付きタグを使用する場合は、タグの開始 (例: </mrk> <mrk mid="78" mtype="seg">`{{#is_alert}}`)/終了 (例: </mrk> <mrk mid="79" mtype="seg">`{{/is_alert}}`) ペアの間に任意のテキストと **@ 構文**を記述する必要があります。</mrk>

以下の条件付き変数があります。

| 条件付き変数       | 説明                                                         |
|----------------------------|---------------------------------------------------------------------|
| `{{#is_alert}}`            | モニターがアラートする場合に表示します                                            |
| `{{^is_alert}}`            | モニターがアラートしない場合に表示します                                          |
| `{{#is_match}}`            | コンテキストが文字列と一致する場合に表示します                              |
| `{{^is_match}}`            | コンテキストが文字列と一致しない場合に表示します                            |
| `{{#is_exact_match}}`      | コンテキストが文字列と正確に一致する場合に表示します                      |
| `{{^is_exact_match}}`      | コンテキストが文字列と正確に一致しない場合に表示します                    |
| `{{#is_no_data}}`          | モニターがデータなしを通知する場合に表示します                          |
| `{{^is_no_data}}`          | モニターがデータなしを通知しない場合に表示します                        |
| `{{#is_warning}}`          | モニターが警告する場合に表示します                                             |
| `{{^is_warning}}`          | モニターが警告しない場合に表示します                                           |
| `{{#is_recovery}}`         | WARNING、ALERT、または NO DATA からモニターが回復する場合に表示します   |
| `{{^is_recovery}}`         | WARNING、ALERT、または NO DATA からモニターが回復しない場合に表示します |
| `{{#is_warning_recovery}}` | モニターが WARNING から OK に回復する場合に表示します                     |
| `{{^is_warning_recovery}}` | モニターが WARNING から OK に回復しない場合に表示します                   |
| `{{#is_alert_recovery}}`   | モニターが ALERT から OK に回復する場合に表示します                      |
| `{{^is_alert_recovery}}`   | モニターが ALERT から OK に回復しない場合に表示します                    |
| `{{#is_alert_to_warning}}` | モニターが ALERT から WARNING に移行する場合に表示します                 |
| `{{^is_alert_to_warning}}` | モニターが ALERT から WARNING に移行しない場合に表示します               |
| `{{#is_no_data_recovery}}` | モニターが NO DATA から回復する場合に表示します                             |
| `{{^is_no_data_recovery}}` | モニターが NO DATA から回復しない場合に表示します                           |

これらは、モニターエディターのステップ 3 の "Use message template variables" ヘルプボックスでも確認できます。

以下は使用方法の例です。

{{< tabs >}}
{{% tab "is_alert / is_warning" %}}

これらの変数は、単純な `if-else` ロジックを使用して、イベントタイプ (警告、リカバリ、データなしなど) によって異なるメッセージを表示します。

{{< img src="monitors/notifications/conditionalvars.png" alt="条件付き変数"  style="width:80%;">}}

これはエディターの例です。

{{< img src="monitors/notifications/templateconditionaleditor.png" alt="テンプレート条件付きエディター"  style="width:80%;">}}

対応するトリガーイベント通知は、次のようになります。

{{< img src="monitors/notifications/templateconditionaltrigger.png" alt="テンプレート条件付きトリガー"  style="width:80%;">}}

リカバリ通知は、次のようになります。

{{< img src="monitors/notifications/templateconditionalrecover.png" alt="テンプレート条件付き回復"  style="width:80%;">}}

{{% /tab %}}
{{% tab "is_recovery / is_alert_recovery " %}}

* `{{#is_recovery}}` は、**警告**状態または**アラート**状態のどちらかからモニターがリカバリするとトリガーします。
* `{{#is_alert_recovery}}` は、モニターが**アラート**から **OK** 状態に直接リカバリするとトリガーします。
* `{{#is_warning_recovery}}` は、モニターが**警告**から **OK** 状態にリカバリするとトリガーします。

つまり、モニターが**アラート**から**警告**または **OK** 状態に切り替わった場合は、次のようになります。

* `{{#is_recovery}}` はトリガーします。
* `{{#is_alert_recovery}}` はトリガーしません。
* `{{#is_warning_recovery}}` はトリガーします。

{{% /tab %}}
{{% tab "is_match / is_exact_match" %}}

<mrk mid="143" mtype="seg">`{{is_match}}` 条件を使用すると、トリガーしているコンテキストを特定の文字列と比較して、さまざまなメッセージを通知に表示できます。</mrk>
<mrk mid="144" mtype="seg">条件付きステートメントで任意のタグ変数を使用できます。</mrk><mrk mid="145" mtype="seg">**解決された変数のいずれかの場所に比較文字列が現れる場合に、一致が成立します**。</mrk>

タグ変数は次の形式で使用します。

```text
{{#is_match "<タグ変数>.name" "<比較文字列>"}}
  これは、<比較文字列> が <タグ変数> に含まれているかどうかを示します
{{/is_match}}
```

たとえば、トリガーしているホストが `role:db_cassandra` タグまたは `role:db_postgres` タグを持つ場合に DB チームに通知する場合は、以下のコードを使用します。

```text
{{#is_match "role.name" "db"}}
  これは、アラートをトリガーしたホストに `db` を含む `role` タグ変数がある場合にのみ表示されます。
   role:db_cassandra と role:db_postgres に対してトリガーされます。
{{/is_match}}
```

<mrk mid="151" mtype="seg">**注**:</mrk> <mrk mid="152" mtype="seg">`&lt;TAG_VARIABLE&gt;` が空で**ない**ことをチェックするには、`{{is_match}}` 条件を空文字列と組み合わせて使用します。</mrk>

```text
{{#is_match "<タグ変数>.name" ""}}
  これは、<タグ変数> が空でないかどうかを示します。
{{/is_match}}
```

##### {{is_exact_match}}

`{{is_exact_match}}` 条件は、部分文字列の一致ではなく、タグ変数から正確な文字列の一致を探します。変数は次の形式を使用します。

```text
{{#is_exact_match "<タグ変数>.name" "<比較文字列>"}}
  これは、<比較文字列> が正確に <タグ変数> であるかどうかを示します。
{{/is_exact_match}}
```

たとえば、`role:production` と `role:production-1` でタグ付けされた 2 つのホストによってトリガーされるアラートがあるとします。

  ```text
  {{#is_match "role.name" "production"}}
    これは、アラートをトリガーしたホストに、role:production または the role:production-1 タグが添付されている場合にのみ表示されます。
  {{/is_match}}

  {{#is_exact_match "host.name" "production"}}
    これは、トリガーしたホストに role:production タグが添付されている場合にのみ表示されます。
  {{/is_exact_match}}
  ```

{{% /tab %}}
{{< /tabs >}}

## 高度な変数の使用方法

アラートメッセージで `{{ <TEXT> }}` などの二重中括弧を送信する必要がある場合は、`{{{{raw}}}}` 形式を使用します。

次のテンプレートは

```text
{{{{raw}}}}
{{ <テキスト_1> }} {{ <テキスト_2> }}
{{{{/raw}}}}
```

次を出力します。

```text
{{ <テキスト_1> }} {{ <テキスト_2> }}
```

<mrk mid="170" mtype="seg">[条件付き変数](#conditional-variables)セクションに記載されている `^|#` ヘルパーは、`{{{{raw}}}}` 形式と共に使用できず、削除する必要があります。</mrk><mrk mid="171" mtype="seg">たとえば、`{{is_match}}` 条件付き変数を使用してテキストをそのまま出力するには、次のテンプレートを使用します。</mrk>

```text
{{{{is_match "host.name" "<ホスト名>"}}}}
{{ .matched }} ホスト名
{{{{/is_match}}}}
```

`host.name` が `<HOST_NAME>` と一致する場合、テンプレートは次を出力します。

```text
{{ .matched }} ホスト名
```

## @ 通知

モニター通知を適切なエンドポイントに送信するには

* 通知メッセージに `@<DD_USER_EMAIL>` を追加して、Datadog ユーザーにメールで通知します。
* 通知メッセージに `@<EMAIL>` を追加して、Datadog ユーザー以外の人にメールで通知します。
* Slack インテグレーションをインストールして、適切なチャンネルに直接通知を送信します。

**注**:

* **@メンション**には、最後の行の文字との間にスペースが必要です。`{{value}}@slack-channel` は無効です。`{{value}} @slack-channel` は有効です。
* 保留中の Datadog ユーザー招待に関連付けられているメールアドレスは非アクティブと見なされ、通知を受信しません。

### インテグレーション

{{< tabs >}}
{{% tab "Slack" %}}

[Slack インテグレーション][1]をセットアップしたら、通知メッセージに `@slack` を入力すると、通知の送信先として使用可能なチャンネルがリストされます。

#### モニターアラートからの Slack @ メンション

モニターメッセージテンプレートで以下のように `@username` を `< >` で囲み、Slack 通知内で定義済みユーザーに **@ 通知**します。

たとえば、この構成、
{{< img src="monitors/notifications/notification_template.png" alt="notification_template"  style="width:50%;" >}}

は次の Slack メッセージを生成します。
{{< img src="monitors/notifications/notification_slack_preview.png" alt="notification_slack_preview"  style="width:50%;" >}}

**注**: 通知の際に問題が発生した場合、Slack の表示名の代わりに `username` をお使いください。`username` は**ユーザー名**以下の [Slack account settings][2] にあります。

`<!here>` または `<!channel>` を使用して、それぞれ **@here** または **@channel** をメンションできます。

ユーザーグループには、`<!subteam^グループ_ID|Gグループ名>` を使用します。`グループ_ID` を見つけるには、[Slack の `usergroups.list` API エンドポイントをクエリ][3]します。たとえば、`testers` という名前のユーザーグループの場合、次の構文を使用します。

```text
<!subteam^12345|testers>
```

<mrk mid="200" mtype="seg">注:</mrk> <mrk mid="201" mtype="seg">Slack @ 通知の場合、チャンネル名の後に特殊文字を付けることはサポートされていません。
`@----critical_alerts` は機能しますが、`@--critical_alerts--` は通知を受信しません。</mrk>

### メッセージテンプレート変数を使用して動的に @ メンションを作成する

モニターメッセージ内でメッセージテンプレート変数を使用して、動的に **@ メンション**を作成できます。

たとえば、Slack インテグレーションで、次の変数がチャンネルとしてセットアップされている場合

* `@slack-{{owner.name}}` は、このモニターの所有者のチャンネルにメッセージを投稿します。

* `@slack-{{host.name}}` は、Slack 内の #host.name チャンネルにスラックメッセージを投稿します。

または、特定のメールに直接アクセスする **@メンション**を作成します。

* `@team-{{team.name}}@company.com` は、チームのメーリングリストにメールを送信します。

[1]: /ja/integrations/slack
[2]: http://slack.com/account/settings
[3]: https://api.slack.com/methods/usergroups.list
{{% /tab %}}
{{% tab "Jira" %}}

[Jira インテグレーション][1]をセットアップしたら、通知メッセージに `@jira` を入力すると、使用可能なオプションがリストされます。インテグレーションドキュメントの[ユースケース][2]例を参照してください。

[1]: /ja/integrations/jira
[2]: /ja/integrations/jira/#use-cases
{{% /tab %}}
{{% tab "PagerDuty" %}}

[PagerDuty インテグレーション][1]をセットアップしたら、通知メッセージに `@pagerduty` を入力すると、通知の送信先として使用可能なサービス名がリストされます。

[1]: /ja/integrations/pagerduty
{{% /tab %}}
{{% tab "Webhooks" %}}

[Webhooks インテグレーション][1] の設定後、通知メッセージに `@webhook` と入力すると、利用可能なWebhookが表示されます。アラート発生時、 `POST` リクエストがWebhookのURLに送信されます。

[1]: /ja/integrations/webhooks
{{% /tab %}}
{{< /tabs >}}

## モニター通知のテスト

**テスト通知は、ホスト、メトリクス、異常、外れ値、予測、インテグレーション（チェックのみ）、プロセス（チェックのみ）、ネットワーク（チェックのみ）、カスタムチェック、イベント、複合条件のモニタータイプでサポートされています**。

モニターを定義したら、モニターページの右下にある *Test Notifications* ボタンを使用して、該当する状態でモニターの通知がどのように見えるかをテストします。

1. 以下のポップアップからモニターのテストケースを選択してください。モニター設定の中で有効化したステータスと設定した閾値条件のみ選択できます。モニターがアラートもしくは警告の状態から脱した際、Datadogは修復の通知を送信するため、 [Recovery thresholds][4] は例外として扱われます。

    {{< img src="monitors/notifications/test-notif-select.png" alt="このモニターの通知をテストする"  style="width:50%;" >}}

2. **Run test** をクリックして、メッセージボックスで使用可能な通知ハンドルに通知を送信します。

**注**:

* <mrk mid="224" mtype="seg">テスト通知は、イベントストリーム内で検索できるイベントを生成します</mrk><mrk mid="225" mtype="seg">さらに、テストを開始したユーザーをメッセージ本文で示し、テスト通知のタイトルに `[TEST]` が追加されます。</mrk>

* メッセージ変数には、モニター定義のスコープに基づいて、ランダムに選択された有効なグループが自動挿入されます。

  {{< img src="monitors/notifications/test-notif-message.png" alt="Say what's happening"  style="width:50%;" >}}

## 高度な通知構成

### 適切なダッシュボードへのリンク

アラートにコンテキスト情報を追加したいことはよくあります。アラートの一環として関連ダッシュボードへのクイックリンクを置くと、障害修復プロセス全体にかかる時間を削減して、解決までの時間を短縮できることがわかっています。

Datadog は、定義されている各モニターでメッセージテンプレート変数を使用できます。これらの変数とモニターのスコープを使用して、Datadog ユーザーを適切なダッシュボードにリンクする動的な URL を構築できます。

以下に、System Dashboards、Integration Dashboards、Host Maps、Managed Monitors などのページ項目へのリンクを提供する例を示します。

例: あるシステムメトリクスのモニターが定義されたしきい値を超えたときに、システムダッシュボードへのリンクを提供します。この例で活用できるメッセージテンプレート変数は `{{host.name}}` です。モニターの "Say What's Happening" セクション内に次の URL を挿入します。

```text
https://app.datadoghq.com/dash/integration/system_overview?tpl_var_scope=host:{{host.name}}
```

`{{host.name}}` は、このモニターの問題があるホストに置き換えられます。

{{< img src="monitors/notifications/system_dashboard_url.png" alt="system_dashboard_url"  style="width:70%;" >}}

以下は、障害の修復/トリアージプロセス中によく利用されるページへのクイックアクセスを Datadog ユーザーに提供するために、モニターに追加できるリンクの例です。

{{< tabs >}}
{{% tab "hostmap" %}}

他の同種のホストとメトリクスを比較するためにホストマップへのリンクを挿入するには、以下のようなリンクをモニターに追加します。

```text
https://app.datadoghq.com/infrastructure/map?fillby=avg%3Acpuutilization&sizeby=avg%3Anometric&filter=cassandra
```

上のリンクには、標準のシステムダッシュボードよりカスタマイズ性が高いオプションがあります。ここで、追加の変数を定義します。この URL によく渡される変数は、**fillby、sizeby、filter** です。

* `fillby` は、`fillby:avg:<MetricName>` を追加することで定義されます。
* `sizeby` は、`sizeby:avg:<SecondMetricName>` を追加することで定義されます。
* `filter`は、`filter=<インテグレーション名>` を追加して特定のインテグレーション（つまり、Cassandra、mysql、apache、snmp など）を指定するために使用されます。

以下の例では、`system.cpu.system` によってホストマップの六角形を塗り分けます。六角形は、`system.cpu.stolen` によってサイズ変更され、Cassandra ホストのみを含むようにフィルターされます。

{{< img src="monitors/notifications/hostmap_url.png" alt="hostmap_url"  style="width:70%;">}}

{{% /tab %}}
{{% tab "Manage Monitors Page" %}}

問題があるホストのすべてのモニターを表示する "Manage Monitors" ページにリンクするには、以下のリンクを定義します。

```text
https://app.datadoghq.com/monitors/manage?q=scope:host:{{host.name}}
```

<mrk mid="250" mtype="seg">上の URL は、このホストのすべてのモニターにリンクします。</mrk><mrk mid="251" mtype="seg">さらに細かくリンクを設定するためのオプションがあります。</mrk>

<mrk mid="252" mtype="seg">たとえば、アラート状態のすべてのモニターを表示するには、`status:Alert` を追加します (ほかにも `WARN`、`NO%20DATA`、`OK`、`MUTED` ステータスがあります)。</mrk><mrk mid="253" mtype="seg">以下はリンクの例です。</mrk>

```text
https://app.datadoghq.com/monitors/manage?q=scope:host:{{host.name}}&status:Alert
```

特定のアプリケーションまたはインテグレーションのすべてのモニターが必要な場合は、次のクエリを URL `q=<インテグレーション名>` に追加します。

```text
https://app.datadoghq.com/monitors/manage?q=cassandra
```

{{< img src="monitors/notifications/monitor_url.png" alt="monitor_url"  style="width:70%;">}}

{{% /tab %}}
{{% tab "Integration Dashboards" %}}

アプリケーションまたはインテグレーション固有のモニターを構築している場合は、特定のインテグレーションダッシュボードにリンクすると共に、モニターをトリガーしたホストのスコープを追加します。

以下の例では、Cassandra、Apache、SNMP などに対応する `<インテグレーション名>` セクションを挿入し、問題があるホストのスコープを提供するだけです。

```text
https://app.datadoghq.com/dash/integration/<インテグレーション名>?tpl_var_scope=host:{{host.name}}
```

{{< img src="monitors/notifications/integration_url.png" alt="integration_url"  style="width:70%;">}}

{{% /tab %}}
{{< /tabs >}}

### コメント

モニター編集画面にのみ表示されるモニターメッセージにコメントを含めるには、次の構文を使用します。

```text
{{!-- これはコメントです --}}
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors
[2]: http://daringfireball.net/projects/markdown/syntax
[3]: /ja/monitors/monitor_types/integration
[4]: /ja/monitors/faq/what-are-recovery-thresholds