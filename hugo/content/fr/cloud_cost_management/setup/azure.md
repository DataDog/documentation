---
aliases:
- /fr/cloud_cost_management/azure/
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Cloud Cost Management
- link: /cloud_cost_management/setup/aws
  tag: Documentation
  text: Obtenez des informations sur votre facture AWS
- link: /cloud_cost_management/setup/google_cloud
  tag: Documentation
  text: Obtenez des informations sur votre facture Google Cloud
- link: /cloud_cost_management/oracle
  tag: Documentation
  text: Obtenez des informations sur votre facture Oracle
title: Azure
---
## Présentation {#overview}

Pour utiliser Azure Cloud Cost Management dans Datadog, vous devez configurer l'intégration Datadog Azure et créer des exports **amortized** et **actual** dans Azure. De plus, Datadog doit disposer des autorisations nécessaires pour lire les exports depuis le conteneur.

Datadog offre une visibilité sur les coûts au niveau de l'abonnement, du groupe de ressources et du compte de facturation. Les contrats client Microsoft (MCA) peuvent être configurés aux trois niveaux. Pour déterminer votre type de compte, consultez la [documentation Azure][10].

<div class="alert alert-info">
<strong>Comptes Pay as you go (PAYG)</strong>
<p>Datadog Cloud Cost Management nécessite des exports <strong>Actual Cost</strong> et <strong>Amortized Cost</strong> depuis Azure. Les abonnements PAYG (Microsoft Online Services Program) ne fournissent généralement que des exports <strong>Usage details (usage only)</strong>, ils ne peuvent donc pas être configurés pour CCM. Pour connaître les types d'export disponibles pour chaque type de compte Azure, consultez la <a href="https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-improved-exports">documentation sur les exports Cost Management</a> de Microsoft.</p>
<p>Si votre abonnement est de type PAYG, envisagez l'une des options suivantes :</p>
<ul>
<li>Migrez vers un Microsoft Customer Agreement (MCA) ou un Enterprise Agreement (EA), qui prennent en charge les types d'export requis.</li>
<li>Contactez le support Microsoft Azure pour confirmer les types d'export disponibles pour votre abonnement.</li>
</ul>
<p>Pour obtenir de l'aide sur la configuration de Datadog CCM ou pour discuter des options, contactez le <a href="/help/">support Datadog</a>.</p>
</div>

## Configuration {#setup}

Vous pouvez effectuer la configuration en utilisant l'[API][13], [Terraform][14], ou directement dans Datadog en suivant les instructions ci-dessous.

{{% site-region region="us3" %}}
**Remarque** : Si vous utilisez le site **US3** de Datadog, vous avez peut-être configuré l'intégration native Azure de Datadog en utilisant la [méthode de ressource Datadog][1] via le portail Azure. Pour prendre en charge Cloud Cost Management, vous devez [créer une app registration][2].


[1]: https://www.datadoghq.com/blog/azure-datadog-partnership/
[2]: /fr/integrations/azure/?tab=azurecliv20#setup
{{% /site-region %}}

### Configurez l'intégration Azure {#configure-the-azure-integration}
Accédez à [Setup & Configuration][3], ajoutez un compte Azure et suivez les étapes pour configurer l'intégration Azure.

{{< tabs >}}

{{% tab "Terraform" %}}

{{< img src="cloud_cost/setup/azure_terraform_setup.png" alt="Page de configuration CCM avec l'option Terraform sélectionnée, montrant l'étape 1 et l'étape 2 développées pour configurer le périmètre et les détails d'exportation" style="width:100%" >}}

### Sélectionnez le type de périmètre {#select-scope-type}

Utilisez la liste déroulante pour sélectionner le type de périmètre pour votre compte. CCM prend en charge les types de périmètre compte de facturation, abonnement et groupe de ressources.

### Sélectionnez les ressources à créer {#select-the-resources-to-create}

La configuration Terraform prend en charge trois configurations en fonction de vos ressources Azure existantes :

