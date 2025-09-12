---
algolia:
  tags:
  - saml
aliases:
- /fr/guides/saml
further_reading:
- link: /account_management/multi_organization/
  tag: Documentation
  text: Configurer des équipes et organisations avec plusieurs comptes
title: Authentification unique avec SAML
---
{{< site-region region="gov" >}}
<div class='alert alert-warning'>Le site Datadog for Government ne prend en charge que la connexion SAML.</div>
{{< /site-region >}}

## Présentation

Configurer [SAML (Security Assertion Markup Language)][1] pour votre compte Datadog vous permet, à vous et à votre équipe, de vous connecter à Datadog à l'aide des identifiants stockés dans l'Active Directory de votre organisation, un annuaire LDAP ou tout autre service d'identité configuré avec un fournisseur d'identité SAML.

**Remarques** : 

{{% site-region region="us,us3,us5,eu,ap1,ap2" %}}
- Si vous n'avez pas activé SAML sur votre compte Datadog, contactez l'[assistance][2] pour l'activer.
- Cette documentation suppose que vous disposez déjà d'un fournisseur d'identité SAML (IdP). Si ce n'est pas le cas, plusieurs fournisseurs proposent des intégrations avec Datadog, notamment [Active Directory][3], [Auth0][4], [Google][5], [LastPass][6], [Microsoft Entra ID][3], [Okta][7] et [SafeNet][8].
- La configuration de SAML requiert un accès [Administrateur Datadog][9].
{{% /site-region %}}

{{% site-region region="gov" %}}
- Cette documentation suppose que vous disposez déjà d'un fournisseur d'identité SAML (IdP). Si ce n'est pas le cas, plusieurs fournisseurs proposent des intégrations avec Datadog, notamment [Active Directory][3], [Auth0][4], [Google][5], [LastPass][6], [Microsoft Entra ID][3], [Okta][7] et [SafeNet][8].
- La configuration de SAML requiert un accès [Administrateur Datadog][9].
{{% /site-region %}}

## Configuration de SAML

1. Pour commencer la configuration, consultez la documentation de votre IdP :

    * [Active Directory][10]
    * [Auth0][11]
    * [Google][13]
    * [Microsoft Entra ID][12]
    * [NoPassword][14]
    * [Okta][15]
    * [SafeNet][16]

2. Dans l'application Datadog, survolez votre nom d'utilisateur dans le coin inférieur gauche et sélectionnez « Organization Settings ». Sélectionnez [Login Methods][17], puis cliquez sur **Configure** sous SAML.

3. Téléversez les métadonnées de votre fournisseur d'identité SAML en cliquant sur le bouton **Choose File**. Une fois le fichier sélectionné, cliquez sur **Upload File**.

**Remarque :** les métadonnées IdP doivent contenir uniquement des caractères ASCII.

4. Téléchargez les [métadonnées du fournisseur de services Datadog][18] pour configurer votre IdP afin qu'il reconnaisse Datadog en tant que fournisseur de services.

5. Une fois les métadonnées IdP téléversées et votre IdP configuré, activez SAML dans Datadog en cliquant sur le bouton **Téléverser et activer**. 
    {{< img src="account_management/saml/saml_enable_cropped.png" alt="Configurer SAML en téléversant les métadonnées IdP" >}}

6. Après avoir téléversé les métadonnées IdP, retournez à la page **Login methods** et activez SAML `on` par défaut.

**Remarque :** pour configurer SAML dans une organisation multi-comptes, consultez la section [Gestion des comptes multi-organisations][21].

## Utilisation de SAML

Une fois SAML configuré dans Datadog et votre IdP prêt à accepter les requêtes de Datadog, les utilisateurs peuvent se connecter.

### Connexion initiée par le fournisseur de services (SP)

