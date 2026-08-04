---
algolia:
  tags:
  - rbac
aliases:
- /fr/guides/rbac
- /fr/account_management/rbac/role_api
- /fr/account_management/users/default_roles
- /fr/account_management/users/custom_roles
- /fr/account_management/rbac/log_management
description: Gérez l'accès des utilisateurs avec des autorisations basées sur les
  rôles, des rôles personnalisés et un contrôle d'accès granulaire pour les tableaux
  de bord, les moniteurs et d'autres ressources Datadog.
further_reading:
- link: /api/v2/roles/
  tag: Documentation
  text: Gérer les rôles et les autorisations avec l’API Roles
- link: /api/v2/roles/#list-permissions
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
    vos équipes avec le journal d'audit Datadog
title: Contrôle de l'accès
---
## Aperçu {#overview}

Datadog implémente un système flexible de gestion de l'accès. Celui-ci vous permet de personnaliser le niveau d'accès des différentes ressources Datadog.

Les utilisateurs à la recherche de fonctionnalités de base ont accès aux [rôles prédéfinis](#role-based-access-control) avec [autorisations][1]. Pour plus de flexibilité, créez vos propres [rôles personnalisés](#custom-roles) pour combiner des autorisations en de nouveaux rôles. Les autorisations attachées à un rôle personnalisé s'appliquent à toutes les ressources d'un type de ressource particulier.

Le [contrôle d'accès granulaire][2] offre encore plus de flexibilité. Il permet aux organisations et utilisateurs et de contrôler l'accès à chaque dashboard, notebook et autre ressource.

## Contrôle d'accès basé sur les rôles {#role-based-access-control}

Les rôles catégorisent les utilisateurs et définissent les autorisations de compte dont disposent ces utilisateurs, telles que les données qu'ils peuvent lire ou les actifs de compte qu'ils peuvent modifier. Par défaut, Datadog propose trois rôles, et vous pouvez créer des [rôles personnalisés](#custom-roles) afin de mieux définir la correspondance entre vos utilisateurs et leurs autorisations.

En accordant des autorisations aux rôles, tout utilisateur associé à ce rôle reçoit cette autorisation. Lorsque des utilisateurs sont associés à plusieurs rôles, ils reçoivent toutes les autorisations accordées à chacun de leurs rôles. Plus un utilisateur est associé à des rôles, plus il a d'accès au sein d'un compte Datadog.

Si un utilisateur dans une [organisation enfant][3] a `org_management` une autorisation, cela ne signifie pas qu'il a la même autorisation dans l'organisation parente. Les rôles des utilisateurs ne sont pas partagés entre les organisations parentes et enfants.

**Remarque**: Si vous utilisez un fournisseur d'identité SAML, vous pouvez l'intégrer à Datadog pour l'authentification, et vous pouvez mapper les attributs d'identité aux rôles par défaut et personnalisés de Datadog. Pour plus d'informations, consultez [le mappage des groupes SAML][4].

## Rôles par défaut de Datadog {#datadog-default-roles}

Le rôle Admin Datadog
: Les utilisateurs ont accès aux informations de facturation et la possibilité de révoquer des clés API. Ils peuvent gérer les utilisateurs et configurer des [tableaux de bord en lecture seule][5]. Ils peuvent également promouvoir des utilisateurs standard en administrateurs.

Rôle standard Datadog
: Les utilisateurs sont autorisés à consulter et à modifier toutes les fonctionnalités de surveillance que Datadog propose, telles que [dashboards][5], [monitors][6], [events][7] et [Notebooks][11]. Les utilisateurs standard peuvent également inviter d'autres utilisateurs dans des organisations.

Rôle Read-Only Datadog
: Les utilisateurs n'ont pas accès à l'édition dans Datadog. Cela est utile lorsque vous souhaitez partager des vues spécifiques en lecture seule avec un client, ou lorsqu'un membre d'une unité commerciale doit partager un [tableau de bord][5] avec quelqu'un en dehors de son unité.

## Rôles personnalisés {#custom-roles}

La fonctionnalité des rôles personnalisés permet à votre organisation de créer de nouveaux rôles avec des ensembles d'autorisations uniques. Gérez vos rôles personnalisés via le site Datadog, l'[API des rôles Datadog][8] ou SAML directement. Découvrez ci-dessous comment créer, mettre à jour ou supprimer un rôle. Consultez [Permissions des rôles Datadog][1] pour plus d'informations sur les autorisations disponibles. Seuls les utilisateurs disposant de l'autorisation « User Access Manage » peuvent créer ou modifier des rôles dans Datadog.

### Activer les rôles personnalisés {#enable-custom-roles}

1. Accédez aux [Paramètres de l'organisation][9].
2. Sur le côté gauche de la page, sélectionnez {{< ui >}}Roles{{< /ui >}}.
3. Cliquez sur l'engrenage dans le coin supérieur droit. La fenêtre contextuelle des Rôles Personnalisés apparaît.
4. Dans la fenêtre contextuelle des Rôles Personnalisés, cliquez sur {{< ui >}}Enable{{< /ui >}}.

{{< img src="account_management/rbac/enable_custom_roles.png" alt="Fenêtre contextuelle des Rôles Personnalisés avec le bouton Activer" style="width:90%;">}}

Vous pouvez également effectuer un appel POST sur l'[endpoint d'API Create Role][10] afin d'activer automatiquement les rôles personnalisés pour votre organisation.

### Créer un rôle personnalisé {#create-a-custom-role}

{{< tabs >}}
{{% tab "Application Datadog" %}}

Pour créer un rôle personnalisé :

1. Allez sur votre [page des Rôles Datadog][1].
2. Sélectionnez {{< ui >}}New Role{{< /ui >}} dans le coin supérieur droit de la page.
3. Donnez un nom à votre rôle.
4. Attribuez un ensemble de permissions à votre rôle. Consultez [Permissions de rôle Datadog][2] pour plus d'informations sur les autorisations disponibles.

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

### Mettez à jour un rôle {#update-a-role}

{{< tabs >}}
{{% tab "Application Datadog" %}}

Pour modifier un rôle personnalisé :

1. Allez sur votre [page des Rôles Datadog][1].
2. Sélectionnez le bouton de modification sur le rôle que vous souhaitez modifier.
3. Modifiez l'ensemble des permissions pour votre rôle. Consultez [Permissions de rôle][2] pour plus d'informations sur les autorisations disponibles.
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

### Clonez un rôle {#clone-a-role}

{{< tabs >}}
{{% tab "Application Datadog" %}}

Pour dupliquer un rôle existant :

1. Allez sur votre [page des Rôles Datadog][1].
2. Survolez le rôle que vous souhaitez cloner. Une série de boutons apparaît à droite.
3. Sélectionnez le bouton de clonage sur le rôle que vous souhaitez cloner.
4. Modifiez éventuellement le nom ou les autorisations du rôle.
5. Cliquez sur le bouton {{< ui >}}Save{{< /ui >}} en bas.

{{< img src="account_management/rbac/clone_role.png" alt="Liste de deux rôles avec le bouton Cloner mis en évidence." style="width:90%;">}}


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Pour découvrir un exemple de duplication de rôle avec l'API, consultez la [documentation à ce sujet][1].

[1]: /fr/api/latest/roles/#create-a-new-role-by-cloning-an-existing-role
{{% /tab %}}
{{< /tabs >}}

### Supprimez un rôle {#delete-a-role}

{{< tabs >}}
{{% tab "Application Datadog" %}}

Pour supprimer un rôle personnalisé :

1. Allez sur votre [page des Rôles Datadog][1].
2. Survolez le rôle que vous souhaitez supprimer. Une série de boutons apparaît à droite.
3. Sélectionnez le bouton de suppression sur le rôle que vous souhaitez supprimer.
4. Confirmez votre décision.


Une fois qu'un rôle est supprimé, les autorisations sont mises à jour pour tous les utilisateurs ayant ce rôle. Les utilisateurs sans aucun rôle ne peuvent pas utiliser Datadog efficacement, mais conservent néanmoins un accès limité.


[1]: https://app.datadoghq.com/access/roles
{{% /tab %}}
{{% tab "API" %}}

Pour découvrir un exemple de suppression de rôle avec l'API, consultez la [documentation à ce sujet][1].


[1]: /fr/api/latest/roles/#delete-role
{{% /tab %}}
{{< /tabs >}}

### Appliquer un modèle de rôle {#apply-a-role-template}

Lorsque vous créez ou mettez à jour un rôle sur le site de Datadog, vous pouvez utiliser un modèle de rôle pour appliquer un ensemble prédéfini d'autorisations au rôle.

1. Sur la page Nouveau rôle ou Modifier le rôle, cliquez sur le bouton {{< ui >}}Show Role Templates{{< /ui >}} à droite.
2. Un menu déroulant peuplé de modèles de rôle apparaît.
3. Dans le menu, sélectionnez le modèle de rôle dont vous souhaitez appliquer les autorisations à votre rôle.
4. Cliquez sur le bouton {{< ui >}}Apply{{< /ui >}}.
4. Optionnellement, apportez des modifications supplémentaires à votre rôle.
5. Cliquez sur le bouton {{< ui >}}Save{{< /ui >}}.

{{< img src="account_management/rbac/role_templates.png" alt="Menu déroulant des modèles de rôle avec le rôle Administrateur de facturation Datadog sélectionné." style="width:90%;">}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/permissions/
[2]: /fr/account_management/rbac/granular_access/
[3]: /fr/account_management/multi_organization/
[4]: /fr/account_management/saml/mapping/
[5]: /fr/dashboards/
[6]: /fr/monitors/
[7]: /fr/events/
[8]: /fr/api/v2/roles/
[9]: https://app.datadoghq.com/organization-settings/
[10]: /fr/api/latest/roles/#create-role
[11]: /fr/notebooks