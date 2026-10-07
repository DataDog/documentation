---
aliases:
- /es/tracing/llm_observability/quickstart
description: Comience con Agent Observability instrumentando una aplicación LLM de
  Python, Node.js o Java usando el SDK de Agent Observability.
further_reading:
- link: /llm_observability/instrument/auto_instrumentation
  tag: Documentación
  text: Frameworks y bibliotecas de instrumentación automática compatibles
- link: /llm_observability/instrument/sdk
  tag: Documentación
  text: Referencia del SDK de Agent Observability para instrumentación manual
- link: /llm_observability/instrument/api
  tag: Documentación
  text: API HTTP de Agent Observability para instrumentación independiente del lenguaje
- link: /llm_observability/instrument/otel_instrumentation
  tag: Documentación
  text: Instrumentar con OpenTelemetry
- link: /llm_observability/configure/evaluations
  tag: Evaluaciones
  text: Configure evaluaciones en su aplicación
- link: /llm_observability/lapdog
  tag: Documentación
  text: Herramienta de desarrollo local para Agent Observability
title: Inicio rápido
---
Esta página demuestra el uso del SDK de Agent Observability de Datadog para instrumentar una aplicación LLM de Python, Node.js o Java.

### Requisitos previos {#prerequisites}

Agent Observability requiere una clave de Datadog API si no tiene un Datadog Agent en ejecución. Encuentre su clave de API [en Datadog](https://app.datadoghq.com/organization-settings/api-keys).

### Instrumente Agent Observability con un agente de codificación {#instrument-agent-observability-with-a-coding-agent}

Instrumente Agent Observability con el agente de codificación de su elección pegando el siguiente prompt:

```bash
Follow the instructions at https://docs.datadoghq.com/llm_observability/instrument/agentic.md to instrument my application with Datadog Agent Observability. When configuring the environment, use the following values for variable entries:

DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_API_KEY=<your-dd-api-key>
```

**Nota:** Proporcionar la clave de API como parte del prompt es opcional y no es necesario para que el agente de codificación instrumente su aplicación.

### Configuración manual {#manual-setup}

Siga las instrucciones de configuración en el [flujo de incorporación en la aplicación](https://app.datadoghq.com/llm/applications?setupMethod=manual&showOnboarding=true) de Datadog para obtener una experiencia de inicio rápido interactiva.

{{< tabs >}}
{{% tab "Python" %}}

1. Instale el SDK:

   ```shell
   pip install ddtrace
   ```

2. Prefije su comando de inicio de Python con `ddtrace-run`:

   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_SITE=<YOUR_DD_SITE> \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   ddtrace-run <your application command>
   ```

Después de habilitarlo, el SDK rastrea automáticamente las llamadas a [marcos de Python compatibles][auto-instr-py] como OpenAI, LangChain, LangGraph, Bedrock, Anthropic y más. Si su framework no aparece en la lista, añada [instrumentación manual][sdk] para rastrear sus llamadas de LLM directamente.

[auto-instr-py]: /llm_observability/instrument/auto_instrumentation/?tab=python
[sdk]: /llm_observability/instrument/sdk?tab=python

{{% /tab %}}

{{% tab "Node.js" %}}
1. Instale el SDK:

   ```shell
   npm install dd-trace
   ```

2. Importe e inicialice `dd-trace` con Agent Observability como la primera dependencia en el punto de entrada de su aplicación:
   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_SITE=<YOUR_DD_SITE> \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   NODE_OPTIONS="--import dd-trace/initialize.mjs" <your application command>
   ```

Después de habilitarlo, el SDK rastrea automáticamente las llamadas a [frameworks de Node.js compatibles][1] como OpenAI, LangChain, Vercel AI SDK, Bedrock, Anthropic y más. Si su framework no aparece en la lista, añada [instrumentación manual][2] para rastrear sus llamadas de LLM directamente.

**Next.js**: Consulte [Instrumentar una aplicación Next.js para Agent Observability][3] para configurar correctamente sus aplicaciones Next.js con el SDK de Agent Observability.

[1]: /es/llm_observability/instrument/auto_instrumentation/?tab=nodejs
[2]: /es/llm_observability/instrument/sdk?tab=nodejs
[3]: /es/llm_observability/guide/nextjs_guide

{{% /tab %}}
{{% tab "Java" %}}
1. Instale el SDK:

   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. Añada el argumento de JVM `-javaagent` a su comando de inicio de Java:
   ```shell
   java -javaagent:/path/to/dd-java-agent.jar \
   -Ddd.llmobs.enabled=true \
   -Ddd.llmobs.ml.app=quickstart-app \
   -Ddd.site=<YOUR_DD_SITE> \
   -Ddd.api.key=<YOUR_DATADOG_API_KEY> \
   -jar path/to/your/app.jar
   ```

Después de habilitarlo, el SDK rastrea automáticamente las llamadas a [frameworks de Java compatibles][1]. La instrumentación automática de Java es compatible con OpenAI y Azure OpenAI. Para otras bibliotecas como Bedrock o LangChain4j, utilice [instrumentación manual][2] en su lugar.

[1]: /es/llm_observability/instrument/auto_instrumentation/?tab=java
[2]: /es/llm_observability/instrument/sdk?tab=java

{{% /tab %}}
{{% tab "Otros lenguajes / API HTTP" %}}

Para lenguajes distintos de Python, Node.js o Java, utilice la [API HTTP de Agent Observability][1] para enviar spans directamente a Datadog sin un SDK.

Si su aplicación emite spans que cumplen con la [convención semántica de GenAI de OpenTelemetry][2], consulte [Instrumentación de OpenTelemetry][2] en su lugar.

[1]: /es/llm_observability/instrument/api
[2]: /es/llm_observability/instrument/otel_instrumentation

{{% /tab %}}
{{< /tabs >}}

Su sitio de Datadog es {{< region-param key="dd_site" code="true" >}}. Reemplace `<YOUR_DATADOG_API_KEY>` con su clave de Datadog API.

### Visualizar trazas {#view-traces}

Realice solicitudes a su aplicación que activen llamadas a LLM y luego visualice las trazas en la pestaña {{< ui >}}Traces{{< /ui >}} [de la página {{< ui >}}Agent Observability{{< /ui >}}][3] en Datadog.

Si no ve ninguna traza:

- **Verifique que su biblioteca esté instrumentada automáticamente**: La instrumentación automática solo captura llamadas a [frameworks y bibliotecas compatibles][6]. Consulte la lista de compatibilidad para [Python][7], [Node.js][8] o [Java][9]. Si su biblioteca no aparece en la lista, debe agregar la instrumentación manualmente.
- **Agregue instrumentación manual**: Utilice el [Agent Observability SDK][5] para envolver sus llamadas a LLM con spans directamente en el código. Esto funciona para cualquier biblioteca o proveedor de modelos.
- **Utilice la API HTTP**: La [Agent Observability HTTP API][10] acepta spans de cualquier lenguaje o framework y no requiere un SDK.
- **Utilice OpenTelemetry**: Si su framework emite spans que cumplen con la [OpenTelemetry GenAI semantic convention][11], consulte [OpenTelemetry Instrumentation][11] para obtener detalles de configuración.


### Próximos pasos {#next-steps}

Una vez que las trazas se estén enviando desde su aplicación, puede:

- [Configurar evaluaciones][4] que puede usar para evaluar la efectividad de su aplicación de LLM.
- Agregue [instrumentación manual][5] a su aplicación y extraiga datos que la instrumentación automática no puede.


## Ejemplo de aplicación \"Hello World\" {#example-hello-world-application}

Consulte a continuación una aplicación sencilla que se puede usar para comenzar a explorar el producto Agent Observability.


{{< tabs >}}
{{% tab "Python" %}}

1. Instale OpenAI con `pip install openai`.

2. Guarde el script de ejemplo `app.py`:

   ```python
   import os
   from openai import OpenAI

   oai_client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
   completion = oai_client.chat.completions.create(
       model="gpt-4o-mini",
       messages=[
        {"role": "system", "content": "You are a helpful customer assistant for a furniture store."},
        {"role": "user", "content": "I'd like to buy a chair for my living room."},
    ],
   )
   ```

3. Ejecute la aplicación:

   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   ddtrace-run app.py
   ```
{{% /tab %}}

{{% tab "Node.js" %}}
1. Instale OpenAI con `npm install openai`.

2. Guarde el script de ejemplo `app.js`:

   ```js
   const { OpenAI } = require('openai');
   const oaiClient = new OpenAI(process.env.OPENAI_API_KEY);

   async function main () {
       const completion = await oaiClient.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
             { role: 'system', content: 'You are a helpful customer assistant for a furniture store.' },
             { role: 'user', content: 'I\'d like to buy a chair for my living room.' },
          ]
       });
       return completion;
   }

   main().then(console.log)
   ```

3. Ejecute la aplicación:
   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   NODE_OPTIONS="--import dd-trace/initialize.mjs" node app.js
   ```

{{% /tab %}}
{{< /tabs >}}


## Pruebe Agent Observability localmente con lapdog {#try-agent-observability-locally-with-lapdog}

Para probar Agent Observability de forma local y gratuita, [siga los pasos][12] para instrumentar su aplicación y visualizar los datos localmente con [lapdog](https://lapdog.datadoghq.com).


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[3]: https://app.datadoghq.com/llm/traces
[4]: /es/llm_observability/configure/evaluations
[5]: /es/llm_observability/instrument/sdk#manual-instrumentation
[6]: /es/llm_observability/instrument/auto_instrumentation
[7]: /es/llm_observability/instrument/auto_instrumentation/?tab=python
[8]: /es/llm_observability/instrument/auto_instrumentation/?tab=nodejs
[9]: /es/llm_observability/instrument/auto_instrumentation/?tab=java
[10]: /es/llm_observability/instrument/api
[11]: /es/llm_observability/instrument/otel_instrumentation
[12]: /es/llm_observability/lapdog