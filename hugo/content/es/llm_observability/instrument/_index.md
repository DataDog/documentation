---
aliases:
- /es/llm_observability/instrumentation/
- /es/llm_observability/instrument/agentic/
- /es/llm_observability/instrumentation/agentic/
description: Instrumente una aplicación de LLM con los SDK de Datadog, OpenTelemetry
  o la API HTTP, y realice un seguimiento de los prompts y trazas en Agent Observability.
further_reading:
- link: /llm_observability/instrument/auto_instrumentation/
  tag: Documentación
  text: Instrumentación automática para Agent Observability
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: Blog
  text: Datadog LLM Observability admite de forma nativa las convenciones semánticas
    de GenAI de OpenTelemetry
- link: https://learn.datadoghq.com/courses/llm-obs-getting-started
  tag: Centro de aprendizaje
  text: Introducción a Agent Observability
title: Instrumentación de Agent Observability
---
## Descripción general {#overview}

Instrumente su aplicación o agente de LLM para recopilar trazas, prompts, uso de tokens, latencia y errores en Agent Observability. Utilice la instrumentación automática para los proveedores y frameworks compatibles, y agregue tramos personalizados para otras operaciones. Puede seguir estos pasos usted mismo o entregar esta página a un agente de codificación.

{{< skill-callout
    title="Configure Agent Observability con un agente de codificación"
    text="Copy this prompt into your AI coding agent to use the `dd-orchestrator` skill for guided setup of Python and Node.js applications."
    action_name="copy_dd_orchestrator_agent_observability_setup_prompt"
    lang="text" >}}
Use el skill de https://github.com/datadog-labs/agent-skills/blob/main/dd-orchestrator/SKILL.md para instrumentar Datadog Agent Observability en mi proyecto.
{{< /skill-callout >}}

{{< agent-only >}}
Siga estas pautas a lo largo de esta página y sus guías de configuración vinculadas:

1. Solo agregue código relacionado con Agent Observability y con el rastreador de Datadog. No modifique código de la aplicación que no esté relacionado, excepto donde la instrumentación manual lo requiera.
2. Para un monorepo o proyecto con múltiples servicios, confirme qué servicio o subproyecto instrumentar antes de editar.
3. Inspeccione el SDK de Datadog instalado. Reutilícelo si es compatible con la instrumentación requerida. Si se requiere una actualización, explique el motivo y pregunte antes de cambiar la dependencia. Postergue las actualizaciones requeridas solo para Prompt Management opcional hasta que el usuario elija esa integración.
4. Conserve el proveedor, el modelo, el contenido del prompt, el comportamiento, el administrador de paquetes y el flujo de trabajo de gestión de secretos existentes de la aplicación.
5. Complete la instrumentación, incluidos Prompt Tracking y cualquier intercambio de contexto solicitado, antes de ofrecer la opción de Prompt Management alojado. Prompt Management no es necesario para la instrumentación, el intercambio de contexto o las recomendaciones de verificación.
{{< /agent-only >}}

## Requisitos previos {#prerequisites}

- Obtenga una [Datadog API key][8] para enviar datos directamente a Datadog.
- Seleccione el [sitio de Datadog][9] asociado con su cuenta.

{{< agent-only >}}
Inspeccione la aplicación para identificar su lenguaje, framework, proveedor de LLM y comando de inicio antes de elegir una guía de configuración. Para la configuración sin agente, utilice la clave de API proporcionada por el usuario a través del flujo de trabajo de gestión de secretos existente. Si el usuario no ha proporcionado una clave y no desea proporcionar una, continúe con los cambios de código. En la respuesta final, explique que el envío de datos requiere la clave y muestre dónde configurarla. No afirme que el envío de datos se realizó correctamente sin ella.
{{< /agent-only >}}

## Configure las variables de entorno {#configure-environment-variables}

Establezca las variables de entorno antes de que se inicie la aplicación o cárguelas antes de que se inicialice el SDK.

{{< agent-only >}}
Utilice el flujo de trabajo de configuración o gestión de secretos existente de la aplicación. Para el desarrollo local, este puede ser un archivo `.env` existente. Mantenga las credenciales fuera del código fuente.
{{< /agent-only >}}

