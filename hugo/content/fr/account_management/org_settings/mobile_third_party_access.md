---
aliases:
- /fr/account_management/org_settings/oauth_apps/
description: Gérez et surveillez les applications OAuth de votre organisation, y compris
  les autorisations, la gestion du périmètre des applications, l'accès des utilisateurs
  et les contrôles de statut des applications.
further_reading:
- link: /account_management/org_settings/
  tag: Documentation
  text: En savoir plus sur les paramètres de votre organisation
- link: /account_management/rbac/permissions/
  tag: Documentation
  text: Autorisations des rôles Datadog
title: Accès mobile et tiers
---
## Présentation {#overview}

Utilisez la page {{< ui >}}Mobile and Third-Party Access{{< /ui >}} sous [Organization Settings][1] pour gérer et obtenir une visibilité sur les applications OAuth de votre organisation, telles que les périmètres et les autorisations accordées à une application ainsi que les utilisateurs qui ont autorisé son accès.

{{< img src="account_management/mobile_third_party_access/org-management-page.png" alt="Page de gestion de l'accès mobile et tiers dans Datadog" style="width:100%;">}}

## Configuration {#setup}
### Autorisations{#permissions}

Par défaut, les utilisateurs disposant du [rôle Datadog Admin][2] peuvent accéder à la page Accès mobile et tiers. Si votre organisation a défini des [rôles personnalisés][3], ajoutez votre utilisateur à tout rôle personnalisé disposant des autorisations `org_authorized_apps_read` et `org_authorized_apps_write`.

Seuls les utilisateurs disposant du rôle Datadog Admin ou des autorisations `org_authorized_apps_read` et `org_authorized_apps_write` peuvent gérer les applications OAuth sur cette page, par exemple pour désactiver des applications ou révoquer l'accès OAuth d'un utilisateur.

### Activer {#enable}

Les applications OAuth activées permettent aux utilisateurs disposant des autorisations nécessaires d'autoriser l'accès en leur nom. Les applications OAuth incluent l'application mobile Datadog.

### Désactiver {#disable}

La désactivation de l'accès OAuth pour une application révoque l'accès à cette application pour tous les utilisateurs de votre organisation. Bien que l'application reste installée, les utilisateurs ne peuvent plus l'utiliser et reçoivent un message d'erreur s'ils tentent de l'autoriser.

Pour désactiver une application depuis la Mobile and Third-Party Access page :
1. Survolez votre application dans le tableau des applications pour faire apparaître le bouton {{< ui >}}Disable{{< /ui >}} sur le côté droit de la ligne.
{{< img src="account_management/mobile_third_party_access/disable-app-table.png" alt="Tableau des applications affichant le bouton Désactiver au survol" style="width:100%;">}}

2. Cliquez sur votre application pour ouvrir la vue détaillée de l'application, puis cliquez sur le bouton {{< ui >}}Disable Application{{< /ui >}}.
{{< img src="account_management/mobile_third_party_access/app-detail-scopes.png" alt="Vue détaillée de l'application affichant les périmètres et le bouton Désactiver l'application" style="width:100%;">}}

**Remarque** : lors de la réactivation, les utilisateurs ayant précédemment autorisé l'application doivent la réautoriser pour retrouver l'accès.

### Révoquer l'accès {#revoke-access}

La révocation de l'accès OAuth d'un utilisateur à une application supprime tout accès à cette application. Si l'utilisateur dispose des autorisations requises pour autoriser l'application, il peut retrouver l'accès en la réautorisant.

{{< img src="account_management/mobile_third_party_access/revoke-user.png" alt="Vue détaillée de l'application montrant l'onglet Utilisateurs avec l'option permettant de révoquer l'accès d'un utilisateur" style="width:100%;">}}

### Application Scope Management {#application-scope-management}

Activez Application Scope Management pour modifier les périmètres autorisés pour une application.

L'ajout ou la suppression d'un périmètre affecte l'accès à l'application pour tous les utilisateurs de votre organisation. La désactivation d'un périmètre révoque les autorisations existantes qui incluent ce périmètre. Les utilisateurs concernés doivent réautoriser l'application pour retrouver l'accès avec les périmètres autorisés restants. L'activation d'un périmètre ne l'ajoute pas aux autorisations existantes. Les utilisateurs doivent réautoriser l'application pour accorder le périmètre nouvellement autorisée.

Utilisez {{< ui >}}Automatically allow new scopes{{< /ui >}} pour choisir la manière dont Datadog gère les périmètres que l'application commence à demander après que vous avez enregistré la configuration :

- Lorsque cette option est sélectionnée, Datadog autorise automatiquement les nouveaux périmètres demandés. Les périmètres que vous désactivez explicitement restent bloqués.
- Lorsque cette option est désactivée, Datadog bloque les nouveaux périmètres demandés jusqu'à ce qu'un administrateur les autorise.

Pour l'application mobile Datadog, les périmètres requis sont toujours autorisés et ne peuvent pas être désactivés.

1. Sur la page {{< ui >}}Mobile and Third-Party Access{{< /ui >}}, cliquez sur une application pour ouvrir sa vue détaillée :

2. Sélectionnez l'onglet {{< ui >}}Scopes{{< /ui >}} et utilisez la case à cocher {{< ui >}}Allowed{{< /ui >}} pour chaque périmètre afin de contrôler si vous accordez ce périmètre à l'application.

3. Cochez ou décochez {{< ui >}}Automatically allow new scopes{{< /ui >}} pour choisir si Datadog autorise automatiquement les nouveaux périmètres que l'application demande après votre enregistrement.

4. Cliquez sur {{< ui >}}Enable{{< /ui >}} ou {{< ui >}}Save{{< /ui >}} pour enregistrer la configuration des périmètres.

{{< img src="account_management/mobile_third_party_access/scope-restrictions-enable-2.png" alt="Vue de l'Application Scope Management montrant l'autorisation automatique des nouveaux périmètres et les contrôles des périmètres autorisés." style="width:100%;">}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/
[2]: /fr/account_management/rbac/permissions/#general-permissions
[3]: /fr/account_management/rbac/?tab=datadogapplication#custom-role