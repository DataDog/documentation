---
algolia:
  rank: 70
  tags:
  - flaky test
  - flaky tests
  - test regression
  - test regressions
  - test service
  - test services
aliases:
- /fr/continuous_integration/guides/find_flaky_tests/
description: Découvrir comment effectuer des recherches dans vos tests et pipelines
  CI
further_reading:
- link: /continuous_integration/explorer
  tag: Documentation
  text: Rechercher et filtrer des exécutions de test ou de pipeline
- link: /continuous_integration/guides/flaky_test_management
  tag: Documentation
  text: Découvrir comment gérer vos tests irréguliers
title: Rechercher et gérer des tests et pipelines CI
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution CI Visibility n'est pas encore disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Présentation

{{< tabs >}}
{{% tab "Pipelines" %}}

La [page Pipelines][101] permet aux développeurs de surveiller le pipeline de build de leur service.

{{< img src="/continuous_integration/pipelines.png" text="Page CI Pipelines" style="width:100%" >}}

Elle leur permet de répondre aux questions suivantes :

- Le pipeline du service est-il performant et fiable, notamment sur la branche par défaut ?
- Dans le cas contraire, quelle est la cause à l'origine du problème ?

Vous pouvez consulter des informations générales ainsi que des tendances, notamment :

- un aperçu de la santé de l'ensemble du système de build, avec des statistiques agrégées sur les exécutions de pipelines et les branches ;
- une vue permettant de détecter et de résoudre rapidement les problèmes immédiats et urgents, comme les pipelines défectueux mis en production ;
- des informations sur l'exécution globale de chaque pipeline, ainsi que les résultats obtenus et les tendances détectées ;
- une analyse détaillée du temps consacré à chaque tâche de chaque étape de build, afin de concentrer vos efforts là où ils feront une réelle différence.

## Rechercher des pipelines

Pour consulter vos pipelines, accédez à [**CI** > **Pipelines**][101].

La [page Pipelines][101] affiche des statistiques agrégées pour la branche par défaut de chaque pipeline sur un intervalle donné, ainsi que le statut de la dernière exécution de pipeline. Elle vous permet de visualiser l'ensemble de vos pipelines et de consulter en quelques secondes leur état de santé. Seuls les pipelines possédant des informations Git associées à la branche par défaut (généralement intitulée `main` ou `prod`) ainsi que les pipelines sans aucune information Git sont affichés sur cette page.

Les métriques affichées comprennent la fréquence de build, le taux d'échec, la durée médiane ainsi que l'évolution absolue ou relative de la durée médiane. Ces informations vous permettent d'identifier les pipelines fréquemment utilisés ainsi que les éléments consommant beaucoup de ressources. Le dernier résultat de build, la dernière durée et le dernier délai d'exécution indiquent l'impact du dernier commit.

Vous pouvez filtrer les données de la page par nom de pipeline afin d'afficher uniquement les pipelines qui vous intéressent le plus. Cliquez sur un pipeline ayant enregistré de mauvaises performances ou un échec pour obtenir des informations supplémentaires. Vous pouvez ainsi découvrir quel commit a entraîné une détérioration des performances ou une erreur de build. Si vous utilisez [Datadog Teams][106], vous pouvez utiliser un filtre pour retrouver uniquement les pipelines associés à votre équipe en utilisant des [tags personnalisés][107] correspondant aux handles de votre équipe.

## Détails des pipelines

Cliquez sur un pipeline spécifique pour afficher la page _Pipeline Details_ correspondante. Vous pouvez ainsi consulter les données du pipeline en question sur un intervalle donné.

{{< img src="ci/pipeline_branch_overview_updated.png" alt="Page Pipeline Details pour un pipeline spécifique" style="width:100%;">}}

Obtenez des informations exploitables sur le pipeline de votre choix, comme le nombre total d'exécutions et le nombre d'exécutions ayant échoué, les centiles de durée de build et la durée totale fractionnée par étape. Vous pouvez également consulter des tableaux récapitulatifs sur les étapes et les tâches, afin de trier vos données par durée, pourcentage du temps d'exécution global ou taux d'échec.

