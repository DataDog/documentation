---
description: Connectez des agents IA à vos données de CI Visibility, de Test Optimization
  et de Deployment Gates à l'aide du Datadog MCP Server.
further_reading:
- link: mcp_server/setup
  tag: Documentation
  text: Configuration du Datadog MCP Server
- link: continuous_integration/
  tag: Documentation
  text: CI Visibility
- link: tests/
  tag: Documentation
  text: Test Optimization
- link: deployment_gates/
  tag: Documentation
  text: Portes de déploiement
- link: https://www.datadoghq.com/blog/datadog-remote-mcp-server/
  tag: Blog
  text: Connectez vos agents IA aux outils et au contexte Datadog à l'aide du Datadog
    MCP Server
title: Prise en main des outils MCP de Software Delivery
---
## Présentation {#overview}

Le [Datadog MCP Server][1] permet aux agents IA d'accéder à vos données de Software Delivery via le [Model Context Protocol (MCP)][2]. Le jeu d'outils `software-delivery` fournit des outils pour interagir avec [CI Visibility][3], [Test Optimization][4], [Code Coverage][8], [DORA Metrics][9] et [Deployment Gates][10] directement depuis des clients basés sur l'IA comme Cursor, Claude Code ou OpenAI Codex.

## Cas d'utilisation {#use-cases}

Les outils MCP de Software Delivery débloquent des workflows assistés par l'IA pour :

- **Déboguer les échecs de pipeline**: Demandez à votre agent IA de trouver les échecs de pipeline récents, d'analyser les logs d'erreurs et de suggérer des correctifs.
- **Identifier les tests instables**: Recherchez les tests instables dans votre dépôt et obtenez des recommandations hiérarchisées sur ceux à corriger en priorité.
- **Analyser les performances de CI**: Obtenez des statistiques agrégées sur les durées de pipeline, les taux d'échec et les tendances au fil du temps.
- **Trier les échecs de tests**: Comprenez quels tests échouent, qui en est responsable et quels sont les modèles historiques.
- **Examiner la couverture de code**: Obtenez des résumés de couverture pour des branches ou des commits, y compris la couverture des correctifs et les répartitions par service ou propriétaire de code.
- **Mesurer les métriques DORA**: Interrogez la fréquence de déploiement, le délai de modification, le taux d'échec des modifications et le temps de récupération par service ou par équipe.
- **Vérifier les paramètres d'optimisation des tests**: Voyez quelles fonctionnalités de Test Optimization sont actives pour un service, y compris Test Impact Analysis, Early Flake Detection et Auto Test Retries.
- **Réessayer les jobs CI échoués**: Mettez en file d'attente une nouvelle tentative pour un job GitHub Actions ou GitLab échoué sans quitter la session de l'agent.
- **Vérifier l'état des PR**: Obtenez une vue combinée des échecs de CI, de la couverture de code et des violations de qualité ou de sécurité pour une pull request.
- **Enquêter sur les échecs des Deployment Gates**: Découvrez quelles règles ont provoqué l'échec d'un Deployment Gate et si l'échec a bloqué le déploiement.
- **Examiner la configuration du Deployment Gate**: Voir quels Deployment Gates et règles s'appliquent à un service et à un environnement.

## Outils disponibles {#available-tools}

Le jeu d'outils `software-delivery` comprend les suivants :

`search_datadog_ci_pipeline_events`
: Recherchez des événements de pipeline CI avec des filtres et obtenez des détails sur les échecs, les durées et les statuts.

`aggregate_datadog_ci_pipeline_events`
: Agrégez les événements de pipeline CI pour des statistiques telles que les durées moyennes, le nombre d'échecs et l'analyse des percentiles.

`get_datadog_flaky_tests`
: Identifiez les tests instables avec des détails de triage incluant le taux d'échec, la catégorie, les propriétaires et l'impact sur la CI.

`update_datadog_flaky_test_states`
: Définissez l'état d'un ou plusieurs tests instables sur `quarantined` (supprimer les échecs), `disabled` (ignorer le test), `fixed` (marquer comme résolu) ou `active` (restaurer). Il s'agit d'une opération d'écriture qui nécessite l'autorisation `TestOptimizationWrite` et l'approbation explicite de l'utilisateur. Tous les changements d'état sont réversibles.

`aggregate_datadog_test_events`
: Agrégez les événements de test pour analyser les tendances de fiabilité et de performance.

`search_datadog_test_events`
: Recherchez des événements de test avec des filtres et obtenez des détails à leur sujet.

`get_datadog_code_coverage_branch_summary`
: Récupérez les métriques récapitulatives agrégées de couverture de code pour une branche de dépôt, y compris la couverture totale, la couverture des correctifs et les répartitions par service/propriétaire de code.

`get_datadog_code_coverage_commit_summary`
: Récupérez les métriques récapitulatives agrégées de couverture de code pour un commit de dépôt, y compris la couverture totale, la couverture des correctifs et les répartitions par service/propriétaire de code.

