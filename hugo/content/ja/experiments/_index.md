---
description: Datadog Experiments を使用して、スタック全体でランダム化実験を計画、実行、分析します。
further_reading:
- link: /feature_flags/
  tag: ドキュメント
  text: Feature Flag
- link: /product_analytics/
  tag: ドキュメント
  text: Product Analytics
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: ガイド
  text: Feature Flags の APM トレースのリッチ化をセットアップする
- link: https://www.datadoghq.com/blog/product-signal-latency-gap/
  tag: ブログ
  text: 成長を鈍化させる製品シグナルのレイテンシーギャップ
- link: https://www.datadoghq.com/blog/ab-testing/
  tag: ブログ
  text: すべてのチームが A/B テストを行う必要がある
- link: https://www.datadoghq.com/blog/experiments
  tag: ブログ
  text: Datadog Experiments を使用して、すべての製品変更がビジネスに与える影響を測定する
- link: https://www.datadoghq.com/blog/coordinate-product-launches-with-datadog/
  tag: ブログ
  text: Datadog で製品ローンチを調整する
- link: https://www.datadoghq.com/blog/chatgpt-datadog-experiments/
  tag: ブログ
  text: Datadog Experiments プラグインを使用して、ChatGPT で実験を分析する
title: 実験
---
## 概要 {#overview}

Datadog Experiments は、エンドツーエンドの実験のための構成可能なプラットフォームです。Datadog での実験は、2 つのコンポーネントで構成されています。

1. [対象][18] (通常はユーザー) の**ランダム化された割り当て**。[Datadog Feature Flag][1]、または選択したランダム化システムから、2 つ以上のバリアントに割り当てられます
2. バリアント間で比較するための**メトリクス**のセット。Datadog 内で計算するか、ウェアハウスネイティブ分析を使用して計算します。

開始するには、以下のテーブルからリンクを選択してください。それ以外の場合は、読み進めて Datadog Experiments の詳細をご覧ください。

| クイックリンク | |
| :---- | :---- |
| [データウェアハウスを接続する][13] | Snowflake、BigQuery、Redshift、または Databricks をセットアップして、ウェアハウスネイティブの実験分析を行う |
| [ウェアハウスネイティブメトリクスを作成する][14] | メトリクス SQL モデルと実験メトリクスをウェアハウスデータから定義する |
| [Product Analytics または Real User Monitoring データからメトリクスを作成する][15] | クライアント側の RUM および Product Analytics イベントから実験メトリクスを構築する |
| [Datadog Feature Flags を使用して実験を開始する][16] | 仮説を計画し、Feature Flags でランダム化を設定して、実験を開始する |
| [プロトコルを使用して実験を標準化する][21] | メトリクス、ランダム化、期間、統計分析の再利用可能なデフォルトを定義する |
| [すでにランダム化された実験を分析する][17] | Datadog Feature Flags 以外でランダム化が実行される場合に、ウェアハウス内のエクスポージャーデータを定義する |
| [実験の診断を理解する][20] | エクスポージャー、メトリクス、ランダム化、および分析の健全性に関する自動チェックを解釈する |

## ランダム化 {#randomization}

すべての実験において、実験対象をコントロールバリアントまたはトリートメントバリアントに割り当てる方法が必要です。Datadog は 2 つのアプローチをサポートしています。

### Datadog Feature Flags {#datadog-feature-flags}

[Datadog Feature Flags][1] は、実験をランダム化するためのデフォルトの方法です。フラグを作成し、[Feature Flags SDK][9] で実装し、安定したサブジェクト識別子を `targetingKey` として渡すことで、同じユーザーが常に同じバリアントを受け取るようにします。Datadog は決定論的ハッシュを使用して、セッションやデバイス間で割り当ての一貫性を保ちます。

[実験を計画して開始][16] する際は、それを Feature Flags にリンクして、トラフィックの分割、ターゲティングルール、およびロールアウトの動作を定義します。フラグの詳細ページから直接実験を作成することもできます。ユーザー以外の単位 (組織など) でランダム化する場合は、[Subject Types][18] を参照してください。

### 独自のランダム化を使用する {#bring-your-own-randomization}

Datadog の外部 (社内システムなど) で実験対象をランダム化する場合は、[Exposure SQL Models][17] を使用して、各実験に誰がいつ公開されたかを Datadog に通知してください。Exposure SQL Models は、[接続されたデータウェアハウス][13] からエクスポージャーレコードをクエリし、それらをサブジェクトキー、タイムスタンプ、実験 ID、バリアント ID などの Datadog フィールドにマッピングします。

