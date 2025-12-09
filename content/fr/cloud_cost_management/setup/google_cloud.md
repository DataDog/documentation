---
aliases:
- /fr/cloud_cost_management/google_cloud/
disable_toc: false
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Cloud Cost Management
- link: /cloud_cost_management/setup/aws
  tag: Documentation
  text: Mieux comprendre votre facture AWS
- link: /cloud_cost_management/azure
  tag: Documentation
  text: Mieux comprendre votre facture Azure
- link: /cloud_cost_management/oracle
  tag: Documentation
  text: Mieux comprendre votre facture Oracle
title: Google Cloud
---


## Présentation

Pour utiliser Google Cloud Cost Management dans Datadog, suivez ces étapes :
1. Configurer l'[intégration Google Cloud Platform][12]
2. Configurer l'[exportation des coûts d'utilisation détaillés][13] avec les autorisations nécessaires (API de services Google, accès au projet d'exportation et accès à l'ensemble de données BigQuery)
3. Créer ou sélectionner un [bucket Google Cloud Storage][15] avec les autorisations nécessaires (accès au bucket)

## Configuration

### Configurer l'intégration de Google Cloud Platform 
Accédez à [Setup & Configuration][3], et sélectionnez une intégration Google Cloud Platform.
Si vous ne voyez pas le compte de service souhaité dans la liste, accédez à l'[intégration Google Cloud Platform][4] pour le configurer.

<div class="alert alert-danger">
L'intégration Google Cloud Platform de Datadog permet à Cloud Costs de surveiller automatiquement tous les projets auxquels ce compte de service a accès.
Pour limiter les hosts de surveillance d'infrastructure pour ces projets, appliquez des tags aux hosts. Définissez ensuite si les tags doivent être inclus ou exclus de la surveillance dans la section <strong>Limit Metric Collection Filters</strong> de la page d'intégration.
</div>

{{< img src="cloud_cost/gcp_integration_limit_metric_collection.png" alt="Section des filtres de limitation de collecte de métriques configurée dans la page d'intégration Google Cloud Platform" >}}

### Activer l'exportation des coûts d'utilisation détaillés
<div class="alert alert-info">
Les <a href="https://cloud.google.com/billing/docs/how-to/export-data-bigquery-tables/detailed-usage">données de coûts d'utilisation détaillés</a> fournissent toutes les informations incluses dans les données de coûts d'utilisation standard, ainsi que des champs supplémentaires qui fournissent des données de coûts granulaires au niveau des ressources.
</div>

 1. Accédez à [Billing Export][1] sous *Billing* dans la console Google Cloud.
 2. Activez l'exportation [Detailed Usage cost][2] (sélectionnez ou créez un projet et un ensemble de données BigQuery).
 3. Notez le `Billing Account ID` du compte de facturation où l'exportation a été configurée, ainsi que le `Project ID` et le `Dataset Name` de l'exportation.

{{< img src="cloud_cost/billing_export.png" alt="Informations sur le projet et l'ensemble de données Google Cloud mises en surbrillance" >}}

_Les ensembles de données d'exportation de facturation BigQuery nouvellement créés ne contiennent que les deux derniers mois de données. Il peut falloir un jour ou deux pour que ces données soient remplies dans BigQuery._

#### Activer les API de services Google
Les autorisations suivantes permettent à Datadog d'accéder et de transférer l'exportation de facturation dans le bucket de stockage à l'aide d'une requête BigQuery planifiée.

- Activez l'[API BigQuery][5].
  1. Dans la console Google Cloud, accédez à la page de sélection de projet et sélectionnez votre projet Google Cloud.
  2. Activez la facturation sur votre projet pour tous les transferts.

- Activez le [service BigQuery Data Transfer][5].
  1. Ouvrez la page de l'API BigQuery Data Transfer dans la bibliothèque d'API.
  2. Dans le menu déroulant, sélectionnez le projet qui contient le compte de service.
  3. Cliquez sur le bouton ENABLE.

  **Remarque** : l'API BigQuery Data Transfer doit être activée sur le projet Google qui contient le compte de service.


#### Configurer l'accès au projet d'exportation
[Ajoutez le compte de service en tant que principal sur la ressource de projet d'ensemble de données d'exportation][7] :
1. Accédez à la page IAM dans la console Google Cloud et sélectionnez le projet d'ensemble de données d'exportation.
2. Sélectionnez le compte de service en tant que principal.
3. Sélectionnez un rôle avec les autorisations suivantes à accorder dans la liste déroulante :
  * `bigquery.jobs.create`
  * `bigquery.transfers.get`
  * `bigquery.transfers.update`

  **Remarque** : il peut s'agir d'un rôle personnalisé, ou vous pouvez utiliser le rôle Google Cloud existant `roles/bigquery.admin`.

