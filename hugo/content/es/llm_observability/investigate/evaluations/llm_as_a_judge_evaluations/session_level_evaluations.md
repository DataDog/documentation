---
aliases:
- /es/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/session_level_evaluations/
- /es/llm_observability/configure/evaluations/llm_as_a_judge_evaluations/session_level_evaluations/
description: Ejecute un LLM-as-a-judge personalizado en toda una sesión de usuario,
  con ejemplos de cuándo usar el contexto de sesión en lugar del contexto de traza
  o de tramo.
further_reading:
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations
  tag: Documentación
  text: Evaluaciones personalizadas de LLM-as-a-judge
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/trace_level_evaluations
  tag: Documentación
  text: Evaluaciones a nivel de traza
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/prompt_templating
  tag: Documentación
  text: Creación de plantillas de prompt
- link: /llm_observability/instrument/sdk/#tracking-user-sessions
  tag: Documentación
  text: Seguimiento de sesiones de usuario
title: Evaluaciones a nivel de sesión
---
Una evaluación a nivel de sesión se ejecuta una vez por [sesión de usuario][9], con cada traza (y cada tramo en esas trazas) disponible para el juez LLM en un solo prompt. Las sesiones agrupan interacciones relacionadas bajo un `session_id` compartido (por ejemplo, una conversación de chat) y pueden incluir múltiples trazas durante una interacción extendida.

El contexto de sesión responde preguntas sobre el rendimiento del agente y el comportamiento del usuario a lo largo de toda una interacción; preguntas que los jueces a nivel de traza y a nivel de tramo no pueden responder a partir de una sola solicitud o tramo.

<div class="alert alert-info">Las evaluaciones a nivel de sesión requieren que los tramos estén etiquetados con un <code>session_id</code>. Consulte <a href="/llm_observability/instrument/sdk/#tracking-user-sessions">Seguimiento de sesiones de usuario</a> para instrumentar su aplicación.</div>

## Configure una evaluación a nivel de sesión {#configure-a-session-level-evaluation}

El siguiente tutorial destaca las partes de la configuración que son específicas para el contexto de sesión. El resto de la configuración (cuenta, modelo, tipo de salida, criterios de evaluación) es igual que para las evaluaciones con contexto de tramo o de traza.

1. Navegue a la página de [Evaluaciones][1] de Agent Observability y seleccione {{< ui >}}Create Evaluation{{< /ui >}}, luego en `Evaluate On` seleccione {{< ui >}}Session{{< /ui >}}. (También puede comenzar desde una [evaluación de plantilla][2].)
1. Complete {{< ui >}}evaluation name{{< /ui >}}, {{< ui >}}account{{< /ui >}} y {{< ui >}}model{{< /ui >}} como lo haría para cualquier evaluación de LLM-as-a-judge personalizada.

   {{< img src="llm_observability/evaluations/session_level_evaluation_scope.png" alt="El selector de contexto Evaluate On con Session seleccionado." style="width:100%;" >}}

   <div class="alert alert-info">Una sesión se considera completa después de 30 minutos de inactividad (sin nuevos tramos para esa sesión, medidos desde el tramo más reciente), momento en el cual se ejecuta la evaluación. Los tramos que llegan más de 30 minutos después del tramo anterior no se incluyen en la evaluación.</div>

1. Agregue {{< ui >}}Query{{< /ui >}} y {{< ui >}}Sampling Rate{{< /ui >}} para controlar qué sesiones se evalúan.
1. En el campo {{< ui >}}System Prompt{{< /ui >}}, ingrese las instrucciones estáticas para el juez LLM; por ejemplo, los criterios que el juez debe usar y la salida que debe producir. El System Prompt no resuelve los marcadores de posición `{{ ... }}`.
1. En el mensaje {{< ui >}}User{{< /ui >}}, escriba el prompt que inyecta datos de sesión usando `{{traces...}}` paths. The autocomplete dropdown adapts to session scope and lists fields available on the selected sample session. The `{{tramo_input}}` and `{{span_output}}` aliases are not available in session scope—reference span data through the `trazas` en su lugar. Patrones comunes:

   ```
   {{traces}}                                              # JSON de cada traza en la sesión
   {{traces[0].spans[0].meta.input.value}}                 # Primer tramo de la primera traza
   {{traces[*].spans[*].name}}                             # Todos los nombres de tramo, unidos con saltos de línea
   {{traces[*].spans[meta.span.kind:llm].meta.output.value}}  # Salidas de LLM a través de la sesión
   {{*}}                                                   # Carga útil completa de la sesión como JSON
   ```

   See [Prompt Templating][3] for the full reference.

   {{< img src="llm_observability/evaluations/session_level_prompt_editor.png" alt="El editor de prompts de usuario para una evaluación a nivel de sesión, con el menú desplegable de autocompletado que enumera los campos con el prefijo traza después de escribir dos llaves de apertura." style="width:100%;" >}}

