---
title: Authentification unique avec SAML
kind: documentation
aliases:
  - /fr/guides/saml
further_reading:
  - link: /account_management/multi_organization/
    tag: Documentation
    text: Configurer des équipes et organisations avec plusieurs comptes
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Le site gouvernemental Datadog prend uniquement en charge la connexion via le protocole SAML.</div>
{{< /site-region >}}

**Cette documentation suppose que vous disposez déjà d’un fournisseur d’identité SAML opérationnel.**

En configuration le protocole [SAML (Security Assertion Markup Language)][1] pour votre compte Datadog, vos collègues et vous-même pourrez vous connecter à Datadog à l’aide des identifiants stockés dans Active Directory, LDAP ou tout autre magasin d’identités de votre organisation configuré avec un fournisseur d’identité SAML.

**Remarque** : si le protocole SAML n'est pas activé sur votre compte Datadog, contactez l'[assistance][2] pour y remédier.

Voici une présentation vidéo de deux minutes à ce sujet :

{{< wistia 2qe33x8h3v >}}

## Configurer SAML

Si vous êtes [administrateur Datadog][3], passez votre curseur sur votre nom d’utilisateur dans le menu de navigation sur la gauche pour afficher l’option [Configure SAML][4] dans le menu déroulant.

{{< img src="account_management/saml/saml_configure.png" alt="SAML - Configuration"  style="width:50%;" >}}

Celle-ci vous redirige vers la page **SAML Single Sign On Configuration** :

1. Importez les métadonnées de votre fournisseur d’identité SAML en cliquant sur le bouton **Choose File**.

    {{< img src="account_management/saml/saml_choose_file.png" alt="SAML - Sélection d'un fichier"  >}}

    Après avoir choisi le fichier, cliquez sur **Upload File**.

2. Téléchargez les [métadonnées de prestataire de services][5] de Datadog pour configurer votre fournisseur d’identité de façon à ce qu’il identifie Datadog comme prestataire de services.

3. Après avoir importé les métadonnées de fournisseur d’identité et configuré votre fournisseur d’identité, cliquez sur le bouton **Enable** pour activer SAML dans Datadog.
{{< img src="account_management/saml/saml_enable.png" alt="SAML - Activation"  >}}

Une fois SAML configuré dans Datadog et votre fournisseur d’identité prêt à accepter des requêtes de la part de Datadog, les utilisateurs peuvent se connecter grâce à la **Single Sign-on URL** figurant dans la section Status en haut de la [page SAML Configuration][4].
{{< img src="account_management/saml/saml_enabled.png" alt="SAML - Activation terminée"  >}}

Cette URL est également fournie sur la [page Team][6]. Le chargement de cette URL initie l'authentification SAML avec votre fournisseur d'identité. **Remarque** : cette URL ne s’affiche pas tant que SAML n’est pas activé pour votre compte.

**Remarque** : si vous souhaitez configurer SAML pour un compte multi-org, consultez la [documentation dédiée][7].

## Mapper des attributs SAML à des rôles Datadog

Les utilisateurs disposant de l'autorisation de gestion des accès peuvent attribuer ou supprimer des rôles Datadog selon les attributs SAML d'un utilisateur :

1. Accédez à Teams et cliquez sur l'onglet Mappings.

2. Cliquez sur le bouton **New Mapping**. 

3. Indiquez la paire key-value du fournisseur d’identité SAML que vous souhaitez associer à un rôle Datadog existant (par défaut ou personnalisé). Par exemple, si vous souhaitez que tous les utilisateurs dont l’attribut `member_of` possède la valeur `Development` soient affectés à un rôle Datadog personnalisé `Devs` : 

    {{< img src="account_management/saml/create_mapping.png" alt="Création d'un mappage SAML pour un rôle Datadog"  >}}

4. Si vous ne l’avez pas déjà fait, activez les mappages en cliquant sur **Enable Mappings**. 

Lorsqu’un utilisateur disposant de l’attribut de fournisseur d’identité spécifié se connecte, il se voit automatiquement attribuer le rôle Datadog. De la même façon, si ce même attribut de fournisseur d’identité est supprimé d’un utilisateur, ce dernier perd ce rôle (sauf si un autre mappage l’ajoute). 

<div class="alert alert-warning">
  <strong>Important :</strong> si un utilisateur ne correspond à <i>aucun</i> mappage, il perd tous les rôles dont il disposait et ne peut plus se connecter à l'organisation avec SAML. Vérifiez bien les définitions de vos mappages. 
</div>

Vous pouvez modifier un mappage en cliquant sur l'icône en forme de crayon, ou le supprimer en cliquant sur l'icône en forme de corbeille. Ces actions affectent uniquement le mappage, et non les attributs du fournisseur d'identité ni les rôles Datadog.

