---
title: Créer un utilisateur
type: apicontent
order: 35.1
external_redirect: /api/#creer-un-utilisateur
---

## Créer un utilisateur

**ARGUMENTS** :

* **`handle`** [*obligatoire*] :
    le handle de l'utilisateur ; doit correspondre à un e-mail valide.
* **`name`** [*facultatif*, *défaut*=**None**] :
    le nom de l'utilisateur.
* **`access_role`** [*facultatif*, *défaut*=**st**] :
    le rôle d'accès de l'utilisateur. Valeurs autorisées :
    *  **st** (utilisateur standard),
    *  **adm** (administrateur),
    *  **ro** (utilisateur read-only)
    *Remarque : les utilisateurs ne peuvent être créés qu'avec des clés d'application disponibles pour les administrateurs.*
