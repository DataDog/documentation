---
aliases:
- /fr/integrations/awsbilling/
- /fr/cloud_cost_management/aws/
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Cloud Cost Management
- link: /cloud_cost_management/azure
  tag: Documentation
  text: Obtenez des informations sur votre facture Azure
- link: /cloud_cost_management/google_cloud
  tag: Documentation
  text: Obtenez des informations sur votre facture Google Cloud
- link: /cloud_cost_management/oracle
  tag: Documentation
  text: Obtenez des informations sur votre facture Oracle
title: AWS
---
## Aperçu {#overview}

Pour configurer Cloud Cost Management dans Datadog, vous devez :
1. Un compte AWS avec accès à la facturation
2. L'intégration AWS installée dans Datadog
3. Un rapport de coûts et d'utilisation (suivez les étapes ci-dessous pour en créer un)

## Configuration {#setup}

Vous pouvez configurer en utilisant l'[API][21], [Terraform][22], ou directement dans Datadog en suivant les instructions ci-dessous.

### Configurer l'intégration AWS {#configure-the-aws-integration}

Accédez à [Setup & Configuration][7], ajoutez un compte AWS et suivez les étapes pour configurer l'intégration AWS.

**Remarque** : Datadog recommande de configurer un rapport de coûts et d'utilisation à partir d'un [compte **de gestion AWS**][2] pour la visibilité des coûts dans les **comptes membres** associés.

Si vous envoyez un rapport de coûts et d'utilisation depuis un **compte membre AWS**, assurez-vous d'avoir sélectionné les options suivantes dans les [préférences] de votre **compte de gestion** :
- {{< ui >}}Linked Account Access{{< /ui >}}
- {{< ui >}}Linked Account Refunds and Credits{{< /ui >}}
- {{< ui >}}Linked Account Discounts{{< /ui >}}

Ces paramètres garantissent une précision totale des coûts en permettant des calculs de coûts périodiques via l'AWS Cost Explorer.

{{< tabs >}}

{{% tab "CloudFormation" %}}

{{< img src="cloud_cost/setup/aws_cloudformation_setup.png" alt="Formulaire de configuration de Cloud Cost Management en mode CloudFormation" style="width:100%" >}}

### Sélectionnez les ressources à créer {#select-the-resources-to-create}

La pile CloudFormation peut être configurée de trois manières en fonction de vos ressources AWS existantes :

* **Nouvelle configuration** : Sélectionnez {{< ui >}}Create Cost and Usage Report{{< /ui >}} pour créer à la fois le rapport et son bucket S3
* **Bucket existant** : Sélectionnez {{< ui >}}Create Cost and Usage Report{{< /ui >}} et désélectionnez {{< ui >}}Create S3 Bucket{{< /ui >}} pour utiliser un bucket S3 existant
* **Rapport existant** : Désélectionnez {{< ui >}}Create Cost and Usage Report{{< /ui >}} pour importer un rapport de coûts et d'utilisation existant

### Configurez les paramètres du rapport de coûts et d'utilisation :{#configure-the-cost-and-usage-report-settings}

Entrez les détails suivants pour votre rapport de coûts et d'utilisation :

* {{< ui >}}Bucket Name{{< /ui >}} : Le nom du bucket S3 où les fichiers de rapport sont stockés.
* {{< ui >}}Bucket Region{{< /ui >}} : Le [code de région AWS][100] de la région contenant votre bucket S3. Par exemple, `us-east-1`.
* {{< ui >}}Export Path Prefix{{< /ui >}} : Le préfixe de chemin S3 où les fichiers de rapport sont stockés.
  * **Remarque :** Les formats de préfixe suivants ne sont pas pris en charge : vide, commençant par `/` (tel que `/` ou `/cost`), ou se terminant par `/` (tel que `cost/`). Les préfixes contenant `/` au milieu sont pris en charge (tels que `cost/hourly`).
* {{< ui >}}Export Name{{< /ui >}} : Le nom de votre rapport de coûts et d'utilisation.

**Remarque** :
- Ces valeurs localisent soit votre rapport de coûts et d'utilisation existant, soit définissent les paramètres pour les ressources nouvellement créées.
- Il peut falloir entre 48 et 72 heures pour que toutes les données disponibles apparaissent dans votre organisation Datadog après qu'un rapport de coûts et d'utilisation complet a été généré. Si 72 heures se sont écoulées et que les données ne sont toujours pas apparues, contactez [le support Datadog][101].

[100]: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html
[101]: /fr/help/

{{% /tab %}}

{{% tab "Terraform" %}}

{{< img src="cloud_cost/setup/aws_terraform_setup.png" alt="Page de configuration CCM avec l'option Terraform sélectionnée, montrant l'étape 1 développée pour configurer les paramètres du rapport de coûts et d'utilisation, y compris le nom du bucket, la région et les détails d'exportation" style="width:100%" >}}

