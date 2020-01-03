---
title: Authentification unique avec SAML
kind: documentation
aliases:
  - /fr/guides/saml
further_reading:
  - link: account_management/multi_organization
    tag: Documentation
    text: Configurer des équipes et organisations avec plusieurs comptes
---
**Cette documentation suppose que vous disposez déjà d'un fournisseur d'identité SAML opérationnel.**

En configurant [SAML (Security Assertion Markup Language)][1] pour votre compte Datadog, vos collègues et vous-même pourrez vous connecter à Datadog à l'aide des identifiants stockés dans Active Directory, LDAP ou tout autre magasin d'identités de votre organisation configuré avec un fournisseur d'identité SAML.

**Remarque** : si SAML n'est pas activé sur votre compte Datadog, contactez l'[assistance][2] pour l'activer.

Voici une présentation vidéo de deux minutes à ce sujet :

{{< wistia 2qe33x8h3v >}}

## Configurer SAML

Si vous êtes [administrateur Datadog][3], passez votre curseur sur votre nom d'utilisateur dans le menu de navigation sur la gauche pour afficher l'option [Configure SAML][4] dans le menu déroulant.

{{< img src="account_management/saml/saml_configure.png" alt="SAML configuration"  style="width:50%;" >}}

Celle-ci vous redirige vers la page **SAML Signle Sign On Configuration** :

1.  Importez les métadonnées de fournisseur d'identité depuis votre fournisseur d'identité SAML en cliquant sur le bouton **Choose File**.

    {{< img src="account_management/saml/saml_choose_file.png" alt="SAML sélection fichier"  >}}

    Après avoir choisi le fichier, cliquez sur **Upload File**.

2. Téléchargez les [métadonnées de prestataire de services][5] de Datadog pour configurer votre fournisseur d'identité de façon à ce qu'il identifie Datadog comme prestataire de services.

3. Après avoir importé les métadonnées de fournisseur d'identité et configuré votre fournisseur d'identité, cliquez sur le bouton **Enable** pour activer SAML dans Datadog.
{{< img src="account_management/saml/saml_enable.png" alt="SAML activation"  >}}

Une fois SAML configuré dans Datadog et votre fournisseur d'identité prêt à accepter des requêtes de la part de Datadog, les utilisateurs peuvent se connecter grâce à la **Single Sign-on URL** figurant dans la section Status en haut de la [page SAML Configuration][4].
{{< img src="account_management/saml/saml_enables.png" alt="SAML activé" response="true">}}

Cette URL est également fournie sur la [page Team][6]. Cliquez dessus pour initier l'authentification SAML avec votre fournisseur d'identité. **Remarque** : cette URL ne s'affiche pas tant que SAML n'est pas activé pour votre compte.

**Remarque** : si vous souhaitez configurer SAML pour un compte multi-org, consultez la [documentation dédiée][7].

## Détails du prestataire de services de Datadog

