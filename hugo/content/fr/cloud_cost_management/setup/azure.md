---
aliases:
- /fr/cloud_cost_management/azure/
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Cloud Cost Management
- link: /cloud_cost_management/setup/aws
  tag: Documentation
  text: Mieux comprendre votre facture AWS
- link: /cloud_cost_management/setup/google_cloud
  tag: Documentation
  text: Mieux comprendre votre facture Google Cloud
- link: /cloud_cost_management/oracle
  tag: Documentation
  text: Mieux comprendre votre facture Oracle
title: Azure
---


## Présentation

Pour utiliser la solution Cloud Cost Management pour Azure dans Datadog, vous devez configurer l'intégration Datadog/Azure et créer des exportations des coûts **amortis** et **réels** dans Azure. En outre, Datadog doit disposer des autorisations nécessaires pour lire les exportations à partir du conteneur.

Datadog vous permet de visualiser vos coûts au niveau des abonnements, des groupes de ressources et des comptes de facturation. Les contrats client Microsoft peuvent être configurés pour ces trois portées. Les comptes avec paiement au fur et à mesure sont disponibles en préversion. Contactez l'[assistance Datadog][11] si vous rencontrez le moindre problème lors de la configuration.

Pour déterminer votre type de compte, consultez la [documentation Azure][10]. **Remarque :** si la mention « Microsoft Online Services Program » est indiquée pour votre type de compte, il s'agit d'un compte avec paiement au fur et à mesure.

## Configuration


