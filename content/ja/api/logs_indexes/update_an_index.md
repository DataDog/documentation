---
title: インデックスの更新
type: apicontent
order: 23.3
external_redirect: '/api/#update-an-index'
---
## インデックスの更新

<div class="alert alert-warning">
このエンドポイントは公開ベータ版です。フィードバックがありましたら、<a href="/help">Datadog のサポートチームまでお寄せください</a>。
</div>

このエンドポイントは、名前で識別された `Index` を更新します。リクエストが正常に完了したときに、リクエスト本文で渡される `Index` オブジェクトを返します。

##### 引数

* **`filter.query`** [オプション]:
    このインデックスでは、フィルター条件に一致するログだけが考慮されます。検索クエリは[ログ検索構文][1]に従います。
* **`exclusion_filters`** `ExclusionFilter` オブジェクトの配列 (以下を参照)。ログは、配列の順序に従って、各 `ExclusionFilter` のクエリに照らしてテストされます。最初に一致したアクティブな `ExclusionFilter` だけが適用され、他のフィルターは一致しても無視されます。`ExclusionFilter` オブジェクトは、[除外フィルター][2]の構成を記述します。次の属性を持ちます。

  * **`name`** [必須]:
    除外フィルターの名前。
  * **`is_enabled`** [オプション、デフォルト = **False**]:
    除外がアクティブかどうかを示すブール値。
  * **`filter.query`** [オプション]:
    フィルター条件と親インデックスのクエリの両方に一致するログだけが、この除外フィルターで考慮されます。検索クエリは[ログ検索構文][1]に従います。
  * **`filter.sample_rate`** [必須]:
    この除外フィルターがアクティブな場合に除外されるログの割合。サンプリングは均一です。

[1]: /ja/logs/explorer/search
[2]: /ja/logs/indexes/#exclusion-filters