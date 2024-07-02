---
title: Customize monitor evaluation frequencies
disable_toc: false
further_reading:
- link: "https://docs.datadoghq.com/monitors/configuration/?tab=thresholdalert#evaluation-frequency"
  tag: Documentation
  text: Learn about monitor evaluation frequency
- link: /monitors/downtimes
  tag: Documentation
  text: Downtimes
- link: "/monitors/configuration/?tab=thresholdalert#evaluation-window"
  tag: Documentation
  text: Cumulative time windows
---

## 概要 

特定の評価時間を設定し、モニターの評価頻度を制御して、環境で実行されている重要なジョブの実行を追跡します。モニターカスタムスケジュールにより、cron ジョブのような継続的に監視する必要のないシステムやプロセスにアラートを出すことができます。

モニターカスタムスケジュールは、毎日、毎週、毎月のスケジュール間隔で、イベント、ログ、メトリクスモニターでサポートされています。

## 構成

{{< img src="/monitors/guide/custom_schedules/add_custom_schedule.png" alt="モニター構成にカスタムスケジュールを追加するボタン" style="width:100%;" >}}

**Add Custom Schedule** をクリックして、評価頻度を構成します。

<div class="alert alert-warning">モニターでカスタムスケジュールを有効にした後、スケジュールを無効にすることはできません。カスタムスケジュールを追加または削除できるのは、モニターの作成中のみです。
</div>

{{< tabs >}}
{{% tab "日" %}}
モニターで評価したい時刻を選択します。

例えば、次のモニターは毎日午後 8 時に、日次バックアップジョブが各データベースインスタンスの成功イベントを生成したことを確認します。

{{< img src="monitors/guide/custom_schedules/custom_day.png" alt="毎日午後 8 時に、日次バックアップジョブの結果として各データベースインスタンスに成功イベントが生成されたことを確認するモニター構成" style="width:100%;" >}}

{{% /tab %}}

{{% tab "週" %}}
モニターで評価したい曜日と時刻を選択します。

例えば、次のモニターは毎週火曜日と土曜日の午前 6 時に、各個別キャンペーンのマーケティングメールが送信されたことを確認します。

{{< img src="monitors/guide/custom_schedules/custom_week.png" alt="毎週火曜日と土曜日の午前 6 時に、各個別キャンペーンのマーケティングメールが送信されたことを確認するモニター構成" style="width:100%;" >}}

{{% /tab %}}

{{% tab "月" %}}
モニターで評価したい月の日付と時刻を選択します。

例えば、次のモニターは毎月 1 日に、顧客の請求書を生成する cron ジョブが正常に実行されたかどうかを確認します。

{{< img src="monitors/guide/custom_schedules/custom_month.png" alt="毎月 1 日に、顧客の請求書を生成する cron ジョブが正常に実行されたかどうかを確認するモニター構成。" style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

## RRULE

繰り返しルール (RRULE) は、繰り返しイベントを定義するための標準である [iCalendar RFC][1] のプロパティ名です。[公式 RRULE ジェネレーター][2]を使用して、繰り返しルールを生成します。RRULE を活用することで、より高度なスケジューリングのユースケースに対応できます。

モニター用にカスタム RRULE を作成するには、**RRULE** をクリックします。

**注**: 
- RRULE で期間を指定する属性はサポートされていません (例: DTSTART、 DTEND、DURATION)。
- 評価頻度は 1 日以上でなければなりません。評価頻度が 1 日より短い場合は、デフォルトのモニタースケジュールを使用してください。

#### 例: モニターは月の最終日に評価する
```text
FREQ=MONTHLY;BYMONTHDAY=28,29,30,31;BYSETPOS=-1
```
{{< img src="monitors/guide/custom_schedules/RRULE_last_day_month.png" alt="月の最終日に評価するために UI で使用される RRULE 構文" style="width:90%;" >}}

#### 例: モニターは隔月の第 1 日曜日と最終日曜日に評価する

```text
FREQ=MONTHLY;INTERVAL=2;BYDAY=1SU,-1SU
```

{{< img src="monitors/guide/custom_schedules/RRULE_month_last_sunday.png" alt="隔月の第 1 日曜日と最終日曜日に評価するために UI で使用される RRULE 構文" style="width:90%;" >}}

## カスタムスケジュールによるモニターのアラート動作

デフォルトのスケジューリングを使用しているモニターは、デフォルトの評価頻度でクエリを実行し、モニターステータスの遷移 (例えば、モニターが WARN から OK になったとき、または OK から ALERT になったとき) に基づいてアラートを送信します。

以下のタイムラインは、デフォルトのスケジューリングによるモニターの動作を示しています。モニターはステータスの変化に対応してアラートを送信します。

{{< img src="monitors/guide/custom_schedules/alerting_behavior_regular.png" alt="30 分の評価頻度を持つデフォルトスケジュールのモニター状態遷移に基づき、モニターがアラートを送信するタイミングを示す視覚的な図" style="width:100%;" >}}

一方、カスタムスケジュールのモニターは、日、週、月単位で評価を行い、個々の評価結果に基づいてアラートを送信します。各評価は前の評価から独立しており、結果に問題がある場合に通知を送信します。

以下のタイムラインは、カスタムスケジュールで実行されるモニターの動作を示しています。デフォルトのスケジュールされたモニターとは異なり、カスタムのスケジュールされたモニターはモニターの状態に基づいて評価時間中にアラートを送信します。
{{< img src="monitors/guide/custom_schedules/alerting_behavior_custom.png" alt="1 日の評価頻度を持つカスタムスケジュールのモニター状態に基づき、モニターがアラートを送信するタイミングを示す視覚的な図" style="width:100%;" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://icalendar.org/rrule-tool.html
[2]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
