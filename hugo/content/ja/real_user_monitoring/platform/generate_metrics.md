---
aliases:
- /ja/real_user_monitoring/generate_metrics
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
  tag: ブログ
  text: カスタマーエクスペリエンスの過去の傾向を追跡するための RUM ベースのメトリクスを生成する
title: RUM イベントからカスタムメトリクスを生成する
---
## 概要 {#overview}

Real User Monitoring (RUM) では、Datadog RUM SDK を使用してブラウザやモバイルアプリケーションで発生するイベントをキャプチャし、[サンプリングレート][1]でイベントからデータを収集できます。Datadog はこのイベントデータを[RUM エクスプローラー][2]に保持し、そこで検索クエリやビジュアライゼーションを作成できます。

RUM ベースの Custom Metrics は、RUM イベントのセットからのデータを要約するための費用対効果の高いオプションです。RUM データの傾向や異常を、最大 15 か月間、詳細なレベルで視覚化できます。Custom Metrics を作成したら、[RUM Custom Metrics を使用したグラフの作成][17]を参照して、ダッシュボードに追加してください。

**注:** Custom Metrics は、RUM エクスプローラーに保持されたデータだけでなく、取り込まれた RUM トラフィックの 100% に基づいて計算されます。これにより、セッションの一部のみを保持する可能性のある [RUM without Limits][16] リテンションフィルターを使用している場合でも、正確なメトリクスが保証されます。

**請求について:** RUM イベントから生成されたメトリクスは、[Custom Metrics][3] として請求されます。

## RUM ベースの Custom Metrics を作成する {#create-a-rum-based-custom-metric}

