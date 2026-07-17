---
aliases:
- /fr/logs/guide/enrichment-tables/
- /fr/logs/guide/reference-tables/
- /fr/integrations/guide/reference-tables
description: Combinez des métadonnées personnalisées avec les données de Datadog en
  téléchargeant des fichiers CSV ou en connectant un stockage cloud pour enrichir
  les journaux, les données de sécurité et les analyses.
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Utilisez le Lookup processor pour enrichir les journaux à partir d'une Reference
    Table.
- link: /logs/explorer/advanced_search#filter-logs-based-on-reference-tables
  tag: Documentation
  text: Filtrez les journaux en fonction des tables de référence.
- link: /sheets/#lookup
  tag: Documentation
  text: Sheets lookup
- link: /events/pipelines_and_processors/lookup_processor/
  tag: Documentation
  text: Lookup processor pour les événements.
- link: /cloud_cost_management/tag_pipelines/#map-multiple-tags
  tag: Documentation
  text: Utilisez les Reference Tables pour ajouter plusieurs tags aux données de coût.
- link: /metrics/reference_table_joins_with_metrics/
  tag: Documentation
  text: Découvrez les jointures de tables de référence avec des métriques.
- link: https://www.datadoghq.com/blog/add-context-with-reference-tables/
  tag: Blog
  text: Ajoutez plus de contexte à vos logs avec les tables de référence
- link: https://www.datadoghq.com/blog/reference-tables/
  tag: Blog
  text: Enrichissez votre télémétrie Datadog existante avec des métadonnées personnalisées
    en utilisant des tables de référence.
- link: https://www.datadoghq.com/blog/add-context-with-reference-tables-in-cloud-siem/
  tag: Blog
  text: Ajoutez plus de contexte aux détections et enquêtes Cloud SIEM avec les tables
    de référence Datadog.
- link: https://www.datadoghq.com/blog/observability-pipelines-servicenow-cmdb-enrichment
  tag: Blog
  text: Enrichissez les journaux avec le contexte CMDB de ServiceNow avant de les
    acheminer vers tout SIEM ou outil de journalisation.
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: Blog
  text: Simplifiez la collecte et l'agrégation des journaux pour les MSSP avec les
    pipelines d'observabilité Datadog.
title: Tables de référence.
---
## Aperçu {#overview}

Les tables de référence vous permettent de combiner des métadonnées personnalisées avec des informations déjà présentes dans Datadog. Vous pouvez définir de nouvelles entités telles que des détails clients, des noms de services et des informations, ou des adresses IP en téléchargeant un fichier CSV contenant un tableau d'informations. Les entités sont représentées par une clé primaire dans une table de référence et les métadonnées associées.

{{< img src="reference_tables/reference_table.png" alt="Une table de référence avec des données peuplées dans les colonnes pour l'identifiant d'organisation, le nom de l'organisation, l'organisation parente, le propriétaire du compte et le CSM." style="width:100%;">}}

Vous pouvez par exemple :

