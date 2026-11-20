---
aliases:
- /fr/continuous_integration/explorer/search/
description: Apprenez à rechercher vos pipelines CI.
further_reading:
- link: /continuous_integration/explorer
  tag: Documentation
  text: Recherchez et filtrez les exécutions de pipelines
- link: /continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
  tag: Documentation
  text: Identifiez les jobs CI sur le chemin critique pour réduire la durée du pipeline
- link: /continuous_integration/guides/use_ci_jobs_failure_analysis/
  tag: Documentation
  text: Utilisez Logs Analysis pour identifier les causes profondes dans les jobs
    CI ayant échoué.
title: Recherchez et gérez les pipelines CI
---
## Présentation {#overview}

La [page Pipelines][1] est utile pour les développeurs qui souhaitent garder un œil sur le pipeline de build de leur service.

{{< img src="/continuous_integration/pipelines.png" text="CI Pipelines page" style="width:100%" >}}

Cette page répond aux questions suivantes :

- Le pipeline de votre service est-il performant et fiable, en particulier sur la branche par défaut ?
- Si ce n'est pas le cas, quelle est la cause profonde ?

Vous pouvez accéder aux agrégats et aux tendances de haut niveau, notamment :

- Une vue d'ensemble de la santé de l'ensemble du système de build, avec des statistiques agrégées pour les exécutions de pipelines et les branches.
- Une fenêtre pour repérer et corriger rapidement les problèmes immédiats et urgents, tels que les pipelines en production défaillants.
- Comment chaque pipeline s'est exécuté, au fil du temps, et avec quels résultats et tendances.
- La répartition du temps passé dans chaque phase de build, au fil du temps, afin que vous puissiez concentrer vos efforts d'amélioration là où cela fait la plus grande différence.

## Rechercher des pipelines {#search-for-pipelines}

Pour voir vos pipelines, accédez à [**Software Delivery** > **CI Visibility** > **CI Pipeline List**][1].

La [page Pipelines][1] affiche des statistiques agrégées pour la branche par défaut de chaque pipeline sur la période sélectionnée, ainsi que le statut de la dernière exécution de pipeline. Utilisez cette page pour voir tous vos pipelines et obtenir une vue rapide de leur santé. Seuls les pipelines avec des informations Git associées à la branche par défaut (généralement nommée `main` ou `prod`), ainsi que les pipelines sans aucune information Git, sont affichés sur cette page.

Les métriques affichées incluent la fréquence de build, le taux d'échec, la durée médiane et la variation de la durée médiane sur une base absolue et relative. Ces informations révèlent quels pipelines sont fortement utilisés et potentiellement de gros consommateurs de ressources, ou subissent des régressions. Le résultat de la dernière build, sa durée et son temps d'exécution final vous montrent l'effet du dernier commit.

Vous pouvez filtrer la page par nom de pipeline pour voir les pipelines qui vous concernent le plus. Cliquez sur un pipeline lent ou en échec pour approfondir les détails qui montrent quel commit pourrait avoir introduit la régression de performance ou l'erreur de build. Si vous utilisez [Datadog Teams][6], vous pouvez filtrer les pipelines spécifiques associés à votre équipe en utilisant des [tags personnalisés][7] qui correspondent aux identifiants d'équipe.

## Détails et exécutions du pipeline {#pipeline-details-and-executions}

Cliquez sur un pipeline spécifique pour voir la page {{< ui >}}Pipeline Details{{< /ui >}} qui fournit des vues des données pour le pipeline que vous avez sélectionné sur une période donnée.

{{< img src="ci/pipeline_branch_overview_updated.png" alt="Page de détails d'un pipeline" style="width:100%;">}}

Obtenez des informations sur le pipeline sélectionné, telles que le nombre total d'exécutions et d'échecs au fil du temps, les percentiles de durée de build, les taux d'erreur et la répartition du temps total passé par phase. Il existe également des tableaux récapitulatifs pour les phases et les jobs afin que vous puissiez les trier rapidement selon la durée, le pourcentage du temps d'exécution global ou le taux d'échec.

