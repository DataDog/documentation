---
description: Si vous achetez Datadog par l'intermédiaire d'un partenaire, consultez
  vos coûts Datadog estimés depuis le début du mois et historiques dans la Vue d'ensemble
  de la facturation, avec une ventilation quotidienne et des détails par produit et
  par sous-organisation.
further_reading:
- link: /account_management/plan_and_usage/bill_overview/
  tag: Documentation
  text: Aperçu de la facturation
- link: /account_management/plan_and_usage/
  tag: Documentation
  text: Plan & utilisation
title: Visibilité des coûts pour les clients qui achètent via un partenaire
---
Si vous achetez Datadog par l'intermédiaire d'un partenaire, vous pouvez obtenir une meilleure visibilité sur vos coûts Datadog via la page [Vue d'ensemble de la facturation][1] dans votre organisation Datadog. La Vue d'ensemble de la facturation fournit une vue unique de vos coûts estimés depuis le début du mois et historiques, une ventilation quotidienne des coûts et la possibilité de grouper les coûts par produit et par sous-organisation, afin que vous puissiez comprendre vos dépenses Datadog à tout moment pendant la période de facturation.

{{< img src="account_management/plan_and_usage/bill-overview-main-light.png" alt="Page Vue d'ensemble de la facturation affichant l'en-tête du résumé des coûts et le graphique à barres empilées de la ventilation des coûts quotidiens." >}}

## Fonctionnalités clés {#key-features}

- **Coût estimé depuis le début du mois** : Consultez un total cumulé de vos coûts Datadog à tout moment pendant le mois, sans attendre votre facture.
- **Coût historique** : Examinez les coûts des mois précédents après la clôture de chaque mois. Les données remontent à 15 mois, ou jusqu'à votre changement de contrat le plus récent si celui-ci est plus récent.
- **Ventilation des coûts quotidiens** : Consultez un graphique à barres jour par jour de vos coûts pour repérer les changements de coûts dès qu'ils se produisent.
- **Grouper par produit** : Ventilez les coûts par catégorie de produit et dimension de facturation, telles que les hôtes d'infrastructure, les logs indexés ou les métriques personnalisées.
- **Grouper par sous-organisation** : Si vous utilisez plusieurs sous-organisations Datadog, filtrez et consultez les coûts pour chacune d'entre elles individuellement.

## Fonctionnement {#how-it-works}

Votre partenaire partage vos tarifs avec Datadog. Datadog utilise ces tarifs et vos données d'utilisation pour calculer vos coûts Datadog et alimenter les fonctionnalités de visibilité des coûts.

## Limitations {#limitations}

### Disponibilité des fonctionnalités {#feature-availability}

- **Les fonctionnalités avancées de visibilité des coûts ne sont pas prises en charge.** Cela inclut les coûts projetés, les coûts par tag et les [Datadog Costs][2] dans Cloud Cost Management.
- **Les clients Cloud Marketplace sans contrat de prélèvement ne sont pas pris en charge.** Si vous achetez Datadog via AWS, Google Cloud ou Azure Marketplace et que vous n'avez pas d'accord de prélèvement, la visibilité des coûts n'est pas disponible. Il s'agit d'une limitation à l'échelle de la plateforme qui affecte également certains clients directs.
- **Les contrats de fournisseur de services gérés (MSP) hérités (plusieurs clients sous un seul contrat) ne sont pas pris en charge.**
- **Les clients s'approvisionnant via deux partenaires de distribution en même temps ne sont pas pris en charge.** Si vos produits Datadog transitent par deux revendeurs (par exemple, de Datadog au Partenaire 1, puis au Partenaire 2, et enfin à vous), la visibilité des coûts n'est pas disponible.
- **Les organisations GovCloud ne sont pas prises en charge.**

### Précision des coûts estimés {#estimated-cost-accuracy}

- **La tarification à la demande par paliers n'est pas prise en charge.** Les données de coût ne sont pas affichées pour les SKU actifs de suivi des erreurs (Error Tracking) et d'observabilité LLM (LLM Observability).
- **Les produits basés sur un pourcentage ne sont pas pris en charge.** Les données de coût ne sont pas affichées pour les SKU Audit Trail ou Premier Support.
- **Tous les coûts sont estimés.** Les coûts sont calculés à partir des tarifs fournis par votre partenaire ; par conséquent, les coûts historiques sont également des estimations, même après la clôture d'un mois. Dans la plupart des cas, les coûts indiqués dans la Vue d'ensemble de la facturation correspondent à la facture de votre partenaire. Des différences mineures (quelques centimes) peuvent survenir en raison de nuances dans les calculs de facturation. Si vous constatez des écarts importants, contactez votre partenaire.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/plan_and_usage/bill_overview/
[2]: /fr/cloud_cost_management/datadog_costs/