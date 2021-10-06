---
aliases:
  - /fr/3b3-32c-73c
  - /fr/security_monitoring/default_rules/3b3-32c-73c
  - /fr/security_monitoring/default_rules/gcp-gce-route-modified
disable_edit: true
integration_id: gcp.gce.route
kind: documentation
rule_category:
  - Détection des logs
scope: gcp.gce.route
security: conformité
source: gcp
title: Création ou modification d'une route réseau GCP GCE
type: security_rules
---
### Objectif
Détecter lorsqu'une règle de pare-feu est créée ou modifiée. 

### Stratégie
Cette règle vous permet de surveiller les logs d'audit liés aux activités GCP GCE afin de déterminer si un pare-feu est altéré. Pour ce faire, on vérifie si l'une des méthodes suivantes est invoquée :

* `beta.compute.routes.insert`
* `beta.compute.routes.patch`

### Triage et réponse
1. Vérifier que la route GCP est correctement configurée et que l'utilisateur a réellement cherché à modifier le pare-feu.