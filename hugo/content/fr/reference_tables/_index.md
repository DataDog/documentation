---
aliases:
- /fr/logs/guide/enrichment-tables/
- /fr/logs/guide/reference-tables/
- /fr/integrations/guide/reference-tables
description: Combinez des métadonnées personnalisées avec les données Datadog en téléchargeant
  des fichiers CSV ou en connectant un stockage cloud pour enrichir les logs, les
  données de sécurité et les analyses.
further_reading:
- link: /reference_tables/guide/create-update-delete-reference-table-with-api/
  tag: Guide
  text: Création, mise à jour et suppression d'une Reference Table avec l'API
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Utilisez le processeur de correspondance pour enrichir les logs à partir d'une
    Reference Table.
- link: /logs/explorer/advanced_search#filter-logs-based-on-reference-tables
  tag: Documentation
  text: Filtrer les logs en fonction des tables de référence
- link: /sheets/#lookup
  tag: Documentation
  text: Sheets lookup
- link: /events/pipelines_and_processors/lookup_processor/
  tag: Documentation
  text: Lookup processor for Events
- link: /cloud_cost_management/tag_pipelines/#map-multiple-tags
  tag: Documentation
  text: Utilisez les tables de référence pour ajouter plusieurs tags aux données de
    coût
- link: /metrics/reference_table_joins_with_metrics/
  tag: Documentation
  text: En savoir plus sur les jointures de Reference Table avec des métriques
- link: https://www.datadoghq.com/blog/observability-pipelines-reference-tables-log-enrichment/
  tag: Blog
  text: Ajoutez un contexte mis à jour dynamiquement aux logs avec les Reference Tables
    et Observability Pipelines
- link: https://www.datadoghq.com/blog/add-context-with-reference-tables/
  tag: Blog
  text: Ajoutez plus de contexte à vos logs avec les tables de référence
- link: https://www.datadoghq.com/blog/reference-tables/
  tag: Blog
  text: Enrichissez votre télémétrie Datadog existante avec des métadonnées personnalisées
    à l'aide de tables de référence
- link: https://www.datadoghq.com/blog/add-context-with-reference-tables-in-cloud-siem/
  tag: Blog
  text: 'Ajoutez plus de contexte aux détections et aux enquêtes Cloud SIEM avec les
    tables de référence Datadog :'
- link: https://www.datadoghq.com/blog/observability-pipelines-servicenow-cmdb-enrichment
  tag: Blog
  text: Enrichissez les logs avec le contexte ServiceNow CMDB avant de les acheminer
    vers un SIEM ou un outil de journalisation.
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: Blog
  text: Simplifiez la collecte et l'agrégation des logs pour les MSSP avec Datadog
    Observability Pipelines
title: Tables de référence
---
## Présentation {#overview}

Les tables de référence vous permettent de combiner des métadonnées personnalisées avec des informations déjà présentes dans Datadog. Vous pouvez définir de nouvelles entités telles que les détails des clients, les noms et informations des services, ou les adresses IP en téléchargeant un fichier CSV contenant un tableau d'informations. Les entités sont représentées par une clé primaire dans une Reference Table et les métadonnées associées.

{{< img src="reference_tables/reference_table.png" alt="Une Reference Table avec des données renseignées dans les colonnes pour l'ID d'organisation, le nom de l'organisation, l'organisation parente, le propriétaire du compte et le CSM." style="width:100%;">}}

Vous pouvez par exemple :

