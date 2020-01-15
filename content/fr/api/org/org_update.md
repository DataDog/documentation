---
title: Mettre à jour une organisation
type: apicontent
order: 28.3
external_redirect: '/api/#mettre-a-jour-une-organisation'
---
## Mettre à jour une organisation

**ARGUMENTS**:

* **`name`** [*facultatif*] :
    Le nom de l'organisation.
* **`settings`** [*facultatif*] :
    Un tableau de paramètres JSON. Les paramètres possibles sont :
    * **`saml`** : définissez la propriété booléenne `enabled` afin d'activer ou de désactiver l'authentification unique par SAML. Consultez la [documentation SAML][1] pour en savoir plus sur l'ensemble des paramètres SAML.
    * **`saml_idp_initiated_login`** : possède une propriété `enabled` (booléenne).
    * **`saml_strict_mode`** : possède une propriété `enabled` (booléenne).
    * **`saml_autocreate_users_domains`** : possède deux propriétés, `enabled` (booléenne) et `domains`, qui correspond à la liste des domaines sans le symbole « @ ».

[1]: /fr/account_management/saml