---
algolia:
  tags:
  - scim
  - identity provider
  - IdP
  - Okta
description: Synchronisez les utilisateurs et les équipes d'Okta vers Datadog à l'aide
  de SCIM pour le provisionnement automatisé des utilisateurs, la gestion des équipes
  et le contrôle des accès.
further_reading:
- link: /account_management/scim/
  tag: Documentation
  text: Provisionnement des utilisateurs avec SCIM
- link: account_management/saml/mapping/#map-saml-attributes-to-datadog-roles
  tag: Documentation
  text: Mappage des attributs de groupe
title: Configurer SCIM avec Okta
---
<div class="alert alert-info">
SCIM est disponible avec les plans Infrastructure Pro, Infrastructure Enterprise et Startup.
</div>

Consultez les instructions suivantes pour synchroniser vos utilisateurs Datadog avec Okta à l'aide de SCIM.

Pour connaître les capacités et les limitations de cette fonctionnalité, consultez [SCIM][1].

## Prérequis {#prerequisites}

SCIM dans Datadog est une fonctionnalité avancée disponible avec les plans Infrastructure Pro, Infrastructure Enterprise et Startup

Cette documentation suppose que votre organisation gère les identités des utilisateurs à l'aide d'un fournisseur d'identité.

Datadog recommande vivement d'utiliser une clé d'application de compte de service lors de la configuration de SCIM pour éviter toute interruption de l'accès. Pour plus de détails, consultez [l'utilisation d'un compte de service avec SCIM][2].

Lorsque vous utilisez SAML et SCIM ensemble, Datadog recommande vivement de désactiver le provisionnement juste-à-temps (JIT) SAML pour éviter les divergences d'accès. Gérez le provisionnement des utilisateurs uniquement via SCIM.

## Sélectionnez l'application Datadog dans la galerie d'applications Okta {#select-the-datadog-application-in-the-okta-application-gallery}

1. Dans votre portail Okta, accédez à {{< ui >}}Applications{{< /ui >}}
2. Cliquez sur {{< ui >}}Browse App Catalog{{< /ui >}}
3. Saisissez « Datadog » dans la zone de recherche
4. Sélectionnez l'application Datadog
5. Cliquez sur {{< ui >}}Add Integration{{< /ui >}}

**Remarque :** Si Datadog est déjà configuré avec Okta, sélectionnez votre application Datadog existante.

## Configurer le provisionnement automatique des utilisateurs {#configure-automatic-user-provisioning}