Vous pouvez également créer et modifier des mappages d'attributs SAML avec des rôles Datadog en utilisant l'endpoint `authn_mappings`. Consultez la page sur l'[API de mappage d'attributs d'authentification fédérée à un rôle][8] pour en savoir plus.

## Détails du prestataire de services Datadog

* Datadog prend en charge la liaison **HTTP-POST** pour **SAML2** :
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`.
* Datadog indique `urn:oasis:names:tc:SAML:1.1:idnom-format:adresseEmail` pour le format de **NameIDPolicy** dans les requêtes d'assertion.
* Les assertions doivent être signées.
* Les assertions peuvent être chiffrées. Les assertions non chiffrées sont néanmoins acceptées.
* Consultez [les métadonnées du prestataire de services de Datadog][5].

## Définition des attributs

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

* [Active Directory][9]
* [Auth0][10]
* [Azure][11]
* [Google][12]
* [NoPassword][13]
* [Okta][14]
* [SafeNet][15]

## Fonctionnalités supplémentaires

Les fonctionnalités suivantes peuvent être activées via la [fenêtre de dialogue de configuration SAML][4].

### Provisionnement juste à temps

Grâce au provisionnement juste à temps, chaque première connexion d'un nouvel utilisateur entraîne la création d'un compte Datadog. Ainsi, les administrateurs n'ont plus à créer manuellement de comptes individuels. Dans ce scénario, aucun e-mail d'invitation n'est envoyé.

Certaines organisations ne souhaitent pas inviter l'ensemble de leurs utilisateurs à rejoindre Datadog. Si vous souhaitez modifier le fonctionnement de SAML pour votre compte, contactez l'[assistance Datadog][2]. Si vous souhaitez refuser l'accès d'un utilisateur spécifique à Datadog, votre organisation doit configurer son fournisseur d'identité de façon à ce qu'il n'envoie pas d'assertions à Datadog.

Les administrateurs peuvent définir le rôle par défaut des nouveaux utilisateurs juste à temps. Le rôle attribué par défaut est **Standard**, mais vous pouvez choisir d'ajouter de nouveaux utilisateurs juste à temps avec le rôle **Read-Only** ou même **Administrator**.

{{< img src="account_management/saml/saml_jit_default.png" alt="SAML défaut juste à temps" style="width:50%;" >}}

### Connexion initiée par le fournisseur d'identité

Lors du chargement de l'URL Datadog, le navigateur accède au fournisseur d'identité du client, à partir duquel l'utilisateur peut saisir ses identifiants, puis le fournisseur d'identité revient sur le site de Datadog. Certains fournisseurs d'identité peuvent envoyer directement une assertion à Datadog, sans devoir obtenir d'AuthnRequest (Initiation de la connexion par le fournisseur d'identité).

Après avoir activé la fonctionnalité d'initiation de la connexion par le fournisseur d'identité (et attendu que les caches se vident), vous devez obtenir une nouvelle version des métadonnées de prestataire de services. Ces nouvelles métadonnées possèdent un endpoint AssertionConsumerService différent, qui est spécifique à votre organisation. Vous devez envoyer les assertions à cet endpoint.

Si vous n'utilisez pas les nouvelles métadonnées de prestataire de services, Datadog ne pourra par associer l'assertion à votre organisation et affichera une page d'erreur indiquant qu'il manque l'attribut « InResponseTo » dans la réponse SAML.

### SAML strict

Lorsque le mode Strict de SAML est activé, tous les utilisateurs doivent se connecter via l'authentification SAML. Les noms d'utilisateurs et mots de passe existants ou les identifiants Google OAuth ne fonctionnent pas. Cette fonctionnalité garantit que tous les utilisateurs ayant accès à Datadog utilisent des identifiants valides du fournisseur d'identité ou service d'annuaire de votre entreprise pour se connecter à votre compte Datadog.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://en.wikipedia.org/wiki/Security_Assertion_Markup_Language
[2]: /fr/help/
[3]: /fr/account_management/users/default_roles/
[4]: https://app.datadoghq.com/saml/saml_setup
[5]: https://app.datadoghq.com/account/saml/metadata.xml
[6]: https://app.datadoghq.com/account/team
[7]: /fr/account_management/multi_organization/#setting-up-saml
[8]: /fr/account_management/authn_mapping/
[9]: /fr/account_management/saml/activedirectory/
[10]: /fr/account_management/saml/auth0/
[11]: /fr/account_management/saml/azure/
[12]: /fr/account_management/saml/google/
[13]: /fr/account_management/saml/nopassword/
[14]: /fr/account_management/saml/okta/
[15]: /fr/account_management/saml/safenet/