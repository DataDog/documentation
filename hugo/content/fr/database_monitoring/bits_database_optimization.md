---
description: Examinez et implémentez les optimisations de requêtes de base de données
  identifiées par Bits AI.
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
- link: https://www.datadoghq.com/blog/how-bits-database-optimization-proves-a-query-rewrite-is-faster/
  tag: Blog
  text: Comment Bits Database Optimization prouve qu'une réécriture de requête est
    plus rapide
title: Bits Database Optimization
---
<div class="alert alert-info">Bits Database Optimization est uniquement disponible pour PostgreSQL et MySQL. Pour demander la prise en charge d'un autre système de gestion de base de données, contactez votre représentant Datadog ou le <a href="/help/">support Datadog</a>.</div>

## Présentation {#overview}

Bits Database Optimization détecte les requêtes peu performantes dans l'ensemble de votre parc de bases de données, identifie les optimisations validées par rapport à une copie simulée de votre environnement et fournit le résultat sous forme de pull request corrigeant le code exact qui a déclenché la requête.

Les candidats à l'optimisation sont sélectionnés automatiquement à partir de la télémétrie de Database Monitoring. Les candidats sont identifiés par leur impact potentiel le plus élevé, en se concentrant sur les temps d'exécution des requêtes, les requêtes bloquantes et les requêtes ayant régressé.

<div class="alert alert-info">Bits Database Optimization ne nécessite pas d'accès en écriture à votre base de données et n'exporte ni n'utilise de données réelles provenant de votre environnement. Les optimisations sont testées empiriquement sur des simulations de bases de données remplies de données synthétiques utilisant les propriétés statistiques de votre schéma.</div>

{{< img src="database_monitoring/database_optimization_panel_overview.png" alt="Une requête optimisée dans le panneau d'optimisation, affichant un résumé détaillé du problème, un diff pour la requête optimisée et un bouton pour créer une PR." style="width:100%;">}}

## Prérequis {#prerequisites}

- **Database Monitoring** est configuré pour les instances de base de données cibles. Consultez [Database Monitoring Setup][1].
- **La collecte de schéma** est activée sur les instances cibles.
- Pour la création automatisée de PR :
    - **APM** doit être configuré pour les services qui émettent les requêtes que vous souhaitez traiter. Consultez [Correlate Database Monitoring and Traces][2] pour plus d'informations.
    - Un **dépôt GitHub** doit être lié dans votre organisation Datadog.
- Bits Database Optimization est activé pour votre organisation. Vous pouvez vérifier la disponibilité de [Bits AI][6] dans **Plan & Usage** > **AI Credits**.
- Pour configurer des optimisations continues, vous avez besoin des autorisations **DBM Read** et **Org Management**.

## Activer les optimisations continues {#enable-continuous-optimizations}

1. Accédez à [Database Monitoring > Optimizations][7].
1. Dans le coin supérieur droit, cliquez sur **Configure**.
1. Activez **Continuous Optimizations**
1. Examinez les instances incluses, puis cliquez sur **Save**.

Les instances incluses dans Continuous Optimizations sont répertoriées sous le bouton bascule. Pour supprimer une instance, cliquez sur le bouton moins (**-**) sur le côté droit de sa ligne, puis cliquez sur **Enregistrer**.

Lorsque les optimisations continues sont activées, Bits Database Optimization sélectionne les requêtes éligibles parmi les instances incluses de manière continue jusqu'à ce que la limite de 50 requêtes distinctes par instance de base de données par mois soit atteinte. Les requêtes sont classées par priorité selon la durée totale d'exécution.

Chaque requête analysée compte pour cette limite, même lorsqu'aucune optimisation n'est trouvée. Une fois qu'une requête a été analysée, elle n'est plus analysée au cours du même mois. La limite est réinitialisée au début de chaque mois (UTC).

Bits Database Optimization est facturé en fonction des crédits IA. Pour plus de détails, consultez la [page de tarification des crédits IA][5].

## Affichage des optimisations {#viewing-optimizations}

### Liste des requêtes {#query-list}

Sur l'écran [Database Monitoring > Queries][3], les requêtes pour lesquelles des optimisations sont disponibles comportent une icône IA dans la colonne Status. Survolez une icône pour voir un résumé de l'optimisation et cliquez sur l'icône pour ouvrir le panneau Optimisation.

Pour filtrer la liste des requêtes par type d'optimisation, sélectionnez une option dans **Optimizations** au-dessus de la liste.

{{< img src="database_monitoring/database_optimization_queries.png" alt="La colonne Status sur l'écran Queries, affichant des icônes IA dans les lignes de requête où des optimisations sont disponibles." style="width:100%;">}}

### Panneau d'optimisation {#optimization-panel}

Le panneau d'optimisation inclut un résumé du problème de requête, la requête optimisée utilisée dans la simulation, et une visualisation de l'impact sur les performances simulé.

Explorez la visualisation de l'impact sur les performances simulé pour plus de détails sur les améliorations :
  - Survolez le résumé de l'amélioration (par exemple, « 96,9x plus rapide ») pour voir les temps d'exécution avant et après, les lectures logiques et les blocs partagés modifiés. Le tableau affiche la moyenne, la médiane, le P95 et le maximum pour chaque métrique.
  - Survolez chaque élément de la visualisation pour voir plus de détails.

{{< img src="database_monitoring/database_optimization_simulated_performance_impact.png" alt="Un exemple de visualisation de l'impact sur les performances simulé, montrant une requête optimisée pour être 96,9x plus rapide." style="width:100%;">}}

Cliquez sur **Compare Plans** pour voir des comparaisons côte à côte des plans d'exécution actuel et optimisé :
  - **List View** affiche une liste hiérarchique des opérations du plan d'exécution, avec le coût du nœud et les estimations de lignes pour chaque étape.
  - **Map View** affiche une représentation visuelle du plan d'exécution, avec l'option de comparer les plans selon différentes métriques.
  - **Raw** affiche la sortie brute du plan d'exécution.

{{< img src="database_monitoring/database_optimization_plan_comparison_map_view.png" alt="Compare Plans Map View, affichant les opérations ajoutées et supprimées pour une requête optimisée." style="width:100%;">}}

### Examiner la pull request {#review-the-pull-request}

Pour examiner la PR concernant le correctif d'optimisation de votre base de données, sélectionnez **Review PR by Bits AI**. La PR GitHub s'ouvre avec une description pré-remplie qui inclut les résultats de la simulation.

<div class="alert alert-info">Les pull requests automatisées nécessitent qu'APM soit configuré pour le service émettant la requête, et qu'un dépôt GitHub soit lié à votre organisation Datadog.</div>

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/database_monitoring/architecture/
[2]: /fr/database_monitoring/connect_dbm_and_apm/
[3]: https://app.datadoghq.com/databases/queries
[4]: /fr/monitors/configuration/?tab=evaluateddata
[5]: https://www.datadoghq.com/pricing/?product=ai-credits#products
[6]: /fr/bits_ai/
[7]: https://app.datadoghq.com/databases/optimizations