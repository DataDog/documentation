---
aliases:
- /ja/monitors/monitor_types/real_user_monitoring
- /ja/monitors/create/types/real_user_monitoring/
further_reading:
- link: /real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM データの探索
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の設定
- link: /monitors/downtimes/
  tag: ドキュメント
  text: モニターをミュートするダウンタイムのスケジュール
- link: /monitors/manage/status/
  tag: ドキュメント
  text: モニターステータスを確認
title: リアルユーザーモニタリングモニター
---

## 概要

組織で[リアルユーザーモニタリング (RUM) を有効][1]にすると、特定のタイプの RUM イベントが事前定義のしきい値を一定期間にわたって超えた場合にアラートを発するように RUM モニターを作成することができます。

## RUM モニターの作成

Datadog で RUM モニターを作成するには、まず [**Monitors** --> **New Monitor** --> **Real User Monitoring**][2] の順に移動します。

<div class="alert alert-info"><strong>注</strong>: デフォルトでは、1 アカウントあたり 1000 RUM モニターという制限があります。この制限に引っかかっている場合、<a href="/monitors/configuration/?tab=thresholdalert#alert-grouping">マルチアラート</a>の使用を検討するか、<a href="/help/">サポートにお問い合わせ</a>ください。</div>

### 検索クエリを定義する

検索フィルターを拡張すると、検索バーの上にあるグラフが更新されます。

1. [RUM エクスプローラー検索][3]と同じロジックを使用して検索クエリを作成します。
2. RUM イベント数、[ファセット][4]、または[計測][5]のモニタリングを選択します。
    * **Monitor over a RUM count**: 検索バーを使用し (任意)、ファセットまたはメジャーは選択**しません**。選択されたタイムフレームで Datadog が RUM イベント数を評価し、それをしきい値の条件と比較します。
    * **Monitor over a facet**: [ファセット][4]を選択すると、モニターはファセットの `Unique value count` に対してアラートを発出します。
    * **Monitor over measure**: [メジャー][5]を選択すると、モニターは (メトリクスモニターと同様に) RUM ファセットの数値に対してアラートを発出します。集計タイプ (`min`、`avg`、 `sum`、`median`、`pc75`、`pc90`、`pc95`、`pc98`、`pc99`、または `max`) を選択します。
3. 複数のディメンションで RUM イベントをグループ化します (オプション)。クエリに一致するすべての RUM イベントは、最大 4 つのファセットの値に基づいてグループに集約されます。
4. アラート設定のグループ化方法を構成します (オプション)。
   * **Simple alert**: すべてのソースをまとめて集計します。集計値が設定条件を満たすと、1 件のアラートを受け取ります。クエリに `group by` があり、**シンプルアラートモード**を選択した場合、1 つまたは複数のグループの値がしきい値に違反すると 1 つのアラートが表示されます。通知ノイズを減らすには、この方法を使用します。
   * **Multi Alert**: グループパラメーターに従い、複数のアラートを各ソースに適用します。アラートイベントは、設定された条件を満たすと各グループに生成されます。たとえば、クエリを `@browser.name` でグループ化すると、エラーの数が多い場合にブラウザごとに個別のアラートを受信することができます。

   {{< img src="monitors/monitor_types/rum/define-the-search-query.png" alt="検索クエリの定義" style="width:80%;" >}}

5. 複数のクエリを追加して数式や関数を適用 (オプション):

    * **Multiple queries**: **Add Query** をクリックして、複数の異なる RUM データセットについてお互いの関連性を分析します。
    * **Formulas and functions**: 希望するクエリを追加後、**Add Function** アイコンをクリックして数学的計算を追加します。以下の例では、数式 `(a/b)*100` を使用してカートページのエラー率を計算しています。

   {{< img src="monitors/monitor_types/rum/rum_multiple_queries_2.png" alt="カートページのエラー率についてアラートを出すように構成されたモニターです。このモニターには 2 つのクエリ (a、b) があり、数式 (a/b)*100 が含まれています。" style="width:80%;" >}}

### アラートの条件を設定する

メトリクスがしきい値を超えるとアラートがトリガーされます。

* メトリクスが `above`、`above or equal to`、`below`、`below or equal to` の場合にトリガーします。
* 過去 `5 minutes`、`15 minutes`、`1 hour` のしきい値、または `custom` に 5 分～48 時間の値を設定します。
* アラートのしきい値 `<NUMBER>`。
* 警告のしきい値 `<NUMBER>`。

#### データなしと下限のアラート

アプリケーションが RUM イベントの送信を停止した場合に通知を受け取るには、条件を `below 1` に設定します。これにより、すべての集計グループについて、指定のタイムフレームでモニタークエリと一致する RUM イベントがない場合に通知されます。

モニターを何らかのディメンション (タグまたはファセット) で分割している場合に `below` 条件を使用すると、特定のグループに RUM イベントが存在してカウントがしきい値未満である**場合に限り**、または**すべての**グループで RUM イベントが存在しない場合に、アラートがトリガーされます。

#### アラート設定例

たとえば、このモニターはすべてのアプリケーションで RUM イベントが存在しない場合にのみトリガーします。

  {{< img src="monitors/monitor_types/rum/rum_monitoring_by_application_id.png" alt="検索クエリを空白にして、過去 5 分間のすべての RUM イベントのカウントと @application.id によるグループ化を設定したモニター構成ページ。Set alert conditions セクションは、値がしきい値 1 以下の場合にトリガーするように構成されており、5 分以上データがない場合はゼロとして評価するように構成されています" style="width:70%;" >}}

このモニターは、アプリケーション `Shop.ist` でログが存在しない場合にトリガーします。

  {{< img src="monitors/monitor_types/rum/rum_monitoring_by_shopist.png" alt="検索クエリに Application Id:Shopist を入力し、過去 5 分間にそのアプリケーションに一致するすべての RUM イベントのカウントを設定したモニター構成ページ。Set alert conditions セクションは、値がしきい値 1 以下の場合にトリガーするように構成されており、5 分以上データがない場合はゼロとして評価するように構成されています" style="width:70%;" >}}

#### 高度なアラート条件

評価遅延などの高度なアラートオプションについて、詳しくは[モニターの構成][6]をご覧ください。

### 通知

**Say what's happening** と **Notify your team** のセクションに関する詳細は、[通知][7]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/
[2]: https://app.datadoghq.com/monitors/create/rum
[3]: /ja/real_user_monitoring/explorer/search/
[4]: /ja/real_user_monitoring/explorer/?tab=facets#setup-facets-measures
[5]: /ja/real_user_monitoring/explorer/?tab=measures#setup-facets-measures
[6]: /ja/monitors/configuration/#advanced-alert-conditions
[7]: /ja/monitors/notify/