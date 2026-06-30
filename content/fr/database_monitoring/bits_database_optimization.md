---
description: Examinez et mettez en œuvre les optimisations de requêtes de base de
  données identifiées par Bits AI.
further_reading:
- link: /database_monitoring/
  tag: Documentation
  text: Database Monitoring
- link: /database_monitoring/query_metrics/
  tag: Documentation
  text: Explorer les métriques de requête
- link: /database_monitoring/connect_dbm_and_apm/
  tag: Documentation
  text: Associer la fonctionnalité Database Monitoring aux traces
title: Bits Database Optimization
---
<div class="alert alert-info">Bits Database Optimization n'est disponible que pour PostgreSQL. Pour demander de l’assistance pour un autre système de gestion de base de données, contactez votre représentant Datadog ou <a href="/help/">Datadog Support</a>.</div>

## Aperçu {#overview}

Bits Database Optimization détecte les requêtes sous-performantes dans votre parc de bases de données, identifie les optimisations validées sur une copie simulée de votre environnement, et livre le résultat sous forme de pull request corrigeant le code exact qui a déclenché la requête.

Les candidats à l'optimisation sont sélectionnés automatiquement à partir de la télémétrie de Database Monitoring, sans configuration supplémentaire requise. Les candidats sont identifiés par leur impact potentiel le plus élevé, en se concentrant sur les temps d'exécution des requêtes, les requêtes bloquantes et les requêtes régressées.

<div class="alert alert-info">Bits Database Optimization ne nécessite pas d'accès en écriture à votre base de données, et n'exporte ni n'utilise de données réelles de votre environnement. Les optimisations sont testées empiriquement contre des simulations de base de données peuplées de données synthétiques utilisant les propriétés statistiques de votre schéma.</div>

{{< img src="database_monitoring/database_optimization_panel_overview.png" alt="Une requête optimisée dans le panneau d'optimisation, montrant un résumé détaillé du problème, un diff pour la requête optimisée, et un bouton pour créer une demande de tirage." style="width:100%;">}}

## Prérequis {#prerequisites}

- **Database Monitoring** est configuré pour les instances de base de données cibles. Voir [Database Monitoring Setup][1].
- **Schema collection** est activée sur les instances cibles.
- Pour la création automatique de PR :
    - **APM** doit être configuré pour les services qui émettent les requêtes que vous souhaitez traiter. Voir [Corréler la surveillance de la base de données et les traces][2] pour plus d'informations.
    - Un **dépôt GitHub** doit être lié à votre organisation Datadog.

## Visualisation des optimisations {#viewing-optimizations}

### Liste des requêtes {#query-list}

Sur l'écran [Database Monitoring > Queries][3], les requêtes avec des optimisations disponibles ont une icône AI dans la colonne Statut. Survolez une icône pour voir un résumé de l'optimisation, et cliquez sur l'icône pour ouvrir le panneau d'optimisation.

Pour filtrer la liste des requêtes par type d'optimisation, sélectionnez une option dans **Optimizations** au-dessus de la liste.

{{< img src="database_monitoring/database_optimization_queries.png" alt="La colonne de statut sur l'écran des Requêtes, montrant des icônes IA dans les lignes de requêtes où des optimisations sont disponibles." style="width:100%;">}}

### Optimization panel{#optimization-panel}

Le Optimization panel comprend un résumé du problème de la requête, la requête optimisée utilisée dans la simulation, et une visualisation du Simulated Performance Impact.

Explorez la visualisation du Simulated Performance Impact pour plus de détails sur les améliorations :
  - Survolez le résumé de l'amélioration (par exemple, "96,9x plus rapide") pour voir les temps d'exécution avant et après, les lectures logiques, et les blocs partagés modifiés. Le tableau montre la moyenne, la médiane, le P95 et le maximum pour chaque métrique.
  - Survolez chaque élément de la visualisation pour afficher plus de détails.

{{< img src="database_monitoring/database_optimization_simulated_performance_impact.png" alt="Une visualisation du Simulated Performance Impact, montrant une requête optimisée 96,9x plus rapide." style="width:100%;">}}

Cliquez sur **Compare Plans** pour voir des comparaisons côte à côte des plans d'exécution actuels et optimisés :
  - **List View** montre une liste hiérarchique des opérations du plan d'exécution, avec le coût des nœuds et les estimations de lignes pour chaque étape :
  - **Map View** montre une représentation visuelle du plan d'exécution, avec l'option de comparer les plans par différentes métriques :
  - **Raw** montre la sortie brute du plan d'exécution :

{{< img src="database_monitoring/database_optimization_plan_comparison_map_view.png" alt="Compare Plans Map View, montrant les opérations ajoutées et supprimées pour une requête optimisée :" style="width:100%;">}}

### Examinez la pull request {#review-the-pull-request}

Pour examiner la pull request pour la correction d'optimisation de votre base de données, sélectionnez **Review PR by Bits AI**. La GitHub PR s'ouvre avec une description prédéfinie qui inclut les résultats de la simulation.

<div class="alert alert-info">Les pull requests automatisées nécessitent que l'APM soit configuré pour le service émettant la requête, et un GitHub repository lié à votre organisation Datadog.</div>

## Pour en savoir plus {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/database_monitoring/architecture/
[2]: /fr/database_monitoring/connect_dbm_and_apm/
[3]: https://app.datadoghq.com/databases/queries
[4]: /fr/monitors/configuration/?tab=evaluateddata