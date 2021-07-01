---
title: ダウンタイム
kind: documentation
description: ダウンタイムをスケジューリングすることで、Datadog モニターが一定期間アラートを出さないようにします。
further_reading:
  - link: /monitors/monitor_types/
    tag: Documentation
    text: モニターの作成
  - link: /monitors/notifications/
    tag: Documentation
    text: モニター通知の設定
  - link: /monitors/manage_monitor/
    tag: Documentation
    text: モニターの管理
---
ダウンタイムをスケジューリングすると、システムシャットダウンやオフラインメンテナンス、アップグレードを、モニターをトリガーせずに行うことができます。

## スケジュール

Datadog で[モニターのダウンタイム][1]のスケジューリングを行うには、メインナビゲーションで _Monitors –> Manage Downtime_ の順に移動します。その後、画面右上の **Schedule Downtime** ボタンをクリックしてください。

### サイレントにする対象を選択

{{< tabs >}}
{{% tab "モニター名で指定" %}}

検索するか、ドロップダウンを利用してサイレントにしたいモニターを選択します。フィールドを空欄にすると、すべてのモニターがデフォルトでサイレント状態に設定されます。スコープを選択して、特定のホストやデバイス、任意のタグに限定したダウンタイムを設定することもできます。**選択されたすべてのスコープ**に紐付くモニターのみがサイレントに設定されます。

{{% /tab %}}
{{% tab "モニタータグで指定" %}}

一つないし複数の[モニタータグ][1]に基づくダウンタイムのスケジューリングが可能です。少なくとも 1 つのタグを選択する必要があります。タグは最大 32 個まで選択でき、各タグの長さは最大 256 文字までとなります。**選択されたすべてのタグ**に紐付くモニターのみがサイレントに設定されます。スコープを選択すれば、対象をさらに制限することもできます。

[1]: /ja/monitors/manage_monitor/#monitor-tags
{{% /tab %}}
{{< /tabs >}}

モニターのサイレント設定にスコープを追加する場合は、**Preview affected monitors** をクリックして該当するモニターを表示します。ダウンタイムのスケジューリング後に作成または編集されたモニターは、スコープに合致した場合に自動でダウンタイムに組み込まれます。

#### ダウンタイムスコープ

ダウンタイムを単純なアラートモニターに制限する場合、単純なアラートモニターはすべてのレポートソースを集約して単一のアラートを送信するため、`Group scope` フィールドは無視できます。

1 台のモニターから複数のアラートを送信している場合は、スコープに含まれるグループだけがサイレントに設定されます。たとえば、`host:X` がダウンタイムのスコープに含まれており、`host:X` と `host:Y` の両方に対してアラートがトリガーされる場合、Datadog は `host:Y` に対してのみモニター通知を生成します。`host:X` に対する通知は行われません。

以下の例は、`Group scope` をマルチアラートモニターに適用する方法を示しています。

{{< tabs >}}
{{% tab "モニター名で指定" %}}

**例 1: 特定のサービスの通知をミュートする**

1. 1 つのグループ (この場合は `service:web-store`) のみでダウンタイムをスケジュールするには、そのグループを `Group scope` フィールドに入力します。
2. **Preview affected monitors** は、選択したモニターがまだスコープ内にあることを示しているため、グループ `service:web-store` のアラートはスケジュールされたダウンタイム中にミュートされます。

{{< img src="monitors/downtimes/downtime_examplebyname1_downtime.jpg" alt="ダウンタイムの例"  style="width:80%;">}}

3. スケジュールされたダウンタイムが始まり、このモニターではグループ `service:web-store` のアラートのみがミュートされます。

{{< img src="monitors/downtimes/downtime_examplebyname1_monitor.jpg" alt="ダウンタイムの例"  style="width:80%;">}}

4. 複数のグループ (たとえば、`service:synthesizer`、`service:consul` など) でダウンタイムをスケジュールするには、グループごとに追加のダウンタイムを作成できます。

**例 2: `env` と `service` でグループ化されたモニターの特定の環境の通知をミュートする**

