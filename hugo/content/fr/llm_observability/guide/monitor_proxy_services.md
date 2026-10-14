---
aliases:
- /fr/llm_observability/trace_proxy_services/
description: Apprenez à utiliser Agent Observability pour tracer les appels LLM via
  des services de proxy ou gateway dans le cadre d'une trace complète de bout en bout.
title: Traçage des services de proxy
---
## Présentation {#overview}

Comme les applications traditionnelles, une application LLM peut s'étendre sur plusieurs microservices. Avec Agent Observability, si l'un de ces services est un LLM proxy ou gateway, vous pouvez tracer les appels LLM dans une trace complète de bout en bout, en capturant le chemin complet de la requête à travers les services.

## Activer Agent Observability pour un service de proxy ou gateway {#enabling-agent-observability-for-a-proxy-or-gateway-service}

Pour activer Agent Observability pour un service de proxy ou gateway utilisé par plusieurs applications ML, vous pouvez le configurer sans spécifier de nom d'application ML. Définissez plutôt le nom du service. Cela vous permet de [filtrer les spans spécifiques à ce service de proxy ou gateway au sein d'Agent Observability](#observing-llm-gateway-and-proxy-services).

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


Si vous disposez d'un service qui orchestre des applications ML envoyant des requêtes à un LLM proxy ou gateway, activez Agent Observability avec le nom de l'application ML :

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

Lorsque l'application LLM effectue une requête vers le service de proxy ou gateway, le SDK Agent Observability propage automatiquement le nom de l'application ML à partir de l'application LLM d'origine. Le nom de l'application ML propagé prévaut sur le nom de l'application ML spécifié dans le service de proxy ou gateway.

## Observer les services LLM gateway et proxy {#observing-llm-gateway-and-proxy-services}

### Toutes les requêtes vers le service de proxy ou gateway {#all-requests-to-the-proxy-or-gateway-service}

Pour afficher toutes les requêtes vers le service de proxy en tant que spans de haut niveau, enveloppez le point d'entrée de l'endpoint du service de proxy dans un span `workflow` :

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

Toutes les requêtes vers le service de proxy peuvent ensuite être visualisées en tant que spans de haut niveau dans la vue de trace LLM :

1. Sur la page [LLM trace][1], sélectionnez {{< ui >}}All Applications{{< /ui >}} dans le menu déroulant en haut à gauche.
2. Passez à la vue {{< ui >}}All Spans{{< /ui >}} dans le menu déroulant en haut à droite.
3. Filtrez la liste par le tag `service` et le nom du workflow.

{{< img src="llm_observability/all-spans-with-service-and-span-name.png" alt="Afficher tous les spans de toutes les applications ML avec les tags de nom de service et de workflow" style="width:100%;" >}}

Vous pouvez également filtrer le workflow {{< ui >}}Span Name{{< /ui >}} en utilisant la facette sur le côté gauche de la vue de trace :

{{< img src="llm_observability/span-name-facet-for-proxy-service-monitoring.png" alt="Sélectionnez le nom du span du workflow à partir de la facette située sur le côté gauche de la vue des traces" style="width:50%;" >}}

### Tous les appels LLM effectués au sein du service de proxy ou gateway {#all-llm-calls-made-within-the-proxy-or-gateway-service}

Pour ne surveiller que les appels LLM effectués au sein d'un service de proxy ou gateway, filtrez par les spans `llm` dans la vue des traces :

{{< img src="llm_observability/all-spans-with-service-and-span-kind.png" alt="Affichez tous les spans de toutes les applications ML avec les tags de service et le LLM span kind" style="width:100%;" >}}

Vous pouvez également filtrer la facette {{< ui >}}Span Kind{{< /ui >}} sur le côté gauche de la vue des traces :

{{< img src="llm_observability/span-kind-facet-for-proxy-service-monitoring.png" alt="Sélectionnez la facette de type de span LLM sur le côté gauche de la vue des traces" style="width:50%;" >}}

### Filtrer par une application ML spécifique et observer les modèles et les tendances {#filtering-by-a-specific-ml-application-and-observing-patterns-and-trends}

Vous pouvez appliquer les deux processus de filtrage ([appels de haut niveau vers le service de proxy](#all-requests-to-the-proxy-or-gateway-service) et [appels LLM effectués au sein du service de proxy ou gateway](#all-llm-calls-made-within-the-proxy-or-gateway-service)) à une application ML spécifique pour visualiser son interaction avec le service de proxy ou gateway.

1. Dans le menu déroulant en haut à gauche, sélectionnez l'application ML souhaitée.
2. Pour voir toutes les traces de l'application ML, passez de la vue {{< ui >}}All Spans{{< /ui >}} à la vue {{< ui >}}Traces{{< /ui >}} dans le menu déroulant en haut à droite.
3. Pour voir une série temporelle des traces de l'application ML, revenez au filtre {{< ui >}}All Spans{{< /ui >}} dans le menu déroulant en haut à droite et, à côté de « Visualize as », sélectionnez {{< ui >}}Timeseries{{< /ui >}}.

{{< img src="llm_observability/timeseries-view-for-proxy-services.png" alt="Passez d'une vue List à une vue Timeseries dans la vue Traces tout en conservant le filtre All Span" style="width:100%;" >}}

## Observer l'utilisation de bout en bout des applications LLM effectuant des appels vers un service de proxy ou gateway {#observing-end-to-end-usage-of-llm-applications-making-calls-to-a-proxy-or-gateway-service}

Pour observer l'utilisation complète de bout en bout d'une application LLM qui effectue des appels vers un service de proxy ou gateway, vous pouvez filtrer les traces avec ce nom d'application ML :

1. Dans la LLM trace view, sélectionnez le nom de l'application ML souhaitée dans le menu déroulant en haut à gauche.
2. Passez à la vue {{< ui >}}Traces{{< /ui >}} dans le menu déroulant en haut à droite.


[1]: https://app.datadoghq.com/llm/traces