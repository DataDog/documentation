---
aliases:
- /fr/integrations/awsbilling/
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Cloud Cost Management
- link: /cloud_cost_management/azure
  tag: Documentation
  text: Obtenir des informations utiles sur votre facture Azure
- link: /cloud_cost_management/google_cloud
  tag: Documentation
  text: Obtenir des informations utiles sur votre facture Google Cloud
title: AWS
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Cost Management n'est pas pris en charge pour ce site.</div>
{{< /site-region >}}

## Présentation

Pour configurer Cloud Cost Management dans Datadog, vous devez :
1. Posséder un compte AWS avec droits d'accès à la facturation
2. Avoir installé l'intégration AWS dans Datadog
3. Suivre les étapes ci-dessous pour créer un rapport de coûts et d'utilisation

## Configuration

### Prérequis : générer un rapport de coûts et d'utilisation

[Créez un rapport de coûts et d'utilisation][1] dans AWS depuis la section **Legacy Pages**. À l'heure actuelle, il n'est pas possible d'exporter les données de ces rapports.

Sélectionnez les options suivantes dans la section Content :

* **Include resource IDs**
* **Split cost allocation data** (permet d'activer l'allocation des coûts ECS. Vous devez également activer l'option [AWS Split Cost Allocation][10] dans les préférences Cost Explorers).
* **"Refresh automatically"**

Sélectionnez les options suivantes dans la section Delivery :

* Granularité temporelle : **Hourly**
* Versions du rapport : **Create new report version**
* Type de compression : **GZIP** ou **Parquet**
* Format : `text/csv` ou `Parquet`

### Configurer l'intégration AWS

Accédez à [Setup & Configuration][7], puis sélectionnez le compte AWS dont vous souhaitez extraire les coûts dans le menu déroulant.

**Remarque** : Datadog recommande d'envoyer les rapports de coûts et d'utilisation depuis un [**compte de gestion** AWS][2] afin de visualiser les coûts des **comptes membres** associés. Si vous envoyez un rapport de coûts et d'utilisation depuis un **compte membre** AWS, assurez-vous d'avoir sélectionné les options suivantes dans les [préférences][3] de votre **compte de gestion** :

* **Linked Account Access**
* **Linked Account Refunds and Credits**
* **Linked Account Discounts**

En procédant de la sorte, vous pouvez calculer les coûts périodiques et les comparer à ceux de AWS Cost Explorer afin de garantir la précision des coûts.

### Accéder au rapport de coûts et d'utilisation

Si vous avez fermé le rapport créé dans la section des prérequis de configuration, consultez la documentation AWS pour accéder de nouveau aux [détails de votre rapport de coûts et d'utilisation][4].

Pour permettre à Datadog d'accéder au rapport de coûts et d'utilisation, remplissez les champs avec les informations pertinentes :

* **Region** : il s'agit de la région de votre compartiment. Exemple : `us-east-1`.
* **Bucket Name** : il s'agit du nom du compartiment S3 dans lequel le rapport est enregistré.
* **Report Path Prefix** : il s'agit du nom du dossier. Si vous vous trouvez sur la page d'informations AWS, ce préfixe correspond à la première partie du chemin. Par exemple, si le **Report path prefix** a pour valeur `cur-report-dir/cost-report`, vous devez saisir `cur-report-dir` dans le champ.
* **Report Name** : il s'agit du nom que vous avez saisi dans la section des prérequis lors de la création du rapport. SI vous vous trouvez sur la page d'informations AWS, ce nom correspond à la deuxième partie du chemin. Par exemple, si **Report path prefix** a pour valeur `cur-report-dir/cost-report`, vous devez saisir `cost-report` dans le chemin.

**Remarque** : Datadog prend uniquement en charge les rapports de coûts et d'utilisation générés par AWS. Évitez de modifier ou de déplacer les fichiers générés par AWS. Ne tentez pas non plus d'accorder l'accès à des fichiers générés par un tiers.

### Configurer l'accès au rapport de coûts et d'utilisation

Configurez AWS de façon à ce que Datadog puisse accéder au rapport de coûts et d'utilisation ainsi qu'au compartiment S3 dans lequel il est stocké. Pour ce faire, [créez une stratégie][5] à l'aide du JSON suivant :

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

**Conseil :** notez le nom de votre nouvelle stratégie, car vous en aurez besoin pour les prochaines étapes.

### Associer la stratégie au rôle de l'intégration Datadog

Associez la nouvelle stratégie S3 au rôle de l'intégration Datadog.

1. Accédez à **Roles** depuis la console IAM d'AWS.
2. Repérez le rôle utilisé par l'intégration Datadog. Il est intitulé **DatadogIntegrationRole** par défaut, mais il est possible que votre organisation l'ait renommé. Cliquez sur le nom du rôle pour ouvrir une page de synthèse.
3. Cliquez sur **Attach policies**.
4. Saisissez le nom de la stratégie de compartiment S3 créée précédemment.
5. Cliquez sur **Attach policy**.

**Remarque :** une fois la configuration effectuée, les données peuvent mettre 48 à 72 heures à se stabiliser dans Datadog.

## Types de coûts

Visualisez vos données ingérées à l'aide des types de coûts par défaut. Les différents types de coûts se distinguent principalement par la manière dont ils reflètent les réductions, les programmes de remise et les réservations.

### On-demand
Les coûts **On-demand** sont les coûts d'utilisation à la demande au tarif public publié par AWS. Ce tarif ne tient pas compte des programmes de remise, des réservations, des réductions, des taxes et des frais.

Dans la plupart des cas, les coûts à la demande ne permettent pas d'estimer de manière fiable les coûts réels.

### Coûts Amortized et Unblended
Les métriques de coûts **Amortized** reflètent les économies liées à l'engagement sur toute la durée de l'escompte. C'est aussi ce qu'on appelle la base de régularisation, ou _accrual basis_. Les réservations et les programmes de remise sont établis à partir d'un engagement mensuel et appliqués directement à l'utilisation couverte, et ce en temps réel. Le solde inutilisé est comptabilisé sous forme de frais.

À l'inverse, les métriques de coûts **Unblended** représentent toutes les charges à la date à laquelle elles ont été encourues. C'est ce qu'on appelle aussi la base des coûts, ou _cost basis_. Les frais liés aux réservations et aux programmes de remise apparaissent à la date à laquelle ils ont été facturés et ne sont pas appliqués directement à l'utilisation couverte. Une fois les données de facturation d'un mois donné finalisées, les métriques unblended correspondent exactement à la facture AWS.

### Coûts nets
Les coûts **Nets** appliquent les réductions privées directement à l'utilisation. Le coût d'utilisation d'une ressource spécifique représente le coût effectif une fois toutes les économies appliquées.

À l'inverse, les autres métriques présentent les remises privées en tant que postes distincts, à valeur négative, sans tags d'attribution des ressources. Plutôt que d'attribuer les remises directement à l'utilisation, ces métriques les soustraient du coût total.

Les coûts **Net Amortized** offrent la représentation la plus juste de l'allocation des coûts, toutes les remises étant appliquées directement à l'utilisation. Ces métriques sont disponibles si des remises d'entreprise ont été négociées en privé pour votre compte AWS. Si les métriques de coûts nets ne sont pas proposées, utilisez les coûts **Amortized** à la place.

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

| Métrique               | Description           |
| -------------------- | --------------------- |
| `aws.cost.net.amortized.shared.resources.allocated` | L'ensemble de vos coûts Net Amortized AWS, avec la possibilité de les décomposer en fonction des charges de travail des conteneurs. Nécessite l'[Allocation des coûts des conteneurs][11].|
| `aws.cost.net.amortized` | Les coûts Net Amortized, sans possibilité de les décomposer en fonction des conteneurs. |
| `aws.cost.net.unblended` | Les coûts Net Unblended, sans possibilité de les décomposer en fonction des conteneurs. Correspond à la facture AWS, les remises spéciales étant déjà appliquées aux coûts d'utilisation. |
| `aws.cost.amortized.shared.resources.allocated` | L'ensemble de vos coûts Amortized AWS, avec la possibilité de les décomposer en fonction des charges de travail des conteneurs. Nécessite l'[Allocation des coûts des conteneurs][11].|
| `aws.cost.amortized` | Les coûts Amortized, sans possibilité de les décomposer en fonction des conteneurs. |
| `aws.cost.unblended` | Les coûts Unblended, sans possibilité de les décomposer en fonction des conteneurs. Correspond à la facture AWS. |
| `aws.cost.ondemand`  | Les coûts calculés en fonction des tarifs publics AWS. Ces coûts ne tiennent pas compte des programmes de remise, des réservations, des réductions, des taxes et des frais. |

## Ajout de tags

Datadog ajoute des tags aux données de coûts ingérées à partir de nombreuses sources différentes. Ces dernières sont décrites ci-dessous.

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
Les organisations AWS prennent en charge les [tags définis par l'utilisateur][14] sur les unités organisationnelles et les comptes. Datadog récupère et applique automatiquement ces tags aux données de coûts. Les tags de compte sont appliquées à toutes les utilisations associées à ces comptes. Les tags d'organisation sont appliquées à toutes les données de facturation pour le compte payeur correspondant.

_L'intégration AWS/Datadog doit être configurée sur le compte de l'organisation._

### Tags de l'intégration AWS

Les tags d'intégration AWS sont des tags définis depuis le carré de l'intégration AWS dans Datadog. Ils sont appliqués à l'ensemble des coûts figurant dans le rapport de coût et d'utilisation pour le compte AWS associé.

### Tags par défaut
Datadog ajoute des tags par défaut aux données de coûts ingérées, vous permettant ainsi d'obtenir une vue plus détaillée de vos coûts et de mieux les décomposer. Ces tags sont issus de votre [rapport de coûts et d'utilisation][6] et vous permettent d'analyser vos données plus en profondeur.

Les tags par défaut suivants peuvent être utilisés pour filtrer et regrouper vos données :

| Tag                          | Description       |
| ---------------------------- | ----------------- |
| `aws_product`                | Le service AWS facturé.|
| `aws_product_family`         | La catégorie du service AWS facturé (par exemple, Compute ou Storage).|
| `aws_management_account_name`| Le nom du compte de gestion AWS associé à l'élément.|
| `aws_management_account_id`  | L'ID du compte de gestion AWS associé à l'élément.|
| `aws_member_account_name`    | Le nom du compte de membre AWS associé à l'élément.|
| `aws_member_account_id`      | L'ID du compte de membre AWS associé à l'élément.|
| `aws_cost_type`              | Le type de coût couvert par cet élément (par exemple, Utilisation ou Taxe).|
| `aws_pricing_term`           | Indique si l'utilisation est de type Reserved, Spot ou On-Demand.|
| `aws_reservation_arn`        | L'ARN de l'instance réservée dont l'élément a bénéficié.|
| `aws_savings_plan_arn`       | L'ARN du plan d'épargne dont l'élément a bénéficié.|
| `aws_usage_type`             | Les détails liés à l'utilisation de l'élément (BoxUsage:i3.8xlarge, par exemple).|
| `aws_operation`              | L'opération associée à l'élément (RunInstances, par exemple).|
| `aws_region`                 | La région associée à l'élément.|
| `aws_availability_zone`      | La zone de disponibilité associée à l'élément.|
| `aws_resource_id`            | L'ID de ressource associé à l'élément.|
| `aws_instance_type`          | Les types d'instance associés à vos éléments.|
| `aws_instance_family`        | La famille d'instance associée à votre élément (Storage optimized, par exemple).|
| `is_aws_ec2_compute`         | Indique si l'utilisation est liée à un calcul EC2.|
| `is_aws_ec2_compute_on_demand`| Indique si l'utilisation est de type on-demand.|
| `is_aws_ec2_compute_reservation`| Indique si l'utilisation est associée à une instance réservée.|
| `is_aws_ec2_capacity_reservation`| Indique si l'utilisation est associée à une réservation de capacité.|
| `is_aws_ec2_spot_instance`   | Indique si l'utilisation est associée à une instance Spot.|
| `is_aws_ec2_savings_plan`    | Indique si l'utilisation est associée à un plan d'épargne.|

#### Mise en corrélation des données d'observabilité et de coût

Visualiser les coûts à l'aide de données d'observabilité est essentiel pour comprendre l'impact des modifications apportées à l'infrastructure sur les coûts, déterminer les raisons pour lesquelles les coûts évoluent, et optimiser les coûts et performances de l'infrastructure. Datadog ajoute les tags d'identification de ressource aux données de coût pour les principaux produits AWS, afin de simplifier la mise en corrélation des métriques d'observabilité et de coût.

Par exemple, pour consulter l'utilisation et le coût de chaque base de données RDS, vous pouvez créer un tableau avec `aws.cost.amortized`, `aws.rds.cpuutilization` et `aws.rds.freeable_memory` (ou toute autre métrique RDS) et effectuer un regroupement en fonction de `dbinstanceidentifier`. Pour visualiser les données d'utilisation et de coût pour Lambda en même temps, vous pouvez représenter sur un graphique `aws.lambda.concurrent_executions` et `aws.cost.amortized` regroupés selon `functionname`.

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

Enfin, tous les ensembles de règles de votre [pipeline de tags][15] sont appliqués, ce qui permet une décomposition complète des coûts lorsque l'ajout des tags d'infrastructure n'est pas possible.

## Conducteur de facturation
[AWS Billing Conductor][16] est un service de facturation personnalisé destiné aux partenaires de la Marketplace AWS et aux organisations tenus de procéder à des rétrofacturations.
Ce service permet aux clients de créer une deuxième version pro forma de leurs coûts et de la partager avec leurs clients ou responsables de comptes.
Les taux de facturation, les crédits, les frais ainsi que les coûts généraux peuvent être personnalisés comme bon vous semble. Vous pouvez également sélectionner les comptes à inclure dans le rapport de coût et d'utilisation.

_Les rapports de coûts et d'utilisation pro forma n'incluent pas les remises et les taxes, ce qui rend difficile la comparaison des coûts dans Datadog avec ceux dans AWS Cost Explorer.
En outre, le fait d'ajouter des comptes à un groupe de facturation a une incidence sur la manière dont les réservations et les programmes de remise sont partagés entre les comptes AWS._

Pour créer un rapport à l'aide du conducteur de facturation, suivez les instructions figurant dans le [guide d'utilisation des rapports de coûts et d'utilisation AWS][8]. Assurez-vous que le rapport répond aux [exigences de Datadog][9].
Une fois le rapport créé à l'aide du conducteur de facturation, suivez les instructions relatives à la solution Cloud Cost Management ci-dessus pour la configurer dans Datadog.

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/cur/latest/userguide/cur-create.html
[2]: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html
[3]: https://us-east-1.console.aws.amazon.com/cost-management/home?region=us-east-1#/settings
[4]: https://docs.aws.amazon.com/cur/latest/userguide/view-cur.html
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[6]: https://docs.aws.amazon.com/cur/latest/userguide/data-dictionary.html
[7]: https://app.datadoghq.com/cost/setup
[8]: https://docs.aws.amazon.com/cur/latest/userguide/cur-data-view.html
[9]: https://docs.datadoghq.com/fr/cloud_cost_management/?tab=aws#prerequisite-generate-a-cost-and-usage-report
[10]: https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html
[11]: https://docs.datadoghq.com/fr/cloud_cost_management/container_cost_allocation/#tags
[12]: https://docs.aws.amazon.com/tag-editor/latest/userguide/tagging.html
[13]: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/activating-tags.html
[14]: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_tagging.html
[15]: https://docs.datadoghq.com/fr/cloud_cost_management/tag_pipelines
[16]: https://docs.aws.amazon.com/billingconductor/latest/userguide/what-is-billingconductor.html