---
algolia:
  tags:
  - saml
aliases:
- /fr/guides/saml
description: Configurez l'authentification SAML pour Datadog avec des fournisseurs
  d'identité tels qu'Active Directory, Auth0, Google, Okta et Microsoft Entra ID pour
  un accès sécurisé par authentification unique.
further_reading:
- link: /account_management/multi_organization/
  tag: Documentation
  text: Configurer vos équipes et organisations avec plusieurs comptes
title: Authentification unique avec SAML
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le site Datadog pour le gouvernement ne prend en charge que la connexion SAML.</div>
{{< /site-region >}}

## Aperçu {#overview}

En configurant [SAML (Security Assertion Markup Language)][1] pour votre compte Datadog, vos collègues et vous-même pourrez vous connecter à Datadog à l'aide des identifiants stockés dans Active Directory, LDAP ou tout autre magasin d'identités de votre organisation configuré avec un fournisseur d'identité SAML.

**Remarques** : 

{{% site-region region="us,us3,us5,eu,ap1,ap2" %}}
- Si vous n'avez pas SAML activé sur votre compte Datadog, contactez [le support][2] pour l'activer.
{{% /site-region %}}
- Cette documentation suppose que vous disposez déjà d'un fournisseur d'identité SAML (IdP). Si vous n'avez pas d'IdP SAML, plusieurs IdP ont des intégrations avec Datadog, tels que [Active Directory][3], [Auth0][4], [Google][5], [LastPass][6], [Microsoft Entra ID][3], [Okta][7] et [SafeNet][8].
- La configuration SAML nécessite un accès [Administrateur Datadog][9].

## Configuration de SAML {#configuring-saml}

