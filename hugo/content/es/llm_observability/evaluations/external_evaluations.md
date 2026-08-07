---
aliases:
- /es/tracing/llm_observability/submit_evaluations
- /es/llm_observability/submit_evaluations
- /es/llm_observability/evaluations/submit_evaluations
further_reading:
- link: /llm_observability/guide/evaluation_developer_guide
  tag: Documentación
  text: Más información sobre la creación de evaluadores personalizados
- link: /llm_observability/setup/sdk
  tag: Documentación
  text: Más información sobre el SDK de  LLM Observability para Python
- link: /llm_observability/setup/api
  tag: Documentación
  text: Más información sobre la API de evaluaciones
- link: /llm_observability/evaluations/submit_nemo_evaluations
  tag: Documentación
  text: Más información sobre el envío de evaluaciones de NVIDIA NeMo
title: Evaluaciones externas
---

## Información general

En el contexto de las aplicaciones LLM, es importante hacer un seguimiento de los comentarios de los usuarios y evaluar la calidad de las respuestas de tu aplicación LLM.
Aunque LLM Observability proporciona algunas evaluaciones predefinidas para tus trazas (traces), puedes enviar tus propias evaluaciones a LLM Observability de dos formas: con el [SDK](#submitting-evaluations-with-the-sdk) de Datadog o con la API de [LLM Observability](#submitting-evaluations-with-the-api). Utiliza esta convención de nomenclatura para la etiqueta (label) de evaluación:

* Las etiquetas (labels) de evaluación deben empezar por una letra.
* Las etiquetas (labels) de evaluación solo deben contener caracteres alfanuméricos ASCII o guiones bajos.
  * Los demás caracteres, incluidos los espacios, se convierten en guiones bajos.
  * No se admite Unicode.
* Las etiquetas (labels) de evaluación no deben superar los 200 caracteres. Desde el punto de vista de la interfaz de usuario, es preferible que tengan menos de 100.

<div class="alert alert-info">

Las etiquetas (labels) de evaluación deben ser únicas para una aplicación <code>(ml_app)</code> y una organización LLM determinadas.

</div>

## Envío de evaluaciones externas con el SDK

El SDK de LLM Observability proporciona los métodos `LLMObs.submit_evaluation()` y `LLMObs.export_span()` para ayudar a tu aplicación LLM rastreada a enviar evaluaciones externas a LLM Observability. Consulta la documentación del SDK de [Python][3] o [Node.js][4] para ver más detalles.

<div class="alert alert-info">Para crear evaluadores reutilizables basados en clases con metadatos de resultados enriquecidos, consulta la <a href="/llm_observability/guide/evaluation_developer_guide/">guía del desarrollador de evaluaciones</a>.</div>

### Ejemplo

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

def my_harmfulness_eval(input: Any) -> float:
  score = ... # lógica de evaluación dañina personalizada

  return score

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # user application logic to invoke LLM

    # unir una evaluación a un tramo (span) a través de los ID de tramos y de trazas
    span_context = LLMObs.export_span(span=None)
    LLMObs.submit_evaluation(
        span = span_context,
        ml_app = "chatbot",
        label="harmfulness",
        metric_type="score", # can be score or categorical
        value=my_harmfulness_eval(completion),
        tags={"type": "custom"},
        timestamp_ms=1765990800016, # optional, unix timestamp in milliseconds
        assessment="pass", # optional, "pass" or "fail"
        reasoning="it makes sense", # optional, judge llm reasoning
    )
{{< /code-block >}}


## Envío de evaluaciones externas con la API

Puedes utilizar la API de evaluaciones proporcionada por LLM Observability para enviar evaluaciones asociadas a tramos a Datadog. Consulta la [API de evaluaciones][2] para obtener más detalles sobre las especificaciones de la API. Para la creación de evaluadores reutilizables, consulta la [guía del desarrollador de evaluaciones][5].

Para enviar evaluaciones de <a href="/llm_observability/instrumentation/otel_instrumentation">tramos de OpenTelemetry </a> directamente a la API de evaluaciones, debes incluir la etiqueta (tag) <code>source:otel</code> en la evaluación.

### Ejemplo

{{< code-block lang="json" >}}
{
  "data": {
    "type": "evaluation_metric",
    "id": "456f4567-e89b-12d3-a456-426655440000",
    "attributes": {
      "metrics": [
        {
          "id": "cdfc4fc7-e2f6-4149-9c35-edc4bbf7b525",
          "join_on": {
            "tag": {
              "key": "msg_id",
              "value": "1123132"
            }
          },
          "span_id": "20245611112024561111",
          "trace_id": "13932955089405749200",
          "ml_app": "weather-bot",
          "timestamp_ms": 1609479200,
          "metric_type": "score",
          "label": "Accuracy",
          "score_value": 3,
          // source:otel required only for OpenTelemetry spans
          "tags": ["source:otel"],
          "timestamp_ms": 1765990800016,
          "assessment": "pass",
          "reasoning": "it makes sense"
        }
      ]
    }
  }
}
{{< /code-block >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/metrics/custom_metrics/#naming-custom-metrics
[2]: /es/llm_observability/setup/api/?tab=model#evaluations-api
[3]: /es/llm_observability/setup/sdk/python/#evaluations
[4]: /es/llm_observability/setup/sdk/nodejs/#evaluations
[5]: /es/llm_observability/guide/evaluation_developer_guide