Une connexion initiée par le SP signifie que l'utilisateur commence la connexion depuis Datadog. Il se connecte via l'**URL de connexion SSO** affichée dans l'encadré d'état en haut de la [page de configuration SAML][19]. L'**URL de connexion SSO** est également affichée sur la [page Équipe][20]. Le chargement de cette URL lance une authentification SAML auprès de votre IdP. **Remarque :** cette URL n'apparaît que si SAML est activé sur votre compte et que vous utilisez la connexion initiée par le SP.

{{< img src="account_management/saml/saml_enabled_cropped.png" alt="Confirmation que SAML est activé" >}}

Lorsqu'un utilisateur se connecte via SAML initié par le SP et que l'organisation n'a pas de sous-domaine personnalisé, Datadog exige une sécurité supplémentaire. Un code de vérification unique est envoyé par e-mail et doit être saisi pour finaliser la connexion.

### Connexion initiée par l'IdP

Une connexion initiée par l'IdP signifie que l'utilisateur commence la connexion depuis le portail applicatif de son IdP. Il se connecte en cliquant sur l'icône de l'application dans son portail, par exemple dans le lanceur d'applications Google ou le portail Okta. Les utilisateurs ayant accès à la connexion initiée par le SP peuvent également utiliser la connexion initiée par l'IdP, selon la configuration de votre fournisseur d'identité.

## Assertions et attributs

Lorsqu'un utilisateur se connecte, une assertion SAML contenant ses informations d'autorisation est envoyée du fournisseur d'identité à Datadog.

### Fonctionnalités

* Datadog prend en charge la liaison **HTTP-POST** pour **SAML2** : 
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`.
* Datadog spécifie le format suivant pour la **NameIDPolicy** dans les requêtes d'assertion : `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`.

### Exigences

* Les assertions doivent être signées.
* Les assertions peuvent être chiffrées, mais les assertions non chiffrées sont également acceptées.
* Consultez les [métadonnées du fournisseur de services Datadog][18] pour plus d'informations. Vous devez être connecté à Datadog pour accéder à ce fichier.

### Attributs pris en charge

Certains attributs peuvent être inclus dans une assertion SAML. Datadog attend trois attributs dans un `AttributeStatement` :

  1. **eduPersonPrincipalName** : s'il est spécifié, cet attribut doit correspondre au nom d'utilisateur Datadog. Il s'agit en général de l'adresse e-mail de l'utilisateur.
  2. **sn** : attribut optionnel correspondant au nom de famille de l'utilisateur.
  3. **givenName**: attribut optionnel correspondant au prénom de l'utilisateur ou son nom attribué.

<div class='alert alert-info'>Pour le fournisseur Microsoft Entra ID, utilisez l'attribut `surname` à la place de `sn` dans l'assertion.</div>

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

<div class='alert alert-warning'>
  <strong>Important :</strong> si le mappage des rôles est activé, il prend le pas sur les rôles définis lors du provisioning JIT. Sans déclarations d'attributs de groupe appropriées, les utilisateurs risquent de ne se voir attribuer aucun rôle et de perdre l'accès à Datadog. Pour éviter qu'un utilisateur soit bloqué après le provisioning JIT, veillez à revoir vos définitions de mappage et à vérifier vos assertions avant d'activer à la fois les mappages et le provisioning JIT.
</div>

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
[3]: https://learn.microsoft.com/en-us/entra/architecture/auth-saml
[4]: https://auth0.com/docs/protocols/saml-protocol
[5]: https://cloud.google.com/architecture/identity/single-sign-on
[6]: https://support.logmeininc.com/lastpass/help/lastpass-admin-toolkit-using-single-sign-on-sso
[7]: https://developer.okta.com/docs/concepts/saml/
[8]: https://thalesdocs.com/sta/operator/applications/apps_saml/index.html
[9]: /fr/account_management/users/default_roles/
[10]: /fr/account_management/saml/activedirectory/
[11]: /fr/account_management/saml/auth0/
[12]: /fr/account_management/saml/entra/
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