* Datadog prend en charge la liaison **HTTP-POST** pour **SAML2** :
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`.
* Datadog indique `urn:oasis:names:tc:SAML:1.1:idnom-format:adresseEmail` pour le format de **NameIDPolicy** dans les requêtes d'assertion.
* Les assertions doivent être signées.
* Les assertions peuvent être chiffrées. Les assertions non chiffrées sont néanmoins acceptées.
* Consultez [les métadonnées du prestataire de services de Datadog][5].

## Définir des attributs

Des attributs peuvent être inclus dans l'assertion. Datadog analyse trois attributs dans AttributeStatement :

  1. **eduPersonPrincipalName** : lorsqu'il est spécifié, il doit correspondre au nom d'utilisateur Datadog de l'utilisateur. Le nom d'utilisateur désigne généralement l'adresse e-mail de l'utilisateur.
  2. **sn** : attribut optionnel correspondant au nom de famille de l'utilisateur.
  3. **givenName** : attribut optionnel correspondant au prénom de l'utilisateur.

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

## Fournisseur d'identité SAML spécifique

Pour en savoir plus sur la configuration d'un fournisseur d'identité spécifique, consultez la documentation suivante :

* [Active Directory][8]
* [Auth0][9]
* [Azure][10]
* [Google][11]
* [NoPassword][12]
* [Okta][13]
* [SafeNet][14]

## Fonctionnalités supplémentaires

Les fonctionnalités suivantes peuvent être activées via la [fenêtre de dialogue de configuration SAML][4].

### Approvisionnement juste à temps

Grâce à l'approvisionnement juste à temps, chaque première connexion d'un nouvel utilisateur entraîne la création d'un compte Datadog. Ainsi, les administrateurs n'ont plus à créer manuellement de comptes individuels.

Certaines organisations ne souhaitent pas inviter l'ensemble de leurs utilisateurs à rejoindre Datadog. Si vous souhaitez modifier le fonctionnement de SAML pour votre compte, contactez l'[assistance Datadog][2]. Si vous souhaitez refuser l'accès d'un utilisateur spécifique à Datadog, votre organisation doit configurer son fournisseur d'identité de façon à ce qu'il n'envoie pas d'assertions à Datadog.

Les administrateurs peuvent définir le rôle par défaut des nouveaux utilisateurs « juste à temps ». Le rôle par défaut attribué est **Standard**, mais vous pouvez choisir d'ajouter de nouveaux utilisateurs « juste à temps » avec le rôle **Read-Only** ou même **Administrator**.

{{< img src="account_management/saml/saml_jit_default.png" alt="SAML défaut juste à temps"  style="width:50%;" >}}

### Initiation de la connexion par le fournisseur d'identité

Lors du chargement de l'URL Datadog, le navigateur accède au fournisseur d'identité du client, à partir duquel l'utilisateur peut saisir ses identifiants, puis le fournisseur d'identité revient sur le site de Datadog. Certains fournisseurs d'identité peuvent envoyer directement une assertion à Datadog, sans devoir obtenir d'AuthnRequest (Initiation de la connexion par le fournisseur d'identité).

Après avoir activé la fonctionnalité d'initiation de la connexion par le fournisseur d'identité (et attendu que les caches se vident), vous devez obtenir une nouvelle version des métadonnées de prestataire de services. Ces nouvelles métadonnées possèdent un endpoint AssertionConsumerService différent, qui est spécifique à votre organisation. Vous devez envoyer les assertions à cet endpoint.

Si vous n'utilisez pas les nouvelles métadonnées de prestataire de services, Datadog ne pourra par associer l'assertion à votre organisation et affichera une page d'erreur indiquant qu'il manque l'attribut « InResponseTo » dans la réponse SAML.

### SAML Strict

Lorsque le mode SAML Strict est activé, tous les utilisateurs doivent se connecter via l'authentification SAML. Les noms d'utilisateurs et mots de passe existants ou les identifiants Google OAuth ne fonctionnent pas. Cette fonctionnalité garantit que tous les utilisateurs ayant accès à Datadog utilisent des identifiants valides du fournisseur d'identité ou service d'annuaire de votre entreprise pour se connecter à votre compte Datadog.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://en.wikipedia.org/wiki/Security_Assertion_Markup_Language
[2]: /fr/help
[3]: /fr/account_management/team/#datadog-user-roles
[4]: https://app.datadoghq.com/saml/saml_setup
[5]: https://app.datadoghq.com/account/saml/metadata.xml
[6]: https://app.datadoghq.com/account/team
[7]: /fr/account_management/multi_organization#setting-up-saml
[8]: /fr/account_management/saml/activedirectory
[9]: /fr/account_management/saml/auth0
[10]: /fr/account_management/saml/azure
[11]: /fr/account_management/saml/google
[12]: /fr/account_management/saml/nopassword
[13]: /fr/account_management/saml/okta
[14]: /fr/account_management/saml/safenet