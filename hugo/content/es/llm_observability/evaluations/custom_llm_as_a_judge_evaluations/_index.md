---
description: Cómo crear evaluaciones personalizadas de LLM-as-a-judge y cómo utilizar
  estos resultados de evaluación en Agent Observability.
further_reading:
- link: https://www.datadoghq.com/blog/manage-ai-cost-and-performance-with-datadog/
  tag: Blog
  text: 'Impulsar el ROI de la IA: cómo Datadog conecta el costo, el rendimiento y
    la infraestructura para que usted pueda escalar de manera responsable'
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: Blog
  text: Obtenga visibilidad de los flujos de trabajo de los agentes de Strands con
    Datadog LLM Observability
- link: https://www.datadoghq.com/blog/llm-evaluation-framework-best-practices/
  tag: Blog
  text: 'Creación de un marco de evaluación de LLM: mejores prácticas'
- link: /llm_observability/terms/
  tag: Documentación
  text: Conozca los términos y conceptos de Agent Observability
- link: /llm_observability/setup
  tag: Documentación
  text: Aprenda a configurar Agent Observability
- link: /llm_observability/evaluations/managed_evaluations
  tag: Documentación
  text: Conozca las evaluaciones gestionadas
- link: https://huggingface.co/learn/cookbook/llm_judge
  tag: Hugging Face
  text: Uso de LLM-as-a-judge para una evaluación automatizada y versátil
title: Evaluaciones personalizadas de LLM-as-a-judge
---
Las evaluaciones personalizadas de LLM-as-a-judge utilizan un LLM para evaluar el rendimiento de otro LLM. Defina la lógica de evaluación con prompts en lenguaje natural, capture criterios subjetivos u objetivos (como el tono, la utilidad o la veracidad) y ejecute las evaluaciones a escala en:

- **Contexto de tramo**—califique la entrada y la salida de una llamada a un LLM, un paso de agente o una invocación de herramienta de forma aislada.
- **Contexto de traza**—envíe cada tramo de una traza al LLM juez en un solo prompt, para que la evaluación pueda razonar a través de los pasos. Consulte [Evaluaciones a nivel de traza][16] para ver el tutorial completo, los casos de uso y ejemplos de prompts.
- **Contexto de sesión**—envíe cada traza en una sesión de usuario (y cada tramo en esas trazas) al LLM juez en un solo prompt, para que la evaluación pueda razonar a través de toda una interacción de varios turnos. Consulte [Evaluaciones a nivel de sesión][17] para ver el tutorial completo, los casos de uso y ejemplos de prompts.

## Crear una evaluación personalizada de LLM-as-a-judge {#create-a-custom-llm-as-a-judge-evaluation}

Puede crear y gestionar evaluaciones personalizadas desde la [página de Evaluaciones][1] en Agent Observability. Puede proporcionar una descripción de evaluación para generar una evaluación, utilizar y desarrollar [plantillas de evaluaciones de LLM-as-a-judge][7] que proporcionamos, o comenzar desde cero. Puede habilitar el rastreo para ver las trazas de sus evaluaciones.

<div class="alert alert-info">Si ya tiene un <code>LLMJudge</code> definido en el SDK, puede publicarlo directamente en Datadog sin tener que reconstruir la configuración en la interfaz de usuario. Consulte <a href="/llm_observability/guide/evaluation_developer_guide/#publishing-an-llmjudge-as-a-datadog-managed-evaluation">Publicar un LLMJudge como una evaluación gestionada por Datadog</a>.</div>

Obtenga más información sobre los [requisitos de compatibilidad][6].

### Configure el prompt {#configure-the-prompt}

1. En Datadog, navegue a la página de [Evaluaciones][1] de Agent Observability. Seleccione {{< ui >}}Create Evaluation{{< /ui >}}, luego seleccione {{< ui >}}Create your own{{< /ui >}}.
   {{< img src="llm_observability/evaluations/EvalConfig_LLMO_1.png" alt="La página de Evaluaciones de Agent Observability después de seleccionar Crear evaluación." style="width:100%;" >}}
1. Para habilitar el rastreo para las evaluaciones, haga clic en el botón {{< ui >}}Tracing Disabled{{< /ui >}}, luego seleccione el interruptor {{< ui >}}Trace Evaluations{{< /ui >}} para habilitar el rastreo. Cuando se ejecuta esta evaluación, sus trazas aparecen bajo `datadog-evaluations`, lo que le brinda una mayor visibilidad de sus evaluaciones. **Nota**: Habilitar el rastreo aumenta la cantidad de tramos facturados enviados a Datadog.
    {{< img src="llm_observability/evaluations/evaluation_tracing_enabled.png" alt="Evaluaciones de traza habilitadas después de haber seleccionado el interruptor para habilitar el rastreo de evaluaciones." >}}
