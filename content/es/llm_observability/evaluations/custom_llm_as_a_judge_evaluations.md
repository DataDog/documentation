---
description: Cómo crear evaluaciones LLM-as-a-judge personalizadas y cómo utilizar
  los resultados de estas evaluaciones en LLM Observability.
further_reading:
- link: https://www.datadoghq.com/blog/manage-ai-cost-and-performance-with-datadog/
  tag: Blog
  text: 'Impulsar la rentabilidad de la IA: Cómo Datadog conecta costo, rendimiento
    e infraestructura para que puedas escalar de forma responsable.'
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: Blog
  text: Obtener visibilidad de los workflows (UI) / procesos (generic) de Strands
    Agents con LLM Observability de Datadog
- link: https://www.datadoghq.com/blog/llm-evaluation-framework-best-practices/
  tag: Blog
  text: 'Creación de un framework de evaluación de LLM: buenas prácticas'
- link: /llm_observability/terms/
  tag: Documentación
  text: Conoce los términos y conceptos de LLM Observability
- link: /llm_observability/setup
  tag: Documentación
  text: Aprende a configurar LLM Observability
- link: /llm_observability/evaluations/managed_evaluations
  tag: Documentación
  text: Más información sobre las evaluaciones gestionadas
- link: https://huggingface.co/learn/cookbook/llm_judge
  tag: Hugging Face
  text: Utilización de LLM-as-a-judge para una evaluación automatizada y versátil
title: Evaluaciones personalizadas de LLM-as-a-Judge
---

Las evaluaciones personalizadas de LLM-as-a-judge utilizan un LLM para juzgar el rendimiento de otro LLM. Puedes definir la lógica de evaluación con indicaciones en lenguaje natural, capturar criterios subjetivos u objetivos (como el tono, la utilidad o la veracidad de los hechos) y ejecutar estas evaluaciones a escala en todas tus traces (trazas) y spans (tramos). 

## Crear una evaluación personalizada de LLM-as-a-judge

Puedes crear y gestionar evaluaciones personalizadas desde la [page (página) Evaluaciones][1] en LLM Observability.

Más información sobre los [requisitos de compatibilidad][6].

### Configurar el indicador

1. En Datadog, ve a LLM Observability [page (página) Evaluaciones][1]. Selecciona **Create Evaluation** (Crear evaluación) y, a continuación, **Create your own** (Crea la tuya propia).
   {{< img src="llm_observability/evaluations/custom_llm_judge_1-2.png" alt="La page (página) Evaluaciones de LLM Observability con el panel lateral Crear evaluación abierto. Se selecciona el primer elemento, 'Crea la tuya propia'. " style="width:100%;" >}}
1. Proporciona un **evaluation name** (nombre de evaluación) claro y descriptivo (por ejemplo, `factuality-check` o `tone-eval`). Puedes utilizar este nombre al consultar los resultados de la evaluación. El nombre debe ser único dentro de tu aplicación.
1. Utiliza el menú desplegable **Account** (Cuenta) para seleccionar el proveedor de LLM y la cuenta correspondiente que desees utilizar para su juez de LLM. Para conectar una cuenta nueva, consulta [conecta un proveedor de LLM][2].
    - Si seleccionas una cuenta **Amazon Bedrock**, elige una región para la que esté configurada la cuenta.
    - Si seleccionas una cuenta **Vertex**, elige un project (proyecto) y una ubicación.
1. Utiliza el menú desplegable **Model** (Modelo) para seleccionar un modelo a utilizar para tu juez de LLM.
1. En la sección **Evaluation Prompt** (Indicador de evaluación), utiliza el menú desplegable **Prompt Template** (Plantilla de indicador):
   - **Crear desde cero**: Utiliza tu propio indicador personalizado (definido en el siguiente step (UI) / paso (generic)).
   - **Falta de respuesta**, **Inserción de pregunta**, **Sentimiento**, etc.: rellena una plantilla de indicador preexistente. Puedes utilizar estas plantillas tal cual o modificarlas para adaptarlas a tu lógica de evaluación específica.
1. En el campo **System Prompt** (Indicador de sistema), introduce tu indicador personalizado o modifica una plantilla de indicadores.
   En el caso de los indicadores personalizadas, proporciona instrucciones claras que describan lo que debe evaluar el evaluador. 
   - Centrarse en un único objetivo de evaluación 
   - Incluye 2-3 ejemplos breves que muestren los pares de entrada/salida, los resultados esperados y el razonamiento.

{{% collapse-content title="Example custom prompt" level="h4" expanded=false id="custom-prompt-example" %}}
**System Prompt** (Indicador de sistema)
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

7. En el campo **User** (Usuario), introduce tu indicador de usuario. Especifica explícitamente qué partes del span (tramo) deben evaluarse: Entrada de span (tramo) (`{{span_input}}`), Salida (`{{span_output}}`) o ambas.

### Definir el resultado de la evaluación

