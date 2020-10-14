---
aliases:
  - /fr/7d8-c83-6fd
disable_edit: true
kind: documentation
rule_category:
  - Détection des logs
scope: gcp.gce.route
security: compliance
source: gcp
title: Modification d'un réseau VPC GCP GCE
type: security_rules
---
## Présentation

### Objectif
Détecter la création d'un réseau VPC.

### Stratégie
Cette règle vous permet de surveiller les logs d'audit liés aux activités GCP GCE afin de déterminer si la méthode suivante est invoquée pour créer un nouveau réseau VPC :

* `beta.compute.networks.insert`

### Triage et réponse
1. Examiner le réseau VPC.