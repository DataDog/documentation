---
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
kind: documentation
title: Détails des coûts
---

## Présentation

La synthèse des coûts estimés et les rétrofacturations de coût vous permettent d'analyser l'estimation de vos coûts depuis le début du mois ainsi que votre historique de coûts.

Grâce à la répartition des coûts par sous-organisation et solution, vous pouvez :
- allouer des coûts en fonction de leur source ;
- mieux comprendre comment fonctionne le suivi des coûts.

### Autorisations

Pour consulter les données relatives à la synthèse des coûts estimés et aux rétrofacturations de coût, vous devez être un administrateur Datadog.

Les rôles disposant des [autorisations][1] de lecture des factures (`billing_read`) et de lecture de l'utilisation (`usage_read`) peuvent également consulter ces informations.

## Synthèse des coûts

La synthèse des coûts vous permet d'accomplir ce qui suit :
- Consulter vos coûts estimés depuis le début du mois
- Étudier vos tendances en matière de coûts pour le mois en cours
- Filtrer et regrouper les coûts par solution ou sous-organisation
- Afficher les coûts cumulés d'un jour à l'autre

### Synthèse des coûts estimés (organisation parent)

La fonctionnalité de synthèse des coûts varie selon que vous fassiez partie d'une organisation Datadog unique ou de plusieurs organisations. Les comptes multi-organisations peuvent consulter les coûts estimés de l'organisation parent et de chaque sous-organisation.

{{< img src="account_management/plan_and_usage/cost_details/multi-org-estimated-cost-summary.png" alt="Capture d'écran de la synthèse des coûts estimés d'une organisation parent, avec le coût global depuis le début du mois, un graphique représentant la répartition des coûts cumulés et un tableau récapitulatif." >}}

1. Vérifiez que vous êtes connecté à une organisation parent, puis accédez à [Plan & Usage][2].
1. Cliquez sur l'onglet **Usage**.
1. Pour un compte multi-organisation, vérifiez que l'onglet **Overall** est sélectionné.

#### Afficher et filtrer les coûts

Les facettes de recherche sur la gauche de l'interface vous permettent de filtrer les coûts par solution (**Products**) ou par sous-organisation (**Sub-Orgs**). Cliquez sur l'onglet **Over Time** pour afficher l'évolution des coûts cumulés d'un jour à l'autre.

#### Télécharger les données

Pour télécharger les données sous la forme d'un fichier de valeurs séparées par des virgules, cliquez sur **Download as CSV**.

Consultez la rubrique [Récupérer le coût estimé de votre compte][3] pour découvrir comment interroger les données sur les coûts estimés via l'API.

### Synthèse des coûts estimés (sous-organisation)

<div class="alert alert-warning">Cette fonctionnalité est en version bêta. Pour vérifier si votre organisation répond aux critères de la fonctionnalité et pouvoir en bénéficier, contactez votre chargé de compte ou l'<a href="https://docs.datadoghq.com/help/">assistance client</a>.</div>

Lorsque vous êtes connecté à une sous-organisation, vous pouvez uniquement consulter les coûts de cette sous-organisation. Cette particularité permet de mieux répartir la propriété et d'éviter d'attribuer des autorisations d'administration globales à l'organisation parent.

{{< img src="account_management/plan_and_usage/sub-org-estimated-cost-summary.png" alt="Capture d'écran de la synthèse des coûts estimés d'une sous-organisation, avec le coût global depuis le début du mois, un graphique représentant la répartition des coûts cumulés et un tableau récapitulatif." >}}

1. Vérifiez que vous êtes connecté à une sous-organisation, puis accédez à [Plan & Usage][2].
1. Cliquez sur l'onglet **Usage**.
1. Vérifiez que l'onglet **Overall** est sélectionné.

#### Afficher et filtrer les coûts

Les facettes de recherche sur la gauche de l'interface vous permettent de filtrer les coûts par solution (**Products**). Cliquez sur l'onglet **Over Time** pour afficher l'évolution des coûts cumulés d'un jour à l'autre.

#### Télécharger les données

Pour télécharger les données sous la forme d'un fichier de valeurs séparées par des virgules, cliquez sur **Download as CSV**.

Consultez la rubrique [Récupérer le coût estimé de votre compte][3] pour découvrir comment interroger les données sur les coûts estimés via l'API.

