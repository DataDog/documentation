---
aliases:
- /es/llm_observability/mcp_server/
description: Conecte agentes de IA a sus trazas y experimentos de Agent Observability
  mediante el Datadog MCP Server.
further_reading:
- link: mcp_server
  tag: Documentación
  text: Datadog MCP Server
- link: /llm_observability/improve/experiments
  tag: Documentación
  text: Configurar y utilizar experimentos de Agent Observability
- link: /llm_observability/investigate
  tag: Documentación
  text: Monitoree su aplicación con Agent Observability
- link: /llm_observability/build_with_ai/claude_code_skills
  tag: Guía
  text: Analizar aplicaciones de LLM con habilidades de Claude Code
- link: https://www.datadoghq.com/blog/debug-and-evaluate-your-ai-app-from-your-coding-agent/
  tag: Blog
  text: Depure y evalúe su aplicación de IA desde su agente de codificación con Datadog
    Agent Observability
- link: https://www.datadoghq.com/blog/bits-evals/
  tag: Blog
  text: Mejore la calidad de los agentes de IA con Bits Evals
title: MCP y habilidades de Agent Observability
---
## Descripción general {#overview}

El [Datadog MCP Server][1] permite que los agentes de IA accedan a sus datos de [Agent Observability][2] a través del Model Context Protocol (MCP). El conjunto de herramientas `llmobs` proporciona herramientas para buscar y analizar trazas, inspeccionar detalles y contenido de tramos, y evaluar resultados de experimentos directamente desde clientes basados en IA como Cursor, Claude Code u OpenAI Codex.

## Configuración {#setup}

Conecte un cliente compatible con MCP al Datadog MCP Server con el conjunto de herramientas `llmobs` habilitado.

<div class="alert alert-info">Para obtener instrucciones de configuración completas, incluida la configuración de la extensión de Cursor y VS Code, consulte <a href="/mcp_server/setup/">Configurar el Datadog MCP Server</a>.</div>

### Requisitos previos {#prerequisites}

- Una cuenta de Datadog con permiso para acceder a los datos de Agent Observability.
- Un cliente compatible con MCP (por ejemplo, Claude Code, Codex CLI, Cursor, Gemini CLI o Kiro CLI).

### Punto de conexión {#endpoint}

El punto de conexión del servidor MCP depende de su [sitio de Datadog][5]. Utilice el selector {{< ui >}}Datadog Site{{< /ui >}} para mostrar el punto de conexión de su sitio. Agregue `?toolsets=llmobs,core` para habilitar Agent Observability y los conjuntos de herramientas principales.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Punto de conexión para el sitio seleccionado ({{< region-param key="dd_site_name" >}}):
<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Este producto no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

### Conectar {#connect}

Elija la autenticación remota cuando sea posible. Utilice la autenticación binaria local si su entorno bloquea el flujo de OAuth remoto.

{{< tabs >}}
{{% tab "Autenticación remota" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
La autenticación remota utiliza el transporte [Streamable HTTP][1] de la especificación MCP.

**Claude Code** (línea de comandos):

<pre><code>claude mcp add --transport http datadog-mcp "{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core"</code></pre>

**Codex CLI** (`~/.codex/config.toml`):

<pre><code>[mcp_servers.datadog]
url = "{{< region-param key="mcp_server_endpoint" >}}"
http_headers = { "X-Datadog-MCP-Toolsets" = "llmobs,core" }
</code></pre>

Después de agregar la configuración, ejecute `codex mcp login datadog` para completar el flujo de OAuth.

**Gemini CLI, Kiro CLI y otros clientes compatibles con MCP**:

<pre><code>{
  "mcpServers": {
    "datadog": {
      "type": "http",
      "url": "{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core"
    }
  }
}
</code></pre>

[1]: https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Este producto no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "Autenticación binaria local" %}}

La autenticación binaria local utiliza el transporte [stdio][2] de la especificación MCP. Utilice este método si la autenticación remota no está disponible.

1. Instale el binario de Datadog MCP Server:

    ```bash
    curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
    ```

    The binary installs to `~/.local/bin/datadog_mcp_cli`.

2. Complete el flujo de inicio de sesión de OAuth:

    ```bash
    datadog_mcp_cli login
    ```

3. Configure su cliente de IA. Para Claude Code, agregue lo siguiente a `~/.claude.json`, reemplazando `<USERNAME>` en la ruta del comando:

    ```json
    {
      "mcpServers": {
        "datadog": {
          "type": "stdio",
          "command": "/Users/<USERNAME>/.local/bin/datadog_mcp_cli",
          "args": [],
          "env": {}
        }
      }
    }
    ```

    Alternatively, add the server with the Claude Code CLI:

    ```bash
    claude mcp add datadog --scope user -- ~/.local/bin/datadog_mcp_cli
    ```

