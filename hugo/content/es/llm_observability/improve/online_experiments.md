---
aliases:
- /es/experiments/guide/run_online_experiment_on_llm_application/
description: Compare variantes de una aplicación de LLM en tráfico real y mida su
  efecto con las evaluaciones de Agent Observability.
further_reading:
- link: /llm_observability/improve/offline_experiments
  tag: Documentación
  text: Agent Observability Offline Experiments
- link: /llm_observability/investigate/evaluations/
  tag: Documentación
  text: Evaluaciones de Agent Observability
- link: /getting_started/feature_flags/
  tag: Documentación
  text: Primeros pasos con Feature Flags
- link: /experiments/reading_results/
  tag: Documentación
  text: Lectura de los resultados del experimento
title: Online Experiments
---
## Descripción general {#overview}

Los Online Experiments comparan varias versiones de una aplicación o agente de LLM en tráfico de producción real. Datadog Feature Flags asigna a cada [sujeto de experimento][2], como un usuario o una ejecución de flujo de trabajo autónomo, a una variante de control o de tratamiento. Una evaluación de Agent Observability mide el resultado para cada sujeto, y [Datadog Experiments][1] determina si la diferencia entre las variantes es estadísticamente significativa.

Utilice Online Experiments para validar un cambio, como un nuevo modelo, prompt o herramienta, frente a usuarios reales después de probarlo sin conexión.

La configuración de un experimento en línea implica los siguientes pasos:

1. Cree un [Feature Flag de Datadog][14].
1. Evalúe el Feature Flag en su aplicación y ejecute la variante asignada.
1. Envíe una evaluación de Agent Observability.
1. Vincule el Feature Flag y la evaluación a un experimento de Datadog.
1. Ejecute el experimento y revise los resultados.

{{< skill-callout
    title="Inicie un experimento en línea con un agente"
    text="Copy this prompt into your AI coding agent to use the `agent-observability-online-experiment` skill for guided setup."
    action_name="copy_agent_observability_online_experiment_prompt"
    lang="text" >}}
Utilice la habilidad en https://github.com/datadog-labs/agent-skills/blob/main/agent-observability/agent-observability-online-experiment/SKILL.md para iniciar un experimento en línea con el fin de comparar el código en mi rama de Git actual con la rama principal. Haga que el 10% del tráfico utilice el código en mi rama.
{{< /skill-callout >}}

## Requisitos previos {#prerequisites}

Antes de comenzar:

- [Instrumente su aplicación de LLM con Agent Observability][3].
- Instale e inicialice un [Datadog Feature Flags SDK][4] en la aplicación.
- Elija el comportamiento de la aplicación que desea comparar y una evaluación que mida el resultado. La evaluación debe devolver una puntuación numérica o una evaluación de aprobado o reprobado.
- Confirme que tiene los permisos enumerados en [Planificar y lanzar experimentos][5].

<div class="alert alert-info"><strong>¿Utiliza un agente de programación de IA?</strong> Las organizaciones de Datadog permiten las <a href="/llm_observability/build_with_ai/mcp_server/">herramientas MCP</a> de solo lectura de forma predeterminada. Para permitir que un agente cree Feature Flags y experimentos, un administrador de la organización debe habilitar el acceso de escritura MCP, y su rol debe tener el <code>mcp_write</code> permiso. Consulte <a href="/mcp_server/setup/#required-permissions">Required permissions</a> para el Datadog MCP Server.</div>