1. Proporcione un {{< ui >}}evaluation name{{< /ui >}} claro y descriptivo (por ejemplo, `factuality-check` o `tone-eval`). Puede usar este nombre al consultar los resultados de la evaluación. El nombre debe ser único dentro de su aplicación.
1. Configure el modelo:
    1. Seleccione el menú desplegable {{< ui >}}Account{{< /ui >}} para elegir el proveedor de LLM y la cuenta correspondiente que usará para su LLM juez. Para conectar una cuenta nueva, consulte [conectar un proveedor de LLM][2].
        - Si selecciona una cuenta {{< ui >}}Amazon Bedrock{{< /ui >}}, elija una región para la cual esté configurada la cuenta. Luego puede seleccionar un nombre de modelo o proporcionar el ARN del perfil de inferencia.
        - Si selecciona una cuenta {{< ui >}}Vertex{{< /ui >}}, elija un proyecto y una ubicación. El menú desplegable {{< ui >}}Location{{< /ui >}} incluye opciones de región única, multirregión y globales. Para obtener detalles sobre cada opción, consulte la [documentación de ubicaciones de Vertex AI de Google][18].
    1. Utilice el menú desplegable {{< ui >}}Model{{< /ui >}} para seleccionar un modelo.
1. En {{< ui >}}Runs On{{< /ui >}}, seleccione la aplicación que desea evaluar, qué desea evaluar (tramo, traza o sesión) y la tasa de muestreo. Puede agregar más criterios de filtrado seleccionando el botón a la derecha de la tasa de muestreo.
1. En la sección {{< ui >}}Template{{< /ui >}}, utilice el menú desplegable:
   - {{< ui >}}Create from scratch{{< /ui >}}: Utilice su propio prompt personalizado (definido en el siguiente paso).
   - {{< ui >}}Failure to Answer{{< /ui >}}, {{< ui >}}Prompt Injection{{< /ui >}}, {{< ui >}}Sentiment{{< /ui >}}, etc.: Complete una plantilla de prompt preexistente. Puede usar estas plantillas tal cual o modificarlas para que coincidan con su lógica de evaluación específica.
1. En el campo {{< ui >}}System Prompt{{< /ui >}}, ingrese su prompt personalizado o modifique una plantilla de prompt.
   Para prompts personalizados, proporcione instrucciones claras que describan lo que el evaluador debe valorar.
   - Concéntrese en un único objetivo de evaluación
   - Incluya 2-3 ejemplos de few-shot que muestren pares de entrada/salida, resultados esperados y razonamiento.

{{% collapse-content title="Ejemplo de prompt personalizado" level="h4" expanded=false id="custom-prompt-example" %}}
**Prompt del sistema**

```
You will be looking at interactions between a user and a budgeting AI agent. Your job is to classify the user's intent when it comes to using the budgeting AI agent.

You will be given a Span Input, which represents the user's message to the agent, which you will then classify. Here are some examples.

Span Input: What are the core things I should know about budgeting?
Classification: general_financial_advice

Span Input: Did I go over budget with my grocery bills last month?
Classification: budgeting_question

Span Input: What is the category for which I have the highest budget?
Classification: budgeting_question

Span Input: Based on my past months, what is my ideal budget for subscriptions?
Classification: budgeting_advice

Span Input: Raise my restaurant budget by $50
Classification: budgeting_request

Span Input: Help me plan a trip to the Maldives
Classification: unrelated
```

**Usuario**

```
Span Input: {{span_input}}
```
{{% /collapse-content %}}

