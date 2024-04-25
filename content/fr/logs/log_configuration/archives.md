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
kind: documentation
title: Archives de logs
---

## Présentation

Configurez votre compte Datadog de manière à transférer tous les logs ingérés, qu'ils soient [indexés][1] ou non, vers votre système de stockage dans le cloud. Conservez vos logs dans une solution d'archivage à long terme afin d'assurer leur conformité et leur auditabilité en cas d'incident grâce à la fonction de [réintégration][2].

{{< img src="logs/archives/log_forwarding_archives_tab.png" alt="Onglet Archives de la page Log Forwarding" style="width:100%;">}}

Accédez à la [page **Log Forwarding**][14] pour configurer une archive afin de transférer les logs ingérés vers un compartiment de votre solution de stockage dans le cloud.

1. Si vous ne l'avez pas déjà fait, configurez une [intégration](#configurer-une-integration) Datadog pour votre fournisseur de cloud.
2. Créez un [compartiment de stockage](#creer-un-compartiment-de-stockage).
3. Définissez les [autorisations](#definir-les-autorisations) `read` et/ou `write` pour cette archive.
4. [Transmettez vos logs](#transmettre-vos-logs-vers-un-compartiment) vers et depuis cette archive.
5. Configurez des [paramètres avancés](#parametres-avances) comme le chiffrement, la classe de stockage et les tags.
6. [Validez](#validation) votre configuration en recherchant d'éventuels problèmes de configuration détectés par Datadog.

## Configurer une archive

### Configurer une intégration

{{< tabs >}}
{{% tab "AWS S3" %}}

{{< site-region region="gov" >}}
<div class="alert alert-warning">La délégation des rôles AWS n'est pas prise en charge par le site gouvernemental Datadog. En effet, il nécessite l'utilisation de clés d'accès.</div>
{{< /site-region >}}

Si ce n'est pas déjà fait, configurez l'[intégration AWS][1] pour le compte AWS associé à votre compartiment S3. 

* En général, il est nécessaire de créer un rôle pouvant être utilisé par Datadog pour l'intégration à AWS S3.
* Pour les comptes AWS GovCloud ou China uniquement, utilisez les clés d'accès comme alternative à la délégation de rôles.

[1]: /fr/integrations/amazon_web_services/?tab=automaticcloudformation#setup
{{% /tab %}}
{{% tab "Stockage Azure" %}}

Si vous ne l'avez pas encore fait, configurez l'[intégration Azure][1] pour l'abonnement associé à votre compte de stockage. Vous devrez [créer une inscription d'application utilisable par Datadog][2] afin de procéder à l'intégration.

**Remarque** : il n'est pas possible d'archiver des logs vers Azure ChinaCloud, GermanyCloud et GovCloud.

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /fr/integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

Si vous ne l'avez pas encore fait, configurez l'[intégration Google Cloud][1] pour le projet qui comporte votre compartiment de stockage GCS. Vous devrez [créer un compte de service Google Cloud utilisable par Datadog][2] afin de procéder à l'intégration.

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: /fr/integrations/google_cloud_platform/?tab=datadogussite#setup
{{% /tab %}}
{{< /tabs >}}

### Créer un compartiment de stockage

{{< site-region region="gov" >}}
<div class="alert alert-warning">L'envoi de logs vers une archive s'effectue en dehors de l'environnement GovCloud Datadog, et échappe donc au contrôle de Datadog. Datadog ne saurait en aucun cas être tenu responsable des logs quittant l'environnement GovCloud Datadog. Cela inclut, sans toutefois s'y limiter, toutes les obligations ou exigences incombant à l'utilisateur au sujet du programme FedRAMP, des niveaux d'impact du Département de la Défense des États-Unis, de la Réglementation américaine sur le trafic d'armes au niveau international (ITAR), de la conformité relative aux exportations, de la résidence des données ou de toute autre réglementation applicable auxdits logs. ( </div>
{{< /site-region >}}

{{< tabs >}}
{{% tab "AWS S3" %}}

Accédez à votre [console AWS][1] et [créez un compartiment S3][2] vers lequel vos archives seront envoyées.

**Remarques :**

- Assurez-vous que votre compartiment n'est pas accessible au public.
- Pour les [sites US1, US3 et US5][4], consultez les [tarifs AWS][5] pour découvrir les frais applicables aux transferts de données d'une région à une autre ainsi que l'incidence de tels transferts sur les coûts de votre stockage dans le cloud. Envisagez de créer votre compartiment de stockage dans la région `us-east-1` afin de mieux gérer ces frais.

[1]: https://s3.console.aws.amazon.com/s3
[2]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html
[3]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock-overview.html
[4]: /fr/getting_started/site/
[5]: https://aws.amazon.com/s3/pricing/
{{% /tab %}}

{{% tab "Stockage Azure" %}}

* Accédez à votre [portail Azure][1] et [créez un compte de stockage][2] vers lequel vous souhaitez envoyer vos archives. Attribuez un nom à votre compte, sélectionnez les performances standard ou le type de compte payant **Block blobs**, puis sélectionnez le niveau d'accès **hot** ou **cool**.
* Créez un service de **conteneur** dans ce compte de stockage. Prenez note du nom du conteneur, car vous devrez l'indiquer dans la page d'archive Datadog.

**Remarque** : ne définissez pas de [stratégie d'immuabilité][3], car il arrive dans de rares cas (généralement après une expiration) que les dernières données doivent être réécrites.

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
[2]: https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-immutability-policies-manage
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

Accédez à votre [compte Google Cloud][1] et [créez un compartiment GCS][2] vers lequel vos archives seront envoyées. Sous **Choose how to control access to objects**, sélectionnez **Set object-level and bucket-level permissions**.

**Remarque** : n'ajoutez pas de [règle de conservation][3], car il arrive dans de rares cas (généralement après une expiration) que les dernières données doivent être réécrites.

[1]: https://console.cloud.google.com/storage
[2]: https://cloud.google.com/storage/docs/quickstart-console
[3]: https://cloud.google.com/storage/docs/bucket-lock
{{% /tab %}}
{{< /tabs >}}

### Définir les autorisations

Seuls les utilisateurs Datadog bénéficiant de l'[autorisation `logs_write_archive`][3] peuvent créer, modifier ou supprimer des configurations d'archivage de logs.

{{< tabs >}}
{{% tab "AWS S3" %}}

1. [Créez une stratégie][1] avec les instructions d'autorisation suivantes :

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
     * Les autorisations `GetObject` et `ListBucket` permettent la [réintégration des logs à partir des archives][2].
     * L'autorisation `PutObject` est suffisante pour l'importation d'archives.
     * Vérifiez que la valeur de ressource sous les actions `s3:PutObject` et `s3:GetObject` se termine par `/*`, car ces autorisations sont appliquées aux objets des compartiments.

2. Modifiez le nom des compartiments.
3. Vous pouvez également spécifier les chemins vers vos archives de logs.
4. Associez la nouvelle stratégie au rôle de l'intégration Datadog.
   * Accédez à **Roles** depuis la console IAM d'AWS.
   * Repérez le rôle utilisé par l'intégration Datadog. Il est intitulé **DatadogIntegrationRole** par défaut, mais il est possible que votre organisation l'ait renommé. Cliquez sur le nom du rôle pour ouvrir une page de synthèse.
   * Cliquez sur **Add permissions**, puis sur **Attach policies**.
   * Saisissez le nom de la stratégie créée précédemment.
   * Cliquez sur **Attach policies**.


[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[2]: /fr/logs/archives/rehydrating/
{{% /tab %}}
{{% tab "Stockage Azure" %}}

1. Autorisez l'application Datadog à écrire dans votre compte de stockage et effectuer une réintégration à partir de celui-ci.
2. Sélectionnez votre compte de stockage depuis la [page Storage Accounts][1], accédez à **Access Control (IAM)** et sélectionnez **Add -> Add Role Assignment**.
3. Ajoutez le rôle **Storage Blob Data Contributor**, sélectionnez l'application Datadog que vous avez créée pour l'intégration Azure, puis enregistrez.

{{< img src="logs/archives/logs_azure_archive_permissions.png" alt="Ajouter le rôle Storage Blob Data Contributor à votre application Datadog." style="width:75%;">}}

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

1. Autorisez votre compte de service Google Cloud Datadog à écrire vos archives dans votre compartiment.
2. Sélectionnez le service principal de votre compte de service Google Cloud Datadog à partir de la [page d'administration Google Cloud IAM][1], puis sélectionnez **Edit principal**.
3. Cliquez sur **ADD ANOTHER ROLE**, sélectionnez le rôle **Storage Object Admin**, puis enregistrez.

   {{< img src="logs/archives/gcp_role_storage_object_admin-2.png" alt="Ajouter le rôle Storage Object Admin à votre compte de service Google Cloud Datadog" style="width:75%;">}}

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

### Transmettre vos logs vers un compartiment

Accédez à la [page Log Forwarding][5], puis sélectionnez **Add a new archive** depuis l'onglet **Archives**.

**Remarques :** 
* Seuls les utilisateurs de Datadog bénéficiant de l'[autorisation `logs_write_archive`][3] peuvent effectuer cette étape ainsi que la suivante.
* Pour archiver des logs dans Stockage Blob Azure, une inscription d'application est requise. Consultez les instructions disponibles à la [section relative à l'intégration Azure][6] et définissez le site en haut à droite de la page sur US. Les inscriptions d'application créées exclusivement à des fins d'archivage nécessitent le rôle Storage Blob Data Contributor. Si votre compartiment de stockage est inclus dans un abonnement surveillé via une ressource Datadog, un avertissement s'affiche pour vous prévenir que l'inscription d'application est superflue. Vous pouvez ignorer cet avertissement.
* Si seules certaines adresses IP peuvent accéder au réseau au sein de votre compartiment, ajoutez les IP de webhook de la [liste de plages d'IP][4] à la liste d'autorisation.

{{< tabs >}}
{{% tab "AWS S3" %}}

Sélectionnez le compte AWS et le rôle appropriés pour votre compartiment S3.

Indiquez le nom de votre compartiment. **Facultatif** : ajoutez un répertoire comme préfixe vers lequel l'ensemble de vos archives de logs sera envoyé.

{{< img src="logs/archives/logs_archive_aws_setup.png" alt="Définir les données de votre compartiment S3 dans Datadog" style="width:75%;">}}

{{% /tab %}}
{{% tab "Stockage Azure" %}}

Sélectionnez le type d'archive **Azure Storage**, ainsi que le locataire et le client Azure pour l'application Datadog disposant du rôle Storage Blob Data Contributor sur votre compte de stockage.

Indiquez le nom de votre compte de stockage et un nom de conteneur pour votre archive. **Facultatif** : ajoutez un répertoire comme préfixe vers lequel l'ensemble du contenu de vos archives de logs sera envoyé.

{{< img src="logs/archives/logs_archive_azure_setup.png" alt="Définir les données de votre compte de stockage Azure dans Datadog" style="width:75%;">}}


{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

Sélectionnez le type d'archive **GCS**, puis le compte de service GCS doté des autorisations d'écriture dans votre compte de stockage.

Indiquez le nom de votre compartiment. **Facultatif** : ajoutez un répertoire comme préfixe vers lequel l'ensemble de vos archives de logs sera envoyé.

{{< img src="logs/archives/logs_archive_gcp_setup.png" alt="Définir les données de votre compte de stockage Azure dans Datadog" style="width:75%;">}}

{{% /tab %}}
{{< /tabs >}}

### Paramètres avancés

#### Autorisations Datadog

Par défaut :

* Tous les utilisateurs Admin Datadog peuvent créer, modifier et réorganiser des archives. Consultez la rubrique [Configurer plusieurs archives](#configurer-plusieurs-archives) pour en savoir plus.
* Tous les utilisateurs Admin et Standard Datadog peuvent réintégrer des logs à partir des archives.
* Tous les utilisateurs, y compris les utilisateurs Read Only Datadog, peuvent accéder aux logs réintégrés.

Appliquez cette étape de configuration facultative pour attribuer des rôles sur cette archive et restreindre les utilisateurs qui peuvent effectuer les opérations suivantes :

* Modifier la configuration de cette archive. Voir l'autorisation [`logs_write_archive`][7].
* Réintégrer des logs à partir de cette archive. Voir les autorisations [`logs_read_archives`][8] et [`logs_write_historical_view`][9].
* Accéder aux logs réintégrés si vous utilisez l'ancienne [autorisation `read_index_data`][10].

{{< img src="logs/archives/archive_restriction.png" alt="Restreindre l'accès aux archives et aux logs réintégrés" style="width:75%;">}}

#### Tags Datadog

Cette étape de configuration facultative vise à :

* Inclure tous les tags de log dans vos archives (activé par défaut sur toutes les nouvelles archives). **Remarque** : ce paramètre augmente la taille des archives générées.
* Ajouter des tags à vos logs réintégrés, conformément à vos requêtes de restriction. Voir l'autorisation [`logs_read_data`][11].

{{< img src="logs/archives/tags_in_out.png" alt="Configurer les tags d'archive" style="width:75%;">}}

#### Définir la taille maximale des analyses

Cette étape de configuration facultative vous permet de définir le volume maximal de données de log (en Go) à analyser pour la réintégration de vos archives de logs.

Lorsqu'une taille d'analyse maximale est définie, tous les utilisateurs doivent estimer la taille de l'analyse avant de pouvoir initier un processus de réintégration. Si la taille estimée de l'analyse dépasse la limite d'une archive, les utilisateurs doivent restreindre l'intervalle de réintégration, ce qui a pour effet de réduire la taille de l'analyse et d'initier la réintégration.

{{< img src="logs/archives/max_scan_size.png" alt="Définir la taille maximale d'analyse pour une archive" style="width:75%;">}}

{{< site-region region="us3" >}}
#### Règles de pare-feu

{{< tabs >}}
{{% tab "Stockage Azure" %}}

Les règles de pare-feu ne sont pas prises en charge.

{{% /tab %}}
{{< /tabs >}}

{{< /site-region >}}
#### Classe de stockage

{{< tabs >}}
{{% tab "AWS S3" %}}

Vous pouvez [définir une configuration de cycle de vie sur votre compartiment S3][1] pour transférer automatiquement vos archives de logs vers les classes de stockage optimales.

La fonctionnalité de [réintégration][2] de logs prend uniquement en charge les classes de stockage suivantes :

* S3 Standard
* S3 Standard-IA
* S3 One Zone-IA
* S3 Glacier Instant Retrieval

Si vous souhaitez réintégrer des logs à partir d'archives dans une autre classe de stockage, vous devez au préalable les déplacer vers l'une des classes de stockage prises en charge, comme indiqué ci-dessus.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/how-to-set-lifecycle-configuration-intro.html
[2]: /fr/logs/archives/rehydrating/
{{% /tab %}}
{{% tab "Stockage Azure" %}}

Les fonctionnalités d'archivage et de [réintégration][1] de logs prennent uniquement en charge les niveaux d'accès suivants :

- Hot
- Cool

Si vous souhaitez réintégrer des logs à partir d'archives dans un niveau d'accès, vous devez au préalable les déplacer vers l'un des niveaux d'accès pris en charge, comme indiqué ci-dessus.

[1]: /fr/logs/archives/rehydrating/
{{% /tab %}}
{{< /tabs >}}

#### Chiffrement côté serveur (SSE)

{{< tabs >}}
{{% tab "AWS S3" %}}

##### SSE-S3

Par défaut, les compartiments Amazon S3 sont chiffrés côté serveur avec des clés de gestion Amazon S3 ([SSE-S3][1]).

Pour vérifier si votre compartiment S3 est chiffré de cette manière, procédez comme suit :

1. Accédez à votre compartiment S3.
1. Cliquez sur l'onglet **Properties**.
1. Depuis la section **Default Encryption**, vérifiez que l'option **Encryption key type** est définie sur **Amazon S3 managed keys (SSE-S3)**.

##### SSE-KMS

Datadog prend également en charge le chiffrement côté serveur à l'aide d'une clé CMK [AWS KMS][2]. Pour l'activer, suivez les étapes ci-dessous :

1. Créez votre CMK.
2. Associez une stratégie CMK à votre CMK avec le contenu suivant, en remplaçant le numéro de compte AWS et le nom de rôle IAM Datadog de façon appropriée :

```
{
    "Id": "key-consolepolicy-3",
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Enable IAM User Permissions",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<NUMÉRO_COMPTE_AWS>:root"
            },
            "Action": "kms:*",
            "Resource": "*"
        },
        {
            "Sid": "Allow use of the key",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<NUMÉRO_COMPTE_AWS>:role/<NOM_RÔLE_IAM_DATADOG>"
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
                "AWS": "arn:aws:iam::<NUMÉRO_COMPTE_AWS>:role/<NOM_RÔLE_IAM_DATADOG>"
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

3. Accédez à l'onglet **Properties** dans votre compartiment S3 et sélectionnez **Default Encryption**. Choisissez l'option "AWS-KMS", sélectionnez l'ARN de votre CMK et cliquez sur Save.

Si vous souhaitez apporter des modifications à des clés KSM existantes, contactez l'[assistance Datadog][3] afin d'obtenir de l'aide.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-bucket-encryption.html
[2]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html
[3]: /fr/help/
{{% /tab %}}

{{< /tabs >}}

### Validation

Dès que vos paramètres d'archivage ont été correctement configurés sur votre compte Datadog, vos pipelines de traitement commencent à enrichir tous les logs ingérés par Datadog. Ceux-ci sont ensuite transmis à votre archive.

Une fois vos paramètres d'archivage créés ou modifiés, il est parfois nécessaire d'attendre quelques minutes avant la prochaine tentative d'importation des archives. La fréquence d'importation des archives peut varier. Par conséquent, **attendez 15 minutes** avant de vérifier que les archives sont bien importées vers votre compartiment de stockage depuis votre compte Datadog.

Si l'archivage est toujours en attente passé ce délai, vérifiez vos filtres d'inclusion pour vous assurer que la requête est valide et qu'elle renvoie les événements de log dans la vue [Live Tail][12]. Lorsque Datadog ne parvient à importer des logs vers une archive externe, en raison d'un changement involontaire des paramètres ou autorisations, l'archive de logs correspondante est mise en avant sur la page de configuration.

{{< img src="logs/archives/archive_errors_details.png" alt="Vérifier que vos archives sont correctement configurées" style="width:100%;">}}

Passez votre curseur sur l'archive pour afficher les détails de l'erreur, ainsi que les opérations à effectuer pour résoudre le problème. Un événement est également généré dans l'[Events Explorer][13]. Vous pouvez créer un monitor pour ces événements, afin de détecter et de corriger rapidement ces échecs.

## Configurer plusieurs archives

Si vous avez défini plusieurs archives, les logs intègrent la première archive, en fonction du filtre appliqué.

{{< img src="logs/archives/log_forwarding_archives_multiple.png" alt="Les logs sont envoyés dans la première archive filtrée à laquelle ils correspondent." style="width:100%;">}}

Il est important de définir minutieusement l'ordre de vos archives. Par exemple, si vous créez une première archive filtrée sur le tag `env:prod` et une deuxième archive sans filtre (l'équivalent de `*`), tous vos logs de production seront envoyés dans le premier chemin/compartiment de stockage et tout le reste ira dans l'autre.

## Format des archives

Les archives de logs que Datadog transmet à votre compartiment de stockage sont au format JSON compressé (`.json.gz`). Les archives sont stockées avec le préfixe que vous avez indiqué (ou dans `/` si aucun préfixe n'a été défini), selon une structure de répertoire qui indique à quelle date et à quelle heure les fichiers d'archives ont été générés. La structure est la suivante :

```
/mon/compartiment/préfixe/dt=20180515/hour=14/archive_143201.1234.7dq1a9mnSya3bFotoErfxl.json.gz
/mon/compartiment/préfixe/dt=<AAAAMMJJ>/hour=<HH>/archive_<HHmmss.SSSS>.<ID_DATADOG>.json.gz
```

Cette structure de répertoire vous permet d'interroger plus facilement vos archives de logs en fonction de leur date.

À l'intérieur du fichier JSON compressé, le contenu de chaque événement est formaté comme suit :

```json
{
    "_id": "123456789abcdefg",
    "date": "2018-05-15T14:31:16.003Z",
    "host": "i-12345abced6789efg",
    "source": "source_name",
    "service": "service_name",
    "status": "status_level",
    "message": "2018-05-15T14:31:16.003Z INFO rid='acb-123' status=403 method=PUT",
    "attributes": { "rid": "abc-123", "http": { "status_code": 403, "method": "PUT" } },
    "tags": [ "env:prod", "team:acme" ]
}
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: /fr/logs/indexes/#exclusion-filters
[2]: /fr/logs/archives/rehydrating/
[3]: /fr/account_management/rbac/permissions/?tab=ui#logs_write_archives
[4]: https://ip-ranges.datadoghq.com/
[5]: https://app.datadoghq.com/logs/pipelines/archives
[6]: /fr/integrations/azure/
[7]: /fr/account_management/rbac/permissions#logs_write_archives
[8]: /fr/account_management/rbac/permissions#logs_read_archives
[9]: /fr/account_management/rbac/permissions#logs_write_historical_view
[10]: /fr/account_management/rbac/permissions#logs_read_index_data
[11]: /fr/account_management/rbac/permissions#logs_read_data
[12]: /fr/logs/explorer/live_tail/
[13]: /fr/service_management/events/explorer/
[14]: https://app.datadoghq.com/logs/pipelines/log-forwarding