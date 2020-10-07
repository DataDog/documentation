---
aliases:
  - /fr/e57-f49-cdc
disable_edit: true
kind: documentation
security: attack
tactic: TA0006-credential-access
technique: T1110-brute-force
title: "MODÈLE\_: Attaque par force brute groupée par IP"
type: security_rules
---
## Présentation

### Objectif
Détectez les tentatives de prise de contrôle de compte (ATO) via une attaque par force brute.

### Stratégie
Pour détecter une tentative réussie : on identifie un nombre important d'échecs de connexion suivis d'une connexion réussie depuis une même adresse IP. Un signal de sévérité `HIGH` est alors généré.
Pour détecter une tentative : on identifie un nombre important d'échecs de connexion depuis une même adresse IP. Un signal de sévérité `INFO` est alors généré.

### Triage et réponse
1. Inspectez les logs pour vérifier s'il s'agissait d'une tentative de connexion valide.
2. Vérifiez si la double authentification a été utilisée.
3. Si le compte utilisateur a été compromis, effectuez une rotation des identifiants de l'utilisateur.