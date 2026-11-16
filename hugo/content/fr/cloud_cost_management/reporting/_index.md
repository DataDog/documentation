---
aliases:
- /fr/cloud_cost_management/reports
description: Suivez les dépenses de votre organisation avec les rapports Cloud Cost
  Management.
further_reading:
- link: /cloud_cost_management/reporting/scheduled_reports
  tag: Documentation
  text: Rapports de coûts planifiés
- link: /cloud_cost_management/reporting/explorer
  tag: Documentation
  text: Cost Explorer
- link: /cloud_cost_management/reporting/dashboards
  tag: Documentation
  text: Dashboards
- link: /cloud_cost_management/
  tag: Documentation
  text: Découvrez Cloud Cost Management.
- link: https://www.datadoghq.com/blog/cloud-cost-management-ai-costs/
  tag: Blog
  text: Répartissez les coûts de l'IA entre les fournisseurs avec Datadog Cloud Cost
    Management
private: true
title: Rapports de coûts
---
## Présentation {#overview}

Les Cloud Cost Monitoring (CCM) Reports de Datadog permettent aux équipes financières et aux équipes d'opérations de gérer efficacement les coûts cloud. Cette fonctionnalité offre une plateforme centralisée pour une analyse détaillée des coûts, vous permettant d'explorer, d'analyser et de partager des données sur les coûts cloud ou le budget.

Avec les rapports, vous pouvez :

- Centraliser et analyser les coûts provenant d'[AWS][1], [Azure][2], [Google Cloud][3], [Oracle][12] et des [fournisseurs SaaS][4]
- Visualiser et personnaliser avec des filtres, des regroupements et plusieurs types de graphiques
- Créer des rapports de coûts et de budget pour suivre les dépenses et prévoir les coûts futurs
- Enregistrez, planifiez et partagez des rapports avec votre équipe

## Choisissez le bon outil {#choose-the-right-tool}

Utilisez **[Cost Explorer][13]** pour une investigation flexible et **Cost Reports** pour une analyse standardisée et récurrente.

| Fonctionnalité | Cost Explorer | Cost Reports |
|---------|---------------|--------------|
| Cas d'utilisation | Analyse et investigation ad hoc | Vues enregistrées et envoi planifié |
| Requêtes | Dynamiques, non enregistrées par défaut | Enregistrées et réutilisables |
| Modèles | Aucun modèle | Modèles prédéfinis disponibles |
| Planification | Ne peut pas être planifié | Peut être planifié pour e-mail/Slack |
| Workflow | Exploration itérative | Rapports récurrents |

## Créer un rapport CCM {#create-a-ccm-report}

1. Accédez à [**Cloud Cost > Analyze > Reports**][5] dans Datadog.
1. Cliquez sur {{< ui >}}New Report{{< /ui >}} pour repartir de zéro, ou sélectionnez un modèle dans la galerie pour accélérer votre workflow.

   {{< img src="cloud_cost/cost_reports/create-new-report-1.png" alt="Créez un nouveau rapport ou utilisez un modèle." style="width:100%;" >}}

   **Modèles disponibles :**
   - {{< ui >}}AWS Spend by Service Name{{< /ui >}} : Comprenez vos coûts EC2, S3 et Lambda.
   - {{< ui >}}Azure Spend by Service Name{{< /ui >}} : Répartissez les coûts par services Azure tels que les machines virtuelles et Azure Monitor.
   - {{< ui >}}GCP Spend by Service Name{{< /ui >}} : Répartissez les coûts par services GCP tels que Compute Engine, BigQuery et Kubernetes Engine.
   - {{< ui >}}Datadog Spend by Product{{< /ui >}} : Répartissez les coûts par produits Datadog tels que Infrastructure Hosts, Custom Metrics et les logs indexés.
   - {{< ui >}}Spend by Provider{{< /ui >}} : Comparez les coûts entre AWS, Azure, Google Cloud, Oracle Cloud, et plus encore.

## Personnalisation de votre rapport {#customizing-your-report}

