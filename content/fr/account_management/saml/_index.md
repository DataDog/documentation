---
aliases:
- /fr/guides/saml
further_reading:
- link: /account_management/multi_organization/
  tag: Documentation
  text: Configurer des équipes et organisations avec plusieurs comptes
title: Authentification unique avec SAML
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Le site gouvernemental Datadog prend uniquement en charge la connexion via le protocole SAML.</div>
{{< /site-region >}}

## Présentation

En configurant [SAML (Security Assertion Markup Language)][1] pour votre compte Datadog, vos collègues et vous-même pourrez vous connecter à Datadog à l'aide des identifiants stockés dans Active Directory, LDAP ou tout autre magasin d'identités de votre organisation configuré avec un fournisseur d'identité SAML.

**Remarques** : 

- Si SAML n'est pas activé sur votre compte Datadog, contactez l'[assistance][2] pour l'activer.
- Cette documentation part du principe que vous disposez déjà d'un fournisseur d'identité SAML (IdP). Si vous n'avez pas d'IdP SAML, sachez que plusieurs offrent des intégrations avec Datadog, tels que [Active Directory][3], [Auth0][4], [Azure][3], [Google][5], [LastPass][6], [Okta][7] et [SafeNet][8].
- La configuration de SAML nécessite les autorisations [Admin Datadog][9].

## Configurer SAML

1. Pour commencer la configuration, référez-vous à la documentation de votre IdP :

    * [Active Directory][10]
    * [Auth0][11]
    * [Azure][12]
    * [Google][13]
    * [NoPassword][14]
    * [Okta][15]
    * [SafeNet][16]

2. Dans l'application Datadog, passez votre curseur sur votre nom d'utilisateur en bas à gauche et sélectionnez Organization Settings. Sélectionnez [Login Methods][17] et cliquez sur **Configure** sous SAML.

3. Importez les métadonnées IdP depuis votre fournisseur d'identité SAML en cliquant sur le bouton **Choose File**. Une fois le fichier choisi, cliquez sur **Upload File**.

**Remarque :** les métadonnées IdP ne doivent contenir que des caractères ASCII.

4. Téléchargez les [métadonnées de fournisseur de service][18] de Datadog pour configurer votre fournisseur d'identité de façon à ce qu'il identifie Datadog comme fournisseur de service.

5. Après avoir importé les métadonnées IdP et configuré votre fournisseur d'identité, cliquez sur le bouton **Upload and Enable** pour activer SAML dans Datadog.
    {{< img src="account_management/saml/saml_enable.png" alt="Activation de SAML" >}}

6. Après avoir importé les métadonnées IdP, retournez sur la page **Login Methods** et activez SAML par défaut.

7. Une fois SAML configuré dans Datadog et votre fournisseur d'identité prêt à accepter des requêtes de la part de Datadog, les utilisateurs peuvent se connecter :

   - **Si vous utilisez la connexion initiée par le fournisseur de service** (ou la connexion initiée par Datadog) : via la **Single Sign-on URL** (URL de connexion unique) affichée sous le statut en haut de la [page SAML Configuration][19]. La **Single Sign-on URL** est également affichée sur la [page Team][20]. L'accès à cette URL initie une authentification SAML via votre fournisseur d'identité. **Remarque** : si le SAML n'est pas activé sur votre compte ou que vous n'utilisez pas la connexion initiée par le fournisseur de service, aucune URL n'est affichée.
    {{< img src="account_management/saml/saml_enabled.png" alt="SAML activé" >}}

   - **Si vous utilisez la connexion initiée par le fournisseur d'identité** (IdP, ou la connexion initiée depuis votre portail d'applications) : en cliquant sur l'icône de l'application dans votre portail, par exemple dans le menu des applications Google ou le portail Okta. Il est possible que les utilisateurs qui se connectent avec l'URL de connexion initiée par le fournisseur de service puissent également utiliser la connexion initiée par le fournisseur d'identité, mais cela dépend de la configuration et de la compatibilité de votre fournisseur d'identité.

**Remarque** : si vous souhaitez configurer SAML pour un compte multi-org, consultez la section [Gestion des comptes multi-organisations][21].

## Assertions et attributs

Lorsqu'une connexion se produit, une assertion SAML contenant l'autorisation de l'utilisateur est envoyée à Datadog par le fournisseur d'identité.

Points à prendre en compte concernant les assertions :

