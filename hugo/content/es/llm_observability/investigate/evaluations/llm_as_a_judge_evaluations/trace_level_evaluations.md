---
aliases:
- /es/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/trace_level_evaluations/
- /es/llm_observability/configure/evaluations/llm_as_a_judge_evaluations/trace_level_evaluations/
description: Ejecute un evaluador LLM-as-a-judge personalizado en toda una traza,
  con ejemplos de cuándo utilizar el contexto de traza en lugar del contexto de tramo.
further_reading:
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations
  tag: Documentación
  text: Evaluadores personalizados de LLM-as-a-Judge
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations/prompt_templating
  tag: Documentación
  text: Creación de plantillas de prompt
- link: /llm_observability/quickstart/terms/
  tag: Documentación
  text: Términos y conceptos de Agent Observability
title: Evaluadores a nivel de traza
---
Un evaluador a nivel de traza se ejecuta una vez por traza, con cada tramo de la traza disponible para el juez LLM en un solo prompt. Esta es la opción correcta cuando la respuesta a una pregunta depende de la interacción entre tramos —por ejemplo, si un agente alcanzó su objetivo, si las herramientas se llamaron en el orden correcto o si una conversación de varios turnos se mantuvo en el tema.

Los evaluadores a nivel de tramo, por el contrario, se ejecutan una vez por cada tramo coincidente y solo ven la entrada y salida de ese tramo.

## Cuándo usar el contexto de traza en lugar del contexto de tramo {#when-to-use-trace-scope-over-span-scope}

Utilice el contexto {{< ui >}}Trace{{< /ui >}} cuando la evaluación necesite contexto de más de un tramo:

- La respuesta depende de una secuencia de pasos (una llamada a herramienta seguida de una respuesta del LLM que utiliza el resultado de la herramienta).
- El juez debe observar una respuesta final en el contexto del razonamiento intermedio.
- Un "aprobado" depende de algo que ocurrió anteriormente en la traza (una recuperación, una barrera de seguridad, una negativa).

Utilice el contexto {{< ui >}}Span{{< /ui >}} cuando la evaluación pueda responderse a partir de un solo tramo de forma aislada; por ejemplo, calificar la calidad de una respuesta del LLM, clasificar la intención del usuario en el tramo raíz o verificar que una herramienta recibió argumentos bien formados.

## Casos de uso y ejemplos {#use-cases-and-examples}

### 1. Finalización de objetivos para un agente de varios pasos {#1-goal-completion-for-a-multi-step-agent}

Califique si un agente terminó lo que el usuario solicitó, dada la secuencia completa de llamadas a herramientas y pasos de razonamiento.

**Prompt del sistema**

```
You are evaluating an AI agent that helps users complete tasks. You will see the full trace of an agent run, including every LLM call, tool invocation, and intermediate response.

Your job is to decide whether the agent achieved the user's goal. Consider:
- Did the agent understand the user's request?
- Did the tool calls and reasoning steps actually progress toward the goal?
- Is the final response a complete answer, or does it leave the request unfinished?

Respond with one of: completed, partially_completed, failed.
```

**Usuario**

```
// {{spans[0].meta.input.value}} → input of the trace's first span (the user goal).
User goal: {{spans[0].meta.input.value}}

// {{spans}} → JSON of every span in the trace, in order.
Agent steps:
{{spans}}
```

### 2. Corrección del uso de herramientas {#2-tool-use-correctness}

Verifique si un agente llamó a la herramienta correcta con los argumentos correctos para la pregunta del usuario.

**Prompt del sistema**

```
You will see a trace where an LLM agent decides which tool to call and with what arguments. Decide whether the chosen tool and its arguments were appropriate for the user's request.

Score from 1 (clearly wrong tool or arguments) to 5 (perfect tool choice and arguments).
```

**Usuario**

```
// First span's input—the user's original question.
User question: {{spans[0].meta.input.value}}

// `[meta.span.kind:tool]` filter → keeps only spans whose kind is "tool".
// `.meta.input.parameters` → the arguments passed to each matching tool call.
Tool calls made during this trace:
{{spans[meta.span.kind:tool].meta.input.parameters}}

// `[*]` wildcard → fan out across every span; outputs are joined with newlines.
Final response:
{{spans[*].meta.output.value}}
```

### 3. Fidelidad en un flujo de trabajo RAG {#3-faithfulness-in-a-rag-workflow}

Verifique si la respuesta final se basa en los documentos que se recuperaron anteriormente en la traza.

**Prompt del sistema**

```
You will see a trace from a retrieval-augmented generation pipeline. The retrieval step provides context documents, and a downstream LLM step produces an answer.

Decide whether the final answer is supported by the retrieved documents. Mark `true` only if every factual claim in the answer can be traced back to one of the documents.
```

**Usuario**

