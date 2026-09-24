---
aliases:
- /fr/tracing/llm_observability/submit_evaluations
- /fr/llm_observability/submit_evaluations
- /fr/llm_observability/evaluations/submit_evaluations
- /fr/llm_observability/configure/evaluations/submit_evaluations
- /fr/llm_observability/evaluations/external_evaluations/
- /fr/llm_observability/configure/evaluations/external_evaluations/
description: Soumettez des évaluations personnalisées à Agent Observability en utilisant
  le SDK Python ou l'API Agent Observability pour suivre la qualité des réponses.
further_reading:
- link: /llm_observability/investigate/evaluations/evaluation_developer_guide
  tag: Documentation
  text: En savoir plus sur la création d'évaluateurs personnalisés
- link: /llm_observability/setup/sdk
  tag: Documentation
  text: En savoir plus sur le SDK Agent Observability pour Python
- link: /llm_observability/setup/api
  tag: Documentation
  text: En savoir plus sur l'Evaluations API
- link: /llm_observability/investigate/evaluations/external_evaluations/nemo
  tag: Documentation
  text: En savoir plus sur la soumission d'évaluations depuis NVIDIA NeMo
- link: /llm_observability/investigate/evaluations/end_user_feedback
  tag: Documentation
  text: En savoir plus sur la soumission des commentaires des utilisateurs finaux
title: Évaluations externes
---
## Présentation {#overview}

Les évaluations mesurent la qualité des réponses de votre application LLM.
Bien qu'Agent Observability fournisse quelques évaluations prêtes à l'emploi pour vos traces, vous pouvez soumettre vos propres évaluations à Agent Observability de deux manières : avec le [SDK](#submitting-evaluations-with-the-sdk) de Datadog, ou avec l'[API Agent Observability](#submitting-evaluations-with-the-api). Utilisez cette convention de nommage pour l'étiquette d'évaluation :

* Les étiquettes d'évaluation doivent commencer par une lettre.
* Les étiquettes d'évaluation ne doivent contenir que des caractères alphanumériques ASCII ou des traits de soulignement.
  * Les autres caractères, y compris les espaces, sont convertis en traits de soulignement.
  * Unicode n'est pas pris en charge.
* Les étiquettes d'évaluation ne doivent pas dépasser 200 caractères. Moins de 100 est préférable du point de vue de l'interface utilisateur.

<div class="alert alert-info">

Les étiquettes d'évaluation doivent être uniques pour une application LLM donnée (<code>ml_app</code>) et une organisation.

</div>

<div class="alert alert-info">Pour les commentaires soumis par vos utilisateurs, tels que les évaluations par pouce levé ou baissé, les modifications acceptées, les commentaires en texte libre et d'autres signaux, consultez <a href="/llm_observability/investigate/evaluations/end_user_feedback/">Commentaires des utilisateurs finaux</a>.</div>

## Soumission d'évaluations externes avec le SDK {#submitting-external-evaluations-with-the-sdk}

Le SDK Agent Observability fournit les méthodes `LLMObs.submit_evaluation()` et `LLMObs.export_span()` pour aider votre application LLM tracée à soumettre des évaluations externes à Agent Observability. Consultez la documentation du SDK [Python][3] ou [Node.js][4] pour plus de détails.

<div class="alert alert-info">Pour créer des évaluateurs réutilisables basés sur des classes avec des métadonnées de résultat enrichies, consultez le <a href="/llm_observability/investigate/evaluations/evaluation_developer_guide/">Guide du développeur d'évaluation</a>.</div>

### Exemple {#example}

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


## Soumission d'évaluations externes avec l'API {#submitting-external-evaluations-with-the-api}

Vous pouvez utiliser l'API d'évaluations fournie par Agent Observability pour envoyer à Datadog des évaluations associées à des spans, des traces ou des sessions. Consultez l'[API d'évaluations][2] pour plus de détails sur les spécifications de l'API. Pour créer des évaluateurs réutilisables, consultez le [Guide du développeur d'évaluation][5].

Pour soumettre des évaluations pour des <a href="/llm_observability/instrument/otel_instrumentation">spans OpenTelemetry</a> directement à l'API d'évaluations, vous devez inclure le <code>source:otel</code> tag dans l'évaluation. De plus, <code>span_id</code> et <code>trace_id</code> les valeurs doivent être fournies sous forme de chaînes **décimales**. Si votre instrumentation OpenTelemetry produit des identifiants hexadécimaux, convertissez-les en décimal avant de les soumettre. Par exemple, en Python : <code>str(int(hex_span_id, 16))</code>.

### Exemple {#example-1}

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

## Frameworks d'évaluation pris en charge {#supported-evaluation-frameworks}

{{< whatsnext desc="Soumettez des évaluations à partir de ces outils :" >}}
    {{< nextlink href="/llm_observability/investigate/evaluations/external_evaluations/deepeval" >}}Évaluations DeepEval{{< /nextlink >}}
    {{< nextlink href="/llm_observability/investigate/evaluations/external_evaluations/pydantic" >}}Évaluations Pydantic{{< /nextlink >}}
    {{< nextlink href="/llm_observability/investigate/evaluations/external_evaluations/nemo" >}}Évaluations NeMo{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/metrics/custom_metrics/#naming-custom-metrics
[2]: /fr/llm_observability/setup/api/?tab=model#evaluations-api
[3]: /fr/llm_observability/setup/sdk/python/#evaluations
[4]: /fr/llm_observability/setup/sdk/nodejs/#evaluations
[5]: /fr/llm_observability/investigate/evaluations/evaluation_developer_guide