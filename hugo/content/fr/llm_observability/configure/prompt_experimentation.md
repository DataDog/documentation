---
aliases:
- /fr/llm_observability/monitoring/prompt_experimentation/
description: Comparez les versions de prompts gérées avec des tests A/B et déployez
  des versions avec des déploiements progressifs sécurisés.
further_reading:
- link: /llm_observability/configure/prompt_management
  tag: Documentation
  text: Gestion des prompts
- link: /experiments/defining_metrics/
  tag: Documentation
  text: Créez des métriques d'expérimentation
- link: /experiments/reading_results/
  tag: Documentation
  text: Lire les résultats d'expérience
title: Prompt Experimentation
---
## Présentation {#overview}

Testez une modification de prompt sur le trafic réel avant de la définir par défaut. Utilisez un **test A/B** pour comparer des versions par rapport à un résultat, tel que la conversion de paiement. Utilisez un **déploiement progressif sécurisé** pour introduire une version progressivement et faire une pause si Datadog détecte une régression.

<div class="alert alert-info"><strong>Avant-première :</strong> Prompt Experimentation est disponible en avant-première. Pour demander l'accès, contactez le <a href="https://www.datadoghq.com/support/">support Datadog</a> ou votre Customer Success Manager. Vous pouvez demander l'accès aux tests A/B et aux déploiements progressifs sécurisés indépendamment.</div>