* **Nouvelle configuration** : Sélectionnez {{< ui >}}Create storage account and container{{< /ui >}} pour créer un compte de stockage, un conteneur et des exportations de coûts.
* **Compte de stockage et conteneur existants** : Désélectionnez {{< ui >}}Create storage account and container{{< /ui >}} et sélectionnez {{< ui >}}Create cost exports{{< /ui >}} pour utiliser le stockage existant mais créer de nouvelles exportations de coûts.
* **Compte de stockage, conteneur et exportations de coûts existants** : Désélectionnez les deux options pour utiliser le stockage et les exportations de coûts existants.

### Configurer le périmètre et les détails de l'exportation {#configure-the-scope-and-export-details}

Saisissez les détails suivants pour votre configuration :

* {{< ui >}}Billing account or Subscription ID{{< /ui >}} : Selon le périmètre sélectionné à l'étape 1, l'ID de compte de facturation ou l'ID d'abonnement correspondant.
* {{< ui >}}Resource group name{{< /ui >}} : Le nom de votre groupe de ressources existant dans le périmètre sélectionné. Un groupe de ressources préexistant est requis pour la configuration Terraform.
* {{< ui >}}Location{{< /ui >}} : L'emplacement Azure de votre groupe de ressources. Par exemple, `East US 2`.
* {{< ui >}}Storage account and container name{{< /ui >}} : Selon les ressources que vous avez choisi de créer, les noms de votre compte de stockage et de votre conteneur, nouveaux ou préexistants.
* {{< ui >}}Actual cost export name and path{{< /ui >}} : Le nom et le chemin d'accès de votre exportation de coûts réelle.
* {{< ui >}}Amortized cost export name and path{{< /ui >}} : Le nom et le chemin d'accès de votre exportation de coûts amortis.
  * **Remarque :** Les formats de préfixe suivants ne sont pas pris en charge : vide, commençant par `/` (tel que `/` ou `/cost`), ou se terminant par `/` (tel que `cost/`). Les préfixes contenant `/` au milieu sont pris en charge (tel que `cost/hourly`).

### Copiez le HCL de ressource Azure Terraform généré et appliquez les modifications {#copy-generated-azure-resource-terraform-hcl-and-apply-changes}

Une fois les champs de l'étape 2 remplis, l'étape 3 s'active et affiche le HCL Terraform généré. Suivez les instructions pour configurer vos fichiers de configuration Terraform avec ce code. Résolvez tous les problèmes qui apparaissent lors de l'exécution de `terraform plan` ou `terraform apply` avant de revenir à CCM pour configurer les exportations de coûts.

### Accédez à la console Azure pour configurer les exportations {#access-azure-console-to-configure-exports}

{{< img src="cloud_cost/setup/azure_toggle_file_partitioning.png" alt="Activez le partitionnement de fichiers pour les deux exportations" style="width:50%" >}}

Ouvrez le lien de la console Azure pour localiser vos exportations de coûts. Si nécessaire, remplacez le périmètre actuel par celui qui convient à vos exportations. Pour les exportations réelles et amorties, sélectionnez-les et cliquez sur {{< ui >}}Edit{{< /ui >}} pour activer le partitionnement de fichiers s'il ne l'est pas déjà.

{{< img src="cloud_cost/run_now.png" alt="Cliquez sur le bouton \"Exécuter maintenant\" dans le panneau latéral d'export pour générer des exports." style="width:50%" >}}

Enregistrez les modifications de partitionnement de fichiers et cliquez sur {{< ui >}}Run Now{{< /ui >}}. Revenez à CCM une fois que les deux exécutions d'exportation ont réussi.

### Copiez le HCL Datadog généré et appliquez les modifications {#copy-generated-datadog-hcl-and-apply-changes}

Suivez les instructions de l'étape {{< ui >}}Apply Datadog Terraform HCL{{< /ui >}}. Résolvez tous les problèmes qui apparaissent lors de l'exécution de `terraform plan` ou `terraform apply` avant de revenir à CCM pour confirmer la création du compte.

{{% /tab %}}

{{% tab "Méthode manuelle" %}}

{{< img src="cloud_cost/setup/azure_manual_setup.png" alt="Page de configuration CCM avec l'option Manuel sélectionnée, montrant l'étape 1 et l'étape 2 développées pour configurer le type de périmètre et sélectionner les exportations existantes" style="width:100%" >}}

