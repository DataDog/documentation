---
title: Envoyer une invitation par e-mail à un utilisateur
type: apicontent
order: 36.8
external_redirect: "/api/#envoyer-une-invitation-par-e-mail-a-un-utilisateur"
---

## Envoyer une invitation par e-mail à un utilisateur

Invitez par e-mail un ou plusieurs utilisateurs à rejoindre votre organisation.

**ARGUMENTS** :

* **`type`** [*obligatoire*] : le type de requête USER. Utilisez `user_invitations`.
* **`attributes.login_method`** [*facultatif*] : la méthode de connexion incluse dans l'invitation envoyée à l'utilisateur.

**Remarque** : `data.relationships.user.data` peut être un tableau d'objets afin d'inviter plusieurs utilisateurs avec une seule requête.
