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
  text: Mieux comprendre votre facture Azure
- link: /cloud_cost_management/google_cloud
  tag: Documentation
  text: Mieux comprendre votre facture Google Cloud
- link: /cloud_cost_management/oracle
  tag: Documentation
  text: Mieux comprendre votre facture Oracle
title: AWS
---


## Présentation

Pour configurer Cloud Cost Management dans Datadog, vous avez besoin de ce qui suit :
1. Un compte AWS avec accès à la facturation
2. L'intégration AWS installée dans Datadog
3. Un rapport sur les coûts et l'utilisation (suivez les étapes ci-dessous pour en créer un)

## Configuration

### Configurer l'intégration AWS

Accédez à [Setup & Configuration][7] et sélectionnez un compte AWS dans le menu déroulant pour récupérer les coûts associés.

**Remarque** : Datadog recommande de configurer un rapport sur les coûts et l'utilisation à partir d'un [**compte de gestion** AWS][2] pour pouvoir accéder aux coûts des **comptes de membres** associés. 

Si vous envoyez un rapport sur les coûts et l'utilisation à partir d'un **compte de membre** AWS, assurez-vous d'avoir sélectionné les options suivantes dans les [préférences][3] de votre **compte de gestion** :
- **Linked Account Access**
- **Linked Account Refunds and Credits**
- **Linked Account Discounts**

Ces paramètres permettent de calculer les coûts périodiques et de les comparer à ceux de l'AWS Cost Explorer, afin de garantir la précision des coûts.

{{< tabs >}}

{{% tab "CloudFormation" %}}

{{< img src="cloud_cost/setup/aws_cloudformation_setup.jpg" alt="Formulaire de configuration Cloud Cost Management en mode CloudFormation" style="width:100%" >}}

### Sélectionner les ressources à créer

La pile CloudFormation peut être configurée de trois manières différentes selon vos ressources AWS existantes :

* **Nouvelle configuration** : sélectionnez **Create Cost and Usage Report** pour créer à la fois le rapport et son compartiment S3.
* **Compartiment existant** : sélectionnez **Create Cost and Usage Report** et désélectionnez **Create S3 Bucket** pour utiliser votre compartiment S3 existant.
* **Rapport existant** : désélectionnez **Create Cost and Usage Report** pour importer un rapport existant sur les coûts et l'utilisation.

### Configurer les paramètres du rapport sur les coûts et l'utilisation

Renseignez les informations suivantes pour votre rapport sur les coûts et l'utilisation :

* **Bucket Name** : le nom du compartiment S3 dans lequel les fichiers de rapport sont stockés.
* **Bucket Region** : le [code de région][100] AWS de la région contenant votre compartiment S3, par exemple `us-east-1`.
* **Export Path Prefix** : le préfixe du chemin S3 où les fichiers de rapport sont stockés.
* **Export Name** : le nom du rapport sur les coûts et l'utilisation.

**Remarques** :
- Ces valeurs permettent de repérer votre rapport sur les coûts et l'utilisation existant ou de définir les paramètres des nouvelles ressources créées.
- Après la génération d'un rapport complet sur les coûts et l'utilisation, il peut s'écouler entre 48 et 72 heures avant que toutes les données disponibles ne soient renseignées au sein de votre organisation Datadog. Passé ce délai, si aucune donnée n'est fournie, contactez l'[assitance Datadog][18].

[100]: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html

{{% /tab %}}

{{% tab "Méthode manuelle" %}}

{{< img src="cloud_cost/setup/aws_manual_setup.jpg" alt="Formulaire de configuration Cloud Cost Management en mode manuel" style="width:100%" >}}

### Prérequis : générer un rapport de coûts et d'utilisation