### Générer des exportations de coûts {#generate-cost-exports}

Vous devez générer des exportations pour deux types de données : **Actual Cost** et **Amortized Cost**. Datadog recommande d'utiliser le même conteneur de stockage pour les deux exportations.

1. Accédez à [Gestion des coûts | Configuration][5] sous {{< ui >}}Tools{{< /ui >}} > {{< ui >}}Cost Management{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}} du portail Azure et cliquez sur {{< ui >}}Exports{{< /ui >}}.
  {{< img src="cloud_cost/azure_export_path.png" alt="Dans le portail Azure, mise en évidence de l'option Exportations dans la navigation" style="width:100%" >}}
2. Sélectionnez le périmètre d'exportation situé à côté du filtre de recherche.

   **Remarque :** Le périmètre doit être {{< ui >}}billing account{{< /ui >}}, {{< ui >}}subscription{{< /ui >}} ou {{< ui >}}resource group{{< /ui >}}.
3. Une fois le périmètre sélectionné, cliquez sur {{< ui >}}Schedule export{{< /ui >}}.

   {{< img src="cloud_cost/azure_exports_page.png" alt="Dans le portail Azure, mise en évidence du périmètre d'exportation et du bouton de planning" style="width:100%" >}}

4. Sélectionnez le modèle {{< ui >}}Cost and usage (actual + amortized){{< /ui >}}
    {{< img src="cloud_cost/azure_new_export.png" alt="Nouvelle page d'exportation avec les options de modèle et manuelles mises en évidence" style="width:100%" >}}

5. Cliquez sur {{< ui >}}Edit{{< /ui >}} sur chaque exportation et confirmez les détails suivants :
    - Fréquence : {{< ui >}}Daily export of month-to-date costs{{< /ui >}}
    - Version du jeu de données :
      - Versions prises en charge : `2021-10-01`, `2021-01-01`, `2020-01-01`
      - Versions non prises en charge : `2019-10-01`
    {{< img src="cloud_cost/improved_export.png" alt="Détails de l'exportation avec Métrique : Actual, Type d'exportation : Daily, et Version du jeu de données" style="width:100%" >}}

6. Saisissez un « préfixe d'exportation » pour les nouvelles exportations. Par exemple, saisissez `datadog` pour éviter les conflits avec les exportations existantes.

7. Dans l'onglet {{< ui >}}Destination{{< /ui >}}, sélectionnez les détails suivants :
    - Choisissez {{< ui >}}Azure blob storage{{< /ui >}} comme type de stockage.
    - Choisissez un compte de stockage, un conteneur et un répertoire pour les exportations.
        - **Remarque :** N'utilisez pas de caractères spéciaux comme `.` dans ces champs.
        - **Remarque :** Les exportations de facturation peuvent être stockées dans n'importe quel abonnement. Si vous créez des exportations pour plusieurs abonnements, Datadog recommande de les stocker dans le même compte de stockage. Les noms d'exportation doivent être uniques.
    - Choisissez {{< ui >}}CSV{{< /ui >}} ou {{< ui >}}Parquet{{< /ui >}} comme format.
    - Choisissez le type de compression. Pour {{< ui >}}CSV{{< /ui >}} : {{< ui >}}Gzip{{< /ui >}} et {{< ui >}}None{{< /ui >}} sont pris en charge. Pour {{< ui >}}Parquet{{< /ui >}} : {{< ui >}}Snappy{{< /ui >}} et {{< ui >}}None{{< /ui >}} sont pris en charge.
    - Assurez-vous que {{< ui >}}File partitioning{{< /ui >}} est coché.
    - Assurez-vous que {{< ui >}}Overwrite data{{< /ui >}} n'est pas coché.
        - **Remarque :** Datadog ne prend pas en charge le paramètre {{< ui >}}Overwrite data{{< /ui >}}. Si le paramètre était précédemment coché, assurez-vous de nettoyer les fichiers dans le répertoire ou de les déplacer vers un autre.

   {{< img src="cloud_cost/improved_export_destination_2.png" alt="Destination d'exportation avec les paramètres de partitionnement de fichiers et d'écrasement des données" >}}

