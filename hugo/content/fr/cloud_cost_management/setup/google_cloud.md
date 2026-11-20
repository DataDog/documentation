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
  text: Obtenez des informations sur votre facture AWS
- link: /cloud_cost_management/azure
  tag: Documentation
  text: Obtenez des informations sur votre facture Azure
- link: /cloud_cost_management/oracle
  tag: Documentation
  text: Obtenez des informations sur votre facture Oracle
title: Google Cloud
---
## Présentation {#overview}

Pour utiliser Google Cloud Cost Management dans Datadog, suivez ces étapes :
1. Configurez l'[intégration Google Cloud Platform][12]
2. Configurez l'[exportation détaillée des coûts d'utilisation][13] avec les autorisations nécessaires (les APIs Google Service, accès au projet d'exportation et accès au jeu de données BigQuery)
3. Créez ou sélectionnez un [bucket Google Cloud Storage][15] avec les autorisations nécessaires (accès au bucket)

## Configuration {#setup}

Vous pouvez effectuer la configuration en utilisant l'[API][18], [Terraform][19], ou directement dans Datadog en suivant les instructions ci-dessous.

### Configurez l'intégration Google Cloud Platform {#configure-the-google-cloud-platform-integration}
Accédez à [Setup & Configuration][3], ajoutez un compte Google Cloud Platform et suivez les étapes pour configurer l'intégration Google Cloud Platform.

<div class="alert alert-danger">
L'intégration Datadog Google Cloud Platform permet à Cloud Costs de surveiller automatiquement tous les projets auxquels ce compte de service a accès.
Pour limiter les hosts de surveillance de l'infrastructure pour ces projets, appliquez des tags aux hosts. Définissez ensuite si les tags doivent être inclus ou exclus de la surveillance dans la section {{< ui >}}Limit Metric Collection Filters{{< /ui >}} de la page d'intégration.
</div>

{{< img src="cloud_cost/gcp_integration_limit_metric_collection.png" alt="Section des filtres de limitation de collecte de métriques configurée dans la page d'intégration Google Cloud Platform" >}}

### Activez l'exportation détaillée des coûts d'utilisation {#enable-detailed-usage-cost-export}
<div class="alert alert-info">
Les <a href="https://cloud.google.com/billing/docs/how-to/export-data-bigquery-tables/detailed-usage">données détaillées sur les coûts d'utilisation</a> fournissent toutes les informations incluses dans les données de coûts d'utilisation standard, ainsi que des champs supplémentaires qui fournissent des données de coûts granulaires au niveau de la ressource.
</div>

 1. Accédez à [Billing Export][1] sous la section *Billing* de la console Google Cloud.
 2. Activez l'exportation [Detailed Usage cost][2] (sélectionnez ou créez un projet et un jeu de données BigQuery).
 3. Documentez le {{< ui >}}Billing Account ID{{< /ui >}} du compte de facturation où l'exportation a été configurée, ainsi que le {{< ui >}}Project ID{{< /ui >}} et le {{< ui >}}Dataset Name{{< /ui >}} de l'exportation.

{{< img src="cloud_cost/billing_export.png" alt="Informations sur le projet et le jeu de données Google Cloud mises en évidence" >}}

_Les jeux de données d'exportation de facturation BigQuery nouvellement créés ne contiennent que les données des deux derniers mois. Il peut s'écouler un jour ou deux avant que ces données ne soient complétées rétroactivement dans BigQuery._

#### Activez les API Google Service {#enable-google-service-apis}
Les autorisations suivantes permettent à Datadog d'accéder à l'exportation de facturation et de la transférer dans le bucket de stockage à l'aide d'une requête BigQuery planifiée.

- Activez l'[API BigQuery][5].
  1. Dans la console Google Cloud, accédez à la page de sélection de projet et sélectionnez votre projet Google Cloud.
  2. Activez la facturation sur votre projet pour tous les transferts.

- Activez le [service de transfert de données BigQuery][5].
  1. Ouvrez la page de l'API BigQuery Data Transfer dans la bibliothèque d'API.
  2. Dans le menu déroulant, sélectionnez le projet qui contient le compte de service.
  3. Cliquez sur le bouton {{< ui >}}ENABLE{{< /ui >}}.

  **Remarque :** L'API BigQuery Data Transfer doit être activée sur le projet Google qui contient le compte de service.

### (Facultatif) Activez l'exportation des métadonnées des remises sur engagement d'utilisation {#optional-enable-committed-use-discounts-metadata-export}

Activez l'[exportation des métadonnées des remises sur engagement d'utilisation (CUD)][20] pour afficher les dates de début et de fin, les montants engagés et d'autres propriétés de vos [remises sur engagement d'utilisation basées sur les dépenses][21] dans l'[inventaire des engagements][22]. L'exportation inclut les CUD achetées dans les projets liés au compte de facturation, y compris les engagements expirés.