1. Elija una sesión de muestra del panel a la derecha. El panel enumera las trazas en esa sesión, con los campos referenciados por su prompt resaltados.

   {{< img src="llm_observability/evaluations/session_level_sample_session_trace_view.png" alt="La página de configuración en el contexto de sesión, con el panel de sesión de muestra a la derecha que muestra las trazas y los campos de tramo resaltados." style="width:100%;" >}}


1. Haga clic en {{< ui >}}Test Evaluation{{< /ui >}} para ejecutar el prompt contra la sesión seleccionada y obtener una vista previa de la salida del juez LLM antes de guardar.
1. Continúe con el resto de la [configuración de evaluación][5] (tipo de salida, criterios de evaluación) y {{< ui >}}Save and Publish{{< /ui >}} para comenzar a ejecutar la evaluación contra nuevas sesiones.

## Finalización de la sesión {#session-completion}

Una evaluación a nivel de sesión se activa después de que Datadog considera que una sesión está completa. Una sesión se completa después de 30 minutos de inactividad; es decir, han pasado 30 minutos sin que lleguen nuevos tramos para esa sesión (medidos desde el tramo más reciente).

Cuando la sesión se completa, la evaluación se ejecuta una vez con cada traza y cada tramo en esas trazas de esa sesión disponibles en el prompt del juez. Cualquier tramo que llegue más de 30 minutos después del tramo anterior en una sesión no se incluye en la evaluación a nivel de sesión.

## Ver resultados {#view-results}

Después de que una sesión se completa, su resultado de evaluación se adjunta a la sesión y está disponible en Agent Observability casi en tiempo real. Mientras la sesión aún se encuentra dentro de su ventana de inactividad de 30 minutos, el resultado aparece como {{< ui >}}Pending{{< /ui >}} en el panel lateral; después de que la sesión se completa, la fila pendiente se reemplaza por el resultado final.

Despliegue {{< ui >}}Session evaluations{{< /ui >}} en una sesión para ver cada evaluación que se ejecutó para ella, junto con el razonamiento del juez LLM cuando {{< ui >}}Enable Reasoning{{< /ui >}} se activó en el momento de la configuración. El razonamiento explica *por qué* el juez produjo ese valor y hace referencia a campos específicos de traza o tramo en los que se basó; utilícelo para clasificar fallas individuales y decidir si refinar el prompt o aceptar el veredicto.

{{< img src="llm_observability/evaluations/session_level_eval_results.png" alt="Un panel de detalles de sesión con la sección de evaluaciones de sesión expandida. La tabla enumera ocho evaluaciones, incluyendo integridad del objetivo, toxicidad, relevancia del tema, selección de herramientas, sentimiento e inyección de prompt, cada una con un valor de resultado que se muestra como una insignia de color (como True, Not Toxic o On Topic) y una vista previa del razonamiento del juez LLM." style="width:100%;" >}}

## Ejemplos de prompts {#example-prompts}

### Integridad del objetivo de la sesión {#session-goal-completeness}

Califique si el usuario logró lo que vino a hacer durante toda la sesión, incluyendo los turnos de seguimiento en trazas separadas.

**Prompt del sistema**

```
You are evaluating an LLM chatbot session. You will see every trace in the session, including all user messages and assistant responses across turns.

Decide whether the user's goals were fully met by the end of the session. Consider:
- All distinct intents the user expressed during the session
- Whether follow-up questions indicate unresolved needs
- Whether the final state of the conversation leaves the user satisfied

Respond with one of: completed, partially_completed, failed.
```

**Usuario**

```
Session traces:
{{traces}}
```

La evaluación de plantilla administrada [Goal Completeness][11] implementa este patrón.