```
// `[meta.span.kind:retrieval]` filter → only retrieval spans (the documents fetched).
// `.meta.output.documents[*].text` → the text of every document the retrieval returned,
//                                     joined with newlines.
Retrieved context:
{{spans[meta.span.kind:retrieval].meta.output.documents[*].text}}

// `[meta.span.kind:llm]` filter → outputs of the LLM call(s) that produced the answer.
Final answer:
{{spans[meta.span.kind:llm].meta.output.value}}
```

### 4. Calidad de la conversación entre turnos {#4-conversation-quality-across-turns}

Califique la calidad general de una conversación de varios turnos, teniendo en cuenta la coherencia entre turnos en lugar de la calidad de una sola respuesta.

**Prompt del sistema**

```
You will see a multi-turn conversation between a user and an assistant. Evaluate the conversation as a whole on:
- Coherence across turns
- Whether the assistant remembered relevant context from earlier turns
- Whether the assistant's tone stayed consistent

Output one of: excellent, good, mixed, poor.
```

**Usuario**

```
// `meta.input.messages[*].content` → fans out over each LLM span's input messages
//                                     and joins their content with newlines.
Conversation:
{{spans[meta.span.kind:llm].meta.input.messages[*].content}}

// Same pattern, but on the LLM output messages—the assistant's replies.
Assistant responses:
{{spans[meta.span.kind:llm].meta.output.messages[*].content}}
```

## Cómo funciona la finalización de una traza {#how-trace-completion-works}

Una evaluación a nivel de traza se activa después de que Datadog considera que una traza está completa. Una traza está **completa** después de **3 minutos** de inactividad; es decir, han pasado tres minutos sin que lleguen nuevos tramos para esa traza.

Cualquier tramo que llegue más de 3 minutos después del tramo anterior en una traza no se incluye en la evaluación a nivel de traza. Si su aplicación emite agentes de larga duración cuyos pasos están separados por más de 3 minutos, planifique que esos tramos tardíos sean excluidos.

## Configure un evaluador a nivel de traza {#configure-a-trace-level-evaluator}

El siguiente tutorial destaca las partes de la configuración que son específicas para el contexto de traza. El resto de la configuración (cuenta, modelo, tipo de salida, criterios de evaluación) es igual que para los evaluadores con contexto de tramo.

1. Navegue a la página de [Evaluadores][1] de Agent Observability y seleccione {{< ui >}}Create Evaluator{{< /ui >}}, luego en `Evaluate On` seleccione {{< ui >}}Trace{{< /ui >}}. (También puede comenzar desde una [plantilla de evaluador][2].)
1. Complete {{< ui >}}evaluator name{{< /ui >}}, {{< ui >}}account{{< /ui >}} y {{< ui >}}model{{< /ui >}} como lo haría para cualquier evaluador de LLM-as-a-judge personalizado.
1. En {{< ui >}}Evaluation Type{{< /ui >}} >, seleccione {{< ui >}}Trace{{< /ui >}}.

   {{< img src="llm_observability/evaluations/trace_level_evaluation_scope.png" alt="El selector de ámbito Evaluate On con traza seleccionado y tramo como alternativa." style="width:100%;" >}}

   <div class="alert alert-info">Una traza se considera completa después de <strong>3 minutos</strong> de inactividad (sin nuevos tramos para esa traza), momento en el cual se ejecuta la evaluación. Los tramos que llegan más de 3 minutos después del tramo anterior no se incluyen en la evaluación.</div>

1. Agregue {{< ui >}}Query{{< /ui >}} y {{< ui >}}Sampling Rate{{< /ui >}} para controlar qué trazas se evalúan. La consulta se compara con el tramo raíz de la traza; por ejemplo, `@name:agent.workflow` evalúa solo las trazas cuyo tramo raíz se llama `agent.workflow`.
1. En el campo {{< ui >}}System Prompt{{< /ui >}}, ingrese las instrucciones estáticas para el juez LLM; por ejemplo, los criterios que el juez debe usar y la salida que debe producir. El System Prompt no resuelve los marcadores de posición `{{ ... }}`.
1. En el mensaje {{< ui >}}User{{< /ui >}}, escriba el prompt que inyecta datos de traza usando `{{tramos...}}` paths. The autocomplete dropdown adapts to trace scope and lists every field available on the selected sample trace. The `{{tramo_input}}` and `{{span_output}}` aliases are not available in trace scope—reference span data through the `matriz de tramos` en su lugar. Patrones comunes:

   ```
   {{tramos}}                                         # JSON de cada tramo en la traza
   {{tramos[0].meta.input.value}}                     # Solo el primer tramo
   {{tramos[*].name}}                                 # Todos los nombres de tramo, unidos con saltos de línea
   {{tramos[name:my-span].meta.input.value}}          # Filtrar tramos por atributo
   {{tramos[meta.span.kind:llm].meta.output.value}}   # Salidas de todos los tramos de tipo LLM
   {{*}}                                             # Carga útil completa de la traza como JSON
   ```

   See [Prompt Templating][3] for the full reference.

   {{< img src="llm_observability/evaluations/trace_level_prompt_editor.png" alt="El editor de prompts de usuario para un evaluador a nivel de traza, con el menú desplegable de autocompletado que enumera los campos con el prefijo tramo después de escribir dos llaves de apertura." style="width:100%;" >}}

