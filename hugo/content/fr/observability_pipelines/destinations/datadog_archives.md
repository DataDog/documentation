---
description: Apprenez à envoyer des logs vers Amazon S3 au format réhydratable par
  Datadog pour l'archivage et la réhydratation.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destination Archives Datadog
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la destination Archives Datadog pour envoyer des logs vers Amazon S3 pour l'[archivage][1] au format réhydratable par Datadog. Vous pouvez ensuite interroger ces logs avec la [Archive Search][16]. Utilisez le mode {{< ui >}}Search & Rehydration{{< /ui >}} d'Archive Search lorsque vous devez réindexer les résultats pour un accès complet à la plateforme.

**Remarques** : 
- La destination Archives Datadog compresse les logs en utilisant gzip.
- Utilisez la destination [Amazon S3][12] si vous souhaitez envoyer vos logs vers Amazon S3 au format JSON ou Parquet.

Vous pouvez également [acheminer les logs vers Snowflake en utilisant la destination Archives Datadog](#route-logs-to-snowflake-using-the-datadog-archives-destination).

## Prérequis {#prerequisites}

Pour utiliser la destination Archives Datadog, vous devez installer l'[intégration AWS][3] de Datadog afin de pouvoir configurer les [Archives de logs Datadog](#configure-log-archives).

## Configurer Log Archives{#configure-log-archives}

Si vous avez déjà configuré Datadog Log Archives, passez à [Configurer la destination pour votre pipeline](#set-up-the-destination-for-your-pipeline).

{{% observability_pipelines/configure_log_archive/amazon_s3/instructions %}}

### Configurez une politique IAM qui autorise les Workers à écrire dans le bucket S3 {#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket}

1. Accédez à la [console IAM][11].
1. Sélectionnez **Policies** dans le menu de gauche.
1. Cliquez sur **Create policy**.
1. Cliquez sur **JSON** dans la section **Specify permissions**.
1. Copiez la politique ci-dessous et collez-la dans l'**Policy editor**. Remplacez `<MY_BUCKET_NAME_1>` et `<MY_BUCKET_NAME_1>/<MY_OPTIONAL_BUCKET_PATH_1>` par les informations du bucket S3 que vous avez créé dans la section précédente.
    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "DatadogUploadAndRehydrateLogArchives",
                "Effect": "Allow",
                "Action": ["s3:PutObject", "s3:GetObject"],
                "Resource": "arn:aws:s3:::<MY_BUCKET_NAME_1>/<MY_OPTIONAL_BUCKET_PATH_1>/*"
            },
            {
                "Sid": "DatadogRehydrateLogArchivesListBucket",
                "Effect": "Allow",
                "Action": "s3:ListBucket",
                "Resource": "arn:aws:s3:::<MY_BUCKET_NAME_1>"
            }
        ]
    }
    ```
1. Cliquez sur **Next**.
1. Saisissez un nom de politique descriptif.
1. Ajoutez éventuellement des tags.
1. Cliquez sur **Create policy**.

{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/docker %}}

{{% /tab %}}
{{% tab "Amazon EKS" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/amazon_eks %}}

{{% /tab %}}
{{% tab "Linux (APT)" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/linux_apt %}}

{{% /tab %}}
{{% tab "Linux (RPM)" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/linux_rpm %}}

{{% /tab %}}
{{< /tabs >}}

### Connectez le bucket S3 à Datadog Log Archives {#connect-the-s3-bucket-to-datadog-log-archives}

1. Accédez à Datadog [Log Forwarding][17].
1. Cliquez sur **New archive**.
1. Saisissez un nom descriptif pour l'archive.
1. Ajoutez une requête qui filtre tous les logs passant par les log pipelines afin qu'aucun de ces logs ne soit envoyé dans cette archive. Par exemple, ajoutez la requête `observability_pipelines_read_only_archive`, en supposant qu'aucun log passant par le pipeline ne possède ce tag.
1. Sélectionnez **AWS S3**.
1. Sélectionnez le compte AWS dans lequel se trouve votre bucket.
1. Saisissez le nom du bucket S3.
1. Saisissez éventuellement un chemin.
1. Cochez la déclaration de confirmation.
1. Ajoutez éventuellement des tags et définissez la taille d'analyse maximale pour la réhydratation. Consultez [Advanced settings][18] pour plus d'informations.
1. Cliquez sur **Enregistrer**.

Consultez la documentation Log Archives [1] pour plus d'informations.

## Configurez la destination de votre pipeline {#set-up-the-destination-for-your-pipeline}

Configurez la destination Datadog Archives lorsque vous configurez un Log Archives pipeline [4]. Vous pouvez configurer un pipeline dans l'[UI][13], en utilisant l'[API][14] ou avec [Terraform][15]. Les étapes de cette section sont configurées dans l'UI.

Après avoir sélectionné la destination Datadog Archives dans l'interface utilisateur du pipeline :

1. Saisissez le nom de votre bucket S3. Si vous avez configuré Datadog Log Archives, il s'agit du nom du bucket que vous avez créé précédemment.
1. Saisissez la région AWS dans laquelle se trouve le bucket S3.
1. Saisissez le préfixe de clé.
    - Les préfixes sont utiles pour partitionner les objets. Par exemple, vous pouvez utiliser un préfixe comme clé d'objet pour stocker des objets dans un répertoire particulier. Si vous utilisez un préfixe à cette fin, il doit se terminer par `/` pour agir comme un chemin de répertoire ; une barre oblique finale `/` n'est pas ajoutée automatiquement.
    - Consultez la [template syntax][8] si vous souhaitez acheminer les logs vers différentes clés d'objet en fonction de champs spécifiques dans vos logs.
     - **Remarque** : Datadog recommande de commencer vos préfixes par le nom du répertoire et sans barre oblique initiale (`/`). Par exemple, `app-logs/` ou `service-logs/`.
1. Sélectionnez la classe de stockage pour votre bucket S3 dans le menu déroulant {{< ui >}}Storage Class{{< /ui >}}. Si vous prévoyez d'archiver et de réhydrater vos logs :
    - **Remarque** : La réhydratation ne prend en charge que les [classes de stockage][9] suivantes :
        - Standard
        - Intelligent-Tiering, uniquement si [les niveaux d'accès aux archives asynchrones facultatifs][10] sont tous deux désactivés.
        - Standard-IA
        - One Zone-IA
    - Si vous souhaitez réhydrater à partir d'archives dans une autre classe de stockage, vous devez d'abord les déplacer vers l'une des classes de stockage prises en charge ci-dessus.
    - Consultez la section [Exemple de configuration de destination et d'archive de logs](#example-destination-and-log-archive-setup) de cette page pour savoir comment configurer votre archive de logs en fonction de votre configuration de destination Amazon S3.

### Paramètres facultatifs {#optional-settings}

#### Authentification AWS {#aws-authentication}

Sélectionnez une option d'authentification AWS. Si vous utilisez uniquement [l'utilisateur ou le rôle que vous avez créé précédemment](#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket) pour l'authentification, ne sélectionnez pas {{< ui >}}Assume role{{< /ui >}}. Sélectionnez {{< ui >}}Assume role{{< /ui >}} uniquement si l'utilisateur ou le rôle que vous avez créé précédemment doit assumer un rôle différent pour accéder à la ressource AWS. Les autorisations du rôle assumé doivent être explicitement définies.<br>Si vous sélectionnez {{< ui >}}Assume role{{< /ui >}} :
1. Saisissez l'ARN du rôle IAM que vous souhaitez assumer.
    - **Remarque :** [L'utilisateur ou le rôle que vous avez créé précédemment](#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket) doit avoir l'autorisation d'assumer ce rôle afin que le Worker puisse s'authentifier auprès d'AWS.
1. (Facultatif) Saisissez le nom de session du rôle assumé et l'ID externe.

#### Mise en tampon {#buffering}

{{% observability_pipelines/destination_buffer %}}

### Exemple de configuration de destination et d'archive de logs {#example-destination-and-log-archive-setup}

Si vous saisissez les valeurs suivantes pour votre Datadog Archives destination :
- Bucket S3 : `test-op-bucket`
- Préfixe à appliquer à toutes les clés d'objet : `op-logs`
- Classe de stockage pour les objets créés : `Standard`

{{< img src="observability_pipelines/setup/amazon_s3_destination.png" alt="La configuration de la Datadog Archives destination avec les valeurs d'exemple" style="width:40%;" >}}

Alors voici les valeurs que vous saisissez pour configurer le S3 bucket pour Datadog Log Archives :

- Bucket S3 : `test-op-bucket`
- Chemin : `op-logs`
- Classe de stockage : `Standard`

{{< img src="observability_pipelines/setup/amazon_s3_archive.png" alt="La configuration de Datadog Log Archives avec les valeurs d'exemple" style="width:70%;" >}}

## Valeurs par défaut du secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

Il n'y a aucun identifiant de secret à configurer.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/destination_env_vars/datadog_archives_amazon_s3 %}}

{{% /tab %}}
{{< /tabs >}}

## Acheminer les logs vers Snowflake en utilisant la Datadog Archives destination {#route-logs-to-snowflake-using-the-datadog-archives-destination}

Vous pouvez acheminer les logs d'Observability Pipelines vers Snowflake en utilisant la Datadog Archives destination en configurant Snowpipe dans Snowflake pour ingérer automatiquement ces logs. Snowpipe surveille en continu votre S3 bucket pour détecter les nouveaux fichiers et les ingère automatiquement dans vos tables Snowflake, garantissant ainsi une disponibilité des données en temps quasi réel pour l'analyse ou un traitement ultérieur. Lorsque les logs sont collectés par Observability Pipelines, ils sont écrits dans un S3 bucket. Pour configurer cela :
1. Configurez [Log Archives](#configure-log-archives).
1. [Set up a pipeline][5] pour utiliser Datadog Archives comme destination de logs. Utilisez la configuration détaillée dans [Set up the destination for your pipeline](#set-up-the-destination-for-your-pipeline).
1. Configurez Snowpipe dans Snowflake. Consultez [Automating Snowpipe for Amazon S3][6] pour obtenir des instructions.

## Comment fonctionne la destination {#how-the-destination-works}

### Authentification AWS {#aws-authentication-1}

{{% observability_pipelines/aws_authentication/instructions %}}

#### Permissions {#permissions}

L'Observability Pipelines Worker nécessite ces autorisations de politique pour envoyer des logs vers Amazon S3 :

- `s3:ListBucket`
- `s3:PutObject`
- `s3:GetObject`

### Regroupement d'événements {#event-batching}

Un lot d'événements est vidé lorsque l'un de ces paramètres est atteint. Consultez [Destinations event batching][7] pour plus d'informations.

| Nombre maximal d'événements | Taille maximale (Mo) | Délai d'expiration (secondes)   |
|----------------|-------------------|---------------------|
| Aucun           | 100               | 900                 |

[1]: /fr/logs/log_configuration/archives/
[2]: /fr/logs/log_configuration/rehydrating/
[3]: /fr/integrations/amazon_web_services/#setup
[4]: /fr/observability_pipelines/configuration/explore_templates/?tab=logs#archive-logs
[5]: /fr/observability_pipelines/configuration/set_up_pipelines/
[6]: https://docs.snowflake.com/en/user-guide/data-load-snowpipe-auto-s3
[7]: /fr/observability_pipelines/destinations/#event-batching
[8]: /fr/observability_pipelines/destinations/#template-syntax
[9]: /fr/logs/log_configuration/archives/?tab=awss3#storage-class
[10]: https://aws.amazon.com/s3/storage-classes/intelligent-tiering/
[11]: https://console.aws.amazon.com/iam/
[12]: /fr/observability_pipelines/destinations/amazon_s3/
[13]: https://app.datadoghq.com/observability-pipelines
[14]: /fr/api/latest/observability-pipelines/
[16]: /fr/logs/explorer/archive_search/
[15]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[17]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[18]: /fr/logs/log_configuration/archives/?tab=awss3#advanced-settings