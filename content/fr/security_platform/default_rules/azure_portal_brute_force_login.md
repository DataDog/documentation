---
aliases:
  - /fr/rrb-osy-cuu
  - /fr/security_monitoring/default_rules/rrb-osy-cuu
  - /fr/security_monitoring/default_rules/azure_portal_brute_force_login
disable_edit: true
integration_id: azure
kind: documentation
rule_category:
  - Détection des logs
security: attaque
source: azure
tactic: TA0006-credential-access
technique: T1110-brute-force
title: Connexion par brute force au portail Azure
type: security_rules
---
## Objectif

Détecter les prises de contrôle de compte (ATO) via une attaque par brute force.

## Stratégie

Surveiller les logs de connexion Azure Active Directory afin de détecter lorsqu'une valeur `@evt.name` est égale à `SignInLogs` et que la valeur de `@evt.outcome` est égale à `failure`.

## Triage et réponse

1. Passer en revue les logs pour déterminer s'il s'agit d'une tentative de connexion valide.
2. Si la sécurité de l'utilisateur est compromise, réinitialiser ses identifiants.