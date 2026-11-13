---
aliases:
- /es/llm_observability/trace_proxy_services/
description: Aprenda a usar Agent Observability para rastrear llamadas de LLM a través
  de servicios de proxy o puerta de enlace como parte de una traza completa de extremo
  a extremo.
title: Rastreo de servicios de proxy
---
## Descripción general {#overview}

Al igual que las aplicaciones tradicionales, una aplicación de LLM puede representar múltiples microservicios. Con Agent Observability, si uno de estos servicios es un proxy o puerta de enlace de LLM, puede rastrear las llamadas de LLM dentro de una traza completa de extremo a extremo, capturando la ruta completa de la solicitud a través de los servicios.

## Habilitar Agent Observability para un servicio de proxy o puerta de enlace {#enabling-agent-observability-for-a-proxy-or-gateway-service}

Para habilitar Agent Observability para un servicio de proxy o puerta de enlace utilizado por múltiples aplicaciones de ML, puede configurarlo sin especificar un nombre de aplicación de ML. En su lugar, establezca el nombre del servicio. Esto le permite [filtrar tramos específicos para ese servicio de proxy o puerta de enlace dentro de Agent Observability](#observing-llm-gateway-and-proxy-services).

{{< tabs >}}
{{% tab "Python" %}}

```python
# proxy.py
from ddtrace.llmobs import LLMObs

LLMObs.enable(service="chat-proxy")

# proxy-specific logic, including guardrails, sensitive data scans, and the LLM call
```

{{% /tab %}}
{{% tab "Node.js" %}}

```javascript
// proxy.js
const tracer = require('dd-trace').init({
  llmobs: true,
  service: "chat-proxy"
});
const llmobs = tracer.llmobs;

// proxy-specific logic, including guardrails, sensitive data scans, and the LLM call
```

{{% /tab %}}
{{< /tabs >}}


Si tiene un servicio que orquesta aplicaciones de ML que envían solicitudes a un proxy o puerta de enlace de LLM, habilite Agent Observability con el nombre de la aplicación de ML:

{{< tabs >}}
{{% tab "Python" %}}

```python
# application.py
from ddtrace.llmobs import LLMObs
LLMObs.enable(ml_app="my-ml-app")

import requests

if __name__ == "__main__":
    with LLMObs.workflow(name="run-chat"):
      # other application-specific logic - (such as RAG steps and parsing)

      response = requests.post("http://localhost:8080/chat", json={
        # data to pass to the proxy service
      })


      # other application-specific logic handling the response
```

{{% /tab %}}
{{% tab "Node.js" %}}

```javascript
// application.js
const tracer = require('dd-trace').init({
  llmobs: {
    mlApp: 'my-ml-app'
  }
});
const llmobs = tracer.llmobs;

const axios = require('axios');

async function main () {
  llmobs.trace({ name: 'run-chat', kind: 'workflow' }, async () => {
    // other application-specific logic - (such as RAG steps and parsing)

    // wrap the proxy call in a task span
    const response = await axios.post('http://localhost:8080/chat', {
      // data to pass to the proxy service
    });

    // other application-specific logic handling the response
  });
}

main();
```

{{% /tab %}}
{{< /tabs >}}

Cuando la aplicación de LLM realiza una solicitud al servicio de proxy o puerta de enlace, el SDK de Agent Observability propaga automáticamente el nombre de la aplicación de ML desde la aplicación de LLM original. El nombre de la aplicación de ML propagado tiene prioridad sobre el nombre de la aplicación de ML especificado en el servicio de proxy o puerta de enlace.

## Observación de servicios de puerta de enlace y proxy de LLM {#observing-llm-gateway-and-proxy-services}

### Todas las solicitudes al servicio de proxy o puerta de enlace {#all-requests-to-the-proxy-or-gateway-service}

Para visualizar todas las solicitudes al servicio de proxy como tramos de nivel superior, envuelva el punto de entrada del punto de conexión del servicio de proxy en un tramo `workflow`:

{{< tabs >}}
{{% tab "Python" %}}

```python
# proxy.py
from ddtrace.llmobs import LLMObs

LLMObs.enable(service="chat-proxy")

@app.route('/chat')
def chat():
    with LLMObs.workflow(name="chat-proxy-entrypoint"):
        # proxy-specific logic, including guardrails, sensitive data scans, and the LLM call
```

{{% /tab %}}
{{% tab "Node.js" %}}

```javascript
// proxy.js
const tracer = require('dd-trace').init({
  llmobs: true,
  service: "chat-proxy"
});
const llmobs = tracer.llmobs;

app.post('/chat', async (req, res) => {
  await llmobs.trace({ name: 'chat-proxy-entrypoint', kind: 'workflow' }, async () => {
    // proxy-specific logic, including guardrails, sensitive data scans, and the LLM call
    res.send("Hello, world!");
  });
});
```

{{% /tab %}}
{{< /tabs >}}

Todas las solicitudes al servicio de proxy se pueden visualizar entonces como tramos de nivel superior dentro de la vista de traza de LLM:

1. En la página de [traza de LLM][1], seleccione {{< ui >}}All Applications{{< /ui >}} en el menú desplegable superior izquierdo.
2. Cambie a la vista {{< ui >}}All Spans{{< /ui >}} en el menú desplegable superior derecho.
3. Filtre la lista por la etiqueta `service` y el nombre del flujo de trabajo.

{{< img src="llm_observability/all-spans-with-service-and-span-name.png" alt="Visualice todos los tramos de todas las aplicaciones de ML con las etiquetas de nombre de servicio y flujo de trabajo" style="width:100%;" >}}

También puede filtrar el flujo de trabajo {{< ui >}}Span Name{{< /ui >}} usando la faceta en el lado izquierdo de la vista de traza:

{{< img src="llm_observability/span-name-facet-for-proxy-service-monitoring.png" alt="Seleccione el nombre del tramo del flujo de trabajo de la faceta en el lado izquierdo de la vista de traza" style="width:50%;" >}}

### Todas las llamadas de LLM realizadas dentro del servicio de proxy o puerta de enlace {#all-llm-calls-made-within-the-proxy-or-gateway-service}

Para hacer un seguimiento solo de las llamadas de LLM realizadas dentro de un servicio de proxy o puerta de enlace, filtre por los tramos `llm` en la vista de traza:

{{< img src="llm_observability/all-spans-with-service-and-span-kind.png" alt="Visualice todos los tramos de todas las aplicaciones de ML con las etiquetas de servicio y el tipo de tramo de LLM" style="width:100%;" >}}

También puede filtrar la faceta {{< ui >}}Span Kind{{< /ui >}} en el lado izquierdo de la vista de traza:

{{< img src="llm_observability/span-kind-facet-for-proxy-service-monitoring.png" alt="Seleccione la faceta de tipo de tramo de LLM del lado izquierdo de la vista de traza" style="width:50%;" >}}

### Filtrado por una aplicación de ML específica y observación de patrones y tendencias {#filtering-by-a-specific-ml-application-and-observing-patterns-and-trends}

Puede aplicar ambos procesos de filtrado ([llamadas de nivel superior al servicio de proxy](#all-requests-to-the-proxy-or-gateway-service) y [llamadas de LLM realizadas dentro del servicio de proxy o puerta de enlace](#all-llm-calls-made-within-the-proxy-or-gateway-service)) a una aplicación de ML específica para visualizar su interacción con el servicio de proxy o puerta de enlace.

1. En el menú desplegable superior izquierdo, seleccione la aplicación de ML de interés.
2. Para ver todas las trazas de la aplicación de ML, cambie de la vista {{< ui >}}All Spans{{< /ui >}} a la vista {{< ui >}}Traces{{< /ui >}} en el menú desplegable superior derecho.
3. Para ver series temporales de trazas para la aplicación de ML, vuelva al filtro {{< ui >}}All Spans{{< /ui >}} en el menú desplegable superior derecho y, junto a "Visualizar como", seleccione {{< ui >}}Timeseries{{< /ui >}}.

{{< img src="llm_observability/timeseries-view-for-proxy-services.png" alt="Cambie de una vista de lista a una vista de series temporales en la vista de trazas mientras mantiene el filtro de todos los tramos" style="width:100%;" >}}

## Observación del uso de extremo a extremo de aplicaciones de LLM que realizan llamadas a un servicio de proxy o puerta de enlace {#observing-end-to-end-usage-of-llm-applications-making-calls-to-a-proxy-or-gateway-service}

Para observar el uso completo de extremo a extremo de una aplicación de LLM que realiza llamadas a un servicio de proxy o puerta de enlace, puede filtrar las trazas con ese nombre de aplicación de ML:

1. En la vista de traza de LLM, seleccione el nombre de la aplicación de ML de interés en el menú desplegable superior izquierdo.
2. Cambie a la vista {{< ui >}}Traces{{< /ui >}} en el menú desplegable superior derecho.


[1]: https://app.datadoghq.com/llm/traces