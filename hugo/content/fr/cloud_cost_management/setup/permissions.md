---
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Découvrez Cloud Cost Management.
- link: /account_management/rbac/
  tag: Documentation
  text: En savoir plus sur le contrôle d'accès basé sur les rôles
- link: /account_management/rbac/data_access/
  tag: Documentation
  text: En savoir plus sur Data Access Control
title: Permissions
---
## Présentation {#overview}

Les autorisations contrôlent les actions qu'un utilisateur peut effectuer dans Datadog. Les utilisateurs sont affectés à des rôles, et chaque rôle dispose d'un ensemble d'autorisations qui détermine ce que cet utilisateur peut voir et faire.

Cloud Cost Management (CCM) utilise deux autorisations principales, `cloud_cost_management_read` et `cloud_cost_management_write`, pour contrôler l'accès aux données de coût et à la plupart des configurations CCM. Des autorisations supplémentaires au niveau du produit sont disponibles pour des fonctionnalités spécifiques, telles que la modification des budgets (`ccm_budget_write`), la personnalisation des prévisions dans les budgets (`ccm_forecast_write`) et la gestion des plannings de rapports (`generate_ccm_report_schedules`, `manage_ccm_report_schedules`). Attribuez ces autorisations aux rôles via [le contrôle d'accès basé sur les rôles (RBAC)][1].

CCM prend également en charge [Data Access Control](#data-access-control) pour restreindre davantage les données de coût par tags.

## Autorisations disponibles {#available-permissions}

| Autorisation | Description |
|------------|-------------|
| `cloud_cost_management_read` | Accorde un accès en lecture seule pour consulter les données de coût, les budgets, les recommandations et les paramètres sur les pages CCM et les intégrations externes. |
| `cloud_cost_management_write` | Accorde l'accès pour modifier les configurations CCM, y compris le téléchargement de coûts personnalisés et la gestion des comptes cloud. N'accorde pas l'accès pour créer, modifier ou supprimer des budgets ; voir `ccm_budget_write`. |
| `ccm_budget_write` | Accorde l'accès pour créer, mettre à jour et supprimer des budgets Cloud Cost Management, y compris les métadonnées de budget et les montants budgétés par entrée. Nécessite l'autorisation de lecture pour accéder aux pages. |
| `ccm_forecast_write` | Accorde l'accès pour modifier les valeurs de prévision personnalisées sur les budgets Cloud Cost Management. Nécessite l'autorisation de lecture pour accéder aux pages. |
| `generate_ccm_report_schedules` | Accorde l'accès pour consulter tous les plannings de rapports et gérer uniquement ceux que l'utilisateur a créés. |
| `manage_ccm_report_schedules` | Accorde l'accès pour consulter, créer et gérer entièrement tous les plannings de rapports dans l'organisation. |
| `ccm_report_write` | Accorde l'accès pour créer, mettre à jour et supprimer des rapports Cloud Cost Management. Nécessite cloud_cost_management_read pour accéder aux pages. |


## Exigences d'autorisation par page {#permission-requirements-by-page}

Le tableau ci-dessous indique les autorisations requises pour chaque page CCM et les fonctionnalités associées.

| Page/Fonctionnalité | Autorisation de lecture | Autorisation d'écriture |
|-----------------------------------------------|--------------------------------------------------|---------------------------------------------------|
| Page CCM Summary | Requise pour afficher les données de résumé des coûts | N/A |
| Page CCM Containers | Requise pour afficher les données d'allocation des coûts des conteneurs | N/A |
| Page CCM Recommendations | Requise pour afficher les recommandations de coûts | N/A |
| Page CCM Explorer | Requise pour interroger et afficher les données de coûts | N/A |
| Page CCM Plan | Requise pour afficher les budgets | `ccm_budget_write`Requis pour créer, modifier ou supprimer des budgets |
| Page CCM Settings - Custom Costs | Requise pour afficher les paramètres de coûts personnalisés | Requise pour téléverser des coûts personnalisés |
| Page CCM Settings - Tag Pipelines | Requise pour afficher les Tag Pipelines | Requise pour créer des Tag Pipelines |
| Page CCM Settings - SaaS Integrations | Requise pour afficher les paramètres d'intégration SaaS | Requise pour activer l'intégration pour CCM |
| Page CCM Settings - Accounts | Requise pour afficher les comptes cloud | Requise pour modifier ou créer des comptes |
| Page CCM Settings - Configure Recommendations | Requise pour afficher les paramètres de recommandation | Requise pour personnaliser les recommandations |
| Dashboards/Notebooks (externe) | Requise pour créer des widgets et afficher les données de coûts | N/A |
| Monitors (externe) | Requise pour créer des monitors CCM | N/A |
| Service Catalog (externe) | Requise pour afficher les données de coûts | N/A |
| Resource Catalog (externe) | Requise pour afficher les données de coûts | N/A |
| API Queries for Cost Data | Requise pour interroger les données de coûts via l'API | N/A |

## Contrôle d'accès aux données {#data-access-control}

Utilisez [Data Access Control][2] pour restreindre l'accès aux données de coût par des tags spécifiques. Grâce à cette fonctionnalité, vous pouvez limiter la visibilité des équipes aux seuls coûts pertinents pour leurs ressources. Par exemple, restreindre une équipe à ne voir que les coûts marqués avec `team:payments` ou `env:production`.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/
[2]: /fr/account_management/rbac/data_access/