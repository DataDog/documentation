---
kind: documentation
title: Cloud Cost Management
---

<div class="alert alert-warning">La solution Cloud Cost Management est en version bêta privée et prend uniquement en charge AWS pour le moment. Pour demander l'accès à cette fonctionnalité, <a href="https://www.datadoghq.com/cloud-cost-management-beta/">utilisez ce formulaire.</a></div>

## Présentation

La solution Cloud Cost Management permet aux équipes techniques et financières d'analyser l'impact des mises à jour de l'infrastructure sur les coûts. Elle peut être utilisée pour mettre en lumière les tendances, comprendre la répartition des dépenses au sein de votre organisation et identifier les inefficacités.
Datadog ingère les données liées aux coûts de vos services cloud et les transforme en métriques qui peuvent ensuite être interrogées. Si vos coûts augmentent, vous pouvez corréler cette augmentation avec vos métriques d'utilisation pour en déterminer la cause.

Pour utiliser Cloud Cost Management, vous devez posséder un compte AWS ayant accès aux rapports d'utilisation et de coût (CUR). De plus, l'intégration AWS doit être installée dans Datadog.

## Configuration

Pour configurer Cloud Cost Management dans Datadog, vous devez générer un rapport de coûts et d'utilisation.

### Prérequis : générer un rapport de coûts et d'utilisation

Suivez les instructions d'AWS pour [créer un rapport de coûts et d'utilisation][1], puis sélectionnez les options suivantes dans la section Content pour configurer Cloud Cost Management pour Datadog :

* **Include resource IDs**
* **Automatically refresh your Cost & Usage Report**

Sélectionnez les options suivantes dans la section Delivery :

* Granularité temporelle : **Hourly**
* Versions du rapport : **Create new report version**
* Type de compression : **GZIP**
* Format : `text/csv`

### Configurer l'intégration AWS

Sélectionnez votre compte de gestion AWS depuis la liste déroulante : Datadog affiche alors les tags associés à ce compte. Si vous utilisez plusieurs comptes de gestion avec des noms similaires, vous pouvez consulter les tags associés à chaque compte pour vous assurer d'avoir sélectionné le bon compte.

**Remarque** : Datadog recommande d'envoyer les rapports de coûts et d'utilisation depuis un [**compte de gestion** AWS][6] afin de visualiser les coûts des **comptes membres** associés. Si vous choisissez d'envoyer un rapport de coûts et d'utilisation depuis un **compte membre** AWS, assurez-vous d'avoir sélectionné les options suivantes dans les [préférences][7] du **compte de gestion** pour permettre à Datadog d'avoir une visibilité totale sur le compte membre :

* **Linked Account Access**
* **Linked Account Refunds and Credits**
* **Linked Account Discounts**

### Accéder au rapport de coûts et d'utilisation

Si vous avez fermé le rapport créé dans la section des prérequis de configuration, consultez la documentation AWS pour accéder de nouveau aux [détails de votre rapport de coûts et d'utilisation][2].

Pour permettre à Datadog d'accéder au rapport de coûts et d'utilisation, remplissez les champs avec les informations pertinentes :

* **Region** : il s'agit de la région de votre compartiment. Exemple : `us-east-1`.
* **Bucket Name** : il s'agit du nom du compartiment S3 dans lequel le CUR est enregistré.
* **Report Path Prefix** : il s'agit du nom du dossier. Si vous vous trouvez sur la page d'informations AWS, ce préfixe correspond à la première partie du chemin. Par exemple, si le **Report path prefix** a pour valeur `cur-report-dir/cost-report`, vous devez saisir `cur-report-dir` dans le champ.
* **Report Name** : il s'agit du nom que vous avez saisi dans la section des prérequis lors de la création du rapport. SI vous vous trouvez sur la page d'informations AWS, ce nom correspond à la deuxième partie du chemin. Par exemple, si **Report path prefix** a pour valeur `cur-report-dir/cost-report`, vous devez saisir `cost-report` dans le chemin.

### Configurer l'accès au rapport de coûts et d'utilisation

Configurez AWS de façon à ce que Datadog puisse accéder au rapport de coûts et d'utilisation ainsi qu'au compartiment S3 dans lequel il est stocké. Pour ce faire, [créez une stratégie][3] à l'aide du JSON suivant :

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
          "Resource": "arn:aws:s3:::NOM_COMPARTIMENT"
      },
      {
          "Sid": "DDCloudCostGetBill",
          "Effect": "Allow",
          "Action": [
              "s3:GetObject"
          ],
          "Resource": "arn:aws:s3:::NOM_COMPARTIMENT/PRÉFIXE_RAPPORT/NOM_RAPPORT/*"
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

Vous pouvez visualiser vos données ingérées en utilisant les types de coûts suivants :

| Type de coût            | Description           |
| -------------------- | --------------------- |
| `aws.cost.amortized` | Coût basé sur les taux de remise appliqués, plus la répartition des prépaiements en fonction de l'utilisation pour la durée de la remise (comptabilité d'exercice). |
| `aws.cost.unblended` | Coût correspondant au montant facturé au moment de l'utilisation (comptabilité de caisse).|
| `aws.cost.blended`   | Coût basé sur le prix moyen payé pour un type d'utilisation parmi les comptes membres d'une organisation.|
| `aws.cost.ondemand`  | Coût basé sur le prix de référence fourni par AWS. |

## Ajout de tags

Datadog applique des tags aux données de coût ingérées pour vous aider à ventiler et analyser vos coûts.

Les tags ajoutés mettent en corrélation les données de coût aux données d'observabilité fournies par vos systèmes à Datadog, aux données issues des ressources configurées avec les [tags de ressource AWS][4], ainsi qu'au [rapport d'utilisation et de coût (CUR)][5].

Les tags suivants peuvent également être utilisés pour filtrer et regrouper vos données :

| Tag                        | Description       |
| -------------------------- | ----------------- |
| `cloud_product`            | Le service cloud facturé.|
| `cloud_product_group`      | La catégorie du service cloud facturé (par exemple, Compute ou Storage).|
| `cloud_usage_type`         | Les détails de l'utilisation de cet élément.|
| `cloud_charge_type`        | Le type de coût couvert par cet élément (par exemple, Utilisation ou Taxe).|
| `cloud_purchase_type`      | Indique si l'utilisation est de type Reserved, Spot ou On Demand.|
| `cloud_account`            | L'ID du compte qui a utilisé cet élément.|
| `cloud_billing_account_id` | L'ID du compte qui paie pour cette utilisation.|

## Coûts du cloud dans les dashboards

Vous pouvez visualiser les dépenses liées à votre infrastructure ainsi que les métriques d'utilisation associées pour identifier plus facilement les inefficacités et les économies potentielles. Pour ajouter un widget illustrant les coûts liés au cloud dans un dashboard Datadog, sélectionnez la source de données *Cloud Cost*.

{{< img src="infrastructure/cloudcost/cloud_cost_data_source.png" alt="Coûts du cloud comme source de données lors de la création d'un widget de dashboard"  >}}

[1]: https://docs.aws.amazon.com/cur/latest/userguide/cur-create.html
[2]: https://docs.aws.amazon.com/cur/latest/userguide/view-cur.html
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[4]: https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html
[5]: https://docs.aws.amazon.com/cur/latest/userguide/data-dictionary.html
[6]: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html
[7]: https://us-east-1.console.aws.amazon.com/cost-management/home?region=us-east-1#/settings
