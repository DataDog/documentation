---
description: Apprenez à envoyer des logs vers un conteneur Azure Storage, éventuellement
  pour l'archivage et la réhydratation dans Datadog.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destination Azure Storage
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la destination Azure Storage pour envoyer des logs vers un conteneur Azure Storage. Si vous souhaitez envoyer des logs vers un conteneur Azure Storage pour l'[archivage][1] et la [réhydratation][2], vous devez [configurer Log Archives](#configure-log-archives). Si vous ne souhaitez pas réhydrater les logs dans Datadog, passez à [Configurer la destination pour votre pipeline](#set-up-the-destination-for-your-pipeline).

## Configurer Log Archives{#configure-log-archives}

Cette étape n'est requise que si vous souhaitez envoyer des logs vers Azure Storage dans un format réhydratable par Datadog pour l'[archivage][1] et la [réhydratation][2], et que vous n'avez pas encore configuré de Log Archive Datadog pour Observability Pipelines. Si vous avez déjà configuré une Log Archive Datadog ou si vous ne souhaitez pas réhydrater les logs dans Datadog, passez à [Configurer la destination pour votre pipeline](#set-up-the-destination-for-your-pipeline).

Vous devez avoir installé [Azure integration][3] de Datadog pour configurer Log Archives.

#### Créer un compte de stockage {#create-a-storage-account}

Créez un [compte de stockage Azure][13] si vous n'en avez pas déjà un.

1. Accédez à [Storage accounts][14].
1. Cliquez sur **Create**.
1. Sélectionnez le nom de l'abonnement et le nom de la ressource que vous souhaitez utiliser.
1. Saisissez un nom pour votre compte de stockage.
1. Sélectionnez une région dans le menu déroulant.
1. Sélectionnez le type de compte **Standard** ou **Premium**.
1. Cliquez sur **Next**.
1. Dans la section **Blob storage**, sélectionnez **Hot** ou **Cool**.
1. Cliquez sur **Review + create**.

#### Créez un conteneur de stockage {#create-a-storage-bucket}

1. Dans votre compte de stockage, cliquez sur **Containers** sous **Data storage** dans le menu de navigation de gauche.
1. Cliquez sur **+ Container** en haut pour créer un conteneur.
1. Saisissez un nom pour le nouveau conteneur. Ce nom est utilisé ultérieurement lors de la configuration de la destination Azure Storage pour Observability Pipelines.

**Remarque** : Ne définissez pas de [immutability policies][15] car les données les plus récentes pourraient devoir être réécrites dans de rares cas (généralement en cas de délai d'attente).

#### Connectez le conteneur Azure aux Log Archives Datadog {#connect-the-azure-container-to-datadog-log-archives}

1. Accédez à [Log Forwarding][16] dans Datadog.
1. Cliquez sur **New archive**.
1. Saisissez un nom descriptif pour l'archive.
1. Ajoutez une requête qui filtre tous les logs passant par les log pipelines afin qu'aucun de ces logs ne soit envoyé dans cette archive. Par exemple, ajoutez la requête `observability_pipelines_read_only_archive`, en supposant qu'aucun log passant par le pipeline ne possède ce tag.
1. Sélectionnez **Azure Storage**.
1. Sélectionnez le tenant et le client Azure dans lesquels se trouve votre compte de stockage.
1. Saisissez le nom du compte de stockage.
1. Saisissez le nom du conteneur que vous avez créé précédemment.
1. Saisissez éventuellement un chemin.
1. Optionnellement, définissez des autorisations, ajoutez des tags et définissez la taille d'analyse maximale pour la réhydratation. Consultez [Advanced settings][17] pour plus d'informations.
1. Cliquez sur **Enregistrer**.

Consultez la documentation Log Archives [1] pour plus d'informations.

## Configurez la destination de votre pipeline {#set-up-the-destination-for-your-pipeline}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement l'identifiant de la chaîne de connexion Azure. Ne <b>saisissez</b> pas la valeur réelle.</div>

Configurez la destination Azure Storage lorsque vous [configurez un pipeline][4]. Vous pouvez configurer un pipeline dans l'[UI][7], en utilisant l'[API][8] ou avec [Terraform][9]. Les étapes de cette section sont configurées dans l'UI.

Après avoir sélectionné la destination Azure Storage dans le pipeline UI :

1. Saisissez l'identifiant de votre chaîne de connexion Azure. Si vous le laissez vide, la [valeur par défaut](#secret-defaults) est utilisée.
1. Saisissez le nom du conteneur Azure que vous avez créé précédemment.

{{% observability_pipelines/secrets_env_var_note %}}

### Paramètres facultatifs {#optional-settings}

#### Prefix to apply to all key objects {#prefix-to-apply-to-all-key-objects}

Saisissez un préfixe que vous souhaitez appliquer à tous les objets clés.

- Les préfixes sont utiles pour partitionner les objets. Par exemple, vous pouvez utiliser un préfixe comme clé d'objet pour stocker des objets dans un répertoire particulier. Si vous utilisez un préfixe à cette fin, il doit se terminer par `/` pour agir comme un chemin de répertoire ; une barre oblique finale `/` n'est pas ajoutée automatiquement.
- Consultez [template syntax][6] si vous souhaitez acheminer les logs vers différentes clés d'objet en fonction de champs spécifiques dans vos logs.
	- **Remarque** : Datadog recommande de commencer vos préfixes par le nom du répertoire et sans barre oblique initiale (`/`). Par exemple, `app-logs/` ou `service-logs/`.

#### Mise en tampon {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Valeurs par défaut du secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Azure connection string identifier:
	- Référence la chaîne de connexion qui donne au Worker accès à votre conteneur Azure Storage.
	- L'identifiant par défaut est `DESTINATION_DATADOG_ARCHIVES_AZURE_BLOB_CONNECTION_STRING`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_azure_storage %}}

{{% /tab %}}
{{< /tabs >}}

## Métriques de santé {#health-metrics}

Pour les [métriques de composant][10] et les [métriques de tampon de destination][11] émises par toutes les destinations, consultez la documentation [Métriques d'utilisation des pipelines][12]. Pour filtrer ou regrouper par métriques de destination Azure Storage, utilisez le tag `component_type:datadog_archives_azure_blob`.

## Comment fonctionne la destination {#how-the-destination-works}

### Regroupement d'événements {#event-batching}

Un lot d'événements est vidé lorsque l'un de ces paramètres est atteint. Consultez [Destinations event batching][5] pour plus d'informations.

| Nombre maximal d'événements | Taille maximale (Mo) | Délai d'expiration (secondes)   |
|----------------|-------------------|---------------------|
| Aucun           | 100               | 900                 |

[1]: /fr/logs/log_configuration/archives/
[2]: /fr/logs/log_configuration/rehydrating/
[3]: /fr/integrations/azure/#setup
[4]: /fr/observability_pipelines/configuration/set_up_pipelines/
[5]: /fr/observability_pipelines/destinations/#event-batching
[6]: /fr/observability_pipelines/destinations/#template-syntax
[7]: https://app.datadoghq.com/observability-pipelines
[8]: /fr/api/latest/observability-pipelines/
[9]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[10]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[11]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[12]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[13]: https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[14]: https://portal.azure.com/#browse/Microsoft.Storage%2FStorageAccounts
[15]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-immutability-policies-manage
[16]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[17]: /fr/logs/log_configuration/archives/?tab=awss3#advanced-settings