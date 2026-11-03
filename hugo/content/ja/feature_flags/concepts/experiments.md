---
description: Feature FlagsのターゲティングルールがどのようにDatadog Experimentをランダム化し、分析のためにエクスポージャーを記録するかを学びます。
further_reading:
- link: /experiments/
  tag: ドキュメント
  text: Datadog Experimentsについて学びます。
- link: /experiments/plan_and_launch_experiments
  tag: ドキュメント
  text: 実験の計画と開始
- link: /experiments/concepts/subject_types
  tag: ドキュメント
  text: 実験におけるサブジェクトタイプ
- link: /feature_flags/concepts/targeting_rules
  tag: ドキュメント
  text: Feature Flagsのターゲティングルールとフィルター
- link: /feature_flags/concepts/evaluation_context
  tag: ドキュメント
  text: Feature Flagsの評価コンテキスト
title: Feature Flags と実験
---
## 概要 {#overview}

Datadog Feature Flagsは、[Datadog Experiment][1]をランダム化するデフォルトの方法です。フラグを実験にリンクすると、Datadogはそのフラグに実験ターゲティングルールを追加します。そのルールの評価により、サブジェクトがバリアントに割り当てられ、Datadogが実験の分析に使用するエクスポージャーのイベントが記録されます。

## フラグを実験にリンクする{#link-a-flag-to-an-experiment}

ワークフローのどちらからでもフラグを実験にリンクできます：

- [{{< ui >}}Product Analytics > Experiments{{< /ui >}}][1]から実験を作成し、[既存のFeature Flagsを追加][2]します。
- Feature Flagsの詳細ページから、{{< ui >}}Create New Experiment{{< /ui >}}セクションの{{< ui >}}Targeting Rules & Rollouts{{< /ui >}}をクリックして、そのFeature Flagsが事前入力された実験を作成します。

## 実験のターゲティングルール{#experiment-targeting-rules}

実験のターゲティングルールは、他の[ターゲティングルール][3]と同様に機能します。フィルターを含めることができ、同じ[決定論的ランダム化][4]を使用してサブジェクトをバリアントに割り当てます。ランダム化は[評価コンテキスト][5]内の`targetingKey`に基づいているため、同じサブジェクトは実験期間中、一貫して同じバリアントを受け取ります。

複数の実験が同じFeature Flagsを共有している場合、Datadogは上から順にターゲティングルールを評価します。実験を開始する前にルールを並べ替えて、特定のサブジェクトに対してどのルールが優先されるかを制御します。

## エクスポージャー{#exposures}

SDKがサブジェクトのFeature Flagsの実験ターゲティングルールを評価するたびに、Datadogは_エクスポージャー_（サブジェクト、提供されたバリアント、タイムスタンプ）を記録します。Datadogはエクスポージャーとメトリクスイベントを結合して、バリアント間のリフトを計算します。これらのメトリクスイベントは、Product Analytics、Real User Monitoring、またはお客様のデータウェアハウスから取得できます。

Datadogは、サブジェクト識別子によってエクスポージャーとメトリクスを結合します。[evaluation context][5]でSDKが設定する`targetingKey`は、実験用に構成された[subject type attribute][6]（`@usr.id`など）と一致している必要があります。一致していない場合、Datadogはメトリクスイベントを正しいエクスポージャーに関連付けることができません。

## 独自のランダム化を持ち込む{#bring-your-own-randomization}

Datadog Feature Flags以外のシステムでサブジェクトをランダム化する場合、このFeature Flagsと実験の統合は適用されません。Datadogは引き続き実験を分析できます。代わりに、データウェアハウスからエクスポージャーレコードを読み取る[Exposure SQL Model][7]を定義してください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/experiments/
[2]: /ja/experiments/plan_and_launch_experiments/#add-a-feature-flag
[3]: /ja/feature_flags/concepts/targeting_rules/
[4]: /ja/feature_flags/concepts/traffic_splitting/
[5]: /ja/feature_flags/concepts/evaluation_context/
[6]: /ja/experiments/concepts/subject_types/
[7]: /ja/experiments/concepts/exposure_sql/