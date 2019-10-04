---
title: Récupérer tous les utilisateurs
type: apicontent
order: 34.3
external_redirect: /api/#recuperer-tous-les-utilisateurs
---

## Récupérer tous les utilisateurs

Récupère la liste de tous les utilisateurs de l'organisation. Cette liste comprend tous les utilisateurs, même s'ils sont désactivés ou si leur compte n'a pas été vérifié.

**ARGUMENTS**:

Cet endpoint ne prend aucun argument JSON.

##### RÉPONSE

- `users` : un tableau d'objets utilisateur.

Propriétés de chaque objet utilisateur :

- `handle` : la chaîne que l'utilisateur utilise pour se connecter.
- `name` : le nom de l'utilisateur.
- `access_role` : le rôle d'accès de l'utilisateur :
  - **st** (utilisateur standard)
  - **adm** (admin)
  - **ro** (utilisateur read-only)
- `verified` : un booléen défini sur `true` si l'utilisateur a accepté une invitation pour rejoindre l'organisation.
- `disabled` : un booléen défini sur `true` si l'utilisateur a été désactivé pour cette organisation.
- `role` : une description du rôle de l'utilisateur dans l'organisation.
- `is_admin` : un booléen défini sur `true` si l'utilisateur est un admin.
- `email` : l'adresse e-mail de l'utilisateur.
- `icon` : l'URL de l'icône du profil de l'utilisateur.
