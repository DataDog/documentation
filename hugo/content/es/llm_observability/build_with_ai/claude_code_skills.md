---
aliases:
- /es/llm_observability/guide/claude_code_skills/
description: Utilice las habilidades de Claude Code de Datadog para clasificar sesiones,
  diagnosticar fallas, comparar experimentos, generar código de experimento en Python
  y realizar el bootstrap de evaluadores con sus datos de producción en vivo.
further_reading:
- link: /llm_observability/investigate/evaluations/
  tag: Documentación
  text: Evaluaciones de Agent Observability
- link: /llm_observability/improve/experiments/
  tag: Documentación
  text: Experimentos de LLM
- link: /llm_observability/investigate/evaluations/evaluation_developer_guide
  tag: Guía
  text: 'Guía para desarrolladores de evaluación: cree evaluadores personalizados'
- link: https://www.datadoghq.com/blog/bits-evals/
  tag: blog
  text: Mejore la calidad de los agentes de IA con Bits Evals
- link: https://github.com/datadog-labs/agent-skills
  tag: GitHub
  text: datadog-labs/agent-skills
title: Analizar aplicaciones de LLM con habilidades de Claude Code
---
## Descripción general {#overview}

Datadog proporciona un conjunto de habilidades de [Claude Code][1] que llevan el análisis de Agent Observability directamente a su flujo de trabajo de desarrollo. En lugar de navegar por los dashboards manualmente, puede invocar estas habilidades desde una sesión de Claude Code para clasificar sesiones, diagnosticar fallas, comparar experimentos, generar código de experimento en Python y realizar el bootstrap de evaluadores, todo contra sus datos de producción en vivo.

| Habilidad | Qué hace |
|-------|-------------|
| `/agent-observability-session-classify` | Clasifique si la intención del usuario fue satisfecha en una sesión, traza o lote de sesiones de una ml_app |
| `/agent-observability-trace-rca` | Análisis de causa raíz en trazas de LLM de producción fallidas |
| `/agent-observability-experiment-analyzer` | Analice y compare resultados de experimentos de LLM |
| `/agent-observability-experiment-py-bootstrap` | Genere código de experimento en Python utilizando el SDK `ddtrace.llmobs`. Introspecciona su aplicación para conectar un `task_fn` real (sin marcador de posición), autodescubre credenciales desde `.env` y acepta un `--purpose` de forma libre que dirige la selección del evaluador |
| `/agent-observability-eval-bootstrap` | Genere código de evaluador a partir de trazas, publique evaluadores de LLM-judge en línea o muestree trazas en un conjunto de datos para su uso en un experimento |
| `/agent-observability-eval-pipeline` | Pipeline guiado de seis fases desde trazas de producción hasta evaluadores, conjuntos de datos, experimentos y análisis. Detenga antes de tiempo con `--stop-after`, vuelva a ingresar a mitad del flujo con `--start-at`. |

Las habilidades producen resultados estructurados y accionables (informes de RCA con propuestas de corrección antes/después, código de evaluador generado, comparaciones de experimentos) que puede pasar directamente a un agente de codificación para aplicar correcciones a su aplicación. Cuando Claude Code tiene acceso a su base de código, puede buscar el prompt del sistema, las definiciones de herramientas o la lógica de enrutamiento relevantes y proponer diffs específicos sin abandonar la sesión.

## Configuración {#setup}

### Requisitos previos {#prerequisites}

- [Claude Code][1] instalado y autenticado
- Al menos una aplicación LLM [instrumentada con Agent Observability][2] y que produzca trazas
- Un data backend: ya sea el Datadog MCP server **o** la `pup` CLI

### Instale las habilidades {#install-the-skills}

Las habilidades están publicadas en el repositorio [agent-skills][6]. Instálelas con el siguiente comando:

```shell
npx skills add datadog-labs/agent-skills/agent-observability --full-depth -y
```

Las habilidades están disponibles en cualquier sesión de Claude Code después de instalarlas.

### Datadog MCP server {#datadog-mcp-server}

Para utilizar la opción del Datadog MCP server, conecte el Agent Observability MCP server a su sesión de Claude Code:

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<pre><code>claude mcp add --scope user --transport http datadog-llmo-mcp \
  '{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core'</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Este producto no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Todas las habilidades detectan el MCP server automáticamente al iniciarse y lo utilizan en todo momento.

