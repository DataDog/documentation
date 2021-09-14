---
aliases:
  - /fr/522-190-266
  - /fr/security_monitoring/default_rules/522-190-266
  - /fr/security_monitoring/default_rules/gcp-gce-firewall-rule-modified
disable_edit: true
integration_id: gcp.gce.firewall.rule
kind: documentation
rule_category:
  - Détection des logs
scope: gcp.gce.firewall.rule
security: conformité
source: gcp
title: Règle de pare-feu GCP GCE modifiée
type: security_rules
---
### Objectif
Détecter lorsqu'une règle de pare-feu est créée, modifiée ou supprimée. 

### Stratégie
Surveillez les logs d'audit liés aux activités GCP GCE afin de déterminer lorsque l'une des méthodes suivantes est invoquée :

* `v1.compute.firewalls.delete`
* `v1.compute.firewalls.insert`
* `v1.compute.firewalls.patch` 

### Triage et réponse
1. Examinez le log et le rôle et assurez-vous que les portées des autorisations sont valides.
2. Examinez les utilisateurs associés au rôle et assurez-vous qu'ils sont censés disposer des autorisations associées au rôle.