8. En el campo {{< ui >}}User Prompt{{< /ui >}}, especifique qué partes del tramo, traza o sesión evaluar agregando variables. Puede agregar cualquier atributo de tramo, como Tramo Input (`"{{tramo_input}}`), Output (`{{tramo_output}}`), or any other span field. For trace-scoped evaluations, use `{{tramos...}}` paths to read across spans; for session-scoped evaluations, use `{{trazas...}}` rutas para leer a través de las trazas. Consulte [Plantillas de prompts][15] para obtener la referencia completa. Para editar el prompt del usuario directamente, selecciónelo y edite el texto.

   También puede usar el panel de la derecha ({{< ui >}}Filtered Spans{{< /ui >}} en el ámbito del tramo, {{< ui >}}Filtered Traces{{< /ui >}} en el ámbito de la traza, {{< ui >}}Filtered Sessions{{< /ui >}} en el contexto de la sesión) para agregar datos de tramo como una variable:
   1. Elija una cuenta y una aplicación para que los tramos, trazas o sesiones aparezcan a la derecha.
   2. Seleccione uno de los tramos a la derecha para ver su JSON.
   3. Seleccione {{< ui >}}+{{< /ui >}} para agregar el JSON a su prompt de usuario.

{{< img src="llm_observability/evaluations/custom_llm_judge_2-5.png" alt="El contenido del menú de la visualización JSON en el panel derecho de configuración de evaluación personalizada, que muestra la opción para Agregar variable al mensaje." style="width:40%;" >}}

### Defina la salida de evaluación {#define-the-evaluation-output}

