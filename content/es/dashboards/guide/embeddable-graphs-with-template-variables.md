---
aliases:
- /es/graphing/faq/embeddable-graphs-with-template-variables
- /es/dashboards/faq/embeddable-graphs-with-template-variables/
further_reading:
- link: /dashboards/sharing/
  tag: Documentación
  text: Gráficos compartidos
title: Gráficos integrables con variables de plantilla
---

Los gráficos integrables creados con la API aceptan variables de plantilla. En el siguiente ejemplo se utiliza Python para consultar `avg:system.cpu.user{$var}`. En este ejemplo, `$var` es la variable de plantilla. **Nota**: Este método sólo admite gráficos con visualización de series temporales. 

```python
from datadog import initialize, api
import json

# Initialize request parameters with Datadog API/APP key
options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
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

**Ejemplo de respuesta**:

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

Muestra el gráfico integrado en un sitio web utilizando el HTML en el objeto de respuesta. Observa que la variable de plantilla `$var` se establece en `*` por defecto en la URL del iframe. Esto equivale a la consulta `avg:system.cpu.user{*}`.

```html
<iframe src="https://app.datadoghq.com/graph/embed?token=<EMBED_TOKEN>&height=300&width=600&legend=false&var=*" width="600" height="300" frameBorder="0"></iframe>
```

**Ejemplo de integración**:

{{< img src="dashboards/guide/embeddable_graph01.png" alt="Integrar un gráfico sin filtro" >}}

Utiliza la variable de plantilla para cambiar el gráfico actualizando la URL del iframe para definir un filtro. En el siguiente HTML, `*` se sustituye por `host:embed-graph-test`.

```html
<iframe src="https://app.datadoghq.com/graph/embed?token=<EMBED_TOKEN>&height=300&width=600&legend=false&var=host:embed-graph-test" width="600" height="300" frameBorder="0"></iframe>
```

**Ejemplo de integración**:

{{< img src="dashboards/guide/embeddable_graph02.png" alt="Integrar un gráfico sin filtro" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}