### Sélectionnez les ressources à créer {#select-the-resources-to-create-1}

La configuration Terraform prend en charge trois configurations en fonction de vos ressources AWS existantes :

* **Nouvelle configuration** : Sélectionnez {{< ui >}}Create Cost and Usage Report{{< /ui >}} pour créer à la fois le rapport et son bucket S3
* **Bucket existant** : Sélectionnez {{< ui >}}Create Cost and Usage Report{{< /ui >}} et désélectionnez {{< ui >}}Create S3 Bucket{{< /ui >}} pour utiliser un bucket S3 existant
* **Bucket et rapport existants** : Désélectionnez {{< ui >}}Create Cost and Usage Report{{< /ui >}} et {{< ui >}}Create S3 Bucket{{< /ui >}} pour utiliser un rapport et un bucket S3 existants.

**Remarque** : Si vous utilisez un bucket existant, vérifiez qu'AWS a la permission d'écrire des CURs dedans. Sinon, vous devrez peut-être mettre à jour la politique de votre bucket.

### Configurez les paramètres du rapport de coûts et d'utilisation {#configure-the-cost-and-usage-report-settings-1}

Entrez les détails suivants pour votre rapport de coûts et d'utilisation :

* {{< ui >}}Bucket Name{{< /ui >}} : Le nom du bucket S3 où les fichiers de rapport sont stockés.
* {{< ui >}}Bucket Region{{< /ui >}} : Le [code de région AWS][100] de la région contenant votre bucket S3. Par exemple, `us-east-1`.
* {{< ui >}}Export Path Prefix{{< /ui >}} : Le préfixe de chemin S3 où les fichiers de rapport sont stockés.
  * **Remarque :** Les formats de préfixe suivants ne sont pas pris en charge : vide, commençant par `/` (comme `/` ou `/cost`), ou se terminant par `/` (comme `cost/`). Les préfixes contenant `/` au milieu sont pris en charge (comme `cost/hourly`).
* {{< ui >}}Export Name{{< /ui >}} : Le nom de votre rapport de coûts et d'utilisation.

**Remarque** :
- Ces valeurs localisent soit votre rapport de coûts et d'utilisation existant, soit définissent les paramètres pour les ressources nouvellement créées.
- Il peut falloir entre 48 et 72 heures pour que toutes les données disponibles apparaissent dans votre organisation Datadog après qu'un rapport de coûts et d'utilisation complet a été généré. Si 72 heures se sont écoulées et que les données ne sont toujours pas apparues, contactez [le support Datadog][101].

[100]: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html
[101]: /fr/help/

### Copiez le HCL Terraform généré et appliquez les modifications {#copy-generated-terraform-hcl-and-apply-changes}

Dans l'interface de configuration Terraform CCM, suivez les instructions de l'étape {{< ui >}}Apply Terraform Configuration{{< /ui >}}. Résolvez tous les problèmes qui apparaissent lors de l'exécution de `terraform plan` ou `terraform apply` avant de revenir à CCM pour confirmer la création du compte.

{{% /tab %}}

{{% tab "Méthode manuelle" %}}

{{< img src="cloud_cost/setup/aws_manual_setup.png" alt="Formulaire de configuration de Cloud Cost Management en mode manuel" style="width:100%" >}}

### Prérequis : générez un rapport de coûts et d'utilisation {#prerequisite-generate-a-cost-and-usage-report}