El siguiente ejemplo envía datos directamente a Datadog sin un Datadog Agent. Reemplace los marcadores de posición y cargue estos valores en el proceso de la aplicación:

```text
DD_API_KEY=<DATADOG_API_KEY>
DD_LLMOBS_ENABLED=true
DD_LLMOBS_AGENTLESS_ENABLED=true
DD_LLMOBS_ML_APP=<APPLICATION_NAME>
DD_SITE=<DATADOG_SITE>
```

Si la aplicación envía datos a través de un Datadog Agent, utilice las siguientes variables de entorno en su lugar. Establezca `DD_TRACE_AGENT_URL` en la URL de su Datadog Agent:

```text
DD_TRACE_AGENT_URL=<DATADOG_AGENT_URL>
DD_LLMOBS_ENABLED=true
DD_LLMOBS_AGENTLESS_ENABLED=false
DD_LLMOBS_ML_APP=<APPLICATION_NAME>
```

### Nombre de la aplicación de Agent Observability {#agent-observability-application-name}

Establezca `DD_LLMOBS_ML_APP` con el nombre utilizado para agrupar las trazas y los tramos de la aplicación. Mantenga un nombre de aplicación existente o elija un nombre basado en el servicio, repositorio o proyecto. Consulte las [pautas para nombrar aplicaciones][10].

{{< agent-only >}}
Si el usuario proporcionó un nombre de aplicación o `DD_LLMOBS_ML_APP`, utilícelo. De lo contrario, conserve el nombre existente o infiera un nombre lógico a partir de la carpeta, el repositorio o el proyecto. Informe el nombre utilizado.
{{< /agent-only >}}

### Sitio de Datadog {#datadog-site}

Establezca `DD_SITE` con el sitio asociado a su clave de API. El valor predeterminado es `datadoghq.com`. Consulte [sitios de Datadog][9] para ver otros valores.

{{< agent-only >}}
Utilice el valor `DD_SITE` proporcionado. Si no se proporciona ni se configura ningún valor, informe al usuario que se utiliza `datadoghq.com`. Para implementaciones fuera del desarrollo local, enumere las variables de entorno que el usuario debe configurar antes del inicio.
{{< /agent-only >}}

## Instrumente la aplicación {#instrument-the-application}

Elija el enfoque que coincida con su aplicación:

| Enfoque | Úselo para |
|----------|------------|
| [Instrumentación automática][1] | Proveedores y frameworks de LLM compatibles en Python, Node.js y Java. |
| [Instrumentación de SDK][2] | Tramos personalizados, flujos de trabajo, evaluaciones y seguimiento de sesiones. El soporte para Go es experimental y solo proporciona instrumentación manual. |
| [Instrumentación de OpenTelemetry][4] | Aplicaciones y frameworks que emiten tramos de OpenTelemetry compatibles. |
| [Instrumentación de API HTTP][3] | Integraciones personalizadas que envían tramos y evaluaciones directamente a través de HTTP. |

La instrumentación automática captura prompts de entrada, completaciones de salida, uso de tokens y costo cuando está disponible, latencia, errores, parámetros del modelo y metadatos del framework. Las llamadas a LLM compatibles no requieren la creación manual de tramos.

Siga la [configuración de instrumentación automática][11] para instalar e inicializar el SDK para su lenguaje. Para operaciones personalizadas, agregue tramos con la [referencia del SDK][2].

Para envíos directos por HTTP, utilice la [Spans API][12] y la [Evaluations API][13].

