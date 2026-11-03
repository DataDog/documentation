---
aliases:
- /es/llm_observability/instrumentation/agentic/
title: Instrumentación agéntica
---
## Directrices {#guidelines}

**Importante**: Siga **todas** las directrices enumeradas aquí al seguir hipervínculos a otros pasos.

1. Solo agregue código relacionado con Datadog Agent Observability y con Datadog tracer. A menos que sea para fines de instrumentación manual, no modifique código no relacionado.
2. Si se ejecuta en un monorepo o proyecto con múltiples servicios u objetivos de instrumentación, confirme con el usuario qué servicio o subproyecto debe instrumentarse con Agent Observability.
3. Verifique si el SDK de Datadog instalado admite la instrumentación requerida para la aplicación. Si es así, utilice esa versión. Si la instrumentación requiere una actualización del SDK, explique por qué y pregunte antes de actualizar la dependencia. Postergue las actualizaciones requeridas solo para Prompt Management opcional hasta que el usuario elija esa integración.
4. Conserve el proveedor, el modelo, el contenido del prompt, el comportamiento, el administrador de paquetes y el flujo de trabajo de gestión de secretos existentes de la aplicación.

Primero, complete la instrumentación, incluido el Prompt Tracking y cualquier intercambio de contexto solicitado. Luego, ofrezca Prompt Management alojado opcional. Prompt Management no es necesario para la instrumentación, el intercambio de contexto o las recomendaciones de verificación.

## Requisitos previos {#pre-requisites}

1. Se requiere una clave de Datadog API para enviar datos de Agent Observability a Datadog. Sin una clave de API, el usuario no recibirá datos de Agent Observability, por lo que este es un **requisito obligatorio**. Si el usuario aún no ha proporcionado una y no desea hacerlo, continúe instrumentando su aplicación, asegurándose de indicar explícitamente al final que debe configurarla y señálele dónde puede hacerlo.
2. Determine el lenguaje de programación y el framework que se utilizan en la aplicación para instrumentar. Esto es importante para instrumentar correctamente la aplicación.

## Variables de entorno {#environment-variables}

Todas las variables de entorno deben configurarse _ya sea_ antes de que se inicie el proceso principal de la aplicación, o como las primeras líneas del punto de entrada de la aplicación.

Estas variables de entorno no deben estar integradas en línea. Más bien, deben leerse directamente del proceso.

- Para el desarrollo local, configúrelas en un archivo `.env` apropiado, o similar, para la aplicación y el lenguaje en el que está escrita, asegurándose de que se completen cuando se inicie el Agent Observability SDK (consulte las guías específicas del lenguaje para cada uno)
- Para el desarrollo no local, informe también al usuario qué variables de entorno necesitará configurar

### Clave de API {#api-key}

Esto es **crítico**. Configure la clave de API con la siguiente variable de entorno.

```bash
DD_API_KEY=<provided-dd-api-key>
```

### Habilite Agent Observability {#enable-agent-observability}

Esto es **crítico**. Establezca las siguientes variables de entorno para habilitar correctamente Agent Observability.

```bash
DD_LLMOBS_ENABLED=true
DD_LLMOBS_AGENTLESS_ENABLED=true
```

### Nombre de la aplicación de Agent Observability {#agent-observability-application-name}

Esto es **altamente recomendado**. Si el usuario proporcionó un nombre de aplicación (o `DD_LLMOBS_ML_APP`) como parte del prompt inicial, utilice ese valor. De lo contrario, utilice un nombre lógico basado en el nombre de la carpeta, el repositorio o el proyecto.

```bash
DD_LLMOBS_ML_APP=<provided-or-inferred-application-name>
```

### Sitio de Datadog {#datadog-site}

Esto es **opcional**. Establezca el sitio de Datadog, correspondiente al centro de datos asociado con la clave de API del usuario. Si no se proporciona (posiblemente a través de `DD_SITE`), informe al usuario que se utilizará el sitio de `datadoghq.com`. _Si_ se proporciona un valor, establézcalo como una variable de entorno.

```bash
DD_SITE=<provided-dd-site>
```

## Instrumente la aplicación {#instrument-the-application}

Siga las instrucciones para el lenguaje detectado:

