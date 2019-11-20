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
  - link: logs/explorer
    tag: Documentation
    text: Log Explorer
  - link: logs/logging_without_limits
    tag: Documentation
    text: Logging without Limits*
---
## Archives

Configurez votre compte Datadog de manière à transférer tous les logs ingérés vers votre système de stockage dans le cloud. Le stockage de vos logs dans une solution d'archivage à long terme vous permet de respecter vos exigences en matière de conformité et de garantir leur auditabilité de façon économique en cas d'incident. Une fois vos logs archivés pour le long terme, [vous pouvez y accéder][1] si vous devez enquêter sur une situation inattendue ou ayant pu se produire dans un passé lointain.

Ce guide décrit la marche à suivre pour archiver les logs que vous avez recueillis vers votre compartiment de stockage dans le cloud.

**Remarque** : seuls les utilisateurs de Datadog bénéficiant des droits administrateur peuvent créer, modifier ou supprimer des configurations d'archivage de logs.

{{< img src="logs/archives/log_archives_s3_multiple.png" alt="Affichage de la page Archive" responsive="true" style="width:75%;">}}

## Créer et configurer un compartiment de stockage

{{< tabs >}}
{{% tab "AWS S3" %}}

Accédez à votre [console AWS][1] et [créez un compartiment S3][2] vers lequel vos archives seront envoyées. Assurez-vous que votre compartiment n'est pas accessible au public.

Autorisez ensuite Datadog à écrire des archives de logs dans votre compartiment S3. Si vous utilisez le site américain, faites appel à la délégation de rôles ; si vous utilisez le site européen, configurez une stratégie de compartiment.

1. Configurez l'[intégration AWS][3] pour le compte AWS qui comporte votre compartiment S3. Vous devrez [créer un rôle][4] pouvant être utilisé par Datadog pour l'intégration à AWS Cloudwatch.

