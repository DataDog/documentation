---
aliases:
  - /fr/dc3-7b8-f07
  - /fr/security_monitoring/default_rules/dc3-7b8-f07
  - /fr/security_monitoring/default_rules/gsuite-user-attempted-login-with-leaked-password
disable_edit: true
integration_id: gsuite
kind: documentation
rule_category:
  - Détection des logs
scope: gsuite
security: threat-intel
source: gsuite
title: Tentative de connexion d'un utilisateur avec un mot de passe diffusé publiquement
type: security_rules
---
### Objectif
Détecter une tentative de connexion d'un utilisateur avec un mot de passe connu comme étant compromis.

### Stratégie
Cette règle vous permet de surveiller l'appel de l'API Reports Google suivant afin de détecter si une personne malveillante tente de se connecter avec un mot de passe compromis : 

* [Mot de passe compromis][1]

### Triage et réponse
1. Déterminer quel utilisateur de votre organisation possède le mot de passe compromis.
2. Contacter l'utilisateur et lui demander de réinitialiser le mot de passe de son compte Google ainsi que celui de tout autre compte qui partageait le même mot de passe. S'assurer que l'utilisateur a connaissance des recommandations relatives aux mots de passe forts.

[1]: https://developers.google.com/admin-sdk/reports/v1/appendix/activity/login#account_disabled_password_leak