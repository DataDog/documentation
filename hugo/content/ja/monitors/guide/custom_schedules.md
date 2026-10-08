---
description: RRULE パターンを使用した高度なスケジュールにより、重要なジョブのカスタムモニターを、日次、週次、または月次の間隔でスケジュールします。
disable_toc: false
further_reading:
- link: https://docs.datadoghq.com/monitors/configuration/?tab=thresholdalert#evaluation-frequency
  tag: ドキュメント
  text: モニター評価頻度について
- link: /monitors/downtimes
  tag: ドキュメント
  text: ダウンタイム
- link: /monitors/configuration/?tab=thresholdalert#evaluation-window
  tag: ドキュメント
  text: 累積タイムウィンドウ
title: モニター評価頻度のカスタマイズ
---
## 概要 {#overview}

特定の評価時間を設定し、モニターの評価頻度を制御して、環境で実行されている重要なジョブの実行を追跡します。モニターカスタムスケジュールにより、cron ジョブのように継続的な監視を必要としないシステムやプロセスにアラートを出すことができます。

モニターカスタムスケジュールは、毎日、毎週、毎月のスケジュール間隔で、イベント、ログ、メトリクスモニターでサポートされています。

## 構成 {#configuration}

{{< img src="/monitors/guide/custom_schedules/add_custom_schedule.png" alt="モニター構成にカスタムスケジュールを追加するためのボタン" style="width:100%;" >}}

{{< ui >}}Add Custom Schedule{{< /ui >}} をクリックして、評価頻度を構成します。

<div class="alert alert-danger">モニターでカスタムスケジュールが有効になっている場合、そのカスタムスケジュールを無効にすることはできません。カスタムスケジュールは、モニターの作成時にのみ追加または削除できます。{{< ui >}}Remove non-reporting groups{{< /ui >}} 設定は使用できません。これを回避するには、カスタムスケジュールを使用しない新しいモニターを作成してください。
</div>

{{< tabs >}}
{{% tab "日" %}}
モニターで評価したい時刻を選択します。

たとえば、次のモニターは毎日午後 8 時に、日次バックアップジョブが各データベースインスタンスの成功イベントを生成したことを確認します。

{{< img src="monitors/guide/custom_schedules/custom_day.png" alt="毎日午後 8 時に、日次バックアップジョブの結果として各データベースインスタンスに成功イベントが生成されたことを確認するモニター構成" style="width:100%;" >}}

{{% /tab %}}

{{% tab "週" %}}
モニターで評価したい曜日と時刻を選択します。

たとえば、次のモニターは毎週火曜日と土曜日の午前 6 時に、各個別キャンペーンのマーケティングメールが送信されたことを確認します。

{{< img src="monitors/guide/custom_schedules/custom_week.png" alt="毎週火曜日と土曜日の午前 6 時に、各個別キャンペーンのマーケティングメールが送信されたことを確認するモニター構成" style="width:100%;" >}}

{{% /tab %}}

{{% tab "月" %}}
モニターで評価したい月の日付と時刻を選択します。

たとえば、次のモニターは毎月 1 日に、顧客の請求書を生成する cron ジョブが正常に実行されたかどうかを確認します。

{{< img src="monitors/guide/custom_schedules/custom_month.png" alt="毎月 1 日に、顧客の請求書を生成する cron ジョブが正常に実行されたかどうかを確認するモニター構成。" style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

## RRULES {#rrules}

繰り返しルール (RRULE) は [iCalendar RFC][1] のプロパティ名で、定期的なイベントを定義する際の標準形式です。繰り返しのルールを生成するためのツールとして、[公式の RRULE ジェネレーター][2]を使用してください。RRULE を活用して、より高度なスケジューリングのユースケースに対応します。

モニター用にカスタム RRULE を作成するには、{{< ui >}}Use RRULE{{< /ui >}} をクリックします。

**注**:
- RRULE で期間を指定する属性はサポートされていません (例: DTSTART、DTEND、DURATION)。
- 評価頻度は 1 日以上でなければなりません。評価頻度が 1 日より短い場合は、デフォルトのモニタースケジュールを使用してください。

#### 例: モニターは月の最終日に評価する {#example-monitor-evaluates-on-the-last-day-of-the-month}

```text
FREQ=MONTHLY;BYMONTHDAY=28,29,30,31;BYSETPOS=-1
```
{{< img src="monitors/guide/custom_schedules/RRULE_last_day_month.png" alt="月の最終日に評価するために UI で使用される RRULE 構文" style="width:90%;" >}}

#### 例: モニターは隔月の第 1 日曜日と最終日曜日に評価する: {#example-monitor-evaluates-every-other-month-on-the-first-and-last-sunday-of-the-month}

```text
FREQ=MONTHLY;INTERVAL=2;BYDAY=1SU,-1SU
```

{{< img src="monitors/guide/custom_schedules/RRULE_month_last_sunday.png" alt="隔月の第 1 日曜日と最終日曜日に評価するために UI で使用される RRULE 構文" style="width:90%;" >}}

## カスタムスケジュールによるモニターのアラート動作 {#alerting-behavior-of-monitors-with-custom-schedules}

デフォルトのスケジューリングを使用しているモニターは、デフォルトの評価頻度でクエリを実行し、モニターステータスの遷移 (例: モニターが WARN から OK になったとき、または OK から ALERT になったとき) に基づいてアラートを送信します。

以下のタイムラインは、デフォルトのスケジューリングによるモニターの動作を示しています。モニターはステータスの変化に対応してアラートを送信します。

{{< img src="monitors/guide/custom_schedules/alerting_behavior_regular.png" alt="30 分の評価頻度を持つデフォルトスケジュールのモニター状態遷移に基づき、モニターがアラートを送信するタイミングを示す視覚的な図" style="width:100%;" >}}

一方、カスタムスケジュールのモニターは、日、週、月単位で評価を行い、個々の評価結果に基づいてアラートを送信します。各評価は前の評価から独立しており、結果に問題がある場合に通知を送信します。

以下のタイムラインは、カスタムスケジュールで実行されるモニターの動作を示しています。デフォルトのスケジュール設定のモニターとは異なり、カスタムスケジュール設定のモニターは、評価時にモニターの状態に基づいてアラートを送信します。
{{< img src="monitors/guide/custom_schedules/alerting_behavior_custom.png" alt="日次の評価頻度を持つカスタムスケジュールのモニター状態に基づき、モニターがアラートを送信するタイミングを示す視覚的な図" style="width:100%;" >}}

## グループ保持 {#group-retention}

デフォルトでは、[グループはグループのレポートが停止してから 24 時間または 48 時間保持された後][3]、モニターから削除されます。カスタムスケジュールを設定したモニターは、グループをより長く保持します。その保持時間は、設定した評価頻度に応じて拡大します。
| 評価頻度 | グループ保持時間 |
|-----------------------|------------------|
| 毎日                 | 30 日間          |
| 毎週                | 90 日間          |
| 毎月               | 180 日間         |

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://icalendar.org/rrule-tool.html
[2]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[3]: https://docs.datadoghq.com/ja/monitors/configuration/?tab=thresholdalert#group-retention-time