---
description: Datadog Experiments を使用して、スタック全体でランダム化実験を計画、実行、分析します。
further_reading:
- link: /feature_flags/
  tag: ドキュメント
  text: Feature Flags
- link: /product_analytics/
  tag: ドキュメント
  text: Product Analytics
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: ガイド
  text: Feature Flags の APM トレースエンリッチメントを設定する
- link: https://www.datadoghq.com/blog/product-signal-latency-gap/
  tag: ブログ
  text: 成長を鈍化させる製品シグナルのレイテンシーギャップ
- link: https://www.datadoghq.com/blog/ab-testing/
  tag: ブログ
  text: すべてのチームが A/B テストを行うべき
- link: https://www.datadoghq.com/blog/experiments
  tag: ブログ
  text: Datadog Experiments を使用して、すべての製品変更がビジネスに与える影響を測定する
title: Experiments
---
## 概要{#overview}

Datadog Experiments は、エンドツーエンドの実験を行うための、構成可能なプラットフォームです。Datadog における実験は、以下の 2 つのコンポーネントで構成されています。

1. [対象者][18] (通常はユーザー) を 2 つ以上のバリエーションに**ランダムに割り当てる**仕組み ([Datadog Feature Flag][1] 機能、または任意のランダム化システムを使用)
2. バリエーション間で比較するための一式の**メトリクス** (Datadog 内で計算、またはウェアハウスネイティブの分析機能を使用して計算)

開始するには、下のテーブルからリンクを選択してください。Datadog Experiments の詳細については、このまま読み進めてください。

| クイックリンク| |
| :---- | :---- |
| [データウェアハウスを接続する][13]| ウェアハウスネイティブの実験分析のために Snowflake、BigQuery、Redshift、または Databricks をセットアップする|
| [データウェアハウスネイティブのメトリクスを作成する][14]| ウェアハウスのデータから、メトリクス SQL モデルや実験用メトリクスを定義する|
| [Product Analytics または Real User Monitoring のデータからメトリクスを作成する][15]| クライアント側の RUM および Product Analytics イベントから実験用メトリクスを構築する|
| [Datadog Feature Flags を使用して実験を開始する][16]| 仮説の策定と Feature Flags によるランダム化の設定を行い、実験を開始する|
| [プロトコルを使用して実験を標準化する][21]| メトリクス、ランダム化、期間、統計分析に関する再利用可能なデフォルト設定を定義する|
| [すでにランダム化された実験を分析する][17]| Datadog Feature Flags の外部でランダム化が実行された場合、データウェアハウスでエクスポージャーデータを定義する|
| [実験の診断情報を理解する][20]| エクスポージャー、メトリクス、ランダム化、分析の健全性に関する自動チェックの結果を解釈する|

## ランダム化{#randomization}

すべての実験には、対象をコントロールバリアントまたはトリートメントバリアントに割り当てる仕組みが必要です。Datadog は 2 つのアプローチをサポートしています。

### Datadog Feature Flags{#datadog-feature-flags}

[Datadog Feature Flags][1] は、実験をランダム化するためのデフォルトの方法です。フラグを作成し、[Feature Flags SDK][9] で実装し、`targetingKey` として不変の対象識別子を渡すことで、同一ユーザーには常に同じバリアントが割り当てられるようにします。Datadog は決定論的ハッシュ処理を使用し、セッションやデバイスをまたいでも割り当ての一貫性が保たれるようにしています。

[実験を計画して開始する][16]際は、それを Feature Flags にリンクして、トラフィックの分割、ターゲティングルール、ロールアウトの動作を定義します。また、フラグの詳細ページから直接実験を作成することも可能です。ユーザー以外の単位 (組織など) でランダム化を行う場合は、「[サブジェクトタイプ][18]」を参照してください。

### 独自のランダム化の利用{#bring-your-own-randomization}

