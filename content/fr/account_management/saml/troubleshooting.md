---
description: Résoudre les problèmes SAML pour votre compte Datadog
further_reading:
- link: https://www.samltool.com/online_tools.php
  tag: Outils de développement
  text: Identifier vos assertions avec des outils de développement SAML
kind: documentation
title: Dépannage SAML
---

## Présentation

Cette page contient des instructions de dépannage pour les erreurs courantes associées à l'authentification Security Assertion Markup Language (SAML).

## Erreurs courantes

Si l'un des messages d'erreur de la liste suivante s'affiche, cela indique potentiellement un problème de configuration de vos mappages dans Datadog ou de configuration de votre fournisseur d'identité.

- `SAML is not enabled for this org`
- `Arf. Unknown User`
- `There are No Authn Mappings for this User`
- `Assertion could not be validated`
- `SAML NO HANDLE ERROR`
- `No active account for a user`

Pour corriger chaque erreur, consultez ci-dessous la rubrique associée.

### SAML n'est pas activé pour cette organisation

SAML est désactivé pour votre compte. Accédez à [Login Methods][1]. Dans la section SAML, vérifiez que l'option **Enabled by Default** est définie sur **On**.

**Remarque** : pour configurer SAML, il est nécessaire de disposer du rôle Admin Datadog ou de l'autorisation de gestion de l'organisation (`org_management`).

### There are no authn mappings for this user

La configuration de vos mappages dans Datadog ne correspond pas à celle de votre fournisseur d'identité. Consultez la rubrique [Erreurs concernant les rôles](#erreurs-concernant-les-roles) pour en savoir plus.

### Assertion could not be validated

Lorsque vous activez l'initiation de la connexion par le fournisseur d'identité dans Datadog, il est possible que les [URL Assertion Consumer Service (ACS)][2] de la configuration de votre fournisseur d'identité ne soient pas correctes, ou que vos assertions ne soient pas signées. Pour en savoir plus, consultez la rubrique [Assertions et attributs][3].

### SAML no handle error

Il est possible que votre assertion ne contienne pas l'attribut obligatoire `eduPersonPrincipalName`. Vérifiez que vous avez bien défini cet attribut dans votre configuration. Pour en savoir plus, consultez la rubrique [Assertions et attributs][3].

### No active account for a user

Cette erreur peut être causée par l'un des scénarios suivants :
  - Si vous avez activé le provisionnement juste à temps et qu'un utilisateur continue de recevoir cette erreur lorsqu'il tente de se connecter, vérifiez si vous avez déjà envoyé une invitation par e-mail à cet utilisateur avant l'activation du provisionnement juste à temps. Le provisionnement juste à temps ne s'applique pas aux utilisateurs qui ont déjà reçu une invitation. Pour résoudre ce problème, demandez à l'utilisateur d'accepter l'invitation par e-mail ou, si l'invitation a expiré, demandez à l'administrateur d'envoyer une nouvelle invitation.
  - Si un utilisateur n'est plus activé dans une organisation Datadog pour laquelle le provisionnement juste à temps a été activé, et qu'il tente de se reconnecter via SAML et reçoit l'erreur `There is no active account for error`, vous devez réactiver l'utilisateur depuis la page [User Settings][4].

## Erreurs concernant des fichiers de métadonnées de fournisseur d'identité

Si vous ne parvenez pas à modifier le fichier de métadonnées de votre fournisseur d'identité, vérifiez que le fichier que vous essayez d'importer est valide.

Pour valider votre fichier de métadonnées :

1. Choisissez un outil de validation SAML, tel que l'[outil de développement SAML][5] de OneLogin.
2. Collez vos métadonnées dans le champ XML et sélectionnez **Metadata** dans le champ XSD (schema file).
3. Cliquez sur **Validate XML With the XSD Schema**.

## Erreurs concernant les rôles

Lors de l'activation des mappages, les utilisateurs qui se connectent à un compte Datadog via SAML perdent définitivement leurs rôles actuels. Datadog leur attribue de nouveaux rôles en fonction des informations associées à l'assertion SAML transmise par votre fournisseur d'identité.

Les utilisateurs qui se connectent via SAML et dont les valeurs ne correspondent à aucun rôle Datadog perdent définitivement tous leurs rôles. Ils ne peuvent plus se connecter.

{{< img src="account_management/saml/unknown_user_error.png" alt="Aucun AuthNMapping pour cet utilisateur" style="width:80%;">}}

Si vous avez défini des mappages de groupe et que vous ne parvenez pas à voir vos rôles, il est possible que les mappages de l'application Datadog diffèrent de ceux du fournisseur d'identité. Pour vérifier si c'est le cas, procédez comme suit :

1. Récupérez l'assertion SAML de votre fournisseur d'identité pour votre compte. Utilisez des outils de votre navigateur, comme des [extensions][6], pour récupérer votre assertion SAML. Exemple :

  ```xml
  <saml2:Attribute Name="member_of"
                             NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified"
                             >
                <saml2:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema"
                                      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                                      xsi:type="xs:string"
                                      >name_of_your_group_goes_here</saml2:AttributeValue>
  </saml2:Attribute>
  ```

2. Accédez à votre profil et sélectionnez **Organization Settings** dans le coin inférieur gauche de Datadog.
3. Sélectionnez [**SAML Group Mappings**][7].
4. Comparez les attributs fournis par votre fournisseur d'identité dans votre assertion SAML aux attributs définis dans l'onglet [**SAML Group Mappings**][7].

  {{< img src="account_management/saml/saml_mappings_example.png" alt="Mappages SAML dans Datadog" style="width:80%;">}}

