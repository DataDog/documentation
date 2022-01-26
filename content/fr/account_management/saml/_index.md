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

## Présentation

En configurant [SAML (Security Assertion Markup Language)][1] pour votre compte, vos collègues et vous-même pourrez vous connecter à Datadog à l'aide des identifiants stockés dans Active Directory, LDAP ou tout autre magasin d'identités de votre organisation configuré avec un fournisseur d'identité SAML.

**Remarque** : si le SAML n'est pas activé sur votre compte Datadog, contactez l'[assistance][2] pour y remédier.

Voici une présentation vidéo de deux minutes à ce sujet :

{{< wistia 2qe33x8h3v >}}


**Remarques** :

- Nous supposons que vous disposez déjà d'un fournisseur d'identité SAML. Si ce n'est pas le cas, il existe plusieurs fournisseurs d'identité qui proposent des intégrations à Datadog, notamment [Active Directory][3], [Auth0][4], [Azure][3], [Google][5], [LastPass][6], [Okta][7] et [SafeNet][8].
- La configuration du SAML nécessite un accès [administrateur Datadog][9].

## Configuration du SAML

1. Pour commencer la configuration, consultez la documentation de votre fournisseur d'identité :

    * [Active Directory][10]
    * [Auth0][11]
    * [Azure][12]
    * [Google][13]
    * [NoPassword][14]
    * [Okta][15]
    * [SafeNet][16]

2. Dans l'application Datadog, passez votre curseur sur votre nom d'utilisateur dans le coin inférieur gauche, puis sélectionnez Organization Settings. Sélectionnez [Login Methods][17] et cliquez sur **Configure** sous SAML.

3. Importez les métadonnées de fournisseur d'identité depuis votre fournisseur d'identité SAML en cliquant sur le bouton **Choose File**. Après avoir choisi le fichier, cliquez sur **Upload File**.

4. Téléchargez les [métadonnées de prestataire de services][18] de Datadog pour configurer votre fournisseur d'identité de façon à ce qu'il identifie Datadog comme prestataire de services.

5. Après avoir importé les métadonnées de fournisseur d'identité et configuré votre fournisseur d'identité, cliquez sur le bouton **Enable** pour activer le SAML dans Datadog.
    {{< img src="account_management/saml/saml_enable.png" alt="Activation du SAML"  >}}

6. Une fois le SAML configuré dans Datadog et votre fournisseur d'identité prêt à accepter des requêtes de la part de Datadog, les utilisateurs peuvent se connecter comme suit :

   - **Avec une connexion initiée par un prestataire de services** (ou depuis Datadog) : les utilisateurs doivent cliquer accéder à la **Single Sign-on URL** figurant dans la section Status en haut de la [page SAML Configuration][19]. La **Single Sign-on URL** est également fournie sur la [page Team][20]. L'accès à cette URL permet d'initier l'authentification SAML auprès de votre fournisseur d'identité. **Remarque**:  cette URL ne s'affiche que si le SAML a été activé pour votre compte et si vous utilisez une connexion initiée par le prestataire de services.
    {{< img src="account_management/saml/saml_enabled.png" alt="SAML activé"  >}}

   - **Avec une connexion initiée par le fournisseur d'identité** (ou depuis le portail de votre application) : les utilisateurs doivent cliquer sur l'icône de l'application dans le portail de votre application (par exemple, dans le panneau de l'application Google ou dans le portail de l'application Okta). Dans certains scénarios, les utilisateurs qui se connectent via l'URL de connexion initiée par le prestataire de services peuvent également bénéficier de la connexion initiée par le fournisseur d'identité. Cela dépend toutefois de la configuration et de la prise en charge de votre fournisseur d'identité.

**Remarque** : si vous souhaitez configurer le SAML pour un compte multi-org, consultez la section [Gestion des comptes multi-organisations][21].

## Assertions et attributs

Lors du processus de connexion, une assertion SAML contenant l'autorisation de l'utilisateur est envoyée depuis le fournisseur d'identité à Datadog.

Voici quelques remarques importantes sur les assertions :

