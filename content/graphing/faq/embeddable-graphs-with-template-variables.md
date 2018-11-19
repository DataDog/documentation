---
title: Embeddable Graphs with Template Variables
kind: faq
disable_toc: true
further_reading:
- link: "graphing/dashboards/shared_graph/"
  tag: "Documentation"
  text: "Shared Graphs"
---

Embeddable graphs created via the API accept template variables. Below is an example utilizing Python to query `avg:system.cpu.user{$var}`. In this example, `$var` is the template variable.

```python
from datadog import initialize, api
import json

# Initialize request parameters with Datadog API/APP key
options = {
    'api_key': '<DD_API_KEY>',
    'app_key': '<DD_APP_KEY>'
}

initialize(**options)

# Create an embed graph definition as a dict and format as JSON
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

**Example response**:

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

Display the embed graph on a website by using the HTML in the response object. Notice the `$var` template variable is set to `*` by default in the iframe URL. This is the equivalent of the query `avg:system.cpu.user{*}`.

```html
<iframe src="https://app.datadoghq.com/graph/embed?token=<EMBED_TOKEN>&height=300&width=600&legend=false&var=*" width="600" height="300" frameBorder="0"></iframe>
```

**Example embed**:

{{< img src="graphing/faq/embeddable_graph01.png" alt="Embed Graph with No Filter" responsive="true">}}

Use the template variable to change the graph by updating the iframe URL to define a filter. In the HTML below, `*` is replaced with `host:embed-graph-test`.

```html
<iframe src="https://app.datadoghq.com/graph/embed?token=<EMBED_TOKEN>&height=300&width=600&legend=false&var=host:embed-graph-test" width="600" height="300" frameBorder="0"></iframe>
```

**Example embed**:

{{< img src="graphing/faq/embeddable_graph02.png" alt="Embed Graph with Filter" responsive="true">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
