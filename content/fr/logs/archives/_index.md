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
## Archives

Configurez votre compte Datadog de manière à transférer tous les logs ingérés vers votre système de stockage dans le cloud. Le stockage de vos logs dans une solution d'archivage à long terme vous permet de respecter vos exigences en matière de conformité et de garantir leur auditabilité de façon économique en cas d'incident. Une fois vos logs archivés pour le long terme, [vous pouvez y accéder][1] si vous devez enquêter sur une situation inattendue ou ayant pu se produire dans un passé lointain.

Ce guide décrit la marche à suivre pour configurer une archive afin de transférer les logs ingérés vers un compartiment de votre solution de stockage dans le cloud.

**Remarque** : seuls les utilisateurs de Datadog bénéficiant des droits administrateur peuvent créer, modifier ou supprimer des configurations d'archivage de logs.

{{< img src="logs/archives/log_archives_s3_multiple.png" alt="Affichage de la page Archive" style="width:75%;">}}

## Créer et configurer un compartiment de stockage

{{< tabs >}}
{{% tab "AWS S3" %}}


### Créer un compartiment S3

Accédez à votre [console AWS][1] et [créez un compartiment S3][2] vers lequel vos archives seront envoyées. Assurez-vous que votre compartiment n'est pas accessible au public.

#### Classe de stockage

Vous pouvez [définir une configuration de cycle de vie sur votre compartiment S3][3] pour transférer automatiquement vos archives de logs vers les classes de stockage optimales.

La fonction [Rehydration][4] prend en charge toutes les classes de stockage à l'exception de Glacier et de Glacier Deep Archive. Si vous souhaitez réintégrer des logs depuis des archives stockées dans les classes de stockage Glacier ou Glacier Deep Archive, vous devez d'abord le transférer vers une autre classe de stockage.

#### Chiffrement côté serveur (SSE)

##### SSE-S3

La méthode la plus simple pour ajouter le chiffrement côté serveur (SSE) à vos archives de logs S3 consiste à utiliser le chiffrement natif côté serveur d'Amazon S3, [SSE-S3][5]. 
Pour l'activer, accédez à l'onglet **Properties** dans votre compartiment S3 et sélectionnez **Default Encryption**. Sélectionnez l'option `AES-256`, puis cliquez sur **Save**.

{{< img src="logs/archives/log_archives_s3_encryption.png" alt="Sélectionnez l'option AES-256 et cliquez sur Save." style="width:75%;">}}

##### SSE-KMS

Datadog prend également en charge le chiffrement côté serveur à l'aide d'un CMK d'[AWS KMS][6]. Pour l'activer, suivez les étapes ci-dessous :

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

### Configurer une archive de logs

#### Définir l'intégration AWS

Si ce n'est pas déjà fait, configurez l'[intégration AWS][7] pour le compte AWS associé à votre compartiment S3. 

* En général, il est nécessaire de créer un rôle pouvant être utilisé par Datadog pour l'intégration à AWS S3.
* Pour les comptes AWS GovCloud ou China uniquement, utilisez les clés d'accès comme alternative à la délégation de rôles.

#### Créer une archive

Accédez à la [page Archives][8] de Datadog et sélectionnez l'option **Add a new archive** en bas de la page. Seuls les utilisateurs de Datadog bénéficiant des droits d'administrateur peuvent effectuer cette étape ainsi que la suivante.

Sélectionnez le compte AWS et le rôle appropriés pour votre compartiment S3, puis saisissez le nom de votre compartiment. Vous avez la possibilité d'ajouter un répertoire comme préfixe vers lequel l'ensemble de vos archives de logs seront envoyées. Il ne vous reste ensuite plus qu'à enregistrer votre archive.

  {{< img src="logs/archives/log_archives_s3_datadog_settings_role_delegation.png" alt="Définir les informations de votre compartiment S3 dans Datadog"  style="width:75%;">}}

### Définir les autorisations