Pour activer l'exportation des métadonnées CUD :

1. Dans la console Google Cloud, accédez à **Facturation > [Exportation de la facturation][1]**.
2. Activez l'[exportation des remises sur engagement d'utilisation][2]. Sélectionnez un projet et saisissez un nouveau nom de jeu de données lié. Google Cloud crée le jeu de données lié.
3. Sélectionnez le {{< ui >}}Location Type{{< /ui >}} et la région ou la multirégion qui correspond à votre jeu de données d'exportation des coûts d'utilisation détaillés. Vous ne pouvez pas modifier l'emplacement après la création du jeu de données.
4. Cliquez sur {{< ui >}}Save{{< /ui >}}.
5. Enregistrez l'exportation {{< ui >}}Project ID{{< /ui >}} et {{< ui >}}Linked Dataset Name{{< /ui >}}. Saisissez-les comme {{< ui >}}CUD Metadata Project ID{{< /ui >}} et {{< ui >}}CUD Metadata Dataset ID{{< /ui >}} lorsque vous [configurez Cloud Cost](#configure-cloud-cost).

{{< img src="cloud_cost/commitments/cud_metadata_export.png" alt="Configuration de l'exportation CUD Google Cloud avec les champs projet, jeu de données lié, type d'emplacement et multirégion mis en évidence." >}}

Sélectionnez l'onglet qui correspond à votre méthode de configuration pour accorder à Datadog les autorisations nécessaires.

{{< tabs >}}

{{% tab "Terraform" %}}

{{< img src="cloud_cost/setup/gcp_terraform_setup.png" alt="Formulaire de configuration de Cloud Cost Management en mode Terraform" style="width:100%" >}}

### Définissez les détails de la configuration {#define-configuration-details}

Saisissez les détails suivants pour votre configuration :

* **Bucket de stockage GCP** : sélectionnez **Oui** pour créer un bucket de stockage, ou sélectionnez **Non** pour utiliser un bucket existant.

    **Remarque** : si vous utilisez un bucket existant, vérifiez que le bucket est situé au même emplacement que le jeu de données d'exportation BigQuery.

* **Nom du bucket** : le nom de votre bucket de stockage GCP nouveau ou existant.
* **Région** : la région GCP de votre bucket. Par exemple, `northamerica-northeast1`.
* **ID du compte de facturation** : l'ID du compte de facturation pour lequel vos rapports d'exportation des coûts d'utilisation indiquent les coûts.
* **Nom et ID du projet d'exportation** : le nom et l'ID de votre projet d'exportation.
* **Nom et ID du jeu de données d'exportation** : le nom et l'ID de votre jeu de données d'exportation.

### Créer l'exportation des coûts et activer les API Google Service {#create-cost-export-and-enable-google-service-apis}