| Lenguaje | Instrucciones |
|----------|-------------|
| Python | [Instrumentación agéntica de aplicaciones Python][1] |
| Node.js | [Instrumentación agéntica de aplicaciones Node.js][2] |
| Java | [Instrumentación agéntica de aplicaciones Java][3] |
| OpenTelemetry | [Instrumentación de OpenTelemetry][4] |

## Instrumentar prompts {#instrument-prompts}

Prompt Tracking es parte de la instrumentación predeterminada de Agent Observability. Para cada llamada a LLM seleccionada, identifique dónde construye la aplicación el prompt. Mantenga la plantilla del prompt separada de los valores de las variables utilizados para completarla.

Para prompts locales, siga las [instrucciones de Prompt Tracking][5] para registrar la plantilla del prompt y los valores de las variables con el tramo del LLM. Mantenga el código existente que construye el prompt. No lo reemplace con código que recupere prompts de Datadog Prompt Management.

Si la aplicación ya recupera prompts de Datadog Prompt Management, mantenga esa integración. El seguimiento automático se aplica cuando el prompt formateado se pasa sin cambios a un proveedor compatible e instrumentado automáticamente. Si la aplicación copia o modifica el prompt formateado antes de enviarlo al proveedor, añada anotaciones explícitas como se describe en [Track prompt usage][6]. No añada anotaciones manuales cuando el seguimiento automático ya capture los metadatos del prompt.

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
## Visualización de trazas {#viewing-traces}

Informe sobre los cambios de instrumentación, cualquier requisito de configuración restante y si la carga de contexto se realizó correctamente cuando se solicitó ese paso. Indique al usuario cómo ejecutar su aplicación y visualizar sus datos en Datadog. No afirme que los rastreos o las recomendaciones están disponibles sin verificación.

**Obligatorio**: proporcione un enlace permanente donde el usuario pueda visualizar los datos asociados con esta aplicación. Esto tomará la forma de

```
https://app.{dd_site}/llm/applications?query=@ml_app:{application_name}
```

Complete los valores proporcionados:
1. `dd_site`: si se proporcionó el valor para [sitio de Datadog](#datadog-site), utilice ese valor. De lo contrario, utilice `datadoghq.com`.
2. `application_name`: utilice el valor proporcionado o inferido de la sección [Agent Observability application name](#agent-observability-application-name).

## Prompt Management opcional {#optional-prompt-management}

Tras completar la instrumentación y cualquier intercambio de contexto solicitado, informe de los resultados. A continuación, aborde Prompt Management alojado opcional para aplicaciones Python:

- Si el usuario ya proporcionó un ID de prompt gestionado por Datadog, siga la [guía de integración agentic de Prompt Management][7]. No vuelva a preguntar si desea habilitar Prompt Management.
- De lo contrario, identifique los prompt locales de la aplicación y pregunte si el usuario desea gestionarlos en Datadog. Si acepta, siga la guía para crear versiones gestionadas de los prompt seleccionados y actualice la aplicación para recuperarlos.
- Si el usuario declina o no responde, mantenga los prompt locales instrumentados sin cambios.

Siga la [sección Track prompt usage][6] de la guía para determinar si se requiere seguimiento automático o anotaciones explícitas. Evite duplicar los metadatos del prompt.

Si Prompt Management requiere una actualización del SDK, explique el motivo y pregunte antes de actualizar la dependencia. Esta actualización opcional no debe retrasar la instrumentación principal ni el intercambio de contexto.

## Instrucciones específicas del lenguaje {#language-specific-instructions}

{{< whatsnext desc="Instrumente una aplicación con un coding agent:" >}}
    {{< nextlink href="/llm_observability/instrument/agentic/python" >}}Instrumentación agéntica de aplicaciones Python{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/nodejs" >}}Instrumentación agéntica de aplicaciones Node.js{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/java" >}}Instrumentación agéntica de aplicaciones Java{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/prompt_management" >}}Integración agéntica de Prompt Management{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /es/llm_observability/instrument/agentic/python.md
[2]: /es/llm_observability/instrument/agentic/nodejs.md
[3]: /es/llm_observability/instrument/agentic/java.md
[4]: /es/llm_observability/instrument/otel_instrumentation.md
[5]: /es/llm_observability/instrument/prompt_tracking.md
[6]: /es/llm_observability/instrument/agentic/prompt_management.md#track-prompt-usage
[7]: /es/llm_observability/instrument/agentic/prompt_management.md