- **Enrichissez les logs et les données de sécurité pour des enquêtes plus rapides :** Corrélez les logs, les traces et les événements de sécurité avec un contexte métier à jour (comme les noms des clients, les propriétaires de compte, les renseignements sur les menaces ou les descriptions des codes d'erreur) pour accélérer le dépannage et l'analyse.
- **Segmentez les utilisateurs et les ressources pour des analyses ciblées et la gestion des coûts :** Regroupez les utilisateurs, les clients ou les ressources cloud en segments significatifs (comme les niveaux d'utilisateurs, les équipes ou les unités commerciales) pour des analyses de produit plus approfondies et une attribution précise des coûts à l'aide d'outils tels que Tag Pipelines.
- **Améliorez les données pour des requêtes et des rapports avancés :** Joignez des données externes provenant de tables de référence dans Sheets, l'éditeur DDSQL ou les Notebooks pour effectuer des requêtes complexes, des agrégations et créer des rapports personnalisés sans expertise technique.

## Créer une Reference Table {#create-a-reference-table}

Datadog prend en charge les sources de données suivantes, y compris les intégrations et le téléchargement manuel de fichiers CSV :

{{< tabs >}}
{{% tab "Chargement manuel :" %}}

Cliquez sur {{< ui >}}New Reference Table +{{< /ui >}}, puis chargez un fichier CSV, nommez les colonnes appropriées et définissez la clé primaire pour les correspondances.

{{< img src="reference_tables/schema_setup.png" alt="La section Définir le schéma montrant un tableau avec org_id marqué comme clé primaire et des colonnes avec des données pour l'ID d'organisation, le nom de l'organisation, l'organisation parente, le propriétaire du compte et le CSM " style="width:100%;">}}

**Remarque** : La méthode de chargement manuel de CSV prend en charge les fichiers jusqu'à 4 Mo.

{{% /tab %}}
{{% tab "Stockage cloud" %}}

{{% collapse-content title="Amazon S3" level="h3" id="amazon-s3" %}}

Les tables de référence peuvent automatiquement extraire un fichier CSV d'un compartiment Amazon S3 pour maintenir vos données à jour. L'intégration recherche les modifications apportées au fichier CSV dans S3, et lorsque le fichier est mis à jour, elle remplace la Reference Table par les nouvelles données. Cela permet également une mise à jour par API avec l'API S3 une fois la Reference Table initiale configurée. **Remarque** : Les tables de référence ne sont pas remplacées si le contenu du fichier CSV est inchangé.

Pour mettre à jour les tables de référence depuis S3, Datadog utilise le rôle IAM de votre compte AWS que vous avez configuré pour l'[intégration AWS][1]. Si vous n'avez pas encore créé ce rôle, [suivez ces étapes][2] pour le faire. Pour autoriser ce rôle à mettre à jour vos tables de référence, ajoutez l'instruction d'autorisation suivante à ses politiques IAM. Assurez-vous de modifier les noms des compartiments pour qu'ils correspondent à votre environnement.

**Remarque** : Si vous utilisez le chiffrement côté serveur, vous pouvez charger des tables de référence chiffrées avec des clés gérées par Amazon S3 (SSE-S3) ou des clés AWS Key Management Service (SSE-KMS).

```json
{
	"Statement": [
		{
			"Sid": "EnrichmentTablesS3",
			"Effect": "Allow",
			"Action": [
				"s3:GetObject",
				// Grant KMS decrypt permissions if uploading KMS-encrypted object
				// "kms:Decrypt",
				"s3:ListBucket"
			],
			"Resource": [
				"arn:aws:s3:::<MY_BUCKET_NAME_1/*>",
				"arn:aws:s3:::<MY_BUCKET_NAME_2>"
			]
		}
	],
	"Version": "2012-10-17"
}
```
#### Définir le tableau {#define-the-table}

Cliquez sur {{< ui >}}New Reference Table +{{< /ui >}}, puis ajoutez un nom, sélectionnez {{< ui >}}Amazon S3{{< /ui >}}, remplissez tous les champs, cliquez sur importer et définissez la clé primaire pour les correspondances.

{{< img src="reference_tables/s3_table.png" alt="La section de chargement de vos données avec la tuile Amazon S3 sélectionnée et les données renseignées pour le compte AWS, le compartiment et le chemin" style="width:100%;">}}

**Remarque** : La méthode de chargement depuis un compartiment S3 prend en charge les fichiers jusqu'à 200 Mo.

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=automaticcloudformation#installation

{{% /collapse-content %}}
{{% collapse-content title="Stockage Azure" level="h3" id="azure-storage" %}}

1. Si ce n'est pas déjà fait, configurez l'[intégration Azure][1] au sein de l'abonnement qui contient le compte de stockage à partir duquel vous souhaitez importer votre Reference Table. Cela implique de [créer une app registration avec laquelle Datadog peut][2] s'intégrer.
2. Dans le portail Azure, sélectionnez le compte de stockage qui contient vos fichiers de Reference Table.
3. Dans votre compte de stockage, accédez à {{< ui >}}Access Control (IAM){{< /ui >}} et sélectionnez {{< ui >}}Add{{< /ui >}} > {{< ui >}}Add Role Assignment{{< /ui >}}.
4. Saisissez et sélectionnez le rôle {{< ui >}}Storage Blob Data Reader{{< /ui >}}. Le [{{< ui >}}Storage Blob Data Reader{{< /ui >}} rôle][3] permet à Datadog de lire et de lister les conteneurs de stockage et les blobs.
5. Dans l'onglet {{< ui >}}Members{{< /ui >}}, cliquez sur {{< ui >}}+ Select members{{< /ui >}}. Sélectionnez la app registration que vous avez créée à l'étape 1.

   {{< img src="reference_tables/add_members.png" alt="La section Membres du portail Azure où un membre est sélectionné et où les données sont renseignées pour le Nom, l'ID d'objet et le Type" style="width:85%;">}}

Après avoir examiné et attribué le rôle, vous pouvez importer des données dans les tables de référence depuis Azure. Il peut s'écouler quelques minutes avant que votre configuration Azure ne soit mise à jour dans Datadog.

{{< img src="reference_tables/azure_table.png" alt="Une tuile Azure Storage dans la section Charger ou importer des données d'un nouveau workflow de Reference Table" style="width:80%;">}}

Pour plus d'informations, consultez la [documentation sur l'intégration Azure][4].

**Remarque** : Le téléchargement depuis le stockage d'objets cloud prend en charge les fichiers jusqu'à 200 Mo.

[1]: https://app.datadoghq.com/integrations/azure
[2]: /fr/integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
[3]: https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#storage-blob-data-reader
[4]: /fr/integrations/azure/

{{% /collapse-content %}}
{{% collapse-content title="Stockage Google Cloud" level="h3" id="google-cloud-storage" %}}

### Stockage Google Cloud {#google-cloud-storage}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">Les tables de référence ne sont pas disponibles pour votre <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}})</div>
{{% /site-region %}}

1. Si vous n'avez pas configuré d'intégration Google Cloud avec Datadog ou si vous utilisez des fichiers d'ID de projet Google hérités (les projets hérités sont indiqués dans votre tuile d'intégration GCP), suivez les instructions pour configurer l'[intégration Google Cloud Platform][1]. Cela implique de créer un [compte de service Google Cloud][2].

