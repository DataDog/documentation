---
aliases:
  - /fr/f68-e1e-db8
  - /fr/security_monitoring/default_rules/f68-e1e-db8
  - /fr/security_monitoring/default_rules/gcp-pubsub-topic-deleted
disable_edit: true
integration_id: gcp.pubsub.topic
kind: documentation
rule_category:
  - Détection des logs
scope: gcp.pubsub.topic
security: compliance
source: gcp
title: Sujet GCP Pub/Sub supprimé
type: security_rules
---
### Objectif
Détecter lorsqu'un abonnement GCP Pub/Sub a été supprimé, ce qui peut entraîner l'arrêt de l'envoi des logs d'audit à Datadog.

### Stratégie
Surveiller les logs d'audit d'activité liés aux activités d'administration GCP afin de déterminer si la méthode suivante est invoquée :

* `google.pubsub.v1.Publisher.DeleteTopic`

### Triage et réponse
1. Examiner l'abonnement et vérifier qu'il est correctement configuré.