8. Dans l'onglet {{< ui >}}Review + create{{< /ui >}}, sélectionnez {{< ui >}}Create{{< /ui >}}.
9. Générez manuellement les premières exportations en cliquant sur {{< ui >}}Run Now{{< /ui >}}. Attendez que l'opération se termine avec succès avant de continuer.

{{< img src="cloud_cost/run_now.png" alt="Cliquez sur le bouton \"Exécuter maintenant\" dans le panneau latéral d'export pour générer des exports." style="width:50%" >}}

### Donnez à Datadog accès à vos exportations {#provide-datadog-access-to-your-exports}
Accordez à Datadog un accès en lecture au compte de stockage où vos exportations sont enregistrées.

{{% collapse-content title="Comptes de facturation" level="h4" %}}

1. Dans l'onglet Exportations, cliquez sur le compte de stockage de l'exportation pour y accéder.
2. Cliquez sur l'onglet Containers.
3. Choisissez le conteneur de stockage dans lequel se trouvent vos factures.
4. Sélectionnez l'onglet {{< ui >}}Access Control (IAM){{< /ui >}}, puis cliquez sur {{< ui >}}Add{{< /ui >}}.
5. Choisissez {{< ui >}}Add role assignment{{< /ui >}}.
6. Choisissez {{< ui >}}Storage Blob Data Reader{{< /ui >}}, puis cliquez sur {{< ui >}}Next{{< /ui >}}.
7. Attribuez ces autorisations à l'une des App Registrations que vous avez connectées à Datadog.
    - Cliquez sur {{< ui >}}Select members{{< /ui >}}, choisissez le nom de l'App Registration, puis cliquez sur {{< ui >}}Select{{< /ui >}}. **Remarque** : Si vous ne voyez pas votre App Registration dans la liste, commencez à saisir son nom pour que l'interface utilisateur se mette à jour et l'affiche, si elle est disponible.
    - Sélectionnez {{< ui >}}Review + assign{{< /ui >}}.

Si vos exportations se trouvent dans des conteneurs de stockage différents, répétez les étapes un à sept pour l'autre conteneur de stockage.

{{% /collapse-content %}} 
{{% collapse-content title="Abonnements et groupes de ressources" level="h4" %}}
1. Dans l'onglet Exportations, cliquez sur le compte de stockage de l'exportation pour y accéder.
2. Cliquez sur l'onglet Containers.
3. Choisissez le conteneur de stockage dans lequel se trouvent vos factures.
4. Sélectionnez l'onglet {{< ui >}}Access Control (IAM){{< /ui >}}, puis cliquez sur {{< ui >}}Add{{< /ui >}}.
5. Choisissez {{< ui >}}Add role assignment{{< /ui >}}.
6. Choisissez {{< ui >}}Storage Blob Data Reader{{< /ui >}}, puis cliquez sur {{< ui >}}Next{{< /ui >}}.
7. Attribuez ces autorisations à l'une des App Registrations que vous avez connectées à Datadog.
    - Cliquez sur {{< ui >}}Select members{{< /ui >}}, choisissez le nom de l'App Registration, puis cliquez sur {{< ui >}}Select{{< /ui >}}.
    - Sélectionnez {{< ui >}}Review + assign{{< /ui >}}.

Si vos exportations se trouvent dans des conteneurs de stockage différents, répétez les étapes un à sept pour l'autre conteneur de stockage.
{{% /collapse-content %}}

### Configurez l'accès Cost Management Reader {#configure-cost-management-reader-access}
**Remarque** : Vous n'avez pas besoin de configurer cet accès si votre périmètre est {{< ui >}}Billing Account{{< /ui >}}.

1. Accédez à vos [abonnements][1] et cliquez sur le nom de votre abonnement.
2. Sélectionnez l'onglet {{< ui >}}Access Control (IAM){{< /ui >}}.
3. Cliquez sur {{< ui >}}Add{{< /ui >}}, puis sur {{< ui >}}Add role assignment{{< /ui >}}.
4. Choisissez {{< ui >}}Cost Management Reader{{< /ui >}}, puis cliquez sur {{< ui >}}Next{{< /ui >}}.
5. Attribuez ces autorisations à l'App Registration.

