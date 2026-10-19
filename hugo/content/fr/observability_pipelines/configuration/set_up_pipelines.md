---
aliases:
- /fr/observability_pipelines/set_up_pipelines/
description: Apprenez à configurer la source, les processeurs et les destinations
  d'un pipeline Observability Pipelines.
disable_toc: false
further_reading:
- link: observability_pipelines/configuration/pipeline_simulation/
  tag: Documentation
  text: Utilisez Pipeline Simulation pour ajouter, mettre à jour et valider vos processeurs.
- link: observability_pipelines/configuration/update_existing_pipelines/
  tag: Documentation
  text: Mettez à jour un pipeline existant.
- link: observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
  tag: Documentation
  text: Configurations avancées des Workers pour Observability Pipelines
- link: observability_pipelines/configuration/install_the_worker/run_multiple_pipelines_on_a_host/
  tag: Documentation
  text: Exécuter plusieurs pipelines sur un host
- link: observability_pipelines/monitoring_and_troubleshooting/troubleshooting/
  tag: Documentation
  text: Dépannage d'Observability Pipelines
title: Configurez des pipelines.
---
## Présentation {#overview}

<div class="alert alert-info">Les pipelines et processeurs décrits dans cette documentation sont spécifiques aux environnements de journalisation sur site. Pour agréger, traiter et acheminer les logs basés sur le cloud, consultez <a href="https://docs.datadoghq.com/logs/log_configuration/pipelines/?tab=source">Log Management Pipelines</a>.</div>

Dans Observability Pipelines, un pipeline est un chemin séquentiel composé de trois types de composants :
- [Source][1] : Reçoit les données de votre source de données (par exemple, le Datadog Agent).
- [Processeurs][2] : Enrichissent et transforment vos données.
- [Destinations][3] : L'endroit où vos données traitées sont envoyées.

{{< img src="observability_pipelines/archive_log_pipeline.png" alt="Pipeline avec une source connectée à deux groupes de processeurs et deux destinations" style="width:100%;" >}}

Vous pouvez créer un pipeline avec l'une des méthodes suivantes :

