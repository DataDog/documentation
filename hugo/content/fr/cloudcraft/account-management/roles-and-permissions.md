---
title: Rôles et autorisations
---

Les membres d'une équipe Cloudcraft peuvent se voir attribuer l'un des trois rôles utilisateur différents :

- Propriétaire du compte
- Administrateur
- Utilisateur

## Rôles utilisateur et autorisations par défaut

**Remarque** : pour accorder un accès en lecture seule aux plans, vous pouvez créer un lien de plan partageable et intégrer le plan dans une page wiki interne.

### Propriétaire du compte

Le propriétaire du compte a accès à tout dans votre compte Cloudcraft et est le seul rôle qui peut modifier les paramètres d'abonnement, ou afficher et modifier les informations de facturation.

Par défaut, la personne qui s'est inscrite à un abonnement Cloudcraft payant est le propriétaire du compte. Pour attribuer le rôle à d'autres membres de votre équipe, [contactez l'assistance][1].

**Autorisations :**

- Créer, modifier et supprimer des blueprints privés et partagés avec l'équipe
- Gérer les paramètres d'abonnement
- Gérer les paramètres SSO (Enterprise)
- Gérer les paramètres d'équipe
  - Créer de nouvelles équipes (Enterprise)
  - Inviter de nouveaux administrateurs et utilisateurs
  - Supprimer des administrateurs et des utilisateurs
  - Révoquer les invitations d'équipe à rejoindre votre équipe Cloudcraft
- Gérer les comptes AWS
  - Connecter de nouveaux comptes AWS
  - Supprimer des comptes AWS
  - Gérer les comptes AWS partagés avec l'équipe
- Gérer les clés API
  - Créer des clés API
  - Supprimer des clés API
  - Gérer les clés API partagées avec l'équipe

### Administrateur

Les administrateurs sont le deuxième rôle le plus privilégié dans Cloudcraft et ont accès à tout sauf aux informations de facturation et d'abonnement.

Ce rôle est destiné aux chefs de projet qui ont besoin d'autorisations pour gérer leur équipe ou leurs sous-équipes dans Cloudcraft.

**Autorisations :**

- Créer, modifier et supprimer des blueprints privés et partagés avec l'équipe
- Gérer les paramètres d'équipe (pour les équipes auxquelles ils sont affectés)
  - Inviter de nouveaux administrateurs et utilisateurs
  - Supprimer des administrateurs et des utilisateurs
  - Révoquer les invitations d'équipe à rejoindre votre équipe Cloudcraft
- Gérer les comptes AWS
  - Connecter de nouveaux comptes AWS
  - Supprimer des comptes AWS
  - Gérer les comptes AWS partagés avec l'équipe
- Gérer les clés API
  - Créer des clés API
  - Supprimer des clés API
  - Gérer les clés API partagées avec l'équipe

### Utilisateur

Les utilisateurs sont le type de rôle le moins privilégié dans Cloudcraft. Les utilisateurs sont membres d'équipes avec lesquelles ils peuvent partager des plans, collaborer sur des comptes AWS et généralement travailler ensemble.

**Autorisations :**

- Créer, modifier et supprimer des blueprints privés et partagés avec l'équipe
- Accès en lecture seule à l'équipe dont ils sont membres
- Analyser en direct les comptes AWS qu'un propriétaire de compte ou un administrateur a partagés avec leur équipe
- Accès en lecture seule à l'existence des clés API (incapable de générer ou de voir les clés API actives)

## Équipes inter-organisationnelles

Pour les clients Enterprise, Cloudcraft offre également la possibilité de créer des équipes inter-organisationnelles. Les membres d'une équipe inter-organisationnelle sont ajoutés à la liste des membres de chaque équipe non inter-organisationnelle et héritent de leurs rôles inter-organisationnels, à moins qu'ils ne soient déjà membres d'une autre équipe.

Voici un exemple pour faciliter la compréhension :

- Exemple d'entreprise
  - Équipe inter-org 1
    - Utilisateur 1
  - Équipe 2
    - Utilisateur 2
    - [Utilisateur 1 de l'équipe inter-org 1]
  - Équipe 3
    - Utilisateur 3
    - Utilisateur 1
    - [Utilisateur 1 de l'équipe inter-org 1, mais l'appartenance explicite détermine le rôle de l'équipe]

Dans cet exemple, si « Équipe 1 » est une équipe d'audit avec des membres en lecture seule, « Utilisateur 1 » aura implicitement un accès en lecture seule à « Équipe 2 », tandis que le rôle explicitement attribué à l'utilisateur dans « Équipe 3 » a la priorité.

[1]: https://app.cloudcraft.co/support
[2]: https://app.cloudcraft.co/app/support