---
title: Cloud Cost Management
kind: documentation
---

<div class="alert alert-warning">La solution Cloud Cost Management est en version bêta privée et prend uniquement en charge AWS pour le moment. Pour demander l'accès à cette fonctionnalité, <a href="https://www.datadoghq.com/cloud-cost-management-beta/">utilisez ce formulaire.</a></div>

## Présentation

La solution Cloud Cost Management permet aux équipes techniques et financières d'analyser l'impact des mises à jour de l'infrastructure sur les coûts. Elle peut être utilisée pour mettre en lumière les tendances, comprendre la répartition des dépenses au sein de votre organisation et identifier les inefficacités.
Datadog ingère les données liées aux coûts de vos services cloud et les transforme en métriques qui peuvent ensuite être interrogées. Si vos coûts augmentent, vous pouvez corréler cette augmentation avec vos métriques d'utilisation pour en déterminer la cause.

## Configuration

Pour utiliser Cloud Cost Management, vous devez posséder un compte AWS ayant accès aux Rapports d'utilisation et de coût (CUR), et l'intégration AWS doit être installée dans Datadog.

**Remarque :** une fois la configuration effectuée, les données peuvent mettre 48 à 72 heures à se stabiliser dans Datadog.

### Générer le Rapport d'utilisation et de coût

Suivez les instructions d'AWS relatives à la [Création d'un rapport d'utilisation et de coût][1], puis sélectionnez les options suivantes dans la section Content :

* **Include resource IDs**
* **Automatically refresh your Cost & Usage report**

Sélectionnez les options suivantes dans la section Delivery :

* Granularité temporelle : **Hourly**
* Versions du rapport : **Create new report version**
* Type de compression : **GZIP**
* Format : `text/csv`

### Configurer l'accès au Rapport d'utilisation et de coût

Configurez AWS de façon à ce que Datadog puisse accéder au rapport et au compartiment S3 dans lequel il est stocké en [créant une stratégie][2] à l'aide du JSON suivant :

{{< code-block lang="yaml" collapsible="true" >}}
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "DDCCMListBucket",
          "Effect": "Allow",
          "Action": [
              "s3:ListBucket"
          ],
          "Resource": "arn:aws:s3:::NOM_COMPARTIMENT"
      },
      {
          "Sid": "DDCCMGetObject",
          "Effect": "Allow",
          "Action": [
              "s3:GetObject"
          ],
          "Resource": "arn:aws:s3:::NOM_COMPARTIMENT/PRÉFIXE_RAPPORT/NOM_RAPPORT/*"
      },
      {
          "Sid": "CostExplorerAccuracyCheck",
          "Effect": "Allow",
          "Action": [
              "ce:Get*"
          ],
          "Resource": "*"
      },
      {
          "Sid": "CURReportDefinition",
          "Action": [
            "cur:DescribeReportDefinitions"
          ],
          "Effect": "Allow",
          "Resource": "*"
        }
  ]
}
{{< /code-block >}}

**Conseil :** souvenez-vous du nom de votre nouvelle stratégie, car vous en aurez besoin pour les prochaines étapes.

### Associer la stratégie au rôle de l'intégration Datadog

Associez la nouvelle stratégie S3 au rôle de l'intégration Datadog.

1. Accédez à **Roles** depuis la console IAM d'AWS.
2. Repérez le rôle utilisé par l'intégration Datadog. Il est intitulé **DatadogIntegrationRole** par défaut, mais il est possible que votre organisation l'ait renommé. Cliquez sur le nom du rôle pour ouvrir une page de synthèse.
3. Cliquez sur **Attach policies**.
4. Saisissez le nom de la stratégie de compartiment S3 créée précédemment.
5. Cliquez sur **Attach policy**.

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

Les tags ajoutés mettent en corrélation les données de coût aux données d'observabilité fournies par vos systèmes à Datadog, aux données issues des ressources configurées avec les [Tags de ressource AWS][3], ainsi qu'au [Rapport d'utilisation et de coût (CUR)][4].

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
[2]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[3]: https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html
[4]: https://docs.aws.amazon.com/cur/latest/userguide/data-dictionary.html
