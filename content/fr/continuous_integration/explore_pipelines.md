---
further_reading:
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage CI
kind: documentation
title: Explorer les pipelines
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">À l'heure actuelle, la solution CI Visibility n'est pas disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

La page [Pipelines][1], qui se trouve sous le menu CI, présente vos différents pipelines.

## Vue d'ensemble de la santé des pipelines

La page Pipelines affiche des statistiques agrégées pour la branche par défaut de chaque pipeline sur un intervalle donné, ainsi que le statut de la dernière exécution de pipeline. Elle vous permet de visualiser l'ensemble de vos pipelines et de consulter en quelques secondes leur état de santé. Cette page affiche des métriques pour la branche _par défaut_, dont le nom correspond généralement à `main`, `prod` ou à un autre terme similaire.

Les métriques de cette page portent sur la fréquence de build, le taux d'échec, la durée moyenne et la durée du 95e centile. Ces informations vous permettent d'identifier les pipelines fréquemment utilisés ainsi que les éléments consommant beaucoup de ressources. Le dernier résultat de build, la dernière durée et le dernier délai d'exécution indiquent l'impact du dernier commit.

Vous pouvez filtrer les données de la page par nom de pipeline, afin d'afficher uniquement les pipelines qui vous intéressent le plus. Cliquez sur un pipeline ayant enregistré de mauvaises performances ou un échec pour obtenir des informations supplémentaires. Vous pouvez ainsi découvrir quel commit a entraîné une détérioration des performances ou une erreur de build.

## Informations sur les pipelines et branches

Cliquez sur un pipeline spécifique pour afficher la page _Pipeline Details_ correspondante. Vous pouvez ainsi consulter les données du pipeline en question sur un intervalle donné, et afficher des branches autres que celle par défaut.

{{< img src="ci/ci-single-pipeline.png" alt="Informations sur un pipeline" style="width:100%;">}}

Obtenez des informations exploitables sur le pipeline de votre choix, comme le nombre total d'exécutions et le nombre d'exécutions ayant échoué, les centiles de durée de build et la durée totale fractionnée par étape. Vous pouvez également consulter des tableaux récapitulatifs sur les étapes et les tâches, afin de trier vos données par durée, pourcentage du temps d'exécution global ou taux d'échec.

La liste des exécutions de pipeline en bas de la page indique la durée d'exécution des pipelines (ou de leurs étapes ou tâches) lors d'un intervalle donné, pour la branche sélectionnée. Utilisez les facettes sur la gauche de la page pour filtrer la liste afin d'afficher les pipelines, étapes ou tâches de votre choix.

### Explorer les connexions vers les services, ressources et événements réseau

Cliquez sur l'une des exécutions pour ouvrir la vue Pipeline Execution et afficher le flamegraph ou la liste des spans pour le pipeline et ses étapes. La liste _Executions (n)_ située à gauche de la page vous permet d'accéder rapidement aux données de chaque nouvelle tentative d'exécution du pipeline pour un seul commit.

Cliquez sur le lien du fournisseur CI (`gitlab-ci gitlab.pipeline > documentation` dans l'image suivante) pour accéder à la page Resource, Service ou Analytics du pipeline ou d'une étape ou d'une tâche précise. Vous pouvez également consulter des informations complètes sur les tags et accéder aux événements de surveillance réseau.

{{< img src="ci/ci-pipeline-execution.png" alt="Informations sur les traces pour une exécution de pipeline" style="width:100%;">}}

### Explorer les connexions vers les logs

Si la collecte de logs sur les tâches est prise en charge et activée par le fournisseur CI, les événements de log associés sont accessibles depuis l'onglet _Logs_ de la vue de l'exécution du pipeline.

**Remarque** : la collecte de logs sur les tâches est uniquement prise en charge pour [Jenkins][2].

## Informations sur les exécutions de pipeline et traces

La page [Pipeline Executions][3] rassemble des données agrégées à propos des exécutions de pipeline sur un intervalle donné. Utilisez le champ de recherche et les facettes pour filtrer la liste et visualiser les exécutions qui vous intéressent. Les boutons en haut de la page vous permettent de modifier la liste et de basculer entre les pipelines, les étapes et les tâches.

Chaque exécution de pipeline est transmise sous la forme d'une trace qui contient des informations à propos des étapes et des tâches. Cliquez sur une exécution dans la liste pour accéder aux traces des exécutions d'un pipeline, d'une étape ou d'une tâche (tout comme les exécutions de pipeline sur la page Pipeline Details).

Vous pouvez également cliquer sur le bouton [Analytics][4] pour filtrer et regrouper de façon interactive les données sur les exécutions de pipeline dans des visualisations. Ces dernières vous permettent d'obtenir des réponses à vos questions et peuvent être partagées dans des dashboards.

{{< img src="ci/ci-pipelines-execution.png" alt="Données d'analyse pour une exécution de pipeline" style="width:100%;">}}

## Utiliser les données des pipelines CI

Vous pouvez utiliser les données sur vos pipelines CI lorsque vous créez des widgets dans des [dashboards][5] et des [notebooks][6].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pipelines
[2]: /fr/continuous_integration/setup_pipelines/jenkins#enable-job-log-collection
[3]: https://app.datadoghq.com/ci/pipeline-executions
[4]: https://app.datadoghq.com/ci/pipeline-executions?viz=timeseries
[5]: https://app.datadoghq.com/dashboard/lists
[6]: https://app.datadoghq.com/notebook/list