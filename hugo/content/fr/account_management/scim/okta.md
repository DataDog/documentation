---
algolia:
  tags:
  - scim
  - identity provider
  - IdP
  - Aide
description: Synchronisez les utilisateurs et les équipes depuis Okta vers Datadog
  à l'aide de SCIM pour le provisionnement automatique des utilisateurs, la gestion
  des équipes et le contrôle des accès.
further_reading:
- link: /account_management/scim/
  tag: Documentation
  text: Provisionnement des utilisateurs avec SCIM
- link: account_management/saml/mapping/#map-saml-attributes-to-datadog-roles
  tag: Documentation
  text: Mappage d'attributs de groupe
title: Configurer SCIM avec Okta
---

<div class="alert alert-info">
SCIM est disponible avec les offres Infrastructure Pro et Infrastructure Enterprise.
</div>

Consultez les instructions suivantes pour synchroniser les utilisateurs Datadog avec Okta à l'aide de SCIM.

Pour en savoir plus sur les fonctionnalités et les limitations de cette fonctionnalité, consultez la page [SCIM][1].

## Prérequis

La fonctionnalité SCIM dans Datadog est une option avancée disponible avec les formules Infrastructure Pro et Infrastructure Enterprise.

Cette documentation part du principe que votre organisation gère les identités utilisateur à l'aide d'un fournisseur d'identité.

Datadog recommande fortement d'utiliser une clé d'application de compte de service lors de la configuration de SCIM afin d'éviter toute interruption d'accès. Pour plus de détails, consultez la section [Utiliser un compte de service avec SCIM][2].

Lorsque SAML et SCIM sont utilisés conjointement, Datadog recommande fortement de désactiver le provisionnement SAML juste-à-temps (JIT) afin d'éviter les incohérences d'accès. Gérez le provisionnement des utilisateurs uniquement via SCIM.

## Sélectionnez l'application Datadog dans la galerie d'applications Okta.

1. Dans votre portail Okta, allez dans **Applications**.
2. Cliquez sur **Browse App Catalog**
3. Saisissez « Datadog » dans la zone de recherche
4. Sélectionnez l'application Datadog 
5. Cliquez sur **Add Integration**

**Remarque :** si Datadog est déjà configuré avec Okta, sélectionnez votre application Datadog existante.

## Configurer le provisionnement automatique des utilisateurs

1. Dans l'écran de gestion de l'application, sélectionnez **Provisioning** dans le panneau de gauche.
2. Cliquez sur **Configure API integration**.
3. Sélectionnez **Enable API integration**.
4. Complétez la section **Credentials** comme suit :
    - **URL de base** : `https://{{< region-param key="dd_full_site" >}}/api/v2/scim` 
**Remarque :** utilisez le sous-domaine approprié pour votre site. Pour trouver votre URL, consultez la page [Sites Datadog][3].
    - **Jeton d'API** : utilisez une clé d’application Datadog valide. Vous pouvez créer une clé d’application depuis [la page des paramètres de votre organisation][4]. Pour garantir un accès continu à vos données, utilisez une clé d’application de [compte de service][5].

{{< img src="/account_management/scim/okta-admin-credentials.png" alt="Écran de configuration des identifiants administrateur Okta">}}

5. Cliquez sur **test API Credentials**, et attendez le message confirmant que les informations d'identification ont été vérifiées.
6. Cliquez sur **Save**. La section des paramètres s'affiche.
7. En regard de **Provisioning to App**, sélectionnez **Edit** pour activer les fonctionnalités :
    - **Create Users**
    - **Update User Attributes**
    - **Deactivate Users**
8. Sous **Datadog Attribute Mappings**, identifiez les mappages préconfigurés des attributs Okta vers les attributs Datadog. Réalisez de nouveaux mappages si nécessaire, mais associez les valeurs Okta au même ensemble de valeurs Datadog.

## Configurer le provisionnement automatique des équipes

Avec les [équipes gérées][6], vous contrôlez l'approvisionnement principal d'une équipe Datadog (son nom, son identifiant et sa composition) via le fournisseur d'identité. Le processus de configuration varie selon que l'équipe existe déjà ou non dans Datadog.

**Remarque :** les utilisateurs doivent exister dans Datadog avant de pouvoir être ajoutés à une équipe. Vous devez donc affecter les utilisateurs à l'application Datadog dans Okta afin qu'ils soient créés dans Datadog via SCIM. Affectez l'application Datadog à votre groupe Okta pour que tous les membres de l'équipe soient créés automatiquement dans Datadog.

