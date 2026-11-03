---
cascade:
  algolia:
    subcategory: Multi-Tenant Usage Metering and Billing
description: Gérez de manière centralisée l'utilisation, les coûts et la facturation
  des clients finaux via une organisation d'administration.
title: Mesure et facturation de l'utilisation multi-locataire
---
## Présentation {#overview}

En tant que fournisseur de solutions Datadog, vous pouvez utiliser une **organisation d'administration partenaire** (Admin Org) pour afficher et surveiller les coûts et l'utilisation au sein des organisations clientes, provisionner des organisations d'essai et consulter la facturation de l'ensemble de la clientèle. Une organisation d'administration est distincte de toute organisation cliente et appartient à Datadog ; les partenaires y sont invités avec un rôle de partenaire.

<div class="alert alert-info">Par défaut, une organisation d'administration accorde un accès en lecture seule aux données de coût et d'utilisation des organisations clientes connectées, et l'utilisation personnelle ou interne de Datadog sur l'organisation d'administration n'est pas prise en charge. La fonctionnalité de prévisualisation ci-dessous ajoute des workflows de tarification pris en charge.</div>

Une organisation cliente est connectée automatiquement à une organisation d'administration lorsque son contrat Datadog inclut le partenariat et est actif. Après la connexion, les données d'utilisation et de coût d'un client sont visibles depuis l'organisation d'administration, sur tous les sites Datadog (par exemple, AP1, EU1, US1, US3, US5), à l'exception des sites GovCloud, qui nécessitent leur propre organisation d'administration pour des raisons réglementaires.

{{< img src="partners/multi_tenant_billing/admin_org_hierarchy.png" alt="Une organisation d'administration connectée à plusieurs organisations clientes." style="width:100%;" >}}

Consultez [Intégration d'un nouveau client][15] pour savoir comment ces éléments s'intègrent dans le parcours, d'une opportunité enregistrée à une organisation cliente connectée.

## Demander une organisation d'administration {#requesting-an-admin-org}

Avant de demander une organisation d'administration, le partenaire doit :

- Être inscrit auprès de Datadog sur le [portail des partenaires Datadog][1].
- Avoir signé l'accord pour effectuer des transactions avec Datadog en tant que fournisseur de solutions.
- Être approuvé en tant que partenaire Datadog.

Les partenaires non encore inscrits peuvent [s'inscrire maintenant][17] sur le portail des partenaires Datadog.

{{< img src="partners/multi_tenant_billing/partner_portal_registration.png" alt="Page d'inscription au portail des partenaires Datadog." style="width:100%;" >}}

Les partenaires inscrits peuvent demander une organisation d'administration en contactant [partner-support@datadoghq.com][16]. Indiquez dans la demande si le partenaire a également besoin de la fonctionnalité de provisionnement d'organisation d'essai, pour la création en libre-service d'organisations d'essai.

## Mise en route {#getting-started}

{{< whatsnext desc="Pour commencer à utiliser une organisation d'administration, consultez la documentation suivante.">}}
  {{< nextlink href="/partners/multi_tenant_billing/customer-onboarding">}}<u>Intégration d'un nouveau client</u> : Faites passer un client potentiel d'une opportunité enregistrée à une organisation cliente connectée.{{< /nextlink >}}
  {{< nextlink href="/partners/multi_tenant_billing/trial-org-provisioning">}}<u>Provisionnement d'organisation d'essai</u> : Provisionnez des organisations d'essai pour des clients potentiels directement depuis une organisation d'administration.{{< /nextlink >}}
  {{< nextlink href="/partners/multi_tenant_billing/troubleshooting">}}<u>Dépannage</u> : Résolvez les problèmes courants liés au provisionnement des organisations d'administration et d'essai.{{< /nextlink >}}
{{< /whatsnext >}}

## Cas d'utilisation {#use-cases}

Voici quelques moyens par lesquels une organisation d'administration peut vous aider :

| Cas d'utilisation | Capacité |
|---|---|
| Création en libre-service d'organisations d'essai pour les clients potentiels. | [Provisionnement d'organisation d'essai][3] : Créez des organisations d'essai directement depuis une organisation d'administration. |
| Surveillez les coûts et l'utilisation pour tous les clients en un seul endroit. | [Visibilité des coûts et de l'utilisation][2] : Affichez les données estimées, historiques et projetées des coûts et de l'utilisation facturable. |
| Suivez les métriques d'utilisation pour l'ensemble du portefeuille d'affaires. | [Métriques d'utilisation centralisées][8] : Consolidez les métriques d'utilisation des clients dans une organisation d'administration. |
| Permettez aux clients de voir leurs coûts estimés en fonction de la tarification du partenaire. | [Tarification client][9] : Configurez la tarification par client. |
| Gérez le portefeuille d'affaires en un seul endroit. | [Contrats clients][10] : Suivez les clients, les contrats, les factures et les renouvellements. |

## Dépannage {#troubleshooting}

Pour obtenir de l'aide sur les problèmes courants liés aux organisations d'administration et d'essai, consultez [Dépannage][7].

[1]: https://partners.datadoghq.com
[2]: /fr/partners/multi_tenant_billing/cost-and-usage-visibility/
[3]: /fr/partners/multi_tenant_billing/trial-org-provisioning/
[7]: /fr/partners/multi_tenant_billing/troubleshooting/
[8]: /fr/partners/multi_tenant_billing/centralized-usage-metrics/
[15]: /fr/partners/multi_tenant_billing/customer-onboarding/
[16]: mailto:partner-support@datadoghq.com
[17]: https://partners.datadoghq.com/s/login/
[9]: /fr/account_management/plan_and_usage/partner_experience/customer_pricing/
[10]: /fr/account_management/plan_and_usage/partner_experience/customer_contracts/