{{< agent-only >}}
Para Python, Node.js o Java, siga la configuración específica del lenguaje en la [guía de instrumentación automática](/llm_observability/instrument/auto_instrumentation.md#set-up-automatic-instrumentation). Para una aplicación de Next.js, siga la [guía de Next.js](/llm_observability/guide/nextjs_guide.md) en lugar de la configuración general de Node.js. Para una aplicación de OpenTelemetry, siga la [guía de OpenTelemetry](/llm_observability/instrument/otel_instrumentation.md). Regrese aquí después de la configuración para instrumentar los prompts y completar los pasos restantes.
{{< /agent-only >}}

## Instrumentar prompts {#instrument-prompts}

Consulte [Configure Prompt Management][7] para obtener instrucciones sobre la instrumentación de prompt. Puede utilizar un prompt gestionado existente o promover un prompt local. Mantenga el prompt local como respaldo.

Siga [Track prompt usage][6] para elegir entre el seguimiento automático y las anotaciones explícitas.

{{< agent-only >}}
Después de informar los resultados de la instrumentación:

- Si el usuario proporcionó un ID de prompt gestionado por Datadog, siga la [guía de Prompt Management](/llm_observability/configure/prompt_management.md). No pregunte si desea habilitarlo de nuevo.
- De lo contrario, identifique los prompts locales de la aplicación de Python o Node.js y pregunte si el usuario desea gestionarlos en Datadog. Si aceptan, siga la guía para promover los prompts seleccionados e integrar la recuperación en tiempo de ejecución.
- Si el usuario declina o no responde, mantenga los prompts locales instrumentados sin cambios.
- Si Prompt Management requiere una actualización del SDK, explique el motivo y pregunte antes de cambiar la dependencia. Esta actualización opcional no debe retrasar la instrumentación principal ni el intercambio de contexto.
{{< /agent-only >}}

{{< agent-only >}}
## Compartir contexto del agente para recomendaciones de verificación {#share-agent-context-for-check-recommendations}

Complete este paso solo cuando el aviso de incorporación inicial de Datadog incluya una URL de carga de contexto del agente, un token de carga y una versión de esquema.

Después de la instrumentación:

1. Inspeccione solo los archivos del repositorio necesarios para comprender el propósito, las herramientas, las reglas de comportamiento explícitas y las condiciones de transferencia del agente.
2. Incluya solo las expectativas respaldadas directamente por un aviso, instrucción, política o prueba citada. Registre un comportamiento atómico por expectativa, expréselo en términos observables en la entrada o salida del agente, el contexto de traza, las llamadas a herramientas, los resultados de las herramientas o su orden, y omita las reglas ambiguas o contradictorias en lugar de adivinar.
3. Cree un resumen JSON delimitado utilizando la versión de esquema del aviso de incorporación y esta forma exacta:

   ```json
   {
     "schema_version": "<schema-version-from-the-onboarding-prompt>",
     "context": {
       "agent_summary": "A short description of the agent",
       "capabilities": [
         {
           "name": "...",
           "description": "...",
           "source_reference_ids": ["source-1"]
         }
       ],
       "tools": [
         {
           "name": "...",
           "purpose": "...",
           "source_reference_ids": ["source-1"]
         }
       ],
       "behavioral_expectations": [
         {
           "id": "expectation-1",
           "behavior": "...",
           "applicability": "...",
           "failure": "...",
           "observable_signals": ["agent_input", "agent_output"],
           "source_reference_ids": ["source-1"]
         }
       ],
       "handoff_conditions": [
         {
           "id": "handoff-1",
           "condition": "...",
           "destination": "...",
           "observable_signals": ["agent_input", "agent_output"],
           "source_reference_ids": ["source-1"]
         }
       ],
       "source_references": [
         {
           "id": "source-1",
           "source_kind": "prompt",
           "path": "relative/path",
           "line_start": 1,
           "line_end": 10,
           "description": "Why this source supports the summary"
         }
       ]
     }
   }
   ```

   Mantenga el objeto `context` codificado en 64 KiB o menos y utilice estos límites de recolección:

   - Hasta 20 capacidades y 30 herramientas.
   - Entre 1 y 30 expectativas de comportamiento.
   - Hasta 20 condiciones de transferencia.
   - Entre 1 y 60 referencias de fuente.

   Utilice entre 1 y 10 ID de referencia de fuente únicos para cada capacidad, herramienta, expectativa de comportamiento y condición de transferencia. Cada expectativa de comportamiento y condición de transferencia debe citar al menos una fuente `prompt`, `instruction`, `policy` o `test` e incluir entre 1 y 6 señales observables únicas.

   Mantenga `agent_summary` entre 1 y 1,000 caracteres. Mantenga los nombres y destinos de transferencia entre 1 y 120 caracteres. Mantenga las descripciones, propósitos, comportamientos, declaraciones de aplicabilidad, fallas, condiciones de transferencia y rutas de fuente entre 1 y 500 caracteres. Mantenga las descripciones de referencia de fuente entre 1 y 300 caracteres.

   Asigne a cada referencia de fuente, expectativa de comportamiento y condición de transferencia un ID de entre 1 y 64 caracteres que contenga solo letras, números, guiones o guiones bajos. Los ID de referencia de fuente deben ser únicos dentro de `source_references`. Los ID de expectativa de comportamiento y condición de transferencia deben ser únicos en ambas colecciones. Los ID son locales para esta carga y permiten que cada verificación recomendada cite su evidencia.

   Utilice `source_kind` solo desde `prompt`, `instruction`, `policy`, `test`, `tool_definition` o `implementation`. Utilice `observable_signals` solo desde `agent_input`, `agent_output`, `trace_context`, `tool_call`, `tool_result` o `tool_order`. Si incluye `line_end`, incluya también un `line_start` positivo y haga que `line_end` sea mayor o igual que `line_start`.

4. Envíe el JSON una vez a la URL de carga desde el aviso de incorporación. Utilice `POST`, configure `Content-Type: application/json` y pase el token de carga solo en el encabezado `Authorization: Bearer <upload-token>`.

Siga estos requisitos de seguridad:

- Trate el token de carga como un secreto de un solo uso. No lo escriba en archivos de fuente, configuración, historial de shell, resultados o registros.
- Cargue solo el resumen estructurado. No cargue código fuente sin procesar, prompts completos, secretos, credenciales, variables de entorno, datos de clientes, contenidos de rastreo o metadatos arbitrarios.
- Utilice rutas de fuente POSIX relativas al repositorio normalizadas y los rangos de líneas útiles más pequeños. No utilice rutas absolutas, barras invertidas, dos puntos, separadores no normalizados ni segmentos de ruta `.` o `..`. Las referencias de fuente identifican la evidencia; no deben copiar su contenido.
- Si la carga falla, continúe con la instrumentación e informe al usuario que Datadog no recibió el contexto opcional. No vuelva a intentarlo con datos más amplios.

{{< /agent-only >}}

## Visualizar trazas {#view-traces}

Ejecute la aplicación y realice una llamada a LLM instrumentada. Abra [Agent Observability][14] y seleccione la aplicación para inspeccionar sus trazas.

Para enlazar directamente a los datos de la aplicación, utilice la URL de su [sitio de Datadog][9] seleccionado y filtre por el nombre de la aplicación:

```text
https://{{< region-param key="dd_full_site" >}}/llm/applications?query=@ml_app:<APPLICATION_NAME>
```

{{< agent-only >}}
Informe los cambios de instrumentación, los requisitos de configuración restantes y cómo ejecutar la aplicación. Si se solicitó el uso compartido de contexto, informe si la carga se realizó correctamente. No afirme que los rastreos o las recomendaciones están disponibles sin verificación.

Proporcione un enlace directo a la aplicación utilizando el nombre de la aplicación suministrado o inferido. Determine el servidor de la aplicación a partir de `DD_SITE`: utilice `app.datadoghq.com` para `datadoghq.com`, `app.datadoghq.eu` para `datadoghq.eu`, `app.ddog-gov.com` para `ddog-gov.com`, y el valor `DD_SITE` en sí para otros sitios compatibles. Codifique el valor de la consulta para su uso en una URL.
{{< /agent-only >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/llm_observability/instrument/auto_instrumentation/
[2]: /es/llm_observability/instrument/sdk/
[3]: /es/llm_observability/instrument/api/
[4]: /es/llm_observability/instrument/otel_instrumentation/
[6]: /es/llm_observability/configure/prompt_management/#track-prompt-usage
[7]: /es/llm_observability/configure/prompt_management/
[8]: /es/account_management/api-app-keys/#add-an-api-key-or-client-token
[9]: /es/getting_started/site/
[10]: /es/llm_observability/instrument/sdk/#application-naming-guidelines
[11]: /es/llm_observability/instrument/auto_instrumentation/#set-up-automatic-instrumentation
[12]: /es/llm_observability/instrument/api/?tab=model#spans-api
[13]: /es/llm_observability/instrument/api/?tab=model#evaluations-api
[14]: https://app.datadoghq.com/llm/applications