{{< img src="cloud_cost/cost_reports/customization-options-3.png" alt="Personnalisez votre rapport en sélectionnant des fournisseurs cloud, en filtrant, en regroupant, en modifiant la visualisation et en utilisant des options avancées" style="width:100%;" >}}

### Sélectionnez le type de rapport {#select-the-type-of-report}

Sélectionnez le type de rapport que vous souhaitez créer :

- {{< ui >}}Cost{{< /ui >}} : Comprenez où vos dépenses sont engagées dans les différents services, régions et équipes, etc.
- {{< ui >}}Budget{{< /ui >}} : Suivez les dépenses par rapport à des objectifs budgétaires prédéfinis et prévoyez les coûts futurs.

### Appliquez des filtres {#apply-filters}

Utilisez des filtres pour inclure uniquement les coûts spécifiques que vous souhaitez allouer, par exemple par fournisseur, produit, tag, région ou type de coût, afin que votre règle cible exactement le bon sous-ensemble de vos dépenses cloud.

| Filtrer par | Cas d'utilisation |
|--------|----------|
| Fournisseur cloud (tel qu'AWS, Azure, GCP, Snowflake) | Appliquez votre règle d'allocation uniquement aux coûts provenant d'un fournisseur cloud spécifique, par exemple pour les frais de support AWS, mais pas aux coûts Azure ou GCP. |
| Produit ou service (tel qu'EC2, S3, RDS) | Allouez les coûts liés à un produit ou service spécifique. Par exemple, répartissez uniquement les coûts EC2 entre les équipes au lieu de tous les coûts AWS. |
| Tags (`env:prod`, `team:analytics`) | Incluez ou excluez des coûts en fonction des tags de ressource. Par exemple, allouez les coûts uniquement pour les ressources de production (`env:prod`), ou uniquement pour les ressources taguées à l'équipe analytique. |
| Région | Allouez les coûts uniquement pour les ressources situées dans une région géographique spécifique. Par exemple, répartissez les coûts des ressources situées dans `us-east-1` séparément de ceux situés dans `eu-west-1`. |
| Type de coût (utilisation, support, non tagué) | Allouez uniquement certains types de coûts, tels que les frais d'utilisation, les frais de support ou les coûts non tagués. Par exemple, allouez uniquement les coûts non tagués pour encourager les équipes à taguer leurs ressources. |
| Critères personnalisés | Lorsque vous avez une exigence métier unique qui combine plusieurs filtres, créez des critères personnalisés. Par exemple, vous souhaitez allouer uniquement les coûts d'EC2 dans une région spécifique `us-west-2` tagués comme `env:prod`. |

### Groupez les données {#group-data}
- Groupez par nom de fournisseur, nom de service ou tags de ressource personnalisés pour obtenir des informations plus approfondies.

### Modifiez la façon dont vous visualisez vos données {#change-how-you-see-your-data}
- Sélectionnez une **option de visualisation** :
  - {{< ui >}}Bar chart{{< /ui >}} : Comparez les coûts entre plusieurs catégories côte à côte, afin d'identifier les principaux facteurs de coûts.
  - {{< ui >}}Pie chart{{< /ui >}} : Affiche la part en pourcentage de chaque segment, idéal pour comprendre la proportion relative des coûts parmi un petit nombre de catégories.
  - {{< ui >}}Treemap{{< /ui >}} : Affiche des données hiérarchiques et la taille relative de nombreuses catégories à la fois, afin que vous puissiez voir à la fois la structure globale et les plus gros contributeurs dans une seule vue.
- Modifiez la **vue tableau** :
  - {{< ui >}}Summary{{< /ui >}} : Une image consolidée et globale de vos coûts.
  - {{< ui >}}Day over day{{< /ui >}}, {{< ui >}}week over week{{< /ui >}} ou {{< ui >}}month over month{{< /ui >}} : Analysez l'évolution de vos coûts au jour le jour, semaine après semaine ou mois après mois et identifiez les tendances ou les fluctuations inhabituelles.
- Mettez à jour la **période** et la **période de comparaison** :
  - Choisissez votre période pour définir la période de reporting que vous souhaitez analyser.
  - Ajoutez une période de comparaison pour repérer les variations de coûts :
    - {{< ui >}}Default comparison{{< /ui >}} : Compare automatiquement à la période immédiatement précédente (par exemple, cette semaine par rapport à la semaine dernière).
    - {{< ui >}}Flexible comparison{{< /ui >}} : Sélectionnez n'importe quelle période arbitraire — comme il y a un an ou une plage de dates personnalisée — pour identifier les tendances saisonnières. Les deux périodes doivent être du même type (par exemple, semaine par semaine, mois par mois), bien que le nombre réel de jours puisse varier lors de la comparaison de mois de longueurs différentes.
- Affichez les **coûts prévisionnels** :
  - Activez {{< ui >}}Show forecast{{< /ui >}} pour superposer les coûts prévus sur votre rapport de coûts, parallèlement aux dépenses historiques. Consultez [Prévision des coûts dans Cloud Cost Management][15] pour plus de détails sur les périodes de prévision et les cumuls pris en charge.

### Options avancées (facultatif) {#advanced-options-optional}

- {{< ui >}}Show usage charges only{{< /ui >}} : Choisissez d'inclure toutes les dépenses (frais, taxes, remboursements) ou concentrez-vous uniquement sur les frais d'utilisation.
- {{< ui >}}Cost type{{< /ui >}} : Choisissez un type de coût qui correspond le mieux à vos besoins en matière de reporting, d'analyse ou de gestion financière. Consultez les définitions de chaque type de coût en fonction de votre fournisseur : [AWS][7], [Azure][8], [Google Cloud][9], [Custom][10].

  **Remarque** : La disponibilité de ces options varie en fonction du ou des fournisseurs sélectionnés.

## Enregistrez et partagez votre rapport {#save-and-share-your-report}

Une fois votre rapport créé et personnalisé, vous pouvez l'enregistrer et le partager depuis la page principale des rapports ainsi que depuis les vues individuelles des fiches de rapport.

- **Enregistrez votre rapport** pour le rendre disponible pour un usage personnel ou en équipe.
- **Partagez votre rapport** en copiant l'URL ou en l'exportant au format CSV ou PNG.
- **Planifiez des rapports** pour qu'ils soient envoyés automatiquement à votre équipe. [En savoir plus sur la planification des rapports][11].
- **Exportez les vues de rapport vers des dashboards** pour suivre les coûts parallèlement à d'autres widgets. [En savoir plus sur le suivi des coûts sur les dashboards][14].
- **Recherchez des rapports enregistrés** pour trouver ce dont vous avez besoin (disponible uniquement depuis la page principale des rapports).

## Autorisations {#permissions}

Les autorisations suivantes sont requises pour afficher et gérer les rapports :

| Action | Autorisation requise |
|---------|---------------|
| Afficher les rapports | Cloud Cost Management read |
| Créer, modifier, supprimer des rapports | Cloud Cost Report Write |

Pour obtenir la liste complète des autorisations CCM, consultez la [documentation sur les autorisations][16].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/cloud_cost_management/aws/
[2]: /fr/cloud_cost_management/azure/?tab=billingaccounts
[3]: /fr/cloud_cost_management/google_cloud/
[4]: /fr/cloud_cost_management/saas_costs/
[5]: https://app.datadoghq.com/cost/analyze/reports
[6]: /fr/cloud_cost_management/container_cost_allocation/
[7]: /fr/cloud_cost_management/setup/aws/#cost-types
[8]: /fr/cloud_cost_management/setup/azure/#cost-types
[9]: /fr/cloud_cost_management/setup/google_cloud/#cost-types
[10]: /fr/cloud_cost_management/setup/custom/#cost-metric-types
[11]: /fr/cloud_cost_management/reporting/scheduled_reports
[12]: /fr/cloud_cost_management/oracle/
[13]: /fr/cloud_cost_management/reporting/explorer
[14]: /fr/cloud_cost_management/reporting/dashboards
[15]: /fr/cloud_cost_management/planning/forecasting#view-forecasts-in-reports
[16]: /fr/cloud_cost_management/setup/permissions