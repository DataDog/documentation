---
description: Explique comment les partenaires Datadog peuvent utiliser la page Plan
  and Usage pour consulter les données de coût et d'utilisation de l'ensemble des
  organisations clientes depuis une organisation d'administration Datadog.
further_reading:
- link: https://docs.datadoghq.com/account_management/plan_and_usage/
  tag: Documentation
  text: Plan & utilisation
- link: https://docs.datadoghq.com/account_management/plan_and_usage/cost_details/
  tag: Documentation
  text: Détails des coûts
- link: https://docs.datadoghq.com/account_management/plan_and_usage/usage_details/
  tag: Documentation
  text: Utilisation détaillée
- link: https://docs.datadoghq.com/api/latest/usage-metering/
  tag: Documentation
  text: Usage Metering API
- link: https://docs.datadoghq.com/account_management/plan_and_usage/partner_experience/customer_pricing/
  tag: Documentation
  text: Tarification client
title: Expérience Plan & utilisation pour les partenaires
---
Les partenaires Datadog voient une version adaptée de la page Plan & utilisation conçue pour la gestion de plusieurs organisations clientes. Cette page décrit l'expérience Plan & utilisation disponible pour les partenaires consultant l'interface utilisateur depuis une **organisation d'administration Datadog**.

## Prérequis {#prerequisites}

Pour accéder à l'expérience partenaire Plan & utilisation, votre organisation doit être une organisation d'administration Datadog, qui est l'organisation de niveau supérieur que Datadog provisionne pour permettre aux partenaires de gérer leurs comptes clients. Si votre organisation a été configurée via le programme partenaire Datadog et que vous gérez des organisations clientes sous celle-ci, vous utilisez une organisation d'administration Datadog. Pour vérifier, assurez-vous que vous disposez de plusieurs contrats avec Datadog et que vous pouvez consulter les données consolidées de coût et d'utilisation pour l'ensemble de ces contrats dans Plan & utilisation.

**Remarque** : si vous êtes un *client* d'un partenaire Datadog (plutôt que le partenaire lui-même), vous bénéficiez de l'expérience standard Plan & utilisation. Selon votre accord tarifaire avec votre partenaire, il est possible que vous ne voyiez que les données d'utilisation et non les données de coût. Consultez [Plan & utilisation][1] pour plus de détails.

Les partenaires doivent disposer du rôle **Datadog Admin**, ou d'un rôle personnalisé avec les autorisations `billing_read` et `usage_read`, pour consulter les données de Plan & utilisation. Il s'agit des mêmes autorisations que celles requises pour les clients directs.

## Présentation {#overview}

Les partenaires accédant à Plan & utilisation depuis leur organisation d'administration Datadog voient les données de coût et d'utilisation de l'ensemble de leurs organisations clientes. Seul l'onglet **Utilisation et coût** est disponible dans la vue partenaire ; les onglets Plan, Historique de facturation et Notifications d'utilisation ne sont pas affichés.

### Détails des coûts {#cost-details}

Consultez les données de coût estimées, historiques et projetées pour toutes les organisations clientes en un seul endroit. Les partenaires peuvent voir un total pour l'ensemble des clients, ou regrouper et filtrer par organisation cliente, produit et compte. Consultez [Détails des coûts][2] pour la documentation complète.

{{< img src="account_management/plan_and_usage/partner-cost-details.png" alt="Page Cost Summary pour une organisation d'administration Datadog affichant les coûts estimés et projetés pour l'ensemble des organisations clientes, avec un graphique de répartition des coûts cumulés et un tableau des coûts par client." >}}

### Détails de l'utilisation {#usage-details}

Affichez les données d'utilisation pour toutes les organisations clientes en un seul endroit. Les partenaires peuvent voir un total pour l'ensemble des clients, ou regrouper et filtrer par organisation cliente, produit et compte. Consultez [Détails de l'utilisation][3] pour la documentation complète.

{{< img src="account_management/plan_and_usage/partner-usage-details-v2.png" alt="Page de résumé de l'utilisation pour une organisation d'administration Datadog affichant les données d'utilisation pour l'ensemble des organisations clientes." >}}

## Fonctionnalités réservées aux partenaires {#partner-only-features}

Les fonctionnalités suivantes sont disponibles uniquement pour les partenaires consultant Plan & Usage depuis une organisation d'administration Datadog.

### Tarification client {#customer-pricing}

Définissez des tarifs spécifiques aux clients afin que vos clients revendeurs puissent voir leurs coûts Datadog estimés dans leur propre organisation. Consultez [Tarification client][12] pour les étapes de configuration.

## Disponibilité des fonctionnalités {#feature-availability}

Le tableau suivant répertorie chaque fonctionnalité de Plan & Usage et sa disponibilité pour les clients directs et les partenaires consultant depuis une organisation d'administration Datadog.

| Fonctionnalité | Clients directs | Partenaires | Notes |
|---|---|---|---|
| Résumé des coûts | {{< X >}} | {{< X >}} |  |
| Coûts projetés | {{< X >}} | {{< X >}} |  |
| Résumé de l'utilisation | {{< X >}} | {{< X >}} |  |
| Endpoints de l'API Cost & usage | {{< X >}} | {{< X >}} | Consultez [Endpoints d'API pris en charge](#supported-api-endpoints) pour la liste complète |
| [Tarification client][12] | | {{< X >}} | Réservé aux partenaires. Permet la visibilité des coûts pour les clients revendeurs |
| Attribution des coûts | {{< X >}} |  | Les organisations clientes individuelles peuvent accéder à l'attribution des coûts depuis leur propre page [Plan & Usage][1] |
| Attribution de l'utilisation | {{< X >}} |  | Les organisations clientes individuelles peuvent accéder à l'attribution de l'utilisation depuis leur propre page [Plan & Usage][1] |
| Tableaux d'utilisation spécifiques aux produits (par exemple, métriques personnalisées, utilisation des logs par index) | {{< X >}} |  | Les organisations clientes individuelles peuvent consulter ces tableaux depuis leur propre page [Usage Details][3] |
| Coûts Datadog dans Cloud Cost Management | {{< X >}} |  | Les organisations clientes individuelles peuvent accéder aux [Coûts Datadog](/cloud_cost_management/datadog_costs/) depuis leur propre page Cloud Cost Management |
| Onglets Plan et Historique de facturation | {{< X >}} Les organisations clientes individuelles peuvent accéder aux onglets Plan et Historique de facturation depuis leur propre page [Plan & utilisation][1].
| [Aperçu de la facture][4] | {{< X >}} Non disponible au niveau de l'organisation d'administration Datadog.
| Onglet Notifications d'utilisation | {{< X >}} Les organisations clientes individuelles peuvent configurer les notifications d'utilisation depuis leur propre page [Plan & utilisation][1].

## Endpoints d'API pris en charge {#supported-api-endpoints}

Les partenaires peuvent également accéder aux données de coût et d'utilisation par programmation via les endpoints [Usage Metering API][5] suivants :

| Endpoint                                     | Description                                              |
|----------------------------------------------|----------------------------------------------------------|
| [Obtenir le coût estimé de votre compte][6]  | Récupérer les données de coût estimé pour le mois en cours       |
| [Obtenir l'utilisation facturable de votre compte][7]  | Récupérer les résumés de l'utilisation facturable&nbsp;:                        |
| [Obtenir l'utilisation horaire par famille de produits][8]      | Récupérer les données d'utilisation horaire ventilées par famille de produits&nbsp;: |
| [Obtenir le coût historique de votre compte][9] | Récupérer les données de coût historique pour les mois précédents&nbsp;:        |
| [Obtenir le coût projeté de votre compte][10] | Récupérer les données de coût projeté de fin de mois&nbsp;:                |
| [Obtenir l'utilisation de votre compte][11]          | Récupérer les données de résumé d'utilisation de votre compte&nbsp;:          |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/plan_and_usage/
[2]: /fr/account_management/plan_and_usage/cost_details/
[3]: /fr/account_management/plan_and_usage/usage_details/
[4]: /fr/account_management/plan_and_usage/bill_overview/
[5]: /fr/api/latest/usage-metering/
[6]: /fr/api/latest/usage-metering/#get-estimated-cost-across-your-account
[7]: /fr/api/latest/usage-metering/#get-billable-usage-across-your-account
[8]: /fr/api/latest/usage-metering/#get-hourly-usage-by-product-family
[9]: /fr/api/latest/usage-metering/#get-historical-cost-across-your-account
[10]: /fr/api/latest/usage-metering/#get-projected-cost-across-your-account
[11]: /fr/api/latest/usage-metering/#get-usage-across-your-account
[12]: /fr/account_management/plan_and_usage/partner_experience/customer_pricing/