## Rétrofacturations de coût

Les rétrofacturations de coût vous permettent d'accomplir ce qui suit :
- Consulter les coûts estimés depuis le début du mois ainsi que les coûts historiques pour plusieurs organisations
- Attribuer les coûts à chaque sous-organisation

### Rétrofacturations historiques de coût

Depuis une organisation parent, vous pouvez consulter les coûts historiques finaux regroupés par solution et sous-organisation.

{{< img src="account_management/plan_and_usage/historical-cost-chargebacks.png" alt="Capture d'écran du tableau Usage and Cost Summary, avec l'utilisation totale en dollars de quatre sous-organisations ainsi que le coût total." >}}

1. Vérifiez que vous êtes connecté à une organisation parent, puis accédez à [Plan & Usage][2].
1. Sélectionnez l'onglet **Usage**.
1. Cliquez sur **Individual Organizations**.
1. Vérifiez que les options **Billable** et **Cost** sont activées.
1. Le sélecteur de dates vous permet d'afficher un mois pour lequel la facturation a été finalisée.

**Remarque** : les données sont disponibles à la clôture du mois, soit environ 16 jours après le dernier jour du mois.

### Rétrofacturations estimées de coût

Depuis une organisation parent, vous pouvez consulter les coûts estimés regroupés par solution et sous-organisation.

Les données sur les coûts estimés sont disponibles pour le mois en cours. Si les données historiques sur les coûts ne sont pas encore disponibles pour un autre mois, vous avez accès aux données sur les coûts estimés.

{{< img src="account_management/plan_and_usage/estimated-cost-chargebacks.png" alt="Capture d'écran du tableau Usage and Cost Summary, avec l'utilisation totale en dollars de quatre sous-organisations ainsi que le coût total." >}}

1. Vérifiez que vous êtes connecté à une organisation parent, puis accédez à [Plan & Usage][2].
1. Sélectionnez l'onglet **Usage**.
1. Cliquez sur **Individual Organizations**.
1. Vérifiez que les options **Billable** et **Cost** sont activées.
1. Vérifiez que vous avez bien choisi le mois en cours ou un mois précédent à l'aide du sélecteur de dates.

### Télécharger les données

- Pour télécharger les données sur les rétrofacturations historiques ou estimées de coût sous la forme d'un fichier de valeurs séparées par des virgules, cliquez sur **Download as CSV**.
- Consultez la rubrique [Récupérer le coût historique de votre compte][4] pour découvrir comment interroger les données sur les rétrofacturations historiques de coût via l'API.
- Consultez la rubrique [Récupérer le coût estimé de votre compte][3] pour découvrir comment interroger les données sur les rétrofacturations estimées de coût via l'API.

## Incidence des agrégations de facture sur les changements de coût

L'estimation de votre facture Datadog pour le mois en cours varie avec le temps. Le type d'agrégation utilisé pour déterminer la facturation de chaque solution détermine l'incidence sur les coûts. Pour une représentation fidèle, consultez le graphique de la [synthèse des coûts][5]. Pour chaque filtre de solution, la méthode d'agrégation utilisée pour la facturation est indiquée en regard du nom de la solution.

### Facturation pour l'utilisation basée sur la moyenne ou un centile

Lorsque la facturation d'une solution repose sur la valeur maximale du 99e pour cent le plus faible de l'utilisation pour le mois en cours, les hosts APM et d'infrastructure sont inclus. Lorsque la facturation d'une solution repose sur la moyenne mensuelle, les métriques custom et les tâches Fargate sont incluses. Pour ces deux types de solutions, les coûts devraient être relativement stables tout au long du mois. Toutefois, une variation peut survenir en cas de pic ou de chute de l'utilisation.

### Facturation pour l'utilisation basée sur une somme

Lorsque la facturation d'une solution repose sur la somme de l'utilisation tout au long du mois, les logs indexés et ingérés sont inclus. Pour ce type de solution, les coûts devraient augmenter ou diminuer selon l'évolution du volume d'utilisation.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/
[2]: https://app.datadoghq.com/billing/usage
[3]: /fr/api/latest/usage-metering/#get-estimated-cost-across-your-account
[4]: /fr/api/latest/usage-metering/#get-historical-cost-across-your-account
[5]: /fr/account_management/plan_and_usage/cost_details/#cost-summary