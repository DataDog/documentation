---
aliases:
- /fr/logs/historical-views
- /fr/logs/archives/rehydrating/
description: Enregistrez des événements de log depuis vos archives dans Datadog.
further_reading:
- link: logs/archives
  tag: Documentation
  text: Documentation des archives de logs
- link: /logs/explorer/archive_search/
  tag: Documentation
  text: Archive Search
title: Réintégration à partir des archives
---
<div class="alert alert-info">
<strong><a href="/logs/explorer/archive_search/">Archive Search</a> est le moyen recommandé pour accéder aux logs archivés.</strong><br>
Elle diffuse les résultats en temps réel directement depuis votre archive sans réindexation, et ne facture que les données analysées. Lorsque vous avez besoin d'un accès complet à la plateforme ou d'une rétention plus longue, utilisez le mode <strong>Search & Rehydration</strong> d'Archive Search.
</div>

## Présentation {#overview}

La fonction Log Rehydration* vous permet de capturer des événements de log depuis les archives optimisées pour le stockage dont le client est propriétaire dans le [Log Explorer][1] de Datadog optimisé pour la recherche. Vous pouvez alors utiliser Datadog pour analyser ou rechercher des événements de log qui sont soit trop vieux soit exclus de l'indexage.

### Vues historiques {#historical-views}

Avec les vues historiques, les équipes réhydratent les événements de log archivés par plage temporelle et filtre de requête pour répondre efficacement à des cas d'utilisation spécifiques et imprévus. En créant des vues historiques avec des requêtes spécifiques (par exemple, sur un ou plusieurs services, endpoints d'URL ou identifiants client), vous pouvez réduire le temps et le coût liés à la réhydratation de vos logs. Ceci est particulièrement utile lors de la réhydratation sur des plages temporelles plus larges.

**Fonctionnalités clés :**
- Réhydratez jusqu'à 1 milliard d'événements de log par vue historique
- Les filtres d'exclusion d'index ne s'appliquent pas aux vues historiques, il n'est donc pas nécessaire de modifier les filtres d'exclusion lorsque vous réhydratez à partir des archives
- Si vous téléchargez des vues historiques au format CSV, les données sont limitées aux 90 derniers jours

## Prérequis {#prerequisites}

Avant de pouvoir réhydrater des logs à partir des archives, vous devez effectuer les étapes de configuration suivantes :

### Configuration des archives {#archive-configuration}

Vous devez disposer d'une archive externe configurée pour y réhydrater des données. Pour archiver vos logs dans les destinations disponibles (Amazon S3, Azure Storage ou Google Cloud Storage), consultez [Log Archives][8].

### Autorisations et authentification {#permissions-and-authentication}

Datadog nécessite l'autorisation de lire vos archives pour réhydrater le contenu. Les archives doivent être configurées avec une authentification appropriée :

- **S3** : Vous devez utiliser la délégation de rôle (rôles IAM).
- **Azure Storage** : Vous devez utiliser Microsoft Entra ID avec le rôle Storage Blob Data Contributor.
- **Google Cloud Storage** : Vous devez utiliser un compte de service avec le rôle Lecteur des objets de stockage.

Seules les archives disposant d'une authentification appropriée sont disponibles pour la réhydratation. Pour des instructions de configuration détaillées, consultez [les autorisations spécifiques au cloud](#cloud-specific-permissions).

## Réhydratation des logs avec des vues historiques {#rehydrating-logs-with-historical-views}

