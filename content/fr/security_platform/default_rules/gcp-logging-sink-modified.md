---
aliases:
  - /fr/e74-752-b34
  - /fr/security_monitoring/default_rules/e74-752-b34
  - /fr/security_monitoring/default_rules/gcp-logging-sink-modified
disable_edit: true
integration_id: gcp.project
kind: documentation
rule_category:
  - Détection des logs
scope: gcp.project
security: conformité
source: gcp
title: Modification d'un récepteur de logging GCP
type: security_rules
---
### Objectif
Détecter lorsqu'une modification est apportée à un récepteur de logging GCP, ce qui peut entraîner l'arrêt de l'envoi des logs d'audit à Datadog.

### Stratégie
Surveiller les logs d'audit d'activité liés aux activités d'administration GCP afin de déterminer si l'une des méthodes suivantes est invoquée :

* `google.logging.v2.ConfigServiceV2.UpdateSink`
* `google.logging.v2.ConfigServiceV2.DeleteSink`

### Triage et réponse
1. Examiner le récepteur et vérifier qu'il est correctement configuré.