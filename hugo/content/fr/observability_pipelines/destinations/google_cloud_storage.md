---
description: Apprenez à envoyer des logs vers un bucket Google Cloud Storage, éventuellement
  pour l'archivage et la réhydratation dans Datadog.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destination Google Cloud Storage
---
{{< product-availability >}}

## Présentation {#overview}

<div class="alert alert-info">Pour les versions 2.7 et ultérieures de Worker, la destination Google Cloud prend en charge <a href = "https://cloud.google.com/storage/docs/uniform-bucket-level-access">l'accès uniforme au niveau du bucket</a>. Google <a href = "https://cloud.google.com/storage/docs/uniform-bucket-level-access#should-you-use">recommande</a> d'utiliser l'accès uniforme au niveau du bucket. <br>Pour les versions de Worker antérieures à 2.7, seules les <a href = "https://cloud.google.com/storage/docs/access-control/lists">listes de contrôle d'accès (ACL)</a> sont prises en charge.</div>

Utilisez la destination Google Cloud Storage pour envoyer vos logs vers un bucket Google Cloud Storage. Si vous souhaitez envoyer des logs vers Google Cloud Storage pour l'[archivage][1] et la [réhydratation][2], vous devez [configurer Log Archives](#configure-log-archives). Si vous ne souhaitez pas réhydrater les logs dans Datadog, passez à [Configurer la destination pour votre pipeline](#set-up-the-destinations).

L'Observability Pipelines Worker utilise les méthodes d'authentification Google standard. Consultez [Authentication methods at Google][6] pour plus d'informations sur le choix de la méthode d'authentification adaptée à votre cas d'utilisation.

## Configurer Log Archives{#configure-log-archives}

Cette étape n'est requise que si vous souhaitez envoyer des logs vers Google Cloud Storage pour l'[archivage][1] et la [réhydratation][2], et que vous n'avez pas encore configuré de Datadog Log Archives pour Observability Pipelines. Si vous avez déjà configuré Datadog Log Archives ou si vous ne souhaitez pas réhydrater vos logs dans Datadog, passez à [Configurer la destination pour votre pipeline](#set-up-the-destinations).

Si vous avez déjà configuré Datadog Log Archives pour Observability Pipelines, passez à [Configurer la destination pour votre pipeline](#set-up-the-destination-for-your-pipeline).

Vous devez avoir installé l'[intégration Google Cloud Platform][3] de Datadog pour configurer Datadog Log Archives.

### Créer un bucket de stockage {#create-a-storage-bucket}

1. Accédez à [Google Cloud Storage][16].
1. Sur la page Buckets, cliquez sur **Create** pour créer un bucket pour vos archives.
1. Saisissez un nom pour le bucket et choisissez l'emplacement de stockage de vos données.
1. Sélectionnez **Fine-grained** dans la section **Choose how to control access to objects**.
1. N'ajoutez pas de politique de rétention car les données les plus récentes doivent être réécrites dans certains cas rares (généralement un cas de délai d'attente).
1. Cliquez sur **Create**.

### Créez un compte de service pour permettre aux Workers d'écrire dans le bucket {#create-a-service-account-to-allow-workers-to-write-to-the-bucket}

1. Créez un [compte de service][17] Google Cloud Storage.
    - Accordez au compte de service les autorisations sur votre bucket avec les autorisations `Storage Admin` et `Storage Object Admin`.
    - Si vous souhaitez vous authentifier avec un fichier d'identifiants, téléchargez le fichier de clé du compte de service et placez-le sous `DD_OP_DATA_DIR/config`. Vous référencez ce fichier lorsque vous configurez la [destination Google Cloud Storage](#set-up-the-destinations) plus tard.
1. Suivez ces [instructions][18] pour créer une clé de compte de service. Choisissez `json` pour le type de clé.

### Connectez le bucket de stockage à Datadog Log Archives {#connect-the-storage-bucket-to-datadog-log-archives}

1. Accédez à Datadog [Log Forwarding][19].
1. Cliquez sur **New archive**.
1. Saisissez un nom descriptif pour l'archive.
1. Ajoutez une requête qui filtre tous les logs passant par les log pipelines afin qu'aucun de ces logs ne soit envoyé dans cette archive. Par exemple, ajoutez la requête `observability_pipelines_read_only_archive`, en supposant qu'aucun log passant par le pipeline ne possède ce tag.
1. Sélectionnez **Google Cloud Storage**.
1. Sélectionnez le compte de service dans lequel se trouve votre bucket de stockage.
1. Sélectionnez le projet.
1. Saisissez le nom du bucket de stockage que vous avez créé précédemment.
1. Saisissez éventuellement un chemin.
1. Optionnellement, définissez des autorisations, ajoutez des tags et définissez la taille d'analyse maximale pour la réhydratation. Consultez [Paramètres avancés][20] pour plus d'informations.
1. Cliquez sur **Enregistrer**.

