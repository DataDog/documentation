---
title: イベントモニター
kind: documentation
description: Datadog によって収集されたイベントを監視する
further_reading:
  - link: monitors/notifications
    tag: Documentation
    text: モニター通知の設定
  - link: monitors/downtimes
    tag: Documentation
    text: モニターをミュートするダウンタイムのスケジュール
  - link: monitors/monitor_status
    tag: Documentation
    text: モニターステータスの参照
---
## 概要

イベントモニターを使用すると、クエリと一致するイベントが発生したときにアラートを生成できます。

1. 監視するクエリとパラメーター (ステータス、優先度、ソース、タグ) を選択します。
    {{< img src="monitors/monitor_types/event/event_monitor_selection.png" alt="event monitor selection" responsive="true" style="width:80%;">}}
2. アラートグループを選択します。
    {{< img src="monitors/monitor_types/event/event_alert_grouping.png" alt="event monitor alert grouping" responsive="true" style="width:80%;">}}

3. **アラート生成条件**を選択します。**しきい値**および**タイムフレーム**オプションを使用すると、タイムフレーム内にイベントが何回発生したらモニターをトリガーするかを設定できます。
    {{< img src="monitors/monitor_types/event/event_monitor_alert_conditions.png" alt="event monitor alert conditions" responsive="true" style="width:80%;">}}

    **注**: 一部のプロバイダーでは、イベントが**ポスト**されてから実際に発生するまでにかなりの遅延が生じます。このような場合、Datadog はイベントを発生時刻にさかのぼって記録しますが、それがモニターに異常な評価動作を引き起こす可能性があります。このような動作が見られた場合は、[Datadog のサポートチーム][1]までお問い合わせください。
4. **通知オプション**を構成します。
    詳細については、[通知](#monitor-notifications)ドキュメントを参照してください。

## イベントモニターでのイベントタグの使用

イベントモニターでは、イベントと共に送信されるタグを使用してイベントを特定したり、モニターの動作やメッセージをカスタマイズすることができます。最初に、全文イベント検索の検索パラメーターを定義します。特定のタグを検索する場合は、そのタグも検索に含めることができます。たとえば以下のとおりです。

`My Example Event #example-tag`

{{< img src="monitors/monitor_types/event/define_event.png" alt="define_event" responsive="true" style="width:80%;">}}

## 通知でのイベントテンプレート変数の使用

イベントモニター通知にイベント固有の情報を含めることができます。使用できるテンプレート変数は、以下のとおりです。

| テンプレート変数        | 定義                                                               |
| ------                   | ------                                                                   |
| `{{event.id}}`           | イベントの ID                                                         |
| `{{event.title}}`        | イベントのタイトル                                                       |
| `{{event.text}}`         | イベントのテキスト                                                        |
| `{{event.host.name}}`    | イベントを生成したホスト名                                        |
| `{{event.tags.tagname}}` | イベントにアタッチされるタグ。`tagname` をタグの名前に置き換えてください。 |

{{< img src="monitors/monitor_types/event/event_notification_template.png" alt="event_notification_template" responsive="true" style="width:60%;">}}

`event.tags` と `event.tags.tagname` を使用すると、タグの値をマークダウン形式で取得できます。たとえば、以下のとおりです。

{{< img src="monitors/monitor_types/event/whats_happening.png" alt="whats_happening" responsive="true" style="width:60%;">}}

アラートがトリガーされたときに、タグと一致するイベントが Datadog 内で見つかると、それがすべてメッセージに表示されます。

{{< img src="monitors/monitor_types/event/triggered_event.png" alt="triggered_event" responsive="true" style="width:60%;">}}

## その他の参考資料 
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help