---
aliases:
  - /fr/a6b-6c9-419
  - /fr/security_monitoring/default_rules/a6b-6c9-419
  - /fr/security_monitoring/default_rules/gcp-gcs-bucket-enumerated
disable_edit: true
integration_id: gcp.gcs.bucket
kind: documentation
rule_category:
  - Détection des logs
scope: gcp.gcs.bucket
security: attaque
source: gcp
tactic: TA0007-discovery
technique: T1083-file-and-directory-discovery
title: Bucket GCP énuméré
type: security_rules
---
### Objectif
Détecter lorsqu'un compte de service énumère des buckets GCS.

### Stratégie
Cette règle vous permet de surveiller les logs d'audit liés aux activités d'administration des buckets GCS afin de déterminer si un compte de service invoque la méthode suivante :

* `storage.buckets.list`

### Triage et réponse
1. Déterminer si ce compte de service est autorisé à effectuer des appels d'énumération de buckets.
 * Si le compte a été compromis, sécuriser le compte, analyser la manière dont il a été compromis et vérifier si le compte a effectué d'autres appels non autorisés.
 * Si le propriétaire du compte de service a effectué l'appel d'API `ListBuckets` volontairement, déterminer si cet appel d'API est nécessaire. Le fait que l'application connaisse le nom du bucket auquel elle doit accéder peut donner lieu à des problèmes de sécurité. Si cet appel n'est pas requis, modifier le filtre de cette règle pour qu'elle ne génère plus de signaux pour ce compte de service spécifique.