Cela permet de garantir une précision totale des coûts en autorisant des calculs de coûts périodiques par rapport à Microsoft Cost Management.

**Remarque** : Les données peuvent mettre jusqu'à 48 à 72 heures après la configuration pour se stabiliser dans Datadog.

[1]: https://portal.azure.com/#view/Microsoft_Azure_Billing/SubscriptionsBlade

{{% /tab %}}
{{< /tabs >}}



**Remarque** : Si vous disposez des autorisations appropriées sur l'enregistrement de l'application mais que votre réseau bloque les adresses IP du webhook de Datadog, vous pourriez rencontrer des erreurs qui semblent liées aux autorisations.

Pour résoudre ce problème, ajoutez les adresses IP du webhook de Datadog à votre liste d'autorisation réseau en visitant la section `Webhooks` sur `https://ip-ranges.`{{< region-param key="dd_site" code="true" >}}.

### Configurer Cloud Cost dans Datadog {#configure-cloud-cost-in-datadog}
Accédez à [Setup & Configuration][3] et suivez les étapes.

### Migrer les exportations d'un EA vers un MCA {#migrate-exports-from-an-ea-to-an-mca}

Azure ne migre pas automatiquement les définitions d'exportation de coûts d'un Enterprise Agreement (EA) vers un Microsoft Customer Agreement (MCA). Pour plus d'informations, consultez la [documentation d'intégration MCA][15] de Microsoft.

Le processus suivant préserve les données historiques EA pour les configurations Datadog qui utilisent un périmètre de compte de facturation, d'abonnement ou de groupe de ressources.

1. Notez les paramètres suivants pour les exportations EA réelles et amorties :
   * Nom de l'exportation, y compris les majuscules
   * Compte de stockage
   * Conteneur de stockage
   * Répertoire de stockage et préfixe d'exportation
   * Version du jeu de données, format et type de compression
