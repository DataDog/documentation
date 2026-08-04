---
title: Agentic Instrumentation
---
## Directrices {#guidelines}

**Importante**: Siga **todas** las directrices enumeradas aquí al seguir hipervínculos a otros pasos.

1. Solo agregue código relacionado con Datadog Agent Observability y con Datadog tracer A menos que sea para fines de instrumentación manual, no modifique código no relacionado.
2. Si se ejecuta en un monorepositorio o proyecto con múltiples servicios u objetivos de instrumentación, confirme con el usuario qué servicio o sub-proyecto debe instrumentarse con Agent Observability.
3. Instale los Datadog SDK más recientes. Si ya está instalado, consulte con el usuario si está bien actualizar la dependencia.

## Requisitos previos {#pre-requisites}

1. Se requiere una Datadog API Key para enviar datos de Agent Observability a Datadog. Sin una clave de API, el usuario no recibirá datos de Agent Observability, por lo que este es un **requisito indispensable**. Si el usuario aún no ha proporcionado una y no desea hacerlo, continúe instrumentando su aplicación, asegurándose de indicar explícitamente al final que debe configurarla, y señálele dónde puede hacerlo.
2. Determine el lenguaje de programación y el framework que se utilizan en la aplicación para instrumentarla. Esto es importante para instrumentar correctamente la aplicación.

## Variables de entorno {#environment-variables}

Todas las variables de entorno deben configurarse _ya sea_ antes de que se inicie el proceso principal de la aplicación, o como las primeras líneas del punto de entrada de la aplicación.

Estas variables de entorno no deben estar integradas en línea. Más bien, deben leerse directamente del proceso.

- Para el desarrollo local, configúrelas en un archivo `.env` apropiado, o similar, para la aplicación y el lenguaje en el que está escrita, asegurándose de que se completen cuando se inicie el Agent Observability SDK (consulte las guías específicas del lenguaje para cada uno)
- Para el desarrollo no local, informe también al usuario qué variables de entorno deberá configurar

### Clave de API {#api-key}

Esto es **crítico**. Configure la clave de API con la siguiente variable de entorno.

```bash
DD_API_KEY=<provided-dd-api-key>
```

### Habilitar Agent Observability {#enable-agent-observability}

Esto es **crítico**. Configure las siguientes variables de entorno para habilitar correctamente Agent Observability.

```bash
DD_LLMOBS_ENABLED=true
DD_LLMOBS_AGENTLESS_ENABLED=true
```

### Nombre de la aplicación Agent Observability {#agent-observability-application-name}

Esto es **fuertemente recomendado**. Si el usuario proporcionó un nombre de aplicación (o `DD_LLMOBS_ML_APP`) como parte del mensaje inicial, utilice ese valor. De lo contrario, utilice un nombre lógico basado en el nombre de la carpeta, el repositorio o el proyecto.

```bash
DD_LLMOBS_ML_APP=<provided-or-inferred-application-name>
```

### Datadog site {#datadog-site}

Esto es **opcional**. Configure Datadog site, correspondiente al centro de datos asociado con la clave de API del usuario. Si no se proporciona (posiblemente a través de `DD_SITE`), informe al usuario que se utilizará el sitio de `datadoghq.com`. _Si_ se proporciona un valor, establézcalo como una variable de entorno.

```bash
DD_SITE=<provided-dd-site>
```

## Instrumente la aplicación {#instrument-the-application}

Siga las instrucciones para el lenguaje detectado:

| Lenguaje | Instrucciones |
|----------|-------------|
| Python | [Agentic Instrumentation de aplicaciones Python](/llm_observability/instrumentation/agentic/python.md) |
| Node.js | [Agentic Instrumentation de aplicaciones Node.js](/llm_observability/instrumentation/agentic/nodejs.md) |
| Java | [Agentic Instrumentation de aplicaciones Java](/llm_observability/instrumentation/agentic/java.md) |
| OpenTelemetry | [Instrumentación de OpenTelemetry](/llm_observability/instrumentation/otel_instrumentation.md) |

## Instrumente los prompts y ofrezca Prompt Management {#instrument-prompts-and-offer-prompt-management}

Prompt Tracking es parte de la instrumentación predeterminada de Agent Observability. Identifique el límite de construcción del prompt para cada llamada a LLM seleccionada y conserve la plantilla del prompt por separado de sus variables dinámicas.

1. Si la solicitud del usuario ya especifica un ID de prompt administrado por Datadog, siga la [guía de integración agentica de Prompt Management](/llm_observability/instrumentation/agentic/prompt_management.md). No pregunte si desea utilizar Prompt Management de nuevo.
2. De lo contrario, identifique los prompts de la aplicación y las variables dinámicas utilizadas para darles formato. Conserve el proveedor, el modelo, el contenido del prompt y el comportamiento de la aplicación existentes.
3. Para una aplicación de Python compatible, indique al usuario qué prompts identificó y pregúntele si desea administrar esos prompts con Datadog. Si acepta, siga la [guía de integración agentica de Prompt Management](/llm_observability/instrumentation/agentic/prompt_management.md) para promover los prompts locales seleccionados y reemplazar su construcción local con la recuperación de prompts administrados.
4. Si el usuario rechaza Prompt Management, o si el lenguaje de la aplicación no es compatible, instrumente los prompts seleccionados con metadatos de prompt estructurados siguiendo las [instrucciones de Prompt Tracking](/llm_observability/monitoring/prompt_tracking). No agregue la recuperación de prompts en tiempo de ejecución.

Cuando Prompt Management reemplace un prompt local, utilice el seguimiento automático del prompt administrado en lugar de adjuntar metadatos de prompt estructurados duplicados.

## Visualización de trazas {#viewing-traces}

Informe al usuario que puede acceder a su aplicación y ver los datos en Datadog.

**Obligatorio**: proporcione un enlace permanente donde el usuario pueda ver los datos asociados con esta aplicación. Esto tomará la forma de

```
https://app.{dd_site}/llm/applications?query=@ml_app:{application_name}
```

Complete los valores proporcionados:
1. `dd_site` - si el valor fue proporcionado para [Datadog site](#datadog-site), utilice ese valor. De lo contrario, utilice `datadoghq.com`.
2. `application_name` - utilice el valor proporcionado o inferido de la sección [Agent Observability application name](#llm-observability-application-name).