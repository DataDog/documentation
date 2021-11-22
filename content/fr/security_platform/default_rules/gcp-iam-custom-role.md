---
aliases:
  - /fr/d24-0f0-62d
  - /fr/security_monitoring/default_rules/d24-0f0-62d
  - /fr/security_monitoring/default_rules/gcp-iam-custom-role
disable_edit: true
integration_id: gcp.iam.role
kind: documentation
rule_category:
  - Détection des logs
scope: gcp.iam.role
security: conformité
source: gcp
title: Création ou modification d'un rôle personnalisé IAM GCP
type: security_rules
---
### Objectif
Détecter quand un rôle personnalisé est créé ou modifié. 

### Stratégie
Surveillez les logs d'audit liés aux activités IAM GCP afin de déterminer si l'une des méthodes suivantes est invoquée :

* `google.iam.admin.v1.CreateRole`
* `google.iam.admin.v1.UpdateRole` 

### Triage et réponse
1. Examinez le log et le rôle et assurez-vous que les portées des autorisations sont valides.
2. Examinez les utilisateurs associés au rôle et assurez-vous qu'ils sont censés disposer des autorisations associées au rôle.