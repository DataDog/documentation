---
title: Mettre à jour un utilisateur
type: apicontent
order: 24.4
external_redirect: /api/#mettre-a-jour-un-utilisateur
---

## Mettre à jour un utilisateur
Ne peut être utilisé qu'avec des clés d'application disponibles pour les administrateurs.

##### ARGUMENTS
* **`id`** [*obligatoire*] :
    Le handle de l'utilisateur.
* **`name`** [*facultatif*, *défaut* = **None**] :
    Le nouveau nom de l'utilisateur.
* **`email`** [*facultatif*, *défaut* = **None**] :
    Le nouvel e-mail de l'utilisateur.
* **`disabled`** [*facultatif*, *défaut* = **None**] :
    Le nouveau statut « disabled » de l'utilisateur.
* **`access_role`** [*facultatif*, *défaut* = **st**] :
    Le rôle d'accès de l'utilisateur. Valeurs autorisées :
    *  **st** (utilisateur standard), 
    *  **adm** (administrateur),
    *  **ro** (utilisateur en lecture seule).  