La liste des exécutions de pipeline indique la durée d'exécution des pipelines (ou de leurs étapes ou tâches) lors d'un intervalle donné, pour la branche sélectionnée. Utilisez les facettes sur la gauche de la page pour filtrer la liste afin d'afficher les pipelines, étapes ou tâches de votre choix.

### Explorer les connexions vers les services, ressources et événements réseau

Cliquez sur l'une des exécutions pour ouvrir la vue Pipeline Execution et afficher le flamegraph ou la liste des spans pour le pipeline et ses étapes. La liste _Executions (n)_ située à gauche de la page vous permet d'accéder rapidement aux données de chaque nouvelle tentative d'exécution du pipeline pour un seul commit.

Cliquez sur le lien du fournisseur CI (`gitlab-ci gitlab.pipeline > documentation` sur l'image suivante) pour accéder à la page Resource, Service ou Analytics du pipeline ou d'une étape ou tâche précise. Vous pouvez également consulter des informations complètes sur les tags et accéder aux événements de surveillance réseau.

{{< img src="ci/ci-pipeline-execution.png" alt="Vue de l'exécution du pipeline avec informations sur les traces et flamegraph" style="width:100%;">}}

### Explorer les connexions vers les logs

Si la collecte de logs sur les tâches est prise en charge et activée par le fournisseur CI, les événements de log associés sont accessibles depuis l'onglet _Logs_ de la vue de l'exécution du pipeline.
La collecte de logs sur les tâches est prise en charge pour les fournisseurs suivants :

- [GitHub Actions][103]
- [GitLab][104]
- [Jenkins][105]

#### Résumés de logs générés par l'IA

<div class="alert alert-info">Les résumés de logs générés par l'IA sont en version bêta. Pour demander à y accéder, remplissez <a href="https://docs.google.com/forms/d/e/1FAIpQLSfBuPfdyhgqjjduDYpOM5twJdkdDnTTxJdCCWonauaBxWTCnQ/viewform">ce formulaire</a>.</div>

Pipeline Visibility offre des analyses générées par l'IA sur les erreurs de pipeline en fonction de vos logs de tâche CI. Ces analyses sont disponibles dans l'onglet **Failed Jobs** de chaque exécution de pipeline. Vous pouvez utiliser ces résumés pour déterminer si une erreur de CI est causée par le code d'un développeur ou par le pipeline lui-même, ainsi que pour dépanner les exécutions ayant échoué.

[101]: https://app.datadoghq.com/ci/pipelines
[103]: /fr/continuous_integration/pipelines/github/#enable-log-collection
[104]: /fr/continuous_integration/pipelines/gitlab/#enable-job-log-collection-beta
[105]: /fr/continuous_integration/pipelines/jenkins#enable-job-log-collection
[106]: /fr/account_management/teams/ 
[107]: /fr/continuous_integration/pipelines/custom_tags_and_metrics/?tab=linux

{{% /tab %}}
{{% tab "Test" %}}

La [page Tests][101] permet aux développeurs de surveiller leurs résultats de test. 

{{< img src="/continuous_integration/tests.png" text="Page CI Tests" style="width:100%" >}}

Elle vous permet d'accéder à des informations immédiates et précises :

- Découvrez les tests ayant échoué et la raison derrière cet échec.
- Consultez les résultats de test de votre dernier commit.
- Consultez le wall time de vos tests dans votre branche de fonctionnalité et comparez-le à celui de la branche par défaut, pour savoir si vous êtes sur le point de nuire aux performances de la branche.
- Découvrez si votre commit introduit un nouveau [test irrégulier][105] qui ne l'était pas auparavant, ce qui voudrait dire que le changement de code est à l'origine du problème. Cette approche vous permet de résoudre le problème avant la validation du commit, au lieu d'ajouter de plus en plus de tests irréguliers dans votre intégration continue.

Vous pouvez également accéder à des informations globales et des tendances :

- Découvrez quelle est l'incidence d'une modification de code, d'un ajout de tests ou d'une complexité accrue sur les performances de votre collection de tests au fil du temps.
- Identifiez les tests dont les performances se détériorent au fil du temps et identifiez le commit à l'origine de ce problème.
- Tirez parti de l'outil de détection et de suivi automatique des tests irréguliers de Datadog, qui met en évidence les tests qui perdent en fiabilité au fil du temps.

## Rechercher des tests

Pour consulter vos tests, accédez à [**CI** > **Tests**][101] et sélectionnez la vue [**Branches**](#vues-branches) ou [**Default Branches**](#vue-default-branches).

### Vue Branches

La vue [Branches][102] de la page Tests affiche toutes les branches de tous les [services de test][103] ayant transmis des résultats. Cet onglet permet aux développeurs de visualiser en quelques secondes le statut des tests qui s'exécutent sur leurs branches de code et de corriger les échecs.

Vous pouvez filtrer les données de cette page par nom, service de test ou hash de commit. Il est également possible d'afficher uniquement vos branches (celles qui contiennent un commit dont vous êtes à l'origine). Pour ce faire, activez l'option **My branches** et ajoutez les adresses e-mail que vous utilisez dans votre configuration Git.

#### Résultats des tests

Pour chaque branche, vous pouvez consulter le service de test, le nombre de tests affichant le statut Passed/Failed/Skipped, les régressions de test, le wall time, le pourcentage de changement par rapport à la branche par défaut, la date de la dernière mise à jour du commit ainsi que l'avatar de l'auteur du commit.

Cliquez sur une branche pour explorer la page des détails des tests et consulter des informations sur les derniers commits, les tests irréguliers, les performances des tests, les types d'erreurs les plus courants, et toutes les exécutions de test.

{{< img src="continuous_integration/test_details.png" alt="Page Test Details pour une branche spécifique" style="width:100%;">}}

#### Performances de vos collections de tests

Outre les résultats des tests, cette page indique le [wall time][104] de la dernière exécution de collection de tests et compare le wall time moyen de votre branche avec celui de la branche par défaut. La comparaison du wall time entre votre branche et la branche par défaut vous permet de vérifier si votre commit a entraîné une [régression][106] des performances de votre collection de tests.

Passez le curseur sur l'avatar d'un auteur de commit pour afficher des informations détaillées sur son dernier commit.

#### Régressions de test

Les [régressions de test][106] sont évaluées pour chaque commit dans le but de lier les régressions de performance à des modifications de code spécifiques.

#### Obtenir des données supplémentaires

Cliquez sur une ligne pour afficher des données supplémentaires concernant l'exécution de la collecte de tests, notamment les résultats pour le dernier commit de cette branche (ou d'autres branches), les tests ayant échoué et les erreurs les plus fréquentes, les tests lents, les tests irréguliers et la liste complète des exécutions de test sur un intervalle précis. Vous pouvez filtrer cette liste d'exécutions par facette, afin d'afficher les informations dont vous avez le plus besoin.

