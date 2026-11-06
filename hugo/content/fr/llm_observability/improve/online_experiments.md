---
aliases:
- /fr/experiments/guide/run_online_experiment_on_llm_application/
description: Comparez des variantes d'une application LLM sur du trafic en direct
  et mesurez leur effet avec les évaluations Agent Observability.
further_reading:
- link: /llm_observability/improve/offline_experiments
  tag: Documentation
  text: Agent Observability Offline Experiments
- link: /llm_observability/investigate/evaluations/
  tag: Documentation
  text: Évaluations d'Agent Observability
- link: /getting_started/feature_flags/
  tag: Documentation
  text: Prise en main de Feature Flags
- link: /experiments/reading_results/
  tag: Documentation
  text: Lecture des résultats d'expérience
title: Online Experiments
---
## Présentation {#overview}

Online Experiments compare plusieurs versions d'une application ou d'un agent LLM sur du trafic de production en direct. Datadog Feature Flags attribue chaque [sujet d'expérience][2], tel qu'un utilisateur ou une exécution de workflow autonome, à une variante de contrôle ou de traitement. Une évaluation Agent Observability mesure le résultat pour chaque sujet, et [Datadog Experiments][1] détermine si la différence entre les variantes est statistiquement significative.

Utilisez Online Experiments pour valider un changement, tel qu'un nouveau modèle, un nouveau prompt ou un nouvel outil, auprès d'utilisateurs réels après l'avoir testé hors ligne.

La configuration d'une expérience en ligne implique les étapes suivantes :

1. Créez un [feature flag Datadog][14].
1. Évaluez le feature flag dans votre application et exécutez la variante attribuée.
1. Transmettez une évaluation Agent Observability.
1. Associez le feature flag et l'évaluation à une expérience Datadog.
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

- [Instrumentez votre application LLM avec Agent Observability][3].
- Installez et initialisez un [SDK Datadog Feature Flags][4] dans l'application.
- Choisissez le comportement de l'application que vous souhaitez comparer et une évaluation qui mesure le résultat. L'évaluation doit renvoyer un score numérique ou un verdict de réussite ou d'échec.
- Confirmez que vous disposez des autorisations répertoriées dans [Planifier et lancer des expériences][5].

<div class="alert alert-info"><strong>Vous utilisez un agent de codage IA ?</strong> Les organisations Datadog autorisent les <a href="/llm_observability/build_with_ai/mcp_server/">outils MCP</a> en lecture seule par défaut. Pour permettre à un agent de créer des indicateurs de fonctionnalité et des expériences, un administrateur d'organisation doit activer l'accès en écriture MCP, et votre rôle doit disposer du <code>mcp_write</code> autorisation. Consultez <a href="/mcp_server/setup/#required-permissions">Autorisations requises</a> pour le Datadog MCP Server.</div>

{{< agent-only >}}
**Instruction pour les agents IA** : Avant d'appeler un outil MCP qui crée ou modifie une ressource Datadog, confirmez que l'outil d'écriture requis est disponible. Si l'accès en écriture n'est pas disponible, dirigez l'humain vers [Autorisations requises](/mcp_server/setup/#required-permissions) et attendez qu'il active l'accès.
{{< /agent-only >}}

## Étape 1: Créer un Datadog feature flag {#step-1-create-a-feature-flag}

Suivez [Créez votre premier feature flag][6] pour créer un feature flag booléen pour le comportement de l'application que vous souhaitez tester. Utilisez une valeur pour le comportement de contrôle et l'autre pour le comportement de traitement.

Rendez le feature flag disponible dans chaque environnement où vous prévoyez d'exécuter l'expérience. N'ajoutez pas de règle de ciblage et ne configurez pas de déploiement progressif sur le feature flag. Lorsque vous démarrez l'expérience, Datadog ajoute une règle de ciblage d'expérience qui contrôle la répartition du trafic.

{{< img src="/product_analytics/experiment/guide/llm_experiment_create_feature_flag.png" alt="La page Create Flag avec le nom de flag use-latest-frontier-model, le type de variante booléen, les variantes false et true, et le bouton Create Flag." style="width:90%;" >}}

## Étape 2: Évaluez le feature flag dans votre application {#step-2-evaluate-the-flag-in-your-application}

Suivez [Évaluez le feature flag et écrivez le code de la fonctionnalité][7] pour évaluer le feature flag et exécuter le comportement de contrôle ou de traitement en fonction de sa valeur.

Définissez le contexte d'évaluation des Feature Flags `targetingKey` sur un identifiant stable pour le sujet de l'expérience :

- Pour une application avec un utilisateur humain, utilisez un identifiant utilisateur stable.
- Pour un workflow autonome sans utilisateur humain, générez un UUID au début de l'exécution et conservez-le pendant toute la durée de l'exécution.

Vous utilisez cette même valeur comme `subject_identifier` lorsque vous transmettez l'évaluation à l'[étape 3](#step-3-report-an-evaluation). Si les valeurs ne correspondent pas, Datadog ne peut pas associer l'évaluation à l'exposition du sujet à l'expérience. Pour plus d'informations, consultez [La clé de ciblage][8].

## Étape 3 : Transmettre une évaluation {#step-3-report-an-evaluation}

<div class="alert alert-warning"><strong>Types d'évaluation pris en charge</strong> : les métriques d'expérience peuvent utiliser la moyenne d'une <code>score</code> évaluation, ou le <strong>taux de réussite</strong> de toute évaluation qui renvoie un verdict de réussite ou d'échec. Le taux de réussite comptabilise <code>pass</code> comme 1 et <code>fail</code> comme 0, et exclut les évaluations sans appréciation. Les valeurs booléennes et catégorielles brutes ne peuvent pas être utilisées directement comme métriques d'expérience.</div>

Choisissez l'une des méthodes suivantes.

### Soumettre une évaluation externe {#submit-an-external-evaluation}

Suivez [External Evaluations][9] pour soumettre une évaluation à partir du code de votre application. Ajoutez un tag `subject_identifier` dont la valeur correspond exactement à la `targetingKey` utilisée pour évaluer le feature flag :

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

Suivez [Managed Evaluations][10] pour créer et publier une évaluation. Sur le span évalué par l'évaluation gérée, ajoutez un tag `subject_identifier` dont la valeur correspond exactement à la `targetingKey` utilisée pour évaluer le feature flag :

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

Pour les évaluations au niveau de la trace, ajoutez le tag au span racine de la trace. Les évaluations au niveau de la session ne prennent pas en charge les métriques d'expérience.

## Étape 4: Créer et lancer l'expérience {#step-4-create-and-launch-the-experiment}

Suivez [Planifier et lancer des expériences][5] pour créer et démarrer l'expérience :

1. Sélectionnez une métrique basée sur l'évaluation Agent Observability de [l'étape 3](#step-3-report-an-evaluation) comme métrique principale. Si vous n'avez pas créé la métrique d'expérience, suivez [Créer une métrique à partir des données Agent Observability][13].
1. Ajoutez le feature flag de [l'étape 1](#step-1-create-a-feature-flag).
1. Configurez la répartition du trafic entre les variantes de contrôle et de traitement.
1. Démarrez l'expérience.

{{< agent-only >}}
**Instruction pour les agents IA** : Après avoir créé le brouillon de l'expérience, incluez l'URL complète de l'expérience renvoyée par Datadog dans votre réponse finale. L'humain qui exécute l'agent a besoin de ce lien pour ouvrir l'expérience, examiner sa configuration et configurer la répartition du trafic dans l'interface utilisateur de Datadog.
{{< /agent-only >}}

Le démarrage de l'expérience ajoute la règle de ciblage de l'expérience au feature flag sélectionné et commence à enregistrer les expositions. Pour plus de détails sur la façon dont les attributions de feature flags deviennent des expositions à l'expérience, consultez [Feature Flags and Experiments][11].

{{< img src="/product_analytics/experiment/guide/llm_experiment_create_experiment.png" alt="La boîte de dialogue Create new draft experiment avec le nom latest-frontier-model-experiment, le protocole Start from scratch et le bouton Create Draft Experiment." style="width:90%;" >}}

## Étape 5: Exécutez l'expérience et examinez les résultats {#step-5-run-the-experiment-and-review-results}

Envoyez du trafic via l'application. Pour chaque sujet, l'application doit évaluer le feature flag et transmettre une évaluation avec le même identifiant de sujet.

À mesure que les expositions et les évaluations arrivent, Datadog renseigne les résultats de l'expérience. Suivez [Interpréter les résultats d'une expérience][12] pour interpréter la fiche d'évaluation des métriques et comparer les variantes.

{{< img src="/product_analytics/experiment/guide/llm_experiment_results.png" alt="Une expérience d'application LLM terminée montrant la décision de déploiement et l'amélioration relative pour les métriques de qualité, d'utilisation des jetons et de coût estimé entre les variantes de contrôle et de traitement." style="width:90%;" >}}

## Dépannage {#troubleshooting}

Si l'expérience signale des données de métrique manquantes, confirmez que :

- L'application a évalué le feature flag de l'expérience pour le sujet.
- L'évaluation a une valeur `score` numérique ou une appréciation `pass` ou `fail`.
- Le `subject_identifier` de l'évaluation correspond exactement au `targetingKey` de l'évaluation du feature flag.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/experiments/
[2]: /fr/experiments/concepts/subject_types/
[3]: /fr/llm_observability/instrument/
[4]: /fr/getting_started/feature_flags/#feature-flags-sdks
[5]: /fr/experiments/plan_and_launch_experiments/
[6]: /fr/getting_started/feature_flags/#step-2-create-a-feature-flag
[7]: /fr/getting_started/feature_flags/#step-3-evaluate-the-flag-and-write-feature-code
[8]: /fr/feature_flags/concepts/evaluation_context/#the-targeting-key
[9]: /fr/llm_observability/investigate/evaluations/external_evaluations/
[10]: /fr/llm_observability/investigate/evaluations/managed_evaluations/
[11]: /fr/feature_flags/concepts/experiments/
[12]: /fr/experiments/reading_results/
[13]: /fr/experiments/defining_metrics/?tab=agentobservability#create-a-metric-from-agent-observability-data
[14]: /fr/feature_flags/