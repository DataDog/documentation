---
description: Transférez vos événements RUM et Product Analytics vers votre propre
  stockage cloud pour les charger dans un entrepôt de données ou pour une conservation
  à long terme.
further_reading:
- link: /product_analytics/
  tag: Documentation
  text: En savoir plus sur Product Analytics
- link: /real_user_monitoring/rum_without_limits/
  tag: Documentation
  text: En savoir plus sur RUM without Limits
- link: /real_user_monitoring/
  tag: Documentation
  text: En savoir plus sur le Real User Monitoring
private: true
title: Export Pipelines
---
{{< callout url="https://www.datadoghq.com/product-preview/export-pipelines/" btn_hidden="false" header="Rejoignez la Preview !">}}
Export Pipelines est en version préliminaire.
{{< /callout >}}

## Présentation {#overview}

Export Pipelines diffuse vos événements ingérés de Real User Monitoring (RUM) et de Product Analytics vers un bucket de stockage cloud que vous possédez — Amazon S3, Azure Blob Storage ou Google Cloud Storage — au format JSON ou Parquet.

{{< img src="real_user_monitoring/rum_export/rum-export-overview.png" alt="Liste des Export Pipelines sur la page des paramètres de l'application RUM" style="width:100%;">}}

Utilisez Export Pipelines pour :
- Charger vos données d'événements dans votre propre entrepôt de données (tel que Snowflake, BigQuery ou Databricks) pour des analyses et des rapports personnalisés.
- Répondez aux exigences de conformité ou conservez les événements bruts pour un archivage à long terme et des investigations ponctuelles.

Datadog gère uniquement l'exportation depuis votre compte Datadog vers votre système de stockage cloud.

## Fonctionnement {#how-it-works}

Export Pipelines est une fonctionnalité partagée entre [Real User Monitoring][4] et [Product Analytics][5]. Les pipelines sont configurés à deux niveaux différents :

| Périmètre | Source | Nombre max. de pipelines | Préréglages disponibles |
|---|---|---|---|
| Par application | RUM | 1 | *Tous les types d'événements RUM*, ou *Sessions, Vues et Actions uniquement* |
| Par application | Product Analytics | 1 | *Tous les événements Product Analytics* (sessions, vues, actions et événements côté serveur) |
| Par organisation | Product Analytics | 1 | *Profils utilisateur et de compte* |

Le préréglage *Profils utilisateur et de compte* est limité à un pipeline par organisation. Comme les données utilisateur et de profil sont partagées entre toutes vos applications, la création d'un pipeline par application entraînerait des enregistrements en double dans votre stockage.

Chaque pipeline effectue des exportations en continu et indépendamment des autres.

## Prérequis {#prerequisites}

- Product Analytics est activé sur l'application (ou RUM, ou les deux).
- L'intégration Datadog pour votre fournisseur cloud est configurée : [Amazon Web Services][6], [Azure][7] ou [Google Cloud][8].
- Votre utilisateur Datadog dispose de l'autorisation `rum_write_archives`. Consultez [Contrôle d'accès basé sur les rôles][1].

## Configurer un pipeline d'exportation {#set-up-an-export-pipeline}

### 1. Configurez votre intégration cloud {#1-set-up-your-cloud-integration}

{{< tabs >}}
{{% tab "AWS S3" %}}

Si ce n'est pas déjà fait, configurez l'[intégration AWS][1] pour le compte qui contient votre bucket S3. Export Pipelines prend uniquement en charge les intégrations AWS basées sur les rôles (STS) et ne prend pas en charge les intégrations par clé d'accès.

[1]: /fr/integrations/amazon_web_services/?tab=automaticcloudformation#setup
{{% /tab %}}
{{% tab "Azure Storage" %}}

Configurez l'[intégration Azure][1] dans l'abonnement qui contient votre compte de stockage, si ce n'est pas déjà fait. Cela implique de [créer une inscription d'application que Datadog peut utiliser][2].

**Remarque :** L'exportation vers Azure ChinaCloud et Azure GermanyCloud n'est pas prise en charge. L'exportation vers Azure GovCloud est prise en charge en version préliminaire — contactez le support Datadog pour demander l'accès.

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /fr/integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

Configurez une [intégration Google Cloud][1] compatible STS pour le projet qui contient votre bucket GCS, si ce n'est pas déjà fait. Cela implique de [créer un compte de service Google Cloud que Datadog peut utiliser][2]. La destination nécessite également un ID de projet GCP.

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: /fr/integrations/google_cloud_platform/?tab=datadogussite#setup
{{% /tab %}}
{{< /tabs >}}