1. Depuis la console Google Cloud, accédez à la page {{< ui >}}Cloud Storage{{< /ui >}}.

1. Trouvez le bucket auquel vous souhaitez accorder l'accès et cliquez dessus.

1. Cliquez sur l'onglet {{< ui >}}Permissions{{< /ui >}}. Sous « Afficher par principaux », cliquez sur le bouton {{< ui >}}Grant Access{{< /ui >}}.

1. Dans la fenêtre qui s'affiche, sous le champ « Nouveaux principaux », saisissez l'adresse e-mail du compte de service que vous avez créé et ajouté à la tuile GCP à l'étape 1. Sous « Attribuer des rôles », sélectionnez {{< ui >}}Storage Object Viewer{{< /ui >}} le rôle. Cliquez sur {{< ui >}}Save{{< /ui >}}.

{{< img src="reference_tables/grant_access.png" alt="Console Google Cloud montrant la configuration pour accorder l'accès" style="width:100%;" >}}

Après avoir examiné et attribué le rôle, vous pouvez importer dans les tables de référence depuis Google Cloud. Il peut s'écouler quelques minutes avant que votre configuration ne soit mise à jour dans Datadog.

{{< img src="reference_tables/gcp_table.png" alt="Sélectionnez GCP Storage dans Charger ou importer des données lors de la création d'une nouvelle Reference Table" style="width:100%;" >}}

