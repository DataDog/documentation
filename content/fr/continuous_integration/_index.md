---
aliases:
- /fr/ci
cascade:
  algolia:
    rank: 70
    tags:
    - ci/cd
    - continuous integration
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notes de version
  text: Découvrez les dernières versions de la livraison de logiciels (connexion à
    l'application requise).
- link: https://www.datadoghq.com/blog/circleci-monitoring-datadog/
  tag: Blog
  text: Surveiller votre environnement CircleCI avec Datadog
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: Blog
  text: Configurer des alertes de pipeline avec les monitors CI Datadog
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Explorer les données de pipeline pour résoudre les problèmes liés aux builds
- link: /continuous_integration/tests/
  tag: Documentation
  text: Explorer les données de test pour identifier et résoudre les tests problématiques
- link: https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/
  tag: Blog
  text: Meilleures pratiques pour la surveillance des applications Web statiques
- link: https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/
  tag: Blog
  text: Meilleures pratiques pour la surveillance CI/CD
- link: https://www.datadoghq.com/blog/best-practices-for-monitoring-software-testing/
  tag: Blog
  text: Meilleures pratiques pour la surveillance de tests logiciels en CI/CD
- link: https://www.datadoghq.com/blog/modernize-your-ci-cd-environment/
  tag: Blog
  text: Surveiller vos modernisations CI/CD avec Datadog CI Pipeline Visibility
kind: documentation
title: Continuous Integration Visibility
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution CI Visibility n'est pas encore disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">Cette page explique comment intégrer vos métriques et données d'intégration continue (CI) dans des dashboards Datadog. Si vous souhaitez exécuter des tests continus dans vos pipelines CI, consultez plutôt la section <a href="/continuous_testing/cicd_integrations/" target="_blank">Tests continus et CI/CD</a>.</div>

## Présentation

La solution Continuous Integration (CI) Visibility de Datadog propose une vue unifiée des résultats, des performances, des tendances et de la fiabilité des pipelines sur l'ensemble de vos environnements CI. En intégrant Datadog à vos pipelines CI, vous pouvez créer des monitors, afficher des données dans des [dashboards][1] et des [notebooks][2] Datadog, et créer des vues pour la santé de lʼintégration continue de votre organisation.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/664357090/rendition/1080p/file.mp4?loc=external&signature=5ef9bc02bd8fb18c07a4a41ea3ac08b72bd0ab0b5d914429da049120d1e9e9b7" poster="/images/poster/ci.png" >}}

</br>

La solution CI Visibility aide les développeurs à comprendre les causes des perturbations des pipelines et à surveiller les tendances des temps d'exécution des pipelines. Elle fournit également aux ingénieurs build des informations sur l'état de santé de lʼintégration continue au sein de l'organisation et sur les performances des pipelines au fil du temps.

## Améliorer la fiabilité des pipelines et créer des traces

CI Visibility vous aide à corriger les erreurs liées aux builds défectueux et aux échecs de pipelines en associant les problèmes de développement les plus urgents aux commits qui en sont à lʼorigine. Vous pouvez instrumenter vos pipelines et générer, pendant leur exécution, des traces afin dʼobtenir des informations plus détaillées sur les performances du pipeline.

## Gagner en efficacité grâce aux intégrations directes

Datadog s'intègre à une variété de fournisseurs de CI pour collecter des métriques qui suivent les performances de vos pipelines de CI, du commit au déploiement. Ces métriques sont utilisées pour identifier les tendances de performances et les opportunités d'amélioration.

{{< partial name="continuous_integration/ci-pipelines-getting-started.html" >}}

</br>

Vous pouvez utiliser l'interface de ligne de commande `datadog-ci` pour [tracer des commandes][8] et ajouter des [tags et des mesures personnalisés][9], afin d'ajouter du texte défini par l'utilisateur et des tags numériques à vos traces de pipeline.

## Prêt à vous lancer ?

Consultez la section [Pipeline Visibility][3] pour apprendre à configurer CI Visibility avec vos fournisseurs CI, en savoir plus sur les exigences en matière de compatibilité, et découvrir comment configurer la collecte de données. Commencez ensuite à explorer les données de vos exécutions de pipeline depuis le [CI Visibility Explorer][7] et exportez votre requête de recherche dans un [monitor de pipeline CI][6].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/notebook/list
[3]: /fr/continuous_integration/pipelines/
[4]: /fr/continuous_integration/tests/
[6]: /fr/monitors/types/ci/
[7]: /fr/continuous_integration/explorer/
[8]: /fr/continuous_integration/pipelines/custom_commands/
[9]: /fr/continuous_integration/pipelines/custom_tags_and_measures/