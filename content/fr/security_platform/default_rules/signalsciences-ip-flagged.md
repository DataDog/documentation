---
aliases:
  - /fr/4ec-343-f90
  - /fr/security_monitoring/default_rules/4ec-343-f90
  - /fr/security_monitoring/default_rules/signalsciences-ip-flagged
disable_edit: true
integration_id: signal_sciences
kind: documentation
rule_category:
  - Détection des logs
scope: signal_sciences
source: signal_sciences
title: Signalement d'une IP par Signal Sciences
type: security_rules
---
### Objectif
Détecter le signalement d'une IP par Signal Sciences.

### Stratégie
Cette règle vous permet de surveiller les événements Signal Sciences envoyés via l'[intégration][1] Signal Sciences pour détecter le signalement d'une IP. 

### Triage et réponse
1. Déterminer si l'attaque est un faux positif.
2. Déterminer si l'attaque est réussie.
3. Si l'attaque a exploité une vulnérabilité dans l'application, évaluer la vulnérabilité.

[1]: https://app.datadoghq.com/account/settings#integrations/sigsci