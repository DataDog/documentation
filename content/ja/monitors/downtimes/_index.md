---
title: Downtimes
description: "Schedule downtimes for your Datadog monitors to prevent alerts during specific time periods"
aliases:
- /monitors/notify/downtimes/
further_reading:
- link: /monitors/guide/suppress-alert-with-downtimes
  tag: Guide
  text: Suppress alerts with downtimes
- link: /monitors/guide/scoping_downtimes
  tag: Guide
  text: Scoping downtimes schedules
- link: /monitors/quality/
  tag: Documentation
  text: View monitors that are muted over an extended period
- link: /monitors/
  tag: Documentation
  text: Create monitors
- link: /monitors/notify/
  tag: Documentation
  text: Monitor notifications
cascade:
  algolia:
    subcategory: Downtimes
    tags: [downtimes, mute monitors]
---

## 概要

モニターをトリガーせずに、システムのシャットダウン、オフラインメンテナンス、またはアップグレードのダウンタイムをスケジュールします。ダウンタイムはすべてのモニターのアラートと通知を無音にしますが、モニターの状態遷移を妨げることはありません。

{{< img src="/monitors/downtimes/downtime_overview.png" alt="Example of a downtime" style="width:100%;" >}}

## セットアップ

### Create a downtime schedule

To schedule a monitor downtime in Datadog navigate to the [**Manage Downtimes**][1] page. Then, click the **Schedule Downtime** button in the upper right.

個々のモニターをミュートするには、モニターステータスページの上部にある **Mute** ボタンをクリックします。これにより、その特定のモニターのダウンタイムスケジュールが作成されます。

### サイレントにする対象を選択