Datadog の外部 (社内システムなど) で対象をランダム化する場合は、[エクスポージャー SQL モデル][17]を使用して、誰がいつどの実験の対象となったかを Datadog に伝えます。エクスポージャー SQL モデルは、[接続されたデータウェアハウス][13]からエクスポージャーレコードをクエリし、それらを Datadog のフィールド (対象者キー、タイムスタンプ、実験 ID、バリアント ID など) にマッピングします。

Datadog はエクスポージャーデータを自動的に重複排除します。つまり、同一の実験においてあるユーザーが複数のバリエーションに現れる場合、そのユーザーは分析から除外されます。Feature Flags ではなくウェアハウスからエクスポージャーを取得する場合、Datadog SDK イベントに基づいて構築されたメトリクスはサポートされません。代わりに、[ウェアハウスネイティブなメトリクス][14]を使用する必要があります。

## メトリクス{#metrics}

実験メトリクスは、変更が成功したかどうかを判断するために何を測定するかを定義します。実験を開始する前に少なくとも 1 つのプライマリメトリクスを作成し、パフォーマンス、エンゲージメント、または収益への意図しない影響に対するガードレールとしてセカンダリメトリクスを追加します。

### ウェアハウスネイティブモード{#warehouse-native-mode}

ウェアハウスネイティブモードでは、Datadog は Snowflake、BigQuery、Redshift、または Databricks 上で直接、実験の分析を実行します。[ウェアハウスを接続][13]した後、ウェアハウスのテーブルを Datadog にマッピングする**メトリクス SQL モデル**を作成し、そのモデルからメトリクスを定義します。各モデルを 1 つ以上の[サブジェクトタイプ][18]にマッピングし、タイムスタンプ列を指定することで、Datadog がメトリクスイベントと実験エクスポージャーを結合できるようになります。

ランダム化に[エクスポージャー SQL モデル][17]を使用する場合は、ウェアハウスモードの使用が必須となります。また、ビジネスメトリクスの信頼できる唯一の情報源がすでにウェアハウスにあるチームにも適しています。

### Product Analytics および RUM{#product-analytics-and-rum}

クライアントサイドの実験では、[Real User Monitoring (RUM)][2] および [Product Analytics][3] SDK によって収集されたイベントからメトリクスを構築します。アクション、ビュー、セッション、その他のイベントタイプからメトリクスを定義し、イベント数、ユニークユーザー数、プロパティの合計などの集計方法を選択します。

この方法は、[Datadog Feature Flags][1] を通じてランダム化を実行し、ウェアハウスへのクエリを実行せずにユーザー行動、ファネルコンバージョン、またはアプリケーションパフォーマンスを測定したい場合に適しています。Product Analytics および RUM のメトリクスは、実験の開始とほぼ同時に利用可能になります。

## 統計{#statistics}

Datadog は統計分析を適用して、バリアントを比較し、リフトを推定します。実験を設定する際は、[分析手法][11] (逐次頻度論、固定サンプルサイズ頻度論、またはベイズ) を選択します。また、必要に応じて[サンプルサイズ計算][8]を実行して、実験の実施期間を推定することも可能です。結果が出た後は、[グローバルリフト][19]を使用してターゲットを絞った実験のリフトが全社的なメトリクスの合計にどのような影響を与えるかを把握したり、[累積インパクト][12]を使用して同じメトリクスに対する多くの実験から得られたノイズ調整後の効果を集計したりできます。

{{< img src="/product_analytics/experiment/overview_metrics_view-1.png" alt="ビジネス、ファネル、パフォーマンスの各メトリクスと、各メトリクスのコントロール値、バリアント値、相対リフトを表示する実験メトリクスビュー。収益メトリクスにツールチップが表示され、コントロールグループとバリアントグループ全体でのユーザーあたりの収益、総収益、およびユーザー割り当て数の Non-CUPED 値が示されています。" style="width:90%;" >}}

## 関連資料{#further-reading}
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