### Opción B: pup CLI {#option-b-pup-cli}

Si prefiere no utilizar el servidor MCP, las habilidades también se ejecutan a través de [`pup`][5], la CLI interna de Datadog. Instale `pup` y autentíquese:

```shell
pup auth login
```

Cada habilidad detecta al iniciarse si el MCP server está disponible; si no, busca `pup` y cambia al modo pup automáticamente. También puede forzar el modo pup explícitamente pasando `--backend pup` a cualquier invocación de habilidad.

En el modo pup, todas las llamadas a la Datadog API se realizan a través de subcomandos de `pup llm-obs` en lugar de herramientas MCP. La salida y el flujo de trabajo son idénticos.

## Habilidades {#skills}

### Clasificar sesiones y trazas {#classify-sessions-and-traces}

`/agent-observability-session-classify` evalúa si la intención del usuario fue satisfecha en una interacción determinada. Funciona en tres modos dependiendo de lo que usted proporcione:

| Modo | Invocar con | Usar cuando |
|------|-------------|----------|
| Sesión | `session_id` | Evaluación de una sesión específica |
| Traza | `trace_id` | Evaluación de una sola traza de Agent Observability |
| Aplicación | `ml_app` | Muestreo y clasificación de un lote de sesiones o trazas recientes |

La habilidad extrae de hasta tres fuentes de señales, y la precisión mejora cuanto más datos tenga a su disposición:

- **Trazas de Agent Observability** — el árbol de tramos completo, el contenido de la conversación, los resultados de llamadas a herramientas y los veredictos de jueces de evaluación. Siempre disponible.
- **Señales de comportamiento de RUM** — vistas de página, acciones personalizadas, tiempo de permanencia y eventos de retroalimentación explícita que confirman o contradicen lo que muestra la traza. Disponible cuando RUM está instrumentado para su aplicación.
- **Audit Trail** — eventos de escritura confirmados por el servidor (paneles creados, monitores modificados, cuadernos eliminados) que prueban si las acciones del asistente realmente se llevaron a cabo. La señal más autorizada cuando la sesión involucró la creación o edición de activos.

La habilidad devuelve un `yes / partial / no` veredicto compacto con una razón de una oración de forma predeterminada. Agregue `verbose: true` para un informe completo en formato markdown.

**Ejemplos:**

```
/agent-observability-session-classify session_id=abc-123
/agent-observability-session-classify trace_id=def-456
/agent-observability-session-classify ml_app=my-chatbot --timeframe now-7d
```

### Diagnostique fallas con análisis de causa raíz {#diagnose-failures-with-root-cause-analysis}

`/agent-observability-trace-rca` recorre el árbol de tramos de trazas fallidas para identificar por qué su aplicación LLM está produciendo resultados deficientes. Selecciona el mejor modo de análisis según las señales disponibles: veredictos de evaluación de juez LLM (la señal más fuerte), errores de tiempo de ejecución o anomalías estructurales como valores atípicos de latencia y decisiones de bucle de agente.

La habilidad muestrea los tramos fallidos, los agrupa en una taxonomía de fallas y compila un informe de RCA estructurado con categorías de causa raíz, evidencia de respaldo y propuestas de solución concretas. Cada corrección incluye el texto o código real de la traza — extractos del prompt del sistema, formas de argumentos de herramientas, lógica de enrutamiento — con un `BEFORE` / `AFTER` que muestra exactamente qué cambiar.

Cuando Claude Code tiene acceso a su base de código, la habilidad busca los archivos fuente relevantes y propone diferencias que puede aplicar de inmediato. Para deficiencias en el prompt del sistema, uso indebido de herramientas o errores de enrutamiento, esto significa pasar del diagnóstico a una solicitud de extracción (pull request) sin abandonar la sesión.

**Ejemplos:**

```
/agent-observability-trace-rca ml_app=my-chatbot
/agent-observability-trace-rca ml_app=my-chatbot eval_name=faithfulness --timeframe now-24h
```

### Analice y compare experimentos {#analyze-and-compare-experiments}

`/agent-observability-experiment-analyzer` recupera los resultados del experimento y muestra qué cambió entre un candidato y un baseline. Funciona para un solo experimento (análisis exploratorio) o un par (análisis comparativo).