[Créez un rapport de coûts et d'utilisation hérité][201] dans AWS sous la section {{< ui >}}Data Exports{{< /ui >}}.

Sélectionnez le type d'exportation {{< ui >}}Legacy CUR export{{< /ui >}}.

Sélectionnez les options suivantes dans la section Content :

* Type d'exportation : {{< ui >}}Legacy CUR export{{< /ui >}}
* {{< ui >}}Include resource IDs{{< /ui >}}
* {{< ui >}}Split cost allocation data{{< /ui >}} (Active l'allocation des coûts ECS) Vous devez également vous inscrire à [AWS Split Cost Allocation][210] dans les préférences de Cost Explorer).
* {{< ui >}}Refresh automatically{{< /ui >}}

Sélectionnez les options de livraison suivantes :

* Granularité temporelle : {{< ui >}}Hourly{{< /ui >}}
* Versionnage des rapports : {{< ui >}}Create new report version{{< /ui >}}
* Type de compression : {{< ui >}}GZIP{{< /ui >}} ou {{< ui >}}Parquet{{< /ui >}}

### Localisez le rapport de coûts et d'utilisation {#locate-the-cost-and-usage-report}

Si vous vous êtes éloigné du rapport que vous avez créé dans la section des prérequis, suivez la documentation AWS pour [voir vos exports de données][204]. Sélectionnez l'export CUR hérité que vous avez créé, puis sélectionnez {{< ui >}}Edit{{< /ui >}} pour voir les détails de l'export.

Pour permettre à Datadog d'accéder au rapport de coûts et d'utilisation, remplissez les champs avec les informations pertinentes :

* {{< ui >}}Bucket Name{{< /ui >}} : C'est le nom du bucket S3 dans la section des paramètres de stockage des exports de données.
* {{< ui >}}Bucket Region{{< /ui >}} : C'est la région où se trouve votre bucket. Par exemple, `us-east-1`.
* {{< ui >}}Export Path Prefix{{< /ui >}} : C'est le préfixe de chemin S3 dans la section des paramètres de stockage des exports de données.
  * **Remarque** : Les formats de préfixe suivants ne sont pas pris en charge : vide, commençant par `/` (tels que `/` ou `/cost`), ou se terminant par `/` (tels que `cost/`). Les préfixes contenant `/` au milieu sont pris en charge (tels que `cost/hourly`).
* {{< ui >}}Export Name{{< /ui >}} : C'est le nom de l'export dans la section du nom de l'export.

**Remarque** : Datadog ne prend en charge que les rapports sur les coûts et l'utilisation (CUR) hérités générés par AWS. Ne modifiez pas ou ne déplacez pas les fichiers générés par AWS, ni n'essayez de fournir un accès aux fichiers générés par un tiers.

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le point de terminaison des rapports de coûts et d'utilisation AWS est utilisé pour valider les champs ci-dessus par rapport à l'export CUR dans votre bucket S3. Ce point de terminaison n'est pas validé par FIPS.</div>
{{< /site-region >}}

### Configurez l'accès au rapport de coûts et d'utilisation {#configure-access-to-the-cost-and-usage-report}

[Créez une politique][205] dans AWS pour garantir que Datadog dispose des autorisations nécessaires pour accéder au CUR et au bucket S3 dans lequel il est stocké. Utilisez le JSON suivant :

{{< code-block lang="yaml" collapsible="true" >}}
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "DDCloudCostReadBucket",
          "Effect": "Allow",
          "Action": [
              "s3:ListBucket"
          ],
          "Resource": "arn:aws:s3:::BUCKETNAME"
      },
      {
          "Sid": "DDCloudCostGetBill",
          "Effect": "Allow",
          "Action": [
              "s3:GetObject"
          ],
          "Resource": "arn:aws:s3:::BUCKETNAME/REPORT_PREFIX/REPORT_NAME/*"
      },
      {
          "Sid": "DDCloudCostCheckAccuracy",
          "Effect": "Allow",
          "Action": [
              "ce:Get*"
          ],
          "Resource": "*"
      },
      {
          "Sid": "DDCloudCostListCURs",
          "Action": [
              "cur:DescribeReportDefinitions"
          ],
          "Effect": "Allow",
          "Resource": "*"
      },
      {
          "Sid": "DDCloudCostListOrganizations",
          "Action": [
              "organizations:Describe*",
              "organizations:List*"
          ],
          "Effect": "Allow",
          "Resource": "*"
      }
  ]
}
{{< /code-block >}}

**Remarque** : Notez le nom que vous avez créé pour cette politique pour les étapes suivantes.

### Attachez la politique au rôle d'intégration Datadog {#attach-the-policy-to-the-datadog-integration-role}

Associez la nouvelle stratégie S3 au rôle de l'intégration Datadog.

1. Accédez à {{< ui >}}Roles{{< /ui >}} dans la console AWS IAM.
2. Localisez le rôle utilisé par l'intégration Datadog. Par défaut, il est nommé **DatadogIntegrationRole**, mais le nom peut varier si votre organisation l'a renommé. Cliquez sur le nom du rôle pour ouvrir la page de résumé du rôle.
3. Cliquez sur {{< ui >}}Attach policies{{< /ui >}}.
4. Entrez le nom de la politique du bucket S3 créée ci-dessus.
5. Cliquez sur {{< ui >}}Attach policy{{< /ui >}}.

**Remarque** : Il peut falloir entre 48 et 72 heures pour que toutes les données disponibles apparaissent dans votre organisation Datadog après la génération d'un rapport complet de coûts et d'utilisation. Si 72 heures se sont écoulées et que les données ne sont toujours pas apparues, contactez [le support Datadog][18].

[201]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-create-legacy.html
[204]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-view.html
[205]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[210]: https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html

{{% /tab %}}

{{< /tabs >}}

### Filtrage de compte {#account-filtering}

Utilisez le filtrage de compte pour contrôler quels comptes membres AWS doivent être intégrés à la gestion des coûts Cloud. Exclure des comptes n'entraîne pas de coûts supplémentaires pour Datadog.

L'utilisation du filtrage de compte nécessite un compte de gestion AWS. Vous pouvez configurer des filtres de compte après qu'un compte a été configuré dans la gestion des coûts dans le cloud.

**Remarque :** Les filtres de compte ne sont pas pris en charge pour la recherche par étiquette.