Para los modelos OpenAI o Azure OpenAI, configura [Salida estructurada](#structured-output).

Para los modelos Anthropic o Amazon Bedrock, configura [Salida de búsqueda de palabra clave](#keyword-search-output).

Para AI Gateway, se admiten la [Salida estructurada](#structured-output) y la [Salida de búsqueda de palabra clave](#keyword-search-output). Datadog recomienda utilizar la salida estructurada cuando tu modelo lo admita y volver a la salida de búsqueda de palabra clave en caso contrario.

{{% collapse-content title="Structured Output (OpenAI, Azure OpenAI, AI Gateway)" level="h4" expanded="true" id="structured-output" %}}
1. Selecciona un tipo de salida de evaluación:

   - **Booleano**: Resultados true/false (por ejemplo, "¿Siguió el modelo las instrucciones?")
   - **Puntuación**: Calificaciones numéricas (por ejemplo, una escala de 1 a 5 para la utilidad)
   - **Categóricas**: Etiquetas discretas (por ejemplo, "Bueno", "Malo", "Neutro")

2. Opcionalmente, selecciona **Enable Reasoning** (Habilitar Razonamiento). Esto configura al juez de LLM para que proporcione una breve justificación de su decisión (por ejemplo, por qué se dio una puntuación de 8). El razonamiento te ayuda a entender cómo y por qué se hacen las evaluaciones y es particularmente útil para auditar métricas subjetivas como el tono, la empatía o la utilidad. Añadir razonamientos también puede [hacer que el juez de LLM sea más preciso](https://arxiv.org/abs/2504.00050).

3. Edita un esquema JSON que defina el tipo de salida de tus evaluaciones:

{{< tabs >}}
{{% tab "Booleano" %}}
Para el tipo de salida **Boolean** (Booleano), edita el campo `description` para explicar mejor qué significan true y false en tu case (incidencia) de uso.
{{% /tab %}}

{{% tab "Puntuación" %}}
Para el tipo de salida **Score** (Puntuación):
- Configura una puntuación `min` y `max` para tu evaluación.
- Edita el campo `description` para explicar con más detalle la escala de tu evaluación.
{{% /tab %}}
{{% tab "Categórica" %}}
Para el tipo de salida **Categorical** (Categórica):
- Añade o elimina categorías editando el esquema JSON.
- Edita nombres de categorías.
- Edita el campo `description` de las categorías para explicar mejor lo que significan en el contexto de tu evaluación.

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
{{< /tabs >}}


4. Configura **Assessment Criteria** (Criterios de evaluación).
   Esta flexibilidad te permite alinear los resultados de la evaluación con la barra de calidad de tu equipo. La asignación de Pass/Fail también potencia la automatización en LLM Observability de Datadog, lo que permite a los monitores y dashboards marcar regresiones o rastrear el estado general.

{{< tabs >}}
{{% tab "Booleano" %}}
Selecciona **True** para marcar un resultado como "Pass", o **False** para marcar un resultado como "Fail".
{{% /tab %}}

{{% tab "Puntuación" %}}
Define umbrales numéricos para determinar el rendimiento de aprobación.
{{% /tab %}}
{{% tab "Categórica" %}}
Selecciona las categorías que deben asignarse a un estado de aprobado. Por ejemplo, si tienes las categorías `Excellent`, `Good` y `Poor`, donde solo `Poor` debe corresponder a un estado de no aprobado, selecciona `Excellent` y `Good`.
{{% /tab %}}
{{< /tabs >}}


{{% /collapse-content %}}

{{% collapse-content title="Keyword Search Output (Anthropic, Amazon Bedrock, AI Gateway)" level="h4" expanded="true" id="keyword-search-output" %}}
1. Selecciona el tipo de salida **Boolean** (Booleano).
   <div class="alert alert-info">Para los modelos Anthropic y Amazon Bedrock, solo está disponible el tipo de salida <strong>Booleano</strong>.</div>

2. Proporciona las **True keywords** (Palabras clave true) y **False keywords** (Palabras clave false) que definen cuándo el resultado de la evaluación es true o false, respectivamente. 

   Datadog busca en el texto de respuesta de LLM-as-a-judge las palabras clave definidas por ti y proporciona los resultados adecuados para la evaluación. Por este motivo, debes indicar a LLM que responda con las palabras clave que hayas elegido. 

   Por ejemplo, si configuras:

   - **Palabras clave true**: Sí, sí
   - **Palabras clave false**: No, no

   A continuación, el indicador del sistema debería incluir algo como `Respond with "yes" or "no"`.

3. Para **Criterios de evaluación**:
   - Selecciona **True** para marcar un resultado como "Pass" (Aprobado).
   - Selecciona **False** para marcar un resultado como "Fail" (No aprobado).

   Esta flexibilidad te permite ajustar los resultados de la evaluación con la barra de calidad de tu equipo. La asignación de aprobados/no aprobados también potencia la automatización en LLM Observability de Datadog, lo que permite a los monitores y dashboards marcar regresiones o rastrear el estado general.
{{% /collapse-content %}}

{{< img src="llm_observability/evaluations/custom_llm_judge_5-2.png" alt="Configuración del resultado de la evaluación personalizada en Salida estructurada, incluido el razonamiento y los criterios de evaluación." style="width:100%;" >}}

### Definir el ámbito de la evaluación: Filtrado y muestreo

En **Ámbito de la evaluación**, define dónde y cómo se ejecuta tu evaluación. Esto ayuda a controlar la cobertura (qué spans (tramos) se incluyen) y el costo (cuántos spans (tramos) se muestrean).
   - **Aplicación**: Selecciona la aplicación que desees evaluar.
   - **Evaluar en**: Elige uno de los siguientes:
      - **Traces**: (Trazas) Evalúa solo spans (tramos) raíz
      - **Todos los tramos**: Evalúa los spans (tramos) raíz y secundarios
   - **Nombres de spans (tramos)**: (Opcional) Limita la evaluación a tramos con determinados nombres.
   - **Tags**: (Etiquetas) (Opcional) Limita la evaluación a spans (tramos) con determinadas tags (etiquetas).
   - **Tasa de muestreo**: (Opcional) Aplica el muestreo (por ejemplo, 10 %) para controlar el costo de la evaluación.

### Test y vista previa

Utiliza el panel **Test Evaluation** (Evaluación de test) de la derecha para previsualizar los resultados.
Puedes introducir los valores de muestra `{{span_input}}` y `{{span_output}}` y hacer clic en **Run Evaluation** (Ejecutar evaluación) para ver el resultado y la explicación del razonamiento y si tu juez de LLM la devolvió aprobada o no aprobada.

Perfecciona tu indicador y esquema hasta que los resultados sean coherentes e interpretables.


{{< img src="llm_observability/evaluations/custom_llm_judge_2-3.png" alt="Flujo de creación para una evaluación personalizada de LLM-as-a-judge. Del lado derecho, en Evaluación de test, se han provisto ejemplos de span_input y span_output. Un cuadro de diálogo de Resultado de la evaluación muestra un ejemplo de resultado." style="width:100%;" >}}


## Visualización y utilización de los resultados

Después de **Save and Publish** (Guardar y Publicar) tu evaluación, Datadog la ejecuta automáticamente en los spans (tramos) seleccionados. También puedes **Save as Draft** (Guardar como borrador) y editar o activar tu evaluación más tarde.

Los resultados están disponibles en LLM Observability casi en tiempo real para las evaluaciones publicadas. Puedes buscar los resultados de tu LLM-as-a-judge personalizado para un span (tramo) específico en la pestaña **Evaluations** (Evaluaciones), junto a otras evaluaciones.

{{< img src="llm_observability/evaluations/custom_llm_judge_3-2.png" alt="La pestaña Evaluaciones de una trace (traza), que muestra resultados de evaluaciones personalizadas junto con evaluaciones gestionadas." style="width:100%;" >}}

Cada resultado de evaluación incluye:

- El valor evaluado (por ejemplo `True`, `9` o `Neutral`)
- El razonamiento (cuando está activado)
- El indicador de aprobado/no aprobado (en función de tus criterios de evaluación)

Utiliza la sintaxis `@evaluations.custom.<evaluation_name>` para consultar o visualizar los resultados.

Por ejemplo:
```
@evaluations.custom.helpfulness-check
```

{{< img src="llm_observability/evaluations/custom_llm_judge_4.png" alt="Las vista de las traces (trazas) de LLM Observability. En el cuadro de búsqueda, el usuario ha ingresado `@evaluations.custom.budget-guru-intent-classifier:budgeting_question` y los resultados se completan a continuación." style="width:100%;" >}}


Puedes:
- Filtrar traces (trazas) por resultados de evaluación (por ejemplo, `@evaluations.custom.helpfulness-check`)
- Filtrar por estado de evaluación aprobado/no aprobado (por ejemplo: `@evaluations.assessment.custom.helpfulness-check:fail`)
- Utilizar los resultados de la evaluación como [facetas][3]
- Visualizar los resultados completos en la sección Evaluación de la page (página) de información general de LLM Observability
- Crear [monitores][4] para alertar sobre cambios en el rendimiento o regresión

## Prácticas recomendadas para evaluaciones personalizadas fiables

- **Empieza poco a poco**: Apunta a un único modo de fallo bien definido antes de escalar.
- **Activa el razonamiento** cuando necesites decisiones explicables y para mejorar la precisión en tareas de razonamiento complejas.
- **Itera**: Ejecuta, revisa los resultados y refina tu indicador.
- **Valida**: Check periódicamente la precisión del evaluador con traces (trazas) muestreadas.
- **Documenta tu rúbrica**: Define claramente lo que significa "Aprobado" y "No aprobado" para evitar desviaciones a lo largo del tiempo.
- **Realinea la evaluación**: Revalúa los ejemplos de indicadores y de pocos disparos cuando se actualice el LLM subyacente.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/evaluations
[2]: /es/llm_observability/evaluations/managed_evaluations#connect-your-llm-provider-account
[3]: /es/events/explorer/facets/
[4]: /es/monitors/
[5]: https://arxiv.org/abs/2504.00050
[6]: /es/llm_observability/evaluations/evaluation_compatibility