La habilidad resalta qué métricas mejoraron o empeoraron, qué categorías de eventos cambiaron y dónde el candidato tuvo un rendimiento inferior, para que pueda tomar una decisión de promoción con confianza.

**Ejemplos**

```
/agent-observability-experiment-analyzer experiment_id=exp-123
/agent-observability-experiment-analyzer experiment_id=exp-456 baseline_id=exp-123
```

###  Genere código de experimento con el SDK de Python {#generate-experiment-code-with-the-python-sdk}

`/agent-observability-experiment-py-bootstrap` emite un script `.py` autónomo o un notebook de Jupyter `.ipynb` que utiliza el `ddtrace.llmobs` SDK y coincide con los [reference notebooks][7] canónicos.

El conjunto de datos puede ser un JSON `DatasetRecordRaw[]` local (integrado en el archivo), un CSV (cargado en tiempo de ejecución a través de `LLMObs.create_dataset_from_csv`), un conjunto de datos de Datadog existente por nombre (`LLMObs.pull_dataset`), o — de forma predeterminada — una pequeña muestra en línea de 3 registros.

**Todas las flags a continuación son opcionales.** Invoque `/agent-observability-experiment-py-bootstrap` sin argumentos y la habilidad solicitará lo que necesita y emitirá un archivo ejecutable con la muestra predeterminada de 3 registros.

| Opción | Requerido | Predeterminado | Descripción |
|--------|----------|---------|-------------|
| <span class="text-nowrap">`--purpose`</span> | No | se solicita si no se establece o no se puede inferir | Cadena de forma libre que describe lo que valida el experimento. Sesga la clasificación de introspección, la forma de retorno del wrapper y la semántica del evaluador |
| <span class="text-nowrap">`--format`</span> | No | `py` | `py` o `ipynb` |
| <span class="text-nowrap">`--dataset`</span> | No |  inline 3-record sample | Local `DatasetRecordRaw[]` JSON o CSV. Mutuamente excluyente con `--dataset-name` |
| <span class="text-nowrap">`--dataset-name`</span> | No | none | Existing Datadog dataset to fetch at runtime via `LLMObs.pull_dataset`. Mutuamente excluyente con `--dataset` |
| <span class="text-nowrap">`--dataset-version`</span> | No | latest | Fijar una versión específica al usar `--dataset-name` |
| <span class="text-nowrap">`--project-name`</span> | No | `experiment-<service-name>` inferred from codebase | Datadog project name shown in the Experiments UI |
| <span class="text-nowrap">`--evaluator-style`</span> | No | `function` | `function` / `class` / `remote`. Elige la superficie; `--purpose` elige la semántica |
| <span class="text-nowrap">`--task-source`</span> | No | auto de inspección | Explícito `<module.path>:<function>` envolver como `task_fn` |
| <span class="text-nowrap">`--placeholder-task`</span> | No | desactivado | Omitir la introspección y emitir un marcador de posición `# TODO(user)` genérico |
| <span class="text-nowrap">`--app-root`</span> | No | inferido | Restringe el escaneo de introspección a este directorio |
| <span class="text-nowrap">`--env-file`</span> | No | ninguno | Ruta `.env` explícita. Integrado en el archivo generado como `ENV_FILE_OVERRIDE` |
| <span class="text-nowrap">`--jobs`</span> | No | `10` | Concurrencia pasada a `experiment.run(jobs=N)` |
| <span class="text-nowrap">`--output`</span> | No | `./experiments/experiment.<ext>` | Ruta del archivo de salida |

**Ejemplos**

```
/agent-observability-experiment-py-bootstrap --purpose "validate output accuracy"
/agent-observability-experiment-py-bootstrap --purpose "test tool selection on ambiguous queries" --dataset ./data/qa.json
/agent-observability-experiment-py-bootstrap --dataset-name qa_v3 --project-name customer-qa
/agent-observability-experiment-py-bootstrap --task-source mymodule.handlers:respond --evaluator-style remote
/agent-observability-experiment-py-bootstrap --placeholder-task --format ipynb
```

### Inicializa evaluadores a partir de datos de traza {#bootstrap-evaluators-from-trace-data}

