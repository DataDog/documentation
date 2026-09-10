---
aliases:
- /fr/llm_observability/evaluations/ootb_evaluations
- /fr/llm_observability/configure/evaluations/ootb_evaluations
- /fr/llm_observability/evaluations/managed_evaluations/
- /fr/llm_observability/configure/evaluations/managed_evaluations/
description: Apprenez à configurer des évaluations gérées pour vos applications LLM.
further_reading:
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: Blog
  text: Obtenez une visibilité sur les workflows des Agents Strands avec Datadog LLM
    Observability.
- link: /llm_observability/quickstart/terms/
  tag: Documentation
  text: En savoir plus sur les termes et concepts d'Agent Observability.
- link: /llm_observability/setup
  tag: Documentation
  text: Apprenez à configurer Agent Observability.
title: Évaluations gérées
---
## Présentation {#overview}

Les évaluations gérées sont des outils intégrés pour évaluer votre application LLM. Agent Observability associe les évaluations à des spans individuels.
spans individuels afin que vous puissiez voir les entrées et les sorties qui ont conduit à une évaluation spécifique.

En savoir plus sur les [exigences de compatibilité][2].

## Créer de nouvelles évaluations {#create-new-evaluations}

1. Accédez à [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Evaluations{{< /ui >}}][1].
1. Cliquez sur le bouton {{< ui >}}Create Evaluation{{< /ui >}} dans le coin supérieur droit.
1. Sélectionnez une évaluation gérée spécifique. Cela ouvrira la fenêtre de l'éditeur d'évaluation.

Après avoir cliqué sur {{< ui >}}Save and Publish{{< /ui >}}, l'évaluation est mise en ligne. Alternativement, vous pouvez {{< ui >}}Save as Draft{{< /ui >}} et les modifier ou les activer plus tard.

## Modifier les évaluations existantes {#edit-existing-evaluations}

1. Accédez à [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Evaluations{{< /ui >}}][1].
1. Survolez l'évaluation que vous souhaitez modifier et cliquez sur le bouton {{< ui >}}Edit{{< /ui >}}.

### Évaluations gérées prises en charge {#supported-managed-evaluations}

- [Inadéquation linguistique][3] - Signale les réponses rédigées dans une langue différente de celle de l'entrée de l'utilisateur
- [Analyse des données sensibles][4] - Signale la présence d'informations sensibles ou réglementées dans les entrées ou sorties du modèle


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/evaluations
[2]: /fr/llm_observability/investigate/evaluations/compatibility
[3]: /fr/llm_observability/investigate/evaluations/language_mismatch
[4]: /fr/llm_observability/investigate/evaluations/managed_evaluations/security_and_safety_evaluations