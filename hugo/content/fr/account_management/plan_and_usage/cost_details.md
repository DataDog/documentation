---
description: Suivez les coûts liés à Datadog avec des récapitulatifs et des refacturations,
  y compris les coûts mensuels prévisionnels, les données historiques et la répartition
  des coûts multi-organisations.
further_reading:
- link: https://docs.datadoghq.com/account_management/billing/
  tag: Documentation
  text: Facturation
- link: https://docs.datadoghq.com/account_management/billing/usage_details/
  tag: Documentation
  text: Utilisation détaillée
- link: https://docs.datadoghq.com/account_management/multi_organization/
  tag: Documentation
  text: Gestion des comptes multi-organisations
title: Détails des coûts
---

## Présentation

Les récapitulatifs de coûts et les refacturations vous aident à comprendre vos coûts liés à Datadog estimés depuis le début du mois, vos projections de fin de mois et vos coûts historiques. Les données de coûts sont disponibles pour les 15 derniers mois.

Vous pouvez décomposer vos coûts par sous-organisation et par produit pour :
- Répartir les coûts en fonction de leur source
- Obtenir des informations sur la manière dont les coûts sont suivis

Pour obtenir une visibilité sur les dépenses quotidiennes de Datadog dans Cloud Cost Explorer, les dashboards et les [monitors des coûts][7], consultez la section relative [au coûts liés à Datadog][8] dans Cloud Cost Management.

### Autorisations

Les rôles disposant des [autorisations][1] Billing Read (`billing_read`) et Usage Read (`usage_read`) peuvent afficher les données des récapitulatifs de coûts et des refacturations. Les utilisateurs avec le rôle Datadog Admin disposent de ces autorisations par défaut.


## Résumé des coûts

Utilisez le récapitulatif de coûts pour :
- Afficher les coûts estimés depuis le début du mois et les projections de fin de mois
- Afficher les coûts historiques
- Filtrer et regrouper les coûts par produit ou par sous-organisation
- Afficher les variations de coûts mensuelles en % et en $
- Afficher les tendances de coûts au cours du mois
- Afficher les coûts cumulatifs jour après jour

### Coûts prévisionnels (organisation parent)

Les coûts prévisionnels de fin de mois sont calculés en appliquant les données d'utilisation projetées du mois en cours et du mois précédent à vos tarifs contractuels. Les coûts prévisionnels de fin de mois sont mis à jour quotidiennement et peuvent évoluer au fil du temps en fonction de votre utilisation au cours du mois. Étant donné qu'il s'agit d'une prévision, le montant peut différer de votre coût mensuel final.

### Synthèse des coûts (organisation parent)

La fonctionnalité de récapitulatif de coûts varie selon votre utilisation de Datadog en tant qu'organisation unique ou multi-organisation. En mode multi-organisation, vous pouvez afficher les coûts estimés, prévisionnels et historiques pour l'organisation parente et chaque sous-organisation.

{{< img src="account_management/plan_and_usage/multiorg-current-month-historical-costs.png" alt="Capture d'écran du récapitulatif de coûts du mois en cours pour une organisation parente, montrant le coût total depuis le début du mois, le coût prévisionnel, un graphique avec la répartition des coûts cumulatifs et un tableau récapitulatif incluant les variations de coûts mensuelles." >}}

Affichez les coûts historiques en revenant sur les mois précédents ou utilisez le menu déroulant de dates pour consulter les coûts sur 1, 3, 6 ou 12 mois.

{{< img src="account_management/plan_and_usage/parent-org-multi-month-cost-changes.png" alt="Capture d'écran des coûts historiques d'une organisation parente sur une période de trois mois, montrant le coût total du mois, un graphique avec la répartition des coûts cumulatifs et un tableau récapitulatif incluant les variations de coûts mensuelles." >}}

1. Lorsque vous êtes connecté à l'organisation parente, accédez à [Plan & Usage][2].
1. Cliquez sur l'onglet **Usage**.
1. Pour une multi-organisation, assurez-vous que l'onglet **Overall** est sélectionné.

