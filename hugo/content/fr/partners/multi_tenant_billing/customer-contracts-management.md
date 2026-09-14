---
description: Gérez le portefeuille commercial du partenaire – clients, contrats et
  factures – depuis une Admin Org.
title: Contrats Clients
---
<div class="alert alert-info">
Customer Contracts est en Preview.
</div>

## Présentation {#overview}

Contrats Clients offre au partenaire un emplacement unique pour gérer les clients, les contrats et les factures de son portefeuille commercial avec Datadog. Les partenaires peuvent consulter ces informations directement, au lieu de dépendre de l'équipe de gestion de compte partenaire pour les recherches courantes.

Accédez à {{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Customer Contracts{{< /ui >}} dans l'Admin Org ; consultez [Demander une Admin Org][2] si aucune n'est encore configurée.

{{< img src="partners/multi_tenant_billing/customer_contracts.png" alt="Onglet Contrats Clients sous Plan & Usage dans une Admin Org, répertoriant les clients et les contrats." style="width:100%;" >}}

**Remarque** : L'autorisation Lecture de la facturation est requise pour afficher les Contrats Clients.

## Ce qui est inclus {#whats-included}

- Tous les clients connectés à l'Admin Org, ainsi que leurs contrats actuels et historiques, avec des rappels de renouvellement pour les contrats arrivant à échéance ou dont la date de renouvellement est déjà passée.
- Contract MRR (CMRR), Usage MRR (UMRR), statut d'influence, dates de début et de fin du contrat, tarifs par produit et bon de commande au format PDF.
- Pour les contrats drawdown, le solde restant, le dépassement projeté et la date d'épuisement projetée par rapport à la date de fin du contrat.
- Pour les contrats MSP, quels clients appartiennent à chaque contrat.
- Visibilité des remises et des marges par contrat.
- Indique si Customer Pricing est activé pour chaque client, s'il n'est pas encore configuré ou s'il nécessite une mise à jour après une modification du contrat.
- Contacts clés par client : le CSM Datadog, l'AE Datadog, l'équipe de gestion des comptes partenaires et le contact de facturation recevant les factures.

{{< img src="partners/multi_tenant_billing/customer_contracts_detail.png" alt="Panneau de détails des Contrats Clients affichant un aperçu des dépenses, l'épuisement du drawdown, les informations sur le contrat et les contacts pour un client." style="width:100%;" >}}

Les factures sont répertoriées par client avec les dates d'émission et d'échéance, le montant et le statut de paiement, et sont regroupées en nombres et totaux en retard sur la page principale des Contrats Clients :

{{< img src="partners/multi_tenant_billing/customer_contracts_invoices.png" alt="Onglet Factures des Contrats Clients répertoriant les numéros de facture, les dates, les montants et le statut pour un client." style="width:100%;" >}}

## Documentation associée {#related-docs}

- [Demander une Admin Org][2]

[2]: /fr/partners/multi_tenant_billing/#requesting-an-admin-org