1. Une fois les dernières exportations de la période EA terminées, désactivez les exportations EA planifiées, mais conservez leurs définitions. Ne permettez pas aux exportations planifiées EA et MCA d'écrire vers la même destination en même temps.
1. Laissez la configuration Azure Cloud Cost Management dans Datadog activée et inchangée. Pour un périmètre de compte de facturation, Datadog conserve l'ID EA.
1. Une fois le MCA activé, recréez les exportations réelles et amorties au périmètre MCA correspondant en utilisant Terraform ou le portail Azure. Utilisez les noms d'exportation, le compte de stockage, le conteneur, le répertoire et le préfixe enregistrés à partir des exportations EA.
   * Pour Terraform, suivez le [flux de configuration Terraform][19] à travers les étapes HCL des ressources Azure. N'appliquez pas de nouveau HCL Datadog et ne remplacez pas la configuration existante Azure Cloud Cost Management.
   * Pour le portail Azure, suivez les [instructions d'exportation manuelle des coûts][17].

Datadog continue de lire les fichiers EA historiques à partir de la destination existante et ajoute les données MCA au même historique des coûts.

<div class="alert alert-warning">
<strong>Ne complétez pas les dates EA à partir d'un périmètre MCA</strong>
<p>Une exportation MCA n'inclut pas les coûts de l'EA précédent. L'exécution d'une exportation MCA ponctuelle pour une plage de dates EA peut écrire un manifeste vide plus récent vers la destination partagée. Datadog lit la dernière exportation pour chaque mois, de sorte que le manifeste vide peut mettre à zéro les données EA précédemment ingérées.</p>
</div>

Pour compléter les données après une migration EA vers MCA, utilisez l'accord qui couvrait les dates demandées :

* Pour les dates antérieures à la date d'entrée en vigueur du MCA, exécutez les exportations ponctuelles réelles et amorties à partir du périmètre EA précédent.
* Pour les dates à compter de la date d'entrée en vigueur du MCA, exécutez les exportations ponctuelles réelles et amorties à partir du périmètre MCA.

Si le périmètre EA précédent n'est pas disponible, contactez le support Microsoft pour demander les exportations historiques. Si vous avez modifié un nom ou une destination d'exportation, ou supprimé et recréé la configuration Datadog, contactez le [support Datadog][16]. Ne créez pas d'exportations ponctuelles ou planifiées supplémentaires tant que le support Datadog n'a pas examiné la configuration.

### Obtention des données historiques {#getting-historical-data}

Les exportations Azure des données de coût commencent à partir du mois où vous avez créé l'exportation. Datadog ingère automatiquement jusqu'à 15 mois de données de coût historiques disponibles à partir de ces exportations. Vous pouvez compléter manuellement jusqu'à 12 mois de données de coût Azure en utilisant l'interface utilisateur des exportations de coûts Azure.

**Remarque** : Si vous avez migré d'un EA vers un MCA, suivez les [instructions de migration][18] avant d'exécuter une exportation historique.

1. Complétez les instructions dans les sections **Setup** et **Configure Cloud Cost in Datadog** ci-dessus.
1. Attendez jusqu'à 24 heures que les données de coût apparaissent dans Datadog pour vous assurer que l'intégration fonctionne de bout en bout avant de commencer le processus de remplissage. **Remarque :** Si vous avez déjà terminé la configuration et que les données de coût apparaissent dans Datadog, vous pouvez passer directement aux étapes de remplissage ci-dessous.
1. Exportez manuellement un rapport **réel** et **amorti** pour chaque mois civil. Par exemple, pour juin 2025 :
    1. Modifiez l'exportation
    2. Modifiez le type d'exportation en {{< ui >}}One-time export{{< /ui >}}
    3. Définissez {{< ui >}}From{{< /ui >}} sur 06-01-2025 **Remarque :** Il doit s'agir du premier jour du mois.
    4. Définissez {{< ui >}}End{{< /ui >}} sur 06-30-2025 **Remarque :** Il doit s'agir du dernier jour du mois.
    5. Enregistrez l'exportation **Remarque :** Cela exécute automatiquement l'exportation.
    6. Attendez que l'exportation se termine
1. Rétablissez les exportations **réelles** et **amorties** dans leur état d'origine pour reprendre les exportations quotidiennes :
    1. Modifiez l'exportation
    2. Modifiez le type d'exportation en {{< ui >}}Daily export of month-to-date costs{{< /ui >}}
    3. Enregistrez l'exportation

Datadog découvre et ingère automatiquement ces données, qui devraient apparaître dans Datadog sous 24 heures.

Vous pouvez également créer des données historiques dans votre compte de stockage en utilisant l'[API Microsoft][6] ou en créant un [ticket de support auprès de Microsoft][7]. Assurez-vous que la structure de fichiers et le partitionnement suivent le format des exportations planifiées.

### Types de coûts {#cost-types}

Vous pouvez visualiser vos données ingérées en utilisant les types de coûts suivants :

| Type de coût            | Description           |
| -------------------- | --------------------- |
| `azure.cost.amortized` | Coût basé sur les taux de remise appliqués plus la répartition des prépaiements sur l'utilisation pour la durée de la remise (base de comptabilité d'exercice).|
| `azure.cost.actual` | Coût affiché comme le montant facturé au moment de l'utilisation (base de comptabilité de caisse). Les coûts réels incluent les remises privées ainsi que les remises des instances réservées et des plans d'épargne en tant que types de charge distincts.|
| `azure.cost.discounted.ondemand` | Coût basé sur le tarif catalogue fourni par Azure, après remises négociées en privé. Pour obtenir le coût réel à la demande, divisez cette métrique par (1 - <negotiated_discount>). Par exemple, si vous bénéficiez d'une remise forfaitaire de 5 % sur tous les produits Azure, divisez cette métrique par 0,95 (1 - 0,05) pour obtenir le prix réel à la demande.|

### Tags prêts à l'emploi {#out-of-the-box-tags}

Datadog enrichit automatiquement vos données de coût Azure avec des tags provenant de sources multiples. Pour un aperçu complet de la façon dont les tags sont appliqués aux données de coût, consultez [Tags][12].

Les tags prêts à l'emploi suivants sont dérivés de votre [rapport de coût d'utilisation][9] et facilitent la découverte et la compréhension des données de coût :