* Datadog prend en charge la liaison **HTTP-POST** pour **SAML2** :
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`.
* Datadog indique `urn:oasis:names:tc:SAML:1.1:idnom-format:adresseEmail` pour le format de **NameIDPolicy** dans les requêtes d'assertion.
* Les assertions doivent être signées.
* Les assertions peuvent être chiffrées. Les assertions non chiffrées sont néanmoins acceptées.
* Consultez les [métadonnées du fournisseur de service de Datadog][18] pour en savoir plus. Vous devez vous connecter à Datadog pour accéder au fichier.

Des attributs peuvent être inclus dans l'assertion SAML. Datadog recherche trois attributs dans `AttributeStatement` :

  1. **eduPersonPrincipalName** : lorsqu'il est spécifié, doit correspondre au nom d'utilisateur Datadog de l'utilisateur. Le nom d'utilisateur désigne généralement l'adresse e-mail de l'utilisateur.
  2. **sn** : attribut facultatif correspondant au nom de famille de l'utilisateur.
  3. **givenName** : attribut facultatif correspondant au prénom de l'utilisateur.

Datadog s'attend à ce que les attributs respectent le format URI NameFormat `urn:oasis:names:tc:SAML:2.0:nomattr-format:uri` ou le format Basic NameFormat `urn:oasis:names:tc:SAML:2.0:nomattr-format:basic`. Le nom utilisé pour chaque attribut dépend du NameFormat utilisé par votre fournisseur d'identité.

Si votre fournisseur d'identité est configuré sur le format URI NameFormat `urn:oasis:names:tc:SAML:2.0:nomattr-format:uri` :

  1. **eduPersonPrincipalName** : le fournisseur d'identité doit définir `urn:oid:1.3.6.1.4.1.5923.1.1.1.6` comme nom d'attribut.
  2. **sn** : le fournisseur d'identité doit définir `urn:oid:2.5.4.4` comme nom d'attribut.
  3. **givenName** : le fournisseur d'identité doit définir `urn:oid:2.5.4.42` comme nom d'attribut.

Si votre fournisseur d'identité est configuré sur le format Basic NameFormat `urn:oasis:names:tc:SAML:2.0:nomattr-format:basic` :

  1. **eduPersonPrincipalName** : le fournisseur d'identité doit définir  `urn:mace:dir:attribute-def:eduPersonPrincipalName` comme nom d'attribut.
  2. **sn** : le fournisseur d'identité doit définir `urn:mace:dir:attribute-def:sn` comme nom d'attribut.
  3. **givenName** : le fournisseur d'identité doit définir `urn:mace:dir:attribute-def:givenName` comme nom d'attribut.

Si **eduPersonPrincipalName** existe dans AttributeStatement, la valeur de cet attribut est utilisée pour le nom d'utilisateur. Si **eduPersonPrincipalName** n'est pas inclus dans AttributeStatement, le nom d'utilisateur est récupéré à partir de NameID dans Subject. NameID doit suivre le format `urn:oasis:noms:tc:SAML:1.1:idnom-format:adresseEmail`.

Si **sn** et **givenName** sont fournis, ils servent à mettre à jour le nom de l'utilisateur dans son profil Datadog.

## Fonctionnalités supplémentaires

Pour mapper des attributs de la réponse de votre fournisseur d'identité à des rôles et équipes Datadog, consultez la section [Mappage de groupes SAML][22].

Les fonctionnalités suivantes peuvent être activées depuis la [fenêtre de dialogue de configuration SAML][19] :

**Remarque** : vous devez disposer d'autorisations admin pour accéder à la fenêtre de dialogue de configuration SAML.

### Provisionnement juste à temps

Grâce au provisionnement juste à temps, chaque première connexion d'une nouvelle personne entraîne la création d'un utilisateur Datadog. Ainsi, les administrateurs n'ont plus à créer manuellement de comptes individuels, et aucun e-mail d'invitation n'est envoyé.

Certaines organisations ne souhaitent pas inviter l'ensemble de leurs utilisateurs à rejoindre Datadog. Si vous souhaitez modifier le fonctionnement de SAML pour votre compte, contactez l'[assistance Datadog][2]. Si vous souhaitez refuser l'accès d'un utilisateur spécifique à Datadog, votre organisation doit configurer son fournisseur d'identité de façon à ce qu'il n'envoie pas d'assertions à Datadog.

Les administrateurs peuvent définir le rôle par défaut des nouveaux utilisateurs juste à temps. Le rôle **Standard** est attribué par défaut, mais vous pouvez choisir d'ajouter de nouveaux utilisateurs juste à temps avec le rôle **Read-Only**, **Administrator** ou n'importe quel rôle personnalisé.

{{< img src="account_management/saml/saml_jit_default.png" alt="SAML défaut juste à temps" style="width:50%;" >}}

### Connexion initiée par le fournisseur d'identité

Lors du chargement de l'URL Datadog, le navigateur accède au fournisseur d'identité du client, à partir duquel l'utilisateur peut saisir ses identifiants, puis le fournisseur d'identité renvoie l'utilisateur vers le site de Datadog. Certains fournisseurs d'identité peuvent envoyer directement une assertion à Datadog, sans devoir obtenir d'AuthnRequest (Initiation de la connexion par le fournisseur d'identité).

Après avoir activé la fonctionnalité d'initiation de la connexion par le fournisseur d'identité et enregistré votre configuration, vous pouvez télécharger la dernière version des métadonnées du fournisseur de service pour votre fournisseur d'identité. Ces nouvelles métadonnées possèdent un endpoint `AssertionConsumerService` différent, qui est spécifique à votre organisation. Vous devez envoyer les assertions à cet endpoint.

Si vous n'utilisez pas les nouvelles métadonnées de fournisseur de service, Datadog ne pourra pas associer l'assertion à votre organisation et affichera une page d'erreur indiquant qu'il manque l'attribut « InResponseTo » dans la réponse SAML.

### SAML strict

Vous pouvez imposer l'utilisation du SAML au sein de votre organisation en désactivant les autres types de méthodes de connexion dans l'interface **Login Methods**. Lorsque cette option est configurée, tous les utilisateurs doivent, par défaut, se connecter via l'authentification SAML. Les noms et mots de passe existants ou les identifiants Google OAuth ne fonctionnent pas. Avec cette fonctionnalité, vous êtes certain que tous les utilisateurs ayant accès à Datadog utilisent des identifiants valides du fournisseur d'identité ou service d'annuaire de votre entreprise pour se connecter à votre compte Datadog. Les administrateurs d'organisation peuvent définir des [configurations][23] spécifiques à certains utilisateurs afin qu'ils ne soient pas soumis au SAML strict.

### Mise à jour automatique des métadonnées de fournisseur de service Datadog

Certains fournisseurs d'identité (comme Microsoft ADFS) peuvent être configurés de façon à récupérer les dernières métadonnées de fournisseur de service SAML depuis Datadog. Après avoir configuré le SAML dans Datadog, vous pouvez obtenir l'URL de métadonnées de votre organisation depuis la page SAML Configuration. Transmettez cette URL à votre fournisseur d'identité pour récupérer les dernières métadonnées de fournisseur de service chaque fois que des modifications sont publiées.

{{< img src="account_management/saml/saml_metadata_url.png" alt="URL de métadonnées SAML" style="width:50%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://en.wikipedia.org/wiki/Security_Assertion_Markup_Language
[2]: /fr/help/
[3]: https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/auth-saml
[4]: https://auth0.com/docs/protocols/saml-protocol
[5]: https://cloud.google.com/architecture/identity/single-sign-on
[6]: https://support.logmeininc.com/lastpass/help/lastpass-admin-toolkit-using-single-sign-on-sso
[7]: https://developer.okta.com/docs/concepts/saml/
[8]: https://help.safenetid.com/operator/Content/STA/Apps/Apps_SAML.htm
[9]: /fr/account_management/users/default_roles/
[10]: /fr/account_management/saml/activedirectory/
[11]: /fr/account_management/saml/auth0/
[12]: /fr/account_management/saml/azure/
[13]: /fr/account_management/saml/google/
[14]: /fr/account_management/saml/nopassword/
[15]: /fr/account_management/saml/okta/
[16]: /fr/account_management/saml/safenet/
[17]: https://app.datadoghq.com/organization-settings/login-methods
[18]: https://app.datadoghq.com/account/saml/metadata.xml
[19]: https://app.datadoghq.com/saml/saml_setup
[20]: https://app.datadoghq.com/account/team
[21]: /fr/account_management/multi_organization/#setting-up-saml
[22]: /fr/account_management/saml/mapping/
[23]: /fr/account_management/login_methods/#reviewing-user-overrides