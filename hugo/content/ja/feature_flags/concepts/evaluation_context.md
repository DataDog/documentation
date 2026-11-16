---
description: Datadog Feature Flags が評価コンテキストとターゲティングキーを使用して対象のフラグを評価する方法を学びます。
further_reading:
- link: /feature_flags/concepts/targeting_rules
  tag: ドキュメント
  text: ターゲティングルールとフィルター
- link: /feature_flags/concepts/traffic_splitting
  tag: ドキュメント
  text: トラフィックの分割とランダム化
- link: /feature_flags/client/
  tag: ドキュメント
  text: クライアントサイド SDK
- link: /feature_flags/server/
  tag: ドキュメント
  text: サーバーサイド SDK
title: 評価コンテキスト
---
## 概要 {#overview}

**評価コンテキスト**とは、SDK がフラグを評価する際に Datadog に渡す属性のセットです。Datadog Feature Flags は、[OpenFeature][1] の評価コンテキストである、ユーザー、セッション、デバイスなどの評価対象を記述する属性のフラットマップを使用します。[ターゲティングルール][2] と [パーセンテージロールアウト][3] は、これらの属性を読み取って、対象がどのバリアントを受け取るかを決定します。

評価コンテキストがなくても、SDK はブール値のオン/オフフラグを評価できます。対象の属性でフィルタリングするターゲティングルールと一致させることや、その対象に対して一貫したロールアウトの割り当てを行うことはできません。

## ターゲティングキー {#the-targeting-key}

`targetingKey` は、評価コンテキストにおける主要な識別子です。通常はユーザー ID、セッション ID、またはデバイス ID です。Datadog は [決定論的ランダム化][3] に `targetingKey` を使用するため、同じ対象は常に同じフラグのバリアントを受け取ります。

セッション間で同じ対象に対して安定した一貫性のある識別子を使用します。ログアウトまた匿名対象の場合は、`targetingKey` を省略したりセッションごとに再生成したりするのではなく、ローカルストレージや `SharedPreferences` に保存された UUID などの永続的な識別子を使用します。

## コンテキスト属性 {#context-attributes}

`targetingKey` 以外にも、`user_role`、`country`、`tier` など、任意の数の追加属性を評価コンテキストに含めることができます。各バリアントを表示する対象を制御するには、ターゲティングルール [フィルター][2] でこれらの属性を参照してください。

<div class="alert alert-warning">Datadog Feature Flags では、評価コンテキスト属性は、文字列、数値、ブール値といったフラットなプリミティブ値である必要があります。ネストされたオブジェクトや配列はサポートされておらず、エクスポージャーデータが破棄される原因となる可能性があります。</div>

### 評価コンテキストの例 {#example-evaluation-context}

{{< programming-lang-wrapper langs="javascript,python,go" >}}

{{< programming-lang lang="javascript" >}}

```javascript
const evaluationContext = {
  targetingKey: 'user-123',
  user_id: 'user-123',
  user_role: 'admin',
  country: 'US',
  tier: 'premium',
};
```

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

```python
from openfeature.evaluation_context import EvaluationContext

eval_ctx = EvaluationContext(
    targeting_key="user-123",
    attributes={
        "user_id": "user-123",
        "user_role": "admin",
        "country": "US",
        "tier": "premium",
    },
)
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```go
evalCtx := openfeature.NewEvaluationContext(
    "user-123",
    map[string]interface{}{
        "user_id":   "user-123",
        "user_role": "admin",
        "country":   "US",
        "tier":      "premium",
    },
)
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## クライアントサイドとサーバーサイドのコンテキストの比較 {#client-side-vs-server-side-context}

クライアント SDK とサーバー SDK では、評価コンテキストの設定方法が異なります。

- **クライアントサイド SDK** は、SDK インスタンスに対して単一のグローバル評価コンテキストを保持します。初期化時に一度設定し、ユーザーのログイン後など対象の属性が変更されたときに `OpenFeature.setContext()` を呼び出して更新してください。その後のすべてのフラグ評価には、更新されたコンテキストが使用されます。
- **サーバーサイド SDK** は、グローバルコンテキストを保持しません。現在のユーザーまたはセッションに基づいて、リクエストごとに評価コンテキストを構築し、そのリクエストのすべてのフラグ評価呼び出しに明示的に渡します。リクエスト内の評価全体で同じコンテキストオブジェクトを再利用し、対象の属性が変更された場合にのみ再構築します。

## 詳細はこちら {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/docs/reference/concepts/evaluation-context
[2]: /ja/feature_flags/concepts/targeting_rules/
[3]: /ja/feature_flags/concepts/traffic_splitting/