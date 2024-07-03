---
description: Learn how to monitor your RUM usage and receive alerts on unexpected
  spikes and impending thresholds.
further_reading:
- link: /real_user_monitoring/
  tag: Documentation
  text: Learn about Real User Monitoring
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to query RUM events
- link: /monitors/
  tag: Documentation
  text: Learn about monitors
title: Monitor Your RUM Usage
---

## 概要

このガイドの目的は、以下で RUM の使用量を監視する方法を説明することです。

- RUM の推定使用量メトリクス
- アカウントに保存されている RUM イベント

このガイドでは、特定の SKU またはアプリケーションの下で価格設定された RUM セッションの量を追跡する方法、予想されるトラフィックの急増に対するアラート、およびセッションの予算のしきい値に近づいている場合のアラートについて説明します。

## RUM 使用量メトリクス

このメトリクスは無料で、15 ヶ月間使用できます。

{{< img src="real_user_monitoring/guide/monitor-your-rum-usage/estimated-usage-metric-details.png" alt="推定使用量メトリクス詳細サイドパネル" style="width:90%" >}}

デフォルトでは、RUM `datadog.estimated_usage.rum.sessions` [メトリクス][1]を使用して、以下の情報でユーザーセッションの数を追跡できます。

- アプリケーション ID: **Application Overview** ページで利用可能なアプリケーションを識別します
- サービス: 特定のチームに属する RUM アプリケーション内のスコープ。
- ソース: どのプログラミング言語またはフレームワークで構築されているか。
- SKU: セッションがどの有料プランで提供されているか。

### アプリケーションのセッション数の追跡

RUM アプリケーションによって生成されたセッション数を追跡するには、[ダッシュボードリスト][2]に移動して、RUM 使用量の傾向を追跡するダッシュボードを選択します。

1. **+ Add Widgets** をクリックすると、ウィジェットとアプリのサイドパネルが表示されます。
2. **Graphs** の下にある **Timeseries** を選択します。
3. **Graph your data** セクションで、ドロップダウンメニューから **Metrics** と `datadog.estimated_usage.rum.sessions` を選択します。
4. `from` 節で、追跡したいアプリケーション ID を選択します。RUM のアプリケーション ID は、その **Application Overview** ページで確認できます。
5. 表示設定を行い、グラフの名前を入力します。
6. **Save** をクリックします。

### SKU の下で価格設定されたセッション数の追跡

特定の RUM SKU で価格設定されたセッション数を追跡するには、[ダッシュボードリスト][2]に移動して、RUM 使用量の傾向を追跡するダッシュボードを選択します。

1. **+ Add Widgets** をクリックすると、ウィジェットとアプリのサイドパネルが表示されます。
2. **Graphs** の下にある **Timeseries** を選択します。
3. **Graph your data** セクションで、ドロップダウンメニューから **Metrics** と `datadog.estimated_usage.rum.sessions` を選択します。
4. `sum` 節で、ドロップダウンメニューから `sku` タグを選択します。
5. 表示設定を行い、グラフの名前を入力します。
6. **Save** をクリックします。

## 予期せぬスパイクにアラートを生成

RUM メトリクスは、[異常検知モニター][3]で使用できます。

{{< img src="real_user_monitoring/guide/monitor-your-rum-usage/anomaly-monitor-notification.png" alt="異常検知モニターでの通知メッセージの例" style="width:90%" >}}

予期せぬセッション数の急増に対してアラートを受け取れるように異常検知モニターを作成します。

1. RUM アプリケーションの **Application Overview** ページにアクセスし、アプリケーション ID をコピーします。
2. [異常検知モニターを作成します][4]。
3. ドロップダウンメニューから、`datadog.estimated_usage.rum.sessions` メトリクスを選択します。
4. `from` 節に、RUM アプリケーションがトラフィックを急増させたり、イベントの送信を停止した場合に通知される `application.id` を入力します。
5. 使用状況に一致するアラート条件を設定します (例: 評価ウィンドウ、予測範囲外の回数)。
6. 実行可能な指示を記述した通知メッセージを設定します。

   この通知メッセージの例には、コンテキストリンクが含まれています。

   ```
   An unexpected amount of sessions has been captured for application.id {{application.id}}.

   1. [Check the session count in the RUM Explorer for this application](https://app.datadoghq.com/rum/explorer?query=%40type%3Asession%20%40application.id%{{application.id}}&viz=timeseries&from_ts=1649824870521&to_ts=1649828470521&live=true).
   2. [Investigate whether this session count is unexpected in a specific geography or device using the query engine](https://docs.datadoghq.com/real_user_monitoring/explorer/group/).
   ```

7. このモニターの権限と通知の設定をします。
8. **Create** をクリックします。

## 固定しきい値で RUM セッションを監視する

{{< img src="real_user_monitoring/guide/monitor-your-rum-usage/anomaly-monitor-notifications-warning-rate.png" alt="異常検知モニターで警告率を表示した通知メッセージの例" style="width:90%" >}}

セッション数が予期せず増加し、しきい値に近づいたときにアラートを受ける異常検知モニターを作成します。

1. [Datadog RUM Explorer][5] ビューに移動します。
2. 監視するボリュームを表す検索クエリを構築します。すべてのユーザーセッションを監視する場合は、クエリを空白にします。
3. **Export to monitor** をクリックします。
4. 設定したいレートを `warning` または `error` として定義します。
5. 具体的な通知メッセージを設定します。

   この通知メッセージの例には、アクションの指示が含まれています。

   ```
   Shopist.io is sending too many user sessions. Go to the application's codebase and decrease the sample rate. Here is the (documentation)[https://docs.datadoghq.com/real_user_monitoring/guide/sampling-browser-plans] for how to do so.

   {{#is_warning}}@slack-Shopist-alerts {{/is_warning}}

   {{#is_alert}}@pagerduty-shopist{{/is_alert}}
   ```

6. このモニターの権限と通知の設定をします。
7. **Create** をクリックします。

アプリケーションの任意のスコープ (`application.id`、`geography`、`device` など) でキャプチャしたセッションの量が通知されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/billing/usage_metrics/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /ja/monitors/types/anomaly/
[4]: https://app.datadoghq.com/monitors#create/anomaly
[5]: https://app.datadoghq.com/rum/explorer?query=%40type%3Asession