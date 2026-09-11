---
aliases:
- /fr/observability_pipelines/set_up_pipelines/
disable_toc: false
further_reading:
- link: observability_pipelines/configuration/update_existing_pipelines/
  tag: Documentation
  text: Mettre à jour un pipeline existant
- link: observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
  tag: Documentation
  text: 'Configurations avancées du Worker pour les pipelines d’observabilité :'
- link: observability_pipelines/configuration/install_the_worker/run_multiple_pipelines_on_a_host/
  tag: Documentation
  text: Exécuter plusieurs pipelines sur un hôte
- link: observability_pipelines/monitoring_and_troubleshooting/troubleshooting/
  tag: Documentation
  text: Dépannage des pipelines d'observabilité
title: Configurer des pipelines
---
## Aperçu {#overview}

<div class="alert alert-info">Les pipelines et les processeurs décrits dans cette documentation sont spécifiques aux environnements de journalisation sur site. Pour agréger, traiter et acheminer les journaux basés sur le cloud, voir <a href="https://docs.datadoghq.com/logs/log_configuration/pipelines/?tab=source">Pipelines de gestion des journaux</a>.</div>

Dans les pipelines d'observabilité, un pipeline est un chemin séquentiel avec trois types de composants :
- [Source][1] : Reçoit des données de votre source de données (par exemple, le Datadog Agent).
- [Processeurs][2] : Enrichissent et transforment vos données.
- [Destinations][3] : Où vos données traitées sont envoyées.

{{< img src="observability_pipelines/archive_log_pipeline.png" alt="Pipeline avec une source connectée à deux groupes de processeurs et deux destinations" style="width:100%;" >}}

Vous pouvez créer un pipeline par l'une des méthodes suivantes :

