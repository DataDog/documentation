---
aliases:
  - /fr/clw-d08-ehj
  - /fr/security_monitoring/default_rules/clw-d08-ehj
  - /fr/security_monitoring/default_rules/credential-stuffing-attack
category: authentification
disable_edit: true
integration_id: ''
kind: documentation
rule_category:
  - Détection des logs
security: attack
tactic: TA0006-credential-access
technique: T1110-brute-force
template: 'true'
title: Attaque par credential stuffing
type: security_rules
---
### Objectif
Détecter les prises de contrôle de compte (ATO) via une attaque par credential stuffing.

Une attaque par credential stuffing est utilisée pour obtenir un accès initial en compromettant le compte d'un utilisateur.

Le hacker obtient une liste de noms d'utilisateur et de mots de passe compromis à partir d'un précédent accès non autorisé à la base de données des utilisateurs, via une tentative de phishing ou par d'autres moyens. Il utilise ensuite ces informations pour tenter de se connecter à des comptes de votre application.

Lorsqu'ils ciblent une application, les hackers utilisent souvent plusieurs adresses IP pour distribuer la charge de l'attaque et la rendre plus difficile à détecter et bloquer.

### Stratégie
**Pour déterminer une tentative réussie :** Détecter un nombre important d'échecs de connexion sur au moins 25 comptes utilisateurs suivis d'une connexion réussie sur un certain intervalle de temps et depuis une même adresse IP.

**Pour déterminer une tentative non réussie :** Détecter un nombre important d'échecs de connexion sur au moins 10 comptes utilisateurs sur un certain intervalle de temps et depuis une même adresse IP.

### Triage et réponse

Utilisez [ce runbook Datadog](https://app.datadoghq.com/notebook/credentialstuffingrunbook) pour faciliter votre enquête.

1. Déterminez s'il s'agit d'une véritable attaque ou d'un faux positif.
2. Déterminez quels utilisateurs ont été compromis.
3. Corrigez les comptes utilisateur compromis.