Consultez la documentation Log Archives [1] pour plus d'informations.

## Configurez la destination de votre pipeline {#set-up-the-destinations}

Configurez la destination Google Cloud Storage lorsque vous [configurez un pipeline][4]. Vous pouvez configurer un pipeline dans l'[UI][10], en utilisant l'[API][11] ou avec [Terraform][12]. Les étapes de cette section sont configurées dans l'UI.

Après avoir sélectionné la destination Google Cloud Storage dans le pipeline UI :

1. Saisissez le nom de votre bucket Google Cloud Storage. Si vous avez configuré Datadog Log Archives, il s'agit du bucket que vous avez créé précédemment.
1. Si vous disposez d'un fichier JSON d'identifiants, saisissez le chemin d'accès à ce fichier. Si vous avez configuré Datadog Log Archives, il s'agit des identifiants que vous avez téléchargés [précédemment](#create-a-service-account-to-allow-workers-to-write-to-the-bucket). Le fichier d'identifiants doit être placé sous `DD_OP_DATA_DIR/config`. Alternativement, vous pouvez utiliser la variable d'environnement `GOOGLE_APPLICATION_CREDENTIALS` pour fournir le chemin d'accès aux identifiants.
    - Si vous utilisez [workload identity][9] sur Google Kubernetes Engine (GKE), le `GOOGLE_APPLICATION_CREDENTIALS` est fourni automatiquement.
    - Le Worker utilise les [méthodes d'authentification Google][8] standard.
1. Sélectionnez la classe de stockage pour les objets créés.
1. Sélectionnez le niveau d'accès des objets créés.

### Paramètres facultatifs {#optional-settings}

#### Prefix to apply to all key objects {#prefix-to-apply-to-all-key-objects}

Saisissez un préfixe que vous souhaitez appliquer à tous les objets clés.

- Les préfixes sont utiles pour partitionner les objets. Par exemple, vous pouvez utiliser un préfixe comme clé d'objet pour stocker des objets dans un répertoire particulier. Si vous utilisez un préfixe à cette fin, il doit se terminer par `/` pour agir comme un chemin de répertoire ; une barre oblique finale `/` n'est pas ajoutée automatiquement.
- Consultez la [syntaxe de modèle][7] si vous souhaitez acheminer les logs vers différentes clés d'objet en fonction de champs spécifiques dans vos logs.
  - **Remarque** : Datadog recommande de commencer vos préfixes par le nom du répertoire et sans barre oblique initiale (`/`). Par exemple, `app-logs/` ou `service-logs/`.

#### Métadonnées {#metadata}

1. Cliquez sur {{< ui >}}Add Header{{< /ui >}} pour ajouter des métadonnées.
1. Saisissez des valeurs pour le nom et la valeur de l'en-tête.

#### Mise en tampon {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Valeurs par défaut du secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

Il n'y a aucun identifiant de secret à configurer.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_google_cloud_storage %}}

{{% /tab %}}
{{< /tabs >}}

## Métriques de santé {#health-metrics}

Pour les [métriques de composant][13] et les [métriques de tampon de destination][14] émises par toutes les destinations, consultez la documentation sur les [métriques d'utilisation des pipelines][15]. Pour filtrer ou regrouper par métriques de destination Google Cloud Storage, utilisez le tag `component_type:datadog_archives_gcs`.

## Comment fonctionne la destination {#how-the-destination-works}

### Regroupement d'événements {#event-batching}

Un lot d'événements est vidé lorsque l'un de ces paramètres est atteint. Consultez [Destinations event batching][5] pour plus d'informations.

| Nombre maximal d'événements | Taille maximale (Mo) | Délai d'expiration (secondes)   |
|----------------|-------------------|---------------------|
| Aucun           | 100               | 900                 |

[1]: /fr/logs/log_configuration/archives/
[2]: /fr/logs/log_configuration/rehydrating/
[3]: /fr/integrations/google_cloud_platform/#setup
[4]: /fr/observability_pipelines/configuration/set_up_pipelines/
[5]: /fr/observability_pipelines/destinations/#event-batching
[6]: https://cloud.google.com/docs/authentication#auth-flowchart
[7]: /fr/observability_pipelines/destinations/#template-syntax
[8]: https://cloud.google.com/docs/authentication#auth-flowchart
[9]: https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[10]: https://app.datadoghq.com/observability-pipelines
[11]: /fr/api/latest/observability-pipelines/
[12]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[13]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[14]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[15]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[16]: https://console.cloud.google.com/storage
[17]: https://console.cloud.google.com/iam-admin/serviceaccounts
[18]: https://cloud.google.com/iam/docs/keys-create-delete#creating
[19]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[20]: /fr/logs/log_configuration/archives/?tab=awss3#advanced-settings