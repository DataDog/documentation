---
aliases:
- /fr/ci
- /fr/continuous_integration/pipelines_setup/
- /fr/continuous_integration/explore_pipelines/
- /fr/continuous_integration/setup_pipelines/
cascade:
  algolia:
    rank: 70
    tags:
    - ci/cd
    - continuous integration
further_reading:
- link: /account_management/billing/ci_visibility
  tag: Documentation
  text: En savoir plus sur les considérations relatives à la facturation pour CI Visibility
- link: /continuous_integration/tests/
  tag: Documentation
  text: Explorez les données de test pour trouver et corriger les tests problématiques
- link: /monitors/types/ci/
  tag: Documentation
  text: Création de monitors de pipeline CI
- link: /cicd/troubleshooting/pipelines/
  tag: Documentation
  text: Dépannage de CI Visibility
- link: https://www.datadoghq.com/blog/circleci-monitoring-datadog/
  tag: Blog
  text: Surveillez votre environnement CircleCI avec Datadog
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: Blog
  text: Configurez des alertes de pipeline avec les monitors CI de Datadog
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
  text: Stratégies pour purger le cache de manière sûre et efficace dans les pipelines
    CI/CD
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

<div class="alert alert-info">Cette page explique comment intégrer vos métriques et données d'intégration continue (CI) dans les dashboards Datadog. Si vous souhaitez exécuter des tests de Continuous Testing dans vos pipelines CI, consultez la section <a href="/continuous_testing/cicd_integrations/" target="_blank">Continuous Testing and CI/CD</a>.</div>

Datadog Continuous Integration (CI) Visibility offre une vue unifiée des résultats, des performances, des tendances et de la fiabilité des pipelines dans vos environnements CI. En intégrant Datadog à vos pipelines CI, vous pouvez créer des monitors, afficher des données dans des [dashboards Datadog][1] et des [notebooks][2], et créer des visualisations sur l'état de santé de la CI de votre organisation.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/664357090/rendition/1080p/file.mp4?loc=external&signature=5ef9bc02bd8fb18c07a4a41ea3ac08b72bd0ab0b5d914429da049120d1e9e9b7" poster="/images/poster/ci.png" >}}

</br>

CI Visibility aide les développeurs à comprendre les causes des interruptions de pipeline et à surveiller les tendances des temps d'exécution des pipelines. Il offre également aux ingénieurs build des informations sur la santé CI et les performances des pipelines à l'échelle de l'organisation au fil du temps.

## Améliorez la fiabilité des pipelines et créez des traces {#improve-pipeline-reliability-and-create-traces}

CI Visibility vous aide à résoudre les échecs de pipeline et les builds défaillants en reliant les pannes de développement les plus importantes aux commits qui les ont causées. Vous pouvez instrumenter vos pipelines et les tracer au fur et à mesure de leur exécution, ce qui permet d'obtenir des informations plus approfondies sur les performances des pipelines.

## Configurer CI Visibility {#set-up-ci-visibility}

Datadog s'intègre à divers fournisseurs CI pour collecter des métriques qui suivent les performances de vos pipelines CI, du commit au déploiement. Sélectionnez votre fournisseur CI pour configurer CI Visibility dans Datadog :

{{< card-grid card_width="225px" >}}
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

Vous pouvez également utiliser le CLI `datadog-ci` pour tracer les commandes dans vos pipelines et ajouter des tags et des mesures personnalisés. Les tags et mesures personnalisés vous permettent d'ajouter à vos traces de pipeline des tags textuels et numériques définis par l'utilisateur.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/continuous_integration/pipelines/custom_commands/" >}}Commandes personnalisées{{< /nextlink >}}
    {{< nextlink href="/continuous_integration/pipelines/custom_tags_and_measures/" >}}Tags et mesures personnalisés{{< /nextlink >}}
{{< /whatsnext >}}

## Fonctionnalités prises en charge {#supported-features}

### Visibilité et exécution des pipelines {#pipeline-visibility-and-execution}

