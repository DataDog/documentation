---
aliases:
  - /fr/6ir-aj0-eec
  - /fr/security_monitoring/default_rules/6ir-aj0-eec
  - /fr/security_monitoring/default_rules/azure_firewall_threat_intelligence_alert
disable_edit: true
integration_id: azure
kind: documentation
rule_category:
  - Détection des logs
security: threat-intel
source: azure
title: Alerte Threat Intelligence du pare-feu Azure
type: security_rules
---
## Objectif

Détecter la réception d'une alerte Threat Intelligence du pare-feu Azure.

## Stratégie

Surveiller les logs de diagnostic du réseau Azure afin de détecter lorsque `@evt.name` a pour valeur `AzureFirewallThreatIntelLog`.

## Triage et réponse

1. Inspecter le log Threat Intelligence.
2. Analyser l'activité provenant de cette adresse IP.