1. グループの 1 つ (この場合は `env:dev`) でダウンタイムをスケジュールするには、そのグループを `Group scope` フィールドに入力します。
2. **Preview affected monitors** は、選択したモニターがまだスコープ内にあることを示しているため、グループ `env:dev` のアラートはスケジュールされたダウンタイム中にミュートされます。

{{< img src="monitors/downtimes/downtime_examplebyname2_downtime.jpg" alt="スコープ内の開発環境でのモニター名によるダウンタイム" style="width:80%;">}}

3. スケジュールされたダウンタイムが始まり、グループ `env:dev` **および** `dev` 環境に関連するすべてのサービスのアラートがミュートされます。

{{< img src="monitors/downtimes/downtime_examplebyname2_monitor.jpg" alt="グループステータスは、ダウンタイム中にミュートされた開発環境と関連サービスを示します" style="width:80%;">}}

4. 1 つ以上の “group by” (例: `env:dev` AND `service:web-store`) でダウンタイムをスケジュールするには、ダウンタイムに追加スコープを追加します。
{{% /tab %}}
{{% tab "モニタータグで指定" %}}

スケジュールされたダウンタイムが共通のモニタータグに基づいており、スコープ内のモニターが 1 つの “group by” スコープを持つマルチアラートモニターである場合、`Group scope` フィールドを使用して、スコープ内のモニターが共通に持つグループをサイレントにできます。 

**例 1: それぞれが 1 つの “group by” スコープを持つ 2 つのマルチアラートモニターには、共通の `downtime:true` モニタータグがあります。**

1. *モニター A* は、複数の `service` グループにわたって平均されたメトリクスを報告するホスト用のマルチアラートモニターです。
2. *モニター B* は、`service:web-store` に対して同じメトリクスを報告するホスト用のマルチアラートモニターです。
3. ダウンタイムは、`downtime:true` モニタータグを持つすべてのモニターに対してスケジュールされます。
4. このダウンタイムは、グループ  `service:web-store` に制限されています。
5. 影響を受けるモニターをプレビューすると、両方のモニターのスコープにグループ `service:web-store` が含まれていることがわかります。

{{< img src="monitors/downtimes/downtime_examplebytag1_downtime.jpg" alt="ダウンタイムの例"  style="width:80%;">}}

6. *モニター A* は、ダウンタイムが開始されたことを示していますが、スコープ内のグループのみです: `service:web-store`

{{< img src="monitors/downtimes/downtime_examplebytag1_monitor.jpg" alt="ダウンタイムの例"  style="width:80%;">}}

7. *モニター B* は、`service:web-store` のダウンタイムが開始されたことを示しています。すべてのモニターのグループ (`host` ごと) は `service:web-store` に属しているため、このモニターのダウンタイム中にすべてのホストがミュートされます。

{{< img src="monitors/downtimes/downtime_examplebytag1_monitor2.jpg" alt="ダウンタイムの例"  style="width:80%;">}}

{{% /tab %}}
{{< /tabs >}}

### スケジュール

{{< tabs >}}
{{% tab " 単発" %}}

開始日時とタイムゾーンを指定して 1 回のみのダウンタイムを設定します。オプションで終了日時を設定することもできます。

{{< img src="monitors/downtimes/downtime_onetime.jpg" alt="アラートのダウンタイム"  style="width:80%;">}}

{{% /tab %}}
{{% tab "定期" %}}

定期的なメンテナンスなどには繰り返しのダウンタイム設定が便利です。

開始日時、タイムゾーン、繰り返し条件、期間を指定して定期のダウンタイムを設定します。オプションで終了日や繰り返し回数を設定することもできます。

毎回の定期ダウンタイムが終了すると、そのダウンタイムをキャンセルし、同じ条件（開始時間と終了時間が異なる）の新しいダウンタイムを作成するというパターンが繰り返されます。**注**: このように新しく作成されたダウンタイムはすべて、元の作成者に関連付けられます。

{{< img src="monitors/downtimes/downtime_recurring.jpg" alt="アラートのダウンタイム"  style="width:80%;">}}

