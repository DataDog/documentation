---
aliases:
  - /fr/7d8-c83-6fd
  - /fr/security_monitoring/default_rules/7d8-c83-6fd
  - /fr/security_monitoring/default_rules/gcp-gce-network-modified
disable_edit: true
integration_id: gcp.gce.route
kind: documentation
rule_category:
  - Détection des logs
scope: gcp.gce.route
security: conformité
source: gcp
title: Réseau VPC GCP GCE modifié
type: security_rules
---
### Objectif
Détecter la création d'un réseau VPC.

### Stratégie
Cette règle vous permet de surveiller les logs d'audit liés aux activités GCP GCE afin de déterminer si la méthode suivante est invoquée pour créer un nouveau réseau VPC :

* `beta.compute.networks.insert`

### Triage et réponse
1. Examiner le réseau VPC.