- **Enrichissez les journaux et les données de sécurité pour des enquêtes plus rapides :** Corrélez les journaux, les traces et les événements de sécurité avec un contexte commercial à jour—tel que les noms de clients, les propriétaires de comptes, les renseignements sur les menaces ou les descriptions de codes d'erreur—pour accélérer le dépannage et l'analyse.
- **Segmentez les utilisateurs et les ressources pour des analyses ciblées et une gestion des coûts:** regroupez les utilisateurs, les clients ou les ressources cloud en segments significatifs (comme les niveaux d'utilisateurs, les équipes ou les unités commerciales) pour des analyses de produits plus approfondies et une attribution précise des coûts en utilisant des outils comme Tag Pipelines.
- **Améliorez les données pour des requêtes et des rapports avancés:** effectuez une jointure de données externes issues des Reference Tables dans Sheets, DDSQL Editor ou Notebooks pour réaliser des requêtes complexes, des agrégations et créer des rapports personnalisés sans expertise technique.

## Créer une table de référence {#create-a-reference-table}

Datadog prend en charge les sources de données suivantes : y compris les intégrations et le téléchargement manuel de fichiers CSV :

{{< tabs >}}
{{% tab "Téléchargement manuel " %}}

Cliquez sur **New Reference Table +**, puis téléchargez un fichier CSV, nommez les colonnes appropriées et définissez la clé primaire pour les lookups.

{{< img src="reference_tables/schema_setup.png" alt="La section Définir le schéma montrant un tableau avec org_id marqué comme clé primaire et des colonnes avec des données pour l'ID d'organisation, le nom de l'organisation, l'organisation parente, le propriétaire du compte et le CSM " style="width:100%;">}}

**Remarque** : La méthode de téléchargement manuel de fichiers CSV prend en charge des fichiers allant jusqu'à 4 Mo.

{{% /tab %}}
{{% tab "Stockage dans le cloud" %}}

{{% collapse-content title="Amazon S3" level="h4" id="amazon-s3" %}}

Les Reference Tables peuvent automatiquement récupérer un fichier CSV à partir d'un bucket Amazon S3 pour maintenir vos données à jour. L'intégration recherche des modifications dans le fichier CSV dans S3, et lorsque le fichier est mis à jour, il remplace la table de référence par les nouvelles données. Cela permet également la mise à jour via l'API S3 une fois que la Reference Table initiale est configurée. **Remarque** : Les tables de référence ne sont pas remplacées si le contenu du fichier CSV reste inchangé.

Pour mettre à jour les tables de référence depuis S3, Datadog utilise le rôle IAM dans votre compte AWS que vous avez configuré pour l'[intégration AWS][1]. Si vous n'avez pas encore créé ce rôle, [suivez ces étapes][2] pour le faire. Pour permettre à ce rôle de mettre à jour vos tables de référence, ajoutez la déclaration de permission suivante à ses politiques IAM. Assurez-vous de modifier les noms de bucket pour correspondre à votre environnement.

**Remarque** : Si vous utilisez le chiffrement côté serveur, vous pouvez télécharger des tables de référence chiffrées avec des clés gérées par Amazon S3 (SSE-S3) ou des clés du service de gestion des clés AWS (SSE-KMS).

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
#### Définir la table {#define-the-table}

Cliquez sur **New Reference Table +**, puis ajoutez un nom, sélectionnez Amazon S3, remplissez tous les champs, cliquez sur importer et définissez la clé primaire pour les lookups.

{{< img src="reference_tables/s3_table.png" alt="La section télécharger vos données avec la tuile Amazon S3 sélectionnée et les données remplies pour le compte AWS, le bucket et le chemin" style="width:100%;">}}

**Remarque** : La méthode de téléchargement depuis un bucket S3 prend en charge des fichiers allant jusqu'à 200 Mo.

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=automaticcloudformation#installation

{{% /collapse-content %}}
{{% collapse-content title="Stockage Azure" level="h4" id="azure-storage" %}}

1. Si vous ne l'avez pas déjà fait, configurez l'[intégration Azure][1] dans l'abonnement qui détient le compte de stockage à partir duquel vous souhaitez importer votre table de référence. Cela implique de [créer un enregistrement d'application avec lequel Datadog peut][2] s'intégrer.
2. Dans le portail Azure, sélectionnez le compte de stockage qui contient vos fichiers de table de référence.
3. Dans votre compte de stockage, accédez à **Contrôle d'accès (IAM)** et sélectionnez **Ajouter** > **Ajouter une attribution de rôle**.
4. Saisissez et sélectionnez le rôle **Lecteur de données de blob de stockage**. Le [rôle Lecteur de données de blob de stockage][3] permet à Datadog de lire et de lister les conteneurs de stockage et les blobs.
5. Dans l'onglet **Membres**, cliquez sur **+ Select members**. Sélectionnez l'enregistrement d'application que vous avez créé à l'étape 1.

   {{< img src="reference_tables/add_members.png" alt="La section Membres dans le portail Azure où un membre est sélectionné et des données sont remplies pour le Nom, l'ID d'objet et le Type" style="width:85%;">}}

Après avoir examiné et attribué le rôle, vous pouvez importer dans les tables de référence depuis Azure. Il peut falloir quelques minutes pour que votre configuration Azure se mette à jour dans Datadog.

{{< img src="reference_tables/azure_table.png" alt="Une tuile de stockage Azure dans la section Télécharger ou importer des données d'un nouveau flux de travail de table de référence" style="width:80%;">}}

Pour plus d'informations, consultez la [documentation sur l'intégration Azure][4].

**Remarque** : Le téléchargement depuis le stockage d'objets cloud prend en charge des fichiers allant jusqu'à 200 Mo.

