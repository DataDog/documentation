---
description: Comparez des variantes d'une application LLM et mesurez leur effet avec
  les scores d'évaluation Agent Observability.
further_reading:
- link: /getting_started/feature_flags/
  tag: Documentation
  text: Prise en main de Feature Flags
- link: /llm_observability/investigate/evaluations/
  tag: Documentation
  text: Évaluations d'Agent Observability
- link: /experiments/reading_results/
  tag: Documentation
  text: Lecture des résultats d'expérience
title: Exécutez une expérience en ligne sur une application LLM.
---
{{< callout url="#" btn_hidden="true" header="Rejoignez la Preview !" >}}
Les expériences en ligne pour Agent Observability sont en Preview. Contactez votre représentant Datadog pour demander l'accès.
{{< /callout >}}

## Présentation {#overview}

Utilisez une expérience en ligne Datadog pour comparer deux versions d'une application LLM sur du trafic réel. Datadog Feature Flags attribue chaque [sujet d'expérience][13], tel qu'un utilisateur ou une exécution de workflow autonome, à une variante. Un score d'évaluation Agent Observability mesure le résultat pour chaque sujet.

Ce guide couvre la configuration spécifique aux LLM pour le workflow suivant :

1. Créez un Datadog feature flag.
1. Évaluez le feature flag dans votre application et exécutez la variante attribuée.
1. Signalez un score d'évaluation Agent Observability numérique.
1. Associez le Datadog feature flag et le score d'évaluation à une expérience Datadog.
1. Exécutez l'expérience et examinez les résultats.

{{< skill-callout
    title="Lancez une expérience en ligne avec un agent."
    text="Copy this prompt into your AI coding agent to use the `agent-observability-online-experiment` skill for guided setup."
    action_name="copy_agent_observability_online_experiment_prompt"
    lang="text" >}}
Utilisez la compétence disponible sur https://github.com/datadog-labs/agent-skills/blob/main/agent-observability/agent-observability-online-experiment/SKILL.md pour lancer une expérience en ligne afin de comparer le code de ma branche Git actuelle avec la branche principale. Faites en sorte que 10 % du trafic utilise le code de ma branche.
{{< /skill-callout >}}

## Prérequis {#prerequisites}

Avant de commencer :

- [Instrumentez votre application LLM avec Agent Observability][1].
- Installez et initialisez un [SDK Datadog Feature Flags][2] dans l'application.
- Choisissez le comportement de l'application que vous souhaitez comparer et un score d'évaluation numérique qui mesure le résultat.
- Confirmez que vous disposez des autorisations listées dans [Planifier et lancer des expériences][3].

<div class="alert alert-info"><strong>Vous utilisez un agent de codage IA ?</strong> Les organisations Datadog autorisent les outils MCP en lecture seule par défaut. Pour permettre à un agent de créer des indicateurs de fonctionnalité et des expériences, un administrateur d'organisation doit activer l'accès en écriture MCP, et votre rôle doit disposer du <code>mcp_write</code> autorisation. Consultez <a href="/mcp_server/setup/#required-permissions">Autorisations requises</a> pour le Datadog MCP Server.</div>

