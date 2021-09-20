---
aliases:
  - /fr/6a7-df6-9aa
  - /fr/security_monitoring/default_rules/6a7-df6-9aa
  - /fr/security_monitoring/default_rules/auth0-credential-stuffing-attack
disable_edit: true
integration_id: auth0
kind: documentation
rule_category:
  - Détection des logs
security: attaque
source: auth0
tactic: TA0006-credential-access
technique: T1110-brute-force
title: Attaque par credential stuffing sur un utilisateur Auth0
type: security_rules
---
## **Objectif :**
Détecter les prises de contrôle de compte (ATO) via une attaque par credential stuffing.

## **Stratégie :**
**Pour déterminer une tentative réussie :** Détecter un nombre important d'échecs de connexion sur au moins 10 comptes utilisateurs suivis d'une connexion réussie sur un compte utilisateur. Un signal de gravité `HIGH` est alors envoyé.

**Pour déterminer une tentative non réussie :** Détecter un nombre important d'échecs de connexion sur au moins 10 comptes utilisateurs. Un signal de gravité `INFO` est alors envoyé.

## **Triage et réponse :**
1. Inspecter les logs pour vérifier s'il s'agissait d'une tentative de connexion valide.
2. Vérifier si la double authentification a été utilisée.
3. Si la sécurité de l'utilisateur est compromise, réinitialiser ses identifiants.