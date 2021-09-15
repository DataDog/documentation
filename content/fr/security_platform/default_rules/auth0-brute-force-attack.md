---
aliases:
  - /fr/154-6ed-00d
  - /fr/security_monitoring/default_rules/154-6ed-00d
  - /fr/security_monitoring/default_rules/auth0-brute-force-attack
disable_edit: true
integration_id: auth0
kind: documentation
rule_category:
  - Détection des logs
security: attaque
source: auth0
tactic: TA0006-credential-access
technique: T1110-brute-force
title: Attaque par brute force sur un utilisateur Auth0
type: security_rules
---
## **Objectif :**
Détecter une attaque par brute force sur un utilisateur.

## **Stratégie :**
**Pour déterminer une tentative réussie :** Détecter lorsque le même utilisateur échoue à se connecter 5 fois avant de réussir. Un signal de gravité `MEDIUM` est alors envoyé.

**Pour déterminer une tentative non réussie :** Détecter lorsque le même utilisateur échoue à se connecter 5 fois. Un signal de gravité `INFO` est alors envoyé.

## **Triage et réponse :**
1. Inspecter les logs pour vérifier s'il s'agissait d'une tentative de connexion valide.
2. Vérifier si la double authentification a été utilisée.
3. Si la sécurité de l'utilisateur est compromise, réinitialiser ses identifiants.