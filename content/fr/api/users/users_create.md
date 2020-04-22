---
title: Créer un utilisateur
type: apicontent
order: 36.1
external_redirect: /api/#creer-un-utilisateur
---

## Créer un utilisateur

Créez un utilisateur pour votre organisation.

**ARGUMENTS** :

Un utilisateur est un objet JSON avec `"type":"users"` qui accepte les éléments suivants :

* **`roles`** [*facultatif*] : un tableau de rôles à attribuer à l'utilisateur.  Chaque rôle est un objet avec `"type": "roles"` et avec un `id` correspondant à l'ID du rôle à attribuer à l'utilisateur.
* **`attributes.email`** [*obligatoire*] : l'adresse e-mail du nouvel utilisateur.
* **`attributes.name`** [*facultatif*] : le nom du nouvel utilisateur.
* **`attributes.title`** [*facultatif*] : le titre du nouvel utilisateur.