`get_datadog_test_optimization_settings`
: Récupérez les fonctionnalités Test Optimization activées pour un service, y compris Test Impact Analysis (ITR), Early Flake Detection (EFD), Auto Test Retries (ATR), Failed Test Replay, la collecte Code Coverage et les commentaires de PR.

`get_datadog_flaky_tests_management_policies`
: Récupérez les politiques de gestion des tests instables configurées pour un dépôt, y compris les fenêtres de mise en quarantaine automatique, les règles de branche, les seuils de taux d'échec, les politiques de désactivation et les paramètres de nouvelle tentative.

`search_dora_deployments`
: Recherchez des événements de déploiement DORA avec des filtres, ou récupérez les détails complets d'un déploiement unique par ID. Pour les tendances agrégées (fréquence de déploiement, délai de changement, taux d'échec), utilisez `aggregate_dora_deployments` à la place.

`aggregate_dora_deployments`
: Agrégez les métriques DORA — fréquence de déploiement, délai de changement, taux d'échec de changement et temps de récupération — sous forme de valeurs scalaires ou de séries temporelles. Pour un résumé DORA complet, appelez cet outil quatre fois en parallèle, une fois par métrique.

`retry_datadog_ci_job`
: Mettez en file d'attente une nouvelle tentative pour un job CI ayant échoué sur GitHub Actions ou GitLab. Une opération d'écriture qui modifie l'état de la CI, nécessitant l'autorisation `CiVisibilityWrite`. Les limites côté serveur plafonnent les nouvelles tentatives à deux par job sur sept jours. Pour les autres fournisseurs de CI, utilisez l'interface utilisateur du fournisseur pour relancer.

`search_datadog_deployment_gates`
: Recherchez les Deployment Gates configurées par service ou environnement. Renvoie la configuration du Deployment Gate, pas les résultats de l'évaluation.

`get_datadog_deployment_gate`
: Obtenez un Deployment Gate configuré par son ID, y compris ses règles et paramètres.

`search_datadog_deployment_gate_evaluations`
: Recherchez les évaluations de Deployment Gate par service, environnement ou statut (`in_progress`, `pass` ou `fail`). Recherche par défaut sur les dernières 24 heures, jusqu'à un maximum de 30 jours.

`get_datadog_deployment_gate_evaluation`
: Obtenez une évaluation de Deployment Gate avec le résultat de chaque règle. Utilisez ceci pour expliquer pourquoi un Deployment Gate a échoué.

`search_datadog_deployment_gate_rule_evaluations`
: Recherchez les résultats de règles individuelles parmi les évaluations de Deployment Gate. Les résultats incluent des preuves d'échec, telles que le déclenchement de monitors ou des insights Watchdog. Utilisez ceci pour trouver quelles règles échouent le plus souvent pour un service.

Les outils Deployment Gates sont en lecture seule et nécessitent l'autorisation `DeploymentGatesRead`. Les Deployment Gates et les règles en mode dry run sont évaluées mais ne bloquent pas les déploiements, donc un statut `fail` avec `dry_run: true` signifie que le déploiement a été effectué.

## Exemples d'invites {#example-prompts}

Une fois connecté, essayez des requêtes telles que :

- Affichez-moi tous les pipelines pour mon commit `58b1488`.
- Qu'est-ce qui cause l'échec du job `integration-test` sur ma branche ?
- Trouvez les tests instables actifs pour le service checkout triés par taux d'échec.
- Combien de pipelines ont échoué au cours des 2 dernières semaines ?
- Affichez-moi le 95e percentile de la durée pour chaque suite de tests afin d'identifier les plus lentes.
- Quelle est la couverture de code sur la branche `main` pour `github.com/my-org/my-repo` ?
- Affichez-moi les métriques de couverture pour le commit `abc123abc123abc123abc123abc123abc123abcd`.
- Quelle est la fréquence de déploiement et le taux d'échec des changements pour le service `checkout` sur les 30 derniers jours ?
- Quelles fonctionnalités d'optimisation des tests sont activées pour `auth-service` ?
- Mettez en quarantaine tous les tests instables actifs dans le dépôt `checkout-service`.
- Pourquoi le Deployment Gate pour `checkout` dans `prod` a-t-il échoué lors du dernier déploiement ?
- Quelles règles de Deployment Gate pour le service `checkout` dans `prod` sont en mode dry run ?
- Quelles règles de Deployment Gate ont échoué le plus souvent pour le service `payments` sur les 7 derniers jours ?

## Configuration {#setup}

Pour utiliser les outils Software Delivery, connectez-vous au Datadog MCP Server avec l'ensemble d'outils `software-delivery` activé. Ajoutez le paramètre de requête `toolsets` à l'URL d'endpoint pour votre [site Datadog][5] :

