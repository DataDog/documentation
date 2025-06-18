---
aliases:
- /es/tracing/llm_observability/quickstart
further_reading:
- link: /llm_observability
  tag: Documentación
  text: Más información sobre LLM Observability
title: Rastrear una aplicación LLM
---

## Información general

Esta guía utiliza los SDK de LLM Observability para [Python][1] y [Node.js][2]. Si tu aplicación está escrita en otro lenguaje, puedes crear trazas (traces) llamando a la [API][8] en su lugar.

## Configuración

### Notebooks Jupyter

Para entender mejor los términos y conceptos de LLM Observability, puedes explorar los ejemplos en el [repositorio de notebooks de LLM Observability][12]. Estos notebooks proporcionan una experiencia práctica y te permiten aplicar estos conceptos en tiempo real.

## Línea de comandos

Para generar una traza (trace) de LLM Observability, puedes ejecutar un script Python o Node.js.

### Requisitos previos

- LLM Observability requiere una clave de API Datadog. Para obtener más información, consulta las [instrucciones para crear una clave de API][7].
- El siguiente script de ejemplo utiliza OpenAI, pero puedes modificarlo para utilizar un proveedor diferente. Para ejecutar el script tal y como está escrito, necesitas:
    - Una clave de API OpenAI almacenada en tu entorno como `OPENAI_API_KEY`. Para crear una, consulta la [configuración de la cuenta][4] y [Configurar tu clave de API][6] en la documentación oficial de OpenAI.
    - Biblioteca OpenAI Python instalada. Para obtener instrucciones, consulta la [configuración de Python][5] en la documentación oficial de OpenAI.

{{< tabs >}}
{{% tab "Python" %}}

1. Instala los paquetes de SDK y OpenAI:

   ```shell
   pip install ddtrace
   pip install openai
   ```

2. Crea un script, que hace una única llamada a OpenAI.

   ```python
   import os
   from openai import OpenAI

   oai_client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

   completion = oai_client.chat.completions.create(
       model="gpt-3.5-turbo",
       messages=[
        {"role": "system", "content": "You are a helpful customer assistant for a furniture store."},
        {"role": "user", "content": "I'd like to buy a chair for my living room."},
    ],
   )
   ```

3. Ejecuta el script con el siguiente comando shell. Esto envía una traza de la llamada de OpenAI a Datadog.

   ```shell
   DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=onboarding-quickstart \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> DD_SITE=<YOUR_DD_SITE> \
   DD_LLMOBS_AGENTLESS_ENABLED=1 ddtrace-run python quickstart.py
   ```

   Sustituye `<YOUR_DATADOG_API_KEY>` por tu clave de API Datadog y `<YOUR_DD_SITE>` por tu [sitio Datadog][2]. 

   Para obtener más información sobre las variables de entorno necesarias, consulta [la documentación del SDK][1].

[1]: /es/llm_observability/setup/sdk/python/#command-line-setup
[2]: /es/getting_started/site/
{{% /tab %}}

{{% tab "Node.js" %}}
1. Instala los paquetes de SDK y OpenAI:

   ```shell
   npm install dd-trace
   npm install openai
   ```
2. Crea un script, que hace una única llamada a OpenAI.

   ```javascript
   const { OpenAI } = require('openai');

   const oaiClient = new OpenAI(process.env.OPENAI_API_KEY);

   function main () {
      const completion = await oaiClient.chat.completions.create({
         model: 'gpt-3.5-turbo',
         messages: [
            { role: 'system', content: 'You are a helpful customer assistant for a furniture store.' },
            { role: 'user', content: 'I\'d like to buy a chair for my living room.' },
         ]
      });
   }

   main();
   ```

3. Ejecuta el script con el siguiente comando shell. Esto envía una traza de la llamada de OpenAI a Datadog.
   ```shell
   DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=onboarding-quickstart \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> DD_SITE=<YOUR_DD_SITE> \
   DD_LLMOBS_AGENTLESS_ENABLED=1 NODE_OPTIONS="--import dd-trace/initialize.mjs" node quickstart.js
   ```

   Sustituye `<YOUR_DATADOG_API_KEY>` por tu clave de API Datadog y `<YOUR_DD_SITE>` por tu [sitio Datadog][2]. 

   Para obtener más información sobre las variables de entorno necesarias, consulta [la documentación del SDK][1].

[1]: /es/llm_observability/setup/sdk/nodejs/#command-line-setup
[2]: /es/getting_started/site/

{{% /tab %}}
{{< /tabs >}}

   **Nota**: `DD_LLMOBS_AGENTLESS_ENABLED` sólo es necesaria si no se está ejecutando el Datadog Agent. Si el Agent se está ejecutando en tu entorno de producción, asegúrate de que esta variable de entorno no está configurada.

4. Consulta la traza de tu llamada LLM en la pestaña **Trazas** [de la página **LLM Observability**][3] en Datadog.

   {{< img src="llm_observability/quickstart_trace_1.png" alt="Traza de LLM Observability que muestra una única solicitud LLM" style="width:100%;" >}}

La traza que ves se compone de un único tramo (span) LLM. El comando `ddtrace-run` o `NODE_OPTIONS="--import dd-trace/initialize.mjs"` automáticamente rastrea tus llamadas LLM desde la [lista de integraciones compatibles de Datadog][10].

Si tu aplicación incluye avisos, cadenas complejas o flujos de trabajo más elaborados que involucran LLM, puedes rastrearlos utilizando la [documentación de configuración][11] y la [documentación del SDK][1].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/llm_observability/setup/sdk/python
[2]: /es/llm_observability/setup/sdk/nodejs
[3]: https://app.datadoghq.com/llm/traces
[4]: https://platform.openai.com/docs/quickstart/account-setup
[5]: https://platform.openai.com/docs/quickstart/step-1-setting-up-python
[6]: https://platform.openai.com/docs/quickstart/step-2-set-up-your-api-key
[7]: /es/account_management/api-app-keys/#add-an-api-key-or-client-token
[8]: /es/llm_observability/setup/api
[10]: /es/llm_observability/setup/auto_instrumentation/
[11]: /es/llm_observability/setup/
[12]: https://github.com/DataDog/llm-observability