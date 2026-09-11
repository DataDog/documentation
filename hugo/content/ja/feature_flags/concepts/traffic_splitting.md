---
description: Datadog Feature Flags がパーセンテージベースのロールアウトにどのように決定論的ランダム化を使用するかをご確認ください。
further_reading:
- link: /feature_flags/concepts/targeting_rules
  tag: ドキュメント
  text: ターゲティングルールとフィルター
- link: /feature_flags/concepts/evaluation_context
  tag: ドキュメント
  text: 評価コンテキスト
title: トラフィックの分割とランダム化
---
## 概要 {#overview}

ターゲティングルールを定義する際に、ターゲティングフィルターに一致する対象者の一定の割合にバリアントを提供するように設定できます。Datadog は、[評価コンテキスト][1] の `targetingKey` に基づく**決定論的ランダム化**を使用するため、同じ対象者は特定のフラグに対して常に同じバリアントを受け取ります。

## パーセンテージロールアウト {#percentage-rollouts}

**[Targeting Rules & Rollouts] (ターゲティングルールとロールアウト)** セクションで、各バリアントを受け取るオーディエンスの割合を設定します。**単一バリアント**のターゲティングルールでは、目的とするトラフィックの露出を 1 つのバリアントに割り当てます。たとえば、プロモーションバナーの**送料無料**バリアントを、フィルターに一致する対象者の 50% にロールアウトします。

{{< img src="feature_flags/concepts/single-variant-traffic-exposure-2.png" alt="単一バリアントのパーセンテージロールアウトを使用したターゲティングルール。" style="width:75%;" >}}

**マルチバリアント**のロールアウトでは、ターゲティングルールの編集または作成時に**[Serve] (提供) > [Split Traffic] (トラフィックの分割)** を選択して、同じターゲティングルール内で複数のバリアントにパーセンテージを割り当てます。SDK は、構成されたパーセンテージに従って、一致する対象者をそれらのバリアントに配分します。

{{< img src="feature_flags/concepts/multi-variant-traffic-split-2.png" alt="複数のバリアントでパーセンテージを分割するターゲティングルール。" style="width:75%;" >}}

## SDK がパーセンテージロールアウトを評価する方法 {#how-the-sdk-evaluates-percentage-rollouts}

SDK がパーセンテージロールアウトを含むターゲティングルールを評価する際、まず評価コンテキストがルールのフィルターと一致するかどうかを確認します。一致する場合、SDK はフラグキーと `targetingKey` 評価コンテキストを使用して、対象者をロールアウトバケットに割り当てます。そのバケットによって、対象者が現在のルールからバリアントを受け取るか、次のルールに渡されるかが決定されます。

**決定論的**なランダム化: 同じ `targetingKey` を持つ対象者は、特定のフラグに対して常に同じバケットに割り当てられるため、繰り返し評価しても同じバリアントを受け取ります。後でロールアウトの割合を増やした場合 (例: 30% から 50% に増加)、すでにトリートメントバケットに割り当てられている対象者はそのまま維持されます。

マルチバリアントルールの場合は、SDK が同じバケット化ロジックを適用し、ルールで定義された割合に従って対象者を各バリアントに配分します。

SDK で `targetingKey` を設定する方法については、[評価コンテキスト][1] を参照してください。

## 参考文献 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/feature_flags/concepts/evaluation_context/