---
aliases:
- /es/tracing/llm_observability/submit_evaluations
- /es/llm_observability/submit_evaluations
- /es/llm_observability/evaluations/submit_evaluations
- /es/llm_observability/configure/evaluations/submit_evaluations
- /es/llm_observability/evaluations/external_evaluations/
- /es/llm_observability/configure/evaluations/external_evaluations/
description: Envíe evaluaciones personalizadas a Agent Observability utilizando el
  SDK de Python o la API de Agent Observability para realizar un seguimiento de la
  calidad de las respuestas.
further_reading:
- link: /llm_observability/investigate/evaluations/evaluation_developer_guide
  tag: Documentación
  text: Obtenga información sobre cómo crear evaluadores personalizados
- link: /llm_observability/setup/sdk
  tag: Documentación
  text: Obtenga información sobre el SDK de Agent Observability para Python
- link: /llm_observability/setup/api
  tag: Documentación
  text: Obtenga información sobre la API de evaluaciones
- link: /llm_observability/investigate/evaluations/external_evaluations/nemo
  tag: Documentación
  text: Obtenga información sobre cómo enviar evaluaciones desde NVIDIA NeMo
- link: /llm_observability/investigate/evaluations/end_user_feedback
  tag: Documentación
  text: Obtenga información sobre cómo enviar retroalimentación del usuario final
title: Evaluaciones externas
---
## Descripción general {#overview}

Las evaluaciones miden la calidad de las respuestas de su aplicación de LLM.
Aunque Agent Observability proporciona algunas evaluaciones listas para usar para sus trazas, puede enviar sus propias evaluaciones a Agent Observability de dos maneras: con el [SDK](#submitting-evaluations-with-the-sdk) de Datadog o con la [API de Agent Observability](#submitting-evaluations-with-the-api). Utilice esta convención de nomenclatura para la etiqueta de evaluación:

* Las etiquetas de evaluación deben comenzar con una letra.
* Las etiquetas de evaluación solo deben contener caracteres alfanuméricos ASCII o guiones bajos.
  * Otros caracteres, incluidos los espacios, se convierten en guiones bajos.
  * Unicode no es compatible.
* Las etiquetas de evaluación no deben exceder los 200 caracteres. Se prefiere menos de 100 desde la perspectiva de la UI.

<div class="alert alert-info">

Las etiquetas de evaluación deben ser únicas para una aplicación de LLM determinada (<code>ml_app</code>) y organización.

</div>

<div class="alert alert-info">Para la retroalimentación enviada por sus usuarios, como calificaciones de pulgar hacia arriba o hacia abajo, cambios aceptados, comentarios de texto libre y otras señales, consulte <a href="/llm_observability/investigate/evaluations/end_user_feedback/">Retroalimentación del usuario final</a>.</div>

## Envío de evaluaciones externas con el SDK {#submitting-external-evaluations-with-the-sdk}

El SDK de Agent Observability proporciona los métodos `LLMObs.submit_evaluation()` y `LLMObs.export_span()` para ayudar a su aplicación de LLM rastreada a enviar evaluaciones externas a Agent Observability. Consulte la documentación del SDK de [Python][3] o [Node.js][4] para obtener más detalles.

<div class="alert alert-info">Para crear evaluadores reutilizables basados en clases con metadatos de resultados enriquecidos, consulte la <a href="/llm_observability/investigate/evaluations/evaluation_developer_guide/">Guía para desarrolladores de evaluaciones</a>.</div>

### Ejemplo {#example}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

def my_harmfulness_eval(input: Any) -> float:
  score = ... # custom harmfulness evaluation logic

  return score

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # user application logic to invoke LLM

    # joining an evaluation to a span via span ID and trace ID
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


## Envío de evaluaciones externas con la API {#submitting-external-evaluations-with-the-api}

Puede utilizar la API de evaluaciones proporcionada por Agent Observability para enviar evaluaciones asociadas con spans, trazas o sesiones a Datadog. Consulte la [API de evaluaciones][2] para obtener más detalles sobre las especificaciones de la API. Para crear evaluadores reutilizables, consulte la [Guía para desarrolladores de evaluaciones][5].

Para enviar evaluaciones para <a href="/llm_observability/instrument/otel_instrumentation">OpenTelemetry spans</a> directamente a la API de evaluaciones, debe incluir la <code>source:otel</code> la etiqueta en la evaluación. Además, <code>span_id</code> y <code>trace_id</code> Los valores deben proporcionarse como cadenas **decimales**. Si su instrumentación de OpenTelemetry produce ID hexadecimales, conviértalos a decimal antes de enviarlos. Por ejemplo, en Python: <code>str(int(hex_span_id, 16))</code>.

### Ejemplo {#example-1}

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
          "ml_app": "weather-bot",
          "timestamp_ms": 1765990800016,
          "metric_type": "score",
          "label": "Accuracy",
          "score_value": 3,
          "tags": ["source:otel"],
          "assessment": "pass",
          "reasoning": "it makes sense"
        }
      ]
    }
  }
}
{{< /code-block >}}

## Marcos de evaluación compatibles {#supported-evaluation-frameworks}

{{< whatsnext desc="Envíe evaluaciones desde estas herramientas:" >}}
    {{< nextlink href="/llm_observability/investigate/evaluations/external_evaluations/deepeval" >}}Evaluaciones de DeepEval{{< /nextlink >}}
    {{< nextlink href="/llm_observability/investigate/evaluations/external_evaluations/pydantic" >}}Evaluaciones de Pydantic{{< /nextlink >}}
    {{< nextlink href="/llm_observability/investigate/evaluations/external_evaluations/nemo" >}}Evaluaciones de NeMo{{< /nextlink >}}
{{< /whatsnext >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/metrics/custom_metrics/#naming-custom-metrics
[2]: /es/llm_observability/setup/api/?tab=model#evaluations-api
[3]: /es/llm_observability/setup/sdk/python/#evaluations
[4]: /es/llm_observability/setup/sdk/nodejs/#evaluations
[5]: /es/llm_observability/investigate/evaluations/evaluation_developer_guide