| Nom du tag                         | Description du tag       |
| ---------------------------- | ----------------- |
| `accountname` | Le nom du compte associé au poste de ligne. |
| `accountownerid` | L'identifiant du propriétaire associé au poste de ligne. |
| `billingaccountid` | L'identifiant du compte de facturation associé au poste de ligne. |
| `billingaccountname` | Le nom du compte de facturation associé au poste de ligne. |
| `billingcurrency` | La devise associée au compte de facturation. |
| `billingperiod` | La période de facturation de la charge. |
| `billingperiodenddate` | La date de fin de la période de facturation. |
| `billingperiodstartdate` | La date de début de la période de facturation. |
| `billingprofileid` | L'identifiant unique de l'inscription au Contrat Entreprise. |
| `billingprofilename` | Le nom de l'inscription au Contrat Entreprise. |
| `chargetype` | Le type de charge couvrant le poste de ligne : `Usage`, `Purchase` ou `Refund`. |
| `consumedservice` | Le nom du service auquel le poste de ligne est associé. |
| `costcenter` | Le centre de coûts défini pour l'abonnement afin de suivre les coûts. |
| `costinbillingcurrency` | Le coût dans la devise de facturation avant crédits ou taxes. |
| `costinpricingcurrency` | Le coût dans la devise de tarification avant crédits ou taxes. |
| `currency` | La devise associée au compte de facturation. |
| `date` | La date d'utilisation ou d'achat de la charge. |
| `effectiveprice` | Le prix unitaire mixte pour la période. Les prix mixtes lissent les fluctuations du prix unitaire, comme la tarification par paliers, qui réduit le prix à mesure que la quantité augmente. |
| `exchangeratedate` | La date à laquelle le taux de change a été établi. |
| `exchangeratepricingtobilling` | Le taux de change utilisé pour convertir le coût dans la devise de tarification en devise de facturation. |
| `frequency` | Indique si une charge est censée se répéter. Les charges peuvent être ponctuelles (`OneTime`), se répéter sur une base mensuelle ou annuelle (`Recurring`), ou être basées sur l'utilisation (`Usage`) |
| `InvoiceId` | L'identifiant unique du document figurant sur le PDF de la facture. |
| `invoicesectionid` | L'identifiant de la section de facture MCA. |
| `invoicesectionname` | Le nom du département du Contrat Entreprise (EA). |
| `isazurecrediteligible` | `true` si la charge est éligible au paiement par crédits Azure. |
| `location` | L'emplacement du centre de données où la ressource est en cours d'exécution. |
| `metercategory` | Le service de niveau supérieur auquel appartient cette utilisation (tel que `Networking`). |
| `meterid` | L'ID unique du compteur. |
| `metername` | Les détails d'utilisation du poste de ligne (tels que `L8s v2` ou `General Purpose Data Stored`). |
| `meterregion` | L'emplacement du centre de données pour les services dont le prix est basé sur l'emplacement (tels que `West US 2`). Utilisez `resourcelocation` pour voir les données d'emplacement sans `N/A`. |
| `metersubcategory` | Le nom de la catégorie de sous-classification du compteur (telle que `General Purpose - Storage`). Utilisez `metername` ou `metercategory` pour voir la classification de niveau supérieur sans `N/A`. |
| `offerid` | Le nom de l'offre achetée. |
| `partnumber` | L'ID utilisé pour obtenir une tarification spécifique du compteur. |
| `planname` | Le nom du plan de la place de marché s'il a été acheté via la place de marché. |
| `PreviousInvoiceId` | Référence à une facture originale si ce poste de ligne est un remboursement. |
| `PricingCurrency` | La devise utilisée lors de l'évaluation basée sur des prix négociés. |
| `pricingmodel` | Le type d'utilisation (tel que `Reservation`). |
| `ProductId` | L'identifiant d'un produit Azure spécifique. |
| `productname` | Le nom du produit Azure à un niveau granulaire, tel que le type de VM ou de disque et la région. |
| `productorderid` | L'ID de la commande de produit. Utilisez `productname` pour voir les informations sur le produit de niveau supérieur sans `N/A`. |
| `productordername` | Le nom de la commande de produit. Utilisez `productname` pour voir les informations sur le produit de niveau supérieur sans `N/A`. |
| `publishername` | L'éditeur des services de la place de marché. |
| `publishertype` | Le type d'éditeur : `Microsoft` pour les comptes Contrat client Microsoft et `Azure` pour les comptes Contrat Entreprise. |
| `reservationid` | L'ID de l'instance de réservation achetée. Si vous voyez des valeurs `N/A`, il s'agit de ressources `OnDemand`, qui peuvent être vérifiées à l'aide du tag `pricingmodel`. |
| `reservationname` | Le nom de l'instance de réservation achetée. Si vous voyez des valeurs `N/A`, il s'agit de ressources `OnDemand`, qui peuvent être vérifiées à l'aide du tag `pricingmodel`. |
| `resourcegroup` | Le nom du groupe de ressources dans lequel se trouve la ressource. Tous les frais ne proviennent pas de ressources déployées dans des groupes de ressources. |
| `resourceid` | L'ID de la ressource Azure. |
| `resourcelocation` | L'emplacement du centre de données où la ressource est en cours d'exécution (tel que `westus2`). |
| `resourcename` | Le nom de la ressource. Tous les frais ne proviennent pas de ressources déployées. |
| `resourcetype` | Le type de la ressource Azure. |
| `servicefamily` | La famille de services à laquelle appartient le service (tel que `Compute`). Le tag `consumedservice` offre des informations plus approfondies sur les types d'infrastructure. |
| `ServicePeriodEndDate` | La date de fin de la période de service Azure. |
| `ServicePeriodStartDate` | La date de début de la période de service Azure. |
| `subscriptionid` | L'ID de l'abonnement Azure. |
| `subscriptionname` | Le nom de l'abonnement Azure. |
| `term` | Décrit la durée ou le terme du plan d'économies en mois (tel que `12`). |
| `unitofmeasure` | L'unité de mesure utilisée pour la facturation du service. Par exemple, les services de calcul sont facturés à l'heure. |


