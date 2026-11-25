---
algolia:
  tags:
  - saml
aliases:
- /fr/guides/saml
description: Configurez l'authentification SAML pour Datadog avec des fournisseurs
  d'identité tels qu'Active Directory, Auth0, Google, Okta et Microsoft Entra ID pour
  une authentification unique sécurisée.
further_reading:
- link: /account_management/multi_organization/
  tag: Documentation
  text: Configurer vos équipes et organisations avec plusieurs comptes
title: Authentification unique avec SAML
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le site Datadog for Government prend uniquement en charge la connexion SAML.</div>
{{< /site-region >}}

## Présentation {#overview}

Configurer [SAML (Security Assertion Markup Language)][1] pour votre compte Datadog vous permet, à vous et à tous vos collaborateurs, de vous connecter à Datadog en utilisant les identifiants stockés dans l'Active Directory, LDAP ou tout autre magasin d'identités de votre organisation ayant été configuré avec un fournisseur d'identité SAML.

**Remarques** : 

{{% site-region region="us,us3,us5,eu,ap1,ap2,uk1" %}}
- Si SAML n'est pas activé sur votre compte Datadog, contactez le [support][10] pour l'activer.
{{% /site-region %}}
- Cette documentation suppose que vous disposez déjà d'un fournisseur d'identité (IdP) SAML. Si vous ne disposez pas d'un IdP SAML, il existe plusieurs IdP qui proposent des intégrations avec Datadog, tels que [Active Directory][3], [Auth0][4], [Google][5], [LastPass][6], [Microsoft Entra ID][3], [Okta][7] et [SafeNet][8].
- La configuration SAML nécessite un accès [Datadog Administrator][9].

## Configuration de SAML {#configuring-saml}