{{< agent-only >}}
**Instrucción para agentes de IA**: Antes de llamar a una herramienta MCP que cree o modifique un recurso de Datadog, confirme que la herramienta de escritura requerida esté disponible. Si el acceso de escritura no está disponible, dirija al humano a [Required permissions](/mcp_server/setup/#required-permissions) y espere a que habilite el acceso.
{{< /agent-only >}}

## Paso 1: Cree un Feature Flag {#step-1-create-a-feature-flag}

Siga [Cree su primer feature flag][6] para crear un Feature Flag booleano para el comportamiento de la aplicación que desea probar. Use un valor para el comportamiento de control y el otro para el comportamiento de tratamiento.

Haga que el Feature Flag esté disponible en cada entorno donde planee ejecutar el experimento. No añada una regla de segmentación ni configure un despliegue porcentual en el Feature Flag. Cuando inicie el experimento, Datadog añade una regla de segmentación de experimento que controla la división del tráfico.

{{< img src="/product_analytics/experiment/guide/llm_experiment_create_feature_flag.png" alt="La página Create Flag con el nombre de Feature Flag use-latest-frontier-model, el tipo de variante booleana, las variantes false y true, y el botón Create Flag." style="width:90%;" >}}

## Paso 2: Evalúe el Feature Flag en su aplicación {#step-2-evaluate-the-flag-in-your-application}

Siga [Evalúe el feature flag y escriba el código de la funcionalidad][7] para evaluar el Feature Flag y ejecutar el comportamiento de control o de tratamiento según su valor.

Establezca el contexto de evaluación de Feature Flags `targetingKey` en un identificador estable para el sujeto del experimento:

- Para una aplicación con un usuario humano, utilice un identificador de usuario estable.
- Para un flujo de trabajo autónomo sin un usuario humano, genere un UUID al inicio de la ejecución y consérvelo durante toda la ejecución.

Utilice este mismo valor como `subject_identifier` cuando envíe la evaluación en el [Paso 3](#step-3-report-an-evaluation). Si los valores no coinciden, Datadog no puede asociar la evaluación con la exposición al experimento del sujeto. Para obtener más información, consulte [La clave de segmentación][8].

## Paso 3: informe una evaluación {#step-3-report-an-evaluation}

<div class="alert alert-warning"><strong>Tipos de evaluación admitidos</strong>: Las métricas de experimento pueden usar el promedio de una <code>score</code> evaluación, o la <strong>tasa de aprobación</strong> de cualquier evaluación que devuelva una valoración de aprobado o reprobado. La tasa de aprobación cuenta <code>pass</code> como 1 y <code>fail</code> como 0, y excluye las evaluaciones sin valoración. Los valores booleanos y categóricos sin procesar no se pueden usar directamente como métricas de experimento.</div>

Elija uno de los siguientes métodos.

### Envíe una evaluación externa {#submit-an-external-evaluation}

Siga [Evaluaciones externas][9] para enviar una evaluación desde el código de su aplicación. Agregue una etiqueta `subject_identifier` cuyo valor coincida exactamente con la `targetingKey` utilizada para evaluar el Feature Flag:

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

score = 0.42
subject_key = "82a4e675-9cb4-4da6-a91a-819574152a63"
span_context = LLMObs.export_span(span=None)

LLMObs.submit_evaluation(
    span=span_context,
    ml_app="<ML_APP>",
    label="<EVALUATION_NAME>",
    metric_type="score",
    value=score,
    tags={
        "subject_identifier": subject_key,
    },
    assessment="pass" if score > 0.5 else "fail",
)
{{< /code-block >}}

### Utilice una evaluación administrada {#use-a-managed-evaluation}

Siga [Evaluaciones administradas][10] para crear y publicar una evaluación. En el span evaluado por la evaluación administrada, agregue una etiqueta `subject_identifier` cuyo valor coincida exactamente con la `targetingKey` utilizada para evaluar el Feature Flag:

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

subject_key = "82a4e675-9cb4-4da6-a91a-819574152a63"

with LLMObs.workflow(name="my_workflow") as span:
    LLMObs.annotate(
        span=span,
        tags={"subject_identifier": subject_key},
    )
    # Run the rest of the instrumented workflow.
{{< /code-block >}}

Para evaluaciones a nivel de traza, agregue la etiqueta al tramo raíz de la traza. Las evaluaciones a nivel de sesión no admiten métricas de experimento.

## Paso 4: Cree y lance el experimento {#step-4-create-and-launch-the-experiment}

Siga [Planificar y lanzar experimentos][5] para crear e iniciar el experimento:

1. Seleccione una métrica basada en la evaluación de Agent Observability del [Paso 3](#step-3-report-an-evaluation) como métrica principal. Si no ha creado la métrica del experimento, siga [Crear una métrica a partir de datos de Agent Observability][13].
1. Agregue el Feature Flag del [Paso 1](#step-1-create-a-feature-flag).
1. Configure cómo se divide el tráfico entre las variantes de control y de tratamiento.
1. Inicie el experimento.

{{< agent-only >}}
**Instrucción para agentes de IA**: Después de crear el borrador del experimento, incluya la URL completa del experimento devuelta por Datadog en su respuesta final. El humano que ejecuta el agente necesita este enlace para abrir el experimento, revisar su configuración y configurar la división de tráfico en la interfaz de usuario de Datadog.
{{< /agent-only >}}

Iniciar el experimento agrega la regla de segmentación del experimento al Feature Flag seleccionado y comienza a registrar las exposiciones. Para obtener detalles sobre cómo las asignaciones de Feature Flags se convierten en exposiciones de experimentos, consulte [Feature Flags and Experiments][11].

{{< img src="/product_analytics/experiment/guide/llm_experiment_create_experiment.png" alt="El cuadro de diálogo Crear nuevo borrador de experimento con el nombre latest-frontier-model-experiment, el protocolo Empezar desde cero y el botón Crear borrador de experimento." style="width:90%;" >}}

## Paso 5: Ejecute el experimento y revise los resultados {#step-5-run-the-experiment-and-review-results}

Envíe tráfico a través de la aplicación. Para cada sujeto, la aplicación debe evaluar el Feature Flag y enviar una evaluación con el mismo identificador de sujeto.

A medida que llegan las exposiciones y las evaluaciones, Datadog completa los resultados del experimento. Siga [Lectura de resultados de experimentos][12] para interpretar el cuadro de mando de métricas y comparar las variantes.

{{< img src="/product_analytics/experiment/guide/llm_experiment_results.png" alt="Un experimento de aplicación de LLM completado que muestra la decisión de despliegue y el aumento relativo para las métricas de calidad, uso de tokens y costo estimado en las variantes de control y tratamiento." style="width:90%;" >}}

## Solución de problemas {#troubleshooting}

Si el experimento informa que faltan datos de métricas, confirme que:

- La aplicación evaluó el Feature Flag del experimento para el sujeto.
- La evaluación tiene un valor numérico `score` o una valoración `pass` o `fail`.
- El `subject_identifier` de la evaluación coincide exactamente con el `targetingKey` de la evaluación del Feature Flag.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/experiments/
[2]: /es/experiments/concepts/subject_types/
[3]: /es/llm_observability/instrument/
[4]: /es/getting_started/feature_flags/#feature-flags-sdks
[5]: /es/experiments/plan_and_launch_experiments/
[6]: /es/getting_started/feature_flags/#step-2-create-a-feature-flag
[7]: /es/getting_started/feature_flags/#step-3-evaluate-the-flag-and-write-feature-code
[8]: /es/feature_flags/concepts/evaluation_context/#the-targeting-key
[9]: /es/llm_observability/investigate/evaluations/external_evaluations/
[10]: /es/llm_observability/investigate/evaluations/managed_evaluations/
[11]: /es/feature_flags/concepts/experiments/
[12]: /es/experiments/reading_results/
[13]: /es/experiments/defining_metrics/?tab=agentobservability#create-a-metric-from-agent-observability-data
[14]: /es/feature_flags/