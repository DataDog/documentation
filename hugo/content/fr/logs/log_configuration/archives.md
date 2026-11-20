---
aliases:
- /fr/logs/s3/
- /fr/logs/gcs/
- /fr/logs/archives/s3/
- /fr/logs/archives/gcs/
- /fr/logs/archives/gcp/
- /fr/logs/archives/
description: Transférez tous vos logs ingérés vers un stockage à long terme.
further_reading:
- link: /logs/archives/rehydrating
  tag: Documentation
  text: Découvrez comment accéder au contenu de vos logs archivés dans Datadog
- link: /logs/explorer/
  tag: Documentation
  text: En savoir plus sur le Log Explorer
- link: /logs/logging_without_limits/
  tag: Documentation
  text: En savoir plus sur Logging without Limits*
title: Archives de logs
---
## Présentation {#overview}

Configurez votre compte Datadog pour transférer tous les logs ingérés, qu'ils soient [indexés][1] ou non, vers votre propre système de stockage cloud. Conservez vos logs dans une archive optimisée pour le stockage pendant de plus longues périodes et respectez les exigences de conformité tout en conservant une capacité d'audit pour les investigations ponctuelles, grâce à [Rehydration][2] ou à [Archive Search][16].

{{< img src="/logs/archives/log_forwarding_archives_122024.png" alt="Onglet Archives sur la page Log Forwarding" style="width:100%;">}}

Accédez à la [page {{< ui >}}Log Archiving & Forwarding{{< /ui >}}][3] pour configurer une archive afin de transférer les logs ingérés vers votre propre bucket de stockage hébergé dans le cloud.