1. Dans l'écran de gestion des applications, sélectionnez {{< ui >}}Provisioning{{< /ui >}} dans le panneau de gauche
2. Cliquez sur {{< ui >}}Configure API integration{{< /ui >}}.
3. Sélectionnez {{< ui >}}Enable API integration{{< /ui >}}.
4. Remplissez la section {{< ui >}}Credentials{{< /ui >}} comme suit :
    - {{< ui >}}Base URL{{< /ui >}} : `https://{{< region-param key="dd_full_site" >}}/api/v2/scim` **Remarque :** Utilisez le sous-domaine approprié pour votre site. Pour trouver votre URL, consultez les [sites Datadog][3].
    - {{< ui >}}API Token{{< /ui >}} : Utilisez une clé d'application Datadog valide. Vous pouvez créer une clé d'application sur [votre page de paramètres d'organisation][4]. Pour maintenir un accès continu à vos données, utilisez une clé d'application de [compte de service][5].

{{< img src="/account_management/scim/okta-admin-credentials.png" alt="Écran de configuration des identifiants d'administration Okta">}}

5. Cliquez sur {{< ui >}}Test API Credentials{{< /ui >}} et attendez le message confirmant que les identifiants sont vérifiés.
6. Cliquez sur {{< ui >}}Save{{< /ui >}}. La section des paramètres s'affiche.
7. À côté de {{< ui >}}Provisioning to App{{< /ui >}}, sélectionnez {{< ui >}}Edit{{< /ui >}} pour activer les fonctionnalités :
    - {{< ui >}}Create Users{{< /ui >}}
    - {{< ui >}}Update User Attributes{{< /ui >}}
    - {{< ui >}}Deactivate Users{{< /ui >}}
8. Sous {{< ui >}}Datadog Attribute Mappings{{< /ui >}}, trouvez le mappage des attributs Okta vers les attributs Datadog déjà préconfigurés. Vous pouvez les remapper si nécessaire, mais mappez les valeurs Okta vers le même ensemble de valeurs Datadog.

### Mappez l'attribut de rôle Datadog {#map-the-datadog-role-attribute}

Pour provisionner le rôle Datadog d'un utilisateur (intégré ou personnalisé) via SCIM, ajoutez un mappage explicite pour l'attribut `roles`. Okta ne remappe pas cet attribut par défaut.

La prise en charge des rôles SCIM par Datadog suit la convention d'attribut à valeurs multiples SCIM définie dans [RFC 7643][8], en utilisant l'UUID du rôle comme `value` et le nom du rôle comme `display` :

```json
{
  "roles": [
    { "value": "<DATADOG_ROLE_UUID>", "display": "<DATADOG_ROLE_NAME>" }
  ]
}
```

1. Dans {{< ui >}}Directory{{< /ui >}} > {{< ui >}}Profile Editor{{< /ui >}}, sélectionnez le profil utilisateur pour l'application configurée pour Datadog SCIM, puis cliquez sur {{< ui >}}Add Attribute{{< /ui >}} pour créer un attribut `roles` :
    - {{< ui >}}Data type{{< /ui >}} : **string**
    - {{< ui >}}Display name{{< /ui >}} : **Roles**
    - {{< ui >}}Variable name{{< /ui >}} : **roles**
    - {{< ui >}}External name{{< /ui >}} : `roles.^[primary==true].value`
    - {{< ui >}}External namespace{{< /ui >}} : `urn:ietf:params:scim:schemas:core:2.0:User`
    - Pour {{< ui >}}Enum{{< /ui >}}, sélectionnez {{< ui >}}Define enumerated list of values{{< /ui >}} et ajoutez une entrée par rôle Datadog, en utilisant le nom du rôle comme nom d'affichage et l'UUID du rôle comme valeur. Vous pouvez trouver l'UUID d'un rôle dans l'URL du rôle sur votre page [Organization Settings][9]. Ajoutez tous les rôles personnalisés de la même manière.
2. Dans les paramètres {{< ui >}}Provisioning{{< /ui >}} > {{< ui >}}To App{{< /ui >}} de votre application Datadog, mappez l'attribut Okta `roles` vers l'attribut Datadog `roles`.
3. Dans l'onglet {{< ui >}}Assignments{{< /ui >}} de l'application, assignez à chaque utilisateur le rôle approprié depuis la liste déroulante.

Si une requête SCIM envoie plusieurs rôles, Datadog provisionne uniquement les rôles qui correspondent à un rôle dans votre organisation. Si aucun ne correspond, l'utilisateur revient au rôle par défaut de l'organisation (Standard), et les rôles non correspondants sont consignés dans l'Audit Trail. Pour plus de détails, consultez [SCIM][1].

## Configurer le provisionnement automatique des équipes {#configure-automatic-team-provisioning}

Avec [Managed Teams][6], vous contrôlez le provisionnement principal d'une équipe Datadog — son nom, son handle et son membership — via le fournisseur d'identité. Le processus de configuration diffère selon que l'équipe existe déjà ou non dans Datadog.

**Remarque :** Les utilisateurs doivent exister dans Datadog avant que vous puissiez les ajouter à une équipe. Par conséquent, vous devez affecter les utilisateurs à l'application Datadog dans Okta pour vous assurer qu'ils sont créés dans Datadog via SCIM. Affectez l'application Datadog à votre groupe Okta pour vous assurer que tous les membres de l'équipe sont créés automatiquement dans Datadog.

### Créer une nouvelle équipe dans Datadog {#create-a-new-team-in-datadog}

1. Dans votre application Datadog dans Okta, accédez à l'onglet {{< ui >}}Push Groups{{< /ui >}}.
{{< img src="/account_management/scim/okta/pushed-groups.png" alt="Interface de configuration des groupes poussés Okta">}}
1. Cliquez sur le bouton {{< ui >}}Push Groups{{< /ui >}}. L'interface des groupes poussés s'ouvre.
1. Sélectionnez le groupe Okta que vous souhaitez pousser vers Datadog.
1. Dans la colonne {{< ui >}}Match result & push action{{< /ui >}}, assurez-vous que {{< ui >}}Create group{{< /ui >}} est sélectionné.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

Pour vérifier que l'opération a réussi, accédez à la [liste Teams][7] dans Datadog. Recherchez une équipe Datadog correspondant au groupe Okta que vous avez configuré. Vérifiez que l'équipe existe dans Datadog et qu'elle est gérée de manière externe. Il peut s'écouler une ou deux minutes avant que l'équipe n'apparaisse dans Datadog.

{{< img src="/account_management/scim/okta/managed-externally.png" alt="Liste des équipes Datadog montrant une équipe appelée Identity team qui est gérée de manière externe.">}}

### Synchronisez une équipe Datadog existante avec un groupe Okta {#synchronize-an-existing-datadog-team-with-an-okta-group}

Vous pouvez mapper une équipe Datadog existante à un groupe Okta. L'établissement d'un lien entre le groupe Okta et l'équipe Datadog entraîne la gestion de l'équipe Datadog par Okta à l'avenir.

**Remarque :** Pour synchroniser une équipe Datadog existante avec un groupe Okta, le handle dérivé du nom du groupe Okta doit correspondre exactement au handle de l'équipe Datadog existante.

1. Dans votre application Datadog dans Okta, accédez à l'onglet {{< ui >}}Push Groups{{< /ui >}}.
1. Cliquez sur le bouton {{< ui >}}Push Groups{{< /ui >}}. L'interface des groupes poussés s'ouvre.
1. Sélectionnez le groupe Okta que vous souhaitez synchroniser avec une équipe Datadog.
1. Dans la colonne {{< ui >}}Match result & push action{{< /ui >}}, assurez-vous que {{< ui >}}Create group{{< /ui >}} est sélectionné.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

**Remarque :** Lorsque vous sélectionnez {{< ui >}}Create group{{< /ui >}}, Okta affiche un message {{< ui >}}No match found{{< /ui >}}. Vous pouvez ignorer ce message et poursuivre la création du groupe pour établir la synchronisation.

### Supprimez la connexion entre un groupe Okta et une équipe Datadog {#delete-the-connection-between-an-okta-group-and-a-datadog-team}

Vous disposez de deux options pour déconnecter un groupe Okta d'une équipe Datadog, avec des impacts différents sur l'appartenance à l'équipe Datadog.

#### Conservez les membres de l'équipe dans Datadog {#keep-team-members-in-datadog}

Cette procédure vous permet de gérer l'appartenance à l'équipe dans Datadog au lieu d'Okta. Les membres de l'équipe restent inchangés.

1. Dans votre application Datadog dans Okta, accédez à l'onglet {{< ui >}}Push Groups{{< /ui >}}.
1. Cliquez sur le bouton {{< ui >}}Push Groups{{< /ui >}}. L'interface des groupes poussés s'ouvre.
1. Sélectionnez le groupe Okta que vous souhaitez dissocier de son équipe Datadog.
1. Dans la colonne {{< ui >}}Match result & push action{{< /ui >}}, sélectionnez {{< ui >}}Unlink Pushed Group{{< /ui >}}. Une boîte de dialogue s'affiche.
1. Sélectionnez {{< ui >}}Leave the group in the target app{{< /ui >}}.
1. Cliquez sur {{< ui >}}Unlink{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

#### Supprimez les membres de l'équipe de Datadog {#remove-team-members-from-datadog}

Cette procédure vous permet de gérer l'appartenance à une équipe dans Datadog au lieu d'Okta et supprime les membres de l'équipe Datadog.

1. Dans votre application Datadog dans Okta, accédez à l'onglet {{< ui >}}Push Groups{{< /ui >}}.
1. Cliquez sur le bouton {{< ui >}}Push Groups{{< /ui >}}. L'interface des groupes poussés s'ouvre.
1. Sélectionnez le groupe Okta que vous souhaitez dissocier de son équipe Datadog.
1. Dans la colonne {{< ui >}}Match result & push action{{< /ui >}}, sélectionnez {{< ui >}}Unlink Pushed Group{{< /ui >}}. Une boîte de dialogue s'affiche.
1. Sélectionnez {{< ui >}}Delete the group in the target app (recommended){{< /ui >}}.
1. Cliquez sur {{< ui >}}Unlink{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

**Remarque :** Contrairement au nom de l'option, la sélection de {{< ui >}}Delete the group in the target app{{< /ui >}}_ ne supprime pas _ l'équipe dans Datadog. À la place, elle supprime tous les membres de l'équipe et supprime le lien entre le groupe Okta et l'équipe Datadog.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/scim/
[2]: /fr/account_management/scim/#using-a-service-account-with-scim
[3]: /fr/getting_started/site
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: /fr/account_management/org_settings/service_accounts
[6]: /fr/account_management/teams/manage/#manage-teams-through-an-identity-provider
[7]: https://app.datadoghq.com/teams
[8]: https://www.rfc-editor.org/rfc/rfc7643.html#section-4.1.2
[9]: https://app.datadoghq.com/organization-settings/roles