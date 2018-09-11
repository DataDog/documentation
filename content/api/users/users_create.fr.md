---
title: Créer un utilisateur
type: apicontent
order: 24.1
external_redirect: /api/#create-user
---

## Créer un utilisateur

**ARGUMENTS**:

* **`handle`** [*obligatoire*]:  
    Le handle utilisateur, doit être un email valide.
* **`name`** [*optionnel*, *défaut*=**None**]:  
    Le nom de l'utilisateur.
* **`access_role`** [*optionnel*, *défaut*=**st**]:  
    Le rôle d'accès de l'utilisateur, à choisir parmi:
    *  **st** (utilisateur standard), 
    *  **adm** (admin user),
    *  **ro** (read-only user).  
    *Note: Les utilisateurs ne peuvent être crées qu'avec des clés d'application disponibles pour les administrateurs.*