#### Corrélation entre coûts et observabilité : {#cost-and-observability-correlation}

Visualiser les coûts dans le contexte des données d'observabilité est important pour comprendre comment les changements d'infrastructure impactent les coûts, identifier pourquoi les coûts changent et optimiser l'infrastructure à la fois pour les coûts et les performances. Datadog ajoute le tag `name` aux données de coût pour les principaux produits Azure afin de simplifier la corrélation entre les métriques d'observabilité et de coût.

Par exemple, pour visualiser le coût et l'utilisation de chaque VM Azure, vous pouvez créer un tableau avec `azure.cost.amortized` et `azure.vm.network_in_total` (ou toute autre métrique de VM) et grouper par `name`. Ou, pour voir l'utilisation du stockage et les coûts côte à côte, vous pouvez filtrer dans `metercategory:Storage` et représenter graphiquement `azure.storage.transactions` et `azure.cost.amortized` groupés par `name`.

## Pour aller plus loin {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]:  https://www.datadoghq.com/blog/azure-datadog-partnership/
[2]:  https://docs.datadoghq.com/fr/integrations/azure/?tab=azurecliv20#setup
[3]:  https://app.datadoghq.com/cost/setup
[4]:  https://app.datadoghq.com/integrations/azure
[5]:  https://portal.azure.com/#view/Microsoft_Azure_CostManagement/Menu/~/config
[6]:  https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-export-acm-data?tabs=azure-cli
[7]:  https://support.microsoft.com
[8]:  https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-improved-exports
[9]:  https://learn.microsoft.com/en-us/azure/cost-management-billing/understand/download-azure-daily-usage
[10]: https://docs.azure.cn/en-us/cost-management-billing/manage/resolve-past-due-balance#check-the-type-of-your-account
[12]: /fr/cloud_cost_management/tags
[13]: /fr/api/latest/cloud-cost-management/#create-cloud-cost-management-azure-configs
[14]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/azure_uc_config
[15]: https://learn.microsoft.com/en-us/azure/cost-management-billing/microsoft-customer-agreement/onboard-microsoft-customer-agreement
[16]: /fr/help/
[17]: ?tab=manual#generate-cost-exports
[18]: #migrate-exports-from-an-ea-to-an-mca
[19]: ?tab=terraform