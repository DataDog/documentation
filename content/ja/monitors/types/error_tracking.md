---
title: Error Tracking Monitor
description: Learn about the Error Tracking monitor type.
aliases :
  - /monitors/create/types/error_tracking/
further_reading:
- link: /real_user_monitoring/error_tracking/
  tag: Documentation
  text: Learn about Error Tracking for Web and Mobile Applications
- link: /tracing/error_tracking/
  tag: Documentation
  text: Learn about Error Tracking for Backend Services
- link: /logs/error_tracking/
  tag: Documentation
  text: Learn about Error Tracking for Logs
- link: /monitors/notify/
  tag: Documentation
  text: Configure your monitor notifications
- link: /monitors/downtimes/
  tag: Documentation
  text: Schedule a downtime to mute a monitor
- link: /monitors/manage/status/
  tag: Documentation
  text: Check your monitor status
---

## 概要

Datadog Error Tracking automatically groups all your errors into issues across your web, mobile, and backend applications. Viewing errors grouped into issues helps you prioritize and find the problems that are most impactful, making it easier to minimize service downtimes and reduce user frustration.

組織の[リアルユーザーモニタリング][1]、[APM][2]、[ログ][6]を有効にすると、Web またはモバイルアプリケーション、バックエンドサービス、ログで問題が発生したとき、影響が大きいとき、そして回帰が始まったときにアラートを発するエラー追跡モニターを作成することができるようになります。

## エラー追跡モニターを作成する

Datadog でエラー追跡モニターを作成するには、[**Monitors** > **New Monitor** > **Error Tracking**][3] に移動します。

<div class="alert alert-info"><strong>注</strong>: アカウント当たり上限 1000 件のエラー追跡モニターがデフォルトで設定されています。この制限を増やすには、<a href="/help/">サポートまでお問い合わせ</a>ください。</div>

### アラート条件を選択する

There are two types of alerting conditions you can configure your Error Tracking monitor with:

| Alerting&nbsp;condition     | 説明    | 
| ---  | ----------- |
|カウント| Alert on issues with a high number of errors. For example, alert for your service whenever more than 500 occurrences of your error happen. |
|New Issue| Triggers when an issue occurs for the first time. You have the option to be notified if a regression occurs, and set a threshold to reduce alerting fatigue.|

### 検索クエリを定義する

{{< tabs >}}
{{% tab "Count" %}}

1. ドロップダウンメニューから **RUM Events**、**Traces**、または **Logs** を選択し、監視するメトリクス (カウント、ファセット、またはメジャー) を選択します。
   - エラーの発生については、課題 ID に基づいた全体のカウントで監視します。
   - 影響を受けたユーザーについては、課題 ID に基づくユーザーメールの一意のカウント、またはメジャーで監視します。
   - 影響を受けたセッションについては、課題 ID に基づくセッション ID の一意のカウントで監視します。
   - メジャーで監視します。メジャーを選択すると、モニターは (メトリクスモニターと同様に) RUM ファセットの数値に対してアラートを発出します。集計タイプ (`min`、`avg`、 `sum`、`median`、`pc75`、`pc90`、`pc95`、`pc98`、`pc99`、または `max`) を選択します。

   最も頻繁に使用されるファセットにアクセスするための 3 つのクイックフィルターオプションがあります。

   - **Error Occurrences**: エラーカウントが `above` または `above or equal to` のときにトリガーします。
   - **Impacted Users**: 影響を受けたユーザーのメール数が `above` または `above or equal to` のときにトリガーします。
   - **Impacted Sessions**: 影響を受けたセッション ID の数が `above` または `above or equal to` のときにトリガーします。

   ドロップダウンメニューから **Traces** または **Logs** を選択した場合、**Error Occurrences** オプションのみが利用可能です。

2. [RUM エクスプローラー検索][1]、[APM エクスプローラー検索][3]または[ログエクスプローラー検索][4]と同じロジックで、課題のエラー発生状況を検索するクエリを作成します。
3. オプションで、アラートのグループ化ストラテジーを構成します。詳細については、[モニターの構成][2]を参照してください。

<div class="alert alert-info"><strong>注</strong>: APM のカウントモニターは、インテリジェント保持フィルターではなく、<a href="/tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter/">カスタム保持フィルター</a>により保持されているスパンに基づいてのみ作成できます。</div>

### アラートの条件を設定する

エラーカウントが `above` または `above or equal to` のときにトリガーします。メトリクスがしきい値を超えるたびにアラートがトリガーされます。

[1]: /real_user_monitoring/explorer/search/
[2]: /monitors/configuration/#alert-grouping/
[3]: /tracing/trace_explorer/?tab=listview#filtering
[4]: /logs/explorer/search/
{{% /tab %}}

{{% tab "新しい課題" %}}

1. 課題が最初に発生した後、モニターが新しい課題とみなすまでの期間を選択または入力します。選択されたしきい値は、指定された時間枠で評価されます。特定の期間を過ぎると、モニターはアラートを停止し、緑色に変わります。

   上部の問題リストには、個別の時間枠セレクターがあります。この時間枠で新しいと思われる問題を見つけるために使用できます。
2. **RUM Events**、**Traces**、または **Logs** を選択し、カウントまたは[メジャー][1]で監視することを選択します。
   - 特定の課題 ID の発生カウントを監視します。
   - Monitor over a measure. If you select a measure, the monitor alerts over the numerical value of the RUM or APM facet (similar to a metric monitor). Select an aggregation type (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99`, or `max`).
3. [RUM エクスプローラー検索][2]、[APM エクスプローラー検索][3]または[ログエクスプローラー検索][5]と同じロジックで、課題のエラー発生状況を検索するクエリを作成します。
4. オプションで、アラートのグループ化ストラテジーを構成します。詳細については、[モニターの構成][4]を参照してください。

### アラートの条件を設定する

エラーの数が `above` または `above or equal to` のとき、モニターがトリガーします。

- モニターのメトリクスを評価する時間幅を 5 分から 48 時間の間で設定します (`5 minutes`、`15 minutes`、`1 hour`、`custom` など)。
- アラートのしきい値 > `<NUMBER>` を設定します。
- 警告のしきい値 > `<NUMBER>` を設定します。

[1]: /real_user_monitoring/explorer/?tab=measures#setup-facets-measures
[2]: /real_user_monitoring/explorer/search/
[3]: /tracing/trace_explorer/?tab=listview#filtering
[4]: /monitors/configuration/#alert-grouping/
[5]: /logs/explorer/search/
{{% /tab %}}
{{< /tabs >}}

#### 高度なアラート条件

評価頻度などの高度なアラートオプションについて、詳しくは[モニターの構成][4]をご覧ください。

### 通知

通知タイトルにトリガータグを表示するには、**Include triggering tags in notification title** をクリックします。

For more information about the **Configure notifications and automations** section, see [Notifications][5].

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/
[2]: /tracing/
[3]: https://app.datadoghq.com/monitors/create/error-tracking
[4]: /monitors/configuration/#advanced-alert-conditions
[5]: /monitors/notify/
[6]: /logs/