[1]: https://app.datadoghq.com/integrations/azure
[2]: /fr/integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
[3]: https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#storage-blob-data-reader
[4]: /fr/integrations/azure/

{{% /collapse-content %}}
{{% collapse-content title="Stockage Google Cloud" level="h4" id="google-cloud-storage" %}}

### Stockage Google Cloud {#google-cloud-storage}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">Les Reference Tables ne sont pas disponibles pour votre <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}})</div>
{{% /site-region %}}

1. Si vous n'avez pas configuré d'intégration Google Cloud avec Datadog ou si vous utilisez des fichiers d'ID de projet Google hérités (les projets hérités sont indiqués dans votre tuile d'intégration GCP), suivez les instructions pour configurer l'[intégration Google Cloud Platform][1]. Cela implique de créer un [compte de service Google Cloud][2].

1. Depuis la console Google Cloud, accédez à la page **Stockage Cloud**.

1. Trouvez le bucket auquel vous souhaitez accorder l'accès et cliquez dessus.

1. Cliquez sur l'onglet **Permissions**. Sous "View By Principals", cliquez sur le bouton **Grant Access**.

1. Dans la fenêtre qui apparaît, sous le champ "Nouveaux principaux", entrez l'adresse e-mail du compte de service que vous avez créé et ajouté au panneau GCP à l'étape 1. Sous "Attribuer des rôles", sélectionnez le rôle **Visionneuse d'objets de stockage**. Cliquez sur **Enregistrer**.

{{< img src="reference_tables/grant_access.png" alt="Console Google Cloud montrant la configuration pour accorder l'accès" style="width:100%;" >}}

Après avoir examiné et attribué le rôle, vous pouvez importer dans Reference Tables depuis Google Cloud. Il peut falloir quelques minutes pour que votre configuration se mette à jour dans Datadog.

{{< img src="reference_tables/gcp_table.png" alt="Sélectionnez GCP Storage dans Télécharger ou importer des données lors de la création d'une nouvelle table de référence" style="width:100%;" >}}

**Remarque** : Le téléchargement depuis le stockage d'objets cloud prend en charge des fichiers allant jusqu'à 200 Mo.

[1]: /fr/integrations/google_cloud_platform/#setup
[2]: /fr/integrations/google_cloud_platform/#1-create-your-google-cloud-service-account

{{% /collapse-content %}}
{{% collapse-content title="Terraform" level="h4" id="terraform" %}}

Utilisez la ressource [`datadog_reference_table`][9] pour gérer les tables de référence en tant qu'infrastructure en tant que code. Configurez la ressource avec le schéma de votre table, les clés primaires et les détails d'accès au Stockage Cloud.

**Remarque** : Terraform prend en charge les mêmes limites de taille de fichier que les téléchargements de stockage cloud. Voir [Reference Table limits](#reference-table-limits) pour plus de détails.

[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/reference_table

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "API" %}}

Créez des tables de référence de manière programmatique en utilisant l'[API Datadog][8].

Utilisez le [point de terminaison Créer une Table de Référence][10] pour créer des tables de référence à partir du stockage cloud ou de fichiers locaux.
- Pour les sources de stockage cloud (S3, Azure, GCS), fournissez `access_details` dans `file_metadata` pointant vers un fichier CSV dans le stockage cloud.
- Pour les fichiers locaux, appelez `POST /api/latest/reference-tables/uploads` pour obtenir un ID de téléchargement et téléchargez vos données CSV. Ensuite, appelez le point de terminaison Créer une Table de Référence avec le `upload_id` dans `file_metadata`.

**Remarque** : L'API prend en charge les mêmes limites de taille de fichier que les téléchargements de stockage cloud. Voir [Limites des Tables de Référence](#reference-table-limits) pour plus de détails.

[8]: /fr/api/latest/reference-tables/
[10]: /fr/api/latest/reference-tables/#create-reference-table

{{% /tab %}}
{{% tab "Les intégrations" %}}

{{< partial name="reference_tables/ref-tables-saas-integrations.html" >}}

{{% /tab %}}
{{< /tabs >}}

Cette Reference Table peut être utilisée pour ajouter des attributs supplémentaires aux journaux avec le [Lookup Processor][1].

## Règles de validation {#validation-rules}