* Datadog prend en charge la liaison **HTTP-POST** pour **SAML2** :
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`.
* Dans les requêtes d'assertion, pour le format de **NameIDPolicy**, Datadog indique `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`.
* Les assertions doivent être signées.
* Les assertions peuvent être chiffrées. Les assertions non chiffrées sont néanmoins acceptées.
* Consultez [les métadonnées de prestataire de services de Datadog][18] pour en savoir plus.

Des attributs peuvent être inclus dans une assertion SAML. Datadog analyse trois attributs dans `AttributeStatement` :

  1. **eduPersonPrincipalName** : lorsque cet attribut est spécifié, il doit correspondre au nom d'utilisateur Datadog de l'utilisateur. Le nom d'utilisateur désigne généralement l'adresse e-mail de l'utilisateur.
  2. **sn** : cet attribut facultatif correspond au nom de famille de l'utilisateur.
  3. **givenName** : cet attribut facultatif correspond au prénom de l'utilisateur.

Datadog s'attend à ce que les attributs respectent le format URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` ou le format Basic NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`. Le nom utilisé pour chaque attribut dépend du NameFormat utilisé par votre fournisseur d'identité.

Si votre fournisseur d'identité est configuré sur le format URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` :

  1. **eduPersonPrincipalName** : le fournisseur d'identité doit définir `urn:oid:1.3.6.1.4.1.5923.1.1.1.6` comme nom de l'attribut.
  2. **sn** : le fournisseur d'identité doit définir `urn:oid:2.5.4.4` comme nom de l'attribut.
  3. **givenName** : le fournisseur d'identité doit définir `urn:oid:2.5.4.42` comme nom de l'attribut.

Si votre fournisseur d'identité est configuré sur le format Basic NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic` :

  1. **eduPersonPrincipalName** : le fournisseur d'identité doit définir `urn:mace:dir:attribute-def:eduPersonPrincipalName` comme nom de l'attribut.
  2. **sn** : le fournisseur d'identité doit définir `urn:mace:dir:attribute-def:sn` comme nom de l'attribut.
  3. **givenName** : le fournisseur d'identité doit définir `urn:mace:dir:attribute-def:givenName` comme nom de l'attribut.

Si **eduPersonPrincipalName** est fourni dans AttributeStatement, la valeur de cet attribut est utilisée pour le nom d'utilisateur. Si **eduPersonPrincipalName** n'est pas inclus dans AttributeStatement, le nom d'utilisateur est récupéré à partir de NameID dans Subject. NameID doit respecter le format `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`.

Si **sn** et **givenName** sont fournis, ils servent à mettre à jour le nom de l'utilisateur dans son profil Datadog.

## Mappage d'attributs SAML avec des rôles Datadog

Avec Datadog, vous pouvez mapper les attributs de la réponse de votre fournisseur d'identité avec des rôles Datadog. Les utilisateurs disposant de l'autorisation Access Management peuvent attribuer ou supprimer des rôles Datadog selon les attributs SAML d'un utilisateur.

Il est important de comprendre les éléments envoyés dans une assertion avant d'activer les mappages, étant donné que ces derniers nécessitent les attributs adéquats. Chaque fournisseur d'identité propose des mappages spécifiques. Par exemple, Azure fonctionne avec des ID d'objet, tandis qu'Okta exige que vous définissiez des attributs dans les [paramètres Okta][22]. Datadog recommande de comparer vos assertions SAML à l'aide d'[outils intégrés à un navigateur][23], comme les outils de développement Chrome ou les extensions de navigateur, et de [les valider][24] **avant** de créer des mappages.

1. [Comparez][23] et [validez][24] votre assertion SAML afin de bien identifier les attributs de votre fournisseur d'identité.

2. Accédez à Teams et cliquez sur l'onglet **Mappings**.

3. Cliquez sur **New Mapping**.

4. Indiquez la paire `key-value` du fournisseur d'identité SAML que vous souhaitez associer à un rôle Datadog existant (par défaut ou personnalisé). **Remarque** : ces entrées sont sensibles à la casse.

   Par exemple, si vous souhaitez que tous les utilisateurs dont l'attribut `member_of` est défini sur `Development` soient affectés à un rôle Datadog `Devs` personnalisé, procédez comme suit :

    {{< img src="account_management/saml/create_mapping.png" alt="Créer un mappage SAML avec un rôle Datadog"  >}}

   **Remarque** : chaque fournisseur d'identité fonctionne différemment. Certains vous permettent de définir la clé ou l'étiquette de votre attribut, tandis que d'autres en fournissent une par défaut. Datadog vous recommande d'utiliser un inspecteur d'assertion sur votre connexion afin d'afficher les détails de votre assertion et de comprendre comment votre fournisseur d'identité vous transmet votre appartenance au groupe.

5. Si vous ne l'avez pas déjà fait, activez les mappages en cliquant sur **Enable Mappings**.

Lorsqu'un utilisateur disposant de l'attribut de fournisseur d'identité spécifié se connecte, il se voit automatiquement attribuer le rôle Datadog. De la même façon, si ce même attribut de fournisseur d'identité est supprimé pour un utilisateur, ce dernier perd l'accès au rôle (sauf si un autre mappage l'ajoute).

<div class="alert alert-warning">
  <strong>Attention :</strong> si un utilisateur ne correspond à <i>aucun</i> mappage, il perd tous les rôles dont il disposait et ne peut plus se connecter à l'organisation avec le protocole SAML. Vérifiez donc bien les définitions de vos mappages et inspectez vos propres assertions avant d'activer les mappages, afin de veiller à ce que vos utilisateurs puissent toujours se connecter.
