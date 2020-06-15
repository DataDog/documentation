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
  - link: '/api/v2/roles/#enumerer-les-autorisations'
    tag: Documentation
    text: Gérer vos autorisations avec l'API Permission
  - link: /account_management/rbac/permissions
    tag: Documentation
    text: Découvrir la liste des autorisations disponibles
---
Les rôles permettent de classifier les utilisateurs et de définir les autorisations d'accès qu'ils possèdent. Vous pouvez ainsi choisir le type de données qu'ils peuvent lire ou encore le type de ressources de compte qu'ils peuvent modifier. Par défaut, Datadog propose trois rôles. Vous pouvez cependant créer des [rôles personnalisés](roles-personnalises) afin de vous assurer que vos utilisateurs possèdent le bon niveau d'autorisation.

Lorsque vous attribuez des autorisations à un rôle, tous les utilisateurs associés à ce rôle bénéficient de ces autorisations. Lorsque les utilisateurs sont associés à plusieurs rôles, ils bénéficient de l'ensemble des autorisations correspondant à chacun de ces rôles. Plus un utilisateur dispose de rôles, plus il peut accéder aux différentes fonctionnalités d'un compte Datadog.

## Rôles Datadog par défaut

| Rôle                       | Description                                                                                                                                                                                                                                  |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Rôle Admin Datadog**     | Les utilisateurs ont accès aux informations de facturation, sont autorisés à révoquer des clés API, sont en mesure de gérer les utilisateurs et peuvent configurer [des dashboards en lecture seule][1]. Ils peuvent également accorder le rôle d'administrateur à un utilisateur standard.                                          |
| **Rôle Standard Datadog**  | Les utilisateurs sont autorisés à consulter et à modifier toutes les fonctionnalités de surveillance offertes par Datadog, telles que les [dashboards][1], les [monitors][2], les [événements][3], et les [notebooks][4]. Ils peuvent également inviter d'autres utilisateurs à rejoindre une organisation.                      |
| **Rôle Read-Only Datadog** | Les utilisateurs n'ont aucun droit de modification dans Datadog. Ce rôle est particulièrement utile lorsque vous souhaitez partager des vues spécifiques en lecture seule avec un client ou lorsqu'un membre d'un service souhaite partager un [dashboard][1] avec une personne qui n'en fait pas partie. |

## Rôles personnalisés

<div class="alert alert-warning">
La création et la modification de rôles personnalisés sont réservées aux utilisateurs Enterprise en version bêta. <a href="/help">Contactez l'assistance Datadog</a> pour activer ces fonctionnalités sur votre compte.
</div>

Gérez vos rôles personnalisés sur l'application Datadog, avec l'[API Role Datadog][5] ou directement via SAML. Poursuivez votre lecture pour découvrir comment créer, mettre à jour et supprimer un rôle. Consultez la section [Autorisations des rôles Datadog][6] pour en savoir plus sur les autorisations disponibles.

### Créer un rôle personnalisé

Vous pouvez créer des rôles personnalisés à l'aide des ressources suivantes :

{{< tabs >}}
{{% tab "Application Datadog" %}}

Pour créer un rôle personnalisé :

1. Accédez à votre [page Roles sur Datadog][1].
2. Sélectionnez **New Role** en haut à droite.
3. Attribuez un nom à votre rôle.
4. Facultatif : attribuez un ensemble d'autorisations à votre rôle. Consultez la section [Autorisations des rôles Datadog][2] pour en savoir plus sur les autorisations disponibles.

{{< img src="account_management/rbac/create_role.png" alt="Créer un rôle personnalisé"  style="width:90%;">}}

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

{{< img src="account_management/rbac/edit_role.png" alt="Modifier un rôle"  style="width:90%;">}}

Une fois votre rôle modifié, les autorisations sont mises à jour pour tous les utilisateurs qui disposent de ce rôle.


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

{{< img src="account_management/rbac/delete_role.png" alt="Supprimer un rôle"  style="width:90%;">}}

{{< img src="account_management/users/delete_role_confirmation.png" alt="Supprimer un rôle"  style="width:90%;">}}

Une fois votre rôle supprimé, les autorisations sont mises à jour pour tous les utilisateurs qui disposent de ce rôle. Les utilisateurs sans autre rôle ne peuvent pas exploiter toutes les fonctionnalités de Datadog, mais conservent un accès limité. Vous devez toujours vous assurer que les utilisateurs possèdent un rôle, ou qu'ils sont désactivés s'ils n'ont pas besoin d'accéder à votre organisation.


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Pour découvrir un exemple de suppression de rôle avec l'API, consultez la [documentation à ce sujet][1].


[1]: /fr/api/v2/roles/#delete-role
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/
[2]: /fr/monitors/
[3]: /fr/events/
[4]: /fr/notebooks/
[5]: /fr/api/v2/roles/
[6]: /fr/account_management/rbac/permissions/