Consultez [Configurer l'authentification unique avec SAML][2] pour obtenir des instructions.

## Utilisation de SAML {#using-saml}

Une fois SAML configuré dans Datadog et votre IdP paramétré pour accepter les requêtes de Datadog, les utilisateurs peuvent se connecter.

### Connexion initiée par le fournisseur de services (SP) {#sp-initiated-login}

Une connexion initiée par le SP, ou fournisseur de services, signifie que la connexion est initiée depuis Datadog. Les utilisateurs se connectent via l'{{< ui >}}Single Sign-on URL{{< /ui >}} affiché dans la zone d'état en haut de la [page de configuration SAML][4]. Le chargement de cette URL initie une authentification SAML auprès de votre IdP. **Remarque** : Cette URL ne s'affiche que si SAML est activé pour votre compte et que vous utilisez une connexion initiée par le SP.

{{< img src="account_management/saml/saml_enabled_cropped.png" alt="Confirmation que SAML est activé" >}}

Lorsqu'un utilisateur se connecte via SAML initié par le SP et que l'organisation ne dispose pas d'un sous-domaine personnalisé, Datadog exige une sécurité supplémentaire. Les utilisateurs reçoivent un code de vérification par e-mail à usage unique qui est requis pour se connecter.

### Connexion initiée par l’IdP {#idp-initiated-login}

Une connexion initiée par le fournisseur d'identité (IdP) signifie que la connexion est lancée depuis votre portail d'applications. Les utilisateurs se connectent en cliquant sur l'icône de l'application dans votre portail d'applications, par exemple dans le Google App drawer ou l'Okta App Portal. Les utilisateurs de la connexion initiée par le fournisseur de services (SP) peuvent également utiliser la connexion initiée par l’IdP, selon la configuration de leur fournisseur d’identité.

## Assertions et attributs {#assertions-and-attributes}

Lorsqu'une connexion se produit, une assertion SAML contenant l'autorisation de l'utilisateur est envoyée du fournisseur d'identité à Datadog.

### Fonctionnalités {#capabilities}

* Datadog prend en charge la liaison **HTTP-POST** pour **SAML2** :
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`.
* Datadog spécifie `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` pour le format du **NameIDPolicy** dans les demandes d'assertion.

### Prérequis {#requirements}

* Les assertions doivent être signées.
* Les assertions peuvent être chiffrées, mais les assertions non chiffrées sont acceptées.
* Consultez les [métadonnées du fournisseur de services de Datadog][3] pour plus d'informations. Vous devez être connecté à Datadog pour accéder au fichier.

### Attributs pris en charge {#supported-attributes}

Des attributs peuvent être inclus dans une assertion SAML. Datadog recherche trois attributs dans une `AttributeStatement` :

  1. **eduPersonPrincipalName** : S'il est spécifié, l'eduPersonPrincipalName doit correspondre au nom d'utilisateur Datadog de l'utilisateur. Le nom d'utilisateur est généralement l'adresse e-mail de l'utilisateur.
  2. **sn** : Ceci est facultatif et doit être défini sur le nom de famille de l'utilisateur.
  3. **givenName** : ce champ est facultatif et devrait correspondre au prénom de l'utilisateur.

<div class="alert alert-info">Pour l'IdP Microsoft Entra ID, utilisez l'attribut <code>surname</code> au lieu de <code>sn</code> dans l'assertion.</div>

Datadog s'attend à ce que les attributs utilisent le NameFormat URI `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` ou le NameFormat Basic `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`. Le nom utilisé pour chaque attribut dépend du NameFormat que votre IdP utilise.

Si votre IdP est configuré pour utiliser le NameFormat URI `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` :

  1. **eduPersonPrincipalName** : l'IdP doit définir `urn:oid:1.3.6.1.4.1.5923.1.1.1.6` comme nom de l'attribut.
  2. **sn** : l'IdP doit définir `urn:oid:2.5.4.4` comme nom de l'attribut.
  3. **givenName** : l'IdP doit définir `urn:oid:2.5.4.42` comme nom de l'attribut.

Si votre IdP est configuré pour utiliser le NameFormat Basic `urn:oasis:names:tc:SAML:2.0:attrname-format:basic` :

  1. **eduPersonPrincipalName** : l'IdP doit définir `urn:mace:dir:attribute-def:eduPersonPrincipalName` comme nom de l'attribut.
  2. **sn** : l'IdP doit définir `urn:mace:dir:attribute-def:sn` comme nom de l'attribut.
  3. **givenName** : l'IdP doit définir `urn:mace:dir:attribute-def:givenName` comme nom de l'attribut.

Si **eduPersonPrincipalName** existe dans l'AttributeStatement, la valeur de cet attribut est utilisée pour le nom d'utilisateur. Si **eduPersonPrincipalName** n'est pas inclus dans l'AttributeStatement, le nom d'utilisateur est extrait du NameID dans le Subject. Le NameID doit utiliser le format `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`.

Si **sn** et **givenName** sont fournis, ils sont utilisés pour mettre à jour le nom de l'utilisateur dans son profil Datadog.

## Fonctionnalités supplémentaires {#additional-features}

Pour mapper les attributs de la réponse de votre fournisseur d'identité aux rôles et aux Teams Datadog, consultez [le mappage des groupes SAML][5].

Les fonctionnalités suivantes peuvent être activées via la [boîte de dialogue SAML Configuration][4] :

**Remarque :** vous devez disposer des autorisations d'administrateur pour voir la boîte de dialogue SAML Configuration.

### Provisionnement juste-à-temps (JIT) {#just-in-time-jit-provisioning}

Avec le provisionnement JIT, un utilisateur est créé dans Datadog la première fois qu'il tente de se connecter. Cela évite aux administrateurs de devoir créer manuellement les comptes utilisateur un par un. L'e-mail d'invitation n'est pas envoyé dans ce cas.

Certaines organisations peuvent ne pas vouloir inviter tous leurs utilisateurs sur Datadog. Si vous souhaitez apporter des modifications au fonctionnement de SAML pour votre compte, contactez le [support Datadog][10]. Il appartient à l'organisation de configurer son IdP pour qu'il n'envoie pas d'assertions à Datadog si elle ne souhaite pas qu'un utilisateur particulier accède à Datadog.

Les administrateurs peuvent définir le rôle par défaut pour les nouveaux utilisateurs JIT. Le rôle par défaut est {{< ui >}}Standard{{< /ui >}}, mais vous pouvez choisir d'ajouter les nouveaux utilisateurs JIT en tant que {{< ui >}}Read-Only{{< /ui >}}, {{< ui >}}Administrators{{< /ui >}} ou tout autre rôle personnalisé.

<div class="alert alert-danger">
  <strong>Important :</strong> Si Role Mapping est activé, il est prioritaire sur les rôles définis lors du provisioning JIT. Sans les déclarations Group Attribute appropriées, les utilisateurs risquent de se retrouver sans rôle et de perdre l'accès à Datadog. Pour éviter que les utilisateurs ne perdent l'accès après le provisioning JIT, vérifiez vos définitions de mappage et vos assertions avant d'activer à la fois Mappings et JIT.
</div>

{{< img src="account_management/saml/saml_jit_default.png" alt="saml JIT Default" style="width:50%;" >}}

### Connexion initiée par l'IdP {#idp-initiated-login-1}

Lorsque l'URL Datadog est chargée, le navigateur est redirigé vers l'IdP du client, où l'utilisateur saisit ses identifiants, puis l'IdP le redirige vers Datadog. Certains IdP peuvent envoyer une assertion directement à Datadog sans obtenir au préalable une AuthnRequest (IdP Initiated Login).

Après avoir activé la fonctionnalité de connexion initiée par l'IdP et enregistré votre configuration, vous pouvez télécharger la dernière version des métadonnées du fournisseur de services (SP) pour votre IdP. Vos nouvelles métadonnées SP contiennent un endpoint `AssertionConsumerService` différent, propre à votre organisation, auquel envoyer les assertions.

Si vous n'utilisez pas les métadonnées SP mises à jour, Datadog n'est pas en mesure d'associer l'assertion à votre organisation et affiche une page d'erreur avec un message indiquant que l'attribut « InResponseTo » est manquant dans la réponse SAML.

### SAML strict {#saml-strict}

Vous pouvez activer SAML Strict pour votre organisation en désactivant les autres types de connexion dans l'interface {{< ui >}}Login Methods{{< /ui >}}. Lorsque cette option est configurée, tous les utilisateurs doivent, par défaut, se connecter avec SAML. Un nom d'utilisateur et un mot de passe existants, ou une connexion Google OAuth, ne fonctionnent pas. Cela garantit que tous les utilisateurs ayant accès à Datadog doivent disposer d'identifiants valides auprès du fournisseur d'identité ou du service d'annuaire de votre entreprise pour accéder à votre compte Datadog. Les administrateurs de l'organisation peuvent définir des [dérogations][6] par utilisateur afin d'exempter certains utilisateurs de SAML Strict.

### Métadonnées SP de Datadog à mise à jour automatique {#self-updating-datadog-sp-metadata}

Certains fournisseurs d'identité (tels qu'ADFS de Microsoft) peuvent être configurés pour récupérer les dernières métadonnées du fournisseur de services SAML depuis Datadog. Une fois SAML configuré dans Datadog, vous pouvez obtenir l'URL des métadonnées de votre organisation sur la page SAML Configuration et l'utiliser avec votre fournisseur d'identité pour récupérer les dernières métadonnées du fournisseur de services chaque fois que des modifications sont publiées.

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
[10]: /fr/help/