`/agent-observability-eval-bootstrap` analiza trazas de producción de una ml_app (o un informe de RCA ya en contexto) y propone un conjunto de evaluadores que detectarían los modos de falla observados. Genera uno de cuatro artefactos:

| Mode | Flag | Output |
|------|------|--------|
| Código SDK (predeterminado) | — | Clases de `BaseEvaluator`Python `LLMJudge` listas para incluir en un [Experimento de LLM][3] |
| Especificación JSON | `--data-only` | Especificación de evaluador independiente del marco, adecuada para revisión o implementación manual |
| Jueces en línea | `--publish` | Evaluadores LLM-judge publicados directamente en Datadog y habilitados en su ml_app |
| Emisión de conjunto de datos | `--emit-dataset <path>` | Un `DatasetRecordRaw[]` archivo JSON muestreado a partir de trazas de producción, con formato para `LLMObs.create_dataset(records=...)`. Omite el flujo de trabajo del evaluador por completo; este modo produce un conjunto de datos, no evaluadores |

Los primeros tres modos comparten el mismo flujo de trabajo de evaluador-propuesta y difieren solo en cómo se materializa la suite. El cuarto modo (`--emit-dataset`) es independiente: muestrea tramos raíz para el `ml_app` (filtrado a `@status:ok`), extrae `input_data` y `expected_output` por registro, ejecuta una limpieza de PII en los valores de cadena y escribe un archivo JSON que puede publicar en Datadog como un conjunto de datos y luego ejecutar un experimento contra él. Los `tags` por registro se normalizan automáticamente (cadenas simples envueltas como `tag:<value>`) para que `Dataset.append()` no rechace el registro. El campo `expected_output` está documentado como la **línea base de comportamiento de producción**, no como la verdad fundamental; es útil para experimentos de tipo regresión (¿mi refactorización cambia los resultados observados?) antes de ser promovido a un conjunto de oro etiquetado.

**Ejemplos**

```
/agent-observability-eval-bootstrap ml_app=my-chatbot
/agent-observability-eval-bootstrap ml_app=my-chatbot --publish
/agent-observability-eval-bootstrap ml_app=my-chatbot --data-only
/agent-observability-eval-bootstrap ml_app=my-chatbot --emit-dataset ./datasets/my_chatbot_seed.json --trace-limit 25
```

### Ejecute el pipeline de extremo a extremo {#run-the-end-to-end-pipeline}

`/agent-observability-eval-pipeline` encadena las subhabilidades de observabilidad de agentes en un flujo de trabajo supervisado y narrado único que recorre desde las trazas de producción hasta los evaluadores, conjuntos de datos, experimentos y análisis. Cada fase tiene el mismo formato: un banner que nombra la entidad que se está produciendo, un bloque pedagógico que explica su propósito, la acción (una llamada a una subhabilidad o un pequeño paso ejecutable) y un punto de control que espera su confirmación. Es el punto de partida recomendado cuando no tiene evaluadores o experimentos existentes y desea un recorrido determinista.

```
Phase 1: Classify ml_app traces      → agent-observability-session-classify (ml_app mode)
Phase 2: Root cause analysis         → agent-observability-trace-rca
Phase 3: Bootstrap evaluators        → agent-observability-eval-bootstrap
Phase 4: Create + publish dataset    → agent-observability-eval-bootstrap --emit-dataset + LLMObs.create_dataset(records=...)
Phase 5: Generate + run experiment   → agent-observability-experiment-py-bootstrap + python <generated_file>
                                       (with an in-phase review beat between codegen and run)
Phase 6: Analyze experiment          → agent-observability-experiment-analyzer
```

Cada fase tiene un nombre corto canónico: el mismo valor aceptado por `--start-at` y `--stop-after`. Utilice estos nombres siempre que necesite referirse a una sola fase sin ambigüedades (por ejemplo, en scripts, en chats con compañeros de equipo o en tickets de soporte):