Cliquez sur une exécution de test pour afficher la trace du test sous la forme d'un flamegraph ou d'une liste de spans. Accédez rapidement aux traces de chaque nouvelle tentative du test pour un commit depuis la liste _Runs (n)_ située à gauche de la page.

#### Explorer les connexions vers les services, ressources, logs et événements réseau

Cliquez sur le lien du fournisseur CI pour accéder à la page Resource, Service ou Analytics du test. Vous pouvez également consulter des informations complètes sur les tags et accéder aux événements de log et de surveillance réseau associés.

### Vue Default Branches

La vue [Default Branches][107] de la page Tests présente des métriques de santé agrégées pour la branche _par défaut_ de chaque service de test. Cette vue permet aux équipes de mieux comprendre l'évolution de la santé globale d'un service.

Les informations fournies dans la vue Default Branches sont similaires à celles de la vue Branches, mais s'appliquent à la branche par défaut. Cette vue compare le wall time actuel avec le wall time moyen de la branche par défaut. Vous pouvez ainsi évaluer à quel point les performances de votre collection de tests évoluent avec le temps.

[101]: https://app.datadoghq.com/ci/test-services
[102]: https://app.datadoghq.com/ci/test-services?view=branches
[103]: /fr/glossary/#test-service
[104]: /fr/glossary/#wall-time
[105]: /fr/glossary/#flaky-test
[106]: /fr/glossary/#test-regression
[107]: https://app.datadoghq.com/ci/test-services?view=default-branches

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}