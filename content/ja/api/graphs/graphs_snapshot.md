---
title: グラフのスナップショット
type: apicontent
order: 13.1
external_redirect: '/api/#graph-snapshot'
---
## グラフのスナップショット

**注**: スナップショットは、作成されてから利用できるようになるまで、[若干の遅延があります][1]。

**引数**:

* **`metric_query`** [必須]:
    メトリクスクエリ。
* **`start`** [必須]:
    クエリを開始する時間の POSIX タイムスタンプ。
* **`end`** [必須]:
    クエリを終了する時間の POSIX タイムスタンプ。
* **`event_query`** [オプション、デフォルト = **None**]:
    グラフにイベントバンドを追加するためのクエリ。
* **`graph_def`** [オプション、デフォルト = **None**]:
    グラフを定義する JSON ドキュメント。`metric_query` の代わりに `graph_def` を使用できます。この JSON ドキュメントは、[こちらで定義されている文法][2]を使用し、単一行の書式にしてから URL エンコードする必要があります。
* **`title`** [オプション、デフォルト = **None**]:
    グラフのタイトル。タイトルを指定しない場合、グラフにタイトルは付きません。

[1]: http://andreafalzetti.github.io/blog/2017/04/17/datadog-png-snapshot-not-showing.html
[2]: /ja/dashboards/graphing_json/#grammar