Consultez [Configurer l'authentification unique avec SAML][2] pour les instructions.

## Utilisation de SAML {#using-saml}

Après que SAML a été configuré dans Datadog et que votre IdP a été configuré pour accepter les demandes de Datadog, les utilisateurs peuvent se connecter.

### Connexion initiée par le SP {#sp-initiated-login}

Initiée par le SP, ou Service Provider, signifie que la connexion est initiée depuis Datadog. Les utilisateurs se connectent via le {{< ui >}}Single Sign-on URL{{< /ui >}} affiché dans la boîte de statut en haut de la [page de configuration SAML][4]. Le chargement de cette URL initie une authentification SAML contre votre IdP. **Remarque** : Cette URL n'est affichée que si SAML est activé pour votre compte et que vous utilisez la connexion initiée par le SP.

{{< img src="account_management/saml/saml_enabled_cropped.png" alt="Confirmation que SAML est activé" >}}

Lorsqu'un utilisateur se connecte via SAML initié par le SP et que l'organisation n'a pas de sous-domaine personnalisé, Datadog exige une sécurité supplémentaire. Les utilisateurs reçoivent un code de vérification par e-mail à usage unique qui est requis pour se connecter.

### Connexion initiée par l'IdP {#idp-initiated-login}

Une connexion initiée par l'IdP, ou par le fournisseur d'identité, signifie une connexion initiée depuis votre portail d'application. Les utilisateurs se connectent en cliquant sur l'icône de l'application dans votre portail d'application, par exemple, dans le tiroir d'applications Google ou le portail d'applications Okta. Les utilisateurs d'une connexion initiée par le SP peuvent également être en mesure d'utiliser la connexion initiée par l'IdP, en fonction de la configuration de votre fournisseur d'identité.

## Assertions et attributs {#assertions-and-attributes}

Lorsqu'une connexion se produit, une assertion SAML contenant l'autorisation de l'utilisateur est envoyée à Datadog par le fournisseur d'identité.

### Fonctionnalités {#capabilities}

* Datadog prend en charge la liaison **HTTP-POST** pour **SAML2** :
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`.
* Datadog spécifie `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` pour le format de la **NameIDPolicy** dans les demandes d'assertion.

### Exigences {#requirements}

* Les assertions doivent être signées.
* Les assertions peuvent être chiffrées, mais les assertions non chiffrées sont acceptées.
* Référence [métadonnées du fournisseur de services de Datadog][3] pour plus d'informations. Vous devez être connecté à Datadog pour accéder au fichier.

### Attributs pris en charge {#supported-attributes}

Les attributs peuvent être inclus dans une assertion SAML. Datadog recherche trois attributs dans un `AttributeStatement` :

  1. **eduPersonPrincipalName** : Si spécifié, l'eduPersonPrincipalName doit correspondre au nom d'utilisateur Datadog de l'utilisateur. Le nom d'utilisateur est généralement l'adresse e-mail de l'utilisateur.
  2. **sn** : Ceci est optionnel et doit être défini sur le nom de famille de l'utilisateur.
  3. **givenName** : Ceci est optionnel et doit être défini sur le prénom de l'utilisateur.

<div class="alert alert-info">Pour le fournisseur d'identité Microsoft Entra ID, utilisez l'attribut `surname` au lieu de `sn` dans l'assertion.</div>

Datadog s'attend à ce que les attributs utilisent le format de nom URI `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` ou le format de nom de base `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`. Le nom utilisé pour chaque attribut dépend du format de nom que votre fournisseur d'identité utilise.

Si votre fournisseur d'identité est configuré pour utiliser le format de nom URI `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` :

  1. **eduPersonPrincipalName** : Le fournisseur d'identité doit définir `urn:oid:1.3.6.1.4.1.5923.1.1.1.6` comme le nom de l'attribut.
  2. **sn** : Le fournisseur d'identité doit définir `urn:oid:2.5.4.4` comme le nom de l'attribut.
  3. **givenName** : Le fournisseur d'identité doit définir `urn:oid:2.5.4.42` comme le nom de l'attribut.

Si votre fournisseur d'identité est configuré pour utiliser le format de nom de base `urn:oasis:names:tc:SAML:2.0:attrname-format:basic` :

  1. **eduPersonPrincipalName** : Le fournisseur d'identité doit définir `urn:mace:dir:attribute-def:eduPersonPrincipalName` comme le nom de l'attribut.
  2. **sn** : Le fournisseur d'identité doit définir `urn:mace:dir:attribute-def:sn` comme le nom de l'attribut.
  3. **givenName** : Le fournisseur d'identité doit définir `urn:mace:dir:attribute-def:givenName` comme le nom de l'attribut.

Si **eduPersonPrincipalName** existe dans la déclaration d'attribut, la valeur de cet attribut est utilisée pour le nom d'utilisateur. Si **eduPersonPrincipalName** n'est pas inclus dans la déclaration d'attribut, le nom d'utilisateur est pris à partir du NameID dans le sujet. Le NameID doit utiliser le format `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`.

Si **sn** et **givenName** sont fournis, ils sont utilisés pour mettre à jour le nom de l'utilisateur dans son profil Datadog.

## Fonctionnalités supplémentaires {#additional-features}

Pour mapper les attributs dans la réponse de votre fournisseur d'identité aux rôles et équipes Datadog, voir [mappage de groupe SAML][5].

Les fonctionnalités suivantes peuvent être activées via la [boîte de dialogue de configuration SAML][4] :

**Remarque :** Vous devez avoir des autorisations d'administrateur pour voir la boîte de dialogue de configuration SAML.

### Provisionnement juste à temps (JIT) {#just-in-time-jit-provisioning}

Avec le provisionnement JIT, un utilisateur est créé dans Datadog la première fois qu'il essaie de se connecter. Cela élimine la nécessité pour les administrateurs de créer manuellement des comptes utilisateurs un par un. L'email d'invitation n'est pas envoyé dans ce cas.

Certaines organisations peuvent ne pas vouloir inviter tous leurs utilisateurs à Datadog. Si vous souhaitez apporter des modifications au fonctionnement de SAML pour votre compte, contactez [le support Datadog][2]. Il appartient à l'organisation de configurer son IdP pour ne pas envoyer d'assertions à Datadog si elle ne souhaite pas qu'un utilisateur particulier accède à Datadog.

Les administrateurs peuvent définir le rôle par défaut pour les nouveaux utilisateurs JIT. Le rôle par défaut est {{< ui >}}Standard{{< /ui >}}, mais vous pouvez choisir d'ajouter de nouveaux utilisateurs JIT en tant que {{< ui >}}Read-Only{{< /ui >}}, {{< ui >}}Administrators{{< /ui >}}, ou tout rôle personnalisé.

<div class="alert alert-danger">
  <strong>Important :</strong> Si le mappage des rôles est activé, il a la priorité sur les rôles définis lors du provisionnement JIT. Sans les déclarations d'attribut de groupe appropriées, les utilisateurs pourraient se retrouver sans rôles et perdre l'accès à Datadog. Pour éviter que les utilisateurs ne soient bloqués après le provisionnement JIT, assurez-vous de revoir vos définitions de mappage et de vérifier vos assertions avant d'activer à la fois les Mappages et JIT.
</div>

{{< img src="account_management/saml/saml_jit_default.png" alt="saml JIT par défaut" style="width:50%;" >}}

### Connexion initiée par l'IdP {#idp-initiated-login-1}

Lorsque l'URL de Datadog est chargée, le navigateur est redirigé vers l'IdP du client où l'utilisateur saisit ses identifiants, puis l'IdP redirige vers Datadog. Certains IdP ont la capacité d'envoyer une assertion directement à Datadog sans d'abord obtenir une AuthnRequest (Connexion initiée par l'IdP).

Après avoir activé la fonctionnalité de connexion initiée par l'IdP et enregistré votre configuration, vous pouvez télécharger la dernière version des métadonnées du fournisseur de services (SP) pour votre fournisseur d'identité. Vos nouvelles métadonnées SP contiennent un point de terminaison `AssertionConsumerService` spécifique à l'organisation pour envoyer des assertions.

Si vous n'utilisez pas les nouvelles métadonnées de fournisseur de service, Datadog ne pourra pas associer l'assertion à votre organisation et affichera une page d'erreur indiquant qu'il manque l'attribut « InResponseTo » dans la réponse SAML.

### SAML strict {#saml-strict}

Vous pouvez configurer votre organisation en mode SAML strict en désactivant les autres types de méthodes de connexion dans l'interface {{< ui >}}Login Methods{{< /ui >}}. Lorsque cette option est configurée, tous les utilisateurs doivent, par défaut, se connecter avec SAML. Un nom d'utilisateur et un mot de passe existants, ou une connexion Google OAuth, ne fonctionnent pas. Cela garantit que tous les utilisateurs ayant accès à Datadog doivent disposer d'identifiants valides dans le fournisseur d'identité ou le service d'annuaire de votre entreprise pour accéder à votre compte Datadog. Les administrateurs d'organisation peuvent définir, par utilisateur, des [exceptions][6] pour permettre à certains utilisateurs d'être exemptés du mode SAML strict.

### Métadonnées SP Datadog auto-mises à jour {#self-updating-datadog-sp-metadata}

Certains fournisseurs d'identité (comme ADFS de Microsoft) peuvent être configurés pour extraire les dernières métadonnées du fournisseur de services SAML depuis Datadog. Après avoir configuré SAML dans Datadog, vous pouvez obtenir l'URL des métadonnées pour votre organisation depuis la page de configuration SAML et l'utiliser avec votre fournisseur d'identité pour obtenir les dernières métadonnées du fournisseur de services chaque fois que des modifications sont publiées.

{{< img src="account_management/saml/saml_metadata_url.png" alt="URL des métadonnées SAML" style="width:50%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://en.wikipedia.org/wiki/Security_Assertion_Markup_Language
[2]: /fr/account_management/saml/configuration
[3]: https://app.datadoghq.com/account/saml/metadata.xml
[4]: https://app.datadoghq.com/organization-settings/login-methods/saml
[5]: /fr/account_management/saml/mapping/
[6]: /fr/account_management/login_methods/#reviewing-user-overrides
[7]: https://developer.okta.com/docs/concepts/saml/
[8]: https://thalesdocs.com/sta/operator/applications/apps_saml/index.html
[9]: /fr/account_management/users/default_roles/