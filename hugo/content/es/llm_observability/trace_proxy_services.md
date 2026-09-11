---
title: Servicios de proxy de traces (trazas)
---

## Información general

Al igual que las aplicaciones tradicionales, una aplicación de LLM puede abarcar varios microservicios. Con LLM Observability, si uno de estos servicios es un proxy o puerta de enlace de LLM, puedes rastrear llamadas de LLM en una trace (traza) completa de extremo a extremo y capturar la ruta de solicitud completa de todos los servicios.

## Activación de LLM Observability para un servicio de proxy o puerta de enlace

Para habilitar LLM Observability para un servicio de proxy o puerta de enlace utilizado por varias aplicaciones de ML, puedes configurarlo sin especificar un nombre de aplicación de ML. En su lugar, configura el nombre del servicio. Esto te permite [filtrar spans (tramos) específicos de ese servicio de proxy o puerta de enlace en la observabilidad de LLM](#observing-llm-gateway-and-proxy-services).

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


Si tienes un servicio que orquesta aplicaciones de ML que envían solicitudes a un proxy o puerta de enlace de LLM, habilita LLM Observability con el nombre de la aplicación de ML:

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

Cuando la aplicación de LLM realiza una solicitud al servicio de proxy o puerta de enlace, el SDK LLM Observability propaga automáticamente el nombre de la aplicación de ML desde la aplicación de LLM original. El nombre de la aplicación de ML propagado tiene prioridad sobre el nombre de la aplicación de ML especificado en el servicio de proxy o puerta de enlace.

## Observación de los servicios de puerta de enlace y proxy de LLM

### Todas las solicitudes al servicio de proxy o puerta de enlace

Para ver todas las solicitudes al servicio de proxy como spans (tramos) de nivel superior, ajusta el punto de entrada del endpoint del servicio de proxy en un span (tramo) `workflow (UI) / proceso (generic)`:

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

Todas las solicitudes al servicio de proxy pueden verse entonces como spans (tramos) de nivel superior en la vista de traces (trazas) de LLM:

1. En la page (página) [trace (traza) de LLM][1], selecciona **Todas las aplicaciones** en el menú desplegable superior izquierdo.
2. Cambia a la vista **Todos los spans (tramos)** en el menú desplegable superior derecho.
3. Filtra la lista por la etiqueta (tag) `service` y el nombre del workflow (UI) / proceso (generic).

{{< img src="llm_observability/all-spans-with-service-and-span-name.png" alt="Visualizar todos los spans (tramos) desde todas las aplicaciones de ML con las etiquetas (tags) del nombre del servicio y workflow (UI) / proceso (generic)" style="width:100%;" >}}

También puedes filtrar el **Nombre del span (tramo)** del workflow (UI) / proceso (generic) utilizando la faceta del lado izquierdo de la vista de trace (traza):

{{< img src="llm_observability/span-name-facet-for-proxy-service-monitoring.png" alt="Seleccionar el nombre del span (tramo) del workflow (UI) / proceso (generic) del lado izquierdo de la vista de trace (traza)" style="width:50%;" >}}

### Todas las llamadas de LLM realizadas en el servicio de proxy o puerta de enlace

Para monitorizar únicamente las llamadas de LLM realizadas en un servicio de proxy o puerta de enlace, filtra por spans (tramos) `llm` en la vista de trace (traza):

{{< img src="llm_observability/all-spans-with-service-and-span-kind.png" alt="Visualizar todos los spans (tramos) desde todas las aplicaciones de ML con las etiquetas (tags) de servicios y el tipo de span (tramo) de LLM" style="width:100%;" >}}

También puedes filtrar la faceta **Tipo de span (tramo)** del lado izquierdo de la vista de trace (traza):

{{< img src="llm_observability/span-kind-facet-for-proxy-service-monitoring.png" alt="Seleccionar la faceta del tipo de span (tramo) del lado izquierdo de la vista de trace (traza)" style="width:50%;" >}}

### Filtrado por una aplicación específica de ML y patrones y tendencias de observación

Puedes aplicar ambos procesos de filtrado ([llamadas de nivel superior al servicio de proxy](#all-requests-to-the-proxy-or-gateway-service) y [llamadas de LLM realizadas en el servicio de proxy o puerta de enlace](#all-llm-calls-made-within-the-proxy-or-gateway-service)) a una aplicación de ML específica para ver su interacción con el servicio de proxy o puerta de enlace.

1. En el menú desplegable superior izquierdo, selecciona la aplicación de ML que te interese.
2. Para ver todas las traces (trazas) de la aplicación de ML, cambia de la vista **Todos los spans (tramos)** a la vista **Traces (trazas)** en el menú desplegable superior derecho.
3. Para ver una serie temporal de traces (trazas) de la aplicación de ML, vuelve al filtro **Todos los spans (tramos)** en el menú desplegable superior derecho y, junto a "Visualizar como", selecciona **Serie temporal**.

{{< img src="llm_observability/timeseries-view-for-proxy-services.png" alt="Cambia de una vista de Lista a una vista de Serie temporal en la vista Traces (trazas) mientras mantienes el filtro Todos los spans (tramos)" style="width:100%;" >}}

## Observación del uso de extremo a extremo de las aplicaciones de LLM que realizan llamadas a un servicio de proxy o puerta de enlace.

Para observar el uso completo de extremo a extremo de una aplicación de LLM que realiza llamadas a un servicio de proxy o puerta de enlace, puedes filtrar las traces (trazas) con ese nombre de la aplicación de ML:

1. En la vista de trace (traza) de LLM, selecciona el nombre de la aplicación de ML que te interese en el menú desplegable superior izquierdo.
2. Cambia a la vista `Traces` en el menú desplegable superior derecho.


[1]: https://app.datadoghq.com/llm/traces