[2]: https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#stdio
{{% /tab %}}
{{< /tabs >}}

### Autentíquese con claves de API {#authenticate-with-api-keys}

El servidor MCP utiliza OAuth 2.0 de forma predeterminada. Si OAuth no está disponible, envíe una [clave de API y clave de aplicación][6] de Datadog como los encabezados HTTP `DD_API_KEY` y `DD_APPLICATION_KEY`:

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<pre><code>{
  "mcpServers": {
    "datadog": {
      "type": "http",
      "url": "{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core",
      "headers": {
          "DD_API_KEY": "&lt;YOUR_API_KEY&gt;",
          "DD_APPLICATION_KEY": "&lt;YOUR_APPLICATION_KEY&gt;"
      }
    }
  }
}
</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Este producto no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Por seguridad, limite la clave de API y la clave de aplicación a una [cuenta de servicio][7] con solo los permisos necesarios.

## Agent skills {#agent-skills}

Agent skills son conjuntos de instrucciones predefinidos para agentes de codificación de IA que automatizan los flujos de trabajo comunes de Agent Observability. El conjunto de habilidades `agent-observability` está disponible en el repositorio [Datadog agent-skills][8]. Proporciona seis habilidades para clasificar sesiones, diagnosticar fallas, analizar experimentos, generar código de experimento con el SDK `ddtrace.llmobs` y arrancar evaluadores con sus datos de producción en vivo.

### Instalar {#install}

Instale las habilidades `agent-observability` con el siguiente comando:

```shell
npx skills add datadog-labs/agent-skills/agent-observability --full-depth -y
```

Las habilidades requieren que el `llmobs` conjunto de herramientas MCP esté conectado. Si aún no lo ha conectado, ejecute:

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<pre><code>claude mcp add --scope user --transport http "datadog-llmo-mcp" \
  '{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core'</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Este producto no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Reinicie Claude Code después de ejecutar ambos comandos para que aparezcan Agent skills.

### Habilidades disponibles {#available-skills}

| Skill | Invoke with | What it does |
|-------|-------------|-------------|
| Clasificación de sesión | `/agent-observability-session-classify` | Clasifica si la intención del usuario fue satisfecha en una sesión, traza o lote |
| RCA de traza | `/agent-observability-trace-rca` | Análisis de causa raíz en trazas de producción fallidas |
| Analizador de experimentos | `/agent-observability-experiment-analyzer` | Analice y compare resultados de experimentos de LLM |
| Generación de código Python para experimentos | `/agent-observability-experiment-py-bootstrap` | Genere código de experimento en Python usando el `ddtrace.llmobs` SDK. Introspecciona su aplicación para conectar un `task_fn` real, autodescubre credenciales `.env` y acepta un `--purpose` de forma libre que dirige la selección del evaluador |
| Bootstrap de evaluación | `/agent-observability-eval-bootstrap` | Genere código de evaluador, publique evaluadores de LLM-judge en línea o muestree trazas en un conjunto de datos para su uso en un experimento |
| Canalización de evaluación | `/agent-observability-eval-pipeline` | Canalización guiada de seis fases desde trazas de producción hasta evaluadores, conjuntos de datos, experimentos y análisis. Detenga antes de tiempo con `--stop-after`, reanude a mitad del flujo con `--start-at` |

#### Clasificación de sesión {#session-classification}

`/agent-observability-session-classify` clasifica si la intención del usuario fue satisfecha en una interacción determinada. Proviene de hasta tres fuentes de señales: rastreos de Agent Observability, datos de comportamiento RUM y eventos de Audit Trail. La habilidad devuelve un veredicto `yes / partial / no` con evidencia de respaldo. La confianza mejora con cada fuente de señal adicional.

```
/agent-observability-session-classify session_id=<SESSION_ID>
/agent-observability-session-classify trace_id=<TRACE_ID>
/agent-observability-session-classify ml_app=my-chatbot --timeframe now-7d
```

#### Análisis de causa raíz de traza{#trace-root-cause-analysis}

`/agent-observability-trace-rca` diagnostica por qué una aplicación de LLM está produciendo resultados deficientes. Selecciona un modo de análisis basado en la señal más fuerte disponible (veredictos de evaluación de LLM-judge, errores de tiempo de ejecución o anomalías estructurales) y compila un informe de RCA estructurado. El informe incluye una taxonomía de fallas y propuestas de solución `BEFORE` / `AFTER` concretas fundamentadas en la evidencia de traza.