Les noms de tableau de référence et les en-têtes de colonne sont validés selon les conventions de nommage suivantes et mis à jour ou normalisés automatiquement, si nécessaire.

| Règle     | Normalisation |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Les noms et en-têtes ne peuvent pas être dupliqués.											| Les noms dupliqués sont énumérés. Par exemple, si `fileid` est utilisé deux fois comme nom, la première instance devient `fileid1` et la seconde instance devient `fileid2`. Si un nom ou un en-tête est énuméré et dépasse 56 caractères, il est rejeté et doit être renommé. |
| Les noms et en-têtes ne peuvent pas contenir de lettres majuscules. 								| Les noms avec des lettres majuscules sont convertis en minuscules. Cette conversion peut entraîner des noms dupliqués, qui sont ensuite énumérés. Par exemple, `Fileid` et `FileID` deviennent tous deux `fileid` et sont énumérés en `fileid1` et `fileid2` respectivement. |
| Les noms et en-têtes ne peuvent pas contenir d'espaces. 											| Les espaces autres que les espaces de début et de fin sont remplacés par des caractères de soulignement `_`. Les espaces de début et de fin sont supprimés. Par exemple, `customer names` est remplacé par `customer_names`. |
| Les noms et en-têtes doivent commencer par une lettre minuscule. 							| Les caractères majuscules sont convertis en minuscules. Les caractères non alphabétiques en tête sont supprimés. Par exemple, `23Two_three` devient `two_three`.	|
| Les noms et en-têtes ne supportent que les lettres minuscules, les chiffres et le caractère `_`. | Les caractères non pris en charge sont remplacés par le caractère souligné `_`, sauf si cela enfreint l'une des règles ci-dessus. Dans ce cas, les caractères non pris en charge sont normalisés selon la règle respective.				|
| Les noms et en-têtes doivent comporter 56 caractères ou moins. 									| Aucune normalisation n'est effectuée. Les noms et en-têtes qui contiennent plus de 56 caractères sont rejetés et doivent être renommés. |

## Modifier une table de référence {#modify-a-reference-table}

Pour modifier une table de référence existante avec de nouvelles données, sélectionnez une table et cliquez sur **Mettre à jour la configuration** dans le coin supérieur droit.
Le CSV sélectionné est inséré dans la table, ce qui signifie que :

* Toutes les lignes existantes avec la même clé primaire sont mises à jour
* Toutes les nouvelles lignes sont ajoutées
* Toutes les anciennes lignes qui ne figurent pas dans le nouveau fichier sont supprimées

Une fois la table enregistrée, les lignes insérées sont traitées de manière asynchrone et mises à jour dans l'aperçu. Cela peut prendre jusqu'à 10 minutes pour que la mise à jour soit terminée.

## Exporter une table de référence {#export-a-reference-table}

Pour exporter une table de référence, sélectionnez une table et cliquez sur **Interroger dans l'éditeur DDSQL**. À partir de là, vous pouvez utiliser l'[éditeur DDSQL][7] pour exporter vers CSV, Dashboard, et plus encore.

{{< img src="reference_tables/query_ddsql.png" alt="Aperçu de la table avec un bouton bleu étiqueté Interroger dans l'éditeur DDSQL positionné au-dessus des résultats." style="width:100%;" >}}

## Supprimer une table de référence {#delete-a-reference-table}

Pour supprimer une table de référence, sélectionnez une table, cliquez sur l'icône d'engrenage dans le coin supérieur droit, puis cliquez sur **Supprimer la table**.
La table et toutes les lignes associées sont supprimées.

S'il y a un processeur de recherche utilisant une table de référence pour l'enrichissement des journaux, alors l'enrichissement s'arrête. Cela peut prendre jusqu'à 10 minutes pour que l'enrichissement s'arrête.

## Surveiller l'activité de la table de référence {#monitor-reference-table-activity}

Vous pouvez surveiller l'activité de la table de référence avec [Audit Trail][2] ou [Change Events][3]. Pour voir l'audit et les événements de changement pour une table de référence spécifique, sélectionnez la table et cliquez sur l'icône des paramètres à côté de **Mettre à jour la configuration**. Vous avez besoin des autorisations de gestion d'organisation pour voir l'audit.

### Journal d'audit {#audit-trail}

