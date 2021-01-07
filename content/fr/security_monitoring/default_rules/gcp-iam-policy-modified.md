---
aliases:
  - /fr/b58-97e-9f1
disable_edit: true
kind: documentation
rule_category:
  - Log Detection
scope: gcp.project
security: compliance
source: gcp
title: Modification de la stratégie IAM GCP
type: security_rules
---
## Présentation

### Objectif
Détecter une modification apportée à la stratégie IAM. 

### Stratégie
Cette règle vous permet de surveiller les logs d'audit liés aux activités d'administration GCP afin de déterminer si la méthode `SetIamPolicy` est invoquée.

### Triage et réponse
1. Examiner le log et inspecter les deltas de stratégie (`@data.protoPayload.serviceData.policyDelta.bindingDeltas`), puis vérifier qu'aucune des actions ne correspond à `REMOVE`.