2. Ajoutez les deux instructions d'autorisation suivantes aux [stratégies IAM de votre rôle Datadog][5]. Modifiez les noms de compartiment et, si vous le souhaitez, indiquez les chemins vers vos archives de logs. Les autorisations `GetObject` et `ListBucket` permettent la [réintégration des logs à partir des archives][6]. L'autorisation `PutObject` est suffisante pour l'importation d'archives.


    ```
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "DatadogUploadAndRehydrateLogArchives",
                "Effect": "Allow",
                "Action": [
                    "s3:PutObject",
                    "s3:GetObject"
                ],
                "Resource": [
                    "arn:aws:s3:::<NOM_COMPARTIMENT_1/_CHEMIN_FACULTATIF_COMPARTIMENT_1>/*",
                    "arn:aws:s3:::<NOM_COMPARTIMENT_2/_CHEMIN_FACULTATIF_COMPARTIMENT_2>/*"
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
3. Accédez à la [page Archives][7] dans Datadog et sélectionnez l'option **Add a new archive** en bas de la page. Seuls les utilisateurs de Datadog bénéficiant des droits d'administrateur peuvent effectuer cette étape ainsi que la suivante.

4. Sélectionnez le compte AWS et le rôle appropriés pour votre compartiment S3, puis saisissez le nom de votre compartiment. Vous avez la possibilité d'ajouter un répertoire comme préfixe vers lequel l'ensemble de vos archives de logs seront envoyées. Il ne vous reste ensuite plus qu'à enregistrer votre archive.

    {{< img src="logs/archives/log_archives_s3_datadog_settings_role_delegation.png" alt="Définir les informations de votre compartiment S3 dans Datadog" responsive="true" style="width:75%;">}}

### Chiffrement côté serveur (SSE)

Pour ajouter le chiffrement côté serveur (SSE) à vos archives de logs S3, accédez à l'onglet **Properties** dans votre compartiment S3 et sélectionnez **Default Encryption**. Sélectionnez l'option `AES-256`, puis cliquez sur **Save**.

{{< img src="logs/archives/log_archives_s3_encryption.png" alt="Sélectionnez l'option AES-256 et cliquez sur Save." responsive="true" style="width:75%;">}}

[1]: https://s3.console.aws.amazon.com/s3
[2]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[4]: /fr/integrations/amazon_web_services/?tab=allpermissions#installation
[5]: /fr/integrations/amazon_web_services/?tab=allpermissions#installation
[6]: /fr/logs/archives/rehydrating
[7]: https://app.datadoghq.eu/logs/pipelines/archives

{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

<div class="alert alert-warning">
    Les archives GCS sont en bêta privée. Demandez un accès anticipé à cette fonctionnalité en contactant l'<a href="/help">assistance Datadog</a>. Les archives GCS ne prennent pas encore en charge la réintégration.
</div>

1. Accédez à votre [compte GCP][1] et [créez un compartiment GCS][2] vers lequel vos archives seront envoyées. Sous « Choose how to control access to objects », sélectionnez « Set object-level and bucket-level permissions ».

2. Si vous ne l'avez pas encore fait, configurez l'[intégration GCP][3] pour le projet qui comporte votre compartiment de stockage GCS. Vous devrez [créer un compte de service GCS utilisable par Datadog][4] afin d'intégrer ce dernier.

3. Accordez ensuite à votre compte de service GCP Datadog les autorisations nécessaires pour écrire vos archives dans votre compartiment. Si vous créez un compte de service, gérez ces autorisations depuis la [page GCP Credentials][5]. Si vous modifiez un compte de service existant, accédez plutôt à la [page GCP IAM Admin][6]. Ajoutez les rôles **Storage Object Creator** (pour la création d'archives) **Storage Object Viewer** (pour la réintégration depuis les archives) sous **Storage**.

  {{< img src="logs/archives/gcp_role_storage_object_creator.png" alt="Ajouter le rôle Storage Object Creator à votre compte de service GCP Datadog" responsive="true" style="width:75%;">}}

4. Accédez à la [page Archives][7] dans Datadog et sélectionnez l'option **Add a new archive** en bas de la page. Seuls les utilisateurs de Datadog bénéficiant des droits d'administrateur peuvent effectuer cette étape ainsi que la suivante.

5. Sélectionnez le type d'archive GCS, puis le compte de service GCS doté des autorisations d'écriture dans votre compartiment de stockage. Saisissez le nom de votre compartiment. Vous avez la possibilité d'ajouter un répertoire comme préfixe vers lequel l'ensemble de vos archives de logs seront envoyées. Enregistrez ensuite votre archive.

  {{< img src="logs/archives/archive_select_gcs.png" alt="Ajouter le rôle Storage Object Creator à votre compte de service GCP Datadog" responsive="true" style="width:75%;">}}

[1]: https://console.cloud.google.com/storage
[2]: https://cloud.google.com/storage/docs/quickstart-console
[3]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[4]: /fr/integrations/google_cloud_platform/?tab=datadogussite#setup
[5]: https://console.cloud.google.com/apis/credentials
[6]: https://console.cloud.google.com/iam-admin/iam
[7]: https://app.datadoghq.com/logs/pipelines/archives

{{% /tab %}}
{{< /tabs >}}

Dès que vos paramètres d'archivage ont été correctement configurés sur votre compte Datadog, vos pipelines de traitement commencent à enrichir tous les logs ingérés par Datadog. Ceux-ci sont ensuite transmis à votre archive.

Une fois vos paramètres d'archivage créés ou modifiés, il est parfois nécessaire d'attendre quelques minutes avant la prochaine tentative d'importation des archives. Par conséquent, **attendez 15 minutes** avant de vérifier que les archives sont bien importées vers votre compartiment de stockage depuis votre compte Datadog.

## Format des archives

Les archives de logs que Datadog transmet à votre compartiment de stockage sont au format JSON compressé (`.json.gz`). Les archives sont stockées sous le préfixe que vous avez indiqué (ou dans `/` si aucun préfixe n'a été défini) selon une structure de répertoire qui indique à quelle date et à quelle heure les fichiers d'archives ont été générés. La structure est la suivante :

`/mon/préfixe/compartiment/dt=20180515/hour=14/archive_143201.1234.7dq1a9mnSya3bFotoErfxl.json.gz`

Cette structure de répertoire vous permet d'interroger plus facilement vos archives de logs en fonction de leur date.

À l'intérieur du fichier JSON compressé, le contenu de chaque événement est formaté comme suit :

```
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

{{< img src="logs/archives/log_archives_s3_multiple.png" alt="Les logs sont envoyés dans la première archive filtrée à laquelle ils correspondent." responsive="true" style="width:75%;">}}

{{< whatsnext desc="Découvrez ensuite comment accéder au contenu de vos logs archivés depuis Datadog :" >}}
    {{< nextlink href="/logs/archives/rehydrating" >}}<u>Réintégration à partir des archives</u> : transférez des événements de logs depuis vos archives vers le Log Explorer de Datadog.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
<br>
*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: /fr/logs/archives/rehydrating