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
## Aperçu {#overview}

Pour utiliser la gestion des coûts de Google Cloud dans Datadog, suivez ces étapes :
1. Configurez l'[intégration Google Cloud Platform][12]
2. Configurez l'[exportation détaillée des coûts d'utilisation][13] avec les autorisations nécessaires (Google Service APIs, accès au projet d'exportation et accès au jeu de données BigQuery)
3. Créez ou sélectionnez un [Google Cloud Storage bucket][15] avec les autorisations nécessaires (accès au bucket)

## Configuration {#setup}

Vous pouvez configurer en utilisant l'[API][18], [Terraform][19] ou directement dans Datadog en suivant les instructions ci-dessous.

### Configurez l'intégration Google Cloud Platform {#configure-the-google-cloud-platform-integration}
Accédez à [Setup & Configuration][3], ajoutez un compte Google Cloud Platform et suivez les étapes pour configurer l'intégration Google Cloud Platform.

<div class="alert alert-danger">
L'intégration Datadog Google Cloud Platform permet à Cloud Costs de surveiller automatiquement tous les projets auxquels ce compte de service a accès.
Pour limiter les hôtes de surveillance de l'infrastructure pour ces projets, appliquez des balises aux hôtes. Ensuite, définissez si les balises doivent être incluses ou exclues de la surveillance dans la section {{< ui >}}Limit Metric Collection Filters{{< /ui >}} de la page d'intégration.
</div>

{{< img src="cloud_cost/gcp_integration_limit_metric_collection.png" alt="Limitez la section des filtres de collecte de métriques configurée dans la page d'intégration Google Cloud Platform" >}}

### Activez l'exportation détaillée des coûts d'utilisation {#enable-detailed-usage-cost-export}
<div class="alert alert-info">
Les données <a href="https://cloud.google.com/billing/docs/how-to/export-data-bigquery-tables/detailed-usage">détaillées sur les coûts d'utilisation</a> fournissent toutes les informations incluses dans les données standard sur les coûts d'utilisation, ainsi que des champs supplémentaires qui fournissent des données de coût au niveau des ressources.
</div>

 1. Accédez à [Billing Export][1] sous la console Google Cloud *Billing*.
 2. Activez l'[Detailed Usage cost export][2] (sélectionnez ou créez un projet et un ensemble de données BigQuery)
 3. Documentez le {{< ui >}}Billing Account ID{{< /ui >}} pour le compte de facturation où l'exportation a été configurée, ainsi que l'export {{< ui >}}Project ID{{< /ui >}} et {{< ui >}}Dataset Name{{< /ui >}}.

{{< img src="cloud_cost/billing_export.png" alt="Informations sur le projet Google Cloud et le jeu de données mises en évidence" >}}

_Les ensembles de données d'exportation de facturation BigQuery nouvellement créés ne contiennent que les deux derniers mois de données. Il peut falloir un jour ou deux pour que ces données soient remplies dans BigQuery._

#### Activez les Google Service APIs {#enable-google-service-apis}
Les autorisations suivantes permettent à Datadog d'accéder et de transférer l'exportation de facturation dans le bucket de stockage à l'aide d'une requête BigQuery planifiée.

- Activez le [BigQuery API][5].
  1. Dans la console Google Cloud, accédez à la page de sélection de projet et sélectionnez votre projet Google Cloud.
  2. Activez la facturation sur votre projet pour tous les transferts.

- Activez le [BigQuery Data Transfer Service][5].
  1. Ouvrez la page de l'API de transfert de données BigQuery dans la bibliothèque d'API.
  2. Dans le menu déroulant, sélectionnez le projet qui contient le compte de service.
  3. Cliquez sur le bouton {{< ui >}}ENABLE{{< /ui >}}.

  **Remarque :** Le BigQuery Data Transfer API doit être activée sur le projet Google qui contient le compte de service.

{{< tabs >}}

{{% tab "Terraform" %}}

{{< img src="cloud_cost/setup/gcp_terraform_setup.png" alt="Formulaire de configuration de Cloud Cost Management en mode Terraform" style="width:100%" >}}

### Définissez les détails de configuration {#define-configuration-details}

Entrez les détails suivants pour votre configuration :

* **Google Cloud Storage bucket** : Sélectionnez **Oui** pour créer un bucket de stockage, ou sélectionnez **Non** pour utiliser un bucket existant.

    **Remarque** : Si vous utilisez un bucket existant, vérifiez que le bucket est co-localisé avec l'ensemble de données d'exportation BigQuery.

* **Bucket name** : Le nom de votre nouveau Google Cloud Storage bucket ou de celui existant.
* **Région** : La région GCP de votre bucket. Par exemple, `northamerica-northeast1`.
* **Identifiant du compte de facturation** : L'identifiant du compte de facturation pour lequel vos rapports d'exportation des coûts d'utilisation sont générés.
* **Nom et identifiant du projet d'exportation** : Le nom et l'identifiant de votre projet d'exportation.
* **Nom et identifiant du dataset d'exportation** : Le nom et l'identifiant de votre dataset d'exportation.

### Créer une exportation de coûts et activer les Google Service APIs {#create-cost-export-and-enable-google-service-apis}

Complétez les étapes [Enable detailed usage cost export](#enable-detailed-usage-cost-export) et [Enable Google Service APIs](#enable-google-service-apis) ci-dessus, puis revenez à CCM.

### Copier le HCL Terraform généré et appliquer les modifications {#copy-generated-terraform-hcl-and-apply-changes}

Dans l'interface utilisateur de configuration Terraform de CCM, suivez les instructions de l'étape **Apply Terraform Configuration**. Résolvez tous les problèmes qui apparaissent lors de l'exécution de `terraform plan` ou `terraform apply` avant de revenir à CCM pour confirmer la création du compte.

{{% /tab %}}

{{% tab "Méthode manuelle" %}}

{{< img src="cloud_cost/setup/gcp_manual_setup.png" alt="Formulaire de configuration de Cloud Cost Management en mode manuel" style="width:100%" >}}

#### Configurer l'accès au projet d'exportation {#configure-export-project-access}
[Ajoutez le compte de service en tant que principal sur la ressource du projet de dataset d'exportation][7] :
1. Accédez à la page IAM dans la console Google Cloud et sélectionnez le projet de dataset d'exportation.
2. Sélectionnez le compte de service en tant que principal.
3. Sélectionnez un rôle avec les permissions suivantes à accorder dans la liste déroulante :
  * `bigquery.jobs.create`
  * `bigquery.transfers.get`
  * `bigquery.transfers.update`

  **Remarque :** Cela peut être un rôle personnalisé, ou vous pouvez utiliser le rôle Google Cloud existant `roles/bigquery.admin`.

#### Configurer l'accès au dataset BigQuery d'exportation {#configure-export-bigquery-dataset-access}
[Ajoutez le compte de service en tant que principal sur la ressource du dataset BigQuery d'exportation][8] :
1. Dans le panneau Explorateur de la page BigQuery, développez votre projet et sélectionnez le dataset BigQuery d'exportation.
2. Cliquez sur {{< ui >}}Sharing{{< /ui >}} > {{< ui >}}Permissions{{< /ui >}} puis sur {{< ui >}}add principal{{< /ui >}}.
3. Dans le nouveau champ des principals, entrez le compte de service.
4. En utilisant la liste de sélection d'un rôle, assignez un rôle avec les permissions suivantes :
  * `bigquery.datasets.get`
  * `bigquery.tables.create`
  * `bigquery.tables.delete`
  * `bigquery.tables.export`
  * `bigquery.tables.get`
  * `bigquery.tables.getData`
  * `bigquery.tables.list`
  * `bigquery.tables.update`
  * `bigquery.tables.updateData`

  **Remarque&nbsp;:** Cela peut être un rôle personnalisé, ou vous pouvez utiliser le rôle Google Cloud existant `roles/bigquery.dataEditor`.

#### Configurez l'accès au bucket {#configure-bucket-access}
[Ajoutez le compte de service en tant que principal sur la ressource du GCS bucket][6]:
1. Accédez à la page des Buckets de Cloud Storage dans la console Google Cloud et sélectionnez votre bucket.
2. Sélectionnez l'onglet des permissions et cliquez sur le bouton {{< ui >}}grant access{{< /ui >}}.
3. Dans le nouveau champ des principals, entrez le compte de service.
4. Assignez un rôle avec les permissions suivantes&nbsp;:
   * `storage.buckets.get`
   * `storage.objects.create`
   * `storage.objects.delete`
   * `storage.objects.get`
   * `storage.objects.list`

  **Remarque&nbsp;:** Cela peut être un rôle personnalisé, ou vous pouvez utiliser les rôles Google Cloud existants `roles/storage.legacyObjectReader` et `roles/storage.legacyBucketWriter`.

[6]: https://cloud.google.com/storage/docs/access-control/using-iam-permissions#bucket-add
[7]: https://cloud.google.com/iam/docs/granting-changing-revoking-access#grant-single-role
[8]: https://cloud.google.com/bigquery/docs/control-access-to-resources-iam#grant_access_to_a_dataset

{{% /tab %}}

{{< /tabs >}}

### Créez ou sélectionnez un [Google Cloud Storage bucket]{#create-or-select-a-google-cloud-storage-bucket}
La solution Cloud Cost Management utilise un [Google Cloud Storage bucket] pour recevoir des données extraites de votre [Detailed Usage Cost BigQuery dataset] (préfixé par `datadog_cloud_cost_detailed_usage_export`). Vous pouvez créer un nouveau bucket ou utiliser un existant.

**Remarque&nbsp;:** Le bucket [doit être co-localisé][9] avec l'ensemble de données d'exportation BigQuery.

### (Optionnel) Configurez l'autorisation de service inter-projets&nbsp;: {#optional-configure-cross-project-service-authorization}
Si votre compte de service intégré existe dans un projet Google Cloud Platform différent de votre ensemble de données d'exportation de facturation, vous devez [accorder l'autorisation de compte de service inter-projets][10]&nbsp;:

1. Déclenchez la création de l'agent de service en suivant la [documentation officielle][11] en utilisant les valeurs suivantes&nbsp;:
   * POINT D'ACCÈS&nbsp;: `bigquerydatatransfer.googleapis.com`
   * TYPE DE RESSOURCE&nbsp;: `project`
   * RESOURCE_ID : export dataset project<br><br>

     Cela crée un nouvel agent de service qui ressemble à `service-<billing project number>@gcp-sa-bigquerydatatransfer.iam.gserviceaccount.com`.


2. Ajoutez le rôle [BigQuery Data Transfer Service Account] créé par le déclencheur en tant que principal sur votre compte de service.
3. Attribuez-lui le rôle `roles/iam.serviceAccountTokenCreator`.

### Configurez Cloud Cost Management {#configure-cloud-cost}
Continuez à suivre les étapes indiquées dans [Setup & Configuration][3].

**Remarque**&nbsp;: Les données peuvent prendre de 48 à 72 heures après la configuration pour se stabiliser dans Datadog.

### Obtention des données historiques {#getting-historical-data}

Les ensembles de données d'exportation de facturation BigQuery nouvellement créés ne contiennent que les 2 derniers mois de données. Il peut falloir un jour ou deux pour que ces données soient remplies dans BigQuery. Datadog ingère automatiquement jusqu'à 15 mois de données historiques de coûts disponibles une fois qu'elles apparaissent dans la table BigQuery.

Google Cloud ne fournit pas de processus pour remplir des données historiques supplémentaires au-delà des 2 mois automatiquement inclus lors de la première création de l'exportation BigQuery.

## Types de coûts {#cost-types}
Vous pouvez visualiser vos données ingérées en utilisant les types de coûts suivants :

| Type de coût&nbsp;                                       | Description |.
|-------------------------------------------------| ----------------------------------|
| `gcp.cost.amortized`                            | Coût total des ressources allouées au moment de l'utilisation sur un intervalle. Les coûts incluent les crédits de promotion ainsi que les crédits de réduction pour utilisation engagée. |
| `gcp.cost.amortized.shared.resources.allocated` | Tous vos coûts amortis de Google Cloud Platform, avec des ventilations et des analyses supplémentaires pour les charges de travail des conteneurs. Nécessite [allocation des coûts des conteneurs][14].|
| `gcp.cost.ondemand`                             | Coût total public, à la demande, des ressources avant que les réductions publiques et privées ne soient appliquées sur un intervalle. |

### Étiquettes prêtes à l'emploi {#out-of-the-box-tags}

Datadog enrichit automatiquement vos données de coûts Google Cloud avec des étiquettes provenant de plusieurs sources. Pour un aperçu complet de la manière dont les étiquettes sont appliquées aux données de coûts, voir [Étiquettes][17].

Les étiquettes prêtes à l'emploi suivantes sont dérivées de votre [rapport détaillé sur les coûts d'utilisation][16] et facilitent la découverte et la compréhension des données de coûts :

| Nom de la balise                         | Description de la balise       |
| ---------------------------- | ----------------- |
| `google_product`             | Le service Google facturé.|
| `google_cost_type`           | Le type de frais couvert par cet élément (par exemple, régulier, taxe, ajustement ou erreur d'arrondi).|
| `google_usage_type`          | Les détails d'utilisation de l'élément (par exemple, Stockage Standard US).|
| `google_location`            | L'emplacement associé à l'élément au niveau d'une multi-région, d'un pays, d'une région ou d'une zone.|
| `google_region`              | La région associée à l'élément.|
| `google_zone`                | La zone de disponibilité associée à l'élément.|
| `google_pricing_usage_unit`  | L'unité de tarification utilisée pour calculer le coût d'utilisation (par exemple, gibioctet, tébioctet ou an).|
| `google_is_unused_reservation`| Indique si l'utilisation était réservée mais non utilisée.|
| `service_description` | Le service Google Cloud (tel que Compute Engine ou BigQuery). |
| `project_id` | L'ID du projet Google Cloud qui a généré les données de facturation Cloud. |
| `project_name` | Le nom du projet Google Cloud qui a généré les données de facturation Cloud. |
| `cost_type` | Le type de coût que cet élément représente : `regular`, `tax`, `adjustment` ou `rounding error`. |
| `sku_description` | Une description du type de ressource utilisée, décrivant les détails d'utilisation de la ressource. |
| `resource_name` | Un nom que les clients ajoutent aux ressources. Cela peut ne pas être présent sur toutes les ressources. |
| `global_resource_name` | Un identifiant de ressource unique au niveau mondial généré par Google Cloud. |

#### Corrélation des coûts et d'observabilité {#cost-and-observability-correlation}

Il est important de visualiser les coûts dans le contexte des données d'observabilité pour comprendre comment les changements d'infrastructure impactent les coûts, identifier pourquoi les coûts changent et optimiser l'infrastructure tant pour les coûts que pour la performance. Datadog met à jour les balises d'identification des ressources sur les données de coût pour les principaux produits Google afin de simplifier la corrélation entre les métriques d'observabilité et de coût.

Par exemple, pour visualiser le coût et l'utilisation de chaque base de données Cloud SQL, vous pouvez créer un tableau avec `gcp.cost.amortized`, `gcp.cloudsql.database.cpu.utilization` et `gcp.cloudsql.database.memory.utilization` (ou toute autre métrique Cloud SQL) et regrouper par `database_id`. Ou, pour voir l'utilisation et les coûts des Cloud Functions côte à côte, vous pouvez tracer `gcp.cloudfunctions.function.execution_count` et `gcp.cost.amortized` regroupés par `function_name`.

Les balises prêtes à l'emploi suivantes sont disponibles :
| Produit Google     | Balise(s)                        |
| -------------------| ----------------------------- |
| Compute Engine     | `instance_id`, `instance-type`|
| Cloud Functions    | `function_name`               |
| Cloud Run          | `job_name`, `service_name`    |
| Cloud SQL          | `database_id`                 |
| Cloud Spanner      | `instance_id`                 |
| App Engine         | `module_id`                   |
| BigQuery           | `project_id`, `dataset_id`    |
| Kubernetes Engine  | `cluster_name`                |

### Allocation de conteneurs {#container-allocation}
**Les métriques d'allocation de conteneurs** contiennent tous les mêmes coûts que les métriques de Google Cloud Platform, mais avec des ventilations et des analyses supplémentaires pour les charges de travail des conteneurs. Voir [Allocation des coûts des conteneurs][14] pour plus de détails.

## Lectures complémentaires {#further-reading}
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