#### Configurer l'accès à l'ensemble de données BigQuery d'exportation
[Ajoutez le compte de service en tant que principal sur la ressource d'ensemble de données BigQuery d'exportation][8] :
1. Dans le volet Explorer de la page BigQuery, développez votre projet et sélectionnez l'ensemble de données BigQuery d'exportation.
2. Cliquez sur **Sharing > Permissions**, puis sur **add principal**.
3. Dans le champ new principals, saisissez le compte de service.
4. À l'aide de la liste select a role, attribuez un rôle avec les autorisations suivantes :
  * `bigquery.datasets.get`
  * `bigquery.tables.create`
  * `bigquery.tables.delete`
  * `bigquery.tables.export`
  * `bigquery.tables.get`
  * `bigquery.tables.getData`
  * `bigquery.tables.list`
  * `bigquery.tables.update`
  * `bigquery.tables.updateData`

  **Remarque** : il peut s'agir d'un rôle personnalisé, ou vous pouvez utiliser le rôle Google Cloud existant `roles/bigquery.dataEditor`.

### Créer ou sélectionner un bucket Google Cloud Storage
Utilisez un bucket Google Cloud Storage existant ou créez-en un nouveau.
Les données sont extraites régulièrement de votre ensemble de données BigQuery Detailed Usage Cost vers le bucket sélectionné et préfixées avec `datadog_cloud_cost_detailed_usage_export`.

**Remarque** : le bucket [doit être colocalisé][9] avec l'ensemble de données d'exportation BigQuery.

#### Configurer l'accès au bucket
[Ajoutez le compte de service en tant que principal sur la ressource de bucket GCS][6] :
1. Accédez à la page Cloud Storage Buckets dans la console Google Cloud et sélectionnez votre bucket.
2. Sélectionnez l'onglet permissions et cliquez sur le bouton **grant access**.
3. Dans le champ new principals, saisissez le compte de service.
4. Attribuez un rôle avec les autorisations suivantes :
   * `storage.buckets.get`
   * `storage.objects.create`
   * `storage.objects.delete`
   * `storage.objects.get`
   * `storage.objects.list`

  **Remarque** : il peut s'agir d'un rôle personnalisé, ou vous pouvez utiliser les rôles Google Cloud existants `roles/storage.legacyObjectReader` et `roles/storage.legacyBucketWriter`.

### (Facultatif) Configurer l'autorisation de compte de service inter-projets :
Si votre compte de service intégré existe dans un projet Google Cloud Platform différent de votre ensemble de données d'exportation de facturation, vous devez [accorder une autorisation de compte de service inter-projets][10] :

1. Déclenchez la création de l'agent de service en suivant la [documentation officielle][11] en utilisant les valeurs suivantes :
   * ENDPOINT : `bigquerydatatransfer.googleapis.com`
   * RESOURCE_TYPE : `project`
   * RESOURCE_ID : projet d'ensemble de données d'exportation<br><br>

     Cela crée un nouvel agent de service qui ressemble à `service-<billing project (projet) number>@gcp-sa-bigquerydatatransfer.iam.gserviceaccount.com`.


2. Ajoutez le rôle de compte de service BigQuery Data Transfer créé par le déclencheur en tant que principal sur votre compte de service
3. Attribuez-lui le rôle `roles/iam.serviceAccountTokenCreator`.

### Configurer Cloud Cost
Continuez à suivre les étapes indiquées dans [Setup & Configuration][3].

**Remarque** : les données peuvent prendre 48 à 72 heures après la configuration pour se stabiliser dans Datadog.

### Obtenir des données historiques

Les ensembles de données d'exportation de facturation BigQuery nouvellement créés ne contiennent que les 2 derniers mois de données. Il peut falloir un jour ou deux pour que ces données soient remplies dans BigQuery. Datadog ingère automatiquement jusqu'à 15 mois de données de coûts historiques disponibles une fois qu'elles apparaissent dans la table BigQuery.

Google Cloud ne fournit pas de processus pour remplir des données historiques supplémentaires au-delà des 2 mois automatiquement inclus lors de la première création de l'exportation BigQuery.

## Types de coûts
Vous pouvez visualiser vos données ingérées en utilisant les types de coûts suivants :

| Type de coût                                       | Description |
|-------------------------------------------------| ----------------------------------|
| `gcp.cost.amortized`                            | Coût total des ressources allouées au moment de l'utilisation sur un intervalle. Les coûts incluent les crédits de promotion ainsi que les crédits de remise d'utilisation engagée. |
| `gcp.cost.amortized.shared.resources.allocated` | Tous vos coûts amortis Google Cloud Platform, avec des ventilations et des informations supplémentaires pour les charges de travail de conteneurs. Nécessite l'[allocation des coûts de conteneurs][14].|
| `gcp.cost.ondemand`                             | Coût public total à la demande des ressources avant l'application des remises publiques et privées sur un intervalle. |

### Tags par défaut

Datadog enrichit automatiquement vos données de coûts Google Cloud avec des tags provenant de plusieurs sources. Pour un aperçu complet de la façon dont les tags sont appliqués aux données de coûts, consultez la section [Tags][17].

