---
aliases:
- /es/tracing/llm_observability/quickstart
further_reading:
- link: /llm_observability/evaluations
  tag: Evaluaciones
  text: Configura las evaluaciones en tu aplicación
- link: /llm_observability/instrumentation/custom_instrumentation
  tag: Instrumentación personalizada
  text: Instrumenta tu aplicación con tramos personalizados
title: Quickstart
---

Esta página demuestra el uso de del kit de desarrollo de software (SDK) de LLM Observability de Datadog para instrumentar una aplicación de LLM Python, Node.js, o Java.

### Requisitos previos

LLM Observability requiere una clave de API de Datadog si no tienes un Datadog Agent en funcionamiento. Encuentra tu clave de API [en Datadog](https://app.datadoghq.com/organization-settings/api-keys).

### Configuración

{{< tabs >}}
{{% tab "Python" %}}

1. Instala el kit de desarrollo de software (SDK):

   ```shell
   pip install ddtrace
   ```

2. Antepón `ddtrace-run` al comando de inicio de Python:

   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   ddtrace-run <your application command>
   ```

   Sustituye `<YOUR_DATADOG_API_KEY>` por tu clave de API de Datadog.


[1]: /es/llm_observability/setup/sdk/python/#command-line-setup
[2]: /es/getting_started/site/
{{% /tab %}}

{{% tab "Node.js" %}}
1. Instala el kit de desarrollo de software (SDK):

   ```shell
   npm install dd-trace
   ```

2. Añade `NODE_OPTIONS` a tu comando de inicio de Node.js:
   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   NODE_OPTIONS="--import dd-trace/initialize.mjs" <your application command>
   ```

   Sustituye `<YOUR_DATADOG_API_KEY>` por tu clave de API de Datadog.

[1]: /es/llm_observability/setup/sdk/nodejs/#command-line-setup
[2]: /es/getting_started/site/

{{% /tab %}}
{{% tab "Java" %}}
1. Instala el kit de desarrollo de software (SDK):

   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. Añade el argumento JVM `-javaagent` a tu comando de inicio de Java:
   ```shell
   java -javaagent:/path/to/dd-java-agent.jar \
   -Ddd.llmobs.enabled=true \
   -Ddd.llmobs.ml.app=quickstart-app \
   -Ddd.api.key=<YOUR_DATADOG_API_KEY> \
   -jar path/to/your/app.jar
   ```

   Sustituye `<YOUR_DATADOG_API_KEY>` por tu clave de API de Datadog.

[1]: /es/llm_observability/setup/sdk/java/#command-line-setup
[2]: /es/getting_started/site/

{{% /tab %}}
{{< /tabs >}}

### Ver trazas

Realiza solicitudes a tu aplicación al activar llamadas a LLM y, luego, visualiza las trazas en la pestaña **Traces** (Trazas) [de la página **LLM Observability**][3] en Datadog. Si no ves ninguna traza, asegúrate de que estás utilizando una biblioteca compatible. De lo contrario, puede que tengas que instrumentar manualmente las llamadas a LLM de tu aplicación.


### Siguientes pasos

Después de que se envíen las trazas de tu solicitud, puedes:

- [Configurar las evaluaciones][4] que puedes utilizar para evaluar la eficacia de tu solicitud de LLM.
- Añadir [instrumentación personalizada][5] a tu aplicación y extraer datos que la instrumentación automática no puede.


## Ejemplo de la aplicación "Hello World"

A continuación, encontrarás una sencilla aplicación que puedes utilizar para empezar a explorar el producto LLM Observability.


{{< tabs >}}
{{% tab "Python" %}}

1. Instala OpenAI con `pip install openai`.

2. Guarda el script de ejemplo `app.py`:

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

3. Ejecuta la aplicación:

   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   ddtrace-run app.py
   ```
{{% /tab %}}

{{% tab "Node.js" %}}
1. Instala OpenAI con `npm install openai`.

2. Guarda el script de ejemplo `app.js`:

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

3. Ejecuta la aplicación:
   ```
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   NODE_OPTIONS="--import dd-trace/initialize.mjs" node app.js
   ```

{{% /tab %}}
{{< /tabs >}}


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/llm_observability/setup/sdk/python
[2]: /es/llm_observability/setup/sdk/nodejs
[3]: https://app.datadoghq.com/llm/traces
[4]: /es/llm_observability/evaluations
[5]: /es/llm_observability/instrumentation/custom_instrumentation