```text
https://mcp.{{< region-param key="dd_site" >}}/v1/mcp?toolsets=core,software-delivery
```

Pour obtenir des instructions de configuration complètes, y compris la configuration client pour Cursor, Claude Code, VS Code et d'autres clients IA, consultez [Configurer Datadog MCP Server][1].

## Compétences de l'Agent{#agent-skills}

Les compétences d'Agent sont des ensembles d'instructions prédéfinis pour les agents de codage IA qui automatisent les workflows courants de Software Delivery. L'ensemble de compétences `dd-software-delivery` est disponible dans le dépôt [Datadog agent-skills][6]. Il fournit deux skills pour le triage des tests instables et le déblocage des pipelines PR en échec en utilisant vos données live de CI et Test Optimization.

Après avoir connecté l'ensemble d'outils MCP `software-delivery`, votre assistant IA charge automatiquement les skills dès que votre prompt correspond à leur objectif. Par exemple, saisir « TestCheckoutServiceIntegration continue d'échouer en CI — investiguez-le » charge `/triage-flaky-test` sans aucune installation requise.

Pour invoquer explicitement les skills via une commande slash, installez-les localement :

### Installation{#install}

```shell
npx skills add datadog-labs/agent-skills \
  --skill unblock-pr \
  --skill triage-flaky-test \
  --full-depth -y
```

Redémarrez Claude Code après l'installation pour que les commandes slash apparaissent.

Chaque skill utilise automatiquement le Datadog MCP Server s'il est connecté, et se rabat sur l'interface CLI [pup][7] sinon. Pour utiliser le fallback pup, installez et authentifiez pup :

```shell
brew install datadog-labs/pack/pup
pup auth login
```

### Compétences disponibles{#available-skills}

| Compétence| Invoquer avec| Ce qu'elle fait|
|-------|-------------|-------------|
| Trier un test instable | `/triage-flaky-test` | Obtenez l'historique, le modèle d'échec et la catégorie IA pour un test instable spécifique, puis recommandez une correction, une mise en quarantaine ou une escalade |
| Débloquer une PR | `/unblock-pr` | Attribuez chaque échec de CI sur une PR comme instable, infrastructure ou régression, faites apparaître la couverture de code et les violations de qualité ou de sécurité, et proposez une action ciblée |

### Trier un test instable {#triage-flaky-test}

`/triage-flaky-test` analyse un test instable spécifique. Il récupère l'historique des échecs sur 30 jours, extrait les principaux messages d'erreur et traces de pile, et vérifie combien de pipelines le test a impactés. Il propose une correction ciblée fondée sur la catégorie instable et la trace de pile, ou recommande la mise en quarantaine lorsque la cause profonde n'est pas claire. Il produit un rapport de triage structuré comprenant une recommandation de correction, de mise en quarantaine ou d'escalade vers l'équipe responsable.

Si le skill recommande la mise en quarantaine, il présente l'action proposée et requiert votre approbation explicite avant de l'exécuter. Tous les changements d'état sont réversibles.

```
/triage-flaky-test TestCheckoutServiceIntegration
/triage-flaky-test TestCheckoutServiceIntegration github.com/my-org/my-service
```

### Débloquer une PR {#unblock-pr}

`/unblock-pr` analyse un pipeline CI de PR en échec. Pour chaque job en échec, il vérifie si l'échec était déjà présent sur la branche par défaut ou sur d'autres branches. Le skill classe l'échec comme **instable**, **infrastructure** ou **régression**. En parallèle, il récupère la couverture de code de la branche ainsi que toute violation de la qualité du code ou de la sécurité à partir des insights de la PR. Il produit un résumé de triage avec une classification par job, des preuves, une action recommandée et une section Santé de la PR résumant la couverture et les violations.

Pour les échecs instables, le skill s'enchaîne avec `triage-flaky-test` pour une analyse plus approfondie. Pour les échecs d'infrastructure transitoires sur GitHub Actions ou GitLab, il relance les jobs échoués en utilisant `retry_datadog_ci_job` (MCP) ou `gh run rerun` (fallback pup, GitHub Actions uniquement) ; pour les autres fournisseurs CI, il fournit un lien vers l'interface utilisateur du fournisseur. Pour les régressions, il vous invite à examiner vos modifications de code.

**Note** : Les données sur la qualité du code et les violations de sécurité dans la section Santé de la PR nécessitent l'ensemble d'outils MCP et ne sont pas disponibles en mode pup.

```
/unblock-pr
/unblock-pr feat/add-retry-logic
```

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/mcp_server/setup/
[2]: https://modelcontextprotocol.io/
[3]: /fr/continuous_integration/
[4]: /fr/tests/
[5]: /fr/getting_started/site/
[6]: https://github.com/datadog-labs/agent-skills
[7]: https://github.com/DataDog/pup
[8]: /fr/code_coverage/
[9]: /fr/delivery_performance/dora_metrics/
[10]: /fr/deployment_gates/