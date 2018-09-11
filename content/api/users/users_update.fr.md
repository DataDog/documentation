---
title: Mettre à jour un utilisateur
type: apicontent
order: 24.4
external_redirect: /api/#update-user
---

## Mettre à jour un utilisateur
Ne peut être utilisé qu'avec des clés d'application disponibles pour les administrateurs.

**ARGUMENTS**:

* **`id`** [*obligatoire*]:  
    Le handle de l'utilisateur.
* **`name`** [*optionnel*, *défaut*=**None**]:  
    Le nouveau nom de l'utilisateur.
* **`email`** [*optionnel*, *défaut*=**None**]:  
    Le nouvel email de l'utilisateur.
* **`disabled`** [*optionnel*, *défaut*=**None**]:  
    Le nouveau status disabled de l'utilisateur.
* **`access_role`** [*optionnel*, *défaut*=**st**]:  
    Le rôle d'accès de l'utilisateur, à choisir parmi:
    *  **st** (utilisateur standard), 
    *  **adm** (admin user),
    *  **ro** (read-only user).  

