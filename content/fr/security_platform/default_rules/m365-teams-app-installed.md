---
aliases:
  - /fr/8dl-66d-taa
  - /fr/security_monitoring/default_rules/8dl-66d-taa
  - /fr/security_monitoring/default_rules/m365-teams-app-installed
disable_edit: true
integration_id: microsoft-365
kind: documentation
rule_category:
  - Détection des logs
source: microsoft-365
title: "Installation d'une application sur Microsoft\_365 Teams"
type: security_rules
---
### Objectif
Détecter lorsqu'un utilisateur installe une application sur Microsoft 365 Teams.

### Stratégie
Cette règle vérifie si le nom d'événement `AppInstalled` figure dans les logs Microsoft 365.

### Triage et réponse
1. Déterminer si cette application doit être installée sur Microsoft 365 Teams.