---
description: Apprenez à configurer la destination Amazon S3.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destination Amazon S3
---
{{< product-availability >}}

{{< callout url="#" btn_hidden="true" header="faux">}}
La destination Amazon S3 est en préversion. Contactez votre responsable de compte pour y accéder.
{{< /callout >}}

## Vue d'ensemble
 {#overview}

Utilisez la destination Amazon S3 pour envoyer des logs au format JSON ou Parquet vers Amazon S3. Consultez [Schéma Parquet généré automatiquement](#automatically-generated-parquet-schema).

Vous pouvez également [acheminer les logs vers Snowflake en utilisant la destination Amazon S3](#route-logs-to-snowflake-using-the-amazon-s3-destination).

**Remarque** : Si vous souhaitez envoyer des logs vers un bucket S3, puis être en mesure de les [réhydrater][1] ultérieurement pour analyse et investigation dans Datadog, utilisez la destination [Datadog Archives][2].

## Configurez un bucket Amazon S3
 {#set-up-an-amazon-s3-bucket}

{{% observability_pipelines/configure_log_archive/amazon_s3/instructions %}}


### Configurez une politique IAM qui autorise les Workers à écrire dans le bucket S3
 {#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket}

1. Accédez à la [console IAM][3].
1. Sélectionnez **Policies** dans le menu de gauche.
1. Cliquez sur **Create policy**.
1. Cliquez sur **JSON** dans la section **Specify permissions**.
1. Copiez la politique ci-dessous et collez-la dans l'**Policy editor**. Remplacez `<MY_BUCKET_NAME_1>/<MY_OPTIONAL_BUCKET_PATH_1>` par les informations du bucket S3 que vous avez créé dans la section précédente.
    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "DatadogOPUpload",
                "Effect": "Allow",
                "Action": [
                    "s3:PutObject"
                ],
                "Resource": "arn:aws:s3:::<MY_BUCKET_NAME_1>/<MY_OPTIONAL_BUCKET_PATH_1>/*"
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

## Configurez la destination de votre pipeline
 {#set-up-the-destination-for-your-pipeline}

Configurez la destination Amazon S3 lorsque vous [configurez un pipeline][11]. Vous pouvez configurer un pipeline dans l'[interface utilisateur][8], en utilisant l'[API][9] ou avec [Terraform][10]. Les étapes de cette section sont configurées dans l'interface utilisateur.

Après avoir sélectionné la destination Amazon S3 dans l'interface utilisateur du pipeline :

1. Saisissez le nom de votre bucket S3. Si vous avez configuré Datadog Log Archives, il s'agit du nom du bucket que vous avez créé précédemment.
1. Saisissez la région AWS dans laquelle se trouve le bucket S3.
1. (Facultatif) Saisissez le préfixe de clé.
    - Les préfixes sont utiles pour partitionner les objets. Par exemple, vous pouvez utiliser un préfixe comme clé d'objet pour stocker des objets dans un répertoire particulier. Si vous utilisez un préfixe à cette fin, il doit se terminer par `/` pour agir comme un chemin de répertoire ; une barre oblique finale `/` n'est pas ajoutée automatiquement.
      - Consultez la [syntaxe de modèle][4] si vous souhaitez acheminer les logs vers différentes clés d'objet en fonction de champs spécifiques dans vos logs.
    - **Remarques** :
        - Datadog recommande de commencer vos préfixes par le nom du répertoire et sans barre oblique initiale (`/`). Par exemple, `app-logs/` ou `service-logs/`.
        - N'utilisez**pas** le même préfixe S3 que celui d'une destination [Datadog Archives][2]. La destination Amazon S3 écrit des fichiers dans un format différent et la présence des deux types de fichiers dans le même préfixe peut entraîner des problèmes de réhydratation.
1. Sélectionnez la classe de stockage pour votre bucket S3 dans le menu déroulant {{< ui >}}Storage Class{{< /ui >}}.
1. Sélectionnez l'encodage que vous souhaitez utiliser dans le menu déroulant {{< ui >}}Encoding{{< /ui >}} ({{< ui >}}JSON{{< /ui >}} ou {{< ui >}}Parquet{{< /ui >}}).
    - **Remarque** : Pour {{< ui >}}Parquet{{< /ui >}}, le schéma est généré par lot et peut varier. Voir [Schéma Parquet généré automatiquement](#automatically-generated-parquet-schema).
1. Sélectionnez un algorithme de compression dans le menu déroulant {{< ui >}}Compression - Algorithm{{< /ui >}}. Si vous avez sélectionné :
    - {{< ui >}}Parquet{{< /ui >}} : Datadog recommande `snappy` ou un niveau de compression faible si vous choisissez `zstd`.
    - {{< ui >}}JSON{{< /ui >}} : Datadog recommande `gzip`.

### Paramètres facultatifs
 {#optional-settings}

#### Mise en lots
 {#batching}

1. Saisissez une taille de lot maximale et sélectionnez l'unité ({{< ui >}}MB{{< /ui >}} ou {{< ui >}}GB{{< /ui >}}) dans le menu déroulant. Si aucune configuration n'est définie, la valeur par défaut est de `100` MB.
1. Saisissez un délai d'expiration de lot en secondes. Si aucune configuration n'est définie, la valeur par défaut est de `900` secondes.

#### Chiffrement côté serveur
 {#server-side-encryption}

1. Sélectionnez un type de chiffrement pour votre bucket S3 dans le menu déroulant {{< ui >}}Server-Side Encryption{{< /ui >}} : {{< ui >}}AWS KMS{{< /ui >}} ou {{< ui >}}AES256{{< /ui >}}.
1. Si vous avez sélectionné {{< ui >}}AWS KMS{{< /ui >}}, saisissez l'ID de clé AWS KMS.

#### Authentification AWS
 {#aws-authentication}

Sélectionnez une option d'authentification AWS. Si vous utilisez uniquement [l'utilisateur ou le rôle que vous avez créé précédemment](#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket) pour l'authentification, ne sélectionnez pas {{< ui >}}Assume role{{< /ui >}}. Sélectionnez {{< ui >}}Assume role{{< /ui >}} uniquement si l'utilisateur ou le rôle que vous avez créé précédemment doit assumer un rôle différent pour accéder à la ressource AWS. Les autorisations du rôle assumé doivent être explicitement définies.<br>Si vous sélectionnez {{< ui >}}Assume role{{< /ui >}} :
1. Saisissez l'ARN du rôle IAM que vous souhaitez assumer.
    - **Remarque :** [L'utilisateur ou le rôle que vous avez créé précédemment](#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket) doit avoir l'autorisation d'assumer ce rôle afin que le Worker puisse s'authentifier auprès d'AWS.
1. (Facultatif) Saisissez le nom de session du rôle assumé et l'ID externe.

#### Mise en tampon
 {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Paramètres par défaut des secrets
 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

Il n'y a aucun identifiant de secret à configurer.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/destination_env_vars/datadog_archives_amazon_s3 %}}

{{% /tab %}}
{{< /tabs >}}

## Acheminer les logs vers Snowflake en utilisant la destination Amazon S3
 {#route-logs-to-snowflake-using-the-amazon-s3-destination}

Vous pouvez acheminer les logs depuis Observability Pipelines vers Snowflake en utilisant la destination Amazon S3 en configurant Snowpipe dans Snowflake pour ingérer automatiquement ces logs. Snowpipe surveille en continu votre bucket S3 pour détecter les nouveaux fichiers et les ingère automatiquement dans vos tables Snowflake, garantissant ainsi une disponibilité des données en temps quasi réel pour l'analyse ou un traitement ultérieur. Lorsque les logs sont collectés par Observability Pipelines, ils sont écrits dans un bucket S3. Pour configurer cela :
1. [Configurez un pipeline][5] pour utiliser Amazon S3 comme destination des logs. Utilisez la configuration détaillée dans [Configurez la destination de votre pipeline](#set-up-the-destination-for-your-pipeline).
1. Configurez Snowpipe dans Snowflake. Consultez [Automating Snowpipe for Amazon S3][6] pour obtenir des instructions.

## Métriques de santé
 {#health-metrics}

Pour les [métriques de composant][12] et les [métriques de tampon de destination][13] émises par toutes les destinations, consultez la documentation sur les [métriques d'utilisation des pipelines][14]. Pour filtrer ou regrouper par métriques de destination Amazon S3, utilisez le tag `component_type:amazon_s3_generic`.

## Fonctionnement de la destination
 {#how-the-destination-works}

### Authentification AWS
 {#aws-authentication-1}

{{% observability_pipelines/aws_authentication/instructions %}}

#### Autorisations
 {#permissions}

L'Observability Pipelines Worker nécessite ces autorisations de politique pour envoyer des logs vers Amazon S3 :

- `s3:PutObject`

### Schéma Parquet généré automatiquement
 {#automatically-generated-parquet-schema}

Le Observability Pipelines Worker collecte un lot d'événements, génère un schéma pour ces événements, puis vide le lot vers S3. Le schéma peut varier d'un lot à l'autre car il est basé uniquement sur le lot d'événements actuel.

### Mise en lots des événements
 {#event-batching}

Un lot d'événements est vidé lorsque l'un de ces paramètres est atteint. Consultez [Regroupement d'événements par destination][7] pour plus d'informations.

| Max d'événements     | Max d'octets       | Délai d'attente (secondes)   |
|----------------| ----------------| --------------------|
| Aucun           | 100 000 000     | 900                 |

[1]: /fr/logs/log_configuration/rehydrating/

[2]: /fr/observability_pipelines/destinations/datadog_archives/

[3]: https://console.aws.amazon.com/iam/

[4]: /fr/observability_pipelines/destinations/#template-syntax

[5]: /fr/observability_pipelines/configuration/set_up_pipelines/

[6]: https://docs.snowflake.com/en/user-guide/data-load-snowpipe-auto-s3

[7]: /fr/observability_pipelines/destinations/#event-batching

[8]: https://app.datadoghq.com/observability-pipelines

[9]: /fr/api/latest/observability-pipelines/

[10]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline

[11]: /fr/observability_pipelines/configuration/set_up_pipelines/

[12]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics

[13]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics

[14]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/