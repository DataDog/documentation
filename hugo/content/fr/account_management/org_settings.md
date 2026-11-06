---
description: Gérez les utilisateurs, les équipes, l'authentification, les clés d'API,
  les rôles et les paramètres de sécurité de votre organisation Datadog depuis la
  section Paramètres de l'organisation.
further_reading:
- link: /account_management/api-app-keys/
  tag: Documentation
  text: Clés d'API et d'application
- link: /account_management/users/
  tag: Documentation
  text: Gestion des utilisateurs
title: Paramètres d'organisation
---
## Présentation {#overview}
La section Paramètres de l'organisation est accessible aux [Administrators][1] en cliquant sur {{< ui >}}Organization Settings{{< /ui >}} dans le menu du compte en bas de la navigation latérale gauche ou en sélectionnant {{< ui >}}Organization Settings{{< /ui >}} dans le menu déroulant de l'en-tête en haut de la page Paramètres personnels.

{{< img src="account_management/org_settings/nav.png" alt="Accédez à vos Paramètres de l'organisation dans Datadog" style="width:80%;" >}}

Les Paramètres de l'organisation vous permettent de gérer les utilisateurs, les groupes, le contrôle d'accès basé sur les rôles (RBAC), les clés et les jetons. Cette page présente chaque section et indique où, dans la documentation, vous pouvez en apprendre davantage sur des tâches spécifiques dans {{< ui >}}Organization Settings{{< /ui >}}.

## Identité et comptes {#identity-accounts}

### Utilisateurs {#users}

Consultez la documentation relative à la [gestion des utilisateurs][2] pour découvrir comment ajouter, modifier et désactiver des utilisateurs.

### Teams {#teams}

Lisez la documentation sur [Teams][3] pour gérer les équipes afin d'organiser vos ressources au sein de Datadog.

### Comptes de service {#service-accounts}


Les [Service accounts][4] sont des comptes non interactifs que vous pouvez utiliser pour posséder des clés d'application et d'autres ressources partagées entre vos équipes. Les clés d'application des comptes de service ne peuvent être consultées qu'une seule fois par la personne qui a créé la clé. Vous pouvez utiliser des comptes de service pour accéder aux API Datadog sans associer votre application ou votre script à une personne en particulier.

## Authentification {#authentication}

### Méthodes de connexion {#login-methods}


L'onglet {{< ui >}}Login Methods{{< /ui >}} affiche les paramètres d'authentification par mot de passe, Google et SAML. Vous pouvez activer ou désactiver chacun d'eux avec les menus déroulants {{< ui >}}Enabled by Default{{< /ui >}}. Pour être en mode « SAML Strict » ou strict pour tout autre type de connexion, désactivez les autres types de méthodes de connexion. Vous pouvez autoriser des dérogations par utilisateur dans l'onglet Gestion des utilisateurs pour permettre aux utilisateurs de se connecter avec une autre méthode de connexion si nécessaire.

Lisez la documentation [Configurer les méthodes de connexion][5] pour authentifier les utilisateurs afin qu'ils se connectent à votre organisation Datadog.

#### Paramètres SAML {#saml-settings}

Pour savoir comment configurer SAML, lisez la [section Authentification unique avec SAML][6].

### Mappages de groupes SAML {#saml-group-mappings}

Lorsqu'elle est activée, les utilisateurs se connectant avec SAML à votre compte Datadog sont définitivement privés de leurs rôles actuels et réaffectés à de nouveaux rôles. L'assertion SAML transmise par le fournisseur d'identité et les mappages que vous créez déterminent les nouveaux rôles de chaque utilisateur.