5. Corrigez toutes les différences dans les paramètres SAML Group Mappings de Datadog ou dans les paramètres de votre fournisseur d'identité. Par exemple, si l'attribut `memberof` est défini dans Datadog, et qu'il est défini sous `member_Of` dans votre assertion SAML, harmonisez cet attribut.

Des différences peuvent également découler d'une erreur ou d'une absence de correspondance entre la clé et la valeur de l'attribut. Par exemple, si les paramètres **SAML Group Mappings** contiennent une paire clé/valeur composée de `memberOf` et de `nom_de_votre_groupe_ici`, cette paire n'est pas incluse dans l'assertion envoyée par votre fournisseur d'identité, ce qui s'avère problématique.

Si vous ne parvenez pas à vous connecter en raison d'une erreur basée sur un rôle, contactez votre administrateur pour suivre la procédure ci-dessus.

**Remarques** :

- Chaque fournisseur d'identité propose différents types d'attributs et différentes manières de les définir. Par exemple, Azure utilise des [ID d'objet][8] pour ses attributs. Si vous utilisez Okta, vous devez définir les attributs dans les [paramètres Okta][9]. Consultez la documentation relative aux attributs de votre fournisseur d'identité pour en savoir plus.

- Lorsque vous désactivez les **mappings de groupe SAML**, les utilisateurs peuvent se connecter via SAML et ne perdent pas les rôles qui leur ont été attribués, même si leur appartenance au groupe a été modifié au sein de votre fournisseur d'identité.

## Erreurs concernant le fournisseur d'identité

Si vous recevez une erreur de la part de votre fournisseur d'identité (Google, Active Directory, Azure, Okta, etc) :

- Si vous rencontrez un problème dans la console d'administration de Google, consultez la section [Messages d'erreur liés aux applications SAML][10].
- Si vous rencontrez un problème dans Active Directory, consultez la section [Déboguer une authentification unique SAML pour des applications][11] de la documentation Azure Active Directory.
- Si vous rencontrez un problème dans AuthO, consultez la section [Résoudre les problèmes de configuration SAML][12] (en anglais).
- Si vous rencontrez un problème dans Azure, consultez la section [Une page d'application affiche un message d'erreur une fois que l'utilisateur est connecté][13].
- Si vous rencontrez un problème dans Google, consultez la section [Application cloud Datadog][14].
- Si vous rencontrez un problème dans Okta, consultez la section [Erreur 404 lors d'une tentative de connexion à l'application][16] (en anglais).
- Si vous rencontrez un problème dans SafeNet, consultez la section [SafeNet Trusted Access pour Datadog][17] (en anglais).

### Certificats de fournisseur d'identité

Si vous ne parvenez pas à vous connecter à votre compte, il est possible qu'un certificat de fournisseur d'identité ait expiré ou ait été remplacé, ce qui génère une erreur SAML générale.

Les questions suivantes vous aident à déterminer si votre problème est causé par un certificat :

- Êtes-vous le seul à ne pas pouvoir vous connecter à votre compte ? Si le problème de connexion concerne plusieurs comptes, il est possible qu'un certificat basé sur un fournisseur d'identité ait expiré ou ait été remplacé.
- Votre configuration SAML a-t-elle récemment été modifiée ?
- Si vos utilisateurs utilisent plusieurs fournisseurs d'identité, le problème de connexion s'applique-t-il à tous les fournisseurs ou à un en particulier ?
- Avez-vous récemment activé les [**mappages de groupe SAML**](#erreurs-concernant-les-roles) ?

Pour résoudre votre problème, vérifiez que les certificats de fournisseur d'identité sont à jour dans les paramètres de votre fournisseur d'identité. Assurez-vous également que vous avez importé le plus récent fichier de métadonnées de votre fournisseur d'identité dans Datadog.

## Assistance

Si vous ne parvenez toujours pas à vous connecter à Datadog, contactez [l'assistance Datadog][18].

Dans votre message, ajoutez un enregistrement d'écran illustrant votre processus de connexion et les réponses aux questions suivantes :

- Êtes-vous le seul à ne pas pouvoir vous connecter à votre compte, ou tous les utilisateurs sont-ils concernés par le problème ?
- À quelle organisation essayez-vous de vous connecter ? Quelle est la méthode de connexion que vous utilisez ?

Avant de contacter l'assistance Datadog, discutez avec votre administrateur. Vous devrez peut-être également contacter votre fournisseur d'identité pour résoudre les problèmes de connexion.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/login-methods
[2]: https://app.datadoghq.com/organization-settings/login-methods/saml
[3]: https://docs.datadoghq.com/fr/account_management/saml/#assertions-and-attributes
[4]: https://app.datadoghq.com/organization-settings/users
[5]: https://www.samltool.com/validate_xml.php
[6]: https://www.samltool.com/saml_tools.php
[7]: https://app.datadoghq.com/organization-settings/mappings
[8]: https://docs.microsoft.com/en-us/azure/active-directory/cloud-sync/concept-attributes#attributes-and-expressions
[9]: https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-about-attribute-mappings.htm
[10]: https://support.google.com/a/answer/6301076
[11]: https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/debug-saml-sso-issues
[12]: https://auth0.com/docs/troubleshoot/troubleshoot-authentication/troubleshoot-saml-configurations
[13]: https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/application-sign-in-problem-application-error
[14]: https://support.google.com/a/answer/7553768
[16]: https://support.okta.com/help/s/article/Receiving-404-error-when-attempting-to-sign-into-application?language=en_US
[17]: https://resources.safenetid.com/help/Datadog/Index.htm
[18]: https://www.datadoghq.com/support/