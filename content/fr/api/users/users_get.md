---
title: Récupérer un utilisateur
type: apicontent
order: 35.2
external_redirect: /api/#recuperer-un-utilisateur
---

## Récupérer un utilisateur

Récupérez un utilisateur dans l'organisation en spécifiant son handle.

##### ARGUMENTS
* **`id`** [*obligatoire*] :
    le handle de l'utilisateur.

##### RÉPONSE

- `user` : un objet utilisateur.

Propriétés d'un objet utilisateur :

- `handle` : la chaîne que l'utilisateur utilise pour se connecter.
- `name` : le nom de l'utilisateur.
- `access_role` : le rôle d'accès de l'utilisateur. Valeurs autorisées :
  - **st** (utilisateur standard)
  - **adm** (administrateur)
  - **ro** (utilisateur read-only)
- `verified` : un booléen défini sur `true` si l'utilisateur a accepté une invitation pour rejoindre l'organisation.
- `disabled` : un booléen défini sur `true` si l'utilisateur a été désactivé pour cette organisation.
- `role` : une description du rôle de l'utilisateur dans l'organisation.
- `is_admin` : un booléen défini sur `true` si l'utilisateur est un administrateur.
- `email` : l'adresse e-mail de l'utilisateur.
- `icon` : l'URL de l'icône du profil de l'utilisateur.
