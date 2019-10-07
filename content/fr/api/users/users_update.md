---
title: Mettre à jour un utilisateur
type: apicontent
order: 34.4
external_redirect: /api/#mettre-a-jour-un-utilisateur
---

## Mettre à jour un utilisateur
Ne peut être utilisé qu'avec des clés d'application confiées aux administrateurs.

**ARGUMENTS**:

* **`id`** [*obligatoire*] :
    le handle de l'utilisateur.
* **`name`** [*facultatif*, *défaut*=**None**] :
    le nouveau nom de l'utilisateur.
* **`email`** [*facultatif*, *défaut*=**None**] :
    la nouvelle adresse e-mail de l'utilisateur.
* **`disabled`** [*facultatif*, *défaut*=**None**] :
    le nouveau statut de désactivation de l'utilisateur.
* **`access_role`** [*facultatif*, *défaut*=**st**] :
    le rôle d'accès de l'utilisateur. Valeurs autorisées :
    *  **st** (standard)
    *  **adm** (admin)
    *  **ro** (utilisateur read-only)
