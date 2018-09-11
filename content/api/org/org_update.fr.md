---
title: Mise à jour d'une organisation
type: apicontent
order: 17.3
external_redirect: /api/#update-organization
---

## Mise à jour d'une organisation

**ARGUMENTS**:

* **`name`** [*optionnel*]:  
    Le nom de l'organisation
* **`settings`** [*optionnel*]:  
    Un tableau de paramètres JSON. Les paramètres possibles sont:
    * **`saml`** - Définissez la propriété boolean `enabled` afin d'activer ou de désactiver l'authentification unique par SAML. Voir la [documentation SAML][1] pour plus d'informations en concernant tous les paramètres SAML.
    * **`saml_idp_initiated_login`** - a une propriété `enabled` (boolean).
    *  **`saml_strict_mode`** - a une propriété `enabled` (boolean).
    * **`saml_autocreate_users_domains`** - a deux propriétés : `enabled` (boolean) et `domains` ce qui est une liste de domaines sans les symboles @.

[1]: /account_management/saml/
