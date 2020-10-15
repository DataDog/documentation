---
aliases:
  - /fr/a7b-dbc-bdd
disable_edit: true
kind: documentation
rule_category:
  - Détection des logs
scope: gcp.pubsub.subscription
security: compliance
source: gcp
title: Modification d'un abonné GCP Pub/Sub
type: security_rules
---
## Présentation

### Objectif
Détecter lorsqu'une modification a été apportée à un abonnement GCP Pub/Sub, ce qui peut entraîner l'arrêt de l'envoi des logs d'audit à Datadog.

### Stratégie
Surveiller les logs d'audit d'activité liés aux activités d'administration GCP afin de déterminer si l'une des méthodes suivantes est invoquée :

* `google.pubsub.v1.Subscriber.UpdateSubscription`
* `google.pubsub.v1.Subscriber.DeleteSubscription`

### Triage et réponse
1. Examiner l'abonnement et vérifier qu'il est correctement configuré.