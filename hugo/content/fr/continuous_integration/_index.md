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
- link: /continuous_integration/pipelines/
  tag: Documentation
  text: Explorez les données de pipeline pour résoudre les problèmes de build
- link: /account_management/billing/ci_visibility
  tag: Documentation
  text: Découvrez les considérations de facturation pour CI Visibility
- link: /continuous_integration/tests/
  tag: Documentation
  text: Explorez les données de test pour trouver et corriger les tests problématiques
- link: https://www.datadoghq.com/blog/circleci-monitoring-datadog/
  tag: Blog
  text: Surveillez votre environnement CircleCI avec Datadog
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: Blog
  text: Configurez les alertes de pipeline avec les monitors CI de Datadog
- link: https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/
  tag: Blog
  text: Meilleures pratiques pour la surveillance des applications Web statiques
- link: https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/
  tag: Blog
  text: Meilleures pratiques pour la surveillance CI/CD
- link: https://www.datadoghq.com/blog/best-practices-for-monitoring-software-testing/
  tag: Blog
  text: Bonnes pratiques pour la surveillance des tests logiciels en CI/CD
- link: https://www.datadoghq.com/blog/modernize-your-ci-cd-environment/
  tag: Blog
  text: Surveillez vos modernisations CI/CD avec Datadog CI Pipeline Visibility
- link: https://www.datadoghq.com/blog/datadog-detection-as-code/
  tag: Blog
  text: Comment nous utilisons Datadog pour la détection en tant que code
- link: https://www.datadoghq.com/blog/cache-purge-ci-cd/
  tag: Blog
  text: Modèles pour une purge de cache sûre et efficace dans les pipelines CI/CD
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: Blog
  text: Résolvez les problèmes plus rapidement avec l'intégration GitLab Source Code
    dans Datadog
- link: https://www.datadoghq.com/blog/platform-engineering-metrics/
  tag: Blog
  text: Métriques de succès pour les équipes d'ingénierie de plateforme
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notes de version
  text: Découvrez les dernières versions de Software Delivery ! (Connexion à l'application
    requise)
title: Continuous Integration Visibility
---
{{< callout url=# btn_hidden="true" header="CI Visibility fait partie de CI/CD Optimization">}}CI/CD Optimization combine CI Visibility et Test Optimization dans une interface unifiée. Cette page couvre CI Visibility ; pour les fonctionnalités partagées avec Test Optimization, consultez [CI/CD Optimization][1].

[1]: /fr/cicd/
{{< /callout >}}

{{< learning-center-callout header="Rejoignez une session de webinaire de formation" hide_image="true" btn_title="S'inscrire" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=CI">}}
  Rejoignez la session d'introduction à CI Visibility pour comprendre comment Datadog CI Visibility améliore l'efficacité des pipelines CI et comment configurer les produits Testing Visibility et Pipeline Visibility. 
{{< /learning-center-callout >}}

## Présentation {#overview}

<div class="alert alert-info">Cette page explique comment intégrer vos métriques et données de Continuous Integration (CI) dans les Dashboards Datadog. Si vous souhaitez exécuter des tests Continuous Testing dans vos pipelines CI, consultez la section <a href="/continuous_testing/cicd_integrations/" target="_blank">Continuous Testing and CI/CD</a>.</div>

Datadog Continuous Integration (CI) Visibility offre une vue unifiée des résultats, des performances, des tendances et de la fiabilité des pipelines dans vos environnements CI. En intégrant Datadog à vos pipelines CI, vous pouvez créer des monitors, afficher des données dans des [Dashboards Datadog][1] et des [notebooks][2], et créer des visualisations de l'état de santé de la CI de votre organisation.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/664357090/rendition/1080p/file.mp4?loc=external&signature=5ef9bc02bd8fb18c07a4a41ea3ac08b72bd0ab0b5d914429da049120d1e9e9b7" poster="/images/poster/ci.png" >}}

</br>

CI Visibility aide les développeurs à comprendre les causes des interruptions de pipeline et à surveiller les tendances des temps d'exécution des pipelines. Il offre également aux ingénieurs build des informations sur l'état de la CI et les performances des pipelines à l'échelle de plusieurs organisations au fil du temps.

## Améliorez la fiabilité des pipelines et créez des traces {#improve-pipeline-reliability-and-create-traces}

CI Visibility vous aide à résoudre les échecs de pipeline et les builds défaillants en reliant les incidents de développement les plus importants aux commits qui les ont causés. Vous pouvez instrumenter vos pipelines et les tracer au fur et à mesure de leur exécution, ce qui permet d'obtenir des informations plus approfondies sur les performances des pipelines.

## Gagnez en efficacité grâce à des intégrations fluides {#increase-efficiency-through-seamless-integrations}

Datadog s'intègre à divers fournisseurs de CI pour collecter des métriques qui suivent les performances de vos pipelines CI, du commit au déploiement. Ces métriques sont utilisées pour identifier les tendances de performance et les opportunités d'amélioration.

{{< card-grid >}}
  {{< image-card href="/continuous_integration/pipelines/awscodepipeline/" src="integrations_logos/aws-codepipeline_small.svg" alt="aws codepipeline" >}}
  {{< image-card href="/continuous_integration/pipelines/azure/" src="integrations_logos/azure-pipelines_small.svg" alt="extension Azure DevOps" >}}
  {{< image-card href="/continuous_integration/pipelines/buildkite/" src="integrations_logos/buildkite_small.svg" alt="buildkite" >}}
  {{< image-card href="/continuous_integration/pipelines/circleci/" src="integrations_logos/circleci.png" alt="CircleCI orb" >}}
  {{< image-card href="/continuous_integration/pipelines/codefresh/" src="integrations_logos/codefresh_small.svg" alt="codefresh" >}}
  {{< image-card href="/continuous_integration/pipelines/github/" src="integrations_logos/github_small.svg" alt="github actions" >}}
  {{< image-card href="/continuous_integration/pipelines/gitlab/" src="integrations_logos/gitlab-logo-100.svg" alt="gitlab" >}}
  {{< image-card href="/continuous_integration/pipelines/jenkins/" src="integrations_logos/jenkins.png" alt="jenkins" >}}
  {{< image-card href="/continuous_integration/pipelines/teamcity/" src="integrations_logos/teamcity_small.svg" alt="teamcity" >}}
  {{< image-card href="/continuous_integration/pipelines/custom/" src="integrations_logos/docs_other_ci_providers.png" alt="autres fournisseurs CI" >}}
{{< /card-grid >}}

Vous pouvez utiliser l'interface de ligne de commande `datadog-ci` pour [tracer des commandes][8] et ajouter des [tags et mesures personnalisés][9], ce qui vous permet d'ajouter des tags textuels et numériques définis par l'utilisateur dans vos traces de pipeline.

## Prêt à commencer ? {#ready-to-start}

Consultez [Pipeline Visibility][3] pour obtenir des instructions sur la configuration de CI Visibility avec vos fournisseurs de CI, y compris des détails sur les exigences de compatibilité et les étapes de configuration de la collecte de données. Ensuite, commencez à explorer les détails de vos exécutions de pipeline dans [CI Visibility Explorer][7] et exportez votre requête de recherche dans un [CI Pipeline Monitor][6].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/notebook/list
[3]: /fr/continuous_integration/pipelines/
[4]: /fr/continuous_integration/tests/
[6]: /fr/monitors/types/ci/
[7]: /fr/continuous_integration/explorer/
[8]: /fr/continuous_integration/pipelines/custom_commands/
[9]: /fr/continuous_integration/pipelines/custom_tags_and_measures/