---
aliases:
- /fr/llm_observability/evaluations/end_user_feedback/
- /fr/llm_observability/configure/evaluations/end_user_feedback/
description: Soumettez le feedback des utilisateurs finaux à Agent Observability et
  associez-le à des spans, des traces, des sessions ou des entités externes.
further_reading:
- link: /llm_observability/instrument/api/#evaluations-api
  tag: Documentation
  text: En savoir plus sur l'Evaluations API
- link: /llm_observability/investigate/evaluations/external_evaluations
  tag: Documentation
  text: En savoir plus sur la soumission d'évaluations externes
- link: /llm_observability/investigate/annotation_queues
  tag: Documentation
  text: En savoir plus sur Annotation Queues
- link: https://www.datadoghq.com/blog/debug-and-evaluate-your-ai-app-from-your-coding-agent/
  tag: Blog
  text: Déboguez et évaluez votre application d'IA depuis votre agent de codage avec
    Datadog Agent Observability
title: Feedback des utilisateurs finaux
---
## Présentation {#overview}

Le feedback des utilisateurs finaux capture les entrées des utilisateurs de votre application LLM dans Agent Observability. Les exemples incluent des évaluations par pouce levé ou baissé, l'acceptation ou non par un utilisateur d'une modification apportée par un agent, et des commentaires en texte libre sur une réponse.

Le feedback est différent d'une évaluation. Utilisez le feedback pour les signaux soumis par un utilisateur final. Utilisez [external evaluations][1] pour les résultats produits par votre propre logique d'évaluation, lorsque l'identité de la personne ayant soumis l'évaluation n'est pas pertinente. Utilisez [Annotation Queues][2] pour les workflows de révision structurés gérés par votre équipe.

Le feedback soumis apparaît lors de la consultation des sessions, des traces ou des spans d'Agent Observability.

## Soumettez le feedback {#submit-feedback}

Soumettez le feedback avec [Evaluations API][3] en définissant `event_kind` sur `feedback`.

Les événements de feedback nécessitent:

- `event_kind: "feedback"`
- `submitter.id`, qui identifie l'utilisateur ou l'agent ayant soumis le feedback
- Exactement un champ cible : `span_id`, `trace_id`, `session_id` ou `feedback_join_key`
- Un champ de valeur qui correspond à `metric_type`

Les événements de feedback ne doivent pas inclure `join_on`. Si `eval_scope` est omis, Datadog le déduit du champ cible. Si `eval_scope` est fourni, il doit correspondre à la cible sélectionnée.

### Feedback cible {#target-feedback}

| Cible | Champ | Utiliser lorsque |
|--------|-------|----------|
| Span | `span_id` | Le feedback s'applique à un seul span. |
| Trace | `trace_id` | Le feedback s'applique à une trace entière. |
| Session | `session_id` | Le feedback s'applique à une session entière. |
| Entité externe | `feedback_join_key` | Le feedback s'applique à une entité définie par le client, telle qu'un ID d'incident, un ID de rapport, un ID de tâche ou un ID de check de version. |

### Utilisez une clé de jointure de feedback {#use-a-feedback-join-key}

Utilisez `feedback_join_key` lorsque le feedback n'est pas lié à un seul span, une seule trace ou une seule session. Tout d'abord, enrichissez vos spans avec le tag `feedback_join_key` lié à l'entité externe en utilisant le workflow [Enriching spans][4] du SDK ou l'[Spans API][5]. Ensuite, soumettez le feedback avec le même `feedback_join_key`.

## Exemples {#examples}

### Soumettez le feedback « pouce vers le bas » pour un span {#submit-thumbs-down-feedback-for-a-span}

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

### Soumettez un feedback en texte libre avec une clé de jointure de feedback {#submit-free-text-feedback-with-a-feedback-join-key}

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

## Analysez le feedback {#analyze-feedback}

Pour créer un widget de dashboard pour le feedback, créez le widget comme vous le feriez pour une évaluation et sélectionnez la source de données dédiée **Feedback**. Pour rechercher et filtrer les spans et les traces par feedback dans le Trace Explorer, consultez [Requêtes de feedback][6].

{{< img src="llm_observability/evaluations/feedback_widget_query.png" alt="L'éditeur de widget Datadog avec la source de données Feedback sélectionnée, affichant un décompte de tous les feedback." style="width:100%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/llm_observability/investigate/evaluations/external_evaluations
[2]: /fr/llm_observability/investigate/annotation_queues
[3]: /fr/llm_observability/instrument/api/#evaluations-api
[4]: /fr/llm_observability/instrument/sdk/?tab=python#enriching-spans
[5]: /fr/llm_observability/instrument/api/?tab=model#spans-api
[6]: /fr/llm_observability/investigate/querying/#feedback-queries