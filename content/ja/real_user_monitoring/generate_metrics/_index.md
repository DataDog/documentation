---
description: RUM イベントからカスタムメトリクスを作成します。
further_reading:
- link: /real_user_monitoring/
  tag: ドキュメント
  text: ブラウザやモバイルアプリケーションから RUM イベントをキャプチャする方法をご紹介します
- link: /real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM エクスプローラーでクエリを作成する方法をご紹介します
- link: /real_user_monitoring/explorer/search/#event-types
  tag: ドキュメント
  text: RUM のイベントタイプについて
- link: /logs/log_configuration/logs_to_metrics/
  tag: ドキュメント
  text: 取り込んだログからメトリクスを生成する
- link: https://www.datadoghq.com/blog/track-customer-experience-with-rum-metrics/
  tag: GitHub
  text: カスタマーエクスペリエンスの過去の傾向を追跡するための RUM ベースのメトリクスを生成する
kind: documentation
title: RUM イベントからカスタムメトリクスを生成する
---

## 概要

Real User Monitoring (RUM) では、Datadog RUM SDK を使用してブラウザやモバイルアプリケーションで発生するイベントをキャプチャし、[サンプルレート][1]でイベントからデータを収集することが可能です。Datadog は、このイベントデータを [RUM エクスプローラー][2]に保持し、検索クエリや視覚化を作成することができます。

RUM ベースのカスタムメトリクスは、RUM イベントのセットからデータを要約するためのコスト効率の良いオプションです。最大 15 か月間の RUM データの傾向や異常を詳細に視覚化することができます。

**請求について:** RUM イベントから生成されたメトリクスは、[カスタムメトリクス][3]として請求されます。

## RUM ベースのカスタムメトリクスを作成する

RUM イベントデータからカスタムメトリクスを作成するには、[**UX Monitoring** > **Setup & Configuration** > **Generate Metrics**][4] に移動して **+ New Metric** をクリックします。

{{< img src="real_user_monitoring/generate_metrics/new_metrics_button-2.png" alt="RUM ベースのカスタムメトリクスを作成するには、+ New Metric をクリックします" width="80%" >}}

[RUM エクスプローラー][5]で検索クエリからカスタムメトリクスを作成するには、**Export** ボタンをクリックし、ドロップダウンメニューから **Generate new metric** を選択します。

{{< img src="real_user_monitoring/generate_metrics/generate_metric_example.png" alt="RUM ベースのカスタムメトリクスを生成する" width="80%" >}}

1. [カスタムメトリクス][3]には、`datadog.estimated_usage` で始まらない名前、例えば `rum.sessions.count_by_geography` を付けてください。詳しくは、[命名規則][6]を参照してください。
2. カスタムメトリクスを作成したいイベントタイプを選択します (例: `Sessions`)。オプションには、**Sessions**、**Views**、**Actions**、**Errors**、**Resources**、**Long Tasks** があります。詳細については、[RUM イベントの検索][7]を参照してください。
3. RUM エクスプローラーの[検索構文][8] (例: `@session.type:user`) を使用して、RUM イベントをフィルタリングする検索クエリを作成します。
4. **Count** の隣にあるドロップダウンメニューから、追跡するフィールドを選択します。

   - `*` を選択すると、検索クエリに一致するすべての RUM イベントのカウントが生成されます。
   - オプションで、`@action.target` のようなイベント属性を入力すると、数値を集計して、対応する `count` または `distribution` メトリクスが作成されます。

   RUM 属性ファセットがメジャーの場合、メトリクス値は RUM 属性値です。

5. グループ化するパスを **group by** の横のドロップダウンメニューから選択します。メトリクスのタグ名は、元の属性またはタグ名から `@` を除いたものです。デフォルトでは、RUM イベントから生成されたカスタムメトリクスには、明示的に追加されない限りタグは含まれません。RUM イベントに存在する `@error.source` や `env` などの属性またはタグのディメンションを使用して、メトリクスタグを作成することができます。

   <div class="alert alert-warning">RUM-based custom metrics are considered as <a href="/metrics/custom_metrics/">custom metrics</a> and billed accordingly. Avoid grouping by unbounded or extremely high cardinality attributes such as timestamps, user IDs, request IDs, and session IDs.
   </div>