Apply downtime schedules to specific monitors by name or to a broad range of monitors by monitor tags. Apply additional filters through the [*Group scope*](#downtime-scope). Click **Preview affected monitors** to see the monitors included. For more examples and use cases see  [Scoping downtimes schedules][2].

**注**: ダウンタイムがスケジュールされた後に作成または編集されたモニターは、スコープに一致する場合、自動的にダウンタイムに含まれます。

{{< tabs >}}
{{% tab "モニター名で指定" %}}

Search or use the dropdown menu to choose which monitors to silence. If the field is left empty, all monitors are silenced by default. You can also select a scope to constrain your downtime to a specific host, device, or arbitrary tag. Only monitors that have **ALL selected scopes** are silenced.
{{% /tab %}}
{{% tab "By Monitor Tags" %}}

1 つまたは複数の[モニタータグ][3]に基づいて、ダウンタイムをスケジュールします。1 つのダウンタイムに選択できるタグの最大数は 32 です。各タグの長さは最大 256 文字です。**選択したすべてのタグ**を持つモニターだけがサイレントになります。追加の制約のためにスコープを選択することもできます。

[3]: /monitors/manage/#monitor-tags
{{% /tab %}}
{{% /tabs %}}

#### ダウンタイムスコープ
グループスコープを使用して、ダウンタイムに追加のフィルターを適用し、どのモニターをミュートにするかをよりコントロールすることができます。ダウンタイムのグループスコープは、モニター固有の対象の**後に**マッチします。モニタータグを使用して複数のモニターを対象にする場合、グループスコープに一致させる前にタグ付けされたモニターを見つけます。

For instance, you have a monitor that looks at the average latency of all your services. You are planning on running an upgrade on the `web-store` service and are anticipating slow requests and potential errors.

あなたは `service:web-store` 関連の通知はミュートされ、残りのサービスのその他の重要なアラートは通常通り配信されるようにしたいと思います。モニター対象を選択した後、ダウンタイムのグループスコープに `service:web-store` と入力します。

**注**: これは `service` や `host` など、複数のディメンションを持つグループでも動作します。`service:web-store` にダウンタイムを作成すると、例えば `service:web-store,host:a` や `service:web-store,host:b` のように、そのサービスを含むすべてのグループをミュートします。

#### ダウンタイムスコープ構文
The Downtime scope query follows the same common [Search Syntax][3] that many other products across the platform support. To include all groups in the scope of a Downtime, type `*` for the `Group scope`. Further examples of group scopes include:

| ダウンタイムグループスコープ | 説明 |
| ------------------- | ---------------------- |
| `service:web-store`       | `web-store` サービスに関するすべての通知をミュートします。 |
| `service:web-store AND env:dev`       | `dev` 環境で実行している `web-store` サービスに関するすべての通知をミュートします。 |
| `env:(dev OR staging)`       | `dev` または `staging` 環境に関連するすべての通知をミュートします。 |
| `service:web-store AND env:(dev OR staging)`       | `dev` または `staging` 環境で実行している `web-store` サービスに関連するすべての通知をミュートします。 |
| `host:authentication-*`       | 名前のプレフィックスが `authentication-` であるホストに関連するすべての通知をミュートします。 |
| `host:*-prod-cluster`       | 名前のサフィックスが  `-prod-cluster` であるホストに関連するすべての通知をミュートします。 |
| `host:*-prod-cluster`       | 名前のサフィックスが  `-prod-cluster` であるホストに関連するすべての通知をミュートします。 |
| `service:webstore AND -env:prod`       | `prod` 環境で**実行していない** `web-store` サービスに関するすべての通知をミュートします。 |

#### ダウンタイムスコープの制限
**サポートされていない**制限がいくつかあります。

* More than two levels of nesting, such as `team:app AND (service:auth OR (service:graphics-writer AND (env:prod OR (type:metric AND status:ok))))`, are not supported. At most, Downtimes accept two levels of nesting. Use separate Downtimes instead to break down the logic.
* 否定はキー/値のペアと `OR` を持つタグに対してのみサポートされます。例えば、`-key:value` や `-key(A OR B)` などです。`service:(A AND B)`、`service:(-A OR -B)`、`service(A B)` などのスコープはサポートされていません。
* 例えば、`service:A OR host:X` のように、トップレベルの OR はサポートされていません。この場合、2 つの別々のダウンタイムが必要になります。
* `prod AND service:(A or B)` や `prod` のようなキーなしのタグはサポートされていません。タグにはキーが必要で、この場合は例えば `env:prod` です。
* 疑問符のワイルドカード `service:auth?` はサポートされていません。ワイルドカードを使用する必要がある場合は、代わりに `*` を使用してください。
* キー内の無効な文字 `en&v:prod` は有効なダウンタイムスコープではないため、拒否されます。

### ダウンタイムスケジュールの設定

#### 1 回限り

開始日時とタイムゾーンを指定して 1 回のみのダウンタイムを設定します。オプションで終了日時を設定することもできます。

{{< img src="monitors/downtimes/downtime_onetime.jpg" alt="1 回限りのダウンタイムをスケジュールするためのフィールド" style="width:90%;">}}

#### Recurring

Recurring downtimes are useful for recurring maintenance windows. Set a recurring downtime by entering the start date, time, time zone, repeat, and duration. Optionally, specify an end date or number of occurrences.

繰り返しのダウンタイムの 1 つのダウンタイムが終了すると、1 つのダウンタイムはキャンセルされ、同じ制約と更新された開始時刻と終了時刻で新しいダウンタイムが作成されます。<br>
**注**: 元の作成者は、新しく作成されたすべてのダウンタイムに関連付けられます。

{{< img src="monitors/guide/downtime_business_hour_weekend.png" alt="営業時間外や週末にアラートをミュートする繰り返しのスケジュールを使用したダウンタイムの構成" style="width:100%;" >}}

Use [recurrence rules][4] (RRULEs) to define downtimes schedules. Use the official [RRULE generator][5] as a tool to generate recurring rules. A common use case is to use RRULES to define downtimes on specific days of the month, for example, on the third Monday of each month. For more use cases on recurrence, see the guide to [Suppress alerts with Downtimes][6].

**注**: RRULE で期間を指定する属性はサポートされません（例: `DTSTART`、`DTEND`、`DURATION`）。

## 通知
### メッセージの追加

Enter a message to alert your team about this downtime. The message field allows standard markdown formatting and Datadog's `@-notification` syntax. See the [Notifications page][7] for more information on formatting options.

### 通知と自動化の構成

Configure notifications and automations by specifying team members or sending the message to a service [integration][8]. Datadog sends notifications to the specified destinations whenever the downtime is scheduled, started, cancelled, or expired. These audit notifications allows your team to be aware of the downtimes in your system.

### 最初の回復通知を無効にする

デフォルトでは、Datadog はダウンタイム**前に**トリガーし、ダウンタイム**中に**回復するモニターに対して回復通知を送信します。これは、サードパーティのインテグレーションを使用して、開いたインシデントを自動的にクローズする場合に便利です。チェックボックスを選択すると、これらの通知がミュートされます。

{{< img src="monitors/downtimes/downtime_first_recovery.png" alt="最初の回復通知をミュートする" style="width:80%;">}}

最初の回復通知を無効にするオプションは、複数のダウンタイム間で加算されます。例えば、複数のダウンタイムが重なって同じモニターをミュートする場合、**少なくとも 1 つ**のダウンタイムが無効化オプションをチェックすると、最初の回復通知がミュートされます。

**注**: このオプションは、**最初の**回復通知をミュートします。ダウンタイム中にモニターがトリガーして再び回復する場合、このオプションの設定に関係なく、対応する通知は常にミュートされます。

## 管理

The [Manage Downtimes page][1] displays the list of active and scheduled downtimes. Select a downtime to view details, edit, or delete it. Details include its creator, its scope, and a list of the monitors it applies to.
Use the facets panel and the search bar to filter the list on the `Creator`, the `Scope`, `Monitor Tags`, or `Active`, `Automuted`, `Recurring` parameters.

{{< img src="monitors/downtimes/downtime_manage.png" alt="Manage Downtime ページ" style="width:100%;">}}

### 履歴

Downtime history is viewable on the [Monitor Status][9] page as overlaid on the group transition history, and the [Events explorer][10] by searching for `tags:audit downtime`, or a specific downtime by ID with `tags:audit downtime_id:<DOWNTIME_ID>`.

### ミュート設定

モニターは、`ALERT`、`WARNING`、`RESOLVED`、`NO DATA` 間でステータスが切り替わる際にイベントをトリガーします。モニターがミュートまたはダウンタイムによってサイレント状態になっている時は、`RESOLVED` から別の状態に変わっても、イベントや通知は**トリガーされません**。

{{< img src="monitors/downtimes/downtime_on_alert.png" alt="ダウンタイム中にアラートへの状態遷移を示すモニターステータスグラフは、アラートイベントを作成しません" style="width:80%;">}}

**Note**: Muting or un-muting a monitor from the monitor status page does not delete scheduled downtimes associated with the monitor. To edit or delete a downtime, use the [Manage Downtimes][1] page or the [API][11].

### 有効期限

By default, if a monitor is in an alert-worthy state (`ALERT`, `WARNING`, or `NO DATA`) when a downtime expires, the monitor triggers a new notification. This applies to monitors that change state during downtime (such as from `OK` to `ALERT`, `WARNING`, or `NO DATA`), and to monitors that already have an alert-worthy state when downtime begins. If a downtime is manually canceled, notifications are not sent, even if the monitor has entered an alert-worthy state.

To override the default behavior, specify which notifications should be sent at the end of downtimes with the options in the **Configure notifications and automations** section. For downtimes created with the API, the default behavior is to exclude the `Is cancelled` option.

{{< img src="monitors/downtimes/downtime_cancel_expire_notification.png" alt="The Configure notifications and automations section of a monitor with specific downtime conditions" style="width:100%;">}}

**例 1:** モニターがダウンタイムの開始*前に*アラートの状態で、ダウンタイム中も*継続*した場合:
1. ダウンタイム中、このアラートの通知は停止されます。
2. モニターはアラートの状態です（依然として条件が満たされているため）。
3. ダウンタイムが終了します。
4. アラート条件が依然として満たされるため、通知が送信されます。

**例 2:** モニターがダウンタイムの開始*前に*アラートの状態で、ダウンタイム*中に*リカバリした場合:
1. `ALERT` 状態から `OK` に移行します。
2. ダウンタイム中にリカバリ通知が送信されます（ダウンタイム中最初のリカバリのみ）。

### モニターレポート

All alerted states are included on the [weekly monitor report][12] even if the monitor is in a downtime.

## オートミュート

Datadog は、特定のクラウドワークロードの手動シャットダウンに関連するモニターをプロアクティブにミュートすることができます。シャットダウンの自動ミュートには、以下のシナリオがサポートされています。

- **[Amazon EC2 instances][13]** and instance termination by AWS autoscaling based on host statuses from the CloudWatch API.
- **[Google Compute Engine (GCE)][14]** instances and instance termination triggered by GCE autoscaling based on host statuses from the GCE API.
- **[Azure VMs][15]**, whether the shutdown was triggered manually or by Azure autoscaling, based on health statuses available through the Azure Resource Health API.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/downtimes
[2]: /monitors/guide/scoping_downtimes
[3]: /logs/explorer/search_syntax/
[4]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[5]: https://icalendar.org/rrule-tool.html
[6]: /monitors/guide/suppress-alert-with-downtimes/
[7]: /monitors/notify/#overview
[8]: /integrations/#cat-notification
[9]: /monitors/manage/status/
[10]: /service_management/events/explorer
[11]: /api/latest/downtimes/#cancel-a-downtime
[12]: /account_management/#preferences
[13]: /integrations/amazon_ec2/#ec2-automuting
[14]: /integrations/google_compute_engine/#gce-automuting
[15]: /integrations/azure_vm/#automuting-monitors
