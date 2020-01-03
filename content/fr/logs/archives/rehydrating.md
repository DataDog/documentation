---
title: Réintégration à partir des archives
kind: Documentation
description: Enregistrez des événements de log depuis vos archives dans Datadog.
aliases:
  - /fr/logs/historical-views
---
<div class="alert alert-warning">
    La réintégration d'archive de log est en bêta publique. Contactez <a href="/help">l'assistance Datadog</a> pour demander un accès anticipé à cette fonctionnalité. La réintégration est actuellement prise en charge uniquement pour les archives S3 d'AWS, et uniquement pour les utilisateurs du site américain Datadog. <a href="https://forms.gle/X4jhi13Rd2pFSuSHA">Faites-nous savoir ce que vous pensez de cette fonctionnalité</a>.
</div>

## Présentation

La fonction Log Rehydration* vous permet d'enregistrer des événements de log depuis les archives optimisées pour le stockage des clients dans le [Log Explorer][1] de Datadog, un produit spécialement conçu pour les recherches. Vous pouvez ainsi utiliser Datadog pour analyser ou rechercher des événements de log trop vieux ou exclus de l'indexation.

## Vues historiques

Grâce aux vues historiques, les équipes réintègrent des événements de log archivés en définissant une période et un filtre de requête afin de répondre efficacement à des cas d'utilisation spécifiques et inattendus. Pour créer une vue historique, accédez à la [page Configuration][2] de votre compte Datadog et sélectionnez l' [onglet « Rehydrate From Archives »][3], puis cliquez sur le bouton « New Historical View ».

{{< img src="logs/archives/log_archives_rehydrate_historical.png" alt="Vues historiques"  style="width:75%;">}}

### Ajouter des vues historiques

1. **Sélectionnez l'archive** depuis laquelle vous souhaitez réintégrer des événements de log. Seules les archives [configurées pour utiliser la délégation de rôle][4] peuvent être réintégrées.

2. **Choisissez la période** pour laquelle vous souhaitez réintégrer des événements de log. Celle-ci ne peut pas correspondre à un intervalle situé à moins de 24 heures de la date actuelle.

3. **Saisissez la requête**. La syntaxe de la requête est identique à la syntaxe des [recherches avec le Log Explorer][5]. Elle se limite cependant aux attributs de log, aux [attributs réservés][6] et à la recherche de texte libre dans le message. Vous devez inclure un argument de service.

4. **Nommez votre vue historique**. Les noms doivent commencer par une lettre minuscule et ne peuvent contenir que des lettres minuscules, des nombres et le caractère `-` (tiret).

5. (Facultatif) **Ajoutez une description** pour informer votre équipe de l'objectif de la vue historique.

{{< img src="logs/archives/log_archives_rehydrate_reload.png" alt="Réintégration depuis une archive"  style="width:75%;">}}

Une vue historique peut contenir jusqu'à 300 millions d'événements de log. Aucune limite ne s'applique à la taille de l'intervalle. Toutefois, si vous pensez que la vue historique peut dépasser la limite d'événements, renforcez les critères de votre filtre de requête.

### Afficher le contenu d'une vue historique

#### Depuis la page de la vue historique

Lorsque vous sélectionnez « Rehydrate from Archive », la vue historique est considérée comme « pending » jusqu'à ce que son contenu puisse être interrogé.

Une fois le contenu réintégré, la vue historique est considérée comme active, et le lien dans la colonne de la requête redirige vers la vue historique, dans le Log Explorer.

#### Depuis le Log Explorer

Les équipes peuvent aussi accéder à la vue historique directement dans le Log Explorer, à partir du sélecteur d'index. Lorsque vous sélectionnez une vue historique, une fenêtre contextuelle s'ouvre pour définir l'intervalle pertinent pour la vue historique sélectionnée.

{{< img src="logs/archives/log_archives_rehydrate_explorer.mp4" alt="Log Explorer" video="true"  width="75%">}}

### Supprimer des vues historiques

Les vues historiques continuent à être stockées dans Datadog jusqu'à ce que vous choisissiez de les supprimer. Vous pouvez indiquer qu'une vue historique doit être supprimée en sélectionnant l'icône de suppression à droite de la vue, puis en confirmant votre choix.

Après 24 heures, la vue historique est définitivement supprimée. L'équipe dispose donc d'un délai de 24 heures pour annuler la suppression.

{{< img src="logs/archives/log_archives_rehydrate_delete.mp4" alt="Suppression de vues historiques" video="true"  width="75%" >}}

## Configurer la réintégration d'archive

### Définir une archive Datadog

Une archive externe doit être configurée afin de pouvoir réintégrer ses données. [Suivez ce guide][7] pour archiver vos logs dans les emplacements disponibles.

### Autorisations

Datadog doit avoir un accès en lecture à vos archives afin de réintégrer leur contenu. Cette autorisation peut être modifiée à tout moment.

#### Compartiment S3 d'AWS

Afin de réintégrer des événements de log depuis vos archives, Datadog utilise le rôle IAM du compte AWS que vous avez configuré pour [votre intégration AWS][8]. Si vous n'avez pas encore créé ce rôle, [suivez ces étapes pour y remédier][9]. Pour autoriser ce rôle à réintégrer des événements de log depuis vos archives, ajoutez la déclaration d'autorisation suivante à ses stratégies IAM. Veillez à modifier les noms de compartiment et, si nécessaire, spécifiez les chemins contenant vos archives de log.

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

#### Ajout de la délégation de rôle aux archives S3

Datadog prend uniquement en charge la réintégration des archives qui ont été configurées pour utiliser la délégation de rôle afin d'autoriser l'accès. Après avoir modifié votre rôle IAM Datadog afin d'inclure la stratégie IAM ci-dessus, vérifiez que chaque archive dans votre [page de configuration des archives][10] possède la bonne combinaison de compte AWS et de rôle.

{{< img src="logs/archives/log_archives_rehydrate_configure_s3.png" alt="Ajout de la délégation de rôle aux archives S3"  style="width:75%;">}}

### Commentaires

Nous serions ravis de lire vos commentaires sur cette fonctionnalité, puisqu'elle est toujours en bêta anticipée. Vous pouvez envoyer vos commentaires directement [depuis ce formulaire][11].

*Log Rehydration est une marque de commerce de Datadog, Inc.

[1]: /fr/logs/explorer
[2]: https://app.datadoghq.com/logs/pipelines
[3]: https://app.datadoghq.com/logs/pipelines/historical-views
[4]: #permissions
[5]: /fr/logs/explorer/search
[6]: /fr/logs/?tab=ussite#reserved-attributes
[7]: /fr/logs/archives/s3/?tab=roledelegation#create-and-configure-an-s3-bucket
[8]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[9]: /fr/integrations/amazon_web_services/?tab=allpermissions#installation
[10]: https://app.datadoghq.com/logs/pipelines/archives
[11]: https://forms.gle/X4jhi13Rd2pFSuSHA