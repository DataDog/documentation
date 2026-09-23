---
description: Consultez votre portefeuille de contrats clients finaux depuis votre
  organisation admin Datadog, y compris les revenus récurrents, les dates de renouvellement,
  les soldes de prélèvement, les factures et le statut de visibilité des coûts.
further_reading:
- link: /account_management/plan_and_usage/partner_experience/customer_pricing/
  tag: Documentation
  text: Tarification client
- link: /account_management/plan_and_usage/bill_overview/partner_purchased_cost_visibility/
  tag: Documentation
  text: Visibilité des coûts pour les clients qui achètent via un partenaire
- link: /account_management/plan_and_usage/partner_experience/
  tag: Documentation
  text: Expérience Plan & utilisation pour les partenaires
title: Contrats Clients
---
La page [Customer Contracts][1] offre aux partenaires Datadog une vue d'ensemble de leur portefeuille de contrats clients finaux, incluant les revenus récurrents, les dates de renouvellement, les factures et le statut de visibilité des coûts. Les vignettes récapitulatives en haut de la page indiquent combien de contrats doivent être renouvelés, combien de clients nécessitent la saisie de tarifs avant de pouvoir utiliser les fonctionnalités de visibilité des coûts, ainsi que le nombre et le montant total des factures en retard.

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Customer Contracts n'est pas disponible pour le <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< img src="account_management/plan_and_usage/customer-contracts-overview.png" alt="Page Customer Contracts affichant des vignettes récapitulatives pour les renouvellements, la visibilité des coûts et les factures en retard au-dessus du tableau des clients." >}}

**Remarque** : Les données sur cette page sont actualisées toutes les 30 minutes.

## Prérequis {#prerequisites}

Pour utiliser Customer Contracts, vous avez besoin de :

- Une organisation admin Datadog. Si vous n'en avez pas, contactez votre équipe Partenaires Datadog.
- L'autorisation Billing Read (`billing_read`) dans votre organisation admin. Les utilisateurs disposant de cette autorisation peuvent voir toutes les informations sur la page. Pour plus d'informations sur la gestion des autorisations, consultez [Role Based Access Control][4].

## Accéder à Customer Contracts {#access-customer-contracts}