- [Pipeline UI](#set-up-a-pipeline-in-the-ui)
- [API](#set-up-a-pipeline-with-the-api)
- [Terraform](#set-up-a-pipeline-with-terraform)

Consultez [Exporter une configuration de pipeline vers JSON ou Terraform][14] si vous souhaitez déployer par programmation un pipeline créé dans l'UI.

## Configurez un pipeline dans l'UI {#set-up-a-pipeline-in-the-ui}

### Configurez les composants du pipeline {#set-up-pipeline-components}

{{< tabs >}}
{{% tab "Logs" %}}

1. Accédez à [Observability Pipelines][1].
1. Sélectionnez un [template][2] en fonction de votre cas d'utilisation, ou cliquez sur {{< ui >}}New Pipeline{{< /ui >}} et sélectionnez {{< ui >}}Logs Pipeline{{< /ui >}}.
1. Sélectionnez et configurez une [log source][3].
1. Sélectionnez et configurez des [destinations][5] pour vos logs traités.
1. Cliquez sur {{< ui >}}Edit{{< /ui >}} sur un groupe de processeurs pour ajouter, mettre à jour et valider vos [processors][4] à l'aide de la [Pipeline Simulation][6].
    - **Remarques** :
      - Pour un canevas de pipeline, il existe une limite de 25 groupes de processeurs et d'un total de 150 processeurs.
      - Si vous souhaitez copier un processeur, cliquez sur l'icône de copie correspondant à ce processeur, puis utilisez `command-v` pour le coller.

#### Ajoutez un autre groupe de processeurs {#add-another-processor-group}

{{< img src="observability_pipelines/setup/another_processor_group.png" alt="La page Pipelines affichant deux groupes de processeurs envoyant des logs vers la même destination" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_processor_group %}}

#### Ajoutez un autre ensemble de processeurs et de destinations {#add-another-set-of-processors-and-destinations}

{{< img src="observability_pipelines/setup/another_set_processor_destination.png" alt="La page Pipelines affichant deux groupes de processeurs envoyant des logs vers deux destinations différentes" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_set_of_processors_and_destinations %}}

#### Ajoutez une autre destination à un groupe de processeurs {#add-another-destination-to-a-processor-group}

{{< img src="observability_pipelines/setup/another_destination.png" alt="La page Pipelines affichant un groupe de processeurs envoyant des logs vers deux destinations différentes" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_destination %}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /fr/observability_pipelines/configuration/explore_templates/
[3]: /fr/observability_pipelines/sources/?tab=logs#sources
[4]: /fr/observability_pipelines/processors/
[5]: /fr/observability_pipelines/destinations/?tab=logs#destinations
[6]: /fr/observability_pipelines/configuration/pipeline_simulation/
[11]: /fr/observability_pipelines/search_syntax/logs/

{{% /tab %}}
{{% tab "Métriques" %}}

1. Accédez à [Observability Pipelines][1].
1. Sélectionnez le modèle [Metric Tag Governance][2], ou cliquez sur {{< ui >}}New Pipeline{{< /ui >}} et sélectionnez {{< ui >}}Metrics Pipeline{{< /ui >}}.
1. Sélectionnez et configurez une [source de métriques][3].
1. Sélectionnez et configurez des [destinations][5] pour vos métriques traitées.
1. Cliquez sur {{< ui >}}Edit{{< /ui >}} sur un groupe de processeurs pour ajouter, mettre à jour et valider vos [processors][4] à l'aide de la [Pipeline Simulation][6].
    - **Remarques** :
      - Pour un canevas de pipeline, il existe une limite de 25 groupes de processeurs et d'un total de 150 processeurs.
      - Si vous souhaitez copier un processeur, cliquez sur l'icône de copie correspondant à ce processeur, puis collez-le (`Cmd+V` sur Mac, `Ctrl+V` sur Windows/Linux).

#### Ajoutez un autre groupe de processeurs {#add-another-processor-group-1}

{{< img src="observability_pipelines/setup/another_processor_group_metrics.png" alt="La page Pipelines affichant deux groupes de processeurs envoyant des métriques vers la même destination" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_processor_group %}}

#### Ajoutez un autre ensemble de processeurs et de destinations {#add-another-set-of-processors-and-destinations-1}

{{< img src="observability_pipelines/setup/another_set_processor_destination_metrics.png" alt="La page Pipelines affichant deux groupes de processeurs envoyant des métriques vers deux destinations différentes" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_set_of_processors_and_destinations %}}

#### Ajoutez une autre destination à un groupe de processeurs {#add-another-destination-to-a-processor-group-1}

{{< img src="observability_pipelines/setup/another_destination_metrics.png" alt="La page Pipelines affichant un groupe de processeurs envoyant des métriques vers deux destinations différentes" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_destination %}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /fr/observability_pipelines/configuration/explore_templates/?tab=metrics#metric-tag-governance
[3]: /fr/observability_pipelines/sources/?tab=metrics#sources
[4]: /fr/observability_pipelines/processors/?tab=metrics#processors
[5]: /fr/observability_pipelines/destinations/?tab=metrics#destinations
[6]: /fr/observability_pipelines/configuration/pipeline_simulation/
[11]: /fr/observability_pipelines/search_syntax/metrics/

{{% /tab %}}
{{< /tabs >}}

### Installez le Worker et déployez le pipeline {#install-the-worker-and-deploy-the-pipeline}

Une fois votre source, vos processeurs et vos destinations configurés, cliquez sur {{< ui >}}Next: Install{{< /ui >}}. Consultez [Install the Worker][12] pour obtenir des instructions sur l'installation du Worker pour votre plateforme. Consultez [Advanced Worker Configurations][5] pour les options d'amorçage.

Si vous souhaitez apporter des modifications à votre pipeline après l'avoir déployé, consultez [Update Existing Pipelines][11].

### Activez les monitors prêts à l'emploi pour votre pipeline {#enable-out-of-the-box-monitors-for-your-pipeline}

1. Accédez à la page [Pipelines][4] et recherchez votre pipeline.
1. Cliquez sur {{< ui >}}Enable monitors{{< /ui >}} dans la colonne {{< ui >}}Monitors{{< /ui >}} pour votre pipeline.
1. Cliquez sur {{< ui >}}Start{{< /ui >}} pour configurer un monitor pour l'un des cas d'utilisation suggérés.<br>
    - Le monitor de métriques est configuré en fonction du cas d'utilisation sélectionné. Vous pouvez mettre à jour la configuration pour la personnaliser davantage. Consultez la [documentation du monitor de métriques][13] pour plus d'informations.

## Configurez un pipeline avec l'API {#set-up-a-pipeline-with-the-api}

1. Utilisez l'API Observability Pipelines pour [créer un pipeline][6]. Consultez la référence de l'API pour des exemples de charges utiles de requête.

1. Après avoir créé le pipeline, [installez le Worker][7] pour envoyer des données via le pipeline.
    - Consultez [Environment Variables][9] pour obtenir la liste des variables d'environnement nécessaires pour les différentes sources, processeurs et destinations lors de l'installation du Worker.

Utilisez l'endpoint [update a pipeline][8] pour apporter des modifications à un pipeline existant.

Consultez [Advanced Worker Configurations][5] pour les options d'amorçage.

## Configurez un pipeline avec Terraform {#set-up-a-pipeline-with-terraform}

<div class="alert alert-warning"><a href="https://github.com/DataDog/terraform-provider-datadog/releases/tag/v3.84.0">Terraform 3.84.0</a> remplace les processeurs autonomes par des <a href="/observability_pipelines/processors/#processor-groups">groupes de processeurs</a> et constitue un changement incompatible. Si vous souhaitez passer à Terraform 3.84.0, consultez la <a href="https://github.com/DataDog/terraform-provider-datadog/pull/3346">description de la PR</a> pour obtenir des instructions sur la façon de migrer vos ressources existantes.</div>

1. Vous pouvez utiliser le module [datadog_observability_pipeline][10] pour créer un pipeline à l'aide de Terraform.

1. Après avoir créé le pipeline, [installez le Worker][16] pour envoyer des données via le pipeline.
    - Consultez [Environment Variables][9] pour obtenir la liste des variables d'environnement nécessaires pour les différentes sources, processeurs et destinations lors de l'installation du Worker.

Utilisez le module [datadog_observability_pipeline][10] pour apporter des modifications à un pipeline existant.

Consultez [Advanced Worker Configurations][5] pour les options d'amorçage.

## Clonez un pipeline {#clone-a-pipeline}

Pour cloner un pipeline dans l'UI :

1. Accédez à [Observability Pipelines][4].
1. Sélectionnez le pipeline que vous souhaitez cloner.
1. Cliquez sur la roue dentée en haut à droite de la page, puis sélectionnez {{< ui >}}Clone{{< /ui >}}.

## Supprimez un pipeline {#delete-a-pipeline}

Pour supprimer un pipeline dans l'UI :

1. Accédez à [Observability Pipelines][4].
1. Sélectionnez le pipeline que vous souhaitez supprimer.
1. Cliquez sur la roue dentée en haut à droite de la page, puis sélectionnez {{< ui >}}Delete{{< /ui >}}.

**Remarque** : Vous ne pouvez pas supprimer un pipeline actif. Vous devez arrêter tous les Workers d'un pipeline avant de pouvoir le supprimer.

## Exigences et limites du pipeline {#pipeline-requirements-and-limits}

- Un pipeline doit avoir au moins une destination. Si un groupe de processeurs n'a qu'une seule destination, cette destination ne peut pas être supprimée.
- Pour les pipelines de logs :
  - Vous pouvez ajouter un total de 20 destinations pour un pipeline de logs.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/observability_pipelines/sources/
[2]: /fr/observability_pipelines/processors/
[3]: /fr/observability_pipelines/destinations/
[4]: https://app.datadoghq.com/observability-pipelines
[5]: /fr/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
[6]: /fr/api/latest/observability-pipelines/#create-a-new-pipeline
[7]: /fr/observability_pipelines/configuration/install_the_worker/?interface=api&platform=docker&secrets_source=secrets_management
[8]: /fr/api/latest/observability-pipelines/#update-a-pipeline
[9]: /fr/observability_pipelines/guide/environment_variables/
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[11]: /fr/observability_pipelines/configuration/update_existing_pipelines/?
[12]: /fr/observability_pipelines/configuration/install_the_worker/
[13]: /fr/monitors/types/metric/
[14]: /fr/observability_pipelines/configuration/export_pipeline_configuration/
[16]: /fr/observability_pipelines/configuration/install_the_worker/?interface=terraform&platform=docker&secrets_source=secrets_management