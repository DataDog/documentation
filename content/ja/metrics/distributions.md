---
aliases:
- /ja/developers/faq/characteristics-of-datadog-histograms/
- /ja/graphing/metrics/distributions/
description: データセット全体のグローバルパーセンタイルを計算する
further_reading:
- link: /metrics/custom_metrics/dogstatsd_metrics_submission/
  tag: ドキュメント
  text: DogStatsD でのディストリビューションの使用
- link: /metrics/open_telemetry/otlp_metric_types/
  tag: ドキュメント
  text: OTLP メトリクスタイプ
title: 分布
---
## 概要 {#overview}

ディストリビューションは、フラッシュ間隔の間に複数のホストから送信された値を集計して、インフラストラクチャー全体の統計的分布を測定するメトリクスタイプです。

グローバルディストリビューションは、サービスのような論理的オブジェクトを、基礎となるホストから独立してインスツルメントします。Agent 側で集計する[ヒストグラム][1]とは異なり、グローバルディストリビューションはフラッシュインターバルの間に収集したすべての生データを送信し、集計は Datadog の [DDSketch データ構造][2]を使ってサーバー側で行われます。

OpenTelemetry を使用する場合、OTLP Histogram メトリクスはデフォルトで Datadog distribution にマッピングされます。このマッピングおよび利用可能な構成オプションの詳細については、[OTLP メトリクスタイプ][5]を参照してください。

ディストリビューションは、他のメトリクスタイプ (カウント、レート、ゲージ、ヒストグラム) では提供されない、強化されたクエリ機能および構成オプションを提供します。
* **パーセンタイル集計の計算**: ディストリビューションは、生の非集計データを表す DDSketch データ構造として保存され、すべてのホストの生データに対してグローバルに正確なパーセンタイル集計 (p50、p75、p90、p95、p99 または任意のパーセンタイル (小数点以下 2 桁まで)) を計算することが可能です。パーセンタイル集計を有効にすると、以下のような高度なクエリ機能を利用できます。

  * **任意の時間枠における単一パーセンタイル値**:
  
     _"私のアプリケーションの 99.9 パーセンタイルのロード時間は、この 1 週間でどうなったか?"_

  * **任意の時間枠における標準偏差**:
  
     _"過去 1 か月間におけるアプリケーションの CPU 消費量の標準偏差 (stddev) は何ですか?"_

  * **メトリクスモニターのパーセンタイルしきい値**:
  
    _"私のアプリケーションの p95 のリクエストレイテンシーが過去 5 分間に 200 ms を超えたら警告を出す。"_

  * **しきい値クエリ**:
  
    _"私のサービスへのリクエストの 95% が 5 秒以内に完了する 30 日間の SLO を定義したい。"_


* **タグ付けのカスタマイズ**: この機能を使用すると、ホストレベルの詳細度を必要としない場合にカスタムメトリクスのタグ付けスキームを制御することができます (チェックアウトサービスの毎秒トランザクションなど)。

**注:** ディストリビューションメトリクスデータは他のタイプとは異なる方法で保存されるため、`distribution` に使用するメトリクス名は他のメトリクスタイプには使用しないでください。

## 高度なクエリ機能の有効化 {#enabling-advanced-query-functionality}

`gauges` や `histograms` などの他のメトリクスタイプと同じように、ディストリビューションでは次の集計が利用可能です: `count`、`min`、`max`、`sum`、および `avg`。ディストリビューションは、初期状態ではコード内で設定されたカスタムタグを含め、他のメトリクスと同じ方法でタグ付けされます。その後、メトリクスを報告したホストに基づいてホストタグに解決されます。

ただし、Metrics Summary ページでは、ディストリビューション上のすべてのクエリ可能なタグに対するグローバルに正確なパーセンタイル集計の計算など、高度なクエリ機能を有効化できます。これにより、`p50`、`p75`、`p90`、`p95`、および `p99`、または任意のユーザー定義パーセンタイル (99.99 など、小数点以下最大 2 桁) に対する集計が提供されます。高度なクエリを有効化すると、しきい値クエリと標準偏差も利用可能になります。

{{< img src="metrics/distributions/metric_detail_enable_percentiles.mp4" alt="メトリクス詳細パネルの高度のセクションにある構成をクリックして、高度なパーセンタイルとしきい値クエリ機能を有効にするユーザー" video=true width=80% >}}

ディストリビューションメトリクスにパーセンタイル集計を適用することを選択した後、これらの集計がグラフ作成 UI で自動的に利用可能になります。

