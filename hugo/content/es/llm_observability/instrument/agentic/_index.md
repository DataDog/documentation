---
aliases:
- /es/llm_observability/instrumentation/agentic/
title: Instrumentación agéntica
---
## Directrices {#guidelines}

**Importante**: Siga **todas** las directrices enumeradas aquí al seguir hipervínculos a otros pasos.

1. Solo agregue código relacionado con Datadog Agent Observability y con Datadog tracer. A menos que sea para fines de instrumentación manual, no modifique código no relacionado.
2. Si se ejecuta en un monorepo o proyecto con múltiples servicios u objetivos de instrumentación, confirme con el usuario qué servicio o subproyecto debe instrumentarse con Agent Observability.
3. Instale los SDK de Datadog más recientes. Si ya está instalado, verifique con el usuario si está bien actualizar la dependencia.

## Requisitos previos {#pre-requisites}

1. Se requiere una clave de API de Datadog para enviar datos de Agent Observability a Datadog. Sin una clave de API, el usuario no recibirá datos de Agent Observability, por lo que este es un **requisito obligatorio**. Si el usuario aún no ha proporcionado una y no desea hacerlo, continúe instrumentando su aplicación, asegurándose de indicar explícitamente al final que debe configurarla y señálele dónde puede hacerlo.
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
| Python | [Instrumentación agéntica de aplicaciones Python](/llm_observability/instrument/agentic/python.md) |
| Node.js | [Instrumentación agéntica de aplicaciones Node.js](/llm_observability/instrument/agentic/nodejs.md) |
| Java | [Instrumentación agéntica de aplicaciones Java](/llm_observability/instrument/agentic/java.md) |
| OpenTelemetry | [Instrumentación de OpenTelemetry](/llm_observability/instrument/otel_instrumentation.md) |

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
## Instrumente los prompts y ofrezca Prompt Management {#instrument-prompts-and-offer-prompt-management}

Prompt Tracking es parte de la instrumentación predeterminada de Agent Observability. Identifique el límite de construcción del prompt para cada llamada de LLM seleccionada y conserve la plantilla del prompt por separado de sus variables dinámicas.

1. Si la solicitud del usuario ya especifica un ID de prompt gestionado por Datadog, siga la [guía de integración agentic de Prompt Management](/llm_observability/instrument/agentic/prompt_management.md). No vuelva a preguntar si desea utilizar Prompt Management.
2. De lo contrario, identifique los prompts de la aplicación y las variables dinámicas utilizadas para darles formato. Conserve el proveedor, el modelo, el contenido del prompt y el comportamiento de la aplicación existentes.
3. Para una aplicación de Python compatible, indique al usuario qué prompts identificó y pregúntele si desea gestionar esos prompts con Datadog. Si acepta, siga la [guía de integración agentic de Prompt Management](/llm_observability/instrument/agentic/prompt_management.md) para promover los prompts locales seleccionados y reemplazar su construcción local con la recuperación de prompts gestionados.
4. Si el usuario rechaza Prompt Management, o si el lenguaje de la aplicación no es compatible, instrumente los prompts seleccionados con metadatos de prompt estructurados siguiendo las [instrucciones de Prompt Tracking](/llm_observability/instrument/prompt_tracking). No añada la recuperación de prompts en tiempo de ejecución.

Cuando Prompt Management reemplace un prompt local, utilice el seguimiento automático del prompt gestionado en lugar de adjuntar metadatos de prompt estructurados duplicados.

## Visualización de trazas {#viewing-traces}

Informe al usuario que puede acceder a su aplicación y visualizar los datos en Datadog.

**Obligatorio**: proporcione un enlace permanente donde el usuario pueda visualizar los datos asociados con esta aplicación. Esto tomará la forma de

```
https://app.{dd_site}/llm/applications?query=@ml_app:{application_name}
```

Complete los valores proporcionados:
1. `dd_site` - si se proporcionó el valor para [sitio de Datadog](#datadog-site), utilice ese valor. De lo contrario, utilice `datadoghq.com`.
2. `application_name` - utilice el valor proporcionado o inferido de la sección [Nombre de la aplicación de Agent Observability](#llm-observability-application-name).

## Instrucciones específicas del lenguaje {#language-specific-instructions}

{{< whatsnext desc="Instrumente una aplicación con un coding agent:" >}}
    {{< nextlink href="/llm_observability/instrument/agentic/python" >}}Instrumentación agéntica de aplicaciones Python{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/nodejs" >}}Instrumentación agéntica de aplicaciones Node.js{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/java" >}}Instrumentación agéntica de aplicaciones Java{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agentic/prompt_management" >}}Integración agéntica de Prompt Management{{< /nextlink >}}
{{< /whatsnext >}}