1. Elija una traza de muestra del panel a la derecha. El título del panel se convierte en {{< ui >}}Spans in Selected Trace{{< /ui >}} y renderiza los tramos de esa traza, con los campos referenciados por su prompt resaltados.

   {{< img src="llm_observability/evaluations/trace_level_filtered_traces.png" alt="La página de configuración en el ámbito de traza, con el panel Tramos en la traza seleccionada a la derecha mostrando los valores de entrada y salida de un tramo resaltados." style="width:100%;" >}}

1. Haga clic en {{< ui >}}Test Evaluator{{< /ui >}} para ejecutar el prompt contra la traza seleccionada y obtener una vista previa de la salida del juez LLM antes de guardar.
1. Continúe con el resto de la [configuración del evaluador][5] (tipo de salida, criterios de evaluación) y {{< ui >}}Save and Publish{{< /ui >}} para comenzar a ejecutar el evaluador contra nuevas trazas.

## Visualizando resultados {#viewing-results}

Después de que una traza se completa, su resultado de evaluación se adjunta a la propia traza y está disponible en Agent Observability casi en tiempo real. Mientras la traza aún se encuentra dentro de su ventana de inactividad de 3 minutos, el resultado aparece como {{< ui >}}Pending{{< /ui >}} en el panel lateral; después de que la traza se completa, la fila pendiente se reemplaza por el resultado final.

### Resultados de la consulta {#query-results}

Los resultados de la evaluación a nivel de traza utilizan la misma sintaxis de consulta que las evaluaciones a nivel de tramo. Utilice estos patrones en el explorador de Trazas de Agent Observability, en paneles y en consultas de seguimiento:

| Consulta | Propósito |
|---|---|
| `@evaluation.<evaluation_name>.value:complete` | Filtrar por trazas con un valor de evaluación específico |
| `@evaluation.<evaluation_name>.assessment:fail` | Filtrar por trazas que no cumplieron con los criterios de aprobación de su evaluador |
| `@evaluation.<evaluation_name>.value:*` | Todas las trazas que tienen un resultado para este evaluador (excluye las pendientes) |

Sustituya `<evaluation_name>` con el nombre que estableció al crear el evaluador. Los valores de evaluación también se pueden utilizar como [facets][6] para agrupar en tableros y seguimientos.

### Resultados de depuración {#debug-results}

Abra la pestaña {{< ui >}}Evaluations{{< /ui >}} en una traza para ver cada evaluación que se ejecutó para ella, junto con el razonamiento del juez LLM cuando {{< ui >}}Enable Reasoning{{< /ui >}} se activó en el momento de la configuración. El razonamiento explica *por qué* el juez produjo ese valor y hace referencia a campos específicos de tramo en los que se basó; utilícelo para clasificar fallas individuales y decidir si refinar el prompt o aceptar el veredicto.

{{< img src="llm_observability/evaluations/trace_level_results_sidepanel.png" alt="La pestaña Evaluaciones de una traza completada, que muestra el resultado de la evaluación a nivel de traza con el razonamiento del juez LLM expandido." style="width:100%;" >}}

### Resultados del seguimiento {#monitor-results}

Integre los resultados de la evaluación a nivel de traza en seguimientos [7] y [annotation queues][8] para alertar sobre regresiones y dirigir las fallas para su revisión humana:

- **Hacer un seguimiento de la caída en la tasa de aprobación.** Cree un seguimiento con una consulta como la siguiente para alertar cuando la tasa de aprobación móvil disminuya:

  ```
  formula(100 * a / b) < 80
    where a = count(@evaluation.<evaluation_name>.assessment:pass) by {ml_app}
          b = count(@evaluation.<evaluation_name>.value:*) by {ml_app}
  over last_15m
  ```

- **Dirigir fallas a una cola de anotación.** Configure una [Automation Rule][8] que coincida con `@evaluation.<evaluation_name>.assessment:fail` y agregue la traza a una cola de anotación para un revisor humano. Esto cierra el ciclo sobre los errores del juez: las trazas fallidas se revisan, las etiquetas incorrectas se corrigen y las correcciones se convierten en el conjunto de datos que utiliza para refinar el prompt del evaluador.

## Permisos {#permissions}

La configuración de evaluadores requiere el `Agent Observability Write` [permission][4].

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