Cuando Claude Code tiene acceso a su base de código, la habilidad puede buscar los archivos fuente relevantes y proponer diferencias en línea.

```
/agent-observability-trace-rca ml_app=my-chatbot
/agent-observability-trace-rca ml_app=my-chatbot eval_name=faithfulness --timeframe now-24h
```

#### Bootstrap de evaluador{#evaluator-bootstrap}

`/agent-observability-eval-bootstrap` analiza las trazas de producción y propone un conjunto de evaluadores dirigidos a los modos de falla observados. Genera uno de cuatro artefactos:  clases de Python `BaseEvaluator` / `LLMJudge` para experimentos fuera de línea, una especificación JSON independiente del marco, evaluadores de LLM-judge en línea publicados directamente en Datadog, o — a través de `--emit-dataset <path>` — un `DatasetRecordRaw[]` JSON muestreado de trazas de producción y adaptado para `LLMObs.create_dataset(records=...)`. El modo dataset-emit omite el flujo de trabajo del evaluador por completo; produce un conjunto de datos adecuado para su uso como entrada de un experimento.

```
/agent-observability-eval-bootstrap ml_app=my-chatbot
/agent-observability-eval-bootstrap ml_app=my-chatbot --publish
/agent-observability-eval-bootstrap ml_app=my-chatbot --data-only
/agent-observability-eval-bootstrap ml_app=my-chatbot --emit-dataset ./datasets/my_chatbot_seed.json
```

####  Analizador de experimentos {#experiment-analyzer}

`/agent-observability-experiment-analyzer` recupera los resultados del experimento y muestra qué cambió entre un candidato y una línea base:  qué métricas mejoraron, cuáles retrocedieron y dónde el candidato tuvo un rendimiento inferior.

```
/agent-observability-experiment-analyzer experiment_id=<EXPERIMENT_ID>
/agent-observability-experiment-analyzer experiment_id=<CANDIDATE_ID> baseline_id=<BASELINE_ID>
```

####  Genere código de experimento con el SDK de Python {#generate-experiment-code-with-the-python-sdk}

`/agent-observability-experiment-py-bootstrap` emite un script `.py` autónomo o un cuaderno `.ipynb` de Jupyter que utiliza el `ddtrace.llmobs` SDK y coincide con el estilo del notebook de referencia canónico.

El conjunto de datos puede ser un JSON `DatasetRecordRaw[]` local (integrado en el archivo), un CSV (cargado en tiempo de ejecución a través de `LLMObs.create_dataset_from_csv`), un conjunto de datos de Datadog existente por nombre (`LLMObs.pull_dataset`), o — de forma predeterminada — una pequeña muestra en línea de 3 registros. Cada experimento generado está etiquetado con `generated_by=claude-code` y el `--purpose` resuelto tanto en `config` como en `tags`.

```
/agent-observability-experiment-py-bootstrap --purpose "validate output accuracy"
/agent-observability-experiment-py-bootstrap --purpose "test tool selection" --dataset ./data/qa.json
/agent-observability-experiment-py-bootstrap --dataset-name <DATASET_NAME> --project-name <PROJECT_NAME>
/agent-observability-experiment-py-bootstrap --task-source mymodule.handlers:respond
```

####  Canalización de evaluación de extremo a extremo {#end-to-end-eval-pipeline}

`/agent-observability-eval-pipeline` recorre desde las trazas de producción hasta los evaluadores, conjuntos de datos, experimentos y análisis en seis fases narradas, con un punto de control para el usuario entre cada una:

1. **Clasificar trazas de ml_app** — muestree y clasifique las trazas recientes de su `ml_app`
2. **Análisis de causa raíz** — diagnostique por qué fallan las trazas que presentan errores
3. **Inicializar evaluadores** — proponga un conjunto de evaluadores dirigido a los modos de falla observados
4. **Crear + publicar conjunto de datos** — extraiga pares de entrada / expected_output en un `DatasetRecordRaw[]` JSON y publíquelos en Datadog bajo su proyecto (creado de forma diferida)
5. **Generar + ejecutar experimento** — emita un `.py` o `.ipynb` ejecutable que extraiga el conjunto de datos y conecte la función de tarea de su aplicación, luego ejecútelo de extremo a extremo y capture `experiment.url`. Un punto de revisión en fase (`run` / `edit` / `stop`) se sitúa entre la generación de código y la ejecución para que pueda inspeccionar el archivo generado antes de su ejecución
6. **Analizar experimento** — produzca un informe de análisis con desgloses de métricas y recomendaciones