### 2. Créez un bucket de stockage {#2-create-a-storage-bucket}

{{< tabs >}}
{{% tab "AWS S3" %}}

Dans la [console AWS][1], [créez un bucket S3][2] pour vos exportations.

**Remarques :**

- Ne rendez pas le bucket lisible publiquement.
- Pour les [sites US1, US3 et US5][3], consultez la [tarification AWS][4] pour les frais de transfert de données inter-régions. Envisagez de créer le bucket dans `us-east-1` pour minimiser les coûts de transfert.

[1]: https://s3.console.aws.amazon.com/s3
[2]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html
[3]: /fr/getting_started/site/
[4]: https://aws.amazon.com/s3/pricing/
{{% /tab %}}

{{% tab "Azure Storage" %}}

- Dans le [portail Azure][1], [créez un compte de stockage][2]. Choisissez les performances **Standard** ou **Blobs de blocs premium**, et sélectionnez le niveau d'accès **chaud** ou **froid**.
- Créez un **conteneur** dans ce compte de stockage. Notez le nom du conteneur — vous y ferez référence lors de la configuration du pipeline.

**Remarque :** Ne définissez pas de [politiques d'immuabilité][3]. Certains événements doivent parfois être réécrits (généralement lors d'une nouvelle tentative après un délai d'attente).

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
[2]: https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-immutability-policies-manage
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

Dans la [console Google Cloud][1], [créez un bucket GCS][2] pour vos exportations. Sous **Choose how to control access to objects**, sélectionnez **Set object-level and bucket-level permissions.**

**Remarque :** N'ajoutez pas de [politique de rétention][3]. Certains événements doivent parfois être réécrits (généralement lors d'une nouvelle tentative après un délai d'attente).

[1]: https://console.cloud.google.com/storage
[2]: https://cloud.google.com/storage/docs/quickstart-console
[3]: https://cloud.google.com/storage/docs/bucket-lock
{{% /tab %}}
{{< /tabs >}}

### 3. Accorder à Datadog l'accès au bucket {#3-grant-datadog-access-to-the-bucket}

{{< tabs >}}
{{% tab "AWS S3" %}}

1. [Créez une politique][1] avec les instructions suivantes :

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "DatadogExportPipelineFiles",
         "Effect": "Allow",
         "Action": ["s3:PutObject", "s3:GetObject"],
         "Resource": [
           "arn:aws:s3:::<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>/*",
           "arn:aws:s3:::<MY_BUCKET_NAME_2_/_MY_OPTIONAL_BUCKET_PATH_2>/*"
         ]
       }
     ]
   }
   ```

   * `PutObject` est requis pour téléverser des fichiers exportés.
   * `GetObject` est requis pour exécuter **Test Configuration**, qui écrit un fichier de test et le relit pour vérifier l'accès.
   * La valeur de la ressource doit se terminer par `/*` — ces autorisations s'appliquent aux objets à l'intérieur des buckets.

2. Modifiez les noms des buckets.
3. Facultatif : limitez la politique à des chemins spécifiques.
4. Attachez la politique au rôle d'intégration Datadog :
   * Dans la console AWS IAM, accédez à **Roles** et ouvrez le rôle utilisé par l'intégration Datadog. Par défaut, il est nommé `DatadogIntegrationRole`, mais le nom peut différer si votre organisation l'a renommé.
   * Cliquez sur **Add permissions**, puis sur **Attach policies**.
   * Saisissez le nom de la politique que vous venez de créer.
   * Cliquez sur **Attach policies**.

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
{{% /tab %}}
{{% tab "Azure Storage" %}}

1. Accordez à l'application Datadog l'autorisation d'écrire dans votre compte de stockage.
2. Sur la [page Comptes de stockage][1], sélectionnez votre compte de stockage, ouvrez **Access Control (IAM)**, et choisissez **Add → Add Role Assignment**.
3. Attribuez le rôle **Storage Blob Data Contributor** à l'application Datadog que vous avez créée lors de l'intégration avec Azure, puis enregistrez.

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

1. Accordez à votre compte de service Google Cloud Datadog l'autorisation d'écrire dans votre bucket.
2. Sur la [page d'administration IAM de Google Cloud][1], sélectionnez le principal de votre compte de service Datadog et cliquez sur **Modifier le principal**.
3. Cliquez sur **AJOUTER UN AUTRE RÔLE**, sélectionnez **Administrateur d'objets de stockage**, puis enregistrez.

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

**Remarque :** Si votre bucket restreint l'accès réseau par IP, ajoutez les plages d'adresses IP du webhook depuis le {{< region-param key="ip_ranges_url" link="true" text="IP ranges list">}} à la liste d'autorisation.

### 4. Configurez le pipeline dans Datadog {#4-configure-the-pipeline-in-datadog}

1. Depuis Product Analytics, accédez à **Gestion des applications** en bas à gauche de la navigation.
2. Sélectionnez votre application, puis allez dans **Routing > Export Pipelines**.
3. Cliquez **New Export Pipeline**.
4. Remplissez chaque section du panneau latéral :

   **Définir les données à exporter**

   Choisissez les données que vous souhaitez exporter. La source et les options prédéfinies sont clairement indiquées dans l'interface utilisateur.

   **Format de fichier**

   {{< img src="real_user_monitoring/rum_export/rum-export-data-format.png" alt="Options de sélection des données et de format de fichier dans le panneau de configuration du pipeline d'exportation" style="width:85%;">}}

   - **Parquet** : idéal pour un chargement direct dans un entrepôt de données tel que BigQuery, Snowflake ou Databricks.
   - **JSON** : idéal si vous souhaitez traiter les données avec votre propre pipeline.

   **Sélectionner le type de stockage et configurer le bucket**

   | Fournisseur | Champs |
   |---|---|
   | **Amazon S3** | AWS account and role (depuis votre intégration AWS) ; **Bucket** (obligatoire) ; **Path** (préfixe facultatif) |
   | **Azure Blob Storage** | Azure tenant and client (depuis votre intégration Azure) ; **Storage Account** (requis) ; **Container** (requis) ; **Path** (préfixe facultatif) |
   | **Google Cloud Storage** | GCP service account (depuis votre intégration Google Cloud) ; **Bucket** (requis) ; **Path** (préfixe facultatif) |

5. Si vous le souhaitez, cliquez sur **Test Configuration**. Datadog écrit un petit fichier de test dans votre bucket et le relit pour vérifier l'accès. Corrigez tout problème de permissions ou de nommage signalé avant d'enregistrer.
6. Cliquez sur **Add Export Pipeline** pour démarrer le pipeline.

## Statuts du pipeline{#pipeline-statuses}

Une fois créé, un pipeline affiche l'un de ces états sur la page Export Pipelines:

| Statut| Signification|
|----------|--------------------------------------------------------------------------------------------------------------------------------|
| Active   | Datadog exporte les événements avec succès.                                                                                      |
| Pending  | Le pipeline vient d'être créé ou mis à jour. Patientez quelques minutes avant le premier téléversement.                                         |
| Error    | Datadog n'a pas pu écrire dans le bucket — il s'agit généralement d'un problème de permissions ou de nommage. Ouvrez le pipeline et exécutez **Test Configuration** pour voir les détails. |
| Paused   | Le pipeline est désactivé. Aucun événement n'est exporté.                                                                              |

Si un pipeline reste à l'état **Pending** pendant plus de 15 minutes, exécutez **Test Configuration** pour faire apparaître le problème sous-jacent.

## Format de fichier{#file-format}

Les fichiers sont organisés dans une structure de répertoire qui facilite l'interrogation des archives par date :

```
/<path>/dt=<YYYYMMDD>/hour=<HH>/archive_<HHmmss.SSSS>.<UUID>.<ext>
```

| Format  | Extension     | Notes                                                          |
|---------|---------------|----------------------------------------------------------------|
| JSON    | `.json.gz`    | JSON délimité par des retours à la ligne et compressé avec Gzip.                        |
| Parquet | `.parquet`    | Encodage Parquet natif (sans wrapper gzip). Une ligne par événement avec des colonnes typées. Directement chargeable par Snowflake, BigQuery et Databricks sans prétraitement. |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/permissions/
[2]: https://app.datadoghq.com/rum/list
[3]: /fr/api/latest/rum/
[4]: /fr/real_user_monitoring/
[5]: /fr/product_analytics/
[6]: /fr/integrations/amazon-web-services/
[7]: /fr/integrations/azure/
[8]: /fr/integrations/google_cloud_platform/