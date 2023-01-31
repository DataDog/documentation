---
title: Réintégration à partir des archives
kind: Documentation
description: Enregistrez des événements de log depuis vos archives dans Datadog.
aliases:
  - /fr/logs/historical-views
---
## Présentation

La fonction Log Rehydration* vous permet d'enregistrer des événements de log depuis les archives optimisées pour le stockage des clients dans le [Log Explorer][1] de Datadog, un produit spécialement conçu pour les recherches. Vous pouvez ainsi utiliser Datadog pour analyser ou rechercher des événements de log trop vieux ou exclus de l'indexation.

## Vues historiques

Grâce aux vues historiques, les équipes réintègrent des événements de log archivés en définissant une période et un filtre de requête afin de répondre efficacement à des cas d'utilisation spécifiques et inattendus. Pour créer une vue historique, accédez à la [page Configuration][2] de votre compte Datadog et sélectionnez l' [onglet « Rehydrate From Archives »][3], puis cliquez sur le bouton « New Historical View ».

{{< img src="logs/archives/log_archives_rehydrate_historical.png" alt="Vues historiques"  style="width:75%;">}}

Les filtres d'exclusion d'index ne s'appliquent pas aux vues historiques. Vous n'avez donc pas besoin de modifier vos filtres d'exclusion lorsque vous réintégrez du contenu depuis les archives.

### Ajouter des vues historiques

1. **Choisissez la période** pour laquelle vous souhaitez réintégrer des événements de log.

2. **Saisissez la requête**. La syntaxe de la requête est identique à la syntaxe des [recherches avec le Log Explorer][4]. Elle se limite cependant aux attributs du log, aux [attributs réservés][5] et à la recherche de texte libre dans le message.

3. **Sélectionnez l'archive** depuis laquelle vous souhaitez réintégrer les événements de log. Seules les archives [configurées pour utiliser la délégation de rôles](#autorisations) peuvent être réintégrées.

4. (Facultatif) **Estimez la taille des scans** pour obtenir le volume total de données compressées contenues dans votre archive pour la période sélectionnée.

5. **Nommez votre vue historique**. Les noms doivent commencer par une lettre minuscule et ne peuvent contenir que des lettres minuscules, des nombres et le caractère `-` (tiret).

6. Définissez le nombre maximal de logs devant être réintégrés dans cette vue historique, **de 1  million à 1 milliard**.

7. Définissez la période de rétention des logs réintégrés (les rétentions disponibles dépendent de votre contrat ; elle est de 15 jours par défaut).

8. (Facultatif) **Recevez une notification** à la fin du processus de réintégration grâce aux [intégrations][6] en utilisant la syntaxe @nom.

{{< img src="logs/archives/log_rehydration_setup.png" alt="Réintégration depuis une archive"  style="width:75%;">}}

#### Réintégration à l'aide d'une requête