{{% site-region region="us3" %}}
**Remarque** : si vous utilisez le site **US3** de Datadog, vous avez peut-être configuré l'intégration Datadog/Azure native à l'aide de la [méthode basée sur la ressource Datadog][1] via le portail Azure. Pour prendre en charge Cloud Cost Management, vous devez [créer un enregistrement d'application][2].


[1]: https://www.datadoghq.com/blog/azure-datadog-partnership/
[2]: /fr/integrations/azure/?tab=azurecliv20#setup
{{< /site-region >}}

### Configurer l'intégration Azure
Accédez à [Setup & Configuration][3] et sélectionnez un compte Azure depuis le menu pour récupérer les coûts associés. Si votre compte Azure n'apparaît pas dans la liste, accédez à votre [Intégration Azure][4] pour ajouter le compte.

### Générer des exportations de coûts

Vous devez générer des exportations pour deux types de données : les coûts **réels** et les coûts **amortis**. Datadog recommande d'utiliser le même conteneur de stockage pour les deux exportations.

1. Sur le portail Azure, sous **Tools** > **Cost Management** > **Settings** > **Configuration**, accédez à [Cost Management | Configuration][5], puis cliquez sur **Exports**.
  {{< img src="cloud_cost/azure_export_path.png" alt="Le portail Azure, avec l'option Exports mise en évidence dans la navigation" style="width:100%" >}}
2. Sélectionnez la portée de l'exportation en regard du filtre de recherche.

   **Remarque :** la portée doit être définie sur un **compte de facturation**, un **abonnement** ou un **groupe de ressources**.
3. Une fois la portée sélectionnée, cliquez sur **Schedule export**.

   {{< img src="cloud_cost/azure_exports_page.png" alt="Le portail Azure, avec la portée d'exportation et le bouton Schedule export mis en évidence" style="width:100%" >}}

4. Sélectionnez le modèle **Cost and usage (actual + amortized)**.
    {{< img src="cloud_cost/azure_new_export.png" alt="Nouvelle page d'exportation avec le modèle et les options manuelles mis en évidence" style="width:100%" >}}

5. Cliquez sur **Edit** pour chaque exportation et confirmez les détails suivants :
    - Frequency : **Daily export of month-to-date costs**
    - Dataset version :
      - Versions prises en charge : `2021-10-01`, `2021-01-01`, `2020-01-01`
      - Versions non prises en charge : `2019-10-01`
    {{< img src="cloud_cost/improved_export.png" alt="Détails de l'exportation avec la métrique définie sur Actual, le type d'exportation défini sur Daily et la version de l'ensemble de données" style="width:100%" >}}

6. Saisissez un préfixe d'exportation pour les nouvelles exportations, comme `datadog`, pour éviter les conflits avec les exportations existantes.

7. Dans l'onglet **Destination**, procédez comme suit :
    - Sélectionnez le type de stockage **Azure blob storage**.
    - Choisissez un compte de stockage, un conteneur et un répertoire pour les exportations.
        - **Remarque :** n'utilisez pas de caractères spéciaux, comme `.`, dans ces champs.
        - **Remarque :** les exportations de facturation peuvent être stockées dans n'importe quel abonnement. Si vous créez des exportations pour plusieurs abonnements, Datadog recommande de les stocker dans le même compte de stockage. Les noms des exportations doivent être uniques.
    - Choisissez le format **CSV** ou **Parquet**.
    - Choisissez le type de compression. Pour **CSV**, les options **Gzip** et **None** sont prises en charge. Pour **Parquet**, les options **Snappy** et **None** sont prises en charge.
    - Vérifiez que la case **File partitioning** est cochée.
    - Vérifiez que la case **Overwrite data** n'est pas cochée.
        - **Remarque :** Datadog ne prend pas en charge le paramètre Overwrite Data. S'il a été précédemment coché, assurez-vous de nettoyer les fichiers dans le répertoire ou de les déplacer vers un autre répertoire.

   {{< img src="cloud_cost/improved_export_destination_2.png" alt="Destination des exportations, avec les paramètres File partitioning et Overwrite data" >}}

8. Dans l'onglet **Review + create**, sélectionnez **Create**.
9. Pour accélérer le traitement, générez les premières exportations manuellement en cliquant sur **Run Now**.

{{< img src="cloud_cost/run_now.png" alt="Cliquez sur Run Now button dans le volet latéral des exportations pour générer des exportations" style="width:50%" >}}

### Fournir à Datadog un accès à vos exportations

{{< tabs >}}
{{% tab "Comptes de facturation" %}}

1. Dans l'onglet Exports, cliquez sur le compte de stockage de l'exportation pour y accéder.
2. Cliquez sur l'onglet Containers.
3. Choisissez le conteneur de stockage dans lequel se trouvent vos factures.
4. Sélectionnez l'onglet Access Control (IAM), puis cliquez sur **Add**.
5. Sélectionnez **Add role assignment**.
6. Sélectionnez **Storage Blob Data Reader**, puis cliquez sur Next.
7. Accordez ces autorisations à l'une des inscriptions d'application associées à Datadog.
    - Cliquez sur **Select members**, choisissez le nom de l'inscription d'application, puis cliquez sur **Select**. **Remarque** : si votre enregistrement d'application ne figure pas dans la liste, commencez à saisir son nom pour que l'interface se mette à jour et l'affiche, s'il est disponible.
    - Sélectionnez **Review + assign**.

Si vos exportations se trouvent dans des conteneurs de stockage différents, répétez les étapes 1 à 7 pour l'autre conteneur de stockage.
{{% /tab %}}

{{% tab "Abonnements et groupes de ressources" %}}

1. Dans l'onglet Exports, cliquez sur le compte de stockage de l'exportation pour y accéder.
2. Cliquez sur l'onglet Containers.
3. Choisissez le conteneur de stockage dans lequel se trouvent vos factures.
4. Sélectionnez l'onglet Access Control (IAM), puis cliquez sur **Add**.
5. Sélectionnez **Add role assignment**.
6. Sélectionnez **Storage Blob Data Reader**, puis cliquez sur Next.
7. Accordez ces autorisations à l'une des inscriptions d'application associées à Datadog.
    - Cliquez sur **Select members**, choisissez le nom de l'inscription d'application, puis cliquez sur **Select**.
    - Sélectionnez **Review + assign**.

Si vos exportations se trouvent dans des conteneurs de stockage différents, répétez les étapes 1 à 7 pour l'autre conteneur de stockage.

### Configurer l'accès en lecture de Cost Management
**Remarque :** vous n'avez pas besoin de configurer cet accès si votre portée est définie sur un **compte de facturation**.

1. Accédez à vos [abonnements][1], puis cliquez sur le nom de votre abonnement.
2. Sélectionnez l'onglet Access Control (IAM).
3. Cliquez sur **Add**, puis sur **Add role assignment**.
4. Sélectionnez **Cost Management Reader**, puis cliquez sur Next.
5. Attribuez ces permissions à l'enregistrement d'application.

En procédant de la sorte, vous pouvez calculer les coûts périodiques et les comparer à ceux de Microsoft Cost Management, afin de garantir la précision des coûts.

**Remarque :** une fois la configuration effectuée, les données peuvent mettre 48 à 72 heures à se stabiliser dans Datadog.

[1]: https://portal.azure.com/#view/Microsoft_Azure_Billing/SubscriptionsBlade

{{% /tab %}}
{{< /tabs >}}

**Remarque** : si vous avez accordé les autorisations nécessaires à l'enregistrement d'application, mais que votre réseau bloque les adresses IP des webhooks de Datadog, il se peut que cela génère des erreurs qui semblent provenir des autorisations.

Pour résoudre ce problème, ajoutez les adresses IP des webhooks de Datadog à la liste d'autorisation de votre réseau, en accédez à la section `Webhooks` à l'adresse `https://ip-ranges.`{{< region-param key="dd_site" code="true" >}}.

### Configurer Cloud Cost dans Datadog
Accédez à [Setup & Configuration][3] et suivez les étapes indiquées.

### Obtenir des données historiques
Datadog intègre automatiquement jusqu'à 15 mois de données de coûts historiques disponibles.

Azure exporte les données de coûts à partir du mois de création de l'exportation. Vous pouvez effectuer un backfill manuel en ajoutant jusqu'à 12 mois de données de coûts Azure à l'aide de l'interface des exportations de coûts Azure.

1. Suivez les instructions des sections **Configuration** et **Configurer Cloud Cost dans Datadog** ci-dessus.
1. Avant de commencer le processus de backfill, attendez 24 heures le temps que les données de coûts apparaissent dans Datadog, afin de vous assurer que l'intégration fonctionne de bout en bout. **Remarque :** si vous avez déjà terminé la configuration et que les données de coûts apparaissent dans Datadog, vous pouvez passer directement aux étapes de backfill ci-dessous.
1. Exportez manuellement un rapport sur les coûts **réels** et **amortis** pour chaque mois civil. Par exemple, pour juin 2025 :
    1. Modifiez l'exportation.
    2. Définissez le type d'exportation sur One-time export.
    3. Définissez la date de départ sur 06-01-2025. **Remarque :** il doit s'agir du premier jour du mois.
    4. Définissez la date de fin sur 06-30-2025 **Remarque :** il doit s'agir du dernier jour du mois.
    5. Enregistrez l'exportation. **Remarque :** cette opération lance automatiquement l'exportation.
    6. Patientez le temps que l'exportation se termine.
1. Rétablissez l'état d'origine des exportations des coûts **réels** et **amortis** pour reprendre les exportations quotidiennes :
    1. Modifiez l'exportation.
    2. Définissez le type d'exportation sur Daily export of month-to-date costs.
    3. Enregistrez l'exportation.

Datadog découvre et ingère automatiquement ces données. En temps normal, elles apparaissent dans Datadog dans un délai de 24 heures.

Vous pouvez également créer des données historiques dans votre compte de stockage à l'aide de l'[API Microsoft][6] ou en créant un [ticket d'assistance auprès de Microsoft][7]. Assurez-vous que la structure de fichier et le partitionnement respectent le format des exportations planifiées.

### Types de coûts

Vous pouvez visualiser vos données ingérées en utilisant les types de coûts suivants :

| Type de coût            | Rôle           |
| -------------------- | --------------------- |
| `azure.cost.amortized` | Coût basé sur les taux de remise appliqués, plus la répartition des prépaiements en fonction de l'utilisation pour la durée de la remise (comptabilité d'exercice).|
| `azure.cost.actual` | Coût indiqué comme le montant facturé au moment de l'utilisation (comptabilité de caisse). Les coûts réels incluent les remises privées, ainsi que les remises des instances réservées et des programmes de remise, en les indiquant comme des types de dépenses distincts.|
| `azure.cost.discounted.ondemand` | Coût basé sur le tarif fourni par Azure, après les remises négociées en privé. Pour obtenir le véritable coût à la demande, divisez cette mesure par (1 - <negotiated_discount>). Par exemple, si vous bénéficiez d'une remise forfaitaire de 5 % sur tous les produits Azure, vous obtiendrez le véritable tarif à la demande en divisant cette mesure par 0,95 (1 - 0,05).|

### Tags par défaut

Datadog enrichit automatiquement vos données de coûts Azure en y ajoutant des tags provenant de plusieurs sources. Pour découvrir en détail comment les tags sont appliqués aux données de coûts, consultez la section [Tags][12].

Les tags par défaut suivants proviennent de votre [rapport sur les coûts et l'utilisation][9] et facilitent la découverte et la compréhension des données de coûts :

| Nom du tag                         | Description de tag       |
| ---------------------------- | ----------------- |
| `accountname` | Le nom du compte associé au poste. |
| `accountownerid` | L'ID du propriétaire associé au poste. |
| `billingaccountid` | L'ID du compte de facturation associé au poste. |
| `billingaccountname` | Le nom du compte de facturation associé au poste. |
| `billingcurrency` | La devise associée au compte de facturation. |
| `billingperiod` | La période de facturation de la dépense. |
| `billingperiodenddate` | La date de fin de la période de facturation. |
| `billingperiodstartdate` | La date de début de la période de facturation. |
| `billingprofileid` | L'ID unique de l'inscription au contrat d'entreprise. |
| `billingprofilename` | Le nom de l'inscription au contrat d'entreprise. |
| `chargetype` | Le type de dépense couvrant le poste : `Usage`, `Purchase` ou `Refund`. |
| `consumedservice` | Le nom du service auquel le poste est associé. |
| `costcenter` | Le centre de coûts défini pour l'abonnement, pour le suivi des coûts. |
| `costinbillingcurrency` | Le coût dans la devise de facturation avant crédits ou taxes. |
| `costinpricingcurrency` | Le coût dans la devise de tarification avant crédits ou taxes. |
| `currency` | La devise associée au compte de facturation. |
| `date` | La date d'utilisation ou d'achat de la dépense. |
| `effectiveprice` | Le prix unitaire combiné pour la période. Les prix combinés compensent les fluctuations éventuelles du prix unitaire, par exemple lorsque différents niveaux permettent de bénéficier de différents tarifs selon la quantité. |
| `exchangeratedate` | La date à laquelle le taux de change a été établi. |
| `exchangeratepricingtobilling` | Le taux de change utilisé pour convertir le coût depuis la devise de tarification vers la devise de facturation. |
| `frequency` | Indique si une dépense est censée se répéter. Les dépenses peuvent se produire une seule fois (`OneTime`), se répéter sur une base mensuelle ou annuelle (`Recurring`) ou être basées sur l'utilisation (`Usage`). |
| `InvoiceId` | L'ID de document unique indiqué sur le PDF de la facture. |
| `invoicesectionid` | L'ID de la section de facturation du contrat client Microsoft. |
| `invoicesectionname` | Le nom du service lié au contrat d'entreprise. |
| `isazurecrediteligible` | `true` si la dépense peut être payée avec des crédits Azure. |
| `location` | L'emplacement du centre de données exécutant la ressource. |
| `metercategory` | Le service de premier niveau auquel appartient cette utilisation (par exemple `Networking`). |
| `meterid` | L'ID unique du compteur. |
| `metername` | Les détails d'utilisation du poste (par exemple `L8s v2` ou `General Purpose Data Stored`). |
| `meterregion` | L'emplacement du centre de données pour les services dont la tarification varie en fonction de la localisation (par exemple `West US 2`). Utilisez `resourcelocation` pour consulter les données de localisation sans `N/A`. |
| `metersubcategory` | Le nom de la catégorie de sous-classification du compteur (par exemple `General Purpose - Storage`). Utilisez `metername` ou `metercategory` pour consulter la classification de niveau supérieur sans `N/A`. |
| `offerid` | Le nom de l'offre souscrite. |
| `partnumber` | L'ID utilisé pour obtenir la tarification du compteur spécifique. |
| `planname` | Le nom du programme du marketplace, si l'achat est effectué sur le marketplace. |
| `PreviousInvoiceId` | Une référence à une facture originale, si ce poste concerne un remboursement. |
| `PricingCurrency` | La devise utilisée lors de l'évaluation, en fonction des tarifs négociés. |
| `pricingmodel` | Le type d'utilisation (par exemple `Reservation`). |
| `ProductId` | L'identifiant d'un produit Azure spécifique. |
| `productname` | Le nom précis du produit Azure, par exemple le type de VM ou disque et la région |
| `productorderid` | L'ID de la commande de produit. Utilisez `productname` pour consultez des informations de niveau supérieur sur les produits sans `N/A`. |
| `productordername` | Le nom de la commande de produit. Utilisez `productname` pour consultez des informations de niveau supérieur sur les produits sans `N/A`. |
| `publishername` | L'éditeur des services sur le marketplace. |
| `publishertype` | Le type d'éditeur : `Microsoft` pour les comptes de contrat client Microsoft et `Azure` pour les comptes de contrat d'entreprise. |
| `reservationid` | L'ID de l'instance de réservation achetée. Si des valeurs `N/A` sont indiquées, il s'agit de ressources `OnDemand`, qui peuvent être vérifiées à l'aide du tag `pricingmodel`. |
| `reservationname` | Le nom de l'instance de réservation achetée. Si des valeurs `N/A` sont indiquées, il s'agit de ressources `OnDemand`, qui peuvent être vérifiées à l'aide du tag `pricingmodel`. |
| `resourcegroup` | Le nom du groupe de ressources dans lequel se trouve la ressource. Les dépenses ne proviennent pas toutes de ressources déployées au sein de groupes de ressources. |
| `resourceid` | L'ID de la ressource Azure. |
| `resourcelocation` | L'emplacement du centre de données exécutant la ressource (par exemple `westus2`). |
| `resourcename` | Le nom de la ressource. Les dépenses ne proviennent pas toutes de ressources déployées. |
| `resourcetype` | Le type de la ressource Azure. |
| `servicefamily` | La famille de services à laquelle le service appartient (par exemple `Compute`). Le tag `consumedservice` offre des informations plus approfondies sur les types d'infrastructure. |
| `ServicePeriodEndDate` | La date de fin de la période de service Azure. |
| `ServicePeriodStartDate` | La date de début de la période de service Azure. |
| `subscriptionid` | L'ID de l'abonnement Azure. |
| `subscriptionname` | Le nom de l'abonnement Azure. |
| `term` | La durée ou le terme du programme de remise, en mois (par exemple `12`). |
| `unitofmeasure` | L'unité de mesure pour la facturation du service. Par exemple, les services de calcul sont facturés à l'heure. |


#### Corrélation entre les coûts et les données d'observabilité

Visualiser les coûts à l'aide de données d'observabilité est essentiel pour comprendre l'impact des modifications apportées à l'infrastructure sur les coûts, déterminer les raisons pour lesquelles les coûts évoluent, et optimiser les coûts et performances de l'infrastructure. Datadog ajoute le tag `name` aux données de coûts pour les principaux produits Azure, afin de simplifier la mise en corrélation des données d'observabilité et des métriques de coûts.

Par exemple, pour consulter l'utilisation et le coût de chaque VM Azure, vous pouvez créer un tableau avec `azure.cost.amortized` et `azure.vm.network_in_total` (ou toute autre métrique de VM) et effectuer un regroupement en fonction de `name`. Pour comparer visuellement les données d'utilisation et de coûts de stockage, vous pouvez appliquer un filtre basé sur `metercategory:Storage`, représenter `azure.storage.transactions` et `azure.cost.amortized` dans un graphique et effectuer un regroupement selon `name`.

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}

[1]:  https://www.datadoghq.com/blog/azure-datadog-partnership/
[2]:  https://docs.datadoghq.com/fr/integrations/azure/?tab=azurecliv20#setup
[3]:  https://app.datadoghq.com/cost/setup?cloud=azure
[4]:  https://app.datadoghq.com/integrations/azure
[5]:  https://portal.azure.com/#view/Microsoft_Azure_CostManagement/Menu/~/config
[6]:  https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-export-acm-data?tabs=azure-cli
[7]:  https://support.microsoft.com
[8]:  https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-improved-exports
[9]:  https://learn.microsoft.com/en-us/azure/cost-management-billing/understand/download-azure-daily-usage
[10]: https://docs.azure.cn/en-us/cost-management-billing/manage/resolve-past-due-balance#check-the-type-of-your-account
[11]: /fr/help/
[12]: /fr/cloud_cost_management/tags