Datadog はエクスポージャーデータを自動的に重複排除します。同じ実験でユーザーが複数のバリアントに表示された場合、そのユーザーは分析から除外されます。Feature Flags ではなくデータウェアハウスからエクスポージャーを取得する場合、Datadog SDK イベントに基づいて構築されたメトリクスはサポートされません。[ウェアハウスネイティブメトリクス][14] が必要です。

## メトリクス {#metrics}

実験メトリクスは、変更が成功したかどうかを判断するために何を測定するかを定義します。実験を開始する前に少なくとも 1 つのプライマリメトリクスを作成し、パフォーマンス、エンゲージメント、収益への意図しない影響を防ぐためのセカンダリメトリクスを追加します。

### ウェアハウスネイティブモード {#warehouse-native-mode}

ウェアハウスネイティブモードでは、Datadog は Snowflake、BigQuery、Redshift、または Databricks で実験分析を直接実行します。[データウェアハウスを接続][13] した後、ウェアハウステーブルを Datadog にマッピングする **Metric SQL Model** を作成し、そのモデルからメトリクスを定義します。各モデルを 1 つ以上の [サブジェクトタイプ][18] にマッピングし、タイムスタンプ列を指定することで、Datadog がメトリクスイベントを実験エクスポージャーと結合できるようにします。

ランダム化に [Exposure SQL Models][17] を使用する場合は、Warehouse モードが必要です。また、ビジネスメトリクスの信頼できるソースがすでにウェアハウスにあるチームにも適しています。

### Product Analytics および RUM {#product-analytics-and-rum}

クライアントサイドの実験では、[Real User Monitoring (RUM)][2] および [Product Analytics][3] SDK によって収集されたイベントからメトリクスを構築します。アクション、ビュー、セッション、その他のイベントタイプからメトリクスを定義し、イベント数、ユニークユーザー数、またはプロパティの合計などの集計方法を選択します。

このパスは、[Datadog Feature Flags][1] を通じてランダム化を実行し、ウェアハウスのクエリを実行せずにユーザー行動、ファネルコンバージョン、またはアプリケーションパフォーマンスを測定したい場合に機能します。Product Analytics および RUM のメトリクスは、実験の開始とほぼ同時に利用可能になります。

## 統計 {#statistics}

Datadog は統計分析を適用して、バリアントを比較し、リフトを推定します。実験を設定する際は、[分析方法][11] (逐次頻度論、固定サンプル頻度論、またはベイズ) を選択し、必要に応じて [サンプルサイズ計算][8] を実行し、実験の実行期間を推定します。結果が出たら、[グローバルリフト][19] を使用してターゲットを絞った実験のリフトが会社全体のメトリクス合計にどのような影響を与えるかを把握し、[累積影響][12] を使用して同じメトリクスに対する多数の実験におけるノイズ調整済み効果を集計します。

{{< img src="/product_analytics/experiment/overview_metrics_view-1.png" alt="ビジネスメトリクス、ファネルメトリクス、パフォーマンスメトリクスを、コントロール値、バリアント値、および各メトリクスの相対リフトとともに表示された、実験メトリクスビュー。Revenue メトリクスでツールチップが開いており、コントロールグループとバリアントグループのユーザーあたりの収益、総収益、およびユーザー割り当て数の Non-CUPED 値が表示されています。" style="width:90%;" >}}

## 参考資料 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/feature_flags/
[2]: /ja/real_user_monitoring/
[3]: /ja/product_analytics/#getting-started
[4]: /ja/experiments/defining_metrics
[5]: /ja/experiments/plan_and_launch_experiments
[6]: /ja/getting_started/feature_flags/#create-your-first-feature-flag
[7]: /ja/experiments/plan_and_launch_experiments#step-3---launch-your-experiment
[8]: /ja/experiments/plan_and_launch_experiments/#run-a-sample-size-calculation-optional
[9]: /ja/getting_started/feature_flags/#feature-flags-sdks
[10]: /ja/experiments/guide/
[11]: /ja/experiments/statistics/analysis_methods
[12]: /ja/experiments/concepts/cumulative_impact
[13]: /ja/experiments/guide/connecting_a_data_warehouse/
[14]: /ja/experiments/defining_metrics/?tab=warehouse
[15]: /ja/experiments/defining_metrics/?tab=productanalyticsorum
[16]: /ja/experiments/plan_and_launch_experiments/
[17]: /ja/experiments/concepts/exposure_sql/
[18]: /ja/experiments/concepts/subject_types/
[19]: /ja/experiments/statistics/global_lift
[20]: /ja/experiments/diagnostics/
[21]: /ja/experiments/protocols/