[Créez un ancien rapport sur les coûts et l'utilisation][201] dans AWS depuis la section **Data Exports**.

Sélectionnez le type d'exportation **Legacy CUR export**.

Sélectionnez les options suivantes dans la section Content :

* Type d'exportation : **Legacy CUR export**
* **Include resource IDs**
* **Split cost allocation data** (permet d'activer l'allocation des coûts ECS ; vous devez également activer l'[allocation des coûts AWS répartis][210] dans les préférences du Cost Explorer)
* **"Refresh automatically"**

Sélectionnez les options de création suivantes :

* Granularité temporelle : **Hourly**
* Versions du rapport : **Create new report version**
* Type de compression : **GZIP** ou **Parquet**

### Accéder au rapport de coûts et d'utilisation

Si vous avez fermé le rapport créé dans la section des prérequis, consultez la documentation AWS pour [visualiser vos exportations de données][204]. Sélectionnez l'ancienne exportation de rapport sur les coûts et l'utilisation que vous avez créée, puis sélectionnez **Edit** pour afficher les détails de l'exportation.

Pour permettre à Datadog d'accéder au rapport de coûts et d'utilisation, remplissez les champs avec les informations pertinentes :

* **Bucket Name** : il s'agit du nom du **compartiment S3** indiqué dans les paramètres de stockage des exportations de données.
* **Bucket Region** : il s'agit de la région de votre compartiment. Exemple : `us-east-1`.
* **Export Path Prefix** : il s'agit du **préfixe du chemin S3** indiqué dans les paramètres de stockage des exportations de données.
* **Export Name** : il s'agit du **nom de l'exportation** défini à la section dédiée.

**Remarque** : Datadog prend uniquement en charge les anciens rapports sur les coûts et l'utilisation générés par AWS. Évitez de modifier ou de déplacer les fichiers générés par AWS. Ne tentez pas non plus d'accorder l'accès à des fichiers générés par un tiers.

{{< site-region region="gov" >}}
<div class="alert alert-danger">L'endpoint AWS des rapports sur les coûts et l'utilisation sert à valider les informations des champs ci-dessus en les comparant à l'exportation du rapport dans votre compartiment S3. Cet endpoint ne respecte pas la norme FIPS.</div>
{{< /site-region >}}

### Configurer l'accès au rapport de coûts et d'utilisation

[Créer une stratégie][205] dans AWS pour vous assurer que Datadog puisse accéder au rapport sur les coûts et l'utilisation ainsi qu'au compartiment S3 dans lequel il est stocké. Utilisez le JSON suivant :

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

**Remarque :** notez le nom de votre nouvelle stratégie, car vous en aurez besoin pour les prochaines étapes.

### Associer la stratégie au rôle de l'intégration Datadog

Associez la nouvelle stratégie S3 au rôle de l'intégration Datadog.

1. Accédez à **Roles** depuis la console IAM d'AWS.
2. Repérez le rôle utilisé par l'intégration Datadog. Il est intitulé **DatadogIntegrationRole** par défaut, mais il est possible que votre organisation l'ait renommé. Cliquez sur le nom du rôle pour ouvrir une page de synthèse.
3. Cliquez sur **Attach policies**.
4. Saisissez le nom de la stratégie de compartiment S3 créée précédemment.
5. Cliquez sur **Attach policy**.

**Remarque** : après la génération d'un rapport complet sur les coûts et l'utilisation, il peut s'écouler entre 48 et 72 heures avant que toutes les données disponibles ne soient renseignées au sein de votre organisation Datadog. Passé ce délai, si aucune donnée n'est fournie, contactez l'[assitance Datadog][18].

[201]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-create-legacy.html
[204]: https://docs.aws.amazon.com/cur/latest/userguide/dataexports-view.html
[205]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[210]: https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html

{{% /tab %}}

{{< /tabs >}}

### Filtrage des comptes

Utilisez le filtrage des comptes pour contrôler les comptes de membre AWS qui doivent être importés dans Cloud Cost Management. Le filtrage des comptes n'entraîne pas de coûts supplémentaires dans Datadog.

L'utilisation du filtrage des comptes nécessite un compte de gestion AWS. Vous pouvez configurer les filtres de compte après avoir configuré un compte dans Cloud Cost Management.

**Remarque :** les filtres de compte ne sont pas pris en charge pour les recommandations ou la recherche de tags.

#### Configurer des filtres de compte pour un compte existant

Accédez à [**Cloud Cost** > **Settings**, select **Accounts**][17], puis cliquez sur **Manage Account** pour le compte de gestion que vous souhaitez filtrer.

{{< img src="cloud_cost/account_filtering/manage_account.png" alt="Bouton Manage Account sur la fiche d'un compte" style="width:100%;" >}}

Cliquez sur **Billing dataset** pour accéder à l'interface de filtrage des comptes.

{{< img src="cloud_cost/account_filtering/account_filtering.png" alt="Interface de filtrage des comptes de membre AWS" style="width:100%;" >}}

## Types de coûts

Visualisez vos données ingérées à l'aide des types de coûts par défaut. Les différents types de coûts se distinguent principalement par la manière dont ils reflètent les réductions, les programmes de remise et les réservations.

### On-demand
Les coûts **On-demand** représentent les coûts d'utilisation à la demande au tarif public publié par AWS. Ce tarif ne tient pas compte des programmes de remise, des réservations, des réductions, des taxes et des frais.

**Remarque** : dans la plupart des cas, les coûts à la demande ne permettent pas d'estimer de manière fiable les coûts réels.

### Coûts Amortized et Unblended
Les métriques de coûts **Amortized** reflètent les économies liées à l'engagement sur toute la durée de l'escompte. C'est aussi ce qu'on appelle la base de régularisation, ou _accrual basis_. Les réservations et les programmes de remise sont établis à partir d'un engagement mensuel et appliqués directement à l'utilisation couverte, et ce en temps réel. Le solde inutilisé est comptabilisé sous forme de frais.

À l'inverse, les métriques de coûts **Unblended** représentent toutes les charges à la date à laquelle elles ont été encourues. C'est ce qu'on appelle aussi la base des coûts, ou _cost basis_. Les frais liés aux réservations et aux programmes de remise apparaissent à la date à laquelle ils ont été facturés et ne sont pas appliqués directement à l'utilisation couverte. Une fois les données de facturation d'un mois donné finalisées, les métriques unblended correspondent exactement à la facture AWS.

### Coûts Net
Les coûts **Net** appliquent les réductions privées directement à l'utilisation. Le coût d'utilisation d'une ressource spécifique représente le coût effectif une fois toutes les économies appliquées.

À l'inverse, les autres métriques présentent les remises privées en tant que postes distincts, à valeur négative, sans tags d'attribution des ressources. Plutôt que d'attribuer les remises directement à l'utilisation, ces métriques les soustraient du coût total.

Les coûts **Net Amortized** offrent la représentation la plus juste de l'allocation des coûts, toutes les remises étant appliquées directement à l'utilisation. Ces métriques sont disponibles si des remises d'entreprise ont été négociées en privé pour votre compte AWS. Si votre compte ne possède pas de remise d'entreprise, les coûts **Net Amortized** et **Amortized** sont identiques.

### Allocation des conteneurs
Les métriques **Container allocation** représentent les mêmes coûts que les métriques AWS, mais offrent des informations supplémentaires en fonction des charges de travail des conteneurs. Consultez la section [Allocation des coûts des conteneurs][11] pour en savoir plus.

### Exemple
L'exemple qui suit illustre le comportement des différents types de coûts. Imaginons les conditions suivantes :
- Une instance EC2 qui s'exécute pendant une heure pour un coût de 3 $ par heure de calcul.
- Un programme de remise qui fait que ce type d'instance ne vous coûte que 2 $ par heure de calcul.
- Une remise EDP de 10 % qui vient s'ajouter à toutes les autres remises.

Voici comment le coût de l'instance, l'engagement horaire du programme de remise et les réductions sont représentés pour chaque type de coût :

|Type de coût |Utilisation |Programme de remise |Réduction | Explication |
|:---------|-|-|-|:------------------------------------------------|
|On-demand |3,00 $|||Le tarif public en cas de facturation à la demande.|
|Unblended |3,00 $|2,00 $|-0,20 $|Les frais récurrents liés au programme de remise et la réduction EDP sont des postes distincts, qui ne sont pas associés à une ressource spécifique. (**Remarque :** le coût de 3 $ par ressource est compensé par `SavingsPlanNegation`). |
|Net Unblended||1,80 $||Les frais récurrents liés au programme de remise apparaissent sous forme de poste distinct avec la remise appliquée ; le coût n'est associé à aucune ressource spécifique.|
|Amortized |2,00 $||-0,20 $|Les frais réduits liés au programme de remise sont appliqués directement au coût de la ressource. La réduction EDP est affichée sous forme de poste distinct. |
|Net Amortized |1,80 $|||Les frais réduits liés au programme de remise et la réduction EDP sont directement appliqués au coût de la ressource. |
|Net Amortized - Shared Resources Allocated |1,80 $|||Le coût est identique au coût Net Amortized, mais vous avez la possibilité de le décomposer en fonction des dimensions Kubernetes et des tags de pod. |

### Résumé des métriques de coûts

En règle générale :
- `aws.cost.net.amortized.shared.resources.allocated` offre la répartition des coûts la plus détaillée pour des charges de travail et des équipes spécifiques.
- Si vous ne bénéficiez pas de l'allocation des coûts en fonction des conteneurs, utilisez `aws.cost.net.amortized`.
- Si vous ne bénéficiez pas des coûts Net Amortized, utilisez `aws.cost.amortized.shared.resources.allocated` ou `aws.cost.amortized`.

| Métrique               | Rôle           |
| -------------------- | --------------------- |
| `aws.cost.net.amortized.shared.resources.allocated` | L'ensemble de vos coûts Net Amortized AWS, avec la possibilité de les décomposer en fonction des charges de travail des conteneurs. Nécessite l'[Allocation des coûts des conteneurs][11].|
| `aws.cost.net.amortized` | Les coûts Net Amortized, sans possibilité de les décomposer en fonction des conteneurs. |
| `aws.cost.net.unblended` | Les coûts Net Unblended, sans possibilité de les décomposer en fonction des conteneurs. Correspond à la facture AWS, les remises spéciales étant déjà appliquées aux coûts d'utilisation. |
| `aws.cost.amortized.shared.resources.allocated` | L'ensemble de vos coûts Amortized AWS, avec la possibilité de les décomposer en fonction des charges de travail des conteneurs. Nécessite l'[Allocation des coûts des conteneurs][11].|
| `aws.cost.amortized` | Les coûts Amortized, sans possibilité de les décomposer en fonction des conteneurs. |
| `aws.cost.unblended` | Les coûts Unblended, sans possibilité de les décomposer en fonction des conteneurs. Correspond à la facture AWS. |
| `aws.cost.ondemand`  | Les coûts calculés en fonction des tarifs publics AWS. Ces coûts ne tiennent pas compte des programmes de remise, des réservations, des réductions, des taxes et des frais. |

## Comment Datadog enrichit vos données de coûts AWS avec des tags

Datadog enrichit automatiquement vos données de coûts AWS en y ajoutant des tags provenant de plusieurs sources. Pour découvrir plus en détail comment les tags sont appliqués aux données de coûts, consultez la section [Tags][19].

Les tags source suivants sont disponibles pour AWS :

- Colonnes du rapport de coûts et d'utilisation
- Tags des ressources AWS
- Tags du compte AWS
- Tags de l'intégration AWS
- Tags par défaut
- Tags des charges de travail des conteneurs
- Pipelines de tags

### Colonnes du rapport de coûts et d'utilisation

Toutes les colonnes contenant des chaînes du [Rapport de coût et d'utilisation AWS][6] sont ajoutées en tant que tags aux métriques de coûts.

Pour plus de cohérence, Datadog normalise les clés de tags en utilisant des underscores et des minuscules. Par exemple, la colonne `lineItem/ResourceId` du rapport correspond à la clé de tag `line_item/resource_id`. Les valeurs des tags ne sont généralement pas modifiées : la casse et la plupart des caractères spéciaux restent tels quels.

**Exemples :**

|Colonne du rapport|Valeur du rapport|Tag des coûts du cloud|
|---|---|---|
|lineItem/ResourceId|i-12345678a9b12cd3e|line_item/resource_id:i-12345678a9b12cd3e|
|product/region|us-east-1|product/region:us-east-1|
|product/usagetype|DataTransfer-Regional-Bytes|product/usagetype:DataTransfer-Regional-Bytes|

### Tags des ressources AWS

Les [tags de ressources AWS][12] sont des tags définis par l'utilisateur qui apparaissent dans la console AWS lorsque vous consultez une ressource spécifique, telle qu'une instance EC2 ou un compartiment S3.

Lorsque vous activez l'intégration AWS/Datadog, Datadog recueille automatiquement des tags de ressources pour la plupart des ressources AWS. Ces tags sont appliqués à l'ensemble des coûts figurant dans le rapport de coût et d'utilisation pour une ressource donnée. Les tags de ressources sont récupérés de façon périodique et appliqués aux données de coûts à partir du jour où ils ont été créés ou modifiés. Les valeurs historiques des tags ne sont pas supprimées lorsque les tags sont modifiés.

Si l'intégration AWS n'est pas configurée, vous pouvez activer l'ajout des tags de ressources en activant l'option [Cost allocation tags][13] dans la facturation AWS. Vous pourrez ainsi sélectionner les clés de tags de ressources à inclure en tant que colonnes dans le rapport de coût AWS. Datadog ajoute automatiquement ces colonnes en tant que tags lors du traitement du rapport.

### Tags de l'organisation et du compte AWS
Les organisations AWS prennent en charge les [tags définis par l'utilisateur][14] sur les unités organisationnelles et les comptes. Datadog récupère et applique automatiquement ces tags aux données de coûts. Les tags de compte sont appliqués à toutes les utilisations associées à ces comptes. Les tags d'organisation sont appliqués à toutes les données de facturation pour le compte payeur correspondant.

_L'intégration AWS/Datadog doit être configurée sur le compte de l'organisation._

### Tags de l'intégration AWS

Les tags d'intégration AWS sont des tags définis depuis le carré de l'intégration AWS dans Datadog. Ils sont appliqués à l'ensemble des coûts figurant dans le rapport de coût et d'utilisation pour le compte AWS associé.

### Tags par défaut
Datadog ajoute des tags par défaut aux données de coûts ingérées, vous permettant ainsi d'obtenir une vue plus détaillée de vos coûts et de mieux les décomposer. Ces tags sont issus de votre [rapport de coûts et d'utilisation][6] et vous permettent d'analyser vos données plus en profondeur.

Les tags par défaut suivants peuvent être utilisés pour filtrer et regrouper vos données :

| Tag                          | Rôle       |
| ---------------------------- | ----------------- |
| `aws_product`                | Le service AWS facturé.|
| `aws_product_family`         | La catégorie du service AWS facturé (par exemple, Compute ou Storage).|
| `aws_management_account_name`| Le nom du compte de gestion AWS associé à l'élément.|
| `aws_management_account_id`  | L'identifiant du compte de gestion AWS associé à l'élément.|
| `aws_member_account_name`    | Le nom du compte de membre AWS associé à l'élément.|
| `aws_member_account_id`      | L'ID du compte de membre AWS associé à l'élément.|
| `aws_cost_type`              | Le type de dépense couverte par cet élément (par exemple, Usage ou Tax).|
| `aws_pricing_term`           | Indique si l'utilisation est de type Reserved, Spot ou On Demand.|
| `aws_reservation_arn`        | L'ARN de l'instance réservée dont l'élément a bénéficié.|
| `aws_savings_plan_arn`       | L'ARN du programme de remise dont l'élément a bénéficié.|
| `aws_usage_type`             | Les détails de l'utilisation de l'élément (par exemple, BoxUsage:i3.8xlarge).|
| `aws_operation`              | L'opération associée à l'élément (par exemple, RunInstances).|
| `aws_region`                 | La région associée à l'élément (par exemple, us-east-1).|
| `aws_availability_zone`      | La zone de disponibilité associée à l'élément.|
| `aws_resource_id`            | L'ID de resource associé à l'élément.|
| `aws_instance_type`          | Le type d'instance de l'élément.|
| `aws_instance_family`        | La famille d'instance associée à votre élément (Storage optimized, par exemple).|
| `aws_datatransfer_type`      | Le type de transfert de données associé à l'élément (par exemple, cross-zone ou cross-region).|
| `aws_datatransfer_direction` | Le sens du transfert de données associé à l'élément (par exemple, in ou out).|
| `is_aws_ec2_compute`         | Indiquez si l'utilisation est liée au calcul EC2.|
| `is_aws_ec2_compute_on_demand`| Indiquez si l'utilisation est à la demande.|
| `is_aws_ec2_compute_reservation`| Indique si l'utilisation est associée à une instance réservée.|
| `is_aws_ec2_capacity_reservation`| Indique si l'utilisation est associée à une réservation de capacité.|
| `is_aws_ec2_spot_instance`   | Indique si l'utilisation est associée à une instance Spot.|
| `is_aws_ec2_savings_plan`    | Indiquez si l'utilisation est associée à un programme de remise.|
| `aws_bill_entity` | Le vendeur AWS associé à votre compte. Les transactions peuvent correspondre à un achat sur l'AWS Marketplace (`AWS Marketplace`) ou un achat d'autres services AWS (`AWS`). |
| `aws_bill_type` | Le type de facture couvert par ce rapport (par exemple `Purchase`). |
| `aws_cost_type` | Le type de dépense couvrant le poste spécifique (par exemple `SavingsPlanCoveredUsage`). |
| `aws_discount_lease_term` | La durée de réservation d'une instance réservée. |
| `aws_discount_purchase_option` | Le mode de paiement choisi pour une réservation (par exemple `All Upfront`). |
| `aws_ec2_compute_product_family` | Le type d'utilisation d'un poste de calcul EC2 (par exemple `BoxUsage` ou `SpotUsage`). |
| `aws_pricing_usage_unit` | L'unité de tarification utilisée par AWS pour calculer le coût d'utilisation (par exemple `Hours`). |
| `aws_reservation_modification_status` | Indique si le bail d'instance réservée a été modifié ou non (exemple : `Manual`). |
| `bill/billing_entity` | Le vendeur AWS associé à votre compte. Les transactions peuvent correspondre à un achat sur l'AWS Marketplace (`AWS Marketplace`) ou un achat d'autres services AWS (`AWS`). |
| `bill/bill_type` | Le type de facture couvert par ce rapport (par exemple `Purchase`). |
| `bill/invoicing_entity` | L'entité AWS qui émet la facture. |
| `bill/payer_account_id` | L'ID de compte du compte payeur. Pour une organisation faisant partie d'AWS Organizations, il s'agit de l'ID de compte du compte de gestion. |
| `is_aws_ec2_compute_savings_plan` | `true` pour les postes qui représentent une utilisation de calcul EC2, payée à l'aide d'un programme de remise. |
| `line_item/currency_code` | La devise dans laquelle ce poste est affiché (`USD` par défaut). |
| `line_item/legal_entity` | Le fournisseur de vos services AWS. |
| `line_item/line_item_type` | Le type de dépense couverte par le poste (par exemple `Credit`). |
| `line_item/operation` | L'opération AWS spécifique couverte par le poste (par exemple `RunInstances`). |
| `line_item/product_code` | Le code du produit mesuré (par exemple `Amazon EC2` pour Amazon Elastic Cloud Compute). |
| `line_item/resource_id` | L'ID de ressource individuel associée au poste (facultatif). |
| `line_item/tax_type` | Le type de taxe appliqué par AWS au poste. |
| `line_item/usage_account_id` | L'ID du compte qui a utilisé le poste. |
| `line_item/usage_type` | Les détails de l'utilisation du poste (par exemple `USW2-BoxUsage:m2.2xlarge`). |
| `pricing/lease_contract_length` | La durée de réservation de l'instance réservée. |
| `pricing/purchase_option` | Le mode de paiement choisi pour le poste (par exemple `All Upfront`). |
| `pricing/term` | Indique si votre utilisation d'AWS est `Reserved` ou `On-Demand`. |
| `pricing/unit` | L'unité de tarification utilisée par AWS pour calculer le coût d'utilisation (par exemple `Hours`). |
| `reservation/availability_zone` | La zone de disponibilité de la ressource associée au poste (par exemple `us-east-1`). |
| `reservation/modification_status` | Indique si le bail d'instance réservée a été modifié ou non (exemple : `Manual`). |
| `reservation/reservation_arn` | L'ARN de l'instance réservée dont le poste a bénéficié. |
| `reservation/subscription_id` | L'ID unique mappe le poste à l'offre associée. |
| `savings_plan/instance_type_family` | La famille d'instances associée à l'utilisation spécifiée (par exemple `m4`). |
| `savings_plan/offering_type` | Le type de programme de remise souscrit (par exemple `ComputeSavingsPlans`). |
| `savings_plan/payment_option` | Les options de paiement disponibles pour le programme de remise (par exemple `All Upfront`). |
| `savings_plan/purchase_term` | Décrit la durée ou le terme du programme de remise (par exemple `1yr`). |
| `savings_plan/region` | La région AWS qui héberge les services AWS (par exemple `US East (N. Virginia)`). |
| `savings_plan/savings_plan_arn` | L'ID unique du programme de remise. |

#### Corrélation entre les coûts et les données d'observabilité

Visualiser les coûts à l'aide de données d'observabilité est essentiel pour comprendre l'impact des modifications apportées à l'infrastructure sur les coûts, déterminer les raisons pour lesquelles les coûts évoluent, et optimiser les coûts et performances de l'infrastructure. Datadog ajoute les tags d'identification de ressource aux données de coûts pour les principaux produits AWS, afin de simplifier la mise en corrélation des données d'observabilité et des métriques de coûts.

Par exemple, pour consulter l'utilisation et le coût de chaque base de données RDS, vous pouvez créer un tableau avec `aws.cost.amortized`, `aws.rds.cpuutilization` et `aws.rds.freeable_memory` (ou toute autre métrique RDS) et effectuer un regroupement en fonction de `dbinstanceidentifier`. Pour comparer visuellement les données d'utilisation et de coût Lambda, vous pouvez représenter `aws.lambda.concurrent_executions` et `aws.cost.amortized` au sein d'un graphique, en effectuant un regroupement selon `functionname`.

Les tags par défaut suivants sont disponibles :

| Produit AWS                  | Tag       |
| ---------------------------- | ----------------- |
| ec2                | `instance_id`|
| s3         | `bucketname`|
| rds         | `dbinstanceidentifier`|
| lambda         | `functionname`|
| dynamodb         | `tablename`|
| elasticache      | `cacheclusterid`|
| cloudfront (distribution)  | `distributionid`|
| cloudfront (fonction)  | `functionname`|
| ec2 natgateway | `natgatewayid`|
| redshift         | `clusteridentifier`|
| kinesis         | `streamname`|
| queue         | `queuename`|
| sns         | `topicname`|
| elb (application, passerelle, réseau) | `loadbalancer`|
| elb (tous les autres coûts) | `loadbalancername` |

### Orchestrateurs de conteneurs

La fonctionnalité d'allocation des coûts en fonction des conteneurs ajoute des tags issus des charges de travail qui génèrent des coûts. Il peut par exemple s'agir des tags associés aux pods et aux nœuds Kubernetes, ainsi qu'aux tâches et aux conteneurs ECS.

_Nécessite l'[Allocation des coûts des conteneurs][11] et s'applique uniquement aux métriques `shared.resources.allocated`._

### Pipelines de tags

Enfin, tous les ensembles de règles de votre [pipeline de tags][15] sont appliqués, ce qui permet une allocation complète des coûts lorsque l'ajout de tags d'infrastructure n'est pas possible. Les pipelines de tags constituent la dernière étape d'enrichissement : ils ajoutent de nouveaux tags à vos données de coûts.

## Billing Conductor
[AWS Billing Conductor][16] est un service de facturation personnalisé destiné aux partenaires de distribution d'AWS Marketplace et aux organisations qui ont des exigences en matière de rétrofacturation.
Billing Conductor permet aux clients de créer une deuxième version pro forma de leurs coûts à partager avec leurs clients ou les propriétaires de comptes.
Les taux de facturation, les crédits et les frais, ainsi que les frais généraux, peuvent être personnalisés à votre guise. Vous pouvez également sélectionner les comptes à inclure dans le rapport sur les coûts et l'utilisation.

**Limitations importantes** : 
- Les rapports sur les coûts et d'utilisation pro forma n'incluent pas les remises ni les taxes, ce qui rend difficile la comparaison des coûts dans Datadog avec ceux dans l'AWS Cost Explorer.
- L'ajout de comptes à un groupe de facturation a une incidence sur la manière dont les réservations et les programmes de remise sont partagés entre les comptes AWS.

Pour créer un rapport à l'aide du conducteur de facturation, suivez les instructions figurant dans le [guide d'utilisation des rapports de coûts et d'utilisation AWS][8]. Assurez-vous que le rapport répond aux [exigences de Datadog][9].
Une fois le rapport créé à l'aide du conducteur de facturation, suivez les instructions relatives à la solution Cloud Cost Management ci-dessus pour la configurer dans Datadog.

## Pour aller plus loin
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
[15]: /fr/cloud_cost_management/tags/tag_pipelines
[16]: https://docs.aws.amazon.com/billingconductor/latest/userguide/what-is-billingconductor.html
[17]: https://app.datadoghq.com/cost/settings/accounts
[18]: /fr/help/
[19]: /fr/cloud_cost_management/tags