{{< img src="metrics/distributions/graph_percentiles.mp4" alt="ディストリビューションメトリクスの集計" video=true" >}}

パーセンタイル集計は、他の様々なウィジェットやアラートで使用することができます。
* **任意の時間枠における単一パーセンタイル値**

   _"私のアプリケーションの 99.9 パーセンタイルのリクエスト期間は、この 1 週間でどうなったか?"_ 

{{< img src="metrics/distributions/percentile_qvw.jpg" alt="単一のメトリクスの 99.99 パーセンタイル集計の単一値 (7.33s) を表示するクエリ値ウィジェット" style="width:80%;">}}

* **メトリクスモニターのパーセンタイルしきい値**
  _"私のアプリケーションの p95 のリクエストレイテンシーが過去 5 分間に 200 ms を超えたら警告を出す。"_ 

{{< img src="metrics/distributions/percentile_monitor.jpg" alt="モニターのアラート条件でドロップダウンから設定されるパーセンタイルしきい値 " style="width:80%;">}}

### 複数のメトリクスの一括構成 {#bulk-configuration-for-multiple-metrics}

個々のメトリクスを個別に構成するのではなく、複数のメトリクスに対するパーセンタイル集計を一括で有効または無効にすることができます。

1. [メトリクスサマリーページ][4]に移動し、**Configure Metrics** ドロップダウンをクリックします。
1. **Enable percentiles** を選択します。
1. メトリクスネームスペースのプレフィックスを指定して、そのネームスペースに一致するすべてのメトリクスを選択します。
1. (オプション) ネームスペース内のすべてのメトリクスに対するパーセンタイルを無効にするには、**Percentile aggregations** トグルをクリックします。

{{< img src="metrics/summary/percentile_aggregations_toggle.png" alt="パーセンタイル集計を管理するトグル" style="width:100%;" >}}

### しきい値クエリ {#threshold-queries}

DDSketch によって計算されたディストリビューションメトリクスのグローバルで正確なパーセンタイルを有効にすると、しきい値クエリが解放されます。ここでは、生のディストリビューションメトリクス値が数値のしきい値を超えるか下回る場合にその数を数えることができます。この機能を使用して、ダッシュボード上で異常な数値しきい値と比較し、エラーや違反の数をカウントできます。また、しきい値クエリを使用して、「過去 30 日間のリクエストの 95% が 10 秒未満で完了した」といった SLO を定義することもできます。

パーセンタイルのディストリビューションのしきい値クエリでは、メトリクスの送信前にしきい値を事前に定義する必要がなく、Datadog でしきい値を柔軟に調整することができます。

しきい値クエリを使用するには:

1. Metrics Summary ページで、ディストリビューションメトリクスのパーセンタイルを有効にします。
2. "count values..." アグリゲーターを使用して、選択したディストリビューションメトリクスをグラフ化します。
3. しきい値と比較演算子を指定します。

{{< img src="metrics/distributions/threshold_queries.mp4" video=true alt="count values アグリゲーターを使用し、8 秒を超えるしきい値で可視化された時系列グラフ。" style="width:80%;" >}}

同様に、しきい値クエリを使用してメトリクスベースの SLO を作成することができます。
1. Metrics Summary ページで、ディストリビューションメトリクスのパーセンタイルを有効にします。
2. 新しいメトリクスベースの SLO を作成し、「count values...」アグリゲーターを使用して選択したディストリビューションメトリクスのクエリで、「good」イベントの数を分子として定義します。
3. しきい値と比較演算子を指定します。
{{< img src="metrics/distributions/threshold_SLO.png" alt="SLO のしきい値クエリ" style="width:80%;">}}

## タグ付けのカスタマイズ {#customize-tagging}

ディストリビューションには、ホストレベルの詳細度が意味を持たない場合にカスタムメトリクスへのタグ付けを制御する機能があります。タグの構成は、保持したいタグの_許可リスト_です。

タグ付けをカスタマイズするには:

1. Metrics Summary テーブルでカスタムディストリビューションのメトリクス名をクリックし、メトリクス詳細のサイドパネルを開きます。
2. **Manage Tags** ボタンをクリックして、タグ構成モーダルを開きます。
3. **Custom...** タブをクリックして、クエリ用に維持したいタグをカスタマイズします。

**注**: 許可リストベースのタグのカスタマイズでは、タグの除外はサポートされていません。`!`で始まるタグは追加できません。

{{< img src="metrics/distributions/dist_manage.jpg" alt="Manage Tags ボタンでディストリビューションのタグを構成します。" style="width:80%;">}}

## 監査イベント {#audit-events}
タグ構成やパーセンタイル集計の変更は、[イベントエクスプローラー][3]にイベントを生成します。このイベントは変更内容を説明し、変更を行ったユーザーを表示します。

ディストリビューションメトリクスのタグ構成を作成、更新、または削除した場合、以下のイベント検索で例を見ることができます。

```text
https://app.datadoghq.com/event/stream?tags_execution=and&per_page=30&query=tags%3Aaudit%20status%3Aall%20priority%3Aall%20tag%20configuration
```

パーセンタイル集計をディストリビューションメトリクスに追加または削除した場合、次のイベント検索の例を見ることができます。

```text
https://app.datadoghq.com/event/stream?tags_execution=and&per_page=30&query=tags%3Aaudit%20status%3Aall%20priority%3Aall%20percentile%20aggregations
```

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/metrics/types/
[2]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
[3]: https://app.datadoghq.com/event/explorer
[4]: https://app.datadoghq.com/metric/summary
[5]: /ja/metrics/open_telemetry/otlp_metric_types/