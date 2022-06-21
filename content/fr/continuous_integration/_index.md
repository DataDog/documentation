---
title: Continuous Integration Visibility
kind: documentation
aliases:
  - /fr/ci
further_reading:
  - link: /continuous_integration/explore_pipelines/
    tag: Documentation
    text: Explorer les données de pipeline pour résoudre les problèmes liés aux builds
  - link: /continuous_integration/explore_tests/
    tag: Documentation
    text: Explorer les données de tests pour identifier et corriger les tests problématiques
  - link: https://www.datadoghq.com/blog/circleci-monitoring-datadog/
    tag: Blog
    text: Surveiller votre environnement CircleCI avec Datadog
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">À l'heure actuelle, la solution CI Visibility n'est pas disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

La solution Continuous Integration (CI) Visibility de Datadog regroupe au sein d'une seule interface des informations sur les résultats des pipelines et des tests CI, _ainsi que_ des données relatives aux performances, aux tendances et à la fiabilité de l'intégration continue. Elle offre aux développeurs les moyens d'analyser les raisons derrière l'échec d'un test ou d'un pipeline, de surveiller les tendances relatives à la durée d'exécution des collections de tests, ou encore d'observer l'incidence d'un certain commit sur un pipeline. Ce n'est pas tout : grâce à CI Visibility, les ingénieurs build disposent d'une vue d'ensemble de l'intégration continue à l'échelle de l'organisation et peuvent surveiller l'évolution des performances des pipelines.

CI Visibility intègre des métriques et données CI aux dashboards Datadog. Vous pouvez ainsi partager l'état de santé de votre environnement CI et faire en sorte que votre équipe fournisse systématiquement du code de qualité.

CI Visibility vous aide à corriger les erreurs liées aux builds défectueux et aux échecs de test en associant les problèmes de développement les plus urgents aux commits à leur origine. Vous pouvez instrumenter vos tests et générer, pendant leur exécution dans le pipeline de CI, des traces à partir de vos frameworks de test, à l'aide des mêmes bibliothèques que vous utilisez pour tracer les performances des applications avec l'APM. De même, Datadog propose des intégrations pour plusieurs fournisseurs CI. Vous pouvez ainsi récupérer des métriques sur vos pipelines et suivre l'évolution des performances et des résultats durant toutes les étapes d'un commit, de son intégration au pipeline à son déploiement. Les données accumulées vous permettent de surveiller les performances de vos tests et builds et d'identifier les problèmes prioritaires.

## Obtenir des informations utiles sur vos pipelines

La page Pipelines de Datadog se révèle particulièrement utile pour les développeurs qui surveillent le pipeline de build de leur service. Elle leur permet ainsi de répondre à plusieurs types de questions :
- Le pipeline de votre service fonctionne-t-il bien, notamment sur la branche par défaut ?
- Dans le cas contraire, quelle est la cause à l'origine du problème ?

Pour les ingénieurs build, la page Pipelines comprend :
- un aperçu de la santé de l'ensemble du système de build, avec des statistiques agrégées pour les exécutions de pipelines et les branches ;
- Une vue permettant de détecter et de résoudre rapidement les problèmes immédiats et urgents, comme les pipelines défectueux mis en production ;
- des informations sur l'exécution globale de chaque pipeline, ainsi que les résultats obtenus et les tendances détectées ;
- une analyse détaillée du temps consacré à chaque tâche de chaque étape de build, afin de concentrer vos efforts là où ils feront une réelle différence. 

Les données sur les pipelines de CI peuvent être présentées dans des [dashboards][1] et des [notebooks][2]. Les ingénieurs build peuvent donc personnaliser leurs visualisations sur l'évolution des tâches prioritaires et des tendances CI.

## Obtenir des informations utiles sur vos tests

Les pages Tests et Test Runs offrent deux types de données aux développeurs :

- Des informations immédiates et précises :
    - Découvrez les tests ayant échoué et la raison derrière cet échec.
    - Consultez les résultats de test de votre dernier commit.
    - Consultez le wall time de vos tests dans votre branche de fonctionnalité et comparez-le à celui de la branche par défaut, pour savoir si vous êtes sur le point de nuire aux performances de la branche.
    - Découvrez si votre commit introduit un nouveau test irrégulier qui ne l'était pas auparavant, ce qui voudrait dire que le changement de code est à l'origine du problème. Cette approche vous permet de résoudre le problème avant la validation du commit, au lieu d'ajouter de plus en plus de tests irréguliers dans votre intégration continue.

- Des informations globales et des tendances :
    - Découvrez quelle est l'incidence d'une modification de code, d'un ajout de tests ou d'une complexité accrue sur les performances de votre collection de tests au fil du temps.
    - Identifiez les tests dont les performances se détériorent au fil du temps et identifiez le commit à l'origine de ce problème.
    - Tirez parti de l'outil de détection et de suivi automatique des tests irréguliers de Datadog, qui met en évidence les tests qui perdent en fiabilité au fil du temps.

Vous pouvez également représenter les données d'exécution des tests dans des [dashboards][1] et des [notebooks][2].

## Prêt à vous lancer ?

Consultez les sections relatives à la [configuration des pipelines][3] et à la [configuration des tests][4] pour découvrir comment configurer Datadog avec vos fournisseurs CI, en savoir plus sur la compatibilité des solutions CI, et découvrir les étapes d'instrumentation et de configuration de la collecte de données CI. Explorez ensuite les vues CI Visibility Datadog grâce aux sections [Explorer les pipelines][5] et [Explorer les tests][6].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/notebook/list
[3]: /fr/continuous_integration/setup_pipelines/
[4]: /fr/continuous_integration/setup_tests/
[5]: /fr/continuous_integration/explore_pipelines/
[6]: /fr/continuous_integration/explore_tests/