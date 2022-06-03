---
description: RUM イベントからカスタムメトリクスを作成します。
further_reading:
- link: /real_user_monitoring/
  tag: ドキュメント
  text: ブラウザやモバイルアプリケーションから RUM イベントをキャプチャする方法をご紹介します
- link: /real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM エクスプローラーでクエリを作成する方法をご紹介します
- link: /real_user_monitoring/explorer/search/#event-types/
  tag: ドキュメント
  text: RUM のイベントタイプについて
- link: /logs/log_configuration/logs_to_metrics/
  tag: ドキュメント
  text: 取り込んだログからメトリクスを生成する
kind: documentation
title: RUM イベントからメトリックスを生成する
---

<div class="alert alert-warning">
RUM イベントからメトリクスを生成する機能はベータ版です。この機能へのアクセスは、Real User Monitoring を使用しているお客様に対してプロビジョニングされます。フィードバックは、<a href="/help">Datadog サポート</a>にお問い合わせください。
</div>

## 概要

Real User Monitoring (RUM) では、RUM SDK を使用してブラウザやモバイルアプリケーションで発生するイベントをキャプチャし、[サンプルレート][1]でイベントからデータを収集することが可能です。Datadog は、このイベントデータを [RUM エクスプローラー][2]に保持し、検索クエリや視覚化を作成することができます。

RUM ベースのメトリクスは、RUM イベントのセットからデータを要約するためのコスト効率の良いオプションです。RUM ベースのメトリクスを使用すると、最大 15 か月間の RUM データの傾向や異常を詳細に視覚化することができます。

また、クエリに一致する RUM イベントのカウントメトリクスや、リクエスト期間など RUM イベントに含まれる数値の[ディストリビューションメトリクス][3]を生成することも可能です。

## RUM ベースのメトリクスの作成と管理

### RUM ベースのメトリクスの追加

RUM イベントデータからメトリクスを作成するには、[**UX Monitoring** > **Generate Metrics**][4] に移動して **+ New Metric** をクリックします。

{{< img src="real_user_monitoring/generate_metrics/new_metrics_button.png" alt="RUM ベースのメトリクスを作成するには、+ New Metric をクリックします" width="80%" >}}

[RUM エクスプローラー][5]で検索クエリからメトリクスを作成するには、**Export** ボタンをクリックし、ドロップダウンメニューから **Generate new metric** を選択します。

{{< img src="real_user_monitoring/generate_metrics/generate_metric_example.png" alt="RUM ベースのメトリクスを生成する" width="80%" >}}

1. メトリクスを作成したいイベントタイプを選択します (例: `Actions`)。オプションには、**Actions**、**Errors**、**Resources**、**Long Tasks** があります。詳細については、[RUM イベントの検索][6]を参照してください。
2. RUM エクスプローラーの[検索構文][7]を使用して、RUM イベントをフィルタリングする検索クエリを作成します。
3. **Count** の隣にあるドロップダウンメニューから、追跡するフィールドを選択します。

    - `*` を選択すると、検索クエリに一致するすべての RUM イベントのカウントが生成されます。
    - オプションで、`@action.target` のようなイベント属性を入力すると、数値を集計して、`count`、`min`、`max`、`sum`、`avg` のような対応する集計メトリクスが作成されます。

   RUM 属性ファセットがメジャーの場合、メトリクス値は RUM 属性値です。

4. グループ化するパスを **group by** の横のドロップダウンメニューから選択します。メトリクスのタグ名は、元の属性またはタグ名から `@` を除いたものです。デフォルトでは、RUM イベントから生成されたメトリクスには、明示的に追加されない限りタグは含まれません。RUM イベントに存在する `@error.source` や `env` などの属性またはタグのディメンションを使用して、メトリクスタグを作成することができます。

   <div class="alert alert-warning">RUM-based metrics are considered to be <a href="/metrics/custom_metrics/">custom metrics</a>. Datadog recommends avoiding grouping by unbounded or extremely high cardinality attributes such as timestamps, user IDs, request IDs, and session IDs. For more information, see <a href="/data_security/logs/">Log Management Data Security</a>.
   </div>

5. ディストリビューションメトリクスのパーセンタイル集計を追加します。P50、P75、P90、P95、P99 のパーセンタイルを生成することができます。

   <div class="alert alert-warning">パーセンタイルメトリクスも<a href="/metrics/custom_metrics/">カスタムメトリクス</a>とみなされます。

6. [メトリクス][8]に名前を付けます。
7. **Create Metric** をクリックします。

RUM ベースのメトリクスが **Custom RUM Metrics** の下のリストに表示され、メトリクスが[ダッシュボード][9]と[モニター][10]で利用可能になるまで少し時間がかかる場合があります。

履歴データのあるメトリクスでは、データポイントは作成されません。RUM ベースのメトリクスのデータポイントは 10 秒間隔で生成され、メトリクスのデータは 15 か月間保持されます。

### RUM ベースのメトリクスを更新する

メトリクスを更新するには、メトリクスの上にカーソルを置き、右側の **Edit** アイコンをクリックします。

- フィルタークエリ: メトリクスに集計される、一致する RUM イベントのセットを変更します。
- 集計グループ: タグを更新したり、生成されたメトリクスのカーディナリティを管理します。
- パーセンタイル選択: パーセンタイルメトリクスを削除または生成するには、**Calculate percentiles** トグルをクリックします。

既存のメトリクスは名前を変更できないため、Datadog では別のメトリクスの作成を推奨しています。

### RUM ベースのメトリクスを削除する

データポイントの計算を停止するには (課金も)、メトリクスにカーソルを合わせ、右側の **Delete** アイコンをクリックします。

## 使用方法

RUM ベースのメトリクスを使用すると、次のようなことができます。

- [ダッシュボード][11]で一定期間のトレンドを視覚化する。
- [異常モニター][12]で、メトリクスが過去と異なる挙動を示した場合にアラートをトリガーする。
- [予測モニター][13]で、あるメトリクスが将来的にしきい値を超えると予測された場合にアラートをトリガーする。
- [メトリクスベースの SLO][14] を作成し、チームや組織のユーザー中心のパフォーマンス目標を追跡する。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/#browser-and-session-replay-sampling-configuration
[2]: https://app.datadoghq.com/rum/explorer
[3]: /ja/metrics/distributions/
[4]: https://app.datadoghq.com/rum/generate-metrics
[5]: /ja/real_user_monitoring/explorer/
[6]: /ja/real_user_monitoring/explorer/search/#event-types
[7]: /ja/real_user_monitoring/explorer/search_syntax/
[8]: /ja/metrics/
[9]: /ja/dashboards/
[10]: /ja/monitors/
[11]: /ja/dashboards/querying/#configuring-a-graph
[12]: /ja/monitors/create/types/anomaly/
[13]: /ja/monitors/create/types/forecasts/
[14]: /ja/monitors/service_level_objectives/metric/