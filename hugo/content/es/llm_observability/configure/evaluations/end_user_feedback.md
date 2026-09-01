---
aliases:
- /es/llm_observability/evaluations/end_user_feedback/
description: Envíe comentarios de usuarios finales a Agent Observability y conéctelos
  a tramos, trazas, sesiones o entidades externas.
further_reading:
- link: /llm_observability/instrument/api/#evaluations-api
  tag: Documentación
  text: Obtenga información sobre Evaluations API
- link: /llm_observability/configure/evaluations/external_evaluations
  tag: Documentación
  text: Obtenga información sobre cómo enviar evaluaciones externas
- link: /llm_observability/investigate/annotation_queues
  tag: Documentación
  text: Obtenga información sobre Annotation Queues
- link: https://www.datadoghq.com/blog/debug-and-evaluate-your-ai-app-from-your-coding-agent/
  tag: Blog
  text: Depure y evalúe su aplicación de IA desde su agente de codificación con Datadog
    Agent Observability
title: Comentarios de usuarios finales
---
## Descripción general {#overview}

Los comentarios de usuarios finales recopilan la entrada de los usuarios de su aplicación LLM en Agent Observability. Los ejemplos incluyen calificaciones de pulgar hacia arriba o hacia abajo, si un usuario aceptó un cambio de un agente y comentarios de texto libre sobre una respuesta.

Los comentarios son diferentes de una evaluación. Utilice los comentarios para las señales enviadas por un usuario final. Utilice [external evaluations][1] para los resultados producidos por su propia lógica de evaluación, donde no es relevante quién envió la evaluación. Utilice [Annotation Queues][2] para flujos de trabajo de revisión estructurados ejecutados por su equipo.

Los comentarios enviados aparecen al ver sesiones, trazas o tramos en Agent Observability.

## Enviar comentarios {#submit-feedback}

Envíe comentarios con la [Evaluations API][3] configurando `event_kind` en `feedback`.

Los eventos de comentarios requieren:

- `event_kind: "feedback"`
- `submitter.id`, que identifica al usuario o agente que envió los comentarios
- Exactamente un campo de destino: `span_id`, `trace_id`, `session_id` o `feedback_join_key`
- Un campo de valor que coincida con `metric_type`

Los eventos de comentarios no deben incluir `join_on`. Si se omite `eval_scope`, Datadog lo infiere del campo de destino. Si se proporciona `eval_scope`, debe coincidir con el destino seleccionado.

### Comentario de destino {#target-feedback}

| Destino | Campo | Utilizar cuando |
|--------|-------|----------|
| Tramo | `span_id` | El comentario se aplica a un tramo. |
| Traza | `trace_id` | El comentario se aplica a una traza completa. |
| Sesión | `session_id` | El comentario se aplica a una sesión completa. |
| Entidad externa | `feedback_join_key` | El comentario se aplica a una entidad definida por el cliente, como un ID de incidente, ID de informe, ID de tarea o ID de verificación de lanzamiento. |

### Utilice una clave de unión de comentarios {#use-a-feedback-join-key}

Utilice `feedback_join_key` cuando el comentario no esté vinculado a un solo tramo, traza o sesión. Primero, enriquezca sus tramos con la etiqueta `feedback_join_key` relacionada con la entidad externa utilizando el flujo de trabajo [Enriching spans][4] del SDK o la [Spans API][5]. Luego, envíe el comentario con la misma `feedback_join_key`.

## Ejemplos {#examples}

### Enviar comentarios de pulgar hacia abajo para un tramo {#submit-thumbs-down-feedback-for-a-span}

{{< code-block lang="json" >}}
{
  "data": {
    "type": "evaluation_metric",
    "attributes": {
      "metrics": [
        {
          "event_kind": "feedback",
          "span_id": "20245611112024561111",
          "ml_app": "weather-bot",
          "timestamp_ms": 1765990800016,
          "metric_type": "categorical",
          "label": "thumbs",
          "categorical_value": "down",
          "assessment": "fail",
          "submitter": {
            "id": "user-123",
            "type": "user"
          }
        }
      ]
    }
  }
}
{{< /code-block >}}

### Enviar comentarios de texto libre con una clave de unión de comentarios {#submit-free-text-feedback-with-a-feedback-join-key}

{{< code-block lang="json" >}}
{
  "data": {
    "type": "evaluation_metric",
    "attributes": {
      "metrics": [
        {
          "event_kind": "feedback",
          "feedback_join_key": "incident-123",
          "ml_app": "incident-agent",
          "timestamp_ms": 1765990800016,
          "metric_type": "text",
          "label": "user_comment",
          "text_value": "The investigation missed the customer impact.",
          "assessment": "fail",
          "submitter": {
            "id": "user-123",
            "type": "user"
          }
        }
      ]
    }
  }
}
{{< /code-block >}}

## Analizar comentarios {#analyze-feedback}

Para crear un widget de tablero para comentarios, cree el widget como lo haría para una evaluación y seleccione la fuente de datos dedicada **Feedback**. Para buscar y filtrar tramos y trazas por comentarios en el Trace Explorer, consulte [Feedback queries][6].

{{< img src="llm_observability/evaluations/feedback_widget_query.png" alt="El editor de widgets de Datadog con la fuente de datos Feedback seleccionada, que muestra un recuento de todos los comentarios." style="width:100%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/llm_observability/configure/evaluations/external_evaluations
[2]: /es/llm_observability/investigate/annotation_queues
[3]: /es/llm_observability/instrument/api/#evaluations-api
[4]: /es/llm_observability/instrument/sdk/?tab=python#enriching-spans
[5]: /es/llm_observability/instrument/api/?tab=model#spans-api
[6]: /es/llm_observability/investigate/querying/#feedback-queries