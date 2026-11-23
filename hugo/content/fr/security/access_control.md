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
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
title: Access Control
---
{{< product-availability >}}

## Présentation {#overview}

Le système de gestion des accès de Datadog utilise un contrôle d'accès basé sur les rôles, vous permettant de définir le niveau d'accès des utilisateurs aux ressources Datadog. Les utilisateurs sont affectés à des rôles qui définissent leurs autorisations de compte, notamment les données qu'ils peuvent lire et les ressources de compte qu'ils peuvent modifier. Lorsque des autorisations sont accordées à un rôle, tout utilisateur associé à ce rôle reçoit ces autorisations. Consultez la documentation [Account Management Access Control][1] pour plus d'informations.

Pour les produits Datadog Security, un [contrôle d'accès granulaire][3] est disponible pour les [règles de détection](#restrict-access-to-detection-rules), les [suppressions](#restrict-access-to-suppression-rules) et les [règles de sévérité dynamique](#restrict-access-to-dynamic-severity-rules), vous permettant de restreindre l'accès par équipes, rôles ou comptes de service.

Pour restreindre l'accès aux données de sécurité elles-mêmes, utilisez [Data Access Control](#restrict-access-to-security-data).

## Autorisations {#permissions}

Consultez la [liste des autorisations][2] pour les produits de sécurité.

## Restreindre l'accès aux règles de détection {#restrict-access-to-detection-rules}

{{< product-availability names="Cloud SIEM,Workload Protection,App and API Protection,Cloud Security" >}}

{{% security-products/detection-rules-granular-access %}}

## Restreindre l'accès aux règles de suppression {#restrict-access-to-suppression-rules}

{{< product-availability names="Cloud SIEM,Workload Protection,App and API Protection" >}}

{{% security-products/suppressions-granular-access %}}

## Restreindre l'accès aux règles de sévérité dynamique {#restrict-access-to-dynamic-severity-rules}

{{< product-availability names="Cloud SIEM,Workload Protection,App and API Protection" >}}

{{% security-products/dynamic-severity-granular-access %}}

## Restreindre l'accès aux données de sécurité {#restrict-access-to-security-data}

{{< product-availability names="Cloud SIEM,Workload Protection,App and API Protection,Cloud Security,Code Security" >}}

Utilisez [Data Access Control][4] pour restreindre les données de sécurité qu'un utilisateur peut consulter, en fonction des tags et des attributs présents dans les données. Définissez un [Restricted Dataset][8] avec une requête, puis accordez l'accès à des équipes ou des rôles spécifiques. Trois options de sécurité sont disponibles lors de la création d'un Restricted Dataset :

- **Security Signals** : signaux Cloud SIEM et Workload Protection
- **Workload Protection Agent Events**
- **Security Findings** (en Preview, disponible sur demande) : résultats de Cloud Security, Code Security, Workload Protection et App and API Protection

Les données de sécurité qui ne sont incluses dans aucun Restricted Dataset restent visibles par tous les utilisateurs disposant des autorisations appropriées, sauf si vous les marquez comme [Restricted][5].

### Restreindre les résultats selon l'équipe propriétaire {#restrict-findings-by-team-ownership}

{{< product-availability names="Workload Protection,App and API Protection,Cloud Security,Code Security" >}}

{{< callout btn_hidden="true" >}}
Le contrôle d'accès basé sur l'équipe propriétaire est en Preview et disponible sur demande.
{{< /callout >}}

Le contrôle d'accès basé sur l'équipe propriétaire restreint l'accès aux résultats de sécurité en fonction de l'appartenance des utilisateurs aux équipes et nécessite moins de configuration que les Restricted Datasets. Chaque utilisateur voit les résultats appartenant aux [équipes][6] dont il fait partie, sans nécessiter de jeu de données distinct pour chaque groupe de résultats.

Le contrôle d'accès basé sur l'équipe propriétaire est disponible pour les Security Findings, qui couvrent les résultats de Cloud Security, Code Security, Workload Protection et App and API Protection. Datadog détermine l'équipe propriétaire à partir du tag `team`. Les résultats sans ce tag ne sont visibles que par les équipes et les rôles disposant d'un [accès non restreint][7].

[1]: /fr/account_management/rbac/#role-based-access-control
[2]: /fr/account_management/rbac/permissions/#cloud-security-platform
[3]: /fr/account_management/rbac/granular_access/
[4]: /fr/account_management/rbac/data_access/
[5]: /fr/account_management/rbac/data_access/#strict-mode
[6]: /fr/account_management/teams/
[7]: /fr/account_management/rbac/data_access/#unrestricted-user-groups
[8]: /fr/account_management/rbac/data_access/#configure-data-access