#### Visualiser et filtrer

Utilisez les facettes de recherche à gauche pour filtrer les coûts par **Products**, **Sub-Orgs** ou **Cost Breakdown**. Utilisez l'onglet Daily Cost pour voir comment les coûts cumulatifs jour après jour ont évolué au cours du mois en cours.


#### Télécharger

Pour télécharger les données sous la forme d'un fichier de valeurs séparées par des virgules, cliquez sur **Download as CSV**. Les données sont disponibles pour le mois en cours et les mois antérieurs prédéfinis. Utilisez le champ `Cost Type` pour consulter les différents types de données :
- **Projected** : Données disponibles pour le mois actuel.
- **Estimated MTD** : Données disponibles depuis le premier du mois jusqu'à la date actuelle. Si les données historiques sur les coûts ne sont pas encore disponibles pour un autre mois, vous avez accès aux données sur les coûts estimés.
- **Historical** : Données disponibles à la clôture du mois, soit environ 16 jours après le dernier jour du mois.

Pour interroger les données relatives aux coûts estimés via l'API, consultez la section [Récupérer le coût estimé de votre compte][3]. Pour interroger les données relatives aux coûts prévisionnels via l'API, consultez [Récupérer le coût prévisionnel de votre compte][6].

### Synthèse des coûts (sous-organisation)

<div class="alert alert-danger">Cette fonctionnalité est en disponibilité limitée. Pour demander l'accès et confirmer que votre organisation répond aux critères, contactez votre représentant de compte ou <a href="https://docs.datadoghq.com/help/">le service client</a>.</div>

En tant que sous-organisation, vous pouvez afficher uniquement les coûts de votre organisation. Cette restriction permet une répartition plus large de la responsabilité et supprime la nécessité d'accorder des autorisations Admin plus étendues à l'organisation parente.

{{< img src="account_management/plan_and_usage/suborg-cost-trends.png" alt="Capture d'écran du récapitulatif de coûts du mois en cours pour une sous-organisation, montrant le coût total depuis le début du mois, le coût prévisionnel, un graphique avec la répartition des coûts cumulatifs et un tableau récapitulatif incluant les variations de coûts mensuelles.">}}

Affichez les coûts historiques en revenant sur les mois précédents ou utilisez le menu déroulant de dates pour consulter les coûts sur 1, 3, 6 ou 12 mois.

{{< img src="account_management/plan_and_usage/suborg-multi-month-cost-changes.png" alt="Capture d'écran des coûts historiques d'une sous-organisation sur une période de six mois, montrant le coût total du mois, un graphique avec la répartition des coûts cumulatifs et un tableau récapitulatif incluant les variations de coûts mensuelles." >}}

1. Lorsque vous êtes connecté à la sous-organisation, accédez à [Plan & Usage][2].
1. Cliquez sur l'onglet **Usage**.
1. Assurez-vous que l'onglet **Overall** est sélectionné.

#### Visualiser et filtrer

Utilisez les facettes de recherche à gauche pour filtrer les coûts par **Products** ou **Cost Breakdown**. Utilisez l'onglet **Daily Cost** pour voir comment les coûts cumulatifs jour après jour ont évolué au cours du mois en cours.

#### Télécharger

Pour télécharger les données sous forme de fichier CSV, cliquez sur **Download as CSV**.

## Refacturation des coûts

Utilisez les refacturations des coûts pour :
- Afficher les coûts estimés depuis le début du mois et les coûts historiques pour les multi-organisations
- Attribuer les coûts à chaque sous-organisation

Les réaffectations de coût sont obtenues comme suit :
- En calculant le pourcentage d'utilisation des sous-organisations. Il s'agit de diviser l'utilisation de chaque sous-organisation par l'utilisation totale de l'organisation parent.
- En appliquant le pourcentage d'utilisation des sous-organisations aux coûts de l'organisation mère, ce qui permet d'obtenir les réaffectations de coût pour chaque sous-organisation.

### Refacturations des coûts historiques