1. Si ce n'est pas déjà fait, configurez une [intégration](#set-up-an-integration) Datadog pour votre fournisseur cloud.
2. Créez un [bucket de stockage](#create-a-storage-bucket).
3. Définissez des [autorisations](#set-permissions) de `read` et/ou `write` sur cette archive.
4. [Acheminez vos logs](#route-your-logs-to-a-bucket) vers et depuis cette archive.
5. Configurez les [paramètres avancés](#advanced-settings) tels que le chiffrement, la classe de stockage et les tags.
6. [Validez](#validation) votre configuration et vérifiez les éventuelles erreurs de configuration que Datadog pourrait détecter pour vous.

Découvrez comment [archiver vos logs avec Observability Pipelines][4] si vous souhaitez acheminer vos logs vers une archive optimisée pour le stockage directement depuis votre environnement.

Les métriques suivantes rendent compte des logs qui ont été archivés avec succès, y compris les logs envoyés avec succès après de nouvelles tentatives.

- datadog.archives.logs.bytes
- datadog.archives.logs.count


## Configurez une archive {#configure-an-archive}

### Configurez une intégration {#set-up-an-integration}

{{< tabs >}}
{{% tab "AWS S3" %}}

Si ce n'est pas déjà fait, configurez l'[intégration AWS][1] pour le compte AWS qui contient votre bucket S3.
   * Dans le cas général, cela implique de créer un rôle que Datadog peut utiliser pour s'intégrer avec AWS S3.
   * Spécifiquement pour les comptes AWS China, utilisez des clés d'accès comme alternative à la délégation de rôle.

[1]: /fr/integrations/amazon_web_services/?tab=automaticcloudformation#setup
{{% /tab %}}
{{% tab "Azure Storage" %}}

Configurez l'[intégration Azure][1] dans l'abonnement qui contient votre nouveau compte de stockage, si ce n'est pas déjà fait. Cela implique de [créer une inscription d'application que Datadog peut utiliser][2] pour s'intégrer.

**Remarque :** L'archivage vers Azure ChinaCloud et Azure GermanyCloud n'est pas pris en charge. L'archivage vers Azure GovCloud est pris en charge en Preview. Pour demander l'accès, contactez le support Datadog.

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /fr/integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

Configurez l'[intégration Google Cloud][1] pour le projet qui contient votre bucket de stockage GCS, si ce n'est pas déjà fait. Cela implique de [créer un compte de service Google Cloud que Datadog peut utiliser][2] pour s'intégrer.

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: /fr/integrations/google_cloud_platform/?tab=datadogussite#setup
{{% /tab %}}
{{< /tabs >}}

### Créer un bucket de stockage {#create-a-storage-bucket}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">L'envoi de logs vers une archive se fait en dehors de l'environnement Datadog GovCloud, qui échappe au contrôle de Datadog. Datadog ne saurait être tenu responsable des logs ayant quitté l'environnement Datadog GovCloud, notamment en ce qui concerne les obligations ou exigences auxquelles l'utilisateur pourrait être soumis au titre de FedRAMP, des niveaux d'impact du DoD, de l'ITAR, de la réglementation relative aux exportations, de la résidence des données ou de réglementations similaires applicables à ces logs.</div>
{{< /site-region >}}

{{< tabs >}}
{{% tab "AWS S3" %}}

Accédez à votre [console AWS][1] et [créez un bucket S3][2] vers lequel envoyer vos archives.

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger"> Les archives Datadog ne prennent pas en charge les noms de bucket contenant des points (.) lorsqu'elles sont intégrées à un endpoint FIPS S3 reposant sur un adressage de type virtual-host. En savoir plus dans la documentation AWS. <a href="https://aws.amazon.com/compliance/fips/">AWS FIPS</a> et <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html">AWS Virtual Hosting</a>.</div>
{{< /site-region >}}

**Remarques :**

- Ne rendez pas votre bucket lisible publiquement.
- Pour les [sites US1, US3 et US5][3], consultez [AWS Pricing][4] pour connaître les frais de transfert de données inter-régions et leur incidence éventuelle sur les coûts de stockage cloud. Envisagez de créer votre bucket de stockage dans `us-east-1` pour gérer vos frais de transfert de données inter-régions.

[1]: https://s3.console.aws.amazon.com/s3
[2]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html
[3]: /fr/getting_started/site/
[4]: https://aws.amazon.com/s3/pricing/
{{% /tab %}}

{{% tab "Azure Storage" %}}

* Accédez à [Azure Portal][1] et [créez un compte de stockage][2] vers lequel envoyer vos archives. Donnez un nom à votre compte de stockage, sélectionnez des performances standard ou un type de compte premium {{< ui >}}Block blobs{{< /ui >}}, puis sélectionnez le niveau d'accès {{< ui >}}hot{{< /ui >}} ou {{< ui >}}cool{{< /ui >}}.
* Créez un service {{< ui >}}container{{< /ui >}} au sein de ce compte de stockage. Notez le nom du conteneur car vous devrez l'ajouter sur la page d'archivage Datadog.

**Remarque :** Ne définissez pas de [politiques d'immuabilité][3] car les données les plus récentes doivent être réécrites dans certains cas rares (généralement en cas d'expiration du délai d'attente).

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
[2]: https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-immutability-policies-manage
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

Accédez à votre [compte Google Cloud][1] et [créez un bucket GCS][2] vers lequel envoyer vos archives. Sous {{< ui >}}Choose how to control access to objects{{< /ui >}}, sélectionnez {{< ui >}}Set object-level and bucket-level permissions{{< /ui >}}.

**Remarque :** N'ajoutez pas de [politique de rétention][3] car les données les plus récentes doivent être réécrites dans certains cas rares (généralement en cas d'expiration du délai d'attente).

[1]: https://console.cloud.google.com/storage
[2]: https://cloud.google.com/storage/docs/quickstart-console
[3]: https://cloud.google.com/storage/docs/bucket-lock
{{% /tab %}}
{{< /tabs >}}

### Définissez les autorisations {#set-permissions}

Seuls les utilisateurs Datadog disposant de l'[autorisation `logs_write_archive`][5] peuvent créer, modifier ou supprimer des configurations d'archivage de logs.

{{< tabs >}}
{{% tab "AWS S3" %}}

1. [Créez une politique][1] avec les déclarations d'autorisation suivantes :

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
     * The `GetObject` and `ListBucket` permissions allow for [searching archives][2].
     * The `PutObject` permission is sufficient for uploading archives.
     * Ensure that the resource value under the `s3:PutObject` and `s3:GetObject` actions ends with `/*` because these permissions are applied to objects within the buckets.

2. Modifiez les noms des buckets.
3. Vous pouvez également indiquer les chemins qui contiennent vos archives de logs.
4. Associez la nouvelle politique au rôle de l'intégration Datadog.
   * Accédez à {{< ui >}}Roles{{< /ui >}} dans la console IAM d'AWS.
   * Localisez le rôle utilisé par l'intégration Datadog. Par défaut, il est nommé **DatadogIntegrationRole**, mais le nom peut varier si votre organisation l'a renommé. Cliquez sur le nom du rôle pour ouvrir la page de résumé du rôle.
   * Cliquez sur {{< ui >}}Add permissions{{< /ui >}}, puis sur {{< ui >}}Attach policies{{< /ui >}}.
   * Saisissez le nom de la politique créée ci-dessus.
   * Cliquez sur {{< ui >}}Attach policies{{< /ui >}}.


[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[2]: /fr/logs/explorer/archive_search/
{{% /tab %}}
{{% tab "Azure Storage" %}}

1. Accordez à l'application Datadog l'autorisation de lire et d'écrire dans votre compte de stockage.
2. Sélectionnez votre compte de stockage depuis la [page Storage Accounts][1], accédez à {{< ui >}}Access Control (IAM){{< /ui >}} et sélectionnez {{< ui >}}Add{{< /ui >}} > {{< ui >}}Add Role Assignment{{< /ui >}}.
3. Saisissez le rôle nommé **Storage Blob Data Contributor**, sélectionnez l'application Datadog que vous avez créée pour l'intégration avec Azure et enregistrez.

{{< img src="logs/archives/logs_azure_archive_permissions.png" alt="Ajoutez le rôle Storage Blob Data Contributor à votre application Datadog." style="width:75%;">}}

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

1. Accordez à votre compte de service Google Cloud Datadog les autorisations d'écrire vos archives dans votre bucket.
2. Sélectionnez le principal de votre compte de service Google Cloud Datadog depuis la [page d'administration IAM de Google Cloud][1] et sélectionnez {{< ui >}}Edit principal{{< /ui >}}.
3. Cliquez sur {{< ui >}}ADD ANOTHER ROLE{{< /ui >}}, sélectionnez le rôle {{< ui >}}Storage Object Admin{{< /ui >}} et enregistrez.

   {{< img src="logs/archives/gcp_role_storage_object_admin-2.png" alt="Ajoutez le rôle Storage Object Admin à votre compte de service Google Cloud Datadog." style="width:75%;">}}

Le rôle {{< ui >}}Storage Object Admin{{< /ui >}} est la configuration recommandée par Datadog. Si votre organisation exige un rôle personnalisé respectant le principe du moindre privilège, les autorisations individuelles suivantes sont requises pour l'envoi des archives :

- `storage.objects.create`
- `storage.objects.get`
- `storage.objects.list`
- `storage.objects.delete`

`storage.objects.delete` est requis pour prendre en charge les nouvelles tentatives d'écriture dans l'archive, lors desquelles Datadog écrase un objet existant dans le bucket. Les autorisations d'envoi multipartie (`storage.multipartUploads.*`) ne sont pas requises.

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

### Acheminez vos logs vers un bucket {#route-your-logs-to-a-bucket}

Accédez à la [page d'archivage et de transfert de logs][6] et sélectionnez {{< ui >}}Add a new archive{{< /ui >}} sur l'onglet {{< ui >}}Archives{{< /ui >}}.

**Remarques :**
* Seuls les utilisateurs Datadog disposant de l'[autorisation `logs_write_archive`][5] peuvent effectuer cette étape et la suivante.
* L'archivage des logs vers Azure Blob Storage nécessite une App Registration. Consultez les instructions [sur la page d'intégration Azure][7] et définissez le « site » sur le côté droit de la page de documentation sur « US ». Les App Registrations créées à des fins d'archivage ont uniquement besoin du rôle « Storage Blob Data Contributor ». Si votre bucket de stockage se trouve dans un abonnement surveillé via une Datadog Resource, un avertissement indique que l'App Registration est redondante. Vous pouvez ignorer cet avertissement.
* Si votre bucket limite l'accès réseau à des adresses IP spécifiques, ajoutez les adresses IP des webhooks à partir du {{< region-param key="ip_ranges_url" link="true" text="IP ranges list">}} à la liste d'autorisation.
* Pour les sites **US1-FED et US2-FED**, vous pouvez configurer Datadog pour envoyer des logs vers une destination en dehors de l'environnement Datadog GovCloud. Datadog n'est pas responsable des logs qui quittent l'environnement Datadog GovCloud. De plus, Datadog n'est pas responsable des obligations ou exigences que vous pourriez avoir concernant FedRAMP, les niveaux d'impact DoD, l'ITAR, la conformité aux exportations, la résidence des données ou des réglementations similaires applicables à ces logs après qu'ils ont quitté l'environnement GovCloud.

| Service                  | Étapes                                                                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Amazon S3**               | - Sélectionnez la combinaison de compte et de rôle AWS appropriée pour votre bucket S3.<br>- Saisissez le nom de votre bucket.<br>**Facultatif** : saisissez un répertoire servant de préfixe pour tout le contenu de vos archives de logs. |
| **Azure Storage**        | - Sélectionnez le type d'archive {{< ui >}}Azure Storage{{< /ui >}}, ainsi que le tenant et le client Azure pour l'application Datadog qui possède le rôle Storage Blob Data Contributor sur votre compte de stockage.<br>- Saisissez le nom de votre compte de stockage et le nom du conteneur pour votre archive.<br>**Facultatif** : saisissez un répertoire servant de préfixe pour tout le contenu de vos archives de logs. |
| **Google Cloud Storage** | - Sélectionnez le type d'archive {{< ui >}}Google Cloud Storage{{< /ui >}}, ainsi que le compte de service GCS qui dispose des autorisations d'écriture sur votre bucket de stockage.<br>- Saisissez le nom de votre bucket.<br>**Facultatif** : saisissez un répertoire servant de préfixe pour tout le contenu de vos archives de logs. |

### Paramètres avancés {#advanced-settings}

{{< img src="/logs/archives/log_archives_advanced_settings.png" alt="Paramètres avancés pour ajouter des tags optionnels et définir la taille maximale d'analyse" style="width:100%;" >}}

#### Tags Datadog {#datadog-tags}

Utilisez cette étape de configuration facultative pour :

* Inclure tous les tags de logs dans vos archives (activé par défaut sur toutes les nouvelles archives). **Remarque** : cela augmente la taille des archives résultantes.
* Ajoutez des tags aux logs réhydratés conformément à votre politique de Restriction Queries. Consultez l'autorisation [`logs_read_data`][13].

#### Définir la taille maximale d'analyse {#define-maximum-scan-size}

Utilisez cette étape de configuration facultative pour définir le volume maximal de données de logs (en Go) pouvant être analysé pour Archive Search ou la réhydratation de vos archives de logs.

Pour les archives avec une taille d'analyse maximale définie, tous les utilisateurs doivent estimer la taille de l'analyse avant d'être autorisés à lancer une opération Archive Search ou une réhydratation. Si la taille d'analyse estimée est supérieure à ce qui est autorisé pour cette archive, les utilisateurs doivent réduire la plage temporelle de leur requête. La réduction de la plage temporelle réduira la taille de l'analyse et permettra à l'utilisateur de lancer une opération Archive Search ou une réhydratation.

**Remarque** : pour réduire le volume de données analysées lors d'une [Archive Search][16], configurez les attributs [Partition Attributes](#archive-partition-attribute) et [Lookup Attributes](#archive-lookup-attribute) sur votre archive. Les attributs de partition restreignent le périmètre de la recherche en ignorant les segments de données non pertinents, tandis que les attributs de recherche accélèrent l'identification d'entrées de log spécifiques.

Pour les deux types d'attributs, saisissez des tags et des [attributs réservés][19] tels que `env`, `service` ou `trace_id` sans le préfixe `@`. Faites précéder tous les autres attributs de `@`.

#### Attribut de partition d'archive {#archive-partition-attribute}

Les attributs de partition organisent les logs archivés en groupes selon les valeurs communes de leurs champs. Utilisez-les pour des filtres larges afin d'ignorer les segments d'archive non pertinents et de réduire le volume d'analyse lors d'une [Archive Search][16].

Vous pouvez configurer jusqu'à **2 attributs de partition** par archive.

* **Utilisation** : Attributs à faible cardinalité tels que `service`, `source`, `env` ou `status` que vous utilisez fréquemment comme filtres de recherche.
* **Fonctionnement** : les logs partageant les mêmes valeurs d'attributs de partition sont regroupés dans le stockage. Datadog ignore des partitions entières qui ne correspondent pas à votre requête, ce qui réduit considérablement le volume de données analysées.

#### Attribut de recherche d'archive {#archive-lookup-attribute}

Les attributs de recherche créent un chemin d'accès rapide aux logs contenant des valeurs spécifiques. Utilisez-les pour les identifiants à haute cardinalité afin d'accélérer les investigations ciblées avec [Archive Search][16].

Vous pouvez configurer jusqu'à **2 attributs de recherche** par archive.

* **Utilisation** : Attributs à haute cardinalité tels que `trace_id`, `@usr.id`, `@http.request_id` ou `@transaction_id`.
* **Fonctionnement** : Datadog crée un index pour ces attributs au moment de l'écriture, ce qui permet à Archive Search d'identifier précisément des logs spécifiques sans analyser l'archive complète.

**Attributs de partition vs attributs de recherche**

| | Partition | Recherche |
|---|---|---|
| **Cardinalité** | Faible (des dizaines à des centaines de valeurs) | Élevée (des millions de valeurs) |
| **Attributs typiques** | `service`, `source`, `env`, `status` | `trace_id`, `@usr.id`, `@http.request_id`, `@transaction_id` |
| **Avantages** | Ignore des partitions entières qui ne correspondent pas à votre requête | Identifie précisément des entrées de log spécifiques sans analyser l'archive complète |
| **Utilisation recommandée** | Filtrage large par environnement ou service | Investigations ponctuelles sur des identifiants spécifiques |
| **Limite** | Jusqu'à 2 par archive | Jusqu'à 2 par archive |

Pour des performances de recherche optimales, combinez les deux : les attributs de partition réduisent le périmètre de recherche aux segments de données pertinents, tandis que les attributs de recherche vous permettent de trouver instantanément des logs spécifiques au sein de ces segments.

{{< site-region region="us3" >}}

#### Règles de pare-feu {#firewall-rules}

{{< tabs >}}
{{% tab "Stockage Azure" %}}

Les règles de pare-feu ne sont pas prises en charge.

{{% /tab %}}
{{< /tabs >}}

{{< /site-region >}}

#### Compression {#compression}

Par défaut, Datadog archive les logs en utilisant la compression **zstd** (Zstandard) (`.json.zst`), qui offre de meilleurs taux de compression et des vitesses de décompression plus rapides que gzip. Vous pouvez également configurer la compression **gzip** (`.json.gz`).


Pour configurer la compression, sélectionnez {{< ui >}}Compression Type{{< /ui >}} lors de la création ou de la modification d'une archive sur la [page Log Archiving & Forwarding][6] :

- {{< ui >}}zstd{{< /ui >}} (par défaut) : Meilleur taux de compression et vitesse de décompression supérieure. Recommandé pour les nouvelles archives, surtout si vous prévoyez d'utiliser [Archive Search][16].
- {{< ui >}}gzip{{< /ui >}} : Largement pris en charge et compatible avec la plupart des outils.

**Remarque** : La modification du format de compression d'une archive existante n'affecte que les nouveaux fichiers d'archive. Les fichiers déjà stockés dans votre bucket conservent leur format d'origine.

#### Classe de stockage {#storage-class}

{{< tabs >}}
{{% tab "AWS S3" %}}

Vous pouvez soit sélectionner une classe de stockage pour votre archive, soit [définir une configuration de cycle de vie sur votre bucket S3][1] pour transférer automatiquement vos archives de journaux vers des classes de stockage optimales.

[Archive Search][2] ne prend en charge que les classes de stockage suivantes :

* S3 Standard
* S3 Standard-IA
* S3 One Zone-IA
* S3 Glacier Instant Retrieval
* S3 Intelligent-Tiering, uniquement si [les niveaux d'accès aux archives asynchrones facultatifs][3] sont tous deux désactivés.

Si votre archive utilise une autre classe de stockage, vous devez d'abord la déplacer vers l'une des classes de stockage prises en charge ci-dessus.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/how-to-set-lifecycle-configuration-intro.html
[2]: /fr/logs/explorer/archive_search/
[3]: https://aws.amazon.com/s3/storage-classes/intelligent-tiering/
{{% /tab %}}
{{% tab "Azure Storage" %}}

L'archivage et [Archive Search][1] ne prennent en charge que les niveaux d'accès suivants :

- Niveau d'accès Hot
- Niveau d'accès Cool

Si votre archive utilise un autre niveau d'accès, vous devez d'abord la déplacer vers l'un des niveaux pris en charge ci-dessus.

[1]: /fr/logs/explorer/archive_search/
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

L'archivage et [Archive Search][1] prennent en charge les niveaux d'accès suivants :

- Standard
- Nearline
- Coldline
- Archive

[1]: /fr/logs/explorer/archive_search/
{{% /tab %}}

{{< /tabs >}}

#### Chiffrement côté serveur (SSE) pour les archives S3 {#server-side-encryption-sse-for-s3-archives}

Lors de la création ou de la mise à jour d'une archive S3 dans Datadog, vous pouvez éventuellement configurer {{< ui >}}Advanced Encryption{{< /ui >}}. Trois options sont disponibles dans le menu déroulant {{< ui >}}Encryption Type{{< /ui >}} :

- {{< ui >}}Default S3 Bucket-Level Encryption{{< /ui >}} (Par défaut) : Datadog ne remplace pas les paramètres de chiffrement par défaut de votre bucket S3.
- {{< ui >}}Amazon S3 managed keys{{< /ui >}} : Force le chiffrement côté serveur à l'aide de clés gérées par Amazon S3 ([SSE-S3][17]), indépendamment du chiffrement par défaut du bucket S3.
- {{< ui >}}AWS Key Management Service{{< /ui >}} : Force le chiffrement côté serveur à l'aide d'une clé gérée par le client (CMK) provenant d'[AWS KMS][18], indépendamment du chiffrement par défaut du bucket S3. Vous devrez fournir l'ARN de la CMK.

{{< tabs >}}
{{% tab "Chiffrement par défaut au niveau du bucket S3" %}}

Lorsque cette option est sélectionnée, Datadog ne spécifie aucun en-tête de chiffrement dans la requête de chargement. Le chiffrement par défaut de votre bucket S3 s'appliquera.

Pour définir ou vérifier la configuration de chiffrement de votre bucket S3 :

1. Accédez à votre bucket S3.
2. Cliquez sur l'onglet {{< ui >}}Properties{{< /ui >}}.
3. Dans la section {{< ui >}}Default Encryption{{< /ui >}}, configurez ou confirmez le type de chiffrement. Si votre chiffrement utilise [AWS KMS][1], assurez-vous de disposer d'une CMK valide et d'une politique de CMK associée à votre CMK.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html

{{% /tab %}}
{{% tab "Clés gérées par Amazon S3" %}}

Cette option garantit que tous les objets d'archive sont téléversés avec [SSE_S3][1], en utilisant des clés gérées par Amazon S3. Ceci remplace tout paramètre de chiffrement par défaut du bucket S3.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingServerSideEncryption.html
{{% /tab %}}
{{% tab "AWS Key Management Service" %}}

Cette option garantit que tous les objets d'archive sont téléversés à l'aide d'une clé gérée par le client (CMK) provenant d'[AWS KMS][1]. Ceci remplace tout paramètre de chiffrement par défaut du bucket S3.

Assurez-vous d'avoir effectué les étapes suivantes pour créer une CMK et une politique de CMK valides. Ensuite, fournissez l'ARN de la CMK pour configurer correctement ce type de chiffrement.

1. Créez votre CMK.
2. Attachez une politique de CMK à votre CMK avec le contenu suivant, en remplaçant le numéro de compte AWS et le nom du rôle IAM Datadog de manière appropriée :

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

3. Après avoir sélectionné {{< ui >}}AWS Key Management Service{{< /ui >}} comme {{< ui >}}Encryption Type{{< /ui >}} dans Datadog, saisissez l'ARN de votre clé AWS KMS.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html

{{% /tab %}}
{{< /tabs >}}

### Validation {#validation}

Une fois vos paramètres d'archivage correctement configurés dans votre compte Datadog, vos pipelines de traitement commencent à enrichir tous les logs ingérés dans Datadog. Ces logs sont ensuite transférés vers votre archive.

Cependant, après avoir créé ou mis à jour vos configurations d'archivage, il peut s'écouler plusieurs minutes avant que le prochain téléversement d'archive ne soit tenté. La fréquence à laquelle les archives sont téléversées peut varier. **Vérifiez votre bucket de stockage dans 15 minutes** pour vous assurer que les archives sont correctement téléversées depuis votre compte Datadog.

Après cela, si l'archive est toujours en attente, vérifiez vos filtres d'inclusion pour vous assurer que la requête est valide et correspond aux événements de log dans [Live Tail][14]. Lorsque Datadog ne parvient pas à téléverser des logs vers une archive externe, en raison de modifications involontaires des paramètres ou des autorisations, l'archive de logs correspondante est mise en surbrillance sur la page de configuration.

{{< img src="logs/archives/archive_errors_details.png" alt="Vérifiez que vos archives sont correctement configurées" style="width:100%;">}}

Survolez l'archive pour afficher les détails de l'erreur et les actions à entreprendre pour résoudre le problème. Un événement est également généré dans l'[Events Explorer][15]. Vous pouvez créer un monitor pour ces événements afin de détecter et de corriger rapidement les échecs.

## Archives Observability Pipelines {#observability-pipelines-archives}

Lorsque vous activez Archive Search sur une destination d'archivage Observability Pipelines, Datadog crée la Log Archive après le déploiement du pipeline. Pour obtenir des instructions de configuration, consultez la documentation des destinations [Datadog Archives (Amazon S3)][20], [Google Cloud Storage][21] ou [Azure Storage][22]. Ces archives sont répertoriées dans l'onglet {{< ui >}}Observability Pipelines Archives{{< /ui >}} sur la [page Log Archiving & Forwarding][3].

Gérez la configuration du bucket pour ces archives dans Observability Pipelines. Dans Datadog, vous pouvez modifier leurs autorisations, leurs tags et la [taille maximale d'analyse](#define-maximum-scan-size).

## Archives multiples {#multiple-archives}

Si plusieurs archives sont définies, les logs sont envoyés à la première archive en fonction du filtre.

{{< img src="logs/archives/log_forwarding_archives_multiple.png" alt="Les logs sont envoyés à la première archive dont le filtre leur correspond." style="width:100%;">}}

Il est important d'ordonner vos archives avec soin. Par exemple, si vous créez une première archive filtrée sur le tag `env:prod` et une seconde archive sans aucun filtre (l'équivalent de `*`), tous vos logs de production iraient dans un bucket de stockage ou un chemin, et le reste irait dans l'autre.

## Format des archives {#format-of-the-archives}

Les archives de logs que Datadog transfère vers votre bucket de stockage sont au format JSON compressé. Selon votre [configuration de compression](#compression), les fichiers d'archive utilisent la compression zstd (`.json.zst`, par défaut) ou gzip (`.json.gz`). En utilisant le préfixe que vous indiquez (ou `/` s'il n'y en a aucun), les archives sont stockées dans une structure de répertoire qui indique la date et l'heure auxquelles les fichiers d'archive ont été générés, comme suit :

```
/my/bucket/prefix/dt=20180515/hour=14/archive_143201.1234.02aafad5-f525-4592-905e-e962d1a5b2f7.json.gz
/my/bucket/prefix/dt=<YYYYMMDD>/hour=<HH>/archive_<HHmmss.SSSS>.<UUID>.json.gz
```

Cette structure de répertoire facilite l’exécution de requêtes sur vos archives de logs historiques en fonction de leur date.

## Pour aller plus loin {#further-reading}

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
[16]: /fr/logs/explorer/archive_search/?tab=amazons3
[17]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingServerSideEncryption.html
[18]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html
[19]: /fr/logs/explorer/search_syntax/#reserved-attributes
[20]: /fr/observability_pipelines/destinations/datadog_archives/#archive-search
[21]: /fr/observability_pipelines/destinations/google_cloud_storage/#archive-search
[22]: /fr/observability_pipelines/destinations/azure_storage/#archive-search