Les tags prêts à l'emploi suivants sont dérivés de votre [rapport de coûts d'utilisation détaillés][16] et facilitent la découverte et la compréhension des données de coûts :

| Nom du tag                         | Description du tag       |
| ---------------------------- | ----------------- |
| `google_product`             | Le service Google facturé.|
| `google_cost_type`           | Le type de frais couvert par cet élément (par exemple, regular, tax, adjustment ou rounding error).|
| `google_usage_type`          | Les détails d'utilisation de l'élément (par exemple, Standard Storage US).|
| `google_location`            | L'emplacement associé à l'élément au niveau d'une multi-région, d'un pays, d'une région ou d'une zone.|
| `google_region`              | La région associée à l'élément.|
| `google_zone`                | La zone de disponibilité associée à l'élément.|
| `google_pricing_usage_unit`  | L'unité de tarification utilisée pour calculer le coût d'utilisation (par exemple, gibibyte, tebibyte ou year).|
| `google_is_unused_reservation`| Si l'utilisation a été réservée mais non utilisée.|
| `service_description` | Le service Google Cloud (tel que Compute Engine ou BigQuery). |
| `project_id` | L'ID du projet Google Cloud qui a généré les données de facturation Cloud. |
| `project_name` | Le nom du projet Google Cloud qui a généré les données de facturation Cloud. |
| `cost_type` | Le type de coût que représente cette ligne : `regular`, `tax`, `adjustment` ou `rounding error`. |
| `sku_description` | Une description du type de ressource utilisé, décrivant les détails d'utilisation de la ressource. |
| `resource_name` | Un nom que les clients ajoutent aux ressources. Cela peut ne pas être sur toutes les ressources. |
| `global_resource_name` | Un identifiant de ressource unique au niveau mondial généré par Google Cloud. |

#### Corrélation entre les coûts et les données d'observabilité

Visualiser les coûts dans le contexte des données d'observabilité est important pour comprendre comment les changements d'infrastructure impactent les coûts, identifier pourquoi les coûts changent et optimiser l'infrastructure à la fois pour les coûts et les performances. Datadog met à jour les tags d'identification de ressources sur les données de coûts pour les principaux produits Google afin de simplifier la corrélation entre les métriques d'observabilité et de coûts.

Par exemple, pour voir le coût et l'utilisation de chaque base de données Cloud SQL, vous pouvez créer un tableau avec `gcp.cost.amortized`, `gcp.cloudsql.database.cpu.utilization` et `gcp.cloudsql.database.memory.utilization` (ou toute autre métrique Cloud SQL) et regrouper par `database_id`. Ou, pour voir l'utilisation et les coûts de Cloud Function côte à côte, vous pouvez représenter graphiquement `gcp.cloudfunctions.function.execution_count` et `gcp.cost.amortized` regroupés par `function_name`.

Les tags prêts à l'emploi suivants sont disponibles : | Produit Google | Tag(s) | | -------------------| ----------------------------- | | Compute Engine | `instance_id`, `instance-type`| | Cloud Functions | `function_name` | | Cloud Run | `job_name`, `service_name` | | Cloud SQL | `database_id` | | Cloud Spanner | `instance_id` | | App Engine | `module_id` | | BigQuery | `project_id`, `dataset_id` | | Kubernetes Engine | `cluster_name` |

### Allocation des conteneurs
**Les mesures d'allocation des conteneurs** contiennent les mêmes coûts que les mesures de Google Cloud Platform, mais avec des ventilations et des informations supplémentaires pour les charges de travail des conteneurs. Voir [Container Cost Allocation][14] pour plus de détails.

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://console.cloud.google.com/billing/export/
[2]: https://cloud.google.com/billing/docs/how-to/export-data-bigquery-setup
[3]: https://app.datadoghq.com/cost/setup?cloud=gcp
[4]: https://app.datadoghq.com/integrations/google-cloud-platform
[5]: https://cloud.google.com/bigquery/docs/enable-transfer-service
[6]: https://cloud.google.com/storage/docs/access-control/using-iam-permissions#bucket-add
[7]: https://cloud.google.com/iam/docs/granting-changing-revoking-access#grant-single-role
[8]: https://cloud.google.com/bigquery/docs/control-access-to-resources-iam#grant_access_to_a_dataset
[9]: https://cloud.google.com/bigquery/docs/exporting-data#data-locations
[10]: https://cloud.google.com/bigquery/docs/enable-transfer-service#cross-project_service_account_authorization
[11]: https://cloud.google.com/iam/docs/create-service-agents#create
[12]: /fr/integrations/google_cloud_platform/
[13]: /fr/cloud_cost_management/setup/google_cloud/#enable-detailed-usage-cost-export
[14]: /fr/cloud_cost_management/container_cost_allocation/
[15]: /fr/cloud_cost_management/setup/google_cloud/#create-or-select-a-google-cloud-storage-bucket
[16]: https://cloud.google.com/billing/docs/how-to/export-data-bigquery-tables/detailed-usage
[17]: /fr/cloud_cost_management/tags