Les utilisateurs qui se connectent avec SAML et n'ont pas de valeurs correspondant à un rôle Datadog sont définitivement privés de tous leurs rôles. Cet utilisateur ne peut plus se connecter.
Pour savoir comment créer et définir des mappages, lisez la [documentation sur le mappage d'attributs SAML][7].

## Accès {#access}

### Clés d'API {#api-keys}

Cette section vous permet d'afficher, de copier et de révoquer toute clé d'API dans la liste. Vos clés d'API sont uniques à votre organisation. Une clé d'API est requise par le Datadog Agent pour soumettre des métriques et des événements à Datadog. Lisez la [documentation sur les clés d'API][8] pour plus d'informations sur la création, la modification et la révocation des clés.

### Clés d'application {#application-keys}

Vous pouvez filtrer les clés d'application par nom, ID ou propriétaire, ou cliquer sur le bouton {{< ui >}}Only My Keys{{< /ui >}} pour afficher uniquement les clés d'application que vous possédez. Lisez la [Application keys documentation][8] pour plus d'informations sur l'ajout et la suppression de clés.

### Rôles {#roles}

Pour en savoir plus sur les rôles Datadog par défaut et personnalisés, consultez la [documentation sur le contrôle d'accès basé sur les rôles (RBAC)][9].

### Remote Configuration {#remote-configuration}

Pour savoir comment configurer à distance le comportement des composants Datadog déployés dans votre infrastructure, lisez [Fonctionnement de Remote Configuration][10].

### Jetons client {#client-tokens}

Les jetons client sont utilisés pour envoyer des événements et des logs depuis les applications web et mobiles de vos utilisateurs. Ils sont uniques à votre organisation. La suppression d'un jeton client lié à une application RUM entraîne l'arrêt de la transmission de rapports de votre application RUM. Le [processus de création de jetons client][11] est similaire à celui des clés d'API et d'application.

### E-mails de l'API d'événements {#events-api-emails}

Si votre application ne dispose pas d'une intégration Datadog existante et que vous ne souhaitez pas créer de check d'Agent personnalisé, vous pouvez envoyer des événements par e-mail. Pour savoir comment configurer les e-mails de l'API d'événements, lisez le [guide Envoi d'événements par e-mail][12].

### Tests Synthetic {#synthetic-tests}

Apprenez à accéder et à contrôler les [Synthetic Monitoring Settings][13].

### MCP Server {#mcp-server}

Gérez la manière dont les agents et outils d'IA accèdent aux données Datadog de votre organisation via le [Datadog MCP Server][18] :

- Activez ou désactivez l'[accès à l'échelle de l'organisation][19] au MCP Server et à ses outils, et séparément, l'accès en écriture pour les outils qui créent ou modifient des ressources.
- Configurez des [URL de redirection][20] pour l'authentification OAuth avec le MCP Server.

## Security {#security}

### Safety Center {#safety-center}

La page [**Safety Center**][14] contient des alertes de sécurité, des avertissements et des recommandations à examiner dans votre organisation.

### Partage public {#public-sharing}

L'onglet {{< ui >}}Public Sharing{{< /ui >}} inclut des paramètres à l'échelle de l'organisation pour le partage, ainsi que des listes de dashboards et de graphiques partagés. Vous pouvez activer les fonctionnalités de partage de manière granulaire et configurer des options de sécurité supplémentaires, telles que la définition d'une durée maximale d'invitation.

Pour appliquer les paramètres de partage à toutes vos organisations, contactez le [Datadog Support][16].

**Remarque** : L'autorisation OrgAdmin est requise pour afficher et gérer les paramètres et les ressources de partage.

### Accès mobile et tiers {#mobile-and-third-party-access}

La page [**Mobile and Third-Party Access**][15] vous permet d'afficher et de gérer les applications mobiles et tierces dans votre organisation.

## Conformité {#compliance}

### Piste d'audit {#audit-trail}

L'onglet {{< ui >}}Audit Trail{{< /ui >}} de la page Paramètres de l'organisation ouvre un nouvel onglet vers l'Audit Events Explorer.

### Paramètres de la piste d'audit {#audit-trail-settings}

L'onglet {{< ui >}}Audit Trail Settings{{< /ui >}} vous permet de définir la période de rétention des pistes d'audit et d'activer l'archivage vers d'autres services de stockage cloud.

### Configuration SMTP {#smtp-configuration}

La page [**SMTP Configuration**][17] vous permet de connecter votre propre serveur SMTP afin que les e-mails d'abonnement à la page de statut soient envoyés depuis votre propre domaine.

## Général {#general}

### Préférences {#preferences}

#### Nom de l'organisation {#organization-name}

Pour renommer votre organisation, cliquez sur le bouton {{< ui >}}Edit{{< /ui >}} dans l'onglet {{< ui >}}Preferences{{< /ui >}} de {{< ui >}}Organization Settings{{< /ui >}}, saisissez le nouveau nom, puis cliquez sur le bouton {{< ui >}}Save{{< /ui >}}.

**Remarque** : Le nom de votre organisation ne doit pas dépasser 32 caractères.

#### Page d'accueil Datadog {#datadog-homepage}

Vous pouvez choisir de définir votre page d'accueil d'organisation sur une Dashboard List ou sur un dashboard individuel.

#### Périodes de rétention hors contrat pour les index de logs {#out-of-contract-retention-periods-for-log-indexes}

Les utilisateurs disposant de l'autorisation `Org Management` peuvent activer la fonctionnalité de périodes de rétention hors contrat pour les index de logs. Cette fonctionnalité est activée par organisation. Cela signifie que si un utilisateur active la fonctionnalité sur une organisation parente, celle-ci n'est pas automatiquement activée pour toutes les organisations enfants.

{{< img src="account_management/out-of-contract-retention.png" alt="Le paramètre des périodes de rétention hors contrat pour les index de logs s'affiche comme activé." style="width:70%;" >}}

Une fois activée, les utilisateurs disposant de l'autorisation `Modify Index` peuvent choisir l'une des périodes de rétention de 3, 7, 15, 30, 45 et 60 jours, même si elle ne figure pas dans le contrat. Cela peut s'avérer utile lors du dépannage d'un problème potentiel de longue date ou pour répondre aux exigences de conformité pour lesquelles les clients ont besoin d'une période de rétention plus longue qui ne fait pas partie du contrat actuel.

**Remarque** : L'utilisation de périodes de rétention hors contrat entraîne des frais à la demande. Si une période de rétention hors contrat est souvent utilisée, Datadog recommande aux clients de contacter leur responsable de compte pour l'ajouter à leur contrat.

#### Configuration de la durée maximale de session {#max-session-duration-configuration}

Les utilisateurs disposant de l'autorisation `Org Management` peuvent définir une durée maximale de session pour leur organisation. La durée s'applique à toutes les nouvelles sessions web créées après votre modification, pour tous les utilisateurs, quel que soit leur rôle dans l'organisation. Elle ne s'applique pas aux sessions de l'application mobile Datadog.

La durée de session peut être configurée dans les limites suivantes :
- **Durée minimale :** 1 heure
- **Durée maximale :** {{< region-param key=org_management_max_session_duration >}}

{{< img src="account_management/org_settings/max_session_duration.png" alt="Paramètre de durée maximale de session" style="width:70%;" >}}

#### Configuration de la durée de session en cas d'inactivité {#idle-time-session-duration-configuration}

Les utilisateurs disposant de l'autorisation `Org Management` peuvent activer ou désactiver le délai d'expiration de session en cas d'inactivité pour leur organisation. Lorsqu'il est activé, les utilisateurs sont automatiquement déconnectés après 30 minutes d'inactivité. Le paramètre s'applique à toutes les nouvelles sessions web créées après votre modification, et à tous les utilisateurs, quel que soit leur rôle dans l'organisation. Il ne s'applique pas aux sessions de l'application mobile Datadog.

{{< img src="account_management/org_settings/idle_session_timeout.png" alt="Paramètre de délai d'expiration de session en cas d'inactivité" style="width:70%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/users/default_roles/
[2]: /fr/account_management/users/
[3]: /fr/account_management/teams/?s=login%20methods
[4]: /fr/account_management/org_settings/service_accounts
[5]: /fr/account_management/login_methods/
[6]: /fr/account_management/saml/
[7]: /fr/account_management/saml/mapping
[8]: /fr/account_management/api-app-keys/
[9]: /fr/account_management/rbac/
[10]: /fr/remote_configuration#how-it-works
[11]: /fr/account_management/api-app-keys/#client-tokens
[12]: /fr/events/guides/email/
[13]: /fr/synthetics/settings/?tab=specifyvalue#overview
[14]: /fr/account_management/safety_center
[15]: /fr/account_management/org_settings/mobile_third_party_access
[16]: /fr/help/
[17]: /fr/account_management/org_settings/smtp_configuration
[18]: /fr/mcp_server/
[19]: /fr/mcp_server/setup/#required-permissions
[20]: /fr/mcp_server/setup/#adding-oauth-clients