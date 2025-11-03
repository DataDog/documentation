---
title: OAuth Apps
further_reading:
  - link: /account_management/org_settings/
    tag: Documentation
    text: En savoir plus sur les paramètres de votre organisation
---
## Présentation

Utilisez la page **OAuth Apps** des [paramètres d'organisation][1] pour gérer les applications OAuth de votre organisation et gagner en visibilité sur celles-ci. Vous pouvez notamment consulter les contextes et autorisations dont bénéficie une application, ainsi que les utilisateurs autorisés à y accéder.

{{< img src="account_management/oauth_apps/org-management-page.png" alt="Page de gestion OAuth Apps dans Datadog" style="width:100%;">}}

## Configuration
### Autorisations

Par défaut, tous les utilisateurs disposant des rôles [Standard et Admin Datadog][2] peuvent accéder à la page de gestion OAuth Apps. Si votre organisation a défini des [rôles personnalisés][3], ajoutez des utilisateurs à n'importe quel rôle disposant des autorisations `org_authorized_apps_read` et `org_authorized_apps_write` pour qu'ils puissent accéder à la page.

Seuls les utilisateurs avec le rôle Admin Datadog ou l'autorisation `org_authorized_apps_write` peuvent gérer les applications OAuth sur cette page. Ils ont par exemple la possibilité de désactiver des applications ou de révoquer l'accès OAuth d'un certain utilisateur.

### Section Enable

Lorsqu'une application OAuth est activée, les utilisateurs disposant des autorisations nécessaires peuvent autoriser son accès en leur nom. Les applications OAuth comprennent par exemple l'application mobile Datadog ainsi que vos [applications Datadog][4] personnalisées dotées d'un [accès à l'API OAuth][5].

### Section Disable

Lorsque OAuth est désactivé pour une application, plus aucun utilisateur de votre organisation ne peut y accéder. Bien que l'application reste installée, les utilisateurs ne peuvent plus l'utiliser. Une erreur s'affiche lorsqu'ils essaient de l'autoriser.

Il existe deux façons de désactiver une application depuis la page OAuth Apps :
1. Passez votre curseur sur l'application dans le tableau pour afficher le bouton **Disable** sur la droite de la ligne.
{{< img src="account_management/oauth_apps/disable-app-table.png" alt="Bouton Disable dans le tableau des applications" style="width:100%;">}}

2. Cliquez sur l'application pour ouvrir la vue détaillée, puis sur le bouton **Disable Application**.
{{< img src="account_management/oauth_apps/disable-app-detailed.png" alt="Bouton Disable Application dans la vue détaillée de l'application" style="width:100%;">}}

**Remarque** : si l'application est réactivée, les utilisateurs qui pouvaient au préalable accéder à l'application doivent autoriser à nouveau l'application pour pouvoir l'utiliser.

### Révoquer un accès

Lorsque vous révoquez l'accès OAuth d'un utilisateur à une application, il ne peut plus l'utiliser. S'il dispose des autorisations requises pour autoriser l'application, il peut l'autoriser pour pouvoir y accéder de nouveau.
{{< img src="account_management/oauth_apps/revoke-user.png" alt="Bouton Disable Application dans la vue détaillée des applications" style="width:100%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/
[2]: /fr/account_management/rbac/permissions/#general-permissions
[3]: /fr/account_management/rbac/?tab=datadogapplication#custom-role
[4]: /fr/developers/datadog_apps/
[5]: /fr/developers/datadog_apps/#oauth-api-access