#### Configurez des filtres de compte pour un compte existant {#configure-account-filters-for-an-existing-account}

Accédez à [**Cloud Cost** > **Settings**, sélectionnez **Comptes**][17], puis cliquez sur {{< ui >}}Manage Account{{< /ui >}} pour le compte de gestion que vous souhaitez filtrer.

{{< img src="cloud_cost/account_filtering/manage_account.png" alt="Bouton Gérer le compte sur la carte de compte" style="width:100%;" >}}

Cliquez sur {{< ui >}}Billing dataset{{< /ui >}} pour accéder à l'interface utilisateur de filtrage de compte.

{{< img src="cloud_cost/account_filtering/account_filtering.png" alt="Interface utilisateur de filtrage de compte pour filtrer les comptes membres AWS" style="width:100%;" >}}

### Obtenir des données historiques {#getting-historical-data}

Si vous configurez un rapport de coûts et d'utilisation qui a déjà des données historiques disponibles dans S3, Datadog ingère automatiquement jusqu'à 15 mois de données de coûts historiques.

Si votre rapport nouvellement configuré n'a pas de données historiques, vous pouvez demander un remplissage rétroactif à AWS :

Pour demander un remplissage rétroactif des données de coûts historiques AWS :

1. [Ouvrez un cas de support AWS][20] et demandez un remplissage rétroactif de vos données de coûts.
2. Incluez le **nom du rapport** et la **période de facturation souhaitée** dans votre demande.
3. Attendez qu'AWS traite la demande de remplissage rétroactif.

Lorsque les données sont complétées rétroactivement par AWS, Datadog ingère automatiquement les données dans les 24 heures.

AWS ne peut pas compléter rétroactivement les données de coûts qui précèdent votre compte AWS ou qui reflètent une structure précédente des organisations AWS.

Pour plus d'informations, consultez le [guide de dépannage des rapports de coûts et d'utilisation AWS][20].

## Types de coûts {#cost-types}

Visualisez vos données ingérées en utilisant des types de coûts prêts à l'emploi. Les types de coûts diffèrent principalement par la manière dont ils rendent compte des taux de remise, des plans d'économies et des réservations.

### À la demande {#on-demand}
**Les coûts à la demande** représentent le coût d'utilisation au tarif public à la demande publié par AWS. Cela exclut tous les plans d'économies, réservations, remises, taxes et frais.

**Remarque** : Dans la plupart des cas, les coûts à la demande ne sont pas une source fiable pour estimer les coûts réels.

### Coûts amortis et non mélangés {#amortized-and-unblended-costs}
**Les** métriques de coût amorti répartissent les économies d'engagement sur toute la durée de la remise. Ceci est également appelé _base d'accumulation_. Les réservations et les plans d'économies sont déduits d'un engagement mensuel et appliqués directement à l'utilisation couverte, au moment de l'utilisation. Tout reste inutilisé apparaît comme un frais.

En revanche, **les** métriques de coût non mélangé montrent tous les frais à la date où ils sont encourus. Ceci est également appelé _base de coût_. Les frais de réservation et de plan d'économies apparaissent à la date à laquelle ils ont été facturés et ne sont pas appliqués directement à l'utilisation couverte. Après que les données de facturation pour un mois soient finalisées, les métriques non mélangées correspondent exactement à la facture AWS.

### Coûts nets {#net-costs}
**Les** coûts nets appliquent des remises privées directement à l'utilisation. Le coût d'utilisation pour une ressource spécifique représente le coût effectif après que toutes les économies soient réalisées.

En revanche, d'autres métriques montrent les remises privées comme des éléments de ligne séparés, à valeur négative, sans étiquettes d'attribution de ressource. Plutôt que d'attribuer les remises directement à l'utilisation, ces métriques soustraient les remises du coût total.

**Les coûts amortis nets** fournissent la représentation la plus précise pour l'allocation des coûts, avec toutes les économies appliquées directement à l'utilisation. Les métriques de coût net sont disponibles si votre compte AWS a des remises d'entreprise négociées en privé. Si votre compte ne dispose pas de remises d'entreprise, alors **le coût net amorti** et **le coût amorti** sont équivalents.

### Allocation de conteneurs{#container-allocation}
Les métriques **d'allocation de conteneurs** contiennent tous les mêmes coûts que les métriques AWS, mais avec des décompositions et des informations supplémentaires pour les charges de travail de conteneurs. Voir [allocation des coûts des conteneurs][11] pour plus de détails.

### Exemple{#example}
Le scénario suivant démontre comment différents types de coûts se comportent. Imaginez que vous avez :
- Une instance EC2 fonctionnant pendant une heure avec un coût de 3 $ par heure de calcul.
- Un plan d'économies qui fixe le prix de ce type d'instance à 2 $ par heure de calcul.
- Une remise EDP négociée de 10 % en plus de toutes les autres remises.