### Créer une nouvelle équipe dans Datadog

1. Dans votre application Datadog dans Okta, naviguez jusqu'à l'onglet **Push Groups**.
{{< img src="/account_management/scim/okta/pushed-groups.png" alt="Interface de configuration des groupes poussés dans Okta">}}
1. Cliquez sur le bouton **Push Groups**. L'interface des groupes poussés s'ouvre.
1. Sélectionnez le groupe Okta que vous voulez pousser vers Datadog.
1. Dans la colonne **Match result & push action**, assurez-vous que **Create group** est sélectionné.
1. Cliquez sur **Save**.

Pour vérifier que l'opération a bien été effectuée, accédez à la [liste des équipes][7] dans Datadog. Recherchez une équipe Datadog correspondant au groupe Okta que vous avez configuré. Vérifiez que l'équipe existe bien dans Datadog et qu'elle est gérée de manière externe. L'apparition de l'équipe dans Datadog peut prendre une à deux minutes.

{{< img src="/account_management/scim/okta/managed-externally.png" alt="Liste des équipes Datadog affichant une équipe appelée Identity team gérée en externe" >}}

### Synchroniser une équipe Datadog existante avec un groupe Okta

Vous pouvez mapper une équipe Datadog existante à un groupe Okta. L'établissement d'un lien entre le groupe Okta et l'équipe Datadog permet à l'équipe Datadog d'être gérée par Okta à l'avenir.

**Remarque :** pour synchroniser une équipe Datadog existante avec un groupe Okta, les deux noms doivent correspondre exactement.

1. Dans votre application Datadog dans Okta, naviguez jusqu'à l'onglet **Push Groups**.
1. Cliquez sur le bouton **Push Groups**. L'interface des groupes poussés s'ouvre.
1. Sélectionnez le groupe Okta que vous souhaitez synchroniser avec une équipe Datadog.
1. Dans la colonne **Match result & push action**, assurez-vous que **Create group** est sélectionné.
1. Cliquez sur **Save**.

**Remarque :** lorsque vous sélectionnez **Create group**, Okta affiche le message **No match found**. Vous pouvez ignorer ce message et poursuivre la création du groupe pour établir la synchronisation.

### Supprimer la connexion entre un groupe Okta et une équipe Datadog

Vous disposez de deux options pour déconnecter un groupe Okta d'une équipe Datadog, chacune ayant un impact différent sur la composition de l'équipe Datadog.

#### Garder les membres de l'équipe dans Datadog

Cette procédure vous permet de gérer les membres de l'équipe dans Datadog au lieu d'Okta. Les membres de l'équipe restent inchangés.

1. Dans votre application Datadog dans Okta, naviguez jusqu'à l'onglet **Push Groups**.
1. Cliquez sur le bouton **Push Groups**. L'interface des groupes poussés s'ouvre.
1. Sélectionnez le groupe Okta que vous souhaitez dissocier de son équipe Datadog.
1. Dans la colonne **Match result & push action**, sélectionnez **Unlink Pushed Group**. Une boîte de dialogue apparaît.
1. Sélectionnez **Leave the group in the target app**.
1. Cliquez sur **Unlink**.
1. Cliquez sur **Save**.

#### Retirer des membres de l'équipe de Datadog

Cette procédure vous permet de gérer les membres de l'équipe dans Datadog au lieu d'Okta et de supprimer les membres de l'équipe de Datadog.

1. Dans votre application Datadog dans Okta, naviguez jusqu'à l'onglet **Push Groups**.
1. Cliquez sur le bouton **Push Groups**. L'interface des groupes poussés s'ouvre.
1. Sélectionnez le groupe Okta que vous souhaitez dissocier de son équipe Datadog.
1. Dans la colonne **Match result & push action**, sélectionnez **Unlink Pushed Group**. Une boîte de dialogue apparaît.
1. Sélectionnez **Delete the group in the target app (recommended)**.
1. Cliquez sur **Unlink**.
1. Cliquez sur **Save**.

**Remarque ** contrairement à ce que laisse penser le nom de l'option, sélectionner **Delete the group in the target app** _ne supprime pas_ l'équipe dans Datadog. Cela supprime uniquement tous les membres de l'équipe et rompt le lien entre le groupe dans Okta et l'équipe Datadog.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/scim/
[2]: /fr/account_management/scim/#using-a-service-account-with-scim
[3]: /fr/getting_started/site
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: /fr/account_management/org_settings/service_accounts
[6]: /fr/account_management/teams/manage/#manage-teams-through-an-identity-provider
[7]: https://app.datadoghq.com/teams