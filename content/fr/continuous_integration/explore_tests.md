---
further_reading:
- link: /continuous_integration/guides/find_flaky_tests/
  tag: Guide
  text: Identifier les tests irréguliers
- link: /continuous_integration/guides/rum_integration/
  tag: Guide
  text: Associer les solutions CI Visibility et RUM
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage de l'intégration continue
- link: https://www.datadoghq.com/blog/ci-test-visibility-with-rum/
  tag: Blog
  text: Dépannage de tests de bout en bout avec CI Visibility et RUM
kind: documentation
title: Explorer les tests
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">À l'heure actuelle, la solution CI Visibility n'est pas disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

La page [Tests][1], qui se trouve sous le menu CI dans Datadog, présente les métriques et les résultats importants de vos tests. Ces données sur les tests vous permettent de visualiser l'état de santé global de votre intégration continue. Cette page vous aide à étudier les problèmes de performance et les échecs de tests. Pour garantir la pertinence des données affichées, Datadog tient principalement compte du code auquel vous avez contribué, et accorde une importance moindre aux pipelines que vous gérez (même si les tests y sont exécutés).

## Explorer des tests

La page Tests dispose de deux vues : _Branches_ et _Default Branches_.

### Vue Branches

La vue [Branches][2] de la page Tests affiche toutes les branches de tous les services de test ayant transmis des résultats. Cet onglet permet aux développeurs de visualiser en quelques secondes le statut des tests qui s'exécutent sur leurs branches de code et de corriger les échecs.

Vous pouvez filtrer les données de cette page par nom, service de test ou hash de commit. Il est également possible d'afficher uniquement vos branches (celles qui contiennent un commit dont vous êtes à l'origine). Pour ce faire, activez l'option **My branches** et ajoutez les adresses e-mail que vous utilisez dans votre configuration Git.

#### Résultats des tests

Pour chaque branche, la liste contient les résultats des tests correspondant au dernier commit. Le nombre total de tests par statut est indiqué : il prend en compte les nouvelles tentatives découlant d'un échec. Vous pouvez également consulter le nombre de nouveaux tests irréguliers générés par le commit. Un test est considéré comme irrégulier lorsqu'il réussit et échoue pour un même commit.

#### Performances de vos collections de tests

Outre les résultats des tests, cette page indique le wall time de la dernière exécution de collection de tests et compare le wall time moyen de votre branche avec celui de la branche par défaut. Le _wall time_ correspond à la durée d'exécution réelle d'une collection de tests. Lorsque vos tests sont exécutés simultanément, le wall time est inférieur à la durée de chaque test. La comparaison du wall time entre votre branche et la branche par défaut vous permet de vérifier si votre commit nuit aux performances de votre collection de tests.

Passez le curseur sur l'avatar d'un auteur de commit pour afficher des informations détaillées sur son dernier commit.

#### Obtenir des données supplémentaires

Cliquez sur une ligne pour afficher des données supplémentaires concernant l'exécution de la collecte de tests, notamment les résultats pour le dernier commit de cette branche (ou d'autres branches), les tests ayant échoué et les erreurs les plus fréquentes, les tests lents, les tests irréguliers et la liste complète des exécutions de test sur un intervalle précis. Vous pouvez filtrer cette liste d'exécutions par facette, afin d'afficher les informations dont vous avez le plus besoin.

Cliquez sur une exécution de test pour afficher la trace du test sous la forme d'un flamegraph ou d'une liste de spans. Accédez rapidement aux traces de chaque nouvelle tentative du test pour un commit depuis la liste _Runs (n)_ située à gauche de la page.

#### Explorer les connexions vers les services, ressources, logs et événements réseau

Cliquez sur le lien du fournisseur CI pour accéder à la page Resource, Service ou Analytics du test. Vous pouvez également consulter des informations complètes sur les tags et accéder aux événements de log et de surveillance réseau associés.

### Vue Default Branches

Un _service de test_ correspond à un groupe de tests qui sont associés, par exemple, à un projet ou à un référentiel. Il contient tous les tests individuels s'appliquant à votre code. Un service de test peut être organisé au sein de _collections de tests_, à savoir des dossiers rassemblant vos tests. La vue [Default Branches][3] de la page Tests présente des métriques de santé agrégées pour la branche _par défaut_ de chaque service de test. Cette vue permet aux équipes de mieux comprendre l'évolution de la santé globale d'un service. 

Les informations fournies dans la vue Default Branches sont similaires à celles de la vue Branches, mais s'appliquent à la branche par défaut. En outre, les données sont triées par ordre chronologique (les plus récentes s'affichant en premier). Cette vue compare le wall time actuel avec le wall time moyen de la branche par défaut. Vous pouvez ainsi évaluer à quel point les performances de votre collection de tests évoluent avec le temps.

Cliquez sur une ligne pour analyser les exécutions de test sur la branche par défaut (tout comme dans la vue Branches).

## Explorer des exécutions de test

La page [Test Runs][4] présente la liste de toutes les exécutions de test sur un intervalle donné, filtrées par facette, ce qui vous permet d'étudier les informations d'une exécution précise. Chaque exécution de test est transmise sous la forme d'une trace. Ainsi, pour des tests d'intégration, les traces comprennent les appels vers des datastores ou des services tiers effectués à l'aide de l'[instrumentation APM][5] standard.

Cliquez sur une exécution de test spécifique pour afficher le flamegraph associé ou la liste des spans du test pour chacune de ses exécutions (tout comme sur la page Tests).

Vous pouvez également représenter de façon interactive des graphiques et des top lists depuis l'onglet [Analytics][6].

{{< img src="ci/ci-test-runs.png" alt="Analyse des exécutions de test" style="width:100%;">}}

### Représentation de données tierces

Les spans qui sont générées par des services tiers instrumentés par l'APM et qui sont incluses dans des tests d'intégration s'affichent dans la section [APM][7]. Vous pouvez filtrer les spans générées dans le cadre d'un test d'intégration à l'aide de la facette `Origin Service` et choisir le nom du service de test utilisé par le test d'intégration.

## Utiliser les données des tests CI

Vous pouvez utiliser les données de vos exécutions de test lorsque vous créez des widgets dans des [dashboards][8] et des [notebooks][9].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test-services
[2]: https://app.datadoghq.com/ci/test-services?view=branches
[3]: https://app.datadoghq.com/ci/test-services?view=default-branches
[4]: https://app.datadoghq.com/ci/test-runs
[5]: https://www.datadoghq.com/auto-instrumentation/
[6]: https://app.datadoghq.com/ci/test-runs?viz=timeseries
[7]: /fr/tracing/
[8]: https://app.datadoghq.com/dashboard/lists
[9]: https://app.datadoghq.com/notebook/list