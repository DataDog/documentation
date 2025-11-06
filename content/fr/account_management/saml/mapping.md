---
further_reading:
- link: /account_management/saml/
  tag: Documentation
  text: Authentification unique (SSO) avec SAML
title: Mappage des groupes SAML
---

## Présentation

Avec Datadog, vous pouvez effectuer un mappage des attributs présents dans la réponse de votre fournisseur d'identité (IdP) vers des entités Datadog.

Vous pouvez mapper des attributs vers les entités suivantes :
- [roles Datadog][1]
- [équipes Datadog][2]

 Les utilisateurs disposant de l'autorisation Access Management peuvent attribuer ou retirer des entités Datadog en fonction des attributs SAML attribués à un utilisateur.

 Configurer un mappage entre des attributs SAML et des entités Datadog vous permet de gérer les utilisateurs uniquement via votre fournisseur d'identité. Le système provisionne alors les utilisateurs dans Datadog selon les mappages définis.

## Prérequis

Il est important de comprendre ce qui est envoyé dans une assertion avant d'activer les mappages, car ceux-ci nécessitent des attributs corrects. Chaque IdP possède ses propres mappages. Par exemple, Azure utilise des identifiants d'objet, tandis que Okta vous demande de configurer les attributs dans les [paramètres Okta][3]. Datadog recommande d'utiliser des outils intégrés au navigateur comme [Chrome DevTools][4], des extensions dédiées et de [valider vos assertions SAML][5] **avant** de créer des mappages.

## Mapper des attributs SAML avec des rôles Datadog

1. [Utilisez des outils de vérification][4] et [validez][5] votre assertion SAML pour identifier les attributs envoyés par votre IdP.
2. Accédez à **Organization Settings**, puis cliquez sur l'onglet **SAML Group Mappings**.
3. S'il est visible, assurez-vous que l'onglet **Role Mappings** est sélectionné.
4. Cliquez sur **New Mapping**. Une boîte de dialogue s'affiche.
5. Indiquez la paire `key-value` envoyée par le fournisseur d'identité SAML que vous souhaitez associer à un rôle Datadog existant (par défaut ou personnalisé). **Remarque** : ces valeurs respectent la casse.
   Par exemple, si vous souhaitez que tous les utilisateurs dont l'attribut `member_of` a pour valeur `Development` se voient attribuer un rôle Datadog personnalisé nommé `Devs` :

    {{< img src="account_management/saml/create_mapping.png" alt="Création d'un mappage SAML avec un rôle Datadog" >}}

   **Remarque** : chaque fournisseur d'identité fonctionne différemment. Certains vous permettent de définir la clé ou l'étiquette de l'attribut, d'autres en fournissent une par défaut. Datadog recommande d'utiliser un inspecteur d'assertions lors de la connexion pour consulter les détails de votre assertion spécifique et comprendre comment votre fournisseur envoie les informations d'appartenance à un groupe.
6. Si ce n'est pas déjà fait, activez les mappages en cliquant sur **Enable Mappings**.

Lorsqu'un utilisateur se connecte avec l'attribut du fournisseur d'identité spécifié, le rôle Datadog lui est automatiquement attribué. De même, si l'attribut est retiré, l'accès au rôle est supprimé (sauf si un autre mappage l'ajoute).

<div class="alert alert-danger">
  <strong>Important :</strong> si un utilisateur ne correspond à <i>aucun</i> mappage, tous les rôles qui lui étaient précédemment attribués lui sont retirés, et il ne peut plus se connecter à l'organisation via SAML. Cela inclut les rôles attribués par provisioning Just-In-Time. Vérifiez attentivement vos définitions de mappage et inspectez vos assertions avant d'activer les mappages afin d'éviter toute situation où des utilisateurs ne pourraient plus se connecter.</div>

Modifiez un mappage en cliquant sur l'icône en forme de crayon (**Edit**), ou supprimez un mappage en cliquant sur l'icône en forme de corbeille (**Delete**). Ces actions affectent uniquement le mappage, et non les attributs du fournisseur d'identité ni les rôles Datadog.

Vous pouvez également créer et modifier des mappages d'attributs SAML avec des rôles Datadog à l'aide de l'endpoint `authn_mappings`. Pour en savoir plus, consultez la section [API de mappage d'attributs d'authentification fédérée à un rôle][6].

## Mapper des attributs SAML avec des équipes

1. Assurez-vous d'avoir sélectionné **SAML** ou **All sources** comme [source de provisioning][7] pour les appartenances à une équipe.
2. [Utilisez des outils de vérification][4] et [validez][5] votre assertion SAML pour identifier les attributs envoyés par votre IdP.
3. Accédez à **Organization Settings**, puis cliquez sur l'onglet **SAML Group Mappings**.
4. Assurez-vous que l'onglet **Team Mappings** est sélectionné.
5. Cliquez sur **New Mapping**. Une boîte de dialogue s'affiche.
6. Indiquez la paire `key-value` envoyée par le fournisseur d'identité SAML que vous souhaitez associer à une équipe Datadog. **Remarque** : ces valeurs respectent la casse.
    **Remarque** : chaque fournisseur d'identité fonctionne différemment. Certains vous permettent de définir la clé ou l'étiquette de l'attribut, d'autres en fournissent une par défaut. Datadog recommande d'utiliser un inspecteur d'assertions lors de la connexion pour consulter les détails de votre assertion spécifique et comprendre comment votre fournisseur envoie les informations d'appartenance à un groupe.
8. Sélectionnez une **Team** dans le menu déroulant.
9. Pour ajouter un mappage supplémentaire, cliquez sur **Add Row**.
10. Lorsque vous avez terminé, cliquez sur **Create**.
11. Si ce n'est pas déjà fait, activez les mappages en cliquant sur **Enable Mappings**.

Modifiez un mappage en cliquant sur l'icône en forme de crayon (**Edit**), ou supprimez un mappage en cliquant sur l'icône en forme de corbeille (**Delete**). Ces actions affectent uniquement le mappage, et non les attributs du fournisseur d'identité ni les équipes Datadog.

**Remarque** : contrairement aux rôles, les équipes n'ont aucun impact sur l'expérience de connexion. Datadog utilise le mappage d'équipe uniquement comme source de provisioning. Par exemple, un utilisateur sans équipe peut tout de même se connecter à Datadog.

[1]: /fr/account_management/rbac/
[2]: /fr/account_management/teams/
[3]: https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-add-custom-user-attributes.htm
[4]: https://support.okta.com/help/s/article/How-to-View-a-SAML-Response-in-Your-Browser-for-Troubleshooting?language=en_US
[5]: https://www.samltool.com/validate_response.php
[6]: /fr/account_management/authn_mapping/
[7]: /fr/account_management/teams/#choose-provisioning-source