Para modelos de OpenAI, Azure OpenAI, Vertex AI, Anthropic o Amazon Bedrock, configure [Salida estructurada](#structured-output).

Para modelos de Anthropic o Amazon Bedrock, también puede configurar [Búsqueda por palabras clave](#keyword-search-output).

Para AI Gateway, se admiten tanto [Salida estructurada](#structured-output) como [Búsqueda por palabras clave](#keyword-search-output). Datadog recomienda usar Salida estructurada cuando su modelo la admita y, de lo contrario, recurrir a Búsqueda por palabras clave.

{{% collapse-content title="Salida estructurada (OpenAI, Azure OpenAI, Anthropic, Amazon Bedrock, AI Gateway, Vertex AI)" level="h4" expanded="true" id="structured-output" %}}
1. Seleccione un tipo de salida de evaluación:

   - {{< ui >}}Boolean{{< /ui >}}: Resultados verdadero/falso (por ejemplo, "¿El modelo siguió las instrucciones?")
   - {{< ui >}}Score{{< /ui >}}: Calificaciones numéricas (por ejemplo, una escala del 1 al 5 para la utilidad)
   - {{< ui >}}Categorical{{< /ui >}}: Etiquetas discretas (por ejemplo, "Bueno", "Malo", "Neutral")
   - {{< ui >}}JSON{{< /ui >}}: JSON permite esquemas de formato libre

2. Opcionalmente, seleccione {{< ui >}}Enable Reasoning{{< /ui >}}. Esto configura al juez LLM para que proporcione una breve justificación de su decisión (por ejemplo, por qué se otorgó un puntaje de 8). El razonamiento le ayuda a comprender cómo y por qué se realizan las evaluaciones, y es particularmente útil para auditar métricas subjetivas como el tono, la empatía o la utilidad. Agregar razonamiento también puede [hacer que el juez LLM sea más preciso](https://arxiv.org/abs/2504.00050).

3. Edite un esquema JSON que defina el tipo de salida de sus evaluaciones:

{{< tabs >}}
{{% tab "Booleano" %}}
Para el tipo de salida **Booleano**, edite el campo `description` para explicar mejor qué significan verdadero y falso en su caso de uso.
{{% /tab %}}

{{% tab "Puntaje" %}}
Para el tipo de salida **Puntaje**:
- Establezca un puntaje `min` y `max` para su evaluación.
- Edite el campo `description` para explicar mejor la escala de su evaluación.
{{% /tab %}}
{{% tab "Categórico" %}}
Para el tipo de salida **Categórico**:
- Agregue o elimine categorías editando el esquema JSON.
- Edite los nombres de las categorías.
- Edite el campo `description` de las categorías para explicar mejor qué significan en el contexto de su evaluación.


Un ejemplo de esquema para una evaluación categórica:

```
{
    "name": "categorical_eval",
    "schema": {
        "type": "object",
        "required": [
            "categorical_eval",
            "reasoning"
        ],
        "properties": {
            "categorical_eval": {
                "type": "string",
                "anyOf": [
                    {
                        "const": "budgeting_question",
                        "description": "The user is asking a question about their budget. The answer can be directly determined by looking at their budget and spending."
                    },
                    {
                        "const": "budgeting_request",
                        "description": "The user is asking to change something about their budget. This should involve an action that changes their budget."
                    },
                    {
                        "const": "budgeting_advice",
                        "description": "The user is asking for advice on their budget. This should not require a change to their budget, but it should require an analysis of their budget and spending."
                    },
                    {
                        "const": "general_financial_advice",
                        "description": "The user is asking for general financial advice which is not directly related to their specific budget. However, this can include advice about budgeting in general."
                    },
                    {
                        "const": "unrelated",
                        "description": "This is a catch-all category for things not related to budgeting or financial advice."
                    }
                ]
            },
            "reasoning": {
                "type": "string",
                "description": "Describe how you decided the category"
            }
        },
        "additionalProperties": false
    },
    "strict": true
}
```
{{% /tab %}}
{{% tab "JSON" %}}
Para el tipo de salida **JSON**, defina un esquema JSON de forma libre para capturar resultados de evaluación estructurados y complejos.

Un esquema de ejemplo para una evaluación JSON:

```
{
    "name": "json_eval",
    "schema": {
        "type": "object",
        "required": [
            "result",
            "reasoning"
        ],
        "properties": {
            "result": {
                "type": "object",
                "description": "The structured evaluation result",
                "properties": {
                    "is_compliant": {
                        "type": "boolean",
                        "description": "Whether the response meets compliance requirements"
                    },
                    "confidence_score": {
                        "type": "number",
                        "description": "Confidence level of the evaluation from 0 to 1"
                    },
                    "issue_count": {
                        "type": "integer",
                        "description": "Number of issues identified in the response"
                    }
                },
                "required": ["is_compliant", "confidence_score", "issue_count"],
                "additionalProperties": false
            },
            "reasoning": {
                "type": "string",
                "description": "Describe the reasoning behind your evaluation"
            }
        },
        "additionalProperties": false
    },
    "strict": true
}
```
{{% /tab %}}
{{< /tabs >}}


4. Configure {{< ui >}}Assessment Criteria{{< /ui >}}.
   Esta flexibilidad le permite alinear los resultados de la evaluación con el estándar de calidad de su equipo. El mapeo de aprobado/reprobado también impulsa la automatización en Datadog Agent Observability, permitiendo que seguimientos y dashboards alerten sobre regresiones o hagan un seguimiento del estado general.

{{< tabs >}}
{{% tab "Booleano" %}}
Seleccione {{< ui >}}True{{< /ui >}} para marcar un resultado como "Pass", o {{< ui >}}False{{< /ui >}} para marcar un resultado como "Fail".
{{% /tab %}}

{{% tab "Puntaje" %}}
Defina umbrales numéricos para determinar el rendimiento de aprobación.
{{% /tab %}}
{{% tab "Categórico" %}}
Seleccione las categorías que deben asignarse a un estado de aprobación. Por ejemplo, si tiene las categorías `Excellent`, `Good` y `Poor`, donde solo `Poor` debe corresponder a un estado de reprobación, seleccione `Excellent` y `Good`.
{{% /tab %}}
{{% tab "JSON" %}}
Proporcione una función de JavaScript para asignar una evaluación basada en el resultado del evaluador LLM-as-a-Judge. La función debe devolver un objeto json con el siguiente formato

```
{
    assessment: "pass", // "pass" | "fail" [REQUIRED],
    value: "evaluation_label" // string [OPTIONAL],
    reasoning: "explanation behind the assessment" // string [OPTIONAL]

}
```
y la firma de la función debe ser `function __evalPostProcessing(input)` y `input` es el json del evaluador. La siguiente función es un ejemplo de una función de posprocesamiento:

```
function __evalPostProcessing(input) {
    /*
     * Expected input shape (from LLM evaluator [this depends on the JSON Structured Output]):
     * {
     *   criteria: {
     *     quality_score: { score: number (0–1), category: "excellent"|"good"|"poor", reasoning: string },
     *     toxicity:      { score: number (0–1), category: "safe"|"unsafe",           reasoning: string },
     *     completeness:  { score: number (0–1), category: "complete"|"incomplete",   reasoning: string },
     *     relevance:     { score: number (0–1), category: "relevant"|"irrelevant",   reasoning: string },
     *   },
     *   overall_reasoning: string  // (optional) top-level summary from LLM evaluator
     * }
     */

    const SCORE_THRESHOLD = 0.7;

    // Category → pass/fail mappings per criterion
    const CATEGORY_PASS_MAP = {
        quality_score: ["excellent", "good"],
        toxicity:      ["safe"],
        completeness:  ["complete"],
        relevance:     ["relevant"],
    };

    const criteriaResults = {};
    const failures = [];
    const passes = [];

    for (const [criterionName, passCategories] of Object.entries(CATEGORY_PASS_MAP)) {
        const criterion = input?.criteria?.[criterionName];

        if (!criterion) {
            failures.push(`[${criterionName}] Missing from evaluator output.`);
            criteriaResults[criterionName] = false;
            continue;
        }

        const { score, category, reasoning } = criterion;

        const scorePass    = typeof score === "number" && score >= SCORE_THRESHOLD;
        const categoryPass = typeof category === "string" && passCategories.includes(category.toLowerCase());

        // Both score AND category must pass
        const criterionPass = scorePass && categoryPass;
        criteriaResults[criterionName] = criterionPass;

        if (criterionPass) {
            passes.push(`[${criterionName}] PASS — score: ${score.toFixed(2)}, category: "${category}". ${reasoning ?? ""}`);
        } else {
            const reasons = [];
            if (!scorePass)    reasons.push(`score ${score?.toFixed(2) ?? "N/A"} below threshold (≥${SCORE_THRESHOLD})`);
            if (!categoryPass) reasons.push(`category "${category}" not in acceptable set [${passCategories.join(", ")}]`);
            failures.push(`[${criterionName}] FAIL — ${reasons.join("; ")}. ${reasoning ?? ""}`);
        }
    }

    // Determine overall assessment
    const passed = Object.values(criteriaResults).every(Boolean);
    const failCount = failures.length;

    const assessment = passed ? "pass" : "fail";

    const label = passed
        ? "high_quality_response"
        : failCount === 1
            ? "minor_quality_issue"
            : failCount === 2
                ? "moderate_quality_issue"
                : "low_quality_response";

    const reasoningParts = [
        passed
            ? "All criteria passed."
            : `${failCount} criterion/criteria failed.`,
        ...failures,
        ...passes,
        input?.overall_reasoning ? `Evaluator summary: ${input.overall_reasoning}` : ""
    ].filter(Boolean);

    return {
        assessment: assessment,
        value: label,
        reasoning: reasoningParts.join(" | ")
    };
}
```
{{% /tab %}}
{{< /tabs >}}


{{% /collapse-content %}}

{{% collapse-content title="Posprocesamiento (OpenAI, Azure OpenAI, Anthropic, Amazon Bedrock, AI Gateway, Vertex AI)" level="h4" expanded="true" id="post-processing" %}}
1. Seleccione el tipo de salida {{< ui >}}JSON{{< /ui >}}.

2. Proporcione una función de JavaScript para identificar la evaluación, el valor y el razonamiento del evaluador. El posprocesamiento le permite realizar una evaluación más compleja que simplemente usar una salida estructurada booleana, de puntuación o categórica.

    La función de posprocesamiento debe devolver un objeto que contenga una **evaluación** con el valor "pass" o "fail" y, opcionalmente, cadenas de valor o razonamiento. La función debe devolver un objeto json con el siguiente formato:
    ```
    {
        assessment: "pass", // "pass" | "fail" [REQUIRED],
        value: "evaluation_label" // string [OPTIONAL],
        reasoning: "explanation behind the assessment" // string [OPTIONAL]

    }
    ```
    and the function signature must be `function __evalPostProcessing(input)` and the `input` is the json from the evaluator. The function below is an example of a post processing function:
    ```
    function __evalPostProcessing(input) {
        /*
        * Expected input shape (from LLM evaluator [this depends on the JSON Structured Output]):
        * {
        *   criteria: {
        *     quality_score: { score: number (0–1), category: "excellent"|"good"|"poor", reasoning: string },
        *     toxicity:      { score: number (0–1), category: "safe"|"unsafe",           reasoning: string },
        *     completeness:  { score: number (0–1), category: "complete"|"incomplete",   reasoning: string },
        *     relevance:     { score: number (0–1), category: "relevant"|"irrelevant",   reasoning: string },
        *   },
        *   overall_reasoning: string  // (optional) top-level summary from LLM evaluator
        * }
        */

        const SCORE_THRESHOLD = 0.7;

        // Category → pass/fail mappings per criterion
        const CATEGORY_PASS_MAP = {
            quality_score: ["excellent", "good"],
            toxicity:      ["safe"],
            completeness:  ["complete"],
            relevance:     ["relevant"],
        };

        const criteriaResults = {};
        const failures = [];
        const passes = [];

        for (const [criterionName, passCategories] of Object.entries(CATEGORY_PASS_MAP)) {
            const criterion = input?.criteria?.[criterionName];

            if (!criterion) {
                failures.push(`[${criterionName}] Missing from evaluator output.`);
                criteriaResults[criterionName] = false;
                continue;
            }

            const { score, category, reasoning } = criterion;

            const scorePass    = typeof score === "number" && score >= SCORE_THRESHOLD;
            const categoryPass = typeof category === "string" && passCategories.includes(category.toLowerCase());

            // Both score AND category must pass
            const criterionPass = scorePass && categoryPass;
            criteriaResults[criterionName] = criterionPass;

            if (criterionPass) {
                passes.push(`[${criterionName}] PASS — score: ${score.toFixed(2)}, category: "${category}". ${reasoning ?? ""}`);
            } else {
                const reasons = [];
                if (!scorePass)    reasons.push(`score ${score?.toFixed(2) ?? "N/A"} below threshold (≥${SCORE_THRESHOLD})`);
                if (!categoryPass) reasons.push(`category "${category}" not in acceptable set [${passCategories.join(", ")}]`);
                failures.push(`[${criterionName}] FAIL — ${reasons.join("; ")}. ${reasoning ?? ""}`);
            }
        }

        // Determine overall assessment
        const passed = Object.values(criteriaResults).every(Boolean);
        const failCount = failures.length;

        const assessment = passed ? "pass" : "fail";

        const label = passed
            ? "high_quality_response"
            : failCount === 1
                ? "minor_quality_issue"
                : failCount === 2
                    ? "moderate_quality_issue"
                    : "low_quality_response";

        const reasoningParts = [
            passed
                ? "All criteria passed."
                : `${failCount} criterion/criteria failed.`,
            ...failures,
            ...passes,
            input?.overall_reasoning ? `Evaluator summary: ${input.overall_reasoning}` : ""
        ].filter(Boolean);

        return {
            assessment: assessment,
            value: label,
            reasoning: reasoningParts.join(" | ")
        };
    }
    ```
{{% /collapse-content %}}


{{% collapse-content title="Resultado de búsqueda por palabra clave (Anthropic, Amazon Bedrock, AI Gateway)" level="h4" expanded="true" id="keyword-search-output" %}}
1. Seleccione el tipo de salida {{< ui >}}Boolean{{< /ui >}}.
   <div class="alert alert-info">Para el Resultado de búsqueda por palabra clave, solo está disponible el tipo de salida <strong>Booleano</strong>.</div>

2. Proporcione {{< ui >}}True keywords{{< /ui >}} y {{< ui >}}False keywords{{< /ui >}} que definan cuándo el resultado de la evaluación es verdadero o falso, respectivamente.

   Datadog busca en el texto de respuesta del LLM-as-a-judge sus palabras clave definidas y proporciona los resultados adecuados para la evaluación. Por esta razón, debe indicar al LLM que responda con las palabras clave que usted eligió.

   Por ejemplo, si usted configura:

   - {{< ui >}}True keywords{{< /ui >}}: Sí, sí
   - {{< ui >}}False keywords{{< /ui >}}: No, no

   Entonces, su prompt del sistema debe incluir algo como `Respond with "yes" or "no"`.

3. Para {{< ui >}}Assessment Criteria{{< /ui >}}:
   - Seleccione {{< ui >}}True{{< /ui >}} para marcar un resultado como "Aprobado"
   - Seleccione {{< ui >}}False{{< /ui >}} para marcar un resultado como "Reprobado"

   Esta flexibilidad le permite alinear los resultados de la evaluación con el estándar de calidad de su equipo. El mapeo de aprobado/reprobado también impulsa la automatización en Datadog Agent Observability, permitiendo que seguimientos y dashboards alerten sobre regresiones o hagan un seguimiento del estado general.
{{% /collapse-content %}}

{{< img src="llm_observability/evaluations/custom_llm_judge_5-2.png" alt="Configuración de la salida de evaluación personalizada en Structured Output, incluyendo el razonamiento y los criterios de evaluación." style="width:100%;" >}}

### Defina el contexto de la evaluación: Filtrado y muestreo {#define-the-evaluation-scope-filtering-and-sampling}

<div class="alert alert-info">Los campos de tramo utilizados en las evaluaciones están limitados a 250 KB cada uno. Los campos que excedan este tamaño se truncan antes de enviarse al LLM-as-a-judge.</div>

En {{< ui >}}Evaluation Scope{{< /ui >}}, defina dónde y cómo se ejecuta su evaluación. Esto ayuda a controlar la cobertura (qué tramos o trazas se incluyen) y el costo (cuántos se muestrean).
   - {{< ui >}}Application{{< /ui >}}: Seleccione la aplicación que desea evaluar.
   - {{< ui >}}Evaluate On{{< /ui >}}: Elija una de las siguientes opciones:
      - {{< ui >}}Trace{{< /ui >}}: Evalúe la traza completa, incluidos todos sus tramos, como una sola unidad. Use esto cuando la respuesta dependa del contexto en múltiples tramos (finalización del objetivo del Agent, cadenas de uso de herramientas, fidelidad de RAG). Consulte [Evaluaciones a nivel de traza][16] para ver ejemplos y detalles sobre cómo se determina la finalización de la traza.
      - {{< ui >}}Span{{< /ui >}}: Evalúe los tramos coincidentes individualmente. Use el campo {{< ui >}}Query{{< /ui >}} para limitar a tramos específicos (por ejemplo, solo tramos raíz, solo tramos `llm`, o tramos con una etiqueta específica).
      - {{< ui >}}Session{{< /ui >}}: Evalúe una sesión de usuario completa, incluyendo cada traza y sus tramos, como una sola unidad. Use esto cuando la respuesta dependa del contexto en múltiples trazas en la misma sesión (satisfacción del usuario, coherencia de múltiples turnos o comportamiento del usuario a lo largo del tiempo). Requiere tramos etiquetados con un `session_id`. Consulte [Evaluaciones a nivel de sesión][17] para ver ejemplos y detalles sobre cómo se determina la finalización de la sesión.
   - {{< ui >}}Query{{< /ui >}}: (Opcional) Ingrese una consulta usando la sintaxis de consulta de Datadog para filtrar qué tramos o trazas se evalúan. Por ejemplo:
      - `@name:agent.workflow` para filtrar por nombre de tramo
      - `env:prod` para filtrar por etiqueta
      - `@parent_id:undefined` para evaluar solo los tramos raíz (cuando {{< ui >}}Evaluate On{{< /ui >}} se establece en {{< ui >}}Span{{< /ui >}})
      - `@name:agent.workflow AND env:prod` para filtrar por nombre de tramo y etiqueta
   - {{< ui >}}Sampling Rate{{< /ui >}}: (Opcional) Aplique muestreo (por ejemplo, 10%) para controlar el costo de la evaluación.

{{< img src="llm_observability/evaluations/evaluation_scope_1.png" alt="Configuración del contexto de la evaluación." style="width:100%;" >}}

### Pruebe y previsualice {#test-and-preview}

El panel de la derecha muestra {{< ui >}}Filtered Spans{{< /ui >}} (o trazas) correspondientes al alcance de evaluación configurado.

Seleccione un tramo para mostrar los datos JSON disponibles para su uso en una evaluación. Luego, haga clic en {{< ui >}}Test Evaluation{{< /ui >}} para rellenar previamente las entradas de su evaluación con datos del tramo, y haga clic en {{< ui >}}Run{{< /ui >}} para probar.

## Ver y utilizar resultados {#viewing-and-using-results}

Después de {{< ui >}}Save and Publish{{< /ui >}} su evaluación, Datadog ejecuta automáticamente su evaluación en los tramos seleccionados. Alternativamente, puede {{< ui >}}Save as Draft{{< /ui >}} y editar o habilitar su evaluación más tarde.

Los resultados están disponibles en todo Agent Observability casi en tiempo real para las evaluaciones publicadas. Puede encontrar sus resultados personalizados de LLM-as-a-judge para un tramo específico en la pestaña {{< ui >}}Evaluations{{< /ui >}}, junto con otras evaluaciones.

{{< img src="llm_observability/evaluations/custom_llm_judge_3-2.png" alt="La pestaña Evaluaciones de una traza, que muestra los resultados de evaluaciones personalizadas junto con las evaluaciones administradas." style="width:100%;" >}}

Cada resultado de evaluación incluye:

- El valor evaluado (por ejemplo, `True`, `9` o `Neutral`)
- El razonamiento (cuando está habilitado)
- El indicador de aprobado/reprobado (según sus criterios de evaluación)

Utilice la sintaxis `@evaluation.<evaluation_name>.value` para consultar o visualizar los resultados.

Por ejemplo:

```
@evaluation.helpfulness-check.value
```

{{< img src="llm_observability/evaluations/custom_llm_judge_4.png" alt="La visualización de trazas de Agent Observability. En el cuadro de búsqueda, el usuario ha ingresado `@evaluation.budget-guru-intent-classifier.value:budgeting_question` y los resultados se completan a continuación." style="width:100%;" >}}


Usted puede:
- Filtrar trazas por resultados de evaluación (ejemplo, `@evaluation.helpfulness-check.value`)
- Filtrar por estado de evaluación de aprobado/reprobado (ejemplo, `@evaluation.helpfulness-check.assessment:fail`)
- Utilizar los resultados de evaluación como [facets][3]
- Ver resultados agregados en la sección Evaluation de la página Agent Observability Overview.
- Crear [seguimientos][4] para alertar sobre cambios en el rendimiento o regresiones.

## Uso en experimentos {#using-in-experiments}

Para reutilizar una evaluación personalizada de LLM-as-a-judge en un [Experimento de LLM][8] local, haga referencia a ella por nombre usando `RemoteEvaluator` desde el SDK:

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs, RemoteEvaluator

evaluator = RemoteEvaluator(eval_name="quality-assessment")

experiment = LLMObs.experiment(
    name="my-experiment",
    task=my_task,
    dataset=dataset,
    evaluators=[evaluator],
)
experiment.run()
{{< /code-block >}}

Puede combinar `RemoteEvaluator` con otros evaluadores locales en el mismo experimento. Para el mapeo de entrada personalizado, el manejo de errores y más opciones, consulte [RemoteEvaluator][9] en la Guía para desarrolladores de evaluación.

## Mejores prácticas para evaluaciones personalizadas confiables {#best-practices-for-reliable-custom-evaluations}

- **Empiece poco a poco**: Apunte a un único modo de falla bien definido antes de escalar.
- **Habilite el razonamiento** cuando necesite decisiones explicables y para mejorar la precisión en tareas de razonamiento complejas.
- **Itere**: Ejecute, inspeccione los resultados y refine su prompt.
- **Valide**: Verifique periódicamente la precisión del evaluador utilizando trazas muestreadas.
- **Documente su rúbrica**: Defina claramente qué significan "Aprobado" y "Reprobado" para evitar desviaciones con el tiempo.
- **Realinee su evaluador**: Reevalúe el prompt y los ejemplos de few-shot cuando el LLM subyacente se actualice.

## Uso estimado de tokens {#estimated-token-usage}

Puede hacer un seguimiento del uso de tokens de sus evaluaciones de LLM utilizando el [LLM Evaluations Token Usage dashboard][10].

Si necesita más detalles, las siguientes métricas le permiten realizar un seguimiento de los recursos de LLM consumidos para potenciar las evaluaciones:

- `ml_obs.estimated_usage.llm.input.tokens`
- `ml_obs.estimated_usage.llm.output.tokens`
- `ml_obs.estimated_usage.llm.total.tokens`

Cada una de estas métricas tiene etiquetas `ml_app`, `model_server`, `model_provider`, `model_name` y `evaluation_name`, lo que le permite identificar aplicaciones, modelos y evaluaciones específicas que contribuyen a su uso.

## Configure evaluaciones de LLM-as-a-judge desde la API {#configure-llm-as-a-judge-evaluations-from-the-api}

Puede utilizar operaciones CRUD básicas para manipular configuraciones de evaluación administradas, después de tener la `DD_API_KEY` [clave de API][14] especificada en su entorno.

 - [GET][11] configuraciones de evaluación existentes
 - [PUT][12] configuraciones de evaluación existentes
 - [DELETE][13] configuraciones de evaluación existentes

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/evaluations
[2]: /es/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/connect_to_account
[3]: /es/events/explorer/facets/
[4]: /es/monitors/
[5]: https://arxiv.org/abs/2504.00050
[6]: /es/llm_observability/evaluations/evaluation_compatibility
[7]: /es/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations/
[8]: /es/llm_observability/experiments
[9]: /es/llm_observability/guide/evaluation_developer_guide/#using-managed-evaluators
[10]: https://app.datadoghq.com/dash/integration/llm_evaluations_token_usage
[11]: /es/api/latest/agent-observability/#get-a-custom-evaluator-configuration
[12]: /es/api/latest/agent-observability/#create-or-update-a-custom-evaluator-configuration
[13]: /es/api/latest/agent-observability/#delete-a-custom-evaluator-configuration
[14]: /es/account_management/api-app-keys
[15]: /es/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/prompt_templating
[16]: /es/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/trace_level_evaluations
[17]: /es/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/session_level_evaluations
[18]: https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations