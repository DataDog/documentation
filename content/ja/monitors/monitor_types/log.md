---
title: ログモニター
kind: documentation
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
{{< img src="monitors/monitor_types/log/log_monitor_overview.png" alt="Log monitor overview"  >}}

## 概要

ログモニターは、指定された種類のログが、ユーザー定義のしきい値を一定時間超えた場合にアラートを生成します。

## セットアップ

監視対象を制御するためのクエリを作成します。

1. 検索クエリを定義します。
    {{< img src="monitors/monitor_types/log/define_the_search_query.png" alt="Define the search query"  style="width:50%;" >}}
    検索クエリは、[ログエクスプローラーの検索機能][1]と同様に動作します。

2. 監視する[メジャー][1]または[ファセット][2]を選択します。[メジャー][1]を選択した場合は、集計関数を選択します。[ファセット][2]を選択した場合は、カウントが表示されます。

    {{< img src="monitors/monitor_types/log/choose_measure_facet.png" alt="choose measure facet"  style="width:50%;">}}

3. 監視する[メジャー][1]の集計関数を選択します。

    {{< img src="monitors/monitor_types/log/agg_function.png" alt="aggregation function for Log Analytics"  style="width:50%;">}}

4. (オプション) アラートグループを定義します。
  {{< img src="monitors/monitor_types/log/log_monitor_group_by.png" alt="Set alert conditions"  style="width:50%;" >}}
    アラートグループが定義されているかどうかにかかわらず、集計値が以下で設定する条件を満たしたときに、アラートを **1 つ**受け取ります。クエリをホストで分割した場合でも、複数のホストが以下で設定する条件を満たすと、通知が 1 つだけ送信されます。これは、通知ノイズを減らすためです。

5. アラート条件を設定します。以下のオプションを使用できます。

  {{< img src="monitors/monitor_types/log/above_below.png" alt="aggregation function for Log Analytics"  style="width:50%;">}}

6. **通知オプション**を構成します。

  {{< img src="monitors/monitor_types/log/set_alert_conditions.png" alt="Set alert conditions"  style="width:50%;" >}}

  詳細オプションについては、[通知][2]ドキュメントを参照してください。


## 通知とログサンプル

モニターをトリガーしたログのサンプルを最大 10 個まで通知メッセージに追加できます。
これは、Slack、Jira、Webhook、Microsoft Teams、および電子メール通知で利用できます。

* リカバリ通知にサンプルは表示されません。

 **通知でログサンプルを有効にする**

  {{< img src="monitors/monitor_types/log/activate-log-monitor-sample.png" alt="Activate log samples in message"  style="width:50%;" >}}

  **Slack 通知の例** 

  {{< img src="monitors/monitor_types/log/slack-log-sample.png" alt="Slack notification example"  style="width:50%;" >}}

### グループの通知

グループで分割されたモニターから送信される通知には、10 個のログサンプルではなく、上位 10 個の違反値のリストを含めることができます。

 **通知で上位 10 個の違反値を有効にする**

{{< img src="monitors/monitor_types/log/activate-log-multi-monitor-sample.png" alt="Activate log samples in message"  style="width:50%;" >}}

**Slack 通知の例** 

 {{< img src="monitors/monitor_types/log/slack-log-multi-sample.png" alt="Slack notification example"  style="width:50%;" >}}

## データなしアラートと下限条件  

特定のログセットが受信されなくなった場合に通知を受け取るには、アラート条件を `below 1` に設定します。これにより、指定のタイムフレームでモニタークエリと一致するログがない場合に通知が行われます。

ただし、モニターを何らかのディメンション (タグまたはファセット) で分割している場合に `below` 条件を使用すると、特定のグループのログが存在してカウントがしきい値未満である場合、または**すべての**グループについてログが存在しない場合に、アラートがトリガーされます。

例:  

1. 次のモニターは、すべてのサービスについてログが存在しない場合にのみトリガーします。
  {{< img src="monitors/monitor_types/log/log_monitor_below_by_service.png" alt="Below monitor split by service"  style="width:50%;" >}}
2. 次のモニターは、サービス `backend` のログが存在しない場合にトリガーします。
  {{< img src="monitors/monitor_types/log/log_monitor_below_condition.png" alt="Below monitor for backend service"  style="width:50%;" >}}

## その他の参考資料 
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/search
[2]: /ja/monitors/notifications