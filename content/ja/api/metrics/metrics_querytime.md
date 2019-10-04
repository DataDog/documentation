---
title: 時系列ポイントのクエリ
type: apicontent
order: 25.3
external_redirect: '/api/#query-time-series-points'
---
## 時系列ポイントのクエリ
このエンドポイントを使用して、任意の期間のメトリクスをクエリできます。[クエリからグラフまで][1]で説明されているクエリ構文を使用してください。

**注:** Python では、`from` は予約語です。そのため、Python API では、代わりに関数呼び出しで `start` パラメーターと `end` パラメーターを使用します。

##### 引数
* **`from`** [Python 以外では必須]:
    Unix Epoch からの秒数
* **`to`** [Python 以外では必須]:
    Unix Epoch からの秒数
* **`start`** [Python では必須、デフォルト = **None**]:
    Unix Epoch 以降の秒数
* **`end`** [Python では必須、デフォルト = **None**]:
    Unix Epoch 以降の秒数
* **`query`** [必須]:
    クエリ文字列

[1]: /ja/graphing/functions