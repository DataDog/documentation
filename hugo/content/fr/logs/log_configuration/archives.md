---
aliases:
- /fr/logs/s3/
- /fr/logs/gcs/
- /fr/logs/archives/s3/
- /fr/logs/archives/gcs/
- /fr/logs/archives/gcp/
- /fr/logs/archives/
description: Transférez tous vos logs ingérés pour les conserver à long terme.
further_reading:
- link: /logs/archives/rehydrating
  tag: Documentation
  text: Découvrir comment accéder au contenu de vos logs archivés dans Datadog
- link: /logs/explorer/
  tag: Documentation
  text: En savoir plus sur le Log Explorer
- link: /logs/logging_without_limits/
  tag: Documentation
  text: En savoir plus sur Logging without Limits*
title: Archives de journaux
---
## Aperçu {#overview}

Configurez votre compte Datadog pour transférer tous les journaux ingérés—qu'ils soient [indexés][1] ou non—vers un système de stockage cloud de votre choix. Conservez vos journaux dans une archive optimisée pour le stockage pendant de plus longues périodes, et respectez les exigences de conformité tout en garantissant l'auditabilité pour des enquêtes ad hoc, avec [Rehydration][2] ou [Archive Search][16].

{{< img src="/logs/archives/log_forwarding_archives_122024.png" alt="Onglet Archives sur la page de transfert de journaux" style="width:100%;">}}

Naviguez vers la page [**Archivage et transfert de journaux**][3] pour configurer une archive pour transférer les journaux ingérés vers votre propre bucket de stockage hébergé dans le cloud.

