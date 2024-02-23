---
disable_toc: false
further_reading:
- link: /observability_pipelines/working_with_data/
  tag: Documentation
  text: Utilisation des données dans les pipelines d'observabilité
- link: /logs/log_configuration/archives/
  tag: Documentation
  text: En savoir plus sur les archives de logs
- link: /logs/log_configuration/rehydrating/
  tag: Documentation
  text: En savoir plus sur la réintégration des archives de logs
kind: documentation
title: Acheminer des logs dans un format réintégrable à Datadog vers Amazon S3
---

<div class="alert alert-warning">La destination Archives Datadog des pipelines d'observabilité est en version bêta.</div>

## Présentation

La destination Archives Datadog des pipelines d'observabilité convertit les logs dans un format réintégrable à Datadog avant leur acheminement vers les [archives de logs][1]. Ces logs ne sont pas ingérés dans Datadog mais sont acheminés directement vers l'archive. Vous pouvez ensuite réintégrer cette dernière dans Datadog lorsque vous avez besoin d'analyser et d'étudier les logs. `datadog_archives` est disponible à partir de la version 1.5 du worker de pipelines d'observabilité.

## Configurer une archive de logs

### Créer un compartiment Amazon S3

{{< site-region region="us,us3,us5" >}}
Consultez la [tarification AWS][1] pour connaître les frais de transfert de données entre régions et déterminer l'impact éventuel sur vos frais de stockage dans le cloud.

[1]: https://aws.amazon.com/s3/pricing/
{{< /site-region >}}

1. Accédez aux [compartiments Amazon S3][2]. 
1. Cliquez sur **Create bucket**.
1. Saisissez un nom décrivant votre compartiment.
1. Assurez-vous que votre compartiment n'est pas accessible au public.
1. Si besoin, ajoutez des tags.
1. Cliquez sur **Create bucket**.

### Configurer une stratégie IAM permettant aux workers d'écrire dans le compartiment S3

1. Accédez à la [console IAM][3].
1. Sélectionnez **Policies** dans le menu latéral gauche.
1. Cliquez sur **Create policy**.
1. Cliquez sur **JSON** dans la section **Specify permissions**.
1. Copiez la stratégie ci-dessous et collez-la dans le **Policy editor**. Remplacez `<NOM_DE_MON_COMPARTIMENT>` et `<NOM_DE_MON_COMPARTIMENT_1_/_CHEMIN_FACULTATIF_DE_MON_COMPARTIMENT_1>` par les informations du compartiment S3 créé précédemment.
{{< code-block lang="json">}}
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "DatadogUploadAndRehydrateLogArchives",
            "Effect": "Allow",
            "Action": ["s3:PutObject", "s3:GetObject"],
            "Resource": "arn:aws:s3:::<NOM_DE_MON_COMPARTIMENT_1_/_CHEMIN_FACULTATIF_DE_MON_COMPARTIMENT_1>/*"
        },
        {
            "Sid": "DatadogRehydrateLogArchivesListBucket",
            "Effect": "Allow",
            "Action": "s3:ListBucket",
            "Resource": "arn:aws:s3:::<NOM_DE_MON_COMPARTIMENT>"
        }
    ]
}
{{< /code-block >}}
1. Cliquez sur **Next**.
1. Saisissez un nom décrivant la stratégie.
1. Si besoin, ajoutez des tags.
1. Cliquez sur **Create policy**.

{{< tabs >}}
{{% tab "Docker" %}}

### Créer un utilisateur IAM

Créez un utilisateur IAM et associez-lui la stratégie IAM créée précédemment.

1. Accédez à la [console IAM][1].
1. Sélectionnez **Users** dans le menu latéral gauche.
1. Cliquez sur **Create user**.
1. Saisissez un nom d'utilisateur.
1. Cliquez sur **Next**.
1. Sélectionnez **Attach policies directly**.
1. Choisissez la stratégie IAM créée précédemment à associer au nouvel utilisateur IAM.
1. Cliquez sur **Next**.
1. Si besoin, ajoutez des tags.
1. Cliquez sur **Create user**.

Créez des identifiants d'accès pour le nouvel utilisateur IAM. Enregistrez-les sous `AWS_ACCESS_KEY` et `AWS_SECRET_ACCESS_KEY`.

[1]: https://console.aws.amazon.com/iam/

{{% /tab %}}
{{% tab "AWS EKS" %}}

### Créer un compte de service

[Créez un compte de service][1] pour utiliser la stratégie créée ci-dessus. Dans la configuration Helm, remplacez `${DD_ARCHIVES_SERVICE_ACCOUNT}` par le nom du compte de service.


[1]: https://docs.aws.amazon.com/eks/latest/userguide/associate-service-account-role.html
{{% /tab %}}
{{% tab "Linux avec APT" %}}