Depuis une organisation parente, affichez les coûts historiques finalisés agrégés par produit et par sous-organisation.

{{< img src="account_management/plan_and_usage/historical-cost-chargebacks.png" alt="Capture d'écran d'un tableau intitulé 'Usage and Cost Summary', montrant l'utilisation totale en dollars pour quatre sous-organisations ainsi que le coût total." >}}

1. Lorsque vous êtes connecté à l'organisation parente, accédez à [Plan & Usage][2].
1. Sélectionnez l'onglet **Usage**.
1. Cliquez sur **Individual Organizations**.
1. Assurez-vous que les boutons **Billable** et **Cost** sont sélectionnés.
1. Utilisez le sélecteur de date pour afficher un mois antérieur pour lequel la facturation a été effectuée.

**Remarque** : les données sont disponibles après la clôture du mois, soit environ 16 jours après la fin du mois.

### Refacturations des coûts estimées

Depuis une organisation parente, affichez les coûts estimés agrégés par produit et par sous-organisation.

Les données de coûts estimés sont disponibles pour le mois en cours. Si les données de coûts historiques ne sont pas encore disponibles pour le mois précédent, les données de coûts estimés s'affichent également pour le mois précédent.

{{< img src="account_management/plan_and_usage/estimated-cost-chargebacks.png" alt="Capture d'écran d'un tableau intitulé 'Usage and Cost Summary', montrant l'utilisation totale en dollars pour quatre sous-organisations ainsi que le coût total." >}}

1. Lorsque vous êtes connecté à l'organisation parente, accédez à [Plan & Usage][2].
1. Sélectionnez l'onglet **Usage**.
1. Cliquez sur **Individual Organizations**.
1. Assurez-vous que les boutons **Billable** et **Cost** sont sélectionnés.
1. Assurez-vous que le sélecteur de date affiche le mois en cours ou le mois précédent.

### Télécharger

- Pour télécharger les données de refacturation de coûts historiques ou estimés sous forme de fichier CSV, cliquez sur **Download as CSV**.
- Consultez la rubrique [Récupérer le coût historique de votre compte][4] pour découvrir comment interroger les données sur les réaffectations historiques de coût via l'API.
- Consultez la section [Récupérer le coût historique de votre compte][3] pour interroger les données de refacturation de coûts estimés via l'API.

## Impact des agrégations de facturation sur l'évolution des coûts

Votre facture Datadog estimée depuis le début du mois varie au cours du mois. Le type d'agrégation utilisé pour facturer chaque produit détermine l'impact sur les coûts. Pour une meilleure visualisation, consultez le graphique de la fonctionnalité de [résumé des coûts][5]. Chaque filtre **Products** inclut la méthode d'agrégation de facturation correspondante à côté du nom du produit.

### Facturation basée sur le percentile et l'utilisation moyenne

Les produits facturés sur la base du nombre maximal (high-water mark) des 99 pourcents inférieurs de l'utilisation mensuelle incluent les hosts d'infrastructure et les hosts APM. Les produits facturés sur la moyenne du mois incluent les métriques custom et les tâches Fargate. Pour ces deux types de produits, les coûts restent généralement relativement stables tout au long du mois. Toutefois, ils peuvent encore varier en cas de hausse ou de baisse significative de l'utilisation.

### Facturation basée sur la somme de l'utilisation

Les produits facturés sur la somme de l'utilisation au cours du mois incluent les logs indexés et les logs ingérés. Pour ces types de produits, les coûts augmentent ou diminuent en fonction des variations du volume d'utilisation.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/
[2]: https://app.datadoghq.com/billing/usage
[3]: /fr/api/latest/usage-metering/#get-estimated-cost-across-your-account
[4]: /fr/api/latest/usage-metering/#get-historical-cost-across-your-account
[5]: /fr/account_management/plan_and_usage/cost_details/#cost-summary
[6]: /fr/api/latest/usage-metering/#get-projected-cost-across-your-account
[7]: /fr/cloud_cost_management/monitors/?tab=costmetricbased
[8]: /fr/cloud_cost_management/datadog_costs/