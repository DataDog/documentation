---
description: Datadog Feature Flags SDK が返す値と評価の詳細について説明します。
further_reading:
- link: /feature_flags/concepts/evaluation_context
  tag: ドキュメント
  text: 評価コンテキスト
- link: /feature_flags/concepts/targeting_rules
  tag: ドキュメント
  text: ターゲティングルールおよびフィルター
- link: /feature_flags/concepts/evaluation_tester
  tag: ドキュメント
  text: 評価テスター
title: フラグ評価結果
---
## 概要 {#overview}

Datadog Feature Flags SDK は、[OpenFeature 評価 API][1] を使用します。各フラグの評価には、アプリケーションがデフォルト値を提供する必要があります。SDK は、プロバイダーがフラグを解決できない場合にその値を返します。詳細な評価メソッドは、解決されたバリアント、解決理由、エラーコードなどの情報も返します。

## 無効なフラグ {#disabled-flags}

OpenFeature は、プロバイダーが利用可能な構成内で要求されたフラグを見つけられない評価に対して、[`FLAG_NOT_FOUND`][3] を定義しています。Datadog は、選択された環境に対して配信されるランタイム構成にフラグが存在しない場合に、この条件を適用します。

Datadog 環境でフラグを無効にすると、Datadog はクライアント側の SDK およびサーバー側の SDK に提供されるランタイム構成からそのフラグを除外します。そのため、プロバイダーは無効なフラグと不明なフラグキーを区別できません。どちらの状態でも、以下の詳細な評価結果が生成されます。

| フィールド | 結果 |
|---|---|
| 値 | アプリケーションから提供されたデフォルト値 |
| 理由 | `ERROR` |
| エラーコード | `FLAG_NOT_FOUND` |
| バリアント | なし |

OpenFeature は、プロバイダーが無効としてマークされたフラグを受け取った場合の解決理由として、[`DISABLED`][2] も定義しています。Datadog プロバイダーは Datadog から提供されるランタイム構成で無効なフラグを受け取らないため、`DISABLED` の代わりに `FLAG_NOT_FOUND` を返します。

返される値は、Datadog で構成されたデフォルトバリアントではなく、評価呼び出しからのデフォルト値です。Datadog バリアントは、無効なフラグに対して解決されません。

### 無効なフラグ結果を処理する {#handle-disabled-flag-results}

- すべての評価に対して安全なデフォルト値を提供してください。
- すべての `FLAG_NOT_FOUND` 結果に対してエラーログを書き込むことは避けてください。無効なフラグは通常の操作中にこのコードを返す可能性があるため、代わりにこれらのログを集計、サンプリング、またはレート制限してください。
- アプリケーションで非アクティブなフラグと不明なキーを区別する必要がある場合は、フラグを有効にしたまま、明示的な制御またはオフバリアントを提供します。返されたバリアントを確認して、その状態を特定してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/specification/sections/flag-evaluation/
[2]: https://openfeature.dev/specification/types/#resolution-reason
[3]: https://openfeature.dev/specification/types/#error-code