Ajoutez les deux instructions d'autorisation suivantes aux stratégies IAM. Modifiez les noms de compartiment et, si vous le souhaitez, indiquez les chemins vers vos archives de logs. Les autorisations `GetObject` et `ListBucket` permettent la [réintégration des logs à partir des archives][4]. L'autorisation `PutObject` est suffisante pour l'importation d'archives.

    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "DatadogUploadAndRehydrateLogArchives",
          "Effect": "Allow",
          "Action": ["s3:PutObject", "s3:GetObject"],
          "Resource": [
            "arn:aws:s3:::<NOM_COMPARTIMENT_1_/_CHEMIN_FACULTATIF_COMPARTIMENT_1>/*",
            "arn:aws:s3:::<NOM_COMPARTIMENT_2_/_CHEMIN_FACULTATIF_COMPARTIMENT_2>/*"
          ]
        },
        {
          "Sid": "DatadogRehydrateLogArchivesListBucket",
          "Effect": "Allow",
          "Action": "s3:ListBucket",
          "Resource": [
            "arn:aws:s3:::<NOM_COMPARTIMENT_1>",
            "arn:aws:s3:::<NOM_COMPARTIMENT_2>"
          ]
        }
      ]
    }
    ```


[1]: https://s3.console.aws.amazon.com/s3
[2]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html
[3]: https://docs.aws.amazon.com/AmazonS3/latest/dev/how-to-set-lifecycle-configuration-intro.html
[4]: /fr/logs/archives/rehydrating/
[5]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingServerSideEncryption.html
[6]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html
[7]: integrations/amazon_web_services/?tab=automaticcloudformation#setup
[8]: https://app.datadoghq.com/logs/pipelines/archives
{{% /tab %}}

{{% tab "Stockage Azure" %}}

1. Accédez à votre [portail Azure][1] et [créez un compte de stockage][2] vers lequel vous souhaitez envoyer vos archives. Attribuez un nom à votre compte, choisissez n'importe quel type de compte, puis sélectionnez le niveau d'accès **hot**.
2. Si vous ne l'avez pas encore fait, configurez l'[intégration Azure][3] pour l'abonnement de votre compte de stockage. Vous devrez [créer une inscription d'application utilisable par Datadog][4] afin de procéder à l'intégration.
3. Accordez ensuite à votre application Datadog les autorisations suffisantes pour écrire dans votre compte de stockage et le réintégrer. Sélectionnez votre compte de stockage depuis la [page Storage Accounts][1], accédez à **Access Control (IAM)** et sélectionnez **Add -> Add Role Assignment**. Saisissez le rôle **Storage Blob Data Contributor**, sélectionnez l'app Datadog que vous avez créée pour l'intégration Azure, puis enregistrez.
  {{< img src="logs/archives/logs_azure_archive_permissions.png" alt="Ajoutez le rôle Storage Blob Data Contributor à votre application Datadog." style="width:75%;">}}
4. Accédez à la [page Archives dans Datadog][5], puis sélectionnez l'option **Add a new archive** en bas de la page. Seuls les utilisateurs de Datadog bénéficiant des droits administrateur peuvent effectuer cette étape ainsi que la suivante.
5. Sélectionnez le type d'archive **Azure Storage**, ainsi que le locataire et le client pour l'app Datadog disposant du rôle Storage Blob Data Contributor sur votre compte de stockage. Indiquez le nom de votre compte de stockage et un nom de conteneur pour votre archive.
6. **Facultatif** : indiquez un répertoire comme préfixe vers lequel l'ensemble de vos archives de log seront envoyées.
7. Enregistrez votre archive.

  {{< img src="logs/archives/logs_azure_archive_configs.png" alt="Définir les données de votre compte de stockage Azure dans Datadog"  style="width:75%;">}}

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
[2]: https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[3]: https://app.datadoghq.com/account/settings#integrations/azure
[4]: /fr/integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
[5]: https://app.datadoghq.com/logs/pipelines/archives
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

1. Accédez à votre [compte GCP][1] et [créez un compartiment GCS][2] vers lequel vos archives seront envoyées. Sous « Choose how to control access to objects », sélectionnez « Set object-level and bucket-level permissions ».
2. Si vous ne l'avez pas encore fait, configurez l'[intégration GCP][3] pour le projet qui comporte votre compartiment de stockage GCS. Vous devrez [créer un compte de service GCS utilisable par Datadog][4] afin d'intégrer ce dernier.
3. Accordez ensuite à votre compte de service GCP Datadog les autorisations nécessaires pour écrire vos archives dans votre compartiment. Si vous créez un compte de service, gérez ces autorisations depuis la [page GCP Credentials][5]. Si vous modifiez un compte de service existant, accédez plutôt à la [page GCP IAM Admin][6]. Ajoutez les rôles **Storage Object Creator** (pour la création d'archives) **Storage Object Viewer** (pour la réintégration depuis les archives) sous **Storage**.
  {{< img src="logs/archives/gcp_role_storage_object_creator.png" alt="Ajouter le rôle Storage Object Creator à votre compte de service GCP Datadog" style="width:75%;">}}
4. Accédez à la [page Archives][7] dans Datadog et sélectionnez l'option **Add a new archive** en bas de la page. Seuls les utilisateurs de Datadog bénéficiant des droits d'administrateur peuvent effectuer cette étape ainsi que la suivante.
5. Sélectionnez le type d'archive GCS, puis le compte de service GCS doté des autorisations d'écriture dans votre compartiment de stockage. Saisissez le nom de votre compartiment. Vous avez la possibilité d'ajouter un répertoire comme préfixe vers lequel l'ensemble de vos archives de logs seront envoyées. Enregistrez ensuite votre archive.

  {{< img src="logs/archives/archive_select_gcs.png" alt="Définir les données de votre compartiment GCP dans Datadog"  style="width:75%;">}}

[1]: https://console.cloud.google.com/storage
[2]: https://cloud.google.com/storage/docs/quickstart-console
[3]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[4]: /fr/integrations/google_cloud_platform/?tab=datadogussite#setup
[5]: https://console.cloud.google.com/apis/credentials
[6]: https://console.cloud.google.com/iam-admin/iam
[7]: https://app.datadoghq.com/logs/pipelines/archives
{{% /tab %}}
{{< /tabs >}}

## Validation

Dès que vos paramètres d'archivage ont été correctement configurés sur votre compte Datadog, vos pipelines de traitement commencent à enrichir tous les logs ingérés par Datadog. Ceux-ci sont ensuite transmis à votre archive.

Une fois vos paramètres d'archivage créés ou modifiés, il est parfois nécessaire d'attendre quelques minutes avant la prochaine tentative d'importation des archives. Les logs sont importés vers l'archive toutes les 15 minutes. Par conséquent, **attendez jusqu'à 15 minutes** avant de vérifier que les archives sont bien importées vers votre compartiment de stockage depuis votre compte Datadog.

## Format des archives

Les archives de logs que Datadog transmet à votre compartiment de stockage sont au format JSON compressé (`.json.gz`). Les archives sont stockées sous le préfixe que vous avez indiqué (ou dans `/` si aucun préfixe n'a été défini) selon une structure de répertoire qui indique à quelle date et à quelle heure les fichiers d'archives ont été générés. La structure est la suivante :

```
/mon/compartiment/préfixe/dt=20180515/hour=14/archive_143201.1234.7dq1a9mnSya3bFotoErfxl.json.gz
/mon/compartiment/préfixe/dt=<AAAAMMJJ>/hour=<HH>/archive_<HHmmss.SSSS>.<ID_DATADOG>.json.gz
```

Cette structure de répertoire vous permet d'interroger plus facilement vos archives de logs en fonction de leur date.

À l'intérieur du fichier JSON compressé, le contenu de chaque événement est formaté comme suit :

```text
{
    "_id": "123456789abcdefg",
    "date": "2018-05-15T14:31:16.003Z",
    "host": "i-12345abced6789efg",
    "source": "nom_source",
    "service": "nom_service",
    "status": "niveau_statut",
    "message": " ... contenu du message du log ... ",
    "attributes": { ... contenu des attributs du log ... }
}
```

**Remarque** : les archives incluent uniquement le contenu des logs, qui comprend le message, les attributs personnalisés et les attributs réservés de vos événements de log. Les tags des logs (métadonnées qui connectent vos données de log aux traces et aux métriques liées) ne sont pas inclus.

## Archives multiples

Les administrateurs peuvent transmettre des logs spécifiques vers une archive en ajoutant une requête dans le champ « filter » de l'archive. Les logs sont envoyés dans la première archive filtrée à laquelle ils correspondent. Il est donc important d'organiser minutieusement vos archives.

Par exemple, si vous créez une première archive filtrée sur le tag `env:prod` et une deuxième archive sans filtre (l'équivalent de `*`), tous vos logs de production seront envoyés dans le premier chemin/compartiment de stockage et tout le reste ira dans l'autre.

Les logs sont envoyés dans la première archive filtrée à laquelle ils correspondent.

{{< img src="logs/archives/log_archives_s3_multiple.png" alt="Les logs sont envoyés dans la première archive filtrée à laquelle ils correspondent." style="width:75%;">}}

{{< whatsnext desc="Découvrez ensuite comment accéder au contenu de vos logs archivés depuis Datadog :" >}}
    {{< nextlink href="/logs/archives/rehydrating" >}}<u>Réintégration à partir des archives</u> : transférez des événements de logs depuis vos archives vers le Log Explorer de Datadog.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: /fr/logs/archives/rehydrating/