---
title: Paramètres d'organisation
---
## Présentation
Les [administrateurs][1] peuvent accéder à la section des paramètres d'organisation en cliquant sur **Organization Settings** depuis le menu Account de la barre de navigation en bas à gauche, ou en sélectionnant **Organization Settings** depuis la liste déroulante en haut de la page Personal Settings.

Les paramètres d'organisation vous permettent de gérer les utilisateurs, groupes, options RBAC, clés et tokens. Cette page décrit chaque section des paramètres et indique les pages de la documentation à consulter pour découvrir comment effectuer certaines opérations dans les **paramètres d'organisation**.
### Accounts
#### Users

Consultez la documentation relative à la [gestion des utilisateurs][2] pour découvrir comment ajouter, modifier et désactiver des utilisateurs.

#### Service accounts

Les comptes de service correspondent à des utilisateurs fictifs. Ils possèdent des rôles ainsi que leurs propres clés d'application. Les comptes de service vous permettent d'accéder aux API Datadog sans avoir à associer votre application ou votre script à une personne précise. Les clés d'application des comptes de service sont consultables une seule fois. Une fois créées, il n'est plus possible de les récupérer.

### Groups

#### Roles

Pour en savoir plus sur les rôles Datadog par défaut et personnalisés, consultez la [documentation sur le contrôle d'accès à base de rôles (RBAC)][3].

#### SAML Group Mappings

Lorsque les mappages sont activés, les utilisateurs qui se connectent à votre compte Datadog via SAML perdent leurs rôles actuels. Ils se voient attribuer de nouveaux rôles en fonction des informations associées à l'assertion SAML transmise par votre fournisseur d'identité et des mappages que vous avez créés.

Les utilisateurs qui se connectent via SAML et dont les valeurs ne correspondent à aucun rôle Datadog perdent tous leurs rôles et ne sont pas autorisés à se connecter. Pour découvrir comment créer et configurer des mappages, consultez la [documentation relative au mappage des attributs SAML][4].

##### Paramètres SAML

Pour en savoir plus sur la configuration SAML, consultez la [section Authentification unique avec SAML][5].

### Access

#### API Keys

Cette section vous permet de consulter, copier et révoquer les clés d'API répertoriées. Vos clés d'API sont spécifiques à votre organisation. Pour envoyer des métriques et des événements à Datadog, l'Agent Datadog a besoin d'une clé d'API. Consultez la [documentation relative aux clés d'API][6] pour découvrir comment les créer, les modifier et les révoquer.

#### Application Keys

Vous pouvez filtrer les clés d'application en fonction de leur nom, de leur ID ou de leur propriétaire. L'option **Only My Kers** vous permet en outre d'afficher uniquement vos propres clés d'application. Consultez la [documentation relative aux clés d'application][6] pour découvrir comment les ajouter ou les supprimer.

#### Client Tokens

Les tokens client servent à envoyer des événements et des logs à partir des applications Web et mobiles de votre utilisateur. Ils sont spécifiques à votre organisation. SI vous supprimez un token client associé à une application RUM, cette dernière ne transmettra plus de données. Le [processus de création d'un token client][7] est similaire à celui des clés d'API et des clés d'application.

#### Events API Emails

Si votre application ne possède pas d'intégration Datadog et que vous ne souhaitez pas créer de check d'Agent personnalisé, vous pouvez envoyer des événements par e-mail. Pour en savoir plus sur l'envoi d'e-mails d'événement via l'API, consultez le [guide à ce sujet][8].

### Security

#### Public Sharing

L'onglet **Public Sharing** répertorie les dashboards et les graphiques partagés. Pour modifier vos paramètres de partage, cliquez sur l'option **Enabled**.

#### Login methods

L'onglet **Login Methods** rassemble les paramètres relatifs aux mots de passe, à Google et à l'authentification SAML. Vous pouvez activer ou désactiver les différentes options à l'aide des listes déroulantes **Enabled by Default**. Pour imposer une connexion SAML stricte, ou un autre type de connexion stricte, désactivez les autres méthodes de connexion. L'onglet User Management vous permet de définir des exceptions pour certains utilisateurs, afin qu'ils puissent se connecter avec une autre méthode si besoin.

#### Audit Trail

L'onglet **Audit Trail** de la page Organization Settings vous permet d'ouvrir un nouvel onglet dans l'explorateur d'événements d'audit.

#### Audit Trail Settings

L'onglet **Audit Trail Settings** vous permet de définir la période de rétention des pistes d'audit et d'activer l'archivage vers d'autres services de stockage dans le cloud.

#### OAuth Apps

La page [**OAuth Apps**][9] vous permet de consulter ou de gérer des applications OAuth pour votre organisation.

### General

#### Rename organization

Pour renommer votre organisation, cliquez sur le bouton **Edit** dans l'onglet **Preferences** de la page **Organization Settings**, saisissez un nouveau nom, puis cliquez sur le bouton **Save**.

**Remarque : le nom de votre organisation ne doit pas dépasser 32 caractères.**

[1]: /fr/account_management/users/default_roles/
[2]: /fr/account_management/users/
[3]: /fr/account_management/rbac/
[4]: /fr/account_management/saml/#mapping-saml-attributes-to-datadog-roles
[5]: /fr/account_management/saml/
[6]: /fr/account_management/api-app-keys/
[7]: /fr/account_management/api-app-keys/#client-tokens
[8]: /fr/events/guides/email/
[9]: /fr/account_management/org_settings/oauth_apps