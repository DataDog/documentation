---
title: Embeddable Graphs with Template Variables
aliases:
    - /graphing/faq/embeddable-graphs-with-template-variables
    - /dashboards/faq/embeddable-graphs-with-template-variables/
further_reading:
- link: /dashboards/sharing/
  tag: Documentation
  text: Shared Graphs
---

API で作成された埋め込み可能なグラフは、テンプレート変数を受け付けます。以下は、Python を使用して `avg:system.cpu.user{$var}` に問い合わせる例です。この例では、`$var` がテンプレート変数です。**注**: このメソッドは、時系列で視覚化されたグラフのみをサポートしています。

```python
from datadog import initialize, api
import json

# Datadog API/APP キーによるリクエストパラメーターの初期化
options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

# 埋め込みグラフの定義を dict で作成し、JSON でフォーマットする
graph_json = {
    "requests": [{
        "q": "avg:system.cpu.user{$var}"
    }],
    "viz": "timeseries",
    "events": []
}
graph_json = json.dumps(graph_json)

api.Embed.create(
    graph_json=graph_json,
    timeframe="1_hour",
    size="medium",
    legend="no"
)
```

**応答例**:

```python
{
  'embed_id': '<EMBED_ID>',
  'revoked': False,
  'template_variables': ['var'],
  'html': '<iframe src="https://app.datadoghq.com/graph/embed?token=<EMBED_TOKEN>&height=300&width=600&legend=false&var=*" width="600" height="300" frameBorder="0"></iframe>',
  'graph_title': 'Embed created through API',
  'dash_url': None,
  'shared_by': 734258,
  'dash_name': None
}
```

レスポンスオブジェクトの HTML を利用して、Web サイトに埋め込みグラフを表示します。iframe URL のテンプレート変数 `$var` がデフォルトで `*` に設定されていることに注目してください。これはクエリ `avg:system.cpu.user{*}` と同等です。

```html
<iframe src="https://app.datadoghq.com/graph/embed?token=<EMBED_TOKEN>&height=300&width=600&legend=false&var=*" width="600" height="300" frameBorder="0"></iframe>
```

**埋め込み例**:

{{< img src="dashboards/guide/embeddable_graph01.png" alt="フィルター無しでグラフを埋め込む" >}}

テンプレート変数を使って、フィルターを定義する iframe URL を更新することで、グラフを変更することができます。下記の HTML では、`*` を `host:embed-graph-test` に置き換えています。

```html
<iframe src="https://app.datadoghq.com/graph/embed?token=<EMBED_TOKEN>&height=300&width=600&legend=false&var=host:embed-graph-test" width="600" height="300" frameBorder="0"></iframe>
```

**埋め込み例**:

{{< img src="dashboards/guide/embeddable_graph02.png" alt="フィルターありでグラフを埋め込む" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
