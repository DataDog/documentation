---
title: Archives de Logs
kind: documentation
description: Transférez tous vos logs ingérés pour les conserver à long terme.
aliases:
  - /fr/logs/s3/
  - /fr/logs/gcs/
  - /fr/logs/archives/s3/
  - /fr/logs/archives/gcs/
  - /fr/logs/archives/gcp/
further_reading:
  - link: /logs/explorer/
    tag: Documentation
    text: Log Explorer
  - link: /logs/logging_without_limits/
    tag: Documentation
    text: Logging without Limits*
---
## Présentation

Configurez votre compte Datadog de manière à transférer tous les logs ingérés, qu'ils soient [indexés][1] ou non, vers votre système de stockage dans le cloud. Conservez vos logs dans une solution d'archivage à long terme afin d'assurer leur conformité et leur auditabilité en cas d'incident grâce à la fonction [Rehydration][2].

{{< img src="logs/archives/log_archives_s3_multiple.png" alt="Vue de la page Archive" style="width:75%;">}}

Ce guide décrit la marche à suivre pour configurer une archive afin de transférer les logs ingérés vers un compartiment de votre solution de stockage dans le cloud :

1. Configurer une [intégration](#configurer-une-integration) Datadog pour votre fournisseur de services cloud (si vous ne l'avez pas déjà fait)
2. Créer un [compartiment de stockage](#creer-un-compartiment-de-stockage)
3. Définir les [autorisations](#definir-les-autorisations) de lecture et/ou d'écriture sur cette archive
4. [Transmettre vos logs](#transmettre-vos-logs-vers-un-compartiment) vers et depuis cette archive
5. Configurer les [paramètres avancés](#parametres-avances) comme le chiffrement, la classe de stockage et les tags
6. [Valider](#validation) votre configuration en recherchant d'éventuels problèmes de configuration que Datadog peut détecter pour vous

**Remarque** : seuls les utilisateurs de Datadog bénéficiant de l'[autorisation Logs Write Archive][3] peuvent créer, modifier ou supprimer des configurations d'archivage de logs.

## Configurer une archive

### Configurer une intégration

{{< tabs >}}
{{% tab "AWS S3" %}}

Si ce n'est pas déjà fait, configurez l'[intégration AWS][1] pour le compte AWS associé à votre compartiment S3. 

* En général, il est nécessaire de créer un rôle pouvant être utilisé par Datadog pour l'intégration à AWS S3.
* Pour les comptes AWS GovCloud ou China uniquement, utilisez les clés d'accès comme alternative à la délégation de rôles.

[1]: /fr/integrations/amazon_web_services/?tab=automaticcloudformation#setup
{{% /tab %}}
{{% tab "Stockage Azure" %}}

Si vous ne l'avez pas encore fait, configurez l'[intégration Azure][1] pour l'abonnement associé à votre compte de stockage. Vous devrez [créer une inscription d'application utilisable par Datadog][2] afin de procéder à l'intégration.

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /fr/integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

Si vous ne l'avez pas encore fait, configurez l'[intégration GCP][1] pour le projet qui comporte votre compartiment de stockage GCS. Vous devrez [créer un compte de service GCS utilisable par Datadog][2] afin de procéder à l'intégration.

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: /fr/integrations/google_cloud_platform/?tab=datadogussite#setup
{{% /tab %}}
{{< /tabs >}}

### Créer un compartiment de stockage

{{< tabs >}}
{{% tab "AWS S3" %}}

Accédez à votre [console AWS][1] et [créez un compartiment S3][2] vers lequel vos archives seront envoyées. Assurez-vous que votre compartiment n'est pas accessible au public.

[1]: https://s3.console.aws.amazon.com/s3
[2]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html
{{% /tab %}}

{{% tab "Stockage Azure" %}}

Accédez à votre [portail Azure][1] et [créez un compte de stockage][2] vers lequel vous souhaitez envoyer vos archives. Attribuez un nom à votre compte, choisissez n'importe quel type de compte, puis sélectionnez le niveau d'accès **hot**.

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
[2]: https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

Accédez à votre [compte GCP][1] et [créez un compartiment GCS][2] vers lequel vos archives seront envoyées. Sous « Choose how to control access to objects », sélectionnez « Set object-level and bucket-level permissions ».

[1]: https://console.cloud.google.com/storage
[2]: https://cloud.google.com/storage/docs/quickstart-console
{{% /tab %}}
{{< /tabs >}}

### Définir les autorisations

{{< tabs >}}
{{% tab "AWS S3" %}}

Ajoutez les deux instructions d'autorisation suivantes aux stratégies IAM. Modifiez les noms de compartiment et, si vous le souhaitez, indiquez les chemins vers vos archives de logs.

*Remarques* :

* Les autorisations `GetObject` et `ListBucket` permettent la [réintégration des logs à partir des archives][1].
* L'autorisation `PutObject` est suffisante pour l'importation d'archives.


```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DatadogUploadAndRehydrateLogArchives",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject"],
      "Resource": [
        "arn:aws:s3:::<NOM_DU_BUCKET_1_/_CHEMIN_FACULTATIF_DU_BUCKET_1>/*",
        "arn:aws:s3:::<NOM_DU_BUCKET_2_/_CHEMIN_FACULTATIF_DU_BUCKET_2>/*"
      ]
    },
    {
      "Sid": "DatadogRehydrateLogArchivesListBucket",
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": [
        "arn:aws:s3:::<NOM_DU_BUCKET_1>",
        "arn:aws:s3:::<NOM_DU_BUCKET_2>"
      ]
    }
  ]
}
```


[1]: /fr/logs/archives/rehydrating/
{{% /tab %}}
{{% tab "Stockage Azure" %}}

* Accordez à votre application Datadog les autorisations nécessaires pour écrire dans votre compte de stockage et effectuer une réintégration à partir de celui-ci.
* Sélectionnez votre compte de stockage depuis la [page Storage Accounts][1], accédez à **Access Control (IAM)** et sélectionnez **Add -> Add Role Assignment**.
* Ajoutez le rôle **Storage Blob Data Contributor**, sélectionnez l'application Datadog que vous avez créée pour l'intégration Azure, puis enregistrez.

{{< img src="logs/archives/logs_azure_archive_permissions.png" alt="Ajouter le rôle Storage Blob Data Contributor à votre application Datadog." style="width:75%;">}}

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

Accordez à votre compte de service GCP Datadog les autorisations nécessaires pour écrire vos archives dans votre compartiment.

* Si vous créez un compte de service, gérez ces autorisations depuis la [page GCP Credentials][1].
* Si vous modifiez un compte de service existant, accédez plutôt à la [page GCP IAM Admin][2]).

Ajoutez les rôles **Storage Object Creator** (pour la création d'archives) et **Storage Object Viewer** (pour la réintégration depuis des archives) sous **Storage**.

  {{< img src="logs/archives/gcp_role_storage_object_creator.png" alt="Ajouter le rôle Storage Object Creator à votre compte de service GCP Datadog" style="width:75%;">}}


[1]: https://console.cloud.google.com/apis/credentials
[2]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

### Transmettre vos logs vers un compartiment

Accédez à la [page Archives][4] dans Datadog et sélectionnez l'option **Add a new archive** en bas de la page.

Seuls les utilisateurs de Datadog bénéficiant de l'[autorisation Logs Write Archive][3] peuvent effectuer cette étape ainsi que la suivante.

{{< tabs >}}
{{% tab "AWS S3" %}}

Sélectionnez le compte AWS et le rôle appropriés pour votre compartiment S3.

Indiquez le nom de votre compartiment. **Facultatif** : ajoutez un répertoire comme préfixe vers lequel l'ensemble de vos archives de logs sera envoyé.

{{< img src="logs/archives/logs_archive_aws_setup.png" alt="Définir les données de votre compartiment S3 dans Datadog"  style="width:75%;">}}

{{% /tab %}}
{{% tab "Stockage Azure" %}}

Sélectionnez le type d'archive **Azure Storage**, ainsi que le locataire et le client Azure pour l'application Datadog disposant du rôle Storage Blob Data Contributor sur votre compte de stockage.

Indiquez le nom de votre compte de stockage et un nom de conteneur pour votre archive. **Facultatif** : ajoutez un répertoire comme préfixe vers lequel l'ensemble de vos archives de logs sera envoyé.

{{< img src="logs/archives/logs_archive_azure_setup.png" alt="Définir les données de votre compte de stockage Azure dans Datadog"  style="width:75%;">}}


{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

Sélectionnez le type d'archive **GCS**, puis le compte de service GCS doté des autorisations d'écriture dans votre compte de stockage.

Indiquez le nom de votre compartiment. **Facultatif** : ajoutez un répertoire comme préfixe vers lequel l'ensemble de vos archives de logs sera envoyé.

{{< img src="logs/archives/logs_archive_gcp_setup.png" alt="Définir les données de votre compte de stockage Azure dans Datadog"  style="width:75%;">}}

{{% /tab %}}
{{< /tabs >}}

### Paramètres avancés

#### Autorisations Datadog

Par défaut :

* Tous les utilisateurs admin Datadog peuvent créer, modifier et réorganiser des archives (voir la section [Configurer plusieurs archives](#configurer-plusieurs-archives)
* Tous les utilisateurs admin et standard Datadog peuvent réintégrer des logs à partir des archives
* Tous les utilisateurs, y compris les utilisateurs read-only Datadog, peuvent accéder aux logs réintégrés

Appliquez cette étape de configuration facultative pour attribuer des rôles sur cette archive et restreindre les utilisateurs qui peuvent effectuer les opérations suivantes :

* Modifier la configuration de cette archive. Voir l'autorisation [logs_write_archive][5].
* Réintégrer des logs à partir de cette archive. Voir les autorisations [logs_read_archives][6] et [logs_write_historical_view][7].
* Accéder aux logs réintégrés si vous utilisez l'ancienne [autorisation Read Index Data][8].

{{< img src="logs/archives/archive_restriction.png" alt="Restreindre l'accès aux archives et aux logs réintégrés"  style="width:75%;">}}

#### Tags Datadog

Utilisez cette étape de configuration facultative pour :

* Inclure tous les tags de log dans vos archives (activé par défaut sur toutes les nouvelles archives). **Remarque** : ce paramètre augmente la taille des archives générées.
* Ajouter des tags à vos logs réintégrés, conformément à vos requêtes de restriction. Voir l'autorisation [logs_read_data][9].

{{< img src="logs/archives/tags_in_out.png" alt="Configurer les tags d'archive"  style="width:75%;">}}

#### Classe de stockage

{{< tabs >}}
{{% tab "AWS S3" %}}

Vous pouvez [définir une configuration de cycle de vie sur votre compartiment S3][1] pour transférer automatiquement vos archives de logs vers les classes de stockage optimales.

La fonction [Rehydration][2] prend en charge toutes les classes de stockage à l'exception de Glacier et de Glacier Deep Archive. Si vous souhaitez réintégrer des logs depuis des archives stockées dans les classes de stockage Glacier ou Glacier Deep Archive, vous devez d'abord le transférer vers une autre classe de stockage.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/how-to-set-lifecycle-configuration-intro.html
[2]: /fr/logs/archives/rehydrating/
{{% /tab %}}

{{< /tabs >}}

#### Chiffrement côté serveur (SSE)

{{< tabs >}}
{{% tab "AWS S3" %}}

##### SSE-S3

La méthode la plus simple pour ajouter le chiffrement côté serveur à vos archives de logs S3 consiste à utiliser le chiffrement natif côté serveur d'Amazon S3, [SSE-S3][1].

Pour l'activer, accédez à l'onglet **Properties** dans votre compartiment S3 et sélectionnez **Default Encryption**. Sélectionnez l'option `AES-256`, puis cliquez sur **Save**.

{{< img src="logs/archives/log_archives_s3_encryption.png" alt="Sélectionnez l'option AES-256 et cliquez sur Save." style="width:75%;">}}

##### SSE-KMS

Datadog prend également en charge le chiffrement côté serveur à l'aide d'un CMK d'[AWS KMS][2]. Pour l'activer, suivez les étapes ci-dessous :

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


[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingServerSideEncryption.html
[2]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html
{{% /tab %}}

{{< /tabs >}}

### Validation

Dès que vos paramètres d'archivage ont été correctement configurés sur votre compte Datadog, vos pipelines de traitement commencent à enrichir tous les logs ingérés par Datadog. Ceux-ci sont ensuite transmis à votre archive.

Une fois vos paramètres d'archivage créés ou modifiés, il est parfois nécessaire d'attendre quelques minutes avant la prochaine tentative d'importation des archives. Les logs sont importés vers les archives toutes les 15 minutes. Par conséquent **attendez au moins 15 minutes** avant de vérifier que les archives sont bien importées vers votre compartiment de stockage depuis votre compte Datadog. Si l'archive est toujours en attente passé ce délai, nous vous conseillons de vérifier vos filtres d'inclusion pour vous assurer que la requête est valide et renvoie les événements de logs dans [Live Tail][10]. 

Si Datadog détecte un problème de configuration, l'archive correspondante est mise en évidence dans la page de configuration. Cliquez sur l'icône d'erreur pour voir les mesures que vous devez prendre pour corriger ce problème.

{{< img src="logs/archives/archive_validation.png" alt="Vérifier que vos archives sont correctement configurées"  style="width:75%;">}}

## Configurer plusieurs archives

Si plusieurs archives sont définies, les logs sont envoyés dans la première archive filtrée à laquelle ils correspondent. Il est donc important d'organiser minutieusement vos archives.

Par exemple, si vous créez une première archive filtrée sur le tag `env:prod` et une deuxième archive sans filtre (l'équivalent de `*`), tous vos logs de production seront envoyés dans le premier chemin/compartiment de stockage et tout le reste ira dans l'autre.

{{< img src="logs/archives/log_archives_s3_multiple.png" alt="Les logs sont envoyés dans la première archive filtrée à laquelle ils correspondent." style="width:75%;">}}

## Format des archives

Les archives de logs que Datadog transmet à votre compartiment de stockage sont au format JSON compressé (`.json.gz`). Les archives sont stockées sous le préfixe que vous avez indiqué (ou dans `/` si aucun préfixe n'a été défini) selon une structure de répertoire qui indique à quelle date et à quelle heure les fichiers d'archives ont été générés. La structure est la suivante :

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

**Remarque** : l'ajout de tags dans les archives est une fonctionnalité que vous devez activer. Pour l'activer pour une archive, consultez la section [Tags Datadog](#tags-datadog).

## Pour aller plus loin

{{< whatsnext desc="Découvrez ensuite comment accéder au contenu de vos logs archivés depuis Datadog :" >}}
    {{< nextlink href="/logs/archives/rehydrating" >}}<u>Réintégration à partir des archives</u> : transférez des événements de logs depuis vos archives vers le Log Explorer de Datadog.{{< /nextlink >}}
{{< /whatsnext >}}

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: /fr/logs/indexes/#exclusion-filters
[2]: /fr/logs/archives/rehydrating/
[3]: /fr/account_management/rbac/permissions/?tab=ui#logs_write_archives
[4]: https://app.datadoghq.com/logs/pipelines/archives
[5]: /fr/account_management/rbac/permissions#logs_write_archives
[6]: /fr/account_management/rbac/permissions#logs_read_archives
[7]: /fr/account_management/rbac/permissions#logs_write_historical_view
[8]: /fr/account_management/rbac/permissions#logs_read_index_data
[9]: /fr/account_management/rbac/permissions#logs_read_data
[10]: /fr/logs/explorer/live_tail/