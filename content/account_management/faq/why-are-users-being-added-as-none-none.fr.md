---
title: Pourquoi des utilisateurs sont-ils ajoutés en tant que "none none"?
kind: faq
---

Parfois, lorsqu'un utilisateur se connecte pour la première fois à [Datadog via SAML / SSO][1], ses noms s'affichent sur la page de l'équipe en tant que "none none" à la place de son nom d'utilisateur.
Cela peut être particulièrement visible dans les cas où les utilisateurs sont créés via le provisionnement JIT, sans toutefois s'y limiter.
Voir "none none" indique un problème avec la configuration de l'assertion SAML de leur compte - en particulier les attributs "sn" et "givenName" qui y sont inclus. "sn" signifie "patronyme" - le nom de famille de l'utilisateur. "givenName" serait le prénom de l'utilisateur.

Ces attributs, configurés pour l'assertion respective de l'utilisateur dans l'IdP, sont responsables de la définition du nom de l'utilisateur dans Datadog. Si ces attributs sont mal définis dans l'assertion, ou pas du tout, "none none" peut finir par être le nom d'utilisateur affiché dans Datadog.

## Comment le réparer?

Confirmez que vous avez correctement configuré ces attributs d'assertion dans votre fournisseur d'identité. Les instructions sont détaillées dans notre [documentation SAML ici][1] - voir la section **setting attributes**.

Si vous avez confirmé que ces paramètres sont définis mais que vous continuez à rencontrer des problèmes, contactez [nous][2]!

[1]: /account_management/saml
[2]: /help