La liste des exécutions de pipeline affiche toutes les fois où ce pipeline (ou ses phases ou jobs) a été exécuté au cours de la période sélectionnée, pour la branche sélectionnée. Utilisez les facettes sur le côté gauche pour filtrer la liste afin d'obtenir exactement les pipelines, phases ou jobs que vous souhaitez voir.

### Mettez en évidence le chemin critique {#highlight-critical-path}

Pour mettre en évidence le chemin critique sur la trace, cliquez sur la case à cocher {{< ui >}}Critical path{{< /ui >}} sur la page d'exécution du pipeline.

Le chemin critique met en évidence les spans que vous devez accélérer si vous souhaitez réduire le temps d'exécution global de votre pipeline. Si un job CI se trouve sur le chemin critique, cela signifie qu'il fait partie du chemin le plus long de la trace en termes de temps d'exécution. Accélérer les jobs CI sur le chemin critique est strictement nécessaire pour accélérer le pipeline CI.

Vous pouvez utiliser [ce guide][11] pour identifier les jobs CI sur le chemin critique afin de vous aider à déterminer quels jobs prioriser pour réduire la durée globale des pipelines CI.

### Explorer les connexions aux services, aux ressources et aux événements réseau {#explore-connections-to-services-resources-and-network-events}

Cliquez sur l'une des exécutions pour ouvrir la vue d'exécution du pipeline et voir le graphique en flammes ou la liste des spans pour le pipeline et ses phases. La liste {{< ui >}}Executions (n){{< /ui >}} sur le côté gauche vous donne un accès rapide aux données pour chaque nouvelle tentative du pipeline pour le même commit.

Cliquez sur le lien du fournisseur CI (`gitlab-ci gitlab.pipeline > documentation` dans l'image suivante) pour examiner spécifiquement la page Ressource, Service ou Analytics pour le pipeline, la phase ou le job. Vous pouvez également trouver des informations complètes sur les tags et des liens vers des événements de surveillance réseau.

{{< img src="ci/ci-pipeline-execution.png" alt="Vue de l'exécution du pipeline avec des informations de trace et un affichage flamegraph" style="width:100%;">}}

### Explorez les connexions aux logs {#explore-connections-to-logs}

Si le stockage des logs est activé pour votre fournisseur CI, vous pouvez afficher les événements de log associés pour une exécution de pipeline donnée dans l'onglet {{< ui >}}Logs{{< /ui >}} du panneau coulissant d'exécution du pipeline.

Le stockage des logs est pris en charge pour les fournisseurs suivants :

- [AWS CodePipeline][8]
- [Azure][9]
- [Buildkite][13]
- [CircleCI][10]
- [GitHub Actions][3]
- [GitLab][4]
- [Jenkins][5]

### Analyse des logs basée sur les logs pertinents {#logs-analysis-based-on-relevant-logs}

CI Visibility utilise un modèle LLM pour générer des messages d'erreur améliorés et les catégoriser avec un domaine et un sous-domaine, en se basant sur les logs pertinents collectés à partir de chaque job CI ayant échoué.

Utilisez [Analyse des logs][12] pour identifier les causes profondes les plus courantes des échecs de vos jobs CI.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pipelines
[3]: /fr/continuous_integration/pipelines/github/#logs-storage
[4]: /fr/continuous_integration/pipelines/gitlab/#logs-storage
[5]: /fr/continuous_integration/pipelines/jenkins#logs-storage
[6]: /fr/account_management/teams/
[7]: /fr/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[8]: /fr/continuous_integration/pipelines/awscodepipeline/#logs-storage
[9]: /fr/continuous_integration/pipelines/azure/#logs-storage
[10]: /fr/continuous_integration/pipelines/circleci/#logs-storage
[11]: /fr/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path
[12]: /fr/continuous_integration/guides/use_ci_jobs_failure_analysis/
[13]: /fr/continuous_integration/pipelines/buildkite/#logs-storage