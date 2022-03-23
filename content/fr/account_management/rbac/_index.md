---
title: Contrôle d'accès à base de rôles (RBAC)
kind: documentation
aliases:
  - /fr/guides/rbac
  - /fr/account_management/rbac/role_api
  - /fr/account_management/users/default_roles
  - /fr/account_management/users/custom_roles
  - /fr/account_management/rbac/log_management
further_reading:
  - link: /api/v2/roles/
    tag: Documentation
    text: Gérer les rôles et les autorisations avec l’API Roles
  - link: /api/v2/roles/#enumerer-les-autorisations
    tag: Documentation
    text: Gérer vos autorisations avec l'API Permission
  - link: /account_management/rbac/permissions
    tag: Documentation
    text: Découvrir la liste des autorisations disponibles
  - link: /account_management/saml/
    tag: Documentation
    text: Activer l'authentification unique avec SAML
---
Les rôles permettent de classifier les utilisateurs et de définir les autorisations d'accès qu'ils possèdent. Vous pouvez ainsi choisir le type de données qu'ils peuvent lire ou encore le type de ressources de compte qu'ils peuvent modifier. Par défaut, Datadog propose trois rôles. Vous pouvez cependant créer des [rôles personnalisés](#rôles-personnalisés) afin de vous assurer que vos utilisateurs possèdent le bon niveau d'autorisation.

Lorsque vous attribuez des autorisations à un rôle, tous les utilisateurs associés à ce rôle bénéficient de ces autorisations. Lorsque les utilisateurs sont associés à plusieurs rôles, ils bénéficient de l'ensemble des autorisations correspondant à chacun de ces rôles. Plus un utilisateur dispose de rôles, plus il peut accéder aux différentes fonctionnalités d'un compte Datadog.

  **Remarque** : si vous avez recours à un fournisseur d'identité SAML, vous pouvez l'intégrer à Datadog à des fins d'authentification, et vous pouvez mapper des attributs d'identité à des rôles par défaut et personnalisés de Datadog. Consultez [Authentification unique avec SAML][1] pour en savoir plus.

## Rôles Datadog par défaut

Rôle Admin Datadog
: Utilisateurs ayant accès aux informations de facturation, autorisés à révoquer des clés API et capables de gérer des utilisateurs et de configurer [des dashboards en lecture seule][2]. Ils peuvent également accorder le rôle d'administrateur à un utilisateur standard.
 

Rôle Standard Datadog
: Utilisateurs autorisés à consulter et à modifier toutes les fonctionnalités de surveillance offertes par Datadog, telles que les [dashboards][2], les [monitors][3], les [événements][4] et les [notebooks][5]. Ils peuvent également inviter d'autres utilisateurs à rejoindre une organisation.

Rôle Read-Only Datadog
: Utilisateurs n'ayant aucun droit de modification dans Datadog. Ce rôle est particulièrement utile lorsque vous souhaitez partager des vues spécifiques en lecture seule avec un client ou lorsqu'un membre d'un service souhaite partager un [dashboard][2] avec une personne qui n'en fait pas partie.

## Rôles personnalisés

<div class="alert alert-warning">
La création et la modification de rôles personnalisés sont des fonctionnalités réservées aux utilisateurs Enterprise et nécessitant une activation. <a href="/help">Contactez l'assistance Datadog</a> pour activer ces fonctionnalités sur votre compte.
</div>

Gérez vos rôles personnalisés sur l'application Datadog, avec l'[API Role Datadog][6] ou directement via SAML. Poursuivez votre lecture pour découvrir comment créer, mettre à jour et supprimer un rôle. Consultez la section [Autorisations des rôles Datadog][7] pour en savoir plus sur les autorisations disponibles. Seuls les utilisateurs disposant de l'autorisation Access Management peuvent créer ou modifier des rôles dans Datadog.

### Créer un rôle personnalisé

Vous pouvez créer des rôles personnalisés à l'aide des ressources suivantes :

{{< tabs >}}
{{% tab "Application Datadog" %}}

Pour créer un rôle personnalisé :

1. Accédez à votre [page Roles sur Datadog][1].
2. Sélectionnez **New Role** en haut à droite.
3. Attribuez un nom à votre rôle.
4. Facultatif : attribuez un ensemble d'autorisations à votre rôle. Consultez la section [Autorisations des rôles Datadog][2] pour en savoir plus sur les autorisations disponibles.

{{< img src="account_management/rbac/create_role.png" alt="Créer un rôle personnalisé" style="width:90%;">}}

Une fois votre rôle créé, vous pouvez l'[ajouter à des utilisateurs existants][3].


[1]: https://app.datadoghq.com/access/roles
[2]: /fr/account_management/rbac/permissions/
[3]: /fr/account_management/users/#edit-a-user-roles
{{% /tab %}}
{{% tab "API" %}}

Pour découvrir un exemple de création de rôle avec l'API, consultez la [documentation à ce sujet][1].


[1]: /fr/api/v2/roles/#create-role
{{% /tab %}}
{{< /tabs >}}

### Mettre à jour un rôle

{{< tabs >}}
{{% tab "Application Datadog" %}}

Pour modifier un rôle personnalisé :

1. Accédez à votre [page Roles sur Datadog][1].
2. Sélectionnez le bouton de modification pour le rôle de votre choix.
3. Modifiez l'ensemble d'autorisations de votre rôle. Consultez la section [Autorisations des rôles Datadog][2] pour en savoir plus sur les autorisations disponibles.
4. Enregistrez vos modifications.

{{< img src="account_management/rbac/edit_role.png" alt="Modifier un rôle" style="width:90%;">}}

Une fois votre rôle modifié, les autorisations sont mises à jour pour l'ensemble des utilisateurs qui disposent de ce rôle.


[1]: https://app.datadoghq.com/access/roles
[2]: /fr/account_management/rbac/permissions/
{{% /tab %}}
{{% tab "API" %}}

Pour découvrir un exemple de mise à jour de rôle avec l'API, consultez la [documentation à ce sujet][1].


[1]: /fr/api/v2/roles/#update-a-role
{{% /tab %}}
{{< /tabs >}}

### Supprimer un rôle

{{< tabs >}}
{{% tab "Application Datadog" %}}

Pour supprimer un rôle personnalisé :

1. Accédez à votre [page Roles sur Datadog][1].
2. Sélectionnez le bouton de suppression pour le rôle de votre choix.
3. Confirmez l'action.

{{< img src="account_management/rbac/delete_role.png" alt="Supprimer un rôle" style="width:90%;">}}

{{< img src="account_management/users/delete_role_confirmation.png" alt="Supprimer un rôle" style="width:90%;">}}

Une fois votre rôle supprimé, les autorisations sont mises à jour pour tous les utilisateurs qui disposent de ce rôle. Les utilisateurs sans autre rôle ne peuvent pas exploiter toutes les fonctionnalités de Datadog, mais conservent un accès limité. Vous devez toujours vous assurer que les utilisateurs possèdent un rôle, ou qu'ils sont désactivés s'ils n'ont pas besoin d'accéder à votre organisation.


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Pour découvrir un exemple de suppression de rôle avec l'API, consultez la [documentation à ce sujet][1].


[1]: /fr/api/v2/roles/#delete-role
{{% /tab %}}
{{< /tabs >}}

## Restreindre l'accès aux dashboards et monitors

Une fois vos rôles RBAC configurés, vous pouvez restreindre l'accès aux dashboards, monitors et tests Synthetic à certains rôles utilisateur. Pour en savoir plus, consultez la documentation relative aux [autorisations des dashboards][8], aux [autorisations des monitors][9] et aux [autorisations Synthetics][10].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/saml/
[2]: /fr/dashboards/
[3]: /fr/monitors/
[4]: /fr/events/
[5]: /fr/notebooks/
[6]: /fr/api/v2/roles/
[7]: /fr/account_management/rbac/permissions/
[8]: /fr/dashboards/#restrict-access
[9]: /fr/getting_started/monitors/#restrict-access
[10]: /fr/synthetics/browser_tests/#permissions