- **Quel prompt est le plus performant ?** [Exécutez un test A/B](#run-an-ab-test).
- **Comment introduire un changement progressivement ?** [Utilisez un déploiement progressif sécurisé](#use-a-guarded-rollout).

## Avant de commencer {#before-you-begin}

Vous avez besoin d'un prompt géré avec au moins deux versions, une version déployée dans l'environnement que vous souhaitez utiliser, et une [métrique d'expérience][2] qui mesure votre résultat. Vérifiez les [autorisations](#permissions) de votre workflow.

**Autorisations :** Les tests A/B nécessitent des autorisations dans Product Analytics et Feature Flags, en plus de LLM Observability. L'accès en avant-première ne donne pas ces autorisations. Demandez à votre administrateur Datadog de vérifier votre rôle avant de commencer.

**Première fois ?** Effectuez la [configuration initiale de l'application](#set-up-your-application) avant de commencer l'un ou l'autre des workflows. Cela nécessite Python `ddtrace[openfeature]` 4.15.0 ou une version ultérieure, un Datadog Agent accessible et des identifiants utilisateur correspondants dans les requêtes de prompt et les événements de résultat. Le mode Agentless n'est pas pris en charge.

## Exécutez un test A/B {#run-an-ab-test}

Par exemple, comparez deux versions d'un assistant de paiement pour voir laquelle produit un taux de conversion de paiement plus élevé.

1. Ouvrez le prompt et cliquez sur {{< ui >}}Set up A/B test{{< /ui >}}.
1. Sélectionnez un environnement et cliquez sur {{< ui >}}Create draft & continue{{< /ui >}}. Cela ouvre le test dans Product Analytics. La création d'un brouillon ne modifie pas le trafic en direct.
1. Choisissez les versions du prompt, l'audience, la répartition du trafic et {{< ui >}}Primary metric{{< /ui >}}. Sous {{< ui >}}Calculate metrics by{{< /ui >}}, choisissez le type de sujet qui correspond à `targeting_key` de votre application — par exemple, **User** lorsque vous transmettez un identifiant utilisateur.
1. Démarrez le test. Vérifiez {{< ui >}}Flag & Exposures{{< /ui >}} pour confirmer qu'il reçoit des attributions, puis [comparez les résultats][12].

Revenez à {{< ui >}}A/B tests using this prompt{{< /ui >}} sur la page du prompt pour ouvrir les résultats ou terminer un brouillon. Configurez et concluez le test dans Product Analytics ; consultez [Planifier et lancer des expériences][11] pour des instructions détaillées.

{{< img src="llm_observability/monitoring/prompt-ab-tests.png" alt="Tests A/B utilisant un prompt, montrant un test en cours comparant des réponses concises et détaillées, ses versions, sa métrique principale et son audience, ainsi qu'un brouillon avec un bouton Terminer la configuration." style="width:100%;" >}}

**Le choix d'un gagnant ne le déploie pas automatiquement.** Concluez le test, puis revenez au prompt et déployez la version que vous choisissez. Les utilisateurs en dehors de l'audience du test continuent de suivre les autres règles de service de l'environnement.

## Utilisez un déploiement progressif sécurisé {#use-a-guarded-rollout}

Par exemple, introduisez un assistant de paiement mis à jour tout en surveillant la conversion de paiement. La version déployée est la **référence** ; la nouvelle version est le **candidat**. Si l'environnement n'a aucune version déployée, déployez-en une immédiatement pour établir une référence.

1. Ouvrez la version candidate et cliquez sur {{< ui >}}Deploy Version{{< /ui >}}.
1. Sélectionnez l'environnement dans {{< ui >}}Deploy to{{< /ui >}}.
1. Développez {{< ui >}}Deployment strategy{{< /ui >}}, choisissez {{< ui >}}Guarded rollout{{< /ui >}} et sélectionnez un {{< ui >}}Guardrail metric{{< /ui >}}.
1. Utilisez {{< ui >}}Inspect metric{{< /ui >}} pour vérifier sa définition et confirmer si des valeurs plus élevées ou plus faibles sont préférables.
1. Examinez la modification proposée et cliquez sur {{< ui >}}Deploy Version{{< /ui >}} pour lancer le déploiement.

{{< img src="llm_observability/monitoring/prompt-guarded-rollout-setup.png" alt="Déployez la boîte de dialogue de la version 3 avec Production sélectionné, déploiement progressif sécurisé activé, et Taux de finalisation de commande sélectionné comme métrique de garde-fou, avec un lien de métrique Inspect." style="width:80%;" >}}

### Suivez sa progression {#follow-its-progress}

Ouvrez {{< ui >}}Active rollouts{{< /ui >}} sur la page du prompt pour suivre l'exposition de la version candidate. L'exposition augmente automatiquement pendant que le déploiement est en cours. Utilisez {{< ui >}}Pause{{< /ui >}} pour maintenir la répartition actuelle et {{< ui >}}Resume{{< /ui >}} pour continuer.

Si un garde-fou détecte une régression, le déploiement se met en pause sous {{< ui >}}Needs attention{{< /ui >}}. Ouvrez la métrique pour enquêter, puis choisissez :

- {{< ui >}}Resume anyway{{< /ui >}} pour continuer à exposer le candidat.
- {{< ui >}}Stop{{< /ui >}} pour mettre fin au déploiement et rétablir le trafic éligible vers la référence.

**Une pause ne revient pas en arrière sur le candidat :** la répartition actuelle du trafic reste en place jusqu'à ce que vous interveniez. L'arrêt n'affecte que le déploiement de cet environnement, pas les autres environnements ou les tests A/B. Pour recommencer après un arrêt, déployez à nouveau une version.

{{< img src="llm_observability/monitoring/prompt-guarded-rollout-paused.png" alt="Une page du prompt affichant un déploiement en préproduction sous Nécessite une attention, en pause à 25 pour cent d'exposition à la version 2, avec la métrique Taux de finalisation de commande et les actions Reprendre quand même et Arrêter." style="width:100%;" >}}

Lorsque le déploiement se termine, la version candidate reçoit tout le trafic éligible pour ce déploiement et disparaît de {{< ui >}}Active rollouts{{< /ui >}}. D'autres règles de ciblage peuvent toujours servir différentes versions.

<div class="alert alert-warning">Les garde-fous dépendent des données de résultat disponibles. Des données éparses, manquantes ou non appariées peuvent ne pas déclencher de pause. Atteindre une exposition complète ne prouve pas que le candidat est meilleur ou sûr.</div>

## Configurez votre application {#set-up-your-application}

Effectuez cette configuration une fois pour l'un ou l'autre workflow. Si votre application envoie déjà des affectations de prompt et des résultats correspondants, accédez directement aux [tests A/B](#run-an-ab-test) ou aux [déploiements progressifs sécurisés](#use-a-guarded-rollout).

### Connectez l'application {#connect-the-application}

1. Terminez les [prérequis][5] de gestion des prompts.
1. Installez le SDK Python pris en charge : `pip install --upgrade "ddtrace[openfeature]>=4.15.0"`.
1. Définissez `DD_ENV` sur l'environnement que vous souhaitez utiliser.
1. Assurez-vous que l'application peut atteindre un [Datadog Agent][14]. Prompt Experimentation envoie les données d'affectation via l'Agent ; n'activez pas le mode Agentless (`DD_LLMOBS_AGENTLESS_ENABLED=1`).

### Faites correspondre les demandes de prompt aux résultats {#match-prompt-requests-to-outcomes}

Utilisez le même ID utilisateur lors de la récupération du prompt et de l'enregistrement du résultat. Cela permet à Datadog de connecter le résultat d'un utilisateur à la version du prompt qu'il a reçue.

```python
from ddtrace.llmobs import LLMObs

prompt = LLMObs.get_prompt(
    "checkout-assistant",
    targeting_key=str(current_user.id),
    fallback="You are a helpful checkout assistant.",
)
```

Utilisez une chaîne stable et non vide pour `targeting_key`. Ne transmettez pas un `version` exact : cela contourne l'affectation d'environnement et n'enregistre pas d'exposition à l'expérience.

Par exemple, si votre métrique de paiement utilise des événements RUM et le type de sujet **User**, identifiez l'utilisateur du navigateur avec le même ID :

```javascript
datadogRum.setUser({
  id: String(currentUser.id),
})
```

RUM n'est nécessaire que lorsqu'il fournit le résultat que vous avez choisi. Pour d'autres sources de résultats, ou pour comparer des organisations plutôt que des utilisateurs, configurez le [type de sujet][7] correspondant. Les résultats doivent se produire après la première exposition de l'utilisateur à la version du prompt pour lui être attribués.

### Choisissez une métrique de résultat {#choose-an-outcome-metric}

Créez ou sélectionnez une [métrique d'expérience][2] sous [{{< ui >}}Product Analytics{{< /ui >}} > {{< ui >}}Experiments{{< /ui >}} > {{< ui >}}Metrics{{< /ui >}}][8]. Les métriques et les monitors du Metrics Explorer ne sont pas sélectionnables ici.

Par exemple, pour une métrique de conversion de paiement, définissez {{< ui >}}Desired metric direction{{< /ui >}} sur {{< ui >}}Higher is better{{< /ui >}}. Assurez-vous que les événements de résultat utilisent le même identifiant utilisateur que la demande de prompt. Confirmez que les événements de résultat arrivent avant de vous fier à la métrique pour comparer des versions ou suspendre un déploiement progressif.

{{< agent-only >}}
**Remarque pour les agents IA :** Utilisez l'identifiant de sujet stable existant de l'application comme chaîne pour `targeting_key`, en faisant correspondre le sujet de l'expérience. Demandez si l'identité ou la source du résultat n'est pas claire. N'installez pas RUM à moins que le résultat n'utilise RUM. Préservez le comportement existant en matière de repli, de variables de prompt, de fournisseur, de modèle et d'application. Ne demandez pas une version de prompt exacte. La création ou la modification de métriques, le lancement d'expériences, le déploiement de versions et le contrôle des déploiements progressifs nécessitent une demande explicite de l'utilisateur ; lorsqu'il vous est seulement demandé de préparer du code, indiquez les étapes restantes dans l'interface utilisateur de Datadog.
{{< /agent-only >}}

## Autorisations {#permissions}

En plus des [prérequis de gestion des prompts][5], votre rôle nécessite :

| Action | Autorisation requise |
|--------|---------------------|
| Configurer un test A/B à partir d'un prompt | Product Analytics Experiments Write |
| Démarrer un déploiement progressif sécurisé | LLM Observability Write et Feature Flags Environment Config Read |
| Suspendre ou reprendre un déploiement progressif sécurisé | Feature Flags Config Write |
| Arrêter un déploiement progressif sécurisé | LLM Observability Read and Write |

Pour configurer et lancer un test A/B dans Product Analytics, consultez les [autorisations Product Analytics][3] et les [autorisations Feature Flags][6]. Si votre environnement nécessite des approbations, demandez une approbation dans Feature Flags avant de modifier le trafic en direct.

## Dépannage {#troubleshooting}

### Je ne peux pas démarrer un test ou un déploiement {#i-cannot-start-a-test-or-rollout}

- **Des contrôles sont manquants ou désactivés :** confirmez l'accès au Preview pertinent et aux [autorisations requises](#permissions). La configuration A/B nécessite également deux versions de prompt et un environnement activé dont la configuration de service peut être chargée.
- **Un déploiement progressif sécurisé est rejeté :** établissez d'abord une base de référence. Résolvez le conflit affiché pour l'environnement, tel qu'une expérience active pour tous les utilisateurs ou une substitution de version forcée, avant de réessayer.
- **Vous pouvez créer un brouillon mais ne pouvez pas configurer ou lancer le test :** vérifiez vos [autorisations Product Analytics][3] et [autorisations Feature Flags][6] auprès de votre administrateur Datadog, ainsi que toute approbation d'environnement requise. Confirmez que le test dispose d'une métrique principale sélectionnée.

### Je ne vois pas d'assignations ou de résultats {#i-do-not-see-assignments-or-results}

- **Seul le repli est renvoyé, ou des assignations sont manquantes :** vérifiez l'installation du SDK, `DD_ENV`, la connectivité de l'Agent, et que la récupération ne spécifie pas `version`.
- **Des résultats sont manquants :** vérifiez la correspondance des identifiants de sujet, le périmètre de la métrique, et que les événements se produisent après l'exposition. Laissez suffisamment de données s'accumuler ; consultez [Diagnostics d'expérience][13].

### Je ne peux pas contrôler ou inspecter un déploiement {#i-cannot-control-or-inspect-a-rollout}

- **Pause, Resume, or Stop est indisponible :** vérifiez les [autorisations](#permissions). Stop nécessite des autorisations différentes de celles de Pause et Resume.
- **Le statut ne peut pas être chargé :** actualisez, puis vérifiez l'erreur signalée ou contactez le support Datadog. Un statut indisponible ne signifie pas que le déploiement est arrêté.

### Je déploie à nouveau ou vers plusieurs environnements {#i-am-deploying-again-or-to-several-environments}

Examinez la stratégie de déploiement de chaque environnement : les paramètres enregistrés et protégés peuvent déjà être sélectionnés. Basculement immédiat des environnements sans déploiement progressif. Le déploiement d'une autre version peut remplacer un déploiement progressif actif ; examinez l'avertissement de remplacement avant de confirmer.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /fr/experiments/defining_metrics/
[3]: /fr/account_management/rbac/permissions/#product-analytics
[5]: /fr/llm_observability/configure/prompt_management/#prerequisites
[6]: /fr/account_management/rbac/permissions/#feature-flags
[7]: /fr/experiments/concepts/subject_types/
[8]: https://app.datadoghq.com/product-analytics/experimentation-metrics
[11]: /fr/experiments/plan_and_launch_experiments/
[12]: /fr/experiments/reading_results/
[13]: /fr/experiments/diagnostics/
[14]: /fr/getting_started/agent/