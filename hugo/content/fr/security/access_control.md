---
disable_toc: false
further_reading:
- link: logs/processing/pipelines
  tag: Documentation
  text: Pipelines de traitement de logs
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Workload Protection
  url: /security/workload_protection/
- icon: app-sec
  name: Protection des applications et des API
  url: /security/application_security/
title: Access Control
---
{{< product-availability >}}

## Présentation {#overview}

Le système de gestion des accès de Datadog utilise un contrôle d'accès basé sur les rôles, vous permettant de définir le niveau d'accès des utilisateurs aux ressources Datadog. Les utilisateurs sont affectés à des rôles qui définissent leurs autorisations de compte, notamment les données qu'ils peuvent lire et les ressources de compte qu'ils peuvent modifier. Lorsque des autorisations sont accordées à un rôle, tout utilisateur associé à ce rôle reçoit ces autorisations. Consultez la documentation [Account Management Access Control][1] pour plus d'informations.

Pour les produits Datadog Security, un [contrôle d'accès granulaire][3] est disponible pour les [règles de détection](#restrict-access-to-detection-rules), les [suppressions](#restrict-access-to-suppression-rules) et les [règles de sévérité dynamique](#restrict-access-to-dynamic-severity-rules), vous permettant de restreindre l'accès par équipes, rôles ou comptes de service.

## Autorisations {#permissions}

Consultez la [liste des autorisations][2] pour les produits de sécurité.

## Restreindre l'accès aux règles de détection {#restrict-access-to-detection-rules}

{{% security-products/detection-rules-granular-access %}}

## Restreindre l'accès aux règles de suppression {#restrict-access-to-suppression-rules}

{{% security-products/suppressions-granular-access %}}

## Restreindre l'accès aux règles de sévérité dynamique {#restrict-access-to-dynamic-severity-rules}

{{% security-products/dynamic-severity-granular-access %}}

[1]: /fr/account_management/rbac/#role-based-access-control
[2]: /fr/account_management/rbac/permissions/#cloud-security-platform
[3]: /fr/account_management/rbac/granular_access/