6. セッションとビューで作成されたカスタムメトリクスの場合、セッションとビューのマッチング基準を設定するために、**The active session/view starts matching the query** (アクティブなセッション/ビューがクエリにマッチし始める) または **The session/view becomes inactive or is completed** (セッション/ビューが非アクティブになるか完了する) を選択します。詳細については、[セッションとビューに RUM ベースのメトリクスを追加する](#add-a-rum-based-metric-on-sessions-and-views)を参照してください。

7. ディストリビューションメトリクスにパーセンタイル集計を追加しました。高度なクエリ機能をオプトインし、グローバルに正確なパーセンタイル (P50、P75、P90、P95、P99 など) を使用することができます。

   <div class="alert alert-warning">パーセンタイルによる高度なクエリ機能を有効にすると、より多くの<a href="/metrics/custom_metrics/">カスタムメトリクス</a>が生成され、<a href="/account_management/billing/custom_metrics/">それに応じて請求が行われます</a>。

8. **Create Metric** をクリックします。

RUM ベースのカスタムメトリクスが **Custom RUM Metrics** の下のリストに表示され、メトリクスが[ダッシュボード][9]と[モニター][10]で利用可能になるまで少し時間がかかる場合があります。

履歴データのあるメトリクスでは、データポイントは作成されません。RUM ベースのカスタムメトリクスのデータポイントは 10 秒間隔で生成されます。メトリクスのデータは 15 か月間保持されます。

### セッションとビューに関する RUM ベースのメトリクスを追加する

セッションとビューは、RUM アプリケーションで継続的なアプリケーションまたはユーザーのアクティビティがある場合にアクティブと見なされます。たとえば、ユーザーが新しいページを開くと、これらのページビューはユーザーセッションに収集されます。ユーザーがページ上のボタンを操作すると、これらのアクションはページビューに収集されます。

5 つ以上のエラーを含むユーザーセッションの数をカウントする RUM ベースのカスタムメトリクスがあり、午前 11 時に 5 つのエラーに達し、午後 12 時に終了するセッション ID `123` があると仮定しましょう。

   - セッションまたはビューがクエリに一致するとすぐに考慮することで、午前 11 時のタイムスタンプでカウントメトリクスの値を 1 増やします。
   - 非アクティブなセッションまたはビューを考慮することで、午後 12 時のタイムスタンプでカウントメトリクスの値を 1 増やします。

## RUM ベースのカスタムメトリクスを管理する

また、クエリに一致する RUM イベントのカウントメトリクスや、リクエスト期間など RUM イベントに含まれる数値の[ディストリビューションメトリクス][11]を生成することが可能です。

### RUM ベースのカスタムメトリクスを更新する

メトリクスを更新するには、メトリクスの上にカーソルを置き、右側の **Edit** アイコンをクリックします。

- フィルタークエリ: メトリクスに集計される、一致する RUM イベントのセットを変更します。
- 集計グループ: タグを更新して、生成されたメトリクスのカーディナリティを管理します。
- パーセンタイル選択: パーセンタイルメトリクスを削除または生成するには、**Calculate percentiles** トグルをクリックします。

既存のメトリクスは名前を変更できないため、Datadog では別のメトリクスの作成を推奨しています。

### RUM ベースのカスタムメトリクスを削除する

カスタムメトリクスと請求からデータポイントの計算を停止するには、メトリクスにカーソルを合わせ、右側の **Delete** アイコンをクリックします。

## 使用方法

RUM ベースのカスタムメトリクスは、以下のアクションに使用できます。

- [ダッシュボード][12]で一定期間のトレンドを視覚化する
- [異常モニター][13]で、メトリクスが過去と異なる挙動を示した場合にアラートをトリガーする
- [予測モニター][14]で、あるメトリクスが将来的にしきい値を超えると予測された場合にアラートをトリガーする
- [メトリクスベースの SLO][15] を作成し、チームや組織のユーザー中心のパフォーマンス目標を追跡する

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/guide/sampling-browser-plans
[2]: https://app.datadoghq.com/rum/explorer
[3]: /ja/metrics/custom_metrics/
[4]: https://app.datadoghq.com/rum/generate-metrics
[5]: /ja/real_user_monitoring/explorer/
[6]: /ja/metrics/custom_metrics/#naming-custom-metrics
[7]: /ja/real_user_monitoring/explorer/search/#event-types
[8]: /ja/real_user_monitoring/explorer/search_syntax/
[9]: /ja/dashboards/
[10]: /ja/monitors/
[11]: /ja/metrics/distributions/
[12]: /ja/dashboards/querying/#configuring-a-graph
[13]: /ja/monitors/types/anomaly/
[14]: /ja/monitors/types/forecasts/
[15]: /ja/service_management/service_level_objectives/metric/