Effectuez les étapes [Activer l'exportation détaillée des coûts d'utilisation](#enable-detailed-usage-cost-export) et [Activer les API Google Service](#enable-google-service-apis) ci-dessus, puis revenez à CCM.

### Copiez le code HCL Terraform généré et appliquez les modifications {#copy-generated-terraform-hcl-and-apply-changes}

Dans l'interface utilisateur de configuration Terraform de CCM, suivez les instructions de l'étape **Appliquer la configuration Terraform**. Résolvez tous les problèmes qui apparaissent lors de l'exécution de `terraform plan` ou `terraform apply` avant de revenir à CCM pour confirmer la création du compte.

{{% /tab %}}

{{% tab "Méthode manuelle" %}}

{{< img src="cloud_cost/setup/gcp_manual_setup_cud_metadata.png" alt="Formulaire de configuration de Cloud Cost Management en mode manuel" style="width:100%" >}}

#### Configurez l'accès au projet d'exportation {#configure-export-project-access}
[Ajouter le compte de service en tant que principal sur la ressource du projet du jeu de données d'exportation][7] :
1. Accédez à la page IAM dans la console Google Cloud et sélectionnez le projet du jeu de données d'exportation.
2. Sélectionnez le compte de service en tant que principal.
3. Accordez un ou plusieurs rôles qui contiennent ensemble les autorisations suivantes :
    * `bigquery.jobs.create`
    * `bigquery.transfers.get`
    * `bigquery.transfers.update`

  **Remarque :** Il peut s'agir d'un rôle personnalisé, ou vous pouvez utiliser le rôle Google Cloud existant `roles/bigquery.admin`.

#### Configurez l'accès au jeu de données BigQuery d'exportation {#configure-export-bigquery-dataset-access}
[Ajoutez le compte de service en tant que principal sur la ressource de jeu de données BigQuery d'exportation][8] :
1. Dans le volet Explorer de la page BigQuery, développez votre projet et sélectionnez le jeu de données BigQuery d'exportation.
2. Cliquez sur {{< ui >}}Sharing{{< /ui >}} > {{< ui >}}Permissions{{< /ui >}}, puis sur {{< ui >}}add principal{{< /ui >}}.
3. Dans le champ des nouveaux principaux, saisissez le compte de service.
4. Accordez un ou plusieurs rôles qui contiennent ensemble les autorisations suivantes :
    * `bigquery.datasets.get`
    * `bigquery.tables.create`
    * `bigquery.tables.delete`
    * `bigquery.tables.export`
    * `bigquery.tables.get`
    * `bigquery.tables.getData`
    * `bigquery.tables.list`
    * `bigquery.tables.update`
    * `bigquery.tables.updateData`

  **Remarque :** Il peut s'agir d'un rôle personnalisé, ou vous pouvez utiliser le rôle Google Cloud existant `roles/bigquery.dataEditor`.

#### (Facultatif) Configurez l'accès au projet de métadonnées CUD {#optional-configure-cud-metadata-project-access}
[Ajoutez le compte de service en tant que principal sur la ressource du projet de métadonnées CUD][7] :
1. Accédez à la page IAM dans la console Google Cloud et sélectionnez le projet de métadonnées CUD.
2. Sélectionnez le compte de service en tant que principal.
3. Accordez un ou plusieurs rôles qui contiennent ensemble les autorisations suivantes :
    * `bigquery.datasets.get`
    * `bigquery.readsessions.create`
    * `bigquery.readsessions.getData`
    * `bigquery.readsessions.update`
    * `bigquery.tables.get`
    * `bigquery.tables.getData`
    * `bigquery.tables.list`

  **Remarque :** Il peut s'agir d'un rôle personnalisé, ou vous pouvez utiliser les rôles Google Cloud existants `roles/bigquery.dataViewer` et `roles/bigquery.readSessionUser`.

#### Configurez l'accès au bucket {#configure-bucket-access}
[Ajoutez le compte de service en tant que principal sur la ressource de bucket GCS][6] :
1. Accédez à la page des buckets Cloud Storage dans la console Google Cloud, puis sélectionnez votre bucket.
2. Sélectionnez l'onglet des autorisations et cliquez sur le bouton {{< ui >}}grant access{{< /ui >}}.
3. Dans le champ des nouveaux principaux, saisissez le compte de service.
4. Accordez un ou plusieurs rôles qui contiennent ensemble les autorisations suivantes :
   * `storage.buckets.get`
   * `storage.objects.create`
   * `storage.objects.delete`
   * `storage.objects.get`
   * `storage.objects.list`

  **Remarque :** Il peut s'agir d'un rôle personnalisé, ou vous pouvez utiliser les rôles Google Cloud existants `roles/storage.legacyObjectReader` et `roles/storage.legacyBucketWriter`.

[6]: https://cloud.google.com/storage/docs/access-control/using-iam-permissions#bucket-add
[7]: https://cloud.google.com/iam/docs/granting-changing-revoking-access#grant-single-role
[8]: https://cloud.google.com/bigquery/docs/control-access-to-resources-iam#grant_access_to_a_dataset

{{% /tab %}}

{{< /tabs >}}

### Créer ou sélectionner un bucket Google Cloud Storage {#create-or-select-a-google-cloud-storage-bucket}
Cloud Cost Management utilise un bucket de stockage GCP pour recevoir les données extraites de votre jeu de données BigQuery de coûts d'utilisation détaillés (préfixé par `datadog_cloud_cost_detailed_usage_export`). Vous pouvez créer un nouveau bucket ou en utiliser un existant.

**Remarque :** Le bucket [doit être colocalisé][9] avec le jeu de données d'exportation BigQuery.

### (Facultatif) Configurer l'autorisation de service inter-projets : {#optional-configure-cross-project-service-authorization}
Si votre compte de service intégré existe dans un projet Google Cloud Platform différent de celui de votre jeu de données d'exportation de facturation, vous devez [accorder une autorisation de compte de service inter-projets][10] :

1. Déclenchez la création de l'agent de service en suivant la [documentation officielle][11] à l'aide des valeurs suivantes :
   * ENDPOINT : `bigquerydatatransfer.googleapis.com`
   * RESOURCE_TYPE : `project`
   * RESOURCE_ID : projet du jeu de données d'exportation<br><br>

     Cela crée un nouvel agent de service qui ressemble à `service-<billing project number>@gcp-sa-bigquerydatatransfer.iam.gserviceaccount.com`.


2. Ajoutez le rôle de compte de service BigQuery Data Transfer créé par le déclencheur en tant que principal sur votre compte de service
3. Attribuez-lui le rôle `roles/iam.serviceAccountTokenCreator`.

### Configurer Cloud Cost {#configure-cloud-cost}
Continuez à suivre les étapes indiquées dans [Configuration et installation][3].

**Remarque** : Les données peuvent mettre de 48 à 72 heures après la configuration pour se stabiliser dans Datadog.

### Obtention des données historiques {#getting-historical-data}

Les jeux de données d'exportation de facturation BigQuery nouvellement créés ne contiennent que les 2 derniers mois de données. Il peut s'écouler un jour ou deux avant que ces données soient rétro-remplies dans BigQuery. Datadog ingère automatiquement jusqu'à 15 mois de données de coûts historiques disponibles une fois qu'elles apparaissent dans la table BigQuery.

Google Cloud ne fournit pas de processus pour rétro-remplir des données historiques supplémentaires au-delà des 2 mois automatiquement inclus lors de la création initiale de l'exportation BigQuery.

## Types de coûts {#cost-types}
Vous pouvez visualiser vos données ingérées en utilisant les types de coûts suivants :

| Type de coût                                       | Description |
|-------------------------------------------------| ----------------------------------|
| `gcp.cost.amortized`                            | Coût total des ressources allouées au moment de l'utilisation sur un intervalle. Les coûts incluent les crédits promotionnels ainsi que les crédits de remise sur utilisation engagée. |
| `gcp.cost.amortized.shared.resources.allocated` | Tous vos coûts amortis Google Cloud Platform, avec des ventilations et des informations supplémentaires pour les charges de travail conteneurisées. Nécessite [l'allocation des coûts des conteneurs][14].|
| `gcp.cost.ondemand`                             | Coût total public à la demande des ressources avant l'application des remises publiques et privées sur un intervalle. |

### Tags prêts à l'emploi {#out-of-the-box-tags}

Datadog enrichit automatiquement vos données de coûts Google Cloud avec des tags provenant de sources multiples. Pour un aperçu complet de la façon dont les tags sont appliqués aux données de coûts, consultez [Tags][17].

Les tags prêts à l'emploi suivants sont dérivés de votre [rapport détaillé sur les coûts d'utilisation][16] et facilitent la découverte et la compréhension des données de coûts :

| Nom du tag                         | Description du tag       |
| ---------------------------- | ----------------- |
| `google_product`             | Le service Google facturé.|
| `google_cost_type`           | Le type de frais couvert par cet élément (par exemple, régulier, taxe, ajustement ou erreur d'arrondi).|
| `google_usage_type`          | Les détails d'utilisation de l'élément (par exemple, Standard Storage US).|
| `google_location`            | L'emplacement associé à l'élément au niveau d'une multirégion, d'un pays, d'une région ou d'une zone.|
| `google_region`              | La région associée à l'élément.|
| `google_zone`                | La zone de disponibilité associée à l'élément.|
| `google_pricing_usage_unit`  | L'unité de tarification utilisée pour calculer le coût d'utilisation (par exemple, gibioctet, tébioctet ou année).|
| `google_is_unused_reservation`| Indique si l'utilisation était réservée mais non utilisée.|
| `service_description` | Le service Google Cloud (tel que Compute Engine ou BigQuery). |
| `project_id` | L'ID du projet Google Cloud qui a généré les données de facturation Cloud. |
| `project_name` | Le nom du projet Google Cloud qui a généré les données de facturation Cloud. |
| `cost_type` | Le type de coût que représente cet élément de ligne : `regular`, `tax`, `adjustment` ou `rounding error`. |
| `sku_description` | Une description du type de ressource utilisé, détaillant les informations d'utilisation de la ressource. |
| `resource_name` | Un nom que les clients ajoutent aux ressources. Cela peut ne pas s'appliquer à toutes les ressources. |
| `global_resource_name` | Un identifiant de ressource unique à l'échelle mondiale généré par Google Cloud. |

#### Corrélation entre coûts et observabilité : {#cost-and-observability-correlation}

Visualiser les coûts dans le contexte des données d'observabilité est important pour comprendre comment les changements d'infrastructure impactent les coûts, identifier pourquoi les coûts changent et optimiser l'infrastructure à la fois pour les coûts et les performances. Datadog met à jour les tags d'identification des ressources sur les données de coût pour les principaux produits Google afin de simplifier la corrélation entre l'observabilité et les métriques de coût.

Par exemple, pour afficher le coût et l'utilisation de chaque base de données Cloud SQL, vous pouvez créer un tableau avec `gcp.cost.amortized`, `gcp.cloudsql.database.cpu.utilization` et `gcp.cloudsql.database.memory.utilization` (ou toute autre métrique Cloud SQL) et grouper par `database_id`. Ou, pour voir l'utilisation et les coûts de Cloud Function côte à côte, vous pouvez représenter graphiquement `gcp.cloudfunctions.function.execution_count` et `gcp.cost.amortized` groupés par `function_name`.

Les tags prêts à l'emploi suivants sont disponibles :
| Produit Google     | Tag(s)                        |
| -------------------| ----------------------------- |
| Compute Engine     | `instance_id`, `instance-type`|
| Cloud Functions    | `function_name`               |
| Cloud Run          | `job_name`, `service_name`    |
| Cloud SQL          | `database_id`                 |
| Cloud Spanner      | `instance_id`                 |
| App Engine         | `module_id`                   |
| BigQuery           | `project_id`, `dataset_id`    |
| Kubernetes Engine  | `cluster_name`                |

### Allocation des conteneurs {#container-allocation}
**Les métriques d'allocation de conteneurs** contiennent tous les mêmes coûts que les métriques de Google Cloud Platform, mais avec des ventilations et des informations supplémentaires pour les charges de travail de conteneurs. Consultez [Container Cost Allocation][14] pour plus de détails.

## Pour aller plus loin {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://console.cloud.google.com/billing/export/
[2]: https://cloud.google.com/billing/docs/how-to/export-data-bigquery-setup
[3]: https://app.datadoghq.com/cost/setup
[4]: https://app.datadoghq.com/integrations/google-cloud-platform
[5]: https://cloud.google.com/bigquery/docs/enable-transfer-service
[9]: https://cloud.google.com/bigquery/docs/exporting-data#data-locations
[10]: https://cloud.google.com/bigquery/docs/enable-transfer-service#cross-project_service_account_authorization
[11]: https://cloud.google.com/iam/docs/create-service-agents#create
[12]: /fr/integrations/google_cloud_platform/
[13]: /fr/cloud_cost_management/setup/google_cloud/#enable-detailed-usage-cost-export
[14]: /fr/cloud_cost_management/container_cost_allocation/
[15]: /fr/cloud_cost_management/setup/google_cloud/#create-or-select-a-google-cloud-storage-bucket
[16]: https://cloud.google.com/billing/docs/how-to/export-data-bigquery-tables/detailed-usage
[17]: /fr/cloud_cost_management/tags
[18]: /fr/api/latest/cloud-cost-management/#create-google-cloud-usage-cost-config
[19]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/gcp_uc_config
[20]: https://cloud.google.com/billing/docs/how-to/export-data-bigquery-tables/cud-export
[21]: https://cloud.google.com/docs/cuds-spend-based
[22]: /fr/cloud_cost_management/planning/commitment_programs/#commitments-inventory