| # | Título de la fase | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">Nombre de la etapa</span> | Subhabilidad invocada | Resumen | Artefacto de salida |
|---|-------------|----------------------------------------------------------------------------------------|-------------------|---------|-----------------|
| 1 | Clasificar trazas de ml_app | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`classify`</span> | `/agent-observability-session-classify` (modo ml_app) | MCP `search_llmobs_spans` muestrea los tramos raíz recientes para el `ml_app`. Cada tramo se clasifica como éxito / parcial / falla y se agrupa en patrones comunes. | Resumen de clasificación + bloques por unidad |
| 2 | Análisis de causa raíz | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`rca`</span> | `/agent-observability-trace-rca` | MCP `search_llmobs_spans` extrae trazas completas para los tramos fallidos identificados en la Fase 1. Se recorre el árbol de traza para atribuir cada falla a un tramo raíz y un modo de falla. | Informe de RCA con taxonomía de modos de falla y causas raíz |
| 3 | Inicialice evaluadores | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`eval-bootstrap`</span> | `/agent-observability-eval-bootstrap` | Razonamiento local sobre la RCA de la Fase 2: sin llamadas MCP. Emite código de evaluador de Python (`sdk_code`), una especificación JSON agnóstica al marco (`data_only`), o publica evaluadores LLM-judge en línea directamente en Datadog a través de la API pública (`publish`). | Suite de evaluadores (`sdk_code` / `data_only` / `publish` modo) |
| 4 | Crear y publicar conjunto de datos | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`dataset`</span> | `/agent-observability-eval-bootstrap --emit-dataset` + `LLMObs.create_dataset(records=...)` | MCP `search_llmobs_spans` muestrea tramos raíz, extrae `(input_data, expected_output)` pares, limpia PII y escribe un archivo JSON local. El subpaso de publicación luego llama a `LLMObs.create_dataset()` a través del SDK de ddtrace (no MCP) para enviar el conjunto de datos a Datadog. | Local `DatasetRecordRaw[]` JSON + conjunto de datos de Datadog publicado (nombre, versión, URL) |
| 5 | Generar y ejecutar experimento | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`experiment`</span> | `/agent-observability-experiment-py-bootstrap` + `python <generated_file>` (con un `run` / `edit` / `stop` ritmo de revisión entre la generación de código y la ejecución) | Principalmente local: la habilidad introspecciona su aplicación en busca de sitios de llamadas a LLM (decoradores de OpenAI / Anthropic / LangChain / LiteLLM / LlamaIndex / Bedrock / Gemini) y emite un archivo de Python autónomo que conecta `task_fn` a un punto de entrada real. Una llamada MCP `list_llmobs_evals` se dispara al inicio como una baliza de conectividad + telemetría. El archivo generado utiliza el SDK de ddtrace en tiempo de ejecución; no hay llamadas MCP durante la ejecución en sí. | Generado `.py` o `.ipynb` + ejecución de experimento con `experiment.url` |
| 6 | Analizar experimento | <span style="display:inline-block; min-width:11ch; white-space:nowrap !important; word-break:keep-all !important; overflow-wrap:normal !important">`analyze`</span> | `/agent-observability-experiment-analyzer` | Usuario intensivo de MCP: `get_llmobs_experiment_summary` para métricas generales, `get_llmobs_experiment_metric_values` para puntuaciones por registro, `list_llmobs_experiment_events` + `get_llmobs_experiment_event` para profundizar en filas individuales, y `get_llmobs_experiment_dimension_values` para desgloses de segmentos. Sintetiza los hallazgos en un informe estructurado. | Informe de análisis con desgloses de métricas, rendimiento de segmentos y próximos experimentos recomendados |

Las fases 4 y 5 son las únicas dos que ejecutan código en su máquina; el resto son de solo lectura o escriben archivos generados en `--output-dir`. El comportamiento clásico del pipeline de evaluación de tres fases (clasificar → RCA → solo evaluadores bootstrap) se conserva pasando `--stop-after eval-bootstrap`. La fase 5 se pausa entre la generación de código y la ejecución para que pueda revisar el archivo de experimento generado antes de que se consuman tokens del proveedor: escriba `run` para ejecutar, `edit` para pausar y ajustar, o `stop` para salir de forma limpia.

**Entre y salga en cualquier fase.** El pipeline persiste la salida principal de cada fase (resumen de clasificación, informe de RCA, suite de evaluadores, conjunto de datos, nombre del conjunto de datos publicado, archivo de experimento, ejecución de experimento, informe del analizador) en `<output-dir>/state/0N-<name>.{md, json}` antes de que se muestre cada punto de control. Esto significa:

- **`stop`** en cualquier punto de control (o `--stop-after <phase>` desde la parte superior) finaliza la ejecución de forma limpia, dejando un artefacto reingresable en el disco.
- **`--start-at <phase>`** carga el archivo de estado de cada fase anterior (o acepta un override flag si proporcionó uno) y salta directamente a la fase nombrada. Puede reanudar horas o días después, o saltar directamente a "solo volver a analizar este experimento" sin volver a ejecutar nada anterior.

Vocabulario de puntos de control en cada fase: `continue` avanza, `stop` sale limpiamente, `redo` vuelve a ejecutar la fase actual (con notas de ajuste opcionales adjuntas), `back` retrocede una fase. Cualquier otra entrada se trata como ajuste.

**Solo se requiere `<ml_app>`.** Cada flag a continuación es opcional: la habilidad elige valores predeterminados sensatos para cada una. La invocación mínima es `/agent-observability-eval-pipeline <ml_app>`; el resto de la tabla es para cuando desea anular un valor predeterminado, reanudar a mitad del flujo o fijar una ubicación de salida específica.

| Opción | Requerido | Predeterminado | Descripción |
|--------|----------|---------|-------------|
| `<ml_app>` | **Sí** | — (requerido) | La aplicación LLM instrumentada para incorporar / evaluar contra |
| `--project-name` | No | derivado de `pyproject.toml` / `setup.cfg` / `setup.py` / `package.json` / cwd | El proyecto de Datadog en el que el pipeline escribe conjuntos de datos y experimentos. Mostrado en la verificación previa y creado de forma diferida por `LLMObs.enable(project_name=...)` en la Fase 4 |
| `--timeframe` | No | `now-7d` | Ventana de retrospectiva para la clasificación de la Fase 1 y el muestreo de conjuntos de datos de la Fase 4 |
| `--trace-limit` | No | `20` | Límite de muestreo para la Fase 4. La Fase 1 utiliza internamente `min(20, --trace-limit)` para la muestra de clasificación |
| `--format` | No | `py` | Pasado a `agent-observability-experiment-py-bootstrap` en la Fase 5: `py` (script) o `ipynb` (notebook) |
| `--evaluator-style` | No | `function` | Pasado a la Fase 3 y la Fase 5: `function`, `class` o `remote` |
| `--data-only` | No | desactivado | Paso a través de la Fase 3: emitir una especificación de evaluador JSON independiente del marco en lugar de código del SDK de Python |
| `--publish` | No | desactivado | Paso a través de la Fase 3: publicar evaluadores de jueces LLM en línea en Datadog |
| `--stop-after` | No | `analyze` (ejecutar todo) | Detener después de que se complete la fase nombrada. Acepta: `classify`, `rca`, `eval-bootstrap` *(coincide con el comportamiento clásico de 3 fases)*, `dataset`, `experiment`, `analyze` |
| `--start-at` | No | `classify` (comenzar desde el principio) | Omitir fases anteriores y comenzar en la fase nombrada. Mismo vocabulario que `--stop-after`. Carga automáticamente artefactos de fases anteriores desde `<output-dir>/state/` |
| `--classification-summary` | No | carga automática desde `state/01-classification.md` | Anular la salida de la Fase 1 que consume la Fase 2 (usado con `--start-at rca` o posterior) |
| `--rca-report` | No | carga automática desde `state/02-rca-report.md` | Anular la salida de la Fase 2 que consume la Fase 3 |
| `--dataset-file` | No | carga automática desde `state/04-published-dataset.json` el campo `dataset_file` | El JSON `DatasetRecordRaw[]` local. Utilizado por el paso de publicación de la Fase 4 al volver a publicar sin volver a muestrear |
| `--dataset-name` | No | carga automática desde `state/04-published-dataset.json` | Nombre del conjunto de datos de Datadog publicado al que la Fase 5 conecta el experimento |
| `--experiment-file` | No | carga automática desde `state/05-experiment-run.json` | El archivo de experimento generado. Cuando está presente, la Fase 5 omite la generación de código y va directamente al paso de revisión → ejecutar |
| `--experiment-id` / `--experiment-url` | No | carga automática desde `state/05-experiment-run.json` | El experimento de Datadog que la Fase 6 analiza (mutuamente excluyentes) |
| `--app-root` | No | resuelto desde cwd / `pyproject.toml` etc. | Restringe la introspección de la función de tarea de la Fase 5 a este árbol de directorios |
| `--env-file` | No | ninguno (el descubrimiento automático recorre las ubicaciones estándar) | Ruta `.env` explícita para la carga de credenciales; mostrada en la verificación previa |
| `--output-dir` | No | `./experiments` | Donde se escriben el JSON del conjunto de datos, el script de publicación, el archivo de experimento generado y el directorio `state/` |

