---
aliases:
  - /fr/07c-ed1-a61
disable_edit: true
kind: documentation
rule_category:
  - Détection des logs
security: compliance
source: azure
title: "Connexion à Azure\_AD sans authentification multifacteur"
type: security_rules
---
## Présentation

### Objectif
Détecter lorsqu'un utilisateur se connecte à Azure AD  sans authentification multifacteur.

### Stratégie
Cette règle surveille la présence de logs d'activité Active Directory dans les logs d'activité Azure et détecte lorsque la valeur de `@evt.category` est égale à `SignInLogs` et lorsque la valeur de `@properties.authenticationRequirement` est égale à `singleFactorAuthentication`.

### Triage et réponse
1. Contacter l'utilisateur afin de déterminer s'il est à l'origine de la connexion.
2. Si c'est le cas, demander à l'utilisateur d'utiliser la double authentification.
3. Si l'utilisateur n'est pas à l'origine de la connexion, remplacer ses identifiants.
4. Vérifier tous les comptes utilisateur pour s'assurer que la connexion multifacteur est activée.