---
aliases:
  - /fr/6a7-df6-9aa
disable_edit: true
kind: documentation
rule_category:
  - Détection des logs
security: attack
source: auth0
tactic: TA0006-credential-access
technique: T1110-brute-force
title: Attaque par credential stuffing sur un utilisateur Auth0
type: security_rules
---
## Présentation

## **Objectif :**
Détecter les prises de contrôle de compte (ATO) via une attaque par credential stuffing.

## **Stratégie :**
**Pour déterminer une tentative réussie :** Détecter un nombre important d'échecs de connexion sur au moins 10 comptes utilisateurs suivis d'une connexion réussie sur un compte utilisateur. Un signal de sévérité `HIGH` est alors envoyé.

**Pour déterminer une tentative non réussie :** Détecter un nombre important d'échecs de connexion sur au moins 10 comptes utilisateurs. Un signal de sévérité `INFO` est alors envoyé.

## **Triage et réponse :**
1. Inspecter les logs pour vérifier s'il s'agissait d'une tentative de connexion valide.
2. Vérifier si la double authentification a été utilisée.
3. Si le compte utilisateur a été compromis, réinitialiser ses identifiants.