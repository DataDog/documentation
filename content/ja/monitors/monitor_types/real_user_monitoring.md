---
title: リアルユーザーモニタリングモニター
kind: ドキュメント
further_reading:
  - link: /monitors/notifications/
    tag: ドキュメント
    text: モニター通知の設定
  - link: /monitors/downtimes/
    tag: ドキュメント
    text: モニターをミュートするダウンタイムのスケジュール
  - link: /monitors/monitor_status/
    tag: ドキュメント
    text: モニターステータスを確認
---
## 概要

組織で[リアルユーザーモニタリング (RUM) を有効][1]にすると、指定したタイプの RUM イベントがユーザー定義のしきい値を一定期間にわたって超えた場合にアラートを発するように RUM モニターを作成することができます。

## モニターの作成

Datadog で [RUM モニター][2]を作成するには、メインナビゲーションで、*Monitors --> New Monitor --> Real User Monitoring* の順に移動します。

### 検索クエリを定義する

検索クエリを定義すると、検索フィールドの上にあるグラフが更新されます。

1. [RUM エクスプローラー検索][3]と同じロジックを使用して検索クエリを作成します。
2. RUM イベント数、[ファセット][4]、または[計測][5]のモニタリングを選択します。
    * **Monitor over a RUM count**: 検索バーを使用し (任意)、ファセットまたはメジャーは選択**しません**。選択されたタイムフレームで Datadog が RUM イベント数を評価し、それをしきい値の条件と比較します。
    * **Monitor over a facet**: [ファセット][4]を選択すると、モニターはファセットの `Unique value count` に対してアラートを発出します。
    * **Monitor over measure**: [メジャー][5]を選択すると、モニターは (メトリクスモニターと同様に) RUM ファセットの数値に対してアラートを発出します。また、集計を選択する必要があります (`min`、`avg`、 `sum`、`median`、`pc75`、`pc90`、`pc95`、`pc98`、`pc99`、または `max`)。
3. アラートグループを定義します (任意)。**注**: アラートグループが定義されているかどうかにかかわらず、集計値が設定された条件を満たしたときに、アラートを **1 件**受け取ります。クエリを国で分割した場合でも、複数の国が設定された条件を満たすと、通知が 1 件だけ送信されます。これは、通知ノイズを減らすためです。

{{< img src="monitors/monitor_types/rum/define-the-search-query.png" alt="検索クエリの定義"  style="width:60%;" >}}

### アラートの条件を設定する

* メトリクスが `above`、`above or equal to`、`below`、`below or equal to` の場合にトリガーされる
* 過去 `5 minutes`、`15 minutes`、`1 hour` などの間のしきい値、または `custom` に 5 分～48 時間の値を設定します。
* アラートのしきい値 `<NUMBER>`
* 警告のしきい値`<NUMBER>`

#### データなしと下限のアラート

アプリケーションが RUM イベントの送信を停止した場合に通知を受け取るには、条件を `below 1` に設定します。これにより、すべての集計グループについて、指定のタイムフレームでモニタークエリと一致する RUM イベントがない場合に通知されます。

モニターを何らかのディメンション (タグまたはファセット) で分割している場合に `below` 条件を使用すると、特定のグループに RUM イベントが存在してカウントがしきい値未満である**場合に限り**、または**すべての**グループで RUM イベントが存在しない場合に、アラートがトリガーされます。

**例**:

* このモニターは、すべてのアプリケーションで RUM イベントが存在しない場合にのみトリガーします。
  {{< img src="monitors/monitor_types/rum/rum_monitoring_by_application_id.png" alt="アプリケーションで分割された下限モニター"  style="width:70%;" >}}
* このモニターは、アプリケーション `Shop.ist` でログが存在しない場合にトリガーします。
  {{< img src="monitors/monitor_types/rum/rum_monitoring_by_shopist.png" alt="特定のアプリケーションの下限モニター"  style="width:70%;" >}}

### Notifications

**Say what's happening** と **Notify your team** のセクションに関する詳しい説明は、[通知][6]のページを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/
[2]: https://app.datadoghq.com/monitors#create/rum
[3]: /ja/real_user_monitoring/explorer/search/
[4]: /ja/real_user_monitoring/explorer/?tab=facets#setup-facets-measures
[5]: /ja/real_user_monitoring/explorer/?tab=measures#setup-facets-measures
[6]: /ja/monitors/notifications/