RRULE (つまり[繰り返しルール][1]) を使用して、ダウンタイムのスケジュールを定義します。定期的なルールを生成するためのツールとして、公式の [RRULE ジェネレーター][2]を使用してください。

一般的な使用例は、RRULE を使用して月の特定の日のダウンタイムを定義することです。 たとえば、毎月第 3 月曜日に:

{{< img src="monitors/downtimes/downtime_rrule.jpg" alt="アラートのダウンタイム"  style="width:80%;">}}

**注**: RRULE で期間を指定する属性はサポートされません（例: `DTSTART`、`DTEND`、`DURATION`）。

[1]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[2]: https://icalendar.org/rrule-tool.html

{{% /tab %}}
{{< /tabs >}}

### メッセージの追加

このダウンタイムについてチームに通知するメッセージをフィールドに入力します。標準の[マークダウン形式][2]および Datadog の `@-notification` 構文での入力が可能です。

### チームへの通知

対象のチームメンバーを指定して通知するか、サービス[インテグレーション][3]にメッセージを送信します。

## 管理

ダウンタイムの管理ページには、アクティブなダウンタイムとスケジュールされたダウンタイムのリストが表示されます。ダウンタイムを選択して、詳細を表示、編集、または削除します。_Filter downtimes_ テキストボックスを使用して、ダウンタイムを検索します。
デフォルトでは、このテキストボックスは、ダウンタインの `monitor_name`、`scopes`、`monitor_tags`、`message`、`status` パラメーターを検索します。

### 履歴

ダウンタイム履歴は、[Monitor Status][4] ページにグループ遷移履歴のオーバーレイとして表示されます。または、[イベントストリーム][5]内で `tags:audit,downtime` を検索するか、`tags:audit,downtime_id:<ダウンタイム_ID>` を使用して特定のダウンタイムを ID で検索できます。

### ミュート設定

モニターは、`ALERT`、`WARNING`、`RESOLVED`、`NO DATA` 間でステータスが切り替わる際にイベントをトリガーします。モニターがミュートまたはダウンタイムによってサイレント状態になっている時は、`RESOLVED` から別の状態に変わっても、イベントや通知は**トリガーされません**。

{{< img src="monitors/downtimes/downtime_on_alert.png" alt="ダウンタイム時のアラート"  style="width:80%;">}}

**注**: UI を使用してモニターをミュートまたはミュート解除しても、そのモニターに関してスケジュールされたダウンタイムは削除されません。ダウンタイムを編集または削除するには、[Manage Downtimes][1] ページから設定を変更するか、[API][6] を使用する必要があります。

ダウンタイムの期限が切れたときにモニターのステータスがアラート対象（`ALERT`、`WARNING`、`NO DATA`）の場合、モニターは強制リカバリされ、アラートの条件が満たさされればすぐに再トリガーされます。これは、ダウンタイム中にモニターのステータスが（たとえば `OK` から `ALERT`、`WARNING`、または `NO DATA` に）変わったモニターや、ダウンタイムの開始時にすでにアラート対象のステータスであったモニターも同様です。

**例 1:** モニターがダウンタイムの開始*前に*アラートの状態で、ダウンタイム中も*継続*した場合:
1. ダウンタイム中、このアラートの通知は停止されます。
2. モニターはアラートの状態です（依然として条件が満たされているため）。
3. ダウンタイムが終了します。
4. モニターが強制リカバリされます。
5. アラート条件が満たされるため、通知が送信されます。

**例 2:** モニターがダウンタイムの開始*前に*アラートの状態で、ダウンタイム*中に*リカバリした場合:
1. アラート状態から `OK` に移行します。
2. ダウンタイム中にリカバリ通知が送信されます（ダウンタイム中最初のリカバリのみ）。

### モニターレポート

[週間モニターレポート][7]には、ダウンタイム時を含むすべてのアラートのステータスが含まれます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#/downtime
[2]: http://daringfireball.net/projects/markdown/syntax
[3]: /ja/integrations/#cat-notification
[4]: /ja/monitors/monitor_status/
[5]: /ja/events/#event-stream
[6]: /ja/api/v1/downtimes/#cancel-a-downtime
[7]: /ja/account_management/#preferences