**Remarque** : Le téléchargement depuis le stockage d'objets cloud prend en charge les fichiers jusqu'à 200 Mo.

[1]: /fr/integrations/google_cloud_platform/#setup
[2]: /fr/integrations/google_cloud_platform/#1-create-your-google-cloud-service-account

{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h3" id="terraform" %}}

Utilisez la ressource [`datadog_reference_table`][9] pour gérer les tables de référence en tant qu'infrastructure en tant que code. Configurez la ressource avec le schéma de votre tableau, les clés primaires et les détails d'accès au stockage cloud.

**Remarque** : Terraform prend en charge les mêmes limites de taille de fichier que les chargements vers le stockage cloud. Consultez [les limites des Reference Tables](#reference-table-limits) pour plus de détails.

[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/reference_table

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "API" %}}

Créez des Reference Tables par programmation à l'aide de l'[API Datadog][8].

Utilisez le [endpoint Créer une reference table][10] pour créer des Reference Tables à partir du stockage cloud ou de fichiers locaux.
- Pour les sources de stockage cloud (S3, Azure, GCS), fournissez `access_details` dans `file_metadata` pointant vers un fichier CSV dans le stockage cloud.
- Pour les fichiers locaux, appelez `POST /api/latest/reference-tables/uploads` pour obtenir un ID de chargement et charger vos données CSV. Ensuite, appelez le endpoint Créer une Reference Table avec le `upload_id` dans `file_metadata`.

**Remarque** : L'API prend en charge les mêmes limites de taille de fichier que les chargements vers le stockage cloud. Consultez [les limites des Reference Tables](#reference-table-limits) pour plus de détails.

Consultez [Créer, mettre à jour et supprimer une Reference Table avec l'API][11] pour une procédure complète de gestion d'une Reference Table basée sur un fichier CSV local avec l'API.

[8]: /fr/api/latest/reference-tables/
[10]: /fr/api/latest/reference-tables/#create-reference-table
[11]: /fr/reference_tables/guide/create-update-delete-reference-table-with-api/

{{% /tab %}}
{{% tab "Integrations" %}}

{{< partial name="reference_tables/ref-tables-saas-integrations.html" >}}

{{% /tab %}}
{{< /tabs >}}

Cette Reference Table peut être utilisée pour ajouter des attributs supplémentaires aux logs avec le [Lookup Processor][1].

## Règles de validation {#validation-rules}

Les noms de Reference Table et les en-têtes de colonne sont validés selon les conventions de nommage suivantes et automatiquement mis à jour ou normalisés, si nécessaire.

| Règle | Normalisation |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Les noms et les en-têtes ne peuvent pas être dupliqués.											| Les noms dupliqués sont énumérés. Par exemple, si `fileid` est utilisé deux fois comme nom, la première instance devient `fileid1` et la seconde instance devient `fileid2`. Si un nom ou un en-tête est énuméré et qu'il dépasse 56 caractères, il est rejeté et doit être renommé. |
| Les noms et les en-têtes ne peuvent pas contenir de lettres majuscules. 								| Les noms contenant des lettres majuscules sont convertis en minuscules. Cette conversion peut entraîner des noms en double, qui sont ensuite énumérés. Par exemple, `Fileid` et `FileID` deviennent tous deux `fileid` et sont énumérés en `fileid1` et `fileid2` respectivement. |
| Les noms et les en-têtes ne peuvent pas contenir d'espaces. 											| Les espaces autres que les espaces de début et de fin sont remplacés par des caractères de soulignement `_`. Les espaces de début et de fin sont supprimés. Par exemple, `customer names` est remplacé par `customer_names`. |
| Les noms et les en-têtes doivent commencer par une lettre minuscule. 							| Les caractères majuscules sont convertis en minuscules. Les caractères de début qui ne sont pas des lettres sont supprimés. Par exemple, `23Two_three` devient `two_three`.	|
| Les noms et les en-têtes ne prennent en charge que les lettres minuscules, les chiffres et le caractère `_`. | Les caractères non pris en charge sont remplacés par le caractère de soulignement `_`, sauf si cela enfreint l'une des règles ci-dessus. Dans ce cas, les caractères non pris en charge sont normalisés par la règle respective.				|
| Les noms et les en-têtes doivent comporter 56 caractères ou moins. 									| Aucune normalisation n'est effectuée. Les noms et les en-têtes comportant plus de 56 caractères sont rejetés et doivent être renommés. |

## Modifier une Reference Table {#modify-a-reference-table}

Pour modifier une Reference Table existante avec de nouvelles données, sélectionnez un tableau et cliquez sur {{< ui >}}Update Config{{< /ui >}} dans le coin supérieur droit.
Le CSV sélectionné est upserté dans le tableau, ce qui signifie que :

* Toutes les lignes existantes ayant la même clé primaire sont mises à jour
* Toutes les nouvelles lignes sont ajoutées
* Toutes les anciennes lignes qui ne figurent pas dans le nouveau fichier sont supprimées

Une fois le tableau enregistré, les lignes upsertées sont traitées de manière asynchrone et mises à jour dans l'aperçu. La mise à jour peut prendre jusqu'à 10 minutes.

## Exporter une table de référence {#export-a-reference-table}

Pour exporter une Reference Table, sélectionnez un tableau et cliquez sur {{< ui >}}Query in DDSQL Editor{{< /ui >}}. À partir de là, vous pouvez utiliser l'[Éditeur DDSQL][7] pour exporter vers CSV, Dashboard, et plus encore.

{{< img src="reference_tables/query_ddsql.png" alt="Aperçu du tableau avec un bouton bleu intitulé Query dans l'éditeur DDSQL positionné au-dessus des résultats." style="width:100%;" >}}

## Supprimer une Reference Table {#delete-a-reference-table}

Pour supprimer une Reference Table, sélectionnez un tableau, cliquez sur l'icône d'engrenage dans le coin supérieur droit, puis cliquez sur {{< ui >}}Delete Table{{< /ui >}}.
Le tableau et toutes les lignes associées sont supprimés.

S'il existe un processeur de correspondance utilisant une Reference Table pour l'enrichissement des logs, alors l'enrichissement s'arrête. Il peut s'écouler jusqu'à 10 minutes avant que l'enrichissement ne s'arrête.

## Surveiller l'activité de la Reference Table {#monitor-reference-table-activity}

Vous pouvez surveiller l'activité de la Reference Table avec [Audit Trail][2] ou [Change Events][3]. Pour afficher l'audit trail et les change events pour une Reference Table spécifique, sélectionnez le tableau et cliquez sur l'icône Settings à côté de {{< ui >}}Update Config{{< /ui >}}. Vous avez besoin d'autorisations de gestion d'organisation pour afficher la piste d'audit.

### Audit Trail {#audit-trail}

Utilisez l'Audit Trail pour les tables de référence afin de suivre les actions déclenchées par l'utilisateur. Les événements d'Audit Trail sont envoyés lorsqu'un utilisateur télécharge ou importe initialement un fichier CSV, ou lorsqu'un utilisateur crée, modifie ou supprime une Reference Table.

Le type d'actif `reference_table_file` affiche les événements d'importation/téléchargement et le type d'actif `reference_table` affiche les événements de Reference Table. La piste d'audit offre une observabilité sur le contenu d'une Reference Table.

### Change Events {#change-events}

Utilisez Change Events pour les tables de référence afin de suivre les actions automatisées ou déclenchées par l'utilisateur. Ils sont envoyés lorsqu'un fichier cloud est importé par un utilisateur ou par une actualisation automatique. (Le téléchargement d'un fichier local ne génère pas de Change Event.) Bien que les événements puissent suivre les actions déclenchées par l'utilisateur, ils sont principalement utilisés pour suivre les importations déclenchées lorsqu'une Reference Table extrait automatiquement un nouveau fichier CSV.

Les événements contiennent des informations sur le statut de réussite, le chemin d'accès et le nom du tableau de l'importation. Si une erreur se produit, des informations sur le type d'erreur sont fournies.

### Alerting {#alerting}

Pour être alerté des erreurs rencontrées lors des importations, utilisez les [Event Monitors][4] pour les Change Events des Reference Tables. Les Change Events des Reference Tables sont envoyés depuis la source `reference_tables`.

Vous pouvez créer des monitors depuis l'onglet {{< ui >}}Monitors{{< /ui >}}, ou cliquer sur l'icône Settings à côté de {{< ui >}}New Reference Table +{{< /ui >}} pour générer un monitor pré-rempli.

## Limites des Reference Tables {#reference-table-limits}
- Une Reference Table peut comporter jusqu'à 200 colonnes
- Une seule ligne ne peut pas dépasser 500 KiB
- La taille d'un fichier de Reference Table téléchargé via l'interface utilisateur peut atteindre 200 Mo
- La taille d'un fichier de Reference Table téléchargé via un fichier de bucket cloud peut atteindre 200 Mo
- La taille d'un fichier de Reference Table téléchargé via une intégration peut atteindre 200 Mo
- Vous pouvez avoir jusqu'à 100 Reference Tables par organisation

Contactez le [support][5] si vous avez un cas d'utilisation qui dépasse ces limites.

## Fréquence de mise à jour automatique {#automatic-update-frequency}

Les tables de référence peuvent être mises à jour automatiquement, selon la source de données :

- **Stockage de fichiers cloud** (Amazon S3, Azure Storage, Google Cloud Storage) : Toutes les 5 minutes
- **Intégrations** : Toutes les heures
- **Téléchargements manuels de CSV** : Les mises à jour automatiques ne sont pas prises en charge

## Autorisations {#permissions}

### Accès basé sur les rôles {#role-based-access}
Pour afficher les tables de référence, les utilisateurs ont besoin de l'autorisation `reference_tables_read`. Pour créer ou modifier des tables de référence, les utilisateurs ont besoin de l'autorisation `reference_tables_write`.

Pour plus d'informations sur les autorisations, consultez la [documentation RBAC][6].

### Contrôles d'accès granulaires {#granular-access-controls}
Restreignez l'accès à des tables individuelles en spécifiant une liste d'équipes, de rôles ou d'utilisateurs autorisés à les consulter ou à les modifier.

{{< img src="reference_tables/granular_permissions.png" alt="L'option de roue dentée Permissions qui permet de définir des autorisations d'accès granulaires sur un tableau" style="width:100%;">}}

1. Cliquez sur un tableau pour ouvrir sa page de détails.
2. Cliquez sur l'icône cog dans le coin supérieur droit.
3. Sélectionnez {{< ui >}}Permissions{{< /ui >}} dans le menu.
4. Cliquez {{< ui >}}Restrict Access{{< /ui >}}.
5. Utilisez le menu déroulant pour sélectionner une ou plusieurs équipes, un ou plusieurs rôles ou un ou plusieurs utilisateurs.
6. Cliquez sur {{< ui >}}Add{{< /ui >}}.
7. Sélectionnez soit {{< ui >}}Editor{{< /ui >}} soit {{< ui >}}Viewer{{< /ui >}}.
8. Cliquez sur {{< ui >}}Save{{< /ui >}} pour appliquer les modifications.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_configuration/processors/lookup_processor/
[2]: /fr/account_management/audit_trail/
[3]: /fr/events/
[4]: /fr/monitors/types/event/
[5]: /fr/help/
[6]: /fr/account_management/rbac/permissions/#reference-tables
[7]: /fr/ddsql_editor/#save-and-share-queries