{{< agent-only >}}
**Instruction pour les agents IA** : Avant d'appeler un outil MCP qui crée ou modifie une ressource Datadog, confirmez que l'outil d'écriture requis est disponible. Si l'accès en écriture n'est pas disponible, dirigez l'humain vers [Autorisations requises](/mcp_server/setup/#required-permissions) et attendez qu'il active l'accès.
{{< /agent-only >}}

## Étape 1: Créer un Datadog feature flag {#step-1-create-a-feature-flag}

Suivez [Créez votre premier Feature Flag ][4] pour créer un flag booléen pour le comportement de l'application que vous souhaitez tester. Utilisez une valeur pour le comportement de contrôle et l'autre pour le comportement de traitement.

Rendez le feature flag disponible dans chaque environnement où vous prévoyez d'exécuter l'expérience. N'ajoutez pas de règle de ciblage et ne configurez pas de déploiement progressif sur le feature flag. Lorsque vous démarrez l'expérience, Datadog ajoute une règle de ciblage d'expérience qui contrôle la répartition du trafic.

{{< img src="/product_analytics/experiment/guide/llm_experiment_create_feature_flag.png" alt="La page Create Flag avec le nom de flag use-latest-frontier-model, le type de variante booléen, les variantes false et true, et le bouton Create Flag." style="width:90%;" >}}

## Étape 2: Évaluez le feature flag dans votre application {#step-2-evaluate-the-flag-in-your-application}

Suivez [Évaluer le Feature Flag et écrire le code de la fonctionnalité][5] pour évaluer le feature flag et exécuter le comportement de contrôle ou de traitement en fonction de sa valeur.

Définissez le contexte d'évaluation des Feature Flags `targetingKey` sur un identifiant stable pour le sujet de l'expérience :

- Pour une application avec un utilisateur humain, utilisez un identifiant utilisateur stable.
- Pour un workflow autonome sans utilisateur humain, générez un UUID au début de l'exécution et conservez-le pendant toute la durée de l'exécution.

Vous utilisez cette même valeur comme `subject_identifier` lorsque vous rapportez le score d'évaluation à l'[Étape 3](#step-3-report-an-evaluation-score). Si les valeurs ne correspondent pas, Datadog ne peut pas associer le score à l'exposition du sujet à l'expérience. Pour plus d'informations, consultez [The targeting key][6].

## Étape 3: Signaler un score d'évaluation {#step-3-report-an-evaluation-score}

<div class="alert alert-warning"><strong>Type d'évaluation pris en charge</strong> : Les expériences en ligne pour Agent Observability prennent uniquement en charge les évaluations avec un <code>score</code> type de métrique. Les types d'évaluation booléens, catégoriels et autres ne peuvent pas être utilisés comme métriques d'expérience.</div>

Choisissez l'une des méthodes suivantes.

### Soumettre une évaluation externe {#submit-an-external-evaluation}

Suivez [External Evaluations][7] pour soumettre une évaluation à partir de votre code d'application. Ajoutez un tag `subject_identifier` dont la valeur correspond exactement à la `targetingKey` utilisée pour évaluer le feature flag :

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

score = 0.42
subject_key = "82a4e675-9cb4-4da6-a91a-819574152a63"
span_context = LLMObs.export_span(span=None)

LLMObs.submit_evaluation(
    span=span_context,
    ml_app="<ML_APP>",
    label="<EVALUATION_NAME>",
    metric_type="score",
    value=score,
    tags={
        "subject_identifier": subject_key,
    },
    assessment="pass" if score > 0.5 else "fail",
)
{{< /code-block >}}

### Utilisez une évaluation gérée {#use-a-managed-evaluation}

Suivez [Managed Evaluations][8] pour créer et publier une évaluation. Sur le span évalué par l'évaluation gérée, ajoutez un tag `subject_identifier` dont la valeur correspond exactement à la `targetingKey` utilisée pour évaluer le feature flag :

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

subject_key = "82a4e675-9cb4-4da6-a91a-819574152a63"

with LLMObs.workflow(name="my_workflow") as span:
    LLMObs.annotate(
        span=span,
        tags={"subject_identifier": subject_key},
    )
    # Run the rest of the instrumented workflow.
{{< /code-block >}}

## Étape 4: Créer et lancer l'expérience {#step-4-create-and-launch-the-experiment}

Suivez [Plan and Launch Experiments][3] pour créer et démarrer l'expérience :

1. Sélectionnez le score d'évaluation Agent Observability de la section [Étape 3](#step-3-report-an-evaluation-score) comme métrique principale. Si vous n'avez pas créé la métrique de l'expérience, suivez [Créer une métrique à partir des données d'Agent Observability][11].
1. Ajoutez le Datadog feature flag de la section [Étape 1](#step-1-create-a-feature-flag).
1. Configurez la répartition du trafic entre les variantes de contrôle et de traitement.
1. Démarrez l'expérience.

{{< agent-only >}}
**Instruction pour les agents IA** : Après avoir créé le brouillon de l'expérience, incluez l'URL complète de l'expérience renvoyée par Datadog dans votre réponse finale. L'humain qui exécute l'agent a besoin de ce lien pour ouvrir l'expérience, examiner sa configuration et configurer la répartition du trafic dans l'interface utilisateur de Datadog.
{{< /agent-only >}}

Le démarrage de l'expérience ajoute la règle de ciblage de l'expérience au feature flag sélectionné et commence à enregistrer les expositions. Pour plus de détails sur la façon dont les attributions de feature flags deviennent des expositions d'expérience, consultez [Feature Flags and Experiments][9].

{{< img src="/product_analytics/experiment/guide/llm_experiment_create_experiment.png" alt="La boîte de dialogue Create new draft experiment avec le nom latest-frontier-model-experiment, le protocole Start from scratch et le bouton Create Draft Experiment." style="width:90%;" >}}

## Étape 5: Exécutez l'expérience et examinez les résultats {#step-5-run-the-experiment-and-review-results}

Envoyez du trafic via l'application. Pour chaque sujet, l'application doit évaluer le feature flag et signaler un score d'évaluation avec le même identifiant de sujet.

À mesure que les expositions et les scores d'évaluation arrivent, Datadog remplit les résultats de l'expérience. Suivez [Reading Experiment Results][10] pour interpréter la fiche de score des métriques et comparer les variantes.

Si l'expérience signale des données de métrique manquantes, confirmez que :

- L'application a évalué le feature flag de l'expérience pour le sujet.
- L'évaluation a une valeur `score` numérique.
- Le `subject_identifier` de l'évaluation correspond exactement au `targetingKey` de l'évaluation du feature flag.

{{< img src="/product_analytics/experiment/guide/llm_experiment_results.png" alt="Une expérience d'application LLM terminée montrant la décision de déploiement et l'amélioration relative pour les métriques de qualité, d'utilisation des jetons et de coût estimé entre les variantes de contrôle et de traitement." style="width:90%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/llm_observability/instrument/
[2]: /fr/getting_started/feature_flags/#feature-flags-sdks
[3]: /fr/experiments/plan_and_launch_experiments/
[4]: /fr/getting_started/feature_flags/#step-2-create-a-feature-flag
[5]: /fr/getting_started/feature_flags/#step-3-evaluate-the-flag-and-write-feature-code
[6]: /fr/feature_flags/concepts/evaluation_context/#the-targeting-key
[7]: /fr/llm_observability/investigate/evaluations/external_evaluations/
[8]: /fr/llm_observability/investigate/evaluations/managed_evaluations/
[9]: /fr/feature_flags/concepts/experiments/
[10]: /fr/experiments/reading_results/
[11]: /fr/experiments/defining_metrics/?tab=agentobservability#create-a-metric-from-agent-observability-data
[13]: /fr/experiments/concepts/subject_types/