| <div style="width:200px"><div> | AWS CodePipeline | Azure Pipelines | Buildkite | CircleCI | Codefresh | GitHub Actions | GitLab | Jenkins | TeamCity | Autres fournisseurs CI |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="Logs Storage" >}}Stockage des logs de pipeline ou de job provenant du fournisseur CI. Les logs sont affichés dans l'onglet <strong>Logs</strong> de la vue Pipeline Execution.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< ci-details title="Corrélation d'infrastructure" >}}Corrélation des informations au niveau du host pour le Datadog Agent, les pipelines CI ou les exécuteurs de jobs avec les données d'exécution des pipelines CI.{{< /ci-details >}} |  |  | {{< X >}} |  |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| {{< ci-details title="Pipelines en cours d'exécution" >}}Identification des exécutions de pipelines en cours, accompagnées d'un traçage associé.{{< /ci-details >}} | {{< X >}} | | | | | {{< X >}} | {{< X >}} | {{< X >}} | | {{< X >}} |
| {{< ci-details title="Jobs en cours d'exécution" >}}Identification des exécutions de jobs en cours, accompagnées d'un traçage associé.{{< /ci-details >}} |  |  |  |  |  | {{< X >}} | {{< X >}} |  |  | {{< X >}} |
| {{< ci-details title="Relances partielles" >}}Identification des relances partielles (par exemple, lorsqu'un sous-ensemble de jobs a été relancé).{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  {{< X >}} |
| {{< ci-details title="Granularité des étapes" >}}Les spans au niveau des étapes sont disponibles pour une visibilité plus granulaire.{{< /ci-details >}} |  | {{< X >}} <br /> (_Intégration Datadog uniquement_) | {{< X >}} <br /> (_Preview_) |  | {{< X >}} | {{< X >}} |  | {{< X >}} <br /> (_Présenté sous forme de spans de job_) |  |  {{< X >}} |
| {{< ci-details title="Étapes manuelles" >}}Identification du moment où un job comporte une phase d'approbation manuelle dans le pipeline global.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |  {{< X >}} |

### Analyse et actions automatiques {#automatic-analysis-and-actions}

| <div style="width:200px"><div> | AWS CodePipeline | Azure Pipelines | Buildkite | CircleCI | Codefresh | GitHub Actions | GitLab | Jenkins | TeamCity | Autres fournisseurs CI |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="Logs Analysis" >}}Utilise des modèles LLM sur les logs pertinents pour analyser la cause racine des jobs CI ayant échoué. <a href="https://docs.datadoghq.com/continuous_integration/guides/use_ci_jobs_failure_analysis/">Plus d'informations</a>.{{< /ci-details >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | | {{< X >}} | {{< X >}} |
| {{< ci-details title="Chemin critique" >}}Identification des jobs CI se trouvant sur le chemin critique du pipeline. <a href="https://docs.datadoghq.com/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/">Plus d'informations</a>{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< ci-details title="Réessais automatiques de jobs" >}}Datadog réessaie les jobs échoués et classés comme transitoires par son modèle d'erreur IA. <a href="https://docs.datadoghq.com/continuous_integration/pipelines/automatic_retries/">Plus d'informations</a>.{{< /ci-details >}} |  |  |  |  |  | {{< X >}} | {{< X >}} |  |  |  |

### Répartition de la durée {#duration-breakdown}

| <div style="width:200px"><div> | AWS CodePipeline | Azure Pipelines | Buildkite | CircleCI | Codefresh | GitHub Actions | GitLab | Jenkins | TeamCity | Autres fournisseurs CI |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="Durée d'exécution" >}}Temps pendant lequel un pipeline a exécuté activement des jobs.{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< ci-details title="Temps d'attente en file :" >}}Temps pendant lequel un pipeline ou un job est resté dans la file d'attente avant son exécution.{{< /ci-details >}} |  |  | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  {{< X >}} |
| {{< ci-details title="Temps d'attente d'approbation">}}Temps pendant lequel un pipeline ou un job a attendu une approbation manuelle.{{< /ci-details >}} | {{< X >}} | {{< X >}}  |  |  |   |  {{< X >}}  | {{< X >}} |  |  |  |

### Personnalisation et extensibilité {#customization-and-extensibility}

| <div style="width:200px"><div> | AWS CodePipeline | Azure Pipelines | Buildkite | CircleCI | Codefresh | GitHub Actions | GitLab | Jenkins | TeamCity | Autres fournisseurs CI |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="Commandes personnalisées" >}}Prise en charge de l'utilisation de datadog-ci pour envoyer des événements au niveau des commandes à CI Visibility afin de les intégrer dans la visualisation en cascade des pipelines. Vous pouvez ensuite interroger et analyser <a href="https://docs.datadoghq.com/continuous_integration/pipelines/custom_commands/">ces événements</a>. {{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| {{< ci-details title="Tags statiques" >}}Prise en charge de la définition de tags de pipeline statiques dans le fournisseur CI qui ne changent pas entre les exécutions.{{< /ci-details >}} |  |  |  | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| {{< ci-details title="Tags d'exécution" >}}Prise en charge de l'ajout de <a href="https://docs.datadoghq.com/continuous_integration/pipelines/custom_tags_and_measures/">tags textuels et numériques définis par l'utilisateur</a> aux pipelines et aux jobs dans CI Visibility.{{< /ci-details >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  {{< X >}} |
| {{< ci-details title="Paramètres" >}}Prise en charge de l'ajout de paramètres de pipeline personnalisés définis par les utilisateurs (par exemple, <code>DYNAMICS_IS_CHILD:true</code>). Vous pouvez ensuite effectuer des recherches à l'aide de ces paramètres dans le <a href="https://docs.datadoghq.com/continuous_integration/explorer/?tab=pipelineexecutions">CI Visibility Explorer</a> pour trouver tous les événements associés à un paramètre spécifique.{{< /ci-details >}} |  |  |  |  | {{< X >}} |  | {{< X >}} | {{< X >}} |  |  {{< X >}} |

## Utiliser les données des pipelines CI{#use-ci-pipelines-data}

Explorez les détails de vos exécutions de pipeline dans le [CI Visibility Explorer][3]. Lors de la création d'un [dashboard][1] ou d'un [notebook][2], vous pouvez utiliser les données des pipelines CI dans votre requête de recherche, ce qui met à jour les options du widget de visualisation. Pour plus d'informations, consultez les [Dashboards][4] et la [documentation sur les Notebooks][5].

## Générer une alerte pour les données de pipeline {#alert-on-pipeline-data}

Vous pouvez exporter votre requête de recherche vers un [CI Pipeline monitor][6] depuis la [page {{< ui >}}Executions{{< /ui >}}][7] ou la [page {{< ui >}}Test Runs{{< /ui >}}][8] en cliquant sur le bouton {{< ui >}}Export{{< /ui >}}.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/notebook/list
[3]: /fr/continuous_integration/explorer/
[4]: /fr/dashboards
[5]: /fr/notebooks
[6]: /fr/monitors/types/ci
[7]: https://app.datadoghq.com/ci/pipeline-executions
[8]: https://app.datadoghq.com/ci/test-runs