Utilisez le journal d'audit des tables de référence pour suivre les actions déclenchées par les utilisateurs. Les événements du journal d'audit sont envoyés lorsqu'un utilisateur télécharge ou importe initialement un fichier CSV, ou lorsqu'un utilisateur crée, modifie ou supprime une table de référence.

Le `reference_table_file` Type d'actif affiche les événements d'importation/téléchargement et le `reference_table` Type d'actif affiche les événements de la table de référence. Le journal d'audit fournit une visibilité sur le contenu d'une table de référence.

### Événements de changement {#change-events}

Utilisez les événements de changement pour les tables de référence pour suivre les actions automatisées ou déclenchées par les utilisateurs. Ils sont envoyés lorsqu'un fichier cloud est importé par un utilisateur ou lors d'un rafraîchissement automatique. (Le téléchargement d'un fichier local ne génère pas d'événement de changement.) Bien que les événements puissent suivre les actions déclenchées par les utilisateurs, ils sont principalement utilisés pour suivre les importations déclenchées lorsque une table de référence tire automatiquement un nouveau fichier CSV.

Les événements contiennent des informations sur le statut de succès, le chemin et le nom de la table de l'importation. Si une erreur se produit, des informations sur le type d'erreur sont fournies.

### Alerte {#alerting}

Pour être alerté des erreurs rencontrées lors des importations, utilisez les [Moniteurs d'Événements][4] pour les événements de changement de table de référence. Les événements de changement de table de référence sont envoyés depuis la source `reference_tables`.

Vous pouvez créer des moniteurs depuis l'onglet **Moniteurs**, ou cliquer sur l'icône des Paramètres à côté de **Nouvelle Table de Référence +** pour générer un moniteur pré-rempli.

## Limites de la Table de Référence {#reference-table-limits}
- Une table de référence peut avoir jusqu'à 50 colonnes
- La taille d'un fichier de table de référence téléchargé via l'interface utilisateur peut atteindre 4 Mo
- La taille d'un fichier de table de référence téléchargé via un fichier de bucket cloud peut atteindre 200 Mo
- La taille d'un fichier de table de référence téléchargé via une intégration peut atteindre 200 Mo
- Vous pouvez avoir jusqu'à 100 tables de référence par organisation

Contactez [le support][5] si vous avez un cas d'utilisation qui dépasse ces limites.

## Fréquence de mise à jour automatique {#automatic-update-frequency}

Les tables de référence peuvent être mises à jour automatiquement, en fonction de la source de données :

- **Stockage de fichiers cloud** (Amazon S3, Azure Storage, Google Cloud Storage) : Toutes les 5 minutes
- **Intégrations** : Chaque heure
- **Téléchargements manuels de CSV** : Les mises à jour automatiques ne sont pas prises en charge

## Permissions {#permissions}

### Accès basé sur les rôles {#role-based-access}
Pour voir les tables de référence, les utilisateurs nécessitent la permission `reference_tables_read`. Pour créer ou modifier des tables de référence, les utilisateurs ont besoin de la permission `reference_tables_write`.

Pour plus d'informations sur les permissions, consultez la [documentation RBAC][6].

### Contrôles d'accès granulaires {#granular-access-controls}
Restreindre l'accès à des tables individuelles en spécifiant une liste d'équipes, de rôles ou d'utilisateurs autorisés à les consulter ou à les modifier.

{{< img src="reference_tables/granular_permissions.png" alt="L'option de l'engrenage des permissions qui permet de définir des permissions d'accès granulaires sur une table" style="width:100%;">}}

1. Cliquez sur une table pour ouvrir sa page de détails.
2. Cliquez sur l'icône d'engrenage dans le coin supérieur droit.
3. Sélectionnez **Permissions** dans le menu.
4. Cliquez sur **Restreindre l'accès**.
5. Utilisez le menu déroulant pour sélectionner une ou plusieurs équipes, rôles ou utilisateurs.
6. Cliquez sur **Ajouter**.
7. Sélectionnez soit **Éditeur** soit **Lecteur**.
8. Cliquez sur **Enregistrer** pour appliquer les modifications.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_configuration/processors/lookup_processor/
[2]: /fr/account_management/audit_trail/
[3]: /fr/events/
[4]: /fr/monitors/types/event/
[5]: /fr/help/
[6]: /fr/account_management/rbac/permissions/#reference-tables
[7]: /fr/ddsql_editor/#save-and-share-queries