</div>

Vous pouvez modifier un mappage en cliquant sur l'icône en forme de **crayon**, ou le supprimer en cliquant sur l'icône en forme de **corbeille**. Ces actions affectent uniquement le mappage, et non les attributs du fournisseur d'identité ni les rôles Datadog.

Vous pouvez également créer et modifier des mappages d'attributs SAML avec des rôles Datadog à l'aide de l'endpoint `authn_mappings`. Pour en savoir plus, consultez la section [API de mappage d'attributs d'authentification fédérée à un rôle][25].

## Fonctionnalités supplémentaires

Les fonctionnalités suivantes peuvent être activées depuis la [fenêtre de dialogue de configuration SAML][19] :

**Remarque** : vous devez disposer d'autorisations admin pour accéder à la fenêtre de dialogue de configuration SAML.

### Provisionnement juste à temps

Grâce au provisionnement juste à temps, chaque première connexion d'une nouvelle personne entraîne la création d'un utilisateur Datadog. Ainsi, les administrateurs n'ont plus à créer manuellement de comptes individuels, et aucun e-mail d'invitation n'est envoyé.

Certaines organisations ne souhaitent pas inviter l'ensemble de leurs utilisateurs à rejoindre Datadog. Si vous souhaitez modifier le fonctionnement de SAML pour votre compte, contactez l'[assistance Datadog][2]. Si vous souhaitez refuser l'accès d'un utilisateur spécifique à Datadog, votre organisation doit configurer son fournisseur d'identité de façon à ce qu'il n'envoie pas d'assertions à Datadog.

Les administrateurs peuvent définir le rôle par défaut des nouveaux utilisateurs juste à temps. Le rôle **Standard** est attribué par défaut, mais vous pouvez choisir d'ajouter de nouveaux utilisateurs juste à temps avec le rôle **Read-Only** ou même **Administrator**.

{{< img src="account_management/saml/saml_jit_default.png" alt="SAML défaut juste à temps" style="width:50%;" >}}

### Connexion initiée par le fournisseur d'identité

Lors du chargement de l'URL Datadog, le navigateur accède au fournisseur d'identité du client, à partir duquel l'utilisateur peut saisir ses identifiants, puis le fournisseur d'identité renvoie l'utilisateur vers le site de Datadog. Certains fournisseurs d'identité peuvent envoyer directement une assertion à Datadog, sans devoir obtenir d'AuthnRequest (Initiation de la connexion par le fournisseur d'identité).

Après avoir activé la fonctionnalité d'initiation de la connexion par le fournisseur d'identité et enregistré votre configuration, vous pouvez télécharger la dernière version des métadonnées du prestataire de services pour votre fournisseur d'identité. Ces nouvelles métadonnées possèdent un endpoint `AssertionConsumerService` différent, qui est spécifique à votre organisation. Vous devez envoyer les assertions à cet endpoint.

Si vous n'utilisez pas les nouvelles métadonnées de prestataire de services, Datadog ne pourra pas associer l'assertion à votre organisation et affichera une page d'erreur indiquant qu'il manque l'attribut « InResponseTo » dans la réponse SAML.

### SAML strict

Vous pouvez appliquer un SAML strict à votre organisation en désactivant les autres types de méthodes de connexion dans l'interface **Login Methods**. Lorsque cette option est configurée, tous les utilisateurs doivent, par défaut, se connecter via l'authentification SAML. Les noms et mots de passe existants ou les identifiants Google OAuth ne fonctionnent pas. Avec cette fonctionnalité, vous êtes certain que tous les utilisateurs ayant accès à Datadog utilisent des identifiants valides du fournisseur d'identité ou service d'annuaire de votre entreprise pour se connecter à votre compte Datadog. Les administrateurs d'organisation peuvent définir des configurations pour certains utilisateurs afin qu'ils ne soient pas soumis au SAML strict.

### Mise à jour automatiquement des métadonnées de prestataire de services Datadog

Certains fournisseurs d'identité (comme Microsoft ADFS) peuvent être configurés de façon à récupérer les dernières métadonnées de prestataire de services SAML depuis Datadog. Après avoir configuré le SAML dans Datadog, vous pouvez obtenir l'URL de métadonnées de votre organisation depuis la page SAML Configuration. Transmettez cette URL à votre fournisseur d'identité pour récupérer les dernières métadonnées de prestataire de services chaque fois que des modifications sont publiées.

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
[22]: https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-add-custom-user-attributes.htm
[23]: https://support.okta.com/help/s/article/How-to-View-a-SAML-Response-in-Your-Browser-for-Troubleshooting?language=en_US
[24]: https://www.samltool.com/validate_response.php
[25]: /fr/account_management/authn_mapping/