1. Connectez-vous à votre organisation d'administration Datadog.
2. Accédez à [{{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Customer Contracts{{< /ui >}}][1].

## Tableau des clients {#customer-table}

Le tableau des clients répertorie chaque client dans votre organisation admin. Sélectionnez un client pour ouvrir son panneau de détails du contrat.

| Colonne | Description |
|---|---|
| {{< ui >}}Customer{{< /ui >}} | Nom du client final |
| {{< ui >}}CMRR{{< /ui >}} | Revenu mensuel récurrent du contrat |
| {{< ui >}}UMRR{{< /ui >}} | Revenu mensuel récurrent lié à l'utilisation, basé sur l'utilisation mesurée du client plutôt que sur son engagement contractuel |
| {{< ui >}}Overdue Balance{{< /ui >}} | Montant total des factures du client échues |
| {{< ui >}}Cost Visibility{{< /ui >}} | Si le client peut voir ses coûts Datadog. Voir [Vérifier le statut de visibilité des coûts](#check-cost-visibility-status). |
| {{< ui >}}Contract Status{{< /ui >}} | Si le contrat est actif, proche de sa date de renouvellement ou expiré |

Utilisez la zone de recherche pour trouver un client spécifique, ou filtrez le tableau par {{< ui >}}Cost Visibility{{< /ui >}} ou {{< ui >}}Contract Status{{< /ui >}}.

## Suivre les renouvellements {#track-renewals}

Le tableau des clients affiche le statut de chaque contrat, ce qui vous permet de visualiser ceux qui approchent de leur date de renouvellement et ceux dont la date a déjà été dépassée. Triez ou filtrez par {{< ui >}}Contract Status{{< /ui >}} pour faire remonter les contrats les plus urgents.

{{< img src="account_management/plan_and_usage/customer-contracts-renewals.png" alt="Tableau des clients trié par statut de contrat, affichant les contrats expirés et ceux arrivant bientôt à expiration." >}}

## Examiner les détails du contrat {#review-contract-details}

Sélectionnez un client pour ouvrir son panneau de détails du contrat. L'onglet {{< ui >}}Current Contract{{< /ui >}} affiche :

- {{< ui >}}Spend Overview{{< /ui >}} : CMRR du mois dernier, UMRR du mois dernier et utilisation du contrat.
- {{< ui >}}Contract Info{{< /ui >}} : statut d'influence (influencé ou non influencé), date de début du contrat et date de fin du contrat.
- {{< ui >}}Drawdown Depletion{{< /ui >}} : l'engagement total, les dépenses à ce jour, les fonds restants, le total projeté, le dépassement projeté et la date d'épuisement projetée par rapport à la date de fin du contrat. Cette section n'apparaît que pour les contrats de prélèvement, où l'utilisation du client puise dans un fonds engagé sur la durée du contrat.

{{< img src="account_management/plan_and_usage/customer-contracts-detail.png" alt="Panneau de détails du contrat pour un client affichant l'aperçu des dépenses, la barre de progression de l'épuisement du prélèvement et la barre latérale des informations sur le contrat." >}}

Vous pouvez définir les tarifs d'un client à partir de l'onglet {{< ui >}}Custom Pricing Configuration{{< /ui >}} de ce panneau au lieu d'aller sur la page [Tarification client][2].

## Surveiller les factures {#monitor-invoices}

L'onglet {{< ui >}}Invoices{{< /ui >}} du panneau de détails du contrat répertorie chaque facture pour ce client avec sa date d'émission, sa date d'échéance, son montant et son statut de paiement. Ouvrez le PDF de n'importe quelle facture depuis cet onglet. Le solde en souffrance de chaque client apparaît également dans le tableau principal des clients, et les vignettes récapitulatives en haut de la page indiquent le nombre et le montant total des factures en souffrance pour l'ensemble de votre portefeuille.

**Remarque** : Le statut de paiement reflète si vous avez payé votre facture Datadog pour l'utilisation de ce client. Il ne permet pas de savoir si le client final vous a payé.

{{< img src="account_management/plan_and_usage/customer-contracts-invoices.png" alt="Onglet Factures du panneau de détails du contrat répertoriant les factures avec la date d'émission, la date d'échéance, le montant, le statut de paiement et un lien pour afficher le PDF." >}}

## Vérifier le statut de visibilité des coûts{#check-cost-visibility-status}

Vos clients finaux peuvent voir leurs propres coûts Datadog estimés depuis le début du mois et historiques dans leur organisation Datadog, calculés à partir des tarifs que vous publiez pour eux. La colonne {{< ui >}}Cost Visibility{{< /ui >}} indique la situation de chaque client :

- {{< ui >}}Enabled{{< /ui >}} : le client peut voir ses coûts Datadog dans sa propre organisation.
- {{< ui >}}Not configured{{< /ui >}} : vous n'avez pas encore publié de tarifs pour ce client.
- {{< ui >}}Update needed{{< /ui >}} : le contrat du client a été modifié, ses tarifs publiés doivent donc être mis à jour.

La vignette {{< ui >}}Cost Visibility Action Needed{{< /ui >}} en haut de la page compte les clients dans les états {{< ui >}}Not configured{{< /ui >}} et {{< ui >}}Update needed{{< /ui >}}.

Pour publier ou mettre à jour les tarifs, consultez [Tarification client][2]. Pour expliquer cette fonctionnalité à votre client, partagez [Visibilité des coûts pour les clients achetant via un partenaire][3].

{{< img src="account_management/plan_and_usage/customer-contracts-cost-visibility.png" alt="Tableau des clients avec la colonne Visibilité des coûts mise en évidence, montrant les clients marqués comme Activé ou Mise à jour nécessaire." >}}

## Trouver les contacts du compte {#find-account-contacts}

La section {{< ui >}}Contacts{{< /ui >}} du panneau de détails du contrat répertorie le Customer Success Manager (CSM) Datadog, l'Account Executive (AE) Datadog et le responsable des ventes partenaires pour les questions spécifiques au compte, ainsi que le contact de facturation recevant les factures du client.

{{< img src="account_management/plan_and_usage/customer-contracts-contacts.png" alt="Section Contacts du panneau de détails du contrat répertoriant le CSM Datadog, l'AE Datadog, le contact de facturation et le responsable des ventes partenaires." >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/billing/customer-contracts
[2]: /fr/account_management/plan_and_usage/partner_experience/customer_pricing/
[3]: /fr/account_management/plan_and_usage/bill_overview/partner_purchased_cost_visibility/
[4]: /fr/account_management/rbac/