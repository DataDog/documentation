---
aliases:
  - /fr/a6b-6c9-419
disable_edit: true
kind: documentation
scope: gcp.gcs.bucket
security: attack
source: gcp
tactic: TA0007-discovery
technique: T1083-file-and-directory-discovery
title: Bucket GCP énuméré
type: security_rules
---
## Présentation

### Objectif
Détecter lorsqu'un compte de service énumère des buckets GCS.

### Stratégie
Cette règle vous permet de surveiller les logs d'audit liés aux activités d'administration des buckets GCS afin de déterminer si un compte de service invoque la méthode suivante :

* `storage.buckets.list`

### Triage et réponse
1. Déterminez si ce compte de service est supposé effectuer des appels d'énumération de buckets.
 * Si le compte a été compromis, sécurisez le compte, analysez la manière dont il a été compromis et vérifiez si le compte a effectué d'autres appels non autorisés.
 * Si le propriétaire du compte de service a effectué l'appel d'API `ListBuckets` volontairement, déterminez si cet appel d'API est nécessaire. Le fait que l'application connaisse le nom du bucket auquel elle doit accéder peut donner lieu à des problèmes de sécurité. Si cet appel n'est pas requis, modifiez le filtre de cette règle pour qu'elle ne génère plus de signaux pour ce compte de service spécifique.