Cada fase tiene un nombre corto canónico: el mismo valor aceptado por `--start-at` y `--stop-after`. La tabla a continuación enumera, por fase, qué herramientas MCP puede invocar la canalización y una descripción de una línea de la lógica:

| # | Título de la fase | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">Nombre de la etapa </span> | Herramientas MCP llamadas | Resumen |
|---|-------------|----------------------------------------------------------------------------------------|------------------|---------|
| 1 | Clasificar trazas de ml_app | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`classify`</span> | `search_llmobs_spans` | Muestrea tramos raíz recientes para la `ml_app`, clasifica cada uno como éxito / parcial / falla, muestra patrones comunes. |
| 2 | Análisis de causa raíz | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`rca`</span> | `search_llmobs_spans` | Extrae trazas completas para los tramos fallidos de la Fase 1 y recorre el árbol de trazas para atribuir cada falla a un tramo raíz y un modo de falla. |
| 3 | Inicializar evaluadores | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`eval-bootstrap`</span> | Ninguno (razonamiento local sobre el informe de la Fase 2); llamada opcional a la Datadog API para publicar evaluadores de jueces LLM en línea cuando `--publish` está configurado | Emite un conjunto de evaluadores de Python (`sdk_code`), una especificación JSON agnóstica al marco (`data_only`), o publica evaluadores en línea (`publish`). |
| 4 | Crear y publicar conjunto de datos | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`dataset`</span> | `search_llmobs_spans` para muestreo; `LLMObs.create_dataset()` a través del SDK de ddtrace (no MCP) para publicar | Muestrea tramos raíz, extrae pares de entrada / expected_output, limpia PII, escribe un JSON local, luego publica en Datadog. |
| 5 | Generar y ejecutar experimento | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`experiment`</span> | `list_llmobs_evals` (beacon de inicio de un solo intento — conectividad + telemetría); el tiempo de ejecución utiliza el SDK de ddtrace | Introspecciona su aplicación en busca de sitios de llamadas a LLM, emite un `.py` autónomo o `.ipynb` conecta `task_fn` a un punto de entrada real, luego lo ejecuta. |
| 6 | Analizar experimento | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`analyze`</span> | `get_llmobs_experiment_summary`, `get_llmobs_experiment_metric_values`, `list_llmobs_experiment_events`, `get_llmobs_experiment_event`, `get_llmobs_experiment_dimension_values` | Extrae métricas generales, puntuaciones por registro, dimensiones de segmento y eventos de desglose; sintetiza un informe de análisis estructurado. |

Deténgase de forma ordenada `stop` en cualquier punto de control y reanude más tarde con `--start-at <stage-name>` — sin necesidad de volver a ejecutar. Pase `--stop-after eval-bootstrap` para preservar el comportamiento clásico de solo evaluación de tres fases.

```
/agent-observability-eval-pipeline my-chatbot --project-name my-chatbot
/agent-observability-eval-pipeline my-chatbot --stop-after eval-bootstrap          # classic 3-phase
/agent-observability-eval-pipeline my-chatbot --start-at experiment                # resume mid-flow
/agent-observability-eval-pipeline my-chatbot --start-at analyze --experiment-id <UUID>
```

Para obtener una guía completa sobre estas habilidades y un flujo de trabajo de extremo a extremo recomendado, consulte [Analizar LLM Applications with Claude Code Skills][9].

## Casos de uso {#use-cases}

Las herramientas MCP de Agent Observability permiten flujos de trabajo asistidos por IA para:

- **Depuración de la ejecución del agente**: Busque trazas por aplicación de ML, estado de error o etiquetas personalizadas, luego examine las jerarquías y el contenido de los tramos para identificar fallas.
- **Analizando la estructura de trazas**: Visualice el árbol completo de tramos de una traza para comprender cómo interactúan los agentes, LLMs, herramientas y recuperaciones.
- **Investigando bucles de agentes**: Revise el bucle de ejecución paso a paso de un agente para comprender la toma de decisiones y los patrones de invocación de herramientas.
- **Evaluando experimentos**: Obtenga estadísticas resumidas para las métricas de experimentos, compare resultados entre segmentos de dimensiones e inspeccione eventos individuales.
- **Creando experimentos**: Registre un nuevo objeto de experimento con `create_llmobs_experiment` para registrar metadatos del experimento (proyecto, conjunto de datos, descripción, configuración) sin ejecutar la inferencia del modelo. Adjunte métricas de evaluación posteriormente con `submit_llmobs_experiment_events`.
- **Descubriendo patrones de experimentos**: Filtre y ordene eventos de experimentos por rendimiento de métricas para encontrar los casos con mejor y peor rendimiento.
- **Gestionando evaluadores**: Enumere, inspeccione, cree, actualice y elimine configuraciones de evaluadores en una aplicación de ML o en toda la organización.
- **Explorando patrones**: Enumere configuraciones de patrones, verifique el estado de ejecución y explore la jerarquía de temas descubierta para comprender qué están preguntando los usuarios y cómo se distribuye el tráfico.
- **Gestionando conjuntos de datos**: Busque proyectos y conjuntos de datos, explore e inspeccione registros de conjuntos de datos y agregue nuevos registros a un conjunto de datos para su uso en experimentos.