### Créer un utilisateur IAM

Créez un utilisateur IAM et associez-lui la stratégie IAM créée précédemment.

1. Accédez à la [console IAM][1].
1. Sélectionnez **Users** dans le menu latéral gauche.
1. Cliquez sur **Create user**.
1. Saisissez un nom d'utilisateur.
1. Cliquez sur **Next**.
1. Sélectionnez **Attach policies directly**.
1. Choisissez la stratégie IAM créée précédemment à associer au nouvel utilisateur IAM.
1. Cliquez sur **Next**.
1. Si besoin, ajoutez des tags.
1. Cliquez sur **Create user**.

Créez des identifiants d'accès pour le nouvel utilisateur IAM. Enregistrez-les sous `AWS_ACCESS_KEY` et `AWS_SECRET_ACCESS_KEY`.

[1]: https://console.aws.amazon.com/iam/

{{% /tab %}}
{{% tab "Linux avec RPM" %}}

### Créer un utilisateur IAM

Créez un utilisateur IAM et associez-lui la stratégie IAM créée précédemment.

1. Accédez à la [console IAM][1].
1. Sélectionnez **Users** dans le menu latéral gauche.
1. Cliquez sur **Create user**.
1. Saisissez un nom d'utilisateur.
1. Cliquez sur **Next**.
1. Sélectionnez **Attach policies directly**.
1. Choisissez la stratégie IAM créée précédemment à associer au nouvel utilisateur IAM.
1. Cliquez sur **Next**.
1. Si besoin, ajoutez des tags.
1. Cliquez sur **Create user**.

Créez des identifiants d'accès pour le nouvel utilisateur IAM. Enregistrez-les sous `AWS_ACCESS_KEY` et `AWS_SECRET_ACCESS_KEY`.

[1]: https://console.aws.amazon.com/iam/

