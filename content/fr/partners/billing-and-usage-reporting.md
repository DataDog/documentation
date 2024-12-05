---
description: Surveillez l'utilisation de la plateforme Datadog par vos différents
  clients et l'utilisation globale avec un compte multi-organisations.
private: true
title: Données d'utilisation et de facturation
---

Lisez cet article pour découvrir comment surveiller l'utilisation de la plateforme Datadog par vos différents clients et l'utilisation globale avec votre compte multi-organisations.

Si vous disposez du [rôle admin][1] Datadog dans l'organisation parent, vous pouvez consulter l'utilisation totale et l'utilisation facturée de toutes vos organisations (parent et enfant) ainsi que l'évolution de l'utilisation de vos clients au cours des six derniers mois. Pour en savoir plus, consultez la section [Utilisation pour plusieurs organisations][2].

L'utilisation est calculée pour l'ensemble des organisations enfant et facturée au niveau de l'organisation parent. Depuis l'organisation parent, les utilisateurs disposant du rôle admin peuvent consulter l'utilisation globale de toutes les organisations enfant et analyser l'utilisation d'une organisation enfant spécifique.

Si les rôles existants ne sont pas assez flexibles pour vous ou votre organisation client, vous pouvez créer de nouveaux rôles personnalisés. Lorsqu'ils sont combinés aux autorisations générales, les rôles personnalisés permettent de définir des autorisations plus granulaires pour des ressources ou des types de données spécifiques. La liste des autorisations spécifiques aux ressources de facturation et d'utilisation est disponible dans la section [Contrôle d'accès à base de rôles (RBAC)][3].

En plus des données d'utilisation, voici quelques ressources supplémentaires que vous pouvez utiliser pour estimer et gérer l'utilisation de vos clients, mais aussi pour simplifier l'attribution des ressources et la rétrofacturation :
- [Métriques d'estimation de l'utilisation][4] : Datadog calcule l'utilisation estimée actuelle de vos clients en temps quasi-réel. Les métriques d'estimation de l'utilisation vous permettent de créer des graphiques représentant l'utilisation estimée, de créer des monitors ou des alertes en fonction des seuils d'utilisation de votre choix, et d'être instantanément prévenu en cas de hausse ou de baisse soudaine de votre utilisation.
- [Dashboards partagés][5] : les dashboards et les graphiques partagés vous permettent d'afficher des visualisations de métrique, de trace et de log en dehors de Datadog. Publiez des dashboards représentant les métriques d'estimation de l'utilisation pour que vos clients puissent suivre ces données.
- [Attribution de l'utilisation][6] :
  - Énumère les différentes clés de tag utilisées pour répartir l'utilisation et permet d'ajouter ou de modifier de nouvelles clés.
  - Génère des fichiers .tsv (valeurs séparées par des tabulations) quotidiens pour la plupart des types d'utilisation.
  - Affiche un résumé de l'utilisation à la fin de chaque mois pour chaque organisation enfant et pour chaque tag.
  Notez que l'attribution de l'utilisation est une fonction avancée incluse dans la formule Enterprise. Si vous utilisez une autre formule, contactez votre chargé de compte pour demander l'activation de cette fonctionnalité.

[1]: /fr/account_management/rbac/
[2]: /fr/account_management/multi_organization/#multi-org-usage
[3]: /fr/account_management/rbac/permissions/?tab=ui#billing-and-usage
[4]: /fr/account_management/billing/usage_metrics/
[5]: /fr/dashboards/sharing/
[6]: /fr/account_management/billing/usage_attribution/