- [Pipeline UI](#set-up-a-pipeline-in-the-ui)
- [API](#set-up-a-pipeline-with-the-api)
- [Terraform](#set-up-a-pipeline-with-terraform)

Voir [Exporter une configuration de pipeline vers JSON ou Terraform][14] si vous souhaitez déployer de manière programmatique un pipeline créé dans l'interface utilisateur.

## Configurer un pipeline dans l'interface utilisateur {#set-up-a-pipeline-in-the-ui}

### Configurer les composants du pipeline {#set-up-pipeline-components}

{{< tabs >}}
{{% tab "Logs" %}}

1. Naviguez vers [Observability Pipelines][1].
1. Sélectionnez un [modèle][2] en fonction de votre cas d'utilisation.
1. Sélectionnez et configurez votre [source][3].
1. Ajoutez des [Processeurs][4] pour transformer, masquer et enrichir vos données de journal. **Remarque** : Pour un canevas de pipeline, il y a une limite de 25 groupes de processeurs et un total de 150 processeurs.
    - Si vous souhaitez copier un processeur, cliquez sur l'icône de copie pour ce processeur, puis utilisez `command-v` pour le coller.
1. Sélectionnez et configurez des [Destinations][5] pour vos journaux traités.

#### Ajoutez ou supprimez des composants {#add-or-remove-components}

##### Ajoutez un autre groupe de processeurs {#add-another-processor-group}

{{< img src="observability_pipelines/setup/another_processor_group.png" alt="La page des Pipelines montrant deux groupes de processeurs envoyant des journaux vers la même destination." style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_processor_group %}}

##### Ajoutez un autre ensemble de processeurs et de destinations {#add-another-set-of-processors-and-destinations}

{{< img src="observability_pipelines/setup/another_set_processor_destination.png" alt="La page des Pipelines montrant deux groupes de processeurs envoyant des journaux vers deux destinations différentes." style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_set_of_processors_and_destinations %}}

##### Ajoutez une autre destination à un groupe de processeurs {#add-another-destination-to-a-processor-group}

{{< img src="observability_pipelines/setup/another_destination.png" alt="La page des Pipelines montrant un groupe de processeurs envoyant des journaux vers deux destinations différentes." style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_destination %}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /fr/observability_pipelines/configuration/explore_templates/
[3]: /fr/observability_pipelines/sources/
[4]: /fr/observability_pipelines/processors/
[5]: /fr/observability_pipelines/destinations/
[11]: /fr/observability_pipelines/search_syntax/logs/

{{% /tab %}}
{{% tab "Metrics" %}}

<div class="alert alert-info">
La gouvernance des balises métriques est en aperçu. Remplissez le <a href="https://www.datadoghq.com/product-preview/metrics-ingestion-and-cardinality-control-in-observability-pipelines/">formulaire</a> pour demander l'accès.</div>

1. Naviguez vers [Observability Pipelines][1].
1. Sélectionnez le modèle [Gouvernance des balises métriques][2].
1. Configurez la source [Datadog Agent][3].
1. Ajoutez des [processeurs][4] pour filtrer et transformer vos métriques. **Remarque** : Pour un canevas de pipeline, il y a une limite de 25 groupes de processeurs et un total de 150 processeurs.
    - Si vous souhaitez copier un processeur, cliquez sur l'icône de copie pour ce processeur, puis collez-le (`Cmd+V` sur Mac, `Ctrl+V` sur Windows/Linux).
1. Configurez la destination [Datadog Metrics][5].

#### Ajoutez un autre groupe de processeurs {#add-another-processor-group-1}

{{< img src="observability_pipelines/setup/another_processor_group_metrics.png" alt="La page des Pipelines montrant deux groupes de processeurs envoyant des journaux vers la même destination." style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_processor_group %}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /fr/observability_pipelines/configuration/explore_templates/?tab=metrics#metric-tag-governance
[3]: /fr/observability_pipelines/sources/datadog_agent/?tab=metrics
[4]: /fr/observability_pipelines/processors/
[5]: /fr/observability_pipelines/destinations/datadog_metrics/
[11]: /fr/observability_pipelines/search_syntax/metrics/

{{% /tab %}}
{{< /tabs >}}

### Installez le Worker et déployez le pipeline {#install-the-worker-and-deploy-the-pipeline}

Après avoir configuré votre source, vos processeurs et vos destinations, cliquez sur **Suivant : Installer**. Consultez [Installer le Worker][12] pour des instructions sur l'installation du Worker pour votre plateforme. Consultez [Configurations avancées du Worker][5] pour les options de démarrage.

Si vous souhaitez apporter des modifications à votre pipeline après l'avoir déployé, consultez [Mettre à jour les pipelines existants][11].

### Activez les moniteurs prêts à l'emploi pour votre pipeline {#enable-out-of-the-box-monitors-for-your-pipeline}

1. Accédez à la page [Pipelines][4] et trouvez votre pipeline.
1. Cliquez sur **Enable monitors** dans la colonne **Monitors** pour votre pipeline.
1. Cliquez sur **Start** pour configurer un moniteur pour l'un des cas d'utilisation suggérés.<br>
    - Le moniteur de métriques est configuré en fonction du cas d'utilisation sélectionné. Vous pouvez mettre à jour la configuration pour la personnaliser davantage. Consultez la [documentation du moniteur de métriques][13] pour plus d'informations.

## Configurez un pipeline avec l'API {#set-up-a-pipeline-with-the-api}

1. Utilisez l'API des Pipelines d'Observabilité pour [créer un pipeline][6]. Consultez la référence de l'API pour des exemples de charges utiles de requête.

1. Après avoir créé le pipeline, [installez le Worker][7] pour envoyer des données à travers le pipeline.
    - Consultez [Variables d'environnement][9] pour la liste des variables d'environnement dont vous avez besoin pour les différentes sources, processeurs et destinations lors de l'installation du Worker.

Utilisez le point de terminaison [mettre à jour un pipeline][8] pour apporter des modifications à un pipeline existant.

Consultez [Configurations avancées du Worker][5] pour les options de démarrage.

## Configurez un pipeline avec Terraform {#set-up-a-pipeline-with-terraform}

<div class="alert alert-warning"><a href="https://github.com/DataDog/terraform-provider-datadog/releases/tag/v3.84.0">Terraform 3.84.0</a> remplace les processeurs autonomes par des <a href="/observability_pipelines/processors/#processor-groups">groupes de processeurs</a> et constitue un changement majeur. Si vous souhaitez mettre à niveau vers Terraform 3.84.0, consultez la <a href="https://github.com/DataDog/terraform-provider-datadog/pull/3346">description du PR</a> pour des instructions sur la façon de migrer vos ressources existantes.</div>

1. Vous pouvez utiliser le module [datadog_observability_pipeline][10] pour créer un pipeline avec Terraform.

1. Après avoir créé le pipeline, [installez le Worker][7] pour envoyer des données à travers le pipeline.
    - Consultez [Variables d'environnement][9] pour la liste des variables d'environnement nécessaires pour les différentes sources, processeurs et destinations lors de l'installation du Worker.

Utilisez le module [datadog_observability_pipeline][10] pour apporter des modifications à un pipeline existant.

Consultez [Configurations avancées du Worker][5] pour les options de démarrage.

## Clonez un pipeline {#clone-a-pipeline}

Pour cloner un pipeline dans l'interface utilisateur :

1. Accédez à [Observability Pipelines][4].
1. Sélectionnez le pipeline que vous souhaitez cloner.
1. Cliquez sur l'icône en haut à droite de la page, puis sélectionnez **Cloner**.

## Supprimez un pipeline {#delete-a-pipeline}

Pour supprimer un pipeline dans l'interface utilisateur :

1. Accédez à [Observability Pipelines][4].
1. Sélectionnez le pipeline que vous souhaitez supprimer.
1. Cliquez sur l'icône en haut à droite de la page, puis sélectionnez **Supprimer**.

**Remarque** : Vous ne pouvez pas supprimer un pipeline actif. Vous devez arrêter tous les Workers pour un pipeline avant de pouvoir le supprimer.

## Exigences et limites du pipeline {#pipeline-requirements-and-limits}

- Un pipeline doit avoir au moins une destination. Si un groupe de processeurs n'a qu'une seule destination, cette destination ne peut pas être supprimée.
- Pour les pipelines de journalisation :
  - Vous pouvez ajouter un total de trois destinations pour un pipeline de journalisation.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/observability_pipelines/sources/
[2]: /fr/observability_pipelines/processors/
[3]: /fr/observability_pipelines/destinations/
[4]: https://app.datadoghq.com/observability-pipelines
[5]: /fr/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
[6]: /fr/api/latest/observability-pipelines/#create-a-new-pipeline
[7]: /fr/observability_pipelines/configuration/install_the_worker/?tab=docker#api-or-terraform-pipeline-setup
[8]: /fr/api/latest/observability-pipelines/#update-a-pipeline
[9]: /fr/observability_pipelines/guide/environment_variables/
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[11]: /fr/observability_pipelines/configuration/update_existing_pipelines/?
[12]: /fr/observability_pipelines/configuration/install_the_worker/
[13]: /fr/monitors/types/metric/
[14]: /fr/observability_pipelines/configuration/export_pipeline_configuration/