RUM イベントデータから Custom Metrics を作成するには、[{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Application Management{{< /ui >}} > {{< ui >}}Generate Metrics{{< /ui >}}][4] に移動し、{{< ui >}}\+ New Metric{{< /ui >}} をクリックします。

{{< img src="real_user_monitoring/generate_metrics/new_metrics_button-2.png" alt="+ New Metric をクリックして、RUM ベースの Custom Metrics を作成します" width="80%" >}}

[RUM エクスプローラー][5]で検索クエリから Custom Metrics を作成するには、{{< ui >}}Export{{< /ui >}} ボタンをクリックし、ドロップダウンメニューから {{< ui >}}Generate new metric{{< /ui >}} を選択します。

{{< img src="real_user_monitoring/generate_metrics/generate_metric_example.png" alt="RUM ベースの Custom Metrics を生成する" width="80%" >}}

1. [Custom Metrics][3] に、`datadog.estimated_usage` で始まらない名前 (`rum.sessions.count_by_geography` など) を付けます。詳しくは、[命名規則][6]をご覧ください。
2. Custom Metrics を作成するイベントタイプ (`Sessions` など) を選択します。オプションには、{{< ui >}}Sessions{{< /ui >}}、{{< ui >}}Views{{< /ui >}}、{{< ui >}}Actions{{< /ui >}}、{{< ui >}}Errors{{< /ui >}}、{{< ui >}}Resources{{< /ui >}}、{{< ui >}}Long Tasks{{< /ui >}} が含まれます。詳しくは、[RUM イベントの検索][7]をご覧ください。
3. RUM エクスプローラーの[検索構文][8] (`@session.type:user` など) を使用して、RUM イベントをフィルタリングする検索クエリを作成します。
4. {{< ui >}}Count{{< /ui >}} の隣にあるドロップダウンメニューから、追跡するフィールドを選択します。

   - 検索クエリに一致するすべての RUM イベントのカウントを生成するには、`*` を選択します。
   - オプションで、`@action.target` などのイベント属性を入力して数値を集計し、対応する `count` または `distribution` メトリクスを作成します。

   RUM 属性ファセットがメジャーの場合、メトリクス値は RUM 属性値です。

5. {{< ui >}}group by{{< /ui >}} の横にあるドロップダウンメニューから、グループ化するパスを選択します。メトリクスタグ名は、`@` を除いた元の属性名またはタグ名です。デフォルトでは、RUM イベントから生成された Custom Metrics には、明示的に追加されない限りタグは含まれません。`@error.source` や `env` など、RUM イベントに存在する属性またはタグディメンションを使用して、メトリクスタグを作成できます。
   
   <div class="alert alert-danger">RUM ベースの Custom Metrics は<a href="/metrics/custom_metrics/">Custom Metrics</a> とみなされ、それに応じて請求されます。タイムスタンプ、ユーザー ID、リクエスト ID、セッション ID など、上限のない、またはカーディナリティが非常に高い属性によるグループ化は避けてください。
   </div>

6. セッションおよびビュー用に作成された Custom Metrics では、{{< ui >}}The active session/view starts matching the query{{< /ui >}} または {{< ui >}}The session/view becomes inactive or is completed{{< /ui >}} を選択して、セッションとビューの照合条件を設定します。詳細については、[セッションとビューで RUM ベースの Custom Metrics を追加する](#add-a-rum-based-metric-on-sessions-and-views)を参照してください。

7. オプションで、ディストリビューションメトリクスにパーセンタイル集計を追加します。[パーセンタイル集計](#percentile-aggregation)を参照してください。

8. {{< ui >}}Create Metric{{< /ui >}} をクリックします。

RUM ベースの Custom Metrics が {{< ui >}}Custom RUM Metrics{{< /ui >}} の下のリストに表示されます。メトリクスが[ダッシュボード][9]と[モニター][10]で利用可能になるまで、少し時間がかかる場合があります。

履歴データを持つメトリクスについては、データポイントは作成されません。RUM ベースの Custom Metrics のデータポイントは、10 秒間隔で生成されます。メトリクスデータは 15 か月間保持されます。

### パーセンタイル集計 {#percentile-aggregation}

高度なクエリ機能をオプトインして、ディストリビューションメトリクスに対してグローバルに正確なパーセンタイル (P50、P75、P90、P95、P99 など) を使用できます。

<div class="alert alert-danger">パーセンタイルを使用した高度なクエリ機能を有効にすると、より多くの <a href="/metrics/custom_metrics/">Custom Metrics</a> が生成され、<a href="/account_management/billing/custom_metrics/">それに応じて請求</a>されます。</div>

### セッションとビューに関する RUM ベースのメトリクスを追加する{#add-a-rum-based-metric-on-sessions-and-views}

セッションとビューは、RUM アプリケーションでアプリケーションまたはユーザーのアクティビティが継続している場合にアクティブとみなされます。たとえば、ユーザーが新しいページを開くと、これらのページビューがユーザーセッションに収集されます。ユーザーがページ上のボタンを操作すると、これらのアクションがページビューに収集されます。

   5 つ以上のエラーを含むユーザーセッションの数をカウントする RUM ベースのカスタムメトリクスがあり、午前 11 時に 5 つのエラーに達し、午後 12 時に終了するセッション ID `123` があると仮定しましょう。

   - セッションまたはビューがクエリに一致するとすぐに考慮することで、午前 11 時のタイムスタンプでカウントメトリクスの値を 1 増やします。
   - 非アクティブなセッションまたはビューを考慮することで、午後 12 時のタイムスタンプでカウントメトリクスの値を 1 増やします。

## RUM ベースのカスタムメトリクスを管理する{#manage-rum-based-custom-metrics}

また、クエリに一致する RUM イベントのカウントメトリクスや、リクエスト期間など RUM イベントに含まれる数値の[ディストリビューションメトリクス][11]を生成することが可能です。

### RUM ベースのカスタムメトリクスを更新する{#update-a-rum-based-custom-metric}

メトリクスを更新するには、メトリクスの上にカーソルを置き、右側の {{< ui >}}Edit{{< /ui >}} アイコンをクリックします。

- フィルタークエリ: メトリクスに集計される、一致する RUM イベントのセットを変更します。
- 集計グループ: タグを更新して、生成されたメトリクスのカーディナリティを管理します。
- パーセンタイルの選択: {{< ui >}}Calculate percentiles{{< /ui >}} トグルをクリックして、パーセンタイルメトリクスを削除または生成します。

既存のメトリクスは名前を変更できないため、Datadog では別のメトリクスの作成を推奨しています。

### RUM ベースのカスタムメトリクスを削除する{#delete-a-rum-based-custom-metric}

カスタムメトリクスと請求からデータポイントの計算を停止するには、メトリクスにカーソルを合わせ、右側の {{< ui >}}Delete{{< /ui >}} アイコンをクリックします。

## 使用方法 {#usage}

RUM ベースのカスタムメトリクスは、以下のアクションに使用できます。

- [ダッシュボード][12]で一定期間のトレンドを視覚化する
- [異常モニター][13]で、メトリクスが過去と異なる挙動を示した場合にアラートをトリガーする
- [予測モニター][14]で、あるメトリクスが将来的にしきい値を超えると予測された場合にアラートをトリガーする
- [メトリクスベースの SLO][15] を作成し、チームや組織のユーザー中心のパフォーマンス目標を追跡する 

## 参考資料 {#further-reading}

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
[15]: /ja/service_level_objectives/metric/
[16]: /ja/real_user_monitoring/rum_without_limits/
[17]: /ja/real_user_monitoring/guide/create-charts-with-rum-custom-metrics