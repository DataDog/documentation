---
description: Surveillez les coûts et l'utilisation facturable sur toutes les organisations
  clientes connectées depuis un Admin Org.
title: Visibilité des coûts et de l'utilisation
---
## Présentation {#overview}

Une organisation cliente se connecte automatiquement à l'organisation d'administration du partenaire (Admin Org) lorsque son contrat inclut le partenariat et est actif. Après la connexion, les données d'utilisation et de coût d'un client deviennent visibles depuis l'organisation d'administration, sur tous les sites Datadog utilisés par le client. La connexion est supprimée automatiquement 30 jours après l'expiration du contrat, ce qui accorde au partenaire une période de grâce pour conserver la visibilité pendant le renouvellement du contrat.

**Remarque** : L'utilisation d'une organisation d'essai n'est pas incluse ici tant que son organisation cliente n'est pas connectée de cette manière ; consultez [Provisionnement d'organisation d'essai][4].

## Afficher les données de coût et d'utilisation {#view-cost-and-usage-data}

Accédez à {{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Usage & Cost{{< /ui >}} dans l'Admin Org pour afficher les données estimées, historiques et projetées de coût et d'utilisation facturable sur toutes les organisations clientes connectées, regroupées et filtrées par client, produit ou compte. Consultez [Expérience de plan et d'utilisation pour les partenaires][1] pour plus de détails.

Les données de coût et d'utilisation sont également disponibles par programmation via les endpoints de l'[API de mesure de l'utilisation][2] suivants :

| API | Utilité | Remarque |
|---|---|---|
| [Obtenir le coût estimé sur votre compte][6] | Coût estimé pour le mois en cours et le mois précédent | Nécessite `include_connected_accounts=true` |
| [Obtenir le coût historique sur votre compte][7] | Coût historique pour les mois précédents | Nécessite `include_connected_accounts=true` |
| [Obtenir le coût projeté sur votre compte][8] | Coût projeté de fin de mois pour le mois en cours | Nécessite `include_connected_accounts=true` |
| [Obtenir l'utilisation facturable sur votre compte][9] | Résumés de l'utilisation facturable | Nécessite `include_connected_accounts=true` |
| [Obtenir l'utilisation sur votre compte][10] | Données récapitulatives de l'utilisation sur le compte | Nécessite `include_connected_accounts=true` |
| [Obtenir l'utilisation horaire par famille de produits][11] | Utilisation horaire ventilée par famille de produits | Nécessite `filter[include_connected_accounts]=true` |

## Documentation associée {#related-docs}

- [Métriques d'utilisation centralisées][3] : métriques d'utilisation regroupées à partir de chaque organisation cliente connectée.
- [Provisionnement d'organisation d'essai][4] : provisionnez des organisations d'essai pour des clients potentiels.

[1]: /fr/account_management/plan_and_usage/partner_experience/
[2]: /fr/api/latest/usage-metering/
[3]: /fr/partners/multi_tenant_billing/centralized-usage-metrics/
[4]: /fr/partners/multi_tenant_billing/trial-org-provisioning/
[6]: /fr/api/latest/usage-metering/#get-estimated-cost-across-your-account
[7]: /fr/api/latest/usage-metering/#get-historical-cost-across-your-account
[8]: /fr/api/latest/usage-metering/#get-projected-cost-across-your-account
[9]: /fr/api/latest/usage-metering/#get-billable-usage-across-your-account
[10]: /fr/api/latest/usage-metering/#get-usage-across-your-account
[11]: /fr/api/latest/usage-metering/#get-hourly-usage-by-product-family