Voici comment le coût de l'instance, l'engagement horaire du programme de remise et les réductions sont représentés pour chaque type de coût :

|Type de coût| Utilisation| Plan d'économies| Remise|  Explication|
|:---------|-|-|-|:------------------------------------------------|
|À la demande| 3,00 $||| C'est le tarif public à la demande.|
|Non mélangé| 3,00 $| 2,00 $| -0,20 $| Les frais récurrents du plan d'économies et la remise EDP sont des éléments distincts, non associés à une ressource spécifique. (**Remarque:** le coût de la ressource de 3 $ est compensé par `SavingsPlanNegation`.) |
|Net non mélangé|| 1,80 $|| Les frais récurrents du plan d'économies apparaissent comme un élément distinct avec la remise appliquée ; le coût n'est pas associé à une ressource spécifique.|
|Amorti |2,00 $||-0,20 $|La remise du plan d'économies est appliquée directement au coût de la ressource. La remise EDP est un élément distinct. |
|Net amorti |1,80 $|||Les remises du plan d'économies et EDP sont appliquées directement au coût de la ressource. |
|Net amorti - Ressources partagées allouées |1,80 $|||Le même coût que le net amorti, mais ce coût peut être décomposé davantage par les dimensions Kubernetes et les balises de pod. |

### Résumé des métriques de coût{#cost-metrics-summary}

En règle générale :
- `aws.cost.net.amortized.shared.resources.allocated` fournit l'allocation des coûts la plus complète pour des charges de travail et des équipes spécifiques.
-  Si vous n'avez pas d'allocation des coûts des conteneurs, utilisez `aws.cost.net.amortized`.
-  Si vous n'avez pas de coûts amortis nets, utilisez `aws.cost.amortized.shared.resources.allocated` ou `aws.cost.amortized`.

