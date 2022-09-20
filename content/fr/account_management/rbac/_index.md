---
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
  text: Gérer vos autorisations avec l'API Permissions
- link: /account_management/rbac/permissions
  tag: Documentation
  text: Découvrir la liste des permissions disponibles
- link: /account_management/saml/
  tag: Documentation
  text: Activer l'authentification unique avec SAML
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: Blog
  text: Concevoir une stratégie de conformité, gouvernance et transparence pour toutes
    vos équipes avec les journaux d'audit Datadog
kind: documentation
title: Contrôle d'accès à base de rôles (RBAC)
---

Les rôles permettent de classifier les utilisateurs et de définir les autorisations d'accès qu'ils possèdent. Vous pouvez ainsi choisir le type de données qu'ils peuvent lire ou encore le type de ressources de compte qu'ils peuvent modifier. Par défaut, Datadog propose trois rôles. Vous pouvez cependant créer des [rôles personnalisés](#rôles-personnalisés) afin de vous assurer que vos utilisateurs possèdent le bon niveau d'autorisation.

Lorsque vous attribuez des autorisations à un rôle, tous les utilisateurs associés à ce rôle bénéficient de ces autorisations. Lorsque les utilisateurs sont associés à plusieurs rôles, ils bénéficient de l'ensemble des autorisations correspondant à chacun de ces rôles. Plus un utilisateur dispose de rôles, plus il peut accéder aux différentes fonctionnalités d'un compte Datadog.

**Remarque** : si vous avez recours à un fournisseur d'identité SAML, vous pouvez l'intégrer à Datadog pour l'authentification et mapper des attributs d'identité à des rôles Datadog par défaut ou personnalisés. Consultez [Authentification unique avec SAML][1] pour en savoir plus.

## Rôles Datadog par défaut

Rôle Admin Datadog
: Utilisateurs ayant accès aux informations de facturation, autorisés à révoquer des clés API et capables de gérer des utilisateurs et de configurer [des dashboards en lecture seule][2]. Ils peuvent également accorder le rôle d'administrateur à un utilisateur standard.
 

Rôle Standard Datadog
: Utilisateurs autorisés à consulter et à modifier toutes les fonctionnalités de surveillance offertes par Datadog, telles que les [dashboards][2], les [monitors][3], les [événements][4] et les [notebooks][5]. Ils peuvent également inviter d'autres utilisateurs à rejoindre une organisation.

Rôle Read-Only Datadog
: Utilisateurs n'ayant aucun droit de modification dans Datadog. Ce rôle est particulièrement utile lorsque vous souhaitez partager des vues spécifiques en lecture seule avec un client ou lorsqu'un membre d'un service souhaite partager un [dashboard][2] avec une personne qui n'en fait pas partie.

## Rôles personnalisés

Les rôles personnalisés offrent à votre organisation la possibilité de créer de nouveaux rôles disposant d'autorisations uniques. Gérez vos rôles personnalisés sur le site de Datadog, avec l'[API Role Datadog][6] ou directement via SAML. Poursuivez votre lecture pour découvrir comment créer, mettre à jour et supprimer un rôle. Consultez la section [Autorisations des rôles Datadog][7] pour en savoir plus sur les autorisations disponibles. Seuls les utilisateurs disposant de l'autorisation User Access Management peuvent créer ou modifier des rôles dans Datadog.

### Activer les rôles personnalisés

1. Accédez aux [Paramètres d'organisation][8]. 
2. À gauche de la page, sélectionnez **Roles**.
3. Cliquez sur l'engrenage en haut à droite. Une fenêtre contextuelle Custom Roles apparaît.
4. Dans la fenêtre contextuelle Custom Roles, cliquez sur **Enable** pour activer la fonctionnalité.

{{< img src="account_management/rbac/enable_custom_roles.png" alt="Fenêtre contextuelle des rôles personnalisés avec bouton d'activation" style="width:90%;">}}

Vous pouvez également effectuer un appel POST sur l'[endpoint d'API Create Role][9] afin d'activer automatiquement les rôles personnalisés pour votre organisation.

### Créer un rôle personnalisé

{{< tabs >}}
{{% tab "Application Datadog" %}}

Pour créer un rôle personnalisé :

1. Accédez à votre [page Roles sur Datadog][1].
2. Sélectionnez **New Role** en haut à droite.
3. Attribuez un nom à votre rôle.
4. Attribuez un ensemble d'autorisations à votre rôle. Consultez la section [Autorisations des rôles Datadog][2] pour en savoir plus sur les autorisations disponibles.

Une fois votre rôle créé, vous pouvez l'[ajouter à des utilisateurs existants][3].


[1]: https://app.datadoghq.com/access/roles
[2]: /fr/account_management/rbac/permissions/
[3]: /fr/account_management/users/#edit-a-user-roles
{{% /tab %}}
{{% tab "API" %}}

Pour découvrir un exemple de création de rôle avec l'API, consultez la [documentation à ce sujet][1].


[1]: /fr/api/latest/roles/#create-role
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


Une fois votre rôle modifié, les autorisations sont mises à jour pour l'ensemble des utilisateurs qui disposent de ce rôle.


[1]: https://app.datadoghq.com/access/roles
[2]: /fr/account_management/rbac/permissions/
{{% /tab %}}
{{% tab "API" %}}

Pour découvrir un exemple de mise à jour de rôle avec l'API, consultez la [documentation à ce sujet][1].


[1]: /fr/api/latest/roles/#update-a-role
{{% /tab %}}
{{< /tabs >}}

### Dupliquer un rôle

{{< tabs >}}
{{% tab "Application Datadog" %}}

Pour dupliquer un rôle existant :

1. Accédez à votre [page Roles sur Datadog][1].
2. Passez votre curseur sur le rôle que vous souhaitez dupliquer. Plusieurs boutons apparaissent sur la droite.
3. Sélectionnez le bouton de duplication pour le rôle de votre choix.
4. Si besoin, modifiez le nom ou les autorisations du rôle.
5. Cliquez sur le bouton **Save** en bas.

{{< img src="account_management/rbac/clone_role.png" alt="Liste de deux rôles avec le bouton de duplication mis en évidence" style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Pour découvrir un exemple de duplication de rôle avec l'API, consultez la [documentation à ce sujet][1].

[1]: /fr/api/latest/roles/#create-a-new-role-by-cloning-an-existing-role
{{% /tab %}}
{{< /tabs >}}

### Supprimer un rôle

{{< tabs >}}
{{% tab "Application Datadog" %}}

Pour supprimer un rôle personnalisé :

1. Accédez à votre [page Roles sur Datadog][1].
2. Passez votre curseur sur le rôle que vous souhaitez supprimer. Plusieurs boutons apparaissent sur la droite.
3. Sélectionnez le bouton de suppression pour le rôle de votre choix.
4. Confirmez l'action.


Une fois votre rôle supprimé, les autorisations sont mises à jour pour tous les utilisateurs qui disposent de ce rôle. Les utilisateurs sans autre rôle ne peuvent pas exploiter toutes les fonctionnalités de Datadog, mais conservent un accès limité.


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Pour découvrir un exemple de suppression de rôle avec l'API, consultez la [documentation à ce sujet][1].


[1]: /fr/api/latest/roles/#delete-role
{{% /tab %}}
{{< /tabs >}}

### Appliquer un modèle de rôle

Lorsque vous créez ou mettez à jour un rôle sur le site de Datadog, vous pouvez utiliser un modèle de rôle pour appliquer un ensemble prédéfini d'autorisations au rôle.

1. Sur la page de création ou de modification d'un rôle, cliquez sur le bouton **Show Role Templates** à droite.
2. Un menu déroulant apparaît avec les différents modèles de rôle.
3. Depuis le menu, sélectionnez le modèle de rôle dont vous souhaitez appliquer les autorisations.
4. Cliquez sur le bouton **Apply**.
4. Apportez d'autres modifications à votre rôle si vous le souhaitez.
5. Cliquez sur le bouton **Save**.

{{< img src="account_management/rbac/role_templates.png" alt="Menu déroulant des modèles de rôle avec le rôle Datadog Billing Admin sélectionné" style="width:90%;">}}

## Restreindre l'accès aux dashboards et monitors

Une fois vos rôles RBAC configurés, vous pouvez restreindre l'accès aux dashboards, monitors et tests Synthetic à certains rôles utilisateur. Pour en savoir plus, consultez la documentation relative aux [autorisations des dashboards][10], aux [autorisations des monitors][11] et aux [autorisations Synthetics][12].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/saml/
[2]: /fr/dashboards/
[3]: /fr/monitors/
[4]: /fr/events/
[5]: /fr/notebooks/
[6]: /fr/api/v2/roles/
[7]: /fr/account_management/rbac/permissions/
[8]: https://app.datadoghq.com/organization-settings/
[9]: /fr/api/latest/roles/#create-role
[10]: /fr/dashboards/#permissions
[11]: /fr/monitors/notify/#permissions
[12]: /fr/synthetics/browser_tests/#permissions