### Calidad de la conversación de múltiples turnos {#multi-turn-conversation-quality}

Evalúe la coherencia, la retención del contexto y el tono durante toda la sesión en lugar de un solo intercambio.

**Prompt del sistema**

```
You will see a multi-turn chat session between a user and an assistant across multiple traces.

Evaluate the session as a whole on:
- Coherence across turns
- Whether the assistant remembered relevant context from earlier turns
- Whether tone and helpfulness stayed consistent

Output one of: excellent, good, mixed, poor.
```

**Usuario**

```
User and assistant messages across the session:
{{traces[*].spans[meta.span.kind:llm].meta.input.messages[*].content}}
{{traces[*].spans[meta.span.kind:llm].meta.output.messages[*].content}}
```

### Comportamiento del usuario y señales de frustración {#user-behavior-and-frustration-signals}

Detecte patrones de comportamiento que solo surgen al ver la sesión completa.

**Prompt del sistema**

```
Analyze this user session for signs of frustration, confusion, or abandonment.

Look for:
- Repeated or rephrased questions on the same topic
- Explicit expressions of dissatisfaction
- The user stopping after an incomplete or unhelpful answer

Output one of: no_issues, mild_frustration, high_frustration, abandoned.
```

**Usuario**

```
Full session:
{{traces}}
```

### Consistencia del agent durante una sesión {#agent-consistency-across-a-session}

Verifique si el agente mantuvo la calidad y el cumplimiento de las políticas en cada turno de la sesión.

**Prompt del sistema**

```
You will see all traces from one agent session. Assess whether the agent performed consistently:

- Did later turns contradict earlier correct answers?
- Did the agent recover from errors, or repeat the same mistake?
- Were safety and policy guidelines followed on every turn?

Respond with: consistent, mixed, inconsistent.
```

**Usuario**

```
Session traces (chronological):
{{traces}}
```

## Elección del contexto correcto {#choosing-the-right-scope}

| Contexto | Lo que ve el juez | Punto ciego típico |
|---|---|---|
| Tramo | Entrada y salida de un tramo | Sin contexto entre tramos o entre trazas |
| Traza | Todos los tramos en una traza | Sin turnos anteriores o posteriores en la misma sesión de chat |
| Sesión | Todas las trazas (y tramos) en una sesión | — |

Utilice el contexto {{< ui >}}Session{{< /ui >}} cuando la evaluación necesite contexto de más de una traza en la misma sesión de usuario:

- Satisfacción del usuario: si la sesión en su conjunto cumplió con la intención del usuario, no solo la última respuesta.
- Coherencia entre turnos: si el asistente se mantuvo en el tema, mantuvo el tono y trasladó el contexto relevante a través de turnos que residen en diferentes trazas.
- Comportamiento del usuario a lo largo del tiempo: patrones como frustración, confusión, cambio de tema o abandono antes de que el agente terminara de ayudar.
- Desempeño del agente a lo largo de una sesión: consistencia, regresión después de fallas en las herramientas o si el agente se recuperó de errores en un turno posterior.

Utilice el contexto {{< ui >}}Trace{{< /ui >}} cuando la respuesta dependa de pasos dentro de una sola solicitud; por ejemplo, el orden de las llamadas a herramientas, la fidelidad de RAG dentro de una ejecución de flujo de trabajo o la finalización de objetivos para una invocación de agente. Consulte [Evaluaciones a nivel de traza][10].

Utilice el contexto {{< ui >}}Span{{< /ui >}} cuando la evaluación pueda responderse a partir de un solo tramo de forma aislada; por ejemplo, al calificar una única respuesta de LLM, clasificar la intención de un mensaje o validar los argumentos de una herramienta en una llamada.

## Permisos {#permissions}

La configuración de las evaluaciones requiere el `Agent Observability Write` [permission][4].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/evaluations
[2]: /es/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations
[3]: /es/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/prompt_templating
[4]: /es/account_management/rbac/permissions/#llm-observability
[5]: /es/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/#define-the-evaluation-output
[6]: /es/events/explorer/facets/
[7]: /es/monitors/
[8]: /es/llm_observability/investigate/annotation_queues
[9]: /es/llm_observability/instrument/sdk/#tracking-user-sessions
[10]: /es/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/trace_level_evaluations
[11]: /es/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/template_evaluations/#goal-completeness