**Ejemplos**

```
# Full six-phase walkthrough for a brand new ml_app
/agent-observability-eval-pipeline my-chatbot --project-name my-chatbot

# Organize the dataset and experiment under a specific Datadog project
# (the project is created lazily — no need to pre-create it in the UI)
/agent-observability-eval-pipeline my-chatbot --project-name customer-qa-eval

# Classic three-phase eval-pipeline behavior — preserves backward compatibility
/agent-observability-eval-pipeline my-chatbot --stop-after eval-bootstrap

# Resume from where a previous run stopped
/agent-observability-eval-pipeline my-chatbot --start-at experiment

# Re-analyze a previous experiment run without re-running it
/agent-observability-eval-pipeline my-chatbot --start-at analyze --experiment-id <UUID>

# Run a single phase in isolation
/agent-observability-eval-pipeline my-chatbot --start-at dataset --stop-after dataset
```

> **Nombre del proyecto** — si se omite `--project-name`, la habilidad lo deriva automáticamente de su base de código (en orden: `pyproject.toml` → `setup.cfg` → `setup.py` → `package.json` → nombre base de cwd), recurriendo a `experiment-sdk-default`. El nombre resuelto se muestra en la salida de la verificación previa antes de que se ejecute cualquier fase, por lo que puede confirmarlo o anularlo sin volver a invocar. El proyecto de Datadog en sí es creado de forma diferida por `LLMObs.enable(project_name=...)` cuando la Fase 4 publica el conjunto de datos; nunca necesita crearlo previamente en la interfaz de usuario.

## Flujo de trabajo típico {#typical-workflow}

Si es nuevo en la evaluación de una aplicación LLM, el flujo recomendado es:

1. **Ejecute la pipeline** para recorrer desde las trazas de producción hasta los evaluadores, un conjunto de datos semilla, un experimento y el análisis:
   ```
   /agent-observability-eval-pipeline <ml_app> --project-name <project>
   ```
   Para detenerse en la salida clásica solo de evaluador (sin conjunto de datos ni experimento), pase `--stop-after eval-bootstrap`. Para reanudar una ejecución anterior, pase `--start-at <phase>`: la canalización recarga el estado anterior desde `<output-dir>/state/` y continúa desde allí.

2. **Aplique correcciones.** El informe de RCA producido en la Fase 2 incluye propuestas de corrección específicas de antes/después basadas en evidencia de trazas. Pase el informe a un agente de codificación (o actúe directamente sobre él) para corregir los prompts del sistema, las definiciones de herramientas o la lógica de enrutamiento en su base de código.

3. **Ejecute un experimento sin conexión** utilizando los evaluadores generados frente a un conjunto de datos etiquetado para validar su calidad antes de habilitarlos en producción. Consulte la [Guía para desarrolladores de evaluación][4].

4. **Publique evaluadores en línea** una vez que los evaluadores estén validados. Ejecutar `/agent-observability-eval-bootstrap` con `--publish` crea evaluadores de juez LLM en línea en Datadog que se ejecutan automáticamente en sus trazas de producción en tiempo real — no se requieren cambios de código:
   ```
   /agent-observability-eval-bootstrap <ml_app> --publish
   ```

5. **Haga un seguimiento e itere.** A medida que su aplicación evolucione, vuelva a ejecutar `/agent-observability-trace-rca` y `/agent-observability-eval-bootstrap` para detectar nuevos modos de falla y mantener actualizado su conjunto de evaluadores.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://claude.ai/code
[2]: /es/llm_observability/setup/
[3]: /es/llm_observability/improve/experiments/
[4]: /es/llm_observability/investigate/evaluations/evaluation_developer_guide
[5]: https://datadoghq.atlassian.net/wiki/spaces/BITSAI/pages/5226692942/pup+CLI
[6]: https://github.com/datadog-labs/agent-skills
[7]: https://github.com/DataDog/llm-observability/tree/main/experiments/notebooks