1. Si ce n'est pas déjà fait, configurez une [intégration](#set-up-an-integration) Datadog pour votre fournisseur cloud.
2. Créez un [bucket de stockage](#create-a-storage-bucket).
3. Définissez [permissions](#set-permissions) sur `read` et/ou `write` pour cette archive.
4. [Dirigez vos journaux](#route-your-logs-to-a-bucket) vers et depuis cette archive.
5. Configurez les [paramètres avancés](#advanced-settings) tels que le chiffrement, la classe de stockage et les étiquettes.
6. [Validez](#validation) votre configuration et vérifiez les éventuelles erreurs de configuration que Datadog pourrait détecter pour vous.

Voir comment [archiver vos journaux avec les pipelines d'observabilité][4] si vous souhaitez diriger vos journaux vers une archive optimisée pour le stockage directement depuis votre environnement.

Les métriques suivantes rapportent sur les journaux qui ont été archivés avec succès, y compris les journaux qui ont été envoyés avec succès après des tentatives de réessai.

- datadog.archives.logs.bytes
- datadog.archives.logs.count


## Configurer une archive {#configure-an-archive}

### Configurer une intégration {#set-up-an-integration}

{{< tabs >}}
{{% tab "AWS S3" %}}

Si ce n'est pas déjà fait, configurez l'[intégration AWS][1] pour le compte AWS associé à votre compartiment S3. 
   * Dans le cas général, cela implique de créer un rôle que Datadog peut utiliser pour s'intégrer avec AWS S3.
   * Spécifiquement pour les comptes AWS en Chine, utilisez des clés d'accès comme alternative à la délégation de rôle.

[1]: /fr/integrations/amazon_web_services/?tab=automaticcloudformation#setup
{{% /tab %}}
{{% tab "Stockage Azure" %}}

Configurez l'[intégration Azure][1] dans l'abonnement qui contient votre nouveau compte de stockage, si ce n'est pas déjà fait. Cela implique [de créer un enregistrement d'application que Datadog peut utiliser][2] pour s'intégrer.

**Remarque :** L'archivage vers Azure ChinaCloud et Azure GermanyCloud n'est pas pris en charge. L'archivage vers Azure GovCloud est pris en charge en version Preview. Pour demander l'accès, contactez le support Datadog.

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /fr/integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
{{% /tab %}}

{{% tab "Stockage Google Cloud" %}}

Configurez l'[intégration Google Cloud][1] pour le projet qui contient votre bucket de stockage GCS, si ce n'est pas déjà fait. Cela implique [de créer un compte de service Google Cloud que Datadog peut utiliser][2] pour s'intégrer.

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: /fr/integrations/google_cloud_platform/?tab=datadogussite#setup
{{% /tab %}}
{{< /tabs >}}

### Créez un bucket de stockage {#create-a-storage-bucket}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">L'envoi de journaux vers une archive est en dehors de l'environnement GovCloud de Datadog, qui est hors du contrôle de Datadog. Datadog ne sera pas responsable des journaux qui ont quitté l'environnement GovCloud de Datadog, y compris, sans limitation, toute obligation ou exigence que l'utilisateur pourrait avoir liée à FedRAMP, aux niveaux d'impact DoD, à l'ITAR, à la conformité à l'exportation, à la résidence des données ou à des réglementations similaires applicables à ces journaux.</div>
{{< /site-region >}}

{{< tabs >}}
{{% tab "AWS S3" %}}

Accédez à votre [console AWS][1] et [créez un compartiment S3][2] vers lequel vos archives seront envoyées.

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Les archives Datadog ne prennent pas en charge les noms de bucket contenant des points (.) lorsqu'elles sont intégrées à un point de terminaison S3 FIPS qui repose sur un adressage de style virtuel-hôte. En savoir plus dans la documentation AWS. <a href="https://aws.amazon.com/compliance/fips/">AWS FIPS</a> et <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html">AWS Virtual Hosting</a>.</div>
{{< /site-region >}}

**Remarque :**

- Ne rendez pas votre bucket lisible par le public.
- Pour les sites [US1, US3 et US5][3], consultez [les tarifs AWS][4] pour les frais de transfert de données inter-régions et comment les coûts de stockage cloud peuvent être impactés. Envisagez de créer votre bucket de stockage dans `us-east-1` pour gérer vos frais de transfert de données inter-régions.

[1]: https://s3.console.aws.amazon.com/s3
[2]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html
[3]: /fr/getting_started/site/
[4]: https://aws.amazon.com/s3/pricing/
{{% /tab %}}

{{% tab "Stockage Azure" %}}

* Allez sur votre [Portail Azure][1] et [créez un compte de stockage][2] pour envoyer vos archives. Donnez un nom à votre compte de stockage, sélectionnez soit une performance standard ou un type de compte **Block blobs** premium, et choisissez le niveau d'accès **hot** ou **cool**.
* Créez un service de **conteneur** dans ce compte de stockage. Prenez note du nom du conteneur car vous devrez l'ajouter dans la page d'archive Datadog.

**Remarque :** Ne définissez pas de [politiques d'immuabilité][3] car les dernières données doivent être réécrites dans certains cas rares (typiquement un délai d'attente).

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
[2]: https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-immutability-policies-manage
{{% /tab %}}

{{% tab "Stockage Google Cloud" %}}

Allez sur votre [compte Google Cloud][1] et [créez un bucket GCS][2] pour envoyer vos archives. Sous **Choisissez comment contrôler l'accès aux objets**, sélectionnez **Définir les autorisations au niveau des objets et des buckets.**

**Remarque :** Ne ajoutez pas de [politique de conservation][3] car les dernières données doivent être réécrites dans certains cas rares (typiquement un délai d'attente).

[1]: https://console.cloud.google.com/storage
[2]: https://cloud.google.com/storage/docs/quickstart-console
[3]: https://cloud.google.com/storage/docs/bucket-lock
{{% /tab %}}
{{< /tabs >}}

### Définissez les autorisations {#set-permissions}

Seuls les utilisateurs de Datadog ayant la [`logs_write_archive` permission][5] peuvent créer, modifier ou supprimer des configurations d'archive de journaux.

{{< tabs >}}
{{% tab "AWS S3" %}}

1. [Créez une politique][1] avec les déclarations de permission suivantes :

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "DatadogUploadAndRehydrateLogArchives",
         "Effect": "Allow",
         "Action": ["s3:PutObject", "s3:GetObject"],
         "Resource": [
           "arn:aws:s3:::<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>/*",
           "arn:aws:s3:::<MY_BUCKET_NAME_2_/_MY_OPTIONAL_BUCKET_PATH_2>/*"
         ]
       },
       {
         "Sid": "DatadogRehydrateLogArchivesListBucket",
         "Effect": "Allow",
         "Action": "s3:ListBucket",
         "Resource": [
           "arn:aws:s3:::<MY_BUCKET_NAME_1>",
           "arn:aws:s3:::<MY_BUCKET_NAME_2>"
         ]
       }
     ]
   }
   ```
     * The `GetObject` and `ListBucket` permissions allow for [rehydrating from archives][2].
     * The `PutObject` permission is sufficient for uploading archives.
     * Ensure that the resource value under the `s3:PutObject` and `s3:GetObject` actions ends with `/*` because these permissions are applied to objects within the buckets.

2. Modifiez les noms des buckets.
3. Optionnellement, spécifiez les chemins qui contiennent vos archives de journaux.
4. Attachez la nouvelle politique au rôle d'intégration Datadog.
   * Naviguez vers **Rôles** dans la console AWS IAM.
   * Localisez le rôle utilisé par l'intégration Datadog. Par défaut, il est nommé **DatadogIntegrationRole**, mais le nom peut varier si votre organisation l'a renommé. Cliquez sur le nom du rôle pour ouvrir la page de résumé du rôle.
   * Cliquez sur **Ajouter des autorisations**, puis **Attacher des politiques**.
   * Entrez le nom de la politique créée ci-dessus.
   * Cliquez sur **Attacher des politiques**.


[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[2]: /fr/logs/archives/rehydrating/
{{% /tab %}}
{{% tab "Stockage Azure" %}}

1. Accordez à l'application Datadog l'autorisation d'écrire et de réhydrater à partir de votre compte de stockage.
2. Sélectionnez votre compte de stockage depuis la [page des Comptes de Stockage][1], allez à **Contrôle d'Accès (IAM)**, et sélectionnez **Ajouter -> Ajouter une Attribution de Rôle**.
3. Saisissez le Rôle appelé **Contributeur de Données de Blob de Stockage**, sélectionnez l'application Datadog que vous avez créée pour l'intégration avec Azure, et enregistrez.

{{< img src="logs/archives/logs_azure_archive_permissions.png" alt="Ajoutez le rôle de Contributeur de Données de Blob de Stockage à votre application Datadog." style="width:75%;">}}

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
{{% /tab %}}
{{% tab "Stockage Google Cloud" %}}

1. Accordez à votre compte de service Google Cloud Datadog les autorisations d'écrire vos archives dans votre bucket.
2. Sélectionnez votre principal de compte de service Google Cloud Datadog depuis la [page d'administration IAM de Google Cloud][1] et sélectionnez **Modifier le principal**.
3. Cliquez sur **AJOUTER UN AUTRE RÔLE**, sélectionnez le rôle **Administrateur d'Objet de Stockage**, et enregistrez.

   {{< img src="logs/archives/gcp_role_storage_object_admin-2.png" alt="Ajoutez le rôle d'Administrateur d'Objet de Stockage à votre Compte de Service Google Cloud Datadog." style="width:75%;">}}

Le rôle **Administrateur d'Objet de Stockage** est la configuration recommandée par Datadog. Si votre organisation nécessite un rôle personnalisé avec le principe du moindre privilège, les autorisations individuelles suivantes sont requises pour les téléchargements d'archives :

- `storage.objects.create`
- `storage.objects.get`
- `storage.objects.list`
- `storage.objects.delete`

`storage.objects.delete` est requis pour prendre en charge les nouvelles tentatives d'écriture d'archives, où Datadog écrase un objet existant dans le bucket. Les autorisations de téléchargement multipart (`storage.multipartUploads.*`) ne sont pas requises.

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

### Dirigez vos journaux vers un bucket {#route-your-logs-to-a-bucket}

Naviguez vers la [page d'Archivage et de Transfert des Journaux][6] et sélectionnez **Ajouter une nouvelle archive** dans l'onglet **Archives**.

**Remarques :**
* Seuls les utilisateurs de Datadog ayant la [`logs_write_archive` permission][5] peuvent compléter cette étape et la suivante.
* L'archivage des journaux vers Azure Blob Storage nécessite un enregistrement d'application. Voir les instructions [sur la page d'intégration Azure][7], et définissez le "site" sur le côté droit de la page de documentation sur "US." Les Enregistrements d'Application créés uniquement à des fins d'archivage n'ont besoin que du rôle "Contributeur de Données de Blob de Stockage". Si votre bucket de stockage se trouve dans une souscription surveillée via une Ressource Datadog, un avertissement s'affiche concernant la redondance de l'Enregistrement d'Application. Vous pouvez ignorer cet avertissement.
* Si votre bucket restreint l'accès réseau à des adresses IP spécifiées, ajoutez les IP de webhook indiquées. {{< region-param key="ip_ranges_url" link="true" text="IP ranges list">}} à la liste d'autorisation.
* Pour les sites **US1-FED et US2-FED**, vous pouvez configurer Datadog pour envoyer des journaux à une destination en dehors de l'environnement Datadog GovCloud. Datadog n'est pas responsable des journaux qui quittent l'environnement Datadog GovCloud. De plus, Datadog n'est pas responsable des obligations ou exigences que vous pourriez avoir concernant FedRAMP, les niveaux d'impact DoD, ITAR, la conformité à l'exportation, la résidence des données ou des réglementations similaires applicables à ces journaux après leur sortie de l'environnement GovCloud.

| Service                  | Étapes                                                                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Amazon S3**               | - Sélectionnez la combinaison de compte et de rôle AWS appropriée pour votre S3 bucket.<br>- Saisissez le nom de votre S3 bucket.<br>**Optionnel** : Saisissez un préfixe de répertoire pour l'ensemble du contenu de vos archives de journaux. |
| **Azure Storage**        | - Sélectionnez le type d'archive **Azure Storage**, et le locataire et le client Azure pour l'application Datadog qui a le rôle de contributeur de données de blob de stockage sur votre compte de stockage.<br>- Saisissez le nom de votre compte de stockage et le nom du conteneur pour votre archive.<br>**Optionnel** : Saisissez un préfixe de répertoire pour tout le contenu de vos archives de journaux. |
| **Google Cloud Storage** | - Sélectionnez le type d'archive **Google Cloud Storage**, et le compte de service GCS qui possède les permissions d'écriture sur votre bucket de stockage.<br>- Saisissez le nom de votre bucket.<br>**Optionnel** : Saisissez un préfixe de répertoire pour l'ensemble du contenu de vos archives de journaux. |

### Paramètres avancés {#advanced-settings}

{{< img src="/logs/archives/log_archives_advanced_settings.png" alt="Paramètres avancés pour ajouter des tags optionnels et définir la taille maximale de scan" style="width:100%;" >}}

#### Tags Datadog {#datadog-tags}

Cette étape de configuration facultative vise à :

* Inclure tous les tags de journaux dans vos archives (activé par défaut sur toutes les nouvelles archives). **Remarque** : Cela augmente la taille des archives résultantes.
* Ajouter des tags sur les journaux réhydratés selon votre politique de requêtes de restriction. Voir la permission [`logs_read_data`][13].

#### Définir la taille maximale de scan {#define-maximum-scan-size}

Cette étape de configuration facultative vous permet de définir le volume maximal de données de log (en Go) à analyser pour la réintégration de vos archives de logs.

Pour les archives avec une taille maximale de scan définie, tous les utilisateurs doivent estimer la taille de scan avant d'être autorisés à commencer une réhydratation. Si la taille de scan estimée est supérieure à ce qui est autorisé pour cette archive, les utilisateurs doivent réduire la plage de temps pour laquelle ils demandent la réhydratation. Réduire la plage de temps réduira la taille du scan et permettra à l'utilisateur de commencer une réhydratation.

#### Attribut de partition d'archive (Aperçu) {#archive-search-partition-attribute}

Pour optimiser la façon dont vos journaux archivés sont physiquement organisés dans le stockage (et accélérer [Recherche d'archive][16]), configurez les attributs de partition dans votre archive Datadog.

* **Attributs de partition** : Ajoutez des attributs à faible cardinalité tels que `service`, `source`, `env` ou `status` que vous utilisez fréquemment comme filtres de recherche.
* **Avantage** : Les journaux partageant les mêmes valeurs d'attribut de partition sont co-localisés dans le stockage. Lors de la recherche, Datadog peut ignorer des partitions entières qui ne correspondent pas à votre requête, réduisant ainsi considérablement le volume de données analysées.

#### Attribut de recherche d'archive {#archive-lookup-attribute}

Pour accélérer les recherches et les enquêtes dans vos archives (avec [Recherche d'archive][16]), configurez des attributs de recherche dans votre archive Datadog.

* **Attributs de recherche** : Ajoutez des attributs à haute cardinalité tels que `trace_id`, `container_id` ou `customer_id`.
* **Avantage** : Cela vous permet de localiser des journaux spécifiques dans votre stockage à long terme beaucoup plus rapidement, réduisant ainsi le temps et les données analysées lors d'enquêtes ad hoc.

**Attributs de partition vs. attributs de recherche**

| | Partition | Recherche |
|---|---|---|
| **Cardinalité** | Faible (dizaines à centaines de valeurs) | Élevée (millions de valeurs) |
| **Attributs typiques** | `service`, `source`, `env`, `status` | `trace_id`, `container_id`, `user_id`, `transaction_id` |
| **Comment cela aide** | : Élimine des partitions entières de l'analyse | et permet d'identifier rapidement les entrées de journal individuelles dans votre archive |
| **Idéal pour** | : Le filtrage large par environnement ou service | et pour les enquêtes ad hoc sur des identifiants spécifiques |

Pour des performances de recherche maximales, combinez les deux : les attributs de partition réduisent la portée de recherche aux segments de données pertinents, tandis que les attributs de recherche vous permettent de trouver instantanément des journaux spécifiques dans ces segments.

{{< site-region region="us3" >}}

#### Règles de pare-feu {#firewall-rules}

{{< tabs >}}
{{% tab "Stockage Azure" %}}

Les règles de pare-feu ne sont pas prises en charge.

{{% /tab %}}
{{< /tabs >}}

{{< /site-region >}}

#### Compression {#compression}

Par défaut, Datadog archive les journaux en utilisant **zstd** (compression Zstandard) (`.json.zst`), qui offre de meilleurs ratios de compression et des vitesses de décompression plus rapides par rapport à gzip. Vous pouvez également configurer la compression **gzip** (`.json.gz`).


Pour configurer la compression, sélectionnez **Type de compression** lors de la création ou de la modification d'une archive sur la [page d'archivage et de transfert de journaux][6] :

- **zstd** (par défaut) : Meilleur ratio de compression et vitesse de décompression. Recommandé pour les nouvelles archives, surtout si vous prévoyez d'utiliser [Archive Search][16].
- **gzip** : Largement supporté et compatible avec la plupart des outils.

**Remarque** : Changer le format de compression d'une archive existante n'affecte que les nouveaux fichiers d'archive. Les fichiers déjà stockés dans votre bucket restent dans leur format d'origine.

#### Classe de stockage {#storage-class}

{{< tabs >}}
{{% tab "AWS S3" %}}

Vous pouvez soit sélectionner une classe de stockage pour votre archive, soit [définir une configuration de cycle de vie sur votre bucket S3][1] pour faire passer automatiquement vos archives de journaux aux classes de stockage optimales.

La fonctionnalité de [réintégration][2] de logs prend uniquement en charge les classes de stockage suivantes :

* S3 Standard
* S3 Standard-IA
* S3 One Zone-IA
* S3 Glacier Instant Retrieval
* S3 Intelligent-Tiering, uniquement si [les niveaux d'accès d'archive asynchrone optionnels][3] sont tous désactivés.

Si vous souhaitez réintégrer des logs à partir d'archives dans une autre classe de stockage, vous devez au préalable les déplacer vers l'une des classes de stockage prises en charge, comme indiqué ci-dessus.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/how-to-set-lifecycle-configuration-intro.html
[2]: /fr/logs/archives/rehydrating/
[3]: https://aws.amazon.com/s3/storage-classes/intelligent-tiering/
{{% /tab %}}
{{% tab "Stockage Azure" %}}

Les fonctionnalités d'archivage et de [réintégration][1] de logs prennent uniquement en charge les niveaux d'accès suivants :

- Niveau d'accès chaud
- Niveau d'accès frais

Si vous souhaitez réintégrer des logs à partir d'archives dans un niveau d'accès, vous devez au préalable les déplacer vers l'un des niveaux d'accès pris en charge, comme indiqué ci-dessus.

[1]: /fr/logs/archives/rehydrating/
{{% /tab %}}
{{% tab "Stockage Google Cloud" %}}

L'archivage et la [réhydratation][1] prennent en charge les niveaux d'accès suivants :

- Standard
- Nearline
- Coldline
- Archive

[1]: /fr/logs/archives/rehydrating/
{{% /tab %}}

{{< /tabs >}}

#### Chiffrement côté serveur (SSE) pour les archives S3 {#server-side-encryption-sse-for-s3-archives}

Lors de la création ou de la mise à jour d'une archive S3 dans Datadog, vous pouvez configurer optionnellement **Chiffrement avancé**. Trois options sont disponibles dans le menu déroulant **Type de Chiffrement** :

- **Chiffrement par défaut au niveau du bucket S3** (Par défaut) : Datadog ne remplace pas les paramètres de chiffrement par défaut de votre bucket S3.
- **Clés gérées par Amazon S3** : Force le chiffrement côté serveur en utilisant des clés gérées par Amazon S3 ([SSE-S3][17]), indépendamment du chiffrement par défaut du bucket S3.
- **Service de gestion des clés AWS** : Force le chiffrement côté serveur en utilisant une clé gérée par le client (CMK) de [AWS KMS][18], indépendamment du chiffrement par défaut du bucket S3. Vous devrez fournir l'ARN du CMK.

{{< tabs >}}
{{% tab "Chiffrement par défaut au niveau du bucket S3" %}}

Lorsque cette option est sélectionnée, Datadog ne spécifie aucun en-tête de chiffrement dans la demande de téléchargement. Le chiffrement par défaut de votre bucket S3 s'appliquera.

Pour définir ou vérifier la configuration de chiffrement de votre bucket S3 :

1. Accédez à votre bucket S3.
2. Cliquez sur l'onglet **Propriétés**.
3. Dans la section **Chiffrement par défaut**, configurez ou confirmez le type de chiffrement. Si votre chiffrement utilise [AWS KMS][1], assurez-vous que vous avez un CMK valide et une politique CMK attachée à votre CMK.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html

{{% /tab %}}
{{% tab "Clés gérées par Amazon S3" %}}

Cette option garantit que tous les objets d'archives sont téléchargés avec [SSE_S3][1], en utilisant des clés gérées par Amazon S3. Cela remplace tout paramètre de chiffrement par défaut sur le bucket S3.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingServerSideEncryption.html
{{% /tab %}}
{{% tab "AWS Key Management Service" %}}

Cette option garantit que tous les objets d'archives sont téléchargés en utilisant une clé gérée par le client (CMK) de [AWS KMS][1]. Cela remplace tout paramètre de chiffrement par défaut sur le bucket S3.

Assurez-vous d'avoir complété les étapes suivantes pour créer une CMK valide et une politique de CMK. Ensuite, fournissez l'ARN de la CMK pour configurer avec succès ce type de chiffrement.

1. Créez votre CMK.
2. Attachez une politique de CMK à votre CMK avec le contenu suivant, en remplaçant le numéro de compte AWS et le nom du rôle IAM Datadog de manière appropriée :

```
{
    "Id": "key-consolepolicy-3",
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Enable IAM User Permissions",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<MY_AWS_ACCOUNT_NUMBER>:root"
            },
            "Action": "kms:*",
            "Resource": "*"
        },
        {
            "Sid": "Allow use of the key",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<MY_AWS_ACCOUNT_NUMBER>:role/<MY_DATADOG_IAM_ROLE_NAME>"
            },
            "Action": [
                "kms:Encrypt",
                "kms:Decrypt",
                "kms:ReEncrypt*",
                "kms:GenerateDataKey*",
                "kms:DescribeKey"
            ],
            "Resource": "*"
        },
        {
            "Sid": "Allow attachment of persistent resources",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<MY_AWS_ACCOUNT_NUMBER>:role/<MY_DATADOG_IAM_ROLE_NAME>"
            },
            "Action": [
                "kms:CreateGrant",
                "kms:ListGrants",
                "kms:RevokeGrant"
            ],
            "Resource": "*",
            "Condition": {
                "Bool": {
                    "kms:GrantIsForAWSResource": "true"
                }
            }
        }
    ]
}
```

3. Après avoir sélectionné **AWS Key Management Service** comme votre **Type de Chiffrement** dans Datadog, saisissez l'ARN de votre clé AWS KMS.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html

{{% /tab %}}
{{< /tabs >}}

### Validation {#validation}

Une fois que vos paramètres d'archive sont correctement configurés dans votre compte Datadog, vos pipelines de traitement commencent à enrichir tous les journaux ingérés dans Datadog. Ces journaux sont ensuite transférés vers votre archive.

Cependant, après avoir créé ou mis à jour vos configurations d'archive, il peut s'écouler plusieurs minutes avant que le prochain téléversement d'archive ne soit tenté. La fréquence à laquelle les archives sont téléversées peut varier. **Vérifiez votre bucket de stockage dans 15 minutes** pour vous assurer que les archives sont correctement téléversées depuis votre compte Datadog.

Après cela, si l'archive est toujours dans un état en attente, vérifiez vos filtres d'inclusion pour vous assurer que la requête est valide et correspond aux événements de journal dans [Live Tail][14]. Lorsque Datadog ne parvient pas à téléverser des journaux vers une archive externe, en raison de modifications involontaires des paramètres ou des autorisations, l'archive de journaux correspondante est mise en évidence sur la page de configuration.

{{< img src="logs/archives/archive_errors_details.png" alt="Vérifiez que vos archives sont correctement configurées" style="width:100%;">}}

Survolez l'archive pour voir les détails de l'erreur et les actions à entreprendre pour résoudre le problème. Un événement est également généré dans l'[Explorateur d'Événements][15]. Vous pouvez créer un moniteur pour ces événements afin de détecter et de remédier rapidement aux échecs.

## Plusieurs archives {#multiple-archives}

Si vous avez défini plusieurs archives, les logs intègrent la première archive, en fonction du filtre appliqué.

{{< img src="logs/archives/log_forwarding_archives_multiple.png" alt="Les logs sont envoyées dans la première archive filtrée à laquelle ils correspondent." style="width:100%;">}}

Il est important de classer vos archives avec soin. Par exemple, si vous créez une première archive filtrée par le tag `env:prod` et une seconde archive sans aucun filtre (l'équivalent de `*`), tous vos journaux de production iraient dans le même bucket de stockage ou chemin, et le reste irait dans l'autre.

## Format des archives {#format-of-the-archives}

Les archives de journaux que Datadog transfère vers votre bucket de stockage sont au format JSON compressé. Selon votre [configuration de compression](#compression), les fichiers d'archive utilisent soit la compression zstd (`.json.zst`, par défaut) soit la compression gzip (`.json.gz`). En utilisant le préfixe que vous indiquez (ou `/` s'il n'y en a pas), les archives sont stockées dans une structure de répertoire qui indique à quelle date et à quelle heure les fichiers d'archive ont été générés, comme suit :

```
/my/bucket/prefix/dt=20180515/hour=14/archive_143201.1234.02aafad5-f525-4592-905e-e962d1a5b2f7.json.gz
/my/bucket/prefix/dt=<YYYYMMDD>/hour=<HH>/archive_<HHmmss.SSSS>.<UUID>.json.gz
```

Cette structure de répertoire vous permet de retrouver plus facilement vos archives de logs en fonction de leur date.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>

*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: /fr/logs/indexes/#exclusion-filters
[2]: /fr/logs/archives/rehydrating/
[3]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[4]: /fr/observability_pipelines/configuration/explore_templates/?tab=logs#archive-logs
[5]: /fr/account_management/rbac/permissions/?tab=ui#logs_write_archives
[6]: https://app.datadoghq.com/logs/pipelines/archives
[7]: /fr/integrations/azure/
[8]: https://ip-ranges.datadoghq.com/
[9]: /fr/account_management/rbac/permissions#logs_write_archives
[10]: /fr/account_management/rbac/permissions#logs_read_archives
[11]: /fr/account_management/rbac/permissions#logs_write_historical_view
[12]: /fr/account_management/rbac/permissions#logs_read_index_data
[13]: /fr/account_management/rbac/permissions#logs_read_data
[14]: /fr/logs/explorer/live_tail/
[15]: /fr/events/explorer/
[16]: /fr/logs/log_configuration/archive_search/?tab=amazons3
[17]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingServerSideEncryption.html
[18]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html