{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

### Associer la stratégie au profil d'instance IAM

Associez la stratégie au profil d'instance IAM créé avec Terraform, qui est indiqué dans la sortie `iam-role-name`.

{{% /tab %}}
{{< /tabs >}}

### Connecter le compartiment S3 aux archives de logs Datadog

1. Accédez à la page [Log Forwarding][4] de Datadog.
1. Cliquez sur **Add a new archive**.
1. Saisissez un nom décrivant l'archive.
1. Ajoutez une requête excluant tous les logs traités par les pipelines de logs afin qu'ils ne soient pas intégrés à cette archive. Par exemple, ajoutez la requête `observability_pipelines_read_only_archive`, en supposant que ce tag n'ait pas été ajouté aux logs traités par le pipeline.
1. Sélectionnez **AWS S3**.
1. Sélectionnez le compte AWS dans lequel se trouve votre compartiment.
1. Saisissez le nom du compartiment S3.
1. Si besoin, saisissez un chemin.
1. Vérifiez la déclaration de confirmation.
1. Si besoin, ajoutez des tags et définissez la taille d'analyse maximale pour la réintégration. Consultez la rubrique [Paramètres avancés][5] pour en savoir plus.
1. Cliquez sur **Save**.

Consultez la [documentation relative aux archives de logs][6] pour en savoir plus.

## Configurer la destination Archives Datadog

Vous pouvez configurer la destination `datadog_archives` à l'aide du [fichier de configuration](#fichier-de-configuration) ou à l'aide de l'[interface utilisateur de création de pipeline](#fichier-de-configuration).

<div class="alert alert-warning">Si des logs qui ne proviennent pas de l'Agent Datadog sont ingérés par le worker et acheminés vers la destination Archives Datadog, ils ne seront pas tagués avec les <a href="https://docs.datadoghq.com/logs/log_configuration/attributes_naming_convention/#reserved-attributes">attributs réservés</a>. Cela signifie que vous perdrez la télémétrie Datadog et les avantages du <a href="https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/?tab=kubernetes">tagging de service unifié</a>. Supposons, par exemple, que vos logs Syslog soient envoyés à la destination <code>datadog_archives</code> et qu'ils présentent le tag de statut <code>severity</code> au lieu de l'attribut réservé <code>status</code> et le tag de host <code>hostname</code> au lieu de l'attribut réservé <code>hostname</code>. Lors de leur réintégration dans Datadog, l'attribut <code>status</code> de tous ces logs sera défini sur <code>info</code> et aucun d'eux ne possédera de tag de hostname.</div>

### Fichier de configuration

Pour les déploiements manuels, le [fichier d'exemple de configuration de pipelines][7] pour Datadog inclut un récepteur pour l'envoi des logs à Amazon S3 dans un format réintégrable à Datadog.

{{< tabs >}}
{{% tab "Docker" %}}

Dans le fichier d'exemple de configuration de pipelines, remplacez `AWS_ACCESS_KEY_ID` et `AWS_SECRET_ACCESS_KEY` par les identifiants AWS créés précédemment.

{{% /tab %}}
{{% tab "AWS EKS" %}}

Dans le fichier d'exemple de configuration de pipelines, remplacez `AWS_ACCESS_KEY_ID` et `AWS_SECRET_ACCESS_KEY` par les identifiants AWS créés précédemment.

{{% /tab %}}
{{% tab "Linux avec APT" %}}

Dans le fichier d'exemple de configuration de pipelines, remplacez `AWS_ACCESS_KEY_ID` et `AWS_SECRET_ACCESS_KEY` par les identifiants AWS créés précédemment.

{{% /tab %}}
{{% tab "Linux avec RPM" %}}

Dans le fichier d'exemple de configuration de pipelines, remplacez `AWS_ACCESS_KEY_ID` et `AWS_SECRET_ACCESS_KEY` par les identifiants AWS créés précédemment.

{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

Remplacez les paramètres `${DD_ARCHIVES_BUCKET}` et $`{DD_ARCHIVES_REGION}` en fonction de la configuration de votre compartiment S3.

{{% /tab %}}
{{< /tabs >}}

### Interface utilisateur de création de pipeline

1. Accédez à votre [pipeline][8].
1. (Facultatif) Ajoutez une transformation de remappage pour taguer tous les logs envoyés à la destination `datadog_archives`.   
  a. Cliquez sur **Edit** puis sur **Add More** dans le carré **Add Transforms**.  
  b. Cliquez sur le carré **Remap**.  
  c. Saisissez un nom décrivant le composant.  
  d. Dans le champ **Inputs**, sélectionnez la source à connecter à cette destination.  
  e. Ajoutez `.sender = "observability_pipelines_worker"` dans la section **Source**.  
  f. Cliquez sur **Save**.  
  g. Revenez à votre pipeline. 
1. Cliquez sur **Edit**.
1. Cliquez sur **Add More** dans le carré **Add Destination**.
1. Cliquez sur le carré **Datadog Archives**.
1. Saisissez un nom décrivant le composant.
1. Sélectionnez les sources ou les transformations à connecter à cette destination.

{{< tabs >}}
{{% tab "AWS S3" %}}

7. Dans le champ **Bucket**, saisissez le nom du compartiment S3 créé précédemment.
8. Saisissez `aws_s3` dans le champ **Service**.
9. Activez **AWS S3** pour activer ces options de configuration spécifiques.
10. Dans le champ **Storage Class**, sélectionnez la classe de stockage dans le menu déroulant.
11. Définissez les autres options de configuration en fonction de vos besoins.
12. Cliquez sur **Save**.

{{% /tab %}}
{{% tab "Blob Azure" %}}

7. Dans le champ **Bucket**, saisissez le nom du compartiment S3 créé précédemment.
8. Saisissez `azure_blob` dans le champ **Service**.
9. Activez **Azure Blob** pour activer ces options de configuration spécifiques.
10. Saisissez la chaîne de connexion au compte Stockage Blob Azure.
11. Définissez les autres options de configuration en fonction de vos besoins.
12. Cliquez sur **Save**.

{{% /tab %}}
{{% tab "GCP Cloud Storage" %}}

7. Dans le champ **Bucket**, saisissez le nom du compartiment S3 créé précédemment.
8. Saisissez `gcp_cloud_storage` dans le champ **Service**.
9. Activez **GCP Cloud Storage** pour activer ces options de configuration spécifiques.
10. Définissez les options de configuration en fonction de vos besoins.
11. Cliquez sur **Save**.

{{% /tab %}}
{{< /tabs >}}

Si vous utilisez la configuration à distance, déployez la modification dans votre pipeline par le biais de l'interface utilisateur. Dans le cas d'une configuration manuelle, téléchargez la configuration mise à jour et redémarrez le worker.

Consultez la [documentation de référence relative aux archives Datadog][9] pour en savoir plus sur l'ensemble des options de configuration.

## Réintégrer votre archive

Consultez la rubrique [Réintégration à partir des archives][10] pour savoir comment réintégrer votre archive dans Datadog afin de pouvoir commencer à analyser et étudier ces logs.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_configuration/archives/
[2]: https://s3.console.aws.amazon.com/s3/home
[3]: https://console.aws.amazon.com/iam/
[4]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[5]: /fr/logs/log_configuration/archives/#advanced-settings
[6]: /fr/logs/log_configuration/archives
[7]: /fr/observability_pipelines/setup/datadog#installing-the-observability-pipelines-worker
[8]: https://app.datadoghq.com/observability-pipelines/
[9]: /fr/observability_pipelines/reference/sinks/#datadogarchivessink
[10]: /fr/logs/log_configuration/rehydrating/