## Herramientas disponibles {#available-tools}

El conjunto de herramientas `llmobs` incluye las siguientes herramientas:

### Herramientas de traza y tramo {#trace-and-span-tools}

`search_llmobs_spans`
: Busque tramos que coincidan con filtros o una consulta sin procesar.

`get_llmobs_trace`
: Obtenga la estructura completa de una traza como un árbol de jerarquía de tramos, incluyendo conteos de tramos por tipo, indicadores de error y duración total.

`get_llmobs_span_details`
: Obtenga metadatos detallados de uno o más tramos, incluyendo tiempos, información de errores, detalles de LLM (modelo, conteo de tokens), métricas y evaluaciones.

`get_llmobs_span_content`
: Recupere el contenido real de un campo de tramo (entrada, salida, mensajes, documentos o metadatos) con extracción JSONPath opcional.

`find_llmobs_error_spans`
: Encuentre todos los tramos de error en una traza con contexto de propagación, agrupados por tipo de tramo con mensajes de error y trazas de pila.

`expand_llmobs_spans`
: Cargue los hijos de tramos específicos para la exploración progresiva del árbol cuando `get_llmobs_trace` devuelva nodos contraídos.

`get_llmobs_agent_loop`
: Obtenga una vista cronológica del bucle de ejecución de un agente, mostrando cada paso (llamadas a LLM, invocaciones de herramientas, decisiones) en orden.

### Herramientas de experimento {#experiment-tools}

`create_llmobs_experiment`
: Cree un nuevo objeto de experimento de Agent Observability en un proyecto. Registra el experimento (para que los eventos y métricas puedan reportarse en relación con él) sin ejecutar ninguna inferencia de modelo. Requiere `project_id` y `experiment_name`. Devuelve el `experiment_id` creado y su nombre resuelto. Use `submit_llmobs_experiment_events` para adjuntar métricas de evaluación, o `update_llmobs_experiment` para cambiar sus propiedades.

`get_llmobs_experiment_summary`
: Obtenga un resumen de experimento de alto nivel con estadísticas precalculadas para todas las métricas de evaluación. Comience aquí antes de usar otras herramientas de experimento.

`list_llmobs_experiment_events`
: Enumere los eventos de experimento con filtrado por dimensión o métrica y ordenamiento por valor de métrica.

`get_llmobs_experiment_event`
: Obtenga detalles completos de un solo evento de experimento, incluyendo entrada, salida, expected_output, todas las métricas y dimensiones.

`get_llmobs_experiment_metric_values`
: Obtenga análisis estadístico para una métrica de evaluación específica, opcionalmente segmentado por una dimensión para comparación.

`get_llmobs_experiment_dimension_values`
: Obtenga valores únicos para una dimensión con conteos, útil para descubrir valores válidos de filtro y segmento.

### Herramientas de evaluación {#evaluator-tools}

`list_llmobs_evals`
: Enumere todos los evaluadores de LLM-judge configurados en todas las aplicaciones de ML. Devuelve el nombre, ml_app y estado habilitado de cada evaluador.

`list_llmobs_evals_by_ml_app`
: Enumere todos los evaluadores de LLM-judge configurados para una aplicación de ML específica.

`get_llmobs_evaluator`
: Recupere una configuración de evaluador de LLM-judge por nombre, incluyendo su objetivo (ml_app, muestreo, filtro), proveedor de LLM y plantilla de prompt del evaluador.

`create_or_update_llmobs_evaluator`
: Cree o actualice una configuración de evaluador de LLM-judge. Dirigido a una aplicación de ML específica y opcionalmente a un filtro o porcentaje de muestreo; el modelo del evaluador y la plantilla de prompt definen cómo califica cada tramo.

`delete_llmobs_evaluator`
: Elimine una configuración de evaluador de LLM-judge por nombre.

### Herramientas de proyecto y conjunto de datos {#project-and-dataset-tools}

`list_llmobs_projects`
: Listar todos los proyectos de experimentos de Agent Observability para la organización, ordenados por fecha de creación (los más recientes primero). Devuelve el `id`, `name` y las marcas de tiempo de cada proyecto, además de los campos de paginación (`next_cursor`, `truncated`). Utilice esto para descubrir nombres e identificadores de proyectos cuando aún no los conozca.

`get_llmobs_project`
: Busque un proyecto de experimentos de Agent Observability por ID o nombre. Use esto para resolver un `project_id` UUID antes de llamar a las herramientas de conjuntos de datos.

`list_llmobs_datasets`
: Listar los conjuntos de datos dentro de un proyecto, con filtro opcional de ID o nombre. Devuelve los metadatos del conjunto de datos y los campos de paginación. Use esto antes de `get_llmobs_dataset_records` o `add_llmobs_dataset_records`; esas herramientas requieren un UUID de conjunto de datos.

`get_llmobs_dataset_records`
: Lea registros de conjuntos de datos con vistas previas estructuradas y un resumen del esquema. Da forma a campos JSON arbitrarios (`input`, `expected_output`, `metadata`) en vistas previas legibles. Use `compute_schema=true` para obtener un esquema de la estructura de registros con reconocimiento de tipos antes de crear nuevos registros.

`get_llmobs_full_dataset_records`
: Obtenga hasta 3 registros específicos con contenido completo y sin recortar. Use esto para inspeccionar registros individuales en detalle después de encontrar los ID de registro con `get_llmobs_dataset_records`.

`add_llmobs_dataset_records`
: Cree registros en un conjunto de datos utilizando un flujo de dos pasos de vista previa y confirmación. Llame con `confirmed=false` para obtener una vista previa de la escritura planificada, luego `confirmed=true` para confirmar después de la aprobación del usuario.

### Herramientas de patrones {#patterns-tools}

`list_llmobs_pattern_configs`
: Listar todas las configuraciones de Patterns para la organización. Devuelve el `id`, `name`, `evp_query`, la configuración de muestreo y las marcas de tiempo de cada configuración. Comience aquí para encontrar un `config_id`.

`get_llmobs_pattern_config`
: Obtenga la configuración de Patterns modificada más recientemente para la organización.

`get_llmobs_pattern_run_status`
: Obtenga el estado y el progreso por actividad de la ejecución de Patterns más reciente para una configuración. Use esto para verificar si el clúster se está ejecutando, se completó o falló antes de leer los temas.

`list_llmobs_pattern_runs`
: Listar todas las ejecuciones de Patterns completadas para una configuración, de la más nueva a la más antigua. Devuelve el `id`, `status`, las marcas de tiempo y el `config_snapshot` utilizado de cada ejecución.

`get_llmobs_patterns`
: Obtenga la jerarquía de temas descubierta por una ejecución de Patterns. Los temas están organizados en niveles, cada uno con un `name`, `description` y `point_count`. Omita `run_id` para leer la ejecución completada más reciente.

`get_llmobs_patterns_with_points`
: Obtenga la jerarquía de temas para una ejecución con IDs de tramo integrados en cada tema hoja. Establezca `include_metrics=true` para incluir también la duración, el costo, el conteo de tokens y las evaluaciones por tramo.

`get_llmobs_pattern_points`
: Obtenga una página paginada por cursor de puntos de clúster (tramos individuales) asignados a un solo tema. Cada punto incluye el `span_id`, `session_id` y una vista previa de la entrada del tramo. Pase `next_page_token` de vuelta como `page_token` para continuar con la paginación.

### Herramientas de cola de anotación {#annotation-queue-tools}

`list_llmobs_annotation_queues`
: Listar todas las [colas de anotación][10] para la organización.

`create_llmobs_annotation_queue`
: Crear una cola de anotación para la revisión humana de trazas, definiendo opcionalmente su esquema de etiquetas en el momento de la creación.

`update_llmobs_annotation_queue`
: Actualizar el nombre, la descripción o el esquema de etiquetas de una cola de anotación.

`delete_llmobs_annotation_queue`
: Eliminar una cola de anotación.

`get_llmobs_annotation_label_schema`
: Obtener el esquema de etiquetas para una cola de anotación, el cual define las etiquetas que los anotadores aplican durante la revisión.

`update_llmobs_annotation_label_schema`
: Cree o reemplace el esquema de etiquetas para una cola de anotación.

`add_llmobs_annotation_queue_interactions`
: Agregue una o más trazas a una cola de anotación para su revisión.

`delete_llmobs_annotation_queue_interactions`
: Elimine trazas de una cola de anotación.

`get_llmobs_annotated_interactions`
: Obtenga las interacciones anotadas en una cola de anotación junto con las etiquetas que los anotadores les aplicaron.

`get_llmobs_annotations_by_content_ids`
: Obtenga las anotaciones aplicadas a trazas o sesiones específicos mediante sus ID de contenido.

`upsert_llmobs_annotations`
: Cree o actualice las anotaciones aplicadas a las interacciones en una cola.

`delete_llmobs_annotations`
: Elimine las anotaciones aplicadas a las interacciones en una cola.

## Flujos de trabajo recomendados {#recommended-workflows}

### Análisis de trazas {#trace-analysis}

1. **Buscar**: Use `search_llmobs_spans` para encontrar trazas por aplicación de ML, estado, tipo de tramo o etiquetas personalizadas.
2. **Visualizar**: Use `get_llmobs_trace` para ver el árbol de jerarquía de tramos completo.
3. **Inspeccionar**: Use `get_llmobs_span_details` para obtener metadatos, tiempos y evaluaciones para tramos específicos.
4. **Leer contenido**: Use `get_llmobs_span_content` para recuperar la E/S, los mensajes o los documentos reales.
5. **Depurar errores**: Use `find_llmobs_error_spans` para localizar todos los errores en una traza con contexto de propagación.
6. **Expandir**: Use `expand_llmobs_spans` para cargar los hijos de los tramos contraídos para una exploración más profunda.
7. **Revisión de Agent**: Use `get_llmobs_agent_loop` para ver el flujo de ejecución paso a paso de un tramo de Agent.

### Análisis de experimentos {#experiment-analysis}

1. **Resumir**: Use `get_llmobs_experiment_summary` para obtener estadísticas generales y descubrir las métricas y dimensiones disponibles.
2. **Explorar eventos**: Use `list_llmobs_experiment_events` para encontrar eventos de interés, filtrando por dimensión u ordenando por métrica.
3. **Inspeccionar eventos**: Use `get_llmobs_experiment_event` para ver los detalles completos de un evento específico.
4. **Analizar métricas**: Use `get_llmobs_experiment_metric_values` para obtener distribuciones de percentiles, tasas de verdadero/falso o comparar entre segmentos de dimensión.
5. **Descubrir dimensiones**: Use `get_llmobs_experiment_dimension_values` para encontrar valores válidos de filtro y segmento.

### Gestión de conjuntos de datos {#dataset-management}

1. **Encuentre su proyecto**: Use `list_llmobs_projects` para explorar proyectos; cada resultado incluye el `id` UUID que necesita para llamadas posteriores. Si ya conoce el nombre del proyecto pero no su UUID, use `get_llmobs_project` para resolverlo directamente.
2. **Encuentre su conjunto de datos**: Use `list_llmobs_datasets` con el `project_id` para listar conjuntos de datos y obtener sus UUIDs.
3. **Entienda los datos**: Use `get_llmobs_dataset_records` con `compute_schema=true` para explorar registros y obtener un esquema de tipos de los campos antes de leer o escribir.
4. **Leer registros específicos**: Use `get_llmobs_full_dataset_records` para recuperar el contenido completo de hasta 3 registros por ID.
5. **Agregar registros**: Use `add_llmobs_dataset_records` con `confirmed=false` para obtener una vista previa de una escritura, luego `confirmed=true` después de la aprobación del usuario.

### Análisis de patrones {#patterns-analysis}

1. **Listar configuraciones**: Use `list_llmobs_pattern_configs` para encontrar las configuraciones de Patrones disponibles y sus valores de `config_id`.
2. **Verificar el estado de ejecución**: Use `get_llmobs_pattern_run_status` para verificar que la ejecución más reciente esté completa.
3. **Leer temas**: Use `get_llmobs_patterns` para obtener la jerarquía completa de temas con nombres, descripciones y puntuaciones de coherencia.
4. **Inspeccionar tramos**: Use `get_llmobs_patterns_with_points` para obtener temas con IDs de tramo integrados, o `get_llmobs_pattern_points` para navegar por los tramos de un tema específico.
5. **Analizar el contenido del tramo**: Use `get_llmobs_span_details` o `get_llmobs_span_content` con los valores de `span_id` del paso anterior para inspeccionar las entradas, salidas y metadatos reales de tramos individuales dentro de un tema.
6. **Explorar ejecuciones pasadas**: Use `list_llmobs_pattern_runs` para ver ejecuciones históricas y pase un `run_id` específico para comparar las distribuciones de temas a lo largo del tiempo.

## Ejemplos de prompts {#example-prompts}

Después de conectarse, pruebe prompts como:

- Revise las trazas de errores de mi aplicación `customer-support-bot` durante la última semana. Resuma los patrones de falla más comunes, con qué frecuencia ocurren y recomiende cuáles corregir primero.
- Encuentre trazas donde las respuestas de mi Agent fueron marcadas por las evaluaciones como de baja calidad. Examine las entradas y salidas, luego sugiera cambios específicos en mi prompt del sistema para mejorar la calidad de la respuesta.
- Examine las trazas recientes del Agent para mi aplicación y encuentre casos donde el Agent entró en bucle más de lo necesario. Analice la toma de decisiones en cada paso y sugiera cómo mejorar las descripciones de mis herramientas para reducir las llamadas innecesarias a herramientas.
- Un usuario informó una mala respuesta. Aquí está el ID de traza: `trace-123`. Explíqueme exactamente qué sucedió: qué preguntó el usuario, qué hizo el Agent en cada paso y dónde salieron mal las cosas. Sugiera una corrección de código.
- Analice el experimento `exp-456` y genere una tabla en formato markdown de las dimensiones con peor rendimiento desglosadas por puntuaciones de evaluación. Incluya cualquier otra columna relevante que me ayude a entender dónde y por qué está disminuyendo el rendimiento.
- Compare el experimento `exp-123` (línea base) con el experimento `exp-456`. Resuma qué mejoró, qué empeoró y en qué medida. Deme una recomendación sobre si vale la pena implementar los cambios.
- Resuma el experimento `exp-456` e identifique los 5 eventos con la puntuación más baja. Para cada uno, muestre la entrada, la salida y qué evaluaciones fallaron.
- Cree un nuevo experimento llamado \"prompt-v2-test\" en mi proyecto `my-chatbot-project` y devuelva su ID de experimento para que pueda adjuntarle métricas de evaluación.
- Listar los conjuntos de datos en mi proyecto `my-project` y muéstreme una muestra de registros del conjunto de datos llamado `qa-golden-set`, incluido su esquema.
- Tengo un archivo CSV con nuevos casos de prueba. Agréguelos al conjunto de datos `qa-golden-set` en `my-project` como una nueva versión. Muéstreme una vista previa primero.

## Combine con otras herramientas de Datadog {#combine-with-other-datadog-tools}

El conjunto de herramientas `core` incluido en la URL de configuración le da a su Agent de IA acceso a herramientas adicionales de Datadog que se combinan naturalmente con el análisis de Agent Observability.

### Exporte el análisis a Datadog Notebooks {#export-analysis-to-datadog-notebooks}

El conjunto de herramientas `core` incluye `create_datadog_notebook` y `edit_datadog_notebook`, que permiten a su Agent de IA crear [Datadog Notebooks][3] directamente a partir de los resultados del análisis. Puede exportar los hallazgos de los chats del Agent a un notebook colaborativo y compartible que reside en Datadog junto con sus trazas y experimentos.

Pruebe con sugerencias como:

- Analice el experimento `exp-456`, identifique las dimensiones con peor rendimiento y exporte un informe resumido a un Datadog Notebook con un desglose por puntuaciones de evaluación.
- Revise las trazas de error de mi `customer-support-bot` durante la última semana y cree un Datadog Notebook con los hallazgos, incluyendo patrones de falla comunes y soluciones recomendadas.

Para visualizaciones personalizadas que van más allá de los widgets estándar de Datadog, como gráficos de comparación o diagramas de cuadrantes, los Notebooks también renderizan [diagramas Mermaid][4] de forma nativa. Pruebe con sugerencias como:

- Analice el experimento `exp-456`, compare las puntuaciones de `accuracy` en cada versión del prompt y exporte los resultados a un Datadog Notebook que incluya un gráfico de barras Mermaid del promedio de puntuación para cada versión.
- Analice el experimento `exp-456` y exporte un Datadog Notebook que grafique cada versión del prompt en un diagrama de cuadrantes Mermaid con `relevance` en un eje y `accuracy` en el otro. Identifique qué versiones tienen un rendimiento inferior en ambas dimensiones.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/mcp_server/setup/
[2]: /es/llm_observability/
[3]: /es/notebooks/
[4]: /es/notebooks/guide/build_diagrams_with_mermaidjs/
[5]: /es/getting_started/site/
[6]: /es/account_management/api-app-keys/
[7]: /es/account_management/org_settings/service_accounts/
[8]: https://github.com/datadog-labs/agent-skills
[9]: /es/llm_observability/build_with_ai/claude_code_skills
[10]: /es/llm_observability/investigate/annotation_queues