1. Accédez à la page [Réhydratation][3].
2. Cliquez sur {{< ui >}}New Historical View{{< /ui >}}.
3. Sélectionnez la période pour la réhydratation.
4. Choisissez l'archive à partir de laquelle vous souhaitez réhydrater les événements de log. Seules les archives [configurées pour utiliser la délégation de rôle](#permissions) sont disponibles pour la réhydratation.
5. (Facultatif) Estimez la taille de l'analyse et obtenez la quantité totale de données compressées contenues dans votre archive pour la période sélectionnée.
6. Nommez votre vue historique. Les noms doivent commencer par une lettre minuscule et ne peuvent contenir que des lettres minuscules, des chiffres et le caractère `-`.
7. Définissez la requête d'indexation à l'aide de la [syntaxe de recherche du Log Explorer][4]. Assurez-vous que vos logs sont [archivés avec leurs tags][5] si vous utilisez des tags (tels que `env:prod` ou `version:x.y.z`) dans la requête de réhydratation.
8. Définissez la limite de logs (nombre maximal de logs à réhydrater). Lorsque la limite de réhydratation est atteinte, le rechargement des logs s'arrête, mais vous avez toujours accès aux logs réhydratés.
9. Définissez la période de rétention des logs réhydratés. Cela définit la durée pendant laquelle les logs réhydratés restent consultables. Les rétentions disponibles sont basées sur votre contrat, la valeur par défaut est de 15 jours.
10. (Facultatif) [Configurez les notifications de fin](#rehydration-notifications) via [integrations][6] avec la syntaxe @handle.

Pour plus d'informations sur la taille de scan de réhydratation, consultez [Comprendre les tailles de scan de réhydratation](#understanding-rehydration-scan-sizes).


## Gestion des vues historiques {#historical-views-management}

### Affichage du contenu d'une vue historique {#viewing-historical-view-content}

**Depuis la page de vue historique** :
Après avoir sélectionné « Rehydrate from Archive », la vue historique est marquée comme « PENDING » jusqu'à ce que son contenu soit prêt à être interrogé.

Une fois le contenu réhydraté, la vue historique est marquée comme « ACTIVE » et le lien dans la colonne de requête mène à la Log Explorer.

**Depuis le Log Explorer** :
Dans le Log Explorer, ouvrez la facette {{< ui >}}Index{{< /ui >}} dans le sélecteur d'index. Sélectionnez les index historiques à inclure dans votre recherche.

{{< img src="logs/archives/log_archives_historical_index_selector.png" alt="Log Explorer" width="90%">}}

### Annulation des vues historiques en cours {#canceling-ongoing-historical-views}

Annulez les réhydratations en cours depuis la page [Rehydration][3] pour arrêter les jobs avec des plages temporelles incorrectes ou des fautes de frappe dans la requête d'indexation.

Les logs qui ont déjà été indexés restent interrogeables jusqu'à la fin de la période de rétention sélectionnée pour la vue historique. Tous les logs scannés et indexés seront toujours facturés.

{{< img src="logs/archives/log_archives_cancel_ongoing_rehydration_settings.png" alt="Annulation des réhydratations de vues historiques en cours dans Datadog" width="90%" >}}

### Suppression des vues historiques {#deleting-historical-views}

Les vues historiques restent dans Datadog jusqu'à ce qu'elles dépassent la période de rétention sélectionnée, à moins que vous ne choisissiez de les supprimer plus tôt. Pour supprimer manuellement une vue historique, sélectionnez l'icône de suppression à l'extrême droite de la vue et confirmez l'action.

La vue historique est définitivement supprimée un jour après le lancement de la suppression. D'ici là, l'équipe peut annuler la suppression.

### Affichage des vues historiques supprimées {#viewing-deleted-historical-views}

Affichez les vues historiques supprimées jusqu'à 1 an dans le passé à l'aide du menu déroulant {{< ui >}}View{{< /ui >}} :

{{< img src="logs/archives/log_archives_deleted_rehydrations_settings.png" alt="Affichage des vues historiques supprimées dans Datadog" width="90%" >}}

## Configuration avancée {#advanced-configuration}

### Notifications de réhydratation {#rehydration-notifications}

Les événements sont déclenchés automatiquement lorsqu'une réhydratation commence et se termine. Ces événements sont disponibles dans votre [Events Explorer][7].

Vous pouvez utiliser les variables de modèle intégrées pour personnaliser la notification déclenchée à la fin de la réhydratation :

| Variable                      | Description                                                                  |
|-------------------------------|------------------------------------------------------------------------------|
| `{{archive}}`                 | Name of the archives used for the rehydration.                           |
| `{{from}}`                    | Start of the time range selected for the rehydration.                    |
| `{{to}}`                      | End of the time range selected for the rehydration.                      |
| `{{scan_size}}`               | Total size of the files processed during the rehydration.                |
| `{{number_of_indexed_logs}}`  | Total number of rehydrated logs.                                         |
| `{{explorer_url}}`            | Lien direct vers les logs réhydratés.                                      |

### Limite par défaut pour les vues historiques {#default-limit-for-historical-views}

Les administrateurs disposant de l'autorisation `Logs Write Archives` peuvent configurer des contrôles par défaut pour garantir une utilisation efficace de Log Rehydration* au sein des équipes. Cliquez sur {{< ui >}}Settings{{< /ui >}} pour configurer :

- {{< ui >}}Default Rehydration volume limit{{< /ui >}} : Définissez le nombre par défaut de logs (en millions) pouvant être réhydratés par vue historique. Si la limite est atteinte, la réhydratation s'arrête automatiquement, mais les logs déjà réhydratés restent accessibles. Les administrateurs peuvent également autoriser le dépassement de cette limite lors de la création d'une vue.

- {{< ui >}}Rehydration retention periods{{< /ui >}} : Choisissez les périodes de rétention disponibles lors de la création de réhydratations. Seules les durées sélectionnées (par exemple, 3, 7, 15, 30, 45, 60, 90 ou 180 jours) apparaissent dans le menu déroulant lors de la sélection de la durée pendant laquelle les logs doivent rester consultables dans Datadog.

### Permissions spécifiques au cloud {#cloud-specific-permissions}

Datadog nécessite la permission de lire vos archives pour en réhydrater le contenu. Cette permission peut être modifiée à tout moment.

{{< tabs >}}
{{% tab "Amazon S3" %}}

Pour réhydrater des événements de log à partir de vos archives, Datadog utilise le rôle IAM de votre compte AWS que vous avez configuré pour [votre intégration AWS][1]. Si vous n'avez pas encore créé ce rôle, [suivez ces étapes pour le faire][2]. Si ce rôle possède la stratégie issue de [Définir les permissions d'archive][4], ignorez l'instruction suivante. Sinon, ajoutez l'instruction de permission suivante aux politiques IAM du rôle. Veillez à modifier les noms des buckets et, si vous le souhaitez, à spécifier les chemins contenant vos archives de logs.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DatadogRehydrateLogArchives",
      "Effect": "Allow",
      "Action": "s3:GetObject",
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

#### Ajout de la délégation de rôle aux archives S3 {#adding-role-delegation-to-s3-archives}

Datadog prend en charge la réhydratation uniquement à partir d'archives utilisant la délégation de rôle pour accorder l'accès. Après avoir modifié votre rôle IAM Datadog pour inclure la stratégie IAM précédente, assurez-vous que chaque archive sur votre [page de configuration d'archive][3] dispose de la bonne combinaison Compte AWS + Rôle.

{{< img src="logs/archives/log_archives_rehydrate_configure_s3.png" alt="Ajout de la délégation de rôle aux archives S3" style="width:75%;">}}

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: /fr/integrations/amazon_web_services/?tab=allpermissions#installation
[3]: https://app.datadoghq.com/logs/pipelines/archives
[4]: /fr/logs/log_configuration/archives/?tab=awss3#set-permissions
{{% /tab %}}

{{% tab "Azure Storage" %}}

Datadog utilise un groupe Microsoft Entra ID avec le rôle Storage Blob Data Contributor, limité au compte de stockage de vos archives, pour réhydrater les événements de log. Vous pouvez accorder ce rôle à votre compte de service Datadog depuis la page Access Control (IAM) de votre compte de stockage en [attribuant le rôle Storage Blob Data Contributor à votre application d'intégration Datadog][1].

{{< img src="logs/archives/logs_azure_archive_permissions.png" alt="La réhydratation depuis le stockage Azure nécessite le rôle Storage Blob Data Contributor" style="width:75%;">}}


[1]: /fr/logs/archives/?tab=azurestorage#create-and-configure-a-storage-bucket
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

Pour réhydrater les logs depuis vos archives, Datadog utilise un compte de service avec le rôle Lecteur des objets du stockage. Vous pouvez accorder ce rôle à votre compte de service Datadog depuis la [page d'administration IAM de Google Cloud][1] en modifiant les autorisations du compte de service, en ajoutant un autre rôle, puis en sélectionnant {{< ui >}}Storage{{< /ui >}} > {{< ui >}}Storage Object Viewer{{< /ui >}}.

{{< img src="logs/archives/log_archives_gcs_role.png" alt="La réhydratation depuis GCS nécessite le rôle Lecteur des objets du stockage" style="width:75%;">}}

Le rôle {{< ui >}}Storage Object Viewer{{< /ui >}} est la configuration recommandée par Datadog. Si votre organisation exige un rôle personnalisé à privilèges limités, les autorisations individuelles suivantes sont requises pour la réhydratation :

- `storage.objects.get`
- `storage.objects.list`

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}


## Comprendre les tailles d'analyse de réhydratation {#understanding-rehydration-scan-sizes}

La requête est appliquée _après_ que les fichiers correspondant à la période ont été téléchargés depuis votre archive. Par conséquent, la taille de l'analyse de réhydratation est basée sur le **volume total de logs récupérés depuis l'archive**, et non sur le nombre de logs correspondant à la requête. Le stockage d'archive est basé sur le temps, donc les requêtes limitées à des filtres spécifiques (tels que `service:A`) récupèrent néanmoins tous les logs dans la fenêtre temporelle sélectionnée. Cela inclut les logs d'autres services (tels que `service:A` et `service:B`).

Réduire la plage de dates est le moyen le plus efficace de limiter la taille de l'analyse et de minimiser les coûts de transfert de données cloud, car les filtres de requête sont appliqués après le téléchargement des données

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration est une marque de commerce de Datadog, Inc.

[1]: /fr/logs/explorer/
[3]: https://app.datadoghq.com/logs/pipelines/historical-views
[4]: /fr/logs/explorer/search/
[5]: /fr/logs/archives/?tab=awss3#datadog-tags
[6]: /fr/integrations/#cat-notification
[7]: /fr/events/
[8]: /fr/logs/archives/