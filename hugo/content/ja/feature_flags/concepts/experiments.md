---
description: 機能フラグのターゲティングルールが Datadog の実験をどのようにランダム化し、分析用のエクスポージャーを記録するかを説明します。
further_reading:
- link: /experiments/
  tag: ドキュメント
  text: Datadog の実験について学ぶ
- link: /experiments/plan_and_launch_experiments
  tag: ドキュメント
  text: 実験の計画と開始
- link: /experiments/concepts/subject_types
  tag: ドキュメント
  text: 実験におけるサブジェクトタイプ
- link: /feature_flags/concepts/targeting_rules
  tag: ドキュメント
  text: Feature Flags のターゲティングルールとフィルター
- link: /feature_flags/concepts/evaluation_context
  tag: ドキュメント
  text: Feature Flags の評価コンテキスト
title: Feature Flags と実験
---
## 概要{#overview}

Datadog Feature Flags は、[Datadog の実験][1]をランダム化するためのデフォルトの方法です。フラグを実験にリンクすると、Datadog はそのフラグに実験ターゲティングルールを追加します。そのルールの評価により、サブジェクトがバリアントに割り当てられ、Datadog が実験の分析に使用するエクスポージャーイベントが記録されます。

## フラグを実験にリンクする{#link-a-flag-to-an-experiment}

ワークフローのどちら側からでもフラグを実験にリンクできます。

- [{{< ui >}}Product Analytics > Experiments{{< /ui >}}][1] から実験を作成し、[既存の機能フラグを追加][2]します。
- フラグの詳細ページから、{{< ui >}}Targeting Rules & Rollouts{{< /ui >}} セクションの {{< ui >}}Create New Experiment{{< /ui >}} をクリックして、そのフラグが事前入力された実験を作成します。

## 実験ターゲティングルール{#experiment-targeting-rules}

実験ターゲティングルールは、他の[ターゲティングルール][3]と同様に機能します。フィルターを含めることができ、同じ[決定論的ランダム化][4]を使用してサブジェクトをバリアントに割り当てます。ランダム化は[評価コンテキスト][5]内の `targetingKey` に基づくため、同じサブジェクトは実験期間中、一貫して同じバリアントを受け取ります。

複数の実験が同じフラグを共有している場合、Datadog は上から順にターゲティングルールを評価します。実験を開始する前にルールを並べ替えると、特定のサブジェクトに対してどのルールを優先するかを制御できます。

## エクスポージャー{#exposures}

SDK がサブジェクトに対してフラグの実験ターゲティングルールを評価するたびに、Datadog は _エクスポージャー_ (サブジェクト、提供されたバリアント、タイムスタンプ) を記録します。Datadog はエクスポージャーとメトリクスイベントを結合して、バリアント間のリフトを計算します。これらのメトリクスイベントは、Product Analytics、Real User Monitoring、またはデータウェアハウスから取得できます。

Datadog は、サブジェクト識別子によってエクスポージャーとメトリクスを結合します。SDK が[評価コンテキスト][5]に設定する `targetingKey` は、実験用に構成された[サブジェクトタイプ属性][6] (`@usr.id` など) と一致している必要があります。一致していない場合、Datadog はメトリクスイベントを正しいエクスポージャーに関連付けることができません。

## サブジェクトの優先設定{#subject-preferences}

Experimentation のオプトアウトにより、サブジェクトを実験の割り当てから即座に、または割り当ての有効化時間に基づいて除外できます。フラグ評価のオプトアウトは別個のものであり、実験の割り当てを妨げるものではありません。「[フラグ評価と Experimentation のオプトアウト][8]」を参照してください。

## 独自のランダム化を使用する{#bring-your-own-randomization}

Datadog Feature Flags 以外のシステムでサブジェクトをランダム化する場合、このフラグと実験のインテグレーションは適用されません。Datadog は引き続き実験を分析できます。代わりに、データウェアハウスからエクスポージャーレコードを読み取る [Exposure SQL モデル][7]を定義してください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/experiments/
[2]: /ja/experiments/plan_and_launch_experiments/#add-a-feature-flag
[3]: /ja/feature_flags/concepts/targeting_rules/
[4]: /ja/feature_flags/concepts/traffic_splitting/
[5]: /ja/feature_flags/concepts/evaluation_context/
[6]: /ja/experiments/concepts/subject_types/
[7]: /ja/experiments/concepts/exposure_sql/
[8]: /ja/feature_flags/concepts/opt_out/