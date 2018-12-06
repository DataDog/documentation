---
title: Créer un utilisateur
type: apicontent
order: 24.1
external_redirect: /api/#creer-un-utilisateur
---

## Créer un utilisateur
##### ARGUMENTS

* **`handle`** [*obligatoire*] :
    Le handle de l'utilisateur ; doit être un e-mail valide.
* **`name`** [*facultatif*, *défaut* = **None**] :  
    Le nom de l'utilisateur.
* **`access_role`** [*facultatif*, *défaut* = **st**] : 
    Le rôle d'accès de l'utilisateur. Valeurs autorisées :
    *  **st** (utilisateur standard), 
    *  **adm** (administrateur),
    *  **ro** (utilisateur en lecture seule).
    *Remarque : les utilisateurs ne peuvent être crées qu'avec des clés d'application disponibles pour les administrateurs.*

