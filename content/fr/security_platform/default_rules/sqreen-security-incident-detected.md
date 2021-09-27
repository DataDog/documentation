---
aliases:
  - /fr/x8x-2yk-m3b
  - /fr/security_monitoring/default_rules/x8x-2yk-m3b
  - /fr/security_monitoring/default_rules/sqreen-security-incident-detected
disable_edit: true
integration_id: sqreen
kind: documentation
rule_category:
  - Détection des logs
source: sqreen
title: Incident de sécurité détecté par Sqreen
type: security_rules
---
### Objectif
Détecter une menace sur votre application.

### Stratégie
Cette règle permet de générer un signal à chaque fois que Sqreen crée un incident de sécurité.

### Triage et réponse
1. Examiner l'incident depuis le [dashboard Sqreen][1].

[1]: https://my.sqreen.com/incidents