Créez des vues historiques avec des requêtes spécifiques (par exemple, sur un ou plusieurs services, endpoints d'URL ou ID clients) pour réduire la durée et les coûts de réintégration de vos logs. Cette méthode est particulièrement utile lorsque vous cherchez à réintégrer des logs sur un large intervalle. Vous pouvez réintégrer jusqu'à 1 milliard d'événements de logs par vue historique créée.

### Afficher le contenu d'une vue historique

#### Depuis la page de la vue historique

Lorsque vous sélectionnez « Rehydrate from Archive », la vue historique est considérée comme « pending » jusqu'à ce que son contenu puisse être interrogé.

Une fois le contenu réintégré, la vue historique est considérée comme active, et le lien dans la colonne de la requête redirige vers la vue historique, dans le Log Explorer.

#### Depuis le Log Explorer

Les équipes peuvent aussi accéder à la vue historique directement dans le Log Explorer, à partir du sélecteur d'index. Lorsque vous sélectionnez une vue historique, une fenêtre contextuelle s'ouvre pour définir l'intervalle pertinent pour la vue historique sélectionnée.

{{< img src="logs/archives/log_archives_historical_index_selector.png" alt="Log Explorer" width="75%">}}

### Supprimer des vues historiques

Les vues historiques continuent à être stockées dans Datadog jusqu'à ce que la période de rétention sélectionnée expire, mais vous pouvez aussi choisir de les supprimer plus tôt si vous n'avez plus besoin de la vue. Vous pouvez indiquer qu'une vue historique doit être supprimée en sélectionnant l'icône de suppression à droite de la vue, puis en confirmant votre choix.

Après 1 heure, la vue historique est définitivement supprimée. L'équipe dispose donc d'un délai de 1 heure pour annuler la suppression.

{{< img src="logs/archives/log_archives_rehydrate_delete.mp4" alt="Suppression de vues historiques" video="true"  width="75%" >}}

## Configurer la réintégration d'archive

### Définir une archive Datadog

Une archive externe doit être configurée afin de pouvoir réintégrer ses données. [Suivez ce guide][7] pour archiver vos logs dans les emplacements disponibles.

### Autorisations

Datadog doit avoir un accès en lecture à vos archives afin de réintégrer leur contenu. Cette autorisation peut être modifiée à tout moment.

{{< tabs >}}
{{% tab "AWS S3" %}}

Afin de réintégrer des événements de log depuis vos archives, Datadog utilise le rôle IAM du compte AWS que vous avez configuré pour [votre intégration AWS][1]. Si vous n'avez pas encore créé ce rôle, [suivez ces étapes pour y remédier][2]. Pour autoriser ce rôle à réintégrer des événements de log depuis vos archives, ajoutez la déclaration d'autorisation suivante à ses stratégies IAM. Veillez à modifier les noms de compartiment et, si nécessaire, spécifiez les chemins contenant vos archives de log.

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

#### Ajout de la délégation de rôles aux archives S3

Datadog prend uniquement en charge la réintégration des archives qui ont été configurées pour utiliser la délégation de rôle afin d'autoriser l'accès. Après avoir modifié votre rôle IAM Datadog afin d'inclure la stratégie IAM ci-dessus, vérifiez que chaque archive de votre [page de configuration des archives][3] possède la bonne combinaison de compte AWS et de rôle.

{{< img src="logs/archives/log_archives_rehydrate_configure_s3.png" alt="Ajout de la délégation de rôles aux archives S3"  style="width:75%;">}}

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: /fr/integrations/amazon_web_services/?tab=allpermissions#installation
[3]: https://app.datadoghq.com/logs/pipelines/archives
{{% /tab %}}

{{% tab "Stockage Azure" %}}

Datadog utilise un groupe Azure AD avec le rôle Storage Blob Data Contributor restreint au compte de stockage de vos archives afin de réintégrer des événements de log. Vous pouvez accorder ce rôle à votre compte de service Datadog depuis la page Contrôle d'accès (IAM) de votre compte de stockage. Pour ce faire, [attribuez le rôle Storage Blob Data Contributor à votre app d'intégration Datadog][1].

{{< img src="logs/archives/logs_azure_archive_permissions.png" alt="La réintégration depuis Stockage Azure nécessite le rôle Storage Blob Data Contributor"  style="width:75%;">}}


[1]: /fr/logs/archives/?tab=azurestorage#create-and-configure-a-storage-bucket
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

Afin de réintégrer des événements de log depuis vos archives, Datadog utilise un compte de service avec le rôle Storage Object Viewer. Pour accorder ce rôle à votre compte de service Datadog, accédez à la [page GCP IAM Admin][1], modifiez les autorisations du compte de service, ajoutez un autre rôle, puis sélectionnez Storage > Storage Object Viewer.

{{< img src="logs/archives/log_archives_gcs_role.png" alt="La réintégration depuis GCS nécessite le rôle Storage Object Viewer"  style="width:75%;">}}

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

*Log Rehydration est une marque déposée de Datadog, Inc.

[1]: /fr/logs/explorer/
[2]: https://app.datadoghq.com/logs/pipelines
[3]: https://app.datadoghq.com/logs/pipelines/historical-views
[4]: /fr/logs/explorer/search/
[5]: /fr/logs/processing/#reserved-attributes
[6]: /fr/integrations/#cat-notification
[7]: /fr/logs/archives/
