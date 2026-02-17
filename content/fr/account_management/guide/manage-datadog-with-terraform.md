---
description: Utilisez Terraform pour gérer votre organisation Datadog, vos utilisateurs,
  rôles, équipes, identifiants et comptes de service via l'infrastructure as code.
further_reading:
- link: /account_management/plan_and_usage/
  tag: Documentation
  text: Paramètres de formule et d'utilisation
- link: https://www.datadoghq.com/blog/datadog-teams/
  tag: Blog
  text: Rationaliser la collaboration dans toute votre organisation avec Datadog Teams
title: Gérer Datadog avec Terraform
---

## Présentation

Vous pouvez utiliser [Terraform][28] pour interagir avec l'API Datadog et gérer votre organisation Datadog, les organisations enfants, les utilisateurs, les identifiants, les autorisations et plus encore. Ce guide fournit des exemples de cas d'utilisation pour la gestion de Datadog avec Terraform, avec des liens vers les ressources et sources de données Datadog les plus couramment utilisées dans le registre Terraform.

Vous pouvez également [importer][29] vos ressources existantes dans votre configuration Terraform pour une gestion future via Terraform, et référencer les ressources existantes en tant que [sources de données][30] Terraform.

## Configuration

Si ce n'est pas déjà fait, configurez le [fournisseur Terraform Datadog][8] pour interagir avec les API Datadog en votre nom.

## Utilisateurs, rôles, équipes et comptes de service

Les ressources et sources de données suivantes vous permettent d'appliquer le principe de moindre privilège en matière de sécurité, en accordant uniquement les privilèges nécessaires aux activités essentielles des utilisateurs, équipes et comptes de service opérant dans vos organisations Datadog.

### Utilisateurs

Créez les [utilisateurs][10] de votre compte et attribuez-leur l'un des rôles par défaut ou [rôles personnalisés][9] disponibles. Vous pouvez également utiliser la ressource [AuthN mapping][20] pour attribuer automatiquement des rôles aux utilisateurs en fonction de leurs attributs SAML. Vous pouvez aussi importer vos utilisateurs, rôles et mappages AuthN existants dans votre configuration Terraform.

La [source de données utilisateur][21] peut être utilisée pour récupérer des informations sur les utilisateurs existants dans votre configuration Terraform afin de les utiliser dans d'autres ressources, comme la ressource d'appartenance à une équipe Datadog.

### Roles

Datadog fournit trois rôles gérés pour les autorisations utilisateur, mais vous pouvez également utiliser la [ressource de rôle][18] pour créer et gérer des rôles personnalisés.

La [source de données rôle][22] peut être utilisée pour récupérer des informations sur les rôles existants afin de les utiliser dans d'autres ressources, comme la ressource utilisateur Datadog.

### Équipes

Utilisez la ressource [Datadog Team][11] pour associer des ressources spécifiques à un groupe d'utilisateurs et filtrer leur expérience Datadog afin de donner la priorité à ces ressources. Gérez l'appartenance aux équipes avec la ressource [team membership][12], et contrôlez qui peut gérer l'équipe avec la ressource [team permission setting][17].

Les [sources de données team][23] et [team memberships][24] peuvent être utilisées pour récupérer respectivement des informations sur les équipes existantes et sur les appartenances aux équipes, afin de les utiliser dans d'autres ressources.

Consultez la [page Teams][13] pour plus d'informations.

### Service accounts

La [ressource service account][14] fournit un compte non interactif qui peut être utilisé pour posséder des [clés d'application de compte de service][15] et d'autres ressources partagées entre vos équipes.

La [source de données service account][25] peut être utilisée pour récupérer des informations sur les comptes de service existants afin de les utiliser dans d'autres ressources.

Consultez la section [Comptes de service][16] pour plus d'informations.

## Identifiants

### Clés d'API et d'application

Les [clés d'API][6] permettent de soumettre des données à votre compte Datadog, et les [clés d'application][7] permettent de créer des ressources dans votre compte Datadog. Vous pouvez également importer vos identifiants existants.

Les [sources de données clé d'API][26] et [clé d'application][27] peuvent être utilisées pour récupérer des informations sur les identifiants existants déjà gérés avec Terraform.

## Organisations

Les ressources au niveau de l'organisation permettent de gérer les paramètres de l'organisation aussi bien pour les environnements à compte unique que multi-comptes.

### Paramètres d'organisation

Configurer l'accès aux comptes et les capacités de partage de widgets pour n'importe lequel de vos comptes avec la ressource [organization settings][4]. Par exemple, vous pouvez gérer les endpoints IdP, les URL de connexion, et déterminer si le mode strict SAML est activé ou non. Consultez la section [Authentification unique avec SAML][5] pour plus d'informations.

Vous pouvez également importer vos paramètres d'organisation existants dans votre configuration Terraform.

### Organisations enfant

<div class="alert alert-info">La fonctionnalité Multi-organization Account n'est pas activée par défaut. Contactez <a href="https://docs.datadoghq.com/help/" target="_blank">l'assistance Datadog</a> pour l'activer.</div>

Si vous devez maintenir des environnements distincts et isolés, vous pouvez créer des [organisations enfants][1] sous une organisation parent principale. Depuis le compte parent, vous pouvez suivre l'utilisation de tous les sous-comptes associés, et les utilisateurs ayant accès à plusieurs organisations peuvent basculer entre elles en un seul clic.

Consultez [Gestion des comptes multi-organisations][3] pour plus d'informations.

**Remarque** : les organisations enfants n'héritent pas des configurations SAML de l'organisation parent.

## Politiques de restriction

Les politiques de restriction sont associées à une **ressource** spécifique et définissent le niveau d'accès accordé aux rôles, équipes ou utilisateurs. Utilisez la ressource [restriction policy][19] pour créer et gérer vos politiques de restriction, ou importez vos politiques existantes dans votre configuration Terraform.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/child_organization
[2]: /fr/help/
[3]: /fr/account_management/multi_organization/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/organization_settings
[5]: /fr/account_management/saml/
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/api_key
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/application_key
[8]: /fr/integrations/terraform/
[9]: /fr/account_management/rbac/?tab=datadogapplication#custom-roles
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/user
[11]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team
[12]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team_membership
[13]: /fr/account_management/teams/
[14]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_account
[15]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_account_application_key
[16]: /fr/account_management/org_settings/service_accounts
[17]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team_permission_setting
[18]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/role
[19]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/restriction_policy
[20]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/authn_mapping
[21]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/user
[22]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/role
[23]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/team
[24]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/team_memberships
[25]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/service_account
[26]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/api_key
[27]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/application_key
[28]: https://www.terraform.io/
[29]: https://developer.hashicorp.com/terraform/cli/import
[30]: https://developer.hashicorp.com/terraform/language/data-sources