| Métrique               | Description           |
| -------------------- | --------------------- |
| `aws.cost.net.amortized.shared.resources.allocated` | Tous vos coûts amortis nets AWS, avec des détails supplémentaires et des informations pour les charges de travail des conteneurs. Nécessite [l'allocation des coûts des conteneurs][11].|
| `aws.cost.net.amortized` | Coûts amortis nets, sans détails sur les coûts des conteneurs. |
| `aws.cost.net.unblended` | Coûts non mélangés, sans détails sur les coûts des conteneurs. Correspond à la facture AWS, avec des remises spécialisées pré-calculées dans les coûts d'utilisation. |
| `aws.cost.amortized.shared.resources.allocated` | Tous vos coûts amortis AWS, avec des détails supplémentaires et des informations pour les charges de travail des conteneurs. Nécessite [l'allocation des coûts des conteneurs][11].|
| `aws.cost.amortized` | Coûts amortis, sans détails sur les coûts des conteneurs. |
| `aws.cost.unblended` | Coûts non mélangés, sans détails sur les coûts des conteneurs. Correspond à la facture AWS. |
| `aws.cost.ondemand`  | Coûts basés sur le tarif de liste fourni par AWS, excluant tous les plans d'économies, réservations, remises, taxes et frais. |

## Comment Datadog enrichit vos données de coûts AWS avec des tags {#how-datadog-enriches-your-aws-cost-data-with-tags}

Datadog enrichit automatiquement vos données de coûts AWS avec des tags provenant de plusieurs sources. Pour un aperçu complet de la manière dont les tags sont appliqués aux données de coûts, voir [Tags][19].

Les sources de tags suivantes sont disponibles pour AWS :

- Colonnes du rapport sur les coûts et l'utilisation
- Étiquettes de ressources AWS
- Étiquettes de compte AWS
- Étiquettes d'intégration AWS
- Étiquettes prêtes à l'emploi
- Étiquettes de charge de travail de conteneur
- Étiquettes de pipelines

### Colonnes du rapport de coûts et d'utilisation {#cost-and-usage-report-columns}

Toutes les colonnes contenant des chaînes du [Rapport de coût et d'utilisation AWS][6] sont ajoutées en tant que tags aux métriques de coûts.

Pour garantir la cohérence, Datadog normalise les clés d'étiquettes en utilisant des underscores et des minuscules. Par exemple, la colonne CUR `lineItem/ResourceId` correspond à la clé d'étiquette `line_item/resource_id`. Les valeurs d'étiquettes sont généralement non modifiées, maintenant la casse exacte et la plupart des caractères spéciaux.

**Exemples :**

|Colonne CUR|Valeur CUR|Étiquette de coût cloud|
|---|---|---|
|lineItem/ResourceId|i-12345678a9b12cd3e|line_item/resource_id:i-12345678a9b12cd3e|
|product/region|us-east-1|product/region:us-east-1|
|product/usagetype|DataTransfer-Regional-Bytes|product/usagetype:DataTransfer-Regional-Bytes|

### Étiquettes de ressources AWS {#aws-resource-tags}

[Les étiquettes de ressources AWS][12] sont des étiquettes définies par l'utilisateur qui apparaissent dans la console AWS lors de la visualisation d'une ressource particulière, comme une instance EC2 ou un bucket S3.

Lorsque vous activez l'intégration AWS de Datadog, Datadog collecte automatiquement les étiquettes de ressources pour la plupart des ressources AWS. Ces étiquettes sont appliquées à tous les coûts trouvés dans le CUR pour une ressource donnée. Les étiquettes de ressources sont récupérées régulièrement et sont appliquées aux données de coût à partir du jour où elles sont créées ou modifiées. Les valeurs des étiquettes historiques ne sont pas écrasées lorsque les étiquettes changent.

Si l'intégration AWS n'est pas activée, vous pouvez activer l'enrichissement des étiquettes de ressources en activant les [étiquettes d'allocation des coûts][13] dans la facturation AWS. Cela vous permet de sélectionner un sous-ensemble de clés d'étiquettes de ressources à inclure en tant que colonnes dans le AWS CUR. Datadog inclut automatiquement ces colonnes en tant qu'étiquettes lors du traitement du CUR.

### Étiquettes d'organisation et de compte AWS {#aws-organization-and-account-tags}
Les organisations AWS prennent en charge les [étiquettes définies par l'utilisateur][14] sur les unités organisationnelles et les comptes. Datadog récupère automatiquement et applique ces étiquettes aux données de coût. Les étiquettes de compte sont appliquées à toute l'utilisation associée à ces comptes. Les étiquettes d'organisation sont appliquées à toutes les données de facturation pour le compte payeur correspondant.

_Nécessite l'intégration Datadog AWS sur le compte de l'organisation._

### Étiquettes d'intégration AWS {#aws-integration-tags}

Les étiquettes d'intégration AWS sont des étiquettes définies sur la tuile d'intégration AWS dans la page des intégrations Datadog. Elles sont appliquées à tous les coûts trouvés dans le CUR pour le compte AWS associé.

### Étiquettes prêtes à l'emploi {#out-of-the-box-tags}
Datadog ajoute des étiquettes prêtes à l'emploi aux données de coût ingérées pour vous aider à décomposer et à allouer vos coûts. Ces étiquettes sont dérivées de votre [rapport de coûts et d'utilisation (CUR)][6] et facilitent la découverte et la compréhension des données de coût.

Les tags par défaut suivants peuvent être utilisés pour filtrer et regrouper vos données :

| Étiquette                          | Description       |
| ---------------------------- | ----------------- |
| `aws_product`                | Le service AWS facturé.|
| `aws_product_family`         | La catégorie du service AWS facturé (par exemple, Compute ou Storage).|
| `aws_management_account_name`| Le nom du compte de gestion AWS associé à l'élément.|
| `aws_management_account_id`  | L'ID du compte de gestion AWS associé à l'élément.|
| `aws_member_account_name`    | Le nom du compte membre AWS associé à l'élément.|
| `aws_member_account_id`      | L'ID du compte membre AWS associé à l'élément.|
| `aws_cost_type`              | Le type de charge couvert par cet élément (par exemple, Usage ou Tax).|
| `aws_pricing_term`           | Si l'utilisation est Reserved, Spot ou On-Demand.|
| `aws_reservation_arn`        | L'ARN de la Reserved Instance dont l'élément a bénéficié.|
| `aws_savings_plan_arn`       | L'ARN du Savings Plan dont l'élément a bénéficié.|
| `aws_usage_type`             | Les détails d'utilisation de l'élément (par exemple, BoxUsage:i3.8xlarge).|
| `aws_operation`              | L'opération associée à l'élément (par exemple, RunInstances).|
| `aws_region`                 | La région associée à l'élément (par exemple, us-east-1).|
| `aws_availability_zone`      | La zone de disponibilité associée à l'élément.|
| `aws_resource_id`            | L'ID de la ressource associée à l'élément.|
| `aws_instance_type`          | Le type d'instance de l'élément.|
| `aws_instance_family`        | La famille d'instances associée à votre élément (par exemple, Storage Optimized).|
| `aws_datatransfer_type`      | Le type de transfert de données associé à l'élément (par exemple, cross-zone ou cross-region).|
| `aws_datatransfer_direction` | La direction du transfert de données associée à l'élément (par exemple, in ou out).|
| `is_aws_ec2_compute`         | Si l'utilisation est liée à EC2 Compute.|
| `is_aws_ec2_compute_on_demand`| Si l'utilisation est On-Demand.|
| `is_aws_ec2_compute_reservation`| Si l'utilisation est associée à une Reserved Instance.|
| `is_aws_ec2_capacity_reservation`| Si l'utilisation est associée à une Capacity Reservation.|
| `is_aws_ec2_spot_instance`   | Si l'utilisation est associée à une Spot Instance.|
| `is_aws_ec2_savings_plan`    | Si l'utilisation est associée à un Savings Plan.|
| `aws_bill_entity` | Le vendeur AWS avec lequel votre compte est associé. Les transactions peuvent être soit un achat sur le marché AWS (`AWS Marketplace`), soit un achat d'autres services AWS (`AWS`). |
| `aws_bill_type` | Le type de facture que ce rapport couvre (tel que `Purchase`). |
| `aws_cost_type` | Le type de charge couvrant l'élément de ligne (tel que `SavingsPlanCoveredUsage`). |
| `aws_discount_lease_term` | La durée pendant laquelle une Reserved Instance est réservée. |
| `aws_discount_purchase_option` | Comment vous avez choisi de payer pour une réservation (tel que `All Upfront`). |
| `aws_ec2_compute_product_family` | Le type d'utilisation pour un élément de ligne EC2 Compute (tel que `BoxUsage` ou `SpotUsage`). |
| `aws_pricing_usage_unit` | L'unité de tarification qu'AWS a utilisée pour calculer le coût d'utilisation (tel que `Hours`). |
| `aws_reservation_modification_status` | Indique si le bail RI a été modifié ou non (tel que `Manual`). |
| `bill/billing_entity` | Le vendeur AWS avec lequel votre compte est associé. Les transactions peuvent être soit un achat sur le marché AWS (`AWS Marketplace`), soit un achat d'autres services AWS (`AWS`). |
| `bill/bill_type` | Le type de facture que ce rapport couvre (tel que `Purchase`). |
| `bill/invoicing_entity` | L'entité AWS qui émet la facture. |
| `bill/payer_account_id` | L'ID du compte payant. Pour une organisation dans AWS Organizations, il s'agit de l'ID du compte de gestion. |
| `is_aws_ec2_compute_savings_plan` | `true` pour les articles de ligne qui représentent l'utilisation d'EC2 Compute, payés avec un Savings Plan. |
| `line_item/currency_code` | La devise dans laquelle cet élément de ligne est affiché (`USD` par défaut). |
| `line_item/legal_entity` | Le fournisseur de vos services AWS. |
| `line_item/line_item_type` | Le type de charge couvert par l'article de ligne (tel que `Credit`). |
| `line_item/operation` | L'opération AWS spécifique couverte par l'article de ligne (tel que `RunInstances`). |
| `line_item/product_code` | Le code du produit mesuré (tel que `Amazon EC2` pour Amazon Elastic Cloud Compute). |
| `line_item/resource_id` | L'ID de la ressource individuelle associée à l'article de ligne (facultatif). |
| `line_item/tax_type` | Le type de taxe que AWS a appliqué à l'article de ligne. |
| `line_item/usage_account_id` | L'ID du compte qui a utilisé l'article de ligne. |
| `line_item/usage_type` | Les détails d'utilisation de l'article de ligne (tel que `USW2-BoxUsage:m2.2xlarge`). |
| `pricing/lease_contract_length` | La durée pendant laquelle la Reserved Instance est réservée. |
| `pricing/purchase_option` | Comment vous avez choisi de payer pour l'article de ligne (tel que `All Upfront`). |
| `pricing/term` | Si votre utilisation d'AWS est `Reserved` ou `On-Demand`. |
| `pricing/unit` | L'unité de tarification que AWS a utilisée pour calculer le coût d'utilisation (tel que `Hours`). |
| `reservation/availability_zone` | La zone de disponibilité de la ressource associée à l'article de ligne (tel que `us-east-1`). |
| `reservation/modification_status` | Indique si le RI lease a été modifié ou inchangé (tel que `Manual`). |
| `reservation/reservation_arn` | L'ARN de la Reserved Instance dont l'article de ligne a bénéficié. |
| `reservation/subscription_id` | L'ID unique qui associe l'article de ligne à l'offre associée. |
| `savings_plan/instance_type_family` | La famille d'instances associée à l'utilisation spécifiée (tel que `m4`). |
| `savings_plan/offering_type` | Le type de Savings Plan acheté (tel que `ComputeSavingsPlans`). |
| `savings_plan/payment_option` | Les options de paiement disponibles pour le Savings Plan (tel que `All Upfront`). |
| `savings_plan/purchase_term` | Décrit la durée ou le terme du Savings Plan (tel que `1yr`). |
| `savings_plan/region` | La région AWS qui héberge les services AWS (tel que `US East (N. Virginia)`). |
| `savings_plan/savings_plan_arn` | L'identifiant unique du Savings Plan. |

#### Corrélation des coûts et de l'observabilité {#cost-and-observability-correlation}

Il est important de visualiser les coûts dans le contexte des données d'observabilité pour comprendre comment les changements d'infrastructure impactent les coûts, identifier pourquoi les coûts changent et optimiser l'infrastructure pour les coûts et la performance. Datadog met à jour les étiquettes d'identification des ressources sur les données de coût pour les principaux produits AWS afin de simplifier la corrélation entre les métriques d'observabilité et de coût.

Par exemple, pour visualiser le coût et l'utilisation de chaque base de données RDS, vous pouvez créer un tableau avec `aws.cost.amortized`, `aws.rds.cpuutilization` et `aws.rds.freeable_memory` (ou toute autre métrique RDS) et regrouper par `dbinstanceidentifier`. Pour voir l'utilisation et les coûts de Lambda côte à côte, vous pouvez tracer `aws.lambda.concurrent_executions` et `aws.cost.amortized` regroupés par `functionname`.

Les étiquettes prêtes à l'emploi suivantes sont disponibles :

| Produit AWS                  | Étiquette       |
| ---------------------------- | ----------------- |
| ec2                | `instance_id`|
| s3         | `bucketname`|
| rds         | `dbinstanceidentifier`|
| lambda         | `functionname`|
| dynamodb         | `tablename`|
| elasticache      | `cacheclusterid`|
| cloudfront (distribution)  | `distributionid`|
| cloudfront (function)  | `functionname`|
| ec2 natgateway | `natgatewayid`|
| redshift         | `clusteridentifier`|
| kinesis         | `streamname`|
| queue         | `queuename`|
| sns         | `topicname`|
| elb (application, gateway, réseau) | `loadbalancer`|
| elb (tous les autres coûts) | `loadbalancername` |

### Orchestrateurs de conteneurs {#container-orchestrators}

L'allocation des coûts des conteneurs ajoute des étiquettes provenant des charges de travail générant des coûts. Les exemples incluent des étiquettes provenant des pods et nœuds Kubernetes ainsi que des tâches et conteneurs ECS.

_Nécessite [l'allocation des coûts des conteneurs][11], et s'applique uniquement aux `shared.resources.allocated` métriques._

### Pipelines d'étiquettes {#tag-pipelines}

Enfin, tous les ensembles de règles de votre [pipeline de tags][15] sont appliqués, ce qui permet une décomposition complète des coûts lorsque l'ajout des tags d'infrastructure n'est pas possible. Les pipelines d'étiquettes constituent la dernière couche d'enrichissement et ajoutent de nouvelles étiquettes à vos données de coûts.

## Billing Conductor {#billing-conductor}
[AWS Billing Conductor][16] est un service de facturation personnalisé pour les partenaires du canal AWS Marketplace et les organisations ayant des exigences de refacturation.
Billing Conductor permet aux clients de créer une seconde version pro forma de leurs coûts à partager avec leurs clients ou propriétaires de compte.
Les tarifs de facturation, crédits et frais, ainsi que les coûts indirects peuvent être personnalisés à votre discrétion. Vous pouvez également sélectionner les comptes à inclure dans le CUR.

**Limitations importantes** :
- Les rapports de coûts et d'utilisation pro forma n'incluent pas les remises et les taxes, ce qui rend difficile la comparaison des coûts dans Datadog avec AWS Cost Explorer.
- Ajouter des comptes à un groupe de facturation impacte la manière dont les Reservations et Savings Plans sont partagés entre les comptes AWS.

Pour créer un CUR de Billing Conductor, suivez le [guide de l'utilisateur des rapports de coûts et d'utilisation AWS][8]. Assurez-vous que le CUR répond aux [exigences de Datadog][9].
Après la création du CUR de Billing Conductor, suivez les instructions de Cloud Cost Management ci-dessus pour le configurer dans Datadog.

## Lectures complémentaires {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-create-legacy.html
[2]: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html
[3]: https://us-east-1.console.aws.amazon.com/cost-management/home?region=us-east-1#/settings
[4]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-view.html
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[6]: https://docs.aws.amazon.com/cur/latest/userguide/data-dictionary.html
[7]: https://app.datadoghq.com/cost/setup
[8]: https://docs.aws.amazon.com/cur/latest/userguide/cur-data-view.html
[9]: /fr/cloud_cost_management/setup/aws/#prerequisite-generate-a-cost-and-usage-report
[10]: https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html
[11]: /fr/cloud_cost_management/container_cost_allocation/#applying-tags
[12]: https://docs.aws.amazon.com/tag-editor/latest/userguide/tagging.html
[13]: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/activating-tags.html
[14]: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_tagging.html
[15]: /fr/cloud_cost_management/allocation/tag_pipelines
[16]: https://docs.aws.amazon.com/billingconductor/latest/userguide/what-is-billingconductor.html
[17]: https://app.datadoghq.com/cost/settings/accounts
[18]: /fr/help/
[19]: /fr/cloud_cost_management/tags
[20]: https://docs.aws.amazon.com/cur/latest/userguide/troubleshooting.html#